# 🚀 ZAF CHEATSHEET - EJEMPLOS LISTOS PARA COPIAR

## 📦 INICIALIZACIÓN BÁSICA

```javascript
(function() {
  'use strict';
  
  // Crear cliente
  const client = ZAFClient.init();
  
  // Esperar a que esté listo
  client.on('app.registered', function() {
    console.log('✅ ZAF listo');
    initialize();
  });
  
  async function initialize() {
    try {
      // Tu código aquí
      const ticket = await client.get('ticket');
      console.log('Ticket ID:', ticket.ticket.id);
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
})();
```

---

## 🎫 OBTENER DATOS DEL TICKET

### Ticket básico
```javascript
const data = await client.get('ticket');
const ticket = data.ticket;

console.log('ID:', ticket.id);
console.log('Subject:', ticket.subject);
console.log('Status:', ticket.status);
console.log('Priority:', ticket.priority);
console.log('Type:', ticket.type);
console.log('Tags:', ticket.tags); // Array
```

### Requester (solicitante)
```javascript
const data = await client.get('ticket.requester');
const requester = data['ticket.requester'];

console.log('ID:', requester.id);
console.log('Name:', requester.name);
console.log('Email:', requester.email);
console.log('Phone:', requester.phone); // ⚠️ Puede ser null
```

### Assignee (agente asignado)
```javascript
const data = await client.get('ticket.assignee');
const assignee = data['ticket.assignee'];

console.log('Agent ID:', assignee.user.id);
console.log('Agent Name:', assignee.user.name);
console.log('Agent Email:', assignee.user.email);
```

---

## 📋 CAMPOS CUSTOM

### Obtener un campo custom
```javascript
const FIELD_ID = '38620191063444';

const data = await client.get('ticket.customField:custom_field_' + FIELD_ID);
const fieldValue = data['ticket.customField:custom_field_' + FIELD_ID];

console.log('Valor del campo:', fieldValue);
```

### Obtener múltiples campos custom
```javascript
const FIELD_1 = '38620191063444';
const FIELD_2 = '38620293558164';

const [data1, data2] = await Promise.all([
  client.get('ticket.customField:custom_field_' + FIELD_1),
  client.get('ticket.customField:custom_field_' + FIELD_2)
]);

const value1 = data1['ticket.customField:custom_field_' + FIELD_1];
const value2 = data2['ticket.customField:custom_field_' + FIELD_2];

console.log('Campo 1:', value1);
console.log('Campo 2:', value2);
```

### Establecer valor de un campo custom
```javascript
const FIELD_ID = '38620191063444';

await client.set('ticket.customField:custom_field_' + FIELD_ID, 'nuevo_valor');
console.log('✅ Campo actualizado');
```

---

## 👤 USUARIO ACTUAL

```javascript
const data = await client.get('currentUser');
const user = data.currentUser;

console.log('ID:', user.id);
console.log('Name:', user.name);
console.log('Email:', user.email);
console.log('Role:', user.role); // 'admin', 'agent', 'end-user'
console.log('Locale:', user.locale); // 'es', 'en-US', etc.
```

---

## ⚙️ CONFIGURACIÓN DE LA APP

```javascript
const metadata = await client.metadata();
const settings = metadata.settings;

console.log('Configuración:', settings);
// {
//   nombre_plantilla: '2566_m_...',
//   enable_auto_send: true,
//   producto_id: '1156221',
//   ...
// }

// Usar un setting específico
if (settings.enable_auto_send) {
  console.log('Auto-send habilitado');
}
```

---

## 🌐 REST API REQUESTS

### GET Request
```javascript
const response = await client.request({
  url: '/api/v2/tickets/50688.json',
  type: 'GET'
});

console.log('Ticket:', response.ticket);
```

### POST Request
```javascript
const response = await client.request({
  url: '/api/v2/tickets.json',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({
    ticket: {
      subject: 'Nuevo ticket',
      comment: { body: 'Descripción' }
    }
  })
});

console.log('Ticket creado:', response.ticket.id);
```

