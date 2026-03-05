<script setup lang="ts">
import { espaceItNavItems } from '@/data/espace-it/current-user'
import type { DashboardStat } from '@/components/espace-it/DashboardStats.vue'

definePageMeta({
  layout: 'espace-it'
})

// Charger le vrai nombre d'alumni depuis l'API
const { fetchAlumniList } = useIdentityApi()
const realAlumniCount = ref<number | null>(null)

onMounted(async () => {
  try {
    const result = await fetchAlumniList({ limit: 1 })
    realAlumniCount.value = result.total
  } catch {
    // Fallback silencieux
  }
})

// Statistiques dynamiques pour le dashboard
const stats = computed<DashboardStat[]>(() => [
  {
    id: 'alumni',
    label: 'Alumni IT',
    value: realAlumniCount.value !== null ? String(realAlumniCount.value) : '...',
    icon: 'fa-solid fa-users',
    color: 'purple',
    trend: 'Dans l\'annuaire'
  },
  {
    id: 'candidatures',
    label: 'Mes candidatures',
    value: '—',
    icon: 'fa-solid fa-paper-plane',
    color: 'blue',
    trend: 'Bientôt disponible'
  },
  {
    id: 'offres',
    label: 'Offres disponibles',
    value: '—',
    icon: 'fa-solid fa-briefcase',
    color: 'green',
    trend: 'Bientôt disponible'
  },
  {
    id: 'acceptees',
    label: 'Candidatures acceptées',
    value: '—',
    icon: 'fa-solid fa-check-circle',
    color: 'orange',
    trend: 'Bientôt disponible'
  }
])

// Quick links (filtered from nav items - only main sections)
const quickLinks = computed(() =>
  espaceItNavItems.filter(item =>
    ['profil', 'annuaire', 'entreprises', 'offres', 'candidatures'].includes(item.id)
  )
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

    <!-- Content sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Activité récente (Bientôt disponible) -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6 relative overflow-hidden">
        <div class="opacity-40 pointer-events-none">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
              Activité récente
            </h2>
          </div>
          <div class="space-y-3">
            <div v-for="i in 3" :key="i" class="flex items-center gap-3 p-3 rounded-xl">
              <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-repae-gray-700 shrink-0" />
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200 dark:bg-repae-gray-700 rounded w-3/4" />
                <div class="h-2.5 bg-gray-100 dark:bg-repae-gray-700/50 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-repae-gray-800/60">
          <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center mb-3">
            <font-awesome-icon icon="fa-solid fa-paper-plane" class="text-xl text-amber-500" />
          </div>
          <p class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm mb-1">Candidatures</p>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium font-brand">
            <font-awesome-icon icon="fa-solid fa-clock" class="text-[10px]" />
            Bientôt disponible
          </div>
        </div>
      </div>

      <!-- Offres recommandées (Bientôt disponible) -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6 relative overflow-hidden">
        <div class="opacity-40 pointer-events-none">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
              Offres recommandées
            </h2>
          </div>
          <div class="space-y-3">
            <div v-for="i in 3" :key="i" class="p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-lg bg-gray-200 dark:bg-repae-gray-600 shrink-0" />
                <div class="flex-1 space-y-2">
                  <div class="h-3 bg-gray-200 dark:bg-repae-gray-700 rounded w-3/4" />
                  <div class="h-2.5 bg-gray-100 dark:bg-repae-gray-700/50 rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-repae-gray-800/60">
          <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center mb-3">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-xl text-amber-500" />
          </div>
          <p class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm mb-1">Offres d'emploi</p>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium font-brand">
            <font-awesome-icon icon="fa-solid fa-clock" class="text-[10px]" />
            Bientôt disponible
          </div>
        </div>
      </div>
    </div>

    <!-- Forum d'entraide (Bientôt disponible) -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6 relative overflow-hidden">
      <div class="opacity-40 pointer-events-none">
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
                Posez vos questions techniques ou de carrière
              </p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-repae-gray-600 shrink-0" />
              <div class="flex-1 space-y-2">
                <div class="h-3 bg-gray-200 dark:bg-repae-gray-700 rounded w-5/6" />
                <div class="h-2.5 bg-gray-100 dark:bg-repae-gray-700/50 rounded w-2/3" />
                <div class="h-2 bg-gray-100 dark:bg-repae-gray-700/50 rounded w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 flex flex-col items-center justify-center bg-white/60 dark:bg-repae-gray-800/60">
        <div class="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center mb-3">
          <font-awesome-icon icon="fa-solid fa-comments" class="text-xl text-amber-500" />
        </div>
        <p class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm mb-1">Forum d'entraide</p>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium font-brand">
          <font-awesome-icon icon="fa-solid fa-clock" class="text-[10px]" />
          Bientôt disponible
        </div>
      </div>
    </div>
  </div>
</template>
