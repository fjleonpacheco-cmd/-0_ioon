---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260515-0752
autor: Francisco Javier León Pacheco
nivel: documento operativo · inventario de pendientes
estado: vigente — cuarta revisión · sustituye v20260514-2200
proposito: inventario operativo de pendientes técnicos del estudio ioon. Esta cuarta revisión cierra P0-1.1 fase 1 Hermes/Tau (archivos canónicos emitidos con identidad Tau v20260514-2310) · suma decisión Vaultwarden (8-5-9) como P5-11 nuevo · suma identidad Tau como P5-12 nuevo · suma decisión diferida de rename de path como P5-13. Integra `fjlp_1-5-8` (decisión canónica de personalidad y nombre del agente operativo).
depende_de:
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1948 (marco v5 bi-eje)
  - ioon_8-4-17_planeacion-tecnica_decision-rol-de-hermes_v20260514-1408 (régimen 3 niveles)
  - ioon_8-4-9_planeacion-tecnica_decision-hermes-vs-iiagent_v20260509-0034
  - ioon_8-4-11_planeacion-tecnica_plan-implementacion-hermes_v20260511-1115
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656
  - ioon_8-4-13_planeacion-tecnica_inputs-davide-perozzi-2k19-vs-marco-v4_v20260511-1139
  - ioon_8-4-3_planeacion-tecnica_arquitectura-captura-y-dashboard_v20260514-2055 (modelo C híbrido fase C)
  - ioon_8-4-16_planeacion-tecnica_nota-coolify-autodeploy-no-confiable-y-force-rebuild_v20260514-2017
  - ioon_8-5-0_stack_introduccion-y-cestas-decisiones-operativas_v20260514-1417
  - ioon_8-5-2_stack_inventario-maestro_v20260515-0752
  - ioon_8-5-3_stack_propuesta-evaluacion_gestor-contrasenas-y-totp_v20260514-2030
  - ioon_8-5-4_stack_guia-comparativa_appflowy-affine-silverbullet-para-captura-cotidiana_v20260514-2045
  - ioon_8-5-5_stack_decision-twenty-crm_v20260514-2100
  - ioon_8-5-6_stack_decision-google-workspace-correo_v20260514-2103
  - ioon_8-5-7_stack_decision-payload-entrega-cliente_v20260514-2106
  - ioon_8-5-8_stack_decision-mautic-marketing-automation_v20260514-2110
  - ioon_8-5-9_stack_decision-vaultwarden-gestor-contrasenas-y-totp_v20260514-2245
  - ioon_8-5-10_stack_decision-formalizacion-hoarder_v20260514-1430
  - ioon_8-5-11_stack_decision-formalizacion-anythingllm_v20260514-1432
  - ioon_8-5-12_stack_decision-observabilidad-uptimekuma_v20260514-1434
  - ioon_8-0-2_instrucciones-espacio_vocabulario-canonico-glosario_v20260514-2315
  - fjlp_1-5-8_aprendizaje_decision-tau-personalidad-y-nombre_v20260514-2310
  - ioon_hermes_SOUL_v20260514-2310 (SOUL.md vigente · en GitHub branch hermes/setup)
  - ioon_hermes_context-fjlp_v20260514-2310
  - ioon_hermes_context-ioon_v20260514-2310
sustituye_a:
  - ioon_8-4-7_planeacion-tecnica_pendientes-tecnicos_v20260514-2200
  - ioon_8-4-7_planeacion-tecnica_pendientes-tecnicos_v20260514-1505
  - (versiones previas en cadena)
alimenta_a:
  - ioon_8-4-10 resumen ejecutivo (lista consolidada para vista rápida)
  - ioon_8-4-8 estado-actual-stack (snapshot operativo · próxima versión)
  - SOUL.md de Tau (P3-8 alimenta las reglas de delegación Nivel 2 → Nivel 3)
---

# Pendientes técnicos del estudio ioon · v20260515-0752

