<template>
  <section id="stats-scene" class="scene stats-scene relative py-32 px-4 md:px-8" style="min-height:100vh; overflow:hidden">
    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 70% 30%, rgba(255,183,197,0.05) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 50%)" />

    <div ref="titleRef" class="text-center mb-14 relative max-w-3xl mx-auto" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Fun Facts</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2rem,5vw,3.5rem)">
        Statistik <em class="text-gold/80">Lucu</em>
      </h2>
      <p class="font-cormorant text-cream/50 mt-4" style="font-size:clamp(1rem,2.2vw,1.15rem); line-height:1.8">
        Data resmi yang tidak terlalu resmi — tapi cukup akurat untuk undangan ini.
      </p>
      <div class="section-divider mt-6" />
    </div>

    <div ref="gridRef" class="stats-grid max-w-6xl mx-auto relative" style="z-index:2">
      <!-- Statistik Pernikahan -->
      <article class="stats-card glass-card stats-card--wide">
        <div class="stats-card-head">
          <span class="stats-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </span>
          <h3 class="font-josefin text-xs tracking-[0.28em] text-gold/70 uppercase">Statistik Pernikahan</h3>
        </div>

        <div class="stats-mini-grid">
          <div class="stats-mini-item stats-mini-item--quote">
            <p class="font-josefin text-[0.65rem] tracking-[0.2em] text-gold/50 uppercase mb-3">Status Hubungan</p>
            <p class="font-cormorant text-cream/80" style="font-size:1.05rem; line-height:1.7">
              Dari <em class="text-gold/80">"{{ relationshipStatusQuote.from }}"</em><br/>
              Menjadi <em class="text-gold/80">"{{ relationshipStatusQuote.to }}"</em><br/>
              {{ relationshipStatusQuote.caption }}
            </p>
          </div>

          <div class="stats-mini-item">
            <p class="font-josefin text-[0.65rem] tracking-[0.2em] text-gold/50 uppercase mb-2">Total Hari Bersama</p>
            <p class="font-cormorant text-cream stats-number">{{ formattedDaysTogether }}</p>
            <p class="font-josefin text-[0.62rem] tracking-[0.15em] text-cream/35 uppercase mt-1">hari &amp; masih counting</p>
          </div>

          <div class="stats-mini-item">
            <p class="font-josefin text-[0.65rem] tracking-[0.2em] text-gold/50 uppercase mb-2">Total Foto Bersama</p>
            <p class="font-cormorant text-cream/75 italic" style="font-size:1.1rem; line-height:1.6">Terlalu banyak untuk dihitung</p>
          </div>

          <div class="stats-mini-item">
            <p class="font-josefin text-[0.65rem] tracking-[0.2em] text-gold/50 uppercase mb-2">Total Alasan Berantem</p>
            <p class="font-cormorant text-cream/75 italic" style="font-size:1.1rem; line-height:1.6">Sudah diselesaikan secara damai</p>
          </div>
        </div>
      </article>

      <!-- Statistik Pengantin -->
      <article class="stats-card glass-card stats-card--wide">
        <div class="stats-card-head">
          <span class="stats-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 19V5M4 19h16M8 15v-3M12 15V9M16 15V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <h3 class="font-josefin text-xs tracking-[0.28em] text-gold/70 uppercase">Statistik Pengantin</h3>
        </div>

        <div class="stats-bars">
          <div
            v-for="stat in groomStats"
            :key="stat.id"
            class="stats-bar-item"
          >
            <div class="stats-bar-meta">
              <span class="font-josefin text-[0.68rem] tracking-[0.12em] text-cream/70 uppercase">{{ stat.label }}</span>
              <span class="font-cormorant text-gold/80" style="font-size:1rem">{{ stat.display }}</span>
            </div>
            <div class="stats-bar-track">
              <div
                class="stats-bar-fill"
                :class="`stats-bar-fill--${stat.tone}`"
                :style="{ width: barsVisible ? `${Math.min(stat.value, 100)}%` : '0%' }"
              />
              <div
                v-if="stat.value > 100"
                class="stats-bar-overflow"
                :class="`stats-bar-fill--${stat.tone}`"
                :style="{ width: barsVisible ? `${Math.min(stat.value - 100, 27)}%` : '0%' }"
              />
            </div>
          </div>
        </div>
      </article>

      <!-- Fakta Menarik -->
      <article class="stats-card glass-card">
        <div class="stats-card-head">
          <span class="stats-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 11v6M12 7h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <h3 class="font-josefin text-xs tracking-[0.28em] text-gold/70 uppercase">Fakta Menarik</h3>
        </div>

        <Transition name="fact-fade" mode="out-in">
          <div :key="currentFact.id" class="stats-fact-body">
            <p class="font-josefin text-[0.62rem] tracking-[0.25em] text-gold/45 uppercase mb-3">
              Fakta #{{ currentFact.id }}
            </p>
            <p class="font-cormorant text-cream/75" style="font-size:1.05rem; line-height:1.85">
              "{{ currentFact.text }}"
            </p>
          </div>
        </Transition>

        <button type="button" class="stats-btn mt-6" @click="nextFact">
          Fakta Berikutnya
        </button>
      </article>

      <!-- Target Hari Ini -->
      <article class="stats-card glass-card">
        <div class="stats-card-head">
          <span class="stats-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <h3 class="font-josefin text-xs tracking-[0.28em] text-gold/70 uppercase">Target Hari Ini</h3>
        </div>

        <ul class="stats-checklist">
          <li v-for="(item, index) in todayTargets" :key="item.id" class="stats-check-item">
            <span class="stats-check-box" :class="{ 'stats-check-box--done': item.done }">
              <svg v-if="item.done" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="font-cormorant text-cream/75" style="font-size:1.02rem">{{ item.label }}</span>
            <span class="stats-check-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </li>
        </ul>
      </article>

      <!-- Disclaimer -->
      <article class="stats-card glass-card stats-card--warning">
        <div class="stats-card-head">
          <span class="stats-icon stats-icon--warning" aria-hidden="true">⚠</span>
          <h3 class="font-josefin text-xs tracking-[0.28em] text-gold/70 uppercase">Disclaimer Acara</h3>
        </div>

        <p class="font-cormorant text-cream/80 mb-4" style="font-size:1.05rem">{{ eventDisclaimer.title }}</p>
        <p class="font-cormorant text-cream/60 mb-2">Acara ini mengandung:</p>
        <ul class="stats-disclaimer-list">
          <li v-for="item in eventDisclaimer.items" :key="item">{{ item }}</li>
        </ul>
        <p class="font-cormorant italic text-gold/70 mt-5" style="font-size:1rem">{{ eventDisclaimer.footer }}</p>
      </article>

      <!-- Achievement -->
      <article class="stats-card stats-card--achievement">
        <div class="stats-achievement-glow" aria-hidden="true" />

        <p class="font-josefin text-[0.62rem] tracking-[0.35em] text-gold/60 uppercase mb-3">
          {{ marriageAchievement.title }}
        </p>

        <div class="stats-achievement-badge">
          <span class="stats-achievement-icon">{{ marriageAchievement.icon }}</span>
          <h3 class="font-cormorant text-cream" style="font-size:clamp(1.5rem,3vw,1.9rem)">
            {{ marriageAchievement.badge }}
          </h3>
        </div>

        <div class="stats-achievement-reward">
          <p class="font-josefin text-[0.62rem] tracking-[0.2em] text-cream/45 uppercase">
            {{ marriageAchievement.rewardLabel }}
          </p>
          <p class="font-cormorant text-gold/85 mt-1" style="font-size:1.1rem">
            {{ marriageAchievement.reward }}
          </p>
        </div>

        <div class="stats-achievement-shine" aria-hidden="true" />
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  relationshipStatusQuote,
  groomStats,
  todayTargets,
  eventDisclaimer,
  marriageAchievement,
  getDaysTogether,
  formatDaysTogether,
  pickRandomFunFact,
  funFacts,
} from '~/composables/useWeddingStats'

const titleRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const barsVisible = ref(false)
const currentFact = ref(funFacts[0])

const formattedDaysTogether = computed(() =>
  formatDaysTogether(getDaysTogether())
)

const nextFact = () => {
  currentFact.value = pickRandomFunFact(currentFact.value.id)
}

onMounted(async () => {
  if (!process.client) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  if (titleRef.value) {
    gsap.fromTo(titleRef.value,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.value, start: 'top 82%', toggleActions: 'play none none none' },
      }
    )
  }

  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.stats-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.value, start: 'top 80%', toggleActions: 'play none none none' },
      }
    )

    ScrollTrigger.create({
      trigger: gridRef.value,
      start: 'top 75%',
      onEnter: () => { barsVisible.value = true },
      onEnterBack: () => { barsVisible.value = true },
    })
  }
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

.stats-card {
  padding: 1.5rem;
  border-radius: 14px;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.stats-card:hover {
  transform: translateY(-3px);
  border-color: rgba(201, 168, 76, 0.28);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
}

.stats-card--wide {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .stats-card {
    padding: 1.75rem;
  }
}

.stats-card-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.stats-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
  background: rgba(201, 168, 76, 0.1);
  border: 1px solid rgba(201, 168, 76, 0.22);
}

.stats-icon--warning {
  font-size: 1rem;
  color: #f0c674;
}

