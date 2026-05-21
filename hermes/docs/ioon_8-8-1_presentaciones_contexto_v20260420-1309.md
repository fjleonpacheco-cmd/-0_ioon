---
proyecto: 8. ioon
subtema: 8.8 presentaciones
version: v20260420-1309
autor: Francisco Javier León Pacheco
nivel: subtema
proposito: mensaje-contexto inicial para el sub-chat 8.8 presentaciones
depende_de:
  - fjlp_1-1_contexto-general-francisco (contexto personal)
  - fjlp_1-2-1_organizacion-de-archivos_contexto_v20260420-1248 (convención de nombres)
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255 (chat maestro de ioon)
---

# Sub-chat 8.8 — presentaciones (ioon)

Este mensaje inaugura el sub-chat dedicado a **8.8 presentaciones** dentro del proyecto **ioon**. Hereda del chat maestro de ioon y de la convención de nombres de fjlp 1.2.

### 1. Contexto heredado (resumen)

- Soy Francisco Javier León Pacheco (Oaxaca, México). Diseñador gráfico y fotógrafo. Perfil completo en **fjlp 1.1**.
- Sigo la convención de nombres unificada de **fjlp 1.2**.
- Este sub-chat vive dentro de **ioon 8_ioon** (chat maestro del proyecto).

### 2. Qué es este sub-chat

- **Ruta:** 8.8.
- **Nivel:** subtema.
- **Alcance:** todo lo relacionado con el sistema de presentaciones de ioon — plantillas de diapositivas, librerías de slides reutilizables, lineamientos de diseño y tono para decks, y los decks transversales de la marca (pitch, institucional, comercial).
- **Objetivo:** construir y mantener un sistema de presentaciones coherente, replicable y alineado con la identidad visual de ioon (8.10), para que cada deck nuevo parta de bloques sólidos en vez de hojas en blanco.
- **Entregables esperados:**
  - Plantilla base `.pptx` / `.key` con cubierta, secciones, cierre.
  - Librería de slides tipo (problema, solución, mercado, equipo, stack, casos, pricing, contacto).
  - Lineamientos de uso: tipografías, paleta, grids, tono verbal.
  - Decks maestros (pitch, institucional, comercial) como referencia.

### 3. Convención de nombres

Aplica la convención unificada. Para archivos de este sub-chat:

- Ruta fija: `8-8-<índice>` (el índice arranca en 1 dentro de la carpeta).
- Contenedor: `presentaciones`.
- Tema: descriptivo kebab del contenido; puede llevar sufijo de serie.

**Ejemplos válidos en este sub-chat:**

- `ioon_8-8-2_presentaciones_plantilla-base_v20260420-1500.pptx`
- `ioon_8-8-3_presentaciones_libreria-slides_v20260421-1000.pptx`
- `ioon_8-8-4_presentaciones_lineamientos-uso_v20260422-0930.pdf`
- `ioon_8-8-5_presentaciones_deck-pitch_v20260425-1600.pptx`

### 4. Alcance del sub-chat — qué sí / qué no

**Sí trato aquí:**

- Arquitectura del sistema de presentaciones de ioon.
- Plantillas, librerías, lineamientos, decks transversales.
- Decisiones de diseño para presentaciones (layout, tipografía, uso de fotos).
- Discusión de qué slides son reutilizables y cuáles son específicas por cliente.

**No trato aquí:**

- Presentaciones para clientes específicos → van al sub-chat del cliente (ej.: 8.14.2.5 para la presentación 5 de serclin).
- Identidad visual general de ioon → va a **8.10 identidad-visual**; aquí solo se aplica.
- Tono de voz y copy general → va a **8.9 tono-de-voz-y-copy**; aquí se aplica.
- Decisiones transversales del proyecto → van al chat maestro **ioon 8_ioon**.

### 5. Cómo quiero que me ayudes

- Mantén el foco estrecho en 8.8.
- Nombra los archivos que generes siguiendo la sección 3.
- Antes de tareas largas, confirma alcance y formato esperado (cantidad de slides, aspecto 16:9 vs 4:3, editable vs entregable, etc.).
- Si un tema requiere decisiones que dependen de 8.9, 8.10 o 8.12 (universo de marca), anota la decisión como **supuesto** y márcalo para validar en el chat correspondiente.
- Al final de cada entregable, genera un breve resumen de decisiones tomadas y pendientes.

### 6. Ciclo de vida del sub-chat

- **Abierto** mientras haya trabajo activo en el sistema de presentaciones.
- **Congelado** si pasan >30 días sin actividad.
- **Archivado** cuando el sistema esté estable; el cierre vive en un archivo `ioon_8-8-N_presentaciones_cierre_v<AAAAMMDD-HHMM>.md` con las decisiones clave y el estado final de los entregables.

### 7. Cómo arrancamos

Cuando pegue este mensaje:

1. Confirma lectura y resume en 3 líneas qué entendiste del alcance y objetivo.
2. Pregunta qué ya existe (plantillas previas, decks anteriores, versiones de identidad visual disponibles) antes de proponer estructura nueva.
3. Pregúntame cuál es el primer paso: ¿auditar lo que hay hoy?, ¿diseñar la plantilla base desde cero?, ¿empezar por la librería de slides?, ¿otro?
