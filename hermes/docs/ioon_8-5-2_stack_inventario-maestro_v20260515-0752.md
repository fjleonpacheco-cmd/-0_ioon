---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260515-0752
autor: Francisco Javier León Pacheco
nivel: documento canónico · inventario maestro de herramientas
estado: vigente — tercera revisión · sustituye v20260514-2115
proposito: inventario maestro canónico del estudio ioon organizado por las 23+2 categorías del marco v5 bi-eje (eje técnico 1.1-1.17 · eje operativo 2.1-2.8). Esta tercera revisión aplica rename **Hermes Agent → Tau (sobre Hermes Agent)** en §1.9 tras decisión canónica de personalidad y nombre del agente operativo (`fjlp_1-5-8` 2026-05-14). Hermes Agent se preserva como nombre del producto base (Nous Research, MIT License); Tau es la identidad operativa del agente del estudio.
depende_de:
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1948 (marco v5 · estructura bi-eje)
  - ioon_8-4-17_planeacion-tecnica_decision-rol-de-hermes_v20260514-1408 (régimen Tau)
  - ioon_8-4-3_planeacion-tecnica_arquitectura-captura-y-dashboard_v20260514-2055 (modelo C híbrido fase C)
  - ioon_8-0-2_instrucciones-espacio_vocabulario-canonico-glosario_v20260514-2315 (glosario con §3 Tau + §6 Hermes Agent)
  - ioon_8-5-0_stack_introduccion-y-cestas-decisiones-operativas_v20260514-1417 (índice cestas)
  - ioon_8-5-5_stack_decision-twenty-crm_v20260514-2100
  - ioon_8-5-6_stack_decision-google-workspace-correo_v20260514-2103
  - ioon_8-5-7_stack_decision-payload-entrega-cliente_v20260514-2106
  - ioon_8-5-8_stack_decision-mautic-marketing-automation_v20260514-2110
  - ioon_8-5-9_stack_decision-vaultwarden-gestor-contrasenas-y-totp_v20260514-2245
  - ioon_8-5-10_stack_decision-formalizacion-hoarder_v20260514-1430
  - ioon_8-5-11_stack_decision-formalizacion-anythingllm_v20260514-1432
  - ioon_8-5-12_stack_decision-observabilidad-uptimekuma_v20260514-1434
  - fjlp_1-5-8_aprendizaje_decision-tau-personalidad-y-nombre_v20260514-2310 (origen rename Hermes → Tau)
sustituye_a:
  - ioon_8-5-2_stack_inventario-maestro_v20260514-2115
  - ioon_8-5-2_stack_inventario-maestro_v20260514-1500
alimenta_a:
  - próxima versión de 8-4-10 resumen ejecutivo
  - próxima versión de 8-4-8 estado actual stack
  - próxima revisión del marco 8-4-2 (apertura §1.17 + §2.8 absorbible)
  - SOUL.md de Tau
---

# Inventario maestro de herramientas del estudio ioon

Documento canónico organizado por las 23+2 categorías del marco v5 bi-eje. Estado de cobertura por categoría usando esta nomenclatura:

- ✅ **Vigente** — herramienta operativa en producción, en uso real.
- 🟡 **Contemplada decidida** — decisión cerrada en nota canónica, implementación pendiente.
- 🔴 **Decisión pendiente** — categoría sin herramienta asignada; decisión pendiente para 8.5.
- ⚫ **N/A** — categoría no requiere herramienta en el contexto actual del estudio.

---

## Eje técnico (1.1-1.17) · qué tecnologías uso para construir

### 1.1 Lenguajes de programación · ✅ Vigente

