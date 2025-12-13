<script setup lang="ts">
import type { ProfilIT } from '~/data/espace-entreprises/profils-it'
import { disponibiliteConfig } from '~/data/espace-entreprises/profils-it'

const props = defineProps<{
  profil: ProfilIT
}>()
</script>

<template>
  <NuxtLink
    :to="`/espace-entreprises/consulter-it/${profil.id}`"
    class="flex items-center gap-4 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all group"
  >
    <!-- Photo -->
    <img
      :src="profil.photo_url"
      :alt="`${profil.prenom} ${profil.nom}`"
      class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-repae-gray-700 flex-shrink-0"
    />

    <!-- Main info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {{ profil.prenom }} {{ profil.nom }}
        </h3>
        <span
          :class="[
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
            disponibiliteConfig[profil.disponibilite].color
          ]"
        >
          {{ disponibiliteConfig[profil.disponibilite].label }}
        </span>
      </div>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        {{ profil.titre }}
      </p>
    </div>

    <!-- Meta info -->
    <div class="hidden md:flex items-center gap-6 text-sm text-repae-gray-500 dark:text-repae-gray-400">
      <span class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-xs" />
        {{ profil.ville }}
      </span>
      <span class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-xs" />
        {{ profil.promotion }}
      </span>
      <span class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-xs" />
        {{ profil.experience_annees }} ans
      </span>
    </div>

    <!-- Competences (desktop) -->
    <div class="hidden lg:flex items-center gap-1.5 flex-shrink-0 max-w-xs">
      <span
        v-for="competence in profil.competences.slice(0, 3)"
        :key="competence"
        class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 rounded text-xs whitespace-nowrap"
      >
        {{ competence }}
      </span>
      <span
        v-if="profil.competences.length > 3"
        class="text-repae-gray-400 text-xs"
      >
        +{{ profil.competences.length - 3 }}
      </span>
    </div>

    <!-- Arrow -->
    <div class="flex-shrink-0 text-repae-gray-300 dark:text-repae-gray-600 group-hover:text-emerald-500 transition-colors">
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </div>
  </NuxtLink>
</template>
