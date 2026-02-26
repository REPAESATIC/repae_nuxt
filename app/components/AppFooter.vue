<script setup lang="ts">
import { socialLinks } from '@/data/footer'
import type { NewsItem } from '~/composables/useNewsApi'

const { fetchNewsList } = useNewsApi()

const currentYear = new Date().getFullYear()

// Actualités depuis l'API
const newsArticles = ref<NewsItem[]>([])

onMounted(async () => {
  try {
    const result = await fetchNewsList({ status: 'PUBLISHED', limit: 4 })
    newsArticles.value = result.data
  } catch {
    // Fail gracefully — footer shows nothing
  }
})

// Carrousel d'actualités
const currentArticleIndex = ref(0)

const previousArticle = () => {
  currentArticleIndex.value = currentArticleIndex.value > 0
    ? currentArticleIndex.value - 1
    : newsArticles.value.length - 1
}

const nextArticle = () => {
  currentArticleIndex.value = (currentArticleIndex.value + 1) % newsArticles.value.length
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <footer class="bg-repae-gray-900 dark:bg-black text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center mb-4">
            <img
              src="/image/logos_REAPE/ICONE/ICONE_REPAE_BBL.png"
              alt="REPAE"
              class="h-10 w-10 mr-2"
            />
            <h3 class="text-2xl font-bold text-repae-blue-400 font-brand">REPAE</h3>
          </div>
          <p class="text-repae-gray-300 font-brand mb-4">
            Réseau Professionnel des Alumni de l'ESATIC - L'empreinte de l'excellence
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              :title="social.label"
              class="text-repae-gray-400 hover:text-repae-blue-400 transition-colors"
            >
              <font-awesome-icon :icon="social.icon" class="text-xl" />
            </a>
          </div>
        </div>


        <div class="">
          <h4 class="text-lg font-bold font-brand mb-4">Contact</h4>
          <ul class="space-y-2 text-repae-gray-300 font-brand">
            <li class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-envelope" class="mr-2 text-repae-blue-400" />
              contact@repae.org
            </li>
            <li class="flex items-center">
              <font-awesome-icon icon="fa-solid fa-phone" class="mr-2 text-repae-blue-400" />
              +225 05-45-29-28-02
            </li>
            <li class="flex items-start">
              <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-2 mt-1 text-repae-blue-400" />
              <span>
                01 Bp V 03 Abidjan 01<br>
              </span>
            </li>
          </ul>
        </div>

        <!-- Section Actualités -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-bold font-brand">Actualités</h4>
            <NuxtLink
              to="/actualites"
              class="text-sm text-repae-blue-400 hover:text-repae-blue-300 font-brand transition-colors flex items-center gap-1"
            >
              Voir tout
              <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-xs" />
            </NuxtLink>
          </div>

          <!-- Carrousel d'actualités -->
          <div class="relative overflow-hidden">
          <!-- Flèche gauche -->
          <button
            @click="previousArticle"
            class="absolute cursor-pointer left-0 md:-left-10 top-1/2 transform -translate-y-1/2 z-10 bg-repae-gray-800 hover:bg-repae-gray-700 text-white p-2 md:p-3 rounded-full transition-colors"
            aria-label="Article précédent"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-lg md:text-xl" />
          </button>

          <!-- Flèche droite -->
          <button
            @click="nextArticle"
            class="absolute cursor-pointer right-0 md:-right-10 top-1/2 transform -translate-y-1/2 z-10 bg-repae-gray-800 hover:bg-repae-gray-700 text-white p-2 md:p-3 rounded-full transition-colors"
            aria-label="Article suivant"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-lg md:text-xl" />
          </button>

          <!-- Conteneur des articles -->
          <div class="flex space-x-2 transition-transform duration-300">
            <article
              v-for="(article, index) in newsArticles"
              :key="article.id"
              v-show="index === currentArticleIndex || index === currentArticleIndex + 1"
              class="bg-repae-gray-800 dark:bg-repae-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <!-- Image de couverture -->
              <div v-if="article.coverImage" class="relative h-32 overflow-hidden">
                <img
                  :src="article.coverImage"
                  :alt="article.title"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Contenu de l'article -->
              <div class="px-6 pt-4">
                <!-- Date de publication -->
                <p class="text-repae-gray-400 text-sm font-brand mb-2">
                  Publié le {{ formatDate(article.publishedAt) }}
                </p>

                <!-- Titre -->
                <h4 class="text-sm font-bold text-white font-brand mb-4 leading-tight line-clamp-3">
                  {{ article.title }}
                </h4>

                <!-- Description -->
                <p class="text-sm text-repae-gray-300 font-brand mb-6 leading-relaxed line-clamp-3">
                  {{ article.summary }}
                </p>
              </div>
            </article>
          </div>
          </div>
        </div>
      </div>

      <div class="border-t border-repae-gray-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-repae-gray-400 font-brand text-sm mb-4 md:mb-0">
            © {{ currentYear }} REPAE. Tous droits réservés
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-repae-gray-400 hover:text-repae-blue-400 font-brand text-sm transition-colors">
              Confidentialité
            </a>
            <a href="#" class="text-repae-gray-400 hover:text-repae-blue-400 font-brand text-sm transition-colors">
              Conditions
            </a>
            <a href="#" class="text-repae-gray-400 hover:text-repae-blue-400 font-brand text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
