<script setup lang="ts">
import type { Entreprise } from '~/data/espace-it/entreprises-alumni'
import { secteurConfig } from '~/data/espace-it/entreprises-alumni'

const props = defineProps<{
  entreprise: Entreprise
}>()

const secteur = computed(() => secteurConfig[props.entreprise.secteur])
</script>

<template>
  <NuxtLink
    :to="`/espace-it/entreprises/${entreprise.id}`"
    class="group bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden hover:shadow-lg hover:border-repae-blue-300 dark:hover:border-repae-blue-500 transition-all duration-300"
  >
    <!-- Header with logo and secteur badge -->
    <div class="p-5">
      <div class="flex items-start gap-4">
        <!-- Logo -->
        <img
          :src="entreprise.logo_url"
          :alt="entreprise.nom"
          class="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-repae-gray-700 group-hover:scale-105 transition-transform"
        />

        <div class="flex-1 min-w-0">
          <!-- Nom -->
          <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 transition-colors truncate">
            {{ entreprise.nom }}
          </h3>

          <!-- Secteur badge -->
          <span
            :class="[
              'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1',
              secteur.color
            ]"
          >
            <font-awesome-icon :icon="secteur.icon" class="text-[10px]" />
            {{ secteur.label }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <p class="mt-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 line-clamp-2">
        {{ entreprise.description }}
      </p>

      <!-- Meta info -->
      <div class="flex flex-wrap items-center gap-3 mt-4 text-xs text-repae-gray-500 dark:text-repae-gray-400">
        <div class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
          <span>{{ entreprise.ville }}</span>
        </div>
        <div class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-users" class="text-repae-blue-500" />
          <span>{{ entreprise.nombre_employes }} employes</span>
        </div>
      </div>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-1.5 mt-3">
        <span
          v-for="tech in entreprise.technologies.slice(0, 4)"
          :key="tech"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 text-xs rounded-md"
        >
          {{ tech }}
        </span>
        <span
          v-if="entreprise.technologies.length > 4"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 text-xs rounded-md"
        >
          +{{ entreprise.technologies.length - 4 }}
        </span>
      </div>
    </div>

    <!-- Footer with fondateur -->
    <div class="px-5 py-3 bg-gray-50 dark:bg-repae-gray-700/50 border-t border-gray-200 dark:border-repae-gray-700">
      <div class="flex items-center gap-3">
        <img
          :src="entreprise.fondateur.photo_url"
          :alt="`${entreprise.fondateur.prenom} ${entreprise.fondateur.nom}`"
          class="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-repae-gray-600"
        />
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-repae-gray-900 dark:text-white truncate">
            {{ entreprise.fondateur.prenom }} {{ entreprise.fondateur.nom }}
          </p>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
            Promotion {{ entreprise.fondateur.promotion }}
          </p>
        </div>
        <font-awesome-icon
          icon="fa-solid fa-chevron-right"
          class="text-repae-gray-400 group-hover:text-repae-blue-500 group-hover:translate-x-1 transition-all"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
