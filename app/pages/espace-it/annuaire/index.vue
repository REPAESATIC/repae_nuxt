<script setup lang="ts">
import { alumniList, filterAlumni } from '@/data/espace-it/alumni-list'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Annuaire des IT | Espace IT REPAE'
})

// Filters state
const filters = reactive({
  search: '',
  promotion: null as number | null,
  pays: null as string | null,
  disponibilite: null as string | null
})

// Filtered alumni list
const filteredAlumni = computed(() => {
  return filterAlumni(alumniList, filters)
})

// Reset filters
const resetFilters = () => {
  filters.search = ''
  filters.promotion = null
  filters.pays = null
  filters.disponibilite = null
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
      <span class="text-repae-gray-900 dark:text-white">Annuaire des IT</span>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
          <font-awesome-icon icon="fa-solid fa-users" class="text-repae-blue-500" />
          Annuaire des IT
        </h1>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
          Retrouvez et connectez-vous avec les alumni de l'ESATIC
        </p>
      </div>
    </div>

    <!-- Filters -->
    <EspaceItAnnuaireAnnuaireFilters
      :filters="filters"
      :total-results="filteredAlumni.length"
      @update:filters="updateFilters"
      @reset="resetFilters"
    />

    <!-- Alumni Grid -->
    <div
      v-if="filteredAlumni.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <EspaceItAnnuaireAlumniCard
        v-for="alumni in filteredAlumni"
        :key="alumni.id"
        :alumni="alumni"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-users" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun resultat
      </h3>
      <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-4">
        Aucun alumni ne correspond a vos criteres de recherche.
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
