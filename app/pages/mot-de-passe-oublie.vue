<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Mot de passe oublié | REPAE'
})

const { requestPasswordReset } = useIdentityApi()

const email = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const route = useRoute()
const from = computed(() => (route.query.from as string) || 'it')

const loginRoute = computed(() => {
  switch (from.value) {
    case 'admin': return '/connexion-admin'
    case 'entreprise': return '/connexion-entreprise'
    default: return '/connexion-it'
  }
})

const loginLabel = computed(() => {
  switch (from.value) {
    case 'admin': return 'Connexion Admin'
    case 'entreprise': return 'Connexion Entreprise'
    default: return 'Connexion Espace IT'
  }
})

const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await requestPasswordReset(email.value)
    isSuccess.value = true
  } catch {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer plus tard.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-repae-blue-50 dark:from-repae-gray-950 dark:via-repae-gray-900 dark:to-repae-blue-950/20 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-3 group">
          <div class="relative">
            <img
              src="/image/logos_REAPE/ICONE/ICONE_REPAE_BBL.png"
              alt="REPAE"
              class="h-14 w-14 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div class="text-left">
            <span class="block text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              REPAE
            </span>
            <span class="block text-sm text-repae-blue-600 dark:text-repae-blue-400 font-medium">
              Réinitialisation
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Card -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-repae-gray-700 p-8">
        <!-- État initial : formulaire -->
        <template v-if="!isSuccess">
          <div class="text-center mb-6">
            <div class="mx-auto w-14 h-14 bg-repae-blue-50 dark:bg-repae-blue-500/10 rounded-full flex items-center justify-center mb-4">
              <font-awesome-icon icon="fa-solid fa-lock" class="text-repae-blue-500 text-xl" />
            </div>
            <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Mot de passe oublié ?
            </h1>
            <p class="text-repae-gray-500 dark:text-repae-gray-400 text-sm">
              Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
          </div>

          <!-- Error Message -->
          <Transition name="slide-down">
            <div
              v-if="errorMessage"
              class="mb-4 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
            >
              <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
              {{ errorMessage }}
            </div>
          </Transition>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="email" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
                Adresse email
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="prenom.nom@email.com"
                  class="w-full px-4 py-3 pl-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
                  required
                />
                <font-awesome-icon
                  icon="fa-solid fa-envelope"
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full px-6 py-3 bg-gradient-to-r from-repae-blue-500 to-repae-blue-700 hover:from-repae-blue-600 hover:to-repae-blue-800 disabled:from-repae-blue-300 disabled:to-repae-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-repae-blue-500/25 hover:shadow-repae-blue-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <font-awesome-icon
                v-if="isLoading"
                icon="fa-solid fa-spinner"
                class="animate-spin"
              />
              <font-awesome-icon
                v-else
                icon="fa-solid fa-paper-plane"
              />
              {{ isLoading ? 'Envoi en cours...' : 'Envoyer le lien' }}
            </button>
          </form>
        </template>

        <!-- État succès -->
        <template v-else>
          <div class="text-center">
            <div class="mx-auto w-14 h-14 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <font-awesome-icon icon="fa-solid fa-check" class="text-green-500 text-xl" />
            </div>
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Email envoyé !
            </h2>
            <p class="text-repae-gray-500 dark:text-repae-gray-400 text-sm mb-6">
              Si un compte est associé à l'adresse <strong class="text-repae-gray-700 dark:text-repae-gray-200">{{ email }}</strong>, vous recevrez un lien de réinitialisation dans quelques instants. Pensez à vérifier vos spams.
            </p>
            <button
              class="w-full px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 hover:bg-gray-200 dark:hover:bg-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 font-medium rounded-xl transition-colors cursor-pointer"
              @click="isSuccess = false; email = ''"
            >
              Envoyer un autre lien
            </button>
          </div>
        </template>
      </div>

      <!-- Retour connexion -->
      <p class="text-center mt-6">
        <NuxtLink
          :to="loginRoute"
          class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-600 dark:hover:text-repae-blue-400 transition-colors"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Retour à {{ loginLabel }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
