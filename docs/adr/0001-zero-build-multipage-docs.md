# ADR-0001: Zero-Build Dedicated Multi-Page Static HTML Architecture for Documentation Portal

**Status:** Approved  
**Date:** 2026-10-20  
**Deciders:** Veteran Principal Fullstack Engineer, Project Owner  
**Consulted:** Pólya SDLC Coder Core Team  
**Informed:** Repository Contributors  

---

## Context and Problem Statement

The `polya-sdlc-coder` project requires a user-facing documentation portal and web showcase (`doc-pages/`) to document its 14 modular skills, mimicking the industry-standard skills showcase of AI Hero (`https://www.aihero.dev/skills`) while adhering to the Apple-inspired design system specified in `DESIGN.md`. 

We need to decide on the frontend architecture for `doc-pages/`: specifically, whether to build a Single-Page Application (SPA) with dynamic slide-out drawers, an external Static Site Generator (SSG) such as Astro, Docusaurus, or VitePress, or a pure vanilla, zero-build Multi-Page Static HTML architecture.

## Decision Drivers

1. **Product Constraint Compliance:** `PRODUCT.md:12` explicitly mandates: *"Semantic HTML5, Modern CSS (CSS Custom Properties mapping 1:1 to tokens in DESIGN.md), Vanilla JavaScript... Zero-build, zero external npm dependencies, instant first paint, designed for direct deployment to GitHub Pages."*
2. **Deep-Linking & SEO:** Each of the 14 skills requires a unique, bookmarkable canonical URL (e.g. `doc-pages/skills/to-spec.html`) that can be directly shared and referenced in chat prompts or documentation.
3. **Design System Fidelity:** Complete control over CSS Custom Properties and layout geometry without fighting or overriding heavy third-party framework themes.
4. **Resilience & Zero Maintenance:** The documentation site must remain functional perpetually without requiring npm dependency upgrades, security patches, or build pipeline maintenance.

## Considered Options

- **Option 1: Dedicated Multi-Page Static HTML with Decoupled CSS/JS and Declarative Skills Manifest [ACCEPTED]**
- **Option 2: Single-Page Application (SPA) with Dynamic Modals/Drawers**
- **Option 3: External Static Site Generator (Astro / Docusaurus / VitePress)**

## Decision Outcome

Chosen option: **Option 1 (Dedicated Multi-Page Static HTML)**, because:
- It adheres 100% to the zero-build and zero-npm-dependency constraint in `PRODUCT.md:12`.
- It gives each skill an independent, bookmarkable URL (`doc-pages/skills/{slug}.html`).
- It enables instant first paint with zero runtime overhead on GitHub Pages.
- It centralizes catalog search and filter logic in a single declarative data manifest (`doc-pages/js/skills-data.js`), avoiding duplication while keeping individual skill detail pages static, semantic, and crawlable.

### Positive Consequences
- Instant deployment via GitHub Pages without GitHub Actions build pipelines.
- Direct local browsing capability (opens directly via `file:///` or any simple static server).
- Clean separation of concerns between catalog discovery (`index.html`) and in-depth reading (`skills/{slug}.html`).
- Absolute compliance with `DESIGN.md` styling rules.

### Negative Consequences & Mitigation
- **Boilerplate Navigation:** Shared navigation bars (44px global nav and 52px sub-nav) exist across multiple HTML pages.
  - *Mitigation:* The navigation and footer markup will be standardized into a uniform, clean template component structure, and shared styles will reside exclusively in `doc-pages/css/components.css`.
