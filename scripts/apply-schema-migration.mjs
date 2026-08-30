#!/usr/bin/env node

/**
 * Apply the Supabase schema migration
 * Usage: node scripts/apply-schema-migration.mjs
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '..', '.env')

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

// Read the schema.sql file
const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql')
if (!fs.existsSync(schemaPath)) {
  console.error(`❌ Schema file not found at ${schemaPath}`)
  process.exit(1)
}

const schemaSql = fs.readFileSync(schemaPath, 'utf-8')

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function applyMigration() {
  try {
    console.log('🚀 Applying schema migration...')
    
    // Split the schema into individual statements
    const statements = schemaSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      console.log(`\n📋 Executing statement ${i + 1}/${statements.length}...`)
      console.log(`  ${statement.substring(0, 80)}...`)
      
      const { error } = await supabase.rpc('exec_sql', { sql: statement })
      
      if (error) {
        // Some statements might fail if they're idempotent (e.g., create if not exists)
        // Only log warnings for non-critical errors
        if (error.message?.includes('already exists') || error.message?.includes('if not exists')) {
          console.log(`  ⚠️  ${error.message}`)
        } else {
          console.error(`  ❌ Error: ${error.message}`)
          if (!statement.includes('if not exists')) {
            throw error
          }
        }
      } else {
        console.log(`  ✅ Success`)
      }
    }
    
    console.log('\n✨ Schema migration applied successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

applyMigration()
