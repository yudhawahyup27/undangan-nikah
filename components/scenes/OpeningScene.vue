<template>
  <section id="opening-scene" class="scene relative" style="height: 100vh; overflow: hidden;">
    <!-- Three.js Star Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" style="z-index:1" />

    <!-- Radial vignette -->
    <div class="absolute inset-0" style="z-index:2; background: radial-gradient(ellipse at center, transparent 30%, rgba(8,12,24,0.8) 100%)" />

    <!-- Bottom fog -->
    <div class="absolute bottom-0 left-0 right-0 h-64" style="z-index:2; background: linear-gradient(to top, rgba(8,12,24,1), transparent)" />

    <!-- Content -->
    <div ref="contentRef" class="relative text-center px-8" style="z-index:3; opacity:0">
      <!-- Guest name -->
      <p v-if="guestName" class="guest-name font-josefin text-xs tracking-[0.4em] text-gold/70 uppercase mb-10">
        Kepada Yth. {{ guestName }}
      </p>

      <!-- Ornament top -->
      <div class="flex items-center justify-center gap-4 mb-8">
        <div class="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <span class="text-gold/60 text-xs">✦</span>
        <div class="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </div>

      <p class="font-josefin text-xs tracking-[0.5em] text-cream/50 uppercase mb-6">The Wedding Of</p>

      <h1 class="opening-title font-cormorant font-light text-cream leading-none mb-4">
        <span class="block" style="font-size:clamp(2.8rem,7vw,6rem)">Nur Kotimah</span>
        <span class="block text-gold/60 font-light" style="font-size:clamp(1rem,2vw,1.5rem); letter-spacing:0.5em; margin: 0.6rem 0">&amp;</span>
        <span class="block" style="font-size:clamp(2.8rem,7vw,6rem)">Yudha Wahyu Pratama</span>
      </h1>

      <!-- Date preview -->
      <div class="flex items-center justify-center gap-4 mt-8 mb-12">
        <div class="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
        <span class="font-josefin text-xs tracking-[0.35em] text-gold/60">29 . 11 . 2026</span>
        <div class="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
      </div>

      <!-- CTA Button -->
      <button
        ref="btnRef"
        class="btn-primary open-btn"
        @click="handleOpen"
        style="opacity:0; transform:translateY(20px)"
      >
        Buka Undangan
      </button>
    </div>

    <!-- Floating particles -->
    <div class="particle-field absolute inset-0" style="z-index:2; pointer-events:none">
      <span v-for="i in 12" :key="i" class="particle" :style="particleStyle(i)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStarField } from '~/composables/useThree'

const emit = defineEmits(['open'])
const { guestName } = useGuest()

const handleOpen = () => {
  emit('open')
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)

const particleStyle = (i: number) => ({
  position: 'absolute' as const,
  left: `${(i * 8.3) % 100}%`,
  top: `${(i * 13.7 + 20) % 80}%`,
  width: `${Math.random() * 3 + 1}px`,
  height: `${Math.random() * 3 + 1}px`,
  borderRadius: '50%',
  background: i % 3 === 0 ? 'rgba(201,168,76,0.6)' : 'rgba(245,238,215,0.3)',
  animation: `twinkle ${3 + (i % 4)}s ease-in-out infinite`,
  animationDelay: `${(i * 0.4) % 3}s`
})

const { init, zoomIn } = useStarField()

onMounted(async () => {
  if (!canvasRef.value) return

  await init(canvasRef.value)

  // Animate stars zooming in
  zoomIn(2500)

  // Fade in content after zoom starts
  await new Promise(r => setTimeout(r, 600))

  const { gsap } = await import('gsap')

  if (contentRef.value) {
    gsap.to(contentRef.value, {
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out'
    })
  }

  if (btnRef.value) {
    gsap.to(btnRef.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.8,
      ease: 'power4.out'
    })
  }
})
</script>

<style scoped>
.opening-title {
  text-shadow: 0 0 80px rgba(201,168,76,0.15);
}

.particle {
  position: absolute;
}

.open-btn {
  font-family: 'Josefin Sans', sans-serif !important;
}
</style>
