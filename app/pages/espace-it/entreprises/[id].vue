<script setup lang="ts">
import { entreprisesList } from '~/data/espace-it/entreprises-alumni'

definePageMeta({
  layout: 'espace-it'
})

const route = useRoute()
const entrepriseId = computed(() => route.params.id as string)

// Find entreprise by ID
const entreprise = computed(() => {
  return entreprisesList.find(e => e.id === entrepriseId.value)
})

// Set page title
useSeoMeta({
  title: computed(() =>
    entreprise.value
      ? `${entreprise.value.nom} | Entreprises IT REPAE`
      : 'Entreprise non trouvee | Entreprises IT REPAE'
  )
})
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink
        to="/espace-it"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink
        to="/espace-it/entreprises"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Entreprises des IT
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">
        {{ entreprise ? entreprise.nom : 'Entreprise' }}
      </span>
    </nav>

    <!-- Back Button -->
    <div>
      <NuxtLink
        to="/espace-it/entreprises"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour aux entreprises
      </NuxtLink>
    </div>

    <!-- Entreprise Profile -->
    <EspaceItEntreprisesProfile
      v-if="entreprise"
      :entreprise="entreprise"
    />

    <!-- Not Found -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-building" class="text-2xl text-repae-gray-400" />
      </div>
      <h2 class="text-xl font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Entreprise non trouvee
      </h2>
      <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
        L'entreprise que vous recherchez n'existe pas ou a ete supprimee.
      </p>
      <NuxtLink
        to="/espace-it/entreprises"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour aux entreprises
      </NuxtLink>
    </div>
  </div>
</template>
