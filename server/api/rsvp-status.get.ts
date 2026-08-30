import { getRsvpStatusBySlug } from '~/server/utils/rsvpStore'

export default defineEventHandler(async (event) => {
  const { slug } = getQuery(event)

  if (!slug || typeof slug !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    })
  }

  try {
    const status = await getRsvpStatusBySlug(slug)
    
    if (!status) {
      // Guest not found or not RSVP'd yet
      return {
        id: null,
        name: null,
        attending: null
      }
    }

    return status
  } catch (error) {
    console.error('[rsvp-status.get]', error)
    throw createError({
      statusCode: 500,
      message: 'Tidak dapat memuat status RSVP'
    })
  }
})
