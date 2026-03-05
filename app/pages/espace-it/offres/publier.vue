<script setup lang="ts">
definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Publier une offre | Espace IT REPAE'
})
</script>

<template>
  <div class="space-y-6">
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink to="/espace-it" class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors">
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink to="/espace-it/offres" class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors">
        Offres d'emploi
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Publier</span>
    </nav>

    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700">
      <EspaceItComingSoon
        title="Publier une offre"
        description="Publiez vos offres d'emploi pour les partager avec la communauté alumni ESATIC."
        icon="fa-solid fa-plus-circle"
      />
    </div>
  </div>
</template>
