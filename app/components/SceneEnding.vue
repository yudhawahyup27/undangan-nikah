<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const progress = ref(0)
const isVisible = ref(false)

const onScroll = () => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const vh = window.innerHeight

  const raw = (vh - rect.top) / (vh + rect.height)
  progress.value = Math.min(1, Math.max(0, raw))
  
  if (progress.value > 0.3) {
    isVisible.value = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  onScroll()
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section
    ref="sectionRef"
    class="scene relative min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 flex items-center justify-center overflow-hidden"
  >
    <!-- Enhanced background ornaments -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[140px] animate-pulse" 
           style="animation-duration: 4s" />
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-200/40 rounded-full blur-[120px] animate-pulse" 
           style="animation-duration: 5s; animation-delay: 1s" />
      <div class="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-pink-300/30 rounded-full blur-[100px] animate-pulse"
           style="animation-duration: 6s; animation-delay: 2s" />
    </div>

    <!-- Floating hearts decoration -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        v-for="i in 8" 
        :key="i"
        class="absolute text-rose-300/20 animate-float"
        :style="{
          left: `${(i * 12) + 5}%`,
          top: `${100 + (i * 10)}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${15 + (i * 2)}s`,
          fontSize: `${20 + (i * 5)}px`
        }"
      >
        ❤
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div
      class="relative z-10 max-w-3xl px-6 text-center"
      :style="{
        transform: `
          perspective(1400px)
          translateY(${(1 - progress) * 80}px)
          scale(${0.92 + progress * 0.08})
        `,
        opacity: progress
      }"
    >
      <!-- Opening quote -->
      <div class="mb-12">
        <svg class="w-12 h-12 mx-auto text-rose-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
        <p class="text-lg md:text-xl text-gray-600 leading-relaxed italic font-light">
          Jika Anda membaca sampai di titik ini,<br class="hidden md:block" />
          berarti kehadiran Anda sungguh berarti bagi kami.
        </p>
      </div>

      <!-- Decorative divider -->
      <div class="flex items-center justify-center my-10 gap-3">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-rose-300"></div>
        <svg class="w-6 h-6 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
        <div class="h-px w-16 bg-gradient-to-l from-transparent to-rose-300"></div>
      </div>

      <!-- Main message -->
      <div class="mb-12">
        <p class="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
          Doa dan restu Anda adalah hadiah terindah<br class="hidden md:block" />
          yang akan kami bawa dalam perjalanan hidup kami.
        </p>
        <p class="text-sm md:text-base text-gray-500 leading-relaxed italic">
          Setiap kata baik yang Anda ucapkan menjadi berkah<br class="hidden md:block" />
          yang menerangi langkah kami menuju masa depan.
        </p>
      </div>

      <!-- Names section with animation -->
      <div 
        class="relative mt-16 mb-12 py-10 px-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-rose-100 shadow-xl transition-all duration-700"
        :class="isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
      >
        <!-- Decorative corner elements -->
        <div class="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose-300 rounded-tl-lg"></div>
        <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-rose-300 rounded-tr-lg"></div>
        <div class="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-rose-300 rounded-bl-lg"></div>
        <div class="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-300 rounded-br-lg"></div>

        <div class="relative">
          <h3 class="text-4xl md:text-5xl lg:text-6xl font-serif text-rose-500 mb-2 transition-all duration-300 hover:scale-105" 
              style="font-family: 'Cormorant Garamond', serif;">
            Yudha Wahyu P
          </h3>

          <div class="my-6 flex items-center justify-center gap-4">
            <div class="h-px w-12 bg-gradient-to-r from-transparent to-rose-300"></div>
            <div class="text-3xl md:text-4xl text-rose-400 font-light">&</div>
            <div class="h-px w-12 bg-gradient-to-l from-transparent to-rose-300"></div>
          </div>

          <h3 class="text-4xl md:text-5xl lg:text-6xl font-serif text-rose-500 transition-all duration-300 hover:scale-105"
              style="font-family: 'Cormorant Garamond', serif;">
            Nur Khotimah
          </h3>
        </div>
      </div>

      <!-- Closing message -->
      <div class="space-y-4">
        <p class="text-sm md:text-base tracking-wider text-gray-500 uppercase font-light">
          Dengan penuh cinta dan rasa syukur
        </p>
        
        <div class="flex items-center justify-center gap-2 text-gray-400">
          <div class="w-2 h-2 rounded-full bg-rose-300"></div>
          <div class="w-2 h-2 rounded-full bg-rose-300"></div>
          <div class="w-2 h-2 rounded-full bg-rose-300"></div>
        </div>

        <!-- Date reminder (optional) -->
        <div class="mt-8 pt-8 border-t border-rose-200">
          <p class="text-xs md:text-sm text-gray-400 italic">
            Kami menanti kehadiran Anda di hari bahagia kami
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom fade effect -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-100 to-transparent pointer-events-none"></div>
  </section>
</template>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

.animate-float {
  animation: float linear infinite;
}
</style>