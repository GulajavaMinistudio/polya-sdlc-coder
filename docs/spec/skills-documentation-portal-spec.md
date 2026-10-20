---
title: "Technical Specification: Pólya SDLC Skills Documentation Portal (doc-pages/)"
version: "1.0.0"
date_created: "2026-10-20"
last_updated: "2026-10-20"
status: "Draft"
prd_ref: "docs/discovery/skills-documentation-portal-discovery.md"
tags: ["polya", "spec", "clean-architecture", "vanilla-web", "impeccable"]
---
<!-- markdownlint-disable -->

# Technical Specification: Pólya SDLC Skills Documentation Portal (`doc-pages/`)

## 1. Pólya Phase 1: Understanding the Problem

### 1.1 The Unknown (Goal & Desired State)
A zero-build, multi-page web showcase and skill documentation portal hosted in [`doc-pages/`](file:///d:/WebstormProject/polya-sdlc-coder/doc-pages) that:
1. Features a modern, high-craft hub catalog (`doc-pages/index.html`) inspired by Matt Pocock's **AI Hero** (`aihero.dev/skills`), providing instant client-side search, phase-based filtering, platform configurator chips, and responsive skill cards.
2. Provides 14 dedicated, deep-dive static HTML documentation pages (`doc-pages/skills/{slug}.html`) documenting strictly the 14 core Pólya SDLC skills with complete operational instructions, problem triad breakdowns, prompt templates, and handoff links.
3. Implements 100% of the design system specifications in [`DESIGN.md:1-318`](file:///d:/WebstormProject/polya-sdlc-coder/DESIGN.md) (Apple aesthetic, Plus Jakarta Sans display typography, Inter 17px body copy, JetBrains Mono monospace code tags, Action Blue `#0066cc`, pure black 44px global nav, 52px frosted sub-nav, and whisper-soft product shadows).
4. Maintains zero-build, zero external npm runtime dependencies, ensuring instant first paint when deployed directly to GitHub Pages (`PRODUCT.md:11-13`).

**Explicit Non-Goals (Out of Scope):**
- **NG-001:** No server-side rendering (SSR), Node.js runtime servers, or backend APIs.
- **NG-002:** No frontend frameworks or build steps (e.g., No React, Vue, Svelte, Astro, Tailwind CLI, or Webpack/Vite bundlers). The site must remain pure vanilla HTML5/CSS3/ES6.
- **NG-003:** No external web fonts beyond Google Fonts CDN (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`).
- **NG-004:** Auxiliary skills outside the core Pólya SDLC lifecycle (e.g., `impeccable`) are explicitly excluded from the public documentation catalog to maintain strict 1:1 focus on the 6-phase engineering lifecycle.

### 1.2 The Data (Inputs, State & Source-Grounded Context)
- **Design Tokens:** [`DESIGN.md:27-118`](file:///d:/WebstormProject/polya-sdlc-coder/DESIGN.md#L27-L118) defining colors (`{colors.primary}` `#0066cc`, `{colors.surface-tile-1}` `#272729`, `{colors.canvas-parchment}` `#f5f5f7`), typography hierarchies, and border-radii (`{rounded.lg}` 18px, `{rounded.pill}` 9999px).
- **Component Grammars:** [`DESIGN.md:175-260`](file:///d:/WebstormProject/polya-sdlc-coder/DESIGN.md#L175-L260) (`global-nav`, `sub-nav-frosted`, `button-primary`, `store-utility-card`, `configurator-option-chip`, `search-input`, `floating-sticky-bar`, `footer`).
- **Product Constraints:** [`PRODUCT.md:9-13`](file:///d:/WebstormProject/polya-sdlc-coder/PRODUCT.md#L9-L13) and [`PRODUCT.md:78-82`](file:///d:/WebstormProject/polya-sdlc-coder/PRODUCT.md#L78-L82) (WCAG 2.1 AA, zero npm dependencies, GitHub Pages compatibility).
- **Skill Source Manifests:** 14 core skills in [`.agents/skills/`](file:///d:/WebstormProject/polya-sdlc-coder/.agents/skills):
  - `to-ask-help`, `to-explore`, `to-prd`, `to-spec`, `to-clarify`, `to-plan`, `to-code`, `to-review`, `to-fix`, `to-docs`, `to-quick-fix`, `to-map`, `to-memory`, `to-init`.
- **Target File Topography:** Starter file [`doc-pages/index.html`](file:///d:/WebstormProject/polya-sdlc-coder/doc-pages/index.html).

### 1.3 The Condition (Requirements, Constraints & Invariants)

#### Functional Requirements (REQ)
- **REQ-001 (Two-Row Navigation Seam):** The portal MUST implement a persistent 44px pure black global nav (`#000000`) and a 52px frosted sub-nav (`rgba(245, 245, 247, 0.8)` with `backdrop-filter: saturate(180%) blur(20px)`) across all pages (`doc-pages/index.html` and all `doc-pages/skills/{slug}.html`).
- **REQ-002 (Platform Configurator Chip Seam):** The catalog hub MUST provide interactive capsule chips for target AI platforms (GitHub Copilot, Google Antigravity, Cursor, Claude Code, Codex, Pi Dev). Selecting a platform dynamically updates the primary terminal install snippet (`npx skills add GulajavaMinistudio/polya-sdlc-coder -y`).
- **REQ-003 (Instant Search & Phase Filter Engine):** The catalog hub MUST feature a client-side search input and 8 phase category chips (*All*, *Discovery*, *Specification*, *Planning & Gate*, *Code Execution*, *Review & Audit*, *Bug Remediation*, *Documentation & Utilities*). The search engine MUST perform case-insensitive substring matching across `command`, `name`, `description`, and `tags` using `String.prototype.includes()` (guaranteeing zero ReDoS or regex injection vulnerabilities) with an 80ms trailing debounce on `input` events, executing in < 16ms ($\ge 60\text{fps}$).
- **REQ-004 (AI Hero Skill Card Grid):** The catalog hub MUST render all 14 skills using `store-utility-card` specifications (`18px` border radius, `1px` hairline border, monospace command badge, Pólya stage indicator, concise description, and deep-dive detail link).
- **REQ-005 (14 Dedicated Skill Detail Pages):** Each of the 14 core skills in `.agents/skills/` MUST have a dedicated static HTML page in `doc-pages/skills/{slug}.html`.
- **REQ-006 (One-Click Copy with Micro-Interaction):** Every code block, command snippet, and prompt template MUST provide an interactive copy button triggering `transform: scale(0.95)` and visual confirmation ("Copied!").
- **REQ-007 (Sticky Command Bar):** `doc-pages/index.html` MUST include a floating sticky footer bar with the global install command and instant copy CTA on scroll.
- **REQ-008 (Scannable Footer):** All pages MUST feature the 4-column directory footer styled in `{typography.dense-link}` (17px / 400 / 2.41 line-height) and George Pólya's canonical 1945 quote.
- **REQ-009 (Full ARIA & Accessibility Semantics):** All interactive components MUST implement WAI-ARIA standards:
  - Search container must use `role="search"`.
  - Search input must have `aria-label="Search skills by command or keyword"`.
  - Filter counter `#results-count` must carry `aria-live="polite"` so screen readers announce dynamic count updates.
  - Mobile navigation toggle button `#nav-toggle` must carry `aria-expanded="false"` (dynamically toggled to `"true"`) and `aria-controls="global-nav-links"`.
  - All interactive elements must maintain a high-contrast focus ring (`2px solid #0071e3` with 2px offset).
- **REQ-010 (Standardized Skill Detail Page Blueprint):** Every `doc-pages/skills/{slug}.html` page MUST implement the uniform 8-section layout:
  1. *Two-Row Navigation:* 44px pure black global nav + 52px frosted sub-nav with breadcrumb trail (`Home / Skills / {command}`).
  2. *Hero Banner:* Slash command badge (`JetBrains Mono`), phase badge, and canonical Pólya quote.
  3. *Quick Invocation Box:* Monospace copyable prompt example with clipboard button.
  4. *Problem Triad Card:* Visual matrix for The Unknown, The Data, and The Condition.
  5. *Operational Lifecycle Workflow:* Chronological execution steps.
  6. *Context & Artifacts Matrix:* Table of prerequisite files and generated output paths.
  7. *Governance & Floor-Guard Invariants:* Anti-cheat bans, pushback triggers, and quality ratchets.
  8. *Handoff Breadcrumbs:* Navigation links to upstream and downstream phases (`Previous Phase ➔ Next Phase`).

#### Constraints & Quality Ratchets (CON)
- **CON-001 (Zero-Build Static Architecture):** Pure HTML5, CSS3, and ES6. No compilation or package manager required to view or deploy (`PRODUCT.md:12`).
- **CON-002 (Design Token Strictness):** All CSS styling MUST map directly to the tokens declared in `DESIGN.md`. Zero arbitrary hex codes outside `design-tokens.css`.
- **CON-003 (Typography & Fonts):** Fonts loaded via Google Fonts CDN using preconnect and `font-display: swap` (`Plus Jakarta Sans:600,700,800`, `Inter:400,500,600`, `JetBrains Mono:400,500,600`).
- **CON-004 (Accessibility Compliance):** WCAG 2.1 AA compliant. Minimum text contrast ratio $\ge 4.5:1$, visible focus rings (`2px solid #0071e3`), semantic `<nav>`, `<main>`, `<article>`, `<section>`, and `<header>` elements.
- **CON-005 (Responsive Breakpoints):** Fully responsive from 320px mobile up to 1440px+ wide screens per `DESIGN.md:287-298`.

### 1.4 Condition Sanity Check & Completeness Audit (Pólya, p. 7, 33)
- **Is the condition sufficient to determine the unknown?** Yes. All 14 skills, design system tokens, typography rules, layout dimensions, and component grammars are fully defined.
- **Is it insufficient?** No missing inputs. All skill data is extractable from `.agents/skills/`.
- **Is it redundant or contradictory?** No contradictions. Option 1 (Multi-Page Static HTML) cleanly separates hub catalog concerns from deep-dive reference reading.
- **Did you use ALL the data?** Yes. 14 skills, `DESIGN.md`, `PRODUCT.md`, and AI Hero reference patterns are integrated.
- **Did you use the WHOLE condition?** Yes. Zero-build constraints, WCAG AA accessibility, and responsive breakpoints are enforced.

### 1.5 Indirect Proof & Negative Invariant Analysis (Pólya, p. 162–171)
- **Negative Hypothesis 1 (Script Failure):** What happens if JavaScript is disabled in the user's browser?
  - *Proof & Barrier:* Because the architecture is multi-page static HTML, all 14 skill pages remain 100% accessible via direct hyperlink navigation even with JS disabled. Only dynamic live search and platform switching require JS.
- **Negative Hypothesis 2 (Missing Asset / Offline CDN):** What happens if Google Fonts fails to load?
  - *Proof & Barrier:* `design-tokens.css` includes strict fallback font stacks: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif` and `'JetBrains Mono', monospace`. The layout never shifts or breaks.
- **Negative Hypothesis 3 (Search Returns Zero Results):** What happens if a user types an unknown query like `"xyz"` in the catalog search bar?
  - *Proof & Barrier:* The catalog search engine MUST handle the `Empty` state gracefully, rendering a clean empty state card with a "Clear Search" button instead of a blank container.

---

## 2. Ubiquitous Language & Domain Glossary (`CONTEXT.md`)

- **Skill Catalog Hub:** The central landing page (`doc-pages/index.html`) providing search, phase filtering, platform switching, and the 14-skill grid.  
  _Avoid:_ Home page, Skills list, Skill dashboard.
- **Skill Detail Page:** A dedicated static HTML page (`doc-pages/skills/{slug}.html`) containing exhaustive technical documentation, problem triads, and prompts for a single skill.  
  _Avoid:_ Modal, Popover, Sub-view.
- **Platform Configurator:** The interactive chip selector allowing developers to toggle between AI hosts (Copilot, Antigravity, Cursor, Claude Code, Codex, Pi).  
  _Avoid:_ Tool switcher, Agent picker.
- **Problem Triad Card:** A visual documentation component deconstructing a skill into *The Unknown*, *The Data*, and *The Condition*.  
  _Avoid:_ Requirements box, Spec overview.
- **The Pause Rule Banner:** The prominent, red-accented visual gate component representing the mandatory halt in the SDLC pipeline.  
  _Avoid:_ Stop button, Confirmation modal.

---

## 3. Assumptions & Open Clarifications

> [!WARNING] [ASSUMPTION-001]: Relative Path Navigation  
> *Description:* All relative links between `doc-pages/index.html` and `doc-pages/skills/{slug}.html` will use standard relative paths (e.g. `href="skills/to-spec.html"` and `href="../index.html"`), ensuring the site runs identically whether served via `http://localhost`, a local file system (`file://`), or a GitHub Pages subfolder (`/polya-sdlc-coder/`).  
> *Risk / Trade-off:* Clean relative paths avoid any hardcoded domain assumptions.  
> *Proposed Verification:* Verify local browser opening and web server hosting.

> [!WARNING] [ASSUMPTION-002]: Declarative Data Manifest Synchronization  
> *Description:* A single JavaScript file (`doc-pages/js/skills-data.js`) will serve as the single source of truth for skill card metadata on `doc-pages/index.html`. Skill detail pages will be pre-rendered semantic HTML containing rich markdown-equivalent layouts.  
> *Risk / Trade-off:* Guarantees lightning-fast instant search on the catalog without needing runtime fetch requests.  
> *Proposed Verification:* Ensure all 14 skills match their respective `.agents/skills/*/SKILL.md` definitions.

---

## 4. Architecture, Notation & Data Contracts

### 4.1 Declarative Data Manifest Contract (`doc-pages/js/skills-data.js`)

```typescript
export interface SkillMetadata {
  readonly slug: string;              // e.g. "to-spec"
  readonly command: string;           // e.g. "/to-spec"
  readonly name: string;              // e.g. "Specification & Seams"
  readonly phase: string;             // e.g. "Phase 1: Understanding"
  readonly phaseCategory:             // Matches filter chip value
    | "discovery"
    | "specification"
    | "planning"
    | "code"
    | "review"
    | "fix"
    | "docs"
    | "utility";
  readonly polyaStage: string;        // e.g. "1. Understand the Problem"
  readonly tagline: string;           // Concise headline
  readonly description: string;       // 1-2 sentence core heuristic
  readonly inputs: readonly string[]; // Required context files
  readonly outputs: readonly string[];// Output artifacts generated
  readonly detailUrl: string;         // Relative URL: "skills/to-spec.html"
  readonly tags: readonly string[];   // Search keywords
}

export interface PlatformConfig {
  readonly id: string;                // e.g. "copilot", "antigravity", "cursor"
  readonly name: string;              // e.g. "GitHub Copilot"
  readonly installCommand: string;    // e.g. "npx skills add GulajavaMinistudio/polya-sdlc-coder -y"
  readonly configDirectory: string;   // e.g. ".github/", ".agents/", ".cursor/"
  readonly notes: string;             // Quick platform tip
}
```

### 4.2 File & Directory Structure

```text
doc-pages/
├── index.html                   # Catalog Hub (Hero, Configurator, Search, Filter Pills, Card Grid)
├── css/
│   ├── design-tokens.css        # 1:1 CSS Variables from DESIGN.md (colors, typography, radii, elevation)
│   ├── components.css           # Nav, cards, buttons, chips, search input, footer, code blocks
│   └── responsive.css           # Media queries across 8 Apple breakpoints (320px - 1440px+)
├── js/
│   ├── skills-data.js           # Single Source of Truth for 14 core skills array & platform configs
│   ├── catalog.js               # Search query engine (80ms debounce), category chip filtering, platform switcher
│   └── main.js                  # Global copy-to-clipboard, mobile nav drawer toggle, sticky bar
└── skills/                      # 14 Dedicated Static HTML Skill Detail Pages
    ├── to-ask-help.html
    ├── to-clarify.html
    ├── to-code.html
    ├── to-docs.html
    ├── to-explore.html
    ├── to-fix.html
    ├── to-init.html
    ├── to-map.html
    ├── to-memory.html
    ├── to-plan.html
    ├── to-prd.html
    ├── to-quick-fix.html
    ├── to-review.html
    └── to-spec.html
```

### 4.3 The 5 UI States Matrix (Catalog Hub & Search Engine)

| UI State | Trigger / Condition | Visual Behavior & User Recovery Action |
| :--- | :--- | :--- |
| **1. Loading** | Initial DOM rendering / font preconnection | Zero skeleton flash; vanilla static HTML renders instantly. Google Fonts swap asynchronously without blocking text visibility. |
| **2. Empty** | Search query yields 0 matching skills (e.g. `"quantum"`) | Displays clean Empty State card in `{colors.canvas-parchment}`: `"No skills match '{query}'"`. Provides a primary Action Blue CTA button: `"Reset Filters"`. |
| **3. Error** | Clipboard copy API blocked / unsupported in browser | Gracefully falls back to `document.execCommand('copy')` or highlights the text snippet with instruction: `"Press Ctrl+C to copy"`. |
| **4. Partial** | Filter chip selected (e.g. "Phase 1: Spec & Clarify") | Grid smoothly re-renders showing only the matching subset (2 skills) with an active count badge: `"Showing 2 of 14 skills"`. |
| **5. Populated** | Default view / "All" selected | Full grid displays all 14 skills sorted chronologically by SDLC lifecycle order (Phase 0 ➔ Phase 6 + Utilities). |

---

## 5. Clean Architecture Seams & Component Boundaries

```text
┌────────────────────────────────────────────────────────────────────────┐
│ DOMAIN & DATA SEAM (doc-pages/js/skills-data.js)                       │
│ └── Immutable skills manifest, phase taxonomy, platform install tables │
├────────────────────────────────────────────────────────────────────────┤
│ USE CASE & FILTER SEAM (doc-pages/js/catalog.js)                       │
│ └── Search query tokenization, multi-tag filtering, active chip state  │
├────────────────────────────────────────────────────────────────────────┤
│ INTERFACE ADAPTER SEAM (doc-pages/js/main.js & DOM Controllers)        │
│ └── Clipboard writeText adapter, mobile menu controller, scroll watcher│
├────────────────────────────────────────────────────────────────────────┤
│ PRESENTATION / FRAMEWORK SEAM (Vanilla HTML5 / Modern CSS3)             │
│ ├── doc-pages/css/design-tokens.css  (DESIGN.md tokens 1:1)            │
│ ├── doc-pages/css/components.css     (Apple nav, cards, pills)         │
│ ├── doc-pages/css/responsive.css     (Breakpoints 320px - 1440px)      │
│ └── doc-pages/index.html & doc-pages/skills/*.html (Static Markup)     │
└────────────────────────────────────────────────────────────────────────┘
```

- **Domain Layer (`skills-data.js`):** Independent data structure defining each skill's identity, inputs, outputs, and canonical heuristics.
- **Application / Use Case Layer (`catalog.js`):** Pure functional filtering functions taking `(skills, query, category)` and returning the filtered array.
- **Adapter Layer (`main.js`):** Browser API wrappers (Clipboard, LocalStorage for theme/platform preference, Window scroll event throttling).
- **Presentation Layer (`doc-pages/**/*.html`, `doc-pages/css/*.css`):** Zero framework markup adhering strictly to `DESIGN.md`.

---

## 6. Acceptance Criteria (Given-When-Then)

- **AC-001 (Catalog Hub Initial Render - REQ-001, REQ-004, REQ-009):**  
  *Given* a user navigates to `doc-pages/index.html`,  
  *When* the page loads,  
  *Then* the 44px pure black global nav, 52px frosted sub-nav, Hero section, platform configurator, search bar, and all 14 skill cards are visible, semantic, and correctly styled per `DESIGN.md`.

- **AC-002 (Platform Configurator Switching - REQ-002):**  
  *Given* the user is viewing the platform configurator chips,  
  *When* the user clicks the "Cursor" platform chip,  
  *Then* the "Cursor" chip receives the active border ring (`2px solid #0071e3`), and the terminal install command snippet immediately updates to the Cursor target syntax.

- **AC-003 (Instant Search Filtering - REQ-003):**  
  *Given* the user is viewing all 14 skills,  
  *When* the user types `"spec"` into the search input,  
  *Then* the card grid instantly filters down to matching skills (`/to-spec`, `/to-clarify`), updating the `#results-count` counter within 16ms without a page reload.

- **AC-004 (Phase Category Filtering - REQ-003):**  
  *Given* the user clicks the "Phase 3: Code" category pill,  
  *When* the filter executes,  
  *Then* only `/to-code` and `/to-quick-fix` are shown in the grid, and all other cards are hidden.

- **AC-005 (Empty Search Recovery - REQ-003, AC-003):**  
  *Given* the user types `"nonexistent-skill"` into search,  
  *When* 0 cards match,  
  *Then* the empty state banner is displayed with a "Reset Filters" button, which clears the query and restores all 14 cards upon click.

- **AC-006 (One-Click Clipboard Copy - REQ-006):**  
  *Given* any code snippet or install command with a copy button,  
  *When* the user clicks the copy button,  
  *Then* the text is copied to the system clipboard, the button applies `transform: scale(0.95)`, and the label changes to "Copied!" for 2000ms.

- **AC-007 (Skill Detail Page Deep-Dive - REQ-005, REQ-010):**  
  *Given* a user clicks "View Skill Details ➔" on the `/to-spec` card,  
  *When* navigation completes to `skills/to-spec.html`,  
  *Then* the page displays the full 8-section layout (Problem Triad, execution workflow, copyable prompt templates, prerequisites/outputs table, and bidirectional handoffs).

- **AC-008 (Responsive Navigation Collapse - CON-005, REQ-009):**  
  *Given* the viewport width is resized to $\le 834\text{px}$,  
  *When* viewing the top navigation,  
  *Then* the global nav links collapse into a hamburger menu button with `aria-expanded="false"`, and the skill grid transforms from 4 columns to 2 columns (or 1 column at $\le 640\text{px}$).

- **AC-009 (Safe Substring Search Tokenization - REQ-003):**  
  *Given* a user enters special punctuation characters (e.g. `/*+?[]`) into the search input,  
  *When* the search filter evaluates via `String.prototype.includes()`,  
  *Then* the engine performs safe string containment without throwing regex syntax exceptions or triggering ReDoS.

- **AC-010 (WAI-ARIA Accessibility Announcement - REQ-009, CON-004):**  
  *Given* an assistive technology screen reader user interacting with the search bar,  
  *When* the search input changes and filters the grid from 14 to 2 skills,  
  *Then* the `#results-count` element with `aria-live="polite"` announces `"Showing 2 of 14 skills"` without moving keyboard focus.

### 6.1 Value Sourcing & Positive Input Coverage Table

| Required Output / Rendered Value | AC Ref | Named Source | Boundary / Edge Variation |
| :--- | :---: | :--- | :--- |
| `skill.command` (`/to-*`) | `AC-001`, `AC-007` | `skills-data.js` -> `SkillMetadata.command` | Monospace format in JetBrains Mono |
| `skill.phase` | `AC-001`, `AC-004` | `skills-data.js` -> `SkillMetadata.phase` | Phase 0 to Phase 6 + Utilities |
| `skill.description` | `AC-001`, `AC-007` | `skills-data.js` -> `SkillMetadata.description` | 17px Inter with -0.374px tracking |
| `platform.installCommand` | `AC-002`, `AC-006` | `skills-data.js` -> `PlatformConfig.installCommand` | Copilot, Antigravity, Cursor, Claude Code, Codex, Pi |
| Filtered skill count text | `AC-003`, `AC-004`, `AC-010` | `catalog.js` -> `filteredSkills.length` | `0` (triggers Empty State), `1..13`, `14` |
| Deep-link relative URL | `AC-007` | `skills-data.js` -> `SkillMetadata.detailUrl` | `skills/{slug}.html` with relative `../` traversal |
| Live announcement text | `AC-010` | Derived: `"Showing " + count + " of 14 skills"` | Screen reader live region (`aria-live="polite"`) |
| Toggle state attribute | `AC-008` | `main.js` -> `toggle.setAttribute('aria-expanded', state)` | `"true"` when drawer open, `"false"` when closed |

---

## 7. Testing Strategy & Verification Protocol

- **L1 Fast Lint & Token Verification (`check:fast`):**
  - Verify that `doc-pages/css/design-tokens.css` contains all 1:1 token declarations from `DESIGN.md`.
  - Validate HTML5 syntax using an HTML validator or clean linter.
- **L2 Interactive Browser & Dimension Checks:**
  - Test all 8 responsive breakpoints (320px, 420px, 641px, 736px, 834px, 1024px, 1069px, 1440px).
  - Verify keyboard accessibility (`Tab` cycles through links, chips, search input, and buttons with visible `2px solid #0071e3` focus ring).
  - Test search input edge cases: empty string, special regex characters (`/`, `*`, `+`), case insensitivity.
- **L3 Deep-Link Integrity:**
  - Verify all 14 skill cards in `doc-pages/index.html` link to valid, existing HTML files in `doc-pages/skills/`.
  - Verify all 14 skill detail pages link back to `../index.html` cleanly.

---

## 8. Architectural Decision Records (ADRs)

- [ADR-0001: Zero-Build Multi-Page Static Architecture for Documentation](docs/adr/0001-zero-build-multipage-docs.md) — Selecting pure vanilla HTML/CSS/JS with multi-page static files over SPA or external SSG frameworks to fulfill `PRODUCT.md:12` constraints and guarantee zero-maintenance GitHub Pages hosting.
