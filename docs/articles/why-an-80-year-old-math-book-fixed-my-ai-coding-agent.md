---
title: Why an 80-Year-Old Math Book Fixed My AI Coding Agent
published: false
description: How George Pólya's 1945 heuristic framework and Uncle Bob's Clean Architecture stop LLMs from coding prematurely and hallucinating architecture.
tags: ai, programming, softwareengineering, architecture
canonical_url: https://gulajavaministudio.github.io/polya-sdlc-coder/
cover_image: https://raw.githubusercontent.com/GulajavaMinistudio/polya-sdlc-coder/main/polya-sdlc-cats-compressed.jpg
---

Here is a scenario almost every developer reading this has lived through over the past year.

It is 11:30 PM. You are working on a feature, like adding real-time order tracking to an existing e-commerce service. You open your favorite AI coding assistant (Cursor, Claude Code, GitHub Copilot, or Antigravity) and type what feels like a sensible prompt:

> *"Add real-time order tracking using WebSockets and Redis."*

You hit enter. The assistant doesn't hesitate. Within three seconds, it starts furiously streaming code.

It writes a WebSocket gateway from scratch and invents an ad-hoc Redis pub/sub wrapper. It drops a global state variable right into your React layout, pulls in a third-party reconnect library you've never heard of, and for good measure, rewrites half of your existing `Order` model, breaking six unrelated unit tests in the process.

The diff looks like a crime scene.

Imagine an eager junior developer doing this on their first week: rewriting domain models, swapping libraries, and modifying database schemas without asking a single clarifying question. You wouldn't applaud their speed. You would sit them down and have a serious conversation about requirements, architecture boundaries, and scope.

Yet with AI assistants, we've normalized this exact pathology. We treat rapid token output as "productivity," only to spend the next three hours cleaning up broken architectural seams, untangling hidden race conditions, and undoing premature abstractions.

The problem isn't that modern LLMs can't write code. **The problem is that they start writing code way too early.**

And strangely enough, the best antidote to this problem was published eighty years ago by a Stanford mathematician.

---

## The Root Cause: Autoregressive Myopia

Large Language Models are, by their foundational design, **autoregressive greedy token generators**. When given a prompt, their training compels them to emit the most probable continuation immediately. 

They have no built-in pause button. They don't take a sip of coffee, look at your existing repository structure, and wonder:

- *What domain entities already exist here?*
- *What is the SLA for latency and reconnection?*
- *What are the sad paths if the Redis broker restarts?*
- *Is WebSockets even the right architectural trade-off here, or would Server-Sent Events (SSE) solve this in 50 fewer lines of code?*

Instead, they dive headfirst into implementation.

Research in cognitive science identified this trap decades ago. In 1985, UC Berkeley researcher **Alan H. Schoenfeld** published *Mathematical Problem Solving*, studying how students and mathematicians tackle tough problems. He discovered that novice problem-solvers spend almost zero time analyzing the problem; they jump straight into calculations, follow an unviable path into a dead end, and burn all their time backtracking.

Experts do the exact opposite. They spend the vast majority of their time analyzing constraints, drawing figures, and discarding bad directions *before* calculating anything.

Schoenfeld proved that problem-solving strategies fail without what he called **metacognitive supervisory control**: the conscious ability to halt, assess progress, and refuse to proceed on unverified assumptions.

Modern AI coding agents are the ultimate novices. They possess encyclopedic syntax knowledge, but zero metacognitive control.

---

## Enter George Pólya (1945)

