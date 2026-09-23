import localGallery from '~/server/data/photo-booth-gallery.json'
import { getSupabase, getSupabaseConfig, isSupabaseConfigured } from '~/server/utils/supabase'

type PhotoRow = Record<string, unknown>

const PHOTO_TABLES = [
  'photo_session_assets',
]
const PHOTO_BUCKET = 'photo-booth'

const getDirectPhotoUrl = (row: PhotoRow) => {
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

  return null
}

const getStoragePath = (row: PhotoRow) => {
  return ['storage_path', 'file_path', 'path'].find((key) => typeof row[key] === 'string' && row[key])
}

const resolvePhotoUrl = async (row: PhotoRow, supabase: Awaited<ReturnType<typeof getSupabase>>) => {
  const directUrl = getDirectPhotoUrl(row)
  if (directUrl) return directUrl

  const storagePathKey = getStoragePath(row)
  if (!storagePathKey) return null

  const storagePath = String(row[storagePathKey]).replace(/^\//, '')
  const explicitBucket = typeof row.bucket_name === 'string'
    ? row.bucket_name
    : typeof row.bucket === 'string'
      ? row.bucket
      : PHOTO_BUCKET

  const config = getSupabaseConfig()
  if (config) {
    return `${config.url}/storage/v1/object/public/${explicitBucket}/${storagePath}`
  }

  const buckets = [explicitBucket]

  for (const bucket of buckets) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(storagePath, 3600)
    if (!error && data?.signedUrl) return data.signedUrl
  }

  return null
}

const mapPhoto = (row: PhotoRow, index: number, url: string | null) => {
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

    const photos = (await Promise.all((data as PhotoRow[])
      .filter((row) => row.asset_type === 'final')
      .map(async (row, index) => mapPhoto(row, index, await resolvePhotoUrl(row, supabase)))))
      .filter((photo): photo is NonNullable<ReturnType<typeof mapPhoto>> => Boolean(photo))

    if (photos.length) return photos
  }

  return []
})
