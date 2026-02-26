<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-8rem)]">
    <div class="text-center max-w-md mx-auto px-6">
      <!-- Icon -->
      <div class="relative mx-auto w-24 h-24 mb-8">
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 animate-pulse" />
        <div class="relative w-full h-full rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/25">
          <font-awesome-icon icon="fa-solid fa-gauge-high" class="text-white text-3xl" />
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
        Tableau de bord
      </h1>

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/20 mb-4">
        <font-awesome-icon icon="fa-solid fa-rocket" class="text-violet-500 text-sm" />
        <span class="text-sm font-semibold font-brand text-violet-600 dark:text-violet-400">
          Bientot disponible
        </span>
      </div>

      <p class="text-repae-gray-500 dark:text-repae-gray-400 text-sm leading-relaxed">
        Le tableau de bord administrateur est en cours de developpement.
        Vous pourrez bientot gerer l'ensemble de la plateforme REPAE depuis cet espace.
      </p>
    </div>
  </div>
</template>
