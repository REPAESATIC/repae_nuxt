<script setup lang="ts">
import type { UserItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { fetchUser, updateUser, requestPasswordReset } = useIdentityApi()

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

// Reset password
const resettingPassword = ref(false)

const handleResetPassword = async () => {
  if (!original.value) return
  resettingPassword.value = true
  try {
    await requestPasswordReset(original.value.email)
    toast.info('Email envoye', 'Un email de reinitialisation du mot de passe a ete envoye.')
  } catch {
    toast.error('Erreur', 'Impossible d\'envoyer l\'email de reinitialisation.')
  } finally {
    resettingPassword.value = false
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

        <!-- Actions -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <!-- Reset password -->
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-repae-gray-700">
            <div>
              <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                Reinitialiser le mot de passe
              </p>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
                Envoie un email de reinitialisation a l'utilisateur
              </p>
            </div>
            <button
              type="button"
              :disabled="resettingPassword"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              @click="handleResetPassword"
            >
              <font-awesome-icon
                :icon="resettingPassword ? 'fa-solid fa-spinner' : 'fa-solid fa-lock'"
                :class="{ 'animate-spin': resettingPassword }"
              />
              {{ resettingPassword ? 'Envoi...' : 'Reinitialiser' }}
            </button>
          </div>

          <!-- Save / Cancel -->
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
