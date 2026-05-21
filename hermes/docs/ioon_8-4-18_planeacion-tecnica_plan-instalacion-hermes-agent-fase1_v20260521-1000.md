---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260521-1000
autor: Francisco Javier León Pacheco
nivel: plan de instalación · detallado
estado: vigente · listo para ejecutar
proposito: plan de instalación técnico y detallado de Hermes Agent (base de Tau) en el VPS servidor-ioon-2, basado en la documentación oficial de Nous Research consultada el 21-may-2026. Cristaliza el mapeo canon→producto, dos decisiones de diseño (context files vía AGENTS.md apuntador · usuario dedicado no-root), y el plan ejecutable en sub-fases 1A-1D. Complementa el plan general 8-4-11 con los detalles técnicos verificados contra la doc oficial
depende_de:
  - ioon_8-4-11_planeacion-tecnica_plan-implementacion-hermes-agent_v20260511-1115 (plan general · fases)
  - ioon_8-4-17_planeacion-tecnica_decision-rol-hermes-tau-3-niveles_v20260514-1408 (régimen 3 niveles que mapea a approvals)
  - ioon_8-4-9_planeacion-tecnica_decision-hermes-vs-iiagent_v20260509-0034 (decisión de Hermes como base)
alimenta_a:
  - 0_ioon/hermes/SOUL.md (se copia a ~/.hermes/SOUL.md en el VPS)
  - ejecución real de fase 1 (este plan se sigue paso a paso)
fuentes_doc:
  - hermes-agent.nousresearch.com/docs (consultada 21-may-2026)
  - github.com/NousResearch/hermes-agent
---

# Plan de instalación — Hermes Agent fase 1 (activación de Tau)

Plan técnico detallado basado en la doc oficial de Nous Research (consultada 21-may-2026). Hermes Agent fue liberado feb-2026 (MIT) · este plan verifica el diseño canónico contra el producto real y define la ejecución.

---

## 1. Validación · Hermes Agent es real y encaja

Hermes Agent (Nous Research, MIT, feb-2026, v0.10.0 al 16-abr-2026):
- Agente autónomo self-hosted · memoria persistente SQLite local · auto-creación de skills.
- 200+ modelos (OpenRouter incluido) · 20+ plataformas de mensajería (Telegram incluido) · MCP nativo.
- 95.6k GitHub stars en 7 semanas · proyecto muy activo.

**El diseño canónico de ioon mapea 1:1 con features nativas del producto:**

| Canon ioon | Mecanismo nativo Hermes Agent |
|---|---|
| SOUL.md de Tau | `~/.hermes/SOUL.md` · slot #1 del system prompt · reemplaza identidad default · cap 20k chars |
| Régimen 3 niveles (8-4-17) | `approvals.mode`: `manual` (N2) / `smart` (N3) · lectura sin approval (N1) |
| memory/ | `~/.hermes/memories/` (MEMORY.md, USER.md) |
| skills/ | `~/.hermes/skills/` (gestionadas por el agente) |
| OpenRouter como provider | `~/.hermes/.env` → `OPENROUTER_API_KEY` |
| Capture Engine vía Telegram | Messaging gateway nativo |
| Consulta de canon vía Filesystem MCP | MCP integration nativa |

**Features extra del producto que refuerzan el canon (no estaban en 8-4-11):**
- **Tirith** · escaneo de seguridad pre-ejecución de comandos de terminal · capa adicional sobre approvals.
- **Checkpoints** · snapshots del filesystem antes de operaciones destructivas + rollback · prevención nativa al estilo de la lección del incidente 15-may (fjlp_1-5-9).
- **Container isolation** · `terminal.backend: docker` para sandboxing de ejecución.

---

## 2. Decisiones de diseño cristalizadas (21-may-2026)

### 2.1 Context files vía AGENTS.md apuntador (decisión: opción c)

**Problema:** el canon usa `context/fjlp.md` + `context/ioon.md` + `context/casagrande.md` como capas separadas. Hermes Agent carga **un solo** project context file (primer match: `.hermes.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`).

