# P-015: Listen and Choose

## Status

Approved for engineering.

## Problem

Children need practice linking spoken Starters vocabulary to the correct written word. Reading practice shows the word first; this mode starts from listening.

## Goal

Add a live Home Words game where the child hears a Starters word and chooses the matching written word from a small set of options.

## Depends on

- Existing Starters word data and speech helpers
- Home Words section from P-012

## Non-goals

- Pictures for words
- Spelling assembly or missing-letter puzzles
- Free typing
- Persistent progress
- Quick Review in this release
- Microphone recording or pronunciation scoring

## Entry and session setup

1. From Home Words, open **Listen and Choose**.
2. Use the same Starters category chooser pattern as the other Words games.
3. Start a round of **8–12 words** from that category.
4. If fewer than 8 words exist, use all of them.
5. If more than 12 exist, randomly select 8–12.
6. Multi-word phrases and hyphenated forms are allowed as targets and distractors.

## Puzzle rules

- The target is one Starters word from the chosen category.
- Do **not** show the target word as the question prompt.
- Show **4** written word choices when the category has enough words.
- If the category has fewer than 4 words, show all available words and still include the target.
- Always include the correct word.
- Distractors come from the same category when possible.
- Prefer distractors with somewhat similar length when practical, but do not block the release on perfect similarity scoring.
- Shuffle choice order for the card; keep it stable while the card is visible.
- Use readable word buttons, not tiny chips.

## Speech behaviour

- Auto-speak the target word once when the card appears.
- Provide **Hear word** to repeat anytime.
- If speech is unavailable, show a clear adult fallback:
  - Ask an adult to say the word
  - Provide **Heard it** before choices become active, or allow choices with on-screen guidance that an adult should speak the word
- Recommended MVP when speech is unavailable:
  - Show: **Ask an adult to say the word.**
  - Provide **Heard it**
  - Then enable choices

## Feedback and progression

- The child taps one written word.

### Correct

- Confirm briefly, e.g. **Yes! Bird.**
- Optionally speak the word again.
- Unlock continue.

### Incorrect

- Teach the answer, e.g. **Not quite. It is bird.**
- Reveal/highlight the correct choice.
- Keep the incorrect choice eliminated.
- Require the child to tap the correct word before continue unlocks.
- Do not advance automatically.

Continue labels:

- **Next**
- **See Results** on the final word

## End screen

- Heading: **Great listening!**
- Supporting text: **You practised {count} words about {category}.**
- Actions: **Play Again**, **Choose Category**, **Home**
- No harsh score, percentage, or stars.

## Home

- Replace the Listen and Choose Coming soon placeholder with a live Words play button.
- Description: **Hear a word and choose it.**

## Visual and interaction requirements

- Keep listening as the primary task: no target-word reveal in the prompt area.
- Word choices are the main interactive focus after hearing.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit choices, Hear word, feedback, and continue controls in iPad landscape without cropping.

## Accessibility

- Announce that a new word is ready to hear.
- Choice buttons use the visible word as accessible name.
- Feedback uses a polite live region.
- Correctness must not rely on colour alone.
- Speech unavailable fallback must remain usable.

## Acceptance criteria

- [ ] Listen and Choose launches from Home Words as a live game.
- [ ] Category chooser and 8–12 word rounds match the Starters pattern.
- [ ] Each card has a hidden target word and up to 4 written choices including the target.
- [ ] Distractors come from the same category when possible.
- [ ] The target word auto-speaks once on card appearance.
- [ ] Hear word can repeat the target.
- [ ] Correct choices confirm and unlock continue.
- [ ] Incorrect choices teach the correct word and require tapping it before continue.
- [ ] Speech-unavailable fallback remains usable with an adult.
- [ ] End screen is encouraging and score-light.
- [ ] Exact Starters spellings are preserved.
- [ ] The experience fits iPad landscape.

## Open questions

None currently blocking engineering.
