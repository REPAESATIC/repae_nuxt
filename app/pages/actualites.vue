<script setup lang="ts">
import type { NewsItem, CategoryItem } from '~/composables/useNewsApi'

useHead({
  title: 'Actualités - REPAE',
  meta: [
    { name: 'description', content: 'Découvrez les dernières actualités du REPAE: articles, formations, carrière et événements.' }
  ]
})

const { fetchNewsList, fetchCategories } = useNewsApi()

// State
const articles = ref<NewsItem[]>([])
const featuredArticle = ref<NewsItem | null>(null)
const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const total = ref(0)
const page = ref(1)
const limit = ref(12)
const searchQuery = ref('')
const showSearch = ref(false)

const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Load data
const loadArticles = async () => {
  loading.value = true
  try {
    const result = await fetchNewsList({
      status: 'PUBLISHED',
      search: searchQuery.value || undefined,
      page: page.value,
      limit: limit.value,
    })
    articles.value = result.data
    total.value = result.total
  } catch {
    // Fail gracefully
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // Load featured article, articles list, and categories in parallel
  const [featuredResult, categoriesResult] = await Promise.all([
    fetchNewsList({ status: 'PUBLISHED', featured: true, limit: 1 }).catch(() => null),
    fetchCategories().catch(() => ({ data: [] as CategoryItem[] })),
  ])

  if (featuredResult && featuredResult.data.length > 0) {
    featuredArticle.value = featuredResult.data[0]
  }
  categories.value = categoriesResult.data

  await loadArticles()
})

// Watchers
watch(searchQuery, () => {
  page.value = 1
  loadArticles()
})

watch(page, () => loadArticles())

// Helpers
const getCategoryName = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId)?.name || ''
}

