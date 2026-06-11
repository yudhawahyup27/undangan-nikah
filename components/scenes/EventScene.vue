<template>
  <section id="event-scene" class="scene relative py-32 px-8" style="min-height:100vh; overflow:hidden">
    <!-- Background rings -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none" style="z-index:0">
      <div class="ring" style="width:500px;height:500px;animation-delay:0s"/>
      <div class="ring" style="width:700px;height:700px;animation-delay:1.2s; position:absolute"/>
      <div class="ring" style="width:900px;height:900px;animation-delay:2.4s; position:absolute"/>
    </div>

    <!-- Title -->
    <div ref="titleRef" class="text-center mb-20 relative" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Save The Date</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2.2rem,5vw,4rem)">
        Detail <em class="text-gold/80">Acara</em>
      </h2>
      <div class="section-divider mt-6" />
    </div>

    <!-- Events grid -->
    <div ref="eventsRef" class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative" style="z-index:2">
      <!-- Akad Nikah -->
      <div class="event-card glass-card p-10 text-center">
        <div class="event-icon mb-6">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="mx-auto">
            <circle cx="24" cy="24" r="23" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
            <path d="M24 12 L24 24 L32 28" stroke="var(--color-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="24" cy="24" r="3" fill="var(--color-gold)" fill-opacity="0.6"/>
          </svg>
        </div>
        <p class="font-josefin text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">Akad Nikah</p>
        <h3 class="font-cormorant text-cream mb-2" style="font-size:1.6rem">Minggu, 29 November 2026</h3>
        <p class="font-josefin text-sm text-gold/70 tracking-widest mb-6">07.00</p>
        <div class="border-t border-gold/15 pt-6">
          <p class="font-josefin text-xs text-cream/40 tracking-wider mb-1">Semampir GG Tembus RT 13 RW 02</p>
          <p class="font-josefin text-xs text-cream/40 tracking-wider mb-1">Kediri</p>
          <p class="font-josefin text-xs text-cream/30 tracking-wider mb-4">Jawa Timur</p>
          <a
            :href="venue.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block font-josefin text-xs tracking-[0.25em] text-gold/50 uppercase hover:text-gold transition-colors"
          >📍 Buka Google Maps →</a>
        </div>
      </div>

      <!-- Resepsi -->
      <div class="event-card glass-card p-10 text-center">
        <div class="event-icon mb-6">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="mx-auto">
            <circle cx="24" cy="24" r="23" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
            <path d="M16 20 Q24 12 32 20 Q36 26 28 30 L24 36 L20 30 Q12 26 16 20Z" stroke="var(--color-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="rgba(201,168,76,0.1)"/>
          </svg>
        </div>
        <p class="font-josefin text-xs tracking-[0.4em] text-gold/60 uppercase mb-3">Resepsi</p>
        <h3 class="font-cormorant text-cream mb-2" style="font-size:1.6rem">Minggu, 29 November 2026</h3>
        <p class="font-josefin text-sm text-gold/70 tracking-widest mb-6">09.00 – Selesai</p>
        <div class="border-t border-gold/15 pt-6">
          <p class="font-josefin text-xs text-cream/40 tracking-wider mb-1">Semampir GG Tembus RT 13 RW 02</p>
          <p class="font-josefin text-xs text-cream/40 tracking-wider mb-1">Kediri</p>
          <p class="font-josefin text-xs text-cream/30 tracking-wider mb-4">Jawa Timur</p>
          <a
            :href="venue.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block font-josefin text-xs tracking-[0.25em] text-gold/50 uppercase hover:text-gold transition-colors"
          >📍 Buka Google Maps →</a>
        </div>
      </div>
    </div>

    <!-- Countdown -->
    <div ref="countdownRef" class="max-w-2xl mx-auto mt-16 text-center relative" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.35em] text-gold/50 uppercase mb-8">Menghitung Hari</p>
      <div class="flex justify-center gap-6 md:gap-10">
        <div v-for="unit in countdown" :key="unit.label" class="countdown-unit">
          <div class="font-cormorant text-cream" style="font-size:clamp(2rem,5vw,3.5rem); line-height:1">{{ unit.value }}</div>
          <div class="font-josefin text-xs tracking-[0.3em] text-gold/50 uppercase mt-2">{{ unit.label }}</div>
        </div>
      </div>
    </div>

    <!-- Tambah ke Kalender -->
    <div ref="calendarRef" class="max-w-3xl mx-auto mt-16 relative w-full" style="z-index:2">
      <div class="glass-card p-8 md:p-10 text-center">
        <p class="font-josefin text-xs tracking-[0.4em] text-gold/50 uppercase mb-3">Save The Date</p>
        <h3 class="font-cormorant text-cream mb-2" style="font-size:clamp(1.4rem,3vw,1.8rem)">
          Tambah ke <em class="text-gold/80">Kalender</em>
        </h3>
        <p class="font-josefin text-xs text-cream/40 tracking-wider mb-8 max-w-md mx-auto">
          Minggu, 29 November 2026 · Akad 07.00 · Resepsi 09.00
        </p>

        <div class="calendar-actions">
          <a
            :href="googleCalendarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="calendar-btn"
          >
            <span class="calendar-btn-icon" aria-hidden="true">G</span>
            <span>Google Calendar</span>
          </a>

          <button type="button" class="calendar-btn" @click="downloadAppleCalendar">
            <span class="calendar-btn-icon" aria-hidden="true"></span>
            <span>Apple Calendar</span>
          </button>

          <a
            :href="outlookCalendarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="calendar-btn"
          >
            <span class="calendar-btn-icon" aria-hidden="true">O</span>
            <span>Outlook</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Lokasi Interaktif -->
    <div ref="mapRef" class="max-w-4xl mx-auto mt-20 relative" style="z-index:2">
      <div class="text-center mb-10">
        <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Lokasi Interaktif</p>
        <h3 class="font-cormorant font-light text-cream mb-3" style="font-size:clamp(1.6rem,3vw,2.2rem)">
          Google <em class="text-gold/80">Maps</em>
        </h3>
        <p class="font-josefin text-xs text-cream/40 tracking-wider max-w-md mx-auto">
          Geser dan zoom peta untuk melihat lokasi acara. Gunakan tombol di bawah untuk navigasi langsung.
        </p>
        <div class="section-divider mt-6" />
      </div>

      <div class="glass-card overflow-hidden map-card" style="border-radius:12px">
        <div class="map-frame">
          <iframe
            :src="mapEmbedUrl"
            title="Google Maps — Semampir GG Tembus, Kediri"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>

        <div class="p-6 md:p-8 text-center border-t border-gold/10">
          <p class="font-cormorant text-cream/70 mb-1" style="font-size:1.1rem">{{ venue.name }}</p>
          <p class="font-josefin text-xs text-cream/40 tracking-wider mb-6">{{ venue.address }}</p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              :href="navigationUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L4 20h16L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
              </svg>
              Navigasi Langsung
            </a>
            <a
              :href="venue.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="map-link-btn inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              Buka Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const titleRef = ref<HTMLElement | null>(null)