Inventario operativo. Cada pendiente tiene id estable (P0-1, P1-2, etc.), contexto mínimo, esfuerzo estimado, dependencias y criterio de cierre.

**Convención de prioridades:**

- **P0** — críticos / desbloqueantes.
- **P1** — operativos del cutover.
- **P2** — mejoras no bloqueantes.
- **P3** — documentación que debe regenerarse después.
- **P4** — research / aprendizaje sin presión.
- **P5** — roadmap mayor.
- **P6** — cliente real / proyectos paralelos.
- **P7** — ideas guardadas; revisar trimestralmente.

---

## 1. P0 · Críticos / desbloqueantes

### P0-1 · Migración Hermes Agent · activación de Tau

**Contexto.** Decisión 8-4-9 + plan 8-4-11. II-Agent fuera de servicio; Hermes Agent (Nous Research, MIT) lo sustituye con topología A. **Régimen de delegación canonizado en 8-4-17:** Tau (identidad operativa del agente sobre Hermes Agent) vive como **asistente conversacional con autonomía progresiva (Nivel 1 / Nivel 2 / Nivel 3)**, no como orquestador central.

**Esfuerzo.** ~12-16 h reales acumuladas, ~14 días calendario.

**Sub-tareas:**

- **P0-1.1 — Fase 1 preparación · CERRADO 2026-05-14.** SOUL.md + context/fjlp.md + context/ioon.md emitidos (versiones v20260514-2310 con identidad Tau · commiteados en branch `hermes/setup` del repo `-0_ioon`). Pendientes operativos residuales: (a) crear bot secundario `@ioon_agent_test_bot` vía @BotFather, (b) guardar token en Vaultwarden (futuro · iCloud Keychain transitorio).
- **P0-1.2 — Fase 2 deploy paralelo** con bot secundario.
- **P0-1.3 — Fase 3 pruebas** de las 4 categorías (captura, consulta, dictado, workflows) + MCPs (filesystem, Calendar) + medición de patrones de aprobación para futura promoción Nivel 2→3 (no se promueve durante fase 3).
- **P0-1.4 — Fase 4 switch** del token principal · **PUNTO DE NO RETORNO**.
- **P0-1.5 — Fase 5 cleanup.** Cierra automáticamente P0-3 (voz) y P1-1 (Google OAuth obsoleto).

**Estado.** Fase 0 completada · Fase 1 archivos canónicos emitidos y commiteados a GitHub · Fase 1 operativa pendiente (bot secundario + iniciar fase 2).

### P0-2 · Sitio Serclin · scroll-storytelling con GSAP+ScrollTrigger · ✅ LIVE

**Estado.** ✅ **LIVE en `serclin.ioon.mx`** desde 2026-05-14 con feedback aprobado por el cliente. P0-2 cerrado completo. Pendiente residual no bloqueante: **P3-11** ficha técnica del proyecto cliente en chat 8.14.2.

### P0-3 · Primer demo cliente "Motor de proofing fotógrafo"

**Contexto.** Decisión 8-4-12. Primer ejercicio real del stack Next.js + Payload.

**Esfuerzo.** Estimación preliminar 12-20 h reales.

**Estado.** No iniciado. Beneficia de la curva GSAP+ScrollTrigger ya pagada en P0-2 Serclin.

**Sub-tareas P0-3.1 a P0-3.7** (bootstrap + modelos Payload + UI + estilado + pipeline imagen + deploy + ficha técnica).

### P0-4 · Pipeline de voz operativo

**Estado.** Bloqueado por P0-1.4 (switch Tau). Cierra automáticamente con Tau operacional (voz nativa de Hermes Agent).

---

## 2. P1 · Operativos del cutover

### P1-1 · Rotar Google OAuth secret · CIERRA CON P0-1.5

Bloqueado por P0-1.5. Cierra como "secret eliminado" en fase 5 Tau.

### P1-2 · Destruir VPS viejo `servidor-ioon-1` (89.167.93.139)

