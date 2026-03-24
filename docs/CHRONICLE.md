# Chronicle

## Overview

`eleventy-pamphlet` is a minimal Eleventy v3 starter for single literary works. One of three interoperable templates (pamphlet, chapbook, folio) that share portable `content/` directories.

## Origin

Converted from `eleventy-base-blog` into a literary starter, inspired by twohorses.lol and esther.lol. See `docs/THREE-TAKES.md` for comparison with parallel implementations.

## Key Architecture

- **Single input dir**: `content/` (not `src/`)
- **Layouts**: `_includes/layouts/base.njk` and `chapter.njk`
- **Chapters collection**: Glob-based `content/chapters/*.md` (no tags)
- **Chapter frontmatter**: Just `order` and `title`
- **Layout assignment**: Via `chapters.11tydata.js` and `content.11tydata.js`
- **Port**: 8086 in `package.json` start script
- **Fonts**: Typekit kits `ztn6rcs` and `pgn7ley` baked into `base.njk`
- **CSS vars**: `--font-body` and `--font-heading` in `:root`

## Directory Structure

```
content/
  _data/metadata.js
  chapters/
    chapters.11tydata.js    # layout: layouts/chapter.njk
    *.md
  content.11tydata.js       # layout: layouts/base.njk
  index.md, about.md, 404.md
_includes/layouts/
  base.njk, chapter.njk
css/style.css
```

---

## Recent Changes

### 2026-03-03: Create chapter.njk layout

Separated chapter-specific layout from base.njk to align with chapbook and folio.

1. Created `_includes/layouts/chapter.njk` - extends base.njk, adds chapter header with "Chapter {{ order }}" and prev/next navigation
2. Created `content/chapters/chapters.11tydata.js` - points to `layouts/chapter.njk`
3. Removed inline chapter navigation from `base.njk`
4. Added `.chapter-header` and `.chapter-number` CSS styles

### 2026-03-03: Update about.md

Added colophon (fonts, measure) and GitHub source link.

### 2026-03-03: Standardize chapter sorting

1. Changed `order` fallback from 0 to 999 (chapters without order sort to end)
2. Added secondary sort by filename for deterministic ordering when order is equal

### 2026-03-01: Move CSS outside content/

Moved `content/css/` to `css/` at root level. CSS is template skin, not portable content.

### 2026-03-01: Align includes path

Moved `content/includes/base.njk` to `_includes/layouts/base.njk`. Created `content/content.11tydata.js` for default layout.

### 2026-02-28: Content portability

Made `content/` portable across all three templates.

### 2026-02-27: Fonts and Typekit

Added `--font-body` and `--font-heading` CSS vars. Baked Typekit kit IDs into `base.njk`. Set `metadata.url` to `https://orobia.lol/`.

### 2026-02-26: Details styling

Added CSS for `<details>` blocks as expandable asides (monospace, 60%, indented).

### 2026-02-25: README rewrite

Corrected title to `eleventy-pamphlet`, documented metadata schema and project structure.
