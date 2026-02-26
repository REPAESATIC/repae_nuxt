<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'

const props = defineProps<{
  event: EventItem
  categoryName?: string
  categoryColor?: string
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const badgeColor = computed(() => props.categoryColor || 'bg-gray-500')
const badgeLabel = computed(() => props.categoryName || '-')
const locationName = computed(() => props.event.location?.locationName || '')
</script>

<template>
  <NuxtLink
    :to="`/evenements/${event.id}`"
    class="trending-card group relative h-72 md:h-96 block rounded-xl overflow-hidden cursor-pointer"
  >
    <!-- Background Image -->
    <img
      :src="event.imageUrl || '/image/background/evenement1.jpg'"
      :alt="event.title"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 gradient transition duration-300 group-hover:bg-black/80"></div>

    <!-- Content with translate-y effect -->
    <div class="absolute left-0 right-0 bottom-0 p-6 transform translate-y-1/2 transition duration-300 h-full group-hover:translate-y-0">
      <div class="h-1/2 relative">
        <div class="absolute bottom-0">
          <!-- Category Badge -->
          <span
            :class="[badgeColor, 'inline-block px-3 py-1 rounded-full text-xs font-bold text-white font-brand mb-3']"
          >
            {{ badgeLabel }}
          </span>
          <!-- Title -->
          <h3 class="font-brand font-bold text-white text-lg md:text-xl leading-tight pb-4 group-hover:underline">
            {{ event.title }}
          </h3>
        </div>
      </div>
      <div class="h-1/2">
        <!-- Description - hidden until hover -->
        <p class="text-white text-sm pb-4 opacity-0 transition duration-300 group-hover:opacity-100" v-html="event.description" />
        <!-- Date and Location -->
        <div class="flex flex-wrap items-center gap-3 text-white/80 text-xs mb-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <span class="flex items-center gap-1">
            <font-awesome-icon icon="fa-solid fa-calendar-alt" />
            {{ formatDate(event.eventDate) }}
          </span>
          <span v-if="locationName" class="flex items-center gap-1">
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            {{ locationName }}
          </span>
        </div>
        <!-- CTA Button -->
        <button class="bg-white text-repae-gray-900 text-sm px-4 py-2 font-semibold font-brand rounded-lg opacity-0 transition duration-300 group-hover:opacity-100 hover:bg-gray-100 cursor-pointer">
          Voir plus
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.gradient {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.8)
  );
}
</style>
