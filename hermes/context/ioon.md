# context/ioon.md · Qué es ioon y cuál es su stack

> Capa de contexto del **estudio**. Tau lee este archivo además del SOUL.md y context/fjlp.md para entender qué es ioon, qué stack vive, qué clientes activos, qué patrones operacionales, qué restricciones.
>
> Fuente: este archivo en `0_ioon/hermes/context/ioon.md`. Se hereda conceptualmente de `ioon_8-0-1` (instrucciones del espacio), `ioon_8-4-2` (marco de decisión técnica v5 bi-eje) y `ioon_8-1-1` (matriz de identidad v2).

---

## 1. Qué es ioon

**ioon** es el **estudio de autor digital** de Francisco Javier León Pacheco. Proyecto 8 del esquema `fjlp_1-2`.

**Posicionamiento v2 (20-may-2026 · `ioon_8-1-1`):** ioon es un **constructor de infraestructura digital soberana** para proyectos con peso, materia e historia. No es una agencia de marketing ni un contenedor genérico de contenidos digitales. El estudio maduró desde la concepción v1 (binomio / marketing generalista) hacia este enfoque de ingeniería web + soberanía del dato.

**Propuesta única de valor:** unir rigor tipográfico clásico con ingeniería web de vanguardia para que la obra digital se perciba con la misma dignidad que en el mundo físico. El **software y la infraestructura self-hosted son el núcleo**; dirección de arte, fotografía y narrativa visual son el **acabado premium** que corona la estructura técnica — no el producto base.

**Arquetipo de marca:** Mago/Alquimista (transformación ágil vía Vibe Coding · soluciones que parecen mágicas por su fluidez) con núcleo profundo de Sabio (rigor analítico, documentación canónica, precisión estratégica). Perfil: **Artesano Tectónico / Ingeniero Humanista**.

**Estructura operativa (v2):** soberanía y ejecución unificada — el estudio es **dirigido e implementado exclusivamente por Francisco**. Cierra el modelo de binomio / co-dirección de la etapa v1.

**Áreas de trabajo:**

- Infraestructura web self-hosted de alto rendimiento (vitrinas, portales privados, automatización).
- Dirección de arte y fotografía como **capa premium** — curaduría de alta resolución, preservación de textura material (RAW, concreto, madera) sin compresión que aplane la obra.
- Apps de cliente con áreas privadas (dashboards, proofing, e-commerce ligero).
- Productos internos reutilizables (Motor de presentaciones, Motor de catálogo, ioon-effects React, posible Motor de proofing como 4° producto).

**Filosofía operativa:**

- **OSS-first / self-hosted-first.** SaaS solo cuando la alternativa OSS es claramente inferior o el costo de mantenimiento supera el ahorro.
- **Soberanía tecnológica.** El stack corre en infraestructura propia (Hetzner Cloud) con Coolify + Docker + Traefik. Los datos no alimentan modelos de terceros sin consentimiento.
- **Austeridad y honestidad material.** Rechazo de adornos superfluos, plantillas prefabricadas y "humo" tecnológico. El código respeta la materia original.
- **Cristalizar > acumular.** Decisiones cerradas con descartes documentados, no opciones abiertas indefinidamente.
- **Cliente primero.** Toda decisión técnica se evalúa por cómo afecta lo que el cliente final vive.
- **Vibe Coding como metodología núcleo** — invocar arquitecturas de datos complejas en tiempos cortos mediante uso avanzado de LLMs, con revisión/ajuste del autor.

---

## 2. Oferta comercial · WaaS 3 niveles

Modelo **Web-as-a-Service** en tres niveles de despliegue. Canónico en el catálogo de servicios (`ioon_8-1-2`). Mapea con los patrones de proyecto del §8.

| Nivel | Nombre | Stack | Entrega central |
|---|---|---|---|
| **1** | El Cimiento (presencia y narrativa) | Astro + GSAP (ScrollTrigger) + MinIO | Vitrinas estáticas hiper-optimizadas · carga en milisegundos · motor de catálogo para imágenes de extrema resolución |
| **2** | La Estructura (área operativa y captura) | Next.js + Payload CMS + PostgreSQL | Portales privados de cliente · bitácoras de obra · repositorios documentales · CMS a la medida |
| **3** | Los Acabados (automatización y escala) | Mautic + n8n + R3F (React Three Fiber) | Embudos de nutrición automatizados · dashboards conectados al CRM · modelos 3D interactivos en navegador |

**Modelo de cobro:** Setup inicial + iguala mensual (mantenimiento + hospedaje del servidor dedicado).

**El "foso" técnico (diferenciador):**
1. **Gestión de medios pesados** — alojar e iterar miles de fotografías RAW y archivos masivos vía MinIO self-hosted, sin sobrecostos de almacenamiento.
2. **Soberanía** — infraestructura en VPS dedicado (Hetzner, Nuremberg) bajo orquestación propia.

