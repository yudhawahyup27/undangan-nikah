<template>
  <div class="page-ending bg-gradient-to-b from-rose-50 via-white to-pink-50">
    <div class="page-inner mx-auto px-4 md:px-6 py-12 md:py-20">

      <!-- HEADER -->
      <div class="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-serif text-rose-400 mb-6 animate-fade-in">
          Our Moments
        </h2>
        <div class="w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-6"></div>
        <p class="text-gray-600 text-base md:text-lg leading-relaxed italic">
          "Dalam setiap detik bersama, kami menemukan arti cinta yang sesungguhnya.<br class="hidden md:block" />
          Setiap senyum, setiap tawa, dan setiap pelukan adalah kenangan yang akan kami simpan selamanya."
        </p>
      </div>

      <!-- BENTO GRID GALLERY -->
      <div class="max-w-7xl mx-auto my-20">
        
        <!-- Mobile: Simple Grid -->
        <div class="md:hidden grid grid-cols-2 gap-2">
          <div
            v-for="(item, i) in currentGallery"
            :key="i"
            class="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
            @click="open(i)"
          >
            <img
              :src="item.image"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :alt="item.caption"
            />
            <div class="absolute inset-0 text-center bg-gradient-to-t from-pink-500/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-end p-3">
              <p class="text-white text-xs font-light text-center">{{ item.caption }}</p>
            </div>
          </div>
        </div>

        <!-- Desktop: Bento Grid -->
        <div class="hidden md:grid grid-cols-4 gap-3 auto-rows-[200px]">
          <!-- Large featured image -->
          <div
            class="col-span-2 row-span-2 relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300"
            @click="open(0)"
          >
            <img
              :src="currentGallery[0].image"
              class="w-full h-full object-cover text-center transition-transform duration-700 group-hover:scale-110"
              :alt="currentGallery[0].caption"
            />
            <div class="absolute text-center mx-auto inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div>
                <p class="text-white text-xl font-serif mb-1 ">{{ currentGallery[0].caption }}</p>
                <p class="text-white/80 text-sm">{{ currentGallery[0].desc }}</p>
              </div>
            </div>
          </div>

          <!-- Top right images -->
          <div
            v-for="i in 2"
            :key="`top-${i}`"
            class="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300"
            @click="open(i)"
          >
            <img
              :src="currentGallery[i].image"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :alt="currentGallery[i].caption"
            />
            <div class="absolute inset-0 text-center bg-gradient-to-t from-black/70 via-transparent text-center to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p class="text-white text-sm font-light ">{{ currentGallery[i].caption }}</p>
            </div>
          </div>

          <!-- Medium image -->
          <div
            class="row-span-2 relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300"
            @click="open(3)"
          >
            <img
              :src="currentGallery[3].image"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :alt="currentGallery[3].caption"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <div>
                <p class="text-white text-lg font-serif mb-1 text-center">{{ currentGallery[3].caption }}</p>
                <p class="text-white/80 text-xs">{{ currentGallery[3].desc }}</p>
              </div>
            </div>
          </div>

          <!-- Bottom row images -->
          <div
            v-for="i in [4, 5, 6, 7]"
            :key="`bottom-${i}`"
            class="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300"
            @click="open(i)"
          >
            <img
              :src="currentGallery[i].image"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :alt="currentGallery[i].caption"
            />
            <div class="absolute inset-0 bg-gradient-to-t text-center from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p class="text-white text-sm font-light ">{{ currentGallery[i].caption }}</p>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center my-20">
          <button
            @click="shuffleGallery"
            class="p-10 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Lihat Momen Lainnya
          </button>
        </div>
      </div>

      <!-- QUOTE SECTION -->
      <div class="max-w-4xl mx-auto mt-20 md:mt-32 text-center px-4">
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-pink-100">
          <svg class="w-12 h-12 text-rose-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <p class="text-gray-700 text-lg md:text-2xl font-serif leading-relaxed mb-6 italic">
            Cinta bukan tentang menemukan orang yang sempurna,<br class="hidden md:block" />
            tetapi tentang melihat orang yang tidak sempurna dengan cara yang sempurna
          </p>
          <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-4"></div>
          <p class="text-gray-500 text-sm">— Our Journey Together</p>
        </div>
      </div>

    </div>

    <!-- LIGHTBOX -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          @click="close"
        >
          <div class="relative max-w-5xl w-full" @click.stop>
            <img
              :src="currentGallery[index].image"
              class="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              :alt="currentGallery[index].caption"
            />
            <div class="text-center mt-6">
              <p class="text-white text-xl md:text-2xl font-serif mb-2">
                {{ currentGallery[index].caption }}
              </p>
              <p class="text-white/70 text-sm md:text-base">
                {{ currentGallery[index].desc }}
              </p>
            </div>

            <!-- Navigation Arrows -->
            <button
              v-if="index > 0"
              @click="prev"
              class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition text-white text-2xl md:text-3xl font-light"
            >
              ‹
            </button>
            <button
              v-if="index < currentGallery.length - 1"
              @click="next"
              class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition text-white text-2xl md:text-3xl font-light"
            >
              ›
            </button>
          </div>

          <button
            class="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition text-white text-2xl"
            @click="close"
          >
            ✕
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&display=swap');

