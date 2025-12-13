<script setup lang="ts">
// Animation on mount
const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="text-center py-8">
    <!-- Success animation -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-50"
      enter-to-class="opacity-100 scale-100"
    >
      <div
        v-if="isVisible"
        class="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center"
      >
        <font-awesome-icon
          icon="fa-solid fa-check-circle"
          class="text-5xl text-emerald-500"
        />
      </div>
    </Transition>

    <!-- Title -->
    <Transition
      enter-active-class="transition-all duration-500 delay-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <h2
        v-if="isVisible"
        class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4"
      >
        Inscription reussie !
      </h2>
    </Transition>

    <!-- Message -->
    <Transition
      enter-active-class="transition-all duration-500 delay-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="isVisible" class="max-w-md mx-auto">
        <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
          Votre demande d'inscription a bien ete envoyee.
          Notre equipe va verifier vos informations et valider votre compte dans les plus brefs delais.
        </p>

        <!-- Info card -->
        <div class="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
          <div class="flex items-start gap-3">
            <font-awesome-icon
              icon="fa-solid fa-info-circle"
              class="text-amber-500 mt-0.5"
            />
            <div class="text-left">
              <p class="font-medium font-brand text-amber-800 dark:text-amber-400 text-sm mb-1">
                En attente de validation
              </p>
              <p class="text-xs text-amber-700 dark:text-amber-300/80">
                Vous recevrez un email de confirmation une fois votre compte valide par notre equipe.
                Ce processus prend generalement 24 a 48 heures.
              </p>
            </div>
          </div>
        </div>

        <!-- Next steps -->
        <div class="bg-gray-50 dark:bg-repae-gray-800 rounded-xl p-5 text-left mb-6">
          <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
            Prochaines etapes
          </h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">1</span>
              </div>
              <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                Verifiez votre boite email (et vos spams)
              </span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">2</span>
              </div>
              <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                Attendez l'email de confirmation de validation
              </span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">3</span>
              </div>
              <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                Connectez-vous et commencez a recruter !
              </span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors"
          >
            <font-awesome-icon icon="fa-solid fa-home" />
            Retour a l'accueil
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-repae-gray-700 hover:bg-gray-50 dark:hover:bg-repae-gray-800 text-repae-gray-700 dark:text-repae-gray-300 rounded-xl font-medium font-brand transition-colors"
          >
            <font-awesome-icon icon="fa-solid fa-envelope" />
            Nous contacter
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
