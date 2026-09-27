# P-018: Sequential animal questions

## Status

Completed and product-approved.

## Problem

Discover and Explorer show type and habitat choices together on one animal card. That supports the learning story but feels dense for ages 5–8 on iPad.

## Goal

Keep type and habitat on the **same animal**, but ask them **one at a time** in normal play: first **What is it?**, then **Where does it live?**

## Depends on

- Existing Animal game feedback and Quick Review behaviour (P-002, P-003)

## Non-goals

- Splitting into two Home games or modes
- Changing Discover / Explorer content pools
- Changing Quick Review (already one concept at a time)
- Scores or end-screen changes (see P-004)

## Behaviour

### Normal round

1. Show only the type question until the correct type is selected.
2. Then show only the habitat question until the correct habitat is selected.
3. After both are correct, keep the existing combined summary and **Next Animal** control.
4. Supporting prompt under the progress bar:
   - Type step: **What is it?**
   - Habitat step: **Where does it live?**
5. Do not require the child to answer habitat before type.
6. Feedback, elimination, reveal-after-wrong, Hear/speak behaviour, and Habitat Help stay as today.

### Quick Review

- Unchanged: already shows only the reviewed concept.

## Visual requirements

- Follow `.cursor/rules/ux-design-principles.mdc`.
- Prefer calm single-focus choice grids; avoid leaving a disabled second grid visible during the first step.
- Fit iPad landscape without cropping.

## Accessibility

- Announce or label the active question clearly when the step changes.
- Feedback remains a polite live region.

## Acceptance criteria

- [ ] Normal play shows type choices before habitat choices are available.
- [ ] Habitat choices appear only after the correct type is selected (until the animal is complete).
- [ ] Supporting prompt matches the active step.
- [ ] Completing both still shows the animal summary and Next Animal.
- [ ] Quick Review behaviour is unchanged.
- [ ] Gameplay teaching rules are otherwise unchanged.

## Approval status

Completed and product-approved.
