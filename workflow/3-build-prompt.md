# Step 3 — The build prompt

Paste the fenced block below into your coding agent and attach the finished
redesign doc from step 2. The agent builds the static site, then runs the
verification checklist on itself.

The checklist is the point. Anyone can get an LLM to emit HTML that looks done in
a screenshot. The lessons below are the difference between "looks done" and "is
done" — each one is a real bug that passed a glance and failed a measurement.

---

```
Build a static website from the attached redesign doc.

STACK
- Hand-written HTML + CSS. No framework, no build step, no dependencies, no JS
  unless a specific interaction truly needs it. One index.html + one stylesheet
  is a fine default.
- Everything the site needs is in the redesign doc. Use the real content it
  specifies. If the doc says TODO/NOT FOUND for something, leave that slot
  visibly empty and labeled — do NOT invent a value to fill it.

BUILD
- Follow the section order and content in the doc exactly.
- Set an explicit font-size on bare h1–h4 so the type hierarchy is defined once.
- Self-host fonts; confirm any typeface is free to use before shipping it.
- Make it responsive down to 360px wide.

THEN VERIFY — and show me the output of each check, not a summary of it.
The rule for everything below: a claim is false until a command has PRINTED the
result. "Passes" / "no overflow" / "green" mean nothing on their own. If a check
produces no output on success, break it on purpose once and show me it can fail —
a check that cannot fail is checking nothing.

1. CONTRAST (readability)
   - For every text/background pair in the palette table, COMPUTE the actual
     contrast ratio and print it next to the required minimum (4.5:1 body,
     3:1 large text). Brand/accent colors used as text are the usual failures.
   - Watch two traps declaration-reading misses: a translucent color over a dark
     background composites to something neither light nor dark text passes; and a
     container's descendant selector (.card p) can silently out-rank a component
     class. Verify against COMPUTED style in the browser, not the source CSS.
   - When you pick a color to FIX a failure, compute the ratio for the color you
     chose — don't eyeball the "after."

2. MOBILE OVERFLOW
   - Render at 360px and 390px. Do NOT use scrollWidth === clientWidth as the
     test — with overflow:hidden on any ancestor it reports a false pass.
   - Instead, ENUMERATE elements whose getBoundingClientRect().right exceeds the
     viewport width, and print the list (empty list = pass). Stop the walk at the
     first horizontally-scrollable ancestor so you don't flag intentional sliders.
   - The probe must PRINT the viewport it actually rendered at. Headless Chrome
     on macOS clamps innerWidth to a 500px floor: a request for 360px can
     silently render 500px and return a bogus pass. Assert requested == actual or
     fail loudly; use an iframe harness served over HTTP (not file://) for true
     sub-500px widths.

3. CONTENT HONESTY
   - Grep the built HTML for placeholder text (lorem, "Item 1", "review goes
     here", "⭐⭐⭐⭐⭐" with no name). Print matches. Any hit is a failure.
   - Every review/testimonial on the page must be real and carry its source in a
     <cite> (e.g. "Google"). If the doc had none, the slot stays visibly empty —
     confirm no invented ones crept in.
   - Every caption, eyebrow, and subhead must state a fact you can't get from the
     element beside it. Delete any line that just restates the image or sounds
     wise without asserting anything checkable.

4. CSS SAFETY (if you edit CSS after the first write)
   - Never delete a CSS rule with a multiline wildcard regex ([\s\S]*?, .*? with
     DOTALL). It runs past the closing brace and eats the next rules — including a
     media query's }, which drags desktop rules into a mobile breakpoint silently.
   - Delete by exact full-block string match, then check brace balance == 0, then
     confirm a COMPUTED property (getComputedStyle(el).gridTemplateColumns) for
     every region you touched.

5. DEPLOY POSTURE (concept, not impersonation)
   - This is an unsolicited concept redesign. Add a robots noindex meta tag AND
     plan for an X-Robots-Tag header (meta alone doesn't cover non-HTML assets),
     a robots.txt disallow, and a VISIBLE on-page line: "Concept redesign — not
     affiliated with [business]."
   - After deploy, FETCH the live URL and confirm the noindex is actually served.
     The repo saying noindex is not evidence; the live response is.

Report: for each of the 5 checks, show the command you ran and its real output.
If anything failed, fix it and re-run that check — don't narrate the fix, show
the re-run. End with the list of any remaining TODOs from the doc.
```

---

**Why these five and not a generic "test it":** every one is a bug that already
shipped looking fine. Contrast failures measure wrong and look right. The cheap
overflow test passes while 30 elements hang off the screen. A headless browser
hands you a 500px screenshot labeled "360px." A fabricated 5-star review reads as
polish. A wildcard regex deletes a whole section through a media query's closing
brace. A concept redesign that's accidentally indexed outranks the real business.
Making the agent *print the evidence* is what catches all five — a green light
wired to nothing is worse than no light.
