<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-8rem)]">
    <div class="text-center max-w-md mx-auto px-6">
      <div class="relative mx-auto w-24 h-24 mb-8">
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-repae-blue-500/20 to-repae-blue-600/20 animate-pulse" />
        <div class="relative w-full h-full rounded-2xl bg-gradient-to-br from-repae-blue-500 to-repae-blue-700 flex items-center justify-center shadow-2xl shadow-repae-blue-500/25">
          <font-awesome-icon icon="fa-solid fa-bell" class="text-white text-3xl" />
        </div>
      </div>
      <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
        Notifications
      </h1>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 border border-repae-blue-200 dark:border-repae-blue-500/20 mb-4">
        <font-awesome-icon icon="fa-solid fa-rocket" class="text-repae-blue-500 text-sm" />
        <span class="text-sm font-semibold font-brand text-repae-blue-600 dark:text-repae-blue-400">
          Bientôt disponible
        </span>
      </div>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 text-sm leading-relaxed">
        Envoyez et gérez les notifications aux utilisateurs de la plateforme.
      </p>
    </div>
  </div>
</template>
