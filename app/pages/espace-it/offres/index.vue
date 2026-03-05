<script setup lang="ts">
definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Offres d\'emploi | Espace IT REPAE'
})
</script>

<template>
  <div class="space-y-6">
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink to="/espace-it" class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors">
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Offres d'emploi</span>
    </nav>

    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700">
      <EspaceItComingSoon
        title="Offres d'emploi"
        description="Consultez et postulez aux offres d'emploi publiées par les alumni et entreprises partenaires."
        icon="fa-solid fa-briefcase"
      />
    </div>
  </div>
</template>
