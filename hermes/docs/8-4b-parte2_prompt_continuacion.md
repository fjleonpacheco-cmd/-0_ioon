# Prompt para continuar — sesión 8.4b parte 2

## Continuación de cutover ioon-stack VPS local

**Contexto**: continuación de sesión 8.4b. Llevamos ~7.5h migrando 7 servicios del VPS viejo (89.167.93.139, host `servidor-ioon-1`) al VPS local nuevo (178.104.111.155, host `servidor-ioon-2`). Coolify v4.0.0 fresh install en VPS local. Mañana cerramos los últimos pendientes.

## 1. Estado al cierre de esta sesión

### Cerrado
- 5 Astro apps deployadas en Coolify nuevo, HTTPS productivo con Let's Encrypt:
  - `cano-vera_v1` → canovera.ioon.mx
  - `catalogo-ioon` → catalogo.ioon.mx
  - `demo-arquitectura-1` → arquitectura-1.ioon.mx (subdomain cambió: era `demo-arquitectura-1.ioon.mx` en viejo)
  - `demo-fotografia-1` → fotografia-1.ioon.mx (mismo cambio)
  - `ioon-mx` → ioon.mx + www.ioon.mx (ambos directos, sin redirect, opción C)
- Servicio n8n con encryption key migrada del viejo, owner account creado, 4 credentials + 2 workflows importados (deactivated)
- n8n.ioon.mx HTTPS 200 productivo
- DNS GoDaddy: 9 A records → 178.104.111.155 (`@`, `www`, `canovera`, `catalogo`, `arquitectura-1`, `fotografia-1`, `n8n`, `hpt-demo`, `hpt-demo-v2`); preservado `coolify` → 89.167.93.139; eliminados `*`, `*.apps`, `agent`, `api.agent`, `crm`. TTL 600s.

### En progreso (donde retomar exacto)
**Deployando hpt-demo en Coolify nuevo**:
- App creada (URL: `localhost:8000/.../application/bzuppcdq41zaquxe98tuzf5j`)
- Renombrada a `hpt-demo`. Domain: `https://hpt-demo.ioon.mx`. Branch `main`. Build Pack Dockerfile. Base Dir `/`. Dockerfile `/Dockerfile`. Ports Exposes 3000. NO Deploy aún.
- En Configuration > Git Source aparece: "Currently attached Private Key: `gh-deploy-0_ioon-stack`" (key existente, viene del monorepo). El texto **NO es link**.
- **Próxima acción**: ir al panel izquierdo > **Keys & Tokens**, encontrar `gh-deploy-0_ioon-stack`, copiar su public key. Después en GitHub `https://github.com/fjleonpacheco-cmd/hpt-demo/settings/keys/new` añadir esa pubkey con título `Coolify VPS local — hpt-demo`, sin write access. Volver a Coolify y Deploy.

### Pendiente tras hpt-demo
- **hpt-demo-v2**: crear app similar (mismo repo `git@github.com:fjleonpacheco-cmd/hpt-demo.git`, branch `conservative-version`, FQDN `https://hpt-demo-v2.ioon.mx`). El deploy key ya estará autorizado en GitHub si reutilizamos la misma.
- Verify ambos en HTTPS.
- **Activar 2 workflows** en n8n UI (deactivated post-import: "ioon Voice Pipeline" y "HPT Demo Form").
- **Test funcional** de workflows.
- **Remover env var** `N8N_SECURE_COOKIE=false` del servicio n8n (ahora que HTTPS es válido) → Restart.
- **Rotar `N8N_ENCRYPTION_KEY`** (fue expuesta accidentalmente en chat de la sesión anterior). Procedimiento: generar nueva key, en cada credential de n8n hacer re-encrypt con `n8n update:credentials --decrypt-with-old --encrypt-with-new` (ver docs).
- **Cleanup**:
  - Borrar screenshots con secretos visibles del Mac (carpeta Screenshots).
  - Configurar SSH directo al VPS local: añadir Mac pubkey a `/root/.ssh/authorized_keys` del 178 (actualmente solo accesible vía `~/.ssh/ioon_servidor`; verificar y documentar).
  - Apagar VPS viejo cuando hpt-demo y hpt-demo-v2 funcionen verificados.
  - Eliminar/redirigir `coolify.ioon.mx` DNS al apagar el viejo.

## 2. Datos críticos

### Infraestructura
- **VPS local nuevo**: `178.104.111.155`, hostname `servidor-ioon-2`
- **VPS viejo**: `89.167.93.139`, hostname `servidor-ioon-1`
- **Coolify nuevo**: `localhost:8000` (via SSH tunnel)
- **Coolify viejo**: `89.167.93.139:8000` (acceso directo, hasta apagado)
- **Coolify version**: v4.0.0 (nuevo) y v4.0.0-beta.470 (viejo)
- **Modelo Coolify**: This Machine (no Remote Server)
- **Proxy**: Traefik v3.6 (Coolify managed)

