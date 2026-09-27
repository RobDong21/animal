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

export function buildWordStructure(word) {
  return [...word].map((character, index) => {
    if (/[a-zA-Z]/.test(character)) {
      return { type: 'letter', character, index }
    }
    return { type: 'fixed', character, index }
  })
}

export function buildLetterTiles(word, roundKey = word) {
  const letters = []

  for (let index = 0; index < word.length; index += 1) {
    const character = word[index]
    if (!/[a-zA-Z]/.test(character)) continue
    letters.push({
      id: `${roundKey}:${index}:${character}`,
      character,
      label: character.toUpperCase(),
    })
  }

  return seededShuffle(letters, hashSeed(`${roundKey}:tiles`))
}

export function assembleWord(structure, placedCharacters) {
  let letterIndex = 0
  return structure
    .map((part) => {
      if (part.type === 'fixed') return part.character
      const character = placedCharacters[letterIndex] ?? ''
      letterIndex += 1
      return character
    })
    .join('')
}

export function countLetterSlots(structure) {
  return structure.filter((part) => part.type === 'letter').length
}
