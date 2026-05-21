---
proyecto: 8. ioon
subtema: 8.4b planeacion-tecnica-reconstruccion-vps-cutover-final
version: v20260507-1645
autor: Francisco Javier León Pacheco
nivel: subtema · mensaje-contexto
estado: listo-para-pegar
proposito: contexto inicial completo para retomar la reconstrucción del VPS en una sesión nueva (chat 8.4b), exactamente desde donde se interrumpió 8.4a por agotamiento de adjuntos
depende_de:
  - fjlp_1-1_contexto-general-francisco (perfil)
  - fjlp_1-2-4_organizacion-de-archivos_directriz-nombres
  - ioon_8-0-1_ioon_instrucciones-espacio
  - ioon_8-4-1 a 8-4-5 (track previo del subtema)
  - ioon_8-4a-1_planeacion-tecnica-continuacion-reconstruccion-vps_contexto_v20260504-2217
alimenta_a:
  - completar Bloques 4.6 (parcial), 4.7, 5, 6, 7 del plan 8-4-5
  - actualizar marco con lecciones aprendidas adicionales (3 wipes, deriva de scope, ii-agent fuera)
---

# Sub-chat 8.4b — continuación reconstrucción VPS, cutover final

Mensaje-contexto inicial. Continúa la sesión 8.4a (jueves 7 mayo 2026, ~14h activas) que terminó con scope reducido y patrón validado. La sesión 8.4a se interrumpió por agotamiento del cupo de adjuntos. Este chat 8.4b retoma el cutover desde el punto exacto donde se cortó.

---

## 1. Quién soy

- Francisco Javier León Pacheco. Director de Arte / fotógrafo. Oaxaca, México. Operador único de ioon.
- ioon = "Diseño de Autor + Ejecución Automatizada", público con alfabetización visual, OSS-first.
- Hardware: MacBook Pro M5 Pro 48 GB. Gestor de credenciales: Notes.app del Mac con notas cifradas (decisión a revisar en 8.5 categoría 1.13).
- Convención de nombres `fjlp 1.2.4` para todo lo que se genere.

## 2. Marco técnico vigente

Marco vive en `ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260504-1305`. 16 categorías. Tres principios transversales: posicionamiento alfabetizado visualmente, tipografía/animación + estética minimalista, soberanía OSS-first. Restricciones duras: 1 RFC mexicano persona física, ~2,000 MXN/mes, ~30,000 MXN/año, 1 persona, Apple Silicon nativo o Rosetta fluido. Stack arquitectónico: Modelo C híbrido (Notion + canon en `.md` en repo `0_ioon` + sync n8n) + Modelo B (OSS completo) en evaluación 90 días.

## 3. La historia del rebuild

### 3.1 Incidente original (21-24 abril 2026)

BSI (CERT alemán) reportó Redis del VPS viejo expuesto sin auth en puerto 6379. Forensia mostró llave SSH RSA inyectada en clave Redis (firma del ataque clásico Redis CONFIG SET). El intento NO escaló al host por aislamiento Docker. Otros problemas detectados: MinIO con creds default minioadmin:minioadmin, Coolify UI sin HTTPS, JWT secret predecible. Dado un cliente alemán potencial (con due diligence GDPR/BSI), se eligió **Opción Paranoica**: tratar el VPS como potencialmente comprometido y reconstruir desde cero. Snapshot forense Hetzner image ID `379810905` (mantener mínimo 12 meses).

### 3.2 Sesión 8.4a (hoy, 7-may-2026)

**Bloque stop-gap (no estaba en plan original):** A las ~14h llegó otra notificación BSI sobre Postgres del VPS viejo expuesto en 5432. Se aplicaron reglas iptables al VPS viejo (cadena INPUT con DROPs al tope para 5432, 6379, 9000, 9001, 8000, 8001, 8080, 1420, 6001, 6002), persistidas vía `iptables-persistent`. Verificación externa: 22/80/443 succeed, los 5 críticos (5432, 6379, 9000, 8000) timed out. Puerto 1420 escapa a iptables (probable userland-proxy + UFW residual); aceptado como riesgo conocido hasta retiro del VPS viejo (~24h post-cutover).

