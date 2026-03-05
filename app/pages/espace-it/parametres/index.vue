<script setup lang="ts">
import type { UserPreferenceItem } from '@/composables/useIdentityApi'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Paramètres | Espace IT REPAE'
})

const { fetchMyAlumni, fetchMyPreferences, updateMyPreferences, requestPasswordReset } = useIdentityApi()
const toast = useToast()
const { theme, setTheme } = useDarkMode()

// États
const isLoading = ref(true)
const error = ref<string | null>(null)
const userEmail = ref('')
const preferences = ref<UserPreferenceItem | null>(null)
const savingField = ref<string | null>(null)
const isResettingPassword = ref(false)

// Charger les données au montage
const loadSettings = async () => {
  isLoading.value = true
  error.value = null

  try {
    // Valeurs par defaut si les preferences n'existent pas encore
    const defaultPreferences: UserPreferenceItem = {
      id: '',
      theme: 'SYSTEM',
      notifyJobOffers: true,
      notifyApplicationViewed: true,
      notifyInterviewReminders: true,
      notifyNewsletter: true,
      isProfilePublic: true,
      displayEmail: false,
      displayPhone: false,
      displayAvailability: true,
      createdAt: '',
      updatedAt: '',
    }

    const [alumni, prefs] = await Promise.all([
      fetchMyAlumni(),
      fetchMyPreferences().catch((e: any) => {
        // 404 = preferences pas encore creees, utiliser les defauts
        if (e?.statusCode === 404 || e?.response?.status === 404) {
          return defaultPreferences
        }
        throw e
      }),
    ])

    userEmail.value = alumni.email || ''
    preferences.value = prefs

    // Synchroniser le theme local avec le backend
    const themeMap: Record<string, 'light' | 'dark' | 'system'> = {
      LIGHT: 'light',
      DARK: 'dark',
      SYSTEM: 'system',
    }
    if (prefs.theme && themeMap[prefs.theme]) {
      setTheme(themeMap[prefs.theme])
    }
  } catch (e: any) {
    console.error('Erreur chargement paramètres:', e)
    error.value = e?.data?.message || 'Impossible de charger les paramètres.'

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

onMounted(loadSettings)

// Sauvegarder un champ individuel
const savePreference = async (field: string, value: boolean) => {
  if (!preferences.value) return
  savingField.value = field

  try {
    const updated = await updateMyPreferences({ [field]: value })
    preferences.value = updated
    toast.success('Préférence mise à jour')
  } catch {
    toast.error('Erreur lors de la sauvegarde')
    // Annuler le changement local
    await loadSettings()
  } finally {
    savingField.value = null
  }
}

// Toggle un champ boolean
const togglePreference = (field: keyof UserPreferenceItem) => {
  if (!preferences.value) return
  const newValue = !preferences.value[field]
  ;(preferences.value as any)[field] = newValue
  savePreference(field, newValue as boolean)
}

// Changer le thème
const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
  setTheme(newTheme)

  const themeMap: Record<string, 'LIGHT' | 'DARK' | 'SYSTEM'> = {
    light: 'LIGHT',
    dark: 'DARK',
    system: 'SYSTEM',
  }

  savingField.value = 'theme'
  try {
    const updated = await updateMyPreferences({ theme: themeMap[newTheme] })
    preferences.value = updated
    toast.success('Thème mis à jour')
  } catch {
    toast.error('Erreur lors de la sauvegarde du thème')
  } finally {
    savingField.value = null
  }
}

// Réinitialiser le mot de passe
const handlePasswordReset = async () => {
  if (!userEmail.value) return
  isResettingPassword.value = true

  try {
    await requestPasswordReset(userEmail.value)
    toast.success('Un lien de réinitialisation a été envoyé à votre email')
  } catch {
    toast.error('Erreur lors de l\'envoi du lien de réinitialisation')
  } finally {
    isResettingPassword.value = false
  }
}

// Theme options
const themeOptions: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
  { value: 'light', label: 'Clair', icon: 'fa-solid fa-sun' },
  { value: 'dark', label: 'Sombre', icon: 'fa-solid fa-moon' },
  { value: 'system', label: 'Système', icon: 'fa-solid fa-desktop' },
]
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
      <span class="text-repae-gray-900 dark:text-white">Paramètres</span>
    </nav>

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-cog" class="text-repae-blue-500" />
        Paramètres
      </h1>
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
        Gérez vos préférences et la confidentialité de votre compte
      </p>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-3xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">Chargement des paramètres...</span>
    </div>

    <!-- État d'erreur -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-6 text-center"
    >
      <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-3xl text-red-500 mb-3" />
      <p class="text-red-700 dark:text-red-400 font-brand">{{ error }}</p>
      <button
        class="mt-4 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white rounded-lg font-brand text-sm transition-colors cursor-pointer"
        @click="loadSettings"
      >
        Réessayer
      </button>
    </div>

    <!-- Contenu -->
    <template v-else-if="preferences">
      <div class="space-y-6">
        <!-- Section: Confidentialité du profil -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-repae-blue-500" />
            Confidentialité du profil
          </h2>

          <div class="space-y-4">
            <!-- Profil public -->
            <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Profil public
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Rendre votre profil visible par tous les visiteurs
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.isProfilePublic ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'isProfilePublic'"
                @click="togglePreference('isProfilePublic')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.isProfilePublic ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>

            <!-- Afficher email -->
            <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Afficher mon email
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Permettre aux autres membres de voir votre email
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.displayEmail ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'displayEmail'"
                @click="togglePreference('displayEmail')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.displayEmail ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>

            <!-- Afficher téléphone -->
            <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Afficher mon téléphone
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Permettre aux autres membres de voir votre numéro
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.displayPhone ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'displayPhone'"
                @click="togglePreference('displayPhone')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.displayPhone ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>

            <!-- Afficher disponibilité -->
            <label class="flex items-center justify-between py-3">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Afficher ma disponibilité
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Indiquer si vous êtes ouvert aux opportunités
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.displayAvailability ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'displayAvailability'"
                @click="togglePreference('displayAvailability')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.displayAvailability ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>
          </div>
        </div>

        <!-- Section: Notifications -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-bell" class="text-repae-blue-500" />
            Notifications
          </h2>

          <div class="space-y-4">
            <!-- Nouvelles offres -->
            <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Nouvelles offres d'emploi
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Recevoir des alertes pour les nouvelles offres correspondant à votre profil
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.notifyJobOffers ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'notifyJobOffers'"
                @click="togglePreference('notifyJobOffers')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.notifyJobOffers ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>

            <!-- Candidature vue -->
            <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Candidature vue
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Être notifié quand un recruteur consulte votre candidature
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.notifyApplicationViewed ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'notifyApplicationViewed'"
                @click="togglePreference('notifyApplicationViewed')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.notifyApplicationViewed ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>

            <!-- Rappels d'entretien -->
            <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Rappels d'entretien
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Recevoir des rappels avant vos entretiens
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.notifyInterviewReminders ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'notifyInterviewReminders'"
                @click="togglePreference('notifyInterviewReminders')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.notifyInterviewReminders ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>

            <!-- Newsletter -->
            <label class="flex items-center justify-between py-3">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Newsletter REPAE
                </span>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  Recevoir les actualités et événements de l'association
                </p>
              </div>
              <button
                type="button"
                :class="[
                  'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                  preferences.notifyNewsletter ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
                ]"
                :disabled="savingField === 'notifyNewsletter'"
                @click="togglePreference('notifyNewsletter')"
              >
                <span
                  :class="[
                    'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                    preferences.notifyNewsletter ? 'left-7' : 'left-1'
                  ]"
                />
              </button>
            </label>
          </div>
        </div>

        <!-- Section: Apparence -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-palette" class="text-repae-blue-500" />
            Apparence
          </h2>

          <!-- Thème -->
          <div class="mb-6">
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
              Thème
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="option in themeOptions"
                :key="option.value"
                type="button"
                :class="[
                  'flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all',
                  theme === option.value
                    ? 'border-repae-blue-500 bg-repae-blue-50 dark:bg-repae-blue-500/10'
                    : 'border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50'
                ]"
                :disabled="savingField === 'theme'"
                @click="handleThemeChange(option.value)"
              >
                <font-awesome-icon
                  :icon="option.icon"
                  :class="[
                    'text-xl mb-2',
                    theme === option.value ? 'text-repae-blue-500' : 'text-repae-gray-400'
                  ]"
                />
                <span class="font-medium font-brand text-sm text-repae-gray-900 dark:text-white">
                  {{ option.label }}
                </span>
              </button>
            </div>
          </div>

          <!-- Langue -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300">
                Langue
              </label>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-[10px]" />
                Bientôt disponible
              </span>
            </div>
            <select
              disabled
              class="w-full sm:w-48 px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-400 dark:text-repae-gray-500 text-sm cursor-not-allowed opacity-60"
            >
              <option>Français</option>
            </select>
          </div>
        </div>

        <!-- Section: Compte -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-user-cog" class="text-repae-blue-500" />
            Compte
          </h2>

          <div class="space-y-4">
            <!-- Email -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Email
                </span>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ userEmail }}
                </p>
              </div>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-[10px]" />
                Bientôt disponible
              </span>
            </div>

            <!-- Password -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
              <div>
                <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  Mot de passe
                </span>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  ••••••••••••
                </p>
              </div>
              <button
                class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                :disabled="isResettingPassword"
                @click="handlePasswordReset"
              >
                <font-awesome-icon
                  v-if="isResettingPassword"
                  icon="fa-solid fa-spinner"
                  class="animate-spin"
                />
                Réinitialiser
              </button>
            </div>

            <!-- Delete account -->
            <div class="flex items-center justify-between py-3">
              <div>
                <span class="font-medium font-brand text-red-600 dark:text-red-400">
                  Supprimer le compte
                </span>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  Cette action est irréversible
                </p>
              </div>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-[10px]" />
                Bientôt disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
