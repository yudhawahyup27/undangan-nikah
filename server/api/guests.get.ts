export default defineEventHandler((event) => {
  const query = getQuery(event)

  if (query.code) {
    const guest = findGuestByCode(String(query.code))
    if (!guest) {
      throw createError({ statusCode: 404, message: 'Tamu tidak ditemukan' })
    }
    return guest
  }

  if (query.slug) {
    const guest = findGuestBySlug(String(query.slug))
    if (!guest) {
      throw createError({ statusCode: 404, message: 'Tamu tidak ditemukan' })
    }
    return guest
  }

  if (query.to) {
    const guest = findGuestByName(String(query.to))
    if (!guest) {
      throw createError({ statusCode: 404, message: 'Tamu tidak ditemukan' })
    }
    return guest
  }

  return listGuests()
})
