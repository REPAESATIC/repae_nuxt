<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Connexion Administration | REPAE'
})

const config = useRuntimeConfig()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const route = useRoute()
const redirectPath = computed(() => route.query.redirect as string || '/admin')

const handleSubmit = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await $fetch<{
      accessToken: string
      userId: string
      email: string
      role: string
    }>(`${config.public.identityApiBase}/users/login`, {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
      },
    })

    // Verifier que l'utilisateur a le role ADMIN
    if (response.role !== 'ADMIN') {
      errorMessage.value = 'Acces refuse. Vous n\'avez pas les droits administrateur.'
      isLoading.value = false
      return
    }

    // Stocker le token et les infos auth
    localStorage.setItem('admin-auth', 'true')
    localStorage.setItem('admin-token', response.accessToken)
    localStorage.setItem('admin-user', JSON.stringify({
      userId: response.userId,
      email: response.email,
      role: response.role,
    }))

    // Redirect to intended destination
    await navigateTo(redirectPath.value)
  } catch (e: any) {
    const status = e?.response?.status || e?.statusCode
    if (status === 401) {
      errorMessage.value = 'Email ou mot de passe incorrect.'
    } else {
      errorMessage.value = e?.data?.message || 'Erreur de connexion. Verifiez que le serveur est accessible.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50 dark:from-repae-gray-950 dark:via-repae-gray-900 dark:to-violet-950/20 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-3 group">
          <div class="relative">
            <div class="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-2xl text-white" />
            </div>
          </div>
          <div class="text-left">
            <span class="block text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              REPAE
            </span>
            <span class="block text-sm text-violet-600 dark:text-violet-400 font-medium">
              Administration
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
            Accedez au panneau d'administration
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
              Email administrateur
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="admin@repae.ci"
                class="w-full px-4 py-3 pl-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
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
                class="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
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
                class="w-4 h-4 rounded border-gray-300 text-violet-500 focus:ring-violet-500 cursor-pointer"
              />
              <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                Se souvenir de moi
              </span>
            </label>
            <NuxtLink to="/mot-de-passe-oublie?from=admin" class="text-sm text-violet-600 dark:text-violet-400 hover:underline">
              Mot de passe oublié ?
            </NuxtLink>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 disabled:from-violet-300 disabled:to-indigo-400 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
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
      </div>

      <!-- Back to site -->
      <p class="text-center mt-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Retour au site REPAE
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
