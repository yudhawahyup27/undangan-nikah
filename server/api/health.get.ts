export default defineEventHandler(() => {
  const configured = isSupabaseConfigured()

  return {
    ok: configured,
    supabase: configured ? 'configured' : 'missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
    runtime: isServerlessProduction() ? 'serverless' : 'local',
  }
})
