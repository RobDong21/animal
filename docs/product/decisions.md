# Camimi Learn Product Decisions

Record durable product decisions here. Newer accepted decisions supersede conflicting older ones.

## 2026-08-29

### D-001: Target audience

- **Status:** Accepted
- The target audience is children aged 5–8.

### D-002: Primary learning goal

- **Status:** Accepted
- Vocabulary is the primary goal.
- Biological classification and habitats should reinforce vocabulary rather than replace it.

### D-003: Independent play

- **Status:** Accepted
- The experience should support independent play.
- Adult help may be needed during initial use.

### D-004: Difficulty selection

- **Status:** Accepted
- Children choose their difficulty level before each game.
- The app will not recommend or automatically change levels in the first release.
- Difficulty and progress will not persist between sessions.

### D-005: Initial difficulty levels

- **Status:** Accepted
- The first release will contain Discover and Explorer.
- Discover replaces Easy.
- Explorer replaces Normal.
- Wildlife Expert is deferred.

### D-006: Educational feedback

- **Status:** Accepted as a product objective
- Every answer should eventually provide educational feedback.
- The feedback initiative follows the initial difficulty-level release.

### D-007: Product source of truth

- **Status:** Accepted
- Product discussion happens in the Product Manager chat.
- Approved priorities, decisions, and specifications are recorded under `docs/`.
- Engineering should implement from an approved specification rather than relying only on chat history.

### D-008: Educational feedback behavior

- **Status:** Accepted
- Every enabled type and habitat selection provides immediate inline educational feedback.
- Incorrect feedback states the correct concept and briefly contrasts it with the selected answer.
- The child still taps the correct answer rather than having it selected automatically.
- After completing both questions, the child uses a Next Animal button; the game does not advance automatically.
- The first release uses type and habitat relationship sentences rather than unique facts for every animal.

### D-009: Accurate animal categories

- **Status:** Accepted
- Educational feedback must not reinforce inaccurate or overlapping classifications.
- Explorer uses Mammal, Bird, Fish, Reptile, Amphibian, Insect, and Other Invertebrate.
- Sea Creature is removed as an animal type.
- Explorer shows no more than four relevant type choices for one animal.

### D-010: Quick Review

- **Status:** Accepted
- Missed concepts are reviewed in a Quick Review phase after the normal round.
- Only the missed type or habitat question is repeated.
- Type and habitat are separate review concepts, including when both were missed for one animal.
- Discover reviews at most two concepts; Explorer reviews at most three.
- Review mistakes receive educational feedback but never create another review loop.
- Review questions do not affect score, base round size, or future sessions.

### D-011: Learning-focused results

- **Status:** Accepted
- The results screen emphasizes vocabulary encountered rather than accuracy or competitive grading.
- Stars, percentages, and “matched X out of Y” are removed.
- The recap shows up to three distinct animal summaries, prioritizing animals from Quick Review.
- The recap displays animals explored and Quick Reviews completed without showing mistake counts.
- Play Again keeps the same level; Choose Another Level returns to level selection.

### D-012: Animal image sourcing and approval

- **Status:** Accepted
- Core animal vocabulary uses real photographs rather than generated illustrations.
- New sources must be explicitly CC0 or public domain.
- Candidate images are cropped and optimized to 4:3 WebP previews before replacing production assets.
- Product approval is required after side-by-side review at game size.
- Image provenance is recorded even when legal attribution is not required.
- Production assets are optimized through a reusable Sharp script before commit.

### D-013: Starters Words as a separate activity

- **Status:** Accepted
- Cambridge Pre A1 Starters practice is a second home activity, not part of Discover or Explorer.
- The first release is category-based one-word reading practice with speech, not a quiz.
- Rounds use 8–12 words from one category.
- Pictures are deferred; Animals, Colours, and Food are the preferred first picture categories later.
- Keep the Camimi Learn brand for now; do not present the activity as an official Cambridge product.

### D-014: Starters reading support loop

- **Status:** Accepted
- Each Starters word follows: see → try → optionally break apart → hear full word at least once → continue.
- Next stays locked until the full word has been heard once.
- Cards do not auto-speak on appearance.
- Break it apart is always available but visually quieter than Hear word.
- Chunk taps speak only the chunk; only full-word hearing unlocks Next.
- Multi-word and hyphenated forms split automatically; curated chunks are preferred when provided.

### D-015: Starters Quick Review