**Decisión:** crear un **`AGENTS.md` ligero** en el working directory del repo que:
- Contiene instrucciones de proyecto esenciales.
- **Apunta** a los context/*.md: instruye a Tau "lee `context/fjlp.md` para el perfil del autor, `context/ioon.md` para el contexto del estudio, `context/casagrande.md` cuando aplique al proyecto 7 · vía Filesystem MCP cuando la conversación lo amerite".
- Preserva la arquitectura de capas del canon + funciona con el esquema nativo de Hermes.

**Ventaja:** los context/*.md siguen siendo fuentes canónicas independientes versionadas en el repo · el AGENTS.md es el índice que Tau consulta · sin duplicación.

### 2.2 Usuario dedicado no-root (decisión: usuario dedicado)

**Problema:** el VPS corre Coolify + Vaultwarden + Uptime Kuma. Hermes Agent tendrá acceso al filesystem y ejecutará comandos.

**Decisión:** correr Hermes Agent como **usuario dedicado `hermes`** (systemd service account), NO como root.
- Sandbox de permisos · si Tau o un bug hace algo malo, no es root con acceso al vault.
- Alineado con la lección de defensa en profundidad del incidente 15-may.
- Complementar con `terminal.backend: docker` para aislar aún más la ejecución de comandos.

**Trade-off aceptado:** más setup inicial (crear usuario, permisos, systemd unit) a cambio de superficie de ataque mucho menor.

---

## 3. Estructura de archivos en el VPS

```
~/.hermes/  (home del usuario dedicado hermes)
├── config.yaml          # Settings (model, approvals, security, etc.) · YAML
├── .env                 # Secretos (OPENROUTER_API_KEY, TELEGRAM_BOT_TOKEN)
├── auth.json            # OAuth credentials
├── SOUL.md              # Identidad Tau (copia de 0_ioon/hermes/SOUL.md)
├── memories/            # MEMORY.md, USER.md
├── skills/              # Skills auto-creadas
├── cron/                # Jobs programados
├── sessions/            # Sesiones del gateway
└── logs/                # errors.log, gateway.log (secretos auto-redactados)
```

El repo `-0_ioon` (con context/*.md y AGENTS.md) se accede vía Filesystem MCP · NO se copia a `~/.hermes/`.

---

## 4. Prerequisitos · sub-fase 1A (~20 min)

### 4.1 OpenRouter API key

1. Crear cuenta/login en `openrouter.ai` (SSO Google o email).
2. Generar API key (`sk-or-...`).
3. Configurar **cap mensual $40 USD** en OpenRouter settings (billing limits).
4. **GUARDAR en Vault PRIMERO** (orden corregido · lección Hetzner):
   - Entry `OpenRouter API · ioon` · folder `ioon-infra`.
   - Password: la API key.
   - Notas: `Cap $40/mes · provider LLM para Tau + AnythingLLM · creada 2026-05-XX`.

### 4.2 Desconectar @ioon_agent_bot de n8n/iiAgent

⚠️ **Crítico:** el bot `@ioon_agent_bot` ya existe pero está conectado a iiAgent vía n8n. Un bot de Telegram admite **un solo** webhook/polling activo. Antes de conectarlo a Hermes Agent:

1. Identificar el workflow de n8n que usa el bot.
2. Desactivar/eliminar ese workflow (o al menos el trigger del bot).
3. Eliminar el webhook viejo de Telegram:
   ```
   https://api.telegram.org/bot<TOKEN>/deleteWebhook
   ```
4. Verificar que el bot quedó libre (`getWebhookInfo` debe mostrar webhook vacío).
5. Confirmar bot token guardado en Vault (entry nuevo o existente · folder `ioon-infra`).

---

## 5. Instalación · sub-fase 1B (~40 min)

### 5.1 Crear usuario dedicado en el VPS

```bash
# Como root en el VPS
adduser --system --group --shell /bin/bash --home /home/hermes hermes
# o adduser hermes (interactivo) según preferencia de permisos
```

### 5.2 Revisar el script de instalación ANTES de ejecutar

⚠️ **NO correr `curl | bash` a ciegas en VPS productivo.** Primero descargar y leer:

```bash
# Como usuario hermes
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh -o /tmp/hermes-install.sh
less /tmp/hermes-install.sh   # revisar qué hace
```

Verificar que: descarga del repo oficial, instala dependencias esperadas (Python 3.11, Node 22, ripgrep, ffmpeg), crea venv, no hace nada sospechoso.

### 5.3 Ejecutar instalación (modo per-user, como usuario hermes)

```bash
# Como usuario hermes (NO root)
bash /tmp/hermes-install.sh
```

Layout resultante: code en `~/.hermes/hermes-agent/`, binary `~/.local/bin/hermes`, data `~/.hermes/`.

### 5.4 Verificar instalación

```bash
hermes doctor    # diagnóstico
hermes --version
```

---

## 6. Configuración · sub-fase 1C (~40 min)

> **Pendiente leer doc específica antes de ejecutar 1C:** `/docs/integrations/providers` (OpenRouter), `/docs/user-guide/messaging/` (Telegram), `/docs/integrations/` (MCP). Consultar estas 3 páginas justo antes de esta sub-fase para comandos exactos.

### 6.1 LLM provider OpenRouter

```bash
hermes config set OPENROUTER_API_KEY sk-or-...   # va a ~/.hermes/.env
hermes model                                      # picker interactivo de modelo
# o: hermes config set model <modelo>
```

Modelo a elegir: evaluar opciones de OpenRouter alineadas con el cap $40/mes (balance costo/capacidad).

### 6.2 SOUL.md de Tau

```bash
# Copiar el SOUL.md canónico al lugar que Hermes espera
cp ~/code/-0_ioon/0_ioon/hermes/SOUL.md ~/.hermes/SOUL.md
# (ajustar ruta según donde viva el repo en el VPS)
```

Verificar que cargó: `hermes` debe usar la identidad Tau, no la default.

### 6.3 AGENTS.md apuntador (decisión 2.1)

Crear `AGENTS.md` en el working directory del repo con instrucciones + punteros a context/*.md.

### 6.4 Approvals (régimen 3 niveles · decisión 8-4-17)

```yaml
# en ~/.hermes/config.yaml
approvals:
  mode: manual    # arranca en Nivel 2 · todo comando pide aprobación
```

Migrar a `smart` (Nivel 3) solo tras histórico de uso (criterios de 8-4-17 §4).

### 6.5 Security hardening

```yaml
security:
  redact_secrets: true        # redactar API keys en logs/output (lección de leaks)
  tirith_enabled: true        # escaneo pre-ejecución
  tirith_fail_open: false     # bloquear comando si Tirith no puede verificar (más estricto)
checkpoints:
  enabled: true               # snapshots antes de operaciones destructivas
terminal:
  backend: docker             # aislar ejecución de comandos
```

### 6.6 Telegram gateway

```bash
hermes gateway setup    # wizard · conectar @ioon_agent_bot con su token
```

(Comando exacto a confirmar con doc `/docs/user-guide/messaging/`.)

### 6.7 Filesystem MCP

Conectar MCP de filesystem apuntando al repo `-0_ioon` para que Tau lea el canon (SOUL.md, context/*.md, notas). Formato a confirmar con doc `/docs/integrations/`.

---

## 7. Primera conversación · sub-fase 1D (~20 min)

**Checkpoint de fase 1 (de 8-4-11 §3.1):** Tau responde 5 preguntas reales del autor sobre canon sin alucinar · cita la nota fuente · ofrece próxima acción cuando aplica · sin escribir en sistemas externos (régimen Nivel 1).

Tests sugeridos:
1. "¿Qué CRM decidimos?" → debe citar 8-5-5 Twenty.
2. "¿Cuál es el roadmap de activación del stack?" → debe citar 8-5-0 §4.
3. "¿Qué pasó el 15 de mayo?" → debe citar fjlp_1-5-9.
4. "¿Cómo redeploy en Coolify?" → debe citar 8-4-16.
5. "¿Quién es el autor?" → debe leer context/fjlp.md vía MCP.

Si pasa los 5 sin alucinar y citando fuentes → fase 1 cerrada · Tau operativo en Nivel 1.

---

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| `curl\|bash` comprometido en VPS productivo | Descargar + revisar script antes de ejecutar (§5.2) |
| Tau como root daña el stack | Usuario dedicado + docker backend + approvals manual (§2.2) |
| Bot Telegram en conflicto (n8n vs Hermes) | Desconectar n8n + deleteWebhook antes (§4.2) |
| OpenRouter cap excedido | Cap $40/mes configurado + monitor (§4.1) |
| Secretos en logs | `redact_secrets: true` (§6.5) |
| Context files no cargan como espera el canon | AGENTS.md apuntador + verificar en 1D (§2.1) |

---

## 9. Páginas de doc pendientes de leer antes de 1C

Consultar justo antes de la sub-fase de configuración (no leídas aún · la página de Configuration general ya se procesó):

1. `https://hermes-agent.nousresearch.com/docs/integrations/providers` — setup detallado OpenRouter.
2. `https://hermes-agent.nousresearch.com/docs/user-guide/messaging/` — setup Telegram bot.
3. `https://hermes-agent.nousresearch.com/docs/integrations/` — conectar MCP servers (Filesystem MCP).
4. `https://hermes-agent.nousresearch.com/docs/user-guide/docker` — patrón systemd / usuario dedicado / docker backend.

También útil: `/docs/getting-started/quickstart` y `/docs/getting-started/installation` (layout per-user vs root).

---

## 10. Relación con otras notas

- **8-4-11** · plan general de fase 1 · esta nota es la versión de instalación detallada.
- **8-4-17** · régimen 3 niveles · mapea a `approvals.mode`.
- **8-4-9** · decisión Hermes vs iiAgent · base de por qué Hermes.
- **fjlp_1-5-9** · incidente · la feature Checkpoints de Hermes refuerza esa lección.
- **8-5-11** · AnythingLLM · comparte OpenRouter key + cap $40/mes con Tau.
- **0_ioon/hermes/SOUL.md** · se copia a `~/.hermes/SOUL.md`.

---

*Plan cristalizado el 21-may-2026 10:00 CST tras consultar la doc oficial de Hermes Agent. Listo para ejecutar en sesión dedicada. Pendiente leer 3-4 páginas de doc (§9) justo antes de la sub-fase 1C de configuración.*