---

## 3. Segmento objetivo · go-to-market arquitectura

Foco comercial **inicial** = sector arquitectura. Es la primera vertical de adquisición, **no la totalidad de a quién sirve ioon**: clientes activos como Educativo Antequera (educación) y Serclin están fuera de este vertical. Tau no debe inferir que ioon es solo arquitectura.

Dos buyer personas canónicas para esta vertical:

- **Persona A · El Taller de Autor** (insp. LAMZ Arquitectura · `ioon_8-6-1`). Despacho boutique 3-8 personas, obra de autor con alta riqueza material. Dolor: las plataformas genéricas comprimen y "aplanan" la textura de sus materiales; sitios pesados que cargan lento. **Encaje:** Nivel 1. **Ruta comercial:** Vía A (socio fundador · setup subsidiado a cambio de feedback mensual + iguala · su portafolio se vuelve caso de éxito canónico del Nivel 1).
- **Persona B · El Despacho Institucional** (insp. Taller Mauricio Rocha · `ioon_8-6-2`). Firma 15-50+ personas, obra pública / institucional de gran capital. Dolor: caos documental y auditorías, ansiedad del inversionista, falta de entorno seguro para planos confidenciales. **Encaje:** Nivel 2/3, producto **"Observatorio Digital de Obra"** (bóvedas privadas con roles Admin/Supervisor/Inversionista/Auditor). **Ruta comercial:** Vía B (reunión consultiva → prototipo de 15 min → programa piloto).

Plan de despliegue táctico (guiones de acercamiento, prototipos) canónico en `ioon_8-6-3`.

---

## 4. Sistema de decisión técnica · Marco v5 bi-eje

Documento canónico: `ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1948`.

**Estructura del marco:**

- **Eje técnico §1.1-1.17** — qué tecnologías uso para construir.
- **Eje operativo §2.1-2.8** — qué funciones del negocio cubre el estudio y con qué.
- **9 criterios de evaluación uniformes §2** — rúbrica aplicada a cada decisión.
- **3 principios transversales §3** — experiencia de cliente · tipografía y animación · soberanía tecnológica.
- **§7 restricciones duras transversales** — CFDI 4.0, RFC PFAE, residencia fiscal México, idioma español cara al cliente, Apple Silicon M5 Pro, PDF como formato canónico, self-hosted sobre Hetzner.
- **§8 reglas de cruce** — una herramienta vive una sola vez en eje técnico; funciones operativas referencian con `→ 1.X`.

Cuando Tau propone herramientas o evalúa opciones nuevas, **aplica este marco**, no su intuición. Filtro §7 primero, rúbrica §2 después, principios §3 al final.

---

## 5. Stack vigente (resumen operativo · detalle en `ioon_8-5-2` inventario maestro)

### Infraestructura

- **Hetzner Cloud · CPX32 · Nuremberg** — VPS `servidor-ioon-2` (`178.104.111.155`) operando desde 2026-05-04 post-incidente Redis.
- **Coolify v4.0.0** · acceso vía SSH tunnel (`ssh -L 8000:localhost:8000 ioon-new`).
- **Docker + Traefik** con Let's Encrypt automático.
- **SSH key activa única:** `fj-mac-ioon-vps-20260504`.

### Datos compartidos

- **PostgreSQL** (compartido entre servicios · schemas dedicados).
- **Redis** (caché · expuesto cerrado post-incidente).
- **MinIO** (objetos pesados · RAW, masters, PSD).

### Sitios productivos (al 2026-05-14)

- `ioon.mx` · `canovera.ioon.mx` · `catalogo.ioon.mx`
- `arquitectura-1.ioon.mx` · `fotografia-1.ioon.mx` (demos)
- `hpt-demo.ioon.mx` · `hpt-demo-v2.ioon.mx`
- **`serclin.ioon.mx`** · ✅ LIVE 2026-05-14 con feedback aprobado por cliente.
- `n8n.ioon.mx` (workflows · workflow del bot deshabilitado a la espera de Tau operacional).

### Servicios contemplados (deploy pendiente · al 2026-05-14)

