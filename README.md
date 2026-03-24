# eleventy-pamphlet

An Eleventy v3 starter for short literary works: novellas, single-volume fiction, pamphlets. Minimal structure with two layouts.

Part of a family of interoperable templates:
- **eleventy-pamphlet** (this) - minimal, single layout
- **eleventy-chapbook** - separate layouts, feature-rich
- **eleventy-folio** - polished, with extras

The `content/` directory is portable across all three. Swap templates to change the presentation without touching your content.

## Quick start

```
git clone <this-repo> my-project
cd my-project
npm install
npm run start
```

Then open `http://localhost:8086`.

## Customization

### Site metadata

Edit `content/_data/metadata.js`:

```js
export default {
  title: "My Literary Work",
  url: "https://example.com/",
  language: "en",
  description: "A description of this literary work",
  author: {
    name: "Your Name",
    email: "you@example.com",
    url: "https://example.com/"
  },
  image: "/img/cover.png",
  twitter: "@yourhandle"
}
```

Note: `metadata.js` lives inside `content/_data/` so the entire `content/` directory is self-contained and portable.

### Single-page vs multi-chapter

**Multi-chapter works:** Add files to `content/chapters/`. Each needs front matter:

```yaml
---
title: Chapter One
order: 1
---
```

- `order` controls chapter sequence
- Filename determines the URL: `chapter-1.md` → `/chapters/chapter-1/`
- Chapters are detected automatically by location - no tag or flag needed
- Chapter pages get a numbered header and prev/next navigation

**Chapter sorting:** Chapters are sorted by `order` property (ascending, fallback to 999 if missing), then by filename alphabetically for determinism.

**Single-page works:** Delete the `content/chapters/` directory entirely. Your `index.md` becomes the whole work. It inherits the base layout with no chapter navigation.

### Home page

Edit `content/index.md`. Put your title page, foreword, or opening here.

### About page

Edit `content/about.md`.

### Fonts, colors, and styles

Fonts and colors are set directly in `css/style.css`. The main values to change:

```css
body {
  background-color: #fffff8;  /* page background */
  color: #111;                /* body text */
  font-family: Palatino, Georgia, serif;  /* body font */
}

h1, h2, h3 {
  font-family: 'Gill Sans', 'Helvetica Neue', sans-serif;  /* heading font */
}

a {
  color: #555;  /* link color */
}
```

**Adobe Fonts (Typekit):** This template uses `p22-stickley-pro-text` and `neue-kabel` from Adobe Fonts. The kit IDs are baked into `_includes/layouts/base.njk`. To use different fonts, replace the Typekit `<link>` tags and update the CSS variables.

**Other web fonts:** Add a `<link>` to your font provider in `_includes/layouts/base.njk` and update the `--font-body` and `--font-heading` variables in `style.css`.

### Typography classes

- `.drop` — drop cap on first letter, small caps on first line
- `.first-line` — small caps on first line only

```html
<p class="drop">This paragraph has a drop cap.</p>
```

## Project structure

```
content/
  _data/
    metadata.js          # Title, author, URL, social info
  chapters/
    chapter-1.md
    chapter-2.md
    ...
  content.11tydata.js    # Default layout for all content
  index.md               # Home / title page
  about.md               # About the author
  404.md                 # Not found page
css/
  style.css              # All styles
_includes/
  layouts/
    base.njk             # Shell for all pages
    chapter.njk          # Chapter wrapper with prev/next
```

The `content/` directory is designed to be portable. Copy it to eleventy-chapbook or eleventy-folio to get a different presentation with the same content.

## npm scripts

| Command | Description |
|:--------|:------------|
| `npm run start` | Dev server at `localhost:8086` with live reload |
| `npm run build` | Production build to `_site/` |
| `npm run clean` | Remove `_site/` |
| `npm run debug` | Build with full debug output |

## Deploy

The included `.github/workflows/pages.yml` builds and deploys to GitHub Pages on push to `main`. No configuration needed for custom domains — the workflow detects the repo name and sets the path prefix automatically.
