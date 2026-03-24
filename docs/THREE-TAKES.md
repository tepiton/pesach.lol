# Three Takes: Comparing LLM Implementations of Eleventy Literary Base

Three LLMs were given the same task: convert the off-the-shelf `eleventy-base-blog` into a starter template for literary/chaptered sites, inspired by `twohorses.lol` and `esther.lol`.

| | Codex | Claude | OpenCode |
|---|---|---|---|
| **Approach** | Conservative modification | Feature-rich polish | Minimal rewrite |
| **Config lines** | 119 | 111 | 59 |
| **Layouts** | 3 (base, chapter, home) | 3 (base, chapter, home) | 1 (base only) |
| **CSS lines** | 198 | 316 | 190 |
| **README lines** | 47 | 174 | 141 |

---

## 1. Codex — The Conservative Approach

**Philosophy**: Modify as little as possible. Keep the base blog structure, just repurpose it.

### What it kept from base-blog:
- `eleventy-navigation` plugin
- CSS bundle system (`{% getBundle "css" %}`)
- Drafts preprocessor
- `postslist.njk` include (unused)
- `public/` passthrough
- All the original plugins (syntax highlighting, etc.)

### What changed:
- Added `chapters` collection (filtered by `chapter` tag)
- Added `chapter.njk` layout with prev/next
- Added `book.js` data file for book metadata
- Custom CSS with warm cream/sepia palette
- Sample chapters with literary content

### Navigation approach:
Uses `eleventyNavigation` frontmatter for site nav. Home page is `index.njk`, chapters linked via TOC.

### Sample content:
Three chapters with evocative titles ("At the Threshold", "The Orchard", "The Lantern Room") and brief literary prose.

### Strengths:
- Familiar to base-blog users
- Full plugin ecosystem retained
- Separate `book.js` for book-specific metadata

### Weaknesses:
- Kept unnecessary blog features (syntax highlighting, RSS, etc.)
- Bloated dependencies
- Doesn't feel purpose-built

---

## 2. Claude — The Feature-Rich Approach

**Philosophy**: Build a polished, production-ready template with comprehensive documentation.

### What it kept:
- `eleventy-navigation` plugin
- `eleventy-img` plugin for image optimization
- CSS bundle system
- Drafts preprocessor
- markdown-it with typographer

### What changed:
- Added `chapters` collection (filtered by `chapters` tag)
- Three layouts: base, chapter, home
- Rich CSS with CSS custom properties, Typekit support
- `home.njk` includes TOC automatically
- Comprehensive README (174 lines!)

### Navigation approach:
Same as Codex — `eleventyNavigation` frontmatter. Home page shows opening prose + auto-generated TOC via `home.njk`.

### Sample content:
Three chapters with sample literary prose, drop caps, scene headings, blockquotes.

### Strengths:
- Best documentation by far
- Typekit integration with graceful fallbacks
- Image optimization included
- Literary CSS features (drop caps, scene headings, character headings)

### Weaknesses:
- Complex — three layouts, many plugins
- Image optimization adds build time
- CSS bundle system may be overkill

---

## 3. OpenCode — The Minimal Approach

**Philosophy**: Strip everything unnecessary. Single layout, minimal config, external CSS file.

### What it kept:
- RSS feed plugin (per user request)
- markdown-it with typographer

### What it removed:
- All other plugins (navigation, syntax highlighting, image optimization, bundles)
- Drafts preprocessor
- `public/` directory
- Multiple layouts

### What changed:
- Single `base.njk` layout with `isChapter` frontmatter flag
- External CSS file (`content/css/style.css`)
- `chapters` collection via glob pattern (`content/chapters/*.md`)
- Dev server on port 8086, all interfaces
- Navigation: Title | Contents | About (chapters) or Title | About (home)

### Navigation approach:
Single layout with conditional rendering. `isChapter: true` in frontmatter enables Contents link and prev/next nav.

### Sample content:
Three chapters (Chapter One, Chapter Two, Chapter Three) with sample prose and byline.

### Strengths:
- Simplest config (59 lines vs 119/111)
- Single layout file
- Clean navigation pattern
- Fast builds (fewer plugins)

### Weaknesses:
- No image optimization
- No drafts support
- Less polished default CSS
- No Typekit pre-configured

---

## Comparison Matrix