**Esfuerzo.** 5 min activos. **Pre-requisito crítico:** preservar snapshot Hetzner `379810905` antes.

**Estado.** Ventana mínima cumplida; cierre cuando el autor quiera.

### P1-3 · SSH key vieja eliminada · CERRADO 2026-05-08

✅ Cerrado.

### P1-4 · Renombrar alias SSH `ioon-new`

**Esfuerzo.** 1 cambio en `~/.ssh/config`.

### P1-5 · Borrar `~/.ssh/config.bak`

**Esfuerzo.** 1 comando.

### P1-6 · Borrar `8_ioon/docs/.write_test`

**Esfuerzo.** Requiere `rm` directo en terminal local del Mac.

---

## 3. P2 · Mejoras no bloqueantes

### P2-1 · Backups automáticos de Coolify v4 · **EN CONFIGURACIÓN**

**Estado.** **En curso 2026-05-15.** Bucket Backblaze B2 `ioon-coolify-backups` creado (us-east-005) · application key restringida generada · S3 Storage validado en Coolify v4. **Pendiente operativo restante:** configurar schedule del backup automático del Postgres compartido + trigger primer backup manual de verificación + confirmar archivo aparece en B2.

### P2-2 · Playbook rotación `N8N_ENCRYPTION_KEY`

Pendiente operativo. 1-2 h.

### P2-3 · Monitoreo / alertas de uptime y certs · **DECISIÓN CERRADA**

Decisión cerrada en `ioon_8-5-12`: **UptimeKuma** vigente, Grafana en standby. Pendiente: deploy UptimeKuma + 9 monitores + alertas. ~1-2 h.

### P2-4 · Cap mensual OpenRouter · CERRADO 2026-05-15

✅ Cerrado vía balance $20 USD cargado con Auto Top-Up deshabilitado · cap natural por balance.

### P2-5 · Rotación periódica de SSH keys del VPS

Política: cada 6 meses (próxima: noviembre 2026).

### P2-6 · Diagnóstico webhook GitHub→Coolify autodeploy · derivado de 8-4-16

Diagnóstico de causa raíz del auto-deploy fallido. 2-3 h. Mientras tanto, patrón operativo Redeploy + Force rebuild vigente.

### P2-7 · Wildcard `*.ioon.mx` documentado · CERRADO 2026-05-15

✅ Cerrado. Verificación reveló que existe **A record wildcard `*.ioon.mx` → 178.104.111.155** en GoDaddy · el 503 en `coolify.ioon.mx` es comportamiento esperado de Traefik para subdominios sin handler. No es bug · es feature del wildcard. Documentado en glosario 8-0-2 §1.4 del inventario maestro.

### P2-8 · Higiene de git en sesiones de varios bloques · derivado de 8-4-16 §3.4

Mitigación: `git status` + `git diff --staged` antes de cada `git commit` cuando se trabaja por bloques diferenciados. No es bloqueante; queda como micro-disciplina.

### P2-9 · **NUEVO** · Activar Time Machine local del Mac · PRIORIDAD ALTA

**Contexto.** Tras incidente de borrado accidental del 2026-05-15 09:25 CST que perdió toda la carpeta `~/Documents/8_ioon/8_ioon/` (notas canónicas del sistema fjlp), se confirmó que **Time Machine no estaba activo**. Sin Time Machine, sin iCloud sync de esa carpeta, y sin disk recovery intentado, la recuperación se hizo via Cowork outputs (parcial).

**Acción:**

1. Conseguir disco externo de mínimo 1 TB (USB-C o Thunderbolt) dedicado a Time Machine.
2. System Settings → General → Time Machine → Select Backup Disk.
3. Configurar backup cada hora (default) sobre `~/Documents/`, `~/Desktop/`, repos del estudio, configuración del sistema.
4. Verificar primer backup completo exitoso.

**Esfuerzo:** 30 min setup + ~1-3 h primer backup full según volumen.

**Prioridad:** **ALTA** · prevención inmediata para evitar repetición del incidente.

