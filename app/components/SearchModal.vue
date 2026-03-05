<script setup>
const { fetchEventsList } = useEventsApi()
const { fetchNewsList } = useNewsApi()
const { fetchAlumniList } = useIdentityApi()

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const searchQuery = ref('')
const searchInput = ref(null)
const selectedIndex = ref(-1)
const isLoading = ref(false)
const apiResults = ref([])
let debounceTimer = null

// Pages statiques du site
const sitePages = [
  { title: 'Accueil', description: 'Page d\'accueil du REPAE', href: '/', icon: 'fa-solid fa-house', type: 'page' },
  { title: 'Actualités', description: 'Dernières nouvelles du réseau', href: '/actualites', icon: 'fa-solid fa-bullhorn', type: 'page' },
  { title: 'Événements', description: 'Événements à venir et passés', href: '/evenements', icon: 'fa-solid fa-calendar-alt', type: 'page' },
  { title: 'Contact', description: 'Nous contacter', href: '/contact', icon: 'fa-solid fa-envelope', type: 'page' },
  { title: 'Présentation', description: 'Découvrir l\'association REPAE', href: '/association/presentation', icon: 'fa-solid fa-users', type: 'page' },
  { title: 'Bureau exécutif', description: 'Membres du bureau', href: '/association/bureau', icon: 'fa-solid fa-user-tie', type: 'page' },
  { title: 'Adhésion', description: 'Rejoindre le REPAE', href: '/association/adhesion', icon: 'fa-solid fa-user-plus', type: 'page' },
  { title: 'Statuts', description: 'Statuts de l\'association', href: '/association/statuts', icon: 'fa-solid fa-gavel', type: 'page' },
  { title: 'Règlement intérieur', description: 'Règlement du REPAE', href: '/association/reglement', icon: 'fa-solid fa-file-alt', type: 'page' },
  { title: 'Espace IT', description: 'Espace alumni professionnel', href: '/espace-it', icon: 'fa-solid fa-laptop-code', type: 'page' },
  { title: 'Annuaire alumni', description: 'Trouver un alumni', href: '/espace-it/annuaire', icon: 'fa-solid fa-address-book', type: 'page' },
  { title: 'Offres d\'emploi', description: 'Offres pour les alumni', href: '/espace-it/offres', icon: 'fa-solid fa-briefcase', type: 'page' },
  { title: 'Forum', description: 'Discussions entre alumni', href: '/espace-it/forum', icon: 'fa-solid fa-comments', type: 'page' },
  { title: 'CGU', description: 'Conditions générales d\'utilisation', href: '/cgu', icon: 'fa-solid fa-file-contract', type: 'page' },
  { title: 'Confidentialité', description: 'Politique de confidentialité', href: '/confidentialite', icon: 'fa-solid fa-shield-alt', type: 'page' },
]

// Recherche API avec debounce
const performSearch = async (query) => {
  if (!query) {
    apiResults.value = []
    isLoading.value = false
    return
  }

  isLoading.value = true

  // Appels API en parallèle
  const [alumniRes, eventsRes, newsRes] = await Promise.allSettled([
    fetchAlumniList({ search: query, limit: 5 }),
    fetchEventsList({ search: query, limit: 5 }),
    fetchNewsList({ search: query, status: 'PUBLISHED', limit: 5 }),
  ])

  const results = []

  // Alumni
  if (alumniRes.status === 'fulfilled' && alumniRes.value?.data) {
    alumniRes.value.data.forEach(alumni => {
      results.push({
        title: `${alumni.firstName} ${alumni.lastName}`,
        description: [alumni.degree, alumni.city, alumni.country].filter(Boolean).join(' — '),
        href: `/espace-it/annuaire/${alumni.id}`,
        icon: 'fa-solid fa-user',
        type: 'alumni',
        category: 'Alumni',
      })
    })
  }

  // Événements
  if (eventsRes.status === 'fulfilled' && eventsRes.value?.data) {
    eventsRes.value.data.forEach(event => {
      const locationLabel = event.location?.locationName || (event.location?.type === 'ONLINE' ? 'En ligne' : '')
      results.push({
        title: event.title,
        description: locationLabel || event.description?.substring(0, 60) + '...',
        href: `/evenements#event-${event.id}`,
        icon: 'fa-solid fa-calendar-alt',
        type: 'event',
        category: 'Événements',
      })
    })
  }

  // Actualités
  if (newsRes.status === 'fulfilled' && newsRes.value?.data) {
    newsRes.value.data.forEach(news => {
      results.push({
        title: news.title,
        description: news.summary || news.author?.fullName || '',
        href: `/actualites/${news.slug || news.id}`,
        icon: 'fa-solid fa-bullhorn',
        type: 'news',
        category: 'Actualités',
      })
    })
  }

  apiResults.value = results
  isLoading.value = false
}