**Bloque 4.1 cerrado:** Docker CE 29.4.2 + Compose v5.1.3 instalados en VPS nuevo, validado.

**Bloque 4.2 (Coolify) — wipeado y reinstalado 3 veces ("Camino A" elegido cada vez):**
1. Primera instalación → expuesto el `.env` en chat vía screenshot de TextEdit → wipe.
2. Segunda instalación → primer intento de wipe dejó volúmenes nombrados → reinstalación contaminada → wipe real (volúmenes incluidos).
3. Tercera instalación (la actual, la que está viva) → admin registrado limpio.

**Coolify nuevo (vivo):**
- v4.0.0 en VPS nuevo
- admin: `hola@ioon.mx`
- password: regenerado (cumple req. Coolify: ≥8 chars + upper + lower + number + symbol), guardado en Notes cifrada como `COOLIFY_ADMIN_PASSWORD`
- Server "localhost" auto-configurado (single-VPS, This Machine — discutido y elegido vs Remote Server por congruencia con plan + presupuesto)
- Project creado: `ioon-stack` (production environment)

**Deploy key configurada:**
- En Coolify: `gh-deploy-O_ioon-stack` (cosmético tiene letra O mayúscula en vez de cero, NO afecta funcionalidad)
- En GitHub repo `-0_ioon` Settings → Deploy keys: `coolify-vps-2-deploy-20260507`, badge "Read access", read-only sin write
- ED25519 key, fingerprint estuvo expuesto al hacer screenshot pero la regeneramos en silencio

**Pivote crítico de scope (esta sesión 8.4a):**

Al intentar configurar la primera Application apuntando a `/docker/docker-compose.stack.yaml` del repo `-0_ioon`, Coolify devolvió "Compose file not found". Investigación:
- El repo `-0_ioon` NO tiene una carpeta `/docker/`. Es un monorepo Astro con sub-proyectos (cano-vera_v1, catalogo-ioon, demo-arquitectura-1, demo-fotografia-1) y un Dockerfile al root.
- El `docker-compose.stack.yaml` real vivía en `/root/ii-agent/docker/` del VPS viejo (clone del repo público `https://github.com/Intelligent-Internet/ii-agent.git`, con modificaciones locales del incidente).
- **El stack core completo (II-Agent backend, frontend, postgres, redis, minio) era para II-Agent.**
- **Francisco confirmó: "no uso ii-agent, podemos eliminarlo"**.

**Esto colapsa el scope del cutover de manera dramática.** Solo se necesita:
1. Coolify ✅ (instalado)
2. Coolify-Traefik (auto-incluido) ✅
3. 5 sitios Astro como Coolify Applications individuales:
   - `catalogo-ioon` → `catalogo.ioon.mx`
   - `demo-fotografia-1` → `demo-fotografia-1.ioon.mx`
   - `demo-arquitectura-1` → `demo-arquitectura-1.ioon.mx`
   - `cano-vera_v1` → `canovera.ioon.mx`
   - root del repo (Dockerfile principal) → `ioon.mx`
4. n8n vía Coolify Service template (con migración de workflows desde el viejo)

**Bloque 4.6 parcial — primera Application desplegada exitosamente:**
- `catalogo-ioon` creada (URL `application/orf2cpnkpp41z38g0zbitsj3...`)
- Build Pack: Dockerfile, Base Directory: `/catalogo-ioon`, Dockerfile Location: `/Dockerfile`
- Deploy successful: imagen buildeada, contenedor corriendo, status Running
- Dominio temporal asignado: `http://orf2cpnkpp41z38g0zbitsj3.178.104.111.155.sslip.io`
- **PERO devuelve `Bad Gateway`** al cargar la URL.
- Diagnóstico: el Dockerfile expone puerto 80 (nginx serving), pero Coolify default proxy port = 3000. El `Bad Gateway` lo emite Traefik al no poder conectar al upstream.
- **PUNTO EXACTO DE INTERRUPCIÓN: cambiar Ports Exposes de 3000 → 80 en Coolify Configuration → Network o Advanced.**

