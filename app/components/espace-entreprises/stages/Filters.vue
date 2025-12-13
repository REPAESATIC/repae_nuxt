<script setup lang="ts">
import type { StatutStage, NiveauEtudes } from '~/data/espace-entreprises/offres-stages'
import { statutStageConfig, niveauEtudesConfig, dureesOptions, stagesStats } from '~/data/espace-entreprises/offres-stages'

const props = defineProps<{
  selectedStatut: StatutStage | 'all'
  selectedDuree: number | 'all'
  selectedNiveau: NiveauEtudes | 'all'
  searchQuery: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedStatut', value: StatutStage | 'all'): void
  (e: 'update:selectedDuree', value: number | 'all'): void
  (e: 'update:selectedNiveau', value: NiveauEtudes | 'all'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'reset'): void
}>()

// Status tabs
const statusTabs = computed(() => [
  { value: 'all', label: 'Tous', count: stagesStats.total },
  { value: 'publiee', label: 'Publies', count: stagesStats.publiees },
  { value: 'brouillon', label: 'Brouillons', count: stagesStats.brouillons },
  { value: 'pourvue', label: 'Pourvus', count: stagesStats.pourvues },
  { value: 'expiree', label: 'Expires', count: stagesStats.expirees }
])

const hasActiveFilters = computed(() => {
  return props.selectedDuree !== 'all' || props.selectedNiveau !== 'all' || props.searchQuery !== ''
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 space-y-4">
    <!-- Status tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2">
      <button
        v-for="tab in statusTabs"
        :key="tab.value"
        type="button"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium font-brand whitespace-nowrap transition-colors cursor-pointer',
          selectedStatut === tab.value
            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
            : 'text-repae-gray-500 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700'
        ]"
        @click="emit('update:selectedStatut', tab.value as StatutStage | 'all')"
      >
        {{ tab.label }}
        <span
          :class="[
            'ml-1.5 px-1.5 py-0.5 rounded-full text-xs',
            selectedStatut === tab.value
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400'
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Filters row -->
    <div class="flex flex-col md:flex-row md:items-center gap-4">
      <!-- Duree filter -->
      <div class="md:w-40">
        <select
          :value="selectedDuree"
          class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
          @change="emit('update:selectedDuree', ($event.target as HTMLSelectElement).value === 'all' ? 'all' : Number(($event.target as HTMLSelectElement).value))"
        >
          <option value="all">Toutes durees</option>
          <option v-for="duree in dureesOptions" :key="duree.value" :value="duree.value">
            {{ duree.label }}
          </option>
        </select>
      </div>

      <!-- Niveau filter -->
      <div class="md:w-48">
        <select
          :value="selectedNiveau"
          class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
          @change="emit('update:selectedNiveau', ($event.target as HTMLSelectElement).value as NiveauEtudes | 'all')"
        >
          <option value="all">Tous niveaux</option>
          <option v-for="(config, key) in niveauEtudesConfig" :key="key" :value="key">
            {{ config.label }}
          </option>
        </select>
      </div>

      <!-- Search -->
      <div class="flex-1 relative">
        <font-awesome-icon
          icon="fa-solid fa-search"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
        />
        <input
          :value="searchQuery"
          type="text"
          placeholder="Rechercher un stage..."
          class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Reset button -->
      <button
        v-if="hasActiveFilters"
        type="button"
        class="px-4 py-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 font-medium font-brand transition-colors cursor-pointer flex items-center gap-2"
        @click="emit('reset')"
      >
        <font-awesome-icon icon="fa-solid fa-times" />
        Reinitialiser
      </button>
    </div>
  </div>
</template>
