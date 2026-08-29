# P-004: End-of-Round Learning Recap

## Status

Approved for engineering.

## Problem

The current results screen emphasizes stars and “matched X out of Y.” Because children eventually complete every animal after receiving educational feedback, this score does not represent their initial understanding and adds little learning value.

## Goal

End each round with a short, encouraging recap that reinforces the animal vocabulary and relationships the child encountered.

## Non-goals

- Accuracy percentages, grades, rankings, or penalties
- Persistent progress or history
- Parent or educator reporting
- Badges, unlocks, streaks, or share functionality
- Unique facts beyond the approved type and habitat relationships
- Reviewing additional questions from the results screen

## Results experience

Replace the existing results content with:

1. Heading: **Great exploring!**
2. Session summary:
   - Without Quick Review: **You explored {animal count} animals.**
   - With Quick Review: **You explored {animal count} animals and completed {review count} Quick Reviews.**
3. Supporting heading: **What you learned**
4. Up to three picture-supported learning statements
5. Primary action: **Play Again**
6. Secondary action: **Choose Another Level**

Remove the stars, percentage calculation, and “matched X out of Y” message from the user experience.

## Learning statements

- Each statement represents one distinct animal.
- Pair the animal’s image with its approved P-002 summary:

> A frog is an amphibian. It can live on farms or in forests.

- Use accurate article and habitat grammar from the educational feedback system.
- Do not repeat the same animal, even if both its type and habitat were reviewed.
- Display no more than three statements.
- Present statements as a compact list rather than three competing feature cards.
- The animal image should reinforce the word without becoming the dominant results-screen element.

## Statement selection

Choose distinct animals in this priority order:

1. Animals included in Quick Review, following review order
2. Animals with recorded mistakes that were not selected for Quick Review, ordered by greatest number of incorrect attempts and then earliest mistake
3. Other completed animals from the normal round, starting with the earliest encountered

Stop after selecting three distinct animals.

This selection is deterministic from the completed round and does not change when the component rerenders.

## Session counts

- **Animal count** is the base round size: 5 for Discover and 8 for Explorer.
- **Review count** is the number of Quick Review questions completed, not the number of distinct animals reviewed.
- Do not count the same reviewed question more than once.
- Do not display the number of incorrect attempts.
- Do not describe reviewed concepts as mistakes, failures, or weak areas.

## Actions

### Play Again

- Starts a fresh round using the same difficulty level.
- Clears all previous round, feedback, and review data.
- Does not persist recap selections.

### Choose Another Level

- Returns to Home so the child can select Discover or Explorer.
- Use this label instead of the generic “Back to Home” on the recap screen.

## Visual requirements

- Keep the heading, session summary, learning list, and both actions visually distinct.
- Use one clear primary CTA and one secondary CTA.
- Reuse existing typography, spacing, radius, button, and surface roles.
- Avoid stars, trophies, medals, confetti, or competitive visual grading.
- Keep each image consistently sized and cropped.
- Fit three learning statements and both actions in iPad landscape without cropping.
- On shorter viewports, allow intentional scrolling without hiding actions.
- Follow `.cursor/rules/ux-design-principles.mdc`.

## Accessibility

- Use a semantic heading for the recap title.
- Present learning statements as a semantic list.
- Give each animal image accurate alternative text using the animal name.
- Announce arrival at the recap or move programmatic focus to its heading without triggering visible scroll problems.
- Counts and learning statements must be understandable without images, color, animation, or sound.
- Both actions must be keyboard reachable with clear accessible names.

## Acceptance criteria

- [ ] The results screen heading is “Great exploring!”
- [ ] The recap displays the correct base animal count.
- [ ] The recap displays completed Quick Review count only when at least one review occurred.
- [ ] Stars, accuracy percentage, and “matched X out of Y” are absent.
- [ ] Up to three distinct animals appear under “What you learned.”
- [ ] Each item contains the animal image and an accurate type-and-habitat summary.
- [ ] Quick Review animals receive first selection priority.
- [ ] Missed but unreviewed animals receive second priority.
- [ ] Other completed animals fill remaining positions in encounter order.
- [ ] The same animal never appears twice in the recap.
- [ ] Statement selection remains stable across rerenders.
- [ ] Play Again starts a clean round at the same level.
- [ ] Choose Another Level returns to level selection.
- [ ] No recap data persists into another round or session.
- [ ] The recap is readable, accessible, and usable in iPad landscape.

## Open questions

None currently blocking engineering.
