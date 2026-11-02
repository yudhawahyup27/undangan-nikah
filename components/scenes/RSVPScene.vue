<template>
  <section id="rsvp-scene" class="scene relative py-32 px-6" style="min-height:100vh">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 50% 45%, rgba(201,168,76,0.06) 0%, transparent 62%)" />

    <a href="#photo-booth" class="booth-widget" @click.prevent="scrollToPhotoBooth">
      <svg class="booth-widget-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3h6l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5L9 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <span>
        <strong class="booth-widget-title">Photo Booth</strong>
        <span class="booth-widget-copy">Abadikan momen spesialmu bersama kami</span>
      </span>
      <span class="booth-widget-arrow" aria-hidden="true">&#8594;</span>
    </a>

    <div ref="titleRef" class="text-center mb-10 relative" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Konfirmasi Kehadiran</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2.2rem,5vw,4rem)">RSVP</h2>
      <div class="section-divider mt-6" />
    </div>

    <div ref="formRef" class="rsvp-card glass-card w-full max-w-[620px] p-6 sm:p-8 relative" style="z-index:2">
      <div v-if="loadingStatus" class="status-copy text-center">Memuat konfirmasi...</div>

      <div v-else-if="!editing && currentStatus === true" class="text-center">
        <div class="status-mark">✓ HADIR</div>
        <p class="status-copy">Terima kasih, kehadiranmu sudah tercatat.</p>
        <p class="status-copy">Sampai bertemu di hari bahagia kami.</p>
        <div class="booth-panel mt-8">
          <p class="field-label">Photo Booth</p>
          <h3 class="booth-title">Siap mengabadikan momen?</h3>
          <p class="status-copy mb-5">Abadikan momen spesialmu di hari bahagia Yudha & Ima.</p>
          <a class="btn-primary booth-link" :href="photoBoothUrl" target="_blank" rel="noopener noreferrer">
            Abadikan Momen
          </a>
        </div>
        <button type="button" class="choice-btn mt-7" @click="editConfirmation">Ubah Konfirmasi</button>
      </div>

      <div v-else-if="!editing && currentStatus === false" class="text-center">
        <div class="status-mark">TIDAK HADIR</div>
        <p class="status-copy">Terima kasih sudah mengabari kami.</p>
        <p class="status-copy">Walaupun belum bisa hadir secara langsung, doa dan ucapanmu tetap berarti bagi kami.</p>
        <div class="booth-panel mt-8">
          <p class="field-label">Memory Booth</p>
          <h3 class="booth-title">Tetap titipkan kenangan untuk kami.</h3>
          <a class="btn-primary booth-link mt-5" :href="photoBoothUrl" target="_blank" rel="noopener noreferrer">
            Kirim Kenangan
          </a>
        </div>
        <button type="button" class="choice-btn mt-7" @click="editConfirmation">Ubah Konfirmasi</button>
      </div>

      <form v-else @submit.prevent="submitRsvp">
        <p class="status-copy mb-5 text-center">Apakah kamu akan hadir di hari bahagia kami?</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button type="button" class="choice-btn" :class="{ active: form.attending === true }" :aria-pressed="form.attending === true" @click="form.attending = true">Ya, Saya Akan Hadir</button>
          <button type="button" class="choice-btn" :class="{ active: form.attending === false }" :aria-pressed="form.attending === false" @click="form.attending = false">Maaf, Saya Belum Bisa Hadir</button>
        </div>

        <label class="field-label" for="rsvp-name">Nama</label>
        <input id="rsvp-name" v-model.trim="form.name" class="rsvp-input" type="text" autocomplete="name" required>

        <label class="field-label mt-6" for="rsvp-message">Ucapan & Doa untuk Yudha & Ima</label>
        <textarea id="rsvp-message" v-model="form.message" class="rsvp-input min-h-[120px] resize-none" maxlength="500" placeholder="Tulis doa atau ucapan..." />

        <button class="btn-primary w-full mt-7" type="submit" :disabled="submitting">
          {{ submitting ? 'Mengirim...' : 'Kirim Konfirmasi' }}
        </button>
      </form>
    </div>

    <section ref="messagesRef" class="wishes-wall" aria-labelledby="wishes-title">
      <header class="wishes-heading">
        <p class="wishes-eyebrow">Ucapan & Doa</p>
        <h3 id="wishes-title">Wall of Wishes</h3>
        <div class="section-divider mt-6" />
        <p class="wishes-intro">Setiap doa adalah hadiah indah untuk perjalanan cinta kami.</p>
        <button type="button" class="btn-primary wishes-cta" :disabled="loadingStatus || submitting" @click="openWishForm">Tulis Doa & Harapan</button>
      </header>

      <div class="wishes-toolbar">
        <div class="wishes-filters" role="group" aria-label="Urutkan ucapan">
          <button v-for="option in wishFilters" :key="option.value" type="button" class="wish-filter" :aria-pressed="wishSort === option.value" @click="wishSort = option.value">{{ option.label }}</button>
        </div>
        <p id="wish-heart-note" class="wishes-note">Heart & urutan populer tersimpan di browser ini.</p>
      </div>

      <div :aria-busy="loadingMessages">
        <template v-if="loadingMessages">
          <p class="sr-only" role="status">Memuat ucapan...</p>
          <div class="wishes-masonry" aria-hidden="true">
            <div v-for="index in 6" :key="index" class="wish-card wish-skeleton">
              <span class="skeleton-line skeleton-name" />
              <span v-for="line in (index % 3) + 2" :key="line" class="skeleton-line" />
              <span class="skeleton-line skeleton-date" />
            </div>
          </div>
        </template>
        <div v-else-if="messagesError" class="wishes-state" role="alert">
          <h4>Ucapan belum dapat dimuat</h4>
          <p>Periksa koneksi internet, lalu coba kembali.</p>
          <button type="button" class="choice-btn mt-5" @click="loadMessages">Coba Lagi</button>
        </div>
        <template v-else-if="messages.length">
          <div class="wishes-masonry">
            <article v-for="item in visibleMessages" :key="item.id" class="wish-card" tabindex="-1">
              <span class="wish-quote" aria-hidden="true">“</span>
              <h4 class="wish-name">{{ item.name }}</h4>
              <p class="wish-message">{{ item.message }}</p>
              <footer class="wish-footer">
                <time :datetime="item.timestamp">{{ formatDate(item.timestamp) }}</time>
                <button type="button" class="wish-heart" :aria-pressed="heartedIds.includes(item.id)" :aria-label="`Beri hati untuk ucapan ${item.name}`" aria-describedby="wish-heart-note" @click="toggleHeart(item.id)">
                  <svg width="19" height="19" viewBox="0 0 24 24" :fill="heartedIds.includes(item.id) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
                  <span>{{ heartedIds.includes(item.id) ? 1 : 0 }}</span>
                </button>
              </footer>
            </article>
          </div>
          <div class="wishes-more">
            <p role="status">{{ visibleMessages.length }} dari {{ messages.length }} ucapan</p>
            <button v-if="visibleCount < messages.length" type="button" class="btn-primary" @click="loadMoreWishes">Muat Lebih Banyak</button>
          </div>
        </template>
        <div v-else class="wishes-state" role="status">
          <h4>Lembaran doa menanti kisahmu</h4>
          <p>Belum ada ucapan. Jadilah yang pertama menitipkan doa dan harapan.</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useToast } from '~/composables/useToast'

