<script setup lang="ts">
import { adminQuickActions } from '~/data/admin/dashboard'
import type { AdminDashboardStat, AdminActivityItem } from '~/data/admin/dashboard'
import type { UserItem } from '~/composables/useIdentityApi'
import type { NewsItem } from '~/composables/useNewsApi'
import type { EventItem } from '~/composables/useEventsApi'

definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Tableau de bord - Administration | REPAE',
})

// ─── API Composables ─────────────────────────────────────────────────────────

const { fetchAlumniList, fetchUsers } = useIdentityApi()
const { fetchNewsList } = useNewsApi()
const { fetchEventsList } = useEventsApi()

// ─── State ───────────────────────────────────────────────────────────────────

const loading = ref(true)

const alumniCount = ref(0)
const pendingVerifications = ref(0)
const usersCount = ref(0)
const newsCount = ref(0)
const eventsCount = ref(0)
const entreprisesCount = ref(0) // Pas d'API backend pour les entreprises

const recentActivity = ref<AdminActivityItem[]>([])

// ─── Construction du fil d'activite a partir des donnees reelles ─────────────

const buildActivityFromUsers = (users: UserItem[]): AdminActivityItem[] => {
  return users.map(user => ({
    id: `user-${user.id}`,
    type: 'inscription' as const,
    title: 'Nouvelle inscription',
    description: `${user.email} a cree un compte (${user.role})`,
    date: user.createdAt,
    icon: 'fa-solid fa-user-plus',
    color: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
  }))
}

const buildActivityFromNews = (news: NewsItem[]): AdminActivityItem[] => {
  return news.map(item => ({
    id: `news-${item.id}`,
    type: 'actualite' as const,
    title: item.status === 'PUBLISHED' ? 'Actualite publiee' : 'Actualite creee',
    description: item.title,
    date: item.publishedAt || item.createdAt,
    icon: 'fa-solid fa-bullhorn',
    color: 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400',
  }))
}

const buildActivityFromEvents = (events: EventItem[]): AdminActivityItem[] => {
  return events.map(item => ({
    id: `event-${item.id}`,
    type: 'evenement' as const,
    title: 'Evenement planifie',
    description: item.title,
    date: item.createdAt,
    icon: 'fa-solid fa-calendar-alt',
    color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  }))
}

// ─── Chargement des donnees ──────────────────────────────────────────────────

