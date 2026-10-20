# 🔭 Project Discovery Draft: Pólya SDLC Skills Documentation Portal (AI Hero Paradigm)

**Document Type:** Phase 0 Discovery Draft  
**Target Repository:** `GulajavaMinistudio/polya-sdlc-coder`  
**Status:** **[Draft / Under Review]**  
**Architect:** Veteran Principal Fullstack Engineer  

---
<!-- markdownlint-disable -->

## 1. Problem Statement & Business Opportunity (Getting Acquainted)

*Pólya Heuristic: Familiarity and Conception (Pólya, 1945, p. 33). Understand the problem as a whole, its primary purpose, and its overarching value.*

### 1.1 The Problem
The `polya-sdlc-coder` project provides an advanced, battle-tested agentic software development lifecycle consisting of 14 modular skills bridging George Pólya's 1945 heuristics with Robert C. Martin's Clean Architecture. Currently, these skills exist primarily as raw markdown instruction files inside `.agents/skills/` and in the repository `README.md`. 

While powerful for AI agents parsing repository files directly, human engineers, tech leads, and developers adopting agentic workflows lack a dedicated, interactive, and visually captivating documentation portal. Without a structured catalog—analogous to the industry benchmark established by Matt Pocock's **AI Hero** (`https://www.aihero.dev/skills`)—users struggle to:
1. Quickly browse and understand the full spectrum of the 14 skills across the 6 SDLC phases.
2. Filter skills by intent (Triage, Specification, Planning, Code Execution, Testing, Documentation).
3. View comprehensive, deep-dive usage instructions, inputs/outputs, and copyable prompt invocations per skill.
4. One-click copy global installation commands (`npx skills add ...`) tailored to their AI platform (Copilot, Antigravity, Cursor, Claude Code, Codex, Pi).

### 1.2 Anti-"Yes-Man" Premise Challenge & Failure Inversion
- **Problem vs. Solution:** The user requests a documentation portal matching the AI Hero catalog style using multi-page HTML inside `doc-pages/`. Is multi-page HTML necessary, or does it risk massive duplication of headers, navigations, and styling across 14+ HTML files?
- **Inversion ("Why Might This Fail?"):**
  1. *Content Drift Failure:* If 14 separate static HTML files are hand-coded, any update to a `SKILL.md` (new prompt parameter, changed invariant, or new template path) will immediately cause the web documentation to drift and lie to users.
  2. *Maintenance Overhead:* Hand-crafting 14+ individual multi-page HTML files with identical 44px global navigation, 52px frosted sub-nav, search bars, and footer strips leads to high boilerplate and painful site-wide edits.
- **Simpler Alternative (The 20/80 Rule):**
  Maintain a zero-build, static architecture while utilizing a clean decoupled approach:
  - An interactive, instant-filter catalog home page (`doc-pages/index.html`) featuring search, phase filters, platform configurator, and responsive skill cards.
  - Dedicated deep-dive skill detail pages (`doc-pages/skills/{slug}.html`) that share a unified design token stylesheet (`doc-pages/css/style.css`) and script (`doc-pages/js/main.js`).
  - An optional lightweight markdown-to-html generator script or structured data manifest (`doc-pages/data/skills.json`) to prevent manual copy-paste drift and ensure 100% synchronization with the source `SKILL.md` files.

### 1.3 Target Personas & Users
- **AI Coding Engineers:** Seeking quick command references (`/to-spec`, `/to-plan`) and copyable prompt snippets.
- **Principal Architects & Team Leads:** Evaluating Pólya SDLC's governance, Clean Architecture enforcement, and anti-cheat floor guards.
- **Open-Source Contributors:** Reading deep-dive specifications on each skill's invariants, inputs, and outputs.

---

## 2. The Unknown, Known Data, and Operational Bounds

*Pólya Heuristic: Isolate the principal parts of the problem: What is the unknown? What are the data? What is the condition?*

