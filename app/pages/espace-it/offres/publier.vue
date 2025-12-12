<script setup lang="ts">
import type { Offre } from '~/data/espace-it/offres'
import { contratConfig, experienceConfig, remoteConfig } from '~/data/espace-it/offres'
import { entreprisesList } from '~/data/espace-it/entreprises-alumni'
import { currentUser } from '~/data/espace-it/current-user'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Publier une offre | Espace IT REPAE'
})

// Preview modal state
const showPreview = ref(false)
const previewData = ref<Offre | null>(null)

// Success modal state
const showSuccess = ref(false)

// Handle form submission
const handleSubmit = async (formData: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Show success modal
  showSuccess.value = true
}

// Handle preview
const handlePreview = (formData: any) => {
  const entreprise = entreprisesList.find(e => e.id === formData.entreprise_id)

  if (!entreprise) return

  // Build preview offre object
  previewData.value = {
    id: 'preview',
    titre: formData.titre,
    entreprise: {
      id: entreprise.id,
      nom: entreprise.nom,
      logo_url: entreprise.logo_url,
      ville: entreprise.ville,
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: formData.type_contrat,
    niveau_experience: formData.niveau_experience,
    mode_remote: formData.mode_remote,
    salaire_min: formData.salaire_min,
    salaire_max: formData.salaire_max,
    devise: formData.devise,
    description: formData.description,
    description_complete: formData.description_complete,
    responsabilites: formData.responsabilites,
    competences_requises: formData.competences_requises,
    competences_souhaitees: formData.competences_souhaitees,
    avantages: formData.avantages,
    date_publication: new Date().toISOString().split('T')[0],
    date_expiration: formData.date_expiration,
    statut: 'active',
    nombre_candidatures: 0,
    publie_par: {
      id: currentUser.id,
      prenom: currentUser.prenom,
      nom: currentUser.nom,
      photo_url: currentUser.photo_url,
      poste: currentUser.poste_actuel
    }
  }

  showPreview.value = true
}

// Close preview
const closePreview = () => {
  showPreview.value = false
  previewData.value = null
}

// Navigate to offers list after success
const goToOffresList = () => {
  navigateTo('/espace-it/offres')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink
        to="/espace-it"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink
        to="/espace-it/offres"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Offres d'emploi
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Publier une offre</span>
    </nav>

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-plus-circle" class="text-repae-blue-500" />
        Publier une offre d'emploi
      </h1>
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
        Partagez une opportunite d'emploi avec la communaute IT de REPAE
      </p>
    </div>

    <!-- Info banner -->
    <div class="bg-repae-blue-50 dark:bg-repae-blue-500/10 border border-repae-blue-200 dark:border-repae-blue-500/30 rounded-xl p-4 flex items-start gap-3">
      <font-awesome-icon icon="fa-solid fa-info-circle" class="text-repae-blue-500 mt-0.5" />
      <div class="text-sm text-repae-blue-700 dark:text-repae-blue-300">
        <p class="font-medium mb-1">Conseils pour une offre attractive</p>
        <ul class="list-disc list-inside space-y-0.5 text-repae-blue-600 dark:text-repae-blue-400">
          <li>Soyez precis sur les competences recherchees</li>
          <li>Indiquez une fourchette de salaire si possible</li>
          <li>Decrivez les avantages et la culture d'entreprise</li>
          <li>Mentionnez les possibilites d'evolution</li>
        </ul>
      </div>
    </div>

    <!-- Form -->
    <EspaceItOffresForm
      @submit="handleSubmit"
      @preview="handlePreview"
    />

    <!-- Preview Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showPreview && previewData"
          class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
        >
          <!-- Backdrop -->
          <div
            class="fixed inset-0 bg-black/50"
            @click="closePreview"
          />

          <!-- Modal -->
          <div class="relative bg-gray-50 dark:bg-repae-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full my-8">
            <!-- Header -->
            <div class="sticky top-0 z-10 px-6 py-4 bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 rounded-t-2xl flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center">
                  <font-awesome-icon icon="fa-solid fa-eye" class="text-repae-blue-500" />
                </div>
                <div>
                  <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
                    Previsualisation
                  </h2>
                  <p class="text-sm text-repae-gray-500">
                    Voici comment votre offre apparaitra
                  </p>
                </div>
              </div>
              <button
                class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                @click="closePreview"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" class="text-xl" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-6">
              <EspaceItOffresProfile
                :offre="previewData"
                @postuler="closePreview"
              />
            </div>

            <!-- Footer -->
            <div class="sticky bottom-0 px-6 py-4 bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700 rounded-b-2xl flex items-center justify-end gap-3">
              <button
                class="px-4 py-2.5 text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-800 dark:hover:text-repae-gray-200 font-medium font-brand rounded-xl transition-colors cursor-pointer"
                @click="closePreview"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showSuccess"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50" />

          <!-- Modal -->
          <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-check" class="text-4xl text-green-500" />
            </div>
            <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Offre publiee !
            </h2>
            <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-8">
              Votre offre d'emploi a ete publiee avec succes. Elle est maintenant visible par tous les membres de la communaute IT.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                class="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer"
                @click="showSuccess = false"
              >
                Publier une autre
              </button>
              <button
                class="flex-1 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer"
                @click="goToOffresList"
              >
                Voir mes offres
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
