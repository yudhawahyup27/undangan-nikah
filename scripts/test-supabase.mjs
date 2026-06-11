import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = join(root, '.env')

if (existsSync(envPath)) {
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

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('SUPABASE_URL set:', Boolean(url))
console.log('SUPABASE_SERVICE_ROLE_KEY set:', Boolean(key))

if (!url || !key) {
  console.error('Missing env vars')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })
const { data, error } = await supabase
  .from('rsvp')
  .insert({ name: 'Test API', attending: true, message: 'test' })
  .select('id')
  .limit(1)

if (error) {
  console.error('Insert failed:', error.message)
  console.error('Code:', error.code)
  console.error('Details:', error.details)
  process.exit(2)
}

console.log('Insert OK:', data?.[0]?.id)
await supabase.from('rsvp').delete().eq('id', data[0].id)
console.log('Cleanup OK')