type RsvpMessage = {
  id: string
  name: string
  attending: boolean | null
  message: string
  timestamp: string
}

type RsvpStatus = {
  id: string | null
  name: string | null
  attending: boolean | null
  message: string
}

const { guestName, guestSlug } = useGuest()
const photoBoothUrl = computed(() => `https://wedding-photo-box-ten.vercel.app/${encodeURIComponent(guestSlug.value || '')}`)
const { show: showToast } = useToast()

const titleRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const messagesRef = ref<HTMLElement | null>(null)
const submitting = ref(false)
const loadingStatus = ref(false)
const loadingMessages = ref(true)
const messagesError = ref(false)
const editing = ref(false)
const currentStatus = ref<boolean | null>(null)
const messages = ref<RsvpMessage[]>([])
const wishFilters = [{ value: 'newest', label: 'Terbaru' }, { value: 'popular', label: 'Terpopuler' }] as const
const wishSort = ref<'newest' | 'popular'>('newest')
const visibleCount = ref(6)
const heartedIds = ref<string[]>([])
const heartStorageKey = 'wedding-wishes-hearts-v1'
let messagesRequest: Promise<void> | null = null
const visibleMessages = computed(() => [...messages.value].sort((a, b) => {
  const popularity = wishSort.value === 'popular'
    ? Number(heartedIds.value.includes(b.id)) - Number(heartedIds.value.includes(a.id)) : 0
  const timestamp = (value: string) => Date.parse(value) || 0
  return popularity || timestamp(b.timestamp) - timestamp(a.timestamp) || a.id.localeCompare(b.id)
}).slice(0, visibleCount.value))

