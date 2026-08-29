const RECAP_LIMIT = 3

function addDistinctAnimal(selection, selectedIds, animal) {
  if (!animal || selectedIds.has(animal.id) || selection.length >= RECAP_LIMIT) return
  selectedIds.add(animal.id)
  selection.push(animal)
}

function getUnreviewedMissedAnimals(reviewQueue, missHistory) {
  const reviewedAnimalIds = new Set(reviewQueue.map(({ animal }) => animal.id))
  const missedAnimals = new Map()

  missHistory.forEach(({ animal }, historyIndex) => {
    if (reviewedAnimalIds.has(animal.id)) return

    const existing = missedAnimals.get(animal.id)
    if (existing) {
      existing.attempts += 1
      return
    }

    missedAnimals.set(animal.id, {
      animal,
      attempts: 1,
      firstMissedAt: historyIndex,
    })
  })

  return [...missedAnimals.values()]
    .sort(
      (a, b) =>
        b.attempts - a.attempts ||
        a.firstMissedAt - b.firstMissedAt ||
        a.animal.id.localeCompare(b.animal.id)
    )
    .map(({ animal }) => animal)
}

export function selectRecapAnimals(reviewQueue, missHistory, completedAnimals) {
  const selection = []
  const selectedIds = new Set()

  reviewQueue.forEach(({ animal }) => addDistinctAnimal(selection, selectedIds, animal))

  getUnreviewedMissedAnimals(reviewQueue, missHistory).forEach((animal) =>
    addDistinctAnimal(selection, selectedIds, animal)
  )

  completedAnimals.forEach((animal) => addDistinctAnimal(selection, selectedIds, animal))

  return selection
}
