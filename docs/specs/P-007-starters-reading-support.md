# P-007: Starters Reading Support

## Status

Approved for engineering.

## Problem

Live testing with a child aged in the target range showed three reading-support gaps in Starters Words:

- Next is too easy to press before the child tries the word.
- A word can be skipped without ever being heard.
- Longer words often look impossible as wholes, but become readable when broken into chunks.

## Goal

Guide each Starters Words card through a simple loop:

**See → try → optionally break apart → hear at least once → continue**

## Non-goals

- Microphone scoring or automatic right/wrong detection
- Full phonics or dictionary phonetic symbols
- Auto-speaking every new card by default
- Pictures for Starters words
- Persistent progress
- Changes to Discover or Explorer

## Card flow

For each word card:

1. Show the whole word.
2. Do **not** auto-speak when the card appears.
3. Let the child try to read it.
4. Keep **Break it apart** available as a quieter secondary action.
5. Require **Hear word** at least once before **Next** unlocks.
6. After the word has been heard once, unlock **Next**.
7. Allow **Hear word** to be repeated anytime.
8. Reset heard state and split state when moving to another word.

## Soft gate for Next

- **Next** starts disabled on each new word.
- **Next** unlocks only after the current word has been spoken at least once through **Hear word**.
- Hearing a chunk alone does **not** unlock Next.
- Only hearing the **full word** unlocks Next.
- **Previous** remains available and does not require hearing.
- Returning to a previous word resets that word’s gate: it must be heard again before Next unlocks.
- Do not use timers, double-tap confirmation, or an “I tried” button in this release.

## Speech behavior

- Keep the existing **Hear word** control.
- Default: no automatic speech on card change.
- **Hear word** speaks the full current word using the project speech helper.
- After the first successful full-word playback on the current card, mark the word as heard and unlock Next.
- If speech synthesis is unavailable, show a clear fallback so the adult can read aloud, and unlock Next after the child or adult acknowledges with a single **Heard it** action. Prefer speech when available.

## Break it apart

### Availability

- **Break it apart** is always available on practice cards.
- It must look quieter than **Hear word** so short easy words are not visually dominated by support controls.
- Label: **Break it apart**
- When split is active, provide **Put together** to return to the whole-word view.

### Display

- Whole-word view remains the default.
- Split view shows the same word as separated chunks beneath or in place of the dense whole word, while still making the full word relationship obvious.
- Prefer a pattern such as:

> elephant  
> el · e · phant

or a clearly chunked single line:

> el · e · phant

- Do not use IPA, stress marks, or dictionary pronunciation spelling.

### Interaction

- Tapping a chunk speaks only that chunk.
- **Hear word** continues to speak the full word.
- Chunk playback does not satisfy the Next gate.
- Split or whole presentation must remain readable in iPad landscape.

## Chunk rules

Use the simplest reliable chunking that helps early readers.

### Automatic splits

1. Multi-word phrases already in the list split on spaces first:
   - `ice cream` → `ice` · `cream`
   - `living room` → `living` · `room`
2. Hyphenated forms split on hyphens:
   - `T-shirt` → `T` · `shirt`

### Curated and fallback splits

- Support an optional curated `chunks` list in Starters word data for child-friendly sound chunks.
- Prefer curated chunks when present.
- For remaining single words without curated chunks, provide a simple fallback that prefers readable sound groups over perfect linguistic syllabification.
- Short words that cannot usefully split may remain a single chunk. In that case, **Break it apart** can still be available, but the display should not invent confusing fragments.
- Engineering may seed curated chunks for longer or commonly difficult Starters words as needed for quality, without blocking release on a complete hand-authored list.

### Quality bar for chunks

Chunks must:

- Be pronounceable by a child or adult helper
- Preserve letter order from the written word
- Avoid silent-letter puzzles and phonetic respelling
- Help the child map parts back to the whole written word

## Visual and interaction requirements

- Keep the current word as the primary focal point.
- **Hear word** remains the main support CTA.
- **Break it apart** / **Put together** are secondary.
- Disabled Next must look disabled, not broken.
- Reuse existing typography, spacing, button, and surface roles.
- Follow `.cursor/rules/ux-design-principles.mdc`.
- Fit the whole card, support controls, and navigation in iPad landscape without cropping.

## Accessibility

- Disabled Next needs an accessible name that explains it is unavailable until the word is heard.
- Chunk buttons need accessible names such as “Speak chunk el”.
- Split and whole-word changes should be announced politely without trapping focus.
- Speech must not be the only way to understand the word; the written form remains visible.

## Acceptance criteria

- [ ] A new word card does not auto-speak.
- [ ] Next is disabled until Hear word has played the full current word once.
- [ ] Hearing only a chunk does not unlock Next.
- [ ] Hear word can be repeated after Next is unlocked.
- [ ] Moving to another word resets heard and split state.
- [ ] Break it apart is always available and visually quieter than Hear word.
- [ ] Put together restores the whole-word view.
- [ ] Multi-word phrases split on spaces.
- [ ] Hyphenated words split on hyphens.
- [ ] Optional curated chunks are used when provided.
- [ ] Chunk taps speak only that chunk.
- [ ] Hear word still speaks the full word while split is active.
- [ ] No scoring, microphone checking, or phonetic symbols are introduced.
- [ ] The experience remains usable in iPad landscape.

## Follow-up ideas

- Adult toggle for “hear first” sessions
- Seed more curated chunks from live testing
- Starters pictures by category
- Gentle “I need help” path that auto-opens split for long words

## Open questions

None currently blocking engineering.
