<script setup lang="ts">
import { userProfile } from '@/data/espace-it/user-profile'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Modifier mon profil | Espace IT REPAE'
})

// Form state (clone of userProfile for editing)
const formData = reactive({
  prenom: userProfile.prenom,
  nom: userProfile.nom,
  email: userProfile.email,
  telephone: userProfile.telephone,
  photo_url: userProfile.photo_url,
  cover_url: userProfile.cover_url || '',
  poste_actuel: userProfile.poste_actuel,
  entreprise_actuelle: userProfile.entreprise_actuelle,
  pays: userProfile.pays,
  ville: userProfile.ville,
  adresse: userProfile.adresse || '',
  disponibilite: userProfile.disponibilite,
  biographie: userProfile.biographie,
  site_web: userProfile.site_web || '',
  linkedin_url: userProfile.linkedin_url || '',
  twitter_url: userProfile.twitter_url || '',
  github_url: userProfile.github_url || ''
})

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  isSubmitting.value = false
  showSuccessMessage.value = true

  // Hide success message after 3 seconds
  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)
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
          Mettez a jour vos informations personnelles et professionnelles
        </p>
      </div>
    </div>

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
          Votre profil a ete mis a jour avec succes !
        </p>
      </div>
    </Transition>

    <!-- Edit Form -->
    <EspaceItProfilProfileEditForm
      :form-data="formData"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
