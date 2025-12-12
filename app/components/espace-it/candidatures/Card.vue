<script setup lang="ts">
import type { Candidature } from '~/data/espace-it/candidatures'
import {
  statutConfig,
  formatDateCandidature,
  formatDateTimeEntretien,
  getTempsDepuisCandidature
} from '~/data/espace-it/candidatures'

const props = defineProps<{
  candidature: Candidature
}>()

const emit = defineEmits<{
  (e: 'retirer', id: string): void
  (e: 'voir-offre', id: string): void
}>()

const statut = computed(() => statutConfig[props.candidature.statut])
const tempsCandidature = computed(() => getTempsDepuisCandidature(props.candidature.date_candidature))

// Check if candidature can be withdrawn
const canWithdraw = computed(() => {
  return ['en_attente', 'vue'].includes(props.candidature.statut)
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50 hover:shadow-lg transition-all duration-300">
    <!-- Header -->
    <div class="p-5 pb-4">
      <div class="flex items-start gap-4">
        <!-- Logo entreprise -->
        <div class="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-repae-gray-700">
          <img
            :src="candidature.offre.entreprise.logo_url"
            :alt="candidature.offre.entreprise.nom"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Titre et entreprise -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span
              :class="[
                'px-2.5 py-1 rounded-lg text-xs font-medium font-brand inline-flex items-center gap-1.5',
                statut.color
              ]"
            >
              <font-awesome-icon :icon="statut.icon" class="text-xs" />
              {{ statut.label }}
            </span>
            <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
              {{ candidature.offre.type_contrat }}
            </span>
          </div>
          <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white line-clamp-1">
            {{ candidature.offre.titre }}
          </h3>
          <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-0.5">
            {{ candidature.offre.entreprise.nom }}
          </p>
          <div class="flex items-center gap-1.5 mt-1 text-xs text-repae-gray-500 dark:text-repae-gray-500">
            <font-awesome-icon icon="fa-solid fa-location-dot" class="text-repae-gray-400" />
            <span>{{ candidature.offre.entreprise.ville }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Statut description -->
    <div class="px-5 pb-4">
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
        {{ statut.description }}
      </p>
    </div>

    <!-- Entretien info (if applicable) -->
    <div
      v-if="candidature.statut === 'entretien' && candidature.date_entretien"
      class="mx-5 mb-4 p-3 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 rounded-xl"
    >
      <div class="flex items-center gap-2 text-purple-700 dark:text-purple-400">
        <font-awesome-icon icon="fa-solid fa-calendar-check" />
        <span class="text-sm font-medium font-brand">
          Entretien prevu le {{ formatDateTimeEntretien(candidature.date_entretien) }}
        </span>
      </div>
    </div>

    <!-- Notes recruteur (if applicable) -->
    <div
      v-if="candidature.notes_recruteur && ['acceptee', 'refusee', 'entretien'].includes(candidature.statut)"
      class="mx-5 mb-4 p-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl"
    >
      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-1">Note du recruteur :</p>
      <p class="text-sm text-repae-gray-700 dark:text-repae-gray-300 italic">
        "{{ candidature.notes_recruteur }}"
      </p>
    </div>

    <!-- Timeline -->
    <div class="px-5 pb-4">
      <div class="flex items-center gap-4 text-xs text-repae-gray-500 dark:text-repae-gray-400">
        <div class="flex items-center gap-1.5">
          <font-awesome-icon icon="fa-regular fa-calendar" class="text-repae-gray-400" />
          <span>Candidature : {{ formatDateCandidature(candidature.date_candidature) }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <font-awesome-icon icon="fa-solid fa-clock" class="text-repae-gray-400" />
          <span>{{ tempsCandidature }}</span>
        </div>
      </div>
    </div>

    <!-- Documents -->
    <div class="px-5 pb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-if="candidature.cv_url"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon icon="fa-solid fa-file-alt" />
          CV joint
        </span>
        <span
          v-if="candidature.lettre_motivation_url"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 rounded-lg text-xs font-brand"
        >
          <font-awesome-icon icon="fa-solid fa-file-alt" />
          Lettre de motivation
        </span>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="px-5 py-3 bg-gray-50 dark:bg-repae-gray-900/50 border-t border-gray-100 dark:border-repae-gray-700/50 flex items-center justify-between">
      <NuxtLink
        :to="`/espace-it/offres/${candidature.offre.id}`"
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 dark:hover:text-repae-blue-300 font-medium font-brand flex items-center gap-1.5 transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-xs" />
        Voir l'offre
      </NuxtLink>

      <button
        v-if="canWithdraw"
        class="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium font-brand flex items-center gap-1.5 transition-colors cursor-pointer"
        @click="emit('retirer', candidature.id)"
      >
        <font-awesome-icon icon="fa-solid fa-times" />
        Retirer
      </button>
    </div>
  </div>
</template>
