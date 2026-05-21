---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260511-2043
autor: Francisco Javier León Pacheco
nivel: item
estado: vivo-con-pendientes
proposito: inventario maestro del stack de ioon — reescritura estructural alineada al marco v5 (bi-eje técnico + operativo, 16 + 7 categorías, restricciones duras transversales recuperadas, reglas de cruce entre ejes, 7 decisiones operativas pendientes para 8.5). Reescritura porque el v2029 quedó sin estructura compatible al pasar marco v2020 → v3/v4 → v5. Documento vivo, se actualiza cada vez que cambia algo.
supersede_a:
  - ioon_8-5-2_stack_inventario-maestro_v20260422-2029 (snapshot post-marco v2020 + 8.4.3 v2; quedó sin estructura compatible al refactorizarse el marco a bi-eje en v5)
depende_de:
  - fjlp_1-1_contexto-general-francisco
  - fjlp_1-2-4_organizacion-de-archivos_directriz-nombres_v20260420-1843
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255
  - ioon_8-0-2_ioon_resumen-ejecutivo_v20260420-1324
  - ioon_8-5-1_stack_contexto_v20260422-1656
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1948 (marco v5 vigente · bi-eje)
  - ioon_8-4-3_planeacion-tecnica_arquitectura-captura-y-dashboard_v20260422-1951 (modelo C híbrido vigente · alimenta 2.1 CRM y 2.3 proyectos)
  - ioon_8-4-9_planeacion-tecnica_decision-hermes-vs-iiagent_v20260509-0034 (sustento §1.9)
  - ioon_8-4-10_planeacion-tecnica_resumen-ejecutivo-stack-y-pendientes_v20260511-1215 (resumen ejecutivo de 8.4 · cola P0)
  - ioon_8-4-11_planeacion-tecnica_plan-implementacion-hermes_v20260511-1115 (plan 5 fases Hermes)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (sustento §1.2, §1.11, §1.12, §1.13, §1.14, §1.16)
  - ioon_8-4-13_planeacion-tecnica_inputs-davide-perozzi-2k19-vs-marco-v4_v20260511-1139 (anotaciones §1.12, §1.14, §1.16)
alimenta_a:
  - ioon 8-5-3+ (fichas individuales por herramienta o categoría · cuando se abran)
  - ioon 8-5-X_stack_<categoria>_v...md (decisiones operativas pendientes §9 marco v5, en evaluación)
  - ioon 8-5-9 stack log-decisiones (cuando se cree)
  - ioon 8.6 website
  - ioon 8.11 motion-graphics
  - ioon 8.13 calendario-editorial
  - ioon 8.14.X (cuando un cliente exige una herramienta del stack)
---

# Inventario maestro — stack ioon (8.5.2 v2043) · bi-eje

Snapshot del stack de ioon al cierre del marco v5 estructural (`v20260511-1948`). Esta versión es **reescritura estructural**, no actualización: el v2029 quedó sin taxonomía compatible al pasar marco v2020 → v3/v4 → v5.

**Cómo leer este documento.** El marco v5 introduce dos ejes paralelos. El **§1A eje técnico** (16 categorías) lista qué tecnologías usa el estudio para construir; cada herramienta vive una sola vez aquí. El **§1B eje operativo** (7 categorías) lista qué funciones del negocio cubre el estudio y con qué; cada función referencia a las herramientas del eje técnico que la cubren mediante notación `→ 1.X`. El **§2 mapa cruzado** consolida cobertura. El **§3 restricciones duras** refleja el §7 del marco aplicado a la selección concreta. El **§4 cola operativa** integra P0 vigente + 7 decisiones operativas pendientes + cola de fichas individuales. El **§5 pendientes priorizados** distribuye trabajo en bloques A-F. El **§6 antecedentes** preserva trazabilidad histórica.

---

## 0. Resumen ejecutivo

### Conteo por estado

| Estado | Conteo |
|---|---|
| Operativa (eje técnico) | 19 |
| En migración (II-Agent → Hermes) | 1 |
| En evaluación formal (Notion → fase C de 8.4.3) | 1 |
| Planeada — crítica para abrir ventana C vs B (8.4.3) | 2 (AnythingLLM, portal Astro `dashboard.ioon.mx`) |
| Planeada — roadmap normal | 4 (Hermes deploy, Hoarder, Directus, Payload primer demo) |
| Standby con criterio de activación | 5 (R3F+drei al primer caso 3D, Cloudinary al primer fotógrafo profesional, imgproxy si Cloudinary escala, WebGPU al estabilizar R3F backend, Penpot al migrar diseño 100% OSS) |
| Decisión operativa pendiente (§9 marco v5) | 7 (PAC, gestor contraseñas, TOTP, correo dominio, storage pesado, confirmar Notion CRM, confirmar Payload entrega) |
| En evaluación independiente (Figma vs Penpot) | 1 |
| Antecedente cerrado por ahora | 1 (Frappe — no entra al stack) |

### Costos conocidos al corte

- **Infraestructura (VPS Hetzner CPX32 Nuremberg `178.104.111.155` + dominio + servicios OSS auto-desplegados):** estimado ~similar al CX32 anterior (~1,500–1,800 MXN/mes conjunto). Monto exacto del CPX32 aislado: `[PENDIENTE — TU DATO]`.
- **Notion** (Personal Pro estimado): ~100–200 MXN/mes. Confirmar plan exacto en ficha.
- **OpenRouter** (provider LLM Hermes): esperado $15–25 USD/mes, **cap duro $40 USD/mes** (a configurar en P2-4 de 8-4-10).
- **APIs Gemini + Claude directos** (legado del pipeline II-Agent): pay-per-use, en cierre con migración Hermes.
- **Adobe Creative Cloud:** `[PENDIENTE — TU DATO: Photography Plan o Plan completo, costo mensual]`.
- **GoDaddy** (dominio anual): `[PENDIENTE — TU DATO]`.
- **GitHub** (repo `fjleonpacheco-cmd/-0_ioon`): `[PENDIENTE — TU DATO: Free / Pro]`.

### 7 decisiones operativas pendientes (heredadas de §9 marco v5)

Para detalle ver §9 del marco. Cada una entra a la cola de 8.5 sin presión de cierre simultáneo:

1. **PAC para facturación** (2.2) — selección de Facturama / Bind / Contpaqi / Konfio / Facturación Moderna / otro.
2. **Gestor de contraseñas** (2.5) — instalación limpia: 1Password / Bitwarden / Vaultwarden self-hosted / Proton Pass / KeePassXC.
3. **App TOTP** (2.5) — puede colapsar a 9.2 si el gestor elegido incluye TOTP nativo.
4. **Correo desde dominio** (2.6) — Migadu / Fastmail / Mailcow self-hosted / otro.
5. **Storage pesado** (2.7) — bloqueada por levantamiento de volumen actual.
6. **Confirmar Notion para CRM** (2.1) — bloqueada por evidencia de fase C de 8.4.3.
7. **Confirmar Payload para entrega al cliente** (2.4) — bloqueada por P0-3 (Motor de proofing).

### Cola operativa P0 vigente (heredada de 8-4-10 v1215)

- **P0-1** Migración Hermes (5 fases, ~14 días calendario, ~12–16 h reales).
- **P0-2** Sitio Serclin (primer cliente real, microsite Astro + GSAP + ScrollTrigger, 26–30 h reales).
- **P0-3** Motor de proofing (primer demo Next.js + Payload).
- **P0-4** Pipeline de voz operativo (cierra automáticamente con P0-1.4).

**Plan de la semana** (de 8-4-10 §6): hoy/mañana ejecutar P0-2.1 pre-flight Serclin (4–5 h); en paralelo durante pausas, P2-4 cap OpenRouter (5 min) + P0-1.1 fase 1 Hermes (`SOUL.md` global + context files, 2–3 h).

---

## 1A. Inventario por las 16 categorías del eje técnico

### Convención de ficha estándar

Cada herramienta usa esta ficha. Campos sin dato hoy se marcan `[PENDIENTE — TU DATO]`. Campos no aplicables se marcan `n/a`. Para elementos sin atributos administrativos (lenguajes, fonts gratuitos, estándares web), se usa **ficha breve** (función, rol, estado, notas).

```
- nombre:
- función:
- categoría:
- rol: centro | satélite | candidata | en-retiro
- plan:
- costo:
- periodicidad:
- próxima renovación:
- titular:
- credenciales (referencia, NO contenido):
- fecha de alta:
- estado: operativa | planeada | a-definir | en-evaluación | en-migración | en-retiro | standby
- integraciones declaradas:
- enlaces de soporte:
- notas:
```

> **Recordatorio regla 5 del contexto 8.5:** nunca guardar contraseñas, tokens, API keys, frases de recuperación, números completos de tarjeta o respuestas de seguridad. Sí guardar el **lugar** donde viven.

---

### 1.1 Lenguajes de programación

#### JavaScript / TypeScript

- nombre: JavaScript / TypeScript
- función: lenguaje primario para frontend (Astro, Next.js, React) y backend (n8n custom, scripts de build).
- categoría: 1.1.
- rol: centro.
- estado: operativa.
- integraciones: base de todo el eje técnico web (1.2, 1.11, 1.12, 1.14, 1.16).
- notas: TypeScript preferido en código nuevo (especialmente Payload y componentes shadcn/ui). JS plano admitido en scripts cortos y configs.

#### Python

- nombre: Python
- función: scripting interno, posibles integraciones con Hermes vía MCPs custom.
- categoría: 1.1.
- rol: satélite.
- estado: operativa.
- notas: uso ocasional. No es base de ninguna pieza productiva del stack hoy.

#### Shell (bash / zsh)

- nombre: Shell
- función: administración del VPS, scripts de despliegue, automatización local.
- categoría: 1.1.
- rol: satélite.
- estado: operativa.
- notas: zsh por default en macOS Apple Silicon; bash en VPS Ubuntu.

#### HTML + CSS

- nombre: HTML + CSS
- función: estándares web base. CSS animations + transitions como primera línea (§1.12).
- categoría: 1.1.
- rol: centro.
- estado: operativa.
- notas: SVG nativo (`<feTurbulence>` + `<feDisplacementMap>`) cubierto en 1.12.