### P2-10 · **NUEVO** · Migrar carpeta `~/Documents/8_ioon/8_ioon/` a iCloud Drive sync · PRIORIDAD MEDIA

**Contexto.** Mismo incidente del 2026-05-15. iCloud Drive ofrece "Recently Deleted" con 30 días de retención · seguro adicional sobre Time Machine.

**Acción:**

1. En Finder, mover la carpeta `~/Documents/8_ioon/8_ioon/` (cuando se restaure) a `~/Documents/8_ioon/` dentro de iCloud Drive sync.
2. Verificar que la carpeta tiene ícono de nube ☁️ confirmando sync activo.
3. Opcionalmente: marcar archivos críticos como "Keep Downloaded" para que siempre estén disponibles offline.

**Esfuerzo:** 15 min.

**Caveat:** iCloud Drive puede tener problemas con archivos `.md` que algunos editores tratan distinto · validar que tu editor preferido (probablemente Obsidian, VS Code, o equivalente) maneja bien iCloud sync. Si genera conflictos, considerar Syncthing self-hosted como alternativa.

---

## 4. P3 · Documentación que debe regenerarse después

### P3-1 · Marco 8-4-2 v5 estructural bi-eje · CERRADO 2026-05-11 19:48

✅ Cerrado.

### P3-2 · Pendientes 8-4-7 v20260515-0752 · ESTE DOCUMENTO

✅ Cerrado.

### P3-3 · Estado del stack 8-4-8 vNueva

Pendiente — emitir versión que refleje cierres recientes + identidad Tau. 1-2 h.

### P3-4 · Plan de implementación Hermes 8-4-11 · CERRADO 2026-05-11

✅ Cerrado.

### P3-5 · ioon-effects requerimientos 8-4-6 con R3F+drei + SVG nativo

Pendiente reescritura. 2-3 h.

### P3-6 · Ficha del primer demo Motor de proofing

Bloqueado por P0-3.

### P3-7 · Reescritura `LiquidTextWebGL.jsx` OGL → R3F+drei

Bloqueado por P3-5. 3-5 h.

### P3-8 · Documentar reglas de delegación Nivel 2 → Nivel 3 en SOUL.md · CERRADO 2026-05-14

✅ Cerrado al emitir SOUL.md v20260514-2310 con bloque §4 régimen 3 niveles.

### P3-10 · Inventario maestro 8-5-2 v20260515-0752 · CERRADO 2026-05-15

✅ Cerrado.

### P3-11 · Ficha técnica del proyecto Serclin · NUEVA

Pendiente. Ancla en chat 8.14.2. 2-3 h. No urgente.

### P3-12 · `fjlp_1-5-8` decisión Tau · CERRADO 2026-05-14 23:10

✅ Cerrado.

### P3-13 · **NUEVO** · Nota canónica del incidente de borrado · PRIORIDAD MEDIA

**Contexto.** El incidente del 2026-05-15 09:25 CST merece nota canónica que documente:

- Qué pasó (borrado accidental + vaciar basurero).
- Qué se perdió (carpeta `~/Documents/8_ioon/8_ioon/` con todas las notas canónicas del sistema fjlp).
- Recursos vivos consultados (GitHub ✅ · Cowork outputs ✅ · iCloud ❌ no aplicaba · Time Machine ❌ no activo · disk recovery no intentado).
- Recuperación efectiva (regeneración via Cowork de archivos del día).
- Lecciones aprendidas (P2-9, P2-10 derivados).

**Ubicación sugerida:** `fjlp_1-5-9_aprendizaje_incidente-borrado-y-recuperacion-canon_v<fecha>.md`.

**Esfuerzo:** 1 h.

---

## 5. P4 · Research / aprendizaje sin presión

### P4-1 · Three.js Journey (Bruno Simon)

~40 h distribuidas.

### P4-2 · Payload deep-dive

4-6 h.

### P4-3 · Astro 5 nuevas features

