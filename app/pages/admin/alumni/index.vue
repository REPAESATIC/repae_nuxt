<script setup lang="ts">
import type { AlumniItem, PromotionItem, DepartmentItem, CountryItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const { fetchAlumniList, verifyAlumni, fetchPromotions, fetchDepartments, fetchCountries } = useIdentityApi()
const toast = useToast()

// State
const alumni = ref<AlumniItem[]>([])
const promotions = ref<PromotionItem[]>([])
const departments = ref<DepartmentItem[]>([])
const countries = ref<CountryItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(20)
const loading = ref(true)
const searchQuery = ref('')
const verifiedFilter = ref<'' | 'true' | 'false'>('')
const promotionFilter = ref('')
const departmentFilter = ref('')
const countryFilter = ref('')

// Verify action
const verifying = ref<string | null>(null)

// Computed
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Fetch data
const loadAlumni = async () => {
  loading.value = true
  try {
    const result = await fetchAlumniList({
      search: searchQuery.value || undefined,
      isVerified: verifiedFilter.value === '' ? undefined : verifiedFilter.value === 'true',
      promotionId: promotionFilter.value || undefined,
      departmentId: departmentFilter.value || undefined,
      countryId: countryFilter.value || undefined,
      page: page.value,
      limit: limit.value,
    })
    alumni.value = result.data
    total.value = result.total
  } catch (e: any) {
    toast.error('Erreur de chargement', e?.data?.message || 'Impossible de charger les alumni.')
  } finally {
    loading.value = false
  }
}

const loadReferenceData = async () => {
  try {
    const [promoResult, deptResult, countryResult] = await Promise.all([
      fetchPromotions(),
      fetchDepartments(),
      fetchCountries(),
    ])
    promotions.value = promoResult.data
    departments.value = deptResult.data
    countries.value = countryResult.data
  } catch {
    // silently fail - reference data is non-critical for the list
  }
}

// Watchers
watch([searchQuery, verifiedFilter, promotionFilter, departmentFilter, countryFilter], () => {
  page.value = 1
  loadAlumni()
})

watch(page, () => loadAlumni())

// Init
onMounted(() => {
  loadAlumni()
  loadReferenceData()
})

// Actions
const handleVerify = async (item: AlumniItem) => {
  verifying.value = item.id
  try {
    await verifyAlumni(item.id)
    toast.success('Alumni verifie', `${item.firstName} ${item.lastName} a ete verifie avec succes.`)
    await loadAlumni()
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de verifier cet alumni.')
  } finally {
    verifying.value = null
  }
}

// Helpers
const verifiedConfig: Record<string, { label: string; class: string }> = {
  true: { label: 'Verifie', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  false: { label: 'Non verifie', class: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' },
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
          Alumni
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ total }} alumni au total
        </p>
      </div>
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
          placeholder="Rechercher un alumni..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Verified filter -->
      <select
        v-model="verifiedFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les statuts</option>
        <option value="true">Verifie</option>
        <option value="false">Non verifie</option>
      </select>

      <!-- Promotion filter -->
      <select
        v-model="promotionFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Toutes les promotions</option>
        <option v-for="promo in promotions" :key="promo.id" :value="promo.id">
          {{ promo.year }}{{ promo.nickname ? ` - ${promo.nickname}` : '' }}
        </option>
      </select>

      <!-- Department filter -->
      <select
        v-model="departmentFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les departements</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }}{{ dept.acronym ? ` (${dept.acronym})` : '' }}
        </option>
      </select>

      <!-- Country filter -->
      <select
        v-model="countryFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Tous les pays</option>
        <option v-for="country in countries" :key="country.id" :value="country.id">
          {{ country.name }}
        </option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="alumni.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-user-graduate" class="text-violet-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun alumni
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        {{ searchQuery || verifiedFilter || promotionFilter || departmentFilter || countryFilter ? 'Aucun resultat pour ces filtres.' : 'Aucun profil alumni enregistre pour le moment.' }}
      </p>
    </div>

    <!-- Table -->
    <div v-else class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-repae-gray-700">
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                Alumni
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Promotion
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Departement
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Statut
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              <th class="px-6 py-4" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
            <tr
              v-for="item in alumni"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-repae-gray-700/30 transition-colors"
            >
              <!-- Alumni (avatar + name + email) -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    v-if="item.photoUrl"
                    class="w-10 h-10 rounded-full bg-cover bg-center shrink-0 hidden sm:block"
                    :style="{ backgroundImage: `url(${item.photoUrl})` }"
                  />
                  <div
                    v-else
                    class="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/15 items-center justify-center shrink-0 hidden sm:flex"
                  >
                    <font-awesome-icon icon="fa-solid fa-user-graduate" class="text-violet-500 text-sm" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate max-w-xs">
                      {{ item.firstName }} {{ item.lastName }}
                    </p>
                    <p v-if="item.email" class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate max-w-xs mt-0.5">
                      {{ item.email }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Promotion -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ item.promotion || '-' }}
                </span>
              </td>

              <!-- Departement -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ item.department || '-' }}
                </span>
              </td>

              <!-- Statut -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    verifiedConfig[String(item.isVerified)]?.class || ''
                  ]"
                >
                  {{ verifiedConfig[String(item.isVerified)]?.label || '-' }}
                </span>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(item.createdAt) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/alumni/${item.id}`"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-solid fa-eye" />
                    Voir
                  </NuxtLink>
                  <button
                    v-if="!item.isVerified"
                    :disabled="verifying === item.id"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    @click="handleVerify(item)"
                  >
                    <font-awesome-icon
                      :icon="verifying === item.id ? 'fa-solid fa-spinner' : 'fa-solid fa-user-check'"
                      :class="{ 'animate-spin': verifying === item.id }"
                    />
                    Verifier
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