---

### 1.2 Frameworks de aplicación

#### Astro 5

- nombre: Astro
- función: framework para sitios de contenido (portafolios, sitios editoriales, motor de presentaciones, motor de catálogo, microsite Serclin).
- categoría: 1.2.
- rol: centro.
- plan: OSS.
- costo: 0 MXN.
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: n/a (proyecto comunitario).
- credenciales (referencia): n/a.
- fecha de alta: anterior al 20-abr-2026 (ya en stack vigente).
- estado: operativa.
- integraciones declaradas: 7 sitios productivos en `servidor-ioon-2` (`ioon.mx`, `canovera.ioon.mx`, `catalogo.ioon.mx`, `arquitectura-1.ioon.mx`, `fotografia-1.ioon.mx`, `hpt-demo.ioon.mx`, `hpt-demo-v2.ioon.mx`). Stack creativo-web cristalizado en 8-4-12. Próximo: microsite Serclin (P0-2) y portal Astro `dashboard.ioon.mx` (prototipo B de 8.4.3).
- enlaces de soporte: https://docs.astro.build
- notas: versión 5 vigente. Tailwind 4 + shadcn/ui como compañeros estándar. Patrón canónico de deploy en Coolify (Public Repository, branch main, Build Pack Dockerfile, dominio `*.ioon.mx`, SSL automático Let's Encrypt) — formalizado como Motor de catálogo en 1.16.

#### Next.js

- nombre: Next.js
- función: framework para apps con dashboards, autenticación, áreas privadas, e-commerce. Adoptado en 8-4-12 para casos como Motor de proofing.
- categoría: 1.2.
- rol: centro (apps cliente).
- plan: OSS.
- costo: 0 MXN.
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: n/a (proyecto comunitario Vercel).
- credenciales (referencia): n/a.
- fecha de alta: por adoptar en P0-3 (Motor de proofing).
- estado: planeada — adopción en P0-3.
- integraciones declaradas: Payload (1.11) corre dentro de Next.js como rutas de la misma app. Motor de proofing será el primer caso real.
- enlaces de soporte: https://nextjs.org/docs
- notas: versión a fijar al adoptar en P0-3. Self-hosted en Coolify por default; sin compromiso con Vercel hosting.

#### React

- nombre: React
- función: lenguaje común de componentes para Astro (islas), Next.js (app completa) y biblioteca propia ioon-effects (1.16).
- categoría: 1.2.
- rol: centro.
- plan: OSS.
- costo: 0 MXN.
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: n/a (proyecto comunitario Meta).
- credenciales (referencia): n/a.
- fecha de alta: ya en stack vigente vía shadcn/ui en Astro y demos del catálogo.
- estado: operativa.
- integraciones declaradas: shadcn/ui, Motion, R3F+drei, ioon-effects.
- enlaces de soporte: https://react.dev
- notas: confirmado como base de componentes en 8-4-12 §2.1.

---

### 1.3 Bases de datos y persistencia

#### PostgreSQL

- nombre: PostgreSQL
- función: DB principal compartida del stack (Coolify, n8n, futuro Hermes, futuro Payload).
- categoría: 1.3.
- rol: centro.
- plan: OSS, self-hosted sobre Coolify.
- costo: 0 MXN (incluido en VPS).
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: Francisco León (admin VPS).
- credenciales (referencia): `[PENDIENTE — TU DATO: dónde viven credenciales de admin]`.
- fecha de alta: anterior al cutover (operativo en `servidor-ioon-1`, migrado a `servidor-ioon-2` el 8-may).
- estado: operativa.
- integraciones declaradas: Coolify (DB propia), n8n (workflows + credentials), Hermes (al desplegar — DB compartida en lugar de dedicada como II-Agent), futuro Payload (apps cliente).
- enlaces de soporte: https://www.postgresql.org/docs/
- notas: lección de 8.4 — no usar hostname `postgres` en red Coolify (colisiona con `coolify-db`). El II-Agent usaba `iiagent-db` como hostname; al migrar a Hermes se evalúa renombrar lógica de DB o reusar.

#### Redis

- nombre: Redis
- función: caché y sesiones donde lo requiera el servicio.
- categoría: 1.3.
- rol: satélite.
- plan: OSS, self-hosted sobre Coolify.
- costo: 0 MXN (incluido en VPS).
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- fecha de alta: anterior al cutover.
- estado: operativa, **expuesto cerrado tras incidente del 24-abr-2026**.
- integraciones declaradas: II-Agent (en retiro), futuro Hermes (verificar requisito en docker-compose oficial), n8n posible.
- enlaces de soporte: https://redis.io/docs
- notas: el incidente Redis del 24-abr disparó la decisión de migrar II-Agent → Hermes (ver 8.4.9). Snapshot Hetzner `379810905` post-incidente preservado como red de seguridad.

#### MinIO

- nombre: MinIO
- función: storage de objetos S3-compatible para el stack self-hosted. Originales pesados (RAW, masters, PSD), backups del workspace de Notion (planeado P1-2), futuro Sharp / Cloudinary fase 2 lo usa para originales antes de CDN.
- categoría: 1.3.
- rol: centro (storage de objetos).
- plan: OSS, self-hosted sobre Coolify.
- costo: 0 MXN (incluido en VPS).
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): `[PENDIENTE — TU DATO: dónde viven access key y secret key]`.
- fecha de alta: anterior al cutover.
- estado: operativa.
- integraciones declaradas: II-Agent (en retiro), Coolify, próximo: backups Notion (P1-2), próximo: Payload (originales antes de Cloudinary), próximo: dimensionamiento storage pesado §9.5.
- enlaces de soporte: https://min.io/docs
- notas: cubre **2.7 dimensionamiento storage pesado** parcialmente. Para el caso completo (RAW + AEP + ProRes con política 3-2-1) se requiere levantar volumen actual y decidir si MinIO ampliado es suficiente o se complementa con NAS/cloud. Ver §9.5.

#### GitHub — repo `fjleonpacheco-cmd/-0_ioon`

- nombre: GitHub
- función: repositorio del estudio (mono-repo) y **canon de `.md`** (autoridad final de contenido per modelo C híbrido de 8.4.3).
- categoría: 1.3 (storage de código + canon de contenido).
- rol: centro.
- plan: `[PENDIENTE — TU DATO: Free / Pro / Team]`.
- costo: `[PENDIENTE — TU DATO]`.
- periodicidad: `[PENDIENTE]`.
- próxima renovación: `[PENDIENTE]`.
- titular: Francisco León (`fjleonpacheco-cmd`).
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- fecha de alta: anterior al cutover.
- estado: operativa.
- integraciones declaradas: Coolify (despliegues automáticos), próximo: n8n (sync Notion → `.md` vía git mv y commits — pendiente decisión 8.4.3), futuro: Hermes (filesystem MCP apuntando al repo).
- enlaces de soporte: https://docs.github.com
- notas: nombre del repo lleva guion inicial (`-0_ioon`). Estructura nueva pendiente: carpeta `inbox/` para items de bandeja (modelo C de 8.4.3) + carpeta `hermes/` para `SOUL.md`, `context/`, `skills/`, `memory/` (memory gitignored).

---

### 1.4 Hosting y deploys

#### Hetzner Cloud — `servidor-ioon-2`

- nombre: Hetzner Cloud CPX32 Nuremberg
- función: VPS productivo único donde vive todo el stack self-hosted.
- categoría: 1.4.
- rol: centro (infraestructura raíz).
- plan: CPX32.
- costo: incluido en el conjunto ~1,500–1,800 MXN/mes reportado en 8-4-10. `[PENDIENTE — TU DATO: monto exacto del CPX32 aislado]`.
- periodicidad: mensual.
- próxima renovación: `[PENDIENTE — TU DATO: día del cargo]`.
- titular: Francisco León (`[PENDIENTE — TU DATO: email cuenta Hetzner]`).
- credenciales (referencia): SSH key `fj-mac-ioon-vps-20260504` única válida; root password `[PENDIENTE — TU DATO: dónde vive]`.
- fecha de alta: 2026-05-04 (operando productivo desde cutover 2026-05-08).
- estado: operativa.
- integraciones declaradas: hostea Coolify, n8n, MinIO, Postgres, Redis, 7 sitios Astro productivos. Próximo: Hermes (P0-1), Payload (P0-3), Hoarder, Directus, AnythingLLM, portal Astro `dashboard.ioon.mx`.
- enlaces de soporte: https://docs.hetzner.com/cloud
- notas: IP `178.104.111.155`, OS Ubuntu 24.04.4 LTS. Sustituye a `servidor-ioon-1` Helsinki (`89.167.93.139`, CX32) que queda **apagado pero no destruido** como red de seguridad 7–14 días post-cutover. Snapshot `379810905` preservado.

#### Hetzner Cloud — `servidor-ioon-1` (en retiro)

- nombre: Hetzner Cloud CX32 Helsinki — `servidor-ioon-1`
- función: VPS legacy. Stopped post-cutover.
- categoría: 1.4.
- rol: centro (en retiro).
- estado: en-retiro (apagado, pendiente destruir en P1-1 del 8-4-10).
- notas: IP `89.167.93.139`. Snapshot `ioon-1-post-incident-20260424` (Hetzner ID `379810905`) preservado. Hetzner factura storage del VM apagado; cierre con P1-1 dentro de ventana 7–14 días post-cutover.

#### Coolify v4

- nombre: Coolify v4.0.0
- función: orquestación, despliegue y ruteo de servicios self-hosted (PaaS OSS). Acceso vía SSH tunnel.
- categoría: 1.4.
- rol: centro (orquestación de servicios).
- plan: self-hosted (sin licencia comercial).
- costo: 0 MXN (incluido en VPS).
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- fecha de alta: anterior al cutover, redeploy en `servidor-ioon-2`.
- estado: operativa.
- integraciones declaradas: GitHub (despliegues), Traefik (ruteo + SSL), todos los servicios del stack. Project ID `oanzltw6ejl6o6n9ch8avibw`.
- enlaces de soporte: https://coolify.io/docs
- notas: versión 4.0.0 (estable, ya no beta). Disponible en `coolify.ioon.mx`. Pendiente: backups automáticos de Coolify v4 (P2-1 de 8-4-10).

