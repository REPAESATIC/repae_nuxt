<script setup lang="ts">
import type { AdminDashboardStat } from '~/data/admin/dashboard'

defineProps<{
  stats: AdminDashboardStat[]
  loading?: boolean
}>()

const colorClasses: Record<string, { bg: string; text: string }> = {
  violet: {
    bg: 'bg-violet-100 dark:bg-violet-500/20',
    text: 'text-violet-500',
  },
  blue: {
    bg: 'bg-repae-blue-100 dark:bg-repae-blue-500/20',
    text: 'text-repae-blue-500',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-500/20',
    text: 'text-green-500',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-500/20',
    text: 'text-orange-500',
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-500/20',
    text: 'text-amber-500',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-500/20',
    text: 'text-red-500',
  },
}
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
    <NuxtLink
      v-for="(stat, index) in stats"
      :key="stat.id"
      :to="stat.href"
      class="bg-white dark:bg-repae-gray-800 rounded-xl p-4 border border-gray-200 dark:border-repae-gray-700 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-500/50 transition-all cursor-pointer group animate__animated animate__fadeInUp"
      :style="{ animationDelay: `${index * 80}ms` }"
    >
      <!-- Squelette de chargement -->
      <template v-if="loading">
        <div class="flex items-start justify-between">
          <div class="w-10 h-10 rounded-lg bg-gray-200 dark:bg-repae-gray-700 animate-pulse" />
        </div>
        <div class="mt-3 h-7 w-16 bg-gray-200 dark:bg-repae-gray-700 rounded animate-pulse" />
        <div class="mt-1 h-4 w-24 bg-gray-100 dark:bg-repae-gray-700/50 rounded animate-pulse" />
      </template>

      <!-- Contenu charge -->
      <template v-else>
        <div class="flex items-start justify-between">
          <div
            :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center',
              colorClasses[stat.color]?.bg
            ]"
          >
            <font-awesome-icon
              :icon="stat.icon"
              :class="colorClasses[stat.color]?.text"
            />
          </div>
          <font-awesome-icon
            icon="fa-solid fa-arrow-right"
            class="text-xs text-repae-gray-300 dark:text-repae-gray-600 group-hover:text-violet-500 group-hover:translate-x-1 transition-all"
          />
        </div>
        <p class="mt-3 text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ stat.value }}
        </p>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
          {{ stat.label }}
        </p>
        <p
          v-if="stat.trend"
          class="text-xs text-repae-gray-400 dark:text-repae-gray-500 mt-1"
        >
          {{ stat.trend }}
        </p>
      </template>
    </NuxtLink>
  </div>
</template>
