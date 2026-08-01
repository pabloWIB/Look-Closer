# Look-Closer

Editorial one-pager for ANDSIOSA, structured as a week and set in Y2K display type.

[![Live demo](https://img.shields.io/badge/demo-lookcloser.wib.digital-2ea44f)](https://lookcloser.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

A brand page built around a single idea: what you see on a coral reef is not
what is there. The text follows a diver past the surface and lands on the
comparison the page is named for — that a reef and an inner life are organised
the same way, everything tangled into everything else.

Type carries the whole identity. Two self-hosted Y2K display cuts, regular and
slanted, with the slant reserved for the line of emphasis. There is no logo
mark on the page.

The week runs across the top of the masthead — Monday through Friday, then
Sunday, then *Always*. It is a typographic device, not navigation: the days are
text and they lead nowhere. Below 1024px they move into a full-screen panel
behind the masthead button.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3, custom properties | `base.css` (tokens, reset, type), `layout.css` (grid), `components.css` |
| Scripting | JavaScript (ES2015, no framework) | 83 lines in `assets/js/main.js` |
| Display type | Why2k Regular, Why2k Slant | Self-hosted WOFF2, 28 KB for both |
| Body type | Montserrat 300/400/500 | Google Fonts, `display=swap` |
| Images | WebP | 279 KB for the three photographs |

No dependencies, no build step, no package manager.

## Project structure

```
.
├── index.html                    # The page
├── 404.html                      # Error page, links back to index
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── base.css              # @font-face, :root tokens, reset, base type
│   │   ├── layout.css            # Shell, masthead, wordmark, story grid, footer
│   │   └── components.css        # Brand, week, panel toggle, panel, prose, ring
│   ├── js/
│   │   └── main.js               # Week panel: open, close, Escape, scroll lock
│   ├── fonts/
│   │   ├── y2k-regular.woff2     # Display face
│   │   └── y2k-slant.woff2       # Display face, slanted — the emphasis voice
│   └── img/
│       ├── content/              # The three photographs, WebP
│       ├── logo/                 # Favicon and apple-touch-icon
│       └── og/                   # Open Graph card, 1200x630
└── docs/
    ├── auditoria.md              # State of the project before the reorganisation
    └── cambios.md                # What changed, by phase
```

## Running it locally

The page has no build step. Open it directly:

```bash
open index.html
```

Or serve it, which is closer to how it is hosted:

```bash
npx serve .
```

Note that hosting is case-sensitive and Windows is not. Serve the folder rather
than trusting a direct file open when you rename anything under `assets/`.

## Editing

Colour, type scale, spacing and motion are CSS custom properties declared once
in `assets/css/base.css`. Change them there rather than in the rules that use
them.

Two things worth knowing before touching the CSS:

- The spacing scale is 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96, exposed as
  `--space-1` through `--space-8`.
- `--color-accent` (`#e84e3d`) is the selection highlight. For accent *text* use
  `--color-accent-ink` (`#ff8a76`) — the original coral only reaches 2.9:1
  against the teal background, below the 4.5:1 minimum.

Breakpoints are mobile-first `min-width` at 768, 1024 and 1440.

## Deployment

Deployed on Vercel at [lookcloser.wib.digital](https://lookcloser.wib.digital).
Static: upload the repository root as-is, no build command and no output
directory. Point the 404 handler at `404.html`.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
