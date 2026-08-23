import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { animals } from '../src/data/animals.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const animalsDir = path.join(root, 'public/animals')

const MIN_FILE_SIZE = 8000

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

  if (issues.length) {
    failed++
    console.log(`❌ ${animal.id}`)
    issues.forEach((issue) => console.log(`   - ${issue}`))
  } else {
    console.log(`✅ ${animal.id}`)
  }
}

console.log(`\n${failed ? `Failed: ${failed}` : 'All images look valid!'}`)
process.exit(failed ? 1 : 0)
