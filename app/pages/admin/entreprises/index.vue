<script setup lang="ts">
import type { CurrentEntreprise } from '~/data/admin/entreprises'
import { getEntreprisesPaginated, secteursActivite, entreprisesMock } from '~/data/admin/entreprises'

definePageMeta({
  layout: 'admin',
})

const toast = useToast()

// State
const entreprises = ref<CurrentEntreprise[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(20)
const loading = ref(true)
const searchQuery = ref('')
const verifiedFilter = ref<'' | 'true' | 'false'>('')
const tailleFilter = ref('')
const secteurFilter = ref('')

// Verify action
const verifying = ref<string | null>(null)

// Computed
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Fetch data (mock)
const loadEntreprises = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    const result = getEntreprisesPaginated({
      search: searchQuery.value || undefined,
      verifie: verifiedFilter.value === '' ? undefined : verifiedFilter.value === 'true',
      taille: tailleFilter.value || undefined,
      secteur: secteurFilter.value || undefined,
      page: page.value,
      limit: limit.value,
    })
    entreprises.value = result.data
    total.value = result.total
  } catch {
    toast.error('Erreur de chargement', 'Impossible de charger les entreprises.')
  } finally {
    loading.value = false
  }
}

// Watchers
watch([searchQuery, verifiedFilter, tailleFilter, secteurFilter], () => {
  page.value = 1
  loadEntreprises()
})

watch(page, () => loadEntreprises())

// Init
onMounted(() => {
  loadEntreprises()
})

// Actions
const handleVerify = async (item: CurrentEntreprise) => {
  verifying.value = item.id
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    const found = entreprisesMock.find(e => e.id === item.id)
    if (found) found.verifie = !found.verifie
    toast.success(
      found?.verifie ? 'Entreprise verifiee' : 'Verification retiree',
      `${item.nom} a ete ${found?.verifie ? 'verifiee' : 'deverifiee'} avec succes.`,
    )
    await loadEntreprises()
  } catch {
    toast.error('Erreur', 'Impossible de modifier le statut de verification.')
  } finally {
    verifying.value = null
  }
}

// Helpers
const verifiedConfig: Record<string, { label: string; class: string }> = {
  true: { label: 'Verifiee', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  false: { label: 'Non verifiee', class: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' },
}

const tailleConfig: Record<string, { label: string; class: string }> = {
  startup: { label: 'Startup', class: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400' },
  pme: { label: 'PME', class: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
  grande_entreprise: { label: 'Grande entreprise', class: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400' },
}

const badgeConfig: Record<string, { label: string; icon: string; class: string }> = {
  bronze: { label: 'Bronze', icon: 'fa-solid fa-medal', class: 'text-amber-600 dark:text-amber-400' },
  silver: { label: 'Silver', icon: 'fa-solid fa-medal', class: 'text-gray-500 dark:text-gray-300' },
  gold: { label: 'Gold', icon: 'fa-solid fa-crown', class: 'text-yellow-500 dark:text-yellow-400' },
  platinum: { label: 'Platinum', icon: 'fa-solid fa-gem', class: 'text-purple-500 dark:text-purple-400' },
}

const formatDate = (date: string) => {
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
          Entreprises
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ total }} entreprise{{ total > 1 ? 's' : '' }} au total
        </p>
      </div>
      <NuxtLink
        to="/admin/entreprises/creer"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvelle entreprise
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
          placeholder="Rechercher une entreprise..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Verified filter -->
      <select
        v-model="verifiedFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les statuts</option>
        <option value="true">Verifiee</option>
        <option value="false">Non verifiee</option>
      </select>

      <!-- Taille filter -->
      <select
        v-model="tailleFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Toutes les tailles</option>
        <option value="startup">Startup</option>
        <option value="pme">PME</option>
        <option value="grande_entreprise">Grande entreprise</option>
      </select>

      <!-- Secteur filter -->
      <select
        v-model="secteurFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les secteurs</option>
        <option v-for="secteur in secteursActivite" :key="secteur" :value="secteur">
          {{ secteur }}
        </option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="entreprises.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-building" class="text-violet-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune entreprise
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
        {{ searchQuery || verifiedFilter || tailleFilter || secteurFilter ? 'Aucun resultat pour ces filtres.' : 'Aucune entreprise partenaire enregistree pour le moment.' }}
      </p>
      <NuxtLink
        v-if="!searchQuery && !verifiedFilter && !tailleFilter && !secteurFilter"
        to="/admin/entreprises/creer"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Creer une entreprise
      </NuxtLink>
    </div>

    <!-- Table -->
    <div v-else class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-repae-gray-700">
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                Entreprise
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Secteur
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Taille
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Statut
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Badge
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              <th class="px-6 py-4" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
            <tr
              v-for="item in entreprises"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-repae-gray-700/30 transition-colors"
            >
              <!-- Entreprise (logo + nom + email) -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    v-if="item.logo_url"
                    class="w-10 h-10 rounded-full bg-cover bg-center shrink-0 hidden sm:block"
                    :style="{ backgroundImage: `url(${item.logo_url})` }"
                  />
                  <div
                    v-else
                    class="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/15 items-center justify-center shrink-0 hidden sm:flex"
                  >
                    <font-awesome-icon icon="fa-solid fa-building" class="text-violet-500 text-sm" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate max-w-xs">
                      {{ item.nom }}
                    </p>
                    <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate max-w-xs mt-0.5">
                      {{ item.email_contact }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Secteur -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ item.secteur_activite }}
                </span>
              </td>

              <!-- Taille -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    tailleConfig[item.taille]?.class || ''
                  ]"
                >
                  {{ tailleConfig[item.taille]?.label || item.taille }}
                </span>
              </td>

              <!-- Statut -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    verifiedConfig[String(item.verifie)]?.class || ''
                  ]"
                >
                  {{ verifiedConfig[String(item.verifie)]?.label || '-' }}
                </span>
              </td>

              <!-- Badge -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <div class="flex items-center gap-1.5">
                  <font-awesome-icon
                    :icon="badgeConfig[item.badge_recruteur]?.icon || 'fa-solid fa-medal'"
                    :class="['text-sm', badgeConfig[item.badge_recruteur]?.class || '']"
                  />
                  <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                    {{ badgeConfig[item.badge_recruteur]?.label || item.badge_recruteur }}
                  </span>
                </div>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(item.date_creation) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/entreprises/${item.id}`"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-solid fa-eye" />
                    Voir
                  </NuxtLink>
                  <button
                    :disabled="verifying === item.id"
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer',
                      item.verifie
                        ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10'
                        : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10'
                    ]"
                    @click="handleVerify(item)"
                  >
                    <font-awesome-icon
                      :icon="verifying === item.id ? 'fa-solid fa-spinner' : (item.verifie ? 'fa-solid fa-times-circle' : 'fa-solid fa-check-circle')"
                      :class="{ 'animate-spin': verifying === item.id }"
                    />
                    {{ item.verifie ? 'Deverifier' : 'Verifier' }}
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