### Obtener comentarios de un ticket
```javascript
const ticketId = 50688;

const response = await client.request({
  url: `/api/v2/tickets/${ticketId}/comments.json`,
  type: 'GET'
});

console.log('Total comentarios:', response.comments.length);

response.comments.forEach(comment => {
  console.log('---');
  console.log('Autor:', comment.author_id);
  console.log('Fecha:', comment.created_at);
  console.log('Contenido:', comment.body);
  console.log('Público:', comment.public);
});
```

### Obtener usuario por ID
```javascript
const userId = 40697238717588;

const response = await client.request({
  url: `/api/v2/users/${userId}.json`,
  type: 'GET'
});

const user = response.user;
console.log('Name:', user.name);
console.log('Email:', user.email);
console.log('Phone:', user.phone);
```

---

## 🔔 EVENTOS (LISTENERS)

### App registrada
```javascript
client.on('app.registered', function() {
  console.log('✅ App inicializada');
});
```

### Ticket guardado
```javascript
client.on('ticket.save', function() {
  console.log('💾 Usuario guardó el ticket');
  // Recargar datos
  client.get('ticket').then(data => {
    console.log('Ticket actualizado:', data.ticket);
  });
});
```

### Tags cambiados
```javascript
client.on('ticket.tags.changed', function(tags) {
  console.log('🏷️ Tags:', tags);
  // tags es un array: ['urgent', 'billing', ...]
});
```

### Requester cambió
```javascript
client.on('ticket.requester.id.changed', function() {
  console.log('👤 Requester cambió');
  client.get('ticket.requester').then(data => {
    const requester = data['ticket.requester'];
    console.log('Nuevo requester:', requester.name);
  });
});
```

### Campo custom cambió (solo algunos campos)
```javascript
const FIELD_ID = '38620191063444';

client.on('ticket.customField:custom_field_' + FIELD_ID + '.changed', function(value) {
  console.log('📋 Campo cambió a:', value);
});

// ⚠️ NOTA: Esto NO funciona con dropdowns
```

---

## 🔁 POLLING (Para campos que no disparan eventos)

### Polling básico
```javascript
let lastValue = '';

function checkField() {
  const FIELD_ID = '38620191063444';
  
  client.get('ticket.customField:custom_field_' + FIELD_ID)
    .then(data => {
      const currentValue = data['ticket.customField:custom_field_' + FIELD_ID];
      
      if (currentValue !== lastValue) {
        console.log('Campo cambió:', lastValue, '→', currentValue);
        lastValue = currentValue;
        
        // Reaccionar al cambio
        handleFieldChange(currentValue);
      }
    })
    .catch(err => {
      console.error('Error en polling:', err);
    });
}

// Ejecutar cada 2 segundos
setInterval(checkField, 2000);
```

### Polling múltiples campos
```javascript
let lastValues = {
  field1: '',
  field2: ''
};

function checkFields() {
  const FIELD_1 = '38620191063444';
  const FIELD_2 = '38620293558164';
  
  Promise.all([
    client.get('ticket.customField:custom_field_' + FIELD_1),
    client.get('ticket.customField:custom_field_' + FIELD_2)
  ])
    .then(([data1, data2]) => {
      const value1 = data1['ticket.customField:custom_field_' + FIELD_1];
      const value2 = data2['ticket.customField:custom_field_' + FIELD_2];
      
      // Check cambios
      if (value1 !== lastValues.field1) {
        console.log('Campo 1 cambió:', value1);
        lastValues.field1 = value1;
      }
      
      if (value2 !== lastValues.field2) {
        console.log('Campo 2 cambió:', value2);
        lastValues.field2 = value2;
      }
    })
    .catch(err => {
      console.error('Error en polling:', err);
    });
}

setInterval(checkFields, 2000);
```

---

## 📝 CREAR COMENTARIO EN TICKET

### Comentario público
```javascript
const ticketId = 50688;

await client.request({
  url: `/api/v2/tickets/${ticketId}.json`,
  type: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({
    ticket: {
      comment: {
        body: 'Este es un comentario público',
        public: true
      }
    }
  })
});

console.log('✅ Comentario creado');
```

### Comentario privado (nota interna)
```javascript
const ticketId = 50688;

await client.request({
  url: `/api/v2/tickets/${ticketId}.json`,
  type: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({
    ticket: {
      comment: {
        body: 'Esta es una nota interna (privada)',
        public: false
      }
    }
  })
});

console.log('✅ Nota interna creada');
```

