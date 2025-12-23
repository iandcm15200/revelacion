# 🎯 ZAF AVANZADO - CASOS ESPECIALES Y TÉCNICAS AVANZADAS

## 📋 ÍNDICE
1. [Gestión de Estado Compleja](#gestión-de-estado)
2. [Performance y Optimización](#performance)
3. [Manejo de Errores Avanzado](#errores-avanzados)
4. [Casos Edge](#casos-edge)
5. [Testing y Debugging](#testing)
6. [Seguridad](#seguridad)

---

## 1. GESTIÓN DE ESTADO COMPLEJA {#gestión-de-estado}

### Patrón: Store Centralizado

Cuando tu app se vuelve compleja, necesitas un store para manejar el estado.

```javascript
// store.js
const Store = (function() {
  let state = {
    ticket: null,
    requester: null,
    customFields: {},
    settings: {},
    isLoading: false,
    errors: []
  };
  
  const listeners = {};
  
  return {
    // Obtener estado
    get(key) {
      return key ? state[key] : state;
    },
    
    // Actualizar estado
    set(key, value) {
      const oldValue = state[key];
      state[key] = value;
      
      // Notificar listeners
      if (listeners[key]) {
        listeners[key].forEach(callback => {
          callback(value, oldValue);
        });
      }
    },
    
    // Escuchar cambios
    subscribe(key, callback) {
      if (!listeners[key]) {
        listeners[key] = [];
      }
      listeners[key].push(callback);
      
      // Retornar función para unsuscribe
      return () => {
        listeners[key] = listeners[key].filter(cb => cb !== callback);
      };
    },
    
    // Reset
    reset() {
      state = {
        ticket: null,
        requester: null,
        customFields: {},
        settings: {},
        isLoading: false,
        errors: []
      };
    }
  };
})();

// Uso:
Store.set('ticket', ticketData);
Store.set('isLoading', true);

const unsubscribe = Store.subscribe('ticket', (newTicket, oldTicket) => {
  console.log('Ticket cambió:', oldTicket?.id, '→', newTicket?.id);
  updateUI();
});

// Cleanup
unsubscribe();
```

### Patrón: Cache con Expiración

```javascript
const Cache = (function() {
  const cache = new Map();
  const DEFAULT_TTL = 60000; // 1 minuto
  
  return {
    set(key, value, ttl = DEFAULT_TTL) {
      const expires = Date.now() + ttl;
      cache.set(key, { value, expires });
    },
    
    get(key) {
      const item = cache.get(key);
      
      if (!item) return null;
      
      // Verificar si expiró
      if (Date.now() > item.expires) {
        cache.delete(key);
        return null;
      }
      
      return item.value;
    },
    
    has(key) {
      return this.get(key) !== null;
    },
    
    clear() {
      cache.clear();
    },
    
    size() {
      return cache.size;
    }
  };
})();

// Uso con ZAF:
async function getTicketCached(ticketId) {
  const cacheKey = `ticket_${ticketId}`;
  
  // Intentar cache primero
  const cached = Cache.get(cacheKey);
  if (cached) {
    console.log('✅ Usando ticket desde cache');
    return cached;
  }
  
  // Si no está en cache, obtener de ZAF
  console.log('🔄 Obteniendo ticket de ZAF...');
  const data = await client.get('ticket');
  const ticket = data.ticket;
  
  // Guardar en cache
  Cache.set(cacheKey, ticket, 30000); // 30 segundos
  
  return ticket;
}
```

---

## 2. PERFORMANCE Y OPTIMIZACIÓN {#performance}

### Técnica 1: Debouncing

Evita hacer requests excesivos cuando el usuario está escribiendo.

```javascript
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Uso: Buscar mientras el usuario escribe
const searchInput = document.getElementById('search');

const performSearch = debounce(async (query) => {
  console.log('Buscando:', query);
  
  const response = await client.request({
    url: `/api/v2/search.json?query=${encodeURIComponent(query)}`,
    type: 'GET'
  });
  
  displayResults(response.results);
}, 500); // Esperar 500ms después de que deje de escribir

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value);
});
```

### Técnica 2: Throttling

Limita la frecuencia de ejecución de una función.

```javascript
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Uso: Scroll infinito
const container = document.getElementById('list');

const handleScroll = throttle(() => {
  if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
    console.log('Cerca del final, cargar más...');
    loadMoreItems();
  }
}, 200); // Máximo cada 200ms

container.addEventListener('scroll', handleScroll);
```

### Técnica 3: Batch Requests

Agrupa múltiples requests en uno solo.

```javascript
class RequestBatcher {
  constructor(delay = 100) {
    this.delay = delay;
    this.queue = [];
    this.timeout = null;
  }
  
  add(path) {
    return new Promise((resolve, reject) => {
      this.queue.push({ path, resolve, reject });
      
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      
      this.timeout = setTimeout(() => {
        this.flush();
      }, this.delay);
    });
  }
  
  async flush() {
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0);
    
    try {
      // Hacer todos los requests en paralelo
      const results = await Promise.all(
        batch.map(item => client.get(item.path))
      );
      
      // Resolver cada promesa
      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
      
    } catch (error) {
      // Rechazar todas las promesas
      batch.forEach(item => {
        item.reject(error);
      });
    }
  }
}

// Uso:
const batcher = new RequestBatcher(100);

// Múltiples calls que se agrupan automáticamente
const ticket = await batcher.add('ticket');
const requester = await batcher.add('ticket.requester');
const user = await batcher.add('currentUser');

// Solo se hace 1 batch request con los 3 paths
```

### Técnica 4: Lazy Loading

Cargar datos solo cuando se necesitan.

```javascript
class LazyField {
  constructor(fieldId) {
    this.fieldId = fieldId;
    this.value = null;
    this.loaded = false;
    this.loading = false;
    this.promise = null;
  }
  
  async get() {
    // Si ya está cargado, retornar inmediatamente
    if (this.loaded) {
      return this.value;
    }
    
    // Si está cargando, esperar a que termine
    if (this.loading) {
      return this.promise;
    }
    
    // Cargar por primera vez
    this.loading = true;
    this.promise = this.load();
    
    try {
      this.value = await this.promise;
      this.loaded = true;
      return this.value;
    } finally {
      this.loading = false;
      this.promise = null;
    }
  }
  
  async load() {
    const data = await client.get('ticket.customField:custom_field_' + this.fieldId);
    return data['ticket.customField:custom_field_' + this.fieldId];
  }
  
  invalidate() {
    this.loaded = false;
    this.value = null;
  }
}

// Uso:
const nivelAcademico = new LazyField('38620293558164');

// Primera vez: hace request
const valor1 = await nivelAcademico.get(); // Request a ZAF

// Segunda vez: usa cache
const valor2 = await nivelAcademico.get(); // No request

// Invalidar y recargar
nivelAcademico.invalidate();
const valor3 = await nivelAcademico.get(); // Nuevo request
```

---

## 3. MANEJO DE ERRORES AVANZADO {#errores-avanzados}

### Patrón: Retry con Backoff Exponencial

```javascript
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Última iteración, no reintentar
      if (i === maxRetries - 1) {
        break;
      }
      
      // Calcular delay con backoff exponencial
      const delay = baseDelay * Math.pow(2, i);
      console.log(`⚠️ Intento ${i + 1} falló, reintentando en ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

// Uso:
try {
  const ticket = await retryWithBackoff(async () => {
    return await client.get('ticket');
  }, 3, 1000);
  
  console.log('✅ Ticket obtenido:', ticket);
  
} catch (error) {
  console.error('❌ Falló después de 3 intentos:', error);
}
```

### Patrón: Circuit Breaker

Previene hacer requests a un servicio que está fallando constantemente.

```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async execute(fn) {
    // Si el circuito está abierto
    if (this.state === 'OPEN') {
      // Verificar si es tiempo de intentar de nuevo
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      
      // Pasar a HALF_OPEN para intentar
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      
      // Éxito: resetear
      this.onSuccess();
      return result;
      
    } catch (error) {
      // Fallo: incrementar contador
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
      console.warn('⚠️ Circuit breaker OPEN por', this.timeout, 'ms');
    }
  }
}

// Uso:
const breaker = new CircuitBreaker(3, 30000); // 3 fallos, 30 seg timeout

async function getTicketSafe() {
  try {
    return await breaker.execute(async () => {
      return await client.get('ticket');
    });
  } catch (error) {
    if (error.message === 'Circuit breaker is OPEN') {
      console.log('⚠️ Servicio temporalmente no disponible');
      return null;
    }
    throw error;
  }
}
```

---

## 4. CASOS EDGE {#casos-edge}

### Caso 1: Ticket Nuevo (Sin ID aún)

```javascript
async function handleNewTicket() {
  try {
    const ticket = await client.get('ticket');
    
    // En un ticket nuevo, el ID puede ser "new"
    if (ticket.ticket.id === 'new') {
      console.log('📝 Ticket nuevo (no guardado aún)');
      
      // No puedes hacer requests REST API sin ID
      // Solo puedes trabajar con datos locales
      
      // Esperar a que se guarde
      client.on('ticket.save', async function() {
        console.log('✅ Ticket guardado, ahora tiene ID');
        
        // Obtener ticket actualizado
        const savedTicket = await client.get('ticket');
        console.log('Ticket ID:', savedTicket.ticket.id);
        
        // Ahora puedes hacer requests REST API
        await doSomethingWithTicket(savedTicket.ticket.id);
      });
      
      return;
    }
    
    // Ticket existente
    console.log('✅ Ticket existente:', ticket.ticket.id);
    await doSomethingWithTicket(ticket.ticket.id);
    
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Caso 2: Campos Custom No Poblados

```javascript
async function getFieldWithFallback(fieldId, defaultValue = null) {
  try {
    const data = await client.get('ticket.customField:custom_field_' + fieldId);
    const value = data['ticket.customField:custom_field_' + fieldId];
    
    // Verificar si está vacío
    if (value === null || value === undefined || value === '') {
      console.log('⚠️ Campo vacío, usando valor por defecto');
      return defaultValue;
    }
    
    return value;
    
  } catch (error) {
    console.error('Error obteniendo campo:', error);
    return defaultValue;
  }
}

// Uso:
const nivelAcademico = await getFieldWithFallback('38620293558164', 'licenciatura');
console.log('Nivel:', nivelAcademico); // "maestría" o "licenciatura" (default)
```

### Caso 3: Múltiples Idiomas

```javascript
const i18n = {
  es: {
    send: 'Enviar',
    cancel: 'Cancelar',
    success: 'Operación exitosa',
    error: 'Ocurrió un error'
  },
  en: {
    send: 'Send',
    cancel: 'Cancel',
    success: 'Operation successful',
    error: 'An error occurred'
  }
};

async function t(key) {
  // Obtener idioma del usuario actual
  const user = await client.get('currentUser');
  const locale = user.currentUser.locale || 'en';
  
  // Extraer idioma principal (es de es-ES, en de en-US)
  const lang = locale.split('-')[0];
  
  // Buscar traducción
  return i18n[lang]?.[key] || i18n['en'][key] || key;
}

// Uso:
const sendButton = document.getElementById('send-btn');
sendButton.textContent = await t('send');

client.invoke('notify', await t('success'), 'notice');
```

### Caso 4: Rate Limiting

```javascript
class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }
  
  async acquire() {
    const now = Date.now();
    
    // Limpiar requests antiguos
    this.requests = this.requests.filter(time => 
      now - time < this.windowMs
    );
    
    // Verificar si excedimos el límite
    if (this.requests.length >= this.maxRequests) {
      // Calcular cuánto esperar
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      
      console.log(`⏳ Rate limit, esperando ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Reintentar
      return this.acquire();
    }
    
    // Registrar este request
    this.requests.push(now);
  }
}

// Uso: Máximo 10 requests por minuto
const limiter = new RateLimiter(10, 60000);

async function safeGet(path) {
  await limiter.acquire();
  return await client.get(path);
}

// Hacer muchos requests sin exceder el límite
for (let i = 0; i < 20; i++) {
  const ticket = await safeGet('ticket');
  console.log('Request', i + 1, 'completado');
}
```

---

## 5. TESTING Y DEBUGGING {#testing}

### Debug Helper

```javascript
const Debug = (function() {
  const logs = [];
  const MAX_LOGS = 100;
  
  return {
    log(...args) {
      const timestamp = new Date().toISOString();
      const entry = {
        timestamp,
        level: 'log',
        args
      };
      
      logs.push(entry);
      if (logs.length > MAX_LOGS) {
        logs.shift();
      }
      
      console.log(`[${timestamp}]`, ...args);
    },
    
    error(...args) {
      const timestamp = new Date().toISOString();
      const entry = {
        timestamp,
        level: 'error',
        args
      };
      
      logs.push(entry);
      if (logs.length > MAX_LOGS) {
        logs.shift();
      }
      
      console.error(`[${timestamp}]`, ...args);
    },
    
    export() {
      return JSON.stringify(logs, null, 2);
    },
    
    download() {
      const data = this.export();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `debug-${Date.now()}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
    }
  };
})();

// Uso:
Debug.log('App iniciada');
Debug.error('Error en request', error);

// Descargar logs
document.getElementById('debug-btn').addEventListener('click', () => {
  Debug.download();
});
```

### Mock Client para Testing

```javascript
class MockZAFClient {
  constructor() {
    this.data = {
      ticket: {
        id: 12345,
        subject: 'Test ticket',
        status: 'open'
      },
      'ticket.requester': {
        id: 67890,
        name: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890'
      }
    };
    
    this.events = {};
  }
  
  get(path) {
    return Promise.resolve({
      [path]: this.data[path],
      errors: {}
    });
  }
  
  set(path, value) {
    this.data[path] = value;
    return Promise.resolve();
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  trigger(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  request(options) {
    console.log('Mock request:', options);
    return Promise.resolve({
      ticket: this.data.ticket
    });
  }
  
  metadata() {
    return Promise.resolve({
      settings: {
        test_setting: 'test_value'
      },
      installationId: 123
    });
  }
}

// Uso en testing:
const client = new MockZAFClient();

// Simular inicialización
setTimeout(() => {
  client.trigger('app.registered');
}, 100);

// Tu código se ejecuta normal
client.on('app.registered', async () => {
  const ticket = await client.get('ticket');
  console.log('Ticket:', ticket);
});
```

---

## 6. SEGURIDAD {#seguridad}

### Validación de Inputs

```javascript
function validatePhone(phone) {
  if (!phone) return false;
  
  // Solo números, +, espacios, guiones, paréntesis
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  
  if (!phoneRegex.test(phone)) {
    console.error('❌ Teléfono contiene caracteres inválidos');
    return false;
  }
  
  // Extraer solo números
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Verificar longitud (mínimo 10 dígitos)
  if (digitsOnly.length < 10) {
    console.error('❌ Teléfono muy corto');
    return false;
  }
  
  return true;
}

function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Uso:
const userInput = '<script>alert("XSS")</script>';
const safe = sanitizeHTML(userInput);
console.log(safe); // &lt;script&gt;alert("XSS")&lt;/script&gt;
```

### Secrets Management

```javascript
// ❌ NUNCA hagas esto:
const API_KEY = 'sk_live_12345'; // Hardcoded en el código

// ✅ HAZ esto:
// 1. Guarda el API key en la configuración de la app (manifest.json)
// 2. Accede vía settings:

async function getAPIKey() {
  const metadata = await client.metadata();
  return metadata.settings.api_key;
}

// Uso:
const apiKey = await getAPIKey();

// Nunca logees el API key completo
console.log('API Key:', apiKey.substring(0, 5) + '...');
```

### Content Security Policy

```html
<!-- En iframe.html, agregar meta tag: -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://assets.zendesk.com; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://api.zendesk.com;">
```

---

## 🎯 RESUMEN DE TÉCNICAS AVANZADAS

| Técnica | Uso | Beneficio |
|---------|-----|-----------|
| Store Centralizado | Estado complejo | Organización, debugging |
| Cache con TTL | Reducir requests | Performance |
| Debouncing | Input del usuario | Menos requests |
| Throttling | Eventos frecuentes | Performance |
| Batch Requests | Múltiples gets | Eficiencia |
| Lazy Loading | Datos bajo demanda | Tiempo de carga |
| Retry Backoff | Fallos temporales | Confiabilidad |
| Circuit Breaker | Fallos persistentes | Estabilidad |
| Rate Limiting | Control de requests | Evitar 429 errors |
| Mock Client | Testing | Desarrollo |

---

¡Estas técnicas te llevarán al siguiente nivel! 🚀
