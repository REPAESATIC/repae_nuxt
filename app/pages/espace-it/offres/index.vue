<script setup lang="ts">
import type { TypeContrat, NiveauExperience, ModeRemote } from '~/data/espace-it/offres'
import { offresList, filterOffres } from '~/data/espace-it/offres'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Offres d\'emploi | Espace IT REPAE'
})

// Filters state
const filters = reactive({
  search: '',
  type_contrat: null as TypeContrat | null,
  niveau_experience: null as NiveauExperience | null,
  mode_remote: null as ModeRemote | null,
  ville: null as string | null
})

// Filtered offres list
const filteredOffres = computed(() => {
  return filterOffres(offresList, filters)
})

// Reset filters
const resetFilters = () => {
  filters.search = ''
  filters.type_contrat = null
  filters.niveau_experience = null
  filters.mode_remote = null
  filters.ville = null
}

// Update filters
const updateFilters = (newFilters: typeof filters) => {
  Object.assign(filters, newFilters)
}
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
      <span class="text-repae-gray-900 dark:text-white">Offres d'emploi</span>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
          <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
          Offres d'emploi
        </h1>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
          Decouvrez les opportunites professionnelles partagees par la communaute IT
        </p>
      </div>

      <!-- CTA Publier -->
      <NuxtLink
        to="/espace-it/offres/publier"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-plus-circle" />
        Publier une offre
      </NuxtLink>
    </div>

    <!-- Filters -->
    <EspaceItOffresFilters
      :filters="filters"
      :total-results="filteredOffres.length"
      @update:filters="updateFilters"
      @reset="resetFilters"
    />

    <!-- Offres Grid -->
    <div
      v-if="filteredOffres.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      <EspaceItOffresCard
        v-for="offre in filteredOffres"
        :key="offre.id"
        :offre="offre"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun resultat
      </h3>
      <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-4">
        Aucune offre ne correspond a vos criteres de recherche.
      </p>
      <button
        class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer"
        @click="resetFilters"
      >
        Reinitialiser les filtres
      </button>
    </div>
  </div>
</template>