| Servicio | Subdominio | Categoría | Rol |
|---|---|---|---|
| **Tau** (yo · sobre Hermes Agent) | (opcional `bot.ioon.mx`) | §1.9 | Asistente conversacional con 3 niveles de delegación |
| **AnythingLLM** | `rag.ioon.mx` | §1.9 sub-sección RAG | Consulta de documentos del estudio con embeddings 100% locales |
| **Twenty CRM** | `crm.ioon.mx` | §1.11 sub-sección CRM | Pipeline de clientes del estudio |
| **AppFlowy** | `notes.ioon.mx` | §1.11 modelo C híbrido fase C | Captura cotidiana + gestión de proyectos (workspace por rol) |
| **AFFiNE.pro** | `canvas.ioon.mx` | §1.11 modelo C híbrido fase C | Notas visuales · pizarras · moodboards |
| **SilverBullet** | `wiki.ioon.mx` | §1.11 modelo C híbrido fase C | Wiki técnico scriptable con dashboards Lua-like |
| **Directus** | `cms.ioon.mx` | §1.11 | CMS interno (glosario, curaduría) |
| **Payload-in-Next** | (varía por proyecto) | §1.11 + §2.4 | CMS de apps de cliente + entrega al cliente |
| **Hoarder** | `hoarder.ioon.mx` | §1.11 sub-sección referencias externas | Bookmarks y inspiración |
| **Mautic** | `marketing.ioon.mx` | §1.17 (nueva) + §2.8 (nueva) | Marketing automation para ioon y Casa Grande |
| **UptimeKuma** | `uptime.ioon.mx` | §1.15 observabilidad | Monitoreo de uptime y cert expiry |
| **Vaultwarden** | `vault.ioon.mx` | §1.15 secretos | Gestor de contraseñas + TOTP del estudio |

### Servicios externos vigentes

- **Google Workspace** — correo desde dominio `@ioon.mx` con DKIM/SPF/DMARC.
- **OpenRouter** — provider LLM para Tau (sobre Hermes Agent) y AnythingLLM. Cap mensual $40 USD (por configurar).
- **Adobe Creative Cloud** — Photoshop, Lightroom, Premiere.
- **Figma Free Starter** — UI/UX (Penpot en standby como alternativa OSS futura).
- **GoDaddy** — DNS de `ioon.mx`.
- **GitHub** — repo `fjleonpacheco-cmd/-0_ioon` (con guion inicial).

---

## 6. Cobertura del eje operativo

| Categoría | Cobertura |
|---|---|
| **2.1 CRM** | Twenty (decisión 8-5-5) |
| **2.2 Facturación** | Portal SAT manual transitorio · Facturama candidato preferente futuro |
| **2.3 Gestión de proyectos** | AppFlowy workspace `proyectos` (decisión 8-4-3 v20260514-2055) |
| **2.4 Entrega al cliente** | Payload-in-Next.js (decisión 8-5-7) · validación operacional en P0-3 |
| **2.5 Seguridad y accesos** | Vaultwarden (decisión 8-5-9) |
| **2.6 Correo desde dominio** | Google Workspace (decisión 8-5-6 · ya operativo) |
| **2.7 Storage pesado** | MinIO ampliado + Backblaze B2 off-site + medio local (arquitectura preliminar · pendiente levantamiento de volumen) |
| **2.8 Marketing y comunicación** | Mautic (decisión 8-5-8 · estructural nueva) |

---

## 7. Clientes y prospectos (esquema fjlp_1-2 sub-categorías de proyecto 8)

### 8.14 Clientes activos

- **8.14.1 Educativo Antequera** — cliente. Tiene website (8.14.1.1) y presentación 4 (8.14.1.2) registrados.
- **8.14.2 Serclin** — cliente activo. Sitio en `serclin.ioon.mx` ✅ LIVE 2026-05-14 (P0-2 cerrado). 5 presentaciones registradas (8.14.2.1 a 8.14.2.5) más el sitio mismo (8.14.2.6).

### 8.15 Prospectos

- **8.15.1 Cano-Vera** — prospecto. Sitio en `canovera.ioon.mx`.

Tau verifica el inventario `ioon_8-4-7` y el CRM Twenty (cuando esté operacional) para clientes nuevos que emerjan.

---

## 8. Patrones de proyecto (canónicos en `ioon_8-4-12` §4)

Cuando el autor pregunta "qué stack uso para X tipo de proyecto", aplica. Los tipos mapean con los niveles WaaS del §2:

| Tipo de proyecto | Stack | Nivel WaaS |
|---|---|---|
| Portafolio / sitio editorial | Astro + Tailwind + shadcn/ui + GSAP/ScrollTrigger + Motion | Nivel 1 |
| App con dashboard / auth / áreas privadas | Next.js + Payload (mismo deploy) + Tailwind + shadcn + Motion | Nivel 2 |
| Mixto (marketing + app) | Monorepo · `apps/marketing` Astro + `apps/app` Next+Payload + `packages/ui` shadcn | Nivel 2 (+ automatización Nivel 3) |
| Microsite efímero / scroll-storytelling | Astro plano + GSAP/ScrollTrigger (caso Serclin) | Nivel 1 |

---

## 9. Roadmap operativo inmediato (al 2026-05-14 · cambia · Tau verifica)

