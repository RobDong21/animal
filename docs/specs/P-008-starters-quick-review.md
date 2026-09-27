# P-008: Starters Quick Review

## Status

Approved for engineering.

## Problem

Animal World reviews missed concepts at the end of a round, but Starters Words has no equivalent. Without a way to mark hard words, the app cannot usefully review reading difficulty. Live testing suggests children benefit from revisiting words that needed help.

## Goal

Let the child or adult mark whether a word was manageable, then review up to a few marked words at the end of the round in an encouraging Quick Review phase.

## Depends on

- P-007 Starters reading support must be in place:
  - no auto-speak on card appearance
  - Hear word required for full-word audio
  - optional Break it apart
- This initiative extends that loop to:

**See → try → optionally break apart → hear full word → mark Got it / Practise again → continue → Quick Review if needed**

## Non-goals

- Automatic right/wrong detection or microphone scoring
- Persistent progress across sessions
- Scores, stars, percentages, or mistake counts on the end screen
- Reviewing words marked Got it
- Unlimited review loops
- Changes to Discover or Explorer
- Pictures for Starters words

## Marking during the normal round

After the full word has been heard at least once:

1. Show two quiet choices:
   - **Got it**
   - **Practise again**
2. Keep the language encouraging. Do not use Wrong, Failed, Missed, or Mistake.
3. Selecting either mark unlocks **Next**.
4. **Next** remains disabled until both:
   - the full word has been heard once, and
   - Got it or Practise again has been selected
5. Hearing a chunk alone does not unlock marking or Next.
6. The selected mark should show a clear selected state.
7. The child may change the mark before leaving the card.
8. Moving to another word keeps the latest mark for the left word.
9. Returning with Previous restores that word’s previous mark if one exists; hearing and mark requirements still apply before Next unlocks again.
10. Break it apart remains available and does not by itself mark Practise again.

## Definition of a review candidate

- A word becomes a review candidate when its latest mark in the normal round is **Practise again**.
- Changing a mark from Practise again to Got it before leaving the card removes it as a candidate.
- Words marked Got it are not reviewed.
- Unmarked words cannot occur if the Next gate is enforced.
- Marks made during Quick Review never create another review candidate.

## Review limits

- Review at most **3** words marked Practise again.
- If more than 3 are marked, select the earliest marked Practise again words in round order.
- Skip Quick Review entirely when no word is marked Practise again.
- Review words do not change the base round size display used during normal practice.

## Quick Review sequence

1. Complete all normal-round words using Next.
2. If review candidates exist, enter Quick Review before the final end screen.
3. Introduce the phase with:
   - Heading: **Quick Review**
   - Supporting text: **Let’s try a few again.**
4. Show one review word at a time with progress **Review {current} of {total}**.
5. Reuse the same support controls as normal practice:
   - whole word first
   - optional Break it apart / Put together
   - Hear word
6. Soft gate still applies: Hear word at least once, then Got it or Practise again, then continue.
7. After the correct continue action:
   - **Next Review** when another review remains
   - **See Results** after the final review
8. Continue to the existing encouraging end screen.
9. Do not schedule a second Quick Review if Practise again is chosen again during review.

## End screen

Keep the current learning-focused end screen:

- Heading: **Great reading!**
- Supporting text: **You practised {count} words about {category}.**

Optional quiet addition only when Quick Review happened:

- **You also did {review count} Quick Reviews.**

Do not show how many were marked Practise again, and do not use failure language.

Actions remain:

- Practice Again
- Choose Category
- Home

## Session behavior

- Marks and review data exist only for the current round.
- Practice Again, Choose Category, and Home clear previous marks and review state.
- Review does not affect category size, scoring, or future sessions.
- No persistence across app reloads is required.

## Visual and interaction requirements

- Got it and Practise again must be clearly distinct from Hear word and Next.
- Prefer equal-weight choice buttons rather than a strong success/error treatment.
- Quick Review must feel encouraging, matching Animal World’s Quick Review tone.
- Distinguish review progress from normal word progress.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit marking controls and navigation in iPad landscape without cropping.

## Accessibility

- Got it and Practise again need clear accessible names.
- Disabled Next should explain that the word must be heard and marked first.
- Announce entry into Quick Review politely.
- Do not move focus unexpectedly after speech or marking.

## Acceptance criteria

- [ ] After Hear word, Got it and Practise again become available.
- [ ] Next stays disabled until the full word is heard and a mark is selected.
- [ ] Practise again words become review candidates; Got it words do not.
- [ ] Changing a mark before leaving the card updates the candidate status.
- [ ] A round with no Practise again marks skips Quick Review.
- [ ] Quick Review includes at most 3 words, earliest first when over the limit.
- [ ] Quick Review begins only after the normal round is complete.
- [ ] Review cards reuse Break it apart and Hear word support.
- [ ] Review still requires hearing the full word and choosing a mark before continuing.
- [ ] Choosing Practise again during review does not create another review loop.
- [ ] The end screen remains encouraging and does not show mistake counts.
- [ ] Marks and review history clear when starting or leaving a round.
- [ ] The experience works across categories and fits iPad landscape.

## Follow-up ideas

- Per-category icon polish on the chooser
- Seed more curated chunks from live testing
- Starters pictures by category
- Optional adult-only marking mode

## Open questions

None currently blocking engineering.
