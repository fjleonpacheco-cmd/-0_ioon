---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-1830
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de Mautic como motor de marketing automation self-hosted de ioon. Define qué hace Mautic, qué NO hace (no es CRM), cómo se relaciona con Twenty, dónde corre, qué se pospone a fase 2
depende_de:
  - ioon_8-5-5_stack_decision-twenty-crm_v20260514-1700 (Mautic complementa, no reemplaza)
  - ioon_8-5-6_stack_decision-google-workspace_v20260514-1730 (email saliente vía SMTP Workspace para warmup)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila marketing automation)
  - ioon 8.13 calendario editorial (campañas de email programadas viven aquí)
  - ioon 8-4-7 pendientes técnicos (P2-X activación Mautic cuando arranquen campañas reales)
---

# Decisión canónica — Mautic como motor de marketing automation self-hosted

Decisión cristalizada el 14 de mayo de 2026 durante la sesión de stack operativo, justo después de cerrar Twenty CRM (8-5-5). El motivo de la inmediatez es separar conceptualmente CRM y Marketing Automation antes de que la confusión los colapse en una sola pieza mal usada.

---

## 1. Idea central (1 frase)

**Mautic** queda adoptado como motor de marketing automation self-hosted en `mautic.ioon.mx` · gestiona campañas de email · landing pages de captura · segmentación de contactos · drip campaigns · sin canibalizar a Twenty CRM (que sigue siendo el único pipeline de prospectos/clientes).

---

## 2. Contexto y distinción crítica vs Twenty

Mautic y un CRM como Twenty se confunden en la conversación cotidiana porque ambos "tienen lista de contactos". La distinción operativa es:

| Aspecto | Twenty (CRM) | Mautic (Marketing Automation) |
|---|---|---|
| Foco | Pipeline de ventas individual | Campañas masivas y nurturing |
| Granularidad | Cada deal manualmente trabajado | Segmentos de cientos/miles de leads |
| Touchpoint primario | Conversación 1:1 (email/llamada/reunión) | Email broadcast / drip / formulario web |
| Datos clave | Stage del deal · valor · próxima acción | Apertura de email · click · score de engagement |
| Output | Cliente cerrado | Lead nutrido hasta MQL → handoff a Twenty |

**Flujo canónico ioon:**

1. Mautic captura leads vía formulario en sitio público (`ioon.mx/contacto`, landing pages).
2. Mautic nutre con drip campaign (newsletter, casos de estudio).
3. Cuando un lead alcanza score X (abre N emails, descarga catálogo, agenda demo), **se promueve a Twenty** como Opportunity.
4. Desde ahí Francisco trabaja 1:1 en Twenty hasta cierre.

Sin esta distinción, el riesgo es usar Twenty como mailing list (mal · sin tracking · sin segmentación) o usar Mautic como CRM (mal · sin pipeline serio).

---

## 3. Decisión

**Mautic** queda adoptado como motor de marketing automation.

