<script setup lang="ts">
import type { UserProfile } from '@/data/espace-it/user-profile'
import type { Formation } from '@/data/espace-it/formations'
import type { Experience } from '@/data/espace-it/experiences'
import type { Competence } from '@/data/espace-it/competences'
import type { ProjetPortfolio } from '@/data/espace-it/portfolio'

definePageMeta({
  layout: 'espace-it'
})

const {
  fetchMyAlumni,
  fetchWorkExperiences,
  fetchEducations,
  fetchProjects,
} = useIdentityApi()

const {
  alumniToUserProfile,
  workExperienceToExperience,
  educationToFormation,
  alumniSkillToCompetence,
  projectToPortfolio,
  enrichProfileWithCurrentJob,
} = useProfileAdapter()

// Etat reactif
const isLoading = ref(true)
const error = ref<string | null>(null)
const userProfile = ref<UserProfile | null>(null)
const formations = ref<Formation[]>([])
const experiences = ref<Experience[]>([])
const competences = ref<Competence[]>([])
const portfolio = ref<ProjetPortfolio[]>([])

const loadProfile = async () => {
  isLoading.value = true
  error.value = null

  try {
    // 1. Recuperer le profil alumni authentifie
    const alumni = await fetchMyAlumni()

    // 2. Recuperer les donnees liees en parallele
    const [workExps, edus, projs] = await Promise.all([
      fetchWorkExperiences(alumni.id).catch(() => []),
      fetchEducations(alumni.id).catch(() => []),
      fetchProjects(alumni.id).catch(() => []),
    ])

    // 3. Transformer vers les types francais
    const mappedExperiences = workExps.map(workExperienceToExperience)
    const mappedFormations = edus.map(educationToFormation)
    const mappedCompetences = (alumni.skills || []).map(alumniSkillToCompetence)
    const mappedPortfolio = projs.map(projectToPortfolio)

    // 4. Construire le profil et enrichir avec le poste actuel
    let profile = alumniToUserProfile(alumni)
    profile = enrichProfileWithCurrentJob(profile, mappedExperiences)

    // 5. Assigner aux refs
    userProfile.value = profile
    experiences.value = mappedExperiences
    formations.value = mappedFormations
    competences.value = mappedCompetences
    portfolio.value = mappedPortfolio
  } catch (e: any) {
    console.error('Erreur chargement profil:', e)
    error.value = e?.data?.message || 'Impossible de charger le profil.'

    // Si 401, rediriger vers la connexion
    if (e?.response?.status === 401 || e?.statusCode === 401) {
      if (import.meta.client) {
        localStorage.removeItem('it-auth')
        localStorage.removeItem('it-token')
        localStorage.removeItem('it-user')
      }
      navigateTo('/connexion-it')
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(loadProfile)

// SEO meta dynamique
useSeoMeta({
  title: computed(() =>
    userProfile.value
      ? `${userProfile.value.prenom} ${userProfile.value.nom} - Mon Profil | Espace IT REPAE`
      : 'Mon Profil | Espace IT REPAE'
  ),
})
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
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        class="text-xs text-repae-gray-400"
      />
      <span class="text-repae-gray-900 dark:text-white">Mon profil</span>
    </nav>

    <!-- Etat de chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-3xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">Chargement du profil...</span>
    </div>

    <!-- Etat d'erreur -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-6 text-center"
    >
      <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-3xl text-red-500 mb-3" />
      <p class="text-red-700 dark:text-red-400 font-brand">{{ error }}</p>
      <button
        @click="loadProfile"
        class="mt-4 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white rounded-lg font-brand text-sm transition-colors cursor-pointer"
      >
        Reessayer
      </button>
    </div>

    <!-- Contenu du profil -->
    <template v-else-if="userProfile">
      <!-- Profile Header -->
      <EspaceItProfilProfileHeader :profile="userProfile" />

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About -->
          <EspaceItProfilProfileAbout :biographie="userProfile.biographie" />

          <!-- Formations -->
          <EspaceItProfilProfileFormation :formations="formations" />

          <!-- Experiences professionnelles -->
          <EspaceItProfilProfileExperience :experiences="experiences" />

          <!-- Portfolio -->
          <EspaceItProfilProfilePortfolio :projets="portfolio" />
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Contact Info -->
          <EspaceItProfilProfileContact :profile="userProfile" />

          <!-- Competences -->
          <EspaceItProfilProfileCompetences :competences="competences" />
        </div>
      </div>
    </template>
  </div>
</template>
