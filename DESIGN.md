# Pólya SDLC Coder Design System (`DESIGN.md`)

<!-- markdownlint-disable -->

## Overview

The **Pólya SDLC Coder** web showcase and documentation site is built upon Apple's iconic web design philosophy: **reverent product and engineering presentation framed by near-invisible UI**. 

Every page is structured as a rhythmic vertical stack of edge-to-edge product "tiles" — alternating light canvases (Pure White and Parchment) and near-black surfaces (`#272729`), each centered on a confident display headline, a concise tagline, two pill-shaped CTAs, and crisp technical or architectural visual renders. Nothing competes with the engineering artifacts (George Pólya's heuristics, Clean Architecture seams, and the 15 modular skills).

Density is unusually low: each major section occupies roughly one viewport, with generous breathing air (80px vertical padding) and zero decorative chrome — no gratuitous gradients, no heavy cards, and no box-shadows on headlines or containers. Elevation appears only when a technical artifact, terminal card, or architectural diagram rests on a surface (a single whisper-soft `rgba(0, 0, 0, 0.22) 3px 5px 30px` drop shadow for visual weight).

When exploring the 15-skill catalog and platform options, the page transitions to utility mode: a tight grid of white utility cards at `{rounded.lg}` (18px) radius with a 1px hairline border, paired with interactive platform configurator chips (`{rounded.pill}`) and a persistent frosted-glass sub-nav strip. Across all surfaces, the typographic hierarchy, 8px layout rhythm, and single blue interactive accent are rigorously uniform.

**Key Characteristics:**
- **Artifact-first presentation:** UI recedes so the engineering heuristics and code seams speak.
- **Alternating full-bleed tile sections:** Pure White ↔ Parchment ↔ Near-Black tiles, where background color changes act as natural section dividers.
- **Single interactive Action Blue (`{colors.primary}` — `#0066cc`):** Carries every interactive action (pill CTAs, text links, focus rings). No second brand color exists.
- **Two button grammars:** Iconic capsule pills (`{rounded.pill}`) for primary/secondary actions, and compact utility rectangles (`{rounded.sm}`) for nav actions.
- **System-wide micro-interaction:** `transform: scale(0.95)` on active/press state across all buttons and chips.
- **Google Fonts typography with Apple tight cadence:** Plus Jakarta Sans for display headlines with negative letter-spacing, Inter for 17px body copy, and JetBrains Mono for monospace notation.
- **Whisper-soft elevation:** Exactly one drop-shadow in the entire design system, reserved exclusively for diagrams and resting cards.
- **Tight two-row navigation:** Slim 44px `{component.global-nav}` pinned to top + 52px `{component.sub-nav-frosted}` with persistent right-aligned action CTA.

---

## Colors

> **System Color Rules:** Color transitions provide spatial rhythm. The single Action Blue carries all interactive meaning. Decorative gradients are strictly prohibited.

### Brand & Accent
- **Action Blue** (`{colors.primary}` — `#0066cc`): The single brand-level interactive color. All text links, primary pill CTAs ("Install Now", "Read Spec"), and focus ring root. Active press state triggers `transform: scale(0.95)` rather than an unnatural hue shift.
- **Focus Blue** (`{colors.primary-focus}` — `#0071e3`): Brighter sibling of Action Blue, reserved for keyboard focus rings (`outline: 2px solid`).
- **Sky Link Blue** (`{colors.primary-on-dark}` — `#2997ff`): High-visibility blue reserved exclusively for inline links on dark tiles where Action Blue would fail contrast.
- **Pause Red** (`{colors.status-pause}` — `#ef4444`): Semantic alert accent reserved for **The Pause Rule** gate and invariant errors.

### Surface Canvases
- **Pure White** (`{colors.canvas}` — `#ffffff`): The dominant light canvas for the Hero Tile and Skill Catalog grid.
- **Parchment** (`{colors.canvas-parchment}` — `#f5f5f7`): The signature Apple off-white. Used for alternating sections, documentation blocks, footer region, and frosted-glass backgrounds.
- **Pearl Surface** (`{colors.surface-pearl}` — `#fafafc`): Near-white fill for secondary ghost buttons and option chips.
- **Near-Black Tile 1** (`{colors.surface-tile-1}` — `#272729`): Primary dark tile for the Socratic ASCII Triage Card and terminal simulator.
- **Near-Black Tile 2** (`{colors.surface-tile-2}` — `#2a2a2c`): Micro-step lighter tile for sub-sections or adjacent dark bands.
- **Near-Black Tile 3** (`{colors.surface-tile-3}` — `#252527`): Deepest dark tile for embedded terminal code runners.
- **Pure Black** (`{colors.surface-black}` — `#000000`): True void reserved for the 44px global navigation bar and media backdrops.
- **Translucent Chip Gray** (`{colors.surface-chip-translucent}` — `rgba(210, 210, 215, 0.64)`): Base tone for floating control chips and copy affordances over diagrams.

### Text & Ink
- **Near-Black Ink** (`{colors.ink}` — `#1d1d1f`): The voice of every headline and body paragraph on light surfaces (never pure `#000000` to maintain an editorial, non-harsh tone).
- **Body** (`{colors.body}` — `#1d1d1f`): Identical to ink for uniform text density.
- **Body On Dark** (`{colors.body-on-dark}` — `#ffffff`): Headlines and body text on dark tiles and global nav.
- **Body Muted** (`{colors.body-muted}` — `#cccccc`): Secondary copy and metadata on dark tiles.
- **Ink Muted 80** (`{colors.ink-muted-80}` — `#333333`): Secondary text on Pearl Button surfaces.
- **Ink Muted 48** (`{colors.ink-muted-48}` — `#7a7a7a`): Disabled states, fine print, and footer disclaimers.

### Hairlines & Borders
- **Divider Soft** (`{colors.divider-soft}` — `rgba(0, 0, 0, 0.04)` / `#f0f0f0`): Border on secondary ghost buttons and soft container separators.
- **Hairline** (`{colors.hairline}` — `#e0e0e0` / `rgba(0, 0, 0, 0.08)`): 1px hairline border on utility cards, configurator chips, and search inputs.
- **Hairline Dark** (`{colors.hairline-dark}` — `rgba(255, 255, 255, 0.12)`): 1px subtle divider on dark tiles and terminal blocks.

### Brand Gradients
**Zero decorative gradients.** Depth is established through authentic photography, monospace ASCII diagrams, and surface color contrast.

---

## Typography

### Google Fonts Integration & Fallbacks

Typography is loaded via Google Fonts CDN using `preconnect` hints and `font-display: swap` for instant, layout-shift-free rendering:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
```

### Font Family Roles

- **Display & Section Headings (`--font-display`):**  
  `'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
  *Apple Substitution Note:* Emulates the signature SF Pro Display weight 600 with negative letter-spacing for tight, confident titles.
- **Body & Prose (`--font-body`):**  
  `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
  *Apple Substitution Note:* Set at **17px** with **1.47 line height** (and feature-setting `'ss03'` for rounded character geometry) to preserve Apple's distinctive reading cadence.
- **Monospace, ASCII & Code Notation (`--font-mono`):**  
  `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`  
  *Role:* Precision terminal commands (`npx skills add ...`), Socratic ASCII Triage Cards, slash commands (`/to-*`), and DTO contracts.

### Typographic Hierarchy Scale

| Token | Family | Size | Weight | Line Height | Tracking | Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `{typography.hero-display}` | Display | 56px | 600 | 1.07 | -0.28px | Main hero headline ("Mathematical Problem-Solving...") |
| `{typography.display-lg}` | Display | 40px | 600 | 1.10 | 0 | Tile headlines atop each full-bleed section |
| `{typography.display-md}` | Display | 34px | 600 | 1.47 | -0.374px | Section heads (The 6-Phase Pipeline, Skill Catalog) |
| `{typography.lead}` | Body | 28px | 400 | 1.14 | 0.196px | Section subcopy, key thesis statements |
| `{typography.lead-airy}` | Body | 24px | 300 | 1.50 | 0 | Philosophical Pólya excerpts (deliberate weight 300) |
| `{typography.tagline}` | Display | 21px | 600 | 1.19 | 0.231px | Sub-nav title ("Pólya SDLC Coder"), category headers |
| `{typography.body-strong}` | Body | 17px | 600 | 1.24 | -0.374px | Inline strong emphasis, card titles |
| `{typography.body}` | Body | 17px | 400 | 1.47 | -0.374px | Default paragraph (17px editorial reading standard) |
| `{typography.dense-link}` | Body | 13px | 400 | 1.40 | -0.13px | Footer link stacks (scannable Apple directory index) |
| `{typography.code-default}` | Mono | 14px | 400 | 1.55 | 0 | Terminal commands, CLI snippets, ASCII diagrams |
| `{typography.code-pill}` | Mono | 12px | 500 | 1.40 | 0 | Slash command badges (`/to-spec`, `/to-plan`) |
| `{typography.caption}` | Body | 14px | 400 | 1.43 | -0.224px | Secondary captions, button text |
| `{typography.caption-strong}` | Body | 14px | 600 | 1.29 | -0.224px | Emphasized captions |
| `{typography.button-large}` | Body | 18px | 300 | 1.00 | 0 | Store/Hero CTAs (deliberate weight 300) |
| `{typography.button-utility}` | Body | 14px | 400 | 1.29 | -0.224px | Utility and navigation button labels |
| `{typography.fine-print}` | Body | 12px | 400 | 1.00 | -0.12px | Fine-print, footer legal notices |
| `{typography.micro-legal}` | Body | 10px | 400 | 1.30 | -0.08px | Disclaimers, license notices |
| `{typography.nav-link}` | Body | 12px | 400 | 1.00 | -0.12px | Global nav menu items |

### Typographic Principles
1. **Negative letter-spacing at display sizes:** All headlines $\ge 17\text{px}$ carry `-0.12px` to `-0.374px` tracking to recreate the iconic tight cadence.
2. **Body copy at 17px, never 16px:** Preserves Apple's distinctive reading pace.
3. **Weight 300 is real and rare:** Reserved for `{typography.button-large}` and `{typography.lead-airy}` to provide moments of visual breath.
4. **Weight 600, not 700, for display:** Gives assertive structure without feeling heavy.
5. **Weight 500 is deliberately absent:** The typographic ladder is `300 / 400 / 600 / 700`.

---

## Layout & Whitespace

### Spacing System
- **Base Unit:** 8px.
- **Scale:**
  - `{spacing.xxs}`: 4px (micro adjustments, badge padding)
  - `{spacing.xs}`: 8px (icon gaps, tight stack padding)
  - `{spacing.sm}`: 12px (pill button vertical padding)
  - `{spacing.md}`: 17px (matches 17px body line base)
  - `{spacing.lg}`: 24px (utility grid card internal padding)
  - `{spacing.xl}`: 32px (container gutters, card margins)
  - `{spacing.xxl}`: 48px (major sub-section gutters)
  - `{spacing.section}`: 80px (full-bleed product tile vertical padding)
- **Section Rhythm:** Tiles stack edge-to-edge with **0 gap** — the transition between Light and Dark surfaces forms the visual boundary.

### Grid & Max Widths
- **Showcase Container:** Max width `1440px` for utility grids and hero stacks.
- **Documentation Container:** Max width `980px` for text-heavy architectural reading.
- **Gutters:** 20px–24px between utility cards in catalog grids.

### Whitespace Philosophy
Whitespace is the pedestal of the engineering concept. Every tile begins with $\ge 64\text{px}$ of air above its headline and $48\text{px} - 64\text{px}$ below. Visual diagrams and ASCII cards maintain at least $40\text{px}$ distance from nearest text.

---

## Elevation & Depth

| Level | Treatment | Use Case |
| :--- | :--- | :--- |
| **Flat** | No shadow, no border | Full-bleed tiles, global nav, footer, body sections |
| **Soft Hairline** | 1px `rgba(0, 0, 0, 0.08)` / `#e0e0e0` | Utility cards, sub-nav frosted-glass separator |
| **Backdrop Blur** | `backdrop-filter: saturate(180%) blur(20px)` on Parchment 80% | Sub-nav bar and floating quick-install bar |
| **Product Shadow** | `rgba(0, 0, 0, 0.22) 3px 5px 30px 0` | Architectural diagrams, terminal cards resting on a tile surface |

> **The Single Drop-Shadow Law:** Exactly **one** drop-shadow exists in the system (`rgba(0,0,0,0.22) 3px 5px 30px 0`). It is applied exclusively to resting diagram cards and terminal frames — **never** to buttons, text, or full-bleed tiles.

---

## Shapes & Geometry

### Border Radius Scale

| Token | Value | Use Case |
| :--- | :--- | :--- |
| `{rounded.none}` | 0px | Full-bleed product tiles (edge-to-edge) |
| `{rounded.xs}` | 5px | Code tags, micro-badges |
| `{rounded.sm}` | 8px | Dark utility buttons (GitHub link, Bag), inline images |
| `{rounded.md}` | 11px | Pearl capsule secondary buttons |
| `{rounded.lg}` | 18px | Skill catalog cards, platform option cards |
| `{rounded.pill}` | 9999px | Primary blue CTAs, configurator option chips, search inputs |
| `{rounded.full}` | 50% | Circular floating control chips (copy icon, scroll-to-top) |

---

## Component Specifications

### 1. Top Navigation

**`global-nav`**  
- Persistent, ultra-thin black bar pinned to the top of the viewport.
- Height: `44px`. Background: `{colors.surface-black}` (#000000).
- Typography: `{typography.nav-link}` (12px / 400 / -0.12px tracking) in `{colors.body-on-dark}`.
- Left: Minimal Pólya SDLC monogram (`∑⚡`). Center: Links to Overview, Heuristics, Skills, Architecture, Docs. Right: GitHub star badge + Quick Install action.
- Mobile: Collapses to centered monogram + hamburger tray at $\le 834\text{px}$.

**`sub-nav-frosted`**  
- Surface-specific navigation pinned directly beneath `global-nav`.
- Height: `52px`. Background: `{colors.canvas-parchment}` at 80% opacity with `backdrop-filter: saturate(180%) blur(20px)`.
- Left: Page title ("Pólya SDLC Coder") in `{typography.tagline}` (21px / 600).
- Right: Quick category links in `{typography.button-utility}` (14px) + persistent right-aligned `{component.button-primary}` ("Install").

### 2. Button Grammars

**`button-primary` (The Action Pill)**  
- Background: `{colors.primary}` (Action Blue #0066cc). Text: `#ffffff` in `{typography.body}` (17px / 400).
- Shape: Full capsule `{rounded.pill}` (9999px). Padding: `11px 22px`.
- Active Micro-interaction: `transform: scale(0.95)` with transition `transform 120ms ease`.
- Focus State: `outline: 2px solid {colors.primary-focus}` with `2px` offset.

**`button-secondary-pill` (The Ghost Pill)**  
- Background: Transparent. Text: `{colors.primary}` (#0066cc).
- Border: `1px solid {colors.primary}`. Shape: `{rounded.pill}`. Padding: `11px 22px`.
- Used paired alongside `{component.button-primary}` ("Install via npx" / "Explore Skills").

**`button-dark-utility`**  
- Background: `{colors.ink}` (#1d1d1f). Text: `#ffffff` in `{typography.button-utility}` (14px).
- Shape: `{rounded.sm}` (8px). Padding: `8px 15px`. Active: `transform: scale(0.95)`.

**`button-icon-circular`**  
- Dimensions: `44px × 44px`. Background: `{colors.surface-chip-translucent}`.
- Shape: `{rounded.full}`. Icon: `#1d1d1f`. Used for floating clipboard copy and terminal actions.

### 3. Full-Bleed Section Tiles

**`product-tile-light`**  
- Background: `{colors.canvas}` (#ffffff). Text: `{colors.ink}` (#1d1d1f).
- Padding: `{spacing.section}` (80px) vertical.
- Stack: Centered headline in `{typography.hero-display}` (56px) ➔ one-line lead in `{typography.lead}` (28px) ➔ two pill CTAs ➔ hero architectural render with `{elevation.product-shadow}`.

**`product-tile-parchment`**  
- Background: `{colors.canvas-parchment}` (#f5f5f7). Text: `{colors.ink}`.
- Used to house the **6-Phase Pipeline Stepper** and **🛑 The Pause Rule** gate, creating subtle atmospheric separation from white tiles.

**`product-tile-dark`**  
- Background: `{colors.surface-tile-1}` (#272729). Text: `{colors.body-on-dark}` (#ffffff).
- Houses the interactive terminal simulator and **Socratic ASCII Triage Card**. Inline links use `{colors.primary-on-dark}` (Sky Link Blue #2997ff).

### 4. Utility Cards & Interactive Controls

**`store-utility-card` (Skill Card)**  
- Used in the 15-Skill Catalog Grid.
- Background: `{colors.canvas}` (#ffffff), border: `1px solid {colors.hairline}`, shape: `{rounded.lg}` (18px), padding: `{spacing.lg}` (24px).
- Top: Monospace slash command badge (`/to-spec`, `/to-plan`) in `{typography.code-pill}`.
- Middle: Title in `{typography.body-strong}` (17px / 600) + concise Pólya heuristic description.
- Bottom: Output artifact link in `{colors.primary}`.

**`configurator-option-chip` (Platform Selector)**  
- Pill-shaped tappable chip for selecting target AI platforms (Copilot, Antigravity, Cursor, Claude Code, Codex, Pi).
- Background: `{colors.canvas}`, border: `1px solid {colors.hairline}`, shape: `{rounded.pill}`, padding: `12px 16px`.
- Selected State: Border upgrades to `2px solid {colors.primary-focus}` with background `{colors.surface-pearl}`.

**`floating-sticky-bar`**  
- Pinned to bottom of viewport during scroll.
- Background: `{colors.canvas-parchment}` at 80% opacity with backdrop-filter blur. Height: `64px`.
- Left: Command snippet `npx skills add GulajavaMinistudio/polya-sdlc-coder` in `{typography.code-default}`.
- Right: Primary CTA `{component.button-primary}` ("Copy Command").

**`search-input`**  
- Pill-shaped interactive search bar for filtering the 15 skills.
- Background: `{colors.canvas}`, border: `1px solid rgba(0, 0, 0, 0.08)`, shape: `{rounded.pill}`, height: `44px`, padding: `12px 20px`.

### 5. Scannable Footer

**`footer`**  
- Background: `{colors.canvas-parchment}` (#f5f5f7). Text: `{colors.ink-muted-80}` (#333333).
- Vertical padding: `64px`.
- Link Columns: Displayed in `{typography.dense-link}` (17px / 400 / 2.41 line-height). Relaxed leading makes the multi-column directory effortlessly scannable.
- Bottom Row: Fine-print legal notices and George Pólya's quote in `{typography.fine-print}` (12px / 400) with `{colors.ink-muted-48}` text.

---

## Do's and Don'ts

### Do
- Use `{colors.primary}` (Action Blue #0066cc) for every interactive action — links, pills, focus signals.
- Set all display headlines in Plus Jakarta Sans with negative letter-spacing (`-0.28px` to `-0.374px`) for the tight cadence.
- Set body copy at `{typography.body}` (17px / 400 / 1.47 / -0.374px) — never 16px.
- Alternate `{component.product-tile-light}` and `{component.product-tile-dark}` edge-to-edge. The background color change is the divider.
- Reserve `{rounded.pill}` for action buttons, option chips, and search inputs.
- Apply the single product shadow (`rgba(0, 0, 0, 0.22) 3px 5px 30px`) only to resting diagrams and terminal cards.
- Apply `transform: scale(0.95)` on active press across all buttons and chips.
- Keep `global-nav` pure black (`#000000`) at `44px` height.

### Don't
- Don't introduce a second accent color; Action Blue carries all interactive meaning.
- Don't add shadows to cards, buttons, or text.
- Don't use decorative gradient backgrounds; atmosphere comes from typography and diagram contrast.
- Don't use weight 500 in copy; the ladder is strictly `300 / 400 / 600 / 700`.
- Don't round full-bleed section tiles; tiles are rectangular and touch edges.
- Don't tighten body line-height below 1.47.
- Don't mix border radii arbitrarily: use `{rounded.sm}` for utility, `{rounded.lg}` for cards, `{rounded.pill}` for actions.
- Don't use `{colors.primary-on-dark}` (Sky Link Blue) on light surfaces.

---

## Responsive Breakpoints & Behavior

| Breakpoint | Width | Key Behaviors |
| :--- | :--- | :--- |
| **Small Phone** | $\le 419\text{px}$ | Single-column tiles; sub-nav collapses to title + primary CTA only; hero typography drops to 28px. |
| **Phone** | $420\text{px} - 640\text{px}$ | Single-column stack; diagrams scale to 80% width; hero headline drops to 34px. |
| **Large Phone** | $641\text{px} - 735\text{px}$ | Section vertical padding tightens from 80px to 48px; fine print wraps cleanly. |
| **Tablet Portrait** | $736\text{px} - 833\text{px}$ | Global nav collapses to hamburger menu; sub-nav hides category links, keeps primary CTA. |
| **Tablet Landscape**| $834\text{px} - 1023\text{px}$ | Global nav returns fully expanded; 3-column skill grids become 2-column. |
| **Small Desktop** | $1024\text{px} - 1068\text{px}$| Content uses 2/3 width with margin gutters; hero headline stays at 40px. |
| **Desktop** | $1069\text{px} - 1440\text{px}$| Full layout; 3 to 4 column skill catalog grid; 1440px content lock. |
| **Wide Desktop** | $\ge 1441\text{px}$ | Content locks at 1440px max width; side margins absorb extra width. |

### Touch Targets
- Minimum `44px × 44px`. `{component.button-primary}` measures $\sim 44\text{px} \times 100\text{px}$.
- `{component.button-icon-circular}` is exactly `44px × 44px`.

### Collapsing Strategy
- **Global Nav:** Horizontal links row on desktop ➔ collapses to monogram + hamburger at $\le 834\text{px}$.
- **Sub-Nav:** Title + category links + primary CTA ➔ title + primary CTA only on mobile.
- **Tiles:** 2-column comparison stacks collapse to 1-column at $\le 834\text{px}$.
- **Skill Grid:** 4-column (1440px) ➔ 3-column (1068px) ➔ 2-column (834px) ➔ 1-column (640px).

---

## Iteration Guide

1. Focus on **one component at a time**. Reference its token key directly (`{component.product-tile-dark}`, `{component.search-input}`).
2. Variants of an existing component (`-active`, `-focus`, `-2`, `-3`) live as separate formal entries.
3. Use `{token.refs}` everywhere — never inline raw hex values in production templates.
4. Display headlines remain weight 600 with negative tracking. Body remains 17px at 1.47 leading.
5. The single drop shadow (`rgba(0, 0, 0, 0.22) 3px 5px 30px`) is reserved exclusively for resting diagrams.
6. When in doubt about emphasis: **alternate the tile canvas** (Light ➔ Dark) before adding borders or chrome.
