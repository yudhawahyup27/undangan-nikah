<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const slug = route.query.slug
  const code = route.query.code
  const to = route.query.to

  if (typeof slug === 'string' && slug.trim()) {
    await router.replace(`/${slug.trim()}`)
    return
  }

  if (typeof code === 'string' && code.trim()) {
    try {
      const guest = await $fetch<{ slug: string }>(`/api/guests?code=${encodeURIComponent(code.trim())}`)
      await router.replace(`/${guest.slug}`)
      return
    } catch {}
  }

  if (typeof to === 'string' && to.trim()) {
    try {
      const guest = await $fetch<{ slug: string }>(`/api/guests?to=${encodeURIComponent(to.trim())}`)
      await router.replace(`/${guest.slug}`)
      return
    } catch {}
  }

  await router.replace('/')
})
</script>
