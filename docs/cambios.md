# Registro de cambios — reorganización de Look-Closer

Fecha: 2026-07-31
Punto de partida: commit `959329b`.
Nada de esto se ha subido: no se ejecutó ningún comando de git.

---

## Fase 1 — Auditoría

- Inventario completo en [`auditoria.md`](auditoria.md).
- Verificación hecha con un servidor estático **sensible a mayúsculas**, para
  reproducir el comportamiento de Vercel/Linux en lugar del de Windows.

## Fase 2 — Estructura

Antes → después:

| Antes | Después |
|---|---|
| `CSS/normalize.css` | fundido en `assets/css/base.css` |
| `CSS/styles.css` | repartido en `base.css` / `layout.css` / `components.css` |
| `CSS/styles.scss` | eliminado (ver fase 3) |
| `FONTS/fonts.css` | fundido en `base.css` (`@font-face`) y en el `<link>` de Google Fonts |
| `FONTS/y2kregular.ttf` | `assets/fonts/y2k-regular.woff2` |
| `FONTS/Y2kslant.ttf` | `assets/fonts/y2k-slant.woff2` |
| `FONTS/Y2KREGULAR.otf` | eliminado (duplicado exacto del `.ttf`, 233 glifos) |
| `IMG/photo1.jpg` | `assets/img/content/coral-branches.webp` |
| `IMG/photo2.jpg` | `assets/img/content/octopus-eye.webp` |
| `IMG/photo3.jpg` | `assets/img/content/coral-fish.webp` |
| `IMG/menu.svg`, `IMG/menu_open.svg` | insertados en línea en el HTML |
| `JS/script.js` | `assets/js/main.js` |
| `Look-Closer.png` | recortado y reducido a `assets/img/logo/favicon-64.png` y `apple-touch-icon.png` |

Creados: `404.html`, `.gitignore`, `robots.txt`, `sitemap.xml`, `docs/`.

No se creó `assets/js/modules/`: todo el JavaScript son 83 líneas y parte de un
único punto de entrada. Una carpeta de módulos ahí habría sido decorativa.

## Fase 3 — Higiene

- **`prepros.config` eliminado** (23.9 KB). Era configuración del IDE Prepros con
  rutas absolutas de otra máquina. Añadido a `.gitignore`.
- **`styles.scss` eliminado.** Solo usaba anidamiento —ni una variable, ni un
  mixin—, y mantenerlo obligaba a compilar para tocar un color. El sistema de
  diseño vive ahora en variables CSS nativas, sin paso de compilación.
- Los `.jpg` originales se han sustituido por sus WebP. Quedan en el historial de
  git, en el commit `959329b`, si hicieran falta los másteres.
- Eliminados los prefijos `-webkit-box` / `-ms-flexbox`: eran ~40 % del CSS.
- No se encontraron credenciales, tokens ni claves de API en ningún archivo.
- Formato normalizado: 2 espacios, comillas dobles en HTML, punto y coma en JS,
  salto de línea final, sin tabuladores y sin CRLF.

## Fase 4 — Imágenes

| Archivo | Antes | Después |
|---|---|---|
| coral-branches | 816 KB, 858 × 1163 JPEG | **98 KB**, 800 × 1084 WebP |
| octopus-eye | 664 KB, 805 × 1200 JPEG | **90 KB**, 800 × 1193 WebP |
| coral-fish | 1 735 KB, 1457 × 1600 JPEG | **90 KB**, 800 × 879 WebP |
| favicon | 203 KB, 1024 × 1024 PNG | **6 KB**, 64 × 64 PNG (+ 27 KB apple-touch 180 × 180) |

- 3.1 MB → 279 KB en las tres fotos.
- Ninguna supera los 800 px de ancho: el contenedor más ancho que ocupan es de
  ~630 px.
- Creado `assets/img/og/look-closer-og.jpg` (94 KB, 1200 × 630), recorte de la
  foto del coral que ya estaba en el proyecto. No se descargó ni se generó
  ninguna imagen nueva.
- Los dos SVG del menú se insertan ahora en línea. Antes eran `<img>` sin `fill`,
  es decir **negro sobre fondo `#024442`**: prácticamente invisibles. Ahora usan
  `currentColor`.
- Los tres `<img>` llevan `width`, `height`, `loading="lazy"`, `decoding="async"`
  y un `alt` que describe lo que se ve. Los anteriores (`Anemone` sobre una foto
  de coral, `Burger_open`) eran incorrectos.