- **Origen:** [mautic.org](https://mautic.org) · open source GPL-3.
- **Hosting:** Coolify en `servidor-ioon-2`.
- **Base de datos:** MySQL/MariaDB dedicado (Mautic requiere MySQL, no Postgres · es la única pieza del stack que rompe la regla "todo en Postgres" · se acepta como costo del trade-off).
- **Acceso:** `mautic.ioon.mx` (wildcard DNS cubre).
- **Email saliente:** SMTP relay vía Google Workspace fase 1 (rate limit ~2000/día por usuario Workspace · suficiente para arranque) · evaluar SendGrid/Postmark/Amazon SES cuando se escale a más volumen.
- **Identidad cuenta admin:** `francisco@ioon.mx`.
- **Activación:** **fase 2** del roadmap operativo (no se activa inmediatamente · se prepara como infra disponible cuando arranquen campañas reales).

---

## 4. Razones de la elección

### 4.1 Open source maduro con caso de uso real

Mautic existe desde 2014, decenas de miles de instalaciones productivas, comunidad activa. No es vaporware ni proyecto experimental.

### 4.2 Self-hosted alineado con filosofía

Coherente con la filosofía del estudio (Twenty, Payload, Directus). GPL-3 acepta self-hosting libre sin restricciones para uso interno.

### 4.3 Feature completo sin tier de pago

Mautic abierto incluye: email campaigns, drip campaigns, formularios web, landing pages, segmentación dinámica, lead scoring, A/B testing, integraciones webhook. Equivalente comercial de Mailchimp + ActiveCampaign costaría $100-400 USD/mes/usuario.

### 4.4 Costo marginal de hosting

Coolify ya corre · MariaDB es liviana · ~1 GB de RAM extra para Mautic en steady state. Sin presión sobre el VPS actual.

### 4.5 Decisión postergable de activación real

Mautic puede estar **instalado pero dormido** mientras Francisco no tenga campañas activas. La decisión de adopción no obliga al uso inmediato — separa "infra disponible" de "uso productivo".

---

## 5. Alternativas evaluadas y descartadas

### Mailchimp · ConvertKit · ActiveCampaign · Sendinblue / Brevo
SaaS de marketing automation con free tier limitado. Precios escalan rápido: $30-300 USD/mes según volumen de contactos. Buena UX pero rompe filosofía + costo recurrente. Descarte por filosofía + costo.

### HubSpot Marketing
Tier free generoso pero las features serias (workflows · automation real · A/B testing) están en tiers $800+ USD/mes. Lock-in fuerte. Descarte por costo escalable + filosofía.

### Listmonk
Self-hosted, ligero, escrito en Go. Hace newsletter masivo bien · sin marketing automation real (sin drip, sin scoring, sin formularios web). Buena para newsletter pura pero scope incompleto. Descarte por scope incompleto · podría reconsiderarse si Mautic se vuelve overkill para el caso real.

### Bento, Brevo, MailerLite
SaaS con free tiers. Buenas para newsletter simple pero ninguna combina automation seria + filosofía self-hosted. Descarte.

### Construir desde cero
Tentación developer recurrente. Costo de mantenimiento desproporcionado vs adoptar Mautic. Sin justificación. Descarte por costo de oportunidad.

---

## 6. Activación en fases

### Fase 0 — instalación dormida (mes 1 post-decisión)

1. Coolify · proyecto "Mautic" desde catálogo.
2. MariaDB dedicada en mismo Coolify.
3. Subdominio `mautic.ioon.mx`.
4. Usuario admin `francisco@ioon.mx`.
5. Configurar SMTP saliente vía Google Workspace (con app password).
6. Crear segmentos iniciales vacíos: "Prospectos · arquitectos", "Prospectos · fotógrafos", "Prospectos · educación".

**Estado tras fase 0:** instalado, accesible, sin campañas activas, sin leads.

### Fase 1 — primer formulario y captura (mes 2-3)

7. Crear formulario web "Suscribirse a updates de ioon" embebido en `ioon.mx/contacto`.
8. Configurar página de gracias post-suscripción.
9. Verificar deliverability con seed list (10-20 emails de prueba a inboxes propios y conocidos).
10. Confirmar tracking de aperturas/clicks funciona.

**Estado tras fase 1:** captura de leads activa, sin nurturing aún.

### Fase 2 — primer drip campaign (mes 4-6)

11. Diseñar drip de bienvenida (5-7 emails sobre 4 semanas).
12. Configurar lead scoring básico.
13. Configurar trigger "lead score > 50 → push a Twenty como Opportunity".

**Estado tras fase 2:** marketing automation operativo en bucle completo.

### Fase 3 — broadcast newsletter (mes 6+)

14. Newsletter mensual con casos de estudio, novedades del estudio.
15. Segmentación por industria.
16. A/B testing de subject lines.

---

## 7. Costos

| Concepto | Costo |
|---|---|
| Licencia Mautic | $0 (GPL-3 self-hosted) |
| Hosting incremental | $0 (cubierto por VPS) |
| MariaDB | $0 |
| SMTP saliente (fase 1) | $0 (Google Workspace SMTP, hasta 2000 emails/día) |
| SMTP saliente (escalado) | $10-30 USD/mes (Amazon SES o Postmark cuando se exceda Workspace) |
| **Total mensual fase 1** | **$0** |
| **Total mensual fase escalada (>2000 emails/día)** | **~$15-30 USD** |

---

## 8. Riesgos y mitigaciones

### Mautic tiene reputación de "pesado" / "anticuado"
La UI no es lo más moderno del mercado. Mitigación: solo Francisco lo usa internamente · UX subóptima es tolerable si el motor cumple. Si en el futuro la fricción de uso es real, evaluar Listmonk + workflows custom · pero no antes de tener uso real medido.

### MySQL/MariaDB rompe la regla "todo en Postgres"
Costo aceptado. MariaDB es liviana y madura · agregar una DB engine extra no es ingeniería heavy.

### Deliverability self-hosted requiere disciplina
Aunque el email saliente va vía SMTP Workspace (que tiene infra de deliverability industrial), las prácticas de email marketing (frecuencia · double opt-in · unsubscribe · contenido no spammy) son responsabilidad del operador. Mitigación: arrancar con seed list pequeña · monitorear bounce rate · seguir buenas prácticas.

### Activación tardía pierde momentum
Si Mautic queda instalado pero nunca se activa, el setup es trabajo desperdiciado. Mitigación: cerrar fase 0 solo cuando haya pendiente claro de fase 1 (ej. "primer cliente cerrado → setup formulario para captar similares").

---

## 9. Criterios de reapertura

1. **Mautic cambia licencia** (GPL-3 → cerrado). Disparador: migrar a Listmonk o fork de Mautic comunidad.
2. **Mautic se vuelve abandonware** (sin releases en 6+ meses). Disparador: revisión.
3. **El estudio nunca activa Mautic en 12 meses** post-decisión. Disparador: cuestionar si la decisión fue prematura · evaluar desinstalar y reconsiderar herramienta más ligera.
4. **Volumen real exige migrar a SaaS por deliverability** (>100k emails/mes con clientes corporativos exigentes). Disparador: evaluar SendGrid + Mautic, o salir a Mailchimp/Brevo si el costo se justifica.

---

## 10. Vigencia y revisión

**Revisión natural:** 6 meses post-instalación (fase 0) — ¿se activó la fase 1? ¿hay tracción real?

**Revisión por evento:** cualquiera del §9.

---

*Decisión cristalizada el 14-may-2026 18:30 UTC-6. Adopción separada de activación · Mautic se instala como infra disponible para fase 2 cuando arranquen campañas reales.*
