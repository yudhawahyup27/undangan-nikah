import { readFile } from 'fs/promises'
import { join } from 'path'

export type Guest = {
  code: string
  name: string
  slug: string
  side: 'ima' | 'yudha'
  relation: string | null
  status: string
}

const guestsPath = join(process.cwd(), 'server/data/guests.json')

const loadGuests = async (): Promise<Guest[]> => {
  const raw = await readFile(guestsPath, 'utf-8')
  return JSON.parse(raw)
}

const normalize = (value: string) =>
  decodeURIComponent(value).trim().toLowerCase()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const guests = await loadGuests()

  if (query.code) {
    const code = String(query.code).trim().toUpperCase()
    const guest = guests.find(item => item.code === code)
    if (!guest) {
      throw createError({ statusCode: 404, message: 'Tamu tidak ditemukan' })
    }
    return guest
  }

  if (query.slug) {
    const slug = normalize(String(query.slug))
    const guest = guests.find(item => item.slug === slug)
    if (!guest) {
      throw createError({ statusCode: 404, message: 'Tamu tidak ditemukan' })
    }
    return guest
  }

  if (query.to) {
    const target = normalize(String(query.to))
    const guest = guests.find(item =>
      normalize(item.name) === target || item.slug === target
    )
    if (!guest) {
      throw createError({ statusCode: 404, message: 'Tamu tidak ditemukan' })
    }
    return guest
  }

  return guests
})
