<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'
import type { CategoryItem } from '~/composables/useNewsApi'

const route = useRoute()
const eventId = route.params.id as string

const { fetchEvent, fetchEventsList } = useEventsApi()
const { fetchCategories } = useNewsApi()

const event = ref<EventItem | null>(null)
const categories = ref<CategoryItem[]>([])
const relatedEvents = ref<EventItem[]>([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const [eventData, categoriesResult] = await Promise.all([
      fetchEvent(eventId),
      fetchCategories(),
    ])
    event.value = eventData
    categories.value = categoriesResult.data

    // Load related events (same category, exclude current)
    const relatedResult = await fetchEventsList({
      categoryId: eventData.categoryId,
      limit: 4,
    }).catch(() => null)
    if (relatedResult) {
      relatedEvents.value = relatedResult.data
        .filter(e => e.id !== eventId && (e.status === 'PUBLISHED' || e.status === 'ARCHIVED'))
        .slice(0, 3)
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

useHead({
  title: computed(() => event.value ? `${event.value.title} - Événements REPAE` : 'Événement - REPAE'),
})

const getCategoryName = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId)?.name || ''
}

const getCategoryColor = (categoryId: string) => {
  const cat = categories.value.find(c => c.id === categoryId)
  if (!cat) return { text: 'text-repae-blue-500', bg: 'bg-repae-blue-500/10' }
  return { text: `text-[${cat.hexColor}]`, bg: `bg-[${cat.bgHexColor}]/10` }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatShortDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const getDisplayStatus = (evt: EventItem): 'completed' | 'ongoing' | 'upcoming' => {
  if (evt.status === 'ARCHIVED') return 'completed'
  const eventDate = new Date(evt.eventDate)
  const now = new Date()
  const dayAfter = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000)
  if (now > dayAfter) return 'completed'
  if (now >= eventDate && now <= dayAfter) return 'ongoing'
  return 'upcoming'
}

const statusConfig = computed(() => {
  if (!event.value) return null
  const status = getDisplayStatus(event.value)
  const configs = {
    upcoming: { label: 'À venir', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400', icon: 'fa-solid fa-calendar-check' },
    ongoing: { label: 'En cours', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400', icon: 'fa-solid fa-bolt' },
    completed: { label: 'Terminé', class: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400', icon: 'fa-solid fa-check' },
  }
  return configs[status]
})

const locationType = computed(() => {
  if (!event.value) return ''
  return event.value.location.type === 'ONLINE' ? 'En ligne' : 'Présentiel'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-40">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-3xl animate-spin" />
    </div>

    <!-- Error -->
    <div v-else-if="error || !event" class="text-center py-40">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-red-500 text-2xl" />
      </div>
      <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Événement introuvable
      </h2>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        Cet événement n'existe pas ou a été supprimé.
      </p>
      <NuxtLink
        to="/evenements"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-semibold rounded-xl transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour aux événements
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero Image -->
      <section class="relative h-64 md:h-96 overflow-hidden">
        <img
          :src="event.imageUrl || '/image/background/evenement1.jpg'"
          :alt="event.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <!-- Back button overlay -->
        <div class="absolute top-4 left-4 md:top-6 md:left-8">
          <NuxtLink
            to="/evenements"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors text-sm font-semibold cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            Événements
          </NuxtLink>
        </div>

        <!-- Status badge overlay -->
        <div v-if="statusConfig" class="absolute top-4 right-4 md:top-6 md:right-8">
          <span :class="[statusConfig.class, 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold font-brand']">
            <font-awesome-icon :icon="statusConfig.icon" class="text-xs" />
            {{ statusConfig.label }}
          </span>
        </div>
      </section>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <!-- Left Content (2/3) -->
          <div class="lg:col-span-2">
            <!-- Title Card -->
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-repae-gray-700 p-6 md:p-8 mb-8">
              <!-- Category -->
              <span
                :class="[getCategoryColor(event.categoryId).bg, getCategoryColor(event.categoryId).text, 'inline-block px-3 py-1 rounded-full text-xs font-bold font-brand mb-4']"
              >
                {{ getCategoryName(event.categoryId) }}
              </span>

              <!-- Title -->
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold font-brand text-repae-gray-900 dark:text-white leading-tight mb-4">
                {{ event.title }}
              </h1>

              <!-- Meta -->
              <div class="flex flex-wrap items-center gap-4 text-sm text-repae-gray-500 dark:text-repae-gray-400">
                <span class="flex items-center gap-1.5">
                  <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500" />
                  {{ formatDate(event.eventDate) }}
                </span>
                <span class="flex items-center gap-1.5">
                  <font-awesome-icon icon="fa-solid fa-clock" class="text-repae-blue-500" />
                  {{ formatTime(event.eventDate) }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6 md:p-8">
              <h2 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <div
                class="prose prose-sm md:prose-base dark:prose-invert max-w-none text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed"
                v-html="event.description"
              />
            </div>
          </div>

          <!-- Right Sidebar (1/3) -->
          <div class="lg:col-span-1">
            <!-- Info Card -->
            <div class="sticky top-24 space-y-6">
              <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6">
                <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-5">
                  Informations
                </h3>

                <div class="space-y-4">
                  <!-- Date -->
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500" />
                    </div>
                    <div>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide font-semibold">Date</p>
                      <p class="text-sm font-semibold text-repae-gray-900 dark:text-white">{{ formatDate(event.eventDate) }}</p>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">{{ formatTime(event.eventDate) }}</p>
                    </div>
                  </div>

                  <!-- Location -->
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/15 flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon :icon="event.location.type === 'ONLINE' ? 'fa-solid fa-globe' : 'fa-solid fa-location-dot'" class="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide font-semibold">Lieu</p>
                      <p class="text-sm font-semibold text-repae-gray-900 dark:text-white">{{ locationType }}</p>
                      <p v-if="event.location.locationName" class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                        {{ event.location.locationName }}
                      </p>
                    </div>
                  </div>

                  <!-- Access URL -->
                  <div v-if="event.location.accessUrl" class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide font-semibold">Lien d'accès</p>
                      <a
                        :href="event.location.accessUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm font-semibold text-repae-blue-500 hover:text-repae-blue-600 hover:underline break-all"
                      >
                        Rejoindre l'événement
                      </a>
                    </div>
                  </div>

                  <!-- Category -->
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="fa-solid fa-tag" class="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide font-semibold">Catégorie</p>
                      <p class="text-sm font-semibold text-repae-gray-900 dark:text-white">{{ getCategoryName(event.categoryId) }}</p>
                    </div>
                  </div>
                </div>

                <!-- CTA -->
                <div v-if="getDisplayStatus(event) === 'upcoming'" class="mt-6 pt-6 border-t border-gray-200 dark:border-repae-gray-700">
                  <a
                    v-if="event.location.accessUrl"
                    :href="event.location.accessUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block w-full text-center bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-semibold py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-solid fa-external-link-alt" class="mr-2" />
                    Participer
                  </a>
                </div>
              </div>

              <!-- Share -->
              <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6">
                <h3 class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
                  Partager
                </h3>
                <div class="flex items-center gap-3">
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent($route.fullPath)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/25 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-brands fa-facebook" />
                  </a>
                  <a
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent($route.fullPath)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/15 flex items-center justify-center text-sky-500 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-500/25 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-brands fa-twitter" />
                  </a>
                  <a
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent($route.fullPath)}&title=${encodeURIComponent(event.title)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/25 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-brands fa-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Events -->
        <section v-if="relatedEvents.length > 0" class="mt-16">
          <h2 class="border-b-2 border-repae-blue-500 mb-8">
            <span class="bg-repae-blue-500 px-3 py-1.5 text-white uppercase tracking-wide text-sm font-brand font-bold">
              Événements similaires
            </span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NuxtLink
              v-for="related in relatedEvents"
              :key="related.id"
              :to="`/evenements/${related.id}`"
              class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden hover:shadow-lg hover:border-repae-blue-300 dark:hover:border-repae-blue-500 transition-all duration-300 cursor-pointer group"
            >
              <div class="h-40 overflow-hidden">
                <img
                  :src="related.imageUrl || '/image/background/evenement1.jpg'"
                  :alt="related.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-4">
                <span
                  :class="[getCategoryColor(related.categoryId).bg, getCategoryColor(related.categoryId).text, 'inline-block px-2 py-0.5 rounded text-xs font-bold font-brand mb-2']"
                >
                  {{ getCategoryName(related.categoryId) }}
                </span>
                <h3 class="font-bold text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors leading-tight mb-2 line-clamp-2">
                  {{ related.title }}
                </h3>
                <div class="flex items-center gap-3 text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  <span class="flex items-center gap-1">
                    <font-awesome-icon icon="fa-solid fa-calendar-alt" />
                    {{ formatShortDate(related.eventDate) }}
                  </span>
                  <span v-if="related.location?.locationName" class="flex items-center gap-1">
                    <font-awesome-icon icon="fa-solid fa-location-dot" />
                    {{ related.location.locationName }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>
      </main>
    </template>

    <AppFooter />
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
