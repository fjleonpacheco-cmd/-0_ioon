# IOON Stack — Plan de Activación v2

> **Fecha:** 20 abril 2026
> **Propósito:** Guía de activación de las fases pendientes del stack ioon.

---

## Resumen de Estado

### ✅ Completado
- Coolify, n8n, II-Agent (frontend + backend + DB) desplegados y funcionales
- Pipeline de voz Telegram → n8n → Gemini → Claude/II-Agent operativo
- Google OAuth funcional en `agent.ioon.mx`
- JWT alineado con usuario de Google (`fj.leonpacheco@gmail.com`)
- Backend en red `coolify` de forma permanente (compose actualizado)
- Hostname de postgres con alias único `iiagent-db` (sin colisión con Coolify)

### ⬜ Pendiente
1. Verificar visibilidad de sesiones Telegram en frontend (migración de conversaciones)
2. Desplegar Hoarder (Fase 1b)
3. Glosario de Autor (Fase 1c)
4. CMS + RAG (Fase 2)
5. Generación de prototipos + deploy automático (Fase 3)

---

## Paso 0: Migrar conversaciones existentes al usuario correcto

Las sesiones creadas antes del cambio de JWT quedaron bajo `admin@ioon.mx`. Para migrarlas:

```bash
# 1. Descubrir el nombre exacto de la tabla de conversaciones
docker exec docker-postgres-1 psql -U iiagent -d iiagentdev -c "\dt"

# 2. Buscar tablas relacionadas con chats/sessions
docker exec docker-postgres-1 psql -U iiagent -d iiagentdev -c "\dt" | grep -iE "chat|session|conv|thread"

# 3. Una vez identificada la tabla (ej: chat_conversations), migrar:
docker exec docker-postgres-1 psql -U iiagent -d iiagentdev -c "
UPDATE <nombre_tabla> 
SET user_id = 'f4323736-8bbd-4e49-b1fa-d43461b0cc87' 
WHERE user_id = 'a0000000-0000-0000-0000-000000000001';
"

# 4. Verificar
docker exec docker-postgres-1 psql -U iiagent -d iiagentdev -c "
SELECT user_id, count(*) FROM <nombre_tabla> GROUP BY user_id;
"
```

Después recargar `agent.ioon.mx` y verificar que los chats aparecen en el sidebar.

---

## Fase 1b: Desplegar Hoarder

**Objetivo:** Tener un marcador visual OSS donde guardar inspiración de Pinterest y otras fuentes, accesible en `hoarder.ioon.mx`.

### 1. Crear registro DNS
En GoDaddy, agregar registro A:
```
hoarder → 89.167.93.139
```

### 2. Desplegar en Coolify
Hoarder tiene imagen Docker oficial. En Coolify:
- Crear nuevo servicio → Docker Compose
- Imagen: `hoarder/hoarder:latest` (o la más reciente del repo)
- Configurar dominio: `hoarder.ioon.mx`
- Habilitar HTTPS con Let's Encrypt
- Variables de entorno según documentación de Hoarder

### 3. Alternativa: Compose manual

```yaml
# /root/hoarder/docker-compose.yaml
services:
  hoarder:
    image: ghcr.io/hoarder-app/hoarder:latest
    restart: unless-stopped
    ports:
      - "3100:3000"
    environment:
      - NEXTAUTH_SECRET=ioon-hoarder-secret-2026
      - NEXTAUTH_URL=https://hoarder.ioon.mx
      - DATA_DIR=/data
    volumes:
      - hoarder-data:/data
    networks:
      - default
      - coolify
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.hoarder.entrypoints=https"
      - "traefik.http.routers.hoarder.rule=Host(`hoarder.ioon.mx`)"
      - "traefik.http.routers.hoarder.tls=true"
      - "traefik.http.routers.hoarder.tls.certresolver=letsencrypt"
      - "traefik.http.services.hoarder.loadbalancer.server.port=3000"

volumes:
  hoarder-data:

networks:
  coolify:
    external: true
```

> **NOTA:** Verificar la documentación actual de Hoarder antes de desplegar. Puede requerir servicios adicionales (DB, Meilisearch, Chrome para screenshots). Buscar en `https://github.com/hoarder-app/hoarder` la configuración completa.

### 4. Workflow n8n: Pinterest → Hoarder
- Trigger: Cron (diario) o webhook manual
- Nodo HTTP Request: Scrape pins de tableros de Pinterest
- Nodo HTTP Request: POST a Hoarder API para guardar cada bookmark
- Nodo opcional: Análisis estético con Claude (preparación para Fase 1c)

---

## Fase 1c: Glosario de Autor

**Objetivo:** Definir el vocabulario estético de ioon como markdown que se inyecta en el contexto del agente.

### 1. Crear el glosario
Archivo markdown con la estética de autor de Francisco:
```
/root/ii-agent/glosario-de-autor.md
```