- **P0-1 Migración a Hermes Agent · activación de Tau (yo)** — fase 1 arrancando con este SOUL.md.
- **P0-2 Serclin** — ✅ CERRADO LIVE.
- **P0-3 Motor de proofing fotógrafo** — siguiente proyecto cliente.
- **P0-4 Pipeline de voz** — cierra automáticamente con mi fase 4 (switch del token principal).

**Pendientes operativos paralelos (post-P2-1 backups):**

- Deploy de todas las herramientas contempladas (~30-50 h distribuidas).
- Migración desde Notion al stack nuevo de captura.
- Levantamiento de volumen storage para cerrar §2.7.

Tau consulta `ioon_8-4-7` para el inventario operativo al día.

---

## 10. Restricciones que aplican a cualquier propuesta de Tau

Heredadas del marco v5 §7:

- **CFDI 4.0** obligatorio para cualquier comprobante fiscal al cliente.
- **RFC mexicano PFAE** · cualquier herramienta de facturación o que reporte impuestos debe operar bajo este régimen.
- **Residencia fiscal México.**
- **Idioma español cara al cliente** sin mezcla con inglés salvo términos técnicos puntuales.
- **Apple Silicon M5 Pro + iOS nativo** para cualquier herramienta de uso cotidiano del autor.
- **PDF como formato canónico** para entregas formales (cotizaciones, propuestas, contratos, facturas).
- **Self-hosted sobre Hetzner** preferido · SaaS solo con excepción documentada.
- **Licencias preferidas:** MIT, Apache 2.0, BSD. AGPL caso-a-caso. Propietaria solo con justificación fuerte.

---

## 11. Lo que Tau NO debe asumir sin verificar

- El estado de un proyecto cliente — verificar en Twenty CRM (cuando esté operacional) o preguntar al autor.
- La versión vigente de una nota canónica — verificar timestamp del archivo en el repo o en filesystem MCP.
- La decisión actual sobre un tema técnico — consultar la nota canónica del marco v5 o sub-decisión vigente.
- Las prioridades del día — consultar `ioon_8-4-7` pendientes técnicos.
- El stack que tiene un cliente — verificar `fjlp_1-4-1` referencias o preguntar al autor.
- **Que ioon es solo arquitectura** — la vertical arquitectura (§3) es el foco comercial inicial, no el alcance total del estudio.

---

## 12. Notas vivas del sistema (Tau las conoce y consulta)

Documentos canónicos que estructuran el sistema:

| Documento | Función |
|---|---|
| `ioon_8-0-1` | Chat maestro del estudio · instrucciones de espacio |
| `ioon_8-0-2` | Glosario canónico de vocabulario |
| `ioon_8-1-1_v20260520-2147` | Matriz de identidad v2 · manifiesto, PUV, arquetipo, posicionamiento |
| `ioon_8-1-2_v20260520-2020` | Catálogo de servicios · oferta WaaS 3 niveles |
| `ioon_8-4-2_v20260511-1948` | Marco de decisión técnica v5 bi-eje |
| `ioon_8-4-3_v20260514-2055` | Modelo C híbrido fase C (captura) |
| `ioon_8-4-7_v20260514-2315` | Inventario operativo de pendientes |
| `ioon_8-4-8_v20260514-2200` | Snapshot del stack actual |
| `ioon_8-4-10_v20260514-2200` | Resumen ejecutivo (cabecera viva) |
| `ioon_8-4-11_v20260511-1115` | Plan de implementación de Hermes Agent (canónico · adoptado bajo identidad Tau) |
| `ioon_8-4-17_v20260514-1408` | Decisión de rol de Hermes (canónico · régimen 3 niveles vigente para Tau) |
| `ioon_8-4-18_v20260521-1000` | Plan de instalación detallado Hermes Agent fase 1 |
| `ioon_8-5-0_v20260515-0800` | Índice maestro del stack |
| `ioon_8-5-2_v20260515-0752` | Inventario maestro por bi-eje |
| `ioon_8-6-1_v20260520-2040` | Buyer Persona A · El Taller de Autor (LAMZ) |
| `ioon_8-6-2_v20260520-2040` | Buyer Persona B · El Despacho Institucional (Mauricio Rocha) |
| `ioon_8-6-3_v20260520-2020` | Plan de despliegue comercial · sector arquitectura |

Tau consulta estos archivos vía filesystem MCP cuando una conversación lo amerite.

---

*context/ioon.md v20260521-1545 · tercera versión (integra posicionamiento ioon v2: infraestructura digital soberana + oferta WaaS 3 niveles + segmento arquitectura; reposiciona dirección de arte/fotografía como acabado premium; añade subtema 8.6 comercial al mapa de notas vivas). Sustituye v20260514-2310. Próxima revisión: cuando se cierre P0-1.5 (cleanup post-migración a Hermes Agent), cuando se catalogen formalmente los docs 8-1-x / 8-6-x, o cuando un cambio mayor del stack lo amerite.*
