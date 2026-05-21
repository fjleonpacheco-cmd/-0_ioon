---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-1700
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de Twenty como CRM canónico del estudio ioon. Define por qué Twenty sobre alternativas, dónde corre, cómo se accede, qué uso primario tiene y bajo qué criterio se reabriría la decisión
depende_de:
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted y patrón de adopción)
  - ioon_8-4-10_planeacion-tecnica_resumen-ejecutivo-stack-y-pendientes (estado del stack al 14-may)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila CRM se cristaliza con esta decisión)
  - ioon 8-4-7 pendientes técnicos (P0-X activación Twenty cuando arranque captura de prospectos)
  - ioon 8-13 calendario editorial (canal de inputs/outputs de prospectos pasa por Twenty)
---

# Decisión canónica — Twenty como CRM self-hosted del estudio

Decisión cristalizada el 14 de mayo de 2026 durante la sesión de stack operativo. Cierra la pregunta abierta "¿qué CRM usa ioon?" que arrastraba el inventario desde el plan de activación de abril.

---

## 1. Idea central (1 frase)

**Twenty** es el CRM canónico del estudio: open source MIT, self-hosted en Coolify sobre el Postgres existente, accesible en `crm.ioon.mx`, uso primario para pipeline de prospectos y clientes activos del estudio.

---

## 2. Contexto

ioon arrancó sin CRM formal. La captura de prospectos vivía dispersa entre Telegram, notas markdown y memoria. A medida que entran clientes reales (Educativo Antequera, Serclin, Hanseatic Pharma · plus prospectos como Cano Vera y otros explorados en abril-mayo), el costo de no tener pipeline visible empieza a doler: leads se pierden por falta de seguimiento, no hay registro de touchpoints, las cotizaciones quedan colgadas en email.

El requisito mínimo: un sistema donde **(a)** cada prospecto/cliente tenga un registro con timeline de contactos, **(b)** se vea el pipeline de deals con etapas, **(c)** sea accesible desde móvil para capturar en frío, **(d)** no rompa la filosofía self-hosted del estudio.

---

## 3. Decisión

**Twenty** queda adoptado como CRM canónico de ioon.

