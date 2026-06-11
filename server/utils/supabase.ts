type SupabaseConfig = {
  url: string
  serviceRoleKey: string
}

let supabaseClient: import('@supabase/supabase-js').SupabaseClient | null = null

const cleanEnv = (value: unknown) => {
  if (value === undefined || value === null) return ''
  let text = String(value).trim()
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1).trim()
  }
  return text
}

export const getSupabaseConfig = (): SupabaseConfig | null => {
  const config = useRuntimeConfig()

  const url = cleanEnv(
    process.env.SUPABASE_URL ||
    process.env.NUXT_SUPABASE_URL ||
    config.supabaseUrl
  )

  const serviceRoleKey = cleanEnv(
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY ||
    config.supabaseServiceRoleKey
  )

  if (!url || !serviceRoleKey) return null

  return { url, serviceRoleKey }
}

export const isSupabaseConfigured = () => Boolean(getSupabaseConfig())

export const getSupabase = async () => {
  if (supabaseClient) return supabaseClient

  const credentials = getSupabaseConfig()
  if (!credentials) {
    throw new Error(
      'Supabase belum dikonfigurasi. Set SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di Vercel Environment Variables.'
    )
  }

  const { createClient } = await import('@supabase/supabase-js')
  supabaseClient = createClient(credentials.url, credentials.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return supabaseClient
}

export const isServerlessProduction = () =>
  Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME)

export const getErrorMessage = (error: unknown) => {
  if (!error || typeof error !== 'object') {
    return 'Gagal menyimpan konfirmasi kehadiran'
  }

  const err = error as {
    message?: string
    details?: string
    hint?: string
    code?: string
  }

  return [err.message, err.details, err.hint, err.code].filter(Boolean).join(' — ')
    || 'Gagal menyimpan konfirmasi kehadiran'
}