watch(wishSort, () => { visibleCount.value = 6 })

const loadMoreWishes = async () => {
  const firstNewIndex = visibleMessages.value.length
  visibleCount.value += 6
  await nextTick()
  messagesRef.value?.querySelectorAll<HTMLElement>('article.wish-card')[firstNewIndex]?.focus()
}

const toggleHeart = (id: string) => {
  heartedIds.value = heartedIds.value.includes(id)
    ? heartedIds.value.filter(value => value !== id) : [...heartedIds.value, id]
  try {
    localStorage.setItem(heartStorageKey, JSON.stringify(heartedIds.value))
  } catch {
    // Hearts remain usable when browser storage is unavailable.
  }
}

const openWishForm = async () => {
  if (loadingStatus.value || submitting.value) return
  editing.value = true
  await nextTick()
  const messageInput = document.getElementById('rsvp-message')
  messageInput?.focus({ preventScroll: true })
  messageInput?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
}

const form = reactive({
  name: '',
  attending: null as boolean | null,
  message: '',
})

watch(guestName, (name) => {
  if (name && !form.name) form.name = name
}, { immediate: true })

const restoreStatus = async () => {
  if (!guestSlug.value) return
  loadingStatus.value = true
  try {
    const status = await $fetch<RsvpStatus>(`/api/rsvp-status?slug=${encodeURIComponent(guestSlug.value)}`)
    currentStatus.value = status.attending === true ? true : status.attending === false ? false : null
    form.name = status.name || guestName.value || form.name
    form.attending = currentStatus.value
    form.message = status.message || ''
    editing.value = currentStatus.value === null
  } catch {
    currentStatus.value = null
    editing.value = true
  } finally {
    loadingStatus.value = false
  }
}

const loadMessages = (): Promise<void> => {
  if (messagesRequest) return messagesRequest
  loadingMessages.value = true
  messagesError.value = false
  messagesRequest = (async () => {
    try {
      const data = await $fetch<RsvpMessage[]>('/api/messages')
      messages.value = data.filter(item => (item.message || '').trim().length > 0)
    } catch {
      messagesError.value = true
    } finally {
      loadingMessages.value = false
      messagesRequest = null
    }
  })()
  return messagesRequest
}

const editConfirmation = () => {
  form.attending = currentStatus.value
  editing.value = true
}

const submitRsvp = async () => {
  if (submitting.value) return
  if (!form.name || form.attending === null) {
    showToast('Lengkapi nama dan status kehadiran')
    return
  }

  submitting.value = true
  try {
    const response = await $fetch<{ success: boolean; data: RsvpMessage }>('/api/rsvp', {
      method: 'POST',
      body: {
        name: form.name,
        attending: form.attending,
        message: form.message,
        guestSlug: guestSlug.value,
      },
    })

    currentStatus.value = response.data.attending === true ? true : response.data.attending === false ? false : null
    form.message = response.data.message
    editing.value = currentStatus.value === null
    showToast(currentStatus.value ? 'Terima kasih, kehadiranmu sudah tercatat.' : 'Terima kasih sudah mengabari kami.')
    // Refresh after any older request so a successful submission is visible.
    if (messagesRequest) await messagesRequest
    await loadMessages()
  } catch {
    showToast('RSVP gagal dikirim')
  } finally {
    submitting.value = false
  }
}

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
  } catch {
    return ''
  }
}

