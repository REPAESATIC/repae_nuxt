<script setup lang="ts">
import { espaceItNavItems } from '@/data/espace-it/current-user'
import type { DashboardStat } from '@/components/espace-it/DashboardStats.vue'

definePageMeta({
  layout: 'espace-it'
})

// Statistiques mock pour le dashboard
const stats = ref<DashboardStat[]>([
  {
    id: 'profil',
    label: 'Profil complete',
    value: '85%',
    icon: 'fa-solid fa-user-check',
    color: 'blue',
    trend: '+5%'
  },
  {
    id: 'vues',
    label: 'Vues du profil',
    value: '124',
    icon: 'fa-solid fa-eye',
    color: 'green',
    trend: '+12%'
  },
  {
    id: 'offres',
    label: 'Offres compatibles',
    value: '8',
    icon: 'fa-solid fa-briefcase',
    color: 'purple',
    trend: '+3'
  },
  {
    id: 'connexions',
    label: 'Connexions',
    value: '47',
    icon: 'fa-solid fa-users',
    color: 'orange',
    trend: '+2'
  }
])

// Quick links (filtered from nav items)
const quickLinks = computed(() =>
  espaceItNavItems.filter(item => item.id !== 'dashboard')
)
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <EspaceItDashboardWelcome />

    <!-- Stats Grid -->
    <EspaceItDashboardStats :stats="stats" />

    <!-- Quick Links -->
    <EspaceItDashboardQuickLinks
      :links="quickLinks"
      title="Acces rapides"
    />

    <!-- Placeholder sections for future sprints -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity Placeholder -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
          Activite recente
        </h2>
        <div class="space-y-4">
          <div
            v-for="i in 3"
            :key="i"
            class="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-repae-gray-700 last:border-b-0"
          >
            <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
              <font-awesome-icon
                icon="fa-solid fa-clock"
                class="text-repae-gray-400 dark:text-repae-gray-500"
              />
            </div>
            <div class="flex-1">
              <div class="h-4 bg-gray-100 dark:bg-repae-gray-700 rounded w-3/4" />
              <div class="h-3 bg-gray-100 dark:bg-repae-gray-700 rounded w-1/2 mt-2" />
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-repae-gray-400 dark:text-repae-gray-500 mt-4 font-brand">
          A venir dans les prochains sprints
        </p>
      </div>

      <!-- Suggested Jobs Placeholder -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
          Offres recommandees
        </h2>
        <div class="space-y-4">
          <div
            v-for="i in 3"
            :key="i"
            class="p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-lg"
          >
            <div class="h-4 bg-gray-200 dark:bg-repae-gray-600 rounded w-2/3 mb-2" />
            <div class="h-3 bg-gray-200 dark:bg-repae-gray-600 rounded w-1/2 mb-3" />
            <div class="flex gap-2">
              <div class="h-5 bg-gray-200 dark:bg-repae-gray-600 rounded w-16" />
              <div class="h-5 bg-gray-200 dark:bg-repae-gray-600 rounded w-20" />
            </div>
          </div>
        </div>
        <p class="text-center text-sm text-repae-gray-400 dark:text-repae-gray-500 mt-4 font-brand">
          A venir dans les prochains sprints
        </p>
      </div>
    </div>
  </div>
</template>