2-3 h.

### P4-4 · GSAP+ScrollTrigger tutorial intensivo · CERRADO con P0-2 Serclin

✅ Cerrado operacionalmente con Serclin LIVE.

---

## 6. P5 · Roadmap mayor

### P5-1 · Hoarder · DECISIÓN CERRADA

Pendiente operativo: deploy + DNS + import inicial. ~4-6 h.

### P5-2 · AnythingLLM · DECISIÓN CERRADA

Pendiente operativo: deploy + DNS + embeddings locales + ingestión gradual. ~6-10 h.

### P5-3 · Dashboard propio

Bloqueado por P0-3.

### P5-4 · Sub-tareas absorbidas por P0-1 · CERRADO

✅

### P5-5 · Twenty CRM · DECISIÓN CERRADA

Pendiente operativo: deploy + DNS + configuración pipeline + custom fields + import inicial. ~3-5 h.

### P5-6 · Google Workspace correo · DECISIÓN CERRADA · YA VIGENTE

Pendiente operativo residual: app-specific password para SMTP (guardar en Vaultwarden cuando se despliegue) + DMARC reports. <1 h.

### P5-7 · Payload entrega al cliente · DECISIÓN CERRADA · validación en P0-3

Sin pendiente operativo aparte de P0-3.

### P5-8 · Mautic marketing automation · DECISIÓN CERRADA · ESTRUCTURAL

Pendiente operativo: decidir MariaDB vs Postgres + deploy + DNS + SMTP outbound + segmentos canónicos + templates + GDPR + primera campaña piloto. **8-12 h** distribuidas.

### P5-9 · Modelo C híbrido fase C · 3 herramientas de captura · DECISIÓN CERRADA

Pendiente operativo agregado:

- **P5-9.a Deploy AppFlowy** + DNS `notes.ioon.mx` + cert + workspaces canónicos. ~2-3 h.
- **P5-9.b Deploy AFFiNE.pro** + DNS `canvas.ioon.mx` + cert + workspaces. ~2-3 h.
- **P5-9.c Deploy SilverBullet** + DNS `wiki.ioon.mx` + cert + directorio en repo `-0_ioon`. ~2-3 h.

### P5-10 · Migración desde Notion al stack nuevo

Bloqueada por P5-9 + P2-1. ~6-10 h distribuidas.

### P5-11 · Vaultwarden gestor de contraseñas + TOTP · DECISIÓN CERRADA

Decisión `ioon_8-5-9`. Pendiente operativo:

1. Deploy Vaultwarden en Coolify (~1 h).
2. DNS + cert `vault.ioon.mx` (~10 min).
3. Crear cuenta + master password + 2FA + setear `SIGNUPS_ALLOWED=false`.
4. Configurar folders canónicos.
5. Import desde iCloud Keychain (manual · gradual).
6. **Documentar master password en papel físico** + recovery kit físico (obligatorio).
7. Probar recovery flow.
8. Disciplina de export semanal del vault encrypted a disco local.

**Esfuerzo total:** 3-5 h distribuidas. **Bloqueado por P2-1.**

### P5-12 · Identidad Tau del agente operativo · DECISIÓN CERRADA · NUEVA

Decisión canónica `fjlp_1-5-8`. Implementación operativa ya aplicada en SOUL.md + context files + glosario + inventario maestro. Sin sub-tarea operativa de implementación adicional.

### P5-13 · Decisión diferida · rename de path `0_ioon/hermes/` a `0_ioon/tau/` · NUEVO

Decisión diferida sin urgencia. Esfuerzo cuando se ejecute: ~30 min de ediciones + commits + verificación.

---

## 7. P6 · Cliente real / proyectos paralelos

### P6-1 · Cliente fotógrafo profesional con volumen alto

Sin cliente concreto agendado. P0-3 prepara el portafolio.

### P6-2 · Cliente potencial Alemania

Lead frío. Re-evaluar trimestralmente.

