---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260504-1234
autor: Francisco Javier León Pacheco
nivel: nota-informativa
estado: borrador-para-ingerir
proposito: traer al chat 8.4 las implicaciones de evaluar Frappe (Framework + ERPNext + Frappe Health + ERPNext Mexico Compliance) tanto como herramienta interna del stack como, especialmente, como producto/servicio para un nuevo vertical (hospitales y clínicas). Levanta las preguntas que 8.4 necesita resolver — o explícitamente posponer — antes de tocar el marco vigente o de habilitar a 8.5 para evaluar Frappe como pieza del stack.
depende_de:
  - fjlp_1-1_contexto-general-francisco
  - fjlp_1-2-4_organizacion-de-archivos_directriz-nombres_v20260420-1843
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255
  - ioon_8-0-2_ioon_resumen-ejecutivo_v20260420-1324
  - ioon_8-4-1_planeacion-tecnica_contexto_v20260422-1618
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260422-2020 (marco vigente, 15 categorías)
  - ioon_8-4-3_planeacion-tecnica_arquitectura-captura-y-dashboard_v20260422-1951 (modelo C híbrido vigente)
  - ioon_8-5-2_stack_inventario-maestro_v20260422-2029 (inventario vigente)
alimenta_a:
  - ioon 8.4 (eventual revisión del marco si se decide habilitar el vertical)
  - ioon 8.5 stack (cuando 8.4 habilite la evaluación)
  - ioon 8.1 esencia / 8.2 estudio-de-mercado / 8.3 buyer-persona (si se decide explorar el vertical hospitalario formalmente)
  - ioon 8.0 chat maestro (decisión de oferta de servicios cae aquí si no abre sub-chat dedicado)
---

# Nota informativa — Frappe: implicaciones para el marco y el perfil de cliente

Esta nota se ingiere en el chat **8.4 planeación técnica** para registrar que apareció un candidato técnico cuya consideración trasciende el alcance ordinario de 8.5 stack. La decisión de fondo no es "Frappe sí o no como herramienta" — es "qué pregunta de fondo hace Frappe a ioon", y esa pregunta vive en 8.4 (o por encima, en 8.0 / 8.1 / 8.2 / 8.3).

La nota **no propone cambios al marco ni a 8.4.3 v2**. Solo levanta las preguntas y deja registro trazable.

---

## 1. Origen de la consideración

