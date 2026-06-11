export type Guest = {
  code: string
  name: string
  slug: string
  side: 'ima' | 'yudha'
  relation: string | null
  status: string
}

export function useGuest() {
  const route = useRoute()
  const guest = ref<Guest | null>(null)

  const guestQuery = computed(() => {
    const code = route.query.code
    const to = route.query.to
    const slug = route.query.slug

    if (typeof code === 'string' && code.trim()) {
      return { type: 'code' as const, value: code.trim() }
    }

    if (typeof slug === 'string' && slug.trim()) {
      return { type: 'slug' as const, value: slug.trim() }
    }

    if (typeof to === 'string' && to.trim()) {
      return { type: 'to' as const, value: to.trim() }
    }

    return null
  })

  watch(guestQuery, async (query) => {
    if (!query) {
      guest.value = null
      return
    }

    try {
      const params = new URLSearchParams()
      if (query.type === 'code') params.set('code', query.value)
      if (query.type === 'slug') params.set('slug', query.value)
      if (query.type === 'to') params.set('to', query.value)

      guest.value = await $fetch<Guest>(`/api/guests?${params.toString()}`)
    } catch {
      guest.value = null
    }
  }, { immediate: true })

  const guestName = computed(() => {
    if (guest.value?.name) return guest.value.name

    const query = guestQuery.value
    if (query?.type === 'to') return decodeURIComponent(query.value)

    return null
  })

  const invitationUrl = (item: Guest, origin = '') =>
    `${origin}/undangan?code=${item.code}`

  return {
    guest,
    guestName,
    guestQuery,
    invitationUrl,
  }
}
