---
proyecto: 1. fjlp
subtema: 1.4 inspiración
sub-subtema: 1.4.1 fichas-de-referencias
version: v20260503-2102
autor: Francisco Javier León Pacheco
nivel: sub-subtema · auxiliar
estado: consolidada
proposito: plantilla canónica de las fichas del corpus 1.4.1. Documento vivo — se versiona cuando se agrega un campo nuevo, se renombra uno, o se ajusta la guía de uso. Las fichas nuevas se generan a partir de este archivo, no copiando de fichas existentes.
depende_de:
  - fjlp_1-4-1-1_fichas-de-referencias_contexto_v20260422-2010 (§4 anatomía de una ficha)
  - fjlp_1-4-1-3_fichas-de-referencias_vocabulario-tags (tags válidos por faceta)
alimenta_a:
  - todas las fichas del corpus 1.4.1 (1-4-1-5, 1-4-1-6, futuras)
---

# Plantilla de ficha · v1

Plantilla base para cualquier ficha del corpus **1.4.1 fichas-de-referencias**. Cada ficha es un archivo `.md` independiente con esta estructura. Las plantillas específicas por tipo (canción, libro, imagen…) heredan esta base y pueden ajustar qué elementos de "análisis técnico" cobran peso.

## 1. Cómo usar esta plantilla

1. **Copiar el bloque de §2 ("Esqueleto base")** a un archivo nuevo.
2. **Llenar el frontmatter** con datos verificables. Lo que no se pueda verificar, marcar con `[por verificar]`.
3. **Aplicar el flujo §7.1 del contexto 1-4-1-1** (entrada → pre-vuelo → análisis → tags → nota personal → archivo → registro).
4. **Validar tags contra `fjlp_1-4-1-3_vocabulario-tags`** antes de aplicarlos. Si hace falta un tag nuevo, proponerlo allá primero.
5. **Crear conexiones espejo:** si esta ficha apunta a otra (A→B), actualizar también la otra para que apunte de vuelta (B→A).
6. **Registrar en el índice maestro** (`fjlp_1-4-1-4`) con nueva versión-timestamp.

## 2. Esqueleto base

```markdown
---
id: 1-4-1-X
tipo: [persona | artista | libro | canción | álbum | website | imagen | película | concepto | otro]
nombre:
autor:
año:
medio:
fuente:
tags: [tag1, tag2, tag3]
conexiones: [1-4-1-Y, 1-4-1-Z]
estado: [draft | revisada | consolidada]
version: v<AAAAMMDD>-<HHMM>
---

# [Tipo] — [Nombre]

## Síntesis (1-2 líneas)

## Datos mínimos
- Autor / creador:
- Año / época:
- Medio / formato:
- Fuente / URL:
- Contexto original:

## Análisis semántico
- Temas:
- Mensaje o idea central:
- Emociones / atmósfera:
- Contexto histórico o cultural:
- Referencias internas (a qué otras obras o ideas remite):

## Análisis técnico
- Medios / materiales / tecnologías:
- Estructura / composición:
- Recursos formales destacados (tipografía, color, ritmo, textura, encuadre, edición, cadencia, armonía, estructura narrativa — según aplique):
- Decisiones distintivas:
- Influencias formales visibles:

## Por qué me inspira (nota personal)

## Conexiones con otras fichas
- [ficha-id]: por [razón del cruce]

## Aplicabilidad
- En qué proyecto(s) propios podría resonar:
- Qué tomar específicamente:

## Notas abiertas / preguntas por resolver
```

## 3. Frontmatter — guía campo por campo

### `id`
Identificador único. Mismo número que el `<índice>` del archivo. Formato `1-4-1-X` donde X es el índice asignado por el índice maestro al darse de alta. Nunca cambia una vez asignado.

### `tipo`
Elegir uno de la lista cerrada. Si la referencia no encaja en ninguno, usar `otro` y dejar nota en "Síntesis" sobre qué tipo de pieza es. **No** inventar tipos nuevos sin discutirlo primero — agregar tipo nuevo es cambio de plantilla, no de ficha.

### `nombre`
Título canónico de la pieza. Para personas/artistas, nombre completo como aparece en su propio sitio. Para obras, título original (si lleva traducción, dejar título original y aclarar en "Datos mínimos").

### `autor`
Quien firma la pieza. Para personas/artistas, en blanco (la ficha es del autor mismo). Para obras, autor o autores. Si hay diseñador + developer separados (caso website), poner ambos con paréntesis aclarando rol.

### `año`
Año o rango. Si no se conoce con certeza, agregar `[por verificar]`. Para piezas con historia larga (sitio mantenido, libro reeditado), aclarar en "Datos mínimos".

### `medio`
Soporte físico/digital de la pieza. Ej.: `creative development / web`, `libro impreso`, `álbum vinilo + streaming`, `fotografía digital`, etc.

### `fuente`
URL canónica de **anclaje** (la pieza principal). URLs secundarias van en "Datos mínimos / Fuentes". Si la pieza no tiene URL (objeto físico), poner la mejor referencia disponible (ISBN, museo, archivo).

### `tags`
Lista de tags del vocabulario controlado (`fjlp_1-4-1-3`). Mínimo 3, máximo ~15. Cubrir al menos: tipo de práctica, tecnología/medio, recursos formales, geografía. **Validar cada tag contra el vocabulario antes de aplicarlo.**

