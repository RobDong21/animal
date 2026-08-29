# P-003: Review Missed Concepts Within the Round

## Status

Completed and product-approved.

## Problem

Educational feedback explains a mistake immediately, but the game does not check whether the child remembers the corrected concept later. Immediate correction alone can create recognition without durable recall.

## Goal

Give children a short, encouraging opportunity to recall selected concepts they missed earlier in the same round.

## Non-goals

- Persistent progress or review across sessions
- Adaptive difficulty
- Repeating correctly answered concepts
- Unlimited review loops
- End-of-round learning recap
- Changes to scoring or base round length

## Definition of a missed concept

- A missed concept is recorded when the child makes at least one incorrect enabled selection for an animal’s type or habitat during the normal round.
- Type and habitat are separate concepts.
- Multiple incorrect attempts for the same animal and concept create only one review candidate, while retaining the number of attempts for prioritization.
- Incorrect selections made during Quick Review never create another review candidate.

## Review limits

- Discover includes at most 2 review questions.
- Explorer includes at most 3 review questions.
- Skip Quick Review when the child made no mistakes during the normal round.
- Review questions do not count toward the displayed base round size.

## Candidate selection

When missed concepts exceed the mode limit, select candidates in this order:

1. Concepts with the greatest number of incorrect attempts
2. Different animals before selecting a second concept from the same animal
3. Earlier mistakes before later mistakes

The selection must be deterministic from the recorded round history rather than depending on object or rendering order.

## Review sequence

1. The child completes all normal-round animals using the P-002 Next Animal behavior.
2. After the final normal animal, enter Quick Review if review candidates exist.
3. Introduce the phase with:
   - Heading: **Quick Review**
   - Supporting text: **Let’s try a few again.**
4. Display one targeted review question at a time.
5. Show the animal image and name.
6. Show only the missed question:
   - **What is it?** for a missed type
   - **Where does it live?** for a missed habitat
7. Hide the unrelated question rather than showing it as completed.
8. Display **Review {current} of {total}** instead of normal animal progress.
9. After the correct answer, require:
   - **Next Review** when another review remains
   - **See Results** after the final review
10. Continue to the existing results experience.

## Review answers and feedback

- Apply all P-002 educational feedback behavior to review answers.
- If the first review answer is correct, confirm and explain it normally.
- If a review answer is incorrect, state the correct concept, reveal the correct choice, and require the child to tap it.
- Do not automatically complete the answer or advance.
- Do not schedule another review after a repeated mistake.
- All valid habitats remain correct for animals with multiple habitats.

## Choice behavior

- Use the active difficulty level’s approved categories and habitats.
- Always include the correct answer.
- Keep choices stable while the review question is displayed.
- Reshuffle choice positions relative to the original question when possible.
- Do not increase the number or complexity of choices merely because the question is a review.

## Session behavior

- Quick Review data exists only for the current round.
- Back to Home, Play Again, or a new game clears the review history.
- Play Again creates a fresh round with no carried-over candidates.
- Reviews do not add or remove points.
- The normal progress total remains 5 for Discover and 8 for Explorer.

## Visual and interaction requirements

- Quick Review must feel encouraging, not corrective or punitive.
- Do not use labels such as “Failed,” “Mistakes,” “Wrong answers,” or “Try again.”
- Reuse the normal game layout and established feedback states where practical.
- Clearly distinguish review progress from normal animal progress.
- Preserve the child-controlled progression established by P-002.
- Fit the complete review experience in iPad landscape without cropping.
- Follow `.cursor/rules/ux-design-principles.mdc`.

## Accessibility

- Announce entry into Quick Review through a polite live region or equivalent accessible status.
- Give each review question a programmatically available label.
- Feedback cannot rely on color, animation, or sound alone.
- Do not move focus unexpectedly after an answer.
- Next Review and See Results must be keyboard reachable and clearly labelled.

## Acceptance criteria

- [ ] Any incorrect normal-round type or habitat selection records one candidate for that animal and concept.
- [ ] Type and habitat missed for the same animal are treated as two candidates.
- [ ] Multiple incorrect attempts increase priority without creating duplicate candidates.
- [ ] A mistake-free round skips Quick Review.
- [ ] Discover contains no more than two review questions.
- [ ] Explorer contains no more than three review questions.
- [ ] Candidate selection follows the approved attempt-count, animal-diversity, and timing priorities.
- [ ] Quick Review begins only after all normal-round animals are complete.
- [ ] Each review shows the animal and only the missed question.
- [ ] Review progress is displayed separately from normal-round progress.
- [ ] Review choice positions are reshuffled when possible and remain stable during the question.
- [ ] P-002 feedback appears after every review selection.
- [ ] An incorrect review answer reveals but does not automatically select the correct answer.
- [ ] Review mistakes never create additional review loops.
- [ ] The child manually selects Next Review or See Results.
- [ ] Review questions do not affect score or base round size.
- [ ] Review history is cleared when starting or leaving a round.
- [ ] The experience works in both Discover and Explorer and fits iPad landscape.

## Follow-up initiative

- P-004: End-of-round learning recap

## Open questions

None currently blocking engineering.
