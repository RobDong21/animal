const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const COMMON_LETTERS = 'etaoinshrdlucmfwypvbgkjqxz'

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

export function getBlankableIndices(word) {
  const indices = []
  for (let index = 0; index < word.length; index += 1) {
    if (/[a-zA-Z]/.test(word[index])) indices.push(index)
  }
  return indices
}

export function pickBlankIndex(word, roundKey = word) {
  const indices = getBlankableIndices(word)
  if (indices.length === 0) return 0
  return indices[hashSeed(roundKey) % indices.length]
}

export function formatMissingLetterDisplay(word, blankIndex, revealed) {
  if (revealed) return word
  return `${word.slice(0, blankIndex)} _ ${word.slice(blankIndex + 1)}`
}

function collectDistractors(word, correctLetter) {
  const correctKey = correctLetter.toLowerCase()
  const seen = new Set([correctKey])
  const ordered = []

  function pushLetter(letter) {
    const key = letter.toLowerCase()
    if (!/[a-z]/.test(key) || seen.has(key)) return
    seen.add(key)
    ordered.push(key)
  }

  for (const letter of word) pushLetter(letter)

  const alphabetIndex = ALPHABET.indexOf(correctKey)
  for (const offset of [-1, 1, -2, 2, -3, 3]) {
    const nearby = ALPHABET[alphabetIndex + offset]
    if (nearby) pushLetter(nearby)
  }

  for (const letter of COMMON_LETTERS) pushLetter(letter)

  return ordered
}

export function buildLetterChoices(word, blankIndex, roundKey = word) {
  const correctLetter = word[blankIndex]
  const correctKey = correctLetter.toLowerCase()
  const distractorPool = collectDistractors(word, correctLetter)
  const seed = hashSeed(`${roundKey}:${blankIndex}:choices`)
  const shuffledPool = seededShuffle(distractorPool, seed)
  const distractors = shuffledPool.slice(0, 3)
  const choices = seededShuffle([correctKey, ...distractors], seed + 17)

  return {
    correctLetter: correctKey,
    choices: choices.map((letter) => letter.toUpperCase()),
  }
}

export function buildMissingLetterPuzzle(word, roundIndex = 0) {
  const roundKey = `${word}:${roundIndex}`
  const blankIndex = pickBlankIndex(word, roundKey)
  const { correctLetter, choices } = buildLetterChoices(word, blankIndex, roundKey)

  return {
    word,
    blankIndex,
    correctLetter,
    choices,
    displayLetter: correctLetter.toUpperCase(),
  }
}
