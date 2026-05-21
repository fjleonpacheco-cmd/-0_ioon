---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260504-1234
autor: Francisco Javier León Pacheco
nivel: nota-informativa
estado: borrador-para-ingerir
proposito: registrar técnicamente a Frappe (Framework + ERPNext + ERPNext Mexico Compliance, opcionalmente Frappe CRM/Books/HR) como candidato a evaluar para múltiples categorías del marco vigente — principalmente 1.7 facturación, con extensiones potenciales a 1.6 CRM, 1.10 administración general y 1.12 gestión de proyectos. La nota deja la base técnica armada para una ficha individual futura, pero recomienda explícitamente NO abrir evaluación ahora y mantener intacta la cola de fichas individuales acordada.
depende_de:
  - fjlp_1-1_contexto-general-francisco
  - fjlp_1-2-4_organizacion-de-archivos_directriz-nombres_v20260420-1843
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255
  - ioon_8-5-1_stack_contexto_v20260422-1656
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260422-2020 (marco vigente)
  - ioon_8-4-3_planeacion-tecnica_arquitectura-captura-y-dashboard_v20260422-1951 (modelo C híbrido vigente)
  - ioon_8-5-2_stack_inventario-maestro_v20260422-2029 (inventario vigente)
  - ioon_8-4-4_planeacion-tecnica_nota-frappe-implicaciones-marco-y-perfil-cliente_v20260504-1234 (nota gemela en 8.4)
alimenta_a:
  - ioon 8-5-9 stack log-decisiones (entrada de candidato pendiente)
  - ioon 8-4-X planeacion-tecnica evaluacion-c-vs-b (futura, al cerrar la ventana)
  - ioon 8-5-X stack frappe (futura ficha individual cuando se abra evaluación)
---

# Nota informativa — Frappe como candidato ERP all-in-one para evaluación post-ventana

Esta nota se ingiere en el chat **8.5 stack** para dejar trazabilidad técnica del candidato Frappe sin abrir evaluación formal. Su propósito es que cuando llegue el momento (post-dictamen de la ventana C vs B de 8.4.3 v2), la ficha individual `ioon_8-5-X_stack_frappe_v...md` no parta de cero.

La nota **no propone reordenar la cola de fichas individuales** acordada en el inventario v2029 (Notion → n8n → contraseñas → AnythingLLM → portal Astro → backups → facturación → correo → storage → entrega → CRM+proyectos → Penpot). La recomendación operativa explícita es **mantener la cola intacta** y considerar Frappe solo cuando se llegue al ítem 7 (facturación) y/o 11 (CRM+proyectos), si para entonces sigue teniendo sentido.

La pregunta estructural sobre "Frappe para clientes hospitalarios" vive en la nota gemela `ioon_8-4-4_planeacion-tecnica_nota-frappe-implicaciones-marco-y-perfil-cliente_v20260504-1234.md`, no aquí.

---

## 1. Origen de la consideración

