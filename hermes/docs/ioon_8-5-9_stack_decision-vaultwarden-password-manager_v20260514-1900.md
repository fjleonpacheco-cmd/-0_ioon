---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-1900
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de Vaultwarden como password manager self-hosted del estudio. Define qué reemplaza, por qué Vaultwarden y no Bitwarden Cloud ni 1Password ni alternativas open-source, cómo se integra con clientes oficiales Bitwarden y patrón de migración desde el estado actual
depende_de:
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted)
  - ioon_8-5-6_stack_decision-google-workspace_v20260514-1730 (cuenta Workspace requiere password fuerte almacenado aquí)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila password manager)
  - ioon 8-4-7 pendientes técnicos (P0-X migración de passwords actuales a Vaultwarden)
---

# Decisión canónica — Vaultwarden como password manager self-hosted

Decisión cristalizada el 14 de mayo de 2026 durante la sesión de stack operativo. Cierra una deuda de seguridad arrastrada desde el arranque del estudio · passwords críticos viviendo en navegador o memoria.

---

## 1. Idea central (1 frase)

**Vaultwarden** (implementación en Rust del servidor Bitwarden) queda adoptado como password manager self-hosted del estudio en `vault.ioon.mx` · compatible con todos los clientes oficiales Bitwarden (browser, desktop, mobile, CLI) · costo monetario cero · respaldado por Coolify backup → B2.

---

## 2. Contexto

Estado pre-decisión: passwords críticos del estudio vivían dispersos entre:
- Memoria de Francisco (alto riesgo, único punto de fallo humano).
- Browser autocomplete de Chrome (locked al ecosistema Google, sin sync seguro entre devices, sin rotación).
- Notas markdown sueltas en repositorio local (peligroso · cualquier leak del repo expone credenciales).
- Algunos en Telegram a sí mismo (ridículo pero ocurre).

Credenciales que viven en estos lugares incluyen: acceso GitHub, acceso GoDaddy DNS, acceso Coolify admin, claves API de servicios cliente, accesos SSH al VPS, passwords de admin de cada cliente instalado en Coolify, etc.

El riesgo operativo es real: pérdida de un device, leak accidental de repo, o simplemente fricción cotidiana de buscar passwords escala con cada cliente nuevo.

---

## 3. Decisión

**Vaultwarden** queda adoptado.

