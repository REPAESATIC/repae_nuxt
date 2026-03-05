<script setup lang="ts">
import type { UserProfile } from '@/data/espace-it/user-profile'
import type { Formation } from '@/data/espace-it/formations'
import type { Experience } from '@/data/espace-it/experiences'
import type { Competence } from '@/data/espace-it/competences'
import type { ProjetPortfolio } from '@/data/espace-it/portfolio'

definePageMeta({
  layout: 'espace-it'
})

const route = useRoute()

const {
  fetchAlumni,
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

// État réactif
const isLoading = ref(true)
const error = ref<string | null>(null)
const alumniProfile = ref<UserProfile | null>(null)
const formations = ref<Formation[]>([])
const experiences = ref<Experience[]>([])
const competences = ref<Competence[]>([])
const portfolio = ref<ProjetPortfolio[]>([])

const loadAlumniProfile = async () => {
  isLoading.value = true
  error.value = null

  try {
    const alumniId = route.params.id as string
    const alumni = await fetchAlumni(alumniId)

    // Charger les données liées en parallèle
    const [workExps, edus, projs] = await Promise.all([
      fetchWorkExperiences(alumni.id).catch(() => []),
      fetchEducations(alumni.id).catch(() => []),
      fetchProjects(alumni.id).catch(() => []),
    ])

    // Transformer via useProfileAdapter
    const mappedExperiences = workExps.map(workExperienceToExperience)
    const mappedFormations = edus.map(educationToFormation)
    const mappedCompetences = (alumni.skills || []).map(alumniSkillToCompetence)
    const mappedPortfolio = projs.map(projectToPortfolio)

    let profile = alumniToUserProfile(alumni)
    profile = enrichProfileWithCurrentJob(profile, mappedExperiences)

    alumniProfile.value = profile
    experiences.value = mappedExperiences
    formations.value = mappedFormations
    competences.value = mappedCompetences
    portfolio.value = mappedPortfolio
  } catch (e: any) {
    console.error('Erreur chargement profil alumni:', e)
    if (e?.response?.status === 404 || e?.statusCode === 404) {
      error.value = 'not_found'
    } else {
      error.value = e?.data?.message || 'Impossible de charger le profil.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(loadAlumniProfile)

// SEO meta dynamique
useSeoMeta({
  title: computed(() =>
    alumniProfile.value
      ? `${alumniProfile.value.prenom} ${alumniProfile.value.nom} | Annuaire IT REPAE`
      : 'Profil Alumni | Annuaire IT REPAE'
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
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink
        to="/espace-it/annuaire"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Annuaire des IT
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">
        {{ alumniProfile ? `${alumniProfile.prenom} ${alumniProfile.nom}` : 'Profil' }}
      </span>
    </nav>

    <!-- Back Button -->
    <div>
      <NuxtLink
        to="/espace-it/annuaire"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour à l'annuaire
      </NuxtLink>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-3xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">Chargement du profil...</span>
    </div>

    <!-- État d'erreur -->
    <div
      v-else-if="error === 'not_found'"
      class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-user" class="text-2xl text-repae-gray-400" />
      </div>
      <h2 class="text-xl font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Alumni non trouvé
      </h2>
      <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
        Le profil que vous recherchez n'existe pas ou a été supprimé.
      </p>
      <NuxtLink
        to="/espace-it/annuaire"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour à l'annuaire
      </NuxtLink>
    </div>

    <!-- Erreur générique -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-6 text-center"
    >
      <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-3xl text-red-500 mb-3" />
      <p class="text-red-700 dark:text-red-400 font-brand">{{ error }}</p>
      <button
        @click="loadAlumniProfile"
        class="mt-4 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white rounded-lg font-brand text-sm transition-colors cursor-pointer"
      >
        Réessayer
      </button>
    </div>

    <!-- Profil Alumni -->
    <template v-else-if="alumniProfile">
      <EspaceItAnnuaireProfile
        :profile="alumniProfile"
        :experiences="experiences"
        :formations="formations"
        :competences="competences"
        :portfolio="portfolio"
      />
    </template>
  </div>
</template>
