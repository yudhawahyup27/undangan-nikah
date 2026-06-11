import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

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

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const jsonPath = join(root, 'server/data/rsvp.json')

if (!existsSync(jsonPath)) {
  console.log('No server/data/rsvp.json found. Nothing to migrate.')
  process.exit(0)
}

const entries = JSON.parse(readFileSync(jsonPath, 'utf-8'))
let migrated = 0

for (const entry of entries) {
  const { data: existing, error: findError } = await supabase
    .from('rsvp')
    .select('id')
    .eq('name', entry.name)
    .eq('created_at', entry.timestamp)
    .maybeSingle()

  if (findError) {
    console.error(`Error checking ${entry.name}:`, findError.message)
    continue
  }

  if (existing) {
    console.log(`Skip (exists): ${entry.name}`)
    continue
  }

  const { error } = await supabase.from('rsvp').insert({
    name: entry.name,
    attending: entry.attending,
    message: entry.message || '',
    created_at: entry.timestamp,
  })

  if (error) {
    console.error(`Failed ${entry.name}:`, error.message)
    continue
  }

  migrated += 1
  console.log(`Migrated: ${entry.name}`)
}

console.log(`Done. ${migrated} entries migrated to Supabase table "rsvp".`)
