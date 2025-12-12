<script setup lang="ts">
import type { TypeContrat, NiveauExperience, ModeRemote } from '~/data/espace-it/offres'
import {
  contratConfig,
  experienceConfig,
  remoteConfig,
  offresList,
  getVillesUniques
} from '~/data/espace-it/offres'

interface Filters {
  search: string
  type_contrat: TypeContrat | null
  niveau_experience: NiveauExperience | null
  mode_remote: ModeRemote | null
  ville: string | null
}

const props = defineProps<{
  filters: Filters
  totalResults: number
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: Filters): void
  (e: 'reset'): void
}>()

// Liste des villes uniques
const villes = computed(() => getVillesUniques(offresList))

// Types de contrat pour le select
const typesContrat = Object.entries(contratConfig).map(([value, config]) => ({
  value: value as TypeContrat,
  label: config.label
}))

// Niveaux d'experience pour le select
const niveauxExperience = Object.entries(experienceConfig).map(([value, config]) => ({
  value: value as NiveauExperience,
  label: `${config.label} (${config.annees})`
}))

// Modes remote pour le select
const modesRemote = Object.entries(remoteConfig).map(([value, config]) => ({
  value: value as ModeRemote,
  label: config.label
}))

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return props.filters.search ||
    props.filters.type_contrat ||
    props.filters.niveau_experience ||
    props.filters.mode_remote ||
    props.filters.ville
})

// Update individual filter
const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
  emit('update:filters', { ...props.filters, [key]: value })
}

// Remove single filter
const removeFilter = (key: keyof Filters) => {
  const newFilters = { ...props.filters }
  if (key === 'search') {
    newFilters.search = ''
  } else {
    newFilters[key] = null
  }
  emit('update:filters', newFilters)
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-5">
    <!-- Filters grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Search -->
      <div class="lg:col-span-2">
        <label class="block text-xs font-medium font-brand text-repae-gray-600 dark:text-repae-gray-400 mb-1.5">
          Rechercher
        </label>
        <div class="relative">
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
          />
          <input
            type="text"
            :value="filters.search"
            placeholder="Titre, entreprise, competence..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
            @input="updateFilter('search', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <!-- Type de contrat -->
      <div>
        <label class="block text-xs font-medium font-brand text-repae-gray-600 dark:text-repae-gray-400 mb-1.5">
          Type de contrat
        </label>
        <select
          :value="filters.type_contrat || ''"
          class="w-full px-3 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none"
          @change="updateFilter('type_contrat', ($event.target as HTMLSelectElement).value as TypeContrat || null)"
        >
          <option value="">Tous les contrats</option>
          <option v-for="type in typesContrat" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>

      <!-- Niveau d'experience -->
      <div>
        <label class="block text-xs font-medium font-brand text-repae-gray-600 dark:text-repae-gray-400 mb-1.5">
          Experience
        </label>
        <select
          :value="filters.niveau_experience || ''"
          class="w-full px-3 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none"
          @change="updateFilter('niveau_experience', ($event.target as HTMLSelectElement).value as NiveauExperience || null)"
        >
          <option value="">Tous niveaux</option>
          <option v-for="niveau in niveauxExperience" :key="niveau.value" :value="niveau.value">
            {{ niveau.label }}
          </option>
        </select>
      </div>

      <!-- Ville -->
      <div>
        <label class="block text-xs font-medium font-brand text-repae-gray-600 dark:text-repae-gray-400 mb-1.5">
          Ville
        </label>
        <select
          :value="filters.ville || ''"
          class="w-full px-3 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none"
          @change="updateFilter('ville', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">Toutes les villes</option>
          <option v-for="ville in villes" :key="ville" :value="ville">
            {{ ville }}
          </option>
        </select>
      </div>
    </div>

    <!-- Second row: Remote filter + Results count + Active filters -->
    <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <!-- Mode Remote filter (compact) -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium font-brand text-repae-gray-600 dark:text-repae-gray-400">
            Mode :
          </span>
          <div class="flex gap-1">
            <button
              :class="[
                'px-3 py-1.5 text-xs font-medium font-brand rounded-lg transition-colors cursor-pointer',
                !filters.mode_remote
                  ? 'bg-repae-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-200 dark:hover:bg-repae-gray-600'
              ]"
              @click="updateFilter('mode_remote', null)"
            >
              Tous
            </button>
            <button
              v-for="mode in modesRemote"
              :key="mode.value"
              :class="[
                'px-3 py-1.5 text-xs font-medium font-brand rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
                filters.mode_remote === mode.value
                  ? 'bg-repae-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-200 dark:hover:bg-repae-gray-600'
              ]"
              @click="updateFilter('mode_remote', mode.value)"
            >
              {{ mode.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Results count -->
      <div class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        <span class="font-semibold text-repae-gray-900 dark:text-white">{{ totalResults }}</span>
        offre(s) trouvee(s)
      </div>
    </div>

    <!-- Active filters -->
    <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-100 dark:border-repae-gray-700">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand">
          Filtres actifs :
        </span>

        <!-- Search tag -->
        <span
          v-if="filters.search"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon icon="fa-solid fa-search" class="text-xs" />
          "{{ filters.search }}"
          <button
            class="hover:text-repae-blue-800 dark:hover:text-repae-blue-300 cursor-pointer"
            @click="removeFilter('search')"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </span>

        <!-- Type contrat tag -->
        <span
          v-if="filters.type_contrat"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon icon="fa-solid fa-file-contract" class="text-xs" />
          {{ contratConfig[filters.type_contrat].label }}
          <button
            class="hover:text-repae-blue-800 dark:hover:text-repae-blue-300 cursor-pointer"
            @click="removeFilter('type_contrat')"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </span>

        <!-- Experience tag -->
        <span
          v-if="filters.niveau_experience"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon icon="fa-solid fa-chart-line" class="text-xs" />
          {{ experienceConfig[filters.niveau_experience].label }}
          <button
            class="hover:text-repae-blue-800 dark:hover:text-repae-blue-300 cursor-pointer"
            @click="removeFilter('niveau_experience')"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </span>

        <!-- Mode remote tag -->
        <span
          v-if="filters.mode_remote"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon :icon="remoteConfig[filters.mode_remote].icon" class="text-xs" />
          {{ remoteConfig[filters.mode_remote].label }}
          <button
            class="hover:text-repae-blue-800 dark:hover:text-repae-blue-300 cursor-pointer"
            @click="removeFilter('mode_remote')"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </span>

        <!-- Ville tag -->
        <span
          v-if="filters.ville"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon icon="fa-solid fa-location-dot" class="text-xs" />
          {{ filters.ville }}
          <button
            class="hover:text-repae-blue-800 dark:hover:text-repae-blue-300 cursor-pointer"
            @click="removeFilter('ville')"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </span>

        <!-- Reset all -->
        <button
          class="text-xs text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 font-brand cursor-pointer underline"
          @click="emit('reset')"
        >
          Tout effacer
        </button>
      </div>
    </div>
  </div>
</template>
