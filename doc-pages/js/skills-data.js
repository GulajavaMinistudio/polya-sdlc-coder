/**
 * Pólya SDLC Coder - Declarative Skills Data Manifest
 * Single Source of Truth for the 14 Core Skills & Target Platform Configurations
 */

(function () {
  'use strict';

  window.PolyaPortal = window.PolyaPortal || {};

  window.PolyaPortal.platforms = [
    {
      id: 'copilot',
      name: 'GitHub Copilot',
      command: 'npx skills add GulajavaMinistudio/polya-sdlc-coder -y',
      configDir: '.agents/',
      notes: 'Installs the 14 skills into your .agents/skills/ directory for GitHub Copilot Workspace and VS Code.'
    },
    {
      id: 'antigravity',
      name: 'Google Antigravity',
      command: 'npx skills add GulajavaMinistudio/polya-sdlc-coder -y',
      configDir: '.agents/skills/',
      notes: 'Installs the 14 skills into .agents/skills/ for Antigravity IDE and CLI.'
    },
    {
      id: 'cursor',
      name: 'Cursor',
      command: 'npx skills add GulajavaMinistudio/polya-sdlc-coder -y',
      configDir: '.cursor/skills/',
      notes: 'Installs the 14 skills into .cursor/skills/ for Cursor Composer multi-file workflows.'
    },
    {
      id: 'claude',
      name: 'Claude Code',
      command: 'npx skills add GulajavaMinistudio/polya-sdlc-coder -y -g',
      configDir: '~/.claude/skills/',
      notes: 'Global installation of the 14 skills for terminal-based Claude Code agent workflows.'
    },
    {
      id: 'codex',
      name: 'Codex / OpenCode',
      command: 'npx skills add GulajavaMinistudio/polya-sdlc-coder -y',
      configDir: '.agents/skills/',
      notes: 'Installs the 14 skills for OpenAI Codex and OpenCode terminal agents.'
    },
    {
      id: 'pi',
      name: 'Pi Dev',
      command: 'npx skills add GulajavaMinistudio/polya-sdlc-coder -y',
      configDir: '.agents/skills/',
      notes: 'Installs the 14 skills for autonomous Pi agent environments.'
    }
  ];

  window.PolyaPortal.skills = [
    {
      slug: 'to-ask-help',
      command: '/to-ask-help',
      name: 'Socratic Triage Mentor',
      phase: 'Phase 0: Triage & Navigation',
      phaseCategory: 'discovery',
      polyaStage: '0. Getting Acquainted',
      tagline: 'Autonomous intent analysis, codebase reconnaissance & sub-skill router',
      description: 'Deconstructs fuzzy user intent into Unknown, Data, and Condition. Inspects the codebase autonomously and routes to the optimal Pólya sub-skill.',
      inputs: ['Natural task prompt', 'Codebase manifests', 'docs/ARCHITECTURE.md'],
      outputs: ['Pólya Socratic Triage Card', 'Recommended /to-* sub-skill route'],
      detailUrl: 'skills/to-ask-help.html',
      tags: ['triage', 'router', 'intent', 'reconnaissance', 'orchestrator', 'help', 'ask']
    },
    {
      slug: 'to-explore',
      command: '/to-explore',
      name: 'Problem Discovery & Exploration',
      phase: 'Phase 0: Discovery & Spikes',
      phaseCategory: 'discovery',
      polyaStage: '0. Getting Acquainted',
      tagline: 'Architectural critique, anti-yes-man challenge & discovery draft',
      description: 'Surveys the problem landscape before committing to code. Challenges over-complicated premises, evaluates trade-offs, and authors disposable spikes.',
      inputs: ['Feature concept', 'docs/ARCHITECTURE.md', 'Source seams'],
      outputs: ['docs/discovery/{slug}-discovery.md', 'Spike prototypes'],
      detailUrl: 'skills/to-explore.html',
      tags: ['discovery', 'exploration', 'spikes', 'architecture', 'trade-offs', 'feasibility']
    },
    {
      slug: 'to-prd',
      command: '/to-prd',
      name: 'Product Requirements Document',
      phase: 'Phase 0.5: Product Requirements',
      phaseCategory: 'discovery',
      polyaStage: '0.5. Business Alignment',
      tagline: 'User stories, SMART acceptance criteria & non-goals',
      description: 'Bridges discovery with engineering by translating business requirements into formal User Stories (US-XX), functional constraints, and SMART acceptance criteria.',
      inputs: ['docs/discovery/{slug}-discovery.md', 'User requirements'],
      outputs: ['docs/prd/{slug}-prd.md'],
      detailUrl: 'skills/to-prd.html',
      tags: ['prd', 'requirements', 'user-stories', 'acceptance-criteria', 'scope', 'product']
    },
    {
      slug: 'to-spec',
      command: '/to-spec',
      name: 'Technical Specification & Seams',
      phase: 'Phase 1: Understanding the Problem',
      phaseCategory: 'specification',
      polyaStage: '1. Understand the Problem',
      tagline: 'Clean Architecture seam mapping, DTO contracts & business invariants',
      description: 'Deconstructs the Problem Triad into formal mathematical contracts. Enforces Type-Driven Design, 4-layer Clean Architecture boundaries, and negative invariants.',
      inputs: ['docs/discovery/{slug}-discovery.md or docs/prd/{slug}-prd.md'],
      outputs: ['docs/spec/{slug}-spec.md', 'docs/adr/NNNN-slug.md'],
      detailUrl: 'skills/to-spec.html',
      tags: ['spec', 'clean-architecture', 'dtos', 'contracts', 'invariants', 'seams', 'architecture']
    },
    {
      slug: 'to-clarify',
      command: '/to-clarify',
      name: 'Epistemic Doubt & Ambiguity Gate',
      phase: 'Checkpoint: Clarification Audit',
      phaseCategory: 'specification',
      polyaStage: '1.5. Interrogate the Condition',
      tagline: '5-axis assumption stress-testing, Grill-Me protocol & readiness scoring',
      description: 'Recurring quality gate eliminating ambiguity. Interrogates assumptions, evaluates the 5 UI states and sad paths, and calculates an objective 0–100 Readiness Score.',
      inputs: ['docs/spec/{slug}-spec.md or docs/plan/{slug}-plan.md'],
      outputs: ['docs/audit/{slug}-{phase}-clarification.md', 'CONTEXT.md updates'],
      detailUrl: 'skills/to-clarify.html',
      tags: ['clarify', 'audit', 'grill-me', 'assumptions', 'readiness-score', 'checkpoint']
    },
    {
      slug: 'to-plan',
      command: '/to-plan',
      name: 'Implementation Planning & Gate',
      phase: 'Phase 2: Devising a Plan',
      phaseCategory: 'planning',
      polyaStage: '2. Devise a Plan',
      tagline: 'Vertical tracer bullets, contingency Plan B & The Pause Rule',
      description: 'Breaks the approved specification into vertical tracer bullets (DB to UI). Enforces task sizing bounds, Plan B contingencies, and halts at The Mandatory Pause Rule.',
      inputs: ['docs/spec/{slug}-spec.md'],
      outputs: ['docs/plan/{slug}-plan.md'],
      detailUrl: 'skills/to-plan.html',
      tags: ['plan', 'tracer-bullets', 'pause-rule', 'vertical-slicing', 'contingency', 'planning']
    },
    {
      slug: 'to-code',
      command: '/to-code',
      name: 'Clean Code Execution',
      phase: 'Phase 3: Carrying Out the Plan',
      phaseCategory: 'code',
      polyaStage: '3. Carry Out the Plan',
      tagline: 'Uncle Bob\'s Clean Code, Micro-TDD & Anti-Cheat Floor Guard',
      description: 'Executes vertical slices ticket by ticket. Enforces functions under 25 lines, intention-revealing names, two-layer testing, and zero tolerance for cheat moves.',
      inputs: ['docs/plan/{slug}-plan.md'],
      outputs: ['Production source code', 'Automated test suite', 'Atomic conventional commits'],
      detailUrl: 'skills/to-code.html',
      tags: ['code', 'clean-code', 'tdd', 'floor-guard', 'implementation', 'boy-scout']
    },
    {
      slug: 'to-quick-fix',
      command: '/to-quick-fix',
      name: 'Surgical One-Shot Fixes',
      phase: 'Bypass Mode: Surgical Fixes',
      phaseCategory: 'code',
      polyaStage: 'Bypass: Pedantry vs Mastery',
      tagline: 'Fast-track mini-plans for routine changes (<= 2 files)',
      description: 'Applies Pólya\'s Pedantry vs. Mastery distinction. Bypasses heavy 6-phase ceremony for routine mechanical fixes, small refactors, or config adjustments with minimal diffs.',
      inputs: ['Specific defect description', 'Target files (<= 2)'],
      outputs: ['Surgical code patch', 'Atomic conventional commit'],
      detailUrl: 'skills/to-quick-fix.html',
      tags: ['quick-fix', 'surgical', 'one-shot', 'fast-track', 'patch', 'minimal-diff']
    },
    {
      slug: 'to-review',
      command: '/to-review',
      name: 'Looking Back & SOLID Audit',
      phase: 'Phase 4: Looking Back',
      phaseCategory: 'review',
      polyaStage: '4. Look Back (Examine)',
      tagline: '5 SOLID principles audit, boundary specialization & 30s visual topology',
      description: 'Examines the solution from first principles. Audits Single Responsibility, Open-Closed, Liskov, Interface Segregation, and Dependency Inversion, synthesizing a 30s mental model.',
      inputs: ['docs/spec/{slug}-spec.md', 'docs/plan/{slug}-plan.md', 'Git diff'],
      outputs: ['docs/reviews/{slug}-review.md'],
      detailUrl: 'skills/to-review.html',
      tags: ['review', 'solid', 'audit', 'looking-back', 'security', 'verification']
    },
    {
      slug: 'to-fix',
      command: '/to-fix',
      name: 'First-Principles Bug Remediation',
      phase: 'Phase 5: Defect Remediation',
      phaseCategory: 'fix',
      polyaStage: '5. Invariant Remediation',
      tagline: 'Broken seam tracing, O(log n) bisection & failing reproduction tests',
      description: 'Resolves broken invariants and defects via first principles. Traces broken seams from symptoms to root cause, authors a failing test before touching code, and verifies clean remediation.',
      inputs: ['Defect report', 'Stack trace', 'Failing invariants'],
      outputs: ['docs/bug-reports/{slug}-bugfix.md', 'Green reproduction test'],
      detailUrl: 'skills/to-fix.html',
      tags: ['fix', 'bugfix', 'bisection', 'reproduction-test', 'root-cause', 'debugging']
    },
    {
      slug: 'to-docs',
      command: '/to-docs',
      name: 'Diátaxis Technical Documentation',
      phase: 'Phase 6: Technical Documentation',
      phaseCategory: 'docs',
      polyaStage: '6. Pedagogical Transfer',
      tagline: 'Structured documentation across Tutorials, How-To, Reference & Explanation',
      description: 'Transforms verified code into pedagogical technical documentation organized into the 4 Diátaxis quadrants: tutorials, how-to guides, reference manuals, and architecture explanations.',
      inputs: ['docs/spec/{slug}-spec.md', 'docs/reviews/{slug}-review.md'],
      outputs: ['docs/{tutorials,how-to,reference,explanation}/{slug}.md'],
      detailUrl: 'skills/to-docs.html',
      tags: ['docs', 'diataxis', 'tutorials', 'how-to', 'reference', 'explanation']
    },
    {
      slug: 'to-map',
      command: '/to-map',
      name: 'Repository Architecture Topography',
      phase: 'Utility: Architecture Map',
      phaseCategory: 'utility',
      polyaStage: 'Cross-Cutting Utility',
      tagline: 'Automated codebase scanning, seam classification & living architecture map',
      description: 'Scans and reverse-engineers repository topography, mapping Clean Architecture seams (Entities, Use Cases, Adapters, Frameworks) into a living architecture blueprint.',
      inputs: ['Workspace codebase directory', 'Package manifests'],
      outputs: ['docs/ARCHITECTURE.md'],
      detailUrl: 'skills/to-map.html',
      tags: ['map', 'architecture', 'topography', 'seams', 'living-doc']
    },
    {
      slug: 'to-memory',
      command: '/to-memory',
      name: 'Cross-Session Persistent Memory',
      phase: 'Utility: Memory Management',
      phaseCategory: 'utility',
      polyaStage: 'Cross-Cutting Utility',
      tagline: 'Checkpoints learnings & architectural decisions to memory.instructions.md',
      description: 'Maintains cross-session project memory. Discovers, updates, and compacts permanent lessons learned, key decisions, and developer preferences to prevent context amnesia.',
      inputs: ['Session learnings', 'Architectural decisions', 'Project conventions'],
      outputs: ['memory.instructions.md'],
      detailUrl: 'skills/to-memory.html',
      tags: ['memory', 'context', 'persistence', 'instructions', 'cross-session']
    },
    {
      slug: 'to-init',
      command: '/to-init',
      name: 'SDLC Architecture Bootstrapper',
      phase: 'Scaffolding: Setup Bootstrapper',
      phaseCategory: 'utility',
      polyaStage: 'Scaffolding & Setup',
      tagline: 'Automated SDLC toolkit scaffolding, AGENTS.md & rules injection',
      description: 'Bootstraps fresh projects into the Pólya SDLC Coder ecosystem. Scaffolds AGENTS.md, orchestrator rules, and installs the 14 modular skills in seconds without manual copying.',
      inputs: ['Target workspace directory'],
      outputs: ['AGENTS.md', '.agents/skills/*', '.agents/rules/*'],
      detailUrl: 'skills/to-init.html',
      tags: ['init', 'setup', 'scaffolding', 'bootstrapper', 'install']
    }
  ];
})();
