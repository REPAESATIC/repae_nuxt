<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const toast = useToast()
const { registerUser, updateUser } = useIdentityApi()

// State
const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
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

// Submit
const submit = async () => {
  if (!form.email.trim()) {
    toast.warning('Champ requis', 'L\'email est obligatoire.')
    return
  }
  if (!form.password || form.password.length < 8) {
    toast.warning('Champ requis', 'Le mot de passe doit contenir au moins 8 caracteres.')
    return
  }

  loading.value = true
  try {
    // 1. Creer le compte (status = PENDING par defaut)
    const created = await registerUser({
      email: form.email,
      password: form.password,
      role: form.role,
    })

    // 2. Si le statut souhaite est different de PENDING, mettre a jour
    if (form.status !== 'PENDING' && form.status !== created.status) {
      await updateUser(created.id, { status: form.status })
    }

    toast.success('Compte cree', 'Le compte a ete cree avec succes.')
    router.push('/admin/comptes')
  } catch (e: any) {
    const status = e?.response?.status || e?.statusCode
    if (status === 409) {
      toast.error('Email deja utilise', 'Un compte avec cet email existe deja.')
    } else {
      const msg = e?.data?.message || 'Impossible de creer le compte.'
      toast.error('Erreur', Array.isArray(msg) ? msg[0] : msg)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink
        to="/admin/comptes"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Nouveau compte
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Creez un nouveau compte utilisateur
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submit" class="space-y-6">
      <!-- Identifiants -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
          Identifiants
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Email -->
          <div>
            <label class="block text-xs font-medium text-repae-gray-600 dark:text-repae-gray-400 mb-1.5">
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

          <!-- Mot de passe -->
          <div>
            <label class="block text-xs font-medium text-repae-gray-600 dark:text-repae-gray-400 mb-1.5">
              Mot de passe *
            </label>
            <div class="relative">
              <font-awesome-icon
                icon="fa-solid fa-lock"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400 text-sm"
              />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimum 8 caracteres"
                class="w-full pl-11 pr-11 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
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

      <!-- Actions -->
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
            :disabled="loading"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
              :class="{ 'animate-spin': loading }"
            />
            {{ loading ? 'Creation...' : 'Creer le compte' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