const eventsRef = ref<HTMLElement | null>(null)
const countdownRef = ref<HTMLElement | null>(null)
const calendarRef = ref<HTMLElement | null>(null)
const mapRef = ref<HTMLElement | null>(null)

const { googleCalendarUrl, outlookCalendarUrl, downloadAppleCalendar } = useWeddingCalendar()

const venue = {
  name: 'Semampir GG Tembus',
  address: 'Semampir GG Tembus RT 13 RW 02, Kediri, Jawa Timur',
  mapsUrl: 'https://maps.app.goo.gl/JGYgN3Hu8AXVu32c7',
}

const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venue.address)}&hl=id&z=17&output=embed`
const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.address)}&travelmode=driving`

const weddingDate = new Date('2026-11-29T07:00:00')

const countdown = reactive([
  { label: 'Hari', value: '00' },
  { label: 'Jam', value: '00' },
  { label: 'Menit', value: '00' },
  { label: 'Detik', value: '00' },
])

let timer: ReturnType<typeof setInterval>

const updateCountdown = () => {
  const now = new Date()
  const diff = weddingDate.getTime() - now.getTime()
  if (diff <= 0) {
    countdown[0].value = '00'
    countdown[1].value = '00'
    countdown[2].value = '00'
    countdown[3].value = '00'
    return
  }
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  countdown[0].value = String(d).padStart(2, '0')
  countdown[1].value = String(h).padStart(2, '0')
  countdown[2].value = String(m).padStart(2, '0')
  countdown[3].value = String(s).padStart(2, '0')
}

onMounted(async () => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)

  if (!process.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const animTargets = [titleRef.value, eventsRef.value, countdownRef.value, calendarRef.value, mapRef.value].filter(Boolean)
  animTargets.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 70 },
      {
        opacity: 1, y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el as Element,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  // Event cards stagger
  const cards = document.querySelectorAll('.event-card')
  gsap.fromTo(cards,
    { opacity: 0, y: 50, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: eventsRef.value,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  )
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.ring {
  border-radius: 50%;
  border: 1px solid rgba(201,168,76,0.06);
  position: absolute;
  animation: pulse-ring 4s ease-in-out infinite;
}
@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.03); opacity: 0.7; }
}
.countdown-unit {
  text-align: center;
  min-width: 60px;
}
.event-icon {
  color: var(--color-gold);
}
.map-frame {
  position: relative;
  padding-top: 56%;
  background: #0A1020;
}
.map-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.map-link-btn {
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.35);
  color: rgba(201, 168, 76, 0.8);
  padding: 14px 32px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
}
.map-link-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  background: rgba(201, 168, 76, 0.08);
}

.calendar-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .calendar-actions {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.calendar-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 52px;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.28);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-cream);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar-btn:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
  background: rgba(201, 168, 76, 0.08);
  transform: translateY(-1px);
}

.calendar-btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(201, 168, 76, 0.35);
  font-size: 0.72rem;
  line-height: 1;
}
</style>
