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

const COLLECTION = 'rsvp'
const JSON_PATH = join(process.cwd(), 'server/data/rsvp.json')

const isFirebaseConfigured = () => {
  const config = useRuntimeConfig()
  return Boolean(
    config.firebaseProjectId &&
    config.firebaseClientEmail &&
    config.firebasePrivateKey
  )
}

const getFirestoreDb = async () => {
  const { initializeApp, getApps, cert } = await import('firebase-admin/app')
  const { getFirestore } = await import('firebase-admin/firestore')

  if (!getApps().length) {
    const config = useRuntimeConfig()
    initializeApp({
      credential: cert({
        projectId: config.firebaseProjectId,
        clientEmail: config.firebaseClientEmail,
        privateKey: config.firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
    })
  }

  return getFirestore()
}

const mapDoc = (id: string, data: Record<string, unknown>): RsvpEntry => ({
  id,
  name: String(data.name ?? ''),
  attending: Boolean(data.attending),
  message: String(data.message ?? ''),
  timestamp: String(data.timestamp ?? new Date().toISOString()),
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
  if (isFirebaseConfigured()) {
    const db = await getFirestoreDb()
    const snapshot = await db
      .collection(COLLECTION)
      .orderBy('timestamp', 'desc')
      .get()

    return snapshot.docs.map(doc => mapDoc(doc.id, doc.data()))
  }

  const entries = await readJsonEntries()
  return entries.slice().reverse()
}

export const createRsvpEntry = async (input: CreateRsvpInput): Promise<RsvpEntry> => {
  const entry: RsvpEntry = {
    id: `rsvp_${Date.now()}`,
    name: input.name.trim(),
    attending: input.attending,
    message: (input.message || '').trim(),
    timestamp: new Date().toISOString(),
  }

  if (isFirebaseConfigured()) {
    const db = await getFirestoreDb()
    const docRef = await db.collection(COLLECTION).add({
      name: entry.name,
      attending: entry.attending,
      message: entry.message,
      timestamp: entry.timestamp,
    })

    return { ...entry, id: docRef.id }
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
