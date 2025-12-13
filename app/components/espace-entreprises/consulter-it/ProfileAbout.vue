<script setup lang="ts">
import type { ProfilIT } from '~/data/espace-entreprises/profils-it'

const props = defineProps<{
  profil: ProfilIT
  langues: { langue: string; niveau: string }[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-user" class="text-emerald-500" />
      A propos
    </h2>

    <p class="text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed mb-6">
      {{ profil.resume }}
    </p>

    <!-- Key info -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-lg">
        <p class="text-xs text-repae-gray-400 mb-1">Secteur</p>
        <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
          {{ profil.secteur_activite }}
        </p>
      </div>
      <div v-if="profil.entreprise_actuelle" class="p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-lg">
        <p class="text-xs text-repae-gray-400 mb-1">Entreprise actuelle</p>
        <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
          {{ profil.entreprise_actuelle }}
        </p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-lg">
        <p class="text-xs text-repae-gray-400 mb-1">Experience</p>
        <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
          {{ profil.experience_annees }} ans
        </p>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-lg">
        <p class="text-xs text-repae-gray-400 mb-1">Promotion REPAE</p>
        <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
          {{ profil.promotion }}
        </p>
      </div>
    </div>

    <!-- Langues -->
    <div v-if="langues.length > 0">
      <h3 class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-3">
        Langues
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="lang in langues"
          :key="lang.langue"
          class="px-3 py-1.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 rounded-lg text-sm"
        >
          {{ lang.langue }} - <span class="text-repae-gray-500">{{ lang.niveau }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