.page-ending {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff 0%, #fef3f8 100%);
  padding: 60px 20px;
}

.page-inner {
  max-width: 800px;
  margin: 0 auto;
  animation: fade-in-up 1s ease-out;
}


@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>

<script setup>
import { ref, computed } from 'vue'

const allGalleries = [
  [
    { caption: 'Moment Sempurna', desc: 'Hari dimana segalanya terasa begitu indah', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop' },
    { caption: 'Kebersamaan', desc: 'Setiap detik bersamamu adalah kebahagiaan', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop' },
    { caption: 'Senyum Bahagia', desc: 'Senyum yang menceritakan seribu kata', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop' },
    { caption: 'Cinta Sejati', desc: 'Menemukan cinta dalam setiap tatapan', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=800&fit=crop' },
    { caption: 'Tawa Lepas', desc: 'Tawa yang tulus dari hati', image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=400&fit=crop' },
    { caption: 'Pelukan Hangat', desc: 'Kehangatan yang tak tergantikan', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=400&fit=crop' },
    { caption: 'Mata Berbinar', desc: 'Cahaya cinta dalam pandangan', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
    { caption: 'Bersama Selamanya', desc: 'Janji untuk selalu bersama', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop' },
  ],
  [
    { caption: 'Kenangan Indah', desc: 'Momen yang takkan pernah terlupakan', image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=800&fit=crop' },
    { caption: 'Harmoni Cinta', desc: 'Irama cinta yang sempurna', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop' },
    { caption: 'Keindahan', desc: 'Keindahan dalam kesederhanaan', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&h=400&fit=crop' },
    { caption: 'Impian Jadi Nyata', desc: 'Semua impian mulai terwujud', image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=800&fit=crop' },
    { caption: 'Canda Tawa', desc: 'Keceriaan yang tak pernah pudar', image: 'https://images.unsplash.com/photo-1519167758481-83f29da8ace8?w=400&h=400&fit=crop' },
    { caption: 'Romantis', desc: 'Romansa yang abadi', image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=400&h=400&fit=crop' },
    { caption: 'Kehangatan', desc: 'Hangatnya cinta kita', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop' },
    { caption: 'Bahagia Selamanya', desc: 'Bahagia bersama hingga akhir', image: 'https://images.unsplash.com/photo-1534329539061-64caeb388c42?w=400&h=400&fit=crop' },
  ],
  [
    { caption: 'Perjalanan Cinta', desc: 'Setiap langkah adalah cerita baru', image: 'https://images.unsplash.com/photo-1537551932715-3c0231a64f98?w=800&h=800&fit=crop' },
    { caption: 'Saling Melengkapi', desc: 'Kamu melengkapi segalanya', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop' },
    { caption: 'Cinta Tulus', desc: 'Cinta yang murni dan tulus', image: 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=400&h=400&fit=crop' },
    { caption: 'Harapan Bersama', desc: 'Merajut masa depan bersama', image: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=400&h=800&fit=crop' },
    { caption: 'Mesra', desc: 'Kemesraan yang terpancar', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&h=400&fit=crop' },
    { caption: 'Momen Berharga', desc: 'Setiap momen adalah harta', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop' },
    { caption: 'Kebersamaan Sejati', desc: 'Bersama dalam suka dan duka', image: 'https://images.unsplash.com/photo-1521478413868-1bbd982fa4a5?w=400&h=400&fit=crop' },
    { caption: 'Cinta Abadi', desc: 'Cinta yang tak lekang waktu', image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=400&h=400&fit=crop' },
  ]
]

const galleryIndex = ref(0)
const currentGallery = computed(() => allGalleries[galleryIndex.value])

const show = ref(false)
const index = ref(0)

const shuffleGallery = () => {
  galleryIndex.value = (galleryIndex.value + 1) % allGalleries.length
}

const open = (i) => {
  index.value = i
  show.value = true
  document.body.style.overflow = 'hidden'
}

const close = () => {
  show.value = false
  document.body.style.overflow = ''
}

const prev = () => {
  if (index.value > 0) index.value--
}

const next = () => {
  if (index.value < currentGallery.value.length - 1) index.value++
}
</script>