#### Docker

- nombre: Docker
- función: motor de contenerización donde corren todos los servicios del stack.
- categoría: 1.4.
- rol: centro (transitivo, vía Coolify).
- plan: OSS (Docker Engine).
- costo: 0 MXN.
- estado: operativa.
- integraciones declaradas: todos los servicios del stack.
- notas: gestionado vía Coolify, no se opera directamente salvo casos puntuales.

#### Traefik

- nombre: Traefik
- función: reverse proxy + ruteo automático de subdominios + SSL automático Let's Encrypt.
- categoría: 1.4.
- rol: centro (transitivo, vía Coolify).
- plan: OSS.
- costo: 0 MXN.
- estado: operativa.
- integraciones declaradas: rutea `*.ioon.mx` a los servicios correspondientes. Lección de 8.4: backend de servicios debe declarar red `coolify` en compose para que Traefik rutee.
- notas: pendiente menor en `coolify.ioon.mx` ("no available server" reportado en 8-4-9 §5.4).

---

### 1.5 Comunicaciones y mensajería

#### Telegram + Bot `@ioon_agent_bot`

- nombre: Bot Telegram `@ioon_agent_bot`
- función: canal primario de captura (texto y voz) hacia el agente del estudio.
- categoría: 1.5.
- rol: centro (canal de captura primario).
- plan: gratuito (Telegram Bot API).
- costo: 0 MXN.
- periodicidad: gratuito.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): bot token — `[PENDIENTE — TU DATO: dónde vive]`.
- fecha de alta: anterior al cutover.
- estado: operativa (workflow del bot en n8n **deshabilitado** post-migración Hermes en preparación).
- integraciones declaradas: hoy → n8n (workflow `7PXTleYO3NH8uXPb`, deshabilitado). Próximo (P0-1.4): conexión directa a Hermes Agent vía gateway nativo (Opción A de 8.4.9).
- enlaces de soporte: https://core.telegram.org/bots
- notas: token activo, **sin migrar aún**. La migración formal del token ocurre en P0-1.4 (día 13 del plan Hermes en 8-4-11).

#### Bot Telegram `@ioon_agent_test_bot`

- nombre: Bot Telegram `@ioon_agent_test_bot`
- función: bot secundario para fase 3 de pruebas Hermes (días 6-12 del plan 8-4-11).
- categoría: 1.5.
- rol: satélite (transitorio, solo durante migración).
- plan: gratuito.
- costo: 0 MXN.
- estado: por-crear (P0-1.2 con @BotFather).
- titular: Francisco León.
- credenciales (referencia): bot token nuevo a generar.
- notas: una vez completada la migración (fase 5), evaluar si se conserva como sandbox o se elimina.

#### Gmail

- nombre: Gmail
- función: comunicación general — lectura y borradores. Escritura solo bajo aprobación texto-a-texto.
- categoría: 1.5.
- rol: satélite.
- plan: `[PENDIENTE — TU DATO: Free personal o Workspace]`.
- costo: `[PENDIENTE]`.
- periodicidad: `[PENDIENTE]`.
- próxima renovación: `[PENDIENTE]`.
- titular: Francisco León (`fj.leonpacheco@gmail.com`).
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- estado: operativa.
- integraciones declaradas: Hermes vía MCP (planeado, fase 3 plan 8-4-11). Distinto de **2.6 correo desde dominio** (`<usuario>@ioon.mx` cara al cliente), que es decisión pendiente §9.4.
- notas: marco v5 §1.5 confirma: Gmail cubre comunicación general, no es identidad de correo del estudio cara al cliente.

---

### 1.6 Calendario y agenda

#### Google Calendar

- nombre: Google Calendar
- función: calendario unificado, bloques de foco / deep work.
- categoría: 1.6.
- rol: centro.
- plan: gratuito (cuenta personal).
- costo: 0 MXN.
- periodicidad: gratuito.
- próxima renovación: n/a.
- titular: Francisco León (`fj.leonpacheco@gmail.com`).
- credenciales (referencia): `[PENDIENTE]`.
- estado: operativa.
- integraciones declaradas: Hermes vía MCP (planeado, fase 3 plan 8-4-11). Cubre cruzado para **2.1 CRM** y **2.3 Gestión de proyectos**.
- enlaces de soporte: https://calendar.google.com/help
- notas: por marco v5 §1.6, Google Calendar es sistema vigente; integración vía MCP cuando Hermes esté operacional.

---

### 1.7 Diseño gráfico y multimedia

#### Figma — Free Starter

- nombre: Figma
- función: edición vectorial, layout, prototipado, plantillas reutilizables. UI/UX.
- categoría: 1.7.
- rol: centro (actual; en evaluación contra Penpot).
- plan: Free Starter.
- costo: 0 MXN.
- periodicidad: gratuito.
- próxima renovación: n/a.
- titular: Francisco León (vinculado a `fj.leonpacheco@gmail.com`).
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- fecha de alta: `[PENDIENTE — TU DATO]`.
- estado: operativa.
- integraciones declaradas: export PDF/X, SVG, PNG, JPG. Sin integración nativa con stack self-hosted.
- enlaces de soporte: https://help.figma.com
- notas: en evaluación frente a Penpot (standby hasta migración a stack diseño 100% OSS, marco v5 §1.7). Evaluación independiente de la evaluación C vs B de 8.4.3.

#### Adobe Creative Cloud — Photoshop / Lightroom Classic / Premiere

- nombre: Adobe Creative Cloud
- función: producción de imagen y video. Photoshop (composición/retoque), Lightroom Classic (catálogo + RAW de fotografía), Premiere (edición de video).
- categoría: 1.7.
- rol: centro (producción).
- plan: `[PENDIENTE — TU DATO: Plan completo / Plan fotografía / individual por app]`.
- costo: `[PENDIENTE — TU DATO]`.
- periodicidad: mensual / anual `[PENDIENTE]`.
- próxima renovación: `[PENDIENTE]`.
- titular: Francisco León.
- credenciales (referencia): `[PENDIENTE]`.
- fecha de alta: anterior al cutover (uso histórico).
- estado: operativa.
- integraciones declaradas: Lightroom Classic ↔ MinIO (1.3) para originales pesados. Premiere → CDN del cliente para entrega de video (no autohospedado por default por costo de bandwidth).
- notas: marco v5 §1.7 lista Adobe CC como vigente. Software propietario aceptado bajo justificación fuerte (§7.5 marco v5).

#### Penpot — standby

- nombre: Penpot
- función: equivalente OSS y self-hostable de Figma.
- categoría: 1.7.
- rol: candidata.
- plan: self-hosted sobre Coolify (potencial) o cloud comunitario.
- costo: 0 MXN (self-hosted).
- estado: standby — activar al migrar a stack diseño 100% OSS (marco v5 §1.7).
- enlaces de soporte: https://penpot.app
- notas: criterio de activación claro. Sin urgencia hoy.

---

### 1.8 Identidad visual y tipografía

#### Sistema tipográfico ioon

- nombre: Sistema tipográfico ioon
- función: lenguaje visual del estudio. Memoria viva en directrices de diseño (resumen ejecutivo 8.0.2 §3 documenta versión vigente del 13-abr-2026).
- categoría: 1.8.
- rol: centro.
- estado: operativa.
- notas: fuente única vigente: **Space Grotesk** (Florian Karsten en repo; Google Fonts como fallback). Peso dominante 300 (Light). Letter-spacing negativo en headings, positivo en overlines/labels uppercase. Reglas duras: sin colores fuera de paleta, sin sombras, sin gradientes decorativos, sin bordes redondeados >4 px, sin animaciones >0.4s, sin emojis, sin íconos de color, sin badges con fondo, sin ilustraciones genéricas. Aplicable a todo lo cara-al-cliente del eje operativo (2.1, 2.2, 2.4, 2.6).

#### Google Fonts

- nombre: Google Fonts
- función: foundry OSS por defecto.
- categoría: 1.8.
- rol: satélite.
- plan: gratuito.
- costo: 0 MXN.
- estado: operativa.
- integraciones declaradas: `astro:font` y `next/font` (cubren `webfontloader` descartado en marco v5 §1.12).
- notas: Space Grotesk como fuente única; foundries OSS preferidos (marco v5 §1.8).

#### Fontshare

- nombre: Fontshare
- función: foundry OSS premium (Indian Type Foundry).
- categoría: 1.8.
- rol: candidata.
- plan: gratuito (uso comercial permitido).
- costo: 0 MXN.
- estado: operativa.
- notas: alterna OSS para casos donde Google Fonts no cubre necesidad tipográfica.

---

### 1.9 IA y asistentes conversacionales

#### Hermes Agent

- nombre: Hermes Agent (Nous Research)
- función: agente conversacional self-hosted del estudio. Maneja bot Telegram directamente (Topología A — n8n fuera del path del bot). Voice Mode integrado, scheduling lenguaje natural, MCPs nativos, memoria persistente FTS5, skills auto-creadas.
- categoría: 1.9.
- rol: centro (agente IA del stack).
- plan: self-hosted, MIT License.
- costo: software 0 MXN; provider LLM costo aparte (ver OpenRouter).
- periodicidad: n/a software; pay-per-use LLM.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): `[PENDIENTE — al desplegar]`. `HERMES_TELEGRAM_BOT_TOKEN`, `OPENROUTER_API_KEY`, `HERMES_MODEL`, `HERMES_OWNER_TG_ID`, `HERMES_DB_URL` en `.stack.env`.
- fecha de alta: por desplegar — Plan 5 fases en 8-4-11. Fase 1 (SOUL.md global + context/fjlp.md + context/ioon.md) en chat fjlp 1.5.1. Fase 2 (deploy paralelo) con `@ioon_agent_test_bot`. Switch oficial al bot principal en fase 4 (día 13).
- estado: planeada — P0-1 vigente.
- integraciones declaradas: Telegram (gateway nativo), Postgres compartido (no dedicado como II-Agent), provider LLM via OpenRouter, MCPs prioritarios (filesystem `0_ioon`, Calendar, Gmail). Cubre cruzado para 2.3 (captura desde móvil hacia gestión de proyectos).
- enlaces de soporte: https://hermes-agent.nousresearch.com/docs/ · https://github.com/NousResearch/hermes-agent
- notas: estructura repo nueva: `0_ioon/hermes/SOUL.md` + `context/*.md` + `skills/` + `memory/` (gitignored). Política de actualizaciones: versión pineada en `docker-compose.stack.yaml`, updates manuales con snapshot Hetzner previo. Subdominio opcional `bot.ioon.mx` si se quiere admin web.

