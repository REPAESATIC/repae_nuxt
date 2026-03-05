<script setup lang="ts">
definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Forum d\'entraide | Espace IT REPAE'
})
</script>

<template>
  <div class="space-y-6">
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink to="/espace-it" class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors">
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Forum d'entraide</span>
    </nav>

    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700">
      <EspaceItComingSoon
        title="Forum d'entraide professionnelle"
        description="Posez vos questions techniques ou de carrière et bénéficiez de l'expertise de la communauté alumni."
        icon="fa-solid fa-comments"
      />
    </div>
  </div>
</template>
