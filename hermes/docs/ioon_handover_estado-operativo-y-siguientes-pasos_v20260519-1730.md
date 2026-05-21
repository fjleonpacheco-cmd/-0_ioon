---
proyecto: 8. ioon
subtema: handover operativo
version: v20260519-1730
autor: Francisco Javier León Pacheco
nivel: informe de estado · handover de trabajo
estado: vigente · punto de retoma
proposito: informe consolidado del trabajo realizado en las sesiones del 15-may (incidente + recuperación) y 19-may (backup + prevención + migración passwords) · estado actual del sistema · pendientes ordenados · siguientes pasos concretos para retomar mañana sin perder contexto
cubre_sesiones:
  - 2026-05-15 · incidente borrado canon + recuperación + activación Vaultwarden/Uptime Kuma
  - 2026-05-19 · backup automatizado B2 + prevención local + arranque migración passwords
---

# Handover operativo ioon · estado y siguientes pasos

Informe de cierre del 19-may-2026 17:30 CST. Para retomar mañana con contexto completo.

---

## 1. Resumen ejecutivo

En dos sesiones (15-may incidente, 19-may continuación) el estudio pasó de **canon perdido sin red de seguridad** a **infraestructura con cuatro capas de respaldo + dos servicios self-hosted en producción + arranque de migración de credenciales a vault centralizado**. El incidente del borrado accidental se convirtió en el catalizador para cerrar deuda de infraestructura que llevaba meses pendiente.

**Lo crítico que quedó resuelto:**
- Canon reconstruido íntegro (0% pérdida neta).
- 4 capas de backup activas y verificadas.
- Vaultwarden (passwords) y Uptime Kuma (monitoring) operativos con backup automatizado.
- Prevención local (Time Machine + iCloud) que cierra la causa raíz del incidente.

**Lo que quedó a medias (retoma mañana):**
- Migración de passwords a Vaultwarden · GitHub al 60% · faltan Hetzner, GoDaddy, Coolify, SSH key + Tier 1-4.

---

## 2. Estado actual del sistema

### 2.1 Stack self-hosted en producción

| Servicio | URL | Estado | Auth | Backup |
|---|---|---|---|---|
| Vaultwarden | `vault.ioon.mx` | Running healthy | master pass + 2FA TOTP | B2 daily |
| Uptime Kuma | `status.ioon.mx` | Running healthy | admin + pass en Vault | B2 daily |

Ambos en Coolify v4.0.0 sobre `servidor-ioon-2` (Hetzner CPX32 Nuremberg · 178.104.111.155).

### 2.2 Backup automatizado

- **Script:** `/opt/ioon-backups/backup.sh` en el VPS.
- **Schedule:** cron daily 9 AM UTC = 3 AM CST.
- **Método:** `sqlite3 .backup` consistente + rsync auxiliares + tar+gzip + rclone a B2.
- **Destino:** `b2-ioon:ioon-coolify-backups/{vaultwarden,uptime-kuma}/`.
- **Retention:** 30 días.
- **Monitoreo:** push monitor `Backup script · daily` en Uptime Kuma · alerta Telegram si no corre en 24h.
- **Primer backup verificado:** 19-may · `vaultwarden-*.tar.gz` (24K) + `uptime-kuma-*.tar.gz` (84K) en B2.

### 2.3 Cuatro capas de respaldo (post-incidente)

| Capa | Cobertura | Frecuencia |
|---|---|---|
| Time Machine | Todo el Mac local · disco externo encriptado | Hourly automatic |
| iCloud Drive | `~/Documents` + `~/Desktop` (incluye canon `docs/`) | Realtime |
| Backblaze B2 | Vaultwarden + Uptime Kuma SQLite | Daily 3 AM CST |
| GitHub | Repo `-0_ioon` (código + SOUL.md Tau + context) | Por commit |

### 2.4 Monitoreo · 7 monitores en Uptime Kuma

1. Vaultwarden · `vault.ioon.mx` (HTTP keyword)
2. Uptime Kuma self-check · `status.ioon.mx`
3. Serclin · `serclin.ioon.mx` (cliente activo)
4. Ping VPS · `178.104.111.155`
5. SSH VPS · puerto 22
6. GitHub API · `api.github.com`
7. OpenRouter · `openrouter.ai`
+ Push monitor `Backup script · daily`

Alertas a Telegram via `@ioon_uptime_bot`.

### 2.5 Canon reconstruido

