import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const animalsDir = path.join(root, 'public/animals')

const headers = { 'User-Agent': 'AnimalWorldEducationalApp/1.0 (learning@local.dev)' }

// wiki titles disambiguated to avoid wrong pages (e.g. Turkey country vs bird)
const animals = [
  { id: 'dog', wiki: 'Dog' },
  { id: 'cat', wiki: 'Cat' },
  { id: 'goldfish', wiki: 'Goldfish' },
  { id: 'hamster', wiki: 'Hamster' },
  { id: 'cow', wiki: 'Cattle' },
  { id: 'pig', wiki: 'Pig' },
  { id: 'chicken', wiki: 'Chicken' },
  { id: 'horse', wiki: 'Horse' },
  { id: 'sheep', wiki: 'Sheep' },
  { id: 'goat', wiki: 'Goat' },
  { id: 'duck', wiki: 'Duck' },
  { id: 'donkey', wiki: 'Donkey' },
  { id: 'rooster', wiki: 'Rooster' },
  { id: 'turkey', wiki: 'Wild turkey' },
  { id: 'frog', wiki: 'Frog' },
  { id: 'bee', wiki: 'Bee' },
  { id: 'peacock', wiki: 'Peacock' },
  { id: 'bear', wiki: 'American black bear' },
  { id: 'deer', wiki: 'Deer' },
  { id: 'fox', wiki: 'Red fox' },
  { id: 'owl', wiki: 'Owl' },
  { id: 'squirrel', wiki: 'Squirrel' },
  { id: 'wolf', wiki: 'Wolf' },
  { id: 'raccoon', wiki: 'Raccoon' },
  { id: 'woodpecker', wiki: 'Woodpecker' },
  { id: 'hedgehog', wiki: 'Hedgehog' },
  { id: 'badger', wiki: 'Badger' },
  { id: 'panda', wiki: 'Giant panda' },
  { id: 'koala', wiki: 'Koala' },
  { id: 'turtle', wiki: 'Red-eared slider' },
  { id: 'dolphin', wiki: 'Dolphin' },
  { id: 'whale', wiki: 'Blue whale' },
  { id: 'shark', wiki: 'Shark' },
  { id: 'octopus', wiki: 'Octopus' },
  { id: 'sea-turtle', wiki: 'Sea turtle' },
  { id: 'jellyfish', wiki: 'Jellyfish' },
  { id: 'clownfish', wiki: 'Clownfish' },
  { id: 'seahorse', wiki: 'Seahorse' },
  { id: 'starfish', wiki: 'Starfish' },
  { id: 'crab', wiki: 'Crab' },
  { id: 'crocodile', wiki: 'Nile crocodile' },
  { id: 'flamingo', wiki: 'Flamingo' },
  { id: 'camel', wiki: 'Camel' },
  { id: 'scorpion', wiki: 'Scorpion' },
  { id: 'tortoise', wiki: 'Tortoise' },
  { id: 'lizard', wiki: 'Lizard' },
  { id: 'vulture', wiki: 'Vulture' },
  { id: 'monkey', wiki: 'Monkey' },
  { id: 'tiger', wiki: 'Tiger' },
  { id: 'gorilla', wiki: 'Gorilla' },
  { id: 'sloth', wiki: 'Sloth' },
  { id: 'jaguar', wiki: 'Jaguar' },
  { id: 'toucan', wiki: 'Toucan' },
  { id: 'chameleon', wiki: 'Chameleon' },
  { id: 'orangutan', wiki: 'Orangutan' },
  { id: 'parrot', wiki: 'Parrot' },
  { id: 'rabbit', wiki: 'Rabbit' },
  { id: 'mouse', wiki: 'House mouse' },
  { id: 'butterfly', wiki: 'Butterfly' },
  { id: 'ladybug', wiki: 'Ladybug' },
  { id: 'snail', wiki: 'Garden snail' },
  { id: 'polar-bear', wiki: 'Polar bear' },
  { id: 'penguin', wiki: 'Penguin' },
  { id: 'walrus', wiki: 'Walrus' },
  { id: 'seal', wiki: 'Harbor seal' },
  { id: 'arctic-fox', wiki: 'Arctic fox' },
  { id: 'arctic-hare', wiki: 'Arctic hare' },
  { id: 'narwhal', wiki: 'Narwhal' },
  { id: 'musk-ox', wiki: 'Musk ox' },
  { id: 'lion', wiki: 'Lion' },
  { id: 'elephant', wiki: 'Elephant' },
  { id: 'giraffe', wiki: 'Giraffe' },
  { id: 'zebra', wiki: 'Zebra' },
  { id: 'cheetah', wiki: 'Cheetah' },
  { id: 'hippopotamus', wiki: 'Hippopotamus' },
  { id: 'rhinoceros', wiki: 'Rhinoceros' },
  { id: 'hyena', wiki: 'Hyena' },
  { id: 'meerkat', wiki: 'Meerkat' },
  { id: 'kangaroo', wiki: 'Kangaroo' },
]

const MIN_FILE_SIZE = 8000
const BAD_DESC = /\b(country|flag|vehicle|car|automobile|aircraft|weapon|company|film|album|military|constellation|software|brand|republic)\b/i

let failed = 0

console.log('Validating animal images...\n')

for (const animal of animals) {
  const file = path.join(animalsDir, `${animal.id}.jpg`)
  const issues = []

  if (!fs.existsSync(file)) {
    issues.push('missing file')
  } else {
    const size = fs.statSync(file).size
    if (size < MIN_FILE_SIZE) issues.push(`suspiciously small (${size} bytes)`)
  }

  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animal.wiki)}`,
    { headers }
  )

  if (!res.ok) {
    issues.push(`wiki lookup failed (${res.status})`)
  } else {
    const data = await res.json()
    const desc = data.description || ''
    const title = data.title || ''

    if (BAD_DESC.test(desc) || BAD_DESC.test(title)) {
      issues.push(`wrong wiki page: "${title}" — ${desc}`)
    }
    if (!data.thumbnail?.source) {
      issues.push('no thumbnail on wiki page')
    }
  }

  if (issues.length) {
    failed++
    console.log(`❌ ${animal.id}`)
    issues.forEach((issue) => console.log(`   - ${issue}`))
  } else {
    console.log(`✅ ${animal.id}`)
  }

  await new Promise((r) => setTimeout(r, 120))
}

console.log(`\n${failed ? `Failed: ${failed}` : 'All images look valid!'}`)
process.exit(failed ? 1 : 0)