// Résultats combinés : pages (filtrées localement) + résultats API
const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []

  const results = []

  // Pages filtrées localement (instantané)
  sitePages.forEach(page => {
    if (page.title.toLowerCase().includes(query) || page.description.toLowerCase().includes(query)) {
      results.push({ ...page, category: 'Pages' })
    }
  })

  // Résultats API
  results.push(...apiResults.value)

  return results.slice(0, 15)
})

// Grouper les résultats par catégorie
const groupedResults = computed(() => {
  const groups = {}
  searchResults.value.forEach(result => {
    if (!groups[result.category]) {
      groups[result.category] = []
    }
    groups[result.category].push(result)
  })
  return groups
})

const totalResults = computed(() => searchResults.value.length)
const hasQuery = computed(() => searchQuery.value.trim().length > 0)

// Navigation clavier
const handleKeydown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, totalResults.value - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
  } else if (e.key === 'Enter' && selectedIndex.value >= 0) {
    e.preventDefault()
    const result = searchResults.value[selectedIndex.value]
    if (result) navigateTo(result.href)
    close()
  }
}

const close = () => {
  searchQuery.value = ''
  selectedIndex.value = -1
  apiResults.value = []
  isLoading.value = false
  emit('close')
}

const goTo = (href) => {
  navigateTo(href)
  close()
}

// Debounce sur la query → appels API
watch(searchQuery, (val) => {
  selectedIndex.value = -1
  clearTimeout(debounceTimer)
  const query = val.trim()
  if (!query) {
    apiResults.value = []
    isLoading.value = false
    return
  }
  isLoading.value = true
  debounceTimer = setTimeout(() => performSearch(query), 300)
})

// Focus auto sur ouverture
watch(() => props.isOpen, (val) => {
  if (val) {
    nextTick(() => searchInput.value?.focus())
  }
})

// Fermer avec Escape
onMounted(() => {
  const onEsc = (e) => {
    if (e.key === 'Escape' && props.isOpen) close()
  }
  document.addEventListener('keydown', onEsc)
  onUnmounted(() => document.removeEventListener('keydown', onEsc))
})

