export default defineEventHandler(async () => {
  try {
    return await listMessageEntries()
  } catch (error) {
    console.error('[messages.get]', error)
    throw createError({
      statusCode: 500,
      message: 'Ucapan belum dapat dimuat',
    })
  }
})
