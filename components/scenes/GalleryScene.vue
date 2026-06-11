<template>
  <section id="gallery-scene" class="scene gallery-scene relative py-32 px-8">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 50% 50%, rgba(255,183,197,0.04) 0%, transparent 70%)"/>

    <div ref="titleRef" class="text-center mb-16 relative w-full" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Moments</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2.2rem,5vw,4rem)">
        Galeri <em class="text-gold/80">Kenangan</em>
      </h2>
      <div class="section-divider mt-6" />
    </div>

    <div ref="gridRef" class="gallery-grid max-w-5xl mx-auto w-full relative" style="z-index:2">
      <button
        v-for="(item, i) in gallery"
        :key="item.src"
        type="button"
        class="gallery-item"
        :class="[item.span, { 'is-active': activePhotos.has(i) }]"
        :style="{ minHeight: item.height }"
        :aria-pressed="activePhotos.has(i)"
        :aria-label="`Foto ${i + 1}`"
        :ref="el => { if (el) galleryRefs[i] = el as HTMLElement }"
        @click="togglePhoto(i)"
      >
        <img
          :src="item.src"
          :alt="`Foto ${i + 1}`"
          class="gallery-photo"
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const titleRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const galleryRefs = ref<HTMLElement[]>([])
const activePhotos = ref(new Set<number>())

const gallery = [
  { span: 'gallery-item--tall', height: '460px', src: '/images/photo-1.jpeg' },
  { span: '', height: '220px', src: '/images/photo-2.jpeg' },
  { span: '', height: '220px', src: '/images/photo-3.jpeg' },
  { span: '', height: '220px', src: '/images/photo-4.jpeg' },
]

const togglePhoto = (index: number) => {
  const next = new Set(activePhotos.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  activePhotos.value = next
}

onMounted(async () => {
  if (!process.client) return

  await nextTick()

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  if (titleRef.value) {
    gsap.fromTo(titleRef.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.value,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  }

  const items = galleryRefs.value.filter(Boolean)
  if (items.length) {
    gsap.fromTo(items,
      { y: 24 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      }
    )
  }

  ScrollTrigger.refresh()
})
</script>

<style scoped>
.gallery-scene {
  min-height: auto;
  justify-content: flex-start;
  overflow: visible;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .gallery-item--tall {
    grid-row: span 2;
  }
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(201, 168, 76, 0.12);
  background: rgba(255, 255, 255, 0.02);
  min-height: 220px;
  padding: 0;
  cursor: pointer;
  transition: border-color 0.35s ease, transform 0.35s ease;
}

.gallery-item:focus-visible {
  outline: 2px solid rgba(201, 168, 76, 0.6);
  outline-offset: 2px;
}

.gallery-item.is-active {
  border-color: rgba(201, 168, 76, 0.35);
}

.gallery-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(1) brightness(0.82);
  transition: filter 0.45s ease, transform 0.45s ease;
}

.gallery-item.is-active .gallery-photo {
  filter: none;
  transform: scale(1.02);
}

.gallery-item::after {
  display: none;
}
</style>
