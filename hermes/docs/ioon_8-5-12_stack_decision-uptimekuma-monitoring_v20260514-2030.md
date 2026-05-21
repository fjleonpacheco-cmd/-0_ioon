---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-2030
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de Uptime Kuma como monitor de uptime de servicios self-hosted del estudio. Define qué monitorea, dónde notifica, criterios de escalado a herramienta más seria si crece la operación
depende_de:
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted)
  - ioon_8-4-16_planeacion-tecnica_nota-coolify-autodeploy-no-confiable-y-force-rebuild_v20260514-2017 (caso de uso · monitor servicios cliente activos)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila monitoring/observability)
  - ioon 8-4-7 pendientes técnicos (P2-X activación Uptime Kuma con monitores iniciales)
---

# Decisión canónica — Uptime Kuma como monitor de uptime self-hosted

Decisión cristalizada el 14 de mayo de 2026. Cierra una deuda operativa: la falta de visibilidad sobre el estado real de los servicios del estudio (VPS Coolify · sitios cliente desplegados · APIs externas críticas como GitHub/Workspace/OpenRouter).

---

## 1. Idea central (1 frase)

**Uptime Kuma** queda adoptado como monitor de uptime self-hosted en `status.ioon.mx` · checks cada 60 segundos · notificaciones a Telegram + email · status page público opcional por cliente.

---

## 2. Contexto

Estado pre-decisión: sin monitor. Si `serclin.ioon.mx` cae, Francisco se entera cuando alguien le avisa o cuando él mismo abre el sitio horas después. Lo mismo para todos los servicios self-hosted (`crm.ioon.mx`, `vault.ioon.mx`, eventual `proofing.demo.ioon.mx`, etc.).

Riesgo operativo:
- **Reputacional cliente.** Cliente abre su sitio caído sin que Francisco sepa.
- **SLA implícito.** Los clientes asumen sites up · sin monitor no hay forma de saber si se cumple.
- **Diagnóstico tardío.** Una caída temprana (5 min) puede ser cosmética · una caída larga (4 horas) es crisis · sin monitor no se sabe en qué fase estás.

---

## 3. Decisión

**Uptime Kuma** queda adoptado.

