<script setup lang="ts">
import type { StageFormData } from './Form.vue'
import { niveauEtudesConfig, remoteConfig } from '~/data/espace-entreprises/offres-stages'
import { currentEntreprise } from '~/data/espace-entreprises/current-entreprise'

const props = defineProps<{
  stage: StageFormData
  isModal?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'publish'): void
  (e: 'edit'): void
}>()

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div :class="isModal ? '' : 'bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden'">
    <!-- Modal header -->
    <div v-if="isModal" class="sticky top-0 bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 p-4 flex items-center justify-between z-10">
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
        Apercu du stage
      </h3>
      <button
        type="button"
        class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
        @click="emit('close')"
      >
        <font-awesome-icon icon="fa-solid fa-times" class="text-xl" />
      </button>
    </div>

    <div class="p-6 space-y-6">
      <!-- Enterprise info banner -->
      <div class="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-500/10 rounded-xl border border-purple-200 dark:border-purple-500/30">
        <img
          :src="currentEntreprise.logo_url"
          :alt="currentEntreprise.nom"
          class="w-14 h-14 rounded-xl object-cover"
        />
        <div>
          <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
            {{ currentEntreprise.nom }}
          </h4>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
            {{ currentEntreprise.secteur_activite }}
          </p>
        </div>
        <div v-if="currentEntreprise.verifie" class="ml-auto">
          <span class="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium">
            <font-awesome-icon icon="fa-solid fa-check-circle" />
            Entreprise verifiee
          </span>
        </div>
      </div>

      <!-- Stage header -->
      <div>
        <div class="flex items-center gap-2 flex-wrap mb-3">
          <span class="px-2.5 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
            Stage
          </span>
          <span v-if="stage.duree_mois" class="px-2.5 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
            {{ stage.duree_mois }} mois
          </span>
          <span
            v-if="stage.embauche_possible"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium"
          >
            <font-awesome-icon icon="fa-solid fa-user-plus" />
            Embauche possible
          </span>
        </div>
        <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ stage.titre || 'Titre du stage' }}
        </h2>
      </div>

      <!-- Key info grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-if="stage.ville" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Lieu</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ stage.ville }}, {{ stage.pays }}</p>
          </div>
        </div>

        <div v-if="stage.mode_remote" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon :icon="remoteConfig[stage.mode_remote].icon" class="text-blue-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Mode</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ remoteConfig[stage.mode_remote].label }}</p>
          </div>
        </div>

        <div v-if="stage.niveau_etudes" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Niveau</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ niveauEtudesConfig[stage.niveau_etudes].shortLabel }}</p>
          </div>
        </div>

        <div v-if="stage.gratification" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-amber-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Gratification</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ stage.gratification.toLocaleString() }} {{ stage.devise }}/mois</p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div v-if="stage.description">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-file-alt" class="text-purple-500" />
          Description du stage
        </h3>
        <p class="text-repae-gray-600 dark:text-repae-gray-400 whitespace-pre-line leading-relaxed">
          {{ stage.description }}
        </p>
      </div>

      <!-- Missions -->
      <div v-if="stage.missions.length > 0 && stage.missions[0]">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-list-check" class="text-purple-500" />
          Missions
        </h3>
        <ul class="space-y-2">
          <li
            v-for="(mission, index) in stage.missions.filter(m => m)"
            :key="index"
            class="flex items-start gap-2 text-repae-gray-600 dark:text-repae-gray-400"
          >
            <font-awesome-icon icon="fa-solid fa-check" class="text-purple-500 mt-1 text-sm" />
            {{ mission }}
          </li>
        </ul>
      </div>

      <!-- Profil recherche -->
      <div v-if="stage.profil_recherche">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-user-check" class="text-purple-500" />
          Profil recherche
        </h3>
        <p class="text-repae-gray-600 dark:text-repae-gray-400 whitespace-pre-line leading-relaxed">
          {{ stage.profil_recherche }}
        </p>
      </div>

      <!-- Competences -->
      <div v-if="stage.competences_requises.length > 0 && stage.competences_requises[0]">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-code" class="text-purple-500" />
          Competences a developper
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="comp in stage.competences_requises.filter(c => c)"
            :key="comp"
            class="px-3 py-1.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 rounded-lg text-sm font-medium"
          >
            {{ comp }}
          </span>
        </div>
      </div>

      <!-- Tuteur -->
      <div v-if="stage.tuteur_nom" class="bg-purple-50 dark:bg-purple-500/10 rounded-xl p-4">
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-user-tie" class="text-purple-500" />
          Tuteur de stage
        </h3>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-user" class="text-purple-500 text-lg" />
          </div>
          <div>
            <p class="font-medium text-repae-gray-900 dark:text-white">{{ stage.tuteur_nom }}</p>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">{{ stage.tuteur_poste }}</p>
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-500 dark:text-repae-gray-400">
        <span v-if="stage.date_debut" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-calendar" />
          Debut : {{ formatDate(stage.date_debut) }}
        </span>
        <span v-if="stage.date_fin_candidature" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-clock" />
          Candidater avant le {{ formatDate(stage.date_fin_candidature) }}
        </span>
      </div>
    </div>

    <!-- Actions footer -->
    <div v-if="isModal" class="sticky bottom-0 bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700 p-4 flex flex-col sm:flex-row items-center gap-3">
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
        @click="emit('publish')"
      >
        <font-awesome-icon icon="fa-solid fa-paper-plane" />
        Publier maintenant
      </button>
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.5 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
        @click="emit('edit')"
      >
        <font-awesome-icon icon="fa-solid fa-pencil-alt" />
        Modifier
      </button>
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.5 text-repae-gray-500 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 font-medium font-brand transition-colors cursor-pointer"
        @click="emit('close')"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