| Lenguaje | Uso | Estado |
|---|---|---|
| JavaScript / TypeScript | Front-end (Astro, Next.js, React) y back-end (Payload, n8n custom) | ✅ Vigente |
| Python | Scripts utilitarios, exploración generativa | ✅ Vigente |
| Shell / Bash | Operación VPS, automatizaciones n8n | ✅ Vigente |
| HTML | Markup base de sitios | ✅ Vigente |
| CSS | Tailwind + custom donde aplica | ✅ Vigente |
| GLSL | Shaders para R3F + drei (cuando se construyan los efectos de ioon-effects) | 🟡 Por adoptar al arrancar ioon-effects |

Nota canónica: marco v5 §1.1.

### 1.2 Frameworks de aplicación · ✅ Vigente

| Framework | Rol | Estado |
|---|---|---|
| **Astro 5** | Sitios de contenido (portafolios, sitios editoriales, motor de presentaciones, motor de catálogo, microsites) | ✅ Vigente · 8 sitios productivos (incluye `serclin.ioon.mx`) |
| **Next.js** | Apps de cliente con auth/dashboards/áreas privadas | 🟡 Contemplada · primer uso en P0-3 Motor de proofing |
| **React** | Base de componentes común (Astro islas + Next.js full) | ✅ Vigente vía shadcn/ui |
| Vue, Svelte | **Descartados** como framework primario (8-4-12 §6) | ⚫ N/A |

Nota canónica: marco v5 §1.2, decisión 8-4-12.

### 1.3 Bases de datos y persistencia · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **PostgreSQL** | DB principal compartida (Coolify, n8n, futuro Tau memoria, futuro Payload, futuro Directus interno, futuro Twenty, futuro Vaultwarden) | ✅ Vigente |
| **Redis** | Caché y sesiones donde lo requiera el servicio | ✅ Vigente · expuesto cerrado tras incidente abr-2026 |
| **MinIO** | Storage de objetos pesados (RAW, masters, PSD) | ✅ Vigente |
| **MariaDB** (potencial) | Solo si Mautic lo requiere y no soporta Postgres nativamente | 🟡 Por evaluar al desplegar Mautic |

Nota canónica: marco v5 §1.3.

### 1.4 Hosting y deploys · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **Hetzner Cloud · CPX32 · Nuremberg** | VPS único productivo `servidor-ioon-2` (`178.104.111.155`) | ✅ Vigente desde 2026-05-04 |
| **Cloud Firewall · Hetzner** | UFW + reglas a nivel host | ✅ Vigente |
| **Snapshots Hetzner** | Punto de restauración (snapshot `379810905` post-incidente conservado) | ✅ Vigente |
| **Coolify v4.0.0** | PaaS self-hosted | ✅ Vigente (acceso vía SSH tunnel) |
| **Docker + Traefik** | Containers + reverse proxy con Let's Encrypt | ✅ Vigente |
| **DNS wildcard `*.ioon.mx`** | GoDaddy A record `*` → `178.104.111.155` · resuelve subdominios sin handler explícito a 503 esperado | ✅ Vigente · documentado (era confusión en 8-4-16, comportamiento normal del wildcard) |

Nota canónica: marco v5 §1.4, informe cutover `ioon_8-4_informe-pendientes_v20260508`.

### 1.5 Comunicaciones y mensajería · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **Telegram** | Canal principal de interacción con el agente del estudio | ✅ Vigente (`@ioon_agent_bot` token activo, sin Tau desplegado aún) |
| **Gmail personal** | Comunicación general no-estudio · lectura por Tau vía MCP | ✅ Vigente |
| **Google Workspace `@ioon.mx`** (sub-sección "correo de identidad") | Correo desde dominio cara al cliente · DKIM/SPF/DMARC + SMTP relay outbound para Tau/n8n/Payload | ✅ Vigente · decisión 8-5-6 |
| Slack / Discord / WhatsApp | No adoptados por default; activar bajo caso específico de cliente | ⚫ N/A |

Nota canónica: marco v5 §1.5, decisión 8-5-6.

