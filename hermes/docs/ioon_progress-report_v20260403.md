# IOON Stack — Reporte de Progreso
**Fecha:** 3 de abril de 2026  
**Sesión:** ~2 horas de trabajo

---

## Lo que logramos hoy

### 1. Backend de II-Agent levantado y funcional
El backend estaba caído por un problema en cadena: el `DATABASE_URL` y otros servicios apuntaban a `localhost`, pero los contenedores corren en redes Docker separadas (`coolify` vs `docker_default`).

**Lo que corregimos:**
- `DATABASE_URL`: de `postgres:postgres@localhost:5432/ii_agent` → `iiagent:iiagent@postgres:5432/iiagentdev`
- `REDIS_SESSION_URL`: de `redis://localhost:6379` → `redis://redis:6379`
- `STORAGE_MINIO_ENDPOINT`: de `localhost:9000` → `minio:9000`
- `COMPOSIO_API_KEY`: agregamos key dummy para evitar crash fatal
- Conectamos los contenedores postgres, redis y minio a la red `coolify`

**Archivo editado:** `/root/ii-agent/docker/.stack.env`

**Comando de arranque validado:**
```bash
export DATABASE_URL=postgresql+asyncpg://iiagent:iiagent@postgres:5432/iiagentdev
cd /root/ii-agent/docker
docker compose -f docker-compose.stack.yaml up -d backend
```

### 2. API REST descubierta y documentada
El backend expone Swagger en `http://localhost:8001/docs` con 27+ grupos de endpoints.

**Endpoint clave para la integración:**
```
POST /v1/chat/conversations
```
- Crea sesión automáticamente si no se pasa `session_id`
- Campos requeridos: `content` (string) y `model_id` (string)  
- Responde con SSE stream (Server-Sent Events)
- Requiere `Authorization: Bearer <JWT>`

**Otros endpoints relevantes:**
- `GET /v1/chat/conversations/{session_id}` — ver sesión
- `POST /v1/chat/conversations/{session_id}/advanced-mode` — modo agente completo
- `POST /v1/chat/conversations/{session_id}/stop` — cancelar ejecución
- `GET /v1/sessions` — listar sesiones
- `GET /v1/sessions/{session_id}/events` — ver eventos de ejecución

### 3. Autenticación JWT configurada
Creamos un usuario admin y generamos un JWT válido por 1 año.

**Usuario creado en PostgreSQL:**
- Email: `admin@ioon.mx`
- ID: `a0000000-0000-0000-0000-000000000001`
- Role: `admin`

**Estructura del JWT (TokenPayload):**
```json
{
  "user_id": "a0000000-0000-0000-0000-000000000001",
  "email": "admin@ioon.mx",
  "role": "admin",
  "type": "access",
  "exp": "<+365 días>",
  "iat": "<ahora>"
}
```

**Secret:** `ioon-secret-2026` (de `.stack.env`)  
**Token guardado en:** `/root/ii-agent-token.txt`

**Para regenerar el token:**
```bash
docker exec docker-backend-1 python3 -c "
import jwt, datetime
now=datetime.datetime.now(datetime.timezone.utc)
print(jwt.encode({
  'user_id':'a0000000-0000-0000-0000-000000000001',
  'email':'admin@ioon.mx',
  'role':'admin',
  'type':'access',
  'exp':now+datetime.timedelta(days=365),
  'iat':now
},'ioon-secret-2026',algorithm='HS256'))
"
```

### 4. Primera llamada API exitosa
```bash
curl -X POST http://localhost:8001/v1/chat/conversations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"content":"Hola","model_id":"claude-sonnet-4-5-20251101"}'
```

Respuesta confirmada:
```
event: session
data: {"status":"created","session_id":"f249a8cf-...","agent_type":"chat"}
```

---

## Lo que falta

### Paso 2: Proxy público para api.agent.ioon.mx (~10 min)
El DNS ya apunta a `89.167.93.139`, pero el proxy de Coolify (`ii-backend-proxy`) necesita redirigir al puerto 8001 del backend. Hay que verificar/configurar en Coolify que el servicio proxy tenga el dominio correcto y apunte al backend.

**Verificación:**
```bash
curl -sk https://api.agent.ioon.mx/health
```

### Paso 3a: Nodo de detección en n8n (~10 min)
Un nodo Code JS después de la transcripción que detecta palabras clave como "modo agente", "investiga", "crea un sitio", etc. y divide el flujo en dos ramas.

### Paso 3b: Nodo HTTP Request en n8n (~15 min)
Rama agente: un HTTP Request node que hace POST a `http://localhost:8001/v1/chat/conversations` (o via el proxy interno) con el JWT y el prompt transcrito.

**Datos para configurar en n8n:**
- URL: `http://10.0.1.X:8001/v1/chat/conversations` (IP interna del backend en red coolify)
- Header: `Authorization: Bearer <TOKEN>`
- Body: `{"content":"<prompt>","model_id":"claude-sonnet-4-5-20251101"}`
- Extraer: `session_id` de la respuesta

### Paso 3c: Explorar advanced-mode (~15 min)
El endpoint `POST /v1/chat/conversations/{session_id}/advanced-mode` activa el modo agente completo (con herramientas, sandbox, etc.). Necesitamos investigar su schema para tareas complejas.

### Paso 4: Respuesta en Telegram (~5 min)
Un nodo Telegram Send Message con:
```
🤖 Tarea enviada a II-Agent
🔗 https://agent.ioon.mx/session/<session_id>
```

### Paso 5: Test end-to-end (~10 min)
Enviar audio en Telegram diciendo "modo agente investiga las tendencias de IA en México" y verificar que:
1. Se transcribe correctamente
2. Se detecta "modo agente"
3. Se crea la sesión en II-Agent
4. Se devuelve el link en Telegram

---

## Datos críticos para la próxima sesión

| Dato | Valor |
|------|-------|
| VPS IP | `89.167.93.139` |
| Backend II-Agent | `localhost:8001` (desde el host) |
| Swagger docs | `http://localhost:8001/docs` |
| JWT secret | `ioon-secret-2026` |
| Token guardado | `/root/ii-agent-token.txt` |
| User ID | `a0000000-0000-0000-0000-000000000001` |
| model_id | `claude-sonnet-4-5-20251101` |
| Endpoint principal | `POST /v1/chat/conversations` |
| Compose file | `/root/ii-agent/docker/docker-compose.stack.yaml` |
| Env file | `/root/ii-agent/docker/.stack.env` |
| Arranque backend | `export DATABASE_URL=... && docker compose -f docker-compose.stack.yaml up -d backend` |

---

## Riesgo conocido
El `export DATABASE_URL=...` se pierde al cerrar la terminal SSH. Para hacerlo permanente:
```bash
echo 'export DATABASE_URL=postgresql+asyncpg://iiagent:iiagent@postgres:5432/iiagentdev' >> /root/.bashrc
```
O bien, el `.stack.env` ya lo tiene correcto; solo falta que el compose lo lea bien del env_file (ya funciona con el export previo al `docker compose up`).

**Tiempo estimado restante: ~60 minutos**
