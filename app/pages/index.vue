<!-- pages/index.vue atau app.vue -->
<template>
    <ClientOnly>
      <div class="book-container">
        <!-- Floating Hearts Background -->
        <div class="floating-hearts">
          <div v-for="i in 20" :key="i" class="heart-bg" :style="getHeartStyle(i)">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
    
        <!-- Music Control -->
        <button @click="toggleMusic" class="music-control" v-show="isOpen">
          <svg v-if="isPlaying" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
          </svg>
          <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
          </svg>
        </button>
    
        <audio ref="audioPlayer" loop>
          <source src="~/assets/music/ost.mp3" type="audio/mpeg">
        </audio>
    
        <!-- Book Cover Component -->
        <transition name="cover-fade">
          <BookCover v-show="!isOpen" @open="openBook" />
        </transition>
    
        <!-- Book Pages with 3D Flip -->
        <transition name="book-open">
          <div v-show="isOpen" class="book-wrapper">
            <div class="book-pages-container" :class="{ 'is-flipping': isFlipping }">
              <!-- Pages -->
              <div 
                v-for="(PageComponent, index) in pageComponents" 
                :key="index"
                class="page-wrapper"
                :class="{ 
                  'active': index === currentPage,
                  'flipped': index < currentPage,
                  'next': index > currentPage,
                  'flipping-out': isFlipping && index === currentPage - 1,
                  'flipping-in': isFlipping && index === currentPage
                }"
              >
                <div class="page-content">
                  <component :is="PageComponent" />
                  
                  <!-- Page Curl Hint (hanya tampil di page aktif & bukan halaman terakhir) -->
                  <div 
                    v-if="index === currentPage && index < pageComponents.length - 1" 
                    class="page-curl-hint"
                    @click="nextPage"
                  >
                    <span class="curl-arrow">→</span>
                  </div>
                </div>
              </div>
    
              <!-- Navigation -->
              <div class="book-navigation">
                <button 
                  @click="prevPage" 
                  :disabled="currentPage === 0 || isFlipping" 
                  class="nav-btn prev"
                >
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                
                <div class="page-indicator">
                  <span class="page-number">{{ currentPage + 1 }} / {{ pageComponents.length }}</span>
                  <div class="page-dots">
                    <span 
                      v-for="(_, idx) in pageComponents" 
                      :key="idx"
                      class="dot"
                      :class="{ active: idx === currentPage }"
                      @click="goToPage(idx)"
                    ></span>
                  </div>
                </div>
    
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === pageComponents.length - 1 || isFlipping" 
                  class="nav-btn next"
                >
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BookCover from '~/components/BookCover.vue'
import PageOpening from '~/components/SceneOpening.vue'
import PageCouple from '~/components/SceneCouple.vue'
import PageEvent from '~/components/SceneEvent.vue'
import PageStory from '~/components/SceneStory.vue'
import PageRVSP from '~/components/SceneRVSP.vue'
import PageEnding from '~/components/SceneEnding.vue'

// Audio Control
const isPlaying = ref(false)
const audioPlayer = ref(null)

const toggleMusic = () => {
  if (!audioPlayer.value) return
  
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play().catch(() => {})
  }
  isPlaying.value = !isPlaying.value
}

// Book State
const isOpen = ref(false)
const currentPage = ref(0)

const pageComponents = [
  PageOpening,
  PageCouple,
  PageEvent,
  PageStory,
  PageRVSP,
  PageEnding
]

const openBook = () => {
  isOpen.value = true
  // Auto play music when book opens
  setTimeout(() => {
    if (audioPlayer.value && !isPlaying.value) {
      audioPlayer.value.play().catch(() => {})
      isPlaying.value = true
    }
  }, 500)
}

const isFlipping = ref(false)

const nextPage = () => {
  if (currentPage.value < pageComponents.length - 1 && !isFlipping.value) {
    isFlipping.value = true
    currentPage.value++
    
    setTimeout(() => {
      isFlipping.value = false
    }, 1000)
  }
}

