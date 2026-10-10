# Step 2 — The redesign doc template

This is the contract. It's the deliverable of steps 1–2 and the *only* input to
step 3. If a fact isn't in here, the builder won't know it.

Fill it in from the audit — same chat session is fine. Copy this whole template,
hand it to the LLM with the audit, and say: *"Fill in this redesign doc from the
audit. Use real content everywhere. Where a real value is unknown, write TODO and
what's needed — never invent one."*

Two things people rush and shouldn't:
- **The palette contrast table.** Fill in the actual background each color sits
  on. The builder needs it; this is where readability bugs are born.
- **The content.** Every section should carry real menu items / hours / a real
  sourced review by the time you hand this off. Placeholders here ship.

---

## REDESIGN DOC — [Business name]

### 1. Snapshot
- **Business:** [name]
- **Location:** [city, state]
- **What they do:** [one line]
- **Current site:** [URL]
- **This redesign is:** an unsolicited concept preview — not affiliated, not the
  live site. (Keep this; it drives the deploy posture in step 3.)

### 2. Goal of the redesign
- **Primary job of the page:** [the #1 thing from the audit — e.g. "book a tour"]
- **Secondary jobs:** [ranked]
- **The most important moment on the page:** [what the visitor must not miss]
- **Who's visiting:** [the real customer — "someone planning a wedding," "a
  hungry local at noon"]

### 3. Brand & voice
- **Personality in 3 words:** [e.g. warm, established, unfussy]
- **How they talk about themselves:** [quote from the audit]
- **Tone the copy should hold:** [one line]
- **Things to avoid:** [e.g. "no corporate SaaS voice," "no exclamation marks"]

### 4. Palette
List every color with its hex and what it's *for*. Then the contrast table —
this is not optional.

| Role | Hex | Used for |
|------|-----|----------|
| Background / paper | `#` | page background |
| Ink / primary text | `#` | body + headings |
| Brand / accent | `#` | buttons, fills, highlights |
| [more] | `#` | |

**Contrast table** — for every color used as TEXT, the background it sits on, and
whether it's readable (the builder will compute the real ratio; you name the
pairs):

| Text color | On background | Readable? (builder verifies) |
|------------|---------------|------------------------------|
| `#ink` | `#paper` | needs ≥ 4.5:1 for body |
| `#accent` (if used as text) | `#paper` | ⚠ check — accents often fail |

> Note for the builder: brand colors are fill colors. Any hue used as text must
> be verified against its real background, not assumed.

### 5. Typography
- **Headings:** [typeface + why] — confirm it's free & self-hostable before using.
- **Body:** [typeface]
- **Scale:** set an explicit size on bare `h1`–`h4` so hierarchy is decided once,
  not re-guessed per section.

### 6. Sections (top to bottom)
For each section: what it is, what it must contain, and the **real content**.

1. **Hero**
   - Goal: [first impression + the primary CTA]
   - Content: [headline — in their voice; subhead that states a real fact;
     the CTA label + where it links]
   - Image: [which real photo, or "TODO: owner photo"]

2. **[e.g. Menu / Services / What we do]**
   - Real items with real names + prices: [list them — not "Item 1 … $X"]

3. **[e.g. Proof / Reviews]**
   - Real review, verbatim, WITH source: ["…" — Name, Google]
   - If none found: leave the slot visibly empty and labeled. Do not fabricate.

4. **[e.g. Location & hours]**
   - Real address, real hours, map link, phone.

5. **[Footer]**
   - Hours, contact, and the "concept redesign — not affiliated" disclaimer.

*(Add/remove sections to fit the business. Every section needs a reason to exist
and real content — if you can't fill it with a fact, cut it.)*

### 7. Content rules (carried into the build)
- Real content only. A blank beats an invention.
- Every caption / eyebrow / subhead states a fact you can't get from the thing
  beside it — a name, date, price, place, or consequence. Otherwise delete it.
- No fabricated reviews, no fake stats, no placeholder lorem.

### 8. Constraints
- Static site: hand-written HTML + CSS, no framework, no build step, no deps.
- Must work on mobile (down to 360px) with no horizontal overflow.
- Accessible: readable contrast, real alt text, semantic headings.
- Deploy as a `noindex` concept with a visible disclaimer.

### 9. Open TODOs
- [Anything marked NOT FOUND / TODO above — the real blockers, listed so they're
  not forgotten.]
