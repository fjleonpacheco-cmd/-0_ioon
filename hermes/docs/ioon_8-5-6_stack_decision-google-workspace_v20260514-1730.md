---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-1730
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de Google Workspace Business Starter como capa de identidad, email, calendar y file-sharing externo de ioon. Documenta por qué rompe la filosofía self-hosted, qué alternativas se descartaron, qué precio se acepta y bajo qué condiciones se reabriría
depende_de:
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía base que esta decisión modifica conscientemente)
  - ioon_8-5-5_stack_decision-twenty-crm_v20260514-1700 (consume SSO de Workspace en fase 2)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila email/identidad/file-sharing externo)
  - ioon 8-4-7 pendientes técnicos (P0-X activación Workspace + migración email francisco@ioon.mx)
  - ioon 8.13 calendario editorial (Google Calendar como fuente operativa)
  - ioon 8.14 clientes (Drive como espacio compartido de entregables)
---

# Decisión canónica — Google Workspace Business Starter como capa de identidad externa

Decisión cristalizada el 14 de mayo de 2026. Es la decisión que más rompe la filosofía self-hosted del estudio · se toma conscientemente y se documenta el porqué para no relitigar.

---

## 1. Idea central (1 frase)

**Google Workspace Business Starter** queda adoptado como capa de identidad/email/calendar/file-sharing externo de ioon — **rompiendo conscientemente la filosofía self-hosted** porque la deliverability de email y la aceptabilidad cliente no son negociables, y self-hosted email es un pozo de mantenimiento que no compensa para un estudio unipersonal.

---

## 2. Contexto

ioon tiene dominio propio (`ioon.mx`) y necesita:

1. **Email profesional** `francisco@ioon.mx` con deliverability confiable (que las propuestas comerciales lleguen al inbox del cliente, no a spam).
2. **Calendar** compartido con clientes para reuniones sin pingponguear horarios.
3. **Drive externo** para entregar archivos pesados a clientes que no tienen MinIO ni WeTransfer formal.
4. **Meet** para videollamadas sin instalar Zoom/Teams.
5. **Identidad federada** (SSO) que pueda alimentar Twenty CRM (8-5-5), eventualmente Vaultwarden (8-5-9), y herramientas futuras.

Hasta el 14 de mayo, Francisco operaba con `fj.leonpacheco@gmail.com` para identidad personal y emails informales · `francisco@ioon.mx` apuntando a forward de Gmail sin envío saliente desde el dominio · cero infraestructura de calendar/drive con marca ioon hacia cliente. Funciona para una persona en arranque · falla cuando un cliente corporativo pide propuesta formal y la respuesta sale desde un Gmail genérico.

---

## 3. Decisión

**Google Workspace Business Starter** queda adoptado.

- **Plan:** Business Starter — $7.20 USD/mes/usuario (precio MX al 14-may-2026, paga anual: ~$86 USD/usuario/año).
- **Usuarios iniciales:** 1 (`francisco@ioon.mx`). Se escala con socio/equipo cuando aplique.
- **Aliases incluidos sin costo:** `contacto@ioon.mx`, `hola@ioon.mx`, `proyectos@ioon.mx`. Reglas de forwarding internas.
- **Almacenamiento:** 30 GB por usuario (suficiente para email + drive con archivos de entregable, no para masters de fotografía — esos siguen en MinIO).
- **Integraciones canon:**
  - SSO → Twenty CRM (8-5-5 fase 2)
  - Calendar → fuente operativa de 8.13 calendario editorial
  - Drive → carpetas por cliente activo (`/Clients/<Cliente>/`) para compartir entregables
  - Meet → reuniones de cliente con link de marca
- **MX records:** DNS de `ioon.mx` actualizado para apuntar a Google MX · SPF / DKIM / DMARC configurados (mejora deliverability vs solución casera).

---

## 4. Razones de la elección

### 4.1 Deliverability de email — la razón pesada

Self-hosted email es operacionalmente brutal. Para que un mail enviado desde un servidor propio llegue al inbox del cliente (no a spam) requiere:

- IP del VPS con reputación limpia (los IPs de Hetzner suelen estar en blacklists residuales).
- SPF / DKIM / DMARC perfectos.
- Postfix + Dovecot + Rspamd + DNS PTR record + warmup de IP gradual.
- Monitoreo continuo de blacklists (Spamhaus, Barracuda, SORBS).
- Mitigación de bounces, manejo de feedback loops.

Una sola configuración mal hecha y los emails comerciales caen a spam silencioso · el estudio pierde leads sin enterarse. El costo de gestionar esto correctamente es ~5-10 horas/mes en steady state + 20-40 horas de setup inicial. A $7.20 USD/mes, Google Workspace cubre eso con infraestructura industrial.

