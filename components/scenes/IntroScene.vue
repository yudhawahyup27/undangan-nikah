<template>
  <section id="intro-scene" class="scene relative" style="min-height: 100vh; overflow: hidden;">
    <!-- Gradient sky background -->
    <div class="absolute inset-0" style="
      background: radial-gradient(ellipse at 30% 20%, rgba(255,183,197,0.08) 0%, transparent 55%),
                  radial-gradient(ellipse at 70% 80%, rgba(201,168,76,0.07) 0%, transparent 50%),
                  linear-gradient(to bottom, #0A0F1E 0%, #080C18 100%);
    " />

    <!-- Moon glow -->
    <div ref="moonRef" class="absolute" style="top:10%; left:50%; transform:translateX(-50%); z-index:1">
      <div class="moon" />
    </div>

    <!-- Far mountains / hills -->
    <div ref="bgLayerRef" class="parallax-layer" style="z-index:2; bottom:0; top:auto; height:70%">
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax meet" class="w-full h-full" style="position:absolute;bottom:0">
        <defs>
          <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0D1830" />
            <stop offset="100%" stop-color="#080C18" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0A1428" />
            <stop offset="100%" stop-color="#080C18" />
          </linearGradient>
        </defs>
        <!-- Far hills -->
        <path d="M0,400 Q200,200 400,280 Q600,360 800,200 Q1000,40 1200,180 Q1350,260 1440,200 L1440,600 L0,600 Z" fill="url(#hill1)" opacity="0.6"/>
        <!-- Mid hills -->
        <path d="M0,480 Q180,340 360,400 Q540,460 720,340 Q900,220 1080,360 Q1260,460 1440,380 L1440,600 L0,600 Z" fill="url(#hill2)" opacity="0.9"/>
      </svg>
    </div>

    <!-- Sakura tree silhouettes -->
    <div ref="midLayerRef" class="parallax-layer" style="z-index:3; bottom:0; top:auto; height:80%">
      <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax meet" class="w-full h-full" style="position:absolute;bottom:0">
        <!-- Left tree -->
        <g opacity="0.85">
          <path d="M120,700 L140,350" stroke="#0A0A14" stroke-width="8" stroke-linecap="round"/>
          <path d="M140,350 L100,200" stroke="#0A0A14" stroke-width="5"/>
          <path d="M140,380 L180,240" stroke="#0A0A14" stroke-width="4"/>
          <ellipse cx="100" cy="190" rx="60" ry="50" fill="rgba(255,183,197,0.18)"/>
          <ellipse cx="175" cy="230" rx="50" ry="40" fill="rgba(255,183,197,0.14)"/>
          <ellipse cx="140" cy="340" rx="70" ry="45" fill="rgba(255,183,197,0.1)"/>
        </g>
        <!-- Right tree -->
        <g opacity="0.85">
          <path d="M1320,700 L1300,380" stroke="#0A0A14" stroke-width="8" stroke-linecap="round"/>
          <path d="M1300,380 L1340,230" stroke="#0A0A14" stroke-width="5"/>
          <path d="M1300,410 L1260,270" stroke="#0A0A14" stroke-width="4"/>
          <ellipse cx="1340" cy="220" rx="65" ry="55" fill="rgba(255,183,197,0.18)"/>
          <ellipse cx="1265" cy="260" rx="55" ry="40" fill="rgba(255,183,197,0.14)"/>
          <ellipse cx="1300" cy="375" rx="75" ry="50" fill="rgba(255,183,197,0.1)"/>
        </g>
      </svg>
    </div>

    <!-- Ground / path -->
    <div ref="fgLayerRef" class="parallax-layer" style="z-index:4; bottom:0; top:auto; height:40%">
      <svg viewBox="0 0 1440 350" preserveAspectRatio="xMidYMax meet" class="w-full h-full" style="position:absolute;bottom:0">
        <defs>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0C1020" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#080C18"/>
          </linearGradient>
        </defs>
        <path d="M0,200 Q360,100 720,160 Q1080,220 1440,140 L1440,350 L0,350 Z" fill="url(#ground)"/>
        <!-- Stone path -->
        <ellipse cx="720" cy="310" rx="200" ry="25" fill="rgba(201,168,76,0.05)"/>
        <ellipse cx="720" cy="295" rx="120" ry="15" fill="rgba(201,168,76,0.04)"/>
      </svg>
    </div>

    <!-- Floating petals -->
    <div class="absolute inset-0" style="z-index:5; pointer-events:none; overflow:hidden">
      <span v-for="p in petals" :key="p.id" class="falling-petal" :style="p.style">🌸</span>
    </div>

    <!-- Main content -->
    <div ref="contentRef" class="relative text-center px-8 py-20" style="z-index:6">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-6 intro-subtitle">Bismillahirrahmanirrahim</p>

      <div class="section-divider mb-8 intro-line" style="width:40px"/>

      <h2 ref="titleRef" class="font-cormorant font-light text-cream mb-8 intro-title" style="font-size:clamp(2rem,5vw,4rem); line-height:1.15">
        Dengan penuh syukur<br/>
        <em class="text-gold/80">dan kebahagiaan</em>
      </h2>

      <p ref="bodyRef" class="font-cormorant text-cream/65 max-w-lg mx-auto intro-body" style="font-size:clamp(1rem,2vw,1.2rem); line-height:1.9">
        Kami mengundang Anda untuk turut hadir menyaksikan
        dan mendoakan pernikahan kami dalam ikatan suci yang penuh kasih.
      </p>

      <!-- Mempelai -->
      <div ref="coupleRef" class="max-w-2xl mx-auto mt-14 intro-couple">
        <div class="grid md:grid-cols-2 gap-8 md:gap-10">
          <div class="couple-card glass-card p-8 text-center">
            <p class="font-josefin text-xs tracking-[0.35em] text-gold/50 uppercase mb-4">Mempelai Wanita</p>
            <h3 class="font-cormorant text-cream mb-4" style="font-size:clamp(1.6rem,3vw,2rem)">Nur Kotimah</h3>
            <p class="font-cormorant text-cream/55" style="font-size:clamp(0.95rem,1.8vw,1.05rem); line-height:1.8">
              Putri dari Bapak Wakiran (Alm)<br/>
              dan Ibu Gemi (Almh)
            </p>
          </div>

          <div class="couple-card glass-card p-8 text-center">
            <p class="font-josefin text-xs tracking-[0.35em] text-gold/50 uppercase mb-4">Mempelai Pria</p>
            <h3 class="font-cormorant text-cream mb-4" style="font-size:clamp(1.6rem,3vw,2rem)">Yudha Wahyu Pratama</h3>
            <p class="font-cormorant text-cream/55" style="font-size:clamp(0.95rem,1.8vw,1.05rem); line-height:1.8">
              Putra dari Bapak Harso Udiono (Nono Ban)<br/>
              dan Ibu Luluk Yunita
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 mt-10 intro-line">
        <div class="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <span class="text-gold/40 text-xs">✦</span>
        <div class="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const moonRef = ref<HTMLElement | null>(null)
const bgLayerRef = ref<HTMLElement | null>(null)
const midLayerRef = ref<HTMLElement | null>(null)
const fgLayerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)
const coupleRef = ref<HTMLElement | null>(null)