---

## 🎨 UI HELPERS

### Notificación
```javascript
// Éxito
client.invoke('notify', 'Operación exitosa', 'notice');

// Error
client.invoke('notify', 'Ocurrió un error', 'error');

// Alerta
client.invoke('notify', 'Advertencia', 'alert');
```

### Cambiar tamaño de la app
```javascript
// Hacer la app más grande
client.invoke('resize', { width: '100%', height: '400px' });

// Hacer la app más pequeña
client.invoke('resize', { width: '100%', height: '200px' });
```

### Abrir URL en nueva ventana
```javascript
const url = 'https://example.com';
window.open(url, '_blank');
```

---

## 🔍 DEBUGGING

### Log todo el contexto
```javascript
client.on('app.registered', async function() {
  
  // Metadata
  const metadata = await client.metadata();
  console.log('📦 Metadata:', metadata);
  
  // Context
  const context = await client.context();
  console.log('🔍 Context:', context);
  
  // Ticket
  const ticket = await client.get('ticket');
  console.log('🎫 Ticket:', ticket);
  
  // Requester
  const requester = await client.get('ticket.requester');
  console.log('👤 Requester:', requester);
  
  // Current User
  const user = await client.get('currentUser');
  console.log('👤 Current User:', user);
  
});
```

### Verificar si un campo existe
```javascript
async function fieldExists(fieldId) {
  try {
    const data = await client.get('ticket.customField:custom_field_' + fieldId);
    console.log('✅ Campo existe:', fieldId);
    console.log('Valor:', data['ticket.customField:custom_field_' + fieldId]);
    return true;
  } catch (err) {
    console.error('❌ Campo NO existe:', fieldId);
    console.error('Error:', err);
    return false;
  }
}

// Uso
await fieldExists('38620191063444');
```

### Timeout para requests
```javascript
function getWithTimeout(path, timeout = 5000) {
  return Promise.race([
    client.get(path),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

// Uso
try {
  const data = await getWithTimeout('ticket', 5000);
  console.log('Éxito:', data);
} catch (err) {
  console.error('Timeout o error:', err);
}
```

---

## ⚡ PATRONES COMUNES

### Obtener teléfono con fallback a REST API
```javascript
async function getPhone() {
  try {
    // Intentar con ZAF primero
    const requesterData = await client.get('ticket.requester');
    const requester = requesterData['ticket.requester'];
    
    let phone = requester.phone;
    
    if (!phone && requester.id) {
      console.log('⚠️ Phone no disponible en ZAF, usando REST API...');
      
      // Fallback a REST API
      const userData = await client.request({
        url: `/api/v2/users/${requester.id}.json`,
        type: 'GET'
      });
      
      phone = userData.user.phone;
      console.log('✅ Phone obtenido de REST API:', phone);
    }
    
    return phone;
    
  } catch (error) {
    console.error('Error obteniendo teléfono:', error);
    return null;
  }
}
```

### Verificar si ya existe un comentario específico
```javascript
async function commentExists(ticketId, searchText) {
  try {
    const response = await client.request({
      url: `/api/v2/tickets/${ticketId}/comments.json`,
      type: 'GET'
    });
    
    const found = response.comments.some(comment => {
      return comment.body && comment.body.includes(searchText);
    });
    
    return found;
    
  } catch (error) {
    console.error('Error verificando comentarios:', error);
    return false;
  }
}

// Uso
const existe = await commentExists(50688, '[WhatsApp enviado]');
if (existe) {
  console.log('Ya se envió WhatsApp anteriormente');
}
```

### Esperar a que un campo tenga valor
```javascript
async function waitForField(fieldId, expectedValue, timeout = 10000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const data = await client.get('ticket.customField:custom_field_' + fieldId);
      const value = data['ticket.customField:custom_field_' + fieldId];
      
      if (value === expectedValue) {
        console.log('✅ Campo tiene el valor esperado:', value);
        return true;
      }
      
      // Esperar 500ms antes de revisar de nuevo
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (err) {
      console.error('Error verificando campo:', err);
      return false;
    }
  }
  
  console.warn('⏱️ Timeout esperando campo');
  return false;
}

// Uso
const success = await waitForField('38620191063444', 'no_contesto', 10000);
if (success) {
  console.log('Campo está listo');
}
```

