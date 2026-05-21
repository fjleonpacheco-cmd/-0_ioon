---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-1800
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar a nivel canónico operativo la elección de Payload como CMS de aplicaciones cliente del estudio ioon. Eleva la decisión cristalizada en 8-4-12 §2.2 del marco de stack creativo-web al canon de stack operativo del estudio, con detalles de licencia, hosting, integración con Next.js y patrón de adopción
depende_de:
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (decisión origen · §2.2 cristaliza Payload como CMS cliente)
  - ioon_8-4-2_planeacion-tecnica_complemento_v20260514-1311 (último complemento del marco bi-eje)
  - ioon_8-5-2_stack_inventario-maestro_v20260515-0752 (fila CMS cliente)
alimenta_a:
  - ioon 8.14.X primer demo "Motor de proofing fotógrafo" (consumidor primario)
  - ioon 8.4.X ficha del demo (cuando se cree)
  - ioon 8-5-5 Twenty CRM (potencial integración para sync deals ↔ proyectos cliente)
---

# Decisión canónica — Payload como CMS de aplicaciones cliente

Decisión cristalizada en su origen el 11 de mayo de 2026 dentro del stack creativo-web (8-4-12 §2.2). Esta nota la eleva a **decisión canónica operativa del estudio** con los detalles de implementación, licencia, hosting y patrón de adopción que necesita 8.5 stack para tratarla como pieza fija del inventario.

---

## 1. Idea central (1 frase)

**Payload** es el CMS canónico para todas las aplicaciones cliente de ioon que requieran CMS, autenticación, RBAC o área privada — corre **dentro de Next.js como rutas de la misma app**, colapsando CMS + Auth + DB + frontend en un solo deploy en Coolify.

---

## 2. Contexto

8-4-12 (stack creativo-web del 11-may) cristalizó la dupla **Astro para sitios de contenido + Next.js para apps con dashboard**, y especificó Payload como capa CMS de las apps Next.js. La decisión queda registrada en §2.2 de esa nota.

Pero 8-4-12 vive en 8.4 planeación técnica · es un marco arquitectónico. Para que Payload aparezca correctamente como pieza canónica del **stack operativo del estudio** (8.5 inventario maestro · 8-5-2), necesita su propia decisión canónica con frontmatter limpio · alternativas descartadas explícitas · plan de adopción · y criterios de reapertura.

Esta nota es esa formalización. No reabre la decisión — la fija en el lugar correcto del sistema.

---

## 3. Decisión

**Payload v3** queda adoptado como CMS canónico para aplicaciones cliente del estudio.

