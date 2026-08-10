import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const animalsDir = path.join(root, 'public/animals')
const habitatsDir = path.join(root, 'public/habitats')

const headers = { 'User-Agent': 'AnimalWorldEducationalApp/1.0 (learning@local.dev)' }

const habitats = [
  { id: 'home', wiki: 'Puppy' },
  { id: 'farm', wiki: 'Pasture' },
  { id: 'forest', wiki: 'Forest' },
  { id: 'ocean', wiki: 'Coral reef' },
  { id: 'desert', wiki: 'Desert' },
  { id: 'jungle', wiki: 'Rainforest' },
  { id: 'polar', wiki: 'Sea ice' },
  { id: 'grassland', wiki: 'Savanna' },
]

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
  { id: 'duck', wiki: 'Duck' },
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
  { id: 'raccoon', wiki: 'Raccoon' },
  { id: 'woodpecker', wiki: 'Woodpecker' },
  { id: 'panda', wiki: 'Giant panda' },
  { id: 'turtle', wiki: 'Red-eared slider' },
  { id: 'dolphin', wiki: 'Dolphin' },
  { id: 'whale', wiki: 'Blue whale' },
  { id: 'shark', wiki: 'Shark' },
  { id: 'octopus', wiki: 'Octopus' },
  { id: 'sea-turtle', wiki: 'Sea turtle' },
  { id: 'jellyfish', wiki: 'Jellyfish' },
  { id: 'clownfish', wiki: 'Clownfish' },
  { id: 'seahorse', wiki: 'Seahorse' },
  { id: 'angelfish', wiki: 'Freshwater angelfish' },
  { id: 'tuna', wiki: 'Tuna' },
  { id: 'salmon', wiki: 'Salmon' },
  { id: 'starfish', wiki: 'Starfish' },
  { id: 'crab', wiki: 'Crab' },
  { id: 'squid', wiki: 'Squid' },
  { id: 'shrimp', wiki: 'Shrimp' },
  { id: 'sea-urchin', wiki: 'Sea urchin' },
  { id: 'crocodile', wiki: 'Nile crocodile' },
  { id: 'flamingo', wiki: 'Flamingo' },
  { id: 'camel', wiki: 'Camel' },
  { id: 'scorpion', wiki: 'Scorpion' },
  { id: 'tortoise', wiki: 'Tortoise' },
  { id: 'lizard', wiki: 'Lizard' },
  { id: 'vulture', wiki: 'Vulture' },
  { id: 'monkey', wiki: 'Monkey' },
  { id: 'tiger', wiki: 'Tiger' },
  { id: 'toucan', wiki: 'Toucan' },
  { id: 'chameleon', wiki: 'Chameleon' },
  { id: 'parrot', wiki: 'Parrot' },
  { id: 'rabbit', wiki: 'Rabbit' },
  { id: 'butterfly', wiki: 'Butterfly' },
  { id: 'ladybug', wiki: 'Ladybug' },
  { id: 'snail', wiki: 'Garden snail' },
  { id: 'polar-bear', wiki: 'Polar bear' },
  { id: 'penguin', wiki: 'Penguin' },
  { id: 'seal', wiki: 'Harbor seal' },
  { id: 'lion', wiki: 'Lion' },
  { id: 'elephant', wiki: 'Elephant' },
  { id: 'giraffe', wiki: 'Giraffe' },
  { id: 'zebra', wiki: 'Zebra' },
  { id: 'hippopotamus', wiki: 'Hippopotamus' },
  { id: 'kangaroo', wiki: 'Kangaroo' },
  { id: 'pigeon', wiki: 'Rock dove' },
  { id: 'snake', wiki: 'Snake' },
  { id: 'goose', wiki: 'Goose' },
  { id: 'moose', wiki: 'Moose' },
  { id: 'ant', wiki: 'Ant' },
  { id: 'swan', wiki: 'Swan' },
  { id: 'eagle', wiki: 'Bald eagle' },
  { id: 'otter', wiki: 'Sea otter' },
  { id: 'lobster', wiki: 'Lobster' },
  { id: 'bison', wiki: 'American bison' },
  { id: 'gecko', wiki: 'Gecko' },
  { id: 'iguana', wiki: 'Green iguana' },
  { id: 'alligator', wiki: 'American alligator' },
  { id: 'newt', wiki: 'Newt' },
  { id: 'bearded-dragon', wiki: 'Bearded dragon' },
  { id: 'grasshopper', wiki: 'Grasshopper' },
  { id: 'dragonfly', wiki: 'Dragonfly' },
  { id: 'caterpillar', wiki: 'Caterpillar' },
  { id: 'beetle', wiki: 'Beetle' },
  { id: 'worm', wiki: 'Earthworm' },
]

fs.mkdirSync(animalsDir, { recursive: true })
fs.mkdirSync(habitatsDir, { recursive: true })

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchJson(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers })
    if (res.ok) return res.json()
    await delay(1000 * (i + 1))
  }
  return null
}

async function downloadFile(url, outPath) {
  const res = await fetch(url, { headers })
  if (!res.ok) return false
  const buffer = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outPath, buffer)
  return true
}

async function fetchWikiImage(wikiTitle, outPath) {
  if (fs.existsSync(outPath)) {
    console.log(`skip image ${path.basename(outPath)} (exists)`)
    return true
  }

  const data = await fetchJson(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`
  )
  const imageUrl = data?.thumbnail?.source
  if (!imageUrl) {
    console.warn(`no thumbnail for ${wikiTitle}`)
    return false
  }

  const ok = await downloadFile(imageUrl, outPath)
  if (ok) console.log(`saved image ${path.basename(outPath)}`)
  return ok
}

console.log('Fetching habitat images...')
for (const habitat of habitats) {
  await fetchWikiImage(habitat.wiki, path.join(habitatsDir, `${habitat.id}.jpg`))
  await delay(500)
}

console.log('\nFetching animal images...')
for (const animal of animals) {
  await fetchWikiImage(animal.wiki, path.join(animalsDir, `${animal.id}.jpg`))
  await delay(500)
}

console.log('\ndone')
