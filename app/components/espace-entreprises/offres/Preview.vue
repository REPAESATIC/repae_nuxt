<script setup lang="ts">
import type { OffreEmploi } from '~/data/espace-entreprises/offres-emploi'
import { contratConfig, remoteConfig } from '~/data/espace-entreprises/offres-emploi'
import { experienceConfig } from '~/data/espace-it/offres'
import { currentEntreprise } from '~/data/espace-entreprises/current-entreprise'

const props = defineProps<{
  offre: OffreEmploi
  isModal?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'publish', id: string): void
  (e: 'edit', id: string): void
}>()

const formatSalaire = (min?: number, max?: number, devise?: string) => {
  if (!min && !max) return null
  if (min && max) {
    return `${min.toLocaleString()} - ${max.toLocaleString()} ${devise}`
  }
  if (min) return `A partir de ${min.toLocaleString()} ${devise}`
  return `Jusqu'a ${max?.toLocaleString()} ${devise}`
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div :class="isModal ? '' : 'bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden'">
    <!-- Modal header (only if modal) -->
    <div v-if="isModal" class="sticky top-0 bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 p-4 flex items-center justify-between z-10">
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
        Apercu de l'offre
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
      <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
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

      <!-- Job header -->
      <div>
        <div class="flex items-center gap-2 flex-wrap mb-3">
          <EspaceEntreprisesOffresStatusBadge :statut="offre.statut" show-icon />
          <span :class="['px-2.5 py-1 rounded-full text-xs font-medium', contratConfig[offre.type_contrat].color]">
            {{ contratConfig[offre.type_contrat].label }}
          </span>
          <span class="px-2.5 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
            {{ experienceConfig[offre.niveau_experience].label }}
          </span>
        </div>
        <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
          {{ offre.titre }}
        </h2>
      </div>

      <!-- Key info -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Localisation</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
              {{ offre.ville }}, {{ offre.pays }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon :icon="remoteConfig[offre.mode_remote].icon" class="text-blue-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Mode de travail</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
              {{ remoteConfig[offre.mode_remote].label }}
            </p>
          </div>
        </div>

        <div v-if="formatSalaire(offre.salaire_min, offre.salaire_max, offre.devise)" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-amber-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Salaire</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
              {{ formatSalaire(offre.salaire_min, offre.salaire_max, offre.devise) }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500" />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Niveau d'etudes</p>
            <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
              {{ offre.niveau_etudes }}
            </p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div>
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-file-alt" class="text-emerald-500" />
          Description du poste
        </h3>
        <p class="text-repae-gray-600 dark:text-repae-gray-400 whitespace-pre-line leading-relaxed">
          {{ offre.description }}
        </p>
      </div>

      <!-- Profil recherche -->
      <div>
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-user-check" class="text-emerald-500" />
          Profil recherche
        </h3>
        <p class="text-repae-gray-600 dark:text-repae-gray-400 whitespace-pre-line leading-relaxed">
          {{ offre.profil_recherche }}
        </p>
      </div>

      <!-- Competences -->
      <div>
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-code" class="text-emerald-500" />
          Competences requises
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="comp in offre.competences_requises"
            :key="comp"
            class="px-3 py-1.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 rounded-lg text-sm font-medium"
          >
            {{ comp }}
          </span>
        </div>
      </div>

      <!-- Date info -->
      <div class="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-500 dark:text-repae-gray-400">
        <span class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-calendar" />
          Date limite : {{ formatDate(offre.date_expiration) }}
        </span>
        <span v-if="offre.date_publication" class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-clock" />
          Publiee le {{ formatDate(offre.date_publication) }}
        </span>
      </div>
    </div>

    <!-- Actions footer -->
    <div v-if="isModal" class="sticky bottom-0 bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700 p-4 flex flex-col sm:flex-row items-center gap-3">
      <button
        v-if="offre.statut === 'brouillon'"
        type="button"
        class="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
        @click="emit('publish', offre.id)"
      >
        <font-awesome-icon icon="fa-solid fa-paper-plane" />
        Publier maintenant
      </button>
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.5 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
        @click="emit('edit', offre.id)"
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