#### II-Agent — en retiro

- nombre: II-Agent
- función (legacy): agente IA self-hosted del estudio. Frontend Google OAuth + backend con Switch routing en n8n.
- categoría: 1.9.
- rol: centro (en retiro).
- plan: self-hosted (codebase propia).
- costo: 0 MXN software; APIs Gemini + Claude pay-per-use.
- estado: en-migración → cleanup en fase 5 del plan 8-4-11. Backend en HTTP 503 desde 24-abr-2026, no redeployado en VPS nuevo.
- integraciones declaradas (legacy): Telegram (vía n8n), Google OAuth, Postgres dedicado `iiagent-db`, Redis, MinIO, Traefik (subdominios `agent.ioon.mx` y `api.agent.ioon.mx` a eliminar).
- notas: documento canónico de la decisión de sustitución: 8-4-9. Cleanup en fase 5: containers fuera del compose, subdominios eliminados, secrets `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` eliminados (cierra P1-1 OAuth como obsoleto). JWT secret `ioon-secret-2026` (que expira abril 2027) deja de tener relevancia tras cleanup.

#### OpenRouter

- nombre: OpenRouter
- función: provider LLM agregador para Hermes Agent. Multi-provider (Anthropic, OpenAI, Nous, otros).
- categoría: 1.9.
- rol: satélite (provider del modelo).
- plan: pay-per-use con cap mensual.
- costo: $20 USD ya cargados, esperado $15–25 USD/mes operativo, **cap duro $40 USD/mes** (configurar en P2-4 de 8-4-10 antes de fase 3).
- periodicidad: pay-per-use.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): API key — `[PENDIENTE — TU DATO: dónde vive]`. Va en `.stack.env` como `OPENROUTER_API_KEY`.
- fecha de alta: 2026-05-08 (cuenta activa).
- estado: operativa (cuenta cargada; cap por configurar).
- integraciones declaradas: Hermes Agent (modelo default propuesto `anthropic/claude-sonnet-4.6`, fallback `anthropic/claude-haiku`).
- enlaces de soporte: https://openrouter.ai/docs
- notas: P2-4 (cap $40 USD/mes en consola OpenRouter) bloquea fase 3 del plan Hermes — 5 minutos en consola, no posponer.

#### Gemini API (`gemini-2.5-flash`) — en cierre con migración

- nombre: Google Gemini API — modelo `gemini-2.5-flash`
- función (legacy): transcripción de voz en pipeline Telegram → n8n → Gemini → Switch.
- categoría: 1.9.
- rol: satélite (en cierre).
- plan: pay-per-use.
- costo: variable, `[PENDIENTE — TU DATO: gasto típico mensual]`.
- estado: operativa hoy en pipeline de voz vigente. Cierra cuando Hermes asume el bot (fase 4 plan 8-4-11) — la voz nativa de Hermes sustituye a Gemini para transcripción.
- titular: `[PENDIENTE — TU DATO: cuenta Google que paga]`.
- credenciales (referencia): API key — `[PENDIENTE — TU DATO: dónde vive]`.
- notas: si Hermes Voice Mode no cubre transcripción de voz larga con calidad equivalente, evaluar conservar como fallback. Decisión en fase 3 de pruebas Hermes.

#### Claude API (`claude-haiku-4-5`) — en cierre con migración

- nombre: Anthropic Claude API — modelo `claude-haiku-4-5`
- función (legacy): respuestas de chat para mensajes que no van al modo agente en pipeline n8n.
- categoría: 1.9.
- rol: satélite (en cierre).
- plan: pay-per-use.
- costo: variable, `[PENDIENTE — TU DATO]`.
- estado: operativa hoy. Cierra con migración Hermes — Hermes consume Claude vía OpenRouter, no directo.
- titular: `[PENDIENTE — TU DATO: cuenta Anthropic que paga]`.
- credenciales (referencia): API key — `[PENDIENTE — TU DATO]`.
- notas: tras cierre, conservar cuenta opcional para pruebas o uso fuera del agente. La cuenta de pago directo no es la misma que OpenRouter — son providers distintos.

#### AnythingLLM — planeada

- nombre: AnythingLLM
- función: motor RAG sobre `.md` del repo `-0_ioon` + otras fuentes curadas.
- categoría: 1.9.
- rol: centro (RAG sobre canon).
- plan: self-hosted sobre Coolify, destino `rag.ioon.mx`.
- costo: 0 MXN software (LLM aparte).
- estado: planeada — crítica para abrir ventana C vs B de 8.4.3 v1951 (precondición junto a portal Astro `dashboard.ioon.mx`).
- integraciones declaradas (planeadas): repo `-0_ioon` (canon), Hermes (consultas RAG vía MCP), eventualmente Directus (glosario) y Hoarder (bookmarks).
- enlaces de soporte: https://anythingllm.com
- notas: roadmap general (Hoarder, AnythingLLM, Dashboard) sigue después de los P0 según 8-4-10 §3.6.

---

### 1.10 Workflows y automatizaciones

#### n8n — self-hosted v2.10.2

- nombre: n8n
- función: motor de automatización e integración. Cron, webhooks, backups, integraciones entre servicios. Workflow del bot Telegram **deshabilitado** post-migración Hermes (Hermes maneja bot directo).
- categoría: 1.10.
- rol: centro (automatización).
- plan: self-hosted sobre Coolify, Sustainable Use License (limitaciones aceptadas).
- costo: 0 MXN (incluido en VPS).
- periodicidad: n/a.
- próxima renovación: n/a.
- titular: Francisco León.
- credenciales (referencia): `[PENDIENTE]`. `N8N_ENCRYPTION_KEY` rotada en 8.4c, vive solo en env var de Coolify (riesgo conocido — sin backup, credentials encriptados en n8n son irrecuperables; mitigación P2-1).
- fecha de alta: anterior al cutover.
- estado: operativa.
- integraciones declaradas: hoy → workflow `7PXTleYO3NH8uXPb` (pipeline voz, deshabilitado post-Hermes). Próximo: P1-2 backups Notion → MinIO (semanal), automatizaciones para conectar Hoarder/Directus cuando lleguen, sync Notion ↔ repo `-0_ioon` para modelo C de 8.4.3 (pendiente de implementar — comandos del bot, ramificación captura, webhooks Notion/GitHub).
- enlaces de soporte: https://docs.n8n.io
- notas: container `n8n-qgzlym3tri9ty5ozx57smh7x`. Disponible en `n8n.ioon.mx`. Pendientes técnicos del modelo C (8.4.3): comandos `/canon`, `/8-X`, `/notion`, `/mover`, `/en`, `/buscar`, `/resumen`, `/pregunta`, `/promover`, `/salir` — siguen pendientes pero no son P0; entran a la cola tras P0-2 y P0-1.

---

### 1.11 Captura, edición y CMS

#### Notion — front operativo (en evaluación, fase C)

- nombre: Notion
- función: front operativo del estudio durante fase C de 8.4.3 v1951 — inbox, triage, tableros, bases de datos, dashboards internos, borradores, conversaciones no formalizadas, curaduría visual, notas en desarrollo. **No es canon.** Canon es `.md` en repo `-0_ioon`.
- categoría: 1.11.
- rol: centro (front operativo, fase C). Cubre cruzado para 2.1 CRM (decisión pendiente §9.6) y plausiblemente 2.3 Gestión de proyectos (decisión pendiente §9.6).
- plan: `[PENDIENTE — TU DATO: Free / Personal Pro / Plus / Business]`. Estimado Personal Pro ~100–200 MXN/mes según 8.4.3.
- costo: `[PENDIENTE — TU DATO]`.
- periodicidad: mensual o anual `[PENDIENTE]`.
- próxima renovación: `[PENDIENTE]`.
- titular: Francisco León (`[PENDIENTE — TU DATO: email cuenta]`).
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- fecha de alta: `[PENDIENTE — TU DATO]`.
- estado: en-evaluación (formal — fase C de 8.4.3, ventana 90 días no arrancada formalmente porque AnythingLLM y portal Astro siguen sin desplegarse).
- integraciones declaradas (planeadas, pendientes en n8n): webhook Notion → n8n (cambio de propiedad `sub_tema` o `canon: true` dispara sync), sync Notion → `.md` con renombrado fjlp 1.2.4 + commit, bandeja de entrada en base "Inbox", backups semanales del workspace exportados a MinIO (P1-2).
- enlaces de soporte: https://www.notion.so/help
- notas: criterios de éxito de la evaluación se escriben en archivo dedicado `ioon_8-4-X_planeacion-tecnica_evaluacion-c-vs-b_v<fecha>.md` al arranque de la ventana. Triggers de revisión temprana de 8.4.3 §8.3 vigentes.

#### Markdown en repo `fjleonpacheco-cmd/-0_ioon` — canon

- nombre: Markdown canon en repo
- función: fuente única de verdad para contenido curado del estudio. Modelo C híbrido de 8.4.3.
- categoría: 1.11 (canon de contenido).
- rol: centro (canon).
- estado: operativa.
- integraciones declaradas: GitHub (1.3) como repo, Coolify ↔ GitHub para deploys, próximo: AnythingLLM lectura para RAG, Hermes filesystem MCP apuntando al repo.
- notas: estructura nueva pendiente — carpeta `inbox/` para items de bandeja con frontmatter (`capturado_en`, `canal`, `sugerencia_ruteo`, `estado`, `notion_uuid`); carpeta `hermes/` para SOUL.md, context, skills, memory.

#### Directus — planeada (CMS interno)

