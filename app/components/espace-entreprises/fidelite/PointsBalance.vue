<script setup lang="ts">
import { pointsGainsConfig } from '~/data/espace-entreprises/fidelite'

const props = defineProps<{
  pointsActuels: number
  totalGagnes: number
  totalDepenses: number
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-coins" class="text-yellow-500" />
      Solde de points
    </h2>

    <!-- Points cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Current balance -->
      <div class="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/30">
        <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Solde actuel</p>
        <p class="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
          {{ pointsActuels.toLocaleString() }}
        </p>
        <p class="text-xs text-emerald-500 dark:text-emerald-400">points disponibles</p>
      </div>

      <!-- Total gained -->
      <div class="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/30">
        <p class="text-sm text-blue-600 dark:text-blue-400 mb-1">Total gagne</p>
        <p class="text-3xl font-bold text-blue-700 dark:text-blue-300">
          +{{ totalGagnes.toLocaleString() }}
        </p>
        <p class="text-xs text-blue-500 dark:text-blue-400">depuis l'inscription</p>
      </div>

      <!-- Total spent -->
      <div class="p-4 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-200 dark:border-purple-500/30">
        <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">Total utilise</p>
        <p class="text-3xl font-bold text-purple-700 dark:text-purple-300">
          -{{ totalDepenses.toLocaleString() }}
        </p>
        <p class="text-xs text-purple-500 dark:text-purple-400">en avantages</p>
      </div>
    </div>

    <!-- How to earn points -->
    <div class="pt-4 border-t border-gray-200 dark:border-repae-gray-700">
      <h3 class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-4">
        Comment gagner des points ?
      </h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div
          v-for="gain in pointsGainsConfig"
          :key="gain.action"
          class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-lg"
        >
          <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <font-awesome-icon :icon="gain.icon" class="text-emerald-500 text-sm" />
          </div>
          <div class="min-w-0">
            <p class="text-xs text-repae-gray-600 dark:text-repae-gray-400 truncate">
              {{ gain.action }}
            </p>
            <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              +{{ gain.points }} pts
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
