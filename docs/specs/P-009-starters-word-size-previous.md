# P-009: Starters Word Size and Previous Control

## Status

Approved for engineering.

## Problem

Live testing showed two friction points on Starters Words practice cards:

- Previous has equal size and weight to Next, so children press it by mistake even though going back is rarely useful.
- The practice word uses `.text-display`, the largest existing type role, but it is still too small for comfortable early reading on iPad.

## Goal

Make the current word the clear visual focus, and make forward progress the prominent navigation action while keeping a much smaller Previous nearby.

## Non-goals

- Removing Previous entirely in this release
- Changing Animal World typography roles globally
- Confirm dialogs or long-press interactions for Previous
- Broader redesign of Starters Words layout

## Previous control

- Keep Previous on the same bottom row as Next / Next Review / See Results.
- Make Previous much smaller than the continue action so accidental presses are less likely.
- Give Next / Next Review / See Results most of the bottom row width and primary visual weight.
- Previous may use a compact outline or quieter treatment, but it stays in the same navigation row.
- Previous must remain clearly secondary to the continue action.
- Previous stays disabled on the first word of the current phase.
- Do not add confirmation, delay, or long-press requirements.
- Do not move Previous into the header or a hidden menu in this release.

## Reading typography

- Add a reading-specific type role in the design system, e.g. `.text-reading`.
- Use it only for the focal Starters practice word, not for Animal World headings or general titles.
- Target approximately:
  - base: `text-6xl`
  - larger breakpoints / iPad: `text-7xl` where space allows
- Keep the friendly font family already used by display/title roles.
- Preserve wrapping for longer words and multi-word phrases; do not force a single line by shrinking essential readability.
- In Break it apart view:
  - keep the whole-word reminder quieter than the reading word
  - keep chunk buttons large enough to tap, but do not let them overpower the main reading hierarchy

## Visual requirements

- The word remains the single primary focal point on the card.
- Bottom navigation hierarchy should read: same row, but continue action dominant and Previous much smaller.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit the larger word, support controls, marks, and continue action in iPad landscape without cropping.

## Accessibility

- Previous must keep a clear accessible name.
- Disabled Previous remains understandable on the first word.
- Larger text must not clip or overflow inaccessible content.
- Continue actions keep clear labels: Next, Next Review, and See Results.

## Acceptance criteria

- [ ] Previous remains on the same bottom row as the continue action.
- [ ] Previous is materially smaller than Next / Next Review / See Results.
- [ ] Next / Next Review / See Results keeps primary visual weight and most of the row width.
- [ ] A new `.text-reading` role exists and is used for the focal Starters word.
- [ ] The practice word is materially larger than `.text-display`.
- [ ] Long words still wrap cleanly.
- [ ] Animal World headings are unchanged unless they intentionally reuse an existing role.
- [ ] The card remains usable and uncropped in iPad landscape.

## Open questions

None currently blocking engineering.
