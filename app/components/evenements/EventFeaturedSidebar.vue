<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'

defineProps<{
  event: EventItem
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="sticky top-24">
    <!-- Section Title -->
    <h2 class="border-b-2 border-repae-blue-500 mb-6">
      <span class="bg-repae-blue-500 px-3 py-1 text-white uppercase tracking-wide text-sm font-brand font-bold">
        En vedette
      </span>
    </h2>

    <!-- Featured Card -->
    <div
      class="block bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
    >
      <!-- Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          :src="event.imageUrl || '/image/background/evenement1.jpg'"
          :alt="event.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <!-- Featured Badge -->
        <div class="absolute top-3 left-3">
          <span class="bg-white text-repae-blue-500 px-3 py-1 rounded-full text-xs font-bold font-brand shadow-lg">
            <font-awesome-icon icon="fa-solid fa-star" class="mr-1" />
            En vedette
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 text-white">
        <h3 class="font-brand font-bold text-xl mb-3 leading-tight group-hover:underline">
          {{ event.title }}
        </h3>
        <p class="text-white/80 text-sm mb-4 line-clamp-3">
          {{ event.description }}
        </p>

        <!-- Meta -->
        <div class="flex flex-col gap-2 text-sm text-white/70 mb-5">
          <span class="flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-calendar-alt" class="w-4" />
            {{ formatDate(event.eventDate) }}
          </span>
          <span v-if="event.location?.locationName" class="flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-location-dot" class="w-4" />
            {{ event.location.locationName }}
          </span>
        </div>

        <!-- CTA Button -->
        <span class="block w-full bg-white text-repae-blue-500 hover:bg-gray-100 font-brand font-semibold py-3 rounded-xl text-center transition-colors">
          Voir les détails
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
