<script setup lang="ts">
import type { SecteurActivite } from '~/data/espace-it/entreprises-alumni'
import { secteurConfig, villesEntreprises } from '~/data/espace-it/entreprises-alumni'

interface Filters {
  search: string
  secteur: SecteurActivite | null
  ville: string | null
}

const props = defineProps<{
  filters: Filters
  totalResults: number
}>()

const emit = defineEmits<{
  'update:filters': [filters: Filters]
  reset: []
}>()

// Local copies for v-model
const localSearch = ref(props.filters.search)
const localSecteur = ref(props.filters.secteur)
const localVille = ref(props.filters.ville)

// Watch for external changes
watch(() => props.filters, (newFilters) => {
  localSearch.value = newFilters.search
  localSecteur.value = newFilters.secteur
  localVille.value = newFilters.ville
}, { deep: true })

// Emit changes
const updateFilters = () => {
  emit('update:filters', {
    search: localSearch.value,
    secteur: localSecteur.value,
    ville: localVille.value
  })
}

// Watch local changes and emit
watch([localSearch, localSecteur, localVille], () => {
  updateFilters()
})

// Reset filters
const resetFilters = () => {
  localSearch.value = ''
  localSecteur.value = null
  localVille.value = null
  emit('reset')
}

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return localSearch.value || localSecteur.value || localVille.value
})

// Get secteur options
const secteurOptions = Object.entries(secteurConfig).map(([key, value]) => ({
  value: key as SecteurActivite,
  label: value.label
}))
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex flex-col gap-4">
      <!-- Search and filters row -->
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search input -->
        <div class="flex-1">
          <div class="relative">
            <font-awesome-icon
              icon="fa-solid fa-search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
            />
            <input
              v-model="localSearch"
              type="text"
              placeholder="Rechercher une entreprise, un fondateur..."
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <!-- Secteur filter -->
        <div class="w-full lg:w-48">
          <select
            v-model="localSecteur"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option :value="null">Tous les secteurs</option>
            <option
              v-for="option in secteurOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Ville filter -->
        <div class="w-full lg:w-40">
          <select
            v-model="localVille"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option :value="null">Toutes les villes</option>
            <option
              v-for="ville in villesEntreprises"
              :key="ville"
              :value="ville"
            >
              {{ ville }}
            </option>
          </select>
        </div>
      </div>

      <!-- Results count and reset -->
      <div class="flex items-center justify-between">
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
          <span class="font-semibold text-repae-gray-900 dark:text-white">{{ totalResults }}</span>
          entreprise{{ totalResults > 1 ? 's' : '' }} trouvee{{ totalResults > 1 ? 's' : '' }}
        </p>

        <button
          v-if="hasActiveFilters"
          class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium flex items-center gap-1.5 cursor-pointer"
          @click="resetFilters"
        >
          <font-awesome-icon icon="fa-solid fa-times" />
          Reinitialiser
        </button>
      </div>

      <!-- Active filters tags -->
      <div
        v-if="hasActiveFilters"
        class="flex flex-wrap gap-2"
      >
        <span
          v-if="localSearch"
          class="inline-flex items-center gap-1.5 px-3 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-sm rounded-lg"
        >
          <font-awesome-icon icon="fa-solid fa-search" class="text-xs" />
          "{{ localSearch }}"
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="localSearch = ''"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-xs" />
          </button>
        </span>

        <span
          v-if="localSecteur"
          class="inline-flex items-center gap-1.5 px-3 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-sm rounded-lg"
        >
          <font-awesome-icon :icon="secteurConfig[localSecteur].icon" class="text-xs" />
          {{ secteurConfig[localSecteur].label }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="localSecteur = null"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-xs" />
          </button>
        </span>

        <span
          v-if="localVille"
          class="inline-flex items-center gap-1.5 px-3 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-sm rounded-lg"
        >
          <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-xs" />
          {{ localVille }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="localVille = null"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-xs" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