Durante la sesión de trabajo de 8.5 stack del 4 de mayo de 2026, Francisco planteó analizar [https://frappe.io/](https://frappe.io/) "con la intención de incluirlo en mi stack, específicamente para clientes como hospitales por ejemplo".

La frase tiene dos lecturas posibles que el chat 8.5 no puede resolver por sí solo:

- **Lectura A — Frappe como herramienta interna del stack de ioon** (cubrir CRM, facturación, administración, proyectos del propio estudio). Esta lectura cabe en 8.5, sujeta al marco vigente.
- **Lectura B — Frappe como plataforma que ioon implementa para clientes vertical-specific (hospitales)**. Esta lectura **no cabe en 8.5**: implica un nuevo perfil de cliente, posiblemente un nuevo eje de servicio, y toca puntos del marco que 8.5 no puede mover.

La nota viaja a 8.4 porque la lectura B exige decisión arquitectónica/estratégica antes de cualquier movimiento técnico, y porque el Punto 7 del marco lo prevé explícitamente: "Cambio estructural de ioon (nuevo eje de servicio, nuevo perfil de cliente) que la herramienta actual no puede atender" detona política de revisión.

---

## 2. Qué es Frappe (síntesis breve)

- **Frappe Framework** (GPLv3, Python + JavaScript): meta-framework full-stack, meta-data driven. Versión vigente al corte: v16 (enero 2026), con mejoras grandes de performance y UI.
- **Apps oficiales sobre Frappe** (todas OSS, todas self-hostables; Frappe Cloud es la opción SaaS comercial):
  - **ERPNext** — ERP completo: contabilidad, inventario, manufactura, ventas, compras, HR, proyectos.
  - **Frappe CRM** — pieza separada, ligera.
  - **Frappe HR** — recursos humanos.
  - **Frappe Books** — contabilidad ligera para freelancers/PYMES.
  - **Frappe Health** — sistema de información hospitalaria (HIS) basado en HL7 FHIR. Cubre paciente, EMR, agenda, hospitalización, laboratorio, farmacia, billing. Mencionan compatibilidad con HIPAA. Integrable con ERPNext.
- **Comunidad mexicana — `ERPNext Mexico Compliance`** (proyecto comunitario `TI-Sin-Problemas` en GitHub): CFDI 4.0, complemento de pago, cancelaciones, PAC integrable. Última release v0.12.3 (feb 2026), 729 commits, 0 issues abiertos. Comunidad pequeña (14 estrellas, 11 forks). Soporta ERPNext v15. **Sin evidencia de complemento de retención** — gap relevante para Persona Física con Actividad Empresarial.
- **Stack interno de despliegue:** MariaDB + Redis + Node.js + Python. Pesado: una instancia productiva ERPNext típicamente requiere ≥ 4 GB RAM dedicados.

---

## 3. Lo que Frappe ya cumple del marco vigente

Independientemente de la lectura A o B:

- **Punto 0c (soberanía / OSS-first):** ✓ GPLv3, self-hostable.
- **Punto 6 infraestructura:** ✓ desplegable sobre Coolify (con consideración de RAM — ver §5).
- **Punto 6 hardware:** ✓ es servicio web; el cliente macOS lo accede vía navegador.
- **Punto 6 idioma:** ✓ ERPNext y Frappe Health tienen traducción a español; documentación principal en inglés (aceptable para internas).
- **Punto 2.16 (categoría 1.15):** no aplica directamente — Frappe no es infraestructura/orquestación/automatización; es app sobre infraestructura.

---

## 4. Las dos lecturas y sus implicaciones distintas

### 4.1 Lectura A — Frappe interno (decide 8.5, no 8.4)

Si la consideración es exclusivamente interna, **8.4 no necesita actuar**. La evaluación cabe en 8.5 bajo el marco vigente. Los detalles técnicos viajan en la nota gemela `ioon_8-5-3_stack_nota-frappe-candidato-erp-evaluacion-postventana_v20260504-1234.md`. Resumen para 8.4: la recomendación operativa de esa nota es **anotar Frappe como candidato a evaluar post-ventana C vs B** (8.4.3 v2), sin alterar la cola de fichas individuales acordada.

Si esta es la única lectura, esta nota a 8.4 puede archivarse como "leído, sin acción".

### 4.2 Lectura B — Frappe como servicio para clientes (sí decide 8.4 / 8.0)

Aquí están las implicaciones que 8.4 debe ponderar — o levantar al chat correspondiente.

**4.2.1 Perfil de cliente.** El resumen ejecutivo 8.0.2 declara dos ICPs: (1) Fundador Creativo Desbordado, (2) Empresa Familiar en Transición. El marco 8.4.2 v2020 (Anexo B, supuesto declarado) lo refina a "fotógrafos, arquitectos, diseñadores, artistas — alfabetización visual alta". Esta refinación es posterior al ICP base de 8.0.2.

Hospitales y clínicas:

- No encajan en (1) Fundador Creativo.
- Pueden encajar en (2) Empresa Familiar en Transición **solo si** la clínica/hospital es de tipo familiar y está en transición operativa/digital. Hospitales grandes claramente no.
- No encajan en la refinación del marco ("alfabetización visual alta").

Existe un dato relevante en el resumen ejecutivo: el cliente **Serclin** (8.14.2) tiene 4 presentaciones publicadas. Si Serclin es del sector salud (el nombre lo sugiere), el contacto con el vertical clínico **ya existe** en la operación real, aunque no esté formalizado como eje de servicio. Esto convierte la pregunta de 4.2 en algo menos hipotético y más en una **formalización de algo que ya está pasando**.

**4.2.2 Naturaleza del eje de servicio.** "Implementar plataforma de información hospitalaria" no es lo mismo que "diseño + fotografía + motion + presentaciones + websites" que ioon hace hoy. Es **integración de software de misión crítica**. Implica:

- Soporte continuo (los hospitales son operación 24/7; los datos clínicos son críticos).
- Compliance regulatorio. En México: NOM-024-SSA3 (intercambio de información clínica), Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados / privados según naturaleza del cliente, posibles requerimientos COFEPRIS según el tipo de servicio del hospital.
- Capacitación de personal del cliente.
- Mantenimiento continuo de la plataforma (parches, upgrades, migraciones de versión de Frappe/ERPNext).
- Capacidad de migración de datos desde sistemas previos (HIS legacy, expedientes en papel, etc.).

Nota: este eje es **compatible con la fórmula rectora** "Innovación = Invención + Implementación" del 8.0.2 — no la rompe. Pero amplifica el lado "Implementación" hacia un terreno técnico/regulatorio distinto.

**4.2.3 Capacidad operativa.** El Punto 6 del marco fija "1 persona. Francisco. El stack debe operar sin administrador dedicado". Esa restricción aplica al **stack interno**. Para un servicio externo a hospitales:

- Un solo cliente hospitalario implementado y operado por una sola persona es operativamente sostenible solo en escala muy reducida (clínica pequeña, no hospital).
- Multiplicarlo a varios clientes requiere ya sea (a) socios técnicos / aliados / contractors, (b) restringir el alcance del servicio (ej.: solo implementación inicial sin soporte continuo), o (c) cambiar el modelo de capacidad de ioon.

**4.2.4 Identidad visual cara al cliente.** Las directrices vigentes (resumen ejecutivo 8.0.2 §3) son estrictas: blanco/negro, light weight, editorial. "Inspiración: portafolios de arquitectura y galerías de arte, **no** dashboards SaaS". ERPNext y Frappe Health tienen UX de ERP corporativo — funcional pero no minimalista. Cuando el cliente final del cliente (paciente, médico, administrativo del hospital) interactúa con la plataforma, está interactuando con un default visual que no es la línea de ioon. Customizar la UX de Frappe es posible pero significativo.

**4.2.5 Posicionamiento de marca.** El 8.0.2 declara: ioon es "consultoría en innovación", "Guardianes de la Evolución", "Innovación-as-a-Service". Sumar "implementación de HIS para hospitales" **redefine de hecho parcialmente** ese posicionamiento. La pregunta no es solo si encaja la herramienta — es si encaja el servicio en la marca.

---

## 5. Lo que 8.4 (o el chat correspondiente) podría tener que decidir

Si la lectura B se toma en serio, las preguntas a cerrar — en orden — son:

1. **¿ioon entra al vertical de implementación de plataformas vertical-specific (hospitales y/o otros) como nuevo eje de servicio?** Esta pregunta vive **fuera de 8.4 técnica**. Lo más natural: 8.0 chat maestro (decisión de oferta de servicios) o un sub-chat dedicado a "modelo de negocio / oferta" si se decide abrirlo. Posibles destinos también: 8.1 esencia (si toca la definición de qué es ioon) o 8.2 estudio-de-mercado (si arranca como exploración del vertical).

2. **¿Serclin formaliza el perfil de cliente sector salud?** Independiente de la decisión 1. Si Serclin es del sector salud y ya está operando, conviene levantar 8.3 buyer-persona / 8.14.2 para confirmar y documentar.

3. **Solo si 1 = sí:** ¿el alcance del nuevo eje es "implementación inicial" (proyecto único), "implementación + soporte" (retainer), o "consultoría que ayuda al cliente a operar su HIS" (sin que ioon sea operador)? Cada alcance tiene capacidad operativa distinta, requiere stack distinto, y toca el marco distinto.

4. **Solo si 1 = sí y se valida una herramienta:** ¿es Frappe Health la elegida o se evalúa contra alternativas (OpenEMR, Bahmni, OpenMRS, otros HIS OSS)? Esa evaluación específica vive en un sub-chat del eje de servicio nuevo, no en 8.5 stack — porque las herramientas que ioon **vende/implementa** a clientes son cosa distinta de las herramientas del stack interno.

5. **Solo si 1 = sí:** ¿el marco 8.4 necesita ampliarse para cubrir herramientas-producto (las que ioon implementa para clientes) además de herramientas-stack (las que ioon usa para sí mismo)? Hoy el marco solo cubre stack interno.

---

## 6. Implicación de NO decidir en 8.4 (status quo)

Si 8.4 — o quien deba decidir — opta por no abrir esta conversación todavía, el status quo es:

- Frappe queda como candidato interno (lectura A) anotado en el log de decisiones de 8.5, evaluable post-ventana C vs B.
- La pregunta de "hospitales como vertical" queda como **pendiente declarado** que se levantará explícitamente cuando alguno de estos eventos ocurra:
  - Aparezca un prospecto hospital/clínica concreto que requiera propuesta.
  - Se confirme que Serclin es sector salud y se quiera profundizar la relación.
  - Se decida formalmente activar 8.1, 8.2 o 8.3 (los tres están en estado "pendiente" según 8.0.2).
- 8.5 sigue su cola de fichas individuales acordada (Notion → n8n → contraseñas → AnythingLLM → portal Astro → backups → facturación → correo → storage → entrega → CRM+proyectos → Penpot) sin alteración.

Esta opción es **plenamente legítima**. La pregunta no es urgente operativamente; lo urgente es haberla registrado y trazado.

---

## 7. Resumen ejecutivo de la nota

- Frappe + ERPNext + Frappe Health + Mexico Compliance es un candidato técnico válido bajo OSS-first.
- Como **herramienta interna**, evaluable en 8.5 sin tocar 8.4. Recomendación operativa de la nota gemela: posponer a post-ventana C vs B.
- Como **producto/servicio para clientes** (lectura del enunciado original con "hospitales"), abre preguntas estructurales que 8.4 técnica no decide: nuevo eje de servicio, nuevo perfil de cliente, capacidad operativa, identidad visual cara al cliente final, posicionamiento de marca. La decisión de fondo vive en 8.0 / 8.1 / 8.2 / 8.3 o en un sub-chat nuevo de oferta de servicios.
- Hay un dato real que vuelve la pregunta no-hipotética: el cliente **Serclin** (sospecha de sector salud según el nombre, a confirmar) ya opera con ioon. Si se confirma, formaliza el contacto con el vertical.
- 8.4 puede legítimamente **no actuar** y dejar la pregunta como pendiente declarado.

---

## 8. Fuentes

- frappe.io — sitio principal (acceso bloqueado en fetch directo durante la sesión que generó la nota; información obtenida vía búsqueda y repos).
- GitHub `frappe/erpnext` — código fuente de ERPNext.
- DevDiligent, *ERPNext Deep Dive 2026*.
- Frappe Blog, *Self-hosting Frappe/ERPNext Apps with Dokploy*.
- Frappe Cloud Marketplace — *ERPNext Mexico Compliance*.
- GitHub `TI-Sin-Problemas/erpnext_mexico_compliance` — repo del módulo de compliance México.
- frappe.io/erpnext/for-healthcare — landing del vertical salud.
- frappehealth.com/docs — documentación de Frappe Health.
- Turqosoft, *Frappe Healthcare Modules - A Deep Dive*.
- Wikipedia, *ERPNext*.

---

*Nota informativa generada el 4 de mayo de 2026 desde el chat de 8.5 stack para ingestión en 8.4 planeación técnica. No reabre decisiones cerradas; levanta preguntas que 8.4 (o el chat correspondiente) decide actuar o posponer.*