Contenido ejemplo:
```markdown
# Glosario de Autor — ioon

## Principios Estéticos
- Minimalismo editorial: mucho espacio en blanco, jerarquía tipográfica clara
- Tipografía: serif para títulos (Fraunces, Playfair), sans para cuerpo (DM Sans, Inter)
- Paleta restringida: máximo 3 colores por proyecto
- Fotografía: luz natural, composición con regla de tercios

## Vocabulario
- "Respirar" = espacio en blanco generoso
- "Peso visual" = contraste y jerarquía
- "Tensión" = asimetría intencional
- "Silencio" = áreas sin contenido que dan importancia a lo que sí hay

## Anti-patrones (evitar siempre)
- Gradientes genéricos, sombras excesivas
- Tipografía decorativa sin propósito
- Stock photography genérica
- Layouts simétricos sin tensión
```

### 2. Inyectar en el sistema prompt del agente
Agregar el glosario como system prompt o contexto del agente en la configuración de II-Agent. Investigar dónde se configura el system prompt del backend.

---

## Fase 2: Directus + AnythingLLM

**Objetivo:** CMS headless para gestionar el glosario + RAG para consultas semánticas sobre la estética de autor.

### Directus
- Desplegar en Coolify como `cms.ioon.mx`
- Colecciones: `terminos_glosario`, `referencias_visuales`, `proyectos`
- API REST automática para que n8n y el agente consulten

### AnythingLLM
- Desplegar en Coolify como `rag.ioon.mx`
- Conectar a Directus como fuente de documentos
- Endpoint de consulta semántica para el pipeline de voz

---

## Fase 3: Generación de Prototipos + Deploy Automático

**Objetivo:** El agente genera código (Astro + Tailwind) y lo despliega automáticamente via Coolify.

### Stack de generación
- Astro + Tailwind CSS 4.x + shadcn/ui + p5.js
- Template base con la estética de ioon pre-configurada

### Flujo
```
Voz (Telegram) → "modo agente, crea un sitio para cafetería artesanal"
  → n8n detecta "modo agente"
  → II-Agent genera código Astro
  → Push a repo Git
  → Coolify detecta push → despliega automáticamente
  → Bot responde con URL del sitio
```

---

## Descubrimiento de API de II-Agent

Para las fases que requieren interacción programática con II-Agent, ejecutar este script de descubrimiento:

```bash
#!/bin/bash
# /root/discover-ii-agent-api.sh

TOKEN=$(cat /root/ii-agent-token.txt)
BASE="https://api.agent.ioon.mx"

echo "=== 1. Health check ==="
curl -s $BASE/health | jq .

echo ""
echo "=== 2. Todos los endpoints ==="
curl -s $BASE/openapi.json | jq '.paths | keys[]' 2>/dev/null

echo ""
echo "=== 3. Endpoints de sesiones/chat ==="
curl -s $BASE/openapi.json | jq '[.paths | to_entries[] | select(.key | test("session|chat|task|run|agent")) | {path: .key, methods: (.value | keys)}]' 2>/dev/null

echo ""
echo "=== 4. Socket.IO ==="
curl -s "$BASE/socket.io/?EIO=4&transport=polling" | head -c 200
echo ""

echo ""
echo "=== 5. Auth endpoints ==="
curl -s $BASE/openapi.json | jq '[.paths | to_entries[] | select(.key | test("auth|login|token")) | {path: .key, methods: (.value | keys)}]' 2>/dev/null

echo ""
echo "=== 6. Test crear conversación ==="
curl -s -X POST $BASE/v1/chat/conversations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"test desde script","model_id":"claude-sonnet-4-5-20251101"}' | jq .
```

---

## Checklist de Mantenimiento

Después de cada reinicio del servidor o recreación de contenedores:

```bash
# 1. Verificar que todos los servicios están arriba
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "backend|frontend|postgres|redis"

# 2. Verificar que backend resuelve a iiagent-db (NO a coolify-db)
docker exec docker-backend-1 getent hosts iiagent-db

# 3. Verificar que backend está en red coolify
docker network inspect coolify --format '{{range .Containers}}{{.Name}} {{end}}' | grep backend

# 4. Health check de la API
curl -s https://api.agent.ioon.mx/health | jq .

# 5. Test de login (abrir en navegador)
# https://agent.ioon.mx
```

---

## Notas de Seguridad

- La comunicación n8n → II-Agent es interna (red Docker), no sale a internet
- JWT secret: `ioon-secret-2026` — considerar rotarlo periódicamente
- Google OAuth client secret está en `.stack.env` — no commitear a git
- El endpoint `/docs` de FastAPI (Swagger) está expuesto públicamente en `api.agent.ioon.mx/docs` — considerar restringirlo en producción
- El servidor tiene 7 actualizaciones pendientes y requiere reinicio (`*** System restart required ***`)

---

*Plan de activación actualizado — 20 abril 2026*
