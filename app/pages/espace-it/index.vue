<script setup lang="ts">
import { espaceItNavItems } from '@/data/espace-it/current-user'
import type { DashboardStat } from '@/components/espace-it/DashboardStats.vue'
import { candidaturesList, getCandidatureStats, statutConfig } from '~/data/espace-it/candidatures'
import { offresList } from '~/data/espace-it/offres'
import { alumniList } from '~/data/espace-it/alumni-list'
import { getRecentQuestions, categorieConfig } from '~/data/espace-it/forum'

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

// Questions recentes du forum
const recentForumQuestions = computed(() => getRecentQuestions(4))

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

    <!-- Content sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Activite recente
          </h2>
          <NuxtLink
            to="/espace-it/mes-candidatures"
            class="text-sm text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 font-brand"
          >
            Voir tout
          </NuxtLink>
        </div>
        <div class="space-y-3">
          <NuxtLink
            v-for="activity in recentActivity"
            :key="activity.id"
            :to="`/espace-it/mes-candidatures`"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-repae-gray-700/50 transition-colors"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                activity.color
              ]"
            >
              <font-awesome-icon :icon="activity.icon" class="text-sm" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-repae-gray-900 dark:text-white truncate">
                {{ activity.title }}
              </p>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate">
                {{ activity.subtitle }}
              </p>
            </div>
            <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500 whitespace-nowrap">
              {{ formatRelativeDate(activity.date) }}
            </span>
          </NuxtLink>
        </div>
        <div v-if="recentActivity.length === 0" class="text-center py-6">
          <font-awesome-icon icon="fa-solid fa-inbox" class="text-3xl text-repae-gray-300 dark:text-repae-gray-600 mb-2" />
          <p class="text-sm text-repae-gray-400 dark:text-repae-gray-500 font-brand">
            Aucune activite recente
          </p>
        </div>
      </div>

      <!-- Suggested Jobs -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Offres recommandees
          </h2>
          <NuxtLink
            to="/espace-it/offres"
            class="text-sm text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 font-brand"
          >
            Voir tout
          </NuxtLink>
        </div>
        <div class="space-y-3">
          <NuxtLink
            v-for="offre in recommendedOffers"
            :key="offre.id"
            :to="`/espace-it/offres/${offre.id}`"
            class="block p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors group"
          >
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-repae-gray-600">
                <img
                  :src="offre.entreprise.logo_url"
                  :alt="offre.entreprise.nom"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 truncate transition-colors">
                  {{ offre.titre }}
                </p>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate">
                  {{ offre.entreprise.nom }} - {{ offre.entreprise.ville }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs rounded-md font-brand">
                    {{ offre.type_contrat.toUpperCase() }}
                  </span>
                  <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
                    {{ offre.nombre_candidatures }} candidature(s)
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div v-if="recommendedOffers.length === 0" class="text-center py-6">
          <font-awesome-icon icon="fa-solid fa-briefcase" class="text-3xl text-repae-gray-300 dark:text-repae-gray-600 mb-2" />
          <p class="text-sm text-repae-gray-400 dark:text-repae-gray-500 font-brand">
            Aucune offre disponible
          </p>
        </div>
      </div>
    </div>

    <!-- Forum d'entraide professionnelle -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-comments" class="text-repae-blue-500" />
          </div>
          <div>
            <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
              Forum d'entraide professionnelle
            </h2>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
              Posez vos questions techniques ou de carriere
            </p>
          </div>
        </div>
        <NuxtLink
          to="/espace-it/forum"
          class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-medium font-brand rounded-lg transition-colors cursor-pointer flex items-center gap-2"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Poser une question
        </NuxtLink>
      </div>

      <!-- Questions recentes -->
      <div class="space-y-4">
        <NuxtLink
          v-for="question in recentForumQuestions"
          :key="question.id"
          :to="`/espace-it/forum/${question.id}`"
          class="block p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer group"
        >
          <div class="flex items-start gap-4">
            <img
              :src="question.auteur.photo_url"
              :alt="`${question.auteur.prenom} ${question.auteur.nom}`"
              class="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors line-clamp-2">
                  {{ question.titre }}
                </h3>
                <span
                  v-if="question.resolu"
                  class="flex-shrink-0 px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1"
                >
                  <font-awesome-icon icon="fa-solid fa-check" class="text-[10px]" />
                  Resolu
                </span>
              </div>
              <div class="flex items-center gap-3 text-xs text-repae-gray-500 dark:text-repae-gray-400">
                <span class="font-medium">{{ question.auteur.prenom }} {{ question.auteur.nom }}</span>
                <span>·</span>
                <span :class="categorieConfig[question.categorie].color" class="px-2 py-0.5 rounded-md">
                  {{ categorieConfig[question.categorie].label }}
                </span>
                <span>·</span>
                <span>{{ formatRelativeDate(question.date_creation) }}</span>
              </div>
              <div class="flex items-center gap-4 mt-2 text-xs text-repae-gray-400 dark:text-repae-gray-500">
                <span class="flex items-center gap-1">
                  <font-awesome-icon icon="fa-solid fa-reply" />
                  {{ question.nombre_reponses }} reponse(s)
                </span>
                <span class="flex items-center gap-1">
                  <font-awesome-icon icon="fa-solid fa-eye" />
                  {{ question.nombre_vues }} vue(s)
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="recentForumQuestions.length === 0" class="text-center py-8">
        <font-awesome-icon icon="fa-solid fa-comments" class="text-4xl text-repae-gray-300 dark:text-repae-gray-600 mb-3" />
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand mb-4">
          Aucune discussion pour le moment
        </p>
        <NuxtLink
          to="/espace-it/forum"
          class="inline-flex items-center gap-2 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-medium font-brand rounded-lg transition-colors cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Lancer une discussion
        </NuxtLink>
      </div>

      <!-- Voir tout -->
      <div v-if="recentForumQuestions.length > 0" class="mt-4 pt-4 border-t border-gray-200 dark:border-repae-gray-700 text-center">
        <NuxtLink
          to="/espace-it/forum"
          class="text-sm text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 font-medium font-brand inline-flex items-center gap-2"
        >
          Voir toutes les discussions
          <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
