# P-002: Educational Feedback After Every Answer

## Status

Approved for engineering.

## Problem

Current feedback primarily says whether a choice is wrong and only explains the animal after both questions are complete. It is transient, advances quickly, and misses opportunities to reinforce vocabulary. Some current animal-type assignments are also inaccurate or use overlapping categories, which would make instructional feedback misleading.

## Goal

Make every type or habitat selection an immediate, accurate vocabulary-learning moment while keeping the child in control of progression.

## Non-goals

- Unique facts for every animal
- Automatic spoken explanations or new narration controls
- Reviewing missed concepts later in the round
- End-of-round learning recap
- Adaptive difficulty or persistent progress
- Changes to scoring



## Feedback experience

- Every enabled type or habitat selection produces immediate inline feedback.
- Feedback remains visible until the child makes another selection or moves to the next animal.
- Do not use a temporary toast as the primary gameplay feedback.
- Correct feedback uses positive confirmation and names the relationship.
- Incorrect feedback states the correct concept, contrasts it with the selected answer, and lets the child tap the correct answer.
- An incorrect choice remains eliminated. Reveal the correct choice visually, but do not select it automatically.
- If one question is complete, the child can continue answering the other question.
- After both questions are complete, show a combined learning summary and a prominent **Next Animal** button.
- Do not advance automatically. The child decides when to continue.



## Feedback copy

Copy may adjust for natural grammar, but it must retain the animal name and learning relationship.

### Correct type

> Yes! A dolphin is a mammal. Mammals breathe air, and mothers feed milk to their babies.



### Incorrect type

> Not quite. A dolphin is a mammal, not a fish. Mammals breathe air, and mothers feed milk to their babies.



### Correct habitat

> Yes! A camel can live in the desert.



### Incorrect habitat

> Not quite. A camel does not usually live in the ocean. It can live in the desert.



### Completed animal

> A camel is a mammal. It can live in the desert.

For animals with multiple valid habitats, list the valid habitats naturally without implying that only one is possible.

## Accurate animal-type model

Use mutually exclusive, broad categories:

- **Mammal:** “Mammals breathe air, and mothers feed milk to their babies.”
- **Bird:** “Birds have feathers and beaks.”
- **Fish:** “Fish live in water and breathe through gills.”
- **Reptile:** “Reptiles breathe air and usually have dry, scaly skin.”
- **Amphibian:** “Amphibians begin life in water and can live on land.”
- **Insect:** “Insects have six legs.”
- **Other Invertebrate:** “Other invertebrates are animals without a backbone.”

Remove **Sea Creature** as an animal type because it overlaps with mammals, fish, reptiles, and invertebrates.

At minimum, correct these assignments:

- Frog and newt → Amphibian
- Snail, worm, scorpion, octopus, jellyfish, starfish, crab, squid, shrimp, sea urchin, and lobster → Other Invertebrate
- Ocean mammals remain Mammal.
- Ocean fish remain Fish.
- Sea turtles remain Reptile.

Audit every animal assignment before release. Do not rely only on the examples above.

## Type choices

- Discover retains its four current categories: Mammal, Bird, Fish, and Insect.
- Explorer supports all seven categories globally.
- Show no more than four type choices for one animal: the correct category and three distinct distractors.
- Keep the four choices stable while the current animal is displayed.
- Every category must be mutually exclusive in the game model.



## Habitat language

Use natural phrases in feedback rather than inserting display labels mechanically:

- Home/City → “in homes or cities”
- Farm → “on farms”
- Forest → “in forests”
- Ocean → “in the ocean”
- Desert → “in deserts”
- Jungle → “in jungles”
- Polar → “in polar regions”
- Grassland → “in grasslands”
- Wild → “in the wild”



## Visual and interaction requirements

- Place feedback near the questions without covering the animal or controls.
- Use the existing success and error semantic colors, but never rely on color alone.
- Keep the animal, selected relationship, and Next Animal action visible in iPad landscape without cropping.
- Avoid introducing another decorative card if spacing and hierarchy can communicate the feedback.
- The correct-answer reveal must be distinguishable from a completed selection.
- Follow `.cursor/rules/ux-design-principles.mdc`.



## Accessibility

- Announce feedback through a polite live region.
- Do not interrupt or move focus after ordinary selections.
- The Next Animal button must be keyboard reachable and clearly labelled.
- Feedback must remain available long enough to read; it cannot depend on animation or sound.
- Correct, incorrect, revealed, and completed states must have non-color indicators.



## Acceptance criteria

- [x] Every enabled type and habitat selection produces immediate visible feedback.
- [x] Correct feedback names the animal and confirms the selected relationship.
- [x] Incorrect feedback names the correct relationship and contrasts it with the selected answer.
- [x] After an incorrect answer, the child must still tap a correct answer to complete that question.
- [x] Feedback remains visible until replaced or the child continues.
- [x] Completing both questions shows a combined summary and Next Animal button.
- [x] The game never advances to another animal automatically.
- [x] Sea Creature is no longer used as an animal type.
- [x] All animals use one of the seven approved, mutually exclusive type categories.
- [x] Explorer displays at most four stable type choices for each animal.
- [x] Discover continues to use its approved four-category content pool.
- [x] Multiple valid habitats are explained without marking a valid habitat incorrect.
- [x] Feedback grammar uses natural articles and habitat phrases.
- [x] Gameplay feedback is usable with sound disabled.
- [x] The complete experience fits and remains readable on iPad landscape.



## Follow-up initiatives

- P-003: Review missed concepts within the round
- P-004: End-of-round learning recap



## Open questions

None currently blocking engineering.