Durante la sesión de trabajo de 8.5 stack del 4 de mayo de 2026, Francisco planteó analizar [https://frappe.io/](https://frappe.io/) "con la intención de incluirlo en mi stack". La parte interna de esa pregunta se documenta aquí; la parte estratégica (clientes hospitalarios) se documenta en la nota gemela de 8.4.

---

## 2. Síntesis técnica de Frappe relevante para 8.5

### 2.1 Familia de productos

- **Frappe Framework** v16 (enero 2026) — meta-framework Python/JavaScript, GPLv3, meta-data driven.
- **ERPNext** — ERP completo OSS sobre Frappe: contabilidad, inventario, ventas, compras, manufactura, HR, proyectos.
- **Frappe CRM** — pieza separada y ligera. No requiere ERPNext para correr.
- **Frappe Books** — contabilidad ligera para freelancers/PYMES (alternativa a ERPNext para uso simple).
- **Frappe HR** — recursos humanos.
- **Frappe Health** — HIS hospitalario (relevante para la pregunta estratégica de la nota gemela 8.4, no para uso interno).

### 2.2 Despliegue y requisitos técnicos

- Self-hostable. Soporte oficial para Docker; existen guías oficiales con Dokploy y Frappe Press para deploy productivo.
- Stack interno: **MariaDB + Redis + Node.js + Python + Nginx**. Pesado.
- RAM mínima recomendada para una instancia ERPNext productiva: **≥ 4 GB dedicados**. Con MariaDB y Redis sumando, es realista contar con 6–8 GB para holgura operativa.

### 2.3 Compliance México

- **ERPNext Mexico Compliance** (proyecto comunitario `TI-Sin-Problemas` en GitHub).
  - Cubre: CFDI 4.0 timbrado de Sales Invoices y Payment Entries, complemento de pago, cancelaciones de CFDI con motivos, catálogos SAT (régimen fiscal, métodos de pago, claves de productos), generación XML + PDF.
  - Integra PAC vía API key + secret + paquete de timbres + CSD del contribuyente.
  - **Falta evidencia de complemento de retención.** Para Persona Física con Actividad Empresarial, las retenciones de ISR e IVA son operación normal. Sin complemento de retención, ese flujo queda fuera del software o se opera manualmente.
  - Última release v0.12.3 (febrero 2026), 729 commits acumulados, 0 issues abiertos. Comunidad pequeña (14 estrellas, 11 forks). Mantenimiento activo pero acotado.
  - Soporta ERPNext v15.

### 2.4 Idioma y soporte

- ERPNext tiene traducción a español funcional. Documentación principal en inglés.
- Comunidad hispanohablante existe, principalmente en LATAM y España.

---

## 3. Cobertura del candidato contra las 15 categorías del marco

| Categoría | Cobertura por Frappe | Notas |
|---|---|---|
| 1.1 Diseño gráfico/tipográfico | No aplica | n/a |
| 1.2 Fotografía | No aplica | n/a |
| 1.3 Motion | No aplica | n/a |
| 1.4 Colaboración cliente | Parcial (portal de cliente de ERPNext) | UX no minimalista; uso cara al cliente requiere customización significativa |
| 1.5 Storage / backup | No aplica directamente | n/a (ERPNext almacena en MariaDB; archivos pesados no son su fortaleza) |
| 1.6 CRM | Sí — Frappe CRM ligero o módulo CRM de ERPNext | Compete con la ampliación natural de Notion (8.4.3 v2) |
| 1.7 Facturación | Sí — ERPNext + Mexico Compliance | Cubre CFDI 4.0, complemento de pago, cancelaciones; falta retención. PAC es costo aparte (igual que cualquier solución) |
| 1.8 Hosting / dominio / correo | No aplica | n/a |
| 1.9 IA / asistentes | No aplica | n/a |
| 1.10 Administración general | Sí — ERPNext (registro fiscal, control documental, calendario, tareas) | Compete con Notion (fase C vigente) |
| 1.11 Captura / organización ideas | No aplica | n/a |
| 1.12 Gestión de proyectos / tareas | Sí — módulo de proyectos de ERPNext | Compete con Notion |
| 1.13 Seguridad y accesos | No aplica | n/a (ERPNext tiene auth propio pero no es gestor de contraseñas del estudio) |
| 1.14 Entrega al cliente | Parcial (portal de cliente) | UX no minimalista |
| 1.15 Infraestructura / orquestación / automatización | No aplica | Frappe es app sobre infraestructura, no es la capa de infra |

**Lectura cruzada:** Frappe es un candidato genuino para **una sola categoría con compliance claro (1.7 facturación)** y, opcionalmente, para un bloque ampliado **1.6 + 1.10 + 1.12** que hoy está en fase C bajo el front operativo Notion.

---

## 4. Cumplimiento contra criterios del Punto 3 del marco

### 4.1 Peso alto

| Criterio | Lectura |
|---|---|
| Experiencia de cliente / calidad de marca | **Riesgo medio-alto.** ERPNext default no encaja en la línea editorial minimalista de ioon (resumen ejecutivo 8.0.2 §3). Customizable con trabajo significativo. Para piezas internas no aplica; para piezas cara al cliente (cotizaciones, facturas, portal) sí pesa |
| Soberanía / OSS-first | **✓ cumple plenamente.** GPLv3, self-hosted |
| Calidad tipográfica | **n/a** para uso interno; **negativo** para uso cara al cliente sin customización |
| Integración con stack ioon | **Parcial.** Frappe se despliega sobre Coolify (✓) pero no integra nativamente con el resto del stack (n8n, II-Agent, MinIO, AnythingLLM). Las integraciones se construyen vía API/webhook desde n8n. No es pieza-isla pero requiere trabajo de pegado |
| Continuidad / madurez | **✓ alta.** Frappe + ERPNext son maduros (>10 años). Mexico Compliance es proyecto comunitario pequeño; riesgo medio de bus factor |
| Fidelidad a estética minimalista | **Negativo en defaults.** ERPNext es ERP corporativo en aspecto |

### 4.2 Peso medio

| Criterio | Lectura |
|---|---|
| Costo dentro del presupuesto | Software 0 MXN. **Pero implica upgrade de VPS** (CX32 con 8 GB RAM en 37% de uso típico no sostiene cómodamente ERPNext + el stack en cola Hoarder/Directus/AnythingLLM/Astro). Upgrade a CX42 o superior rompe el margen apretado del Punto 4 (~0–400 MXN/mes restantes). PAC tiene costo aparte (~variable según volumen de timbres) |
| Curva de aprendizaje | **Alta.** ERPNext es ERP completo de empresa. Para 1 persona facturando 5–15 clientes/mes y CRM ligero es overkill arquitectónico |
| Soporte en español | **Aceptable.** Comunidad hispanohablante existe |
| Residencia / portabilidad | **✓ buena.** Datos en MariaDB propio; export estándar |
| Disponibilidad offline | **Negativo.** Requiere conexión al VPS |
| Apple Silicon | **n/a.** Es servicio web; el cliente es navegador en macOS |

### 4.3 Regla de desempate (OSS vs cerrado)

No aplica directamente porque la comparación natural de Frappe no es contra una alternativa cerrada — es contra **otras combinaciones OSS** (Notion + Facturama es híbrido SaaS pago + SaaS pago; ERPNext + PAC es OSS + PAC pago).

La regla de desempate del marco está pensada para "OSS vs cerrada con misma función". Aquí la pregunta real es **all-in-one vs piezas-best-of-breed** — eso queda fuera del Punto 3 vigente y debe declararse explícitamente al evaluar.

---

## 5. Cumplimiento contra restricciones duras del Punto 6 del marco

| Restricción | Lectura |
|---|---|
| CFDI 4.0 obligatorio | **Cubierto** por ERPNext Mexico Compliance |
| 1 RFC mexicano, persona física, PFAE | **Soportado** salvo el gap de complemento de retención |
| Contador externo, exportación XML/PDF | **✓ soportado** |
| Idioma español cara-al-cliente | Customizable; defaults en español aceptables |
| 1 persona, mantenimiento razonable | **Punto crítico.** ERPNext requiere mantenimiento no trivial (upgrades de versión mayor de Frappe son operación delicada, índices de MariaDB, backups, monitoring). Operable por 1 persona pero con costo de tiempo |
| Hardware Apple Silicon | n/a (server-side) |
| Self-hosted sobre Hetzner/Coolify | ✓ |
| PDF como formato cliente | ERPNext genera PDF nativamente |

---

## 6. Conflictos con la fase C vigente (8.4.3 v2)

Esta es la razón principal por la que la nota recomienda **no abrir evaluación ahora**:

1. **Notion ya está adoptado como front operativo durante 90 días bajo evaluación formal.** Notion cubre tableros, dashboards, CRM ligero, proyectos. ERPNext compite con Notion en esas funciones. Abrir evaluación de Frappe en paralelo violaría la disciplina de la ventana — el Punto 7 del marco exige "criterios escritos al inicio" y "comparativa A/B documentada al cerrar". Tres opciones evaluándose en paralelo (C híbrido, B OSS completo, Frappe all-in-one) saturan la disciplina.
2. **Stack en cola de despliegue:** Hoarder (1b), Glosario (1c), Directus + AnythingLLM (2), portal Astro `dashboard.ioon.mx`. Cada uno consume recursos del VPS y atención. Sumar ERPNext (≥ 4 GB RAM) en este momento empeora la sobrecarga.
3. **Cola de fichas individuales acordada:** Notion → n8n → contraseñas → AnythingLLM → portal Astro → backups → facturación → correo → storage → entrega → CRM+proyectos → Penpot. Frappe se inserta naturalmente en el ítem 7 (facturación) o el ítem 11 (CRM+proyectos), no antes.
4. **Resultado de la ventana cambia el cálculo:**
   - Si gana **C** (Notion estable), Frappe puede entrar como evaluación específica para 1.7 facturación contra alternativas standalone (Facturama, Bind, SW Sapien, etc.). El bloque CRM/admin/proyectos se queda en Notion.
   - Si gana **B** (stack OSS completo), el portal Astro + Directus + AnythingLLM cubren admin/proyectos/curaduría. Frappe podría entrar específicamente para facturación, o podría no entrar en absoluto si Frappe Books es suficiente.
   - En ambos escenarios, la decisión sobre Frappe es **post-ventana**, nunca durante.

---

## 7. Recomendación operativa (la única acción que esta nota sugiere para 8.5)

**Anotar Frappe como candidato pendiente en el log de decisiones** (`ioon_8-5-9_stack_log-decisiones_v...md` cuando se cree). Entrada propuesta:

```
2026-05-04 — Candidato técnico identificado: Frappe (Framework + ERPNext + ERPNext Mexico Compliance, opcionalmente Frappe CRM/Books/HR). Cobertura potencial: 1.7 facturación (foco), opcionalmente 1.6 CRM + 1.10 admin + 1.12 proyectos.
Estado: en espera. NO abrir evaluación durante la ventana C vs B (8.4.3 v2). Re-evaluar al cierre de la ventana, con criterios de evaluación específicos según el resultado de C vs B.
Origen: nota informativa ioon_8-5-3_stack_nota-frappe-candidato-erp-evaluacion-postventana_v20260504-1234.md.
Pregunta estratégica acoplada (Frappe Health para clientes hospitalarios): vive en nota gemela ioon_8-4-4_planeacion-tecnica_nota-frappe-implicaciones-marco-y-perfil-cliente_v20260504-1234.md, decisión fuera de 8.5.
```

**No alterar la cola de fichas individuales.** El siguiente ítem sigue siendo Notion.

---

## 8. Datos pre-armados para la ficha individual futura

Cuando se abra la ficha `ioon_8-5-X_stack_frappe_v...md`, esta nota le entrega:

- Identificación de productos (§2.1).
- Requisitos técnicos de despliegue (§2.2).
- Estado actual del módulo de compliance México con su gap de retenciones (§2.3).
- Mapa de cobertura por categoría (§3).
- Lectura completa contra criterios del Punto 3 y restricciones del Punto 6 (§4 y §5).
- Conflictos con la fase C que justifican posposición (§6).
- Decisión arquitectónica pendiente: all-in-one (Frappe ERPNext) vs piezas-best-of-breed (Notion + PAC standalone, o stack B + PAC standalone). Debe declararse explícitamente al evaluar porque escapa al Punto 3 vigente.

Pendientes técnicos que la ficha individual deberá levantar:

1. **Volumen real de operación de ioon** (clientes activos, facturas/mes, líneas de propuestas) — para validar si ERPNext es proporcional o desproporcionado al tamaño actual.
2. **Costo del PAC** preferido para CFDI (si ya está decidido un PAC, viaja a esta evaluación; si no, se evalúa aparte).
3. **Costo del upgrade del VPS** si ERPNext entra en producción (CX42 vs CX52 según carga combinada).
4. **Roadmap de migración** desde el front operativo vigente al cierre de la ventana (depende del resultado de C vs B).

---

## 9. Fuentes

- frappe.io — sitio principal (acceso bloqueado en fetch directo durante la sesión que generó la nota).
- GitHub `frappe/erpnext`.
- DevDiligent, *ERPNext Deep Dive 2026*.
- Frappe Blog, *Self-hosting Frappe/ERPNext Apps with Dokploy*.
- Frappe Cloud Marketplace — *ERPNext Mexico Compliance*.
- GitHub `TI-Sin-Problemas/erpnext_mexico_compliance`.
- frappe.io/erpnext/for-healthcare.
- frappehealth.com/docs.
- Wikipedia, *ERPNext*.

---

*Nota informativa generada el 4 de mayo de 2026 desde el chat 8.5 stack. No modifica el inventario maestro vigente (v2029) ni la cola de fichas individuales acordada. La acción única que sugiere es registrar el candidato en el log de decisiones cuando se cree.*