const scrollToPhotoBooth = () => {
  const photoBoothSection = document.getElementById('photo-booth')
  if (photoBoothSection) {
    photoBoothSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(heartStorageKey) || '[]')
    if (Array.isArray(stored)) heartedIds.value = [...new Set(stored.filter((id): id is string => typeof id === 'string'))]
  } catch {
    // Private browsing or invalid saved data must not block the guestbook.
  }
  await Promise.all([restoreStatus(), loadMessages()])
  if (!process.client) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const scene = document.getElementById('rsvp-scene')
  if (!scene) return

  ;[titleRef.value, formRef.value, messagesRef.value].filter(Boolean).forEach((el, index) => {
    gsap.fromTo(el,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: scene, start: 'top 80%', toggleActions: 'play none none none' },
      }
    )
  })
})
</script>

<style scoped>
.rsvp-card {
  border-radius: 8px;
}

.booth-widget {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: min(620px, 100%);
  margin: 0 auto 2.5rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid rgba(201, 168, 76, 0.28);
  border-radius: 8px;
  background: rgba(201, 168, 76, 0.07);
  color: var(--color-cream);
  text-decoration: none;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.booth-widget:hover {
  border-color: rgba(201, 168, 76, 0.6);
  background: rgba(201, 168, 76, 0.12);
  transform: translateY(-2px);
}

.booth-widget-icon,
.booth-widget-arrow {
  color: var(--color-gold);
  flex: 0 0 auto;
}

.booth-widget-title,
.booth-widget-copy {
  display: block;
}

.booth-widget-title {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.booth-widget-copy {
  margin-top: 0.25rem;
  color: rgba(245, 238, 215, 0.6);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
}

.booth-widget-arrow {
  margin-left: auto;
  font-size: 1.25rem;
}

.field-label {
  display: block;
  margin-bottom: 0.65rem;
  color: rgba(201, 168, 76, 0.65);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.status-mark {
  color: var(--color-gold);
  font-family: 'Josefin Sans', sans-serif;
  font-size: clamp(1.35rem, 6vw, 2rem);
  letter-spacing: 0.18em;
  margin-bottom: 1rem;
}

.status-copy {
  color: rgba(245, 238, 215, 0.62);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  line-height: 1.7;
}

.booth-panel {
  border: 1px solid rgba(201, 168, 76, 0.16);
  border-radius: 8px;
  background: rgba(201, 168, 76, 0.04);
  padding: 1.25rem;
}

.booth-title {
  color: var(--color-cream);
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.booth-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  width: 100%;
  text-decoration: none;
  white-space: normal;
}

.rsvp-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(201, 168, 76, 0.18);
  border-radius: 6px;
  color: var(--color-cream);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  outline: none;
  padding: 0.9rem 1rem;
}

.rsvp-input:focus {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(201, 168, 76, 0.55);
}

.choice-btn {
  min-height: 48px;
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 6px;
  background: rgba(201, 168, 76, 0.04);
  color: rgba(245, 238, 215, 0.7);
  cursor: pointer;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  padding: 0.85rem 1rem;
  text-transform: uppercase;
  transition: all 0.25s ease;
  white-space: normal;
}

.choice-btn.active,
.choice-btn:hover {
  background: rgba(201, 168, 76, 0.14);
  border-color: rgba(201, 168, 76, 0.62);
  color: var(--color-gold);
}

.btn-primary:disabled {
  cursor: wait;
  opacity: 0.65;
}

.wishes-wall {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  min-width: 0;
  margin-top: 5rem;
}

.wishes-heading { text-align: center; }
.wishes-eyebrow {
  font-family: 'Josefin Sans', sans-serif;
  color: var(--color-gold-light);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
}
.wishes-heading h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: var(--color-cream);
  line-height: 1.15;
}
.wishes-intro {
  color: var(--color-cream);
  opacity: 0.8;
  font-size: 1.2rem;
  line-height: 1.7;
  margin: 1.5rem auto;
  max-width: 30rem;
}
.wishes-cta {
  max-width: 100%;
  white-space: normal;
  line-height: 1.7;
  padding-inline: 1.5rem;
}
.wishes-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 2.5rem 0 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
}
.wishes-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.wish-filter {
  min-height: 44px;
  padding: 0.65rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-cream);
  background: transparent;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
}
.wish-filter[aria-pressed='true'], .wish-filter:hover {
  color: var(--color-gold-light);
  border-color: rgba(201, 168, 76, 0.45);
  background: rgba(201, 168, 76, 0.08);
}
.wishes-note {
  color: var(--color-cream);
  opacity: 0.75;
  font-size: 1rem;
  line-height: 1.5;
}
.wishes-masonry { columns: 1; column-gap: 1.25rem; }
.wish-card {
  position: relative;
  display: inline-block;
  width: 100%;
  break-inside: avoid;
  margin-bottom: 1.25rem;
  padding: 1.5rem;
  border: 1px solid rgba(201, 168, 76, 0.25);
  border-radius: 8px;
  background: var(--color-deep-navy);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  overflow-wrap: anywhere;
  animation: wish-fade-up 0.55s ease backwards;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
@media (hover: hover) {
  .wish-card:hover {
    transform: translateY(-3px);
    border-color: rgba(201, 168, 76, 0.55);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  }
}
.wish-quote {
  display: block;
  color: var(--color-gold);
  opacity: 0.6;
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  line-height: 0.8;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}
.wish-name {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.7;
  color: var(--color-gold-light);
}
.wish-message {
  margin: 1rem 0 1.25rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  line-height: 1.65;
  white-space: pre-wrap;
  color: var(--color-cream);
}
.wish-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  border-top: 1px solid rgba(201, 168, 76, 0.16);
  padding-top: 0.75rem;
}
.wish-footer time {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--color-cream);
  opacity: 0.75;
}
.wish-heart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 44px;
  min-height: 44px;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--color-gold-light);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
}
.wish-heart:hover, .wish-heart[aria-pressed='true'] { background: rgba(201, 168, 76, 0.1); }
.wishes-wall button:focus-visible, .wish-card:focus-visible, .choice-btn:focus-visible, .rsvp-input:focus-visible {
  outline: 2px solid var(--color-gold-light);
  outline-offset: 4px;
}
.wishes-more { text-align: center; margin-top: 1.5rem; }
.wishes-more p { color: var(--color-cream); opacity: 0.75; margin-bottom: 1rem; font-size: 1rem; }
.wishes-more .btn-primary { max-width: 100%; white-space: normal; padding-inline: 1.5rem; }
.wishes-state {
  text-align: center;
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 8px;
  padding: 2.5rem 1rem;
  color: var(--color-cream);
}
.wishes-state h4 { font-size: 1.6rem; font-weight: 400; margin-bottom: 0.75rem; }
.wishes-state p { font-size: 1.15rem; line-height: 1.7; }
.wish-skeleton { min-height: 210px; }
.skeleton-line {
  display: block;
  height: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 3px;
  background: rgba(245, 238, 215, 0.1);
  animation: wish-pulse 1.6s ease-in-out infinite alternate;
}
.skeleton-name { width: 45%; height: 1rem; margin-bottom: 2rem; }
.skeleton-date { width: 35%; margin-top: 2rem; }
@keyframes wish-fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes wish-pulse { to { opacity: 0.4; } }
@media (min-width: 560px) { .wishes-masonry { columns: 2; } }
@media (min-width: 1024px) { .wishes-masonry { columns: 3; } }
@media (prefers-reduced-motion: reduce) {
  .wish-card, .skeleton-line, .wish-filter, .booth-widget, .choice-btn, .btn-primary, .btn-primary::before {
    animation: none;
    transition: none;
  }
  .wish-card:hover, .booth-widget:hover { transform: none; }
}
</style>