- **Origen:** [vaultwarden.dev](https://www.vaultwarden.dev) · re-implementación Rust del servidor Bitwarden · GPL-3 · maintainer principal `dani-garcia`.
- **Compatibilidad:** **100% protocolo Bitwarden** · usa los clientes oficiales (browser extension, Bitwarden desktop, Bitwarden mobile iOS/Android, Bitwarden CLI). Vaultwarden solo reemplaza el servidor.
- **Hosting:** Coolify en `servidor-ioon-2`.
- **Base de datos:** SQLite (default, suficiente para vault personal/estudio) · upgradable a Postgres si crece a equipo de 10+.
- **Acceso:** `vault.ioon.mx` (wildcard DNS cubre).
- **TLS:** Let's Encrypt automático vía Traefik.
- **Backups:** incluido en backup global Coolify → Backblaze B2 (P2-1).
- **Usuario primary:** `francisco@ioon.mx` con master password único almacenado **fuera** del propio Vaultwarden (paper backup en lugar físico seguro + un device de emergencia).
- **2FA:** TOTP habilitado · backup codes guardados en paper backup.

---

## 4. Razones de la elección

### 4.1 Compatibilidad total con ecosistema Bitwarden

Vaultwarden expone la API de Bitwarden, los clientes oficiales conectan sin saber. Esto significa:
- Browser extensions oficiales (Chrome, Firefox, Safari, etc.) sin compilar nada custom.
- App móvil oficial de Bitwarden en iOS/Android con Face ID/Touch ID.
- Desktop oficial macOS/Windows/Linux.
- CLI oficial para automatizaciones (`bw` command).
- Plugins de terceros que integran con Bitwarden (1Password Connect, Alfred, Raycast).

Si Vaultwarden falla algún día, la migración a Bitwarden Cloud es trivial — los clientes ya están conectados, solo cambia el endpoint.

### 4.2 Self-hosted real con costo monetario cero

Bitwarden Cloud tier Premium es $10/año · Bitwarden Business es $5/usuario/mes. Vaultwarden con clientes oficiales = $0. Sin tradeoff de features esenciales · password sharing entre usuarios funciona · TOTP funciona · attachments funcionan.

### 4.3 Rust = footprint pequeño

Vaultwarden corre en ~50 MB de RAM y consume CPU casi cero en steady state. En el VPS actual es ruido. Comparado con el servidor oficial Bitwarden (Node + .NET · multi-contenedor pesado), es 10-20x más ligero.

### 4.4 Maintainer dedicado, comunidad activa

`dani-garcia` lleva mantenimiento riguroso desde 2018. Releases frecuentes, security patches al día, issues respondidas. Sin riesgo de abandonware visible.

### 4.5 Filosofía alineada

Self-hosted · open source · datos en VPS propio · sin envío de telemetría · compatible con estándares industria. Coherente con el resto del stack.

---

## 5. Alternativas evaluadas y descartadas

### Bitwarden Cloud (Premium o Business)
SaaS oficial. $10/año personal o $5/usuario/mes Business. Trade-off acceptable si no se quiere mantener nada · pero filosofía self-hosted gana en este caso por costo total + control.

Mitigación: si Vaultwarden alguna vez se vuelve doloroso de mantener, migración a Bitwarden Cloud es trivial (export → import en cliente Bitwarden oficial, cambio de endpoint).

### 1Password
Calidad UX excelente · pero **SaaS-only** sin opción self-hosted real · $36/año personal o $96/año familia. Lock-in fuerte al formato 1Password Vault. Descarte por filosofía + lock-in + costo recurrente.

### KeePassXC
Open source clásico · DB local en archivo `.kdbx` · sin servidor. Excelente para uso individual offline · problemático para sync multi-device (requiere sincronizar archivo `.kdbx` via Dropbox/Nextcloud/Drive · riesgo de conflictos de merge si dos devices editan al mismo tiempo). Apps móviles oficiales menos pulidas que Bitwarden. Descarte por fricción de sync multi-device.

### Pass (Unix password store)
CLI puro · `.gpg`-encrypted files · git como backend. Ideal para developers · totalmente impráctico para uso desde móvil o navegador casual (los clientes browser/mobile son experimentales). Descarte por mismatch de caso de uso (Francisco usa móvil + browser + desktop).

### Padloc
Open source con SaaS opcional · self-hosting técnicamente posible pero comunidad pequeña, clientes oficiales menos maduros que Bitwarden. Descarte por menor madurez del ecosistema.

### Browser-only (Chrome / Firefox Password Manager)
Sin sync seguro entre browsers · sin TOTP · sin compartir con clientes · lock-in al ecosistema browser. **No es solución para uso profesional.** Descarte por insuficiencia funcional.

### Servidor oficial Bitwarden self-hosted
Posible · pero requiere Docker Compose pesado (multi-contenedor con SQL Server, ICEvent, etc.), 2-4 GB de RAM, recursos sobrados para el caso. Vaultwarden cubre el mismo caso con 50 MB. Descarte por costo de recursos · innecesario para escala personal/estudio.

---

## 6. Setup operativo

### Fase 1 — instalación base (semana del 19-may)

1. Coolify · proyecto "Vaultwarden" desde catálogo.
2. Configurar dominio `vault.ioon.mx` · Traefik + Let's Encrypt.
3. Crear admin token (env `ADMIN_TOKEN`) almacenado en paper backup.
4. Crear usuario `francisco@ioon.mx` con master password fuerte (~20+ chars, mix de palabras y símbolos · memorable pero no adivinable).
5. Habilitar 2FA con TOTP (Authy o app móvil) · guardar backup codes en paper backup.
6. Verificar acceso desde browser extension (Bitwarden oficial) apuntando a `vault.ioon.mx`.
7. Verificar acceso desde app móvil Bitwarden con custom server URL.

### Fase 2 — migración de passwords (semanas 2-3)

8. Audit de passwords actuales (mental + browser autocomplete + notas + repo).
9. Crear vault entries para cada uno · categorías: ioon-infra (Coolify, VPS, DNS), ioon-clientes (cada cliente activo), ioon-saas (Github, GoDaddy, Hetzner, Workspace), personal.
10. Eliminar passwords de notas markdown del repo · rotar los que estuvieron en notas (no se sabe quién más vio).
11. Limpiar browser autocomplete · forzar uso de extension Bitwarden.

### Fase 3 — sharing colaborativo (cuando entre socio o equipo)

12. Crear organización Vaultwarden con shared folders por área (infra · clientes · saas).
13. Onboarding del segundo usuario con permisos por carpeta.

---

## 7. Costos

| Concepto | Costo |
|---|---|
| Licencia Vaultwarden | $0 (GPL-3 self-hosted) |
| Clientes oficiales Bitwarden | $0 (versión gratuita conecta a server custom) |
| Hosting incremental | $0 (cubierto por VPS) |
| Backups | incluidos en backup global Coolify → B2 (P2-1) |
| **Total mensual** | **$0** |

Costo de oportunidad: ~2-3 horas setup + ~4-6 horas migración de passwords actuales con auditoría.

---

## 8. Riesgos y mitigaciones

### Pérdida del master password
Riesgo catastrófico · sin master password no hay recuperación, todo el vault queda inaccesible. **Mitigación obligatoria:** paper backup del master password + backup codes 2FA en lugar físico seguro (caja fuerte o sobre sellado custodiado). Sin esto, la decisión de adoptar Vaultwarden es **irresponsable**.

### Pérdida del VPS
Si el VPS muere y no hay backup, el vault se pierde. Mitigación: backup automatizado Coolify → Backblaze B2 (P2-1) · verificar restore funciona en cuanto el backup esté operativo · al menos una restore-test cada 3 meses.

### Compromiso del VPS
Si el VPS es comprometido, el vault encriptado se filtra · pero está **encriptado client-side con la master password** · sin master password el atacante tiene blob ininteligible. Mitigación: master password fuerte (>= 20 chars entropy) + 2FA + actualizaciones de Vaultwarden al día.

### Lock-in al maintainer
Vaultwarden depende de `dani-garcia`. Si abandona, ¿qué pasa? Mitigación: el código es open source · si se vuelve abandonware, fork de comunidad probable (Vaultwarden tiene base de usuarios grande) · y migración a Bitwarden Cloud es trivial (mismo protocolo).

---

## 9. Criterios de reapertura

1. **Vaultwarden se vuelve abandonware** sin fork claro. Disparador: migrar a Bitwarden Cloud (trivial) o servidor oficial.
2. **Bitwarden hace breaking change en protocolo** que Vaultwarden no alcanza. Disparador: evaluar lag aceptable o migrar.
3. **El estudio crece a 20+ usuarios con compliance específico** (SOC 2, HIPAA). Disparador: evaluar Bitwarden Business con compliance certificado.
4. **Aparece alternativa OSS claramente superior** en UX/features. Disparador: revisión natural.

---

## 10. Vigencia y revisión

**Revisión natural:** 6 meses post-migración completa — ¿se usa de verdad? ¿hay passwords aún fuera del vault?

**Revisión por evento:** cualquiera del §9.

---

## 11. Reglas duras de uso

1. **Cero passwords en notas markdown, repos, Telegram, email plano.** Todos viven en Vaultwarden.
2. **Master password jamás se comparte ni se escribe en digital salvo paper backup físico.**
3. **2FA obligatorio para cuenta Vaultwarden + para cualquier servicio que lo soporte** (sus secretos TOTP se guardan también en Vaultwarden).
4. **Rotación cuando hay sospecha de exposición** (ex-empleado de cliente, leak detectado, password reutilizado en servicio comprometido).
5. **Audit periódico** (cada 3 meses) — Bitwarden Reports detecta passwords débiles, reutilizados, comprometidos en breaches públicos. Actuar en cada audit.

---

*Decisión cristalizada el 14-may-2026 19:00 UTC-6. Cierra deuda de seguridad arrastrada desde el arranque del estudio.*
