# P-013: Missing Letter Spelling Mode

## Status

Approved for engineering.

## Problem

Starters Words supports reading practice, but not yet letter-level spelling practice. A missing-letter game gives a child a clear next step using the same Cambridge Pre A1 word list.

## Goal

Add a separate Home Words game where the child finds one missing letter in a Starters word by tapping from letter choices.

## Depends on

- P-012 Home entry for **Missing Letter**
- Existing Starters word data and speech helpers

## Non-goals

- Build the Word gameplay
- Listen and Choose gameplay
- Free typing or handwriting
- Pictures for words
- Persistent progress
- Microphone scoring
- Mixing this into Discover / Explorer animal play
- Hiding multiple letters in one word

## Entry and session setup

1. From Home Words, open **Missing Letter**.
2. Show the same Starters category chooser pattern used by Starters Words.
3. After a category is selected, start a round of **10 words** from that category.
4. If the category has fewer than 10 words, use all available words.
5. If the category has more than 10 words, randomly select 10 for that round.
6. Multi-word phrases and hyphenated forms from the Starters list are allowed.

## Puzzle rules

- Use the exact written Starters word as the source.
- Blank **exactly one** letter in the word.
- Any one letter may be chosen, including the first letter.
- Prefer a deterministic or seeded choice per word in the round so the blank does not change while the card is visible.
- For multi-word phrases, blank one letter in one of the words; keep spaces visible.
- For hyphenated forms, the hyphen remains visible and is not a blankable letter.
- Show the incomplete word in a large reading-friendly size, using `.text-reading` when available.
- Represent the blank clearly, e.g. `e _ ephant` or a clear blank tile.

## Answer choices

- Show **4** letter choices whenever possible.
- Always include the correct letter.
- Distractors should be plausible letters, drawn preferentially from:
  - other letters in the same word
  - nearby alphabet letters
  - common English letters
- Avoid duplicate choices.
- If the alphabet cannot support 4 unique letters for an edge case, show fewer unique letters rather than duplicates.
- Shuffle choice order for the card; keep it stable while the card is visible.
- Choices are tappable letter buttons, not a keyboard.

## Card support

- Provide **Hear word**, speaking the full correct word.
- Hearing is optional and may be used before or after answering.
- Do not auto-speak when the card appears.
- Break it apart is not required for this release.
- Previous may exist, but if present it should follow the P-009 pattern: same row as continue, much smaller than Next.

## Feedback and progression

- The child taps one letter choice.
- **Correct:**
  - confirm briefly, e.g. **Yes! The letter is B.**
  - reveal the completed word
  - unlock continue
- **Incorrect:**
  - teach the answer, e.g. **Not quite. The missing letter is B. Bird.**
  - reveal the correct letter in the word
  - keep the incorrect choice visibly eliminated
  - require the child to tap the correct letter before continue unlocks
- Do not advance automatically.
- Continue label:
  - **Next** during the round
  - **See Results** on the final word
- Educational feedback remains visible until the child continues.

## End screen

- Heading: **Great letter work!**
- Supporting text: **You practised {count} words about {category}.**
- No harsh score, percentage, or stars.
- Actions:
  - **Play Again** — same category, new selection when possible
  - **Choose Category**
  - **Home**

## Quick Review

- Not required for the first Missing Letter release.
- May be added later using missed words.

## Visual and interaction requirements

- Keep the incomplete word as the primary focal point.
- Letter choices should be large enough for child taps and visually secondary to the word.
- Reuse existing button, spacing, radius, and feedback patterns where practical.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit the word, choices, feedback, and continue action in iPad landscape without cropping.

## Accessibility

- Expose the puzzle word in a way that indicates a missing letter.
- Letter buttons need accessible names such as “Letter B”.
- Feedback uses a polite live region.
- Correctness must not rely on color alone.
- Continue controls need clear labels.

## Acceptance criteria

- [ ] Missing Letter is launchable from the Home Words section.
- [ ] The child chooses a Starters category before the round.
- [ ] Rounds use 10 words, or all words when fewer than 10 exist.
- [ ] Each puzzle blanks exactly one letter from the source word.
- [ ] Any letter position may be blanked, including the first letter.
- [ ] The blank remains stable while the card is visible.
- [ ] Four unique letter choices are shown when possible, including the correct letter.
- [ ] Hear word speaks the full word and does not auto-play on card appearance.
- [ ] Correct answers confirm and reveal the completed word.
- [ ] Incorrect answers teach the correct letter and require tapping it before continue.
- [ ] The game never advances automatically.
- [ ] End screen is encouraging and score-light.
- [ ] Exact Starters spellings are preserved.
- [ ] The experience fits and remains usable in iPad landscape.

## Follow-up ideas

- Quick Review for missed Missing Letter words
- First Letter mode
- Build the Word
- Listen and Choose
- Adaptive blank selection that avoids confusing silent-letter cases

## Open questions

None currently blocking engineering.
