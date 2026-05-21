# Continuación cutover ioon-stack — sesión 8.4d

**Contexto**: continuación de sesiones 8.4b + 8.4c. Migración de 7 servicios del VPS viejo (89.167.93.139, host `servidor-ioon-1`) al VPS local nuevo (178.104.111.155, host `servidor-ioon-2`). Coolify v4.0.0 fresh install. Estamos en post-cutover cleanup.

## 1. Estado al cierre de 8.4c

### Completado en 8.4c

- 5 Astro apps + n8n + 2 hpt-demo todas productivas en HTTPS sobre VPS local. 7/7 servicios migrados.
- hpt-demo (main) y hpt-demo-2 (branch `conservative-version`) deployados con Nixpacks. v1 con `astro dev` (Astro maneja host:0.0.0.0 internamente), v2 con start command override `npx serve dist -l 80 -s` por strict allowedHosts en Vite del branch.
- Private Key dedicada `gh-deploy-hpt-demo` en Coolify, autorizada como Deploy Key en repo hpt-demo (sin write access). La vieja `coolify-deploy` del Coolify viejo sigue activa en el repo (la quitamos al apagar viejo).
- Env vars críticas en hpt-demo y hpt-demo-2: `NIXPACKS_NODE_VERSION` (20 y 22 respectivamente), `NIXPACKS_START_CMD` (solo en v2), `PUBLIC_FORM_WEBHOOK_URL=https://n8n.ioon.mx/webhook/hpt-demo-form` (ambas Build+Runtime — Astro inlinea `PUBLIC_*` al build).
- 2 workflows n8n publicados (en n8n nuevo "Publish" = Active). HPT Demo Form testeado end-to-end: form submit → webhook → 2 emails Resend (lead interno + auto-reply al usuario). Ejecuciones verde en `n8n.ioon.mx/workflow/ZF5iZTpSVM0ZPy6V/executions`.
- **N8N_ENCRYPTION_KEY rotada** (la vieja se expuso en chat de sesión anterior). Procedimiento ejecutado: export decrypted → borrar `/data/config` del volumen → restart con nueva key → import → verificación. Workflows funcionando confirmado post-rotación.

### Pendientes para 8.4d

| # | Subject | Notas | Bloqueado por |
|---|---|---|---|
| 3 | Remover `N8N_SECURE_COOKIE=false` del servicio n8n | Era workaround durante setup. HTTPS ya válido, n8n asume `true` por default sin la var. Restart después. | — |
| 4b | Verificar cleanup post-rotación | Confirmar que `/tmp/creds-decrypted.json` está borrado del VPS host **y** del container n8n (plaintext API keys). | — |
| 5 | Cleanup screenshots con secrets del Mac | Carpeta Screenshots/Desktop. Buscar capturas con N8N_ENCRYPTION_KEY u otros secrets visibles. Vaciar Trash. | — |
| 6 | SSH directo Mac → VPS local nuevo (178) | Añadir Mac pubkey (`~/.ssh/ioon_servidor.pub`) a `/root/.ssh/authorized_keys` del 178. Probar `ssh root@178.104.111.155` sin `-i`. | — |
| 7 | Apagar VPS viejo `89.167.93.139` | Desde panel del proveedor. NO destruir — apagar y dejar como rollback safety net unos días. | (1, 2 ya done) |
| 8 | DNS cleanup `coolify.ioon.mx` | Eliminar A record en GoDaddy. Coolify nuevo solo accede vía SSH tunnel. | 7 |

## 2. Datos críticos

### Infraestructura

- VPS local nuevo: `178.104.111.155`, host `servidor-ioon-2`
- VPS viejo: `89.167.93.139`, host `servidor-ioon-1` (encendido aún)
- Coolify nuevo: `localhost:8000` (vía SSH tunnel)
- Project ID nuevo: `oanzltw6ejl6o6n9ch8avibw` / production env: `b7gn5g9gu996b19ipeyl3612`
- n8n container nuevo: `n8n-qgzlym3tri9ty5ozx57smh7x`

### Acceso

```
ssh -i ~/.ssh/ioon_servidor -o ServerAliveInterval=30 -L 8000:localhost:8000 root@178.104.111.155
```

