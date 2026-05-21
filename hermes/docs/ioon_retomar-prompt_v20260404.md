# PROMPT PARA RETOMAR — Stack ioon sesión de activación

Copia y pega todo este texto como primer mensaje en una nueva conversación con Claude.

---

## CONTEXTO COMPLETO

Estoy construyendo el stack de **ioon**, una agencia de diseño web que opera vía Telegram + agentes IA. Mi VPS está en Hetzner (`89.167.93.139`), corro todo con Docker vía Coolify.

### Stack activo confirmado:
- `coolify.ioon.mx` — Coolify v4.0.0-beta.470 (puerto 8000 del host)
- `n8n.ioon.mx` — automatización (pipeline de voz funcionando)
- `agent.ioon.mx` — II-Agent frontend (puerto 1420→3000)
- `api.agent.ioon.mx` — II-Agent backend (puerto 8001→8000 interno) — **funciona vía HTTPS públicamente**
- `@ioon_agent_bot` — bot Telegram con pipeline de voz

### Pipeline de voz en n8n (funcionando):
Telegram → Get file → Code JS (prepara audio) → Gemini 2.5 Flash (transcripción) → Seleccionar Modelo (Haiku/Sonnet/Opus por comando de voz) → Claude API → Telegram

### II-Agent Backend — estado actual:
- **Contenedores:** `docker-backend-1`, `docker-postgres-1`, `docker-redis-1`, `docker-minio-1`, `docker-frontend-1`
- **Compose file:** `/root/ii-agent/docker/docker-compose.stack.yaml`
- **Env file:** `/root/ii-agent/docker/.stack.env`
- **Redes Docker:** Los contenedores de II-Agent están en `docker_default`. Para que Traefik y el proxy los alcancen, deben conectarse también a la red `coolify`. Esto se pierde al recrear contenedores.
- **Proxy:** `ii-backend-proxy` (alpine sleep infinity con labels de Traefik) apunta al backend en la red coolify

### Contenido actual de `.stack.env`:
```
ENVIRONMENT=local
DATABASE_URL=postgresql+asyncpg://iiagent:iiagent@postgres:5432/iiagentdev
REDIS_SESSION_URL=redis://redis:6379/0
REDIS_SESSION_ENABLED=true
STORAGE_PROVIDER=minio
STORAGE_BUCKET_NAME=ii-agent-dev
STORAGE_MINIO_ENDPOINT=minio:9000
STORAGE_MINIO_ACCESS_KEY=minioadmin
STORAGE_MINIO_SECRET_KEY=minioadmin
STORAGE_MINIO_SECURE=false
ACCESS_TOKEN_EXPIRE_MINUTES=43200
JWT_SECRET_KEY=ioon-secret-2026
OAUTHLIB_INSECURE_TRANSPORT=1
II_FRONTEND_URL=https://agent.ioon.mx
VITE_API_URL=https://agent.ioon.mx
MODEL_CONFIGS=[{"model_id":"claude-sonnet-4-5-20251101","provider":"Anthropic","api_key":"sk-ant-api03-0Z33JBNkQPyMQli6rX5k8LDWZWe4Y4D08rvIb2aw3bIjivmpHtO7mYld51G7401AzuSz_fo_thBrzXwrXqTp_Q-gy3ZbwAA"}]
BACKEND_PORT=8001
COMPOSIO_API_KEY=dummy-not-used
PGSSLMODE=disable
```

### Credenciales PostgreSQL (dentro del contenedor):
- User: `iiagent`, Password: `iiagent`, DB: `iiagentdev`
- Las credenciales funcionan con `psql` directo pero **asyncpg tiene problemas de autenticación SSL**

### Problema actual que necesitamos resolver:
El backend marca "healthy" en Docker (`docker ps` muestra "Up 45 minutes (healthy)") y el health check interno del contenedor pasa, pero `curl -s http://localhost:8001/health` desde el host devuelve vacío (HTTP 000, connection reset).

Hipótesis: El health check corre DENTRO del contenedor (`curl -fsS http://localhost:8000/health`) y funciona, pero la conexión desde el HOST al puerto mapeado 8001 falla intermitentemente.

**Siguiente diagnóstico a ejecutar:**
```bash
docker exec docker-backend-1 curl -s http://localhost:8000/health
```
Si esto responde `{"status":"ok"}`, el problema es el mapeo de puertos, no el backend.

