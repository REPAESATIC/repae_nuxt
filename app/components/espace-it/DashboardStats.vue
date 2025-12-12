<script setup lang="ts">
export interface DashboardStat {
  id: string
  label: string
  value: string
  icon: string
  color: 'blue' | 'green' | 'purple' | 'orange'
  trend: string
}

defineProps<{
  stats: DashboardStat[]
}>()

const colorClasses = {
  blue: {
    bg: 'bg-repae-blue-100 dark:bg-repae-blue-500/20',
    text: 'text-repae-blue-500'
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-500/20',
    text: 'text-green-500'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-500/20',
    text: 'text-purple-500'
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-500/20',
    text: 'text-orange-500'
  }
}
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.id"
      class="bg-white dark:bg-repae-gray-800 rounded-xl p-4 border border-gray-200 dark:border-repae-gray-700 hover:shadow-md transition-shadow"
    >
      <div class="flex items-start justify-between">
        <div
          :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center',
            colorClasses[stat.color].bg
          ]"
        >
          <font-awesome-icon
            :icon="stat.icon"
            :class="colorClasses[stat.color].text"
          />
        </div>
        <span
          :class="[
            'text-xs font-medium',
            stat.trend.startsWith('+') ? 'text-green-500' : stat.trend.startsWith('-') ? 'text-red-500' : 'text-repae-gray-500'
          ]"
        >
          {{ stat.trend }}
        </span>
      </div>
      <p class="mt-3 text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
        {{ stat.value }}
      </p>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        {{ stat.label }}
      </p>
    </div>
  </div>
</template>