### 1.6 Calendario y agenda · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **Google Calendar** | Sistema vigente de agenda · integración vía MCP cuando Tau esté operacional | ✅ Vigente |

Nota canónica: marco v5 §1.6.

### 1.7 Diseño gráfico y multimedia · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **Figma · Free Starter** | UI/UX vigente | ✅ Vigente |
| **Adobe Creative Cloud** (Photoshop, Lightroom, Premiere) | Producción de imagen y video | ✅ Vigente |
| **Penpot** | Standby · activar al migrar a stack de diseño 100% OSS | 🔴 Diferida · cesta (b) del índice 8-5-0 |

Nota canónica: marco v5 §1.7.

### 1.8 Identidad visual y tipografía · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| Sistema tipográfico ioon | Definido en directrices de diseño (memoria viva) | ✅ Vigente |
| Foundries OSS preferidos | Google Fonts, Fontshare | ✅ Vigente |
| Custom de cliente | Solo en casos de identidad de cliente específica (caso-por-caso) | 🟡 Aplicable por proyecto |

Nota canónica: marco v5 §1.8.

### 1.9 IA y asistentes conversacionales · 🟡 Contemplada

| Pieza | Rol | Estado |
|---|---|---|
| **Tau** (sobre Hermes Agent · Nous Research MIT) | Agente conversacional del estudio con autonomía progresiva 3 niveles · identidad operativa decidida en `fjlp_1-5-8` 2026-05-14 · personalidad compuesta destilada de Frutiger + Mullen + Torvalds | 🟡 Contemplada · plan 8-4-11 · P0-1.1 cerrado (SOUL.md + context files emitidos v20260514-2310) · P0-1.2 deploy paralelo pendiente |
| **OpenRouter** | Provider del LLM | ✅ Vigente · $20 USD cargados (cap natural vía balance sin Auto Top-Up) |
| Modelo default | `anthropic/claude-sonnet-4.6` | 🟡 Definido |
| **AnythingLLM** | RAG local complementario a Tau (sub-sección "RAG local") | 🟡 Contemplada · decisión 8-5-11 · subdominio `rag.ioon.mx` |
| **II-Agent** | **Deprecado** · descontinuado tras incidente Redis abr-2026 | ⚫ N/A |

Notas canónicas: marco v5 §1.9, decisión 8-4-9 (Hermes Agent producto base), plan 8-4-11, rol de Hermes/Tau 8-4-17, decisión personalidad y nombre `fjlp_1-5-8`, AnythingLLM 8-5-11.

### 1.10 Workflows y automatizaciones · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **n8n self-hosted v2.10.2** | Cron, automatizaciones, backups Notion (P1-2), webhooks · integraciones cruzadas entre Twenty/Mautic/Tau | ✅ Vigente · workflow del bot deshabilitado a la espera de Tau |
| Listmonk | (descartado en favor de Mautic · decisión 8-5-8) | ⚫ N/A |

Marketing automation se movió a §1.17 nueva.

Nota canónica: marco v5 §1.10, decisión 8-5-8.

### 1.11 Captura, edición y CMS · ✅ Vigente (roles claramente divididos · modelo C híbrido fase C)