## 4. Estado del VPS nuevo al inicio de 8.4b

- IP: `178.104.111.155` (servidor-ioon-2, CPX32 Nuremberg)
- Hardening (Sección 3 del plan): completo, validado post-reboot
- Docker CE 29.4.2: instalado
- Coolify v4.0.0: corriendo (instancia 3, limpia)
  - admin: `hola@ioon.mx` + password en Notes cifrada
  - server `localhost` (This Machine)
  - project `ioon-stack`
  - 1 Application: `catalogo-ioon` (deployed, Bad Gateway por puerto)
- Hetzner Cloud Firewall: 22/80/443/ICMP únicamente
- UFW interno: activo, mismas reglas
- Túnel SSH del Mac: probablemente caído por tiempo

## 5. Estado del VPS viejo al inicio de 8.4b

- IP: `89.167.93.139` (servidor-ioon-1)
- Stop-gap iptables aplicado y persistido: 5432, 6379, 9000, 9001, 8000, 8001, 8080, 1420, 6001, 6002 → DROP en INPUT chain
- Verificación externa: 22/80/443 succeed, demás timed out (excepto 1420 escape, riesgo conocido)
- Coolify viejo + Traefik viejo + apps viejas: TODO sigue corriendo (incluye II-Agent que Francisco no usa)
- Dominios actuales (`coolify.ioon.mx`, `agent.ioon.mx`, `api.agent.ioon.mx`, `n8n.ioon.mx`, los Astro): siguen sirviendo desde aquí
- DNS de `ioon.mx` en GoDaddy: NO tocado, sigue apuntando aquí

## 6. Plan inmediato al iniciar 8.4b

### Paso 0 — verificar túnel SSH

En terminal del Mac (zsh local):

```bash
ssh -L 8000:localhost:8000 -L 6001:localhost:6001 -L 6002:localhost:6002 ioon-new
```

Si "Address already in use" → esperar 60 seg (TIME_WAIT), reintentar. O usar puertos alternativos `8800/6601/6602` y acceder Coolify en `localhost:8800`.

Login a Coolify: `hola@ioon.mx` + password de Notes.

### Paso 1 — resolver Bad Gateway de catalogo-ioon

Ir a Project `ioon-stack` → Application `catalogo-ioon` → Configuration → buscar en sidebar (`Network` o `Advanced`) el campo **Ports Exposes** (o similar). Cambiar `3000` → `80`. Save. Redeploy (no rebuild, solo reconfigura proxy, ~30 seg).

Verificar: cargar `http://orf2cpnkpp41z38g0zbitsj3.178.104.111.155.sslip.io` debería mostrar el sitio del catálogo (no Bad Gateway).

### Paso 2 — replicar patrón para 4 sitios restantes

Por cada uno: Project `ioon-stack` → + Add Resource → Private Repository (with Deploy Key) → seleccionar `gh-deploy-O_ioon-stack` → Continue.

Form (igual para todos excepto Base Directory):
- Repo: `git@github.com:fjleonpacheco-cmd/-0_ioon.git`
- Branch: `main`
- Build Pack: **Dockerfile**
- Base Directory: variable según sitio (ver tabla)
- Dockerfile Location: `/Dockerfile`

| Application name | Base Directory | Dominio final |
|---|---|---|
| demo-fotografia-1 | `/demo-fotografia-1` | demo-fotografia-1.ioon.mx |
| demo-arquitectura-1 | `/demo-arquitectura-1` | demo-arquitectura-1.ioon.mx |
| cano-vera_v1 | `/cano-vera_v1` | canovera.ioon.mx |
| ioon-mx | `/` | ioon.mx |

Después de crear cada uno, **antes de Deploy**: configurar Ports Exposes = 80. Save. Después Deploy.