- **Origen:** [uptime.kuma.pet](https://uptime.kuma.pet) · open source MIT · Node.js + SQLite.
- **Hosting:** Coolify en `servidor-ioon-2`.
- **Base de datos:** SQLite (default, suficiente).
- **Acceso admin:** `status.ioon.mx/dashboard` (autenticado).
- **Status page público (opcional):** `status.ioon.mx` con servicios públicos de cliente · sin info interna.
- **Notificaciones:** Telegram bot del estudio + email a `francisco@ioon.mx`.
- **Frecuencia checks:** 60 segundos por default · 30 segundos para servicios cliente críticos.

---

## 4. Monitores iniciales

### Infraestructura del estudio

1. `coolify.ioon.mx` (interno · acceso SSH tunnel) — TCP check al puerto.
2. Postgres del VPS — TCP check al puerto.
3. SSH al VPS — TCP check puerto 22.
4. Disk usage del VPS — alerta si >80%.

### Servicios self-hosted activos

5. `crm.ioon.mx` (Twenty) — HTTP check 200.
6. `vault.ioon.mx` (Vaultwarden) — HTTP check 200.
7. `mautic.ioon.mx` (Mautic, cuando active) — HTTP check 200.
8. `bookmarks.ioon.mx` (Hoarder) — HTTP check 200.
9. `chat.ioon.mx` (AnythingLLM) — HTTP check 200.
10. `wiki.ioon.mx` (SilverBullet) — HTTP check 200.
11. `flow.ioon.mx` (AppFlowy self-hosted, fase C) — HTTP check 200.
12. `canvas.ioon.mx` (AFFiNE self-hosted, fase C) — HTTP check 200.

### Sitios cliente activos

13. `serclin.ioon.mx` — HTTP check 200 + keyword check (palabra "Serclin" en HTML).
14. `educativoantequera.ioon.mx` (cuando se active) — HTTP check 200.
15. `<próximo cliente>` — al ir activándose.

### APIs externas críticas

16. GitHub API — HTTP check.
17. OpenRouter API — HTTP check (afecta Tau + AnythingLLM).
18. Google Workspace SMTP — TCP check (afecta envío email Mautic).
19. Backblaze B2 endpoint — HTTP check (afecta backups · ver P2-1).

---

## 5. Razones de la elección

### 5.1 Self-hosted con UI moderna

Uptime Kuma tiene UI atractiva (a diferencia de Nagios/Icinga). Dashboard claro. Status pages estilizables.

### 5.2 Setup trivial

Single Docker container. SQLite built-in. Sin DB externa. Sin tuning compleja.

### 5.3 Multi-protocolo

HTTP/HTTPS · TCP · Ping · DNS · Push (heartbeat desde servicios) · keyword check · regex en respuesta · gRPC. Cubre todos los casos del estudio.

### 5.4 Notificaciones multi-canal

Telegram · email · Discord · webhooks · 90+ integraciones. Telegram es el canal natural del estudio.

### 5.5 Status pages públicas

Cliente puede ver `status.<sucliente>.com` con el uptime de su servicio. Bonus de profesionalismo.

### 5.6 Filosofía alineada

MIT · self-hostable · sin telemetría · datos locales.

---

## 6. Alternativas evaluadas y descartadas

### UptimeRobot
SaaS · free tier 50 monitores con check cada 5 min. Suficiente para arranque · pero filosofía rota + lock-in. Descarte por filosofía.

### BetterStack (anteriormente Better Uptime)
SaaS · UX excelente · status pages bonitas · $24-100 USD/mes. Para un estudio con muchos sitios cliente la cuenta crece. Descarte por costo escalable + filosofía.

### Pingdom · Datadog Synthetics · New Relic
Enterprise · caros · sobreingeniería para el caso. Descarte por mismatch de escala.

### Healthchecks.io
Foco en heartbeats de cron jobs · no uptime de sitios. Caso de uso distinto. Descarte por mismatch.

### Nagios · Icinga · Zabbix
Open source clásicos · UI antigua · setup pesado · overkill para escala personal. Descarte por UX y peso.

### Cabot · Statping
Open source más viejos · comunidad pequeña · features menos pulidas. Descarte por madurez relativa.

---

## 7. Setup operativo

### Fase 1 — instalación (semana del 19-may)

1. Coolify · proyecto "Uptime Kuma" desde catálogo.
2. Subdominio `status.ioon.mx` (login dashboard).
3. Crear usuario admin con master password (almacenar en Vaultwarden cuando 8-5-9 active).
4. Configurar bot de Telegram para notificaciones · crear `@ioon_uptime_bot` o reutilizar `@ioon_agent_bot` con comando dedicado.
5. Configurar SMTP saliente para email (vía Google Workspace cuando 8-5-6 active).

### Fase 2 — monitores iniciales

6. Crear los 19 monitores del §4.
7. Configurar grupos: "Infra" · "Servicios self-hosted" · "Sitios cliente" · "APIs externas".
8. Configurar maintenance windows si hay ventanas de deploy regulares.

### Fase 3 — status page cliente

9. Por cliente activo, crear status page filtrada con solo sus servicios.
10. Subdominio status público del cliente (si lo justifica): `status.<cliente>.com`.

---

## 8. Costos

| Concepto | Costo |
|---|---|
| Licencia Uptime Kuma | $0 (MIT self-hosted) |
| Hosting incremental | $0 (cubierto por VPS · usa ~100 MB RAM) |
| SQLite | $0 |
| Telegram Bot API | $0 |
| **Total mensual** | **$0** |

---

## 9. Riesgos y mitigaciones

### Si el VPS muere, el monitor muere con él
Si Uptime Kuma corre en `servidor-ioon-2` y el VPS cae, el monitor no puede avisar. Mitigación inmediata: configurar un monitor externo redundante (UptimeRobot free tier · monitorea solo `status.ioon.mx` · si esto cae, alerta directo a Telegram). Costo: $0.

### Falsos positivos por checks demasiado agresivos
Si un sitio cliente es lento por momentos, Uptime Kuma puede alertar como down cuando solo está lento. Mitigación: configurar timeouts razonables (30 segundos) y umbrales (alertar tras 2 checks fallidos consecutivos).

### Telegram bot puede caer
Si Telegram bot API tiene downtime, las alertas no llegan. Mitigación: notificaciones redundantes (Telegram + email).

---

## 10. Criterios de reapertura

1. **Uptime Kuma abandonado**. Disparador: migrar a Healthchecks.io self-hosted o BetterStack si la operación lo justifica.
2. **Operación crece a >50 monitores con SLA cliente serio**. Disparador: evaluar BetterStack o Datadog (con costo).
3. **Necesidad de observability más profunda** (APM, logs, traces). Disparador: agregar herramienta complementaria (Grafana + Loki + Tempo · no reemplazar Uptime Kuma).

---

## 11. Vigencia y revisión

**Revisión natural:** 3 meses post-fase 2 (validar que las alertas son útiles, no ruido).

**Revisión por evento:** cualquiera del §10.

---

## 12. Política de respuesta a alertas

Para que el monitor sea útil, las alertas deben generar acción consistente:

- **Sitio cliente caído** → diagnóstico inmediato (curl + logs Coolify) · si no resuelve en 10 min, notificar cliente con ETA.
- **Servicio self-hosted del estudio caído** → diagnóstico cuando sea posible · sin SLA externo · pero log del incidente en pendientes técnicos 8-4-7.
- **API externa caída** (OpenRouter, Workspace, B2) → registrar incidente · ajustar workflow si recurrente.

La regla central: **una alerta sin acción es ruido · ruido entrena a ignorar alertas · entrenarse a ignorar mata el sistema.**

---

*Decisión cristalizada el 14-may-2026 20:30 UTC-6.*
