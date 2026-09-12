/** Optional curated sound chunks for harder Starters words. Letter order is preserved. */
export const startersCuratedChunks = {
  animal: ['an', 'i', 'mal'],
  apartment: ['a', 'part', 'ment'],
  armchair: ['arm', 'chair'],
  balloon: ['bal', 'loon'],
  banana: ['ba', 'na', 'na'],
  baseball: ['base', 'ball'],
  basketball: ['bas', 'ket', 'ball'],
  bathroom: ['bath', 'room'],
  beautiful: ['beau', 'ti', 'ful'],
  bedroom: ['bed', 'room'],
  bookcase: ['book', 'case'],
  breakfast: ['break', 'fast'],
  brother: ['broth', 'er'],
  burger: ['bur', 'ger'],
  carrot: ['car', 'rot'],
  chicken: ['chick', 'en'],
  clothes: ['clothes'],
  coconut: ['co', 'co', 'nut'],
  computer: ['com', 'pu', 'ter'],
  cousin: ['cou', 'sin'],
  crocodile: ['croc', 'o', 'dile'],
  cupboard: ['cup', 'board'],
  dinner: ['din', 'ner'],
  eighteen: ['eight', 'een'],
  elephant: ['el', 'e', 'phant'],
  eleven: ['e', 'lev', 'en'],
  father: ['fa', 'ther'],
  fifteen: ['fif', 'teen'],
  football: ['foot', 'ball'],
  fourteen: ['four', 'teen'],
  garden: ['gar', 'den'],
  giraffe: ['gi', 'raffe'],
  glasses: ['glas', 'ses'],
  grandfather: ['grand', 'fa', 'ther'],
  grandma: ['grand', 'ma'],
  grandmother: ['grand', 'moth', 'er'],
  grandpa: ['grand', 'pa'],
  helicopter: ['hel', 'i', 'cop', 'ter'],
  jacket: ['jack', 'et'],
  kitchen: ['kit', 'chen'],
  lemonade: ['lem', 'on', 'ade'],
  listen: ['lis', 'ten'],
  lizard: ['liz', 'ard'],
  mirror: ['mir', 'ror'],
  monkey: ['mon', 'key'],
  monster: ['mon', 'ster'],
  mother: ['moth', 'er'],
  nineteen: ['nine', 'teen'],
  orange: ['or', 'ange'],
  painting: ['paint', 'ing'],
  person: ['per', 'son'],
  picture: ['pic', 'ture'],
  pineapple: ['pine', 'ap', 'ple'],
  potato: ['po', 'ta', 'to'],
  purple: ['pur', 'ple'],
  sausage: ['sau', 'sage'],
  seventeen: ['sev', 'en', 'teen'],
  sister: ['sis', 'ter'],
  sixteen: ['six', 'teen'],
  spider: ['spi', 'der'],
  television: ['tel', 'e', 'vi', 'sion'],
  thirteen: ['thir', 'teen'],
  tomato: ['to', 'ma', 'to'],
  trousers: ['trou', 'sers'],
  twenty: ['twen', 'ty'],
  watermelon: ['wa', 'ter', 'mel', 'on'],
  window: ['win', 'dow'],
  yellow: ['yel', 'low'],
}

const VOWELS = new Set('aeiouyAEIOUY')

function fallbackChunks(word) {
  if (word.length <= 4) return [word]

  const matches = word.match(/[^aeiouyAEIOUY]*[aeiouyAEIOUY]+[^aeiouyAEIOUY]*/g)
  if (!matches || matches.length < 2) return [word]

  const chunks = [...matches]
  // Merge a trailing consonant-only remnant into the previous chunk.
  if (chunks.length > 1 && ![...chunks.at(-1)].some((letter) => VOWELS.has(letter))) {
    const tail = chunks.pop()
    chunks[chunks.length - 1] += tail
  }

  return chunks.length > 1 ? chunks : [word]
}

/**
 * Resolve display/speak chunks for a Starters word.
 * Order: curated → spaces → hyphens → simple readable fallback.
 */
export function getStartersChunks(word, curated = startersCuratedChunks[word]) {
  if (Array.isArray(curated) && curated.length > 0) {
    return curated
  }

  if (word.includes(' ')) {
    return word.split(/\s+/).filter(Boolean)
  }

  if (word.includes('-')) {
    return word.split('-').filter(Boolean)
  }

  return fallbackChunks(word)
}
