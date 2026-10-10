# The redesign workflow

How to turn a real local business's current web presence into a polished concept
redesign — reproducibly, with whatever AI tools you already use.

This is the exact loop behind the redesigns in the repo above (a wedding venue, a
pizza place, a biscuit shop, a coffee shop, a running store). It is written to be
run cold by someone who isn't me.

---

## The one idea that makes it work

There are three steps, and **they never touch each other**. They only touch a
single document:

```
  [ 1. AUDIT ]            [ 2. REDESIGN DOC ]           [ 3. BUILD ]
  a chat LLM looks   →    a filled-in spec:        →    a coding agent reads the
  at the real site        brand, palette, every         doc and builds a static
  and writes findings     section, real content,        site. Nothing else.
                          constraints
```

The **redesign doc is the contract.** The tool that audits and the tool that
builds don't have to be the same tool, the same session, or even the same day.
Everything the builder needs is in the doc; everything the auditor learned goes
*into* the doc. That decoupling is the whole trick — it's why the output is
reproducible instead of vibes.

So: **the doc is the deliverable of steps 1–2, and the only input to step 3.**
If something isn't in the doc, the builder doesn't know it.

---

## What you need

- A chat LLM that can look at a URL / image (ChatGPT, Claude, Gemini — anything
  fluent with vision + browsing). Used in steps 1–2.
- A coding agent that can write files and run a browser/headless check (Claude
  Code, Cursor, Copilot agent, etc.). Used in step 3.
- That's it. No framework, no build step, no dependencies — the sites are
  hand-written HTML + CSS. A static site is easier to reason about, easier to
  verify, and deploys to Vercel/Netlify by dragging a folder.

They can be the same tool or two different tools. Doesn't matter — the doc is the
handoff.

---

## How to run it

**Step 1 — Audit.** Open `1-audit-prompt.md`, paste it into your chat LLM, and
give it the business's current website URL and/or Instagram. It returns a
structured audit: who they are, what their current site gets wrong, and what
actually matters to show. *Read this and push back* — the audit is only as good
as the real facts in it. (See the honesty rules below; this is where fabrication
sneaks in.)

**Step 2 — Fill the redesign doc.** Open `2-redesign-doc-template.md`. Have the
LLM fill it in from the audit (same session is fine). This is the step worth
slowing down on. By the end you should have: a brand read, a palette with
contrast checked, a section-by-section outline, and — crucially — the **real
content** for each section (real menu items, real hours, a real review with its
source). Placeholders here become placeholders on the shipped site.

**Step 3 — Build.** Open `3-build-prompt.md`, paste it into your coding agent,
and hand it the finished redesign doc. It builds the static site and then
*verifies its own work* against the checklist baked into that prompt. The
verification is not optional garnish — it's the half that separates "looks done
in a screenshot" from "is actually done."

**Step 4 — Deploy as a concept, honestly.** These are unsolicited previews, not
the business's live site. Ship them `noindex` + with a visible "concept redesign,
not affiliated" line so they never outrank or impersonate the real business. The
build prompt handles this; don't strip it out.

---

## The rules that actually matter

Most of the quality comes from a short list of things that are easy to get wrong
and invisible when you do. These are baked into the prompts, but know them:

1. **Prove it before you claim it.** "Contrast passes," "nothing overflows,"
   "the check is green" — none of those are true until a command *printed* the
   result in front of you. A number in the doc that nobody computed is a guess.
   Break a check on purpose once to confirm it can even fail; a check that can't
   fail isn't checking anything.
2. **Real content, never placeholders.** A real Google review quoted with its
   source beats "⭐⭐⭐⭐⭐ Great service!" every time — and it's the *honest* option,
   not a tradeoff. Empty is better than invented. If you can't find the real
   fact, leave the slot visibly empty and say so.
3. **Every caption earns its place.** A line under a photo or beside a heading
   must state a fact you can't get from the thing it sits next to — a name, a
   date, a price, a place, a consequence. If it just restates the image or sounds
   wise without saying anything, delete it.
4. **Brand colors are fill colors, not text colors.** A palette handed to you is
   for backgrounds and shapes. Any hue used as text has to be contrast-checked
   against its actual background first — brand-saturated colors routinely land
   just under the readable threshold and *look* fine.

The build prompt turns these into a checklist the agent has to run. Keep them.

---

## Adapting it

Tuned here for **local businesses → static concept sites**, but the shape is
general. For a SaaS landing page or a personal site, keep steps 1–3 and the
contract idea exactly; swap the section list in the redesign-doc template and
drop the "concept / not affiliated" posture (that one's specific to redesigning
someone else's business without asking).
