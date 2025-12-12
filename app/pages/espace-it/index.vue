<script setup lang="ts">
import { espaceItNavItems } from '@/data/espace-it/current-user'
import type { DashboardStat } from '@/components/espace-it/DashboardStats.vue'
import { candidaturesList, getCandidatureStats, statutConfig } from '~/data/espace-it/candidatures'
import { offresList } from '~/data/espace-it/offres'
import { alumniList } from '~/data/espace-it/alumni-list'

definePageMeta({
  layout: 'espace-it'
})

// Stats des candidatures
const candidatureStats = computed(() => getCandidatureStats(candidaturesList))

// Statistiques dynamiques pour le dashboard
const stats = computed<DashboardStat[]>(() => [
  {
    id: 'candidatures',
    label: 'Mes candidatures',
    value: String(candidatureStats.value.total),
    icon: 'fa-solid fa-paper-plane',
    color: 'blue',
    trend: `${candidatureStats.value.entretien} entretien(s)`
  },
  {
    id: 'offres',
    label: 'Offres disponibles',
    value: String(offresList.filter(o => o.statut === 'active').length),
    icon: 'fa-solid fa-briefcase',
    color: 'green',
    trend: 'Actives'
  },
  {
    id: 'alumni',
    label: 'Alumni IT',
    value: String(alumniList.length),
    icon: 'fa-solid fa-users',
    color: 'purple',
    trend: 'Dans l\'annuaire'
  },
  {
    id: 'acceptees',
    label: 'Candidatures acceptees',
    value: String(candidatureStats.value.acceptee),
    icon: 'fa-solid fa-check-circle',
    color: 'orange',
    trend: 'Felicitations !'
  }
])

// Quick links (filtered from nav items - only main sections)
const quickLinks = computed(() =>
  espaceItNavItems.filter(item =>
    ['profil', 'annuaire', 'entreprises', 'offres', 'candidatures'].includes(item.id)
  )
)

// Activite recente basee sur les candidatures
const recentActivity = computed(() => {
  return candidaturesList
    .slice()
    .sort((a, b) => new Date(b.date_mise_a_jour).getTime() - new Date(a.date_mise_a_jour).getTime())
    .slice(0, 4)
    .map(c => ({
      id: c.id,
      type: c.statut,
      title: c.offre.titre,
      subtitle: c.offre.entreprise.nom,
      date: c.date_mise_a_jour,
      icon: statutConfig[c.statut].icon,
      color: statutConfig[c.statut].color
    }))
})

// Offres recommandees (les plus recentes)
const recommendedOffers = computed(() => {
  return offresList
    .filter(o => o.statut === 'active')
    .slice()
    .sort((a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime())
    .slice(0, 3)
})

// Formatage date relative
const formatRelativeDate = (dateStr: string): string => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Aujourd\'hui'
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`
}
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
