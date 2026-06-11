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
  const pending = ref(false)

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
      pending.value = false
      return
    }

    pending.value = true
    try {
      guest.value = await $fetch<Guest>(`/api/guests?slug=${encodeURIComponent(slug)}`)
    } catch {
      guest.value = null
    } finally {
      pending.value = false
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
    pending,
    invitationUrl,
    siteUrl,
  }
}
