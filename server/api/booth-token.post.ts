import { generateBoothToken } from '~/server/utils/boothToken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (typeof body?.name !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Guest name is required'
    })
  }

  if (typeof body?.attending !== 'boolean' && body?.attending !== null) {
    throw createError({
      statusCode: 400,
      message: 'Attending status must be boolean or null'
    })
  }

  try {
    const token = generateBoothToken({
      guestId: body.guestId || null,
      name: body.name,
      attending: body.attending
    })

    return {
      token,
      expiresIn: '24 hours'
    }
  } catch (error) {
    console.error('[booth-token.post]', error)
    throw createError({
      statusCode: 500,
      message: 'Tidak dapat membuat token booth'
    })
  }
})
