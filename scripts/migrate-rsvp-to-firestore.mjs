import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const loadEnv = () => {
  const envPath = join(root, '.env')
  if (!existsSync(envPath)) return

  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnv()

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error('Missing FIREBASE_* env vars. Copy .env.example to .env and fill Firebase credentials.')
  process.exit(1)
}

initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
})

const db = getFirestore()
const jsonPath = join(root, 'server/data/rsvp.json')

if (!existsSync(jsonPath)) {
  console.log('No server/data/rsvp.json found. Nothing to migrate.')
  process.exit(0)
}

const entries = JSON.parse(readFileSync(jsonPath, 'utf-8'))
let migrated = 0

for (const entry of entries) {
  const snapshot = await db
    .collection('rsvp')
    .where('timestamp', '==', entry.timestamp)
    .where('name', '==', entry.name)
    .limit(1)
    .get()

  if (!snapshot.empty) {
    console.log(`Skip (exists): ${entry.name}`)
    continue
  }

  await db.collection('rsvp').add({
    name: entry.name,
    attending: entry.attending,
    message: entry.message || '',
    timestamp: entry.timestamp,
  })

  migrated += 1
  console.log(`Migrated: ${entry.name}`)
}

console.log(`Done. ${migrated} entries migrated to Firestore collection "rsvp".`)
