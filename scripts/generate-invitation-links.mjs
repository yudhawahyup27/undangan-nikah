import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const guests = JSON.parse(readFileSync(join(__dirname, '../server/data/guests.json'), 'utf-8'))

const SITE_URL = (process.env.NUXT_PUBLIC_SITE_URL || 'https://nikah.ywp.my.id').replace(/\/$/, '')

const lines = [
  'Kode,Nama,Slug,Sisi,Relasi,Link Undangan',
  ...guests.map((guest) => {
    const link = `${SITE_URL}/${guest.slug}`
    const relation = guest.relation || ''
    return `${guest.code},"${guest.name}",${guest.slug},${guest.side},${relation},${link}`
  }),
]

writeFileSync(join(__dirname, '../server/data/daftar-link-undangan.csv'), lines.join('\n'), 'utf-8')
console.log(`Generated ${guests.length} invitation links for ${SITE_URL}`)
