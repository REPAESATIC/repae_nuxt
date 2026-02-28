<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Connexion Entreprise | REPAE'
})

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const route = useRoute()
const redirectPath = computed(() => route.query.redirect as string || '/espace-entreprises/dashboard')

const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Mock validation - accept any non-empty credentials
  if (form.value.email && form.value.password) {
    // Mock: store auth state
    localStorage.setItem('entreprise-auth', 'true')

    // Redirect to intended destination
    await navigateTo(redirectPath.value)
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }

  isLoading.value = false
}

const features = [
  { icon: 'fa-solid fa-bullhorn', title: 'Publiez vos offres', description: 'Diffusez vos offres d\'emploi et de stage aupres de notre reseau de talents IT' },
  { icon: 'fa-solid fa-users', title: 'Accedez aux profils', description: 'Consultez les CV de nos membres et trouvez les candidats ideaux' },
  { icon: 'fa-solid fa-star', title: 'Programme fidelite', description: 'Cumulez des points et debloquez des avantages exclusifs' }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-repae-gray-950 dark:via-repae-gray-900 dark:to-emerald-950/20 flex">
    <!-- Left Side - Login Form -->
    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-flex items-center gap-3 group">
            <div class="relative">
              <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                <font-awesome-icon icon="fa-solid fa-building" class="text-2xl text-white" />
              </div>
            </div>
            <div class="text-left">
              <span class="block text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
                REPAE
              </span>
              <span class="block text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Espace Entreprises
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Card -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-repae-gray-700 p-8">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Connexion
            </h1>
            <p class="text-repae-gray-500 dark:text-repae-gray-400">
              Accedez a votre espace entreprise
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
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
                Email professionnel
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="contact@entreprise.com"
                  class="w-full px-4 py-3 pl-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
                  required
                />
                <font-awesome-icon
                  icon="fa-solid fa-envelope"
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
                Mot de passe
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Votre mot de passe"
                  class="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
                  required
                />
                <font-awesome-icon
                  icon="fa-solid fa-lock"
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400"
                />
                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                  @click="showPassword = !showPassword"
                >
                  <font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" />
                </button>
              </div>
            </div>

            <!-- Remember & Forgot -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="form.rememberMe"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                />
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                  Se souvenir de moi
                </span>
              </label>
              <NuxtLink to="/mot-de-passe-oublie?from=entreprise" class="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
                Mot de passe oublié ?
              </NuxtLink>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-emerald-300 disabled:to-teal-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <font-awesome-icon
                v-if="isLoading"
                icon="fa-solid fa-spinner"
                class="animate-spin"
              />
              <font-awesome-icon
                v-else
                icon="fa-solid fa-arrow-right-to-bracket"
              />
              {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200 dark:border-repae-gray-700" />
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 text-sm text-repae-gray-400 bg-white dark:bg-repae-gray-800">
                Pas encore inscrit ?
              </span>
            </div>
          </div>

          <!-- Register Link -->
          <NuxtLink
            to="/espace-entreprises/inscription"
            class="block w-full px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 hover:bg-gray-200 dark:hover:bg-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 font-medium rounded-xl text-center transition-colors"
          >
            Creer un compte entreprise
          </NuxtLink>
        </div>

        <!-- Back to site -->
        <p class="text-center mt-6">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            Retour au site REPAE
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Side - Features (hidden on mobile) -->
    <div class="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 p-12 relative overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div class="relative z-10 max-w-lg">
        <h2 class="text-3xl font-bold font-brand text-white mb-4">
          Rejoignez le reseau REPAE
        </h2>
        <p class="text-emerald-100 text-lg mb-8">
          Connectez-vous avec les meilleurs talents IT de notre communaute d'anciens etudiants.
        </p>

        <div class="space-y-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
          >
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <font-awesome-icon :icon="feature.icon" class="text-xl text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-white mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-emerald-100">{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-white/20">
          <div class="text-center">
            <p class="text-3xl font-bold text-white">500+</p>
            <p class="text-sm text-emerald-100">Talents IT</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">50+</p>
            <p class="text-sm text-emerald-100">Entreprises</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">200+</p>
            <p class="text-sm text-emerald-100">Recrutements</p>
          </div>
        </div>
      </div>
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