const getCategoryColor = (categoryId: string) => {
  const cat = categories.value.find(c => c.id === categoryId)
  if (!cat) return 'text-repae-blue-500'
  return `text-[${cat.hexColor}]`
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Header Section -->
    <section class="bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="flex items-center space-x-3">
            <font-awesome-icon icon="fa-solid fa-bullhorn" class="text-3xl text-repae-blue-500" />
            <h1 class="text-3xl md:text-4xl font-bold text-repae-gray-900 dark:text-white">Actualités</h1>
          </div>

          <!-- Search -->
          <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              class="p-2 text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors cursor-pointer"
              @click="showSearch = !showSearch"
            >
              <font-awesome-icon icon="fa-solid fa-search" class="text-xl" />
            </button>
          </div>
        </div>

        <!-- Search Bar (collapsible) -->
        <div v-if="showSearch" class="mt-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un article..."
            class="w-full md:w-96 px-4 py-2 border border-gray-300 dark:border-repae-gray-600 rounded-lg bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

      <!-- Featured Article Section -->
      <section v-if="featuredArticle" class="flex flex-col lg:flex-row lg:space-x-10 mb-16">
        <!-- Left: Featured Image -->
        <div class="lg:w-3/5">
          <div class="cursor-pointer group">
            <img
              :src="featuredArticle.coverImage || '/image/background/evenement1.jpg'"
              :alt="featuredArticle.title"
              class="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          <div class="mt-6">
            <p :class="getCategoryColor(featuredArticle.categoryId)" class="font-semibold text-lg">
              {{ getCategoryName(featuredArticle.categoryId) }}
            </p>

            <h2 class="text-2xl lg:text-4xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-3 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
              {{ featuredArticle.title }}
            </h2>

            <p v-if="featuredArticle.summary" class="mt-4 text-lg text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed">
              {{ featuredArticle.summary }}
            </p>

            <div class="flex items-center space-x-4 mt-6">
              <img
                v-if="featuredArticle.author.avatarUrl"
                :src="featuredArticle.author.avatarUrl"
                :alt="featuredArticle.author.fullName"
                class="h-10 w-10 rounded-full object-cover"
              />
              <div v-else class="h-10 w-10 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-sm" />
              </div>
              <p class="font-bold text-repae-gray-900 dark:text-white">
                {{ featuredArticle.author.fullName }}
              </p>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(featuredArticle.publishedAt) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Info sidebar -->
        <div class="lg:w-2/5 mt-10 lg:mt-0">
          <div class="sticky top-24 bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 rounded-2xl p-6 text-white">
            <div class="flex items-center gap-2 mb-4">
              <font-awesome-icon icon="fa-solid fa-star" />
              <span class="font-brand font-bold uppercase text-sm tracking-wide">Article en vedette</span>
            </div>
            <p class="text-white/80 text-sm leading-relaxed">
              Retrouvez les dernières nouvelles du REPAE. Nos articles couvrent l'actualité de l'association,
              les formations, les opportunités de carrière et les événements à venir.
            </p>
            <div class="mt-6 flex items-center gap-3">
              <div class="text-center">
                <p class="text-2xl font-bold">{{ total }}</p>
                <p class="text-xs text-white/70">Articles</p>
              </div>
              <div class="w-px h-10 bg-white/20" />
              <div class="text-center">
                <p class="text-2xl font-bold">{{ categories.length }}</p>
                <p class="text-xs text-white/70">Catégories</p>
              </div>
            </div>
            <NuxtLink
              to="/evenements"
              class="mt-6 block w-full bg-white text-repae-blue-500 hover:bg-gray-100 font-brand font-semibold py-3 rounded-xl text-center transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-calendar-alt" class="mr-2" />
              Voir les événements
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Articles Grid -->
      <section>
        <!-- Section Header -->
        <div class="flex items-center justify-between mb-8">
          <h2 class="border-b-2 border-red-500">
            <span class="bg-red-500 px-3 py-1.5 text-white uppercase tracking-wide text-sm font-brand font-bold">
              Derniers articles
            </span>
          </h2>
          <p v-if="total > 0" class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
            {{ total }} article{{ total > 1 ? 's' : '' }}
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-20">
          <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-3xl animate-spin" />
        </div>

        <!-- Empty state -->
        <div
          v-else-if="articles.length === 0"
          class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
        >
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-bullhorn" class="text-repae-blue-500 text-2xl" />
          </div>
          <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Aucun article trouvé
          </h3>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
            {{ searchQuery ? 'Aucun résultat pour cette recherche.' : 'Les articles seront affichés ici.' }}
          </p>
        </div>

        <!-- Articles grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in articles"
            :key="article.id"
            class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden hover:shadow-lg hover:border-repae-blue-300 dark:hover:border-repae-blue-500 transition-all duration-300 cursor-pointer group"
          >
            <!-- Image -->
            <div class="h-48 overflow-hidden">
              <img
                :src="article.coverImage || '/image/background/evenement1.jpg'"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Content -->
            <div class="p-5">
              <!-- Category -->
              <p :class="getCategoryColor(article.categoryId)" class="font-semibold text-sm mb-2">
                {{ getCategoryName(article.categoryId) }}
              </p>

              <!-- Title -->
              <h3 class="font-bold text-lg text-repae-gray-900 dark:text-white leading-tight mb-2 group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors line-clamp-2">
                {{ article.title }}
              </h3>

              <!-- Summary -->
              <p v-if="article.summary" class="text-sm text-repae-gray-600 dark:text-repae-gray-400 line-clamp-3 mb-4">
                {{ article.summary }}
              </p>

              <!-- Author + date -->
              <div class="flex items-center gap-3 mt-auto">
                <img
                  v-if="article.author.avatarUrl"
                  :src="article.author.avatarUrl"
                  :alt="article.author.fullName"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <div v-else class="h-8 w-8 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center shrink-0">
                  <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-xs" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-bold text-repae-gray-900 dark:text-white truncate">
                    {{ article.author.fullName }}
                  </p>
                  <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                    {{ formatDate(article.publishedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-center gap-4 mt-10"
        >
          <button
            :disabled="page <= 1"
            class="px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            @click="page--"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="mr-1 text-xs" />
            Précédent
          </button>
          <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
            Page {{ page }} sur {{ totalPages }}
          </span>
          <button
            :disabled="page >= totalPages"
            class="px-4 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            @click="page++"
          >
            Suivant
            <font-awesome-icon icon="fa-solid fa-chevron-right" class="ml-1 text-xs" />
          </button>
        </div>
      </section>

      <!-- Newsletter CTA Section -->
      <section class="mt-16">
        <div class="bg-gradient-to-r from-repae-blue-600 to-repae-blue-500 rounded-lg px-6 md:px-10 py-10 text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-white">
            Restez informé des dernières actualités
          </h2>
          <p class="mt-3 text-lg text-white/90">
            Inscrivez-vous à notre newsletter pour recevoir les derniers articles directement dans votre boîte mail.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              class="px-4 py-3 rounded-lg w-full sm:w-80 text-repae-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button class="px-6 py-3 bg-white text-repae-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              S'inscrire
            </button>
          </div>
        </div>
      </section>

    </main>

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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