const loadDashboardData = async () => {
  loading.value = true
  try {
    const [
      alumniResult,
      pendingResult,
      usersResult,
      newsResult,
      eventsResult,
      recentUsersResult,
      recentNewsResult,
      recentEventsResult,
    ] = await Promise.all([
      // Compteurs
      fetchAlumniList({ limit: 1 }),
      fetchAlumniList({ isVerified: false, limit: 1 }),
      fetchUsers({ limit: 1 }),
      fetchNewsList({ status: 'PUBLISHED', limit: 1 }),
      fetchEventsList({ limit: 1 }),
      // Donnees recentes pour le fil d'activite
      fetchUsers({ limit: 3 }),            // Tries par createdAt DESC cote backend
      fetchNewsList({ limit: 3 }),          // Tries par createdAt DESC cote backend
      fetchEventsList({ limit: 3 }),        // Tries par eventDate ASC cote backend
    ])

    alumniCount.value = alumniResult.total
    pendingVerifications.value = pendingResult.total
    usersCount.value = usersResult.total
    newsCount.value = newsResult.total
    eventsCount.value = eventsResult.total

    // Fusionner et trier par date decroissante
    const allActivity = [
      ...buildActivityFromUsers(recentUsersResult.data),
      ...buildActivityFromNews(recentNewsResult.data),
      ...buildActivityFromEvents(recentEventsResult.data),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    recentActivity.value = allActivity.slice(0, 6)
  } catch {
    // Affichage gracieux avec des valeurs a 0 si les APIs sont indisponibles
  } finally {
    loading.value = false
  }
}

// ─── Stats computed ──────────────────────────────────────────────────────────

const stats = computed<AdminDashboardStat[]>(() => [
  {
    id: 'alumni',
    label: 'Alumni inscrits',
    value: String(alumniCount.value),
    icon: 'fa-solid fa-user-graduate',
    color: 'violet',
    trend: pendingVerifications.value > 0 ? `${pendingVerifications.value} en attente` : undefined,
    href: '/admin/alumni',
  },
  {
    id: 'comptes',
    label: 'Comptes utilisateurs',
    value: String(usersCount.value),
    icon: 'fa-solid fa-users',
    color: 'blue',
    href: '/admin/comptes',
  },
  {
    id: 'entreprises',
    label: 'Entreprises',
    value: String(entreprisesCount.value),
    icon: 'fa-solid fa-building',
    color: 'green',
    href: '/admin/entreprises',
  },
  {
    id: 'actualites',
    label: 'Actualites publiees',
    value: String(newsCount.value),
    icon: 'fa-solid fa-bullhorn',
    color: 'orange',
    href: '/admin/actualites',
  },
  {
    id: 'evenements',
    label: 'Evenements',
    value: String(eventsCount.value),
    icon: 'fa-solid fa-calendar-alt',
    color: 'amber',
    href: '/admin/evenements',
  },
  {
    id: 'verifications',
    label: 'En attente de verification',
    value: String(pendingVerifications.value),
    icon: 'fa-solid fa-hourglass-half',
    color: 'red',
    trend: pendingVerifications.value > 0 ? 'A traiter' : undefined,
    href: '/admin/alumni',
  },
])

// ─── Donnees vue d'ensemble ──────────────────────────────────────────────────

const overviewItems = computed(() => [
  { label: 'Alumni', value: alumniCount.value, icon: 'fa-solid fa-user-graduate', color: 'text-violet-500', href: '/admin/alumni' },
  { label: 'Comptes', value: usersCount.value, icon: 'fa-solid fa-users', color: 'text-repae-blue-500', href: '/admin/comptes' },
  { label: 'Actualites', value: newsCount.value, icon: 'fa-solid fa-bullhorn', color: 'text-orange-500', href: '/admin/actualites' },
  { label: 'Evenements', value: eventsCount.value, icon: 'fa-solid fa-calendar-alt', color: 'text-amber-500', href: '/admin/evenements' },
  { label: 'Entreprises', value: entreprisesCount.value, icon: 'fa-solid fa-building', color: 'text-green-500', href: '/admin/entreprises' },
])

// ─── Formatage date ──────────────────────────────────────────────────────────

const formatRelativeDate = (dateStr: string): string => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'A l\'instant'
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

onMounted(() => {
  loadDashboardData()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Bandeau d'accueil -->
    <AdminDashboardWelcome :pending-verifications="pendingVerifications" />

    <!-- Cartes statistiques -->
    <AdminDashboardStatsCards :stats="stats" :loading="loading" />

    <!-- Actions rapides -->
    <div>
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
        Actions rapides
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <NuxtLink
          v-for="action in adminQuickActions"
          :key="action.id"
          :to="action.href"
          class="group flex flex-col items-center gap-3 p-4 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg transition-all cursor-pointer text-center"
        >
          <div
            :class="[
              'w-12 h-12 rounded-xl bg-linear-to-br flex items-center justify-center shadow-lg transition-transform group-hover:scale-110',
              action.color
            ]"
          >
            <font-awesome-icon :icon="action.icon" class="text-white text-lg" />
          </div>
          <div>
            <p class="text-sm font-medium font-brand text-repae-gray-900 dark:text-white">
              {{ action.label }}
            </p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5 hidden sm:block">
              {{ action.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Grille a deux colonnes -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Activite recente -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Activite recente
          </h2>
          <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
            Derniers ajouts
          </span>
        </div>
        <div class="space-y-3">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-repae-gray-700/50 transition-colors"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
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
                {{ activity.description }}
              </p>
            </div>
            <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500 whitespace-nowrap">
              {{ formatRelativeDate(activity.date) }}
            </span>
          </div>
        </div>
        <div v-if="recentActivity.length === 0" class="text-center py-6">
          <font-awesome-icon icon="fa-solid fa-inbox" class="text-3xl text-repae-gray-300 dark:text-repae-gray-600 mb-2" />
          <p class="text-sm text-repae-gray-400 dark:text-repae-gray-500 font-brand">
            Aucune activite recente
          </p>
        </div>
      </div>

      <!-- Vue d'ensemble -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Vue d'ensemble
          </h2>
          <div class="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-chart-line" class="text-violet-500" />
          </div>
        </div>
        <div class="space-y-3">
          <NuxtLink
            v-for="item in overviewItems"
            :key="item.label"
            :to="item.href"
            class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-700/50 hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer group"
          >
            <div class="flex items-center gap-3">
              <font-awesome-icon :icon="item.icon" :class="item.color" />
              <span class="text-sm font-medium text-repae-gray-900 dark:text-white">
                {{ item.label }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ loading ? '...' : item.value }}
              </span>
              <font-awesome-icon
                icon="fa-solid fa-chevron-right"
                class="text-xs text-repae-gray-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all"
              />
            </div>
          </NuxtLink>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-repae-gray-700 text-center">
          <NuxtLink
            to="/admin/parametres"
            class="text-sm text-violet-500 hover:text-violet-600 font-medium font-brand inline-flex items-center gap-2"
          >
            Parametres de la plateforme
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