## Fase 5 — HTML, SEO y accesibilidad

- **Jerarquía corregida.** El `h1` era `ANDSIOSA` a 13 px mientras el elemento
  dominante de la página, el wordmark, era un `h2`; y después saltaba a `h4`.
  Ahora: `h1` = `LOOK CLOSER`, la marca es un `<p>` del cabecero, y la línea de
  énfasis es un `<p class="pull-quote">`. Un solo encabezado, sin saltos.
- El `<nav>` desapareció: **no había navegación**. Los días de la semana no
  llevaban a ningún sitio. El cabecero es ahora una cabecera editorial (marca +
  la semana + el botón del panel), no un menú.
- **15 enlaces `href="#"` eliminados.** Los días son texto; el conmutador
  `En / Sp` se quitó entero porque no existe versión en español.
- `<head>` completo en las dos páginas: `title` único (53 y 59 caracteres),
  `description` única (157 y 149), Open Graph con `og:image` real, `canonical`,
  favicon y apple-touch-icon.
- Añadidos: enlace de salto al contenido, `aria-expanded` / `aria-controls` en el
  botón del panel, `aria-hidden` en el círculo decorativo, `inert` sobre `main` y
  `footer` mientras el panel está abierto.
- `robots.txt` y `sitemap.xml` con la URL real del sitio.
- Añadido un `<footer>`: la página terminaba en seco después de la última foto.

### Correcciones de copia

Faltas de ortografía del texto original, corregidas sin añadir contenido nuevo:

| Antes | Después |
|---|---|
| `Thurday` | `Thursday` |
| `bauty` | `beauty` |
| `As if thet were` | `As if they were` |
| `Is was much like` | `It was much like` |
| `crabcs` | `crabs` |
| `between the difference of sea life` | `between the different forms of sea life` |
| `Sunday, Tuesday, Wednesday, Thurday, Friday` | `Monday, Tuesday, Wednesday, Thursday, Friday` |

El primer `Sunday` del cabecero era casi con seguridad un `Monday`: el panel
móvil sí listaba `Monday`, y la retícula del cabecero agrupa los días de dos en
dos más uno suelto, que es exactamente la forma de lunes-a-viernes. Con el
cambio desaparece el `Sunday` duplicado.

## Fase 6 — CSS y sistema de diseño

- 26 variables en `:root`: color, tipografía, escala de espaciado, medida de
  línea, ancho de la caja, transición y anillo de foco.
- Paleta **derivada del sitio**, no inventada: el teal `#024442` era el fondo y
  el coral `#e84e3d` era el `::selection`. Se añadió `--color-accent-ink`
  (`#ff8a76`) porque el coral original solo alcanza **2.93:1** sobre el teal;
  el tono elevado llega a **4.79:1**. El original se conserva para el subrayado
  de selección, que no es texto.
- Escala de espaciado 4/8/16/24/32/48/64/96. Fuera `3px`, `10.5px`, `14.5px`,
  `35px`, `-1.5px`, `-8vw`, `-90px`.
- Escala tipográfica de 6 pasos. Dos familias: Why2k y Montserrat. Se quitó el
  `@import` de Playfair Display SC, que nunca se usó.
- Ningún selector pasa de dos niveles. Cero `!important` salvo el de
  `prefers-reduced-motion`, donde es obligatorio.
- Corregido `flex-flow: row wrapw`, valor inválido que el navegador descartaba.
- Orden dentro de cada archivo: variables → reset → base → layout →
  componentes → media queries.

## Fase 7 — Responsive

- Reescrito a **mobile-first** con `min-width`. Antes eran tres `max-width` sin
  sistema: 500 / 1020 / 1192.
- Retícula: 1 columna → 2 desde 768 → 36fr/20fr/30fr desde 1024 (las mismas
  proporciones del diseño original).
- Los dos párrafos que van uno al lado del otro usan
  `repeat(auto-fit, minmax(15rem, 1fr))`: se parten solo cuando cada uno se
  queda por encima de ~30 caracteres. Con columnas fijas caían a 160 px (21
  caracteres) en tablet.
- Verificado sin scroll horizontal en 360, 768, 1024 y 1440 px con
  `document.documentElement.scrollWidth > window.innerWidth`.
