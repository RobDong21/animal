# P-001: Discover and Explorer Difficulty Levels

## Status

Approved for engineering.

## Problem

The labels “Easy” and “Normal” do not clearly communicate the learning experience or the support available to a child.

## Goal

Allow children to independently choose between two positively named difficulty levels.

## Non-goals

- Wildlife Expert level
- Adaptive difficulty or level recommendations
- Persistent progress or level selection
- Educational explanations after answers
- New narration or hint systems

## User story

As a child, I can choose a clearly described level so that I can play with an amount of challenge that feels right for me.

## Discover

- Replaces the current Easy mode.
- Contains 5 animals per round.
- Uses familiar animals.
- Uses the existing reduced set of animal types and habitats.
- Provides fewer, clearly different choices.
- Retains the current generous hints and elimination of incorrect choices.
- Home description: “Familiar animals with fewer choices.”

## Explorer

- Replaces the current Normal mode.
- Contains 8 animals per round.
- Uses the full current animal, type, and habitat selection.
- Provides more choices and closer distractors.
- Home description: “More animals, types, and habitats.”

## Shared behavior

- The child chooses a level before every game.
- The app does not recommend or automatically change levels.
- The selected level and progress are not persisted.
- “Play Again” starts another round at the same level.
- “Back to Home” lets the child choose a different level.
- Do not use age labels such as “Ages 5–6.”
- Follow the project UX and iPad landscape rules.

## Acceptance criteria

- [ ] Home displays only Discover and Explorer.
- [ ] No user-facing references to Easy or Normal remain.
- [ ] Discover starts a five-animal round using the reduced content pool.
- [ ] Explorer starts an eight-animal round using the full current content pool.
- [ ] Results and Play Again preserve the selected level.
- [ ] Back to Home allows a different level to be selected.
- [ ] Both level choices are understandable and usable on iPad landscape.
- [ ] Existing gameplay continues to work in both levels.

## Open questions

None currently blocking engineering.
