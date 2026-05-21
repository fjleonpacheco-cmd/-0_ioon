# IOON Stack — Plan de Activación Completo

## Estado actual
- ✅ `coolify.ioon.mx` — Coolify v4.0.0-beta.470
- ✅ `n8n.ioon.mx` — Pipeline de voz funcionando
- ✅ `agent.ioon.mx` — Frontend II-Agent (puerto 3000)
- ✅ `@ioon_agent_bot` — Bot Telegram con pipeline de voz
- ⏳ `api.agent.ioon.mx` — Backend II-Agent (puerto 8000) — **pendiente verificar**

---

## Paso 1: Verificar `api.agent.ioon.mx`

Ejecuta esto via SSH en tu VPS (`89.167.93.139`):

```bash
# 1A. Verificar DNS
dig api.agent.ioon.mx +short
# Debe devolver: 89.167.93.139

# 1B. Verificar que el backend responde internamente
curl -s http://10.0.1.8:8000/health | jq .
# o bien:
curl -s http://10.0.2.6:8000/health | jq .

# 1C. Verificar via dominio público
curl -sk https://api.agent.ioon.mx/health | jq .

# 1D. Verificar Swagger docs
curl -sk https://api.agent.ioon.mx/docs -o /dev/null -w "%{http_code}"
# Debe devolver: 200

# 1E. Si NO responde, revisar el proxy de Coolify:
docker ps | grep ii-backend-proxy
docker logs $(docker ps -q -f name=ii-backend-proxy) --tail 50

# 1F. Verificar Traefik labels del proxy
docker inspect $(docker ps -q -f name=ii-backend-proxy) | jq '.[0].Config.Labels' | grep traefik
```

### Si el proxy no tiene las labels correctas de Traefik:

Necesitas verificar en Coolify que el servicio `ii-backend-proxy` tenga configurado:
- Dominio: `api.agent.ioon.mx`
- Puerto: `8000`
- HTTPS habilitado

---

## Paso 2: Descubrir endpoints de II-Agent

II-Agent es FastAPI + Socket.IO. La ejecución de agentes ocurre principalmente por **Socket.IO**, no por REST simple.

### 2A. Explorar la API REST completa

```bash
# Obtener el esquema OpenAPI completo
curl -sk https://api.agent.ioon.mx/openapi.json | jq '.paths | keys'

# Buscar endpoints de sesiones
curl -sk https://api.agent.ioon.mx/openapi.json | jq '.paths | to_entries[] | select(.key | contains("session")) | .key'

# Buscar endpoints de chat
curl -sk https://api.agent.ioon.mx/openapi.json | jq '.paths | to_entries[] | select(.key | contains("chat")) | .key'

# Buscar endpoints de tasks/runs
curl -sk https://api.agent.ioon.mx/openapi.json | jq '.paths | to_entries[] | select(.key | contains("task") or contains("run")) | .key'
```

### 2B. Flujo esperado para crear una tarea vía API

Según la arquitectura documentada de II-Agent, el flujo probable es:

```
1. POST /api/sessions/        → Crear sesión nueva → obtener session_id
2. Socket.IO connect           → Conectar al namespace con auth
3. Socket.IO emit "query"      → Enviar la tarea al agente
4. Socket.IO listen events     → Recibir streaming de resultados
```

**Alternativa REST (si existe endpoint de chat):**
```
1. POST /api/sessions/        → Crear sesión
2. POST /api/chat/messages/   → Enviar mensaje (modo agent)
3. GET  /api/sessions/{id}    → Polling del resultado
```

### 2C. Script de descubrimiento completo

```bash
#!/bin/bash
# Guardar como: /root/discover-ii-agent-api.sh
# Ejecutar: bash /root/discover-ii-agent-api.sh

BASE="http://10.0.1.8:8000"

echo "=== 1. Health check ==="
curl -s $BASE/health | jq .

echo ""
echo "=== 2. Todos los endpoints ==="
curl -s $BASE/openapi.json | jq '.paths | keys[]' 2>/dev/null || echo "No OpenAPI disponible"

echo ""
echo "=== 3. Endpoints de sesiones ==="
curl -s $BASE/openapi.json | jq '[.paths | to_entries[] | select(.key | test("session|chat|task|run|agent")) | {path: .key, methods: (.value | keys)}]' 2>/dev/null

echo ""
echo "=== 4. Verificar Socket.IO ==="
curl -s "$BASE/socket.io/?EIO=4&transport=polling" | head -c 200
echo ""

echo ""
echo "=== 5. Auth endpoints ==="
curl -s $BASE/openapi.json | jq '[.paths | to_entries[] | select(.key | test("auth|login|token|key")) | {path: .key, methods: (.value | keys)}]' 2>/dev/null
```

---

## Paso 3: Nodo n8n — Detección "modo agente"

### 3A. Lógica de detección en el nodo Code JS existente

Después del nodo de transcripción (Gemini 2.5 Flash), agrega un nodo **Code (JavaScript)**:

```javascript
// Nodo: "Detectar Modo"
// Input: transcripción de voz
const texto = $input.first().json.transcription.toLowerCase();

// Palabras clave para activar modo agente
const triggerAgente = [
  'modo agente',
  'agente',
  'investiga',
  'investigar',
  'crea un sitio',
  'genera un proyecto',
  'desarrolla',
  'deep research',
  'analiza a fondo',
  'hazme una presentación',
  'crea slides'
];

const esAgente = triggerAgente.some(kw => texto.includes(kw));

// Limpiar el prompt (quitar la palabra trigger)
let promptLimpio = texto;
triggerAgente.forEach(kw => {
  promptLimpio = promptLimpio.replace(kw, '').trim();
});

return [{
  json: {
    modo: esAgente ? 'agente' : 'chat',
    prompt: esAgente ? promptLimpio : texto,
    textoOriginal: texto
  }
}];
```

