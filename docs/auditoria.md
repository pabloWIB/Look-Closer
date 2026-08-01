# Auditoría inicial — Look-Closer

Fecha: 2026-07-31
Estado de partida: commit `959329b` ("Feat favicon"), rama `main`.
Método: lectura completa de cada archivo + servidor estático local con
resolución **sensible a mayúsculas** (emula Linux/Vercel, no Windows).

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `LOOK CLOSER` | `ANDSIOSA` | Landing editorial de una sola página: wordmark + 3 columnas de texto e imagen | Único HTML del proyecto |

No existía `404.html`.

## 2. Hojas de estilo

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 2.4 KB | Sí | Normalize.css minificado en una línea |
| `CSS/styles.css` | 10.8 KB | Sí | Salida compilada de Sass, con prefijos `-webkit-`/`-ms-` innecesarios en 2026 |
| `CSS/fonts.css` | — | **No existe** | `index.html` lo enlaza en `CSS/`, pero el archivo está en `FONTS/fonts.css` → **404** |
| `FONTS/fonts.css` | 553 B | No | Huérfano. Contiene los `@import` de Google Fonts; al no cargarse, **Montserrat nunca llegaba al sitio** |
| `CSS/styles.scss` | 5.8 KB | N/A | Fuente Sass. Solo usa anidamiento: ni variables, ni mixins, ni funciones |

## 3. JavaScript

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | 315 B | Sí | 11 líneas útiles. Alterna 6 clases `.open` al pulsar la hamburguesa |
| jQuery slim 3.0.0-beta1 (cdnjs) | ~69 KB | Sí | Dependencia externa **en versión beta** cargada para 6 `toggleClass` |

`<script>` sin `defer`: bloquea el parseo del documento.

## 4. Imágenes

| Archivo | Peso | Dimensiones | Formato | ¿Referenciada? |
|---|---|---|---|---|
| `IMG/photo1.jpg` | 816 KB | 858 × 1163 | JPEG | Sí (`alt="Anemone"` — es un coral, no una anémona) |
| `IMG/photo2.jpg` | 664 KB | 805 × 1200 | JPEG | Sí (`alt="Octopus"`) |
| `IMG/photo3.jpg` | 1 735 KB | 1457 × 1600 | JPEG | Sí (`alt="CoralFish"`) |
| `IMG/menu.svg` | 172 B | 48 × 48 | SVG | Sí — **sin `fill`: se pinta negro sobre fondo `#024442`** |
| `IMG/menu_open.svg` | 226 B | 48 × 48 | SVG | Sí — mismo problema |
| `Look-Closer.png` | 203 KB | 1024 × 1024 | PNG | Sí, como favicon. El 53 % del lienzo es transparente |

**Peso total de la primera carga: ≈ 3.4 MB.** Objetivo del estándar: < 1 MB.

## 5. Tipografías

| Archivo | Peso | ¿Se usa? |
|---|---|---|
| `FONTS/y2kregular.ttf` | 39 KB | Sí, pero el `@font-face` pide `Y2KREGULAR.ttf` (mayúsculas) → **404 en Linux** |
| `FONTS/Y2KREGULAR.otf` | 24 KB | No. Mismo tipo en otro formato |
| `FONTS/Y2kslant.ttf` | 40 KB | **No.** Huérfano: ningún `@font-face` lo declara |
| Montserrat (Google Fonts) | — | Declarada en CSS, pero el `@import` vivía en el archivo que daba 404 |

## 6. Otros archivos

| Archivo | Estado |
|---|---|
| `prepros.config` | 23.9 KB de configuración del IDE Prepros. Ruta absoluta de otra máquina, no aporta al sitio |
| `README.md` | Completo y correcto. Documenta 2 de los fallos como "known issues" |

No había `.gitignore`, `robots.txt`, `sitemap.xml` ni `404.html`.
No se encontraron `.bak`, `node_modules`, `.DS_Store`, `Thumbs.db` ni duplicados `_v2`.

---

## 7. Fallos detectados

### Rutas rotas (verificadas con servidor sensible a mayúsculas)

