# 🎓 CAPACITACIÓN: EXTRACCIÓN DE DATOS CON ZAF (ZENDESK APPS FRAMEWORK)

## 📚 ÍNDICE
1. [¿Qué es ZAF?](#qué-es-zaf)
2. [Ciclo de Vida de una App](#ciclo-de-vida)
3. [Métodos de Extracción](#métodos-de-extracción)
4. [Ejemplos Prácticos del Proyecto](#ejemplos-prácticos)
5. [Timing y Sincronización](#timing)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## 1. ¿QUÉ ES ZAF? {#qué-es-zaf}

**ZAF (Zendesk Apps Framework)** es una API JavaScript que permite a las apps interactuar con Zendesk de forma segura y controlada.

### 🔐 Conceptos Clave

**1. Sandbox de Seguridad**
```
Tu App (iframe.html)
    ↓
ZAF Client (puente seguro)
    ↓
Zendesk (datos reales)
```

- Tu app corre en un **iframe aislado**
- No tienes acceso directo al DOM de Zendesk
- Debes usar ZAF para comunicarte
- ZAF valida permisos antes de dar acceso

**2. Comunicación Asíncrona**
```javascript
// ❌ ESTO NO FUNCIONA (síncrono):
const ticket = client.get('ticket');
console.log(ticket.id); // undefined

// ✅ ESTO SÍ FUNCIONA (asíncrono):
client.get('ticket').then(data => {
  console.log(data.ticket.id); // 50688
});
```

**IMPORTANTE:** TODA comunicación con ZAF es asíncrona (usa Promises).

---

## 2. CICLO DE VIDA DE UNA APP {#ciclo-de-vida}

### 📍 Etapas de Inicialización

```javascript
// ETAPA 1: Página HTML carga
console.log('HTML cargado');

// ETAPA 2: Script main.js se ejecuta
console.log('Script ejecutándose');

// ETAPA 3: Crear cliente ZAF
const client = ZAFClient.init();
console.log('Cliente creado (pero aún no conectado)');

// ETAPA 4: Esperar que ZAF esté listo
client.on('app.registered', function() {
  console.log('✅ ZAF listo - AHORA puedes extraer datos');
  
  // ETAPA 5: Extraer datos
  initialize();
});
```

### ⚠️ REGLA DE ORO

**NUNCA extraigas datos antes de `app.registered`**

```javascript
// ❌ MAL - Demasiado temprano
const client = ZAFClient.init();
client.get('ticket').then(data => {
  // Esto puede fallar porque ZAF no está listo
});

// ✅ BIEN - Esperar a que esté listo
const client = ZAFClient.init();
client.on('app.registered', function() {
  client.get('ticket').then(data => {
    // Ahora sí funciona
  });
});
```

---

## 3. MÉTODOS DE EXTRACCIÓN {#métodos-de-extracción}

ZAF te da 3 formas de obtener datos. Cada una tiene su uso específico.

---

### 📦 MÉTODO 1: `client.get()` - Lectura de Datos

**¿Cuándo usar?**
- Para leer datos disponibles en el contexto actual
- Primera carga de la app
- Cuando necesitas un snapshot del estado actual

**Sintaxis:**
```javascript
client.get('path.to.data')
  .then(data => {
    // Usar data
  })
  .catch(error => {
    // Manejar error
  });
```

#### 📋 Ejemplo 1: Obtener Ticket ID

```javascript
client.get('ticket')
  .then(data => {
    console.log('Ticket completo:', data);
    // {
    //   ticket: {
    //     id: 50688,
    //     subject: "Problema con...",
    //     status: "open",
    //     priority: "normal",
    //     ...
    //   }
    // }
    
    const ticketId = data.ticket.id;
    console.log('Ticket ID:', ticketId);
  });
```

**IMPORTANTE:** El objeto retornado tiene una estructura específica:
```javascript
{
  'ticket': {...},           // ← Path fue 'ticket'
  'errors': {...}            // ← Siempre incluye errors
}
```

#### 📋 Ejemplo 2: Obtener Campo Custom

```javascript
// Campo custom con ID 38620191063444
const FIELD_ID = '38620191063444';

client.get('ticket.customField:custom_field_' + FIELD_ID)
  .then(data => {
    console.log('Respuesta completa:', data);
    // {
    //   'ticket.customField:custom_field_38620191063444': 'no_contesto',
    //   'errors': {}
    // }
    
    const fieldValue = data['ticket.customField:custom_field_' + FIELD_ID];
    console.log('Valor del campo:', fieldValue); // "no_contesto"
  });
```

**TRUCO:** El key del objeto retornado es exactamente el path que pediste.

#### 📋 Ejemplo 3: Obtener Múltiples Datos a la Vez

```javascript
// Obtener varios datos en paralelo
Promise.all([
  client.get('ticket'),
  client.get('ticket.requester'),
  client.get('currentUser')
])
  .then(([ticketData, requesterData, userData]) => {
    console.log('Ticket:', ticketData.ticket);
    console.log('Requester:', requesterData['ticket.requester']);
    console.log('Current User:', userData.currentUser);
  });
```

**VENTAJA:** Más eficiente que hacer 3 requests separados.

---

### 🔄 MÉTODO 2: `client.on()` - Eventos en Tiempo Real

**¿Cuándo usar?**
- Para detectar CAMBIOS en tiempo real
- Cuando el usuario modifica algo en Zendesk
- Para mantener tu app sincronizada

**Sintaxis:**
```javascript
client.on('event.name', function(data) {
  // Reaccionar al cambio
});
```

#### 🎯 Eventos Más Comunes

**1. Ticket cambiado:**
```javascript
client.on('ticket.save', function() {
  console.log('Usuario guardó el ticket');
  // Recargar datos
  client.get('ticket').then(data => {
    console.log('Ticket actualizado:', data.ticket);
  });
});
```

**2. Tags cambiados:**
```javascript
client.on('ticket.tags.changed', function(tags) {
  console.log('Tags cambiaron a:', tags);
  // tags es un array: ['urgent', 'billing', ...]
});
```

**3. Campo custom cambió:**
```javascript
// NOTA: Esto funciona solo con campos simples, no dropdowns
client.on('ticket.customField:custom_field_12345.changed', function(value) {
  console.log('Campo cambió a:', value);
});
```

**⚠️ PROBLEMA COMÚN:** Muchos campos custom NO disparan eventos. Por eso usamos polling.

#### 📋 Ejemplo Real: Detectar Cambio de Requester

```javascript
client.on('ticket.requester.id.changed', function() {
  console.log('👤 Requester cambió');
  
  // Obtener nuevo requester
  client.get('ticket.requester').then(data => {
    const newRequester = data['ticket.requester'];
    console.log('Nuevo requester:', newRequester.name);
    console.log('Teléfono:', newRequester.phone);
  });
});
```

---

### 🔁 MÉTODO 3: Polling - Verificación Periódica

**¿Cuándo usar?**
- Cuando los eventos NO funcionan
- Para campos dropdown/select custom
- Cuando necesitas verificar estado cada X segundos

**¿Por qué es necesario?**
```javascript
// Este evento NO funciona con dropdowns:
client.on('ticket.customField:custom_field_12345.changed', function() {
  // 👆 Nunca se dispara para dropdowns
});

// Solución: Polling
setInterval(() => {
  client.get('ticket.customField:custom_field_12345')
    .then(data => {
      const currentValue = data['ticket.customField:custom_field_12345'];
      
      if (currentValue !== lastValue) {
        console.log('¡Campo cambió!', currentValue);
        lastValue = currentValue;
      }
    });
}, 2000); // Cada 2 segundos
```

#### 📋 Ejemplo Real del Proyecto WhatsApp

```javascript
let lastResultadoTelefonico = '';

function checkFieldValue() {
  // 1. Verificar que el cliente existe
  if (!client) {
    console.warn('Cliente no disponible');
    return;
  }
  
  console.log('🔄 [Polling] Verificando campo...');
  
  // 2. Obtener valor actual
  client.get('ticket.customField:custom_field_38620191063444')
    .then(data => {
      const currentValue = data['ticket.customField:custom_field_38620191063444'];
      console.log('Valor actual:', currentValue);
      
      // 3. Comparar con último valor conocido
      if (currentValue !== lastResultadoTelefonico) {
        console.log('¡Campo cambió!', lastResultadoTelefonico, '→', currentValue);
        lastResultadoTelefonico = currentValue;
        
        // 4. Reaccionar al cambio
        if (currentValue === 'no_contesto') {
          console.log('✅ No Contesto detectado');
          enviarWhatsApp();
        }
      }
    })
    .catch(err => {
      console.error('Error en polling:', err);
    });
}

// Ejecutar cada 2 segundos
setInterval(checkFieldValue, 2000);
```

**VENTAJAS:**
- ✅ Funciona con cualquier tipo de campo
- ✅ No depende de eventos de Zendesk
- ✅ Confiable al 99%

**DESVENTAJAS:**
- ⚠️ Usa más recursos (request cada X segundos)
- ⚠️ Hay un delay (máximo X segundos)

---

## 4. EJEMPLOS PRÁCTICOS DEL PROYECTO {#ejemplos-prácticos}

Vamos a ver cómo se extraen datos en el proyecto WhatsApp UDLA.

---

### 📱 CASO 1: Obtener Teléfono del Requester

**Problema:** El teléfono puede venir de 2 lugares:
1. ZAF: `ticket.requester.phone`
2. REST API: `/api/v2/users/{id}.json`

**Solución en Código:**

```javascript
async function initialize() {
  try {
    // PASO 1: Obtener datos básicos del ticket
    const ticketResponse = await client.get('ticket');
    const ticketData = ticketResponse.ticket;
    console.log('🎫 Ticket:', ticketData.id);
    
    // PASO 2: Obtener requester
    const requesterResponse = await client.get('ticket.requester');
    const requester = requesterResponse['ticket.requester'];
    console.log('📱 Requester:', requester);
    
    // PASO 3: Verificar si ZAF tiene el teléfono
    let phone = requester.phone;
    
    if (!phone) {
      console.log('⚠️ ZAF no tiene phone, usando REST API...');
      
      // PASO 4: Obtener teléfono con REST API
      const userResponse = await client.request({
        url: `/api/v2/users/${requester.id}.json`,
        type: 'GET'
      });
      
      phone = userResponse.user.phone;
      console.log('✓ Teléfono de REST API:', phone);
    }
    
    console.log('✅ Teléfono final:', phone);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}
```

**¿Por qué 2 métodos?**
- ZAF a veces NO incluye el phone (bug de Zendesk)
- REST API SIEMPRE tiene el phone
- Usamos ZAF primero (más rápido), REST API como fallback

---

### 🎓 CASO 2: Obtener Campo Custom "Nivel Académico"

**Campo:** Nivel Académico [Retención]  
**Field ID:** 38620293558164  
**Tipo:** Dropdown

```javascript
const NIVEL_ACADEMICO_FIELD_ID = '38620293558164';

async function getNivelAcademico() {
  try {
    // Obtener valor del campo
    const response = await client.get(
      'ticket.customField:custom_field_' + NIVEL_ACADEMICO_FIELD_ID
    );
    
    console.log('Respuesta completa:', response);
    // {
    //   'ticket.customField:custom_field_38620293558164': 'maestría',
    //   'errors': {}
    // }
    
    // Extraer valor
    const nivelAcademico = response['ticket.customField:custom_field_' + NIVEL_ACADEMICO_FIELD_ID];
    
    console.log('Nivel Académico:', nivelAcademico); // "maestría"
    
    return nivelAcademico;
    
  } catch (error) {
    console.error('Error obteniendo nivel académico:', error);
    return null;
  }
}
```

**TRUCO:** Guarda el Field ID en una constante para reutilizarlo.

---

### 🔍 CASO 3: Verificar Comentarios Previos

**Objetivo:** Ver si ya se envió WhatsApp antes (para no reenviar).

```javascript
async function checkPreviousWhatsAppComments() {
  try {
    // PASO 1: Obtener ticket ID
    const ticketResponse = await client.get('ticket');
    const ticketId = ticketResponse.ticket.id;
    
    console.log('🔍 Verificando comentarios del ticket:', ticketId);
    
    // PASO 2: Obtener comentarios con REST API
    const commentsResponse = await client.request({
      url: `/api/v2/tickets/${ticketId}/comments.json`,
      type: 'GET'
    });
    
    console.log('Total de comentarios:', commentsResponse.comments.length);
    
    // PASO 3: Filtrar comentarios de WhatsApp
    const whatsappComments = commentsResponse.comments.filter(comment => {
      const body = comment.body || '';
      
      // Buscar marcadores específicos
      return body.includes('[WhatsApp UDLA] Automático') ||
             body.includes('Teléfono: +593') ||
             body.includes('Estado: success');
    });
    
    console.log('Comentarios de WhatsApp:', whatsappComments.length);
    
    // PASO 4: Decidir si ya se envió
    if (whatsappComments.length > 0) {
      console.log('✅ Ya se envió WhatsApp anteriormente');
      return true;
    } else {
      console.log('✅ No hay envíos previos');
      return false;
    }
    
  } catch (error) {
    console.error('Error verificando comentarios:', error);
    return false;
  }
}
```

**IMPORTANTE:** Usamos REST API porque ZAF no da acceso directo a comentarios.

---

### 📊 CASO 4: Obtener Configuración de la App

```javascript
async function getSettings() {
  try {
    // Obtener metadata (incluye settings)
    const metadata = await client.metadata();
    
    console.log('Metadata completa:', metadata);
    // {
    //   settings: {
    //     nombre_plantilla: '2566_m_...',
    //     enable_auto_send: true,
    //     producto_id: '1156221',
    //     ...
    //   },
    //   installationId: 12345,
    //   appId: 67890,
    //   ...
    // }
    
    const settings = metadata.settings;
    console.log('⚙️ Configuración:', settings);
    
    return settings;
    
  } catch (error) {
    console.error('Error obteniendo settings:', error);
    return {};
  }
}
```

**USO:** Acceder a parámetros configurados en la instalación de la app.

---

## 5. TIMING Y SINCRONIZACIÓN {#timing}

### ⏱️ ¿Cuándo Están Disponibles los Datos?

```javascript
// ❌ DEMASIADO TEMPRANO
const client = ZAFClient.init();
client.get('ticket'); // Puede fallar

// ✅ MOMENTO CORRECTO
client.on('app.registered', function() {
  client.get('ticket'); // Funciona
});
```

### 🎯 Orden de Disponibilidad

```javascript
client.on('app.registered', async function() {
  
  // INMEDIATAMENTE disponibles:
  const metadata = await client.metadata();      // ✅ Siempre
  const context = await client.context();        // ✅ Siempre
  const ticket = await client.get('ticket');     // ✅ Siempre
  
  // PUEDE NO ESTAR disponible:
  const requesterPhone = ticket.requester.phone; // ⚠️ A veces null
  
  // NECESITA request adicional:
  const comments = await client.request({        // ⏳ Toma tiempo
    url: `/api/v2/tickets/${ticket.id}/comments.json`
  });
  
});
```

### 🔄 Esperar a que un Campo Tenga Valor

```javascript
// Polling hasta que el campo tenga valor
function waitForField(fieldId, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const interval = setInterval(async () => {
      try {
        const data = await client.get('ticket.customField:custom_field_' + fieldId);
        const value = data['ticket.customField:custom_field_' + fieldId];
        
        if (value) {
          clearInterval(interval);
          resolve(value);
        }
        
        // Timeout
        if (Date.now() - startTime > timeout) {
          clearInterval(interval);
          reject(new Error('Timeout esperando campo'));
        }
        
      } catch (err) {
        clearInterval(interval);
        reject(err);
      }
    }, 500); // Check cada 500ms
  });
}

// Uso:
try {
  const nivel = await waitForField('38620293558164', 5000);
  console.log('Nivel académico:', nivel);
} catch (err) {
  console.error('Campo no se llenó:', err);
}
```

---

## 6. TROUBLESHOOTING {#troubleshooting}

### 🐛 Problema 1: "Cannot read property 'get' of undefined"

**Causa:** Intentaste usar `client` antes de inicializarlo.

**Solución:**
```javascript
// ❌ MAL
const client = ZAFClient.init();
client.get('ticket'); // client aún no está listo

// ✅ BIEN
const client = ZAFClient.init();
client.on('app.registered', function() {
  client.get('ticket'); // Ahora sí
});
```

---

### 🐛 Problema 2: "Promise never resolves"

**Causa:** El path que pediste no existe o no tienes permisos.

**Solución:**
```javascript
// Siempre usar timeout
function getWithTimeout(path, timeout = 5000) {
  return Promise.race([
    client.get(path),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

// Uso:
try {
  const data = await getWithTimeout('ticket');
  console.log('Éxito:', data);
} catch (err) {
  console.error('Falló o timeout:', err);
}
```

---

### 🐛 Problema 3: "Field ID not found"

**Causa:** El Field ID es incorrecto o el campo no existe.

**Solución:**
```javascript
// Verificar que el campo existe
async function verifyField(fieldId) {
  try {
    const data = await client.get('ticket.customField:custom_field_' + fieldId);
    console.log('✅ Campo existe:', data);
    return true;
  } catch (err) {
    console.error('❌ Campo NO existe:', fieldId);
    console.error('Error:', err);
    return false;
  }
}

// Uso:
const existe = await verifyField('38620293558164');
if (!existe) {
  console.log('Ve a Admin → Campos y verifica el ID');
}
```

---

### 🐛 Problema 4: "Datos desactualizados"

**Causa:** ZAF cachea datos, no siempre están fresh.

**Solución:** Usar polling o forzar refresh
```javascript
// Opción 1: Polling
setInterval(() => {
  client.get('ticket.customField:custom_field_12345')
    .then(data => {
      // Datos frescos cada 2 seg
    });
}, 2000);

// Opción 2: Escuchar evento de guardado
client.on('ticket.save', () => {
  client.get('ticket').then(data => {
    // Recargar después de guardar
  });
});
```

---

## 7. BEST PRACTICES {#best-practices}

### ✅ DO's (Hacer)

**1. Siempre esperar `app.registered`**
```javascript
client.on('app.registered', function() {
  // Tu código aquí
});
```

**2. Manejar errores**
```javascript
client.get('ticket')
  .then(data => {
    // Éxito
  })
  .catch(err => {
    console.error('Error:', err);
    // Mostrar mensaje al usuario
  });
```

**3. Usar async/await**
```javascript
// Más legible
async function init() {
  try {
    const ticket = await client.get('ticket');
    const requester = await client.get('ticket.requester');
    // ...
  } catch (err) {
    console.error(err);
  }
}
```

**4. Cachear datos costosos**
```javascript
let cachedTicketId = null;

async function getTicketId() {
  if (cachedTicketId) {
    return cachedTicketId; // Usar cache
  }
  
  const data = await client.get('ticket');
  cachedTicketId = data.ticket.id;
  return cachedTicketId;
}
```

**5. Logging detallado**
```javascript
console.log('🔄 Obteniendo ticket...');
const ticket = await client.get('ticket');
console.log('✅ Ticket obtenido:', ticket.id);
```

---

### ❌ DON'Ts (No Hacer)

**1. NO usar client antes de `app.registered`**
```javascript
// ❌ MAL
const client = ZAFClient.init();
const ticket = await client.get('ticket'); // Falla
```

**2. NO ignorar errores**
```javascript
// ❌ MAL
client.get('ticket').then(data => {
  // ¿Qué pasa si falla?
});

// ✅ BIEN
client.get('ticket')
  .then(data => { /* ... */ })
  .catch(err => { /* manejar */ });
```

**3. NO hacer requests innecesarios**
```javascript
// ❌ MAL - Request cada 100ms
setInterval(() => {
  client.get('ticket'); // Demasiado frecuente
}, 100);

// ✅ BIEN - Request cada 2 segundos
setInterval(() => {
  client.get('ticket');
}, 2000);
```

**4. NO asumir que datos existen**
```javascript
// ❌ MAL
const phone = data.ticket.requester.phone;
console.log(phone.substring(0, 3)); // Puede ser null

// ✅ BIEN
const phone = data.ticket.requester.phone;
if (phone) {
  console.log(phone.substring(0, 3));
} else {
  console.log('No hay teléfono');
}
```

---

## 🎯 RESUMEN EJECUTIVO

### Métodos de Extracción

| Método | Cuándo Usar | Ventajas | Desventajas |
|--------|-------------|----------|-------------|
| `client.get()` | Primera carga, lectura única | Rápido, simple | No detecta cambios |
| `client.on()` | Detectar cambios en tiempo real | Eficiente, instantáneo | No funciona con todos los campos |
| Polling | Campos dropdown, verificación periódica | Funciona siempre | Usa más recursos |

### Timing

```
Inicialización
    ↓
app.registered ← AQUÍ empezar
    ↓
client.get() ← Obtener datos
    ↓
client.on() ← Escuchar cambios
    ↓
Polling ← Para campos sin eventos
```

### Paths Más Comunes

```javascript
'ticket'                                              // Ticket completo
'ticket.requester'                                    // Requester
'ticket.customField:custom_field_12345'              // Campo custom
'currentUser'                                         // Usuario actual
'ticket.tags'                                         // Tags
```

### Template de Código

```javascript
(function() {
  const client = ZAFClient.init();
  let cachedData = {};
  
  client.on('app.registered', async function() {
    console.log('✅ App iniciada');
    
    try {
      // Obtener datos iniciales
      const [metadata, ticket, requester] = await Promise.all([
        client.metadata(),
        client.get('ticket'),
        client.get('ticket.requester')
      ]);
      
      cachedData = {
        settings: metadata.settings,
        ticketId: ticket.ticket.id,
        requester: requester['ticket.requester']
      };
      
      console.log('Datos cargados:', cachedData);
      
      // Escuchar cambios
      client.on('ticket.save', handleTicketSave);
      
      // Iniciar polling si es necesario
      startPolling();
      
    } catch (err) {
      console.error('Error en inicialización:', err);
    }
  });
  
  function handleTicketSave() {
    console.log('Ticket guardado');
    // Recargar datos
  }
  
  function startPolling() {
    setInterval(async () => {
      try {
        const data = await client.get('ticket.customField:custom_field_12345');
        // Procesar data
      } catch (err) {
        console.error('Error en polling:', err);
      }
    }, 2000);
  }
  
})();
```

---

## 📚 RECURSOS ADICIONALES

**Documentación Oficial:**
- https://developer.zendesk.com/documentation/apps/
- https://developer.zendesk.com/api-reference/apps/apps-core-api/client_api/

**Debugging:**
- Chrome DevTools → Console (F12)
- Ver Network para requests de ZAF
- Usar `console.log()` profusamente

**Testing:**
- Usar `zcli apps:server` para desarrollo local
- Probar con diferentes tipos de tickets
- Verificar permisos en manifest.json

---

¡Suerte con tu proyecto! 🚀
