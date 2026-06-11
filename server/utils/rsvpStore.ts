import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export type RsvpEntry = {
  id: string
  name: string
  attending: boolean
  message: string
  timestamp: string
}

export type CreateRsvpInput = {
  name: string
  attending: boolean
  message?: string
}

const TABLE = 'rsvp'
const JSON_PATH = join(process.cwd(), 'server/data/rsvp.json')

type RsvpRow = {
  id: string
  name: string
  attending: boolean
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

    return (data as RsvpRow[]).map(mapRow)
  }

  const entries = await readJsonEntries()
  return entries.slice().reverse()
}

export const createRsvpEntry = async (input: CreateRsvpInput): Promise<RsvpEntry> => {
  const payload = {
    name: input.name.trim(),
    attending: input.attending,
    message: (input.message || '').trim(),
  }

  if (isSupabaseConfigured()) {
    const supabase = await getSupabase()
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select('id, name, attending, message, created_at')
      .single()

    if (error) {
      console.error('[rsvpStore.createRsvpEntry]', error)
      throw error
    }

    return mapRow(data as RsvpRow)
  }

  if (isServerlessProduction()) {
    throw new Error(
      'Supabase belum dikonfigurasi di production. Set SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di Vercel.'
    )
  }

  const entry: RsvpEntry = {
    id: `rsvp_${Date.now()}`,
    ...payload,
    timestamp: new Date().toISOString(),
  }

  const existing = await readJsonEntries()
  existing.push(entry)
  await writeJsonEntries(existing)

  return entry
}

export const listMessageEntries = async (): Promise<RsvpEntry[]> => {
  const entries = await listRsvpEntries()
  return entries.filter(entry => entry.message.length > 0)
}
