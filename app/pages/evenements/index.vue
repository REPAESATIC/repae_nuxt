<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'
import type { CategoryItem } from '~/composables/useNewsApi'

useHead({
  title: 'Événements - REPAE',
  meta: [
    { name: 'description', content: 'Découvrez les événements du REPAE: conférences, formations, rencontres networking et moments de partage entre alumni.' }
  ]
})

const { fetchEventsList } = useEventsApi()
const { fetchCategories } = useNewsApi()

const events = ref<EventItem[]>([])
const categories = ref<CategoryItem[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [eventsResult, categoriesResult] = await Promise.all([
      fetchEventsList({ limit: 50 }),
      fetchCategories(),
    ])
    events.value = eventsResult.data
    categories.value = categoriesResult.data
  } catch {
    // Fail gracefully — page will show empty state
  } finally {
    loading.value = false
  }
})

// Category resolution helpers
const getCategoryName = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId)?.name || ''
}

const getCategoryBadgeClass = (categoryId: string) => {
  const cat = categories.value.find(c => c.id === categoryId)
  if (!cat) return 'bg-gray-500/10 text-gray-600'
  return `bg-[${cat.bgHexColor}]/10 text-[${cat.hexColor}]`
}

// Event display status helper
const getDisplayStatus = (event: EventItem): 'completed' | 'ongoing' | 'upcoming' => {
  if (event.status === 'ARCHIVED') return 'completed'
  const eventDate = new Date(event.eventDate)
  const now = new Date()
  const dayAfter = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000)
  if (now > dayAfter) return 'completed'
  if (now >= eventDate && now <= dayAfter) return 'ongoing'
  return 'upcoming'
}

// Published events only (filter out DRAFT)
const publishedEvents = computed(() =>
  events.value.filter(e => e.status === 'PUBLISHED' || e.status === 'ARCHIVED')
)

// Trending: up to 4 upcoming/ongoing events
const trendingEvents = computed(() =>
  publishedEvents.value
    .filter(e => getDisplayStatus(e) !== 'completed')
    .slice(0, 4)
)

// Latest: all non-completed events
const latestEvents = computed(() =>
  publishedEvents.value.filter(e => getDisplayStatus(e) !== 'completed')
)

// Featured: first isFeatured, or first ongoing, or first event
const featuredEvent = computed(() =>
  publishedEvents.value.find(e => e.isFeatured)
    || publishedEvents.value.find(e => getDisplayStatus(e) === 'ongoing')
    || publishedEvents.value[0]
    || null
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <EvenementsHero />

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-3xl animate-spin" />
    </div>

    <template v-else-if="publishedEvents.length > 0">
      <!-- À la une Section -->
      <section v-if="trendingEvents.length > 0" class="py-16 bg-gray-50 dark:bg-repae-gray-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section Header -->
          <h2 class="border-b-2 border-yellow-500 mb-8">
            <span class="bg-yellow-500 px-3 py-1.5 text-white uppercase tracking-wide text-sm font-brand font-bold">
              À la une
            </span>
          </h2>

          <!-- Trending Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <EvenementsEventTrendingCard
              v-for="event in trendingEvents"
              :key="event.id"
              :event="event"
              :category-name="getCategoryName(event.categoryId)"
              :category-color="categories.find(c => c.id === event.categoryId)?.bgHexColor ? `bg-[${categories.find(c => c.id === event.categoryId)!.bgHexColor}]` : 'bg-gray-500'"
            />
          </div>
        </div>
      </section>

      <!-- Latest + Featured Section -->
      <section class="py-16 bg-white dark:bg-repae-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Latest Events Column (2/3 width) -->
            <div class="lg:col-span-2">
              <!-- Section Header -->
              <h2 class="border-b-2 border-red-500 mb-6">
                <span class="bg-red-500 px-3 py-1.5 text-white uppercase tracking-wide text-sm font-brand font-bold">
                  Événements récents
                </span>
              </h2>

              <!-- Events List -->
              <div class="space-y-4">
                <EvenementsEventLatestItem
                  v-for="event in latestEvents"
                  :key="event.id"
                  :event="event"
                  :category-name="getCategoryName(event.categoryId)"
                  :category-badge-class="getCategoryBadgeClass(event.categoryId)"
                />
              </div>
            </div>

            <!-- Featured Sidebar (1/3 width) -->
            <div v-if="featuredEvent" class="lg:col-span-1">
              <EvenementsEventFeaturedSidebar :event="featuredEvent" />
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Empty state -->
    <div v-else class="text-center py-20">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucun événement pour le moment
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        Les événements à venir seront affichés ici.
      </p>
    </div>

    <AppFooter />
  </div>
</template>
