<script setup lang="ts">
import type { AlumniCandidature } from '~/data/espace-entreprises/candidatures'
import { disponibiliteConfig } from '~/data/espace-entreprises/candidatures'

const props = defineProps<{
  alumni: AlumniCandidature
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h3 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-4">
      Profil candidat
    </h3>

    <!-- Header with photo -->
    <div class="flex items-center gap-4 mb-6">
      <img
        :src="alumni.photo_url"
        :alt="`${alumni.prenom} ${alumni.nom}`"
        class="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-repae-gray-700"
      />
      <div>
        <h4 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
          {{ alumni.prenom }} {{ alumni.nom }}
        </h4>
        <p class="text-repae-gray-500 dark:text-repae-gray-400">
          {{ alumni.poste_actuel }}
        </p>
        <span
          :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2',
            disponibiliteConfig[alumni.disponibilite].color
          ]"
        >
          {{ disponibiliteConfig[alumni.disponibilite].label }}
        </span>
      </div>
    </div>

    <!-- Info grid -->
    <div class="space-y-3 mb-6">
      <div class="flex items-center gap-3 text-sm">
        <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-emerald-500" />
        </div>
        <div>
          <p class="text-repae-gray-400 text-xs">Promotion</p>
          <p class="text-repae-gray-900 dark:text-white font-medium">{{ alumni.promotion }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3 text-sm">
        <div class="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-blue-500" />
        </div>
        <div>
          <p class="text-repae-gray-400 text-xs">Localisation</p>
          <p class="text-repae-gray-900 dark:text-white font-medium">{{ alumni.ville }}</p>
        </div>
      </div>
    </div>

    <!-- Competences -->
    <div class="mb-6">
      <p class="text-xs text-repae-gray-400 mb-2">Competences</p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="competence in alumni.competences"
          :key="competence"
          class="px-2.5 py-1 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 rounded-lg text-xs"
        >
          {{ competence }}
        </span>
      </div>
    </div>

    <!-- Link to full profile -->
    <NuxtLink
      :to="`/espace-entreprises/consulter-it/${alumni.id}`"
      class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-xl font-medium font-brand text-sm transition-colors"
    >
      <font-awesome-icon icon="fa-solid fa-user" />
      Voir le profil complet
    </NuxtLink>
  </div>
</template>
