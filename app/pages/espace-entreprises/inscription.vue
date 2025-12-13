<script setup lang="ts">
// Page PUBLIQUE - pas de middleware d'authentification
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Inscription Entreprise | REPAE',
  meta: [
    { name: 'description', content: 'Inscrivez votre entreprise sur le REPAE pour recruter les meilleurs talents IT de Cote d\'Ivoire.' }
  ]
})

// State
const isSuccess = ref(false)

const handleSuccess = () => {
  isSuccess.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-950 py-8 md:py-12">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <!-- Logo -->
        <NuxtLink to="/" class="inline-block mb-6">
          <img
            src="/image/logos_REAPE/ICONE/ICONE_REPAE_BGR1.png"
            alt="REPAE"
            class="h-16 mx-auto dark:hidden"
          />
          <img
            src="/image/logos_REAPE/ICONE/ICONE_REPAE_GRB1.png"
            alt="REPAE"
            class="h-16 mx-auto hidden dark:block"
          />
        </NuxtLink>

        <h1 class="text-3xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
          Inscription Entreprise
        </h1>
        <p class="text-repae-gray-600 dark:text-repae-gray-400 max-w-lg mx-auto">
          Rejoignez le reseau REPAE et accedez aux meilleurs talents IT issus de l'ESATIC
        </p>
      </div>

      <!-- Main Card -->
      <div class="bg-white dark:bg-repae-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-repae-gray-800 overflow-hidden">
        <!-- Benefits banner (only show if not success) -->
        <div
          v-if="!isSuccess"
          class="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white"
        >
          <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-solid fa-check-circle" />
              <span>Acces aux profils IT</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-solid fa-check-circle" />
              <span>Publication d'offres</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-solid fa-check-circle" />
              <span>Programme fidelite</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 md:p-8">
          <!-- Success state -->
          <EspaceEntreprisesInscriptionSuccess v-if="isSuccess" />

          <!-- Form -->
          <EspaceEntreprisesInscriptionForm
            v-else
            @success="handleSuccess"
          />
        </div>
      </div>

      <!-- Already have an account -->
      <div v-if="!isSuccess" class="text-center mt-6">
        <p class="text-repae-gray-600 dark:text-repae-gray-400">
          Deja inscrit ?
          <NuxtLink
            to="/connexion-entreprise"
            class="text-emerald-500 hover:text-emerald-600 font-medium"
          >
            Se connecter
          </NuxtLink>
        </p>
      </div>

      <!-- Back to home -->
      <div class="text-center mt-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 transition-colors"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Retour a l'accueil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