| Pieza | Rol | Estado |
|---|---|---|
| **AppFlowy** (front primario) | Captura cotidiana general + gestión de proyectos (2.3) · workspaces "captura", "proyectos", "personal" · mobile-first | 🟡 Contemplada · decisión 8-4-3 v20260514-2055 · subdominio `notes.ioon.mx` |
| **AFFiNE.pro** (front visual) | Notas visuales · pizarras · moodboards · ideación espacial · desktop-first | 🟡 Contemplada · decisión 8-4-3 v20260514-2055 · subdominio `canvas.ioon.mx` |
| **SilverBullet** (wiki técnico) | Wiki técnico personal scriptable · dashboards de notas con queries Lua-like · markdown-native | 🟡 Contemplada · decisión 8-4-3 v20260514-2055 · subdominio `wiki.ioon.mx` |
| **`.md` canon** en repo `-0_ioon` GitHub | Fuente de verdad · lo que importa formalizado | ✅ Vigente |
| **Twenty** | CRM del estudio (2.1) · pipeline de clientes · cotizaciones/propuestas con identidad ioon | 🟡 Contemplada · decisión 8-5-5 · subdominio `crm.ioon.mx` |
| **Directus** self-hosted | CMS interno exclusivo del estudio (glosario, curaduría, dashboards propios) | 🟡 Contemplada · subdominio planeado `cms.ioon.mx` |
| **Payload** (dentro de Next.js) | CMS de apps de cliente + entrega al cliente (2.4) | 🟡 Contemplada (decisión 8-5-7) · primer uso en P0-3 Motor de proofing |
| **Hoarder** | Captura de referencias externas (sub-sección) | 🟡 Contemplada · decisión 8-5-10 · subdominio `hoarder.ioon.mx` |
| **Lightroom Classic** + MinIO | Captura de campo fotográfica | ✅ Vigente |
| **Notion** | (deprecado · sale como front del modelo C tras 1 mes de uso real · decisión 8-4-3 v20260514-2055) | ⚫ N/A (en migración) |
| Sanity / Contentful / Strapi / Storyblok / Prismic | **Descartados** (8-4-12) | ⚫ N/A |

Notas canónicas: marco v5 §1.11, decisión 8-4-3 v20260514-2055, decisión 8-4-12, decisiones 8-5-5/7/10.

### 1.12 Animación, transiciones y narrativa visual · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| **GSAP + ScrollTrigger** | Storytelling con scroll · dependencia base de sitios con narrativa visual | ✅ Vigente · primera adopción en producción cerrada con Serclin LIVE (2026-05-14) |
| **Motion** (ex-Framer Motion) | Microinteracciones React | 🟡 Contemplada · uso en Motor de proofing y otros |
| **CSS animations + transitions** | Primera línea para microefectos triviales sin librería | ✅ Vigente |
| **SVG nativo** (`<feTurbulence>` + `<feDisplacementMap>`) | Primera línea sin librería para texto líquido sin reactividad mouse (anotación 8-4-13) | ✅ Disponible · sin uso productivo aún |
| Plugins GSAP especializados (Draggable, MorphSVG, MotionPath, Flip) | Activables uno-a-uno según necesidad | 🟡 Standby · activar caso a caso |
| `smoovy`, `momentum-js`, `aminejs`, `webfontloader` | **Descartados** (8-4-13) | ⚫ N/A |

Notas canónicas: marco v5 §1.12, decisiones 8-4-12 y 8-4-13.

### 1.13 Imagen, video y pipelines de media · ✅ Vigente (parcial)

| Pieza | Rol | Estado |
|---|---|---|
| **Sharp built-in Payload** | Optimización de imagen fase 1 — portafolios pequeños/medianos | 🟡 Contemplada · activa con primer proyecto Next+Payload |
| **Cloudinary** | CDN de imagen fase 2 — primer cliente fotógrafo con volumen alto | 🟡 Contemplada · activar cuando aplique |
| **imgproxy** OSS self-hosted | Fase 3 si Cloudinary escala a costo molesto | 🟡 Standby |
| **MinIO** | Originales pesados | ✅ Vigente |
| **Premiere** | Producción de video | ✅ Vigente |

Nota canónica: marco v5 §1.13.

### 1.14 Motores 3D, generativo y experimentación · 🟡 Contemplada