- SSH key: `~/.ssh/ioon_servidor`
- Passwords: en Notes cifrada (`ioon-vps-2 — credenciales reconstrucción 20260504`)

### Servicios productivos verificados

canovera.ioon.mx, catalogo.ioon.mx, arquitectura-1.ioon.mx, fotografia-1.ioon.mx, ioon.mx (+ www), hpt-demo.ioon.mx, hpt-demo-v2.ioon.mx, n8n.ioon.mx

## 3. Reglas de trabajo (vinculantes)

- **Disciplina anti-secretos**: NUNCA screenshots con secrets visibles. Valores verbales o redacted (`echo "${VAR:0:6}...${VAR: -4}"`).
- **Convención de nombres**: `fjlp 1.2.4` para todo nuevo.
- **Sección por sección**: validación antes de avanzar.
- **No reabrir decisiones cerradas**: scope = los 7 servicios migrados, sin más.
- **Preferencia confirmada en 8.4c**: cuando hay múltiples pendientes en una sesión, ordenarlos de **más laborioso a más trivial**, no al revés. Francisco rinde mejor con la complejidad cuando aún no está cansado.
  - **PERSISTIR ESTA PREFERENCIA EN MEMORIA** al inicio de 8.4d como `feedback_orden-tareas.md`. En 8.4c no se pudo guardar por permission error en el directorio de memoria; reintentar al arrancar.
- **Cierre de sesión**: resumen de decisiones + supuestos + pendientes + dependencias.
- **Instrucciones precisas, paso a paso, sin sobreexplicar.**

## 4. Lecciones técnicas relevantes (de 8.4c)

a. n8n v2.10.2 self-hosted: el toggle "Active" se llama "Publish" en esta versión. Equivalente funcional.

b. Astro `PUBLIC_*` env vars: requieren `Available at Buildtime` para que Astro las inlinee al output estático. Sin eso, el front-end ve `undefined` y muestra fallback.

c. Astro 5 (branch `main` de hpt-demo): `astro dev` aparentemente bindea a `0.0.0.0` en container (a pesar de mostrar "use --host to expose" en logs). hpt-demo funciona con dev server.

d. Astro 5 (branch `conservative-version` de hpt-demo-2): Vite con strict `allowedHosts` que bloquea hosts no whitelisted. Solución: NO usar dev server, servir estático con `npx serve dist -l 80 -s`. Override con env var `NIXPACKS_START_CMD`.

e. n8n encryption key rotation: borrar `/data/config` del volumen ANTES de restartear con la nueva env var, sino n8n compara config vs env y rehúsa arrancar con "Mismatching encryption keys".

f. n8n env vars `NIXPACKS_*` se pasan a `nixpacks plan` vía `--env` independientemente del toggle Buildtime/Runtime. Para `PUBLIC_*`, el toggle Buildtime SÍ es crítico.

g. Coolify v4 services: "Restart" recreates container con env vars actualizadas. No hace falta Redeploy.

## 5. Cómo arrancar 8.4d

1. Pegar este resumen + handovers 8.4b/8.4c originales si los tenés guardados.
2. **Persistir preferencia "laborioso primero" en memoria** (intento que falló en 8.4c — reintentar).
3. Re-abrir túnel SSH al nuevo:
   ```
   ssh -i ~/.ssh/ioon_servidor -o ServerAliveInterval=30 -L 8000:localhost:8000 root@178.104.111.155
   ```
4. Recrear TodoList con los 6 items pendientes (3, 4b verificación, 5, 6, 7, 8) con las dependencias.
5. **Empezar por el más laborioso restante** según preferencia. Orden recomendado:
   - **Primero #6** (SSH directo Mac→178): laborioso porque toca SSH config en ambos lados, requiere editar authorized_keys con cuidado.
   - **Después #4b** (verificar cleanup creds-decrypted.json): rápido pero crítico de seguridad, no se puede saltear.
   - **Después #3** (remover N8N_SECURE_COOKIE): trivial, restart de servicio.
   - **Después #5** (cleanup screenshots Mac): manual, repetitivo, ideal para final cuando hay menos foco.
   - **Cierre con #7 + #8** (apagar viejo + DNS cleanup): irreversibles, hacer al final cuando estés seguro.
