<script setup lang="ts">
import type { Event } from '@/data/events'

defineProps<{
  event: Event
}>()

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    conference: 'Conférence',
    formation: 'Formation',
    networking: 'Networking',
    sport: 'Sport',
    webinaire: 'Webinaire',
    autre: 'Autre'
  }
  return labels[category] || category
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    conference: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    formation: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    networking: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
    sport: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    webinaire: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    autre: 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400'
  }
  return colors[category] || 'bg-gray-500/10 text-gray-600'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 hover:shadow-lg hover:border-repae-blue-300 dark:hover:border-repae-blue-500 transition-all duration-300 cursor-pointer group"
  >
    <!-- Thumbnail -->
    <div class="w-full sm:w-32 md:w-40 h-32 sm:h-24 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
      <img
        :src="event.image"
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <!-- Category Badge -->
        <span
          :class="[getCategoryColor(event.category), 'inline-block px-2 py-1 rounded text-xs font-semibold font-brand mb-2']"
        >
          {{ getCategoryLabel(event.category) }}
        </span>
        <!-- Title -->
        <h3 class="font-brand font-bold text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors leading-tight mb-1">
          {{ event.title }}
        </h3>
        <!-- Description -->
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300 line-clamp-2">
          {{ event.description }}
        </p>
      </div>

      <!-- Meta Info -->
      <div class="flex flex-wrap items-center gap-4 text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-3">
        <span class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-calendar-alt" />
          {{ formatDate(event.date) }}
        </span>
        <span v-if="event.location" class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-location-dot" />
          {{ event.location }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
