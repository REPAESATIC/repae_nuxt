<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Réinitialiser le mot de passe | REPAE'
})

const { resetPassword } = useIdentityApi()

const route = useRoute()
const token = computed(() => (route.query.token as string) || '')

const form = ref({
  password: '',
  confirmPassword: '',
})

const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Règles de validation du mot de passe
const passwordRules = computed(() => [
  { label: '8 caractères minimum', valid: form.value.password.length >= 8 },
  { label: 'Une majuscule', valid: /[A-Z]/.test(form.value.password) },
  { label: 'Une minuscule', valid: /[a-z]/.test(form.value.password) },
  { label: 'Un chiffre', valid: /[0-9]/.test(form.value.password) },
  { label: 'Un caractère spécial (!@#$%...)', valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.value.password) },
])

const allRulesValid = computed(() => passwordRules.value.every(r => r.valid))
const passwordsMatch = computed(() => form.value.password === form.value.confirmPassword && form.value.confirmPassword.length > 0)
const canSubmit = computed(() => allRulesValid.value && passwordsMatch.value && !isLoading.value)

// Force du mot de passe
const passwordStrength = computed(() => {
  const validCount = passwordRules.value.filter(r => r.valid).length
  if (validCount <= 1) return { level: 0, label: '', color: '' }
  if (validCount <= 2) return { level: 1, label: 'Faible', color: 'bg-red-500' }
  if (validCount <= 3) return { level: 2, label: 'Moyen', color: 'bg-yellow-500' }
  if (validCount <= 4) return { level: 3, label: 'Bon', color: 'bg-blue-500' }
  return { level: 4, label: 'Excellent', color: 'bg-green-500' }
})

const handleSubmit = async () => {
  if (!canSubmit.value) return

  if (!token.value) {
    errorMessage.value = 'Token de réinitialisation manquant. Veuillez utiliser le lien reçu par email.'
    return
  }

  errorMessage.value = ''
  isLoading.value = true

  try {
    await resetPassword(token.value, form.value.password)
    isSuccess.value = true
  } catch (e: any) {
    const status = e?.response?.status || e?.statusCode
    if (status === 404) {
      errorMessage.value = 'Ce lien de réinitialisation est invalide ou a expiré. Veuillez en demander un nouveau.'
    } else if (status === 400) {
      errorMessage.value = e?.data?.message || 'Le mot de passe ne respecte pas les critères de sécurité.'
    } else {
      errorMessage.value = 'Une erreur est survenue. Veuillez réessayer plus tard.'
    }
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
              Nouveau mot de passe
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
              <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-repae-blue-500 text-xl" />
            </div>
            <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Nouveau mot de passe
            </h1>
            <p class="text-repae-gray-500 dark:text-repae-gray-400 text-sm">
              Choisissez un mot de passe sécurisé pour votre compte.
            </p>
          </div>

          <!-- Error Message -->
          <Transition name="slide-down">
            <div
              v-if="errorMessage"
              class="mb-4 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
            >
              <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
              <div>
                {{ errorMessage }}
                <NuxtLink
                  v-if="errorMessage.includes('expiré') || errorMessage.includes('invalide')"
                  to="/mot-de-passe-oublie"
                  class="block mt-1 underline font-medium"
                >
                  Demander un nouveau lien
                </NuxtLink>
              </div>
            </div>
          </Transition>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- Nouveau mot de passe -->
            <div>
              <label for="password" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
                Nouveau mot de passe
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Votre nouveau mot de passe"
                  class="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
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

              <!-- Indicateur de force -->
              <div v-if="form.password.length > 0" class="mt-2">
                <div class="flex gap-1 mb-1">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                    :class="i <= passwordStrength.level ? passwordStrength.color : 'bg-gray-200 dark:bg-repae-gray-700'"
                  />
                </div>
                <p v-if="passwordStrength.label" class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Force : <span :class="{ 'text-red-500': passwordStrength.level === 1, 'text-yellow-500': passwordStrength.level === 2, 'text-blue-500': passwordStrength.level === 3, 'text-green-500': passwordStrength.level === 4 }">{{ passwordStrength.label }}</span>
                </p>
              </div>

              <!-- Règles -->
              <ul v-if="form.password.length > 0" class="mt-3 space-y-1">
                <li
                  v-for="rule in passwordRules"
                  :key="rule.label"
                  class="flex items-center gap-2 text-xs transition-colors"
                  :class="rule.valid ? 'text-green-500' : 'text-repae-gray-400 dark:text-repae-gray-500'"
                >
                  <font-awesome-icon
                    :icon="rule.valid ? 'fa-solid fa-check' : 'fa-solid fa-circle'"
                    :class="rule.valid ? '' : 'text-[8px]'"
                  />
                  {{ rule.label }}
                </li>
              </ul>
            </div>

            <!-- Confirmation -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
                Confirmer le mot de passe
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirmez votre mot de passe"
                  class="w-full px-4 py-3 pl-11 pr-11 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
                  required
                />
                <font-awesome-icon
                  icon="fa-solid fa-lock"
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400"
                />
                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <font-awesome-icon :icon="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" />
                </button>
              </div>
              <p
                v-if="form.confirmPassword.length > 0 && !passwordsMatch"
                class="mt-1.5 text-xs text-red-500"
              >
                Les mots de passe ne correspondent pas.
              </p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full px-6 py-3 bg-gradient-to-r from-repae-blue-500 to-repae-blue-700 hover:from-repae-blue-600 hover:to-repae-blue-800 disabled:from-repae-blue-300 disabled:to-repae-blue-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-repae-blue-500/25 hover:shadow-repae-blue-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <font-awesome-icon
                v-if="isLoading"
                icon="fa-solid fa-spinner"
                class="animate-spin"
              />
              <font-awesome-icon
                v-else
                icon="fa-solid fa-check"
              />
              {{ isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe' }}
            </button>
          </form>
        </template>

        <!-- État succès -->
        <template v-else>
          <div class="text-center">
            <div class="mx-auto w-14 h-14 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 text-2xl" />
            </div>
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Mot de passe modifié !
            </h2>
            <p class="text-repae-gray-500 dark:text-repae-gray-400 text-sm mb-6">
              Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
            <NuxtLink
              to="/connexion-it"
              class="block w-full px-6 py-3 bg-gradient-to-r from-repae-blue-500 to-repae-blue-700 hover:from-repae-blue-600 hover:to-repae-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-repae-blue-500/25 hover:shadow-repae-blue-500/40 transition-all duration-300 text-center"
            >
              <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" class="mr-2" />
              Se connecter
            </NuxtLink>
          </div>
        </template>
      </div>

      <!-- Retour -->
      <p class="text-center mt-6">
        <NuxtLink
          to="/connexion-it"
          class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-600 dark:hover:text-repae-blue-400 transition-colors"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Retour à la connexion
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
