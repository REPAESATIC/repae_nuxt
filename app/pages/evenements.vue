<script setup>
import { events as eventsData } from '@/data/events'

useHead({
  title: 'Événements - REPAE',
  meta: [
    { name: 'description', content: 'Découvrez les événements du REPAE: conférences, formations, rencontres networking et moments de partage entre alumni.' }
  ]
})

const events = ref(eventsData)

// Filter events for different sections
const trendingEvents = computed(() =>
  events.value
    .filter(e => e.status !== 'completed')
    .slice(0, 4)
)

const latestEvents = computed(() =>
  events.value.filter(e => e.status !== 'completed')
)

const featuredEvent = computed(() =>
  events.value.find(e => e.isFeatured) || events.value.find(e => e.status === 'ongoing') || events.value[0]
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <EvenementsHero />

    <!-- À la une Section -->
    <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
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
              />
            </div>
          </div>

          <!-- Featured Sidebar (1/3 width) -->
          <div class="lg:col-span-1">
            <EvenementsEventFeaturedSidebar :event="featuredEvent" />
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
