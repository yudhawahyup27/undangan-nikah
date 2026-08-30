import { ref, computed, watch } from 'vue'
import { useGuest } from '~/composables/useGuest'

export type PhotoBoothMode = 'venue' | 'remote' | 'unconfirmed'

export type PhotoBoothState = {
  id: string
  name: string
  attending: boolean | null
}

export function usePhotoBoothState() {
  const { guestSlug } = useGuest()
  const state = ref<PhotoBoothState | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const token = ref<string | null>(null)

  const mode = computed<PhotoBoothMode>(() => {
    if (!state.value) return 'unconfirmed'
    if (state.value.attending === true) return 'venue'
    if (state.value.attending === false) return 'remote'
    return 'unconfirmed'
  })

  const isAttending = computed(() => state.value?.attending === true)
  const isNotAttending = computed(() => state.value?.attending === false)
  const isUnconfirmed = computed(() => state.value?.attending === null || !state.value)

  const fetchPhotoBoothState = async (slug: string) => {
    if (!slug) {
      state.value = null
      return
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch<PhotoBoothState>('/api/rsvp-status', {
        query: { slug }
      })
      state.value = response
    } catch (err) {
      console.error('[usePhotoBoothState] Failed to fetch state:', err)
      error.value = 'Tidak dapat memuat status RSVP'
      state.value = null
    } finally {
      loading.value = false
    }
  }

  const generateBoothToken = async () => {
    if (!state.value) return null

    try {
      const response = await $fetch<{ token: string }>('/api/booth-token', {
        method: 'POST',
        body: {
          guestId: state.value.id,
          name: state.value.name,
          attending: state.value.attending
        }
      })
      token.value = response.token
      return response.token
    } catch (err) {
      console.error('[usePhotoBoothState] Failed to generate token:', err)
      error.value = 'Tidak dapat membuat token booth'
      return null
    }
  }

  const getBoothUrl = (baseUrl: string = 'https://booth.ywp.my.id') => {
    if (!token.value) return baseUrl
    return `${baseUrl}/start?t=${encodeURIComponent(token.value)}`
  }

  watch(guestSlug, (slug) => {
    if (slug) {
      fetchPhotoBoothState(slug)
    } else {
      state.value = null
      token.value = null
    }
  }, { immediate: true })

  return {
    state,
    mode,
    loading,
    error,
    token,
    isAttending,
    isNotAttending,
    isUnconfirmed,
    fetchPhotoBoothState,
    generateBoothToken,
    getBoothUrl,
  }
}