| Pieza | Rol | Estado |
|---|---|---|
| **Three.js** | Motor base y fundamento de aprendizaje | 🟡 Por aprender · ruta `Three.js Journey` de Bruno Simon |
| **R3F + drei** | API por defecto cuando entre 3D dentro de proyectos React · **base canónica de ioon-effects** | 🟡 Contemplada · primer uso con ioon-effects o primer proyecto 3D real |
| **p5.js** | Exploración generativa 2D · sketches sin presión de cliente | 🟡 Disponible · uso libre |
| WebGPU | Standby · activar cuando R3F estabilice su backend | 🟡 Standby |
| **OGL** | **Descartada como base** (8-4-13) — R3F+drei la sustituye | ⚫ N/A |
| `hover-effect`, `curtains.js`, Babylon.js, PlayCanvas, A-Frame, regl | **Descartados** | ⚫ N/A |

Notas canónicas: marco v5 §1.14, decisión 8-4-13.

### 1.15 Infraestructura, orquestación y observabilidad · ✅ Vigente

| Pieza | Rol | Estado |
|---|---|---|
| Hetzner Cloud + Cloud Firewall + Snapshots | (ver §1.4) | ✅ Vigente |
| Coolify v4, Docker, Traefik | (ver §1.4) | ✅ Vigente |
| **SSH key-only access** (`fj-mac-ioon-vps-20260504`) | Único par válido contra el VPS · clave vieja eliminada | ✅ Vigente |
| **Gitignore global de Mac** (`.DS_Store`) | Excluye ruido macOS de cualquier repo · configurado 2026-05-15 | ✅ Vigente |
| **UptimeKuma** | Monitoreo de uptime y certificados (sub-sección observabilidad) | 🟡 Contemplada · decisión 8-5-12 · subdominio `uptime.ioon.mx` |
| **Grafana** | Standby · 5 triggers de activación documentados | 🟡 Standby |
| **Vaultwarden** (sub-sección "gestor de contraseñas y secretos") | Gestor de contraseñas + TOTP del estudio · self-hosted FOSS | 🟡 Contemplada · decisión 8-5-9 · subdominio `vault.ioon.mx` |
| **Backups Coolify v4 → Backblaze B2** | Backup automático del Postgres compartido al bucket `ioon-coolify-backups` (us-east-005) | 🟡 En configuración 2026-05-15 · S3 Storage validado en Coolify · scheduling pendiente |
| Backup local del Mac (Time Machine) | Prevención de pérdida de filesystem local | 🔴 **NO ACTIVO** · pendiente operativo de prioridad alta tras incidente 2026-05-15 |

Notas canónicas: marco v5 §1.15, decisión 8-5-12, decisión 8-5-9 Vaultwarden.

### 1.16 Productos internos reutilizables · ✅ Vigente (parcial)

| Producto | Stack | Estado |
|---|---|---|
| **Motor de presentaciones** | Astro | ✅ Vigente · uso interno + clientes seleccionados |
| **Motor de catálogo de demos** | Astro | ✅ Vigente · `catalogo.ioon.mx` |
| **ioon-effects** | React + R3F + drei (base) + SVG nativo (alterna) · cap bundle ≤ 80 KB a re-validar | 🔴 Requerimientos por reescribir en 8-4-6 (versión previa basada en OGL invalidada por 8-4-13) |
| **Motor de proofing** (4° producto potencial) | Next.js + Payload | 🟡 Condicional · activación si demo P0-3 se generaliza |
| **Capture Engine** (sistema, no producto separado) | Telegram + Tau + MCPs | 🟡 Contemplada · materialización al cerrar P0-1 |

Notas canónicas: marco v5 §1.16, glosario 8-0-2 §2 Capture Engine + §3 Tau.

### 1.17 Marketing automation · 🟡 Contemplada · CATEGORÍA NUEVA

| Pieza | Rol | Estado |
|---|---|---|
| **Mautic** | Customer journeys complejos · drip campaigns · lead scoring · segmentación · sirve a ioon (proyecto 8) y Casa Grande (proyecto 7) | 🟡 Contemplada · decisión 8-5-8 · subdominio `marketing.ioon.mx` |
| Listmonk | (descartado en favor de Mautic) | ⚫ N/A |

