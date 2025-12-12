<script setup>
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
