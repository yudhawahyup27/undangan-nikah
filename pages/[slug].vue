<template>
  <InvitationView v-if="!showNotFound" />
</template>

<script setup lang="ts">
const { guest, guestSlug, pending } = useGuest()

const showNotFound = computed(() =>
  Boolean(guestSlug.value && !pending.value && !guest.value)
)

watch(showNotFound, (notFound) => {
  if (notFound) {
    showError({
      statusCode: 404,
      statusMessage: 'Tamu tidak ditemukan',
    })
  }
}, { immediate: true })
</script>