### 3B. Switch Node

Después del Code, usa un **Switch** node:
- **Condición 1**: `{{ $json.modo }}` equals `agente` → Rama II-Agent
- **Default**: → Rama Claude API (pipeline existente)

### 3C. Rama II-Agent — Crear tarea via HTTP

> **NOTA IMPORTANTE:** Necesitas primero ejecutar el Paso 2 para descubrir los endpoints exactos. 
> El siguiente código es un template que deberás ajustar con los endpoints reales.

**Opción A: Si hay endpoint REST para chat/mensajes**

Nodo **HTTP Request**:
```
Método: POST
URL: http://10.0.1.8:8000/api/sessions/
Headers:
  Content-Type: application/json
  Authorization: Bearer {{tu_token_o_api_key}}
Body (JSON):
{
  "title": "Tarea desde Telegram"
}
```

Seguido de otro **HTTP Request**:
```
Método: POST  
URL: http://10.0.1.8:8000/api/chat/messages/
Headers:
  Content-Type: application/json
Body (JSON):
{
  "session_id": "{{ $json.id }}",
  "content": "{{ $('Detectar Modo').item.json.prompt }}",
  "mode": "agent"
}
```

**Opción B: Si solo funciona via Socket.IO**

Nodo **Code (JavaScript)** con socket.io-client:

```javascript
// NOTA: Necesitas instalar socket.io-client en n8n
// En el contenedor de n8n: npm install socket.io-client

const { io } = require('socket.io-client');

const prompt = $input.first().json.prompt;

return new Promise((resolve, reject) => {
  const socket = io('http://10.0.1.8:8000', {
    transports: ['websocket'],
    auth: {
      // Ajustar según descubrimiento de auth
      token: 'TU_TOKEN_AQUI'
    }
  });

  let sessionId = null;
  let resultado = '';

  socket.on('connect', () => {
    // Crear sesión y enviar query
    socket.emit('query', {
      content: prompt,
      session_id: null, // nuevo
      mode: 'agent'
    });
  });

  // Escuchar eventos del agente
  socket.on('agent_event', (data) => {
    if (data.type === 'message') {
      resultado += data.content || '';
    }
    if (data.session_id) {
      sessionId = data.session_id;
    }
  });

  socket.on('agent_complete', (data) => {
    socket.disconnect();
    resolve([{
      json: {
        session_id: sessionId || data?.session_id,
        resultado: resultado,
        status: 'completado',
        link: `https://agent.ioon.mx/session/${sessionId}`
      }
    }]);
  });

  // Timeout de seguridad (3 min)
  setTimeout(() => {
    socket.disconnect();
    resolve([{
      json: {
        session_id: sessionId,
        resultado: 'Tarea enviada (procesando en background)',
        status: 'en_proceso',
        link: sessionId 
          ? `https://agent.ioon.mx/session/${sessionId}` 
          : 'https://agent.ioon.mx'
      }
    }]);
  }, 10000); // 10 seg para obtener session_id, no esperar toda la ejecución
});
```

---

## Paso 4: Responder en Telegram con link

Nodo **Telegram → Send Message** después de la rama agente:

```
Chat ID: {{ $('Telegram Trigger').item.json.message.chat.id }}

Text:
🤖 *Tarea enviada a II-Agent*

📝 _{{ $('Detectar Modo').item.json.prompt }}_

🔗 [Ver resultado]({{ $json.link }})

Estado: {{ $json.status === 'completado' ? '✅ Completado' : '⏳ Procesando...' }}

Parse Mode: MarkdownV2
```

---

## Pipeline Final (Diagrama)

```
Telegram (voz)
    │
    ▼
Get File → Code JS (prepara audio) → Gemini 2.5 Flash (transcripción)
    │
    ▼
Detectar Modo (Code JS)
    │
    ├── modo: "chat" ──────► Seleccionar Modelo → Claude API → Telegram (texto)
    │
    └── modo: "agente" ───► Crear Sesión II-Agent → Enviar Query → Telegram (link)
```

---

## Orden de ejecución recomendado

| # | Acción | Tiempo est. |
|---|--------|-------------|
| 1 | SSH → ejecutar script diagnóstico (Paso 1) | 5 min |
| 2 | Ejecutar descubrimiento API (Paso 2C) | 5 min |
| 3 | Anotar endpoints reales y ajustar Paso 3C | 10 min |
| 4 | Crear nodos en n8n (Pasos 3A, 3B, 3C) | 15 min |
| 5 | Agregar respuesta Telegram (Paso 4) | 5 min |
| 6 | Test end-to-end: enviar audio "modo agente investiga X" | 5 min |

**Total estimado: ~45 minutos**

---

## Notas de seguridad

- La comunicación n8n → ii-agent es interna (red Docker de Coolify), no sale a internet
- Si ii-agent requiere autenticación, verifica si hay API keys en `/root/ii-agent/.env`
- El endpoint `/docs` de FastAPI puede exponerse públicamente para debugging pero considéralo temporal
