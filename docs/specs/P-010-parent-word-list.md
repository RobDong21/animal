# P-010: Parent Word List Browser

## Status

Approved for engineering.

## Problem

Parents need an easy way to review and confirm the full Cambridge Pre A1 Starters wordlist. The practice round only shows 8–12 sampled words, so it is a poor place to audit content. Switching categories should not require repeated back-and-forth navigation.

## Goal

Provide a quiet, read-only word list browser for adults to inspect every Starters word by category with minimal clicking.

## Non-goals

- Making the full list the child’s default practice path
- Scoring, marks, Quick Review, or reading gates inside the list
- Search, export, print, or edit-in-place in this release
- Starting practice from an individual listed word in this release
- Pictures for listed words
- Changes to Discover or Explorer

## Entry point

- On Home, add a secondary parent control below the play modes:
  - **Label:** Word list
  - Placement: quieter than Discover / Explorer / Starters Words, grouped with Animal list
- Keep Discover, Explorer, and Starters Words as the primary child path.
- Do not present Word list as an equal game mode on Home.
- Do not place the Word list entry on the Starters Words category screen.

## Browse experience

Use a two-column master-detail layout optimized for iPad landscape:

1. Open **Word list** from Home.
2. **Left column:** all 11 categories.
3. **Right column:** every word in the selected category.
4. Select the **first category by default** when the browser opens, so words are visible immediately with no extra click.
5. Tapping another category updates the right column in place. Do not push a separate page that requires Back to change category.
6. Provide a clear way to return Home.
7. The list is read-only.

### Counts

Show counts in both places:

- Left column: each category row shows its word count, e.g. `Animals · 22`
- Browser chrome or right-column header:
  - selected category name
  - selected category count, e.g. `22 words`
- Optional quiet total in the header: `241 words` across all categories

Do not show practice-round sample sizes here. These counts are always the full category totals.

### Layout guidance

- Left column: narrower category rail; right column: wider word list.
- Selected category has a clear selected state.
- Right column scrolls independently when the word list is long.
- Left column remains visible while scrolling words whenever landscape space allows.
- On narrower widths, keep the same model if possible; if stacking is required, preserve one-tap category switching without losing place awkwardly.

## Content rules

- Use the same imported Starters data used by practice rounds.
- Show exact spellings, including spaces and hyphenation.
- Show all words in a category, not a random sample.
- Do not invent, hide, or reorder words beyond the stored category order.
- Do not claim Cambridge endorsement.

## Visual and interaction requirements

- Optimize for adult scanning more than child play, while staying visually consistent with the app.
- Prefer compact category rows and a simple word list over large practice cards.
- Keep Word list secondary to the Home play CTAs.
- Reuse existing typography, spacing, radius, and button roles.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit comfortably in iPad landscape without cropping the two-column structure.

## Accessibility

- Word list entry needs a clear accessible name.
- Category list and word list should use semantic list structure where practical.
- Selected category must be exposed to assistive technology.
- Heading hierarchy should identify the browser and selected category.
- Touch targets for category switching and back navigation remain at least 44×44px.

## Acceptance criteria

- [ ] Home includes a secondary Word list control grouped with Animal list.
- [ ] Word list is not shown on the Starters Words category screen.
- [ ] Word list is not the primary child path into practice.
- [ ] The browser uses a two-column layout: categories left, words right.
- [ ] The first category is selected by default on open.
- [ ] Changing category updates the word list in place without a separate drill-in page.
- [ ] Each category shows its full word count.
- [ ] The selected category shows its name and full word count.
- [ ] All words from the selected category are listed with exact spellings.
- [ ] Exact spellings and category membership match practice data.
- [ ] No practice gates, marks, speech requirements, or scoring appear in the list.
- [ ] Adults can return to Home easily.
- [ ] The browser is readable and usable in iPad landscape.

## Follow-up ideas

- Search across all words
- Tap to hear a listed word
- Jump from a listed word into a short practice set
- Export or print for paper review

## Open questions

None currently blocking engineering.
