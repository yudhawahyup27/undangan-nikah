<template>
  <section id="love-story-scene" class="scene relative py-32" style="min-height: 100vh; overflow: hidden;">
    <!-- Ambient glow -->
    <div class="absolute" style="top:20%; left:-10%; width:50%; height:60%; background:radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%); pointer-events:none"/>
    <div class="absolute" style="top:40%; right:-10%; width:50%; height:60%; background:radial-gradient(ellipse, rgba(255,183,197,0.04) 0%, transparent 70%); pointer-events:none"/>

    <!-- Title -->
    <div ref="titleRef" class="text-center mb-20 px-8">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Our Journey</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2.2rem,5vw,4rem)">
        Kisah <em class="text-gold/80">Cinta Kami</em>
      </h2>
      <div class="section-divider mt-6" />
    </div>

    <!-- Timeline -->
    <div class="relative max-w-3xl mx-auto px-8">
      <!-- Center line -->
      <div class="timeline-line hidden md:block" />

      <!-- Story items -->
      <div
        v-for="(story, i) in stories"
        :key="story.id"
        class="story-item relative mb-16 md:mb-24"
        :class="i % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left md:ml-auto'"
        :ref="el => { if (el) storyRefs[i] = el as HTMLElement }"
      >
        <!-- Content card -->
        <div
          class="glass-card p-8 relative"
          :class="i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'"
        >
          <!-- Dot on timeline -->
          <div
            class="timeline-dot hidden md:block absolute top-8"
            :class="i % 2 === 0 ? 'right-[-3.25rem]' : 'left-[-3.25rem]'"
          />

          <!-- Year badge -->
          <div class="inline-flex items-center gap-2 mb-4">
            <span class="font-josefin text-xs tracking-[0.35em] text-gold/70 uppercase">{{ story.year }}</span>
          </div>

          <h3 class="font-cormorant text-cream mb-3" style="font-size:1.5rem">{{ story.title }}</h3>
          <p class="font-cormorant text-cream/60" style="font-size:1rem; line-height:1.8">{{ story.text }}</p>

          <!-- Decorative quote mark -->
          <span class="absolute top-4 opacity-10 font-playfair text-gold select-none" style="font-size:5rem; line-height:1; right:1rem">"</span>
        </div>
      </div>
    </div>

    <!-- Bottom ornament -->
    <div class="text-center mt-8 px-8">
      <p class="font-cormorant italic text-cream/40" style="font-size:1.1rem">
        "Cinta bukan soal menemukan seseorang yang sempurna,<br/>
        tapi tentang melihat seseorang dengan sempurna."
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const titleRef = ref<HTMLElement | null>(null)
const storyRefs = ref<HTMLElement[]>([])

const stories = [
  {
    id: 1,
    year: '2018',
    title: 'Pertemuan Pertama',
    text: 'Di sebuah seminar kampus yang tidak disengaja, dua jiwa bertemu. Pandangan pertama yang mengubah segalanya — sebuah awal yang sederhana namun penuh makna.'
  },
  {
    id: 2,
    year: '2019',
    title: 'Jatuh Cinta',
    text: 'Percakapan demi percakapan mengalir seperti air. Tawa yang tulus, cerita yang terbagi, dan dua hati yang perlahan menyatu dalam getaran yang sama.'
  },
  {
    id: 3,
    year: '2021',
    title: 'Melewati Badai',
    text: 'Jarak dan waktu menguji cinta kami. Namun setiap ujian justru menjadi fondasi yang semakin kokoh — membuktikan bahwa cinta sejati tak pernah menyerah.'
  },
  {
    id: 4,
    year: '2024',
    title: 'Lamaran',
    text: 'Dengan segenap keberanian dan cinta yang telah lama tersimpan, sebuah pertanyaan diajukan di bawah langit berbintang. Satu kata "iya" yang mengubah selamanya.'
  },
  {
    id: 5,
    year: '2025',
    title: 'Pernikahan',
    text: 'Kini kami berdiri di gerbang babak baru. Bersama, kami siap menuliskan lembaran cerita panjang yang penuh syukur, kasih, dan berkah.'
  },
]

onMounted(async () => {
  if (!process.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Title reveal
  if (titleRef.value) {
    gsap.fromTo(titleRef.value,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: titleRef.value, start: 'top 80%', toggleActions: 'play none none none' }
      }
    )
  }

  // Story items stagger
  storyRefs.value.forEach((el, i) => {
    if (!el) return
    const fromLeft = i % 2 === 0
    gsap.fromTo(el,
      { opacity: 0, x: fromLeft ? -60 : 60, y: 30 },
      {
        opacity: 1, x: 0, y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    )
  })
})
</script>

<style scoped>
.timeline-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-gold);
  border: 2px solid var(--color-midnight);
  box-shadow: 0 0 12px rgba(201,168,76,0.5);
}
.md\:pr-1\/2 { padding-right: 50% !important; }
.md\:pl-1\/2 { padding-left: 50% !important; }
.md\:ml-auto { margin-left: auto !important; }
.md\:mr-12 { margin-right: 3rem !important; }
.md\:ml-12 { margin-left: 3rem !important; }
@media (max-width: 768px) {
  .md\:pr-1\/2, .md\:pl-1\/2 { padding: 0 !important; }
  .md\:ml-auto { margin-left: 0 !important; }
  .md\:mr-12, .md\:ml-12 { margin: 0 !important; }
  .md\:text-right, .md\:text-left { text-align: left !important; }
}
</style>
