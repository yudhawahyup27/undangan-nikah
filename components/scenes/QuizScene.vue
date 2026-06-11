<template>
  <section id="quiz-scene" class="scene quiz-scene relative py-32 px-4 md:px-8">
    <canvas ref="confettiCanvas" class="quiz-confetti" aria-hidden="true" />

    <div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.05) 0%, transparent 55%)" />

    <div ref="titleRef" class="text-center mb-10 relative w-full max-w-2xl mx-auto" style="z-index:2">
      <p class="font-josefin text-xs tracking-[0.5em] text-gold/50 uppercase mb-4">Mini Game</p>
      <h2 class="font-cormorant font-light text-cream" style="font-size:clamp(2rem,5vw,3.5rem)">
        Tebak <em class="text-gold/80">Pengantin</em>
      </h2>
      <p class="font-cormorant text-cream/50 mt-4" style="font-size:clamp(1rem,2.5vw,1.15rem); line-height:1.7">
        {{ QUIZ_ROUND_SIZE }} pertanyaan acak dari {{ quizQuestionPool.length }} soal tentang {{ BRIDE_NAME }} &amp; {{ GROOM_NAME }}
      </p>
      <div class="section-divider mt-6" />
    </div>

    <div ref="cardRef" class="quiz-card glass-card w-full max-w-xl mx-auto relative" style="z-index:2">
      <!-- Start -->
      <div v-if="phase === 'start'" class="quiz-panel text-center">
        <p class="text-4xl mb-6">🎮</p>
        <h3 class="font-cormorant text-cream mb-3" style="font-size:1.6rem">Seberapa kenal kamu?</h3>
        <p class="font-cormorant text-cream/55 mb-8" style="line-height:1.8">
          Setiap tamu dapat soal berbeda — acak setiap kali main. Skor langsung ke-update!
        </p>
        <button type="button" class="btn-primary" @click="startGame">Mulai Main</button>
      </div>

      <!-- Question -->
      <div v-else-if="phase === 'question'" class="quiz-panel">
        <div class="quiz-progress-wrap mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="font-josefin text-xs tracking-[0.25em] text-gold/60 uppercase">
              Soal {{ currentIndex + 1 }} / {{ totalQuestions }}
            </span>
            <span class="font-josefin text-xs tracking-[0.2em] text-cream/50">
              Skor: {{ score }}
            </span>
          </div>
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" :style="{ width: `${progressPercent}%` }" />
          </div>
        </div>

        <Transition :name="transitionName" mode="out-in">
          <div v-if="currentQuestion" :key="currentQuestion.id" class="quiz-question-body">
            <p class="font-cormorant text-cream mb-6" style="font-size:clamp(1.2rem,3vw,1.45rem); line-height:1.6">
              {{ currentQuestion.text }}
            </p>

            <div class="space-y-3">
              <button
                v-for="option in options"
                :key="option.id"
                type="button"
                class="quiz-option"
                :class="optionClass(option.id)"
                :disabled="!!selectedAnswer"
                @click="selectAnswer(option.id)"
              >
                <span class="quiz-option-label">{{ option.label }}</span>
                <span v-if="showFeedback && option.id === currentQuestion.correct" class="quiz-option-badge">Benar</span>
              </button>
            </div>

            <Transition name="fade-up">
              <div v-if="showFeedback" class="quiz-feedback mt-6">
                <p
                  class="font-josefin text-xs tracking-[0.2em] uppercase mb-2"
                  :class="lastPickCorrect ? 'text-sage' : 'text-sakura'"
                >
                  {{ lastPickCorrect ? '✓ Tepat!' : '✗ Hampir!' }}
                </p>
                <p class="font-cormorant text-cream/70" style="line-height:1.7">
                  Jawaban benar: <strong class="text-gold/80">{{ answerLabel(currentQuestion.correct) }}</strong>
                </p>
                <p class="font-cormorant text-cream/45 mt-2 italic" style="font-size:0.95rem">
                  {{ currentQuestion.hint }}
                </p>
                <button type="button" class="btn-primary w-full mt-6" @click="goNext">
                  {{ isLastQuestion ? 'Lihat Hasil' : 'Soal Berikutnya' }}
                </button>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>

      <!-- Result -->
      <div v-else class="quiz-panel text-center">
        <p class="text-4xl mb-4">{{ score === totalQuestions ? '🎉' : score >= 3 ? '😊' : '😆' }}</p>
        <p class="font-josefin text-xs tracking-[0.3em] text-gold/60 uppercase mb-3">Hasil Akhir</p>
        <h3 class="font-cormorant text-cream mb-2" style="font-size:2rem">{{ score }} / {{ totalQuestions }}</h3>
        <p class="font-cormorant text-cream/75 mb-8" style="font-size:clamp(1.05rem,2.5vw,1.25rem); line-height:1.7">
          {{ resultMessage }}
        </p>
        <button type="button" class="btn-primary" @click="restartGame">Main Lagi</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  pickRandomQuestions,
  quizQuestionPool,
  QUIZ_ROUND_SIZE,
  getResultMessage,
  answerLabel,
  BRIDE_NAME,
  GROOM_NAME,
  GROOM_LABEL,
  BRIDE_LABEL,
  type QuizAnswer,
  type QuizQuestion,
} from '~/composables/useQuizGame'

type Phase = 'start' | 'question' | 'result'

const titleRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const confettiCanvas = ref<HTMLCanvasElement | null>(null)

const phase = ref<Phase>('start')
const activeQuestions = ref<QuizQuestion[]>([])
const currentIndex = ref(0)
const score = ref(0)
const selectedAnswer = ref<QuizAnswer | null>(null)
const showFeedback = ref(false)
const lastPickCorrect = ref(false)
const transitionName = ref('quiz-slide')