### 4.2 Aceptabilidad cliente

Cliente corporativo (Hanseatic Pharma, escuelas, agencias) recibe propuesta de `francisco@ioon.mx` y espera tooling profesional alrededor. Calendar shareable, link de Meet, archivos en Drive de empresa. Operar con Gmail personal + algún hack creativo proyecta "estudio aún en arranque" en exactamente el momento donde se vende seriedad.

### 4.3 Ecosistema federado

Workspace no es solo email. Es identidad federada que se conecta limpio con:
- Twenty CRM (SSO)
- Vaultwarden (futura integración)
- Cualquier SaaS que ofrezca "Sign in with Google" (que es ~todos)

Self-hosted Postfix da email decente pero no resuelve identidad federada · habría que sumar Authentik o Zitadel encima · más superficie de mantenimiento.

### 4.4 Costo predecible y pequeño

$86 USD/año/usuario. A 1 usuario es ruido. A 5 usuarios son $430 USD/año — todavía menor que cualquier otro componente serio de la operación. Cuando ioon crezca a 10+ usuarios la cuenta sigue siendo manejable, y para entonces el ingreso sostendrá la línea.

### 4.5 Decisión reversible si cambia el cálculo

Si en el futuro la filosofía self-hosted gana peso (Workspace sube precio brutalmente · Google hace algo desagradable · el estudio crece a equipo con cultura privacy-first), migrar a self-hosted con Migadu como fallback o a Postfix puro es operativo. No hay lock-in profundo en el dato (email es portable, calendar exporta a iCal, Drive baja archivos).

---

## 5. Filosofía — por qué se acepta romper la regla

La filosofía self-hosted de ioon no es ideología pura. Es una herramienta para tres cosas: **control de datos**, **costo predecible**, **independencia técnica**. Para cada componente del stack hay que evaluar si self-hosted gana en las tres dimensiones o no.

| Dimensión | Self-hosted email | Google Workspace |
|---|---|---|
| Control de datos | Alto (todo en VPS propio) | Medio (datos en Google, pero Workspace tiene Vault y export estándar) |
| Costo predecible | Bajo monetario · alto en tiempo (5-10 h/mes) | $86/año fijo |
| Independencia técnica | Alta (corre sin Google) | Baja (lock-in al ecosistema) |

Self-hosted gana en 2 de 3 · Workspace gana en costo total real (sumando tiempo). Para **email específicamente**, el problema crítico es deliverability — y ahí self-hosted falla con frecuencia que no se puede tolerar.

Para otros componentes (CRM · CMS · password manager · marketing automation · backups) la balanza vuelve a self-hosted limpio. Esta decisión es **excepción puntual al patrón**, no inflexión general.

---

## 6. Alternativas evaluadas y descartadas

### Self-hosted Postfix + Dovecot + Rspamd
Técnicamente factible. Operacionalmente pesadilla. Costo en tiempo recurrente alto, riesgo de deliverability real, sin ventaja compensatoria para un usuario unipersonal. Descarte por costo/beneficio.

### Migadu
SMTP/IMAP boutique, $20-90 USD/año según volumen. Buena reputación, indie, política privacy-respectful. Cubre email pero **no** calendar/drive/meet integrados, identidad federada limitada. Si solo se necesitara email, Migadu sería competitivo. El stack completo gana Workspace. Descarte por scope incompleto.

### Fastmail
Email + calendar excelente, $5-9 USD/mes. Sin Meet equivalente, sin Drive equivalente, identidad federada débil. Mismo problema de scope que Migadu. Descarte por scope incompleto.

### ProtonMail / Tuta
E2E encryption como diferencial. Para uso comercial-creativo no es feature pesada (los clientes no esperan E2E, los entregables van por Drive con permisos). Bridge IMAP requerido para compatibilidad con clientes externos. Calendar y Drive limitados. Descarte por mismatch de caso de uso.

### Microsoft 365 Business Basic
Equivalente comercial directo de Workspace, similar precio (~$6 USD/mes). Outlook + Teams + OneDrive. Ecosistema histórico más corporativo, peor para creativos (Drive vs OneDrive para compartir con cliente externo · Meet más universal que Teams). Descarte por mismatch cultural / UI peor para uso creativo.

### Zoho Workplace
$3 USD/mes, ecosistema completo. UX y deliverability mejorando pero todavía menor reputación. Para escalar con confianza en deliverability, Workspace gana. Descarte como segunda opción · podría reconsiderarse si el costo de Workspace cambia.

---

