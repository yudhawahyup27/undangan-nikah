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
  const config = useRuntimeConfig()
  const guest = ref<Guest | null>(null)

  const guestSlug = computed(() => {
    const param = route.params.slug
    if (typeof param === 'string' && param.trim()) {
      return param.trim()
    }
    return null
  })

  watch(guestSlug, async (slug) => {
    if (!slug) {
      guest.value = null
      return
    }

    try {
      guest.value = await $fetch<Guest>(`/api/guests?slug=${encodeURIComponent(slug)}`)
    } catch {
      guest.value = null
    }
  }, { immediate: true })

  const guestName = computed(() => guest.value?.name ?? null)

  const siteUrl = (config.public.siteUrl as string || 'https://nikah.ywp.my.id').replace(/\/$/, '')

  const invitationUrl = (item: Guest, origin = siteUrl) =>
    `${origin.replace(/\/$/, '')}/${item.slug}`

  return {
    guest,
    guestName,
    guestSlug,
    invitationUrl,
    siteUrl,
  }
}
