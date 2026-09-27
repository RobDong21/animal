export const STARTERS_REVIEW_LIMIT = 3

/**
 * Select up to `limit` Practise again words in normal-round order (earliest first).
 */
export function selectStartersReviewWords(round, marksByIndex, limit = STARTERS_REVIEW_LIMIT) {
  const selected = []

  for (let index = 0; index < round.length; index += 1) {
    if (marksByIndex[index] !== 'practise-again') continue
    selected.push(round[index])
    if (selected.length >= limit) break
  }

  return selected
}