## 7. Setup operativo

### Fase 1 — alta y migración (semana del 19-may o cuando cierre P0-1.5)

1. Comprar Workspace Business Starter en `workspace.google.com` con dominio `ioon.mx`.
2. Verificar propiedad del dominio (TXT record en GoDaddy).
3. Apuntar MX records de `ioon.mx` a los servidores de Google (MX10 smtp.google.com).
4. Configurar SPF (`v=spf1 include:_spf.google.com ~all`), DKIM (key de Google), DMARC (`v=DMARC1; p=quarantine; rua=mailto:dmarc@ioon.mx`).
5. Crear usuario `francisco@ioon.mx` con password fuerte (almacenado en Vaultwarden cuando 8-5-9 cierre).
6. Migrar emails históricos de Gmail personal con Google Takeout + import.
7. Crear aliases sin costo: `contacto@`, `hola@`, `proyectos@`.
8. Actualizar firma de email con identidad ioon (logo + tagline + links).

### Fase 2 — integraciones (semanas siguientes)

- Conectar Twenty CRM con SSO Google (cuando cierre 8-5-5 fase 2).
- Calendar como source-of-truth de 8.13 calendario editorial.
- Drive con estructura `/Clients/<Cliente>/<Proyecto>/` para entregables.
- Meet links auto-generados en eventos de calendar con clientes.

### Fase 3 — escalado

- Cuando entre socio o primera contratación: dar de alta `<nombre>@ioon.mx` ($86 USD/año adicional por persona).
- Cuando se necesite Vault / compliance: upgrade a Business Standard ($14.40 USD/mes/usuario).

---

## 8. Costos

| Concepto | Costo |
|---|---|
| Workspace Business Starter · 1 usuario · paga anual | ~$86 USD/año |
| Setup inicial (tiempo Francisco) | ~3 horas (alta + DNS + migración) |
| Mantenimiento recurrente | ~0 horas (Google opera) |
| **Total año 1** | **~$86 USD + 3 horas** |

Comparativo de costo total real (dinero + tiempo a $30/h cost-of-time):

- Self-hosted Postfix: $0 monetario + ~30 horas/año mantenimiento = **$900 USD/año equivalente**.
- Migadu: $20/año + ~5 horas/año config = **$170 USD/año equivalente** (pero scope incompleto).
- **Workspace: $86 USD/año + 0 horas = $86 USD/año equivalente.**

Workspace es el más barato cuando se cuenta el tiempo.

---

## 9. Riesgos y mitigaciones

### Lock-in al ecosistema Google
Mitigación: export de datos estándar (Takeout) · email es portable (IMAP) · calendar exporta a iCal · Drive baja archivos · Workspace usa estándares (SMTP, CalDAV, WebDAV) cuando se quiere salir. Lock-in es real pero salida ordenada es factible en 1-2 días si se planea.

### Privacy / política de Google
Workspace Business tiene cláusulas distintas a Gmail personal — Google no entrena modelos con email de Workspace. Aún así, la decisión asume que para email comercial-profesional la sensibilidad de contenido es manejable. Conversaciones genuinamente sensibles (legal, financiero específico) no viajan por email plano de cualquier proveedor.

### Costo escalable
Riesgo de que Google suba precio significativamente. Histórico: Workspace ha subido precio una vez en 2023. Mitigación: la decisión es reversible · Migadu o Fastmail como plan B con DNS apuntando a otro servidor en cuestión de horas.

---

## 10. Criterios de reapertura

Esta decisión queda vigente salvo:

1. **Workspace sube precio >50%** en una sola revisión sin features adicionales que lo justifiquen. Disparador: migrar a Fastmail/Migadu evaluado en serio.
2. **Google introduce restricción de uso comercial** o política que afecte la operación del estudio (e.g., límites artificiales de envío, ML training opt-out roto).
3. **Llega cliente con requirement explícito de email self-hosted** y representa >30% del revenue. Reapertura caso por caso.
4. **El estudio crece a 15+ usuarios** y el costo anual cruza umbral de $1500 USD — entonces vale la pena evaluar self-hosted con SRE dedicado.

Mientras ninguno se materialice, Workspace es la capa de identidad externa de ioon.

---

## 11. Vigencia y revisión

**Revisión natural:** 6 meses (~noviembre 2026) — confirmar que la deliverability es la esperada · que el ROI del costo se siente · que el caso de uso no migró.

**Revisión por evento:** cualquiera de los 4 disparadores del §10.

---

*Decisión cristalizada el 14-may-2026 17:30 UTC-6. Excepción consciente a la filosofía self-hosted del estudio, documentada para no relitigar.*
