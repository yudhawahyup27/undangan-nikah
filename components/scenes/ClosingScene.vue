<template>
  <section id="closing-scene" class="scene relative" style="min-height:100vh; overflow:hidden">
    <!-- Background canvas for star zoom-out -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" style="z-index:1"/>

    <!-- Vignette -->
    <div class="absolute inset-0" style="z-index:2; background:radial-gradient(ellipse at center, transparent 20%, rgba(8,12,24,0.85) 100%)"/>
    <div class="absolute top-0 left-0 right-0 h-64" style="z-index:2; background:linear-gradient(to bottom, rgba(8,12,24,1), transparent)"/>

    <!-- Content -->
    <div ref="contentRef" class="relative text-center px-8 max-w-2xl mx-auto" style="z-index:3; opacity:0">
      <!-- Top ornament -->
      <div class="flex items-center justify-center gap-4 mb-10">
        <div class="w-20 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <span class="text-gold/50">✦</span>
        <div class="w-20 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      <!-- Quote -->
      <p class="font-cormorant italic text-cream/60 mb-10" style="font-size:clamp(1.1rem,2.5vw,1.4rem); line-height:1.9">
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan<br/>
        untukmu istri-istri dari jenismu sendiri supaya kamu merasa<br/>
        nyaman kepadanya, dan dijadikan-Nya di antaramu rasa kasih<br/>
        dan sayang."
      </p>

      <p class="font-josefin text-xs tracking-[0.4em] text-gold/50 uppercase mb-16">
        QS. Ar-Rum : 21
      </p>

      <!-- Names final -->
      <h2 class="font-cormorant font-light text-cream mb-3" style="font-size:clamp(2rem,5vw,3.5rem); line-height:1.2">
        Nur Kotimah
      </h2>
      <p class="font-cormorant text-gold/60 mb-3" style="font-size:1.5rem">&amp;</p>
      <h2 class="font-cormorant font-light text-cream mb-12" style="font-size:clamp(2rem,5vw,3.5rem); line-height:1.2">
        Yudha Wahyu Pratama
      </h2>

      <!-- Date -->
      <div class="inline-flex items-center gap-4 mb-12">
        <div class="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <span class="font-josefin text-sm tracking-[0.4em] text-gold/60">29 . 11 . 2026</span>
        <div class="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>

      <!-- Closing words -->
      <p class="font-cormorant text-cream/40" style="font-size:1rem; line-height:1.8">
        Merupakan kehormatan dan kebahagiaan bagi kami<br/>
        atas kehadiran dan doa restu Anda.
      </p>

      <!-- Bottom ornament -->
      <div class="flex items-center justify-center gap-4 mt-12">
        <div class="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
        <span class="text-gold/30 text-xs">✦</span>
        <div class="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
      </div>

      <!-- Footer credit -->
      <p class="font-josefin text-xs tracking-[0.25em] text-cream/15 uppercase mt-16">
        Made with love · 2026
      </p>
    </div>

    <!-- Floating petals -->
    <div class="absolute inset-0 pointer-events-none" style="z-index:4">
      <span v-for="i in 8" :key="i" class="falling-petal" :style="petalStyle(i)">🌸</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStarField } from '~/composables/useThree'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const { init } = useStarField()

const petalStyle = (i: number) => ({
  position: 'absolute' as const,
  left: `${(i * 12 + 5) % 100}%`,
  top: '-20px',
  fontSize: `${9 + (i % 3) * 3}px`,
  opacity: String(0.25 + (i % 3) * 0.1),
  animation: `petalFall ${7 + (i % 5)}s linear infinite`,
  animationDelay: `${(i * 1.3) % 6}s`,
  filter: 'hue-rotate(280deg) saturate(0.5) brightness(0.85)'
})

onMounted(async () => {
  if (!canvasRef.value) return

  await init(canvasRef.value)

  if (!process.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const scene = document.getElementById('closing-scene')!

  if (contentRef.value) {
    gsap.to(contentRef.value, {
      opacity: 1,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: scene,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    })
  }

  // Stagger children
  if (contentRef.value) {
    const children = Array.from(contentRef.value.children)
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scene,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
})
</script>

<style scoped>
.falling-petal {
  position: absolute;
}
</style>
