<script setup lang="ts">
import { dashboardStats } from '@/data/espace-entreprises/current-entreprise'

// Stats cards configuration
const statsCards = computed(() => [
  {
    id: 'offres',
    label: 'Offres actives',
    value: dashboardStats.offresActives,
    icon: 'fa-solid fa-briefcase',
    color: 'emerald',
    href: '/espace-entreprises/offres',
    trend: '+2 ce mois',
    trendUp: true
  },
  {
    id: 'candidatures',
    label: 'Candidatures recues',
    value: dashboardStats.candidaturesRecues,
    icon: 'fa-solid fa-users',
    color: 'blue',
    href: '/espace-entreprises/candidatures',
    trend: '+12 cette semaine',
    trendUp: true
  },
  {
    id: 'profils',
    label: 'Profils consultes',
    value: dashboardStats.profilsConsultes,
    icon: 'fa-solid fa-eye',
    color: 'purple',
    href: '/espace-entreprises/consulter-it',
    trend: 'Ce mois',
    trendUp: null
  },
  {
    id: 'taux',
    label: 'Taux de reponse',
    value: dashboardStats.tauxReponse + '%',
    icon: 'fa-solid fa-chart-line',
    color: 'amber',
    href: null,
    trend: '+5% vs mois dernier',
    trendUp: true
  }
])

const getColorClasses = (color: string, type: 'bg' | 'icon') => {
  const classes: Record<string, Record<string, string>> = {
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-500/20',
      icon: 'text-emerald-500'
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-500/20',
      icon: 'text-blue-500'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-500/20',
      icon: 'text-purple-500'
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-500/20',
      icon: 'text-amber-500'
    }
  }
  return classes[color]?.[type] || ''
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <component
      :is="stat.href ? 'NuxtLink' : 'div'"
      v-for="stat in statsCards"
      :key="stat.id"
      :to="stat.href"
      :class="[
        'bg-white dark:bg-repae-gray-800 rounded-xl p-5 border border-gray-200 dark:border-repae-gray-700 transition-all duration-200',
        stat.href ? 'hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 cursor-pointer group' : ''
      ]"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
            {{ stat.label }}
          </p>
          <p class="text-3xl font-bold font-brand text-repae-gray-900 dark:text-white mt-1">
            {{ stat.value }}
          </p>
          <!-- Trend indicator -->
          <div class="flex items-center gap-1 mt-2">
            <font-awesome-icon
              v-if="stat.trendUp !== null"
              :icon="stat.trendUp ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'"
              :class="[
                'text-xs',
                stat.trendUp ? 'text-emerald-500' : 'text-red-500'
              ]"
            />
            <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
              {{ stat.trend }}
            </span>
          </div>
        </div>
        <div
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform',
            getColorClasses(stat.color, 'bg'),
            stat.href ? 'group-hover:scale-110' : ''
          ]"
        >
          <font-awesome-icon
            :icon="stat.icon"
            :class="['text-xl', getColorClasses(stat.color, 'icon')]"
          />
        </div>
      </div>
    </component>
  </div>
</template>
