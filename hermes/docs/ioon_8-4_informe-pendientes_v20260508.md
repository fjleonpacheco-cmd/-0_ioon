# Informe cierre cutover ioon-stack — sesión 8.4

**Fecha de cierre:** 2026-05-08
**Sesiones origen:** 8.4a → 8.4b → 8.4c → 8.4d
**Resultado:** cutover completo. 7/7 servicios productivos en VPS local nuevo.

---

## 1. Estado del stack al cierre

### Infraestructura

- **VPS productivo:** `178.104.111.155` (servidor-ioon-2, Hetzner Nuremberg, CPX32, 160GB).
- **VPS viejo:** `89.167.93.139` (servidor-ioon-1, Hetzner Helsinki, CPX32). **Apagado, NO destruido.** Rollback safety net.
- **Coolify:** v4.0.0 fresh install. Acceso vía SSH tunnel (`ssh -L 8000:localhost:8000 ioon-new`).
- **SSH alias config:** `Host ioon-new 178.104.111.155` en `~/.ssh/config` (sin `-i` requerido).

### Servicios productivos verificados (HTTPS válido)

| Servicio | URL | Stack |
|---|---|---|
| Cano-Vera | canovera.ioon.mx | Astro |
| Catálogo ioon | catalogo.ioon.mx | Astro |
| Demo arquitectura | arquitectura-1.ioon.mx | Astro |
| Demo fotografía | fotografia-1.ioon.mx | Astro |
| ioon principal | ioon.mx, www.ioon.mx | Astro |
| HPT Demo (branch main) | hpt-demo.ioon.mx | Astro 5 dev |
| HPT Demo (branch conservative-version) | hpt-demo-v2.ioon.mx | Astro 5 build estático servido con `npx serve` |
| n8n | n8n.ioon.mx | n8n self-hosted v2.10.2 |

### Identificadores Coolify nuevo

- Project ID: `oanzltw6ejl6o6n9ch8avibw`
- Production env ID: `b7gn5g9gu996b19ipeyl3612`
- n8n container: `n8n-qgzlym3tri9ty5ozx57smh7x`

---

## 2. Cerrado en 8.4d (post-cutover cleanup)

| # | Tarea | Resultado |
|---|---|---|
| 3 | Remover `N8N_SECURE_COOKIE=false` del servicio n8n | Eliminado + Restart. Cookie Secure aceptada por browser. Workflows Published. |
| 4b | Verificar borrado de `/tmp/creds-decrypted.json` post-rotación n8n | Estaba vivo (host + container). Borrados ambos. Sweep final limpio. bash_history sin matches. |
| 5 | Cleanup screenshots con secrets en Mac | Disciplina anti-secretos previa. Verificación de sanidad: 0 archivos relevantes en ~/Desktop. |
| 6 | SSH directo Mac → VPS nuevo sin `-i` | Pubkey ya autorizada. Faltaba alias IP en `Host ioon-new` de `~/.ssh/config`. Resuelto con `sed`. |
| 7 | Apagar VPS viejo `89.167.93.139` | Preflight DNS OK (9/9 hostnames al nuevo). Hetzner reporta Stopped. ping/ssh sin respuesta. |
| 8 | DNS cleanup `coolify.ioon.mx` | A record eliminado en GoDaddy. dig devuelve vacío. |

---

## 3. Pendientes técnicos abiertos

### 3.1 Operativos

**P-1 — Renombrar alias SSH `ioon-new`**
- Contexto: el alias en `~/.ssh/config` se eligió cuando el VPS-2 era "el nuevo". Post-cutover, "new" envejece raro.
- Propuesta: renombrar a `servidor-ioon-2` (matchea el hostname real) o `ioon-vps-2`.
- Esfuerzo: 1 cambio en config.
- Riesgo: bajo. Solo afecta CLI local; cambia muscle memory. Recomendable mantener `ioon-new` como alias adicional durante un tiempo de gracia.

**P-2 — Destruir definitivamente VPS viejo `servidor-ioon-1` (89.167.93.139)**
- Estado actual: Stopped en Hetzner, NO destruido.
- Contexto: mantenido como rollback safety. Mientras esté apagado, **no genera billing de runtime** pero **sí storage del VM** (~poco, pero acumula).
- Cuándo destruir: cuando haya pasado una ventana de seguridad post-cutover. Sugerencia 7-14 días.
- Acción: Hetzner console → `servidor-ioon-1` → menú `...` → Delete. Confirmar tipeando el nombre.
- Riesgo si se destruye prematuramente: si emerge un bug crítico que requiere consultar config del viejo, ya no se puede. Rollback alternativo sería reconstruir.

### 3.2 Cleanup residual

**P-3 — Borrar `~/.ssh/config.bak` en Mac**
- Backup automático generado por `sed -i.bak` durante #6.
- Comando: `rm ~/.ssh/config.bak`

**P-4 — Borrar `8_ioon/docs/.write_test`**
- Archivo vacío (0 bytes) residual de un probe de permisos al inicio de 8.4d. El sandbox de Cowork no permite borrarlo sin grant explícito.
- Comando: `rm /Users/franciscoleon/Documents/8_ioon/docs/.write_test`