Categoría abierta por decisión 8-5-8. Absorbible en próxima revisión del marco v5 sin necesidad de v6 (cambio aditivo).

Notas canónicas: marco v5 §1.17 (abierta por 8-5-8), decisión 8-5-8.

---

## Eje operativo (2.1-2.8) · qué funciones del negocio cubre el estudio y con qué

### 2.1 CRM · 🟡 Contemplada (cerrada con Twenty)

**Cobertura: → 1.11 Twenty.** Decisión cerrada 8-5-5. Cesta b.2 del índice 8-5-0 cierra. Trade-off de madurez (proyecto 2023) aceptado por el autor.

Notas canónicas: marco v5 §2.1, decisión 8-5-5.

### 2.2 Facturación · 🔴 Decisión pendiente · Facturama candidato

**Cobertura actual:** portal SAT gratuito manual transitorio. **Candidato preferente futuro:** Facturama (cuando volumen lo justifique). Cesta (a.2) del índice 8-5-0.

Notas canónicas: marco v5 §2.2.

### 2.3 Gestión de proyectos y tareas · 🟡 Contemplada (cerrada con AppFlowy)

**Cobertura: → 1.11 AppFlowy** (workspace `proyectos` separado del de captura cotidiana). Decisión cerrada 8-4-3 v20260514-2055.

Notas canónicas: marco v5 §2.3, decisión 8-4-3 v20260514-2055.

### 2.4 Entrega al cliente · 🟡 Contemplada (cerrada con Payload)

**Cobertura: → 1.11 Payload-in-Next.js.** Decisión cerrada 8-5-7. Validación operacional pendiente en P0-3 Motor de proofing.

Notas canónicas: marco v5 §2.4, decisión 8-5-7.

### 2.5 Seguridad y accesos · 🟡 Contemplada (cerrada con Vaultwarden)

**Cobertura: → 1.15 Vaultwarden.** Decisión cerrada 8-5-9. Cestas a.7 + a.8 del índice 8-5-0 cierran. 9.3 app TOTP colapsa en la misma elección (TOTP integrado).

**Excluido de 2.5:** SSH key del VPS y rotación periódica viven en §1.15 infraestructura.

Notas canónicas: marco v5 §2.5, decisión 8-5-9.

### 2.6 Correo desde dominio · ✅ Vigente (cerrada con Google Workspace)

**Cobertura: → 1.5 Google Workspace.** Decisión cerrada 8-5-6. Excepción legítima a §3.3 soberanía documentada.

Notas canónicas: marco v5 §2.6, decisión 8-5-6.

### 2.7 Dimensionamiento de storage pesado · 🔴 Decisión pendiente (con pre-requisito)

**Arquitectura preliminar:** MinIO en `servidor-ioon-2` como copia primaria + Backblaze B2 como copia off-site + medio local. Cierre canónico bloqueado por **levantamiento de volumen actual** (cesta a.1).

Notas canónicas: marco v5 §2.7.

### 2.8 Marketing y comunicación de cliente · 🟡 Contemplada · CATEGORÍA NUEVA

**Cobertura: → 1.17 Mautic.** Decisión cerrada 8-5-8. Sirve a dos proyectos del autor (ioon proyecto 8 + Casa Grande proyecto 7).

Notas canónicas: marco v5 §2.8 (abierta por 8-5-8), decisión 8-5-8.

---

## Resumen ejecutivo del inventario

### Cobertura vigente vs decisiones abiertas

**Eje técnico (1.1-1.17):**

