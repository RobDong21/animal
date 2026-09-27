function hashSeed(text) {
  return [...text].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 0)
}

function seededShuffle(list, seed) {
  const shuffled = [...list]
  let state = seed >>> 0

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    const j = state % (i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

/**
 * Build up to 4 written choices for a listen-and-choose card.
 * Distractors prefer same-category words of similar length.
 */
export function buildListenChoices(targetWord, categoryWords, roundKey = targetWord) {
  const pool = categoryWords.filter((word) => word !== targetWord)
  const targetLength = targetWord.length

  const ranked = [...pool].sort((a, b) => {
    const lengthDiff =
      Math.abs(a.length - targetLength) - Math.abs(b.length - targetLength)
    if (lengthDiff !== 0) return lengthDiff
    return a.localeCompare(b)
  })

  const seed = hashSeed(`${roundKey}:listen`)
  const similar = ranked.slice(0, Math.min(6, ranked.length))
  const similarPicked = seededShuffle(similar, seed).slice(0, 3)

  const distractors = [...similarPicked]
  if (distractors.length < 3) {
    const remaining = ranked.filter((word) => !distractors.includes(word))
    distractors.push(...seededShuffle(remaining, seed + 11).slice(0, 3 - distractors.length))
  }

  const choices = seededShuffle([targetWord, ...distractors], seed + 29)
  return choices
}