### Acceso
- **SSH al VPS local + túnel Coolify** (un solo comando):
  ```
  ssh -i ~/.ssh/ioon_servidor -L 8000:localhost:8000 root@178.104.111.155
  ```
- **SSH key Mac**: `~/.ssh/ioon_servidor` (la que funciona). También existen `~/.ssh/github_ioon` (para repos) y `~/.ssh/config`.
- **Password VPS viejo**: en Notes cifrada (`ioon-vps-2 — credenciales reconstrucción 20260504`)
- **Password VPS nuevo**: en Notes (`ROOT_PASSWORD_VPS`, emergencia, no se usa con SSH key)

### Repos
- **Monorepo público**: `git@github.com:fjleonpacheco-cmd/-0_ioon.git` (5 sub-proyectos Astro)
- **hpt-demo privado**: `git@github.com:fjleonpacheco-cmd/hpt-demo.git`
  - branch `main` → hpt-demo.ioon.mx
  - branch `conservative-version` → hpt-demo-v2.ioon.mx

### Coolify project IDs (de URLs)
- Project: `oanzltw6ejl6o6n9ch8avibw`
- Environment production: `b7gn5g9gu996b19ipeyl3612`
- App hpt-demo: `bzuppcdq41zaquxe98tuzf5j` (nuevo)

### Coolify viejo (para referencia, project ID distinto)
- Project: `n38cudu4hxb09g92ay8egu73`

## 3. Lecciones aprendidas técnicas

a. **Coolify v4 requiere DEPLOY (no Restart)** tras cambiar Domain, para aplicar nuevas Traefik labels al container. Restart solo reinicia el proceso, no recrea el container.

b. **n8n service template requiere `:5678` en el dominio** (`https://n8n.ioon.mx:5678`). Coolify mapea externamente 443 al port 5678 interno del container. Sin el `:5678` el proxy lanza warning.

c. **n8n encryption key**: si pasas `N8N_ENCRYPTION_KEY` env var distinta al `~/.n8n/config` existente, n8n rehúsa arrancar con "Mismatching encryption keys". Fix: borrar `/data/config` del volumen y dejar que n8n regenere usando la env var.

d. **Coolify v4 service templates** no exponen `N8N_ENCRYPTION_KEY` por default; n8n auto-genera en `~/.n8n/config`. Para sustituir: añadir como env var manual + recrear volumen.

e. **n8n SQLite default**: el viejo usaba SQLite, no Postgres. Migración via `n8n export:workflow --all` y `n8n export:credentials --all` desde CLI.

f. **DNS TTL 600s** durante cutover. Para flexibilidad. Subir a 3600+ después del cutover.

g. **Coolify proxy port** = 80/443 (Traefik). Apps internas en 3000 default. Service templates pueden usar otros (n8n=5678).

## 4. Reglas de trabajo (vinculantes 8.4b)

- **Disciplina anti-secretos**: NUNCA screenshots con secretos visibles. Valores verbales o redacted (`echo "${VAR:0:6}...${VAR: -4}"`). Una violación ya ocurrió hoy con `N8N_ENCRYPTION_KEY` (queda pendiente rotar).
- **Convención de nombres**: `fjlp 1.2.4` para todo nuevo.
- **Sección por sección**: validación antes de avanzar. Una falla ahora es 10x más cara que validación previa.
- **No reabrir decisiones cerradas**: This Machine para Coolify, scope = 5 Astro + n8n + 2 hpt-demo, sin más.
- **Cierre de sesión**: resumen de decisiones + supuestos + pendientes + dependencias al final.
- **Instrucciones precisas** (sin ambigüedad): "click X, escribe Y, presiona Z" — un usuario fatigado se merece eso.

## 5. Cómo arrancamos este chat nuevo

Cuando pegue este mensaje:

1. Confirma lectura, resumí en 3-4 líneas el estado de cierre.
2. Validá conmigo que el túnel SSH a Coolify nuevo (`localhost:8000`) está vivo. Si caído, recordame el comando.
3. Avanzá directo al **siguiente paso concreto: ir a Keys & Tokens en Coolify nuevo, encontrar `gh-deploy-0_ioon-stack`, copiar public key, pegarla en GitHub Deploy Keys de hpt-demo, después Deploy.**
4. Después: replicar para hpt-demo-v2 (branch `conservative-version`).
5. Verificar HTTPS de ambos.
6. Activar workflows n8n + tests + cleanup.
7. Resumen final de cierre.

Estado actual del usuario: fatiga alta tras 7.5h. Instrucciones precisas, paso a paso, sin sobreexplicar. Cuando termine este bloque, evaluar si seguir con cleanup o cortar para mañana.