- **Origen:** [payloadcms.com](https://payloadcms.com) · open source TypeScript MIT.
- **Licencia:** MIT pura (sin AGPL · sin cláusulas comerciales restrictivas · sin gating de features).
- **Modo de uso:** **Payload-in-Next** — Payload corre como rutas de la misma app Next.js, no como servidor separado. Un solo proyecto, un solo deploy, un solo Postgres.
- **Hosting:** Coolify en `servidor-ioon-2` por defecto · subdominio por proyecto cliente (`proofing.ioon.mx`, `app.cliente.com`, etc.).
- **Base de datos:** Postgres dedicado por cliente o compartido con schema dedicado (decisión por proyecto · ver §6).
- **Storage de uploads:** Sharp built-in para optimización fase 1 · Cloudinary cuando escale (ver 8-4-12 §5 pipeline de imagen).
- **Auth:** Payload built-in (email/password local) por default · OAuth con Google Workspace cuando aplique (8-5-6).

---

## 4. Razones de la elección

### 4.1 Colapsa la stack en un deploy

CMS + Auth + DB + Frontend en una sola app Next.js. Un solo `docker compose up`, un solo subdominio, un solo backup. Esto importa para un estudio unipersonal — cada proyecto cliente se mantiene operacionalmente trivial.

Comparado con la arquitectura "headless CMS + frontend separado" (Sanity + Next.js · Strapi + Next.js): Payload elimina la capa de red entre CMS y frontend, evita problemas de CORS y latencia, y reduce sustancialmente el costo de mantenimiento.

### 4.2 Schemas en TypeScript

Las colecciones se definen en TypeScript como archivos `.ts`. Esto significa:
- Type safety end-to-end (los tipos del CMS son los tipos del frontend, sin generación manual).
- Versionado en Git (los schemas viven en el repo, no en un panel admin opaco).
- Modificable en frío con un commit y un deploy, sin click-ops en una UI.

### 4.3 Admin UI moderno incluido

Payload incluye un panel admin React con CRUD generado, vistas custom, comentarios, versions/drafts. No hay que construir admin desde cero. La UI es modificable (React components) si un cliente necesita customización.

### 4.4 MIT puro, self-hosted real

Sin AGPL · sin "cloud-only features" · sin gating de RBAC en versión paid. La versión open source contiene producto completo. Payload monetiza vía hosting opcional y enterprise support, no vía features bloqueadas.

### 4.5 Pipeline de imagen serviceable

Payload integra **Sharp** built-in para optimización de uploads (variantes thumb/medium/large generadas automáticamente). Para casos pequeños y medianos es suficiente. Para fotógrafos profesionales con volumen alto, integra limpio con **Cloudinary** como CDN externo (ver 8-4-12 §5).

### 4.6 Stack alineado con resto del estudio

TypeScript · React · Postgres · Node.js · Docker. Mismo lenguaje y patrones que Next.js, Twenty, Tau (Hermes Agent). Una sola curva de aprendizaje sirve para todo el stack del estudio. Coherente y reduce switching cost mental.

---

## 5. Alternativas evaluadas y descartadas

Ver detalle en 8-4-12 §6. Resumen:

### Sanity
SaaS · pricing escalable ($99 USD/mes Team por proyecto) · descartado por filosofía + costo escalable + scope incompleto (no resuelve auth/dashboard nativo).

### Contentful
Enterprise SaaS · pricing pesado · mismatch con perfil freelance creativo. Descarte por costo y filosofía.

### Strapi
Open source competitor directo. DX moderno pero **sin modo Next.js-integrated nativo** (Strapi siempre corre como servidor separado). Para los casos de ioon (apps con auth + dashboard), Payload-in-Next es decisivo. Descarte por arquitectura.

### Directus
**No es competidor** — es complemento. Directus es para uso interno del estudio (glosario, curaduría, dashboards propios). Payload es para apps cliente. Conviven sin canibalizarse · cada uno en su rol.

### Storyblok, Prismic
Editoriales con bloques visuales · no encajan en el patrón de apps con auth/dashboard de ioon. Descarte por mismatch.

### Build CMS custom desde cero
Tentación recurrente en developers. Costo de mantenimiento desproporcionado vs adoptar Payload (que ya resolvió RBAC, versions, drafts, hooks, queries optimizadas, admin UI). Descarte por costo de oportunidad.

---

## 6. Patrón de adopción por proyecto

### 6.1 Caso típico: app cliente con dashboard

**Proyecto:** Motor de proofing fotógrafo (primer demo · ver 8-4-12 §9), Hanseatic Pharma portal interno, dashboard de cliente con login.

**Patrón:**
- Repo: `<cliente>/app` (monorepo no requerido a esta escala).
- Stack: Next.js + Payload + Tailwind + shadcn/ui.
- DB: Postgres dedicado en Coolify (más simple para snapshots cliente-aislados).
- Storage uploads: MinIO para originales pesados · Sharp para variantes web.
- Deploy: Coolify · subdominio `<servicio>.<cliente>.com` o `<servicio>.ioon.mx` según relación con cliente.

### 6.2 Caso mixto: marketing + app

**Proyecto:** Estudio de arquitectura con sitio público + área privada de obra.

**Patrón:**
- Monorepo: `apps/marketing` (Astro) + `apps/app` (Next.js + Payload) + `packages/ui`.
- Una sola DB Postgres compartida con schemas separados (Payload no afecta al sitio marketing).
- Deploy: dos servicios Coolify bajo el mismo cliente.

### 6.3 Decisión Postgres dedicado vs compartido

**Dedicado por cliente** cuando:
- Compliance del cliente exige aislamiento.
- Volumen de datos alto (>10 GB).
- Cliente paga hosting incluido en proyecto.

**Compartido (schema separado)** cuando:
- Cliente pequeño o demo.
- Bajo volumen previsible (<2 GB).
- Estudio asume hosting como costo operativo (caso de demos para vender el servicio).

Esta decisión se documenta en la **ficha del proyecto cliente**, no aquí.

---

## 7. Setup operativo del primer proyecto

Adopción real arranca con el **Motor de proofing fotógrafo** (ver 8-4-12 §9 · ficha por crear). Pasos canónicos:

1. `pnpm create payload-app@latest` (template Next.js).
2. Configurar colecciones: Users · Galleries · Images · Proofs · Comments · Downloads.
3. Configurar auth con email/password local (Payload built-in).
4. Configurar uploads con Sharp para variantes thumb/medium/large.
5. Frontend: dashboard fotógrafo + área cliente con login, galería, marcado, comentarios.
6. Dockerfile (multi-stage build, Node 20 alpine).
7. Push a repo `proofing-demo` en GitHub.
8. Coolify: nuevo servicio · auto-deploy desde GitHub (con caveat de 8-4-16 · force rebuild manual confiable).
9. Subdominio `proofing.demo.ioon.mx` · Traefik + Let's Encrypt automático.
10. Postgres dedicado en mismo Coolify (DB-as-a-service de Coolify).

Tiempo estimado primer demo: 2-4 semanas part-time.

---

## 8. Costos

| Concepto | Costo |
|---|---|
| Licencia Payload | $0 (MIT self-hosted) |
| Hosting incremental por proyecto cliente | $0 (cubierto por VPS hasta llenar) |
| Postgres por proyecto | $0 (Coolify DB-as-a-service) |
| Cloudinary (cuando escale) | $0 free tier hasta ~25 GB tráfico/mes · luego $15-30 USD/mes |
| **Total por proyecto cliente fase 1** | **$0** |

Costo monetario llega solo cuando un cliente real con volumen alto activa Cloudinary, y para entonces ese costo va en la cotización del proyecto.

---

## 9. Riesgos y mitigaciones

### Payload 3 es relativamente reciente
Versión 3.0 estable (Q4 2024). Curva de adopción rápida pero menos battle-tested que CMS legacy. Riesgo: bugs en edge cases, breaking changes en versions mayores.

**Mitigación:** primer proyecto es demo interno (Motor de proofing) · ahí se aprende sin riesgo de cliente · cuando entra primer cliente real, Payload ya tiene base de uso propia.

### Dependencia de ecosistema Next.js
Si Next.js cambia drásticamente (rompe App Router otra vez, cambia licencia, Vercel hace algo desagradable), Payload-in-Next se afecta. Mitigación: Payload también corre standalone (no requiere Next.js) · se puede separar en un sprint si hace falta · cambio drástico tiene salida ordenada.

### Stack TypeScript pesado
Familias Node.js / TypeScript / Postgres son consistentes con resto del estudio · no es overhead nuevo. Riesgo bajo.

---

## 10. Criterios de reapertura

Esta decisión queda vigente salvo:

1. **Payload cambia licencia** (MIT → comercial restrictivo). Disparador: evaluar migración a Strapi o build propio.
2. **Payload se abandona o se vuelve inestable** (sin releases en 6+ meses · issues críticos sin resolver). Disparador: revisión.
3. **Cliente con compliance específico exige CMS certificado** (ISO, SOC 2). Disparador: caso por caso, posiblemente coexistir con otro CMS para ese cliente.
4. **Aparece competidor open-source claramente superior** con misma filosofía MIT + Next.js-integrated. Disparador: revisión natural.

---

## 11. Vigencia y revisión

**Revisión natural:**
- Al cerrar el Motor de proofing (primer demo) — registrar aprendizajes reales y ajustar este canon si hay sorpresas.
- A los 6 meses de uso real con cliente activo (estimado Q1 2027).

**Revisión por evento:** cualquiera del §10.

---

## 12. Relación con otras decisiones canónicas

- **8-4-12 §2.2** — origen de esta decisión. Esta nota la formaliza al canon operativo.
- **8-5-5 Twenty CRM** — potencial integración: cuando un deal en Twenty pasa a "Cliente activo", se dispara provisioning del proyecto cliente con Payload backend.
- **8-5-6 Google Workspace** — auth OAuth Google opcional para apps cliente que lo justifiquen.
- **8-5-X Directus (decisión separada)** — Directus para uso interno · Payload para clientes · conviven sin pisarse.

---

*Decisión canónica formalizada el 14-may-2026 18:00 UTC-6. La decisión técnica original es del 11-may en 8-4-12 §2.2. Esta nota la eleva al inventario operativo del estudio.*