### P6-3 · Casa Grande (proyecto 7 paralelo de Francisco)

Sin agendamiento. No bloquea P0 de ioon. Mautic le sirve cuando se despliegue.

---

## 8. P7 · Ideas guardadas (revisión trimestral)

- **P7-1** · Asistente "auditor técnico de sitios web".
- **P7-2** · Migración a Penpot.
- **P7-3** · WebGPU adoption.
- **P7-4** · Plugins GSAP especializados.
- **P7-5** · Monorepo con Turborepo.
- **P7-6** · Promoción de acciones específicas de Tau a Nivel 3.
- **P7-7** · Reabrir nombre del agente con Glifo como reserva canónica si Tau se siente frío en uso real.

---

## 9. Cierres y cambios registrados en esta versión

Cierres acumulados de la sesión 2026-05-11 al 2026-05-15:

| Id | Item | Fecha cierre |
|---|---|---|
| Marco v5 bi-eje | Apertura estructural | 2026-05-11 19:48 |
| 8-4-17 rol de Hermes | Hermes asistente con autonomía progresiva 3 niveles | 2026-05-14 14:08 |
| 8-5-0 índice cestas | Primera nota canónica del chat 8.5 | 2026-05-14 14:17 |
| P5-1 Hoarder | Decisión cerrada | 2026-05-14 14:30 |
| P5-2 AnythingLLM | Decisión cerrada | 2026-05-14 14:32 |
| P2-3 observabilidad UptimeKuma | Decisión cerrada | 2026-05-14 14:34 |
| 8-0-2 glosario | Innovation Studio = ioon · Casa Grande = proyecto 7 | 2026-05-14 14:36 + 14:50 |
| 8-5-2 inventario maestro v1/v2 | Primera y segunda versión | 2026-05-14 15:00 + 21:15 |
| 8-5-3 propuesta gestor contraseñas | Análisis 5 candidatos · Vaultwarden recomendado | 2026-05-14 20:30 |
| 8-5-4 guía AppFlowy/AFFiNE/SilverBullet | Opción 3 confirmada | 2026-05-14 20:45 |
| 8-4-3 modelo C híbrido fase C | Notion sale · 3 herramientas entran | 2026-05-14 20:55 |
| P5-5 Twenty CRM | Decisión cerrada | 2026-05-14 21:00 |
| P5-6 Google Workspace correo | Decisión cerrada (ya operativo) | 2026-05-14 21:03 |
| P5-7 Payload entrega | Decisión cerrada arquitectónicamente | 2026-05-14 21:06 |
| P5-8 Mautic marketing automation | ESTRUCTURAL: abre §1.17 + §2.8 | 2026-05-14 21:10 |
| P5-11 Vaultwarden | Decisión cerrada | 2026-05-14 22:45 |
| P0-2 Serclin · LIVE | Sitio en `serclin.ioon.mx` con feedback aprobado | 2026-05-14 |
| `fjlp_1-5-8` decisión Tau | Material interno · 3 referencias · 7+ nombres descartados | 2026-05-14 23:10 |
| SOUL.md de Tau v20260514-2310 | §1+§2 reemplazados · identidad Tau + 8 reglas | 2026-05-14 23:10 |
| context/fjlp.md v20260514-2310 | Rename Hermes → Tau (5 reemplazos) | 2026-05-14 23:10 |
| context/ioon.md v20260514-2310 | Rename Hermes → Tau (7 reemplazos) | 2026-05-14 23:10 |
| 8-0-2 glosario v20260514-2315 | §3 Tau + §6 Hermes Agent | 2026-05-14 23:15 |
| 8-5-2 inventario maestro v20260515-0752 | Rename §1.9 · cierre día tardío | 2026-05-15 07:52 |
| 8-4-7 v20260515-0752 | ESTE DOCUMENTO | 2026-05-15 07:52 |
| **P0-1.1 fase 1 Hermes/Tau commiteado a GitHub** | SOUL.md + context files en branch `hermes/setup` del repo `-0_ioon` | 2026-05-15 ~08:30 |
| **P2-4 cap OpenRouter** | Vía balance $20 USD sin Auto Top-Up | 2026-05-15 ~08:00 |
| **P2-7 wildcard `*.ioon.mx`** | Documentado como comportamiento esperado | 2026-05-15 ~09:00 |
| **Gitignore global Mac** | `.DS_Store` excluido de todos los repos | 2026-05-15 ~08:45 |
| **Backblaze B2 bucket + key + S3 Storage Coolify** | Validado · pendiente schedule backup automático Postgres | 2026-05-15 ~09:20 |
| **Incidente borrado `8_ioon/8_ioon/`** | Recuperación via Cowork + GitHub · P2-9 y P2-10 derivados | 2026-05-15 ~09:30 |