![George Pólya: How to Solve It](https://raw.githubusercontent.com/GulajavaMinistudio/polya-sdlc-coder/main/polya-books-cats.jpg)

In 1945, Hungarian-American mathematician **George Pólya** published a compact, 250-page book at Princeton University Press called ***How to Solve It***. It went on to sell over a million copies and was translated into 17 languages.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   GEORGE PÓLYA'S 4-STAGE HEURISTIC (1945)              │
├────────────────────────────────────────────────────────────────────────┤
│ 1. UNDERSTAND THE PROBLEM  ➔  What is the unknown? What are the data?  │
│                               What is the condition? Can it be met?    │
│ 2. DEVISE A PLAN           ➔  Find connections between data & unknown. │
│                               Isolate auxiliary problems. Restate it.  │
│ 3. CARRY OUT THE PLAN      ➔  Check each step. Can you prove that each │
│                               individual step is sound and correct?    │
│ 4. LOOK BACK (EXAMINE)     ➔  Check the result. Derive it differently. │
│                               Promote reusable patterns to memory.     │
└────────────────────────────────────────────────────────────────────────┘
```

Pólya wasn't interested in rigid mathematical proofs written after the fact. He was obsessed with **the psychology of discovery**: how people actually navigate uncertainty. He codified problem-solving into four invariant stages:

1. **Understand the Problem:** Deconstruct *The Unknown* (what are we trying to produce?), *The Data* (what inputs and state exist?), and *The Condition* (what constraints and business rules must hold true?).
2. **Devise a Plan:** Find the connection between the data and the unknown. Consider auxiliary problems. Work backwards. Restate the problem.
3. **Carry Out the Plan:** Verify each step along the way. Prove correctness as you move forward.
4. **Look Back:** Examine the result. Can you derive it more simply? Can you use this method for other problems?

In 1961, AI pioneer **Marvin Minsky** cited Pólya in his landmark paper *Steps Toward Artificial Intelligence*, noting: *"Everyone should know the work of George Pólya on how to solve problems."* In 1982, computer scientist **R. Geoff Dromey** adapted Pólya's work for algorithmic design in *How to Solve It by Computer*.

A few months ago, while wrestling with an AI agent that kept hallucinating database columns, the lightbulb went off:

**AI agents need George Pólya's discipline far more than human developers do.**

---

## Bridging Pólya with Uncle Bob's Clean Architecture

Mathematical heuristics provide the cognitive scaffolding, but software engineering needs concrete physical boundaries.

We paired Pólya's four stages with **Robert C. Martin's ("Uncle Bob") Clean Architecture** principles: strict dependency inversion, decoupled domain entities, interfaces (ports) separating business logic from infrastructure adapters, and intention-revealing clean code.

The result is **[Pólya SDLC Coder](https://github.com/GulajavaMinistudio/polya-sdlc-coder)**: an open-source suite of 15 modular agent skills structured across a disciplined 6-phase lifecycle.

Here is how Pólya's 1945 heuristics map directly to modern software craftsmanship across all 15 skills:

| George Pólya's Heuristic (1945) | Software Craftsmanship Seam | Agent Skill Command |
| :--- | :--- | :--- |
| **"Getting Acquainted"** | Codebase Reconnaissance & Topography Map | `/to-ask-help`, `/to-map` & `/to-init` |
| **"Understanding the Problem"** | Discovery, PRDs, DTOs & Seam Mapping | `/to-explore`, `/to-prd` & `/to-spec` |
| **"Challenging Premises"** | Socratic Sparring & Concrete A/B Trade-Offs | `/to-grill-me` |
| **"Interrogating the Condition"** | 5-Axis Assumption Check & 0-100 Readiness Gate | `/to-clarify` |
| **"Devising a Plan"** | Vertical Tracer Bullets & Plan B Contingencies | `/to-plan` |
| **"The Hesitation Before Calculating"** | Explicit Human Alignment Gate | **🛑 The Mandatory Pause Rule** |
| **"Carrying Out the Plan"** | Clean Code, <25 Line Functions & Micro-TDD | `/to-code` & `/to-quick-fix` |
| **"Looking Back & Root Cause"** | 5 SOLID Audit, First-Principles Fix & Diátaxis Docs | `/to-review`, `/to-fix` & `/to-docs` |
| **"The Two Golden Questions"** | Cross-Session Architectural Memory | `/to-memory` |

---

## How It Works in Practice

Let's revisit our real-time order tracking feature, but run it through the Pólya workflow.

### Step 1: Autonomous Triage (`/to-ask-help`)

In a brownfield repository, `/to-map` first scans your directory structure and maintains a living topography map at `docs/ARCHITECTURE.md` so the agent knows your exact layer boundaries without re-reading a thousand files on every prompt.

Then, instead of throwing a raw feature command at the agent, you run:

```text
/to-ask-help Add real-time order tracking using WebSockets and Redis
```

The agent doesn't write code. It inspects your repo, locates existing domain models, checks your HTTP framework, and returns a **Pólya Triage Card**:

```text
+-----------------------------------------------------------------------+
|                         POLYA TRIAGE CARD                             |
+-----------------------------------------------------------------------+
| The Unknown   : Real-time WebSocket order tracking stream             |
| The Data      : Order entity, Redis Pub/Sub adapter, React UI hook    |
| The Condition : Sub-100ms latency, automatic reconnection, JWT auth   |
| Seams Found   : Domain (Order), Adapters (RedisStream), UI (Hook)     |
| Recommended   : /to-explore or /to-spec                               |
+-----------------------------------------------------------------------+
```

If the problem space is still wide open, `/to-explore` runs architectural spikes using Pólya's *Inventor's Paradox*, and `/to-prd` frames user stories and explicit non-goals before locking in technical contracts.

### Step 2: Socratic Sparring (`/to-grill-me`)

Before drafting a spec, you put the idea through the sparring partner:

```text
/to-grill-me "Should we use WebSockets or Server-Sent Events (SSE) for order tracking?"
```

Unlike generic assistants that reply with a 10-paragraph essay saying *"Both are great options depending on your needs!"*, the Pólya sparring skill enforces **The 1-Question Rule** and **The Opinionated Senior Recommendation**:

> **[Option A: Server-Sent Events (SSE)]**  
> Unidirectional stream over standard HTTP/2. Reuses existing auth headers, requires no custom heartbeat/ping-pong machinery, and reconnects automatically via the native browser EventSource API.
>
> **[Option B: WebSockets]**  
> Bidirectional full-duplex socket. Requires dedicated connection lifecycle handling, custom JWT handshake validation, and manual heartbeat ping/pong to detect dead TCP sockets.
>
> **Senior Recommendation:**  
> *I recommend Option A (SSE).* Order tracking is 100% server-to-client (the client never pushes coordinate telemetry back through this channel). WebSockets add stateful socket maintenance overhead for a problem that HTTP/2 streaming solves natively.
>
> **The One Question:** Do you anticipate riders or customers sending real-time messages over this exact stream in V1, or is client-to-server interaction strictly handled by standard REST endpoints?

One sharp question. Real architectural trade-offs. The decision is settled in 30 seconds, saving hours of unnecessary WebSocket plumbing.

### Step 3: Vertical Tracer Bullets (`/to-plan`)

With the trade-offs settled, `/to-spec` formalizes the data contracts and architectural seams into `docs/spec/`, flagging any unverified premises with explicit `[ASSUMPTION]` tags. Before planning can begin, `/to-clarify` audits the specification across five axes and enforces an objective **0-100 Readiness Gate** (anything scoring under 80 blocks the pipeline until ambiguities are resolved).

Once cleared, instead of horizontal slicing (writing all database tables, then all controllers, then all UI), `/to-plan` devises **Vertical Tracer Bullets**:

- **Tracer Bullet 1:** Domain Event + SSE emitter port + integration mock.
- **Tracer Bullet 2:** HTTP endpoint with JWT auth verification.
- **Tracer Bullet 3:** Frontend UI subscription hook with connection status badge.
- **Contingency Plan B:** Graceful fallback to 5-second polling if HTTP stream drops.

### Step 4: 🛑 The Mandatory Pause Rule

Here is the single most critical guardrail in the entire system.

The moment the plan is generated, **the agent stops cold.** It is strictly forbidden from writing a single line of production code.

It prints:

```text
🛑 MANDATORY GATE: THE PAUSE RULE
The implementation plan is staged at docs/plan/order-tracking-plan.md.
Execution is halted. Awaiting explicit user confirmation before writing code.
```

This enforces Alan Schoenfeld's supervisory control. You inspect the tracer bullets. If an assumption looks wrong, you fix it in markdown in 10 seconds. 

Only when you explicitly type:
> *"Plan reviewed and approved. Proceed to implementation."*

...does the agent move to `/to-code`.

### Step 5: Implementation & Audit (`/to-code` & `/to-review`)

During `/to-code`, the agent is governed by Uncle Bob's Clean Code constraints:
- Functions must stay under 25 lines.
- One level of abstraction per function.
- Intention-revealing naming.
- **Anti-Cheat Floor Guard:** Strictly forbidden from using `@ts-ignore`, skipping tests, or leaving dummy `// TODO` stubs.
- **Two-Layer Testing:** Every tracer bullet must pass fast typechecks (`check:fast`) and task unit tests (`check:task`) before the task is marked done.

Finally, `/to-review` audits the diff against the **5 SOLID principles** and **14 defensive security vectors** (OWASP, tenant isolation, input sanitization), issuing a definitive release verdict (`GO` or `NO-GO`). When approved, `/to-docs` authors structured documentation based on the Diátaxis framework so your team inherits clean guides alongside clean code.

### Before vs. After: What the Code Actually Looks Like

To see the real-world difference, look at what happens at the code level when a courier updates an order's live location to broadcast over our stream.

**Without Pólya (The Default AI Spurt):**
The AI dumps everything into an ad-hoc controller, mixing raw Redis sockets, direct SQL queries, and unhandled promise rejections:

```typescript
// The typical AI hallucination: business logic tangled directly with transport
app.post('/api/orders/:id/location', async (req, res) => {
  const redis = new Redis(process.env.REDIS_URL); // New connection on every HTTP request!
  const order = await db.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
  
  if (!order.rows[0]) return res.status(404).send('Not found');
  
  await db.query('UPDATE orders SET lat = $1, lng = $2 WHERE id = $3', [
    req.body.lat, req.body.lng, req.params.id
  ]);
  redis.publish(`order-stream:${req.params.id}`, JSON.stringify(req.body));
  // No domain validation, zero port abstractions, connection leaks in production
  res.json({ updated: true });
});
```

**With Pólya & Clean Architecture (`/to-code`):**
Because `/to-spec` established the seams upfront, the agent outputs a decoupled domain port and an intention-revealing use case under 25 lines:

```typescript
// Clean Architecture: Pure Use Case decoupled from HTTP, SQL, and SSE/Redis transport
export class PublishOrderLocationUseCase {
  constructor(
    private readonly orderRepo: OrderRepositoryPort,
    private readonly streamPublisher: OrderStreamPublisherPort
  ) {}

  async execute(input: UpdateOrderLocationDto): Promise<Result<void, OrderDomainError>> {
    const order = await this.orderRepo.findById(input.orderId);
    if (!order) {
      return Result.fail(new OrderNotFoundError(input.orderId));
    }

    const moveResult = order.recordLocation(input.coordinates);
    if (moveResult.isFailure) {
      return Result.fail(moveResult.error);
    }

    await this.orderRepo.save(order);
    await this.streamPublisher.publish(order.toTrackingEvent());
    return Result.ok();
  }
}
```

Whether the outer `OrderStreamPublisherPort` adapter pushes over Server-Sent Events (as chosen during `/to-grill-me`) or fans out through Redis Pub/Sub, the core domain use case doesn't care. No connection leaks, transport-agnostic domain logic, and 100% mockable unit tests in isolation.

---

## Beyond the Happy Path: Day-2 Engineering Realities

Shipping the initial feature is only half the battle. Most AI workflows fall apart on Day 2 when chat context windows reset, production bugs surface, or you just need a quick config tweak without ceremony.

### 1. Curing the "AI Amnesia" Trap (`/to-memory`)

Every developer using AI coding agents knows the frustration of session resets. You spend two hours aligning on an architectural pattern, the context window fills up, you open a new chat, and the agent immediately forgets every single design decision you made.

Pólya SDLC solves this by making session memory durable in `memory.instructions.md`. When you finish a milestone or settle a complex architectural trade-off, running `/to-memory` compacts your current findings:
- Active tracer bullets and their completion status
- Architectural Decision Records (ADRs) accepted during `/to-grill-me`
- Known codebase pitfalls and negative constraints

When you start your next session tomorrow morning, the agent reads this file first. Zero context loss, zero repeating yourself.

### 2. Bug Fixing Without Whack-A-Mole (`/to-fix`)

When a defect does occur, default AI behavior is notorious for playing blind whack-a-mole: patching a symptom, introducing two new edge-case failures, and spiraling into nested hacks.

Through `/to-fix`, the agent is strictly forbidden from blind shotgun patching. Instead, it returns to first principles:
1. It uses bisection search (`O(log n)`) to trace and isolate the exact broken architectural seam.
2. It formulates an automated reproduction test that fails for the exact expected reason first.
3. It locks in a root-cause remediation plan in `docs/bug-reports/` before handing execution over to `/to-code`.

No guesswork, no hack loops, and no regression cascades.

### 3. Fast-Track Edits: Pedantry vs. Mastery (`/to-quick-fix`)

One of George Pólya's most famous quotes from 1945 warns against dogmatism:

> *"To apply a rule to the letter, rigidly, unquestioningly... is pedantry. To apply a rule with natural ease, with judgment, noticing the cases where it fits... is mastery."*

If you need to fix a typo in a config file or tweak a CSS margin on a button, running a full 6-phase SDLC with specifications and Socratic sparring is ridiculous.

For small, routine changes (affecting one or two files), Pólya SDLC provides a fast-track bypass:

```text
/to-quick-fix Fix typo in redis timeout config and increase retry limit to 5
```

It skips the formal documentation overhead while still upholding typechecks, clean formatting, and atomic git commits.

---

## Trying It Out in Your Codebase

Pólya SDLC Coder is open-source (MIT licensed) and works across any platform supporting agent skills or instruction rules, including **Cursor**, **Claude Code**, **GitHub Copilot**, **Google Antigravity**, and **ChatGPT Codex**.

### Quick Setup via `npx skills`

You don't need to clone large repositories or install heavy npm dependencies. You can install the skills directly using the universal `npx skills` CLI:

```bash
# Option A: Install the lightweight bootstrapper skill
npx skills add GulajavaMinistudio/polya-sdlc-coder/skills/to-init

# Option B: Or install the entire 15-skill suite directly
npx skills add GulajavaMinistudio/polya-sdlc-coder
```

Then in your AI assistant chat window, simply type:

```text
/to-init setup this project
```

The bootstrapper will inspect your repository, scaffold `.agents/`, configure `AGENTS.md`, and hook up the full 15-skill suite automatically.

*(Alternatively, if you prefer shell one-liners, check out the [interactive web configurator](https://gulajavaministudio.github.io/polya-sdlc-coder/#install) for macOS, Linux, and Windows.)*

---

## Closing Thoughts

AI coding tools are not going away. But the honeymoon phase of *"look how fast this LLM can vomit 500 lines of unreviewed code"* is ending. Engineering teams are waking up to the maintenance hangover of AI-generated spaghetti.

The secret to building reliable software with AI isn't faster models or larger context windows.

It is having the engineering humility to pause, understand the problem, challenge our premises, and verify the plan before writing the first line of code.

George Pólya figured that out in 1945. It just took us eighty years (and a few million hallucinated tokens) to catch up.

---

### Links & Resources

- 📐 **GitHub Repository:** [GulajavaMinistudio/polya-sdlc-coder](https://github.com/GulajavaMinistudio/polya-sdlc-coder)
- 🌐 **Interactive Web Docs & Skill Catalog:** [gulajavaministudio.github.io/polya-sdlc-coder](https://gulajavaministudio.github.io/polya-sdlc-coder/)
- 📖 **The 1945 Origin Story:** [Why Pólya? (Deep Dive)](https://gulajavaministudio.github.io/polya-sdlc-coder/doc-pages/why-polya.html)

---

### Over to You

How are you keeping your AI coding agents from jumping straight into premature spaghetti code? Do you enforce a spec-first workflow, custom instruction files, or manual review gates?

And what is the wildest architectural mess an AI assistant has ever tried to sneak into your codebase? Drop your war stories and workflows in the comments below. I'd love to compare notes!
