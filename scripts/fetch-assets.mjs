import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { animals } from '../src/data/animals.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')

const headers = { 'User-Agent': 'AnimalWorldEducationalApp/1.0 (learning@local.dev)' }

// Disambiguate Wikipedia titles that would resolve to the wrong page.
const wikiTitles = {
  turkey: 'Wild turkey',
  bear: 'American black bear',
  fox: 'Red fox',
  panda: 'Giant panda',
  turtle: 'Red-eared slider',
  whale: 'Blue whale',
  angelfish: 'Freshwater angelfish',
  crocodile: 'Nile crocodile',
  snail: 'Garden snail',
  seal: 'Harbor seal',
  pigeon: 'Rock dove',
  otter: 'Sea otter',
  bison: 'American bison',
  iguana: 'Green iguana',
  alligator: 'American alligator',
  'bearded-dragon': 'Bearded dragon',
  worm: 'Earthworm',
  cow: 'Cattle',
}

fs.mkdirSync(path.join(publicDir, 'animals'), { recursive: true })

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

console.log('Fetching animal images...')
for (const animal of animals) {
  const outPath = path.join(publicDir, animal.image.replace(/^\//, ''))
  if (path.extname(outPath) !== '.jpg') {
    const status = fs.existsSync(outPath) ? 'skip' : 'missing'
    console.log(`${status} managed image ${path.basename(outPath)}`)
    continue
  }

  const wikiTitle = wikiTitles[animal.id] ?? animal.name
  await fetchWikiImage(wikiTitle, outPath)
  await delay(500)
}

console.log('\ndone')
