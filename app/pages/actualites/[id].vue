<script setup lang="ts">
import type { NewsItem, CategoryItem } from '~/composables/useNewsApi'

const route = useRoute()
const newsId = route.params.id as string

const { fetchNews, fetchNewsList, fetchCategories } = useNewsApi()

const article = ref<NewsItem | null>(null)
const categories = ref<CategoryItem[]>([])
const relatedArticles = ref<NewsItem[]>([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const [newsData, categoriesResult] = await Promise.all([
      fetchNews(newsId),
      fetchCategories(),
    ])
    article.value = newsData
    categories.value = categoriesResult.data

    // Load related articles (same category, published, exclude current)
    const relatedResult = await fetchNewsList({
      categoryId: newsData.categoryId,
      status: 'PUBLISHED',
      limit: 4,
    }).catch(() => null)
    if (relatedResult) {
      relatedArticles.value = relatedResult.data
        .filter(a => a.id !== newsId)
        .slice(0, 3)
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

useHead({
  title: computed(() => article.value ? `${article.value.title} - Actualités REPAE` : 'Actualité - REPAE'),
})

const getCategoryName = (categoryId: string) => {
  return categories.value.find(c => c.id === categoryId)?.name || ''
}

const getCategoryColor = (categoryId: string) => {
  const cat = categories.value.find(c => c.id === categoryId)
  if (!cat) return { text: 'text-repae-blue-500', bg: 'bg-repae-blue-500/10' }
  return { text: `text-[${cat.hexColor}]`, bg: `bg-[${cat.bgHexColor}]/10` }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const formatShortDate = (dateString?: string) => {
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

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-40">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-3xl animate-spin" />
    </div>

    <!-- Error -->
    <div v-else-if="error || !article" class="text-center py-40">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-red-500 text-2xl" />
      </div>
      <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Article introuvable
      </h2>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        Cet article n'existe pas ou a été supprimé.
      </p>
      <NuxtLink
        to="/actualites"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-semibold rounded-xl transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour aux actualités
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Hero Cover Image -->
      <section class="relative h-64 md:h-96 overflow-hidden">
        <img
          :src="article.coverImage || '/image/background/evenement1.jpg'"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <!-- Back button overlay -->
        <div class="absolute top-4 left-4 md:top-6 md:left-8">
          <NuxtLink
            to="/actualites"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors text-sm font-semibold cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            Actualités
          </NuxtLink>
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
                :class="[getCategoryColor(article.categoryId).bg, getCategoryColor(article.categoryId).text, 'inline-block px-3 py-1 rounded-full text-xs font-bold font-brand mb-4']"
              >
                {{ getCategoryName(article.categoryId) }}
              </span>

              <!-- Title -->
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold font-brand text-repae-gray-900 dark:text-white leading-tight mb-4">
                {{ article.title }}
              </h1>

              <!-- Summary -->
              <p
                v-if="article.summary"
                class="text-lg text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed mb-6"
                v-html="article.summary"
              />

              <!-- Author + Date -->
              <div class="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-repae-gray-700">
                <img
                  v-if="article.author.avatarUrl"
                  :src="article.author.avatarUrl"
                  :alt="article.author.fullName"
                  class="h-12 w-12 rounded-full object-cover"
                />
                <div v-else class="h-12 w-12 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center">
                  <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500" />
                </div>
                <div>
                  <p class="font-bold text-repae-gray-900 dark:text-white">
                    {{ article.author.fullName }}
                  </p>
                  <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                    {{ formatDate(article.publishedAt) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Article Content -->
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6 md:p-8">
              <div
                class="prose prose-lg dark:prose-invert max-w-none text-repae-gray-700 dark:text-repae-gray-300 leading-relaxed"
                v-html="article.content"
              />
            </div>
          </div>

          <!-- Right Sidebar (1/3) -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <!-- Author Card -->
              <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6">
                <h3 class="text-sm font-bold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide mb-4">
                  Auteur
                </h3>
                <div class="flex items-center gap-4">
                  <img
                    v-if="article.author.avatarUrl"
                    :src="article.author.avatarUrl"
                    :alt="article.author.fullName"
                    class="h-14 w-14 rounded-full object-cover"
                  />
                  <div v-else class="h-14 w-14 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-xl" />
                  </div>
                  <div>
                    <p class="font-bold text-repae-gray-900 dark:text-white">{{ article.author.fullName }}</p>
                    <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">Rédacteur</p>
                  </div>
                </div>
              </div>

              <!-- Info Card -->
              <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6">
                <h3 class="text-sm font-bold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide mb-4">
                  Informations
                </h3>
                <div class="space-y-4">
                  <!-- Published date -->
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500" />
                    </div>
                    <div>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide font-semibold">Publié le</p>
                      <p class="text-sm font-semibold text-repae-gray-900 dark:text-white">{{ formatDate(article.publishedAt) }}</p>
                    </div>
                  </div>

                  <!-- Category -->
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
                      <font-awesome-icon icon="fa-solid fa-tag" class="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide font-semibold">Catégorie</p>
                      <p class="text-sm font-semibold text-repae-gray-900 dark:text-white">{{ getCategoryName(article.categoryId) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Share Card -->
              <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-repae-gray-700 p-6">
                <h3 class="text-sm font-bold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wide mb-3">
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
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent($route.fullPath)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/15 flex items-center justify-center text-sky-500 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-500/25 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-brands fa-twitter" />
                  </a>
                  <a
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent($route.fullPath)}&title=${encodeURIComponent(article.title)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/25 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-brands fa-linkedin" />
                  </a>
                </div>
              </div>

              <!-- CTA Newsletter -->
              <div class="bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 rounded-2xl p-6 text-white">
                <div class="flex items-center gap-2 mb-3">
                  <font-awesome-icon icon="fa-solid fa-bullhorn" />
                  <span class="font-brand font-bold text-sm uppercase tracking-wide">Newsletter</span>
                </div>
                <p class="text-white/80 text-sm leading-relaxed mb-4">
                  Recevez nos derniers articles directement dans votre boîte mail.
                </p>
                <NuxtLink
                  to="/actualites"
                  class="block w-full bg-white text-repae-blue-500 hover:bg-gray-100 font-brand font-semibold py-3 rounded-xl text-center transition-colors cursor-pointer"
                >
                  Voir toutes les actualités
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <section v-if="relatedArticles.length > 0" class="mt-16">
          <h2 class="border-b-2 border-red-500 mb-8">
            <span class="bg-red-500 px-3 py-1.5 text-white uppercase tracking-wide text-sm font-brand font-bold">
              Articles similaires
            </span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NuxtLink
              v-for="related in relatedArticles"
              :key="related.id"
              :to="`/actualites/${related.id}`"
              class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden hover:shadow-lg hover:border-repae-blue-300 dark:hover:border-repae-blue-500 transition-all duration-300 cursor-pointer group"
            >
              <div class="h-48 overflow-hidden">
                <img
                  :src="related.coverImage || '/image/background/evenement1.jpg'"
                  :alt="related.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="p-5">
                <span
                  :class="[getCategoryColor(related.categoryId).bg, getCategoryColor(related.categoryId).text, 'inline-block px-2 py-0.5 rounded text-xs font-bold font-brand mb-2']"
                >
                  {{ getCategoryName(related.categoryId) }}
                </span>
                <h3 class="font-bold text-lg text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors leading-tight mb-2 line-clamp-2">
                  {{ related.title }}
                </h3>
                <p v-if="related.summary" class="text-sm text-repae-gray-600 dark:text-repae-gray-400 line-clamp-2 mb-3" v-html="related.summary" />
                <div class="flex items-center gap-3">
                  <img
                    v-if="related.author.avatarUrl"
                    :src="related.author.avatarUrl"
                    :alt="related.author.fullName"
                    class="h-7 w-7 rounded-full object-cover"
                  />
                  <div v-else class="h-7 w-7 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 flex items-center justify-center shrink-0">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-xs" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs font-bold text-repae-gray-900 dark:text-white truncate">{{ related.author.fullName }}</p>
                    <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">{{ formatShortDate(related.publishedAt) }}</p>
                  </div>
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