.stats-mini-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .stats-mini-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .stats-mini-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .stats-mini-item--quote {
    grid-column: span 2;
  }
}

.stats-mini-item {
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.1);
}

.stats-number {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  line-height: 1;
  color: var(--color-gold);
}

.stats-bars {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.stats-bar-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.45rem;
}

.stats-bar-track {
  position: relative;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.stats-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 999px;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.stats-bar-overflow {
  position: absolute;
  top: 0;
  left: 100%;
  height: 100%;
  border-radius: 999px;
  opacity: 0.75;
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
}

.stats-bar-fill--gold {
  background: linear-gradient(90deg, rgba(201, 168, 76, 0.5), var(--color-gold));
}

.stats-bar-fill--rose {
  background: linear-gradient(90deg, rgba(255, 183, 197, 0.45), var(--color-sakura));
}

.stats-bar-fill--sage {
  background: linear-gradient(90deg, rgba(143, 175, 138, 0.45), var(--color-sage));
  animation: stats-pulse 2.4s ease-in-out infinite;
}

.stats-bar-fill--pulse {
  background: linear-gradient(90deg, rgba(201, 168, 76, 0.35), rgba(232, 208, 138, 0.9));
  animation: stats-shimmer 2s linear infinite;
  background-size: 200% 100%;
}

@keyframes stats-pulse {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 1; }
}

@keyframes stats-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.stats-btn {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(201, 168, 76, 0.3);
  background: rgba(201, 168, 76, 0.08);
  color: var(--color-gold);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stats-btn:hover {
  background: rgba(201, 168, 76, 0.16);
  transform: translateY(-1px);
}

.stats-checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.stats-check-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 0.95rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 168, 76, 0.1);
}

.stats-check-box {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 6px;
  border: 1px solid rgba(201, 168, 76, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-sage);
  transition: all 0.3s ease;
}

.stats-check-box--done {
  background: rgba(143, 175, 138, 0.15);
  border-color: rgba(143, 175, 138, 0.45);
  box-shadow: 0 0 12px rgba(143, 175, 138, 0.15);
}

.stats-check-index {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  color: rgba(245, 238, 215, 0.25);
}

.stats-card--warning {
  border-color: rgba(240, 198, 116, 0.22);
  background: linear-gradient(145deg, rgba(240, 198, 116, 0.06), rgba(255, 255, 255, 0.02));
}

.stats-disclaimer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.stats-disclaimer-list li {
  font-family: 'Cormorant Garamond', serif;
  color: rgba(245, 238, 215, 0.68);
  font-size: 1rem;
  padding-left: 1rem;
  position: relative;
}

.stats-disclaimer-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-gold);
}

.stats-card--achievement {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.35);
  background: linear-gradient(160deg, rgba(201, 168, 76, 0.12), rgba(8, 12, 24, 0.95));
  padding: 1.75rem;
}

.stats-achievement-glow {
  position: absolute;
  inset: -30% auto auto 50%;
  width: 220px;
  height: 220px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(201, 168, 76, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

.stats-achievement-badge {
  text-align: center;
  margin: 0.5rem 0 1.25rem;
}

.stats-achievement-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: stats-float 3s ease-in-out infinite;
}

.stats-achievement-reward {
  text-align: center;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px dashed rgba(201, 168, 76, 0.25);
}

.stats-achievement-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.06) 50%, transparent 60%);
  transform: translateX(-120%);
  animation: stats-shine 4.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes stats-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes stats-shine {
  0%, 70%, 100% { transform: translateX(-120%); }
  85% { transform: translateX(120%); }
}

.fact-fade-enter-active,
.fact-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fact-fade-enter-from,
.fact-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