- **Origen:** [twenty.com](https://twenty.com) · proyecto open source moderno (TypeScript / React / NestJS / Postgres).
- **Licencia:** AGPL v3 (self-hosted libre · paid cloud opcional pero no se usa).
- **Hosting:** Coolify en `servidor-ioon-2` (Hetzner CPX32 Nuremberg).
- **Base de datos:** Postgres compartido del servidor (el mismo que sirve AnythingLLM, Vaultwarden, etc., con schema dedicado `twenty`).
- **Acceso:** `crm.ioon.mx` (subdominio cubierto por el wildcard `*.ioon.mx` ya apuntando al VPS).
- **Autenticación:** email/password local en fase 1 · SSO con Google Workspace en fase 2 cuando se cierre 8-5-6.
- **Usuarios iniciales:** 1 (Francisco) · escalable a 3-5 sin re-arquitectura cuando entre socio/equipo.

---

## 4. Razones de la elección

### 4.1 Self-hosted real, no demo

Twenty se puede correr en Docker sin hooks comerciales encadenados (sin "feature gating" entre Cloud y self-hosted como hace Cal.com Plus). La versión OSS contiene el producto completo. El proyecto declara open-core honesto: cobran por hosting y servicios profesionales, no por bloquear features clave.

### 4.2 UI moderna sin curva de aprendizaje punitiva

Interfaz visual cercana a Notion/Airtable: tablas, kanbans, vistas filtradas. Quien ha tocado herramientas modernas de productividad lo opera sin tutorial. Esto importa porque el CRM tiene que ser **usado** — un CRM bonito pero abandonado es peor que ninguno.

### 4.3 Schemas custom + relaciones

Twenty permite agregar campos custom y relaciones entre objetos (Companies ↔ People ↔ Opportunities ↔ Notes). Permite modelar el flujo real de ioon: un prospecto puede ser persona suelta (fotógrafo independiente) o empresa (Hanseatic Pharma) · una empresa tiene varios contactos · una oportunidad cruza ambos.

### 4.4 API REST + GraphQL nativos

Para futura integración con Tau (capturar prospectos desde Telegram → push a Twenty vía API), Twenty expone REST y GraphQL sin extensiones de pago. La capa Capture Engine del agente puede empujar leads sin fricciones.

### 4.5 TypeScript end-to-end + React

Aliñe con el stack creativo-web cristalizado (8-4-12). Si en algún momento ioon necesita fork o customización profunda, el código es legible para Francisco y consistente con el resto del stack del estudio.

### 4.6 Costo marginal cero

Postgres ya está corriendo. Coolify ya está corriendo. El recurso incremental es ~512 MB de RAM y ~5 GB de disco. Sobra holgado en el CPX32 actual.

---

## 5. Alternativas evaluadas y descartadas

### HubSpot Free
Tentador por feature set, pero **SaaS** — rompe filosofía, datos en servidor ajeno, el tier free tiene techos de contactos (1M libres pero locked-in en su plataforma de marketing). Subir de tier es caro (~$50-1500 USD/mes/asiento). Descarte por candado de plataforma + filosofía.

### Salesforce
Enterprise overkill. Implementación pesada, ecosistema de partners, jerga corporativa. Para un estudio creativo unipersonal es martillar mosca con tanque. Descarte por mismatch de escala.

### Pipedrive
SaaS bueno para sales teams pero $14-99 USD/mes/usuario. Para 1 usuario es razonable, para 3-5 se sale del presupuesto operativo del estudio. Descarte por costo escalable + filosofía SaaS.

### Notion como CRM
Workarounds via databases relacionadas. Funciona en superficie pero no es un CRM real: sin pipeline kanban nativo de deals con probabilidad, sin timeline de touchpoints integrado, sin API CRM-flavored. Notion brilla como wiki/proyectos, no como CRM. Descarte por mismatch de herramienta.

### EspoCRM, Vtiger, SuiteCRM
Open source legacy, UI noventera, stack PHP, comunidad envejecida. Cubrirían el requisito funcional pero la fricción de UI hace que terminen abandonados. Descarte por experiencia de uso.

### Mautic (marketing automation)
NO es alternativa — es complemento. Mautic se evalúa en decisión separada 8-5-8 para automatización de email marketing. Twenty para pipeline · Mautic para campañas. No se canibalizan.

---

## 6. Setup operativo

### Fase 1 — instalación base (semana del 19-may)

1. En Coolify, crear nuevo proyecto "Twenty CRM" desde el catálogo de servicios.
2. Apuntar al Postgres compartido con schema dedicado `twenty`.
3. Configurar dominio `crm.ioon.mx` (Traefik label + Let's Encrypt automático).
4. Crear usuario admin con email `francisco@ioon.mx` (todavía Gmail mientras 8-5-6 cierra).
5. Importar manualmente los 3-5 prospectos vivos del momento (Cano Vera, prospectos de catálogo, leads vivos).
6. Configurar 3 vistas iniciales: "Prospectos · semana", "Pipeline · deals abiertos", "Clientes activos".

### Fase 2 — integración con Google Workspace (cuando cierre 8-5-6)

- SSO Google → Twenty (un sign-in).
- Sync de calendario (eventos con prospectos aparecen como activities).
- Sync de email (threads de Gmail con contactos en Twenty quedan registrados como notes).

### Fase 3 — integración con Tau (cuando cierre P0-1.5)

- Skill auto-creada en Tau: `agregar-prospecto-a-twenty <nombre> <fuente> <notas>`.
- Captura desde Telegram → Tau valida → push API a Twenty con el objeto Person + Opportunity en stage "Inbox".
- Trigger inverso: cuando un deal cambia de stage en Twenty, Tau puede notificar en Telegram.

---

## 7. Costos

| Concepto | Costo |
|---|---|
| Licencia Twenty | $0 (AGPL self-hosted) |
| Hosting incremental | $0 (cubierto por VPS existente) |
| Postgres | $0 (compartido) |
| Backups | incluido en backup global Coolify → Backblaze B2 (P2-1) |
| **Total mensual** | **$0** |

Costo de oportunidad: ~2-4 horas de setup inicial + curva de uso real de la primera semana.

---

## 8. Riesgos y mitigaciones

### Proyecto joven
Twenty arrancó en 2023, ~3 años de vida pública. Comunidad creciente pero más pequeña que HubSpot/Salesforce. Riesgo: features faltantes, bugs en edge cases, deprecación.

**Mitigación:** los datos son portátiles vía export CSV/JSON estándar. Si Twenty fracasa, migrar a EspoCRM, Attio, o incluso al CSV crudo no requiere ingeniería complicada. El lock-in es bajo porque el modelo de datos es CRM clásico.

### Stack TypeScript / React duplica capacidades existentes
Argumento "ya tengo herramientas similares (Directus, AnythingLLM)" — pero ninguna cubre el caso CRM nativo. Directus es DB-first sin pipeline · AnythingLLM es chat sobre docs. Twenty es CRM, punto.

### AGPL puede asustar si hay cliente que pida fork
AGPL v3 obliga a publicar modificaciones server-side. ioon no planea forkear ni vender Twenty modificado — solo usar. Sin riesgo legal para el caso de uso del estudio.

---

## 9. Criterios de reapertura de la decisión

Esta decisión queda fija salvo:

1. **Twenty cambia licencia** (de AGPL a comercial cerrado, o a fair-source con cláusulas anti-self-hosting). Disparador automático de evaluación de migración.
2. **Aparece competidor open-source que claramente lo supere** en UX/features con licencia más permisiva (MIT, Apache 2). Disparador: revisión natural.
3. **El estudio crece a >10 usuarios con casos enterprise** (compliance específico, integraciones con ERPs grandes). Disparador: caso de cliente que no encaje.
4. **Twenty se vuelve abandonware** (sin commits en 6+ meses, issues sin respuesta). Disparador: migración planeada con tiempo.

Mientras ninguno de los cuatro escenarios se materialice, Twenty es el CRM de ioon.

---

## 10. Vigencia y revisión

**Revisión natural:** al cumplirse 6 meses de uso real (~noviembre 2026) — ¿se usa de verdad? ¿captura todos los leads? ¿el pipeline refleja la realidad?

**Revisión por evento:** cualquiera de los 4 disparadores del §9.

---

*Decisión cristalizada el 14-may-2026 17:00 UTC-6 durante la sesión de stack operativo. Sustituye operacionalmente la incertidumbre arrastrada desde el plan de activación abril 2026. Para reabrir, ver §9.*
