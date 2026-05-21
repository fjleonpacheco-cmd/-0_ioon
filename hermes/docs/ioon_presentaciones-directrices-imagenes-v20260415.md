# ioon.mx — Directrices de imágenes para presentaciones (v20260415)

> Referencia de tamaños, proporciones y formatos para todas las imágenes del sistema de presentaciones.

---

## 1. Contexto de renderizado

- **Contenedor máximo del slide:** 900px de ancho
- **Padding del stage (desktop):** 40px arriba, 80px lados, 60px abajo
- **Padding del stage (móvil ≤768px):** 30px arriba, 24px lados, 60px abajo
- **Ancho efectivo del contenido (desktop):** ~900px (limitado por `max-width`)
- **Ancho efectivo del contenido (móvil):** ~720px (768 − 48px de padding)
- **Pantallas objetivo:** Retina/HiDPI (2×), algunos displays 3×

---

## 2. Tamaños por layout

### `a` — Una imagen 4:3, ancho completo

| | Display (1×) | Retina (2×) | Retina (3×) |
|--|--|--|--|
| **Ancho** | 900px | 1800px | 2700px |
| **Alto** | 675px | 1350px | 2025px |
| **Aspecto** | 4:3 | 4:3 | 4:3 |

**Recomendado: 1800 × 1350 px** (2× es suficiente para la mayoría de pantallas)

---

### `wide` — Una imagen 16:9, ancho completo

| | Display (1×) | Retina (2×) | Retina (3×) |
|--|--|--|--|
| **Ancho** | 900px | 1800px | 2700px |
| **Alto** | 506px | 1012px | 1519px |
| **Aspecto** | 16:9 | 16:9 | 16:9 |

**Recomendado: 1800 × 1012 px**

---

### `2x` — Dos imágenes 4:3 lado a lado

Gap entre imágenes: 10px → cada imagen ocupa (900 − 10) / 2 = 445px

| | Display (1×) | Retina (2×) | Retina (3×) |
|--|--|--|--|
| **Ancho** | 445px | 890px | 1335px |
| **Alto** | 334px | 668px | 1001px |
| **Aspecto** | 4:3 | 4:3 | 4:3 |

**Recomendado: 890 × 668 px** por imagen (2 imágenes iguales)

---

### `1of2` — Una imagen 4:3 al 50% del ancho

Ocupa la mitad del contenedor: 450px

| | Display (1×) | Retina (2×) | Retina (3×) |
|--|--|--|--|
| **Ancho** | 450px | 900px | 1350px |
| **Alto** | 338px | 675px | 1013px |
| **Aspecto** | 4:3 | 4:3 | 4:3 |

**Recomendado: 900 × 675 px**

---

### `4p` — Cuatro imágenes 3:4 en fila

Gap entre imágenes: 8px (3 gaps) → cada imagen ocupa (900 − 24) / 4 = 219px

| | Display (1×) | Retina (2×) | Retina (3×) |
|--|--|--|--|
| **Ancho** | 219px | 438px | 657px |
| **Alto** | 292px | 584px | 876px |
| **Aspecto** | 3:4 | 3:4 | 3:4 |

**Recomendado: 438 × 584 px** por imagen (4 imágenes iguales)

En móvil se reorganiza en grid 2×2, donde cada imagen mide ~356px de ancho → retina 2× = 712px. Con el tamaño recomendado de 438px ya cubre bien.

---

## 3. Galería (overlay)

La imagen principal de la galería ocupa 80% del viewport (max 900px), aspect-ratio 4:3.

| | Display (1×) | Retina (2×) |
|--|--|--|
| **Ancho** | 900px | 1800px |
| **Alto** | 675px | 1350px |
| **Aspecto** | 4:3 | 4:3 |

**Recomendado para portadas de galería: 1800 × 1350 px**
**Recomendado para verticales de galería: 1800 × 1350 px** (mismo tamaño, se muestran al mismo tamaño)

---

## 4. Tabla resumen

| Layout | Aspecto | Cantidad | Recomendado (px) | Peso aprox. |
|--------|---------|----------|------------------|-------------|
| `a` | 4:3 | 1 | **1800 × 1350** | 200-400 KB |
| `wide` | 16:9 | 1 | **1800 × 1012** | 150-300 KB |
| `2x` | 4:3 | 2 | **890 × 668** c/u | 80-150 KB c/u |
| `1of2` | 4:3 | 1 | **900 × 675** | 80-150 KB |
| `4p` | 3:4 | 4 | **438 × 584** c/u | 50-100 KB c/u |
| Galería | 4:3 | n | **1800 × 1350** | 200-400 KB |

---

## 5. Formato y compresión

- **Formato preferido:** JPEG (.jpg) para fotografías, PNG para gráficos con transparencia
- **Calidad JPEG:** 80-85% (equilibrio calidad/peso)
- **Nombrar con la convención:** `SS-SL-TT-descripcion-letra.jpg`
- **Sin transparencia:** Usar JPEG siempre que sea posible (más ligero)
- **Con transparencia:** PNG solo cuando sea estrictamente necesario (logos sobre fondos variables)

---

## 6. Reglas de renderizado

- Todas las imágenes se renderizan con `object-contain` — nunca se recortan, se ajustan al espacio disponible
- Fondo del placeholder: `#e4e4e7` (border) — visible si la imagen no llena el aspect-ratio
- Border-radius: 4px en diapositivas, 6px en galería
- Las imágenes se colocan **entre el heading y el body/bullets** en el orden visual del slide

---

## 7. Fuentes de imágenes

| Fuente | Formato en config.json | Ejemplo |
|--------|----------------------|---------|
| **Locales** | Solo nombre de archivo | `"foto.jpg"` |
| **URLs externas** | URL completa | `"https://images.unsplash.com/photo-xxx?w=1200&q=80"` |
| **Capturas web** | API de WordPress mshots | `"https://s.wordpress.com/mshots/v1/https://sitio.com?w=800"` |

Las imágenes locales van en: `public/presentaciones/<slug>/`

---

## 8. Checklist antes de exportar imágenes

1. Verificar que el aspecto coincide con el layout asignado (4:3, 16:9 o 3:4)
2. Exportar al tamaño retina 2× de la tabla (sección 4)
3. Comprimir a JPEG 80-85%
4. Nombrar con la convención `SS-SL-TT-descripcion-letra.jpg`
5. Para galerías, las verticales usan sufijo `-g1.jpg`, `-g2.jpg`, etc.
6. Colocar en `public/presentaciones/<slug>/`
