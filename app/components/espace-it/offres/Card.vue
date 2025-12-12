<script setup lang="ts">
import type { Offre } from '~/data/espace-it/offres'
import {
  contratConfig,
  experienceConfig,
  remoteConfig,
  formatSalaire,
  getTempsDepuisPublication
} from '~/data/espace-it/offres'

const props = defineProps<{
  offre: Offre
}>()

const contrat = computed(() => contratConfig[props.offre.type_contrat])
const experience = computed(() => experienceConfig[props.offre.niveau_experience])
const remote = computed(() => remoteConfig[props.offre.mode_remote])
const salaire = computed(() => formatSalaire(props.offre))
const tempsPublication = computed(() => getTempsDepuisPublication(props.offre.date_publication))
</script>

<template>
  <NuxtLink
    :to="`/espace-it/offres/${offre.id}`"
    class="block bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden group"
  >
    <!-- Header avec entreprise -->
    <div class="p-5 pb-4">
      <div class="flex items-start gap-4">
        <!-- Logo entreprise -->
        <div class="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-repae-gray-700">
          <img
            :src="offre.entreprise.logo_url"
            :alt="offre.entreprise.nom"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Titre et entreprise -->
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors line-clamp-1">
            {{ offre.titre }}
          </h3>
          <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-0.5">
            {{ offre.entreprise.nom }}
          </p>
          <div class="flex items-center gap-1.5 mt-1 text-xs text-repae-gray-500 dark:text-repae-gray-500">
            <font-awesome-icon icon="fa-solid fa-location-dot" class="text-repae-gray-400" />
            <span>{{ offre.entreprise.ville }}, {{ offre.entreprise.pays }}</span>
          </div>
        </div>

        <!-- Badge type contrat -->
        <span
          :class="[
            'px-2.5 py-1 rounded-lg text-xs font-medium font-brand flex-shrink-0',
            contrat.color
          ]"
        >
          {{ contrat.label }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <div class="px-5 pb-4">
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 line-clamp-2">
        {{ offre.description }}
      </p>
    </div>

    <!-- Competences requises (apercu) -->
    <div class="px-5 pb-4">
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="(competence, index) in offre.competences_requises.slice(0, 4)"
          :key="index"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 text-xs rounded-md font-brand"
        >
          {{ competence }}
        </span>
        <span
          v-if="offre.competences_requises.length > 4"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-500 text-xs rounded-md font-brand"
        >
          +{{ offre.competences_requises.length - 4 }}
        </span>
      </div>
    </div>

    <!-- Infos pratiques -->
    <div class="px-5 pb-4 flex flex-wrap items-center gap-3 text-xs text-repae-gray-500 dark:text-repae-gray-400">
      <!-- Experience -->
      <div class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-chart-line" class="text-repae-gray-400" />
        <span>{{ experience.label }}</span>
      </div>

      <!-- Mode remote -->
      <div class="flex items-center gap-1.5">
        <font-awesome-icon :icon="remote.icon" class="text-repae-gray-400" />
        <span>{{ remote.label }}</span>
      </div>

      <!-- Salaire -->
      <div v-if="offre.salaire_min || offre.salaire_max" class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-repae-gray-400" />
        <span>{{ salaire }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-5 py-3 bg-gray-50 dark:bg-repae-gray-900/50 border-t border-gray-100 dark:border-repae-gray-700/50 flex items-center justify-between">
      <!-- Temps depuis publication -->
      <div class="flex items-center gap-1.5 text-xs text-repae-gray-500 dark:text-repae-gray-500">
        <font-awesome-icon icon="fa-regular fa-clock" />
        <span>{{ tempsPublication }}</span>
      </div>

      <!-- Nombre de candidatures -->
      <div class="flex items-center gap-1.5 text-xs text-repae-gray-500 dark:text-repae-gray-500">
        <font-awesome-icon icon="fa-solid fa-users" class="text-repae-gray-400" />
        <span>{{ offre.nombre_candidatures }} candidature(s)</span>
      </div>

      <!-- Fleche -->
      <div class="text-repae-blue-500 group-hover:translate-x-1 transition-transform">
        <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-sm" />
      </div>
    </div>
  </NuxtLink>
</template>