// Couleur du badge par type
const typeColor = (type) => {
  const colors = {
    page: 'bg-repae-blue-500/20 text-repae-blue-600 dark:text-repae-blue-400',
    alumni: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    event: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
    news: 'bg-violet-500/20 text-violet-600 dark:text-violet-400',
  }
  return colors[type] || colors.page
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
        @click.self="close"
      >
        <!-- Backdrop glassmorphisme -->
        <div class="absolute inset-0 bg-repae-gray-900/60 backdrop-blur-md" @click="close" />

        <!-- Modal -->
        <Transition
          enter-active-class="transition-all duration-250 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-4"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-2xl bg-white/70 dark:bg-repae-gray-800/70 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/20 border border-white/30 dark:border-repae-gray-600/30 overflow-hidden"
          >
            <!-- Barre de recherche -->
            <div class="flex items-center gap-3 px-5 py-4 border-b border-white/20 dark:border-repae-gray-600/30">
              <font-awesome-icon
                icon="fa-solid fa-search"
                class="text-repae-blue-500 text-lg"
              />
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un alumni, un événement, une offre..."
                class="flex-1 bg-transparent text-lg text-repae-gray-900 dark:text-white placeholder-repae-gray-400 dark:placeholder-repae-gray-500 outline-none font-brand"
                @keydown="handleKeydown"
              />
              <font-awesome-icon
                v-if="isLoading"
                icon="fa-solid fa-spinner"
                class="text-repae-blue-500 animate-spin"
              />
              <kbd v-else class="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-repae-gray-400 dark:text-repae-gray-500 bg-repae-gray-100/50 dark:bg-repae-gray-700/50 rounded-lg border border-repae-gray-200/50 dark:border-repae-gray-600/50">
                ESC
              </kbd>
            </div>

            <!-- Résultats -->
            <div class="max-h-[60vh] overflow-y-auto overscroll-contain">
              <!-- État vide : suggestions -->
              <div v-if="!searchQuery.trim()" class="px-5 py-6">
                <p class="text-xs font-semibold font-brand uppercase tracking-wider text-repae-gray-400 dark:text-repae-gray-500 mb-3">
                  Accès rapide
                </p>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="page in sitePages.slice(0, 6)"
                    :key="page.href"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/50 dark:hover:bg-repae-gray-700/50 transition-colors text-left cursor-pointer group"
                    @click="goTo(page.href)"
                  >
                    <div class="w-8 h-8 rounded-lg bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center shrink-0">
                      <font-awesome-icon :icon="page.icon" class="text-sm text-repae-blue-500" />
                    </div>
                    <div class="min-w-0">
                      <span class="block text-sm font-medium font-brand text-repae-gray-900 dark:text-white truncate group-hover:text-repae-blue-500 transition-colors">
                        {{ page.title }}
                      </span>
                      <span class="block text-xs font-brand text-repae-gray-400 dark:text-repae-gray-500 truncate">
                        {{ page.description }}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Résultats trouvés -->
              <div v-else-if="hasQuery && totalResults > 0" class="py-2">
                <template v-for="(items, category) in groupedResults" :key="category">
                  <p class="px-5 pt-3 pb-1.5 text-xs font-semibold font-brand uppercase tracking-wider text-repae-gray-400 dark:text-repae-gray-500">
                    {{ category }}
                  </p>
                  <button
                    v-for="(result, i) in items"
                    :key="result.href"
                    :class="[
                      'w-full flex items-center gap-3 px-5 py-3 text-left transition-colors cursor-pointer',
                      searchResults.indexOf(result) === selectedIndex
                        ? 'bg-repae-blue-500/15 dark:bg-repae-blue-500/20'
                        : 'hover:bg-white/40 dark:hover:bg-repae-gray-700/40'
                    ]"
                    @click="goTo(result.href)"
                    @mouseenter="selectedIndex = searchResults.indexOf(result)"
                  >
                    <div :class="['w-9 h-9 rounded-xl flex items-center justify-center shrink-0', typeColor(result.type)]">
                      <font-awesome-icon :icon="result.icon" class="text-sm" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="block text-sm font-medium font-brand text-repae-gray-900 dark:text-white truncate">
                        {{ result.title }}
                      </span>
                      <span class="block text-xs font-brand text-repae-gray-500 dark:text-repae-gray-400 truncate">
                        {{ result.description }}
                      </span>
                    </div>
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-right"
                      class="text-xs text-repae-gray-300 dark:text-repae-gray-600 shrink-0"
                    />
                  </button>
                </template>
              </div>

              <!-- Chargement -->
              <div v-else-if="isLoading" class="px-5 py-12 text-center">
                <font-awesome-icon icon="fa-solid fa-spinner" class="text-3xl text-repae-blue-500 animate-spin mb-3" />
                <p class="text-sm font-brand text-repae-gray-400 dark:text-repae-gray-500">
                  Recherche en cours...
                </p>
              </div>

              <!-- Aucun résultat -->
              <div v-else-if="hasQuery" class="px-5 py-12 text-center">
                <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-repae-gray-100/50 dark:bg-repae-gray-700/50 flex items-center justify-center">
                  <font-awesome-icon icon="fa-solid fa-search" class="text-2xl text-repae-gray-300 dark:text-repae-gray-600" />
                </div>
                <p class="text-sm font-brand font-medium text-repae-gray-500 dark:text-repae-gray-400">
                  Aucun résultat pour « {{ searchQuery }} »
                </p>
                <p class="text-xs font-brand text-repae-gray-400 dark:text-repae-gray-500 mt-1">
                  Essayez avec d'autres mots-clés
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between px-5 py-3 border-t border-white/20 dark:border-repae-gray-600/30 text-xs font-brand text-repae-gray-400 dark:text-repae-gray-500">
              <div class="flex items-center gap-3">
                <span class="inline-flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-repae-gray-100/50 dark:bg-repae-gray-700/50 rounded border border-repae-gray-200/50 dark:border-repae-gray-600/50 font-mono text-[10px]">↑↓</kbd>
                  naviguer
                </span>
                <span class="inline-flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-repae-gray-100/50 dark:bg-repae-gray-700/50 rounded border border-repae-gray-200/50 dark:border-repae-gray-600/50 font-mono text-[10px]">↵</kbd>
                  ouvrir
                </span>
              </div>
              <span v-if="totalResults > 0">{{ totalResults }} résultat{{ totalResults > 1 ? 's' : '' }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "@/assets/css/tailwind.css";
</style>
