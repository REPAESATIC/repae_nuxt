<script setup lang="ts">
import { recentCandidatures } from '@/data/espace-entreprises/recent-candidatures'

// Format relative time
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffHours < 1) return 'Il y a moins d\'1h'
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

// Status config
const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  nouvelle: { label: 'Nouvelle', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-500/20' },
  vue: { label: 'Vue', color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-500/20' },
  en_cours: { label: 'En cours', color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-500/20' },
  acceptee: { label: 'Acceptee', color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-500/20' },
  refusee: { label: 'Refusee', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-500/20' }
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-repae-gray-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-users" class="text-blue-500" />
        </div>
        <div>
          <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
            Dernieres candidatures
          </h3>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
            {{ recentCandidatures.length }} candidatures recentes
          </p>
        </div>
      </div>
      <NuxtLink
        to="/espace-entreprises/candidatures"
        class="text-sm text-emerald-500 hover:text-emerald-600 font-medium flex items-center gap-1"
      >
        Voir tout
        <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-xs" />
      </NuxtLink>
    </div>

    <!-- List -->
    <div class="divide-y divide-gray-100 dark:divide-repae-gray-700">
      <NuxtLink
        v-for="candidature in recentCandidatures"
        :key="candidature.id"
        :to="`/espace-entreprises/candidatures/${candidature.id}`"
        class="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-repae-gray-700/50 transition-colors group"
      >
        <!-- Avatar -->
        <img
          :src="candidature.candidat.photo_url"
          :alt="`${candidature.candidat.prenom} ${candidature.candidat.nom}`"
          class="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class="font-medium font-brand text-sm text-repae-gray-900 dark:text-white truncate">
              {{ candidature.candidat.prenom }} {{ candidature.candidat.nom }}
            </p>
            <span
              v-if="candidature.statut === 'nouvelle'"
              class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
            />
          </div>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate">
            {{ candidature.offre.titre }}
          </p>
        </div>

        <!-- Status & Time -->
        <div class="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            :class="[
              'text-xs font-medium px-2 py-0.5 rounded-full',
              statusConfig[candidature.statut].bgColor,
              statusConfig[candidature.statut].color
            ]"
          >
            {{ statusConfig[candidature.statut].label }}
          </span>
          <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
            {{ formatRelativeTime(candidature.date_candidature) }}
          </span>
        </div>

        <!-- Arrow -->
        <font-awesome-icon
          icon="fa-solid fa-chevron-right"
          class="text-repae-gray-300 dark:text-repae-gray-600 group-hover:text-emerald-500 transition-colors"
        />
      </NuxtLink>
    </div>
  </div>
</template>
