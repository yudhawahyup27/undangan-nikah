<template>
  <section id="gift-scene" class="scene relative py-32 px-8" style="min-height:80vh; overflow:hidden">
    <!-- Gold gradient ambient -->
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)"/>

    <!-- Title -->
    <div ref="titleRef" class="text-center mb-6 relative" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Amplop Digital</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2.2rem,5vw,4rem)">
        Hadiah <em class="text-gold/80">Pernikahan</em>
      </h2>
      <div class="section-divider mt-6" />
    </div>

    <!-- Intro text -->
    <div ref="introRef" class="text-center max-w-lg mx-auto mb-16 relative" style="z-index:2">
      <p class="font-cormorant text-cream/55" style="font-size:1.1rem; line-height:1.9">
        Doa restu Anda adalah hadiah terbaik bagi kami.<br/>
        Namun jika ingin berbagi kebahagiaan,<br/>
        Anda dapat mengirimkan melalui:
      </p>
    </div>

    <!-- Bank cards -->
    <div ref="cardsRef" class="max-w-2xl mx-auto flex flex-col md:flex-row gap-6 relative" style="z-index:2">
      <div
        v-for="bank in banks"
        :key="bank.bank"
        class="bank-card glass-card p-8 flex-1"
      >
        <!-- Bank name -->
        <div class="flex items-center justify-between mb-6">
          <div class="bank-logo">
            <span class="font-josefin font-medium" style="font-size:0.9rem; letter-spacing:0.15em">{{ bank.bank }}</span>
          </div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="6" width="28" height="20" rx="3" stroke="rgba(201,168,76,0.4)" stroke-width="1.5"/>
            <path d="M2 12h28" stroke="rgba(201,168,76,0.3)" stroke-width="1.5"/>
            <rect x="6" y="18" width="8" height="2" rx="1" fill="rgba(201,168,76,0.5)"/>
          </svg>
        </div>

        <!-- Account name -->
        <p class="font-josefin text-xs tracking-[0.3em] text-gold/50 uppercase mb-2">Atas Nama</p>
        <p class="font-cormorant text-cream mb-6" style="font-size:1.15rem">{{ bank.name }}</p>

        <!-- Account number -->
        <p class="font-josefin text-xs tracking-[0.3em] text-gold/50 uppercase mb-2">Nomor Rekening</p>
        <div class="flex items-center justify-between gap-4 p-4 rounded-lg" style="background:rgba(201,168,76,0.05); border:1px solid rgba(201,168,76,0.12)">
          <span class="font-josefin text-cream" style="font-size:1.05rem; letter-spacing:0.15em">{{ bank.number }}</span>
          <button
            class="copy-btn"
            @click="copyNumber(bank)"
            :title="'Salin nomor ' + bank.bank"
          >
            <svg v-if="!bank.copied" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer note -->
    <div class="text-center mt-12 relative" style="z-index:2">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
        <span class="text-gold/30 text-xs">✦</span>
        <div class="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
      </div>
      <p class="font-cormorant italic text-cream/30" style="font-size:1rem">
        Jazakumullahu khairan katsiran
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const titleRef = ref<HTMLElement | null>(null)
const introRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

interface Bank { bank: string; name: string; number: string; copied: boolean }

const banks = reactive<Bank[]>([
  { bank: 'BCA', name: 'Yudha Wahyu Pratama', number: '1234567890', copied: false },
  { bank: 'Mandiri', name: 'Nur Kotimah', number: '9876543210', copied: false },
])

const emit = defineEmits(['toast'])

const copyNumber = async (bank: Bank) => {
  try {
    await navigator.clipboard.writeText(bank.number)
    bank.copied = true
    emit('toast', `Nomor ${bank.bank} berhasil disalin ✓`)

    setTimeout(() => { bank.copied = false }, 3000)

    // Track click
    fetch('/api/gift-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bank: bank.bank })
    }).catch(() => {})
  } catch {
    emit('toast', 'Gagal menyalin, salin manual')
  }
}

onMounted(async () => {
  if (!process.client) return
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const scene = document.getElementById('gift-scene')!
  ;[titleRef.value, introRef.value].filter(Boolean).forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: scene, start: 'top 80%', toggleActions: 'play none none none' }
      }
    )
  })

  if (cardsRef.value) {
    const cards = cardsRef.value.children
    gsap.fromTo(Array.from(cards),
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
})
</script>

<style scoped>
.bank-logo {
  color: var(--color-gold);
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 6px 14px;
  border-radius: 4px;
}
.copy-btn {
  color: var(--color-gold);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.copy-btn:hover {
  background: rgba(201,168,76,0.15);
}
</style>