- nombre: Directus
- función: CMS interno del estudio. Glosario de autor, curaduría de referencias visuales, dashboards propios.
- categoría: 1.11 (CMS interno).
- rol: centro (CMS interno).
- plan: self-hosted sobre Coolify, Postgres compartido. Subdominio planeado `cms.ioon.mx`.
- costo: 0 MXN.
- estado: planeada (decidido en 8-4-12 §2.2; despliegue dentro de ventana C vs B de 8.4.3).
- enlaces de soporte: https://docs.directus.io
- notas: alimenta a AnythingLLM (RAG sobre glosario y curaduría).

#### Payload — planeada (CMS de apps cliente)

- nombre: Payload (Payload 3, MIT License)
- función: CMS para apps de cliente. Corre **dentro de Next.js** como rutas de la misma app — colapsa CMS + Auth + DB + frontend en un solo deploy. Schemas en TypeScript.
- categoría: 1.11 (CMS cliente).
- rol: centro (CMS apps cliente). Cubre cruzado para **2.4 Entrega al cliente** (decisión pendiente §9.7 — validación con Motor de proofing P0-3).
- plan: self-hosted sobre Coolify, MIT License.
- costo: 0 MXN.
- estado: planeada — adopción en P0-3 (Motor de proofing).
- integraciones declaradas (planeadas): Postgres compartido, MinIO para originales pesados, Sharp built-in para optimización imagen (fase 1 pipeline 1.13), Cloudinary cuando escale (fase 2).
- enlaces de soporte: https://payloadcms.com/docs
- notas: decisión cristalizada en 8-4-12. Modelos esperados para Motor de proofing: Users, Galleries, Images, Proofs, Comments, Downloads. Auth con email/password built-in.

#### Lightroom Classic + sync MinIO

- nombre: Lightroom Classic (parte de 1.7 Adobe CC) con sync a MinIO
- función: captura de campo (fotografía) — catálogo + RAW + sync de originales pesados a MinIO.
- categoría: 1.11 (captura de campo, referencia cruzada con 1.7).
- rol: satélite.
- estado: operativa (uso histórico).
- notas: ya cubierto en ficha Adobe CC de 1.7. Aquí solo se referencia para completitud del eje "captura, edición y CMS" del marco v5.

#### Inbox espejo en repo `inbox/`

- nombre: Carpeta `inbox/` en repo `-0_ioon`
- función: espejo en canon `.md` de la bandeja de Notion (modelo C de 8.4.3).
- categoría: 1.11 (canon de bandeja).
- rol: centro del canon de bandeja.
- estado: por-implementar (parte del trabajo de extensión n8n decidido por 8.4.3).
- notas: archivo-por-item para movimiento limpio (`git mv`), concurrencia sin colisiones, búsqueda post-ruteo trivial.

---

### 1.12 Animación, transiciones y narrativa visual

#### GSAP + ScrollTrigger

- nombre: GSAP + ScrollTrigger
- función: estándar para storytelling con scroll. Dependencia base de cualquier sitio con narrativa visual.
- categoría: 1.12.
- rol: centro (animación scroll).
- plan: GreenSock — gratuito para uso comercial estándar (incluye ScrollTrigger desde 2024). Plugins especializados (Draggable, MorphSVG, MotionPath, Flip) activables uno-a-uno según necesidad.
- costo: 0 MXN base.
- periodicidad: n/a.
- estado: por-instalar — adopción en P0-2 (Sitio Serclin, primer caso real).
- integraciones declaradas: Astro (Serclin), futuros sitios con storytelling.
- enlaces de soporte: https://gsap.com/learn
- notas: casos de activación de plugins sugeridos por 8-4-13: Draggable para galería con momentum, MotionPath para cursor/partículas con trayectoria curva, Flip para transiciones de layout en galería filtrable.

#### Motion (ex-Framer Motion)

- nombre: Motion
- función: microinteracciones React (transiciones de página, hover, gestos, presencia/salida).
- categoría: 1.12.
- rol: centro (microinteracciones React).
- plan: OSS, MIT.
- costo: 0 MXN.
- estado: por-instalar — adopción en P0-2 o P0-3 (primer caso React con microinteracciones).
- integraciones declaradas: React, Next.js, islas React en Astro.
- enlaces de soporte: https://motion.dev
- notas: convive con GSAP sin pisarse — Motion para microinteracciones React, GSAP para storytelling con scroll.

#### CSS animations + transitions

- nombre: CSS animations + transitions
- función: primera línea para microefectos triviales sin librería.
- categoría: 1.12.
- rol: centro (línea base).
- estado: operativa.
- notas: estándar W3C, sin dependencia npm. Usar antes de Motion/GSAP cuando alcance.

#### SVG nativo (`<feTurbulence>` + `<feDisplacementMap>`)

- nombre: SVG nativo
- función: estándar W3C, sin dependencia npm, GPU-accelerated. Primera línea para texto líquido y deformaciones sutiles **sin reactividad mouse**. Cuando se necesita reactividad o texturas complejas, escalar a R3F+drei (1.14).
- categoría: 1.12.
- rol: centro (línea base avanzada).
- estado: operativa (anotación derivada de 8-4-13 al marco v5).
- notas: confirmado como base para texto líquido en ioon-effects (alterna a R3F+drei).

#### Descartes documentados (no reabrir sin evidencia externa nueva)

- `smoovy` (duplica GSAP+ScrollTrigger), `momentum-js` (cubierto por GSAP Draggable), `aminejs` (no público), `webfontloader` (`astro:font` / `next/font` cubren con menos bundle).

---

### 1.13 Imagen, video y pipelines de media

#### Sharp built-in Payload — fase 1

- nombre: Sharp (vía Payload)
- función: optimización de imagen built-in en Payload. Genera variantes en upload (thumb, medium, large).
- categoría: 1.13.
- rol: centro (fase 1 del pipeline).
- estado: por-adoptar con P0-3 (Motor de proofing).
- notas: suficiente para portafolios pequeños y medianos.

#### Cloudinary — standby fase 2

- nombre: Cloudinary
- función: CDN de imagen optimizada con transformaciones por URL. Integración con `next/image` automática.
- categoría: 1.13.
- rol: candidata fase 2.
- plan: free tier generoso; ~$15–30 USD/mes cuando se exceda.
- estado: standby — activar al primer cliente fotógrafo profesional con volumen alto (>500 imágenes por galería o >5 GB de originales según 8-4-12 §7).
- notas: trade-off explícito al descartar Sanity — pipeline imagen premium ya no viene de fábrica, se compone con Cloudinary cuando llegue caso.

#### imgproxy — standby fase 3

- nombre: imgproxy
- función: servicio OSS de transformaciones de imagen self-hosted.
- categoría: 1.13.
- rol: candidata fase 3.
- plan: OSS, self-hosted sobre Coolify.
- costo: 0 MXN (incluido en VPS).
- estado: standby — activar si Cloudinary escala a costo molesto.
- notas: meta a largo plazo para autonomía total self-hosted.

#### Premiere — video

- nombre: Adobe Premiere (parte de 1.7 Adobe CC)
- función: producción de video. Entrega web vía CDN del cliente (no autohospedado por default por costo bandwidth).
- categoría: 1.13 (referencia cruzada con 1.7).
- rol: centro (producción video).
- estado: operativa.

---

### 1.14 Motores 3D, generativo y experimentación

#### Three.js

- nombre: Three.js
- función: motor base 3D y fundamento de aprendizaje obligado.
- categoría: 1.14.
- rol: centro (base 3D).
- plan: OSS, MIT.
- costo: 0 MXN.
- estado: a-aprender — recurso canónico *Three.js Journey* de Bruno Simon.
- enlaces de soporte: https://threejs.org/docs

#### R3F + drei

- nombre: React Three Fiber + drei
- función: API por defecto cuando entre 3D dentro de proyectos React. **Base canónica de los efectos de ioon-effects** (anotación 8-4-13 al marco v5).
- categoría: 1.14.
- rol: centro (API React 3D).
- plan: OSS, MIT.
- costo: 0 MXN.
- estado: standby — activar al primer caso 3D real (arquitecto con modelo rotable, cliente producto físico con hero 3D, pieza generativa 3D en sitio de artista).
- integraciones declaradas (planeadas): ioon-effects (1.16) — los 4 efectos target (hover-displacement, transición WebGL, texto líquido, fondo atmosférico) implementables con `<Canvas>` + `<shaderMaterial>` + `useFrame`.
- enlaces de soporte: https://r3f.docs.pmnd.rs
- notas: sustituye a OGL como base canónica — el archivo del 4-may `ioon_8-5-2_stack_biblioteca-efectos-visuales-implementacion_v20260504-1233` que apuntaba a OGL **quedó técnicamente invalidado** por esta anotación; rebase pendiente en 8-4-6.

#### p5.js

- nombre: p5.js
- función: exploración generativa y sketches 2D. Sin presión de cliente — gimnasia visual.
- categoría: 1.14.
- rol: satélite (exploración).
- plan: OSS, LGPL.
- costo: 0 MXN.
- estado: operativa.
- enlaces de soporte: https://p5js.org/reference

#### WebGPU — standby

- nombre: WebGPU
- estado: standby — activar cuando R3F estabilice su backend WebGPU y los tutoriales mayoritarios lo reflejen. Hoy seguir con WebGL clásico vía R3F/Three.

#### Descartes documentados (no reabrir sin evidencia externa nueva)

- **OGL** descartada como base de sistema (R3F+drei la sustituye, alineación React-first y cap de bundle ioon-effects). Anotación de 8-4-13 al marco v5.
- **`hover-effect` (Robin Delaporte)** mantenimiento inactivo, nicho cubierto por R3F+drei.
- **`curtains.js`** redundante con R3F+drei.
- Babylon.js, PlayCanvas, A-Frame, regl — descartados, nicho que solo se activaría con caso muy específico (juegos completos, XR, data viz seria).

---

### 1.15 Infraestructura, orquestación y observabilidad

#### Cloud Firewall Hetzner

- nombre: Cloud Firewall Hetzner
- función: UFW + reglas a nivel host del VPS.
- categoría: 1.15.
- rol: satélite (infraestructura).
- plan: incluido en Hetzner Cloud.
- costo: incluido en VPS.
- estado: activa.

#### Snapshots Hetzner

