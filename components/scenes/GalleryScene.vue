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

    <div class="booth-gallery max-w-5xl mx-auto w-full relative" style="z-index:2">
      <div class="booth-gallery-heading">
        <div>
          <p class="font-josefin text-[0.65rem] tracking-[0.35em] text-gold/60 uppercase mb-2">Photo Booth</p>
          <h3 class="font-cormorant text-cream" style="font-size:clamp(1.8rem,3vw,2.6rem)">Momen dari tamu kami</h3>
        </div>
        <button type="button" class="gallery-refresh" :disabled="boothLoading" @click="loadBoothGallery">
          <span aria-hidden="true">↻</span>
          {{ boothLoading ? 'Memuat...' : 'Muat ulang' }}
        </button>
      </div>

      <div v-if="boothError" class="booth-gallery-message">
        Galeri Photo Booth belum dapat dimuat. Coba beberapa saat lagi.
      </div>
      <div v-else-if="boothLoading" class="booth-gallery-message">
        Memuat foto dari Photo Booth...
      </div>
      <div v-else-if="!boothLoading && boothGallery.length === 0" class="booth-gallery-message">
        Foto dari Photo Booth akan muncul di sini setelah dibagikan.
      </div>
      <div v-else class="booth-gallery-grid">
        <button v-for="(photo, index) in boothGallery" :key="photo.id" type="button" class="booth-gallery-item" :aria-label="`Buka foto Photo Booth ${index + 1}`" @click="selectedBoothPhoto = photo">
          <img :src="photo.url" :alt="photo.alt || `Momen ${index + 1}`" loading="lazy" decoding="async" />
          <span v-if="photo.name" class="booth-photo-name">{{ photo.name }}</span>
        </button>
      </div>
    </div>

    <div v-if="selectedBoothPhoto" class="photo-lightbox" role="dialog" aria-modal="true" @click.self="selectedBoothPhoto = null">
      <button type="button" class="lightbox-close" aria-label="Tutup foto" @click="selectedBoothPhoto = null">×</button>
      <img :src="selectedBoothPhoto.url" :alt="selectedBoothPhoto.alt || 'Momen dari booth'" />
      <p v-if="selectedBoothPhoto.name" class="font-josefin text-xs tracking-[0.2em] text-cream/70 uppercase">{{ selectedBoothPhoto.name }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

type BoothPhoto = {
  id: string
  url: string
  name?: string
  alt?: string
}

const titleRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const galleryRefs = ref<HTMLElement[]>([])
const activePhotos = ref(new Set<number>())
const boothGallery = ref<BoothPhoto[]>([])
const boothLoading = ref(false)
const boothError = ref(false)
const selectedBoothPhoto = ref<BoothPhoto | null>(null)

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

const loadBoothGallery = async () => {
  boothLoading.value = true
  boothError.value = false

  try {
    boothGallery.value = await $fetch<BoothPhoto[]>('/api/photo-booth-gallery')
  } catch (error) {
    console.error('[GalleryScene] Failed to load Photo Booth gallery:', error)
    boothError.value = true
  } finally {
    boothLoading.value = false
  }
}

onMounted(async () => {
  if (!process.client) return

  await nextTick()
  await loadBoothGallery()

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

.booth-gallery {
  margin-top: 5rem;
}

.booth-gallery-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid rgba(201, 168, 76, 0.16);
  padding-bottom: 1rem;
}

.gallery-refresh {
  color: rgba(245, 238, 215, 0.65);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.gallery-refresh:hover:not(:disabled) {
  color: var(--color-gold-light);
}

.gallery-refresh span {
  display: inline-block;
  font-size: 1.2rem;
  margin-right: 0.35rem;
  vertical-align: -2px;
}

.booth-gallery-message {
  border: 1px solid rgba(201, 168, 76, 0.14);
  color: rgba(245, 238, 215, 0.58);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  padding: 2.5rem 1rem;
  text-align: center;
}

.booth-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.booth-gallery-item {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.03);
}

.booth-gallery-item img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  filter: saturate(0.85);
  transition: transform 0.45s ease, filter 0.45s ease;
}

.booth-gallery-item:hover img,
.booth-gallery-item:focus-visible img {
  filter: saturate(1.1);
  transform: scale(1.04);
}

.booth-photo-name {
  position: absolute;
  left: 0.7rem;
  right: 0.7rem;
  bottom: 0.7rem;
  color: var(--color-cream);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-align: left;
  text-transform: uppercase;
  text-shadow: 0 1px 8px #000;
}

.photo-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 1.5rem;
  background: rgba(8, 12, 24, 0.94);
}

.photo-lightbox img {
  max-width: min(900px, 100%);
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  color: var(--color-cream);
  font-size: 2rem;
  line-height: 1;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .gallery-item--tall {
    grid-row: span 2;
  }

  .booth-gallery-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
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