### `conexiones`
IDs de otras fichas con las que cruza. Las conexiones son **bidireccionales**: al crear una conexión nueva, actualizar también la otra ficha. Si todavía no hay corpus suficiente, dejar `[]`.

### `estado`
Ciclo de vida de la ficha:
- `draft` — recién creada, faltan verificaciones o nota personal.
- `revisada` — completa, con todos los bloques no-negociables llenados, verificaciones cerradas.
- `consolidada` — revisión profunda hecha, cero `[por verificar]`, conexiones cruzadas confirmadas, citable como referencia estable.

### `version`
Timestamp `v<AAAAMMDD>-<HHMM>`. Cada cambio sustantivo (corrección importante o sección nueva) genera versión nueva. Cambios menores (typos) no se versionan. Las versiones anteriores **no se sobrescriben** — quedan como histórico.

## 4. Cuerpo — guía bloque por bloque

### Síntesis (1-2 líneas)
La pieza en una frase. Si no logras condensar en dos líneas, la ficha no está madura todavía.

### Datos mínimos
Hechos verificables. Si algo no se puede verificar, marcarlo `[por verificar]` — **no inventar fechas ni atribuciones**. Si hay varias URLs (sitio principal, perfiles secundarios, casos de estudio), listarlas todas con su función.

### Análisis semántico
Qué dice la pieza, qué emociones evoca, en qué contexto se inscribe, a qué dialoga. Resistir el impresionismo vago ("es muy evocador") — cada bullet debe tener un sujeto concreto.

### Análisis técnico
Cómo está hecha la pieza. Para websites: stack, framework, librerías, fuentes tipográficas, paleta exacta, recursos formales (cursor, transiciones, displacement). Para libros: papel, encuadernación, tipografía, retícula. Para canciones: instrumentación, producción, mezcla, estructura. Cita detalles verificables.

### Por qué me inspira (nota personal)
**Bloque no-negociable.** Una frase mía, en mi voz. Sin reescribir, sin pulir. La razón concreta por la que la pieza me movió. Si la ficha no tiene esto, no cumple.

### Conexiones con otras fichas
Lista de cruces con su razón. Mínimo 1 cuando ya exista corpus. Cada conexión tiene espejo en la ficha referenciada.

### Aplicabilidad
**Bloque no-negociable.** Dos cosas:
1. ¿En qué proyecto(s) propios podría resonar? (Lista corta, concreta.)
2. ¿Qué tomar específicamente? (Patrón formal, decisión técnica, postura conceptual — no toda la pieza.)

### Notas abiertas / preguntas por resolver
Lo que quedó pendiente: verificaciones, capturas, conexiones por explorar, ideas a retomar. Documenta la deuda explícita.

## 5. Criterios de calidad (lista de aceptación)

Una ficha cumple cuando:

- ✓ Es **concreta** — cita detalles verificables, no impresionismo.
- ✓ Es **equilibrada** — análisis semántico y técnico en dosis parejas.
- ✓ Está **conectada** — al menos 1 conexión o tag compartido con otras fichas, cuando ya hay corpus.
- ✓ Es **honesta** — lo que no se sabe, se marca `[por verificar]`. No invención.
- ✓ Es **útil** — los bloques "Por qué me inspira" y "Aplicabilidad" están llenos. Sin ellos la ficha no cumple.
- ✓ Es **compacta** — 2 a 3 pantallas. Si crece más, partir en sub-fichas o vistas.

## 6. Variaciones por tipo (esquemas heredados)

Plantillas específicas por tipo que extienden la base. **Por ahora viven como notas en este mismo archivo**; cuando una variación tenga 3+ usos repetidos, se promueve a archivo propio (`plantilla-ficha-<tipo>-v1`).

### 6.1 `artista` / `persona`
- Datos mínimos enfatizar: roles actuales, estudios/colectivos, base geográfica, perfiles en plataformas, postura pública declarada si aplica.
- Análisis técnico enfatizar: librerías propias, patrones de trabajo recurrentes, decisiones-firma.

### 6.2 `website`
- Datos mínimos enfatizar: diseño/development separados si aplica, awards/cobertura editorial, estado del dominio (vivo / archivado / 404).
- Análisis técnico enfatizar: stack (framework, librerías, fuentes), paleta exacta con códigos, recursos formales verificables vía DevTools.

### 6.3 `libro` / `álbum`
- Datos mínimos enfatizar: edición, editorial/sello, ISBN/catálogo, formato físico/digital.
- Análisis técnico enfatizar: producción (papel, mezcla), estructura, ritmo, secuencia.

### 6.4 `concepto`
- Datos mínimos enfatizar: dónde aparece nombrado por primera vez, autores asociados, definiciones competidoras.
- Análisis técnico colapsa a "Estructura del argumento" (no aplica medio).

## 7. Bitácora de versiones de la plantilla

- **v20260503-2102** — alta de la plantilla a partir del §4 del contexto 1-4-1-1 y de la estructura aplicada en las fichas 1-4-1-5 (Davide Perozzi artista) y 1-4-1-6 (2k19 portfolio website) como semilla.
