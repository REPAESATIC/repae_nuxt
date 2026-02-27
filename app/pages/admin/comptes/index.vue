<script setup lang="ts">
import type { UserItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const toast = useToast()
const { fetchUsers, updateUser } = useIdentityApi()

// State
const comptes = ref<UserItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(20)
const loading = ref(true)
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

// Action state
const toggling = ref<string | null>(null)

// Computed
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Fetch data
const loadComptes = async () => {
  loading.value = true
  try {
    const result = await fetchUsers({
      search: searchQuery.value || undefined,
      role: roleFilter.value || undefined,
      status: statusFilter.value || undefined,
      page: page.value,
      limit: limit.value,
    })
    comptes.value = result.data
    total.value = result.total
  } catch {
    toast.error('Erreur de chargement', 'Impossible de charger les comptes.')
  } finally {
    loading.value = false
  }
}

// Watchers
watch([searchQuery, roleFilter, statusFilter], () => {
  page.value = 1
  loadComptes()
})

watch(page, () => loadComptes())

// Init
onMounted(() => {
  loadComptes()
})

// Actions
const handleToggleStatus = async (item: UserItem) => {
  toggling.value = item.id
  try {
    const newStatus = item.status === 'BANNED' ? 'PENDING' : 'BANNED'
    await updateUser(item.id, { status: newStatus })
    toast.success(
      newStatus === 'BANNED' ? 'Compte banni' : 'Compte reactive',
      `Le compte ${item.email} a ete ${newStatus === 'BANNED' ? 'banni' : 'reactive'}.`,
    )
    await loadComptes()
  } catch (e: any) {
    const msg = e?.data?.message || 'Impossible de modifier le statut du compte.'
    toast.error('Erreur', msg)
  } finally {
    toggling.value = null
  }
}

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
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Comptes utilisateurs
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ total }} compte{{ total > 1 ? 's' : '' }} au total
        </p>
      </div>
      <NuxtLink
        to="/admin/comptes/creer"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouveau compte
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <!-- Search -->
      <div class="relative flex-1">
        <font-awesome-icon
          icon="fa-solid fa-search"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400 text-sm"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher par email ou nom..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Role filter -->
      <select
        v-model="roleFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les roles</option>
        <option value="ADMIN">Admin</option>
        <option value="ALUMNI">Alumni</option>
        <option value="STUDENT">Etudiant</option>
      </select>

      <!-- Status filter -->
      <select
        v-model="statusFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les statuts</option>
        <option value="PENDING">En attente</option>
        <option value="ACTIVE">Actif</option>
        <option value="BANNED">Banni</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="comptes.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-user-cog" class="text-violet-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun compte
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
        {{ searchQuery || roleFilter || statusFilter ? 'Aucun resultat pour ces filtres.' : 'Aucun compte utilisateur enregistre pour le moment.' }}
      </p>
      <NuxtLink
        v-if="!searchQuery && !roleFilter && !statusFilter"
        to="/admin/comptes/creer"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Creer un compte
      </NuxtLink>
    </div>

    <!-- Table -->
    <div v-else class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-repae-gray-700">
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                Utilisateur
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Role
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Statut
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Derniere connexion
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Date creation
              </th>
              <th class="px-6 py-4" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
            <tr
              v-for="item in comptes"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-repae-gray-700/30 transition-colors"
            >
              <!-- Utilisateur -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/15 items-center justify-center shrink-0 hidden sm:flex">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-violet-500 text-sm" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate max-w-xs">
                      {{ item.email }}
                    </p>
                    <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
                      ID: {{ item.id.slice(0, 8) }}...
                    </p>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    roleConfig[item.role]?.class || ''
                  ]"
                >
                  {{ roleConfig[item.role]?.label || item.role }}
                </span>
              </td>

              <!-- Statut -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
                    statusConfig[item.status]?.class || ''
                  ]"
                >
                  <font-awesome-icon :icon="statusConfig[item.status]?.icon || 'fa-solid fa-circle'" class="text-[10px]" />
                  {{ statusConfig[item.status]?.label || item.status }}
                </span>
              </td>

              <!-- Derniere connexion -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(item.lastLogin) }}
                </span>
              </td>

              <!-- Date creation -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(item.createdAt) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/comptes/${item.id}`"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-solid fa-eye" />
                    Voir
                  </NuxtLink>
                  <button
                    :disabled="toggling === item.id"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer',
                      item.status === 'BANNED'
                        ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10'
                        : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
                    ]"
                    @click="handleToggleStatus(item)"
                  >
                    <font-awesome-icon
                      :icon="toggling === item.id ? 'fa-solid fa-spinner' : (item.status === 'BANNED' ? 'fa-solid fa-check-circle' : 'fa-solid fa-ban')"
                      :class="{ 'animate-spin': toggling === item.id }"
                    />
                    {{ item.status === 'BANNED' ? 'Activer' : 'Bannir' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-repae-gray-700"
      >
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
          Page {{ page }} sur {{ totalPages }}
        </p>
        <div class="flex items-center gap-2">
          <button
            :disabled="page <= 1"
            class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            @click="page--"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-xs" />
          </button>
          <button
            :disabled="page >= totalPages"
            class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            @click="page++"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
