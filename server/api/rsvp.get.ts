export default defineEventHandler(async () => {
  try {
    return await listRsvpEntries()
  } catch (error) {
    console.error('[rsvp.get]', error)
    return []
  }
})
