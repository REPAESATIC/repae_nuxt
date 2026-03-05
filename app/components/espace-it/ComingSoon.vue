<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  icon?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-6">
    <div class="w-20 h-20 rounded-2xl bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center mb-6">
      <font-awesome-icon
        :icon="icon || 'fa-solid fa-rocket'"
        class="text-3xl text-repae-blue-500"
      />
    </div>
    <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2 text-center">
      {{ title }}
    </h2>
    <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand text-center max-w-md mb-6">
      {{ description || 'Cette fonctionnalité est en cours de développement et sera disponible prochainement.' }}
    </p>
    <div class="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium font-brand">
      <font-awesome-icon icon="fa-solid fa-clock" />
      Bientôt disponible
    </div>
  </div>
</template>
