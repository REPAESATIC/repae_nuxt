<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'

const props = defineProps<{
  event: EventItem
  categoryName?: string
  categoryBadgeClass?: string
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const badgeClass = computed(() => props.categoryBadgeClass || 'bg-gray-500/10 text-gray-600')
const badgeLabel = computed(() => props.categoryName || '-')
const locationName = computed(() => props.event.location?.locationName || '')
</script>

<template>
  <NuxtLink
    :to="`/evenements/${event.id}`"
    class="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 hover:shadow-lg hover:border-repae-blue-300 dark:hover:border-repae-blue-500 transition-all duration-300 cursor-pointer group"
  >
    <!-- Thumbnail -->
    <div class="w-full sm:w-32 md:w-40 h-32 sm:h-24 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
      <img
        :src="event.imageUrl || '/image/background/evenement1.jpg'"
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col justify-between">
      <div>
        <!-- Category Badge -->
        <span
          :class="[badgeClass, 'inline-block px-2 py-1 rounded text-xs font-semibold font-brand mb-2']"
        >
          {{ badgeLabel }}
        </span>
        <!-- Title -->
        <h3 class="font-brand font-bold text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors leading-tight mb-1">
          {{ event.title }}
        </h3>
        <!-- Description -->
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300 line-clamp-2" v-html="event.description" />
      </div>

      <!-- Meta Info -->
      <div class="flex flex-wrap items-center gap-4 text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-3">
        <span class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-calendar-alt" />
          {{ formatDate(event.eventDate) }}
        </span>
        <span v-if="locationName" class="flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-location-dot" />
          {{ locationName }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