const prevPage = () => {
  if (currentPage.value > 0 && !isFlipping.value) {
    isFlipping.value = true
    currentPage.value--
    
    setTimeout(() => {
      isFlipping.value = false
    }, 1000)
  }
}

const goToPage = (index) => {
  if (index !== currentPage.value && !isFlipping.value) {
    isFlipping.value = true
    currentPage.value = index
    
    setTimeout(() => {
      isFlipping.value = false
    }, 1000)
  }
}

// Keyboard Navigation
const handleKeydown = (e) => {
  if (!isOpen.value) return
  if (e.key === 'ArrowRight') nextPage()
  if (e.key === 'ArrowLeft') prevPage()
}

// Swipe Navigation for Mobile
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  if (touchStartX - touchEndX > swipeThreshold) {
    nextPage()
  }
  if (touchEndX - touchStartX > swipeThreshold) {
    prevPage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  if (audioPlayer.value) {
    audioPlayer.value.pause()
  }
})

// Floating Hearts Random Styles
const getHeartStyle = (index) => {
  const left = Math.random() * 100
  const size = Math.random() * 20 + 10
  const delay = Math.random() * 10
  const duration = Math.random() * 10 + 15
  
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Great+Vibes&display=swap');

/* === RESET & GENERAL === */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.icon {
  width: 100%;
  height: 100%;
}

.book-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%);
}

/* === FLOATING HEARTS === */
.floating-hearts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.heart-bg {
  position: absolute;
  color: rgba(236, 72, 153, 0.15);
  animation: float-heart 20s infinite ease-in-out;
}

@keyframes float-heart {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* === MUSIC CONTROL === */
.music-control {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(236, 72, 153, 0.3);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ec4899;
  transition: all 0.3s ease;
  padding: 12px;
}

.music-control:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 48px rgba(236, 72, 153, 0.4);
}

.music-control:active {
  transform: scale(0.95);
}

/* === TRANSITIONS === */
.cover-fade-enter-active,
.cover-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.cover-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.cover-fade-leave-to {
  opacity: 0;
  transform: rotateY(-90deg) scale(0.8);
}

.book-open-enter-active {
  animation: book-open 1s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes book-open {
  from {
    opacity: 0;
    transform: scale(0.9) rotateY(-20deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

/* === BOOK PAGES === */
.book-wrapper {
  position: fixed;
  inset: 0;
  perspective: 2000px;
  z-index: 10;
}

.book-pages-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-pages-container.is-flipping {
  pointer-events: none;
}

.page-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;
}

/* Page States */
.page-wrapper.active {
  transform: rotateY(0deg) translateZ(0);
  z-index: 10;
  pointer-events: auto;
}

.page-wrapper.flipped {
  transform: rotateY(-180deg) translateZ(-50px);
  z-index: 1;
  pointer-events: none;
  opacity: 0;
}

.page-wrapper.next {
  transform: rotateY(0deg) translateZ(-100px);
  z-index: 5;
  pointer-events: none;
  opacity: 0;
}

/* Flipping Animations */
.page-wrapper.flipping-out {
  animation: flip-out 1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  z-index: 15;
}

.page-wrapper.flipping-in {
  animation: flip-in 1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
  z-index: 11;
}

@keyframes flip-out {
  0% {
    transform: rotateY(0deg) translateZ(0);
    opacity: 1;
  }
  50% {
    transform: rotateY(-90deg) translateZ(50px);
    opacity: 0.5;
  }
  100% {
    transform: rotateY(-180deg) translateZ(-50px);
    opacity: 0;
  }
}

@keyframes flip-in {
  0% {
    transform: rotateY(0deg) translateZ(-100px);
    opacity: 0;
  }
  50% {
    transform: rotateY(0deg) translateZ(50px);
    opacity: 0.7;
  }
  100% {
    transform: rotateY(0deg) translateZ(0);
    opacity: 1;
  }
}

.page-content {
  width: 100%;
  height: 100%;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}


/* Custom Scrollbar */
.page-content::-webkit-scrollbar {
  width: 6px;
}

.page-content::-webkit-scrollbar-track {
  background: transparent;
}

.page-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ec4899, #db2777);
  border-radius: 10px;
}

/* Page Shadows */
.page-content::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 20px;
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0.1) 0%, 
    rgba(0, 0, 0, 0.03) 50%,
    transparent 100%);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.page-wrapper.active .page-content::before {
  opacity: 1;
}

