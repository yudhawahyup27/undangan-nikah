<template>
  <div id="loading-screen" ref="loadingRef">
    <div class="text-center">
      <div class="loading-ring mb-8" />
      <p class="font-josefin text-xs tracking-[0.4em] text-gold/60 uppercase">
        Mempersiapkan Undangan
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loadingRef = ref<HTMLElement | null>(null)
const emit = defineEmits(['done'])

onMounted(async () => {
  await new Promise(r => setTimeout(r, 1800))
  if (loadingRef.value) {
    loadingRef.value.style.opacity = '0'
    await new Promise(r => setTimeout(r, 800))
    loadingRef.value.style.display = 'none'
  }
  emit('done')
})
</script>

<style scoped>
.loading-ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(201,168,76,0.15);
  border-top-color: var(--color-gold);
  animation: spin 1.2s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