---

## 📚 REFERENCIA RÁPIDA DE PATHS

```javascript
// Ticket
'ticket'                                    // Ticket completo
'ticket.id'                                 // Solo ID
'ticket.subject'                            // Asunto
'ticket.status'                             // Status: 'new', 'open', 'pending', etc.
'ticket.priority'                           // Priority: 'low', 'normal', 'high', 'urgent'
'ticket.type'                               // Type: 'problem', 'incident', 'question', 'task'
'ticket.tags'                               // Array de tags
'ticket.description'                        // Descripción inicial

// Requester
'ticket.requester'                          // Requester completo
'ticket.requester.id'                       // ID del requester
'ticket.requester.name'                     // Nombre
'ticket.requester.email'                    // Email
'ticket.requester.phone'                    // Teléfono (puede ser null)

// Assignee
'ticket.assignee'                           // Agente asignado
'ticket.assignee.user.id'                   // ID del agente
'ticket.assignee.user.name'                 // Nombre del agente
'ticket.assignee.user.email'                // Email del agente

// Organization
'ticket.organization'                       // Organización del requester
'ticket.organization.id'                    // ID de la organización
'ticket.organization.name'                  // Nombre de la organización

// Custom Fields
'ticket.customField:custom_field_12345'    // Campo custom (reemplaza 12345 con tu Field ID)

// Current User
'currentUser'                               // Usuario actual (quien ve la app)
'currentUser.id'                            // ID del usuario actual
'currentUser.name'                          // Nombre
'currentUser.email'                         // Email
'currentUser.role'                          // Role: 'admin', 'agent', 'end-user'
'currentUser.locale'                        // Locale: 'es', 'en-US', etc.

// Account
'account'                                   // Cuenta de Zendesk
'account.subdomain'                         // Subdominio (ej: 'aplatam4961')
```

---

## 🎯 EJEMPLOS DE CASOS DE USO REALES

### Caso 1: Auto-asignar ticket al agente actual
```javascript
const currentUser = await client.get('currentUser');
const userId = currentUser.currentUser.id;

const ticket = await client.get('ticket');
const ticketId = ticket.ticket.id;

await client.request({
  url: `/api/v2/tickets/${ticketId}.json`,
  type: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({
    ticket: {
      assignee_id: userId
    }
  })
});

console.log('✅ Ticket auto-asignado');
```

### Caso 2: Agregar tag al ticket
```javascript
const ticket = await client.get('ticket');
const ticketId = ticket.ticket.id;
const currentTags = ticket.ticket.tags;

// Agregar nuevo tag
const newTags = [...currentTags, 'whatsapp_enviado'];

await client.request({
  url: `/api/v2/tickets/${ticketId}.json`,
  type: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({
    ticket: {
      tags: newTags
    }
  })
});

console.log('✅ Tag agregado');
```

### Caso 3: Cambiar status del ticket
```javascript
const ticket = await client.get('ticket');
const ticketId = ticket.ticket.id;

await client.request({
  url: `/api/v2/tickets/${ticketId}.json`,
  type: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({
    ticket: {
      status: 'solved'  // 'new', 'open', 'pending', 'hold', 'solved', 'closed'
    }
  })
});

console.log('✅ Status cambiado a solved');
```

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: "Cannot read property 'get' of undefined"
**Causa:** Usaste `client` antes de inicializarlo.
**Solución:** Espera a `app.registered`

### Error: "Promise never resolves"
**Causa:** El path no existe o no tienes permisos.
**Solución:** Verifica el path y los permisos en manifest.json

### Error: "Unexpected token < in JSON"
**Causa:** La API retornó HTML en lugar de JSON (error 404, 500, etc.)
**Solución:** Verifica la URL del request y maneja errores

### Error: "Field not found"
**Causa:** El Field ID es incorrecto.
**Solución:** Ve a Admin → Campos y verifica el ID correcto

---

¡Copia y pega lo que necesites! 🚀
