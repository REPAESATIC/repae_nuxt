<script setup lang="ts">
import type { AlumniItem } from '@/composables/useIdentityApi'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Modifier mon profil | Espace IT REPAE'
})

const { fetchMyAlumni, updateMyAlumni, fetchCountries, fetchWorkExperiences } = useIdentityApi()
const { workExperienceToExperience } = useProfileAdapter()

const isLoading = ref(true)
const error = ref<string | null>(null)
const alumniRaw = ref<AlumniItem | null>(null)

// Donnees de formulaire — initialisees apres chargement
const formData = reactive({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  photo_url: '',
  cover_url: '',
  poste_actuel: '',
  entreprise_actuelle: '',
  pays: '',
  ville: '',
  adresse: '',
  disponibilite: 'en_poste' as 'disponible' | 'en_poste' | 'ouvert_opportunites',
  biographie: '',
  site_web: '',
  linkedin_url: '',
  twitter_url: '',
  github_url: '',
})

// Liste des pays depuis l'API
const countriesList = ref<string[]>([])

const loadProfile = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Charger le profil et les pays en parallele
    const [alumni, countriesResult] = await Promise.all([
      fetchMyAlumni(),
      fetchCountries({ limit: 200 }).catch(() => ({ data: [] as { name: string }[] })),
    ])

    alumniRaw.value = alumni
    countriesList.value = countriesResult.data.map((c: { name: string }) => c.name)

    // Remplir le formulaire avec les donnees du profil
    formData.prenom = alumni.firstName
    formData.nom = alumni.lastName
    formData.email = alumni.email || ''
    formData.telephone = alumni.phoneNumber || ''
    formData.photo_url = alumni.photoUrl || ''
    formData.cover_url = alumni.coverPicUrl || ''
    formData.pays = alumni.country || ''
    formData.ville = alumni.city || ''
    formData.adresse = alumni.address || ''
    formData.disponibilite = alumni.isOpenToMentoring ? 'ouvert_opportunites' : 'en_poste'
    formData.biographie = alumni.bio || ''
    formData.site_web = alumni.portfolioUrl || ''
    formData.linkedin_url = alumni.linkedinUrl || ''
    formData.twitter_url = alumni.xUrl || ''
    formData.github_url = alumni.githubUrl || ''

    // Recuperer le poste actuel depuis les experiences
    try {
      const workExps = await fetchWorkExperiences(alumni.id)
      const mappedExps = workExps.map(workExperienceToExperience)
      const currentJob = mappedExps.find(e => e.en_cours)
      if (currentJob) {
        formData.poste_actuel = currentJob.poste
        formData.entreprise_actuelle = currentJob.entreprise
      }
    } catch {
      // Pas critique si les experiences echouent
    }
  } catch (e: any) {
    console.error('Erreur chargement profil:', e)
    error.value = e?.data?.message || 'Impossible de charger le profil.'

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

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const submitError = ref<string | null>(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null

  try {
    await updateMyAlumni({
      firstName: formData.prenom,
      lastName: formData.nom,
      phoneNumber: formData.telephone || undefined,
      city: formData.ville || undefined,
      address: formData.adresse || undefined,
      bio: formData.biographie || undefined,
      photoUrl: formData.photo_url || undefined,
      coverPicUrl: formData.cover_url || undefined,
      portfolioUrl: formData.site_web || undefined,
      githubUrl: formData.github_url || undefined,
      linkedinUrl: formData.linkedin_url || undefined,
      xUrl: formData.twitter_url || undefined,
      isOpenToMentoring: formData.disponibilite === 'ouvert_opportunites',
    })

    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  } catch (e: any) {
    console.error('Erreur sauvegarde profil:', e)
    submitError.value = e?.data?.message || 'Erreur lors de la sauvegarde du profil.'
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  navigateTo('/espace-it/profil')
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
        to="/espace-it/profil"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Mon profil
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Modifier</span>
    </nav>

    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Modifier mon profil
        </h1>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
          Mettez à jour vos informations personnelles et professionnelles
        </p>
      </div>
    </div>

    <!-- Etat de chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-3xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">Chargement du profil...</span>
    </div>

    <!-- Etat d'erreur chargement -->
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

    <template v-else>
      <!-- Success Message -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="showSuccessMessage"
          class="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 flex items-center gap-3"
        >
          <font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 text-lg" />
          <p class="text-green-700 dark:text-green-400 font-brand">
            Votre profil a été mis à jour avec succès !
          </p>
        </div>
      </Transition>

      <!-- Erreur de soumission -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="submitError"
          class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-center gap-3"
        >
          <font-awesome-icon icon="fa-solid fa-exclamation-circle" class="text-red-500 text-lg" />
          <p class="text-red-700 dark:text-red-400 font-brand">{{ submitError }}</p>
        </div>
      </Transition>

      <!-- Edit Form -->
      <EspaceItProfilProfileEditForm
        :form-data="formData"
        :is-submitting="isSubmitting"
        :countries-list="countriesList"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </template>
  </div>
</template>
