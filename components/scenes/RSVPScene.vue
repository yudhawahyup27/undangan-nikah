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
          <a class="btn-primary booth-link" href="https://booth.ywp.my.id" target="_blank" rel="noopener noreferrer">
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
          <a class="btn-primary booth-link mt-5" href="https://booth.ywp.my.id" target="_blank" rel="noopener noreferrer">
            Kirim Kenangan
          </a>
        </div>
        <button type="button" class="choice-btn mt-7" @click="editConfirmation">Ubah Konfirmasi</button>
      </div>

      <form v-else @submit.prevent="submitRsvp">
        <p class="status-copy mb-5 text-center">Apakah kamu akan hadir di hari bahagia kami?</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button type="button" class="choice-btn" :class="{ active: form.attending === true }" @click="form.attending = true">Ya, Saya Akan Hadir</button>
          <button type="button" class="choice-btn" :class="{ active: form.attending === false }" @click="form.attending = false">Maaf, Saya Belum Bisa Hadir</button>
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

    <div ref="messagesRef" class="w-full max-w-[720px] mt-12 relative" style="z-index:2">
      <h3 class="font-cormorant text-cream/80 text-center mb-5" style="font-size:1.5rem">Ucapan & Doa</h3>
      <p v-if="loadingMessages" class="text-center font-cormorant text-cream/40">Memuat ucapan...</p>
      <p v-else-if="messagesError" class="text-center font-cormorant text-cream/40">Ucapan belum dapat dimuat.</p>
      <div v-else-if="messages.length > 0" class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <article v-for="item in messages" :key="item.id" class="message-item">
          <div class="flex items-center justify-between gap-4 mb-2">
            <p class="font-josefin text-gold text-sm">{{ item.name }}</p>
            <p class="font-josefin text-cream/30 text-xs">{{ formatDate(item.timestamp) }}</p>
          </div>
          <p class="font-cormorant text-cream/70 leading-relaxed">{{ item.message }}</p>
        </article>
      </div>
      <p v-else class="text-center font-cormorant text-cream/40">Belum ada ucapan. Jadilah yang pertama!</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
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
const { show: showToast } = useToast()

const titleRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const messagesRef = ref<HTMLElement | null>(null)
const submitting = ref(false)
const loadingStatus = ref(false)
const loadingMessages = ref(false)
const messagesError = ref(false)
const editing = ref(false)
const currentStatus = ref<boolean | null>(null)
const messages = ref<RsvpMessage[]>([])

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

const loadMessages = async () => {
  loadingMessages.value = true
  messagesError.value = false
  try {
    const data = await $fetch<RsvpMessage[]>('/api/messages')
    messages.value = data.filter(item => (item.message || '').trim().length > 0)
  } catch {
    messages.value = []
    messagesError.value = true
  } finally {
    loadingMessages.value = false
  }
}

const editConfirmation = () => {
  form.attending = currentStatus.value
  editing.value = true
}

const submitRsvp = async () => {
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
    await loadMessages()
  } catch {
    showToast('RSVP gagal dikirim')
  } finally {
    submitting.value = false
  }
}

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short' }).format(new Date(value))
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
  await Promise.all([restoreStatus(), loadMessages()])
  if (!process.client) return

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

.message-item {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(201, 168, 76, 0.12);
  border-radius: 8px;
  padding: 1rem;
}
</style>
