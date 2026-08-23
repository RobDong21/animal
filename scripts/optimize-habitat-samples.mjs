import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const samplesDir = path.join(root, 'public/habitats/samples')

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const jpgFiles = fs.readdirSync(samplesDir).filter((f) => f.endsWith('.jpg'))

if (!jpgFiles.length) {
  console.log('No .jpg files found in public/habitats/samples/')
  process.exit(0)
}

let totalBefore = 0
let totalAfter = 0

for (const file of jpgFiles) {
  const inputPath = path.join(samplesDir, file)
  const outputPath = path.join(samplesDir, file.replace(/\.jpg$/, '.webp'))
  const beforeSize = fs.statSync(inputPath).size

  await sharp(inputPath)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath)

  const afterSize = fs.statSync(outputPath).size
  totalBefore += beforeSize
  totalAfter += afterSize

  const pct = ((1 - afterSize / beforeSize) * 100).toFixed(1)
  console.log(`${file}: ${formatSize(beforeSize)} → ${formatSize(afterSize)} (${pct}% smaller)`)
}

const totalPct = ((1 - totalAfter / totalBefore) * 100).toFixed(1)
console.log(
  `\nTotal: ${formatSize(totalBefore)} → ${formatSize(totalAfter)} (${totalPct}% smaller)`
)