---

## 10. Próximas acciones inmediatas

**Bloque inmediato post-incidente recuperación:**

1. **Restaurar archivos canónicos** desde Cowork outputs (en curso · 5 archivos del Batch 1 ya regenerados).
2. **Clonar repo `-0_ioon` desde GitHub** en `~/Documents/8_ioon/-0_ioon` para restaurar código + SOUL.md de Tau.

**Bloque 1 · alta prioridad prevención:**

3. **P2-9 activar Time Machine** con disco externo · ~30 min setup. Prevención obligatoria tras incidente del 2026-05-15.

**Bloque 2 · cerrar P2-1 backups Coolify:**

4. Configurar schedule del backup Postgres apuntando a B2 + trigger primer backup manual + verificar archivo en bucket. ~1 h.

**Bloque 3 · deploys operativos paralelizables (tras P2-1):**

5. **P2-3 deploy UptimeKuma** (1-2 h).
6. **P5-11 deploy Vaultwarden** (3-5 h) · paso necesario antes de migrar canon crítico al stack nuevo.
7. **P5-9.a/b/c deploys AppFlowy + AFFiNE + SilverBullet** (~6-9 h paralelizables).
8. **P5-1 deploy Hoarder** (4-6 h).
9. **P5-2 deploy AnythingLLM** (6-10 h).
10. **P5-5 deploy Twenty CRM** (3-5 h).
11. **P5-8 deploy Mautic** (8-12 h).

**Bloque 4 · migración Notion (tras todos los deploys):**

12. **P5-10 migración desde Notion** (6-10 h).

---

## 11. Decisiones operativas del marco v5 §9 — status actualizado al 2026-05-15

| Id marco v5 §9 | Status |
|---|---|
| 9.1 Selección de PAC | Diferida · Facturama candidato · SAT manual transitorio |
| 9.2 Selección gestor de contraseñas | ✅ CERRADA · 8-5-9 Vaultwarden |
| 9.3 Selección app TOTP | ✅ CERRADA · colapsa con 9.2 |
| 9.4 Selección proveedor correo desde dominio | ✅ CERRADA · 8-5-6 Google Workspace |
| 9.5 Dimensionamiento storage pesado | Bloqueado por levantamiento de volumen |
| 9.6 Confirmación Notion CRM (2.1) | ✅ CERRADA · Notion sale · Twenty + modelo C fase C |
| 9.7 Confirmación Payload entrega (2.4) | ✅ CERRADA · 8-5-7 |
| Adicional · Mautic | ✅ CERRADA · 8-5-8 |

**Quedan abiertas en cola de 8.5:** solo 9.1 (PAC diferida) y 9.5 (storage bloqueada por levantamiento).

---

*Inventario v20260515-0752 generado el 2026-05-15 07:52 CST (UTC-6 Oaxaca). Cuarta revisión que cierra P0-1.1 fase 1 Hermes/Tau · suma P2-9 y P2-10 derivados del incidente de borrado del 2026-05-15 · suma P5-11/12/13. Sustituye v20260514-2200. Próxima revisión: al completar bloque 3 deploys operativos o al ejecutar P2-9 Time Machine, lo que llegue primero.*