Verificar cada uno via dominio sslip.io auto-generado.

### Paso 3 — n8n vía Coolify Service template

Coolify v4 tiene template built-in para n8n. Project `ioon-stack` → + Add Resource → Service → buscar n8n en la lista → configurar:
- Auth básica
- Persistencia de volumen
- Dominio temporal sslip.io (cambia luego)

**Migración de workflows:**
1. Antes del cutover, en n8n VIEJO (vía Coolify viejo o acceso directo): UI → Settings → Export → Export all workflows → JSON.
2. Descargar JSON al Mac.
3. Después del cutover en n8n NUEVO: UI → Settings → Import → subir JSON.
4. **Las credentials NO son portables** (n8n las cifra con clave instance-specific). Reconfigurarlas a mano en el nuevo n8n.

### Paso 4 — configurar dominios reales en Coolify

Por cada Application (5 Astro + n8n), ir a Configuration → General → cambiar el campo Domains:
- de `http://<hash>.178.104.111.155.sslip.io`
- a `https://<dominio>` (por ejemplo `https://catalogo.ioon.mx`)

Guardar. Coolify Traefik intentará issue cert Let's Encrypt automáticamente. **Va a fallar pre-cutover** porque DNS aún apunta al VPS viejo. NO redeployar todavía — guardar la config solamente.

### Paso 5 — pre-cutover testing via /etc/hosts del Mac

Editar `/etc/hosts` del Mac (con `sudo`):

```
178.104.111.155 catalogo.ioon.mx
178.104.111.155 demo-fotografia-1.ioon.mx
178.104.111.155 demo-arquitectura-1.ioon.mx
178.104.111.155 canovera.ioon.mx
178.104.111.155 ioon.mx
178.104.111.155 n8n.ioon.mx
```

Por cada dominio, abrir en Chrome y verificar que carga (cert warning aceptable, pre-LE). Si carga → la config Traefik del nuevo VPS está OK para ese dominio. Si no carga → debug.

### Paso 6 — DNS cutover en GoDaddy (Sección 6 del plan 8-4-5)

En GoDaddy DNS de `ioon.mx`:
- A record `@` → `178.104.111.155`
- A record `catalogo` → `178.104.111.155`
- A record `demo-fotografia-1` → `178.104.111.155`
- A record `demo-arquitectura-1` → `178.104.111.155`
- A record `canovera` → `178.104.111.155`
- A record `n8n` → `178.104.111.155`
- TTL bajo (300 seg)

Esperar propagación (5-15 min). Coolify Traefik en VPS nuevo emite certs LE automáticamente.

### Paso 7 — verificación post-cutover (Sección 7 del plan)

12 checkpoints del plan 8-4-5 (revisar HTTP 200 cada dominio, certs válidos LE, n8n accesible con auth, sin errores en logs Coolify).

### Paso 8 — limpiar /etc/hosts del Mac

Quitar las entries del paso 5.

### Paso 9 (mañana, +24h post-cutover) — retirar VPS viejo

`ssh ioon-new` → no aplica. SSH `89.167.93.139` → `docker compose down -v` opcional (igual el VPS desaparece). Hetzner Console → destruir `servidor-ioon-1`. **Mantener el snapshot forense `379810905` mínimo 12 meses.**

## 7. Datos operativos clave

### IPs y dominios

| Recurso | Valor |
|---|---|
| VPS viejo (servidor-ioon-1) | `89.167.93.139` (stop-gap aplicado) |
| VPS nuevo (servidor-ioon-2) | `178.104.111.155` |
| Dominio raíz | `ioon.mx` (DNS GoDaddy) |
| 5 dominios target | catalogo / demo-fotografia-1 / demo-arquitectura-1 / canovera / (root) |
| Coolify UI nuevo (via tunnel) | http://localhost:8000 |

### SSH config del Mac

```
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_ioon
    IdentitiesOnly yes

Host ioon-new
    HostName 178.104.111.155
    User root
    IdentityFile ~/.ssh/ioon_servidor
    IdentitiesOnly yes
```