| Element | Description |
| :--- | :--- |
| **The Unknown** | A production-grade, zero-build, multi-page static web documentation portal inside `doc-pages/` that mirrors the presentation and content depth of AI Hero (`https://www.aihero.dev/skills`), adheres strictly to the Apple-inspired design system in `DESIGN.md`, and documents all 14 modular skills. |
| **Known Data** | 1. **Design System:** [`DESIGN.md:1-318`](file:///d:/WebstormProject/polya-sdlc-coder/DESIGN.md) (tokens, colors, typography, layout, components).<br>2. **Product Context:** [`PRODUCT.md:1-82`](file:///d:/WebstormProject/polya-sdlc-coder/PRODUCT.md) (zero-build constraint, vanilla stack, target users, GitHub Pages deployment).<br>3. **Skill Source Code:** 14 modular skill files in [`.agents/skills/`](file:///d:/WebstormProject/polya-sdlc-coder/.agents/skills) + `impeccable` + `to-shared`.<br>4. **Starter Files:** Empty [`doc-pages/index.html`](file:///d:/WebstormProject/polya-sdlc-coder/doc-pages/index.html).<br>5. **Prior Art:** AI Hero skills catalog pattern (`aihero.dev/skills`). |
| **The Conditions & Invariants** | 1. **Zero-Build Architecture:** Pure Semantic HTML5, Modern CSS, and Vanilla JavaScript. No Node.js build pipeline or npm runtime dependencies required to serve the site (`PRODUCT.md:12`).<br>2. **Design System Fidelity:** Strict adherence to `DESIGN.md`: Action Blue (`#0066cc`), Plus Jakarta Sans headlines with negative tracking, Inter at 17px/1.47 leading, JetBrains Mono code tags, 44px pure black global nav, 52px frosted sub-nav, and `transform: scale(0.95)` on press.<br>3. **Accessibility:** WCAG 2.1 AA compliant, $\ge 4.5:1$ contrast ratio, full keyboard navigation, visible focus rings (`PRODUCT.md:79-82`).<br>4. **Deployment:** Must run flawlessly from GitHub Pages root or sub-path (`PRODUCT.md:38`). |

---

## 3. Codebase Exploration & Architectural Critique

*Pólya Heuristic: Decomposing and Recombining (p. 75) & Analogy (p. 37). Examine existing components, critique architectural debt, and look for analogous solutions.*

### 3.1 Existing Topography Analysis

- **Web Documentation Root (`doc-pages/`):**
  - [VERIFIED: `doc-pages/index.html:1`]: Currently an empty 0-byte file.
  - No subdirectories for CSS, JS, assets, or individual skill subpages exist yet.
- **Design System Blueprint (`DESIGN.md`):**
  - [VERIFIED: `DESIGN.md:7-14`]: Defines the Apple-inspired web design philosophy—reverent product presentation, alternating light/dark tiles, tight utility card grid (`{rounded.lg}` / 18px), and single interactive Action Blue (`#0066cc`).
  - [VERIFIED: `DESIGN.md:71-75`]: Typography loaded via Google Fonts CDN (`Plus Jakarta Sans:600,700,800`, `Inter:400,500,600`, `JetBrains Mono:400,500,600`).
  - [VERIFIED: `DESIGN.md:179-191`]: Two-row navigation structure: 44px pure black `{component.global-nav}` + 52px `{component.sub-nav-frosted}`.
  - [VERIFIED: `DESIGN.md:230-236`]: Skill Catalog Card (`store-utility-card`) token specifications.
- **Product Stack Constraint (`PRODUCT.md`):**
  - [VERIFIED: `PRODUCT.md:12`]: Explicitly mandates: *"Semantic HTML5, Modern CSS (CSS Custom Properties mapping 1:1 to tokens in DESIGN.md), Vanilla JavaScript... Zero-build, zero external npm dependencies, instant first paint, designed for direct deployment to GitHub Pages."*
- **Skill Sources (`.agents/skills/`):**
  - [VERIFIED: `.agents/skills/`]: Contains 14 distinct core skills (`to-ask-help`, `to-clarify`, `to-code`, `to-docs`, `to-explore`, `to-fix`, `to-init`, `to-map`, `to-memory`, `to-plan`, `to-prd`, `to-quick-fix`, `to-review`, `to-spec`) plus `impeccable` and `to-shared`.
- **Pre-Flight Architecture Scan:**
  - Notice: `docs/ARCHITECTURE.md` does not currently exist in the repository. As per `/to-explore` directives, we proactively propose running `/to-map` to establish the living repository architecture map.

### 3.2 Analogous Solutions & Prior Art (AI Hero vs. Pólya SDLC)

Matt Pocock's **AI Hero** (`https://www.aihero.dev/skills`) presents skills with a distinct user flow:
1. **Header & Global Install:** High-visibility banner with one-click terminal copy (`npx skills add ...`) and platform selector.
2. **Category Tabs & Search Filter:** Instant search box combined with category tabs (The Main Flow, Shaping, Engineering, Getting Started).
3. **Card Grid:** Clear card hierarchy showing command badge (`/to-spec`), short description, workflow tags, and action buttons.
4. **Deep Dive Detail:** Clicking a skill opens a comprehensive breakdown:
   - What it does & when to use it.
   - Prerequisites & input context files.
   - Exact command syntax and parameters.
   - Example prompts and real-world scenarios.
   - Handoff connections to subsequent skills.

Pólya SDLC Coder enhances this paradigm by tying each skill directly to **George Pólya's 4 Invariant Heuristic Stages** and **Uncle Bob's Clean Architecture Seams**.

---

## 4. Candidate Architectures & Trade-Off Matrix

*Pólya Heuristic: The Inventor's Paradox (p. 121) — Evaluate whether a more general architectural abstraction provides a cleaner, more maintainable solution than narrow ad-hoc modifications.*

| Dimension | Option A: Single-Page Dynamic Portal (Catalog + Modals/Drawers) | Option B: Multi-Page Static HTML with Decoupled Assets & Data Manifest [RECOMMENDED] | Option C: Static Site Generator (Astro / VitePress / Starlight) |
| :--- | :--- | :--- | :--- |
| **Summary** | Single `index.html` file where clicking a skill opens a sliding drawer or modal with deep-dive documentation. | Multi-page static structure: `index.html` (hub catalog) + `skills/{slug}.html` (14 dedicated deep-dive pages) sharing `css/style.css` and `js/main.js`. | Introduce Astro or VitePress build pipeline to compile markdown into multi-page static site. |
| **Stack & Runtime** | Vanilla HTML, CSS, JS. Zero build. | Vanilla HTML, CSS, JS. Zero build. | Requires Node.js, `package.json`, build scripts, CI pipelines. |
| **SEO & Deep-Linking** | ❌ Weak (modals lack clean URLs, bookmarking, and native history). | ✅ **Optimal** (every skill has a canonical URL, e.g. `doc-pages/skills/to-spec.html`). | ✅ Optimal. |
| **Design System Fidelity** | ✅ Full control over CSS tokens in `DESIGN.md`. | ✅ **Full control over CSS tokens in `DESIGN.md`**. | ⚠️ Requires overriding framework themes to match `DESIGN.md`. |
| **Product Constraint Compliance** | ✅ Complies with zero-build mandate. | ✅ **100% compliant with `PRODUCT.md:12` (zero-build, GitHub Pages native)**. | ❌ Violates zero-build mandate in `PRODUCT.md:12`. |
| **Maintainability** | ⚠️ High DOM density in a single file. | ✅ **Clean separation of concerns: Hub catalog vs. deep-dive reference pages**. | ✅ High, but operational overhead. |
| **Recommendation** | Alternative | **[RECOMMENDED]** | [Rejected - Violates Constraints] |

---

## 5. Technical Feasibility Spikes & Architecture Blueprint

*Pólya Heuristic: Auxiliary Problem (p. 50). Can we introduce an easier, temporary stepping stone or prototype to resolve high-risk unknowns?*

### 5.1 Proposed Multi-Page Directory Topography

```text
doc-pages/
├── index.html                   # Main Showcase & Skills Catalog (Hero, Search, Phase Filter, Cards)
├── css/
│   ├── design-tokens.css        # 1:1 CSS Variables mapped from DESIGN.md (colors, typography, spacing)
│   ├── components.css           # Nav, cards, pills, search input, tiles, footer
│   └── responsive.css           # Media queries (320px, 420px, 736px, 834px, 1068px, 1440px)
├── js/
│   ├── main.js                  # Global nav, smooth scroll, copy-to-clipboard micro-interactions
│   ├── catalog.js               # Search query filtering, category pills, platform chips
│   └── skills-data.js           # Declarative JSON/JS data manifest for skills metadata
├── skills/                      # 14 Dedicated Skill Detail Pages
│   ├── to-ask-help.html
│   ├── to-clarify.html
│   ├── to-code.html
│   ├── to-docs.html
│   ├── to-explore.html
│   ├── to-fix.html
│   ├── to-init.html
│   ├── to-map.html
│   ├── to-memory.html
│   ├── to-plan.html
│   ├── to-prd.html
│   ├── to-quick-fix.html
│   ├── to-review.html
│   └── to-spec.html
└── assets/                      # Diagrams, logos, screenshots
```

### 5.2 Key Functional Components to Architect

1. **Top Navigation Seam:**
   - 44px `{component.global-nav}` in `#000000` with monogram (`∑⚡`), breadcrumbs, GitHub link, and quick install CTA.
   - 52px `{component.sub-nav-frosted}` with `backdrop-filter: saturate(180%) blur(20px)` featuring active phase links and instant platform selector.
2. **Hero & Quick Configurator (AI Hero Pattern):**
   - Tile headline in Plus Jakarta Sans 56px (`{typography.hero-display}`).
   - Interactive platform switcher chips (`configurator-option-chip`): Copilot | Antigravity | Cursor | Claude Code | Codex | Pi.
   - Command snippet bar with instant copy and `transform: scale(0.95)` feedback.
3. **Interactive Catalog Grid:**
   - Live search input (`search-input`) with debounced instantaneous client-side filtering.
   - Phase filter pills: All (14), Phase 0 (Discovery), Phase 1 (Spec & Clarify), Phase 2 (Plan & Gate), Phase 3 (Code), Phase 4 (Review), Phase 5 (Fix), Phase 6 (Docs), Utilities.
   - Responsive cards (`store-utility-card`) with 18px radius, 1px hairline border, monospace command badge, Pólya stage, description, and "View Skill Details ➔" link.
4. **Skill Deep-Dive Page Template (`skills/{slug}.html`):**
   - Skill Banner: Monospace slash command, phase tag, and canonical Pólya quote.
   - Problem Triad Table: Unknown, Known Data, Condition.
   - When to Use & When NOT to Use (strict boundary guidance).
   - Step-by-Step Execution Protocol.
   - Example Prompt Invocations with copy buttons.
   - Upstream Prerequisites & Downstream Handoff links.
5. **Scannable Footer:**
   - 4-column directory in `{typography.dense-link}` (17px / 400 / 2.41 line-height).

---

## 6. Strategic Recommendation & Handoff to Specification

### 6.1 Selected Architectural Path
We recommend **Option B: Multi-Page Static HTML with Decoupled CSS/JS and Declarative Skills Manifest**.
- Adheres 100% to the project's zero-build mandate (`PRODUCT.md:12`).
- Satisfies the user's explicit preference for a multi-page HTML architecture.
- Recreates the polished catalog UX of AI Hero (`aihero.dev/skills`) while maintaining the bespoke Apple engineering aesthetic formulated in `DESIGN.md`.
- Provides unique, bookmarkable URLs for every skill (`doc-pages/skills/to-spec.html`), improving developer productivity.

### 6.2 Domain Vocabulary Candidates (`CONTEXT.md`)
- `Skill Catalog Hub`: The root showcase page (`doc-pages/index.html`) providing search, filtering, and platform configurator.
- `Skill Detail View`: Dedicated static HTML page for an individual skill containing deep-dive operational instructions and examples.
- `Platform Configurator`: Chip-based selector dynamically swapping install commands for Copilot, Antigravity, Cursor, Claude Code, etc.
- `Problem Triad Box`: Visual card summarizing Unknown, Data, and Condition for each skill.

### 6.3 Downstream Readiness Checklist
- [x] **The Unknown:** Fully specified (multi-page static documentation portal in `doc-pages/` inspired by AI Hero and governed by `DESIGN.md`).
- [x] **The Data:** Identified (14 skill source files in `.agents/skills/`, `DESIGN.md`, `PRODUCT.md`, `README.md`).
- [x] **The Condition:** Bound (zero-build vanilla stack, GitHub Pages compatibility, WCAG 2.1 AA, strict design tokens).
- [x] **Clean Architecture Seams:** Decoupled layout (Nav/Sub-nav, Catalog Filter Engine, Skill Detail Pages, Shared Token CSS).
- [x] **Risks & Anti-Drift:** Mitigated via declarative data manifest (`skills-data.js`) powering catalog search and metadata.

### 6.4 Forking Handoff Actions
Choose the downstream path matching your project's workflow:

- **Path A (Optional Product Requirements — User Stories & SMART AC):**
  ```text
  /to-prd @docs/discovery/skills-documentation-portal-discovery.md Formulate Product Requirements Document (PRD) detailing user stories and acceptance criteria.
  ```

- **Path B (Direct Technical Specification — Fast-Track Blueprint) [Recommended]:**
  ```text
  /to-spec @docs/discovery/skills-documentation-portal-discovery.md Formulate formal technical specification, HTML page seams, CSS token mappings, and DOM contracts.
  ```
