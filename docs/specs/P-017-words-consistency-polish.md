# P-017: Words consistency polish

## Status

Completed and product-approved.

## Problem

Camimi Learn shares design tokens, but Home copy and Words game chrome still feel evolved feature-by-feature. Child-facing labels mix adult exam language with kid-friendly names, and the same progress / Hear word / feedback patterns are duplicated with small drifts.

## Goal

Tighten Home child copy and unify the shared Words practice chrome so Starters Words, Missing Letter, Build the Word, and Listen and Choose feel like one product surface.

## Non-goals

- Redesigning Animal Discover / Explorer density in this release
- Adding Words pictures
- New games or difficulty modes beyond existing Build Easy / Normal
- Changing gameplay rules, scoring, or feedback teaching content
- Refactoring parent list browsers

## Scope

### Home copy

- Change Starters Words description from **Practice Cambridge Pre A1 words.** to **Practice reading words.**
- Keep Animals Discover / Explorer descriptions as they are.
- Keep Parents links quiet.
- Home play buttons use min-height with height auto so multi-line titles and descriptions are not clipped.

### Shared Words practice chrome

Extract and reuse one shared pattern for practice rounds across Words games:

1. **Round header** — Home control, “Word N of M” (or Review variant for Starters Quick Review), progress bar, category name, balancing spacer
2. **Hear word** — same size, gap, and icon treatment
3. **Feedback banner** — same success / error layout and tokens

Apply to:

- Starters Words
- Missing Letter
- Build the Word
- Listen and Choose

Category choosers and end screens may keep local copy (titles, supporting lines) but should continue using the same CTA roles (`cta-primary` / `cta-secondary`).

### Roadmap hygiene

- Move already-shipped Home / Missing Letter / parent-list specs out of active **Next** clutter into **Done** where accurate, so Now stays focused.

## Visual and interaction requirements

- Follow `.cursor/rules/ux-design-principles.mdc`.
- Do not introduce new one-off colors or shadows for this polish.
- Preserve iPad landscape fit without cropping.
- Keep touch targets ≥44×44px.

## Accessibility

- Shared header Home control remains labeled **Home**.
- Feedback remains a polite live region.
- Hear word keeps a clear speak aria-label.

## Acceptance criteria

- [ ] Home Starters Words description reads **Practice reading words.**
- [ ] Home play buttons grow with their text (no fixed-height clipping).
- [ ] Words practice games share one round-header implementation.
- [ ] Words practice games share one Hear word control styling via a shared component.
- [ ] Words practice games share one feedback banner implementation.
- [ ] Gameplay behaviour is unchanged aside from chrome/copy.
- [ ] Roadmap Now points at this polish (or Done once shipped); stale shipped items are not listed as urgent Next work.

## Open questions

None blocking.

## Approval status

Completed and product-approved.
