# P-019: Build the Word Easy try drawing

## Status

Completed and product-approved.

## Problem

Easy mode confirms each letter immediately, so a child can tap letters at random, undo, and tap again with little cost. That bypasses thinking about the next sound or letter.

## Goal

Give Easy mode a limited number of wrong placements **per word**, shown as a friendly 4-part drawing. Completing the picture **ends the whole round**. Finishing every word shows a win celebration.

## Depends on

- P-016 Easy / Normal Build the Word

## Non-goals

- Hangman gallows or scary imagery
- Reducing the drawing when the child undoes
- Scores, stars, or win/loss counts on later rounds

## Behaviour

Easy drawing and try count reset for each new word until the round is won or lost.

1. Wrong next-letter placement still shows the letter with a cross; bank stays locked until Undo (or tap that letter), as today.
2. Each new wrong placement adds one part of a 4-part friendly drawing (not a gallows). Undo does not remove a part.
3. Four wrong placements complete the picture and **lose the session**:
   - Brief confirmation, then a full-screen **You lost**
   - Primary action: **Restart** (same category and mode)
   - No fireworks
4. Completing every word in the round **wins**:
   - **You win!**
   - Friendly happy drawing
   - Extra looping fireworks
   - Play Again, Choose Category, Home
5. Hear word stays available during play.
6. **Normal:** a wrong full-word check also loses the session (same **You lost** screen, without the Easy flower).

## Visual requirements

- Drawing is secondary to the letter slots during play; keep it small and readable in iPad landscape.
- Show remaining tries in a simple way (four dots or equivalent) plus a clear accessible name.
- Win/lose headings are large and central.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Respect `prefers-reduced-motion`.

## Accessibility

- Announce remaining tries and when the round is lost or won.
- Do not rely on the drawing alone.

## Acceptance criteria

- [ ] Easy allows four wrong placements per word before a session loss.
- [ ] The drawing has four parts and is per word until the round ends.
- [ ] Undo does not restore drawing parts.
- [ ] Completing the picture ends the round with **You lost** and Restart.
- [ ] Finishing the round shows **You win!** with a happy drawing and extra fireworks.
- [ ] A wrong Normal full-word check also ends the round.
- [ ] No win/loss tally is stored.

## Approval status

Completed and product-approved.