- nombre: Snapshots Hetzner
- función: punto de restauración del VPS.
- categoría: 1.15.
- rol: satélite (rollback).
- plan: incluido en Hetzner Cloud.
- costo: storage facturado por snapshot.
- estado: vigente — snapshot `379810905` post-incidente Redis 24-abr conservado.

#### SSH key `fj-mac-ioon-vps-20260504`

- nombre: SSH key `fj-mac-ioon-vps-20260504`
- función: única par de claves válido contra el VPS productivo.
- categoría: 1.15.
- rol: centro (acceso).
- credenciales (referencia): par viviendo en `~/.ssh/` del Mac. Clave vieja `ioon-mac` ya eliminada (P1-3 cerrado).
- estado: vigente.
- notas: rotación periódica como buena práctica — pendiente P2-5 de 8-4-10.

#### GoDaddy — DNS de `ioon.mx`

- nombre: GoDaddy
- función: registro y DNS del dominio raíz `ioon.mx` y subdominios.
- categoría: 1.15 (DNS también podría ir en 1.4 hosting; aquí se aloja para mantener separación de la infraestructura raíz).
- rol: centro (dominio raíz).
- plan: registro de dominio + DNS.
- costo: `[PENDIENTE — TU DATO]`.
- periodicidad: anual.
- próxima renovación: `[PENDIENTE — TU DATO]`.
- titular: Francisco León (`[PENDIENTE — TU DATO: email cuenta GoDaddy]`).
- credenciales (referencia): `[PENDIENTE — TU DATO]`.
- estado: operativa.
- integraciones declaradas: A records de subdominios apuntan a `178.104.111.155`. Subdominios actuales: `ioon.mx`, `canovera.ioon.mx`, `catalogo.ioon.mx`, `arquitectura-1.ioon.mx`, `fotografia-1.ioon.mx`, `hpt-demo.ioon.mx`, `hpt-demo-v2.ioon.mx`, `coolify.ioon.mx`, `n8n.ioon.mx`. Pendientes de eliminar: `agent.ioon.mx`, `api.agent.ioon.mx` (cleanup II-Agent fase 5). Planeados: `bot.ioon.mx` (opcional Hermes), `cms.ioon.mx` (Directus), `hoarder.ioon.mx`, `rag.ioon.mx`, `dashboard.ioon.mx` (portal Astro de 8.4.3), `proofing.demo.ioon.mx` (Motor de proofing).
- enlaces de soporte: https://www.godaddy.com/help

#### Pendientes de observabilidad / mantenimiento (P2 de 8-4-10)

- **Backups automáticos de Coolify v4** (config DB + volumes a destino S3-compatible) — P2-1.
- **Playbook reutilizable de rotación de `N8N_ENCRYPTION_KEY`** — P2-2.
- **Monitoreo / alertas de uptime y expiración de certs** — P2-3 (UptimeKuma candidato, también Better Uptime y Healthchecks.io).
- **Cap mensual de OpenRouter $40 USD** — P2-4 (5 min en consola, bloquea fase 3 plan Hermes).
- **Rotación periódica de SSH keys del VPS** — P2-5.

---

### 1.16 Productos internos reutilizables

#### Motor de presentaciones — vigente

- nombre: Motor de presentaciones
- función: producto interno del estudio. Renderiza decks a partir de `config.json` con 3 layouts (Clásico, Secciones, Secciones+L3), 6 tipos de slide (title, text, concept, image, split, quote), 6 layouts de imagen, sistema de galería con overlay full-screen.
- categoría: 1.16.
- rol: producto interno vigente.
- stack: Astro 5.
- plan: producto propio.
- costo: 0 MXN (tiempo de mantenimiento).
- estado: en producción (uso interno + clientes seleccionados).
- consumidores: 8.8 presentaciones, 8.14.2 serclin (4 publicadas — `/serclin/1_estudio-de-mercado`, `/2_ventaja-competitiva`, `/3_audiencia`, `/3_matriz-de-identidad-de-marca`), 8.14.1 educativo-antequera (en iteración).
- notas: descrito en 8.0.2 §6. Reglas de escala tipográfica, espaciado, animaciones (`fadeIn` 0.35s, `translateY(12px)`) definidas en directrices de identidad.

#### Motor de catálogo de demos — vigente

- nombre: Motor de catálogo de demos
- función: producto interno. Patrón de deploy reutilizable de demos en Coolify (estructura mínima Dockerfile + nginx.conf + vite.config.js + package.json + src/) más vitrina central en Astro.
- categoría: 1.16.
- rol: producto interno vigente.
- stack: Astro (vitrina) + Vite + React 18 (demos).
- plan: producto propio.
- costo: 0 MXN.
- estado: en producción.
- consumidores: `catalogo.ioon.mx` (vitrina), `arquitectura-1.ioon.mx`, `fotografia-1.ioon.mx`, `hpt-demo.ioon.mx`, `hpt-demo-v2.ioon.mx`, futuras demos.
- notas: descrito en 8.0.2 §5. Patrón de deploy: Public Repository → repo `user/repo`, branch main, Base Directory carpeta del demo, Build Pack Dockerfile, dominio `<sub>.ioon.mx`, SSL automático Let's Encrypt.

#### ioon-effects — en definición

- nombre: ioon-effects
- función: biblioteca propia de efectos React drop-in (4 efectos target: hover-displacement, transición de imagen WebGL, texto líquido, fondo atmosférico).
- categoría: 1.16.
- rol: producto interno en definición.
- stack: React + **R3F + drei** (base canónica confirmada por 8-4-13). Alterna SVG nativo (1.12) admitida para texto líquido sin reactividad mouse. Cap de bundle ≤ 80 KB por efecto a re-validar empíricamente con code-splitting y tree-shaking.
- plan: producto propio.
- costo: 0 MXN.
- estado: en definición — requerimientos por reescribir en 8-4-6 (la versión previa basada en OGL de `ioon_8-5-2_stack_biblioteca-efectos-visuales-implementacion_v20260504-1233` quedó invalidada por §1.14 marco v5).
- consumidores planeados: `catalogo.ioon.mx`, `arquitectura-1.ioon.mx`, `fotografia-1.ioon.mx`, futuras demos y sitios cliente.
- nota canónica: 8-4-6 (a regenerar).
- pendiente (P3-7 de 8-4-10): reescribir `LiquidTextWebGL.jsx` migrando internals OGL → R3F+drei manteniendo API pública intacta.

#### Motor de proofing — potencial 4° producto

- nombre: Motor de proofing
- función: si Motor de proofing demo (P0-3) se generaliza y se vende a 2+ fotógrafos.
- categoría: 1.16.
- rol: producto potencial (condicional).
- stack candidato: Next.js + Payload (definido en 8-4-12 §9).
- estado: potencial — promoción depende de evidencia de reuso post-P0-3.
- notas: criterio del marco v5 §1.16 — promover por evidencia de demanda repetida razonable proyectada, no por entusiasmo. Decisión de promoción se documenta tras primer demo + segundo cliente.

---

## 1B. Cobertura del eje operativo

Las 7 categorías del eje operativo cubren funciones del negocio. Cada una referencia las herramientas del eje técnico que la cubren con notación `→ 1.X`, o se marca como **decisión pendiente** (con remisión al §9 del marco v5).

### 2.1 CRM — gestión de relación con cliente

**Cobertura actual:** Notion (→ 1.11 captura cotidiana) cubre plausiblemente este eje en fase C del modelo C híbrido (8.4.3 v1951). Hermes (→ 1.9, planeado) sumará captura desde Telegram.

**Estado:** **decisión pendiente §9.6 del marco v5** — confirmar formalmente Notion como CRM o evaluar herramienta dedicada (HubSpot CRM Free, Pipedrive, Folk, Attio).

**Bloqueo:** evidencia de uso real de Notion en el ciclo de cliente durante fase C de 8.4.3.

**Restricciones aplicables (§7 marco v5):** idioma español cara al cliente para cotizaciones/propuestas emitidas (templates de Notion deben renderizar en español). Identidad visual ioon en cualquier documento que toque al cliente.

### 2.2 Facturación — emisión de comprobantes fiscales

**Cobertura actual:** ninguna formalizada.

**Estado:** **decisión pendiente §9.1 del marco v5** — selección de PAC.

**Restricciones aplicables (§7 marco v5):** RFC mexicano PFAE, CFDI 4.0 conforme SAT, REP, retenciones ISR/IVA aplicables a PFAE, idioma español, residencia fiscal México.

**Candidatos a evaluar:** Facturama, Bind ERP, Contpaqi, Konfio, Facturación Moderna. Lista cerrada en sesión 8.5.

**Bloqueos:** ninguno — independiente del resto.

### 2.3 Gestión de proyectos y tareas

**Cobertura actual:** Notion (→ 1.11 captura cotidiana) cubre plausiblemente. Hermes (→ 1.9, planeado) sumará captura rápida desde móvil. Google Calendar (→ 1.6) integrado vía MCP cuando Hermes esté operacional.

**Estado:** **decisión pendiente §9.6 del marco v5** — confirmar formalmente Notion como herramienta de gestión de proyectos.

**Bloqueo:** evidencia de uso real de Notion durante fase C.

**Restricciones aplicables:** integración con calendario y CRM, captura rápida desde móvil idealmente desde el mismo canal que la captura del estudio (Telegram → Hermes).

### 2.4 Entrega al cliente

**Cobertura actual:** ninguna formalizada.

**Estado:** **decisión pendiente §9.7 del marco v5** — confirmar Payload-in-Next.js (→ 1.11) cuando arranque Motor de proofing P0-3.

**Bloqueo:** P0-3 (Motor de proofing).

**Restricciones aplicables (§7 marco v5):** identidad visual ioon (Space Grotesk, paleta minimalista, sin defaults SaaS), dominio o subdominio de `ioon.mx`, idioma español cara al cliente, PDF como formato canónico para entregas formales.

**Mientras tanto:** entregas puntuales se hacen ad-hoc según proyecto.

### 2.5 Seguridad y accesos

**Cobertura actual:** ninguna formalizada. iCloud Keychain como medida transitoria.

**Estado:** **decisión pendiente §9.2 + §9.3 del marco v5** — selección de gestor de contraseñas (instalación limpia, sin migrar nada previo) + selección de app TOTP (puede colapsar a 9.2 si el gestor incluye TOTP nativo).

