# P-006: Cambridge Pre A1 Starters Words

## Status

Approved for engineering.

## Problem

The child needs a simple way to practise Cambridge Pre A1 Starters vocabulary through reading, separate from the Animal World classification game. The Starters wordlist covers many everyday categories beyond animals and is too large for one unguided session.

## Goal

Add a second activity where a child, often with an adult nearby, can practise Starters words one at a time through large text and spoken audio.

## Non-goals

- Pictures or illustrations for Starters words
- Quizzes, spelling, matching, or scoring
- Persistent progress or mastery tracking
- Mixing Starters words into Discover or Explorer
- Renaming the overall app away from Animal World
- Claiming Cambridge endorsement or exam preparation accreditation
- Covering all 241 words in a single session

## Branding and home entry

- Keep the Animal World brand and existing Discover / Explorer buttons.
- Add one new home button below the animal modes:
  - **Label:** Starters Words
  - **Description:** Practice Cambridge Pre A1 words.
- The Starters Words activity must feel visually consistent with the existing home CTAs, while remaining clearly separate from animal difficulty levels.

## Content source

- Use the Cambridge Pre A1 Starters wordlist provided as:
  - Local source: `/Users/rob/Downloads/Cambridge_Pre_A1_Starters_Wordlist.csv`
- Import the list into the repository as app data before implementation.
- Preserve:
  - Exact word spelling, including spaces and hyphenation such as `ice cream` and `T-shirt`
  - Category labels from the CSV
- Expected scope: 241 words across 11 categories:
  - Animals
  - Body and Face
  - Clothes
  - Colours
  - Family & People
  - Food and Drink
  - The Home
  - Toys & Play
  - Actions
  - Descriptive
  - Numbers
- Do not invent extra words.
- Do not present the activity as an official Cambridge product.

## Session flow

1. From Home, the child opens **Starters Words**.
2. Show a category chooser with all 11 categories.
3. After a category is selected, start a practice round of **8–12 words** from that category.
4. If the category has fewer than 8 words, use all available words.
5. If the category has more than 12 words, randomly select 8–12 for that round.
6. Present one word per card.
7. After the final word, show a short encouraging end screen.
8. From the end screen, allow:
   - **Practice Again** — same category, new shuffled selection when the category is large enough
   - **Choose Category** — return to category selection
   - **Home** — return to Animal World home

## Word card

Each card shows:

- Large, highly readable word text as the focal point
- Current progress such as **Word 3 of 10**
- Current category name in quieter supporting text
- A **speaker** control that speaks the current word
- **Previous** and **Next** controls
- A clear way to leave the activity and return Home

Behavior:

- Speaking must use the device speech synthesis already available in the project where practical.
- Tapping the speaker repeats the current word.
- Optional: speak the word automatically when a new card appears, as long as the child can still replay it manually.
- Previous is disabled on the first word.
- Next on the final word advances to the end screen.
- Do not require the child to prove they read the word correctly.
- Do not show answers, marks, timers, or stars.

## End screen

- Heading: **Great reading!**
- Supporting text: **You practised {count} words about {category}.**
- No score, accuracy, or mistake language.
- Actions: Practice Again, Choose Category, Home.

## Visual and interaction requirements

- Design for iPad landscape first.
- Keep one focal point: the current word.
- Use existing typography, spacing, radius, button, and surface roles.
- Touch targets must remain at least 44×44px.
- Category buttons must be easy to scan; group them clearly without decorative clutter.
- Follow `.cursor/rules/ux-design-principles.mdc`.

## Accessibility

- Word text must remain readable without relying on audio alone.
- Speaker, Previous, Next, and navigation controls need clear accessible names.
- Announce card changes through a polite live region or equivalent status where practical.
- Do not move focus unexpectedly after speaking a word.

## Acceptance criteria

- [ ] Home shows Discover, Explorer, and Starters Words as separate entries.
- [ ] Starters Words does not alter Discover or Explorer gameplay.
- [ ] All 11 CSV categories are available.
- [ ] Selecting a category starts an 8–12 word round from that category, or all words when fewer than 8 exist.
- [ ] Words appear one at a time with large text and progress.
- [ ] Speaker control speaks the current word using device speech synthesis.
- [ ] Previous and Next navigate the round correctly.
- [ ] Completing the round shows the encouraging end screen without scoring.
- [ ] Practice Again, Choose Category, and Home behave as specified.
- [ ] Exact CSV spellings and categories are preserved in app data.
- [ ] No pictures are required for this release.
- [ ] The activity fits and remains usable in iPad landscape.

## Follow-up ideas

- Add pictures category by category, starting with Animals, Colours, and Food
- Optional adult “Heard it / Needs practice” marks within a session
- Simple listen-and-choose quiz after reading practice
- Broader app branding if Starters Words becomes a peer product surface

## Open questions

None currently blocking engineering.
