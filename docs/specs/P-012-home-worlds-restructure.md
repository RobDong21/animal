# P-012: Home Worlds Restructure and Coming Soon Placeholders

## Status

Approved for engineering.

## Problem

Home currently presents animal play, Starters reading, and parent tools as one flat list. Adding Missing Letter and future spelling games would make that list harder for children to scan. Future game ideas also need a visible placeholder so they are not forgotten.

## Goal

Restructure Home into clear **Animals**, **Words**, and **For parents** sections (Concept A), and show two Coming soon Words games as placeholders only.

## Non-goals

- Building Build the Word or Listen and Choose gameplay
- Renaming beyond the approved Camimi Learn brand
- Nested Animals / Words hub pages that add an extra tap before every game
- More than two Coming soon placeholders on Home
- Changing Discover, Explorer, Starters Words, or parent-list gameplay beyond Home entry layout

## Home structure

Keep a single Home screen with one primary composition and clear sections:

1. Brand block
2. **Animals** section
3. **Words** section
4. Quiet parent links

### Brand block

- Keep title: **Camimi Learn**
- Supporting line:
  - **Play with animals and words!**
- Do **not** show a Home hero image. The previous `camimi` hero asset has been removed to reduce clutter.

### Animals section

Section label: **Animals**

Live games:

- **Discover** — Familiar animals with fewer choices.
- **Explorer** — More animals, types, and habitats.

### Words section

Section label: **Words**

Live games:

- **Starters Words** — Practice Cambridge Pre A1 words.
- **Missing Letter** — Find the missing letter in a word.

Coming soon placeholders:

- None for this delivery once P-014 and P-015 ship.
- Home Words live games become:
  - Starters Words
  - Missing Letter
  - Build the Word
  - Listen and Choose

Historical note: Build the Word and Listen and Choose began as Coming soon placeholders in the first P-012 release.

### For parents

- Keep **Animal list** and **Word list** on Home as a quiet footer, not a third equal section.
- Do not use the Animals/Words section heading treatment for parents.
- Present compact text links, such as `Parents · Animal list · Word list`.
- Keep labels understandable to adults without competing with child play CTAs.

## Live game button rules

- Discover, Explorer, Starters Words, and Missing Letter use the established secondary CTA treatment already used for play modes.
- Each live game has a short supporting description.
- Missing Letter launches the P-013 experience.
- Starters Words, Discover, Explorer, and parent lists keep their current destinations.

## Coming soon placeholder rules

- Placeholders are visible under Words, below the live Words games.
- Visual treatment is quieter than live games:
  - outline/ghost or otherwise clearly secondary
  - show **Coming soon** in the supporting line or as a quiet badge
- Tapping a placeholder does **not** launch a game.
- Tapping shows a short, friendly message such as:
  - **Coming soon!**
- Use a lightweight pattern already available in the app when practical (for example a short toast or inline status). Do not invent a complex modal system.
- Placeholders are not disabled mystery buttons with no feedback.
- Limit Home placeholders to these two games only.

## Layout and UX requirements

- Design for iPad landscape first and keep the full Home usable without awkward cropping.
- Preserve one clear hierarchy: brand, then Animals, then Words, then For parents.
- Section labels should be quieter than game titles.
- Do not turn Home into a dense dashboard of cards, chips, and stats.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Reuse existing typography, spacing, radius, and button roles.
- If content grows tall, allow intentional scrolling rather than shrinking touch targets below 44×44px.

## Accessibility

- Section labels should be exposed as headings or equivalent structure.
- Coming soon controls need accessible names that include Coming soon.
- Live games and parent tools keep clear accessible names.
- Coming soon feedback must be available to assistive technology.

## Acceptance criteria

- [ ] Home is organized into Animals, Words, and For parents sections.
- [ ] Animals contains Discover and Explorer only as live animal games.
- [ ] Words contains Starters Words and Missing Letter as live games.
- [ ] Words contains Build the Word and Listen and Choose as Coming soon placeholders only.
- [ ] Tapping a placeholder shows a Coming soon message and does not launch gameplay.
- [ ] Animal list and Word list appear as quiet parent text links, not an equal third play section.
- [ ] Supporting Home copy reflects animals and words.
- [ ] Missing Letter has a Home entry that launches P-013.
- [ ] Existing Discover, Explorer, Starters Words, and parent-list destinations still work.
- [ ] Home remains readable and usable in iPad landscape.

## Follow-up ideas

- First Letter as a later Words game
- Replace Coming soon cards with live games one at a time
- Broader app rename if Words becomes equal to Animals long-term

## Open questions

None currently blocking engineering.
