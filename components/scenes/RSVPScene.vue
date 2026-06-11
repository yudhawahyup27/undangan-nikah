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
                @click="form.attending = true"
              >
                ✓ &nbsp; Hadir
              </button>
              <button
                type="button"
                class="radio-option flex-1 text-center"
                :class="{ selected: form.attending === false }"
                @click="form.attending = false"
              >
                ✗ &nbsp; Tidak Hadir
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
            <p class="font-cormorant text-gold/80 italic" style="font-size:1rem">
              Terima kasih! Konfirmasi Anda telah diterima. 💛
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
            v-for="msg in messages"
            :key="msg.id"
            class="message-card glass-card p-6"
          >
            <div class="flex items-start gap-4">
              <div class="avatar flex-shrink-0">
                {{ msg.name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-josefin text-xs tracking-[0.2em] text-gold/70 uppercase mb-2">{{ msg.name }}</p>
                <p class="font-cormorant text-cream/70" style="font-size:1rem; line-height:1.7">{{ msg.message }}</p>
                <p class="font-josefin text-xs text-cream/25 mt-2">{{ formatDate(msg.timestamp) }}</p>
              </div>
            </div>
          </div>

          <div v-if="messages.length === 0" class="text-center py-8">
            <p class="font-cormorant text-cream/30 italic">Belum ada ucapan. Jadilah yang pertama!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

const titleRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const messagesRef = ref<HTMLElement | null>(null)

const form = reactive({ name: '', attending: true as boolean | null, message: '' })
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const messages = ref<any[]>([])
const { guestName } = useGuest()

watch(guestName, (name) => {
  if (name && !form.name) form.name = name
}, { immediate: true })

const formatDate = (ts: string) => {
  try {
    return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '' }
}

const fetchMessages = async () => {
  try {
    const res = await fetch('/api/messages')
    if (res.ok) messages.value = await res.json()
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
      submitSuccess.value = true
      form.name = ''
      form.attending = true
      form.message = ''
      await fetchMessages()
    }
  } catch {}
  isSubmitting.value = false
}

onMounted(async () => {
  await fetchMessages()
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
</style>