const totalQuestions = computed(() => activeQuestions.value.length || QUIZ_ROUND_SIZE)
const currentQuestion = computed(() => activeQuestions.value[currentIndex.value])
const progressPercent = computed(() => {
  if (!totalQuestions.value) return 0
  return ((currentIndex.value + (showFeedback.value ? 1 : 0)) / totalQuestions.value) * 100
})
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
const resultMessage = computed(() => getResultMessage(score.value, totalQuestions.value))

const options = [
  { id: 'pria' as QuizAnswer, label: GROOM_LABEL },
  { id: 'wanita' as QuizAnswer, label: BRIDE_LABEL },
]

let confettiFrame = 0
let confettiPieces: Array<{
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  spin: number
}> = []

const optionClass = (id: QuizAnswer) => {
  const question = currentQuestion.value
  if (!question) return ''

  if (!showFeedback.value || !selectedAnswer.value) {
    return selectedAnswer.value === id ? 'is-selected' : ''
  }

  if (id === question.correct) return 'is-correct'
  if (id === selectedAnswer.value) return 'is-wrong'
  return 'is-dimmed'
}

const resetRound = () => {
  selectedAnswer.value = null
  showFeedback.value = false
  lastPickCorrect.value = false
}

const startGame = () => {
  activeQuestions.value = pickRandomQuestions()
  phase.value = 'question'
  currentIndex.value = 0
  score.value = 0
  resetRound()
}

const restartGame = () => {
  stopConfetti()
  phase.value = 'start'
  activeQuestions.value = []
  currentIndex.value = 0
  score.value = 0
  resetRound()
}

const selectAnswer = async (answer: QuizAnswer) => {
  if (selectedAnswer.value || !currentQuestion.value) return

  selectedAnswer.value = answer
  lastPickCorrect.value = answer === currentQuestion.value.correct
  if (lastPickCorrect.value) score.value += 1

  await new Promise(r => setTimeout(r, 120))
  showFeedback.value = true
}

const goNext = () => {
  if (isLastQuestion.value) {
    phase.value = 'result'
    if (score.value === totalQuestions.value) launchConfetti()
    return
  }

  transitionName.value = 'quiz-slide'
  resetRound()
  currentIndex.value += 1
}

const launchConfetti = () => {
  const canvas = confettiCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#C9A84C', '#E8D08A', '#FFB7C5', '#F5EED7', '#8FAF8A']
  confettiPieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 4,
    vy: 2 + Math.random() * 4,
    size: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 8,
  }))

  const tick = () => {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    confettiPieces = confettiPieces.filter(piece => piece.y < canvas.height + 20)
    confettiPieces.forEach(piece => {
      piece.x += piece.vx
      piece.y += piece.vy
      piece.vy += 0.05
      piece.rotation += piece.spin

      ctx.save()
      ctx.translate(piece.x, piece.y)
      ctx.rotate((piece.rotation * Math.PI) / 180)
      ctx.fillStyle = piece.color
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6)
      ctx.restore()
    })

    if (confettiPieces.length > 0) {
      confettiFrame = requestAnimationFrame(tick)
    }
  }

  cancelAnimationFrame(confettiFrame)
  confettiFrame = requestAnimationFrame(tick)
}

const stopConfetti = () => {
  cancelAnimationFrame(confettiFrame)
  confettiPieces = []
  const canvas = confettiCanvas.value
  const ctx = canvas?.getContext('2d')
  if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
}

onMounted(async () => {
  if (!process.client) return

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

  if (cardRef.value) {
    gsap.fromTo(cardRef.value,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  }
})

onUnmounted(() => {
  stopConfetti()
})
</script>

<style scoped>
.quiz-scene {
  min-height: auto;
  justify-content: flex-start;
  overflow: visible;
}

.quiz-card {
  border-radius: 16px;
  overflow: hidden;
}

.quiz-panel {
  padding: 1.75rem;
}

@media (min-width: 768px) {
  .quiz-panel {
    padding: 2.25rem;
  }
}

.quiz-progress-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(201, 168, 76, 0.12);
  overflow: hidden;
}

.quiz-progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
  transition: width 0.45s ease;
}

.quiz-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.22);
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-cream);
  text-align: left;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, opacity 0.25s ease;
}

.quiz-option:hover:not(:disabled) {
  border-color: rgba(201, 168, 76, 0.45);
  background: rgba(201, 168, 76, 0.08);
  transform: translateY(-1px);
}

.quiz-option:disabled {
  cursor: default;
}

.quiz-option-label {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quiz-option-badge {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.quiz-option.is-selected {
  border-color: rgba(201, 168, 76, 0.5);
  background: rgba(201, 168, 76, 0.1);
}

.quiz-option.is-correct {
  border-color: rgba(143, 175, 138, 0.7);
  background: rgba(143, 175, 138, 0.12);
  animation: quiz-pop 0.45s ease;
}

.quiz-option.is-wrong {
  border-color: rgba(255, 183, 197, 0.55);
  background: rgba(255, 183, 197, 0.08);
  animation: quiz-shake 0.45s ease;
}

.quiz-option.is-dimmed {
  opacity: 0.45;
}

.quiz-feedback {
  border-top: 1px solid rgba(201, 168, 76, 0.12);
  padding-top: 1.25rem;
}

.quiz-confetti {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
}

.text-sage {
  color: var(--color-sage);
}

.text-sakura {
  color: var(--color-sakura);
}

.quiz-slide-enter-active,
.quiz-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.quiz-slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.quiz-slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@keyframes quiz-pop {
  0% { transform: scale(0.98); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

@keyframes quiz-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
</style>
