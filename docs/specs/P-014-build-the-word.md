# P-014: Build the Word

## Status

Approved for engineering.

## Problem

Missing Letter practises noticing one letter. Children also need practice assembling the full spelling from letters, still without free typing.

## Goal

Add a live Home Words game where the child builds a Starters word by tapping scrambled letter tiles into order.

## Depends on

- Existing Starters word data and speech helpers
- Home Words section from P-012

## Non-goals

- Free typing or handwriting
- Drag-and-drop as the only interaction model
- Pictures for words
- Persistent progress
- Quick Review in this release
- Changing Missing Letter or Starters Words behaviour

## Entry and session setup

1. From Home Words, open **Build the Word**.
2. Use the same Starters category chooser pattern as Starters Words / Missing Letter.
3. Start a round of **10 words** from that category.
4. If fewer than 10 words exist, use all of them.
5. If more than 10 exist, randomly select 10.
6. Multi-word phrases and hyphenated forms are allowed.

## Puzzle rules

- Use the exact written Starters word as the source.
- Show empty slots for every letter in order.
- Keep spaces visible as non-editable gaps for multi-word phrases.
- Keep hyphens visible as fixed characters, not as tappable letter tiles.
- Letter tiles include exactly the letters needed for the word, scrambled.
- Duplicate letters appear as separate tiles when the word contains duplicates.
- Scramble order is stable for the current card.
- Do not show the completed word until the child succeeds or is taught after mistakes according to feedback rules below.
- Use large, readable slots and tiles suitable for iPad landscape.

## Interaction

- Tapping a bank tile places that letter into the next empty slot.
- Tapping a filled slot returns that letter to the bank and clears later letters to the right if needed, or clears only that slot and shifts — prefer the simpler rule:
  - **Undo last letter** control, and/or tap the last filled slot to remove it
- Provide a clear **Undo** when at least one letter has been placed.
- When all slots are filled, evaluate automatically.
- **Hear word** speaks the full target word.
- Do not auto-speak when the card appears.
- Hearing remains available before and after answering.

## Feedback and progression

### Correct build

- Confirm briefly, e.g. **Yes! Bird.**
- Show the completed word clearly.
- Unlock continue.

### Incorrect build

- Teach the correct spelling, e.g. **Not quite. It is bird.**
- Reveal the correct word.
- Offer one clear recovery path:
  - **Try again** resets slots and bank scramble for the same word, or
  - require the child to rebuild after seeing the answer once
- Recommended MVP recovery:
  1. Reveal the correct word in feedback
  2. Reset the puzzle
  3. Keep Hear word available
  4. Unlock continue only after a correct build
- Do not advance automatically on a wrong attempt.
- Continue labels:
  - **Next**
  - **See Results** on the final word

## End screen

- Heading: **Great building!**
- Supporting text: **You built {count} words about {category}.**
- Actions: **Play Again**, **Choose Category**, **Home**
- No harsh score, percentage, or stars.

## Home

- Replace the Build the Word Coming soon placeholder with a live Words play button.
- Description: **Build the word from letters.**

## Visual and interaction requirements

- Keep the slot word as the focal point; tiles secondary.
- Tiles and slots must remain easy to tap in landscape, including longer words; allow wrapping rather than tiny tiles.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit puzzle, Hear word, feedback, and continue controls without cropping.
- On each correct assemble, play a short non-blocking fireworks burst (~1s). Celebration must not hide feedback or block Next. Respect `prefers-reduced-motion`.

## Accessibility

- Slots should expose current assembled letters and empty positions.
- Letter tiles need names such as “Letter B”.
- Feedback uses a polite live region.
- Correctness must not rely on colour alone.

## Acceptance criteria

- [ ] Build the Word launches from Home Words as a live game.
- [ ] Category chooser and 10-word rounds match the Starters pattern.
- [ ] Each puzzle provides scrambled tiles for exactly the needed letters.
- [ ] Spaces and hyphens remain visible fixed structure.
- [ ] Tapping tiles fills slots; Undo or equivalent can remove placed letters.
- [ ] A full placement is evaluated automatically.
- [ ] Correct builds confirm and unlock continue.
- [ ] Incorrect builds teach the correct word and require a successful rebuild before continue.
- [ ] Hear word speaks the full word and does not auto-play on appearance.
- [ ] End screen is encouraging and score-light.
- [ ] Exact Starters spellings are preserved.
- [ ] The experience fits iPad landscape.

## Open questions

None currently blocking engineering.