- Vive en `~/Documents/8_ioon/docs/` (sincronizado a iCloud).
- 14 archivos regenerados + 14 recuperados intactos de Cowork outputs.
- Repo `-0_ioon` movido a `~/code/-0_ioon` (fuera de iCloud · evita conflicto git ↔ sync).

### 2.6 Vaultwarden · estado del vault

**Folders creados:** `ioon-infra`, `ioon-saas`, `ioon-clientes`, `personal`, `_archive-pre-migracion`.

**Entries en `ioon-infra` (4):**
- Backblaze B2 · keyV2 (`...0002` · key nueva post-rotación)
- Telegram bot · `@ioon_uptime_bot`
- Uptime Kuma admin
- GitHub · fjleonpacheco-cmd (pendiente completar · ver §4)

**NO en vault (correcto):** master password + ADMIN_TOKEN de Vaultwarden viven solo en paper backup (evita trampa circular).

---

## 3. Trabajo completado · por área

### 3.1 Recuperación post-incidente (15-may)

- Audit de daño · decisión de NO disk recovery · regeneración desde memoria + Cowork.
- Reorganización `docs/` + clone repo `-0_ioon`.
- File mode noise git resuelto (`core.fileMode false`).
- 14 archivos canónicos regenerados (glosario, inventario, pendientes, decisiones stack, modelo C híbrido, régimen 3 niveles Tau, índice 8-5-0, plan implementación Hermes).
- 14 archivos originales recuperados intactos de outputs Cowork previos.

### 3.2 Activación stack (15-may)

- Vaultwarden activado · 2FA TOTP · paper backup · SIGNUPS_ALLOWED=false.
- Uptime Kuma activado · 7 monitores · alertas Telegram.

### 3.3 Backup + prevención (19-may)

- B2 application key rotada tras leak en chat.
- Script backup automatizado + cron + push monitor.
- P2-9 Time Machine activado (hourly · disco encriptado).
- P2-10 iCloud Drive sync activado (Documents/Desktop · 2 TB).
- Repo movido a `~/code/` fuera de iCloud.

### 3.4 Documentación (19-may)

- `fjlp_1-5-9` nota canónica del incidente · lección permanente con 5 reglas de no-repetición.

### 3.5 Migración passwords (19-may · EN CURSO)

- Pre-fase: Google personal blindado (2FA + recovery verificados).
- Audit: Chrome export 142 entries · grep repo limpio (sin secrets en notas).
- GitHub: 2FA habilitado + Recovery codes en paper backup. **Passkey + Vault entry + SSH check pendientes.**

---

## 4. PUNTO EXACTO DE RETOMA · GitHub a medias

Estado de GitHub al cerrar:

- ✓ 2FA TOTP habilitado (Bitwarden Authenticator).
- ✓ 16 Recovery codes en paper backup.
- ⏸ **Passkey** · selección hecha (Llavero de iCloud) · falta confirmar Touch ID.
- ⏸ **Vault entry** · pendiente crear.
- ⏸ **SSH check** · pendiente verificar.

**Pasos exactos para reanudar:**

1. Ir a `github.com/settings/security` → sección Passkeys → `Add passkey` → elegir **Llavero de iCloud** → Touch ID.

2. Crear entry en Vaultwarden (`+ Añadir` → Inicio de sesión):
   - Name: `GitHub · fjleonpacheco-cmd`
   - Username: `fjleonpacheco-cmd`
   - Password: vacío (SSO Google · sin password tradicional)
   - URL: `https://github.com`
   - Carpeta: `ioon-infra`
   - Notas: acceso SSO Google + Passkey iCloud · 2FA TOTP · recovery codes paper backup.

3. Verificar SSH key:
   ```bash
   ls -la ~/.ssh/
   ssh -T git@github.com
   ```
   Confirmar que la key está vinculada a GitHub (respuesta "Hi fjleonpacheco-cmd! You've successfully authenticated...").

---

## 5. Pendientes ordenados por prioridad

### 5.1 Migración passwords · resto del Tier 0 (mañana · ~1.5 h)

Aplicar el patrón de 6 pasos (generar password Vault → cambiar en servicio → verificar 2FA → logout/login → guardar en Vault → eliminar de Chrome) a:

1. **GitHub** · completar (passkey + vault entry + SSH) — primero, ya empezado.
2. **Hetzner** · VPS provider · password tradicional probable + verificar 2FA.
3. **GoDaddy** · DNS de `ioon.mx` · crítico (pueden secuestrar subdominios).
4. **Coolify admin** · panel del stack.
5. **SSH key passphrase** · verificar si la key tiene passphrase · si no, considerar agregarla.