**Restricciones aplicables (§7 marco v5):** Apple Silicon M5 Pro nativo, app iOS nativa, recuperación independiente del dispositivo principal.

**Candidatos a evaluar §9.2:** 1Password (SaaS), Bitwarden (cloud o Vaultwarden self-hosted sobre Coolify), Proton Pass, KeePassXC + sync propio.

**Candidatos a evaluar §9.3:** Aegis (Android, OSS), Raivo (iOS, descontinuado), 2FAS, Bitwarden Authenticator, TOTP del propio gestor de §9.2.

**Alcance excluido del eje:** SSH key del VPS (`fj-mac-ioon-vps-20260504`) y rotación periódica viven en 1.15 Infraestructura, no aquí.

### 2.6 Correo desde dominio

**Cobertura actual:** ninguna formalizada.

**Estado:** **decisión pendiente §9.4 del marco v5** — selección de proveedor.

**Restricciones aplicables (§7 marco v5):** preferencia self-hosted, residencia fiscal México deseable.

**Candidatos a evaluar:** Migadu (SaaS sin límite usuarios, bandwidth pricing), Fastmail (SaaS premium), Mailcow self-hosted en Coolify, Tutanota (encrypted-first, restrictivo en integraciones), Proton Mail (encrypted-first).

**Bloqueos:** ninguno — independiente del resto. La decisión afecta a Hermes (→ 1.9), n8n (→ 1.10) y Payload (→ 1.11) para SMTP outbound transaccional.

### 2.7 Dimensionamiento de storage de archivos fuente pesados

**Cobertura actual:** MinIO (→ 1.3) parcial para masters y storage de objetos del stack.

**Estado:** **decisión pendiente §9.5 del marco v5** — levantamiento de volumen actual + selección de centro + política 3-2-1 documentada.

**Pre-requisito:** levantamiento del volumen actual de archivos fuente del estudio (RAW, PSD, AEP/PRPROJ, ProRes, masters, fuentes, brushes). Sin este dato no se puede dimensionar.

**Candidatos a evaluar:** MinIO ampliado (extensión del actual), NAS local Synology/QNAP + replicación cloud, Backblaze B2 / Wasabi (cloud puro), Nextcloud self-hosted (caso de uso amplio más allá del estudio).

**Bloqueo:** levantamiento de volumen actual.

---

## 2. Mapa cruzado eje técnico × eje operativo

Tabla rápida de cobertura. Cada celda: pieza del eje técnico que cubre la función operativa, o "decisión §9.X" si pendiente.

| Función operativa | Cobertura primaria | Cobertura secundaria / planeada | Estado |
|---|---|---|---|
| 2.1 CRM | Notion (1.11) | Hermes (1.9) captura · Google Calendar (1.6) integración | Pendiente confirmar §9.6 |
| 2.2 Facturación | — | — | Pendiente §9.1 selección PAC |
| 2.3 Gestión de proyectos | Notion (1.11) | Hermes (1.9) captura móvil · Google Calendar (1.6) | Pendiente confirmar §9.6 |
| 2.4 Entrega al cliente | — | Payload-in-Next (1.11) planeado vía Motor de proofing P0-3 | Pendiente §9.7 |
| 2.5 Seguridad y accesos | iCloud Keychain (transitorio) | — | Pendiente §9.2 + §9.3 |
| 2.6 Correo desde dominio | — | SMTP outbound desde Hermes (1.9) / n8n (1.10) / Payload (1.11) | Pendiente §9.4 selección proveedor |
| 2.7 Dimensionamiento storage pesado | MinIO (1.3) parcial | NAS / cloud / Nextcloud candidatos | Pendiente §9.5 (bloqueado por volumen actual) |

---

## 3. Restricciones duras transversales aplicadas

Reflejo del §7 del marco v5 a las decisiones de selección concreta del inventario.

### 3.1 Fiscalidad mexicana (§7.1 marco)

- **Aplica directo a 2.2 Facturación.** Cualquier candidato PAC debe operar bajo RFC mexicano PFAE, soportar CFDI 4.0 conforme SAT, complemento de pago REP, cancelaciones, exportación XML+PDF, retenciones ISR/IVA aplicables a PFAE.
- **Filtro pre-evaluación:** PAC que solo opere bajo RESICO, persona moral, o regímenes extranjeros queda descartado antes de aplicar criterios §2 del marco.

### 3.2 Idioma español cara al cliente (§7.2 marco)

- **Aplica a 2.1 CRM, 2.2 Facturación, 2.3 Gestión de proyectos (vista cliente opcional), 2.4 Entrega al cliente, 2.6 Correo desde dominio.**
- Toda interfaz que el cliente final vea (cotizaciones, facturas, galerías, correos transaccionales, dashboards) en español. Sin mezcla de inglés salvo términos técnicos específicos.
- **Filtro:** herramientas SaaS sin localización al español funcional para cara-cliente quedan descartadas o limitadas a uso interno.

### 3.3 Hardware Apple Silicon M5 Pro (§7.3 marco)

- **Aplica a 2.5 Seguridad y accesos** (gestor de contraseñas + app TOTP deben tener cliente nativo macOS Apple Silicon).
- **Aplica a iOS nativa** para herramientas con vista móvil (gestor de contraseñas, captura rápida vía Telegram → Hermes, cliente de correo).
- **Filtro:** apps Intel-only o que requieran Rosetta para funciones críticas descartadas.

### 3.4 PDF como formato canónico (§7.4 marco)

- **Aplica a 2.4 Entrega al cliente** (cotizaciones, propuestas, contratos, facturas en PDF).
- Para preview en navegador antes de descarga, PDF puede acompañarse de vista web, pero archivo descargable debe ser PDF.

### 3.5 Self-hosted sobre Hetzner (§7.5 marco)

- **Aplica a toda nueva pieza** que se considere para el stack — debe correr sobre Coolify + Docker en VPS productivo, salvo justificación explícita.
- **Excepción legítima en eje operativo:** PAC mexicano (no existe alternativa self-hosted realista en CFDI 4.0).
- Licencias preferidas: MIT, Apache 2.0, BSD. AGPL caso a caso. Propietaria solo bajo justificación fuerte (Adobe CC, Figma).

---

## 4. Cola operativa

### 4.1 P0 vigente (heredado de 8-4-10 §4.1)

Sin cambio respecto a 8-4-10 v1215. El marco v5 NO altera el orden de P0.

1. **P0-1 Migración Hermes** — 5 fases, ~14 días calendario, ~12–16 h reales. Bloqueante de medio roadmap.
2. **P0-2 Sitio Serclin** — primer cliente real, microsite Astro+GSAP+ScrollTrigger, 26–30 h reales. Cabeza por fecha externa pendiente con cliente.
3. **P0-3 Motor de proofing** — primer demo Next+Payload. Beneficiado por curva GSAP+ScrollTrigger ya pagada en P0-2.
4. **P0-4 Pipeline de voz operativo** — cierra automáticamente con P0-1.4 (switch Hermes).

**Plan recomendado de la semana** (de 8-4-10 §6): hoy/mañana P0-2.1 pre-flight Serclin (4–5 h); paralelo en pausas: P2-4 cap OpenRouter (5 min) + P0-1.1 fase 1 Hermes (`SOUL.md` global + context files, 2–3 h).

### 4.2 P1 — operativos del cutover (8-4-10 §4.2)

- **P1-1** Destruir VPS viejo `servidor-ioon-1`. Esperar ventana 7–14 días post-cutover. Preservar snapshot `379810905`.
- **P1-2** Renombrar alias SSH `ioon-new` → `servidor-ioon-2` en `~/.ssh/config`.
- **P1-3** Borrar `~/.ssh/config.bak` en Mac.
- **P1-4** Borrar `8_ioon/docs/.write_test`.

### 4.3 P2 — mejoras no bloqueantes (8-4-10 §4.3)

- **P2-1** Backups automáticos de Coolify v4.
- **P2-2** Playbook reutilizable de rotación `N8N_ENCRYPTION_KEY`.
- **P2-3** Monitoreo / alertas de uptime y expiración de certs (UptimeKuma candidato).
- **P2-4** Cap mensual de OpenRouter $40 USD — bloquea P0-1.1.
- **P2-5** Rotación periódica de SSH keys del VPS.

### 4.4 7 decisiones operativas pendientes del marco v5 §9

Entran a la cola de 8.5 sin presión de cierre simultáneo. Cada una se resuelve cuando tenga su ventana natural.

| ID | Categoría | Decisión | Bloqueos / dependencias |
|---|---|---|---|
| §9.1 | 2.2 Facturación | Selección de PAC (CFDI 4.0 + REP + retenciones PFAE) | Ninguna — independiente |
| §9.2 | 2.5 Seguridad | Selección de gestor de contraseñas (instalación limpia) | Ninguna — independiente |
| §9.3 | 2.5 Seguridad | Selección de app TOTP | Parcialmente bloqueada por §9.2 (puede colapsar) |
| §9.4 | 2.6 Correo dominio | Selección de proveedor de correo desde dominio | Ninguna — afecta SMTP outbound de 1.9, 1.10, 1.11 |
| §9.5 | 2.7 Storage pesado | Levantamiento de volumen + selección de centro + política 3-2-1 | Bloqueada por levantamiento de volumen actual |
| §9.6 | 2.1 + 2.3 | Confirmar formalmente Notion para CRM y Gestión de proyectos | Bloqueada por evidencia fase C de 8.4.3 |
| §9.7 | 2.4 Entrega cliente | Confirmar Payload-in-Next para entrega al cliente | Bloqueada por P0-3 (Motor de proofing) |

---

## 5. Pendientes priorizados

### Bloque A — Implementación inmediata para sostener fase C de 8.4.3

(Sin cambio respecto a v2029 — siguen vigentes; entran a la cola tras P0 actual de 8.4.)

A1. Notion — formalizar configuración del workspace según 8.4.3 v2.
A2. n8n — extensión de workflows: comandos del bot, ramificación de captura, webhooks Notion/GitHub, sync, backup semanal a MinIO, auditoría mensual.
A3. Repo `-0_ioon` — crear estructura `inbox/` con frontmatter estándar.
A4. Backups periódicos del workspace de Notion a MinIO — política, frecuencia, retención, bucket dedicado.

