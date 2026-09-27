# P-011: Parent Animal List Browser

## Status

Approved for engineering.

## Problem

Parents need an easy way to review and confirm the animals included in Animal World: their names, types, habitats, and whether they appear in Discover, Explorer, or both. Starting a play round is a poor way to audit that catalogue.

## Goal

Provide a quiet, read-only animal catalogue browser for adults, using a two-column layout similar to the Starters Word list.

## Non-goals

- Making the catalogue the child’s default play path
- Editing animals, types, or habitats in the UI
- Image replacement or image-approval workflow
- Search in this release
- Starting a game from a listed animal in this release
- Changes to Discover or Explorer gameplay rules
- Starters Words content

## Entry point

- On Home, add a secondary control below the play modes:
  - **Label:** Animal list
  - Placement: quieter than Discover / Explorer / Starters Words, grouped with Word list
- Keep Discover, Explorer, and Starters Words as the primary child path.
- Do not present Animal list as an equal game mode.

## Browse experience

Use a two-column master-detail layout optimized for iPad landscape:

1. Open **Animal list** from Home.
2. **Left column:**
   - **All animals** at the top
   - Then each animal type from the current game model
3. **Right column:** animals matching the selected left item and mode filter.
4. Select **All animals** by default when the browser opens.
5. Tapping another type updates the right column in place.
6. The list is read-only.

### Mode filter

Above the list, provide a compact filter:

- **All**
- **Discover**
- **Explorer**

Default: **All**.

Behavior:

- **All:** show every animal in the catalogue.
- **Discover:** show only animals included in Discover mode.
- **Explorer:** show the Explorer catalogue.
- Type counts in the left column should reflect the active mode filter.
- Changing the filter updates the list in place and keeps the current type selection when still valid; if the current type has zero matches, fall back to **All animals**.

### Counts

- Left column: each row shows its count under the active mode filter, e.g. `Mammal · 24`
- **All animals** shows the total under the active filter
- Right-column header shows:
  - selected type or All animals
  - matching count, e.g. `24 animals`
- Optional quiet total for the full catalogue when filter is All

### Animal row content

Each right-column row shows:

- Animal name
- Type name
- Habitats in natural readable form
- Mode availability:
  - Discover
  - Explorer
  - or both

Do not require animal images in this release. If a small thumbnail is easy and already available, it may be included, but text confirmation is the priority.

### Layout guidance

- Left column: narrower type rail; right column: wider animal list.
- Selected type has a clear selected state.
- Selected mode filter has a clear selected state.
- Right column scrolls independently when the list is long.
- Left column remains visible while scrolling animals whenever landscape space allows.

## Content rules

- Use the same animal, type, habitat, and mode rules as gameplay.
- Discover membership must match `getAnimalsForMode('discover')` behavior.
- Explorer membership must match the Explorer catalogue.
- Habitat labels should match the names parents already see in the game.
- Do not invent animals or alter classifications in this UI.

## Visual and interaction requirements

- Optimize for adult scanning more than child play, while staying visually consistent with the app.
- Prefer compact rows over large play cards.
- Keep Animal list secondary to Discover / Explorer.
- Reuse existing typography, spacing, radius, and button roles.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit comfortably in iPad landscape without cropping the two-column structure.

## Accessibility

- Animal list entry needs a clear accessible name.
- Type list and animal list should use semantic list structure where practical.
- Selected type and mode filter must be exposed to assistive technology.
- Heading hierarchy should identify the browser and current selection.
- Touch targets for type switching, mode filtering, and back navigation remain at least 44×44px.

## Acceptance criteria

- [ ] Home includes a secondary Animal list control below the play modes.
- [ ] Animal list is not presented as a third equal game mode.
- [ ] The browser uses a two-column layout: types left, animals right.
- [ ] All animals is selected by default.
- [ ] Mode filter defaults to All and supports All / Discover / Explorer.
- [ ] Type counts reflect the active mode filter.
- [ ] Changing type or mode updates the animal list in place.
- [ ] Each animal row shows name, type, habitats, and mode availability.
- [ ] Discover and Explorer membership match gameplay data rules.
- [ ] The browser is read-only.
- [ ] Adults can return to Home easily.
- [ ] The browser is readable and usable in iPad landscape.

## Follow-up ideas

- Search by animal name
- Thumbnails for faster visual confirmation
- Jump from a listed animal into a one-animal practice round
- Habitat-based left rail as an alternate browse mode

## Open questions

None currently blocking engineering.