### 3.3 Mejoras sugeridas (no bloqueantes, fuera de scope cutover)

- **Backups automáticos de Coolify v4 nuevo.** Definir qué se respalda (config DB de Coolify + volumes de servicios) y a dónde (S3-compatible, B2, etc.). Coolify v4 trae feature de backup integrado para PostgreSQL/MySQL; resto requiere script.
- **Playbook reutilizable de rotación de `N8N_ENCRYPTION_KEY`.** Documentar el procedimiento que se ejecutó en 8.4c (export decrypted → borrar `/data/config` → restart con nueva key → import → verify) para que no haya que reaprenderlo si pasa otra exposición.
- **Monitoreo / alertas.** Hoy no hay observabilidad de uptime ni de expiración de certs. Opciones ligeras: UptimeKuma (deployable en el mismo Coolify), Better Uptime, Healthchecks.io.
- **Rotación periódica de SSH keys del VPS** (opcional, security hygiene).

---

## 4. Lecciones técnicas consolidadas

Conocimiento aprendido en 8.4b/c/d que conviene tener a mano para futuros deploys.

**Astro `PUBLIC_*` env vars en Coolify**
Requieren toggle **Available at Buildtime** ✓ para que Astro las inlinee al output estático. Sin eso, el front-end ve `undefined` y muestra fallback. Aplica a `PUBLIC_FORM_WEBHOOK_URL` y similares.

**Astro 5 dev vs static serve en containers**
- Branch main de hpt-demo: `astro dev` bindea a `0.0.0.0` en container (a pesar del log "use --host to expose"). Funciona en producción demo.
- Branch conservative-version: Vite con `strictAllowedHosts` bloquea hosts no whitelisted. Solución: NO usar dev server. Override `NIXPACKS_START_CMD=npx serve dist -l 80 -s` para servir el build estático.

**n8n self-hosted v2.10.2: "Publish" = "Active"**
El toggle de activación se renombró a **Publish** en esta versión. Mismo comportamiento, distinta etiqueta.

**Rotación de `N8N_ENCRYPTION_KEY` — orden estricto**
1. `n8n export:credentials --decrypted --output=/tmp/creds-decrypted.json`
2. Apagar n8n.
3. **Borrar `/data/config` del volumen** ANTES de cambiar la env var. Sin esto, n8n compara config vs env y rehúsa arrancar con `Mismatching encryption keys`.
4. Cambiar `N8N_ENCRYPTION_KEY` en Coolify.
5. Restart.
6. `n8n import:credentials --input=/tmp/creds-decrypted.json`
7. **Borrar `/tmp/creds-decrypted.json` en host Y container** (con `docker exec -u root rm` para el container — el user default `node` no puede).

**Coolify v4: Restart vs Redeploy**
**Restart** recreates container con env vars actualizadas. No requiere rebuild. Para cambios solo en env: usa Restart, no Redeploy.

**`docker exec` user default**
La imagen oficial de n8n corre como user `node` (UID 1000). Para borrar archivos creados por root dentro del container, usar `docker exec -u root <container> rm ...`.

**Cookies Secure detrás de HTTPS**
n8n marca cookie `n8n-auth` como Secure por default. Sin HTTPS válido, browser la rechaza → login loop. Workaround temporal: `N8N_SECURE_COOKIE=false`. Una vez Let's Encrypt emitido, **REMOVER** el workaround (deja cookie Secure correctamente).

**Nixpacks env vars**
Las vars con prefijo `NIXPACKS_*` (ej. `NIXPACKS_NODE_VERSION`, `NIXPACKS_START_CMD`) se pasan a `nixpacks plan` vía `--env` independientemente del toggle Buildtime/Runtime. Para `PUBLIC_*`, el toggle Buildtime SÍ es crítico.

---

## 5. Decisiones cerradas (no reabrir)

- **Scope cutover:** los 7 servicios migrados. Sin más.
- **Convención de nombres:** `fjlp 1.2.4` para todo nuevo.
- **Disciplina anti-secretos:** NUNCA screenshots con secrets visibles. Valores verbales o redacted (`echo "${VAR:0:6}...${VAR: -4}"`).
- **Orden de pendientes en sesión:** más laborioso → más trivial. Persistido en `8_ioon/docs/feedback_orden-tareas.md`.

---

## 6. Riesgos vivos / supuestos

- **VPS viejo apagado pero presente.** Si Hetzner factura el storage del VM apagado, hay un goteo de costo hasta destruirlo (P-2).
- **N8N_ENCRYPTION_KEY rotada en 8.4c.** La nueva key vive solo en la env var de Coolify. Si Coolify se pierde sin backup, la key se pierde y los credentials encriptados en la DB de n8n quedan irrecuperables. Mitigación: backup de Coolify (ver 3.3).
- **Sin observabilidad activa.** Si un servicio se cae a las 3 AM, te enteras cuando alguien lo reporta. Mitigación: monitoreo (ver 3.3).
