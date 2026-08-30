import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { findGuestBySlug } from './guests'

export type RsvpEntry = {
  id: string
  name: string
  attending: boolean | null
  message: string
  timestamp: string
}

export type CreateRsvpInput = {
  name: string
  attending: boolean
  message?: string
  guestSlug?: string
}

const TABLE = 'rsvp'
const JSON_PATH = join(process.cwd(), 'server/data/rsvp.json')

type RsvpRow = {
  id: string
  name: string
  attending: boolean | null
  message: string | null
  created_at: string
}

const mapRow = (row: RsvpRow): RsvpEntry => ({
  id: row.id,
  name: row.name,
  attending: row.attending,
  message: row.message || '',
  timestamp: row.created_at,
})

const readJsonEntries = async (): Promise<RsvpEntry[]> => {
  try {
    const raw = await readFile(JSON_PATH, 'utf-8')
    return JSON.parse(raw) as RsvpEntry[]
  } catch {
    return []
  }
}

const writeJsonEntries = async (entries: RsvpEntry[]) => {
  await writeFile(JSON_PATH, JSON.stringify(entries, null, 2))
}

export const listRsvpEntries = async (): Promise<RsvpEntry[]> => {
  if (isSupabaseConfigured()) {
    const supabase = await getSupabase()
    const { data, error } = await supabase
      .from(TABLE)
      .select('id, name, attending, message, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[rsvpStore.listRsvpEntries]', error)
      throw error
    }

    return (data as RsvpRow[] | null)?.map(mapRow) ?? []
  }

  const entries = await readJsonEntries()
  return entries.slice().reverse()
}

export const createRsvpEntry = async (input: CreateRsvpInput): Promise<RsvpEntry> => {
  const payload = {
    name: input.name.trim(),
    attending: input.attending === true,
    message: (input.message || '').trim(),
  }

  if (isSupabaseConfigured()) {
    const supabase = await getSupabase()
    const guest = input.guestSlug ? findGuestBySlug(input.guestSlug) : null
    const savedName = guest?.name || payload.name

    const updatePayload = {
      name: savedName,
      attending: payload.attending,
      message: payload.message,
    }

    const { data: existingByName, error: nameLookupError } = await supabase
      .from(TABLE)
      .select('id')
      .ilike('name', savedName)
      .order('created_at', { ascending: false })
      .limit(1)

    if (!nameLookupError && existingByName?.[0]?.id) {
      const { data, error } = await supabase
        .from(TABLE)
        .update(updatePayload)
        .eq('id', existingByName[0].id)
        .select('id, name, attending, message, created_at')

      if (error) throw error
      const row = (data as RsvpRow[] | null)?.[0]
      if (row) return mapRow(row)
    }

    const { data, error } = await supabase
      .from(TABLE)
      .insert(updatePayload)
      .select('id, name, attending, message, created_at')

    if (error) {
      console.error('[rsvpStore.createRsvpEntry]', error)
      throw error
    }

    const row = (data as RsvpRow[] | null)?.[0]
    if (!row) {
      throw new Error(
        'Insert RSVP gagal. Pastikan tabel public.rsvp sudah dibuat dan policy insert aktif di Supabase.'
      )
    }

    return mapRow(row)
  }

  if (isServerlessProduction()) {
    throw new Error(
      'Supabase belum dikonfigurasi di production. Set SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di Vercel.'
    )
  }

  const entry: RsvpEntry = {
    id: `rsvp_${Date.now()}`,
    name: payload.name,
    attending: payload.attending,
    message: payload.message,
    timestamp: new Date().toISOString(),
  }

  const existing = await readJsonEntries()
  const existingIndex = existing.findIndex((item) =>
    item.name.toLowerCase().trim() === entry.name.toLowerCase().trim()
  )
  if (existingIndex >= 0) {
    existing[existingIndex] = { ...existing[existingIndex], ...entry, id: existing[existingIndex].id }
  } else {
    existing.push(entry)
  }
  await writeJsonEntries(existing)

  return existingIndex >= 0 ? existing[existingIndex] : entry
}

export const listMessageEntries = async (): Promise<RsvpEntry[]> => {
  const entries = await listRsvpEntries()
  return entries.filter(entry => {
    const msg = (entry.message || '').trim()
    return msg.length > 0
  })
}

export const getRsvpStatusBySlug = async (slug: string): Promise<{ id: string | null; name: string | null; attending: boolean | null; message: string } | null> => {
  if (!slug) return null
  
  const guest = findGuestBySlug(slug)
  
  if (!guest) return null
  
  const entries = await listRsvpEntries()
  
  const normalizedGuestName = guest.name.toLowerCase().trim()
  const entry = entries.find(e => e.name.toLowerCase().trim() === normalizedGuestName)
  
  if (entry) {
    return {
      id: entry.id,
      name: entry.name,
      attending: entry.attending === true ? true : entry.attending === false ? false : null,
      message: entry.message,
    }
  }
  
  return {
    id: guest.slug,
    name: guest.name,
    attending: null,
    message: '',
  }
}
