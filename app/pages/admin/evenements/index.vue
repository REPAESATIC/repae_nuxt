<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'
import type { CategoryItem } from '~/composables/useNewsApi'

definePageMeta({
  layout: 'admin',
})

const { fetchEventsList } = useEventsApi()
const { fetchCategories } = useNewsApi()
const toast = useToast()

// State
const events = ref<EventItem[]>([])
const categories = ref<CategoryItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(20)
const loading = ref(true)
const searchQuery = ref('')
const categoryFilter = ref('')

// Computed
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Fetch data
const loadEvents = async () => {
  loading.value = true
  try {
    const result = await fetchEventsList({
      search: searchQuery.value || undefined,
      categoryId: categoryFilter.value || undefined,
      page: page.value,
      limit: limit.value,
    })
    events.value = result.data
    total.value = result.total
  } catch (e: any) {
    toast.error('Erreur de chargement', e?.data?.message || 'Impossible de charger les evenements.')
  } finally {
    loading.value = false
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
watch([searchQuery, categoryFilter], () => {
  page.value = 1
  loadEvents()
})

watch(page, () => loadEvents())

// Init
onMounted(() => {
  loadEvents()
  loadCategories()
})

// Helpers
const getCategoryName = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId)?.name || '-'
}

const statusConfig: Record<string, { label: string; class: string }> = {
  DRAFT: { label: 'Brouillon', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400' },
  PUBLISHED: { label: 'Publie', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  ARCHIVED: { label: 'Archive', class: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400' },
}

const locationTypeConfig: Record<string, { label: string; icon: string; class: string }> = {
  PHYSICAL: { label: 'Presentiel', icon: 'fa-solid fa-location-dot', class: 'text-blue-600 dark:text-blue-400' },
  ONLINE: { label: 'En ligne', icon: 'fa-solid fa-globe', class: 'text-emerald-600 dark:text-emerald-400' },
}

const formatEventDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Evenements
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ total }} evenement{{ total > 1 ? 's' : '' }} au total
        </p>
      </div>
      <NuxtLink
        to="/admin/evenements/creer"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvel evenement
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
          placeholder="Rechercher un evenement..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Category filter -->
      <select
        v-model="categoryFilter"
        class="px-4 py-2.5 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer"
      >
        <option value="">Toutes les categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="events.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-violet-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun evenement
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        {{ searchQuery || categoryFilter ? 'Aucun resultat pour ces filtres.' : 'Commencez par creer votre premier evenement.' }}
      </p>
      <NuxtLink
        v-if="!searchQuery && !categoryFilter"
        to="/admin/evenements/creer"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Creer un evenement
      </NuxtLink>
    </div>

    <!-- Table -->
    <div v-else class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-repae-gray-700">
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                Evenement
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                Categorie
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden sm:table-cell">
                Statut
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Date
              </th>
              <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Lieu
              </th>
              <th class="px-6 py-4" />
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
            <tr
              v-for="item in events"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-repae-gray-700/30 transition-colors"
            >
              <!-- Title + image -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    v-if="item.imageUrl"
                    class="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 hidden sm:block"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  />
                  <div
                    v-else
                    class="w-12 h-12 rounded-lg bg-violet-100 dark:bg-violet-500/15 items-center justify-center shrink-0 hidden sm:flex"
                  >
                    <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-violet-500 text-sm" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate max-w-xs">
                      {{ item.title }}
                    </p>
                    <p v-if="item.isFeatured" class="text-xs text-amber-500 font-medium mt-0.5">
                      <font-awesome-icon icon="fa-solid fa-star" class="mr-1" />
                      A la une
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="px-6 py-4 hidden md:table-cell">
                <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                  {{ getCategoryName(item.categoryId) }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 hidden sm:table-cell">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                    statusConfig[item.status]?.class || ''
                  ]"
                >
                  {{ statusConfig[item.status]?.label || item.status }}
                </span>
              </td>

              <!-- Event date -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatEventDate(item.eventDate) }}
                </span>
              </td>

              <!-- Location -->
              <td class="px-6 py-4 hidden lg:table-cell">
                <div class="flex items-center gap-1.5">
                  <font-awesome-icon
                    :icon="locationTypeConfig[item.location.type]?.icon || 'fa-solid fa-location-dot'"
                    :class="['text-xs', locationTypeConfig[item.location.type]?.class || '']"
                  />
                  <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300 truncate max-w-[150px]">
                    {{ item.location.locationName || locationTypeConfig[item.location.type]?.label || '-' }}
                  </span>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <NuxtLink
                  :to="`/admin/evenements/${item.id}`"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
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
