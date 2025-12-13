<script setup lang="ts">
import type { PointsTransaction } from '~/data/espace-entreprises/fidelite'

const props = defineProps<{
  historique: PointsTransaction[]
}>()

// Filter state
const filterType = ref<'all' | 'gain' | 'depense'>('all')

const filteredHistorique = computed(() => {
  if (filterType.value === 'all') return props.historique
  return props.historique.filter(h => h.type === filterType.value)
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getCategorieIcon = (categorie: string): string => {
  switch (categorie) {
    case 'recrutement':
      return 'fa-solid fa-user-check'
    case 'publication':
      return 'fa-solid fa-briefcase'
    case 'candidature':
      return 'fa-solid fa-reply'
    case 'evenement':
      return 'fa-solid fa-calendar-check'
    case 'consultation':
      return 'fa-solid fa-eye'
    case 'avantage':
      return 'fa-solid fa-gift'
    default:
      return 'fa-solid fa-circle'
  }
}

const getCategorieColor = (categorie: string): string => {
  switch (categorie) {
    case 'recrutement':
      return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500'
    case 'publication':
      return 'bg-blue-100 dark:bg-blue-500/20 text-blue-500'
    case 'candidature':
      return 'bg-purple-100 dark:bg-purple-500/20 text-purple-500'
    case 'evenement':
      return 'bg-amber-100 dark:bg-amber-500/20 text-amber-500'
    case 'consultation':
      return 'bg-gray-100 dark:bg-gray-500/20 text-gray-500'
    case 'avantage':
      return 'bg-pink-100 dark:bg-pink-500/20 text-pink-500'
    default:
      return 'bg-gray-100 dark:bg-gray-500/20 text-gray-500'
  }
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-clock" class="text-emerald-500" />
        Historique des points
      </h2>

      <!-- Filter -->
      <div class="flex items-center gap-1 bg-gray-100 dark:bg-repae-gray-700 rounded-lg p-1">
        <button
          type="button"
          :class="[
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
            filterType === 'all'
              ? 'bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white shadow-sm'
              : 'text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700'
          ]"
          @click="filterType = 'all'"
        >
          Tous
        </button>
        <button
          type="button"
          :class="[
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
            filterType === 'gain'
              ? 'bg-white dark:bg-repae-gray-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700'
          ]"
          @click="filterType = 'gain'"
        >
          Gains
        </button>
        <button
          type="button"
          :class="[
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
            filterType === 'depense'
              ? 'bg-white dark:bg-repae-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700'
          ]"
          @click="filterType = 'depense'"
        >
          Depenses
        </button>
      </div>
    </div>

    <!-- History list -->
    <div class="space-y-3 max-h-96 overflow-y-auto">
      <div
        v-for="transaction in filteredHistorique"
        :key="transaction.id"
        class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl"
      >
        <!-- Icon -->
        <div
          :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            getCategorieColor(transaction.categorie)
          ]"
        >
          <font-awesome-icon :icon="getCategorieIcon(transaction.categorie)" class="text-sm" />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-repae-gray-900 dark:text-white text-sm truncate">
            {{ transaction.description }}
          </p>
          <p class="text-xs text-repae-gray-400">
            {{ formatDate(transaction.date) }}
          </p>
        </div>

        <!-- Points -->
        <div
          :class="[
            'font-bold text-lg flex-shrink-0',
            transaction.type === 'gain'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-purple-600 dark:text-purple-400'
          ]"
        >
          {{ transaction.type === 'gain' ? '+' : '-' }}{{ transaction.points }}
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="filteredHistorique.length === 0"
        class="text-center py-8"
      >
        <font-awesome-icon
          icon="fa-solid fa-inbox"
          class="text-4xl text-repae-gray-300 dark:text-repae-gray-600 mb-3"
        />
        <p class="text-repae-gray-500 dark:text-repae-gray-400">
          Aucune transaction trouvee
        </p>
      </div>
    </div>
  </div>
</template>
