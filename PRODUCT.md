# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Agent Skill Suite & Scaffolding:** Modular Markdown specifications (`SKILL.md` with YAML frontmatter), shell installer scripts (`install.ps1` for Windows PowerShell, `install.sh` for Linux/macOS Bash & Zsh), and governance rulebooks (`AGENTS.md`, `.agents/rules/PolyaOrchestrator.md`).
- **Web Showcase & Documentation Surface:** Semantic HTML5, Modern CSS (CSS Custom Properties mapping 1:1 to tokens in `DESIGN.md`), Vanilla JavaScript, and Google Fonts typography CDN (`Plus Jakarta Sans`, `Inter`, and `JetBrains Mono` with `font-display: swap`). Zero-build, zero external npm dependencies, instant first paint, designed for direct deployment to GitHub Pages.
- **Skill Distribution:** Package-manager-free installation via `npx skills` (`GulajavaMinistudio/polya-sdlc-coder`), interactive installer scripts, or direct repository cloning.

## Users

1. **Software Engineers & Full-Stack Developers:** Working with AI coding assistants (GitHub Copilot, Google Antigravity, Cursor, Claude Code, Codex, Pi Dev, OpenCode) who are frustrated by hallucinated code, broken architectural boundaries, and premature implementations.
2. **Technical Leads & Principal Architects:** Who require strict engineering governance, Clean Architecture decoupling, two-layer testing mandates, and verifiable alignment before code is written.
3. **Engineering Teams Adopting Agentic Workflows:** Needing a unified, repeatable Software Development Life Cycle (SDLC) framework that turns unpredictable LLM token generators into disciplined engineering partners.

## Product Purpose

Pólya SDLC Coder bridges George Pólya's 1945 mathematical problem-solving heuristics (*How to Solve It*) with Robert C. Martin's (*Uncle Bob*) Clean Architecture. It prevents AI coding agents from prematurely emitting code by enforcing a disciplined 6-stage lifecycle: **Discovery (`/to-explore`) ➔ PRD (`/to-prd`) ➔ Spec (`/to-spec`) ➔ Clarify (`/to-clarify`) ➔ Plan (`/to-plan`) ➔ 🛑 The Pause Rule ➔ Code (`/to-code`) ➔ Review (`/to-review`) ➔ Docs (`/to-docs`)**.

## Positioning

Unlike unconstrained AI assistants or brittle autonomous coding agents that jump directly into generating messy horizontal patches and unmaintainable boilerplate, Pólya SDLC Coder equips agents with:

- **First-Principles Problem Deconstruction:** Formulating *The Unknown*, *The Data*, and *The Condition* before writing any code.
- **The Mandatory Pause Rule:** Halting automatically after planning to require explicit human verification before functional code execution.
- **Uncle Bob's Clean Architecture & Clean Code:** Strict domain/usecase/adapter boundaries, vertical tracer bullets, and zero-tolerance Floor-Guard anti-cheat rules.
- **Universal Multi-Platform Support:** Works out-of-the-box across GitHub Copilot, Antigravity, Cursor, Claude Code, Codex, and Pi Dev through a single source of truth.

## Operating Context

- **AI Agent Host Runtimes:** Active project workspaces with `.agents/`, `.cursor/`, or `.claude/` directory configurations.
- **Installation Targets:** Local and remote developer environments on Windows, Linux, and macOS.
- **Web Documentation & Showcase:** Static web portal hosted on GitHub Pages (`https://gulajavaministudio.github.io/polya-sdlc-coder/`) providing live interactive skill discovery, command references, and architectural walkthroughs.

## Capabilities and Constraints

- **Capabilities:**
  - **15 Dedicated Sub-Skills:** Modular skills covering every phase from Socratic triage (`/to-ask-help`) to Diátaxis documentation (`/to-docs`) and surgical one-shot fixes (`/to-quick-fix`).
  - **Autonomous Codebase Reconnaissance:** Auto-detects domain models, package manifests, and architecture seams without asking blind questions.
  - **Socratic Triage & Pólya Cards:** ASCII diagnostic triage cards deconstructing the problem into Unknown, Data, and Condition.
  - **5-Axis Grill-Me Checkpoint:** Interactive assumption stress-testing with objective 0–100 Readiness Scoring.
  - **Vertical Tracer-Bullet Slicing:** End-to-end demoable slices from database to UI with contingency Plan B options.
  - **Anti-Cheat Floor Guard:** Strict bans on `@ts-ignore`, skipped tests, dummy `TODO` comments, or lowered test thresholds.
  - **Cross-Session Memory Persistence:** Checkpoints learnings and architectural decisions to `memory.instructions.md`.
- **Constraints:**
  - Agent instructions must remain plain, portable Markdown without vendor-locked proprietary extensions.
  - Web documentation and showcase must remain zero-build (pure HTML5/Modern CSS/Vanilla JS) for effortless GitHub Pages hosting.
  - Installation scripts must not leave temporary files or overwrite existing custom configurations without user confirmation.

## Brand Commitments

- **Namesake & Lineage:** Honors mathematician George Pólya (*How to Solve It*, 1945), Robert C. Martin (*Clean Architecture*, *Clean Code*), and modern agentic engineering standards.
- **Core Motto:** *"It is foolish to answer a question that you do not understand. It is sad to work for an end that you do not desire."* — George Pólya.
- **Visual Identity:** Mathematical precision, clean blueprint aesthetics, monospace ASCII topology diagrams, warm amber heuristic accents, and authoritative deep slate backgrounds.
- **Typography Standard:** Powered by Google Fonts (`Plus Jakarta Sans` for geometric display headings, `Inter` for prose reading, and `JetBrains Mono` for monospace terminal and ASCII cards), loaded asynchronously with `font-display: swap` for maximum performance.

## Evidence on Hand

- **Repository Source Code:** 15 modular skill files in `skills/` and `.agents/skills/`.
- **Installers:** Battle-tested `install.ps1` and `install.sh` scripts supporting `.agents/`, `.claude/`, and `.cursor/`.
- **Governance Blueprints:** Root `AGENTS.md`, `README.md`, and `.agents/rules/PolyaOrchestrator.md`.
- **Design Specifications:** Structured token hierarchy, typography ladders, and component specifications in `DESIGN.md`.

## Product Principles

1. **Understand Before Calculating:** Never write code before understanding the Unknown, Data, and Condition.
2. **The Pause Rule Gate:** Always halt after generating an implementation plan and wait for explicit human approval before writing application code.
3. **Vertical Slicing (Tracer Bullets):** Always implement and verify vertical, end-to-end slices (DB to UI) rather than horizontal layer-by-layer stubs.
4. **Clean Code & Uncompromising Testing:** Functions under 25 lines, intention-revealing names, fast micro-checks (`check:fast`), and two-layer testing with zero cheat moves.
5. **Pedantry vs. Mastery:** Apply strict 4-layer Clean Architecture to core domains, but allow fast-track surgical precision (`/to-quick-fix`) for routine, low-risk changes.

## Accessibility & Inclusion

- Web showcase conforms to **WCAG 2.1 AA** standards with minimum contrast ratio of $\ge 4.5:1$ for body copy and $\ge 3:1$ for interactive accents.
- Full keyboard navigation and visible focus rings (`2px solid #f59e0b`).
- Monospace ASCII diagrams formatted with semantic `<pre>` / `<code>` and accessible screen-reader fallbacks.
- Mobile-responsive layout tested from 320px to 1440px+ viewport widths.
