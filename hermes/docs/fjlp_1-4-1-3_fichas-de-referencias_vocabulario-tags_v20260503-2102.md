---
proyecto: 1. fjlp
subtema: 1.4 inspiración
sub-subtema: 1.4.1 fichas-de-referencias
version: v20260503-2102
autor: Francisco Javier León Pacheco
nivel: sub-subtema · auxiliar
estado: vivo
proposito: vocabulario controlado de tags para el corpus 1.4.1. Documento vivo — se versiona en cada alta, baja o renombre. Las fichas referencian estos tags por nombre exacto.
depende_de:
  - fjlp_1-4-1-1_fichas-de-referencias_contexto_v20260422-2010 (sistema de cruces §5)
  - fjlp_1-4-1-2_fichas-de-referencias_plantilla-ficha-v1 (plantilla)
---

# Vocabulario controlado de tags

Lista canónica de tags válidos para fichas del corpus 1.4.1. Agrupados por **faceta** (eje de clasificación) para evitar sinónimos sueltos. Antes de usar un tag nuevo: proponerlo aquí, validarlo, y entonces aplicarlo.

## 1. Reglas de uso

- **Singular sobre plural** salvo donde el plural es claramente más natural.
- **kebab-case** siempre (`smooth-scroll`, no `smoothScroll` o `Smooth Scroll`).
- **Sin acentos ni diéresis** (mantenemos ASCII para evitar problemas en archivos / shell).
- **Inglés cuando es término técnico estándar** (`webgl`, `scroll`); **español cuando es concepto cultural/personal** (`anti-fascista`, `oaxaqueño`).
- Si un concepto puede expresarse con ≥2 tags ya existentes, **preferir composición** antes de inventar tag nuevo.

## 2. Facetas

### 2.1 Tipo de práctica / disciplina
| Tag                    | Definición / uso                                          |
|------------------------|------------------------------------------------------------|
| `creative-development` | Práctica de desarrollo web orientada a craft/showcase.    |
| `web-craft`            | Sitios web tratados como objetos de orfebrería.           |
| `devops`               | Práctica de infraestructura/automatización/deploys.       |
| `diseno-editorial`     | Diseño editorial (impreso o digital).                     |
| `fotografia`           | Práctica fotográfica.                                     |
| `tipografia`           | Práctica/disciplina tipográfica.                          |
| `branding`             | Construcción de identidad visual.                         |

### 2.2 Frameworks y tecnologías
| Tag                    | Definición / uso                                          |
|------------------------|------------------------------------------------------------|
| `vue-js`               | Framework Vue.                                            |
| `nuxt`                 | Meta-framework sobre Vue (SSR + hidratación).             |
| `react`                | Framework React.                                          |
| `nextjs`               | Meta-framework sobre React.                               |
| `webgl`                | Renderizado 3D/2D vía WebGL.                              |
| `three-js`             | Librería WebGL Three.js.                                  |
| `displacement`         | Efecto de displacement maps (texturas reactivas).         |
| `custom-scroll-engine` | Motor de scroll propio (no scroll nativo, no librería pública). |
| `wordpress`            | CMS WordPress.                                            |
| `headless`             | Arquitectura headless (CMS desacoplado del frontend).     |

### 2.3 Librerías y utilidades de autor (firma)
Tags reservados para librerías open-source firmadas por el creador de la referencia (útil para detectar autoría técnica).

| Tag           | Definición / uso                                            |
|---------------|--------------------------------------------------------------|
| `smoovy`      | Librería propia de Davide Perozzi (smooth scroll, parallax, WebGL utils). Usar solo cuando el sitio analizado realmente la incluye. |
| `momentum-js` | Librería propia de Davide Perozzi (efecto de momentum/inercia). |
| `aminejs`     | Librería citada por Davide Perozzi en los tags del 2k19. Sin repo público confirmado a la fecha; probablemente módulo interno UNDESIGNED. |