VPS viejo: `ssh root@89.167.93.139` con password (en Notes vieja, se recuperó hoy).

### Repo

- URL SSH: `git@github.com:fjleonpacheco-cmd/-0_ioon.git`
- Branch: `main`
- Commit actual al cierre 8.4a: `bc5cdee384520858e108088c505c611f834c7940`
- Estructura: 5 sub-proyectos + Dockerfile root (cada uno standalone Vite/Astro + nginx)

### Credenciales en Notes cifrada

Nota: `ioon-vps-2 — credenciales reconstrucción 20260504`

Lista de keys (SIN VALORES, no pegar en chat):
- ROOT_PASSWORD_VPS (emergencia, no se usa con SSH key)
- COOLIFY_ADMIN_PASSWORD (regenerado hoy para cumplir req. Coolify)
- Coolify .env auto-generado (instalación 3 — 20260507-1524)
- (otras del marco original que no aplican porque no usamos II-Agent)

## 8. Lecciones aprendidas en 8.4a (para incorporar al marco después)

a. **Disciplina anti-screenshots de secretos**: la regla se rompió 3 veces en 8.4a (= 3 wipes de Coolify y horas perdidas). Para 8.4b: ningún screenshot de TextEdit, terminal, ni UI que muestre secretos. Solo confirmaciones verbales.

b. **Validar suposiciones del plan antes de ejecutar**: el plan 8-4-5 asumía compose en `-0_ioon/docker/`. Era falso. Costó ~2h de redirección. Antes de futuras ejecuciones, validar en repo/disco real.

c. **Scope realista**: II-Agent no se usa pero estaba en todo el plan. Limpiar inventario real de servicios usados ANTES de planificar reconstrucciones.

d. **UFW + iptables-persistent en mismo host = caos**. UFW removido durante apt deja chains residuales en INPUT. Para sealing real, insertar reglas DROP al tope de INPUT, no solo en DOCKER-USER (Docker bypassea por userland-proxy).

e. **Coolify v4 default proxy port = 3000**. Apps con otros puertos (nginx 80, etc.) requieren configurar Ports Exposes explícitamente.

f. **Recuperar passwords de cuentas/VPSes legacy ANTES de necesitarlos**, no en medio de la respuesta.

## 9. Cómo quiero que ayudes

Mismas reglas que 8.4a (ejecución sección por sección, validación antes de avanzar, distinción de prompts). Plus:

- **Disciplina de no-secretos en chat es ahora vinculante** — si necesito confirmar un valor, te lo digo verbalmente; nunca screenshot.
- **Avanzar rápido** — la prioridad real es cerrar el cutover hoy (todavía es factible, ~3-4h activas restantes). Mejor un cutover funcional con detalles cosméticos pendientes que prolijidad sin cutover.
- **No reabrir decisiones cerradas**: This Machine para Coolify (no Remote Server), public repo de II-Agent ignorado, scope = 5 Astro + n8n, sin más.
- **Convención de nombres `fjlp 1.2.4`** para todo nuevo.
- **Cierre de sesión**: resumen de decisiones + supuestos + pendientes + dependencias al final.

## 10. Cómo arrancamos este chat 8.4b

Cuando pegue este mensaje:

1. Confirmá lectura, resumí en 3-4 líneas el estado de cierre de 8.4a.
2. Validá conmigo que el túnel SSH está vivo (yo lo abro). Si caído, recordame el comando.
3. Avanzá directo al **Paso 1: resolver Bad Gateway de catalogo-ioon configurando puerto 80**. Esa es la acción inmediata.
4. Cuando esté arreglado y verificado, replicá patrón con los 4 sitios restantes en serie rápida.
5. Después n8n, dominios, /etc/hosts test, cutover GoDaddy, verificación post.
6. Al final: resumen de cierre con qué quedó deployado, qué quedó pendiente para mañana (Sección 8), y siguientes acciones.