### Bloque B — Despliegues críticos para abrir ventana de evaluación C vs B

B1. **AnythingLLM** en `rag.ioon.mx` con corpus `.md` indexado.
B2. **Portal Astro `dashboard.ioon.mx`** prototipo funcional (lectura de repo, búsqueda RAG, panoramas).
B3. Una vez ambos listos: abrir archivo dedicado `ioon_8-4-X_planeacion-tecnica_evaluacion-c-vs-b_v<fecha>.md`.

### Bloque C — Despliegues secundarios dentro de la ventana

C1. **Hoarder** en `hoarder.ioon.mx` (fase 1b del marco original).
C2. **Glosario de autor** como markdown en contexto del agente (fase 1c, ahora vía SOUL.md de Hermes).
C3. **Directus** como CMS interno (`cms.ioon.mx`).

### Bloque D — Datos administrativos para completar fichas existentes

D1. Hetzner CPX32: monto exacto del VPS, día del cargo, email de cuenta, dónde viven SSH keys y root password.
D2. GoDaddy: monto anual, próxima renovación, email de cuenta.
D3. GitHub: plan, dónde vive PAT.
D4. Gemini API y Claude API: cuenta titular, gasto típico mensual, dónde vive cada API key (en cierre con migración Hermes).
D5. Bot Telegram principal: dónde vive el bot token.
D6. MinIO: dónde viven access key y secret key.
D7. Coolify y n8n: dónde viven credenciales de admin.
D8. Google OAuth: dónde vive client secret (queda obsoleto al cerrar P1-1 con migración Hermes).
D9. Figma: fecha de alta, dónde vive el password.
D10. Notion: plan exacto, costo, fecha de alta, dónde vive el password, estructura del workspace actual.
D11. Adobe CC: plan exacto, costo, periodicidad.
D12. OpenRouter: dónde vive API key.
D13. Hermes: credenciales del stack al desplegar (`HERMES_TELEGRAM_BOT_TOKEN`, `HERMES_DB_URL`, etc.).

### Bloque E — Levantamiento de categorías sin documentar / volúmenes

E1. **Volumen actual de archivos fuente pesados** (RAW + PSD + AEP + ProRes + masters) — bloqueante para §9.5.
E2. Backup local / NAS — disco externo, NAS, Time Machine.
E3. Editor local de `.md` (opcional, no formal) — preferencia personal.

### Bloque F — Decisiones operativas del marco v5 §9

(Repetidas aquí desde §4.4 para visibilidad como pendientes priorizados.)

F1. **§9.1** PAC para facturación.
F2. **§9.2** Gestor de contraseñas.
F3. **§9.3** App TOTP (puede colapsar a F2).
F4. **§9.4** Correo desde dominio.
F5. **§9.5** Storage pesado (precondición E1).
F6. **§9.6** Confirmar Notion para CRM y proyectos.
F7. **§9.7** Confirmar Payload para entrega al cliente.

### Orden sugerido para abrir fichas individuales

Recalibrado a la luz del marco v5 y la cola P0 vigente. Sin presión de cierre simultáneo.

1. **Hermes Agent** — ficha individual completa, define la operación post-migración. Acompaña a P0-1.
2. **Sitio Serclin** — ficha técnica del primer cliente real (no es ficha de stack pero alimenta aprendizajes). Acompaña a P0-2.
3. **Notion** — ficha individual completa, formaliza fase C. Acompaña a Bloque A.
4. **n8n workflows extendidos** — ficha técnica de la implementación de modelo C.
5. **Gestor de contraseñas (§9.2)** — precondición de seguridad antes de documentar más credenciales en otras fichas.
6. **PAC facturación (§9.1)** — presión fiscal recurrente.
7. **Correo desde dominio (§9.4)** — necesario para deliverability profesional cliente-a-cliente.
8. **Motor de proofing** — ficha del primer demo Next+Payload (acompaña a P0-3).
9. **AnythingLLM** + **Portal Astro `dashboard.ioon.mx`** — fichas de despliegue (Bloque B).
10. **Storage pesado (§9.5)** — depende de levantar volumen.
11. **Penpot evaluación** — independiente, sin urgencia.

---

## 6. Notas históricas y antecedentes

### 6.1 Frappe — antecedente cerrado

Frappe (Framework + ERPNext + Frappe Health + ERPNext Mexico Compliance) fue analizado en sesión del 4-may-2026 con doble lectura: (a) herramienta interna del stack, (b) producto/servicio para clientes hospitalarios. Resultado: **no se adopta en el stack por ahora**.

Trazabilidad histórica preservada:

- `ioon_8-4-4_planeacion-tecnica_nota-frappe-implicaciones-marco-y-perfil-cliente_v20260504-1234.md` — nota a 8.4 sobre implicaciones estratégicas (vertical hospitalario, perfil cliente, capacidad operativa).
- `ioon_8-5-3_stack_nota-frappe-candidato-erp-evaluacion-postventana_v20260504-1234.md` — nota técnica para 8.5 sobre cobertura, criterios y conflictos con fase C.

Las dos notas quedan intactas como antecedente. Si Frappe vuelve a la mesa, se reabren.

### 6.2 Archivo de implementación de ioon-effects (4-may) — invalidado técnicamente

`ioon_8-5-2_stack_biblioteca-efectos-visuales-implementacion_v20260504-1233.md` (subido el 4-may con shortlist OGL + Pixi.js + SVG nativo) **quedó técnicamente invalidado** por la anotación 8-4-13 al marco v5: OGL descartada como base, R3F+drei confirmado como base canónica de ioon-effects.

Estado: archivo histórico. **Rebase pendiente en 8-4-6** (P3-5 de 8-4-10) — reescribir requerimientos con R3F+drei como base + SVG nativo como alterna + cap de bundle re-validable empíricamente. Pendiente derivado P3-7: reescribir `LiquidTextWebGL.jsx` migrando OGL → R3F+drei manteniendo API pública intacta.

### 6.3 Pregunta abierta sobre Coolify/n8n — cerrada en marco v5

En las versiones v1906 y v2001 del inventario figuraba pregunta abierta sobre cómo categorizar Coolify y n8n. Cerrada en marco v20260422-2020 (Opción B: 15ª categoría "Infraestructura / orquestación / automatización"). En marco v5 esa categoría sigue como **1.15 Infraestructura, orquestación y observabilidad** + n8n separado en **1.10 Workflows y automatizaciones**. Trazabilidad cerrada.

### 6.4 Reescritura estructural respecto a v2029 — por qué

El marco v5 reorganizó la taxonomía de "funciones operativas" (v2020, 15 categorías) a "tipos de tecnología" (v3/v4, 16 categorías) y luego abrió segundo eje paralelo (v5, bi-eje). El v2029 quedó sin estructura compatible. La reescritura preserva todas las piezas del stack (operativas y planeadas), las redistribuye en la nueva taxonomía, y suma las decisiones que ocurrieron entre el 22-abr y el 11-may (cutover VPS, decisión Hermes, stack creativo-web, anotaciones Davide Perozzi, P0 con Serclin).

---

## 7. Pregunta abierta menor — presupuesto del marco v2020 §4

Hallazgo lateral: el marco v2020 §4 declaraba tope mensual del stack (2,000 MXN/mes) y tope anual (30,000 MXN/año). Estos topes **no aparecen como sección formal** en marco v3, v4 ni v5. Quedaron implícitos en menciones dispersas (cap OpenRouter $40 USD/mes en 8-4-10 §3.1; nota de "presupuesto delgado" en notas Frappe del 4-may).

Esta es la misma clase de hallazgo que motivó la recuperación del §6 restricciones duras de v2020 al marco v5 §7. Igual que se eligió recuperarlas, valdría la pena evaluar si recuperar el §4 presupuesto al marco v6 — o decidir formalmente que el presupuesto se gestiona fuera del marco (en el chat maestro 8.0 o en algún sub-chat dedicado).

**No urgente.** Se puede dejar como pendiente para próxima revisión natural del marco (octubre 2026) o adelantar si una decisión operativa concreta lo requiere (ej. evaluación PAC con varios candidatos donde costo es decisor).

---

## 8. Próximas revisiones

- **Próxima revisión semestral programada:** octubre 2026 (heredado del marco v5 §5).
- **Revisión específica de fase C de 8.4.3:** dictamen al cierre de la ventana de 90 días, vive en archivo dedicado `ioon_8-4-X_planeacion-tecnica_evaluacion-c-vs-b_v<fecha>.md` (a abrir cuando AnythingLLM + portal Astro estén funcionales).
- **Triggers de regeneración de este inventario:**
  - Migración Hermes cierra fase 5 (cleanup II-Agent completo) — versión nueva refleja stack post-migración.
  - Sitio Serclin en línea — versión nueva refleja primer cliente real publicado y aprendizajes.
  - Motor de proofing desplegado — versión nueva refleja Payload-in-Next operativo y cierra §9.7.
  - Cierre de cualquiera de las 7 decisiones operativas pendientes (§9 marco v5).
  - Cualquier nueva versión del marco (v6+).
- **Versionado:** este archivo no se sobrescribe. Cada actualización genera `ioon_8-5-2_stack_inventario-maestro_v<AAAAMMDD-HHMM>.md` con timestamp nuevo y `supersede_a` apuntando a la versión previa.
- **Cambios entre revisiones:** se registran en `ioon_8-5-9_stack_log-decisiones_v...md` (archivo a crear cuando se haga el primer cambio).

---

*Snapshot generado el 11 de mayo de 2026 19:48-20:43 UTC-6 tras la emisión del marco v5 estructural. Reescritura completa respecto a v20260422-2029 — taxonomía bi-eje del marco v5 obliga a redistribución estructural de todas las piezas. Antecedentes históricos preservados (Frappe cerrado, ioon-effects 4-may invalidado técnicamente, pregunta Coolify/n8n cerrada en marco v20260422-2020). 7 decisiones operativas pendientes registradas como cola de 8.5 sin presión de cierre simultáneo. P0 vigente intacto (Serclin → Hermes → Motor de proofing → pipeline voz cierra automático).*