| Referencia | Origen | Diagnóstico |
|---|---|---|
| `CSS/fonts.css` | `index.html:8` | El archivo está en `FONTS/`. **404** |
| `../FONTS/Y2KREGULAR.ttf` | `styles.css:3` | En disco es `y2kregular.ttf` (minúsculas) y `Y2KREGULAR.otf`. **404** en cualquier hosting Linux |

Consecuencia verificada en navegador: `document.fonts` devuelve `Y2K: error` y el
wordmark `LOOK CLOSER` —que **es** la identidad de la página— cae a la serif del
sistema. Es el fallo más grave del proyecto.

### Enlaces muertos

15 elementos `<a href="#">`: 8 en el `nav` y 7 en el `overlay`. Ninguno lleva a
ningún sitio. Incluye el conmutador `En / Sp`, para el que no existe versión en
español.

### Contenido

| Sitio | Problema |
|---|---|
| `nav` | `Thurday` (falta la `s`) |
| `nav` | `Sunday` aparece dos veces; falta `Monday`, que sí está en el `overlay` |
| `main` | `bauty` → beauty |
| `main` | `As if thet were` → they |
| `main` | `Is was much like` → It |
| `main` | `crabcs` → crabs |
| `main` | `between the difference of sea life` — frase incompleta |
| `nav`/`main` | `.columsa-days`, `.nav-lenguage` — nombres de clase con faltas |

### CSS

- `flex-flow: row wrapw` (`styles.css:230`) — valor inválido, la declaración se descarta.
- Selectores de 4 y 5 niveles (`body main .main-left .left-top div p br`).
- `all: unset` sobre `h2` para después reconstruir el estilo a mano.
- Prefijos `-webkit-box`/`-ms-flexbox` en todo el archivo: ~40 % del peso del CSS.
- Escala de espaciado arbitraria: `3px`, `10.5px`, `14.5px`, `16.5px`, `35px`, `45px`, `50px`, `-1.5px`, `-8vw`, `-90px`.
- Media queries con `max-width` (desktop-first) y breakpoints sin sistema: 500 / 1020 / 1192.
- Cero variables CSS.

### Accesibilidad

- Texto de contenido a **11 px**, peso 300, sobre fondo oscuro.
- La hamburguesa es un `<div>` con `click`: no es alcanzable con teclado ni tiene `aria-expanded`.
- El overlay no bloquea el scroll de fondo ni se cierra con `Escape`.
- Área táctil de la hamburguesa: 35 × 35 px (mínimo exigido 44 × 44).
- `alt` incorrectos: `alt="Burger"`, `alt="Burger_open"`, `alt="Anemone"` sobre una foto de coral.
- Jerarquía de encabezados con salto: `h1` → `h2` → `h4`.
- El `h1` es `ANDSIOSA` a 13 px, mientras el elemento dominante de la página es un `h2`.

### SEO

Ausentes: `meta description`, Open Graph, `canonical`, `robots.txt`, `sitemap.xml`.
`lang="en"` es correcto: el contenido está en inglés.

### SVG

`<textPath color="red" xlink:href="#circle">` — `color` no pinta un SVG (`fill` sí);
el texto se renderiza en negro sobre `#024442`. `xlink:href` está obsoleto.
El `<svg>` no declara `width`, `height` ni `viewBox`.

---

## 8. Resumen en 5 líneas

1. Es una landing editorial de una sola página para la marca **ANDSIOSA**, con el wordmark *LOOK / CLOSER* y tres columnas de texto e imagen submarina.
2. El diseño está resuelto y el HTML es corto y legible; el problema no es el concepto, es el andamiaje.
3. **Lo más grave: la tipografía Y2K nunca carga.** Dos rutas rotas por mayúsculas/minúsculas (`CSS/fonts.css` y `Y2KREGULAR.ttf`) tiran abajo tanto la display face como Montserrat en cualquier hosting Linux — es decir, en producción. La página que se ve publicada no es la página diseñada.
4. Detrás va el peso: 3.4 MB de imágenes sin optimizar, más 69 KB de jQuery beta para seis `toggleClass`.
5. Y luego la higiene: 15 enlaces a `#`, siete faltas de ortografía en el copy, texto a 11 px, menú inaccesible con teclado y cero metadatos de SEO.