// Generate petals
const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  style: {
    position: 'absolute' as const,
    left: `${Math.random() * 100}%`,
    top: '-30px',
    fontSize: `${10 + Math.random() * 8}px`,
    opacity: String(0.4 + Math.random() * 0.4),
    animation: `petalFall ${6 + Math.random() * 8}s linear infinite`,
    animationDelay: `${Math.random() * 8}s`,
  }
}))

onMounted(async () => {
  if (!process.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const scene = document.getElementById('intro-scene')!

  // Parallax layers
  const layers = [
    { el: bgLayerRef.value, speed: 0.15 },
    { el: midLayerRef.value, speed: 0.28 },
    { el: fgLayerRef.value, speed: 0.45 },
    { el: moonRef.value, speed: 0.08 },
  ]
  layers.forEach(({ el, speed }) => {
    if (!el) return
    gsap.to(el, {
      y: () => -speed * scene.offsetHeight,
      ease: 'none',
      scrollTrigger: {
        trigger: scene,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    })
  })

  // Content reveal
  const els = [
    ...scene.querySelectorAll('.intro-subtitle, .intro-line'),
    ...(titleRef.value ? [titleRef.value] : []),
    ...(bodyRef.value ? [bodyRef.value] : []),
    ...(coupleRef.value ? [coupleRef.value] : [])
  ]
  gsap.fromTo(els,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: scene,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    }
  )
})
</script>

<style scoped>
.moon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFF8E7, #F5DEB3 50%, #C9A84C 100%);
  box-shadow:
    0 0 30px rgba(201,168,76,0.3),
    0 0 80px rgba(201,168,76,0.12),
    0 0 160px rgba(201,168,76,0.06);
}
.falling-petal {
  position: absolute;
  filter: hue-rotate(280deg) saturate(0.6) brightness(0.9);
}
</style>
