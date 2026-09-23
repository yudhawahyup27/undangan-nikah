import localGallery from '~/server/data/photo-booth-gallery.json'
import { getSupabase, getSupabaseConfig, isSupabaseConfigured } from '~/server/utils/supabase'

type PhotoRow = Record<string, unknown>

const PHOTO_TABLES = [
  'photo_session_assets',
]

const getPhotoUrl = (row: PhotoRow) => {
  for (const key of [
    'url',
    'photo_url',
    'image_url',
    'public_url',
    'file_url',
    'asset_url',
    'signed_url',
    'thumbnail_url',
  ]) {
    if (typeof row[key] === 'string' && /^https?:\/\//.test(row[key])) return row[key]
  }

  const path = ['storage_path', 'file_path', 'path'].find((key) => typeof row[key] === 'string' && row[key])
  const config = getSupabaseConfig()
  if (path && config) {
    const bucket = typeof row.bucket_name === 'string'
      ? row.bucket_name
      : typeof row.bucket === 'string'
        ? row.bucket
        : 'photo-session-assets'
    return `${config.url}/storage/v1/object/public/${bucket}/${String(row[path]).replace(/^\//, '')}`
  }

  return null
}

const mapPhoto = (row: PhotoRow, index: number) => {
  const url = getPhotoUrl(row)
  if (!url) return null

  return {
    id: String(row.id ?? row.uuid ?? `photo-${index}`),
    url,
    name: typeof row.name === 'string'
      ? row.name
      : typeof row.file_name === 'string'
        ? row.file_name
        : typeof row.guest_name === 'string'
          ? row.guest_name
          : undefined,
    alt: typeof row.alt === 'string' ? row.alt : 'Momen dari Photo Booth',
  }
}

export default defineEventHandler(async () => {
  if (!isSupabaseConfigured()) return localGallery

  const supabase = await getSupabase()

  for (const table of PHOTO_TABLES) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(100)

    if (error) {
      console.warn(`[photo-booth-gallery] Table ${table} unavailable: ${error.message}`)
      continue
    }

    const photos = (data as PhotoRow[])
      .filter((row) => row.asset_type === 'final')
      .map(mapPhoto)
      .filter((photo): photo is NonNullable<ReturnType<typeof mapPhoto>> => Boolean(photo))

    if (photos.length) return photos
  }

  return []
})
