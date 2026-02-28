<script setup lang="ts">
import type { UserItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { fetchUser, updateUser, requestPasswordReset, adminResetPassword } = useIdentityApi()

const compteId = route.params.id as string

// State
const loading = ref(true)
const saving = ref(false)
const original = ref<UserItem | null>(null)

const form = reactive({
  email: '',
  role: 'ALUMNI' as 'ADMIN' | 'ALUMNI' | 'STUDENT',
  status: 'ACTIVE' as 'PENDING' | 'ACTIVE' | 'BANNED',
})

const roleOptions = [
  { value: 'ADMIN' as const, label: 'Admin', icon: 'fa-solid fa-shield-alt', class: 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  { value: 'ALUMNI' as const, label: 'Alumni', icon: 'fa-solid fa-user-graduate', class: 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { value: 'STUDENT' as const, label: 'Etudiant', icon: 'fa-solid fa-graduation-cap', class: 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
]

const statusOptions = [
  { value: 'PENDING' as const, label: 'En attente', icon: 'fa-solid fa-hourglass-half', class: 'border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' },
  { value: 'ACTIVE' as const, label: 'Actif', icon: 'fa-solid fa-check-circle', class: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
  { value: 'BANNED' as const, label: 'Banni', icon: 'fa-solid fa-ban', class: 'border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' },
]

// Helpers
const roleConfig: Record<string, { label: string; class: string }> = {
  ADMIN: { label: 'Admin', class: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400' },
  ALUMNI: { label: 'Alumni', class: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
  STUDENT: { label: 'Etudiant', class: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400' },
}

const statusConfig: Record<string, { label: string; icon: string; class: string }> = {
  PENDING: { label: 'En attente', icon: 'fa-solid fa-hourglass-half', class: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' },
  ACTIVE: { label: 'Actif', icon: 'fa-solid fa-check-circle', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  BANNED: { label: 'Banni', icon: 'fa-solid fa-ban', class: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' },
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return 'Jamais'
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const formatDateTime = (date: string | null | undefined) => {
  if (!date) return 'Jamais'
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Toggle status action
const toggling = ref(false)

const handleToggleStatus = async () => {
  if (!original.value) return
  toggling.value = true
  try {
    const newStatus = original.value.status === 'BANNED' ? 'PENDING' : 'BANNED'
    const updated = await updateUser(compteId, { status: newStatus })
    original.value = { ...updated }
    form.status = updated.status
    toast.success(
      updated.status === 'BANNED' ? 'Compte banni' : 'Compte reactive',
      `Le compte a ete ${updated.status === 'BANNED' ? 'banni' : 'reactive'}.`,
    )
  } catch (e: any) {
    const msg = e?.data?.message || 'Impossible de modifier le statut du compte.'
    toast.error('Erreur', msg)
  } finally {
    toggling.value = false
  }
}

// Reset password (par email)
const resettingPassword = ref(false)

const handleResetPassword = async () => {
  if (!original.value) return
  resettingPassword.value = true
  try {
    await requestPasswordReset(original.value.email)
    toast.info('Email envoyé', 'Un email de réinitialisation du mot de passe a été envoyé.')
  } catch {
    toast.error('Erreur', 'Impossible d\'envoyer l\'email de réinitialisation.')
  } finally {
    resettingPassword.value = false
  }
}

// Reset password direct (admin)
const showAdminResetForm = ref(false)
const adminResetting = ref(false)
const adminPasswordForm = reactive({
  password: '',
  confirmPassword: '',
})
const showAdminPassword = ref(false)
const adminPasswordError = ref('')

const adminPasswordRules = computed(() => [
  { label: '8 caractères minimum', valid: adminPasswordForm.password.length >= 8 },
  { label: 'Une majuscule', valid: /[A-Z]/.test(adminPasswordForm.password) },
  { label: 'Une minuscule', valid: /[a-z]/.test(adminPasswordForm.password) },
  { label: 'Un chiffre', valid: /[0-9]/.test(adminPasswordForm.password) },
  { label: 'Un caractère spécial', valid: /[^a-zA-Z0-9]/.test(adminPasswordForm.password) },
])

const allAdminRulesValid = computed(() => adminPasswordRules.value.every(r => r.valid))
const adminPasswordsMatch = computed(() => adminPasswordForm.password === adminPasswordForm.confirmPassword && adminPasswordForm.confirmPassword.length > 0)
const canAdminReset = computed(() => allAdminRulesValid.value && adminPasswordsMatch.value && !adminResetting.value)

const handleAdminResetPassword = async () => {
  if (!canAdminReset.value) return
  adminPasswordError.value = ''
  adminResetting.value = true
  try {
    await adminResetPassword(compteId, adminPasswordForm.password)
    toast.success('Mot de passe modifié', 'Le nouveau mot de passe a été défini avec succès.')
    showAdminResetForm.value = false
    adminPasswordForm.password = ''
    adminPasswordForm.confirmPassword = ''
  } catch (e: any) {
    const msg = e?.data?.message || 'Impossible de modifier le mot de passe.'
    adminPasswordError.value = Array.isArray(msg) ? msg[0] : msg
  } finally {
    adminResetting.value = false
  }
}

// Load data
onMounted(async () => {
  try {
    const data = await fetchUser(compteId)
    original.value = { ...data }
    form.email = data.email
    form.role = data.role
    form.status = data.status
  } catch (e: any) {
    const status = e?.response?.status || e?.statusCode
    if (status === 404) {
      toast.error('Erreur', 'Compte non trouve.')
    } else {
      toast.error('Erreur', 'Impossible de charger le compte.')
    }
    router.push('/admin/comptes')
  } finally {
    loading.value = false
  }
})

// Submit
const submit = async () => {
  if (!form.email.trim()) {
    toast.warning('Champ requis', 'L\'email est obligatoire.')
    return
  }

  saving.value = true
  try {
    // N'envoyer que les champs modifies (evite les transitions de statut invalides)
    const payload: { email?: string; role?: typeof form.role; status?: typeof form.status } = {}
    if (form.email !== original.value?.email) payload.email = form.email
    if (form.role !== original.value?.role) payload.role = form.role
    if (form.status !== original.value?.status) payload.status = form.status

    if (Object.keys(payload).length === 0) {
      toast.info('Aucun changement', 'Aucune modification detectee.')
      saving.value = false
      return
    }

    await updateUser(compteId, payload)
    toast.success('Compte mis a jour', 'Les modifications ont ete enregistrees.')
    router.push('/admin/comptes')
  } catch (e: any) {
    const msg = e?.data?.message || 'Impossible de mettre a jour le compte.'
    toast.error('Erreur', Array.isArray(msg) ? msg[0] : msg)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <template v-else-if="original">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/admin/comptes"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
          </NuxtLink>
          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ original.email }}
              </h2>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                  roleConfig[original.role]?.class || ''
                ]"
              >
                {{ roleConfig[original.role]?.label }}
              </span>
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                  statusConfig[original.status]?.class || ''
                ]"
              >
                <font-awesome-icon :icon="statusConfig[original.status]?.icon || 'fa-solid fa-circle'" class="text-[10px]" />
                {{ statusConfig[original.status]?.label }}
              </span>
            </div>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
              Modifier les informations du compte
            </p>
          </div>
        </div>

        <!-- Toggle status button -->
        <button
          :disabled="toggling"
          :class="[
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold font-brand text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0',
            original.status === 'BANNED'
              ? 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/25'
              : 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/25'
          ]"
          @click="handleToggleStatus"
        >
          <font-awesome-icon
            :icon="toggling ? 'fa-solid fa-spinner' : (original.status === 'BANNED' ? 'fa-solid fa-check-circle' : 'fa-solid fa-ban')"
            :class="{ 'animate-spin': toggling }"
          />
          {{ original.status === 'BANNED' ? 'Activer' : 'Bannir' }}
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Email -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Email *
          </label>
          <div class="relative">
            <font-awesome-icon
              icon="fa-solid fa-envelope"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400 text-sm"
            />
            <input
              v-model="form.email"
              type="email"
              placeholder="utilisateur@repae.ci"
              class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            />
          </div>
        </div>

        <!-- Role -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
            Role
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="opt in roleOptions"
              :key="opt.value"
              type="button"
              :class="[
                'flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold font-brand text-sm transition-all cursor-pointer',
                form.role === opt.value
                  ? opt.class
                  : 'border-gray-200 dark:border-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 hover:border-gray-300 dark:hover:border-repae-gray-600'
              ]"
              @click="form.role = opt.value"
            >
              <font-awesome-icon :icon="opt.icon" />
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Statut -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
            Statut
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="opt in statusOptions"
              :key="opt.value"
              type="button"
              :class="[
                'flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold font-brand text-sm transition-all cursor-pointer',
                form.status === opt.value
                  ? opt.class
                  : 'border-gray-200 dark:border-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 hover:border-gray-300 dark:hover:border-repae-gray-600'
              ]"
              @click="form.status = opt.value"
            >
              <font-awesome-icon :icon="opt.icon" />
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Metadata (read-only) -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Informations systeme
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900">
              <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-gray-400" />
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Date de creation</p>
                <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ formatDate(original.createdAt) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900">
              <font-awesome-icon icon="fa-solid fa-clock" class="text-blue-500" />
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Derniere connexion</p>
                <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ formatDateTime(original.lastLogin) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900">
              <font-awesome-icon icon="fa-solid fa-rotate" class="text-green-500" />
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Derniere mise a jour</p>
                <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ formatDateTime(original.updatedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mot de passe -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Mot de passe
          </label>

          <!-- Option 1 : Envoi par email -->
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-repae-gray-700">
            <div>
              <p class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300">
                Envoyer un lien par email
              </p>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
                L'utilisateur recevra un email pour choisir son mot de passe
              </p>
            </div>
            <button
              type="button"
              :disabled="resettingPassword"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              @click="handleResetPassword"
            >
              <font-awesome-icon
                :icon="resettingPassword ? 'fa-solid fa-spinner' : 'fa-solid fa-envelope'"
                :class="{ 'animate-spin': resettingPassword }"
              />
              {{ resettingPassword ? 'Envoi...' : 'Envoyer' }}
            </button>
          </div>

          <!-- Option 2 : Définir directement -->
          <div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300">
                  Définir un nouveau mot de passe
                </p>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
                  Définir directement le mot de passe sans envoyer d'email
                </p>
              </div>
              <button
                v-if="!showAdminResetForm"
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-900 transition-colors cursor-pointer"
                @click="showAdminResetForm = true"
              >
                <font-awesome-icon icon="fa-solid fa-lock" />
                Définir
              </button>
              <button
                v-else
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                @click="showAdminResetForm = false; adminPasswordForm.password = ''; adminPasswordForm.confirmPassword = ''; adminPasswordError = ''"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
                Annuler
              </button>
            </div>

            <!-- Formulaire de reset direct -->
            <Transition name="slide-down">
              <div v-if="showAdminResetForm" class="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-repae-gray-900 space-y-4">
                <!-- Erreur -->
                <div
                  v-if="adminPasswordError"
                  class="px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
                >
                  <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                  {{ adminPasswordError }}
                </div>

                <!-- Nouveau mot de passe -->
                <div>
                  <label class="block text-xs font-medium text-repae-gray-600 dark:text-repae-gray-400 mb-1">
                    Nouveau mot de passe
                  </label>
                  <div class="relative">
                    <input
                      v-model="adminPasswordForm.password"
                      :type="showAdminPassword ? 'text' : 'password'"
                      placeholder="Nouveau mot de passe"
                      class="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                    />
                    <font-awesome-icon icon="fa-solid fa-lock" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-repae-gray-400 text-xs" />
                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                      @click="showAdminPassword = !showAdminPassword"
                    >
                      <font-awesome-icon :icon="showAdminPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-xs" />
                    </button>
                  </div>

                  <!-- Règles -->
                  <ul v-if="adminPasswordForm.password.length > 0" class="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5">
                    <li
                      v-for="rule in adminPasswordRules"
                      :key="rule.label"
                      class="flex items-center gap-1.5 text-xs transition-colors"
                      :class="rule.valid ? 'text-green-500' : 'text-repae-gray-400 dark:text-repae-gray-500'"
                    >
                      <font-awesome-icon
                        :icon="rule.valid ? 'fa-solid fa-check' : 'fa-solid fa-circle'"
                        :class="rule.valid ? '' : 'text-[6px]'"
                      />
                      {{ rule.label }}
                    </li>
                  </ul>
                </div>

                <!-- Confirmation -->
                <div>
                  <label class="block text-xs font-medium text-repae-gray-600 dark:text-repae-gray-400 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div class="relative">
                    <input
                      v-model="adminPasswordForm.confirmPassword"
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      class="w-full px-4 py-2.5 pl-10 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                    />
                    <font-awesome-icon icon="fa-solid fa-lock" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-repae-gray-400 text-xs" />
                  </div>
                  <p
                    v-if="adminPasswordForm.confirmPassword.length > 0 && !adminPasswordsMatch"
                    class="mt-1 text-xs text-red-500"
                  >
                    Les mots de passe ne correspondent pas.
                  </p>
                </div>

                <!-- Bouton de soumission -->
                <button
                  type="button"
                  :disabled="!canAdminReset"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
                  @click="handleAdminResetPassword"
                >
                  <font-awesome-icon
                    :icon="adminResetting ? 'fa-solid fa-spinner' : 'fa-solid fa-check'"
                    :class="{ 'animate-spin': adminResetting }"
                  />
                  {{ adminResetting ? 'Modification...' : 'Appliquer le nouveau mot de passe' }}
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Save / Cancel -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <div class="flex items-center justify-end gap-3">
            <NuxtLink
              to="/admin/comptes"
              class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
            >
              Annuler
            </NuxtLink>
            <button
              type="submit"
              :disabled="saving"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
            >
              <font-awesome-icon
                :icon="saving ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
                :class="{ 'animate-spin': saving }"
              />
              {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </form>
    </template>
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
