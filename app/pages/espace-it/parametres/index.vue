<script setup lang="ts">
import { currentUser } from '~/data/espace-it/current-user'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Parametres | Espace IT REPAE'
})

const { success } = useToast()
const { theme, setTheme } = useDarkMode()

// Settings state
const settings = reactive({
  // Profil
  visibilite_profil: 'public' as 'public' | 'alumni' | 'prive',
  afficher_email: true,
  afficher_telephone: false,
  afficher_disponibilite: true,

  // Notifications
  notif_nouvelles_offres: true,
  notif_candidature_vue: true,
  notif_entretien: true,
  notif_newsletter: false,

  // Preferences
  langue: 'fr'
})

// Handle theme change
const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
  setTheme(newTheme)
}

// Save settings
const saveSettings = () => {
  // Simulate API call
  setTimeout(() => {
    success('Parametres sauvegardes', 'Vos preferences ont ete mises a jour')
  }, 500)
}

// Visibilite options
const visibiliteOptions = [
  { value: 'public', label: 'Public', description: 'Visible par tous' },
  { value: 'alumni', label: 'Alumni uniquement', description: 'Visible par les membres IT' },
  { value: 'prive', label: 'Prive', description: 'Visible uniquement par vous' }
]

// Theme options
const themeOptions: { value: 'light' | 'dark' | 'system'; label: string; icon: string }[] = [
  { value: 'light', label: 'Clair', icon: 'fa-solid fa-sun' },
  { value: 'dark', label: 'Sombre', icon: 'fa-solid fa-moon' },
  { value: 'system', label: 'Systeme', icon: 'fa-solid fa-desktop' }
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
      <span class="text-repae-gray-900 dark:text-white">Parametres</span>
    </nav>

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-cog" class="text-repae-blue-500" />
        Parametres
      </h1>
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
        Gerez vos preferences et la confidentialite de votre compte
      </p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- Section: Confidentialite du profil -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-repae-blue-500" />
          Confidentialite du profil
        </h2>

        <!-- Visibilite -->
        <div class="mb-6">
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
            Visibilite du profil
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              v-for="option in visibiliteOptions"
              :key="option.value"
              :class="[
                'flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all',
                settings.visibilite_profil === option.value
                  ? 'border-repae-blue-500 bg-repae-blue-50 dark:bg-repae-blue-500/10'
                  : 'border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50'
              ]"
            >
              <input
                v-model="settings.visibilite_profil"
                type="radio"
                :value="option.value"
                class="sr-only"
              />
              <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                {{ option.label }}
              </span>
              <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
                {{ option.description }}
              </span>
            </label>
          </div>
        </div>

        <!-- Toggles -->
        <div class="space-y-4">
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
                settings.afficher_email ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.afficher_email = !settings.afficher_email"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.afficher_email ? 'left-7' : 'left-1'
                ]"
              />
            </button>
          </label>

          <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
            <div>
              <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                Afficher mon telephone
              </span>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Permettre aux autres membres de voir votre numero
              </p>
            </div>
            <button
              type="button"
              :class="[
                'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                settings.afficher_telephone ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.afficher_telephone = !settings.afficher_telephone"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.afficher_telephone ? 'left-7' : 'left-1'
                ]"
              />
            </button>
          </label>

          <label class="flex items-center justify-between py-3">
            <div>
              <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                Afficher ma disponibilite
              </span>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Indiquer si vous etes ouvert aux opportunites
              </p>
            </div>
            <button
              type="button"
              :class="[
                'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                settings.afficher_disponibilite ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.afficher_disponibilite = !settings.afficher_disponibilite"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.afficher_disponibilite ? 'left-7' : 'left-1'
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
          <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
            <div>
              <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                Nouvelles offres d'emploi
              </span>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Recevoir des alertes pour les nouvelles offres correspondant a votre profil
              </p>
            </div>
            <button
              type="button"
              :class="[
                'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                settings.notif_nouvelles_offres ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.notif_nouvelles_offres = !settings.notif_nouvelles_offres"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.notif_nouvelles_offres ? 'left-7' : 'left-1'
                ]"
              />
            </button>
          </label>

          <label class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
            <div>
              <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                Candidature vue
              </span>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Etre notifie quand un recruteur consulte votre candidature
              </p>
            </div>
            <button
              type="button"
              :class="[
                'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                settings.notif_candidature_vue ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.notif_candidature_vue = !settings.notif_candidature_vue"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.notif_candidature_vue ? 'left-7' : 'left-1'
                ]"
              />
            </button>
          </label>

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
                settings.notif_entretien ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.notif_entretien = !settings.notif_entretien"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.notif_entretien ? 'left-7' : 'left-1'
                ]"
              />
            </button>
          </label>

          <label class="flex items-center justify-between py-3">
            <div>
              <span class="font-medium font-brand text-repae-gray-900 dark:text-white">
                Newsletter REPAE
              </span>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Recevoir les actualites et evenements de l'association
              </p>
            </div>
            <button
              type="button"
              :class="[
                'relative w-12 h-6 rounded-full transition-colors cursor-pointer',
                settings.notif_newsletter ? 'bg-repae-blue-500' : 'bg-gray-300 dark:bg-repae-gray-600'
              ]"
              @click="settings.notif_newsletter = !settings.notif_newsletter"
            >
              <span
                :class="[
                  'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                  settings.notif_newsletter ? 'left-7' : 'left-1'
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

        <div class="mb-6">
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
            Theme
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
                {{ currentUser.email }}
              </p>
            </div>
            <button class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer">
              Modifier
            </button>
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
            <button class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer">
              Modifier
            </button>
          </div>

          <!-- Delete account -->
          <div class="flex items-center justify-between py-3">
            <div>
              <span class="font-medium font-brand text-red-600 dark:text-red-400">
                Supprimer le compte
              </span>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                Cette action est irreversible
              </p>
            </div>
            <button class="text-sm text-red-500 hover:text-red-600 font-medium font-brand cursor-pointer">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          class="px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center gap-2"
          @click="saveSettings"
        >
          <font-awesome-icon icon="fa-solid fa-save" />
          Sauvegarder les parametres
        </button>
      </div>
    </div>
  </div>
</template>
