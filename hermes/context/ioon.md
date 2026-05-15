# context/ioon.md · Qué es ioon y cuál es su stack

> Capa de contexto del **estudio**. Tau lee este archivo además del SOUL.md y context/fjlp.md para entender qué es ioon, qué stack vive, qué clientes activos, qué patrones operacionales, qué restricciones.
>
> Fuente: este archivo en `0_ioon/hermes/context/ioon.md`. Se hereda conceptualmente de `ioon_8-0-1` (instrucciones del espacio) y `ioon_8-4-2` (marco de decisión técnica v5 bi-eje).

---

## 1. Qué es ioon

**ioon** es el estudio creativo y técnico de Francisco Javier León Pacheco. Proyecto 8 del esquema `fjlp_1-2`. Posición de mercado: **Innovation Studio** (descriptor posicional · equivalente narrativo de "ioon", no entidad separada).

**Áreas de trabajo:**

- Dirección de arte para clientes (fotografía, diseño editorial, identidad visual, motion graphics).
- Desarrollo de sitios web con storytelling visual fuerte.
- Apps de cliente con áreas privadas (dashboards, proofing, e-commerce ligero).
- Productos internos reutilizables (Motor de presentaciones, Motor de catálogo, ioon-effects React, posible Motor de proofing como 4° producto).

**Filosofía operativa:**

- **OSS-first / self-hosted-first.** SaaS solo cuando alternativa OSS es claramente inferior o costo de mantenimiento supera el ahorro.
- **Soberanía tecnológica.** Stack del estudio corre en infraestructura propia (Hetzner Cloud) con Coolify + Docker + Traefik.
- **Cristalizar > acumular.** Decisiones cerradas con descartes documentados, no opciones abiertas indefinidamente.
- **Cliente primero.** Toda decisión técnica se evalúa por cómo afecta lo que el cliente final vive.

---

## 2. Sistema de decisión técnica · Marco v5 bi-eje

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

## 3. Stack vigente (resumen operativo · detalle en `ioon_8-5-2` inventario maestro)

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

## 4. Cobertura del eje operativo

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

## 5. Clientes y prospectos (esquema fjlp_1-2 sub-categorías de proyecto 8)

### 8.14 Clientes activos

- **8.14.1 Educativo Antequera** — cliente. Tiene website (8.14.1.1) y presentación 4 (8.14.1.2) registrados.
- **8.14.2 Serclin** — cliente activo. Sitio en `serclin.ioon.mx` ✅ LIVE 2026-05-14 (P0-2 cerrado). 5 presentaciones registradas (8.14.2.1 a 8.14.2.5) más el sitio mismo (8.14.2.6).

### 8.15 Prospectos

- **8.15.1 Cano-Vera** — prospecto. Sitio en `canovera.ioon.mx`.

Tau verifica el inventario `ioon_8-4-7` y el CRM Twenty (cuando esté operacional) para clientes nuevos que emerjan.

---

## 6. Patrones de proyecto (canónicos en `ioon_8-4-12` §4)

Cuando el autor pregunta "qué stack uso para X tipo de proyecto", aplica:

| Tipo de proyecto | Stack |
|---|---|
| Portafolio / sitio editorial | Astro + Tailwind + shadcn/ui + GSAP/ScrollTrigger + Motion |
| App con dashboard / auth / áreas privadas | Next.js + Payload (mismo deploy) + Tailwind + shadcn + Motion |
| Mixto (marketing + app) | Monorepo · `apps/marketing` Astro + `apps/app` Next+Payload + `packages/ui` shadcn |
| Microsite efímero / scroll-storytelling | Astro plano + GSAP/ScrollTrigger (caso Serclin) |

---

## 7. Roadmap operativo inmediato (al 2026-05-14 · cambia · Tau verifica)

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

## 8. Restricciones que aplican a cualquier propuesta de Tau

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

## 9. Lo que Tau NO debe asumir sin verificar

- El estado de un proyecto cliente — verificar en Twenty CRM (cuando esté operacional) o preguntar al autor.
- La versión vigente de una nota canónica — verificar timestamp del archivo en el repo o en filesystem MCP.
- La decisión actual sobre un tema técnico — consultar la nota canónica del marco v5 o sub-decisión vigente.
- Las prioridades del día — consultar `ioon_8-4-7` pendientes técnicos.
- El stack que tiene un cliente — verificar `fjlp_1-4-1` referencias o preguntar al autor.

---

## 10. Notas vivas del sistema (Tau las conoce y consulta)

Documentos canónicos que estructuran el sistema:

| Documento | Función |
|---|---|
| `ioon_8-0-1` | Chat maestro del estudio · instrucciones de espacio |
| `ioon_8-0-2` | Glosario canónico de vocabulario |
| `ioon_8-4-2_v20260511-1948` | Marco de decisión técnica v5 bi-eje |
| `ioon_8-4-3_v20260514-2055` | Modelo C híbrido fase C (captura) |
| `ioon_8-4-7_v20260514-2315` | Inventario operativo de pendientes |
| `ioon_8-4-8_v20260514-2200` | Snapshot del stack actual |
| `ioon_8-4-10_v20260514-2200` | Resumen ejecutivo (cabecera viva) |
| `ioon_8-4-11_v20260511-1115` | Plan de implementación de Hermes Agent (canónico · adoptado bajo identidad Tau) |
| `ioon_8-4-17_v20260514-1408` | Decisión de rol de Hermes (canónico · régimen 3 niveles vigente para Tau) |
| `ioon_8-5-0_v20260514-1417` | Índice cestas de decisiones operativas |
| `ioon_8-5-2_v20260514-2315` | Inventario maestro por bi-eje |

Tau consulta estos archivos vía filesystem MCP cuando una conversación lo amerite.

---

*context/ioon.md v20260514-2310 · segunda versión (rename Hermes → Tau en menciones del agente operativo · preserva Hermes Agent como referencia al producto base). Sustituye v20260514-2300. Próxima revisión: cuando se cierre P0-1.5 (cleanup post-migración a Hermes Agent) o cuando un cambio mayor del stack lo amerite.*
