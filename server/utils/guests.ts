import guestsData from '../data/guests.json'

export type Guest = {
  code: string
  name: string
  slug: string
  side: 'ima' | 'yudha'
  relation: string | null
  status: string
}

const guests = guestsData as Guest[]

export const normalizeGuestKey = (value: string) =>
  decodeURIComponent(value).trim().toLowerCase()

export const findGuestByCode = (code: string) =>
  guests.find(item => item.code === code.trim().toUpperCase()) ?? null

export const findGuestBySlug = (slug: string) =>
  guests.find(item => item.slug === normalizeGuestKey(slug)) ?? null

export const findGuestByName = (name: string) => {
  const target = normalizeGuestKey(name)
  return guests.find(item =>
    normalizeGuestKey(item.name) === target || item.slug === target
  ) ?? null
}

export const listGuests = () => guests
