# Step 1 — The audit prompt

Paste everything in the fenced block below into a chat LLM that can browse and
read images. Then give it the business's current website URL and/or Instagram
handle (screenshots work too).

Its job is **not** to redesign anything yet. Its job is to figure out who this
business is and what their current site gets wrong — the raw material the
redesign doc is built from.

> **Before you run it:** if you already have real assets (the owner's photos,
> their menu PDF, a logo), say so up front. Scraping bot-walled sites for things
> you already have on your desktop wastes everyone's time.

---

```
You are auditing the current web presence of a local business so it can be
redesigned. Do NOT propose a redesign yet. I want an honest read of what exists.

I will give you a website URL and/or an Instagram. Look at them carefully.

Produce the audit in these sections:

1. WHO THEY ARE
   - Name, location (city + state), what they actually sell/do.
   - How long they've been around, ownership, anything that makes them specific
     rather than generic (a signature dish, a founder's story, a free service).
   - Their voice: how do THEY describe themselves in their own words? Quote them.

2. THE FACTS I'LL NEED (collect real values; mark anything you can't find)
   - Hours, address, phone, booking/order link.
   - Real menu items / services / products with real names and prices if shown.
   - Any real reviews or testimonials — quote them verbatim AND record where each
     one came from (Google, Yelp, the platform). A review with no source is
     unusable; flag it.
   - What photography exists and whether it's usable (real, in-focus, theirs).
   - If a fact isn't available, write "NOT FOUND" — do not guess, do not invent a
     plausible-sounding substitute. A blank is useful; a fabrication is poison.

3. WHAT THE CURRENT SITE GETS WRONG
   - First impression in one honest sentence.
   - Concrete problems: dated look, buried key info (hours/location/menu),
     weak or missing calls to action, bad mobile layout, slow, broken, generic
     stock imagery, unclear what they even do.
   - What a customer who lands here actually struggles to do.

4. WHAT MATTERS MOST
   - The 2–3 things THIS business needs the site to accomplish (e.g. "get people
     to book a tour," "show the menu," "prove they're the real neighborhood
     spot"). Rank them.
   - The single most important moment on the page.

Rules:
- Ground every claim in what you actually saw. If you're inferring, say "inferred."
- Quote their real words and real content. Never write a placeholder.
- Be specific and a little blunt. "The hero is a stock photo of unrelated food and
  the hours are three clicks deep" is useful. "Could be more modern" is not.

Here is the business:
[PASTE URL AND/OR INSTAGRAM HERE]
```

---

**After it runs:** read the audit against the real site yourself. The most
common failure is a confident-sounding fact that isn't real — a review that was
paraphrased, hours that were guessed, a "signature dish" it inferred. Anything
marked NOT FOUND is a task for you (ask the owner, check elsewhere), not a license
to invent. Carry the corrected audit into step 2.
