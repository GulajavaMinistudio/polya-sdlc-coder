---
goal: "Implement Pólya SDLC Skills Documentation Portal in doc-pages/ (AI Hero Paradigm)"
version: "1.1.0"
date_created: "2026-10-20"
last_updated: "2026-10-20"
status: "Completed"
spec_ref: "docs/spec/skills-documentation-portal-spec.md"
tags: ["polya", "plan", "tracer-bullets", "vertical-slicing", "vanilla-web", "impeccable", "atomic-tasks"]
---
<!-- markdownlint-disable -->

# Implementation Plan: Pólya SDLC Skills Documentation Portal (`doc-pages/`)

> [!IMPORTANT]
> **THE PAUSE RULE & VERTICAL SLICING MANDATE:**  
> All tasks in this plan are organized into **Vertical Feature Slices (Tracer Bullets)** spanning from data manifest to presentation and automated accessibility assertions. Horizontal layer-by-layer slicing and oversized tasks are strictly prohibited.  
> Execution is halted at the end of this plan for explicit user confirmation (**🛑 The Pause Rule Gate**). Application code MUST NOT be written until this plan is approved.

---

## 1. Overview & High-Level Mental Model

This plan sequences the end-to-end implementation of the zero-build, multi-page web showcase and documentation portal inside [`doc-pages/`](file:///d:/WebstormProject/polya-sdlc-coder/doc-pages), designed in the style of Matt Pocock's **AI Hero** (`aihero.dev/skills`) and governed strictly by [`DESIGN.md`](file:///d:/WebstormProject/polya-sdlc-coder/DESIGN.md).

The portal documents strictly the **14 core Pólya SDLC skills** (`/to-ask-help`, `/to-explore`, `/to-prd`, `/to-spec`, `/to-clarify`, `/to-plan`, `/to-code`, `/to-review`, `/to-fix`, `/to-docs`, `/to-quick-fix`, `/to-map`, `/to-memory`, `/to-init`).

### Topological Data Flow Diagram
```text
┌────────────────────────────────────────────────────────────────────────┐
│ DOMAIN DATA SEAM: doc-pages/js/skills-data.js                          │
│ └── 14-Skill Metadata Array + Platform Configs (Copilot, Cursor, etc.) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ APPLICATION USE CASE SEAM: doc-pages/js/catalog.js                     │
│ └── Tokenized Substring Search (< 16ms) + 8 Phase Category Filters     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ ADAPTER SEAM: doc-pages/js/main.js                                     │
│ └── Clipboard writeText Adapter + Scale(0.95) + Mobile Drawer Toggle   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PRESENTATION SEAM: Vanilla Semantic HTML5 + Modern CSS3                │
│ ├── doc-pages/css/design-tokens.css (DESIGN.md tokens 1:1)             │
│ ├── doc-pages/css/components.css    (44px nav, 52px sub-nav, cards)    │
│ ├── doc-pages/css/responsive.css    (8 Apple Breakpoints: 320px-1440px)│
│ ├── doc-pages/index.html            (Hero, Configurator, Search, Grid) │
│ └── doc-pages/skills/{slug}.html    (14 Standardized Deep-Dive Pages)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 📏 Task Sizing Matrix (Decomposed Micro-Slices)

To guarantee high attention to detail, prevent rushed documentation, and enable atomic git commits, all tasks are strictly bound to **Size XS, S, or M (1–2 files maximum)**.

| Size | Files Impacted | Scope | Example |
| :--- | :---: | :--- | :--- |
| **XS** | 1 | Single verification step, token test, or config check | Run verification checkpoint / validate CSS tokens |
| **S** | 1 | Focused single-file vertical slice | `design-tokens.css` or `to-spec.html` Golden Master |
| **M** | 2 | Small focused component pair or 2-skill content slice | `to-explore.html` + `to-prd.html` paired slice |
| **L** | 3+ | **Decomposed / Prohibited in this plan** | Split into S/M micro-tickets |
| **XL** | 8+ | **Strictly Prohibited** | Never allowed |

---

## 3. Phased Implementation Sequence (Vertical Tracer Bullets)

> **EXECUTION DIRECTIVE FOR AI AGENTS (`/to-code`):**  
> - Execute ticket by ticket. Run fast verification (`check:fast` / browser review) after each slice.  
> - Halt for explicit user confirmation at each `APPROVAL` gate before beginning subsequent phases.

---

### Implementation Phase 1: Foundation & Design Token Seams (Tracer Bullet 1)
*Goal: Establish 1:1 CSS Custom Properties from `DESIGN.md`, base typography, shared component styling, and DOM adapters.*

| Task | Description | Ref ID | AC Ref | Dep | Size | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-001** | **CSS Design Tokens & Typography Base:** Author `doc-pages/css/design-tokens.css` mapping 1:1 to `DESIGN.md` (colors: Action Blue `#0066cc`, Near-Black tiles, Parchment `#f5f5f7`; typography: Plus Jakarta Sans, Inter at 17px/1.47, JetBrains Mono; 8px rhythm; radii `{rounded.lg}`, `{rounded.pill}`). | CON-002, CON-003 | AC-001 | - | S (1 file) | [x] | 2026-10-20 |
| **TASK-002** | **Components CSS Styling:** Author `doc-pages/css/components.css` implementing 44px pure black global nav, 52px frosted sub-nav (`backdrop-filter`), capsule action pills, ghost pills, `store-utility-card`, and 4-column scannable footer. | REQ-001, REQ-004, REQ-008 | AC-001 | TASK-001 | S (1 file) | [x] | 2026-10-20 |
| **TASK-003** | **Interactive DOM Adapters & Controllers:** Author `doc-pages/js/main.js` implementing active micro-interactions (`transform: scale(0.95)`), clipboard copy adapter with fallback, and mobile hamburger drawer toggle with WAI-ARIA states (`aria-expanded`). | REQ-006, REQ-009 | AC-006, AC-008 | TASK-002 | S (1 file) | [x] | 2026-10-20 |
| **TASK-004** | **VERIFY Phase 1:** Validate CSS token syntax and verify navigation component rendering with zero external npm dependencies. | CON-001 | AC-001 | TASK-003 | XS | [x] | 2026-10-20 |
| **TASK-005** | **🛑 APPROVAL GATE:** Stop and wait for user confirmation before proceeding to Phase 2. | - | - | TASK-004 | - | [x] | 2026-10-20 |

---

### Implementation Phase 2: Data Seam & Catalog Hub Showcase (Tracer Bullet 2)
*Goal: Build the AI Hero-style catalog hub with real-time search, platform switching, and responsive skill cards.*

| Task | Description | Ref ID | AC Ref | Dep | Size | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-006** | **Declarative Skills Manifest & Platform Table:** Author `doc-pages/js/skills-data.js` containing the immutable single source of truth for all 14 core Pólya SDLC skills (identity, phase, heuristics, inputs, outputs, tags) and 6 platform configurations (Copilot, Antigravity, Cursor, Claude Code, Codex, Pi). | REQ-002, REQ-004 | AC-001, AC-002 | TASK-001 | S (1 file) | [x] | 2026-10-20 |
| **TASK-007** | **Catalog Search & Filter Engine:** Author `doc-pages/js/catalog.js` implementing case-insensitive substring search across command/name/description/tags with 80ms trailing debounce, 8 phase category tabs, platform switcher chip controller, empty state recovery, and `aria-live="polite"` announcements. | REQ-002, REQ-003, REQ-009 | AC-002, AC-003, AC-004, AC-005, AC-009, AC-010 | TASK-006 | S (1 file) | [x] | 2026-10-20 |
| **TASK-008** | **Catalog Hub Semantic Markup:** Author `doc-pages/index.html` assembling the Hero section, platform configurator bar, search input (`role="search"`), phase filter pills, responsive 14-skill card grid, floating sticky bottom bar, and footer. | REQ-001, REQ-004, REQ-007 | AC-001, AC-003, AC-004 | TASK-003, TASK-007 | M (1 file) | [x] | 2026-10-20 |
| **TASK-009** | **VERIFY Phase 2:** Open `doc-pages/index.html` in browser; verify instant filter speed (< 16ms), platform chip switching, search empty state recovery ("Reset Filters"), and clipboard copy toasts. | REQ-003, CON-001 | AC-001..AC-006 | TASK-008 | XS | [x] | 2026-10-20 |
| **TASK-010** | **🛑 APPROVAL GATE:** Stop and wait for user confirmation before proceeding to Phase 3. | - | - | TASK-009 | - | [x] | 2026-10-20 |

---

### Implementation Phase 3: Golden Master & Inception / Discovery Slices (Tracer Bullet 3)
*Goal: Establish the canonical "Golden Master" skill detail page to lock in visual hierarchy, then author inception and discovery skill pages.*

| Task | Description | Ref ID | AC Ref | Dep | Size | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-011** | **Golden Master Detail Page (`to-spec.html`):** Author `doc-pages/skills/to-spec.html` implementing the standardized 8-section layout (`REQ-010`): Two-Row Nav with breadcrumbs, Hero Monospace Badge, Quick Invocation Box, Problem Triad Card, Operational Steps, Prerequisites/Outputs Table, Anti-Cheat Rules, and Handoff Breadcrumbs. Validate in live browser. | REQ-005, REQ-010 | AC-007 | TASK-008 | S (1 file) | [x] | 2026-10-20 |
| **TASK-012** | **Inception & Triage Slice:** Author `doc-pages/skills/to-ask-help.html` (Socratic Triage Mentor) and `doc-pages/skills/to-init.html` (SDLC Scaffolding Bootstrapper) matching the Golden Master template. | REQ-005, REQ-010 | AC-007 | TASK-011 | M (2 files) | [x] | 2026-10-20 |
| **TASK-013** | **Discovery & Requirements Slice:** Author `doc-pages/skills/to-explore.html` (Phase 0 Discovery) and `doc-pages/skills/to-prd.html` (Phase 0.5 PRD) matching the Golden Master template. | REQ-005, REQ-010 | AC-007 | TASK-011 | M (2 files) | [x] | 2026-10-20 |
| **TASK-014** | **VERIFY Phase 3:** Verify bi-directional link traversal between `index.html` and the 5 created skill pages; confirm copy buttons function with visual feedback. | REQ-005, REQ-006 | AC-007 | TASK-013 | XS | [x] | 2026-10-20 |
| **TASK-015** | **🛑 APPROVAL GATE:** Stop and wait for user confirmation before proceeding to Phase 4. | - | - | TASK-014 | - | [x] | 2026-10-20 |

---

### Implementation Phase 4: Planning, Execution & Remediation Slices (Tracer Bullet 4)
*Goal: Author deep-dive reference pages for planning, gate enforcement, clean code execution, and bug remediation.*

| Task | Description | Ref ID | AC Ref | Dep | Size | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-016** | **Gate & Planning Slice:** Author `doc-pages/skills/to-clarify.html` (Epistemic Doubt & 5-Axis Grill-Me) and `doc-pages/skills/to-plan.html` (Vertical Tracer Bullets & prominent **🛑 The Pause Rule Banner**). | REQ-005, REQ-010 | AC-007 | TASK-011 | M (2 files) | [x] | 2026-10-20 |
| **TASK-017** | **Code Execution Slice:** Author `doc-pages/skills/to-code.html` (Clean Code & Two-Layer Testing) and `doc-pages/skills/to-quick-fix.html` (Routine Surgical Fixes). | REQ-005, REQ-010 | AC-007 | TASK-016 | M (2 files) | [x] | 2026-10-20 |
| **TASK-018** | **Remediation & Review Slice:** Author `doc-pages/skills/to-fix.html` (First-Principles Bug Remediation) and `doc-pages/skills/to-review.html` (5 SOLID Principles Audit & Looking Back). | REQ-005, REQ-010 | AC-007 | TASK-017 | M (2 files) | [x] | 2026-10-20 |
| **TASK-019** | **VERIFY Phase 4:** Ensure all created detail pages resolve cleanly, prompt snippets are copyable, and handoff breadcrumbs navigate logically. | REQ-005, REQ-006 | AC-007 | TASK-018 | XS | [x] | 2026-10-20 |
| **TASK-020** | **🛑 APPROVAL GATE:** Stop and wait for user confirmation before proceeding to Phase 5. | - | - | TASK-019 | - | [x] | 2026-10-20 |

---

### Implementation Phase 5: Documentation, Utilities, Responsive & Accessibility Polish (Tracer Bullet 5)
*Goal: Complete remaining skill pages, implement media queries across all 8 Apple breakpoints, and enforce WCAG 2.1 AA accessibility.*

| Task | Description | Ref ID | AC Ref | Dep | Size | Completed | Date |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **TASK-021** | **Documentation & Memory Slice:** Author `doc-pages/skills/to-docs.html` (Diátaxis Technical Documentation) and `doc-pages/skills/to-memory.html` (Cross-Session Persistent Memory). | REQ-005, REQ-010 | AC-007 | TASK-011 | M (2 files) | [x] | 2026-10-20 |
| **TASK-022** | **Architecture Topography Map Slice:** Author `doc-pages/skills/to-map.html` (Living Architecture Map). | REQ-005, REQ-010 | AC-007 | TASK-021 | S (1 file) | [x] | 2026-10-20 |
| **TASK-023** | **Responsive Breakpoints CSS:** Author `doc-pages/css/responsive.css` covering all 8 Apple breakpoints from `DESIGN.md:287-298` (Small Phone $\le 419\text{px}$, Phone $420-640\text{px}$, Tablet Portrait $736-833\text{px}$, Tablet Landscape $834-1023\text{px}$, Desktop $1069-1440\text{px}$, Wide Desktop $\ge 1441\text{px}$). | CON-005 | AC-008 | TASK-008 | S (1 file) | [x] | 2026-10-20 |
| **TASK-024** | **WCAG 2.1 AA Accessibility & Keyboard Navigation Polish:** Verify visible focus rings (`2px solid #0071e3`), keyboard `Tab` flow across all interactive elements, screen reader announcements on `#results-count`, and color contrast ratios $\ge 4.5:1$. | CON-004, REQ-009 | AC-010 | TASK-023 | S (1-2 files) | [x] | 2026-10-20 |
| **TASK-025** | **VERIFY Full Suite (`check:full`):** Complete end-to-end audit: link integrity across all 15 HTML files, search query edge cases, platform chip persistence, and mobile drawer toggles. | CON-001..005, REQ-001..010 | AC-001..AC-010 | TASK-024 | XS | [x] | 2026-10-20 |
| **TASK-026** | **🛑 FINAL APPROVAL GATE:** Present complete, verified documentation portal to user for production deployment readiness. | - | - | TASK-025 | - | [x] | 2026-10-20 |

---

## 4. Contingency Plan B (Have Two Strings to Your Bow)

*Pólya Heuristic: Prepare for potential failure of the primary strategy.*

- **Risk / Failure Point:** The user opens `doc-pages/index.html` via the local file system (`file:///d:/WebstormProject/polya-sdlc-coder/doc-pages/index.html`), and the browser blocks ES6 script loading due to CORS restrictions on local `type="module"` scripts.
- **Primary Strategy (Plan A):** Plain ES6 scripts without `type="module"`, namespacing data onto a clean global namespace (`window.PolyaPortal = { skills: [...], platforms: [...] }`). This guarantees 100% functionality on both local `file:///` and hosted `https://` environments without bundlers.
- **Contingency Strategy (Plan B):** If strict script isolation is desired, provide a zero-install local preview command via PowerShell / Node (`npx serve doc-pages` or `python -m http.server -d doc-pages`).
- **Trigger Condition:** If local browser testing displays a script execution error on `file:///`, verify that scripts utilize the `window.PolyaPortal` global object rather than `import`/`export`.

---

## 5. Symmetry, Invariants & Problem Variation (Pólya, p. 199–214)

- **Symmetric Operations & Round-Trip Invertibility:**
  - `Select Filter Chip (e.g. "Phase 1")` $\leftrightarrow$ `Select "All" / Clear Filters` (Restores full 14 cards).
  - `Click Copy Command` $\leftrightarrow$ `Timeout 2000ms` (Restores button to original state).
  - `Open Mobile Hamburger Nav` $\leftrightarrow$ `Close Mobile Drawer` (`aria-expanded="true"` $\leftrightarrow$ `"false"`).
- **Variation of the Problem:**
  - *Query variations:* Test alphanumeric, mixed case (`/TO-SPEC`), whitespace padding, special characters (`/*+?`), and empty query.
  - *Viewport variations:* Test layout at 375px (iPhone), 768px (iPad portrait), 1024px (iPad landscape), and 1440px (Studio Display).
- **SOLID Checks at Blueprint Stage:**
  - *Single Responsibility (SRP):* `skills-data.js` holds raw domain data; `catalog.js` handles query filtering; `main.js` handles DOM adapters; CSS files handle styling.
  - *Open/Closed Principle (OCP):* Adding a new skill in the future requires adding only an entry to `skills-data.js` and a static page in `skills/`, with zero modifications to the filtering algorithm.

---

## 6. Risks & Assumptions Mitigation Matrix

| Assumption / Risk Tag | Description & Downstream Risk | Planned Mitigation in Execution |
| :--- | :--- | :--- |
| **`[ASSUMPTION-001]`** | Relative path traversal across sub-directories (`href="skills/to-spec.html"` vs `href="../index.html"`). Risk of broken links on subfolder deployments. | Enforce uniform relative paths across all 15 HTML files. Test both root and sub-path navigation in `TASK-025`. |
| **`[ASSUMPTION-002]`** | Declarative data manifest synchronization with `.agents/skills/*/SKILL.md`. Risk of skill content drift. | Transcribe canonical descriptions, inputs, outputs, and quotes directly from source `SKILL.md` files during `TASK-006`. |
| **`[NG-004]` Guard** | Out-of-scope auxiliary skills (e.g. `impeccable`). Risk of scope creep into public catalog. | Strictly filter data manifest to the 14 core Pólya SDLC skills as requested by user. |

---

## 7. Architectural Seams & File Map

```text
doc-pages/
├── index.html                   # TASK-008: Hub Catalog (Hero, Search, Filter Pills, Grid)
├── css/
│   ├── design-tokens.css        # TASK-001: 1:1 CSS Variables from DESIGN.md
│   ├── components.css           # TASK-002: 44px Nav, 52px Sub-Nav, Cards, Buttons, Footer
│   └── responsive.css           # TASK-023: 8 Apple Breakpoints (320px - 1440px+)
├── js/
│   ├── skills-data.js           # TASK-006: 14 Core Skills Array & Platform Table
│   ├── catalog.js               # TASK-007: Substring Search & Category Filter Engine
│   └── main.js                  # TASK-003: Clipboard Copy & Mobile Nav Drawer
└── skills/                      # TASK-011, TASK-012, TASK-013, TASK-016, TASK-017, TASK-018, TASK-021, TASK-022
    ├── to-spec.html             # TASK-011: Golden Master Detail Page
    ├── to-ask-help.html         ├── to-fix.html              ├── to-prd.html
    ├── to-clarify.html          ├── to-init.html             ├── to-quick-fix.html
    ├── to-code.html             ├── to-map.html              ├── to-review.html
    ├── to-docs.html             ├── to-memory.html           └── to-plan.html
    └── to-explore.html
```
