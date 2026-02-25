<script setup>
import { events as eventsData } from '@/data/events'

// Events data (imported from external file)
const events = ref(eventsData)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getStatusIcon = (status) => {
  switch(status) {
    case 'completed':
      return 'fa-check'
    case 'ongoing':
      return 'fa-spinner'
    case 'upcoming':
      return 'fa-circle'
    default:
      return 'fa-circle'
  }
}

const getStatusClasses = (status) => {
  switch(status) {
    case 'completed':
      return 'bg-repae-blue-500 text-white'
    case 'ongoing':
      return 'bg-repae-blue-500 text-white'
    case 'upcoming':
      return 'bg-repae-gray-400 text-white'
    default:
      return 'bg-repae-gray-400 text-white'
  }
}

const timelineSegments = computed(() => {
  return events.value.slice(0, -1).map((event, index) => ({
    ...event,
    index,
    isBlue: event.status === 'completed' || event.status === 'ongoing'
  }))
})

// Calculate the starting offset for timeline segments based on number of events
// Card width = 12rem (w-48), Gap = 1.5rem (gap-6)
const timelineStartOffset = computed(() => {
  const n = events.value.length
  const cardWidth = 12 // rem
  const gap = 1.5 // rem
  const totalWidth = n * cardWidth + (n - 1) * gap
  const firstCenterOffset = totalWidth / 2 - cardWidth / 2
  return firstCenterOffset
})
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-repae-blue-500 dark:text-white font-brand mb-4">
          Événements à venir
        </h2>
        <p class="text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand max-w-3xl mx-auto">
          Rencontres, formations et moments de partage qui renforcent les liens entre alumni et favorisent l'excellence professionnelle.
        </p>
        <NuxtLink
          to="/evenements"
          class="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-semibold font-brand rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-repae-blue-500/25 cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-calendar-alt" />
          Voir tous les événements
          <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-sm" />
        </NuxtLink>
      </div>

      <!-- Events and Timeline Container -->
      <div class="overflow-x-auto pb-4">
        <div class="relative flex justify-center gap-6 min-w-max px-4">
          <div
            v-for="event in events"
            :key="event.id"
            class="flex-shrink-0 flex flex-col items-center"
          >
            <!-- Event Card -->
            <div
              class="w-48 h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer mb-8"
              :class="event.status === 'completed' ? 'opacity-60' : ''"
            >
              <div class="relative w-full h-full">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-full h-full object-cover"
                  :class="event.status === 'completed' ? 'filter brightness-75' : ''"
                >
                <!-- Event Content Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 class="font-brand font-bold text-sm mb-2 leading-tight">
                      {{ event.title }}
                    </h3>
                    <p class="font-brand text-xs opacity-90 mb-2">
                      {{ event.description }}
                    </p>
                    <p class="font-brand text-xs opacity-75">
                      {{ formatDate(event.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Section for this event -->
            <div class="relative w-48 flex flex-col items-center">
              <!-- Timeline Point -->
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10 transition-all duration-300"
                :class="getStatusClasses(event.status)"
              >
                <font-awesome-icon
                  :icon="`fa-solid ${getStatusIcon(event.status)}`"
                  :class="event.status === 'ongoing' ? 'animate-spin' : ''"
                  class="text-sm"
                />
              </div>

              <!-- Event Title -->
              <h4 class="font-brand font-semibold text-sm text-repae-gray-900 dark:text-white mb-1 leading-tight text-center">
                {{ event.title }}
              </h4>

              <!-- Event Date -->
              <p class="font-brand text-xs text-repae-gray-500 dark:text-repae-gray-400 text-center">
                {{ formatDate(event.date) }}
              </p>
            </div>
          </div>

          <!-- Timeline Line Segments -->
          <div
            v-for="segment in timelineSegments"
            :key="`line-${segment.id}`"
            class="absolute h-0.5 transition-colors duration-300"
            :class="segment.isBlue
              ? 'bg-repae-blue-500 dark:bg-repae-blue-400'
              : 'bg-repae-gray-300 dark:bg-repae-gray-600'"
            :style="{
              top: '21.5rem',
              left: `calc(50% - ${timelineStartOffset}rem + ${segment.index * 13.5}rem)`,
              width: '13.5rem'
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
