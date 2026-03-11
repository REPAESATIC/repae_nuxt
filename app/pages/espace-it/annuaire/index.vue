<script setup lang="ts">
import type { AlumniItem, PromotionItem, CountryItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Annuaire des IT | Espace IT REPAE'
})

const { fetchAlumniList, fetchPromotions, fetchCountries } = useIdentityApi()

// Données
const alumniList = ref<AlumniItem[]>([])
const totalAlumni = ref(0)
const loading = ref(true)
const currentPage = ref(1)
const pageSize = 12

// Données de référence pour les filtres
const promotions = ref<PromotionItem[]>([])
const countries = ref<CountryItem[]>([])

// Filtres
const filters = reactive({
  search: '',
  promotionId: null as string | null,
  countryId: null as string | null,
  isOpenToMentoring: null as boolean | null,
})

// Debounce pour la recherche
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const totalPages = computed(() => Math.ceil(totalAlumni.value / pageSize))

// Charger les données de référence
const loadReferenceData = async () => {
  const [promosResult, countriesResult] = await Promise.allSettled([
    fetchPromotions({ limit: 100 }),
    fetchCountries({ limit: 200 }),
  ])
  if (promosResult.status === 'fulfilled') {
    promotions.value = promosResult.value.data
  }
  if (countriesResult.status === 'fulfilled') {
    countries.value = countriesResult.value.data
  }
}

// Charger les alumni
const loadAlumni = async () => {
  loading.value = true
  try {
    const result = await fetchAlumniList({
      search: filters.search || undefined,
      isVerified: true,
      promotionId: filters.promotionId || undefined,
      countryId: filters.countryId || undefined,
      isOpenToMentoring: filters.isOpenToMentoring ?? undefined,
      page: currentPage.value,
      limit: pageSize,
    })
    alumniList.value = result.data
    totalAlumni.value = result.total
  } catch (e) {
    console.error('Erreur chargement alumni:', e)
    alumniList.value = []
    totalAlumni.value = 0
  } finally {
    loading.value = false
  }
}

// Charger au montage
onMounted(async () => {
  await Promise.all([loadReferenceData(), loadAlumni()])
})

// Watcher pour la recherche (avec debounce)
watch(() => filters.search, () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadAlumni()
  }, 400)
})

// Watcher pour les filtres sans debounce
watch([() => filters.promotionId, () => filters.countryId, () => filters.isOpenToMentoring], () => {
  currentPage.value = 1
  loadAlumni()
})

// Reset filters
const resetFilters = () => {
  filters.search = ''
  filters.promotionId = null
  filters.countryId = null
  filters.isOpenToMentoring = null
  currentPage.value = 1
  loadAlumni()
}

// Update filters
const updateFilters = (newFilters: typeof filters) => {
  filters.search = newFilters.search
  filters.promotionId = newFilters.promotionId
  filters.countryId = newFilters.countryId
  filters.isOpenToMentoring = newFilters.isOpenToMentoring
}

// Pagination
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadAlumni()
}
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
      <span class="text-repae-gray-900 dark:text-white">Annuaire des IT</span>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
          <font-awesome-icon icon="fa-solid fa-users" class="text-repae-blue-500" />
          Annuaire des IT
        </h1>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
          Retrouvez et connectez-vous avec les alumni de l'ESATIC
        </p>
      </div>
    </div>

    <!-- Filters -->
    <EspaceItAnnuaireFilters
      :filters="filters"
      :total-results="totalAlumni"
      :promotions="promotions"
      :countries="countries"
      :loading="loading"
      @update:filters="updateFilters"
      @reset="resetFilters"
    />

    <!-- État de chargement -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-3xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">Chargement des alumni...</span>
    </div>

    <!-- Alumni Grid -->
    <template v-else>
      <div
        v-if="alumniList.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <EspaceItAnnuaireCard
          v-for="alumni in alumniList"
          :key="alumni.id"
          :alumni="alumni"
        />
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
      >
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-users" class="text-2xl text-repae-gray-400" />
        </div>
        <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Aucun résultat
        </h3>
        <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-4">
          Aucun alumni ne correspond à vos critères de recherche.
        </p>
        <button
          class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer"
          @click="resetFilters"
        >
          Réinitialiser les filtres
        </button>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-center gap-2 pt-4"
      >
        <button
          :disabled="currentPage <= 1"
          class="px-3 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 text-sm font-brand text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          @click="goToPage(currentPage - 1)"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>

        <template v-for="page in totalPages" :key="page">
          <button
            v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
            :class="[
              'px-3.5 py-2 rounded-lg text-sm font-brand font-medium cursor-pointer transition-colors',
              page === currentPage
                ? 'bg-repae-blue-500 text-white'
                : 'border border-gray-200 dark:border-repae-gray-600 text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700'
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span
            v-else-if="page === currentPage - 2 || page === currentPage + 2"
            class="px-1 text-repae-gray-400"
          >
            ...
          </span>
        </template>

        <button
          :disabled="currentPage >= totalPages"
          class="px-3 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 text-sm font-brand text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          @click="goToPage(currentPage + 1)"
        >
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </button>
      </div>
    </template>
  </div>
</template>
