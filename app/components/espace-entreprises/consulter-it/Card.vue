<script setup lang="ts">
import type { ProfilIT } from '~/data/espace-entreprises/profils-it'
import { disponibiliteConfig, niveauExperienceConfig } from '~/data/espace-entreprises/profils-it'

const props = defineProps<{
  profil: ProfilIT
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <NuxtLink
    :to="`/espace-entreprises/consulter-it/${profil.id}`"
    class="block bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all group"
  >
    <!-- Header with photo -->
    <div class="flex items-start gap-4 mb-4">
      <img
        :src="profil.photo_url"
        :alt="`${profil.prenom} ${profil.nom}`"
        class="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-repae-gray-700 group-hover:border-emerald-300 dark:group-hover:border-emerald-500/50 transition-colors"
      />
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {{ profil.prenom }} {{ profil.nom }}
        </h3>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 truncate">
          {{ profil.titre }}
        </p>
        <span
          :class="[
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-2',
            disponibiliteConfig[profil.disponibilite].color
          ]"
        >
          <font-awesome-icon :icon="disponibiliteConfig[profil.disponibilite].icon" class="text-[10px]" />
          {{ disponibiliteConfig[profil.disponibilite].label }}
        </span>
      </div>
    </div>

    <!-- Info row -->
    <div class="flex items-center gap-3 text-xs text-repae-gray-400 mb-4">
      <span class="flex items-center gap-1">
        <font-awesome-icon icon="fa-solid fa-map-marker-alt" />
        {{ profil.ville }}
      </span>
      <span class="flex items-center gap-1">
        <font-awesome-icon icon="fa-solid fa-graduation-cap" />
        {{ profil.promotion }}
      </span>
      <span class="flex items-center gap-1">
        <font-awesome-icon icon="fa-solid fa-briefcase" />
        {{ profil.experience_annees }} ans
      </span>
    </div>

    <!-- Resume -->
    <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300 line-clamp-2 mb-4">
      {{ profil.resume }}
    </p>

    <!-- Competences -->
    <div class="flex flex-wrap gap-1.5 mb-4">
      <span
        v-for="competence in profil.competences.slice(0, 4)"
        :key="competence"
        class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 rounded text-xs"
      >
        {{ competence }}
      </span>
      <span
        v-if="profil.competences.length > 4"
        class="px-2 py-0.5 text-repae-gray-400 text-xs"
      >
        +{{ profil.competences.length - 4 }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-repae-gray-700">
      <span class="text-xs text-repae-gray-400">
        Mis a jour le {{ formatDate(profil.derniere_mise_a_jour) }}
      </span>
      <span class="text-xs text-repae-gray-400 flex items-center gap-1">
        <font-awesome-icon icon="fa-solid fa-eye" />
        {{ profil.nombre_vues }} vues
      </span>
    </div>
  </NuxtLink>
</template>