### 2.4 Formato de la pieza
| Tag                  | Definición / uso                                            |
|----------------------|--------------------------------------------------------------|
| `portfolio-personal` | Sitio web de portfolio personal de un creador.              |
| `portfolio-estudio`  | Sitio web de portfolio de estudio/agencia.                  |
| `landing`            | Página única promocional.                                   |
| `editorial-digital`  | Pieza editorial digital (revista/long-read interactivo).    |

### 2.5 Tipografía
| Tag                       | Definición / uso                                              |
|---------------------------|----------------------------------------------------------------|
| `tipografia-display`      | Uso destacado de tipografía display a gran escala.            |
| `outline-display-type`    | Display type usado en contorno (sin relleno).                 |
| `neue-plak-extended`      | Familia tipográfica Neue Plak Extended (Monotype).            |
| `neue-haas-unica`         | Familia tipográfica Neue Haas Unica (Monotype).               |

### 2.6 Recursos formales
| Tag                  | Definición / uso                                              |
|----------------------|----------------------------------------------------------------|
| `cursor-personalizado` | Cursor sustituye al nativo, con identidad y estados propios.   |
| `click-and-hold-gate`  | Gate de entrada que requiere mantener el click pulsado.       |
| `marquee-tags`         | Filas horizontales de etiquetas en scroll continuo.           |
| `micro-interacciones`  | Interacciones pequeñas que recompensan el detalle.            |
| `smooth-scroll`        | Scroll suavizado (engine propio o librería).                  |
| `parallax`             | Efectos de parallax.                                          |
| `transiciones`         | Transiciones cuidadas entre estados/secciones.                |
| `minimalismo`          | Disciplina de "menos elementos".                              |
| `headlines-rotativos`  | Banner con copy que cicla entre frases.                       |

### 2.7 Cromática
| Tag             | Definición / uso                                             |
|-----------------|---------------------------------------------------------------|
| `paleta-crema`  | Fondo cálido off-white (cercano a #F8F1EC ± 5%).              |
| `paleta-negra`  | Fondo oscuro/negro como base.                                 |
| `acento-coral`  | Único color saturado coral/rojo (~#E64A30 ± 10%).             |
| `monocromo`     | Sin color, escala de grises.                                  |

### 2.8 Tono / copy / posicionamiento
| Tag               | Definición / uso                                              |
|-------------------|----------------------------------------------------------------|
| `copy-con-humor`  | Copy del sitio incluye humor seco/meme intencional.            |
| `anti-fascista`   | El autor declara explícitamente postura anti-fascista en la pieza. |

### 2.9 Geografía y contexto biográfico (sobre el autor)
| Tag             | Definición / uso                                              |
|-----------------|----------------------------------------------------------------|
| `alemania`      | Autor con base/origen en Alemania.                             |
| `karlsruhe`     | Autor con base en Karlsruhe específicamente.                   |
| `landau`        | Autor o estudio con base en Landau.                            |
| `half-italian`  | Autor con ascendencia italiana mixta.                          |
| `mexico`        | Autor con base/origen en México.                               |
| `oaxaca`        | Autor con base en Oaxaca específicamente.                      |

### 2.10 Reconocimientos
| Tag             | Definición / uso                                              |
|-----------------|----------------------------------------------------------------|
| `awwwards-sotd` | Site Of The Day en Awwwards.                                  |
| `awwwards-doty` | Developer Of The Year / Developer Site en Awwwards.           |
| `fwa`           | Listado o premiado en The FWA.                                |
| `css-da-sotd`   | Site Of The Day en CSS Design Awards.                         |
| `mindsparkle-sotd` | Site Of The Day en Mindsparkle Mag.                        |

## 3. Tags propuestos (en cuarentena)

Tags sugeridos que aún no han sido validados por uso real. Mover a la sección 2 cuando se aplique en una ficha.

- (vacío por ahora)

## 4. Tags rechazados / fusionados

Para evitar que vuelvan a proponerse:

- (vacío por ahora)

## 5. Bitácora de versiones

- **v20260503-2102** — alta del vocabulario. Semillado por las fichas 1-4-1-5 (Davide Perozzi) y 1-4-1-6 (2k19 portfolio). 39 tags activos en 10 facetas.
