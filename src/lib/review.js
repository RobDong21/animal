const REVIEW_LIMITS = {
  discover: 2,
  explorer: 3,
}

function candidateKey({ animal, concept }) {
  return `${animal.id}:${concept}`
}

export function buildReviewCandidates(history) {
  const candidates = new Map()

  history.forEach((miss, historyIndex) => {
    const key = candidateKey(miss)
    const existing = candidates.get(key)

    if (existing) {
      existing.attempts += 1
      return
    }

    candidates.set(key, {
      ...miss,
      attempts: 1,
      firstMissedAt: historyIndex,
    })
  })

  return [...candidates.values()]
}

function compareCandidates(a, b, selectedAnimalIds) {
  if (a.attempts !== b.attempts) return b.attempts - a.attempts

  const aAddsAnimal = !selectedAnimalIds.has(a.animal.id)
  const bAddsAnimal = !selectedAnimalIds.has(b.animal.id)
  if (aAddsAnimal !== bAddsAnimal) return aAddsAnimal ? -1 : 1

  if (a.firstMissedAt !== b.firstMissedAt) {
    return a.firstMissedAt - b.firstMissedAt
  }

  const animalOrder = a.animal.id.localeCompare(b.animal.id)
  return animalOrder || a.concept.localeCompare(b.concept)
}

export function selectReviewCandidates(history, mode) {
  const limit = REVIEW_LIMITS[mode] ?? REVIEW_LIMITS.explorer
  const pool = buildReviewCandidates(history)
  const selected = []
  const selectedAnimalIds = new Set()

  while (selected.length < limit && pool.length > 0) {
    pool.sort((a, b) => compareCandidates(a, b, selectedAnimalIds))
    const next = pool.shift()
    selected.push(next)
    selectedAnimalIds.add(next.animal.id)
  }

  return selected
}

function hashId(id) {
  return [...id].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 0)
}

export function reorderChoicesForReview(choiceIds, animalId, concept) {
  if (choiceIds.length < 2) return [...choiceIds]

  const offset = (hashId(`${animalId}:${concept}:review`) % (choiceIds.length - 1)) + 1
  return [...choiceIds.slice(offset), ...choiceIds.slice(0, offset)]
}
