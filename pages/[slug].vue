<template>
  <InvitationView />
</template>

<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '').trim()

if (!slug) {
  throw createError({ statusCode: 404, statusMessage: 'Tamu tidak ditemukan' })
}

try {
  await $fetch(`/api/guests?slug=${encodeURIComponent(slug)}`)
} catch {
  throw createError({ statusCode: 404, statusMessage: 'Tamu tidak ditemukan' })
}
</script>