- El botón del panel mide 44 × 44 px.
- Panel móvil: abre, cierra por botón, por `Escape` y pulsando el fondo; bloquea
  el scroll de la página; devuelve el foco al botón; y se cierra solo si la
  ventana pasa de 1024 px, donde el botón deja de existir.

### Tres fallos que aparecieron al probar y se corrigieron

1. `.week` (components.css) pisaba el `display: none` de `.site-header__week`
   (layout.css) por orden de carga: los días se veían en móvil.
2. El panel, en `position: fixed`, tapaba su propio botón de cerrar. El cabecero
   necesitaba contexto de apilamiento propio.
3. Con el panel abierto, el contenido de detrás seguía siendo alcanzable con
   `Tab`. Resuelto con `inert`.

## Fase 8 — UX / UI

- Estados en los elementos interactivos: `hover`, `:focus-visible`, `active`.
  Transiciones de 200 ms, dentro del rango de 150-250.
- Foco visible en todo: contorno blanco de 2 px con 3 px de separación.
- Contraste medido en navegador: texto 7.66:1, marca y línea de énfasis 11.01:1,
  acento 4.79:1. Todo por encima de 4.5:1.
- La línea de énfasis usa ahora la Why2k Slant. El README ya decía que la
  cursiva era la voz de énfasis de la marca, pero el archivo de fuente estaba
  huérfano: ningún `@font-face` lo declaraba.

**No se añadió CTA.** El sitio no tiene contacto, ni producto, ni segunda
página, ni redes: cualquier botón habría llevado a un destino inventado.

## Fase 9 — JavaScript

- **jQuery fuera.** Se cargaban 69 KB desde cdnjs, en versión `3.0.0-beta1`,
  para seis `toggleClass`.
- Un solo `main.js`, en una IIFE con `"use strict"`, con `defer`. Sin globales,
  sin `var`. Script clásico y no módulo ES, para que `index.html` siga
  funcionando al abrirlo directamente desde el disco.
- Comprueba que los elementos existen antes de operar sobre ellos.
- Cero errores y cero avisos en consola, en las dos páginas.

## Fase 10 — Rendimiento

- Primera carga: **11 peticiones, todas 200**, ~445 KB en total. Antes: ~3.4 MB
  más 69 KB de jQuery, con dos 404.
- Fuentes en WOFF2: 79 KB → 29 KB. `font-display: swap` en las dos.
- `preload` de la Why2k regular (es el elemento LCP) y `preconnect` a
  `fonts.googleapis.com` y `fonts.gstatic.com`.
- Script con `defer`; antes bloqueaba el parseo.

## Fase 11 — QA

Comprobado en navegador, sobre servidor local y sobre `file://`:

| Comprobación | Resultado |
|---|---|
| Enlaces del cabecero y del pie | Sin enlaces muertos; el único enlace del sitio, el de vuelta de la 404, devuelve 200 |
| Rutas de imagen | 28 referencias comprobadas contra disco, con distinción de mayúsculas: 0 rotas |
| `<link>` y `<script>` | Todos resuelven |
| Consola | 0 errores, 0 avisos en las dos páginas |
| Scroll horizontal a 360 / 768 / 1024 / 1440 | Ninguno |
| Panel móvil en las dos direcciones | Abre y cierra por botón, `Escape` y fondo |
| Texto de relleno | Ninguno |
| Imágenes rotas | Ninguna |
| `title` y `description` únicos | Sí, en las dos páginas |
| `404.html` con vuelta al inicio | Sí |
| Credenciales en el código | Ninguna |
| Lighthouse (móvil) | Accesibilidad 100, Buenas prácticas 100, SEO 100 |

No hay formularios en el sitio, así que la comprobación de validación no aplica.

## Fase 12 — Documentación

- `README.md` actualizado: rutas, stack y estructura nuevos. Se retiraron los
  dos "known issues" —el `Thurday` y el conmutador `En / Sp`— porque ya no
  existen. Se quitaron las instrucciones de Sass y Prepros.
- Este archivo.

## Fase 13 — Deploy

- Funciona abriendo `index.html` desde el disco y sobre servidor local.
- Ninguna ruta absoluta de la máquina de desarrollo.
- Todas las rutas internas relativas y en minúsculas.
- No se creó configuración de hosting: el proyecto es estático y no se indicó
  ningún destino que la necesite. Vercel lo sirve tal cual, sin build.
