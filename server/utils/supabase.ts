type SupabaseConfig = {
  url: string
  serviceRoleKey: string
}

let supabaseClient: import('@supabase/supabase-js').SupabaseClient | null = null

export const getSupabaseConfig = (): SupabaseConfig | null => {
  const config = useRuntimeConfig()

  const url =
    process.env.SUPABASE_URL ||
    process.env.NUXT_SUPABASE_URL ||
    config.supabaseUrl

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY ||
    config.supabaseServiceRoleKey

  if (!url || !serviceRoleKey) return null

  return {
    url: String(url).trim(),
    serviceRoleKey: String(serviceRoleKey).trim(),
  }
}

export const isSupabaseConfigured = () => Boolean(getSupabaseConfig())

export const getSupabase = async () => {
  if (supabaseClient) return supabaseClient

  const credentials = getSupabaseConfig()
  if (!credentials) {
    throw new Error('Supabase belum dikonfigurasi. Set SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.')
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
