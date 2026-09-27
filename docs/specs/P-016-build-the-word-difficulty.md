# P-016: Build the Word difficulty modes

## Status

Completed and product-approved.

## Problem

Build the Word currently only checks after every letter slot is filled. That is a strong challenge for early spellers. Some children need letter-by-letter confirmation so they can succeed independently without lowering the advanced mode.

## Goal

Add two Build the Word difficulty modes after category selection:

- **Easy** — **Build with Help**: check each letter as it is placed; show tick or cross; celebrate when the word is finished.
- **Normal** — **Build the Word**: keep today’s full-word check (advanced).

## Depends on

- P-014 Build the Word live game
- Existing Starters category chooser

## Non-goals

- Changing Home to two separate Build entries (Option A)
- Difficulty on Home itself
- Adaptive recommendation or persistence of mode
- Applying these modes to Missing Letter or Listen and Choose in this release
- Fireworks on every correct letter in Easy mode
- Out-of-order letter placement in Easy mode
- Auto-clearing a wrong letter without the child undoing

## Entry flow (Option C)

Keep a single Home Words entry: **Build the Word**.

1. Home → **Build the Word**
2. Category chooser (unchanged)
3. **Mode chooser** (new step after a category is tapped)
4. Practice round for that category + mode

Mode chooser copy:

- Heading: **How do you want to build?**
- Supporting: **Pick one, then start.**
- Primary choices (two large peer CTAs, same visual role as Home play buttons — not small chips):
  - Title: **Easy**  
    Subtitle / description name: **Build with Help**  
    Supporting line: “Check each letter as you go.”
  - Title: **Normal**  
    Subtitle / description name: **Build the Word**  
    Supporting line: “Build the whole word, then check.”

Each CTA must show **Easy** or **Normal** as the primary label, with the descriptive name and short line secondary (same pattern as Home play buttons: title + description).

Back from the mode chooser returns to the category chooser. Home from either setup screen returns to Home.

Note: Animals keep Discover / Explorer without Easy / Normal (D-005). Build the Word mode labels intentionally include Easy / Normal so the challenge level is obvious to children and adults helping them.

## Mode rules

### Shared

- Same word pool, structure (spaces/hyphens), Hear word, Undo, progress, end screen pattern as P-014.
- Play Again keeps the same category and mode.
- Choose Category returns to the category chooser; after a new category, show the mode chooser again.
- Mode is not persisted across sessions.
- Fireworks celebration runs only when a word is finished correctly (both modes). Respect `prefers-reduced-motion`.
- Tick / cross marks use Lucide icons (not emoji), small enough not to crowd long words.
- Tick uses the success token color; cross uses the error token color.
- Place the mark at the **bottom-right** corner of the letter slot (not top-right).

### Easy — Build with Help

- Place into the **next** empty letter slot only (left to right).
- Each placed letter is checked immediately against that next needed letter.
- **Correct letter:**
  - Stays in the slot
  - Shows a small tick on that slot
  - Continues to the next slot
- **Incorrect letter:**
  - Still places in the slot so the child can see the wrong combination
  - Shows a small cross on that slot
  - Brief incorrect feedback (do not reveal the full target word on a single wrong letter)
  - Further bank taps are blocked until the child clears the wrong letter via **Undo** or by tapping that letter / last filled slot
  - Do not auto-remove the wrong letter
- When every letter slot is correct and the word is finished:
  - Success feedback (e.g. **Yes! Bird.**)
  - Fireworks once
  - Unlock continue

### Normal — Build the Word (current)

- Unchanged from P-014: fill all letter slots, then evaluate the whole word.
- No per-letter tick / cross while building.
- Incorrect full build still teaches the word and requires a successful rebuild before continue.
- Fireworks on successful finished word only.

## End screen

- Keep **Great building!**
- Play Again → same category + same mode
- Choose Category → category chooser
- Home → Home

Optional later (not this release): a “Change how you build” action on the end screen.

## Visual and interaction requirements

- Mode choices must be large touch targets (≥44×44px), landscape-friendly, and visually equal peers.
- Mode CTAs use `min-height` with **height auto** so the button grows with its title + descriptive lines; do not clip multi-line labels with a fixed height.
- Mode CTA text may wrap (`whitespace-normal`); keep readable padding on all sides.
- Do not use tiny segmented chips as the only control.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Do not use age-band labels (e.g. “Ages 5–6”).
- Easy / Normal are required primary labels for this chooser; keep the descriptive Build names as secondary.
- Easy-mode slot marks: success-colored tick or error-colored cross at the bottom-right of the letter box.

## Accessibility

- Mode buttons need names that include Easy or Normal plus the descriptive mode name.
- Easy-mode wrong taps announce via the existing polite live region pattern; slots with tick / cross should be understandable to assistive tech (e.g. “Letter B, correct” / “Letter X, incorrect”).
- Success still announces the finished word.

## Acceptance criteria

- [ ] Home still shows one **Build the Word** entry.
- [ ] After choosing a category, the child must choose **Easy** or **Normal** before practice starts.
- [ ] Mode CTAs show Easy / Normal as primary labels with Build with Help / Build the Word as secondary descriptive names.
- [ ] Easy accepts placement only into the next letter slot.
- [ ] Correct Easy letters stay with a small success-colored tick at the bottom-right of the slot.
- [ ] Incorrect Easy letters stay with a small error-colored cross at the bottom-right until the child undoes; bank placement stays locked until cleared.
- [ ] Mode CTAs grow with their text (no fixed height clipping).
- [ ] Easy does not fire fireworks per letter; fireworks only when the word is finished.
- [ ] Normal keeps current full-word evaluation behaviour without per-letter marks.
- [ ] Play Again preserves category and mode.
- [ ] Choose Category returns to category selection, then mode selection again.
- [ ] Both modes fit iPad landscape without cropping.

## Open questions

None currently blocking engineering.

## Approval status

Completed and product-approved.
