import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const guests = JSON.parse(readFileSync(join(__dirname, '../server/data/guests.json'), 'utf-8'))

const lines = [
  'Kode,Nama,Sisi,Relasi,Link Undangan',
  ...guests.map((guest) => {
    const link = `https://yourdomain.com/undangan?code=${guest.code}`
    const relation = guest.relation || ''
    return `${guest.code},"${guest.name}",${guest.side},${relation},${link}`
  }),
]

writeFileSync(join(__dirname, '../server/data/daftar-link-undangan.csv'), lines.join('\n'), 'utf-8')
console.log(`Generated ${guests.length} invitation links`)
