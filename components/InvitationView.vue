<template>
  <div>
    <!-- Loading Screen -->
    <LoadingScreen @done="onLoadingDone" />

    <!-- Opening: full-screen cover -->
    <div
      v-if="!isOpen"
      id="cover-wrapper"
      class="fixed inset-0 z-50"
      style="background: var(--color-midnight)"
    >
      <OpeningScene @open="openInvitation" />
    </div>

    <!-- Main invitation content (hidden until opened) -->
    <div
      id="main-content"
      :style="{ opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden' }"
      style="transition: opacity 0.8s ease;"
    >
      <IntroScene />
      <LoveStoryScene />
      <EventScene />
      <GalleryScene />
      <QuizScene />
      <StatsScene />
      <RSVPScene />
      <GiftScene />
      <ClosingScene />
    </div>

    <MusicToggle v-if="loadingDone" />
    <ToastNotification />

    <div
      id="scroll-progress"
      class="fixed top-0 left-0 h-[2px] z-[999]"
      style="background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light)); transition: width 0.1s ease; width: 0%"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const loadingDone = ref(false)
const { playOpening, preloadMusic } = useWeddingMusic()

const onLoadingDone = () => {
  loadingDone.value = true
  preloadMusic()
}

const openInvitation = async () => {
  if (!process.client) return

  playOpening()

  const coverEl = document.getElementById('cover-wrapper')
  const { gsap } = await import('gsap')

  await gsap.to(coverEl, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.in'
  })

  await gsap.to(coverEl, {
    opacity: 0,
    scale: 1.12,
    duration: 0.9,
    ease: 'power3.in'
  })

  isOpen.value = true

  const progressBar = document.getElementById('scroll-progress') as HTMLElement
  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrollTop / docHeight) * 100
    if (progressBar) progressBar.style.width = `${progress}%`
  }
  window.addEventListener('scroll', updateProgress, { passive: true })

  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.refresh()
}

let rafId: number
const onScroll = () => {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    window.scrollY
  })
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style>
#main-content {
  position: relative;
  z-index: 1;
}
</style>
