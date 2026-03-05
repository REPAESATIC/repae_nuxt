<script setup lang="ts">
definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Entreprise | Espace IT REPAE'
})
</script>

<template>
  <div class="space-y-6">
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink to="/espace-it" class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors">
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink to="/espace-it/entreprises" class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors">
        Entreprises des IT
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Détail</span>
    </nav>

    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700">
      <EspaceItComingSoon
        title="Entreprises des IT"
        description="Découvrez les entreprises créées et dirigées par les alumni de l'ESATIC."
        icon="fa-solid fa-building"
      />
    </div>
  </div>
</template>
