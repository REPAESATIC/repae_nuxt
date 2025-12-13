<script setup lang="ts">
import type { Avantage, CategorieAvantage } from '~/data/espace-entreprises/avantages-fidelite'
import type { BadgeNiveau } from '~/data/espace-entreprises/fidelite'
import { avantagesList, categoriesConfig } from '~/data/espace-entreprises/avantages-fidelite'

const props = defineProps<{
  badgeActuel: BadgeNiveau
  pointsActuels: number
}>()

const emit = defineEmits<{
  (e: 'redeem', avantage: Avantage): void
}>()

// Filter state
const selectedCategorie = ref<CategorieAvantage | 'all'>('all')
const showOnlyAffordable = ref(false)

const filteredAvantages = computed(() => {
  let result = [...avantagesList]

  // Filter by category
  if (selectedCategorie.value !== 'all') {
    result = result.filter(a => a.categorie === selectedCategorie.value)
  }

  // Filter by affordability
  if (showOnlyAffordable.value) {
    result = result.filter(a => a.cout_points <= props.pointsActuels)
  }

  return result
})

const categories: { value: CategorieAvantage | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'visibilite', label: 'Visibilite' },
  { value: 'recrutement', label: 'Recrutement' },
  { value: 'evenement', label: 'Evenements' },
  { value: 'support', label: 'Support' },
  { value: 'exclusif', label: 'Exclusif' }
]
</script>

<template>
  <div>
    <!-- Filters -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Category filter -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            v-for="cat in categories"
            :key="cat.value"
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer',
              selectedCategorie === cat.value
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600'
            ]"
            @click="selectedCategorie = cat.value"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Affordable filter -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="showOnlyAffordable"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
          />
          <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
            Afficher uniquement les avantages accessibles
          </span>
        </label>
      </div>
    </div>

    <!-- Results count -->
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        {{ filteredAvantages.length }} avantage{{ filteredAvantages.length > 1 ? 's' : '' }} disponible{{ filteredAvantages.length > 1 ? 's' : '' }}
      </p>
      <div class="flex items-center gap-2 text-sm">
        <font-awesome-icon icon="fa-solid fa-coins" class="text-yellow-500" />
        <span class="font-medium text-repae-gray-900 dark:text-white">{{ pointsActuels }}</span>
        <span class="text-repae-gray-400">points disponibles</span>
      </div>
    </div>

    <!-- Advantages grid -->
    <div v-if="filteredAvantages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EspaceEntreprisesFideliteAvantageCard
        v-for="avantage in filteredAvantages"
        :key="avantage.id"
        :avantage="avantage"
        :badge-actuel="badgeActuel"
        :points-actuels="pointsActuels"
        @redeem="emit('redeem', $event)"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-12 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-gift" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun avantage trouve
      </h3>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-4">
        Essayez de modifier vos criteres de filtre.
      </p>
      <button
        type="button"
        class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
        @click="selectedCategorie = 'all'; showOnlyAffordable = false"
      >
        Reinitialiser les filtres
      </button>
    </div>
  </div>
</template>
