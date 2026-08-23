import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { animals, habitats, wildHabitat } from '../src/data/animals.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const animalsDir = path.join(root, 'public/animals')
const publicDir = path.join(root, 'public')

const MIN_FILE_SIZE = 8000
const MIN_HABITAT_SAMPLE_SIZE = 5000

let failed = 0

function validateFile(label, filePath, minSize) {
  const issues = []

  if (!fs.existsSync(filePath)) {
    issues.push('missing file')
  } else {
    const size = fs.statSync(filePath).size
    if (size < minSize) issues.push(`suspiciously small (${size} bytes)`)
  }

  if (issues.length) {
    failed++
    console.log(`❌ ${label}`)
    issues.forEach((issue) => console.log(`   - ${issue}`))
  } else {
    console.log(`✅ ${label}`)
  }
}

console.log('Validating animal images...\n')

for (const animal of animals) {
  validateFile(animal.id, path.join(animalsDir, `${animal.id}.jpg`), MIN_FILE_SIZE)
}

console.log('\nValidating habitat sample images...\n')

const habitatImages = [...habitats, wildHabitat].flatMap((habitat) => habitat.images)

for (const image of habitatImages) {
  const relPath = image.src.replace(/^\//, '')
  validateFile(relPath, path.join(publicDir, relPath), MIN_HABITAT_SAMPLE_SIZE)
}

console.log(`\n${failed ? `Failed: ${failed}` : 'All images look valid!'}`)
process.exit(failed ? 1 : 0)
