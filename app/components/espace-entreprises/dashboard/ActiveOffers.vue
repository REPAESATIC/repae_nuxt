<script setup lang="ts">
import { activeOffers } from '@/data/espace-entreprises/recent-candidatures'

// Calculate days remaining
const getDaysRemaining = (expirationDate: string) => {
  const expDate = new Date(expirationDate)
  const now = new Date()
  const diffMs = expDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return diffDays
}

// Get status for days remaining
const getExpirationStatus = (days: number) => {
  if (days <= 0) return { label: 'Expiree', color: 'text-red-500', urgent: true }
  if (days <= 3) return { label: `${days}j restants`, color: 'text-red-500', urgent: true }
  if (days <= 7) return { label: `${days}j restants`, color: 'text-amber-500', urgent: false }
  return { label: `${days}j restants`, color: 'text-repae-gray-400', urgent: false }
}

// Only show active offers (not paused)
const displayOffers = computed(() =>
  activeOffers.filter(o => o.statut === 'publiee').slice(0, 4)
)
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-repae-gray-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-briefcase" class="text-emerald-500" />
        </div>
        <div>
          <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
            Offres actives
          </h3>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
            {{ activeOffers.filter(o => o.statut === 'publiee').length }} offres en ligne
          </p>
        </div>
      </div>
      <NuxtLink
        to="/espace-entreprises/offres"
        class="text-sm text-emerald-500 hover:text-emerald-600 font-medium flex items-center gap-1"
      >
        Gerer
        <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-xs" />
      </NuxtLink>
    </div>

    <!-- List -->
    <div class="divide-y divide-gray-100 dark:divide-repae-gray-700">
      <NuxtLink
        v-for="offre in displayOffers"
        :key="offre.id"
        :to="`/espace-entreprises/offres/${offre.id}`"
        class="block p-4 hover:bg-gray-50 dark:hover:bg-repae-gray-700/50 transition-colors group"
      >
        <div class="flex items-start justify-between gap-3">
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <p class="font-medium font-brand text-sm text-repae-gray-900 dark:text-white truncate">
                {{ offre.titre }}
              </p>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full flex-shrink-0',
                  offre.type === 'stage'
                    ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
                    : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                ]"
              >
                {{ offre.type === 'stage' ? 'Stage' : offre.type_contrat?.toUpperCase() }}
              </span>
            </div>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
              {{ offre.lieu }}
            </p>
          </div>

          <!-- Expiration -->
          <div class="text-right flex-shrink-0">
            <span
              :class="[
                'text-xs font-medium',
                getExpirationStatus(getDaysRemaining(offre.date_expiration)).color
              ]"
            >
              {{ getExpirationStatus(getDaysRemaining(offre.date_expiration)).label }}
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-4 mt-3">
          <div class="flex items-center gap-1.5 text-xs text-repae-gray-500 dark:text-repae-gray-400">
            <font-awesome-icon icon="fa-solid fa-users" class="text-repae-gray-400" />
            <span>{{ offre.nombre_candidatures }} candidatures</span>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-repae-gray-500 dark:text-repae-gray-400">
            <font-awesome-icon icon="fa-solid fa-eye" class="text-repae-gray-400" />
            <span>{{ offre.nombre_vues }} vues</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div
      v-if="displayOffers.length === 0"
      class="p-8 text-center"
    >
      <font-awesome-icon icon="fa-solid fa-briefcase" class="text-3xl text-repae-gray-300 dark:text-repae-gray-600 mb-3" />
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        Aucune offre active
      </p>
      <NuxtLink
        to="/espace-entreprises/offres/publier"
        class="inline-flex items-center gap-2 mt-3 text-sm text-emerald-500 hover:text-emerald-600 font-medium"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Publier une offre
      </NuxtLink>
    </div>
  </div>
</template>
