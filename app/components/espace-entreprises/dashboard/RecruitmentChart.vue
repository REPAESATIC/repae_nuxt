<script setup lang="ts">
import { monthlyStats } from '@/data/espace-entreprises/recent-candidatures'

// Calculate max value for scaling
const maxCandidatures = computed(() =>
  Math.max(...monthlyStats.map(s => s.candidatures))
)

// Calculate bar height percentage
const getBarHeight = (value: number) => {
  return (value / maxCandidatures.value) * 100
}

// Total candidatures
const totalCandidatures = computed(() =>
  monthlyStats.reduce((sum, s) => sum + s.candidatures, 0)
)

// Trend vs previous period
const trend = computed(() => {
  const current = monthlyStats[monthlyStats.length - 1].candidatures
  const previous = monthlyStats[monthlyStats.length - 2].candidatures
  const diff = ((current - previous) / previous) * 100
  return {
    value: Math.abs(Math.round(diff)),
    isUp: diff > 0
  }
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
          Activite de recrutement
        </h3>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          Evolution sur 6 mois
        </p>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ totalCandidatures }}
        </p>
        <div class="flex items-center gap-1 justify-end">
          <font-awesome-icon
            :icon="trend.isUp ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'"
            :class="trend.isUp ? 'text-emerald-500' : 'text-red-500'"
            class="text-xs"
          />
          <span
            :class="[
              'text-xs font-medium',
              trend.isUp ? 'text-emerald-500' : 'text-red-500'
            ]"
          >
            {{ trend.value }}%
          </span>
          <span class="text-xs text-repae-gray-400">vs mois dernier</span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="flex items-end justify-between gap-2 h-32">
      <div
        v-for="(stat, index) in monthlyStats"
        :key="stat.mois"
        class="flex-1 flex flex-col items-center gap-2"
      >
        <!-- Bar -->
        <div class="w-full flex justify-center h-24">
          <div
            :class="[
              'w-full max-w-8 rounded-t-lg transition-all duration-500',
              index === monthlyStats.length - 1
                ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                : 'bg-gray-200 dark:bg-repae-gray-700 hover:bg-emerald-200 dark:hover:bg-emerald-500/30'
            ]"
            :style="{ height: `${getBarHeight(stat.candidatures)}%` }"
            :title="`${stat.candidatures} candidatures`"
          />
        </div>
        <!-- Label -->
        <span
          :class="[
            'text-xs font-brand',
            index === monthlyStats.length - 1
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-repae-gray-400 dark:text-repae-gray-500'
          ]"
        >
          {{ stat.mois }}
        </span>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100 dark:border-repae-gray-700">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Candidatures</span>
      </div>
    </div>
  </div>
</template>
