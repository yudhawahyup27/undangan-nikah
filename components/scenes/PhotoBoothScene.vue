<template>
  <section id="photo-booth" class="scene photo-booth-scene relative py-32 px-6 md:px-8">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(circle at 50% 30%, rgba(201,168,76,0.08), transparent 45%);" />
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="floral-orb floral-orb-left" />
      <div class="floral-orb floral-orb-right" />
    </div>

    <div class="max-w-6xl mx-auto grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] relative z-10">
      <!-- Attending: Premium Photo Booth -->
      <template v-if="photoBoothState.isAttending">
        <div class="text-center lg:text-left">
          <p class="font-josefin text-xs tracking-[0.45em] text-gold/60 uppercase mb-5">Y &amp; I</p>
          <h2 class="font-cormorant font-light text-cream mb-5" style="font-size:clamp(2.3rem,5vw,4rem)">
            <span class="block text-gold/80" style="letter-spacing:0.12em">PHOTO BOOTH</span>
          </h2>
          <p class="font-cormorant text-cream/90 mb-4" style="font-size:clamp(1.5rem,2.8vw,2.3rem); line-height:1.1">
            Siap mengabadikan momen?
          </p>
          <p class="font-josefin text-sm md:text-base text-cream/60 tracking-[0.08em] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Abadikan momen spesialmu bersama kami.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              @click="openPhotoBooth"
              :disabled="generatingToken"
              aria-label="Buka Photo Booth"
              class="btn-primary inline-flex items-center justify-center gap-3 w-full sm:w-auto disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 3h6l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5L9 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              {{ generatingToken ? 'Mempersiapkan...' : 'ABADIKAN MOMEN' }}
            </button>
          </div>

          <div class="mt-6 rounded border border-gold/20 bg-gold/5 px-4 py-3 max-w-xl mx-auto lg:mx-0">
            <p class="font-cormorant text-cream/80 italic" style="font-size:0.95rem; line-height:1.6">
              Terima kasih, sampai bertemu di hari bahagia kami.
            </p>
          </div>

          <div class="mt-8 inline-flex items-center gap-4 justify-center lg:justify-start text-left text-cream/55">
            <div class="qr-card shadow-[0_0_0_1px_rgba(201,168,76,0.2)]">
              <img
                :src="getQrCodeUrl(boothUrlWithToken)"
                :alt="'QR code untuk membuka Photo Booth'"
                class="qr-image"
                loading="lazy"
              />
            </div>
            <p class="font-josefin text-[0.62rem] uppercase tracking-[0.24em] leading-relaxed max-w-[9rem]">
              Scan untuk membuka Photo Booth
            </p>
          </div>
        </div>
      </template>

      <!-- Not Attending: Remote Memory Booth -->
      <template v-else-if="photoBoothState.isNotAttending">
        <div class="text-center lg:text-left">
          <p class="font-josefin text-xs tracking-[0.45em] text-gold/60 uppercase mb-5">Y &amp; I</p>
          <h2 class="font-cormorant font-light text-cream mb-5" style="font-size:clamp(2.3rem,5vw,4rem)">
            <span class="block text-gold/80" style="letter-spacing:0.12em">MEMORY BOOTH</span>
          </h2>
          <p class="font-cormorant text-cream/90 mb-4" style="font-size:clamp(1.5rem,2.8vw,2.3rem); line-height:1.1">
            Belum bisa hadir secara langsung?
          </p>
          <p class="font-josefin text-sm md:text-base text-cream/60 tracking-[0.08em] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Kamu tetap bisa meninggalkan kenangan untuk Yudha &amp; Ima.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              @click="openPhotoBooth"
              :disabled="generatingToken"
              aria-label="Buka Memory Booth"
              class="btn-primary inline-flex items-center justify-center gap-3 w-full sm:w-auto disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 3h6l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5L9 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              {{ generatingToken ? 'Mempersiapkan...' : 'KIRIM KENANGAN' }}
            </button>
          </div>

          <div class="mt-6 rounded border border-gold/20 bg-gold/5 px-4 py-3 max-w-xl mx-auto lg:mx-0">
            <p class="font-cormorant text-cream/80 italic" style="font-size:0.95rem; line-height:1.6">
              Terima kasih sudah mengabari kami.
            </p>
          </div>

          <div class="mt-8 inline-flex items-center gap-4 justify-center lg:justify-start text-left text-cream/55">
            <div class="qr-card shadow-[0_0_0_1px_rgba(201,168,76,0.2)]">
              <img
                :src="getQrCodeUrl(boothUrlWithToken)"
                :alt="'QR code untuk membuka Memory Booth'"
                class="qr-image"
                loading="lazy"
              />
            </div>
            <p class="font-josefin text-[0.62rem] uppercase tracking-[0.24em] leading-relaxed max-w-[9rem]">
              Scan untuk membuka Memory Booth
            </p>
          </div>
        </div>
      </template>

      <!-- Unconfirmed: RSVP First -->
      <template v-else>
        <div class="text-center lg:text-left">
          <p class="font-josefin text-xs tracking-[0.45em] text-gold/60 uppercase mb-5">Y &amp; I</p>
          <h2 class="font-cormorant font-light text-cream mb-5" style="font-size:clamp(2.3rem,5vw,4rem)">
            <span class="block text-gold/80" style="letter-spacing:0.12em">PHOTO BOOTH</span>
          </h2>
          <p class="font-cormorant text-cream/90 mb-4" style="font-size:clamp(1.5rem,2.8vw,2.3rem); line-height:1.1">
            Konfirmasi kehadiranmu terlebih dahulu.
          </p>
          <p class="font-josefin text-sm md:text-base text-cream/60 tracking-[0.08em] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Kami butuh mengetahui apakah Anda akan hadir sebelum mengakses Photo Booth.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#rsvp-scene"
              @click.prevent="scrollToRsvp"
              aria-label="Konfirmasi kehadiran"
              class="btn-primary inline-flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
              </svg>
              KONFIRMASI KEHADIRAN
            </a>
          </div>

          <div class="mt-8 inline-flex items-center gap-4 justify-center lg:justify-start text-left text-cream/55">
            <div class="qr-card shadow-[0_0_0_1px_rgba(201,168,76,0.2)]">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Crect width='180' height='180' fill='%23232F3E'/%3E%3C/svg%3E"
                alt="QR code akan tersedia setelah konfirmasi"
                class="qr-image"
              />
            </div>
            <p class="font-josefin text-[0.62rem] uppercase tracking-[0.24em] leading-relaxed max-w-[9rem]">
              QR code tersedia setelah konfirmasi
            </p>
          </div>
        </div>
      </template>

      <!-- Preview -->
      <div class="relative mx-auto w-full max-w-md">
        <div class="booth-preview glass-card p-5 md:p-6">
          <div class="booth-window">
            <div class="booth-monogram">Y &amp; I</div>
            <div class="booth-frame">
              <div class="booth-frame-inner">
                <div class="booth-photo booth-photo-main" aria-hidden="true">
                  <div class="booth-photo-overlay" />
                </div>
              </div>
            </div>
            <div class="booth-strip">
              <div class="strip-card strip-card-left">
                <div class="strip-photo strip-photo-one" aria-hidden="true" />
              </div>
              <div class="strip-card strip-card-right">
                <div class="strip-photo strip-photo-two" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <button
      v-if="!photoBoothState.isUnconfirmed && boothUrlWithToken"
      @click="openPhotoBooth"
      :disabled="generatingToken"
      aria-label="Buka Photo Booth"
      class="photo-booth-fab inline-flex items-center gap-2 disabled:opacity-50"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3h6l1.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5L9 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      {{ photoBoothState.isAttending ? 'Photo Booth' : 'Memory Booth' }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { usePhotoBoothState } from '~/composables/usePhotoBoothState'

const photoBoothState = usePhotoBoothState()
const generatingToken = ref(false)
const boothUrlWithToken = ref<string | null>(null)

const getQrCodeUrl = (url: string) => {
  if (!url) return ''
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`
}

const openPhotoBooth = async () => {
  if (generatingToken.value || !photoBoothState.state.value) return

  generatingToken.value = true
  try {
    const token = await photoBoothState.generateBoothToken()
    if (token) {
      boothUrlWithToken.value = photoBoothState.getBoothUrl()
      window.open(boothUrlWithToken.value, '_blank')
    }
  } finally {
    generatingToken.value = false
  }
}

const scrollToRsvp = () => {
  const rsvpSection = document.getElementById('rsvp-scene')
  if (rsvpSection) {
    rsvpSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Generate token when attending state is confirmed
watch(() => photoBoothState.isAttending || photoBoothState.isNotAttending, async (isConfirmed) => {
  if (isConfirmed && photoBoothState.state.value && !boothUrlWithToken.value) {
    const token = await photoBoothState.generateBoothToken()
    if (token) {
      boothUrlWithToken.value = photoBoothState.getBoothUrl()
    }
  }
})

onMounted(async () => {
  // Generate token immediately if already attending/not attending
  if ((photoBoothState.isAttending.value || photoBoothState.isNotAttending.value) && photoBoothState.state.value) {
    const token = await photoBoothState.generateBoothToken()
    if (token) {
      boothUrlWithToken.value = photoBoothState.getBoothUrl()
    }
  }
})
</script>

<style scoped>
.photo-booth-scene {
  min-height: auto;
  overflow: hidden;
}

.floral-orb {
  position: absolute;
  width: 22rem;
  height: 22rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.1), rgba(201,168,76,0.02) 30%, transparent 70%);
  filter: blur(12px);
}

.floral-orb-left {
  left: -8rem;
  top: 4rem;
}

.floral-orb-right {
  right: -6rem;
  bottom: 2rem;
}

.booth-preview {
  position: relative;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.18);
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(8, 12, 24, 0.38);
}

.booth-window {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 20px;
  padding: 1.1rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border: 1px solid rgba(201, 168, 76, 0.12);
}

.booth-monogram {
  position: absolute;
  left: 50%;
  top: 1.05rem;
  transform: translateX(-50%);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: rgba(201, 168, 76, 0.7);
}

.booth-frame {
  position: absolute;
  inset: 3.15rem 1.25rem 1.25rem;
  border-radius: 20px;
  border: 1px solid rgba(201, 168, 76, 0.18);
  background: rgba(201, 168, 76, 0.04);
  padding: 0.75rem;
}

.booth-frame-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(160deg, rgba(201,168,76,0.12), rgba(255,255,255,0.02));
}

.booth-photo {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10,15,30,0.12), rgba(10,15,30,0.28)),
    url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80') center/cover no-repeat;
  filter: saturate(0.8) contrast(1.05);
}

.booth-photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.14), transparent 54%, rgba(255, 183, 197, 0.1));
}

.booth-strip {
  position: absolute;
  left: 50%;
  bottom: 1.1rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.7rem;
  width: calc(100% - 2.4rem);
}

.strip-card {
  flex: 1;
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.14);
  background: rgba(255, 255, 255, 0.02);
  padding: 0.4rem;
  box-shadow: 0 12px 22px rgba(8, 12, 24, 0.2);
}

.strip-photo {
  width: 100%;
  aspect-ratio: 1 / 1.15;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.strip-photo-one {
  background-image: linear-gradient(180deg, rgba(10,15,30,0.12), rgba(10,15,30,0.28)), url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80');
}

.strip-photo-two {
  background-image: linear-gradient(180deg, rgba(10,15,30,0.12), rgba(10,15,30,0.28)), url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80');
}

.qr-card {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.45rem;
  border: 1px solid rgba(201, 168, 76, 0.2);
}

.qr-image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 8px;
  background: white;
}

.photo-booth-fab {
  position: fixed;
  left: 1rem;
  bottom: 5.25rem;
  z-index: 1000;
  min-height: 46px;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(201, 168, 76, 0.3);
  background: rgba(10, 15, 30, 0.72);
  color: var(--color-gold);
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 14px 30px rgba(8, 12, 24, 0.2);
}

.photo-booth-fab:hover {
  transform: translateY(-1px);
  border-color: var(--color-gold);
  background: rgba(201, 168, 76, 0.1);
}

@media (max-width: 640px) {
  .photo-booth-fab {
    bottom: 5.75rem;
    left: 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
  }
}
</style>
