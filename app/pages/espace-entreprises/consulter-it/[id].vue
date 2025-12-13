<script setup lang="ts">
import { getProfilById } from '~/data/espace-entreprises/profils-it'
import { getOrGenerateProfilDetails } from '~/data/espace-entreprises/profils-it-details'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

const route = useRoute()
const profilId = route.params.id as string

// Get basic profile data
const profil = computed(() => getProfilById(profilId))

// Get detailed profile data (CV format)
const profilDetails = computed(() => {
  if (!profil.value) return null
  return getOrGenerateProfilDetails(profilId, profil.value)
})

// 404 handling
if (!profil.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Profil non trouve'
  })
}

useHead({
  title: `${profil.value.prenom} ${profil.value.nom} - Profil IT | REPAE`
})

// Actions handlers
const handleContact = () => {
  // Open contact modal or navigate to contact form
  if (profilDetails.value?.email) {
    window.location.href = `mailto:${profilDetails.value.email}`
  }
}

const handleDownloadCV = () => {
  // In real app, this would trigger CV PDF generation/download
  alert('Fonctionnalite de telechargement du CV - a implementer')
}
</script>

<template>
  <div v-if="profil && profilDetails" class="max-w-6xl mx-auto">
    <!-- Back button -->
    <NuxtLink
      to="/espace-entreprises/consulter-it"
      class="inline-flex items-center gap-2 text-repae-gray-500 dark:text-repae-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
      Retour aux profils IT
    </NuxtLink>

    <!-- Profile Header -->
    <EspaceEntreprisesConsulterItProfileHeader
      :profil="profil"
      @contact="handleContact"
      @download-cv="handleDownloadCV"
    />

    <!-- Main content -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column - Main content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- About -->
        <EspaceEntreprisesConsulterItProfileAbout
          :profil="profil"
          :langues="profilDetails.langues"
        />

        <!-- Experiences -->
        <EspaceEntreprisesConsulterItProfileExperiences
          :experiences="profilDetails.experiences"
        />

        <!-- Formations & Certifications -->
        <EspaceEntreprisesConsulterItProfileFormations
          :formations="profilDetails.formations"
          :certifications="profilDetails.certifications"
        />
      </div>

      <!-- Right column - Sidebar -->
      <div class="space-y-6">
        <!-- Contact -->
        <EspaceEntreprisesConsulterItProfileContact
          :email="profilDetails.email"
          :telephone="profilDetails.telephone"
          :linkedin="profil.linkedin_url"
        />

        <!-- Competences -->
        <EspaceEntreprisesConsulterItProfileCompetences
          :competences="profilDetails.competences_detaillees"
        />

        <!-- Projets section (if available) -->
        <div
          v-if="profilDetails.projets && profilDetails.projets.length > 0"
          class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6"
        >
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-rocket" class="text-emerald-500" />
            Projets
          </h2>

          <div class="space-y-4">
            <div
              v-for="projet in profilDetails.projets"
              :key="projet.id"
              class="p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl"
            >
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="font-medium text-repae-gray-900 dark:text-white text-sm">
                  {{ projet.nom }}
                </h3>
                <a
                  v-if="projet.url"
                  :href="projet.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-emerald-500 hover:text-emerald-600 transition-colors"
                >
                  <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-xs" />
                </a>
              </div>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-3">
                {{ projet.description }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in projet.technologies"
                  :key="tech"
                  class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile stats -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-chart-line" class="text-emerald-500" />
            Statistiques
          </h2>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                Vues du profil
              </span>
              <span class="font-semibold text-repae-gray-900 dark:text-white">
                {{ profil.nombre_vues }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                Derniere mise a jour
              </span>
              <span class="font-medium text-repae-gray-900 dark:text-white text-sm">
                {{ new Date(profil.derniere_mise_a_jour).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
