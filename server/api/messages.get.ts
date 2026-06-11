export default defineEventHandler(async () => {
  try {
    return await listMessageEntries()
  } catch (error) {
    console.error('[messages.get]', error)
    return []
  }
})
