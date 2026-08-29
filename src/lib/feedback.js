import { getTypeById } from '@/data/animals'

const TYPE_EXPLANATIONS = {
  mammal: 'Mammals breathe air, and mothers feed milk to their babies.',
  bird: 'Birds have feathers and beaks.',
  fish: 'Fish live in water and breathe through gills.',
  reptile: 'Reptiles breathe air and usually have dry, scaly skin.',
  amphibian: 'Amphibians begin life in water and can live on land.',
  insect: 'Insects have six legs.',
  'other-invertebrate': 'Other invertebrates are animals without a backbone.',
}

const HABITAT_PHRASES = {
  home: 'in homes or cities',
  farm: 'on farms',
  forest: 'in forests',
  ocean: 'in the ocean',
  desert: 'in deserts',
  jungle: 'in jungles',
  polar: 'in polar regions',
  grassland: 'in grasslands',
  wild: 'in the wild',
}

function withIndefiniteArticle(value) {
  const article = /^[aeiou]/i.test(value) ? 'an' : 'a'
  return `${article} ${value}`
}

function formatAnimalSubject(animal) {
  const subject = withIndefiniteArticle(animal.name.toLowerCase())
  return subject.charAt(0).toUpperCase() + subject.slice(1)
}

function formatTypeRelationship(typeId) {
  if (typeId === 'other-invertebrate') {
    return 'an animal in the Other Invertebrate group'
  }

  const type = getTypeById(typeId)
  return withIndefiniteArticle(type?.name.toLowerCase() ?? 'animal')
}

export function formatHabitatPhrases(habitatIds) {
  const phrases = habitatIds.map((id) => HABITAT_PHRASES[id]).filter(Boolean)

  if (phrases.length < 2) return phrases[0] ?? 'in nature'
  if (phrases.length === 2) return `${phrases[0]} or ${phrases[1]}`
  return `${phrases.slice(0, -1).join(', ')}, or ${phrases.at(-1)}`
}

export function buildCorrectTypeFeedback(animal) {
  return `Yes! ${formatAnimalSubject(animal)} is ${formatTypeRelationship(animal.type)}. ${TYPE_EXPLANATIONS[animal.type]}`
}

export function buildIncorrectTypeFeedback(animal, selectedTypeId) {
  return `Not quite. ${formatAnimalSubject(animal)} is ${formatTypeRelationship(animal.type)}, not ${formatTypeRelationship(selectedTypeId)}. ${TYPE_EXPLANATIONS[animal.type]}`
}

export function buildCorrectHabitatFeedback(animal) {
  return `Yes! ${formatAnimalSubject(animal)} can live ${formatHabitatPhrases(animal.habitats)}.`
}

export function buildIncorrectHabitatFeedback(animal, selectedHabitatId) {
  const selectedPhrase = HABITAT_PHRASES[selectedHabitatId] ?? 'there'
  return `Not quite. ${formatAnimalSubject(animal)} does not usually live ${selectedPhrase}. It can live ${formatHabitatPhrases(animal.habitats)}.`
}

export function buildAnimalSummary(animal) {
  return `${formatAnimalSubject(animal)} is ${formatTypeRelationship(animal.type)}. It can live ${formatHabitatPhrases(animal.habitats)}.`
}
