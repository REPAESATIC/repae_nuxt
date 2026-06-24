<script setup lang="ts">
import type { NewsItem, CategoryItem } from '~/composables/useNewsApi'
import type { EventItem } from '~/composables/useEventsApi'

definePageMeta({
  layout: 'admin',
})

const { fetchNewsList, fetchCategories } = useNewsApi()
const { fetchEventsList } = useEventsApi()
const toast = useToast()

// Ligne unifiee du tableau : une actualite ou un evenement a venir
type FeedRow =
  | { kind: 'news'; data: NewsItem }
  | { kind: 'event'; data: EventItem }

// State
const news = ref<NewsItem[]>([])
const upcomingEvents = ref<EventItem[]>([])
const categories = ref<CategoryItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(20)
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref<'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | ''>('')
const categoryFilter = ref('')

// Computed
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Lignes affichees : les evenements a venir en tete (page 1 uniquement), puis les actualites
const feedRows = computed<FeedRow[]>(() => {
  const rows: FeedRow[] = []
  if (page.value === 1) {
    for (const event of upcomingEvents.value) rows.push({ kind: 'event', data: event })
  }
  for (const item of news.value) rows.push({ kind: 'news', data: item })
  return rows
})

// Fetch data
const loadNews = async () => {
  loading.value = true
  try {
    const result = await fetchNewsList({
      search: searchQuery.value || undefined,
      status: statusFilter.value || undefined,
      categoryId: categoryFilter.value || undefined,
      page: page.value,
      limit: limit.value,
    })
    news.value = result.data
    total.value = result.total
  } catch (e: any) {
    toast.error('Erreur de chargement', e?.data?.message || 'Impossible de charger les actualités.')
  } finally {
    loading.value = false
  }
}

// Un evenement dont la date est dans le futur constitue une actualite a venir
const loadUpcomingEvents = async () => {
  try {
    const result = await fetchEventsList({
      search: searchQuery.value || undefined,
      status: statusFilter.value || undefined,
      categoryId: categoryFilter.value || undefined,
      limit: 100,
    })
    const now = Date.now()
    upcomingEvents.value = result.data
      .filter(e => new Date(e.eventDate).getTime() >= now)
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
  } catch {
    // silently fail - les evenements sont un complement non critique
    upcomingEvents.value = []
  }
}

const loadCategories = async () => {
  try {
    const result = await fetchCategories()
    categories.value = result.data
  } catch {
    // silently fail - categories are non-critical for the list
  }
}

// Watchers
watch([searchQuery, statusFilter, categoryFilter], () => {
  page.value = 1
  loadNews()
  loadUpcomingEvents()
})

watch(page, () => loadNews())

// Init
onMounted(() => {
  loadNews()
  loadUpcomingEvents()
  loadCategories()
})

// Helpers
const getCategoryName = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId)?.name || '-'
}

const statusConfig: Record<string, { label: string; class: string }> = {
  DRAFT: { label: 'Brouillon', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400' },
  PUBLISHED: { label: 'Publié', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  ARCHIVED: { label: 'Archivé', class: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400' },
  FINISHED: { label: 'Terminé', class: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400' },
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
          Actualités
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ total }} actualité{{ total > 1 ? 's' : '' }} au total
          <span v-if="upcomingEvents.length" class="text-repae-blue-500 dark:text-repae-blue-400">
            · {{ upcomingEvents.length }} événement{{ upcomingEvents.length > 1 ? 's' : '' }} à venir
          </span>
        </p>
      </div>
      <NuxtLink
        to="/admin/actualites/creer"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvelle actualité
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
          placeholder="Rechercher une actualité..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
        />
      </div>

      <!-- Status filter -->
      <select
        v-model="statusFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 cursor-pointer"
      >
        <option value="">Tous les statuts</option>
        <option value="DRAFT">Brouillon</option>
        <option value="PUBLISHED">Publié</option>
        <option value="ARCHIVED">Archivé</option>
      </select>

      <!-- Category filter -->
      <select
        v-model="categoryFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 cursor-pointer"
      >
        <option value="">Toutes les catégories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="feedRows.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-bullhorn" class="text-repae-blue-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune actualité
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        {{ searchQuery || statusFilter || categoryFilter ? 'Aucun résultat pour ces filtres.' : 'Commencez par créer votre première actualité.' }}
      </p>
      <NuxtLink
        v-if="!searchQuery && !statusFilter && !categoryFilter"
        to="/admin/actualites/creer"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Créer une actualité
      </NuxtLink>
    </div>

    <!-- Table -->
    <div v-else class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-repae-gray-700">
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                Actualité
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Type
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Catégorie
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Statut
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Auteur
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              <th class="px-6 py-4" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
            <tr
              v-for="row in feedRows"
              :key="`${row.kind}-${row.data.id}`"
              class="hover:bg-gray-50 dark:hover:bg-repae-gray-700/30 transition-colors"
            >
              <!-- Title + cover -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    v-if="row.kind === 'news' ? row.data.coverImage : row.data.imageUrl"
                    class="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 hidden sm:block"
                    :style="{ backgroundImage: `url(${row.kind === 'news' ? row.data.coverImage : row.data.imageUrl})` }"
                  />
                  <div
                    v-else-if="row.kind === 'event'"
                    class="w-12 h-12 rounded-lg bg-repae-blue-100 dark:bg-repae-blue-500/15 items-center justify-center shrink-0 hidden sm:flex"
                  >
                    <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500 text-sm" />
                  </div>
                  <div
                    v-else
                    class="w-12 h-12 rounded-lg bg-repae-blue-100 dark:bg-repae-blue-500/15 items-center justify-center shrink-0 hidden sm:flex"
                  >
                    <font-awesome-icon icon="fa-solid fa-bullhorn" class="text-repae-blue-500 text-sm" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate max-w-xs">
                      {{ row.data.title }}
                    </p>
                    <p v-if="row.data.isFeatured" class="text-xs text-amber-500 font-medium mt-0.5">
                      <font-awesome-icon icon="fa-solid fa-star" class="mr-1" />
                      À la une
                    </p>
                  </div>
                </div>
              </td>

              <!-- Type -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  v-if="row.kind === 'event'"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-repae-blue-100 text-repae-blue-700 dark:bg-repae-blue-500/15 dark:text-repae-blue-400"
                >
                  <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                  Événement
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-repae-blue-100 text-repae-blue-700 dark:bg-repae-blue-500/15 dark:text-repae-blue-400"
                >
                  <font-awesome-icon icon="fa-solid fa-bullhorn" />
                  Actualité
                </span>
              </td>

              <!-- Category -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ getCategoryName(row.data.categoryId) }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    statusConfig[row.data.status]?.class || ''
                  ]"
                >
                  {{ statusConfig[row.data.status]?.label || row.data.status }}
                </span>
              </td>

              <!-- Author -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ row.kind === 'news' ? row.data.author.fullName : '—' }}
                </span>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <span v-if="row.kind === 'event'" class="inline-flex flex-col">
                  <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                    {{ formatDate(row.data.eventDate) }}
                  </span>
                  <span class="text-xs text-repae-blue-500 dark:text-repae-blue-400 font-medium">
                    À venir
                  </span>
                </span>
                <span v-else class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(row.data.createdAt) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <NuxtLink
                  :to="row.kind === 'event' ? `/admin/evenements/${row.data.id}` : `/admin/actualites/${row.data.id}`"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-repae-blue-600 dark:text-repae-blue-400 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 transition-colors cursor-pointer"
                >
                  <font-awesome-icon icon="fa-solid fa-pen" />
                  Modifier
                </NuxtLink>
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
