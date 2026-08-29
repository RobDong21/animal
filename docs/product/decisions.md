# Animal World Product Decisions

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
