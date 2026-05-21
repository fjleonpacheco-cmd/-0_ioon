---
proyecto: 1. fjlp
subtema: 1.4 inspiración
sub-subtema: 1.4.1 fichas-de-referencias
version: v20260503-2102
autor: Francisco Javier León Pacheco
nivel: sub-subtema · auxiliar
estado: vivo
proposito: índice maestro del corpus de fichas de referencias (tabla con ID, tipo, nombre, año, tags, estado). Se versiona con timestamp en cada actualización; no se sobrescribe.
depende_de:
  - fjlp_1-4-1-1_fichas-de-referencias_contexto_v20260422-2010 (contexto del sub-sub-chat)
  - fjlp_1-4-1-2_fichas-de-referencias_plantilla-ficha-v1 (plantilla)
  - fjlp_1-4-1-3_fichas-de-referencias_vocabulario-tags (vocabulario controlado)
---

# Índice maestro — fichas-de-referencias

Listado canónico de todas las entradas del corpus 1.4.1. Cada fila apunta a un archivo independiente. Las vistas cruzadas (por tag, medio, recurso formal, emoción) referencian IDs desde aquí, no duplican contenido.

## Tabla — fichas

| ID       | Tipo    | Nombre                          | Año           | Estado     | Archivo                                                                                                            |
|----------|---------|---------------------------------|---------------|------------|--------------------------------------------------------------------------------------------------------------------|
| 1-4-1-5  | artista | Davide Perozzi                  | 2017– [por verif.] | revisada   | fjlp_1-4-1-5_fichas-de-referencias_ficha-artista-davide-perozzi_v20260503-2102.md                                  |
| 1-4-1-6  | website | 2k19 — Portfolio Davide Perozzi | 2019          | revisada   | fjlp_1-4-1-6_fichas-de-referencias_ficha-website-davide-perozzi-2k19_v20260503-2102.md                             |

## Tabla — auxiliares del sistema

| ID       | Tipo       | Nombre                          | Estado       | Archivo                                                                                              |
|----------|------------|---------------------------------|--------------|------------------------------------------------------------------------------------------------------|
| 1-4-1-2  | plantilla  | plantilla-ficha-v1              | consolidada  | fjlp_1-4-1-2_fichas-de-referencias_plantilla-ficha-v1_v20260503-2102.md                              |
| 1-4-1-3  | vocab      | vocabulario-tags (39 tags · 10 facetas) | vivo  | fjlp_1-4-1-3_fichas-de-referencias_vocabulario-tags_v20260503-2102.md                                |
| 1-4-1-4  | índice     | indice-maestro                  | vivo         | fjlp_1-4-1-4_fichas-de-referencias_indice-maestro_v20260503-2102.md                                  |
| 1-4-1-7  | captura    | perozzi.studio 404 page         | archivada    | fjlp_1-4-1-7_fichas-de-referencias_captura-perozzi-studio-404_v20260503-2102.jpg                     |

## Conexiones cruzadas (espejo)

- 1-4-1-5 ↔ 1-4-1-6 (artista ↔ pieza concreta del artista).
- 1-4-1-6 → 1-4-1-7 (la captura del 404 sostiene el argumento de "el 2k19 es la cara presente").

## Estado del andamiaje del sub-subtema

✅ Contexto · 1-4-1-1
✅ Plantilla v1 · 1-4-1-2
✅ Vocabulario de tags · 1-4-1-3
✅ Índice maestro · 1-4-1-4
✅ Primera ficha (artista) · 1-4-1-5
✅ Segunda ficha (website) · 1-4-1-6
✅ Primera captura adjunta · 1-4-1-7

El sistema está completo y operativo para nuevas fichas.

## Bitácora de versiones

- **v20260503-1343** — alta del índice. Primera entrada: 1-4-1-5 (Davide Perozzi, draft).
- **v20260503-1347** — verificación con fuentes externas (Awwwards, GitHub, UNDESIGNED). 1-4-1-5 a `revisada`. Alta de 1-4-1-6 (ficha-website 2k19, draft).
- **v20260503-1406** — verificación visual directa del 2k19 vía Claude in Chrome. 1-4-1-6 a `revisada`. 1-4-1-5 actualizada con datos auto-declarados por Davide. Tags semilla expandidos.
- **v20260503-2102** — sesión con computer use + html2canvas. Hallazgo: `perozzi.studio/` y `davideperozzi.com/` están en **404**; el 2k19 es de hecho su sitio personal vigente. Hallazgo: `aminejs` no existe como repo público suyo (probable módulo interno). Captura del 404 archivada como 1-4-1-7. Se cierra el andamiaje con plantilla 1-4-1-2 y vocabulario 1-4-1-3 (39 tags, 10 facetas). Fichas 1-4-1-5 y 1-4-1-6 actualizadas con esos hallazgos.