- **Vigente operativo:** §1.1 lenguajes, §1.3 datos, §1.4 hosting, §1.5 comunicaciones (incluye Google Workspace 8-5-6), §1.6 calendario, §1.7 diseño, §1.8 identidad, §1.10 workflows (n8n), §1.11 captura cotidiana (Lightroom + .md canon), §1.12 animación (GSAP+ScrollTrigger ya en producción con Serclin LIVE), §1.15 infra principal, §1.16 productos vigentes.
- **Contemplada decidida (esperando implementación):** §1.2 (Next.js), §1.9 (Tau, AnythingLLM), §1.11 (AppFlowy, AFFiNE, SilverBullet, Directus, Payload, Hoarder, Twenty), §1.12 (Motion), §1.13 (Sharp), §1.14 (R3F+drei), §1.15 (UptimeKuma, Vaultwarden, backups Coolify→B2 en configuración), §1.16 (ioon-effects), §1.17 Mautic.
- **Decisión pendiente:** ninguna estructural en eje técnico.

**Eje operativo (2.1-2.8):**

- **Cerradas con herramienta contemplada:** §2.1 CRM → Twenty, §2.3 proyectos → AppFlowy, §2.4 entrega → Payload, §2.5 seguridad → Vaultwarden, §2.6 correo → Google Workspace (vigente), §2.8 marketing → Mautic.
- **Decisión transitoria aceptada:** §2.2 facturación (portal SAT manual · Facturama candidato futuro).
- **Decisión pendiente con arquitectura preliminar:** §2.7 storage pesado (MinIO+B2+local · bloqueada por levantamiento de volumen).

### Estado al cierre del 2026-05-15 09:00 CST

Cierres acumulados del 2026-05-14 al 2026-05-15:

1. ✅ Hoarder · AnythingLLM · UptimeKuma (8-5-10/11/12).
2. ✅ Twenty CRM · Google Workspace · Payload · Mautic · Vaultwarden (8-5-5/6/7/8/9).
3. ✅ Modelo C híbrido fase C con AppFlowy + AFFiNE + SilverBullet (8-4-3 v20260514-2055).
4. ✅ Decisión nombre + personalidad agente Tau (`fjlp_1-5-8` · SOUL.md v20260514-2310).
5. ✅ P0-2 Serclin LIVE en `serclin.ioon.mx` con feedback aprobado.
6. ✅ P0-1.1 fase 1 Hermes/Tau · SOUL.md + context files commiteados a GitHub branch `hermes/setup`.
7. ✅ P2-4 cap OpenRouter (vía balance sin Auto Top-Up).
8. ✅ P2-7 wildcard `*.ioon.mx` documentado · 503 en subdominios sin handler es comportamiento esperado.
9. ✅ Backblaze B2 bucket `ioon-coolify-backups` creado · application key generada · S3 Storage validado en Coolify v4.
10. ✅ Gitignore global de Mac configurado para `.DS_Store`.

---

## Reglas de uso de este inventario

1. **Una herramienta vive una sola vez en el eje técnico.** Las funciones operativas (eje 2) referencian las herramientas del eje 1 mediante `→ 1.X`.

2. **Sin "preferencias" sin asignación.** Si una categoría dice "🟡 Contemplada", debe apuntar a una nota canónica con decisión cerrada.

3. **Auditoría trimestral.** Cada trimestre, recorrer el inventario y verificar uso real + decisiones pendientes + funciones operativas nuevas.

4. **Versión nueva con cada decisión cerrada.** Cuando una decisión de 8.5 cierra, esta nota bumpea timestamp y el estado de la categoría correspondiente cambia.

---

*Inventario maestro v20260515-0752 generado el 2026-05-15 07:52 CST (UTC-6 Oaxaca). Tercera revisión que aplica rename Hermes → Tau en §1.9 tras decisión canónica de personalidad y nombre del agente operativo (`fjlp_1-5-8`). Hermes Agent se preserva como nombre del producto base (Nous Research, MIT). Sustituye v20260514-2115. Próxima revisión: con cada decisión cerrada en 8.5, cuando se ejecute decisión diferida de rename de path `0_ioon/hermes/` a `0_ioon/tau/`, o cuando emerja categoría nueva.*