/* Page Curl Hint */
.page-curl-hint {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, transparent 0%, rgba(236, 72, 153, 0.08) 50%, rgba(236, 72, 153, 0.15) 100%);
  border-radius: 100% 0 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px;
}

.page-curl-hint:active {
  transform: scale(0.95);
}

.curl-arrow {
  font-size: 1.2rem;
  color: #ec4899;
  animation: bounce-horizontal 2s ease-in-out infinite;
  display: block;
}

@keyframes bounce-horizontal {
  0%, 100% {
    transform: translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateX(5px);
    opacity: 1;
  }
}

/* === NAVIGATION === */
.book-navigation {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: linear-gradient(135deg, #ec4899, #db2777);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
  padding: 10px;
  flex-shrink: 0;
}

.nav-btn:active:not(:disabled) {
  transform: scale(0.9);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 70px;
}

.page-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  color: #db2777;
  font-weight: 600;
  white-space: nowrap;
}

.page-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e5e7eb;
  transition: all 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
}

.dot:active {
  transform: scale(0.8);
}

.dot.active {
  background: #ec4899;
  width: 20px;
  border-radius: 3px;
}

/* === TABLET & DESKTOP === */
@media (min-width: 768px) {
  .music-control {
    top: 30px;
    right: 30px;
    width: 56px;
    height: 56px;
    padding: 14px;
  }
  
  .music-control:hover {
    transform: scale(1.1);
  }
  
  .page-wrapper {
    width: 90%;
    max-width: 900px;
    height: 90%;
    max-height: 700px;
    margin: auto;
  }
  
  .page-content {
    box-shadow: 
      -5px 0 20px rgba(0, 0, 0, 0.1),
      5px 0 20px rgba(0, 0, 0, 0.1),
      0 5px 30px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }
  
  .page-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .page-curl-hint {
    width: 80px;
    height: 80px;
  }
  
  .page-curl-hint:hover {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, transparent 0%, rgba(236, 72, 153, 0.15) 50%, rgba(236, 72, 153, 0.25) 100%);
  }
  
  .curl-arrow {
    font-size: 1.5rem;
  }
  
  .book-navigation {
    padding: 15px 30px;
    gap: 20px;
    bottom: 40px;
  }
  
  .nav-btn {
    width: 50px;
    height: 50px;
    padding: 12px;
  }
  
  .nav-btn:hover:not(:disabled) {
    transform: scale(1.1);
  }
  
  .page-number {
    font-size: 1.2rem;
  }
  
  .page-dots {
    gap: 8px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
  }
  
  .dot:hover {
    transform: scale(1.2);
  }
  
  .dot.active {
    width: 24px;
    border-radius: 4px;
  }
}

/* === LANDSCAPE MOBILE === */
@media (max-height: 500px) and (orientation: landscape) {
  .book-navigation {
    bottom: 10px;
    padding: 8px 16px;
    gap: 10px;
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
  }
  
  .page-number {
    font-size: 0.9rem;
  }
  
  .music-control {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }
  
  .page-curl-hint {
    width: 50px;
    height: 50px;
  }
}

/* === VERY SMALL DEVICES === */
@media (max-width: 360px) {
  .book-navigation {
    padding: 8px 16px;
    gap: 10px;
  }
  
  .nav-btn {
    width: 36px;
    height: 36px;
    padding: 8px;
  }
  
  .page-indicator {
    min-width: 60px;
  }
  
  .page-number {
    font-size: 0.9rem;
  }
  
  .dot {
    width: 5px;
    height: 5px;
  }
  
  .dot.active {
    width: 16px;
  }
}

</style>