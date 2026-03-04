<script setup>

const route = useRoute()
const { track } = useUmami()

watch(() => route.fullPath, () => {
  track('pageview', { url: route.fullPath })
})

// Initialize dark mode at app level
useDarkMode()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Global Toast Notifications -->
    <Toast />
  </div>
</template>
