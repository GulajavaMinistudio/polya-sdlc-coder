# Project Context & Ubiquitous Language: Pólya SDLC Coder

<!-- markdownlint-disable -->

## Domain Glossary & Ubiquitous Vocabulary

This document serves as the project-wide single source of truth for business and engineering terminology, ensuring consistency across all specifications, implementation plans, and documentation artifacts.

---

### Core Architectural Concepts

- **Pólya SDLC Pipeline:** The disciplined 6-stage software engineering lifecycle bridging George Pólya's 1945 mathematical heuristics (*How to Solve It*) with Robert C. Martin's Clean Architecture: Discovery (`/to-explore`) ➔ PRD (`/to-prd`) ➔ Spec (`/to-spec`) ➔ Clarify (`/to-clarify`) ➔ Plan (`/to-plan`) ➔ 🛑 The Pause Rule ➔ Code (`/to-code`) ➔ Review (`/to-review`) ➔ Docs (`/to-docs`).  
  _Avoid:_ Agile sprint, unstructured coding, spontaneous prompt engineering.

- **The Problem Triad:** George Pólya's foundational three-part analytical framework consisting of:
  1. *The Unknown:* What is sought, computed, rendered, or architected.
  2. *The Data:* The inputs, parameters, schemas, and existing codebase seams available.
  3. *The Condition:* The business rules, invariants, performance SLAs, and operational bounds that must be satisfied.  
  _Avoid:_ Requirements list, user ticket, problem description.

- **🛑 The Pause Rule:** The mandatory, unskippable human-in-the-loop governance gate halting autonomous agent execution immediately after Phase 2 (Planning). The agent is strictly forbidden from writing application source code until explicit human verification and approval is granted.  
  _Avoid:_ Confirmation prompt, stop button, approval dialog.

- **Vertical Tracer Bullet:** An end-to-end, independently verifiable functional slice cutting vertically through all system layers (from database schema and use case up to UI rendering and automated integration tests).  
  _Avoid:_ Horizontal layer, stub implementation, mockup slice.

---

### Web Documentation Portal (`doc-pages/`) Concepts

- **Skill Catalog Hub:** The root showcase page (`doc-pages/index.html`) providing real-time search, phase-based category filtering, interactive platform switching, and responsive skill cards.  
  _Avoid:_ Home page, landing page, skills dashboard.

- **Skill Detail Page:** A dedicated, semantic static HTML document (`doc-pages/skills/{slug}.html`) presenting exhaustive operational instructions, problem triads, prompt invocations, and handoff breadcrumbs for a single skill.  
  _Avoid:_ Modal popup, sub-view, accordion drawer.

- **Platform Configurator:** The interactive chip selector (`configurator-option-chip`) enabling developers to toggle between target AI platforms (GitHub Copilot, Google Antigravity, Cursor, Claude Code, Codex, Pi Dev), dynamically swapping copyable installation commands.  
  _Avoid:_ Tool picker, agent selector.

- **Problem Triad Card:** A standardized, visually elevated documentation card rendered on light or dark canvas breaking down a skill's Unknown, Data, and Condition.  
  _Avoid:_ Summary box, overview panel.

- **Store Utility Card (`store-utility-card`):** A responsive card element styled with an 18px border radius (`{rounded.lg}`), 1px hairline border, monospace command badge (`JetBrains Mono`), concise Pólya heuristic description, and detail link.  
  _Avoid:_ Card component, list item.

- **Zero-Build Architecture:** The technical policy mandating pure Semantic HTML5, Modern CSS, and Vanilla JavaScript with zero external npm build tools, compilers, or bundlers, guaranteeing instant first paint and perpetual GitHub Pages compatibility.  
  _Avoid:_ Static site generator, compiled frontend, bundled assets.