- **Status:** Accepted
- After hearing a Starters word, the child or adult marks Got it or Practise again.
- Next unlocks only after hearing and marking.
- Words marked Practise again can appear in an end-of-round Quick Review, up to 3 words.
- Review reuses the same reading support and does not create another review loop.
- No scores or mistake counts; language stays encouraging.

### D-016: Starters reading focus

- **Status:** Accepted
- Starters practice words use a dedicated larger reading type role, bigger than `.text-display`.
- Previous stays on the same bottom row as Next, but is much smaller so it is harder to press by mistake.
- Next / Next Review / See Results keeps primary visual weight and most of the row width.

### D-017: Parent word list browser

- **Status:** Accepted
- Parents can open a secondary Word list from Home to review every word by category.
- The browser uses a two-column layout: categories with counts on the left, words on the right.
- The first category is selected by default so browsing other categories takes one tap.
- The list is read-only and separate from child practice rounds.
- Practice remains category → short round; the full list is for adult confirmation.

### D-018: Parent animal list browser

- **Status:** Accepted
- Parents can open a secondary Animal list from Home to review the animal catalogue.
- The browser uses a two-column layout: All animals plus types with counts on the left, animals on the right.
- A mode filter supports All / Discover / Explorer.
- Each row shows name, type, habitats, and mode availability.
- The list is read-only and separate from child play.

### D-019: Parent lists live on Home

- **Status:** Accepted
- Animal list and Word list are grouped as quiet parent links on Home, not a third play section.
- Child play entries remain Discover, Explorer, and Starters Words.
- Parent list entry points are not nested inside individual activity screens.

### D-020: Home worlds structure

- **Status:** Accepted
- Home uses Concept A sections: Animals, Words, and For parents.
- Animals contains Discover and Explorer.
- Words contains Starters Words, Missing Letter, Build the Word, and Listen and Choose as live games.
- Supporting Home copy may mention both animals and words under the Camimi Learn brand.

### D-021: Missing Letter mode

- **Status:** Accepted
- Missing Letter is a separate Home Words game, not nested inside Starters Words practice.
- It uses the Starters word list and blanks any one letter.
- Answers are tappable letter choices with educational feedback.
- Incorrect answers reveal the correct letter and require the child to tap it before continuing.

### D-022: Product brand name

- **Status:** Accepted
- The product brand shown on Home and in app chrome is **Camimi Learn**.
- Supporting Home copy remains: Play with animals and words!
- Animals and Words remain section labels within Camimi Learn.

### D-023: Build the Word

- **Status:** Accepted
- Build the Word is a live Home Words game using Starters categories.
- Children assemble the exact spelling from scrambled letter tiles.
- Spaces and hyphens stay as fixed structure.
- Incorrect builds are taught and require a successful rebuild before continuing.

### D-024: Listen and Choose

- **Status:** Accepted
- Listen and Choose is a live Home Words game using Starters categories.
- The target word is heard, not shown as the prompt.
- Children choose from written options in the same category.
- Incorrect choices are taught and require tapping the correct word before continuing.

### D-025: Build the Word difficulty modes

- **Status:** Accepted
- Home keeps a single **Build the Word** entry.
- After category selection, the child chooses a mode (Option C) on large peer CTAs.
- Mode labels show **Easy** and **Normal** as the primary titles, with descriptive names secondary:
  - **Easy** — Build with Help
  - **Normal** — Build the Word
- This is an intentional exception to Animals’ Discover / Explorer naming (D-005); Easy / Normal are shown only on the Build the Word mode chooser.
- **Easy:** place into the next slot only; correct letters stay with a small success-colored tick at the bottom-right of the slot; incorrect letters still place with a small error-colored cross at the bottom-right; child must Undo or tap the letter to clear; bank stays locked until cleared; no auto-clear; no full-word reveal on a single wrong letter.
- Mode CTAs grow with their text (min-height, not fixed height).
- **Normal:** keeps full-word evaluation (current behaviour); no per-letter tick / cross while building.
- Fireworks celebrate only when a word is finished correctly.
- Mode is chosen each session path and is not persisted; Play Again keeps category and mode.

### D-026: Child-facing Home copy for Words

- **Status:** Accepted
- Home Starters Words description uses child language: **Practice reading words.**
- Keep Cambridge Pre A1 wording in parent docs, specs, and data comments where accuracy matters.
- Words practice games share one round header, Hear word control, and feedback banner implementation.

### D-027: Sequential animal questions

- **Status:** Accepted
- Normal Discover / Explorer play asks **What is it?** first, then **Where does it live?** on the same animal.
- Type and habitat remain one learning story; they are not split into separate Home games.
- Quick Review stays one concept at a time.
