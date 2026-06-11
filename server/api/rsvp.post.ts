export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name || body.attending === undefined) {
    throw createError({ statusCode: 400, message: 'Name and attending status are required' })
  }

  try {
    const entry = await createRsvpEntry({
      name: body.name,
      attending: body.attending,
      message: body.message,
    })

    return { success: true, data: entry }
  } catch (error) {
    console.error('[rsvp.post]', error)
    throw createError({
      statusCode: 500,
      message: getErrorMessage(error),
    })
  }
})
