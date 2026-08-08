import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const source = path.join(publicDir, 'icon.svg')

const svg = fs.readFileSync(source)

async function writePng(name, size, padding = 0) {
  const inner = size - padding * 2
  const png = await sharp(svg)
    .resize(inner, inner, { fit: 'contain', background: '#2fa84f' })
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: '#2fa84f',
    })
    .png()
    .toBuffer()

  fs.writeFileSync(path.join(publicDir, name), png)
  console.log(`wrote ${name}`)
}

await writePng('pwa-192x192.png', 192)
await writePng('pwa-512x512.png', 512)
await writePng('maskable-icon-512x512.png', 512, 64)
await writePng('apple-touch-icon.png', 180)

const favicon = await sharp(svg).resize(32, 32).png().toBuffer()
fs.writeFileSync(path.join(publicDir, 'favicon.png'), favicon)
console.log('wrote favicon.png')