### Comando para levantar el backend (requiere export previo):
```bash
cd /root/ii-agent/docker
export DATABASE_URL=postgresql+asyncpg://iiagent:iiagent@postgres:5432/iiagentdev
docker compose -f docker-compose.stack.yaml up -d --force-recreate backend
sleep 25
docker network connect coolify docker-backend-1 2>/dev/null
docker network connect coolify docker-postgres-1 2>/dev/null
docker network connect coolify docker-redis-1 2>/dev/null
docker network connect coolify docker-minio-1 2>/dev/null
```

### Autenticación JWT para la API:
- Usuario creado: `admin@ioon.mx`, ID: `a0000000-0000-0000-0000-000000000001`, role: `admin`
- JWT secret: `ioon-secret-2026`
- Token guardado en: `/root/ii-agent-token.txt`
- Para regenerar:
```bash
TOKEN=$(docker exec docker-backend-1 python3 -c "
import jwt, datetime
now=datetime.datetime.now(datetime.timezone.utc)
print(jwt.encode({'user_id':'a0000000-0000-0000-0000-000000000001','email':'admin@ioon.mx','role':'admin','type':'access','exp':now+datetime.timedelta(days=365),'iat':now},'ioon-secret-2026',algorithm='HS256'))
") && echo "$TOKEN" > /root/ii-agent-token.txt
```

### API de II-Agent — endpoints descubiertos:
- `POST /v1/chat/conversations` — crear sesión + enviar mensaje (SSE stream). Body: `{"content":"...", "model_id":"claude-sonnet-4-5-20251101"}`. Auth: `Bearer <JWT>`
- `GET /v1/chat/conversations/{session_id}` — ver sesión
- `POST /v1/chat/conversations/{session_id}/advanced-mode` — modo agente
- `POST /v1/chat/conversations/{session_id}/stop` — cancelar
- `GET /v1/sessions` — listar sesiones
- Swagger: `http://localhost:8001/docs` (o `https://api.agent.ioon.mx/docs`)

### Ya probado exitosamente (antes de los reinicios):
```bash
curl -X POST http://localhost:8001/v1/chat/conversations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"content":"Hola","model_id":"claude-sonnet-4-5-20251101"}'
```
Respuesta: `event: session` con `session_id` creado exitosamente.

---

## RUTA CRÍTICA — lo que falta

### Paso inmediato: Resolver conexión host→backend
1. Verificar `docker exec docker-backend-1 curl -s http://localhost:8000/health`
2. Si funciona internamente pero no desde host, revisar mapeo de puertos y posible conflicto
3. Confirmar `curl -sk https://api.agent.ioon.mx/health` funciona

### Paso 3: Configurar n8n (~20 min)
- Nodo Code JS para detectar "modo agente" en transcripción
- Nodo HTTP Request: POST a `https://api.agent.ioon.mx/v1/chat/conversations` con JWT
- Extraer `session_id` de la respuesta SSE

### Paso 4: Respuesta Telegram (~5 min)
- Nodo Telegram Send Message con link `https://agent.ioon.mx/session/{session_id}`

### Paso 5: Notion dashboard (~15 min)
- Crear DB en Notion: fecha, prompt, modelo, status, session_id, link
- Conectar nodo de n8n para registrar cada tarea

### Paso 6: Figma + Penpot como fuentes de diseño
- Figma: diseño manual (humano)
- Penpot: self-hosted en Coolify, API accesible por agentes para leer moodboards
- Kittl: branding/tipografía como referencia visual

### Paso 7: Mautic self-hosted
- Desplegar en Coolify como `mautic.ioon.mx`
- Conectar con n8n para campañas post-entrega de sitios

### Tech stack para generación de sitios (lo que II-Agent produce):
Astro + React + Tailwind (base universal), Framer Motion (animaciones), Three.js (3D/premium), Processing (arte generativo), Fontjoy (pares tipográficos)

### Perfiles de cliente ioon:
- Startup/SaaS: Astro + React + Tailwind + Mautic
- Restaurante/retail: Landing + Framer Motion + Mautic promos
- Marca premium: Three.js + Processing + experiencia inmersiva
- Portafolio/creativo: Processing + Astro + animaciones custom
- E-commerce: React + Tailwind + Mautic carrito

---

## INSTRUCCIONES PARA CLAUDE

Estoy conectado por SSH a `root@89.167.93.139`. Guíame paso a paso con comandos que pueda copiar y pegar directamente en la terminal. Trabajo con capturas de pantalla del resultado. Empecemos resolviendo la conexión del backend y luego seguimos con n8n.
