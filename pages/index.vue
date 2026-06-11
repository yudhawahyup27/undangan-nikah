<template>
  <div />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  router.replace({ path: '/undangan', query: { to: 'Tamu Undangan' } })
})
</script>
