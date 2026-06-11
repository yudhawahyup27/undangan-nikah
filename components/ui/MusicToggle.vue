<template>
  <button
    id="music-toggle"
    @click="toggleMusic"
    :title="isPlaying ? 'Matikan Musik' : 'Putar Musik'"
    aria-label="Toggle music"
  >
    <svg v-if="isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M9 18V5l12-2v13M9 9l12-2"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M9 18V5l12-2v13M9 9l12-2"/>
      <circle cx="6" cy="18" r="3"/>
    </svg>
    <span v-if="isPlaying" class="music-bars">
      <span /><span /><span />
    </span>
  </button>
</template>

<script setup lang="ts">
const { isPlaying, toggleMusic, pauseMusic } = useWeddingMusic()

onUnmounted(() => {
  pauseMusic()
})
</script>

<style scoped>
#music-toggle {
  color: var(--color-gold);
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}
#music-toggle:hover {
  background: rgba(201,168,76,0.18);
}
.music-bars {
  position: absolute;
  bottom: 7px;
  right: 6px;
  display: flex;
  gap: 1.5px;
  align-items: flex-end;
  height: 8px;
}
.music-bars span {
  width: 2px;
  background: var(--color-gold);
  border-radius: 1px;
  animation: bar 0.9s ease infinite;
}
.music-bars span:nth-child(1) { height: 40%; animation-delay: 0s; }
.music-bars span:nth-child(2) { height: 80%; animation-delay: 0.2s; }
.music-bars span:nth-child(3) { height: 50%; animation-delay: 0.4s; }
@keyframes bar {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(2); }
}
</style>