⚠️ **Cada servicio puede tener sorpresas** (GitHub no tenía password ni 2FA · descubierto al auditar). Auditar a fondo cada uno, no asumir setup conocido.

### 5.2 Migración passwords · Tier 1-4 (estrategia gradual)

- **Activos** (~30-50): migración pasiva · cuando los uses, migras ese entry.
- **Zombies** (~30-50): quedan en Chrome · audit cada 6 meses.
- **Muertos** (~30-50): eliminar del CSV + Chrome sin migrar · audit batch ~1 h.

CSV de Chrome (`~/Desktop/chrome-passwords-audit.csv`) sigue existiendo · **eliminarlo seguro cuando termine la migración** (es plaintext con 142 passwords).

### 5.3 Activaciones programadas del stack

- **Google Workspace** (8-5-6) · semana 26-may · email `francisco@ioon.mx` + Calendar + Drive + Meet.
- **Twenty CRM** (8-5-5) · semana 2-jun · pipeline de prospectos.

### 5.4 Hermes Agent fase 1 deploy (8-4-11 §3.1)

Activación real de Tau · requiere bandwidth fresco. Entregables faltantes:
- Instalar Hermes Agent en `servidor-ioon-2` vía Coolify.
- Conectar OpenRouter (cap $40/mes) + Telegram bot + Filesystem MCP.
- Primera conversación productiva (Tau lee canon, responde sin escribir externo).

### 5.5 Canon · pendientes menores

- `8-5-4` guía operativa · regenerar cuando haya uso real del stack.
- `8-5-91/92/93` borradores-input · probablemente NO regenerar (eran inputs específicos · regenerar desde memoria reconstruye inferior).

---

## 6. Notas operativas / lecciones de estas sesiones

1. **Dos leaks de credenciales en chat** (ADMIN_TOKEN Vaultwarden + B2 key) · ambos rotados. Higiene: secretos enmascarados antes de screenshot · `read -s` para pegar valores sensibles · eye icon Vault para display parcial.

2. **`core.fileMode false`** en macOS evita noise de chmod en git al cruzar sistemas.

3. **`Is Literal?`** en Coolify env vars cuando el valor contiene `$` (evita interpolation · caso del hash Argon2).

4. **Bitwarden ≠ Bitwarden Authenticator** · apps separadas. TOTP nunca en el mismo app que el vault.

5. **Coolify backup nativo solo cubre Postgres standalone** · SQLite en volúmenes requiere script manual (ya hecho).

6. **iCloud y git no cohabitan** · repos van fuera de carpetas sincronizadas (`~/code/`).

7. **Passkey en dependencia distinta al SSO** · GitHub SSO es Google · passkey en iCloud Keychain diversifica.

8. **Auditar cada servicio a fondo** · GitHub reveló sin password ni 2FA · las suposiciones sobre setup conocido fallan.

---

## 7. Comandos útiles para mañana

**Reabrir tunnel a Coolify:**
```bash
ssh -L 8000:localhost:8000 ioon-new
# luego abrir http://localhost:8000
```

**SSH directo al VPS:**
```bash
ssh ioon-new
```

**Verificar backup corrió (en VPS):**
```bash
tail -20 /var/log/ioon-backup.log
rclone ls b2-ioon:ioon-coolify-backups/vaultwarden/
rclone ls b2-ioon:ioon-coolify-backups/uptime-kuma/
```

**Repo local:**
```bash
cd ~/code/-0_ioon && git status
```

**SSH key check:**
```bash
ls -la ~/.ssh/
ssh -T git@github.com
```

---

## 8. Referencias canónicas relacionadas

- `fjlp_1-5-9` · nota del incidente + reglas de no-repetición.
- `ioon_8-5-9` · decisión Vaultwarden + reglas de uso.
- `ioon_8-5-12` · decisión Uptime Kuma + política de alertas.
- `ioon_8-5-0` · índice maestro del stack + orden de activación.
- `ioon_8-4-11` · plan implementación Hermes Agent (Tau).
- `ioon_8-4-17` · régimen 3 niveles del agente.
- `ioon_8-4-16` · Coolify autodeploy no confiable + Force rebuild.

---

*Handover generado el 19-may-2026 17:30 CST. Punto de retoma documentado en §4. Para continuar: GitHub passkey + vault entry + SSH check, luego Hetzner.*