| Feature | Codex | Claude | OpenCode |
|---------|-------|--------|----------|
| **Layouts** | 3 | 3 | 1 |
| **CSS approach** | Bundled | Bundled | External file |
| **markdown-it** | No | Yes | Yes |
| **RSS feed** | Yes | No | Yes |
| **Image optimization** | Yes | Yes | No |
| **Navigation plugin** | Yes | Yes | No |
| **Drafts support** | Yes | Yes | No |
| **Typekit support** | No | Yes (dual kits) | Yes (single kit) |
| **Prev/next nav** | Built-in filters | Built-in filters | Manual loop |
| **Chapter collection** | By tag | By tag | By glob |
| **Book metadata** | Separate file | In metadata.js | In metadata.js |
| **Dev server port** | 8084 | 8082 | 8086 |
| **Dependencies** | 11 | 7 | 3 |

---

## Code Style Comparison

### Config file approach:

**Codex** — Keeps the `export const config` pattern from base-blog:
```javascript
export const config = {
  templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
  dir: { input: "content", includes: "../_includes", ... }
};
```

**Claude** — Same pattern, slightly cleaner:
```javascript
export const config = {
  templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
  dir: { input: "content", includes: "../_includes", ... }
}
```

**OpenCode** — Returns config object directly:
```javascript
return {
  dir: { input: "content", includes: "includes", ... },
  templateFormats: ["md", "njk", "html"],
  ...
};
```

### Chapter navigation:

**Codex** — Uses built-in filters:
```njk
{% set previousChapter = collections.chapters | getPreviousCollectionItem %}
{% set nextChapter = collections.chapters | getNextCollectionItem %}
```

**Claude** — Same approach:
```njk
{%- set previousPost = collections.chapters | getPreviousCollectionItem %}
{%- set nextPost = collections.chapters | getNextCollectionItem %}
```

**OpenCode** — Manual loop to find index:
```njk
{% set chapterIndex = null %}
{% for chapter in collections.chapters %}
  {% if chapter.url == page.url %}
    {% set chapterIndex = loop.index0 %}
  {% endif %}
{% endfor %}
```

---

## CSS Philosophy

**Codex**: Warm, cream-toned palette with subtle gradients. Book-like paper background on main content. Clean, readable.

**Claude**: Most sophisticated. CSS custom properties for theming. Literary features: drop caps, scene headings (h4 with em-dashes), character headings (h3 italic sans), blockquotes. Typekit-ready.

**OpenCode**: Functional but basic. Fluid typography, narrow measure. Drop caps and small caps. Less visual polish.

---

## Documentation Quality

**Codex** (47 lines): Basic. Covers structure and customization. Assumes familiarity with Eleventy.

**Claude** (174 lines): Excellent. Comprehensive customization guide, markdown features explained, project structure documented, npm scripts table, CSP notes.

**OpenCode** (141 lines): Good. Covers setup, customization, typography, fonts, deployment. Clear and practical.

---

## Verdict

| Goal | Best Choice |
|------|-------------|
| **Fastest builds** | OpenCode (fewest plugins) |
| **Best documentation** | Claude |
| **Most features** | Claude |
| **Simplest to understand** | OpenCode |
| **Most polished default look** | Claude |
| **Closest to base-blog** | Codex |
| **Production-ready** | Claude or OpenCode |

### Recommendation

For a new literary site:

1. **Start with OpenCode** if you want simplicity and understand the trade-offs (no image optimization, no drafts).

2. **Start with Claude** if you want a polished default and comprehensive documentation.

3. **Skip Codex** — it's caught between worlds, keeping too much from base-blog while not committing fully to the literary use case.

---

## What Each Got Wrong

**Codex**:
- Kept too many unnecessary plugins
- No markdown-it configuration (missing typographer)
- Sample chapters feel like placeholders

**Claude**:
- No RSS feed (user requested it)
- Over-engineered for simple use cases
- Image optimization may be overkill for text-focused sites

**OpenCode**:
- No drafts support (useful for work-in-progress)
- Navigation logic is manual instead of using built-in filters
- CSS could use more polish

---

## What Each Got Right

**Codex**:
- Separate `book.js` for book-specific metadata is a nice touch
- Chapter numbering via `chapterNumber` frontmatter

**Claude**:
- Best-in-class documentation
- Literary CSS features are well thought out
- Typekit integration with dual kit support

**OpenCode**:
- Cleanest architecture (single layout, minimal config)
- Smart use of `isChapter` flag instead of separate layouts
- External CSS is simpler than bundle system
