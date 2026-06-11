<template>
  <section id="rsvp-scene" class="scene relative py-32 px-8" style="min-height:100vh; overflow:hidden">
    <!-- Subtle grid pattern -->
    <div class="absolute inset-0 pointer-events-none" style="
      background-image: linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    "/>

    <!-- Title -->
    <div ref="titleRef" class="text-center mb-16 relative" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">RSVP</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2.2rem,5vw,4rem)">
        Konfirmasi <em class="text-gold/80">Kehadiran</em>
      </h2>
      <div class="section-divider mt-6" />
    </div>

    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative" style="z-index:2">
      <!-- Form -->
      <div ref="formRef" class="glass-card p-8 md:p-10">
        <h3 class="font-cormorant text-cream mb-8" style="font-size:1.4rem">
          Isi Konfirmasi Anda
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="font-josefin text-xs tracking-[0.3em] text-gold/60 uppercase block mb-2">Nama Lengkap</label>
            <input
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>

          <!-- Attending -->
          <div>
            <label class="font-josefin text-xs tracking-[0.3em] text-gold/60 uppercase block mb-3">Kehadiran</label>
            <div class="flex gap-3">
              <button
                type="button"
                class="radio-option flex-1 text-center"
                :class="{ selected: form.attending === true }"
                @click="selectAttending(true)"
              >
                ✓ &nbsp; Akan Hadir
              </button>
              <button
                type="button"
                class="radio-option flex-1 text-center"
                :class="{ selected: form.attending === false }"
                @click="selectAttending(false)"
              >
                ✗ &nbsp; Tidak Bisa Hadir
              </button>
            </div>
          </div>

          <!-- Message -->
          <div>
            <label class="font-josefin text-xs tracking-[0.3em] text-gold/60 uppercase block mb-2">Ucapan & Doa</label>
            <textarea
              v-model="form.message"
              class="form-input resize-none"
              rows="4"
              placeholder="Tuliskan ucapan dan doa terbaik Anda..."
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Kirim Konfirmasi</span>
            <span v-else>Mengirim...</span>
          </button>

          <!-- Success -->
          <div v-if="submitSuccess" class="text-center py-4">
            <p class="font-cormorant text-gold/80 italic" style="font-size:1rem; line-height:1.7">
              {{ successMessage }}
            </p>
          </div>
        </form>
      </div>

      <!-- Messages feed -->
      <div ref="messagesRef">
        <h3 class="font-cormorant text-cream mb-8" style="font-size:1.4rem">
          Ucapan & Doa
        </h3>

        <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2" style="scrollbar-width:thin; scrollbar-color: rgba(201,168,76,0.3) transparent">
          <div
            v-for="entry in entries"
            :key="entry.id"
            class="message-card glass-card p-6"
          >
            <div class="flex items-start gap-4">
              <div class="avatar flex-shrink-0">
                {{ entry.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <p class="font-josefin text-xs tracking-[0.2em] text-gold/70 uppercase">{{ entry.name }}</p>
                  <span
                    class="attendance-badge"
                    :class="entry.attending ? 'attendance-badge--yes' : 'attendance-badge--no'"
                  >
                    {{ entry.attending ? '✓ Akan Hadir' : '✗ Tidak Bisa Hadir' }}
                  </span>
                </div>
                <p
                  v-if="entry.message"
                  class="font-cormorant text-cream/70"
                  style="font-size:1rem; line-height:1.7"
                >
                  {{ entry.message }}
                </p>
                <p v-else class="font-cormorant text-cream/35 italic" style="font-size:0.95rem">
                  Konfirmasi kehadiran tanpa ucapan.
                </p>
                <p class="font-josefin text-xs text-cream/25 mt-2">{{ formatDate(entry.timestamp) }}</p>
              </div>
            </div>
          </div>

          <div v-if="entries.length === 0" class="text-center py-8">
            <p class="font-cormorant text-cream/30 italic">Belum ada ucapan. Jadilah yang pertama!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useToast } from '~/composables/useToast'
import { getRandomRsvpResponse } from '~/composables/useRsvpResponses'

type RsvpEntry = {
  id: string
  name: string
  attending: boolean
  message: string
  timestamp: string
}

const titleRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const messagesRef = ref<HTMLElement | null>(null)

const form = reactive({ name: '', attending: true as boolean | null, message: '' })
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const successMessage = ref('')
const entries = ref<RsvpEntry[]>([])
const { guestName } = useGuest()
const { show: showToast } = useToast()

const selectAttending = (attending: boolean) => {
  form.attending = attending
  submitSuccess.value = false
}

const pickSuccessMessage = (attending: boolean) => getRandomRsvpResponse(attending)

watch(guestName, (name) => {
  if (name && !form.name) form.name = name
}, { immediate: true })

const formatDate = (ts: string) => {
  try {
    return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '' }
}

const fetchEntries = async () => {
  try {
    const res = await fetch('/api/rsvp')
    if (res.ok) entries.value = await res.json()
  } catch {}
}

const handleSubmit = async () => {
  if (form.attending === null) return
  isSubmitting.value = true
  try {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      const attending = form.attending!
      successMessage.value = pickSuccessMessage(attending)
      submitSuccess.value = true
      showToast(successMessage.value, 4000)
      form.name = ''
      form.attending = true
      form.message = ''
      await fetchEntries()
    }
  } catch {}
  isSubmitting.value = false
}

onMounted(async () => {
  await fetchEntries()
  if (!process.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const scene = document.getElementById('rsvp-scene')!
  ;[titleRef.value, formRef.value, messagesRef.value].filter(Boolean).forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.1,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scene,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  })
})
</script>

<style scoped>
.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(201,168,76,0.12);
  border: 1px solid rgba(201,168,76,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  color: var(--color-gold);
  flex-shrink: 0;
}
.message-card {
  transition: border-color 0.3s ease;
}
.message-card:hover {
  border-color: rgba(201,168,76,0.3);
}
.attendance-badge {
  display: inline-flex;
  align-items: center;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.attendance-badge--yes {
  color: #8FAF8A;
  background: rgba(143, 175, 138, 0.12);
  border-color: rgba(143, 175, 138, 0.35);
}
.attendance-badge--no {
  color: rgba(245, 238, 215, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(245, 238, 215, 0.15);
}
</style>
