<script setup lang="ts">
import { currentEntreprise } from '@/data/espace-entreprises/current-entreprise'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Tableau de bord - Espace Entreprises | REPAE'
})

// Badge info
const badgeInfo = computed(() => {
  const badges: Record<string, { label: string; color: string; nextLevel: string; pointsNeeded: number }> = {
    bronze: { label: 'Bronze', color: 'orange', nextLevel: 'Silver', pointsNeeded: 100 },
    silver: { label: 'Silver', color: 'gray', nextLevel: 'Gold', pointsNeeded: 250 },
    gold: { label: 'Gold', color: 'amber', nextLevel: 'Platinum', pointsNeeded: 500 },
    platinum: { label: 'Platinum', color: 'purple', nextLevel: '', pointsNeeded: 0 }
  }
  return badges[currentEntreprise.badge_recruteur] || badges.bronze
})

const progressToNextBadge = computed(() => {
  if (badgeInfo.value.pointsNeeded === 0) return 100
  const previousThreshold = {
    bronze: 0,
    silver: 100,
    gold: 250,
    platinum: 500
  }[currentEntreprise.badge_recruteur] || 0

  const progress = ((currentEntreprise.points_fidelite - previousThreshold) / (badgeInfo.value.pointsNeeded - previousThreshold)) * 100
  return Math.min(Math.max(progress, 0), 100)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Section (Sprint 3) -->
    <EspaceEntreprisesDashboardHeader />

    <!-- Stats Cards (Sprint 3) -->
    <EspaceEntreprisesDashboardStatsCards />

    <!-- Main Content Grid - Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <div class="lg:col-span-2">
        <EspaceEntreprisesDashboardQuickActions />
      </div>

      <!-- Fidelite Widget -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Programme fidelite
          </h2>
          <NuxtLink
            to="/espace-entreprises/fidelite"
            class="text-sm text-emerald-500 hover:text-emerald-600 font-medium"
          >
            Voir tout
          </NuxtLink>
        </div>

        <!-- Current Badge -->
        <div class="flex items-center gap-4 mb-6">
          <div
            :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center',
              badgeInfo.color === 'orange' ? 'bg-orange-100 dark:bg-orange-500/20' : '',
              badgeInfo.color === 'gray' ? 'bg-gray-200 dark:bg-gray-500/20' : '',
              badgeInfo.color === 'amber' ? 'bg-amber-100 dark:bg-amber-500/20' : '',
              badgeInfo.color === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20' : ''
            ]"
          >
            <font-awesome-icon
              icon="fa-solid fa-award"
              :class="[
                'text-3xl',
                badgeInfo.color === 'orange' ? 'text-orange-500' : '',
                badgeInfo.color === 'gray' ? 'text-gray-500' : '',
                badgeInfo.color === 'amber' ? 'text-amber-500' : '',
                badgeInfo.color === 'purple' ? 'text-purple-500' : ''
              ]"
            />
          </div>
          <div>
            <p class="font-bold font-brand text-lg text-repae-gray-900 dark:text-white">
              Badge {{ badgeInfo.label }}
            </p>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              {{ currentEntreprise.points_fidelite }} points cumules
            </p>
          </div>
        </div>

        <!-- Progress to next badge -->
        <div v-if="badgeInfo.nextLevel" class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-repae-gray-500 dark:text-repae-gray-400">
              Prochain niveau : {{ badgeInfo.nextLevel }}
            </span>
            <span class="font-medium text-repae-gray-900 dark:text-white">
              {{ currentEntreprise.points_fidelite }}/{{ badgeInfo.pointsNeeded }}
            </span>
          </div>
          <div class="h-2 bg-gray-200 dark:bg-repae-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              :style="{ width: `${progressToNextBadge}%` }"
            />
          </div>
          <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
            Plus que {{ badgeInfo.pointsNeeded - currentEntreprise.points_fidelite }} points pour le badge {{ badgeInfo.nextLevel }}
          </p>
        </div>

        <div v-else class="text-center py-4">
          <font-awesome-icon icon="fa-solid fa-crown" class="text-4xl text-purple-500 mb-2" />
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
            Niveau maximum atteint !
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Grid - Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Candidatures -->
      <div class="lg:col-span-2">
        <EspaceEntreprisesDashboardRecentCandidatures />
      </div>

      <!-- Active Offers -->
      <EspaceEntreprisesDashboardActiveOffers />
    </div>

    <!-- Recruitment Chart -->
    <EspaceEntreprisesDashboardRecruitmentChart />
  </div>
</template>
