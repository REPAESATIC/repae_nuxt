<script setup lang="ts">
import {
  featuredArticle,
  secondaryArticles,
  twoColumnArticles,
  formationArticles,
  careerArticles,
  eventArticles,
  formatDate,
  getCategoryColor,
} from '~/data/actualites'

// État pour la recherche
const searchQuery = ref('')
const showSearch = ref(false)

// Filtrer les catégories pour le menu
const menuCategories = [
  { label: 'Formation', href: '#formation' },
  { label: 'Carrière', href: '#carriere' },
  { label: 'Événements', href: '#evenements' },
  { label: 'Association', href: '#association' },
  { label: 'Partenariats', href: '#partenariats' },
]
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

          <!-- Categories Menu -->
          <nav class="hidden lg:flex items-center space-x-6 mt-4 md:mt-0">
            <NuxtLink
              v-for="cat in menuCategories"
              :key="cat.label"
              :href="cat.href"
              class="text-base font-semibold text-repae-gray-700 dark:text-repae-gray-300 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors cursor-pointer"
            >
              {{ cat.label }}
            </NuxtLink>
          </nav>

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
      <section class="flex flex-col lg:flex-row lg:space-x-10">
        <!-- Left: Featured Article -->
        <div class="lg:w-3/5">
          <div class="cursor-pointer group">
            <img
              :src="featuredArticle.image"
              :alt="featuredArticle.title"
              class="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          <div class="mt-6">
            <p :class="getCategoryColor(featuredArticle.category)" class="font-semibold text-lg">
              {{ featuredArticle.category }}
            </p>

            <h2 class="text-2xl lg:text-4xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-3 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
              {{ featuredArticle.title }}
            </h2>

            <p class="mt-4 text-lg text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed">
              {{ featuredArticle.excerpt }}
            </p>

            <div class="flex items-center space-x-4 mt-6">
              <img
                :src="featuredArticle.author.avatar"
                :alt="featuredArticle.author.name"
                class="h-10 w-10 rounded-full object-cover"
              />
              <p class="font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 dark:hover:text-repae-blue-400 cursor-pointer transition-colors">
                {{ featuredArticle.author.name }}
              </p>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(featuredArticle.publishedAt) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Secondary Articles -->
        <div class="lg:w-2/5 mt-10 lg:mt-0">
          <div
            v-for="(article, index) in secondaryArticles"
            :key="article.id"
            class="flex flex-col md:flex-row md:space-x-4 lg:space-x-4"
            :class="{ 'mt-8 pt-8 border-t border-gray-200 dark:border-repae-gray-700': index > 0 }"
          >
            <div class="md:w-2/5 flex-shrink-0">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-48 md:h-40 object-cover rounded-lg cursor-pointer"
              />
            </div>

            <div class="md:w-3/5 mt-4 md:mt-0 space-y-2">
              <p :class="getCategoryColor(article.category)" class="font-semibold">
                {{ article.category }}
              </p>
              <h3 class="text-xl font-bold text-repae-gray-900 dark:text-white leading-tight cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                {{ article.title }}
              </h3>
              <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 leading-snug">
                {{ article.excerpt }}
              </p>
              <div class="pt-2">
                <p class="font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer text-sm">
                  {{ article.author.name }}
                </p>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(article.publishedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Two Column Articles Section -->
      <section class="mt-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <article
            v-for="article in twoColumnArticles"
            :key="article.id"
            class="border-t border-repae-gray-300 dark:border-repae-gray-600 pt-8"
          >
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-56 object-cover rounded-lg cursor-pointer"
            />
            <p :class="getCategoryColor(article.category)" class="font-semibold text-lg mt-4">
              {{ article.category }}
            </p>
            <h3 class="text-2xl lg:text-3xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-3 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
              {{ article.title }}
            </h3>
            <p class="mt-4 text-lg text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
              {{ article.excerpt }}
            </p>
            <div class="flex items-center space-x-4 mt-4">
              <p class="font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                {{ article.author.name }}
              </p>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(article.publishedAt) }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <!-- Formation Section -->
      <section id="formation" class="mt-16">
        <div class="bg-repae-blue-500 h-2 rounded-t"></div>
        <div class="py-3 border-b border-repae-gray-300 dark:border-repae-gray-600">
          <h2 class="text-xl font-bold text-repae-gray-900 dark:text-white">Formation</h2>
        </div>

        <div class="flex flex-col md:flex-row md:space-x-8 mt-8">
          <!-- Main Article -->
          <div class="md:w-3/5">
            <img
              :src="formationArticles[0].image"
              :alt="formationArticles[0].title"
              class="w-full h-64 md:h-80 object-cover rounded-lg cursor-pointer"
            />
            <h3 class="text-2xl md:text-3xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-5 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
              {{ formationArticles[0].title }}
            </h3>
            <p class="mt-3 text-lg text-repae-gray-600 dark:text-repae-gray-400">
              {{ formationArticles[0].excerpt }}
            </p>
            <div class="flex items-center space-x-4 mt-4">
              <img
                :src="formationArticles[0].author.avatar"
                :alt="formationArticles[0].author.name"
                class="h-8 w-8 rounded-full object-cover"
              />
              <p class="text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                {{ formationArticles[0].author.name }}
              </p>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(formationArticles[0].publishedAt) }}
              </p>
            </div>
          </div>

          <!-- Side Articles -->
          <div class="md:w-2/5 mt-8 md:mt-0 space-y-6">
            <article
              v-for="(article, index) in formationArticles.slice(1)"
              :key="article.id"
              :class="{ 'pt-6 border-t border-gray-200 dark:border-repae-gray-700': index > 0 }"
            >
              <h4 class="text-xl font-bold text-repae-gray-900 dark:text-white leading-tight cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                {{ article.title }}
              </h4>
              <p class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-400">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center space-x-2 mt-2">
                <p class="text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                  {{ article.author.name }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Carrière Section -->
      <section id="carriere" class="mt-16">
        <div class="bg-repae-blue-500 h-2 rounded-t"></div>
        <div class="py-3 border-b border-repae-gray-300 dark:border-repae-gray-600">
          <h2 class="text-xl font-bold text-repae-gray-900 dark:text-white">Carrière</h2>
        </div>

        <div class="flex flex-col-reverse md:flex-row md:space-x-8 mt-8">
          <!-- Side Articles -->
          <div class="md:w-1/4 mt-8 md:mt-0 space-y-6">
            <article
              v-for="(article, index) in careerArticles.slice(1)"
              :key="article.id"
              :class="{ 'pt-6 border-t border-gray-200 dark:border-repae-gray-700': index > 0 }"
            >
              <h4 class="text-xl font-bold text-repae-gray-900 dark:text-white leading-tight cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                {{ article.title }}
              </h4>
              <p class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-400">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center space-x-2 mt-2">
                <p class="text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                  {{ article.author.name }}
                </p>
              </div>
            </article>
          </div>

          <!-- Main Article -->
          <div class="md:w-3/4">
            <img
              :src="careerArticles[0].image"
              :alt="careerArticles[0].title"
              class="w-full h-64 md:h-96 object-cover rounded-lg cursor-pointer"
            />
            <h3 class="text-2xl md:text-3xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-5 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
              {{ careerArticles[0].title }}
            </h3>
            <p class="mt-3 text-lg text-repae-gray-600 dark:text-repae-gray-400">
              {{ careerArticles[0].excerpt }}
            </p>
            <div class="flex items-center space-x-4 mt-4">
              <img
                :src="careerArticles[0].author.avatar"
                :alt="careerArticles[0].author.name"
                class="h-8 w-8 rounded-full object-cover"
              />
              <p class="text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                {{ careerArticles[0].author.name }}
              </p>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(careerArticles[0].publishedAt) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Événements Section -->
      <section id="evenements" class="mt-16">
        <div class="bg-repae-blue-500 h-2 rounded-t"></div>
        <div class="py-3 border-b border-repae-gray-300 dark:border-repae-gray-600 flex items-center justify-between">
          <h2 class="text-xl font-bold text-repae-gray-900 dark:text-white">Événements</h2>
          <NuxtLink
            to="/evenements"
            class="inline-flex items-center gap-2 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-calendar-alt" />
            Voir tous les événements
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-xs" />
          </NuxtLink>
        </div>

        <!-- Large screen layout -->
        <div class="hidden xl:flex xl:space-x-10 mt-8">
          <!-- Main Article -->
          <div class="w-3/5">
            <img
              :src="eventArticles[0].image"
              :alt="eventArticles[0].title"
              class="w-full h-80 object-cover rounded-lg cursor-pointer"
            />
            <h3 class="text-3xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-5 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
              {{ eventArticles[0].title }}
            </h3>
            <p class="mt-3 text-lg text-repae-gray-600 dark:text-repae-gray-400">
              {{ eventArticles[0].excerpt }}
            </p>
            <div class="flex items-center space-x-4 mt-4">
              <img
                :src="eventArticles[0].author.avatar"
                :alt="eventArticles[0].author.name"
                class="h-8 w-8 rounded-full object-cover"
              />
              <p class="text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                {{ eventArticles[0].author.name }}
              </p>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(eventArticles[0].publishedAt) }}
              </p>
            </div>
          </div>

          <!-- Side column 1 -->
          <div class="w-1/5 space-y-6">
            <article
              v-for="(article, index) in eventArticles.slice(1, 3)"
              :key="article.id"
              :class="{ 'pt-6 border-t border-gray-200 dark:border-repae-gray-700': index > 0 }"
            >
              <h4 class="text-xl font-bold text-repae-gray-900 dark:text-white leading-tight cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                {{ article.title }}
              </h4>
              <p class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-400">
                {{ article.excerpt }}
              </p>
              <p class="mt-2 text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                {{ article.author.name }}
              </p>
            </article>
          </div>

          <!-- Side column 2 with images -->
          <div class="w-1/5 space-y-6">
            <article>
              <img
                src="https://picsum.photos/seed/event3/300/200"
                alt="Événement"
                class="w-full h-32 object-cover rounded-lg"
              />
              <h4 class="text-lg font-bold text-repae-gray-900 dark:text-white leading-tight mt-4 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                Calendrier des événements 2025
              </h4>
              <p class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-400">
                Consultez le planning complet des événements REPAE pour l'année 2025.
              </p>
            </article>
            <article class="pt-6">
              <img
                src="https://picsum.photos/seed/event4/300/200"
                alt="Événement"
                class="w-full h-32 object-cover rounded-lg"
              />
              <h4 class="text-lg font-bold text-repae-gray-900 dark:text-white leading-tight mt-4 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                Devenir organisateur d'événement
              </h4>
              <p class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-400">
                Vous souhaitez organiser un événement pour le réseau ? Contactez-nous !
              </p>
            </article>
          </div>
        </div>

        <!-- Medium/Small screen layout -->
        <div class="xl:hidden mt-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Main Article -->
            <div>
              <img
                :src="eventArticles[0].image"
                :alt="eventArticles[0].title"
                class="w-full h-64 object-cover rounded-lg cursor-pointer"
              />
              <h3 class="text-2xl font-bold text-repae-gray-900 dark:text-white leading-tight mt-5 cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                {{ eventArticles[0].title }}
              </h3>
              <p class="mt-3 text-repae-gray-600 dark:text-repae-gray-400">
                {{ eventArticles[0].excerpt }}
              </p>
              <div class="flex items-center space-x-4 mt-4">
                <img
                  :src="eventArticles[0].author.avatar"
                  :alt="eventArticles[0].author.name"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <p class="text-sm font-bold text-repae-gray-900 dark:text-white">
                  {{ eventArticles[0].author.name }}
                </p>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(eventArticles[0].publishedAt) }}
                </p>
              </div>
            </div>

            <!-- Side Articles -->
            <div class="space-y-6">
              <article
                v-for="(article, index) in eventArticles.slice(1)"
                :key="article.id"
                :class="{ 'pt-6 border-t border-gray-200 dark:border-repae-gray-700': index > 0 }"
              >
                <h4 class="text-xl font-bold text-repae-gray-900 dark:text-white leading-tight cursor-pointer hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors">
                  {{ article.title }}
                </h4>
                <p class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-400">
                  {{ article.excerpt }}
                </p>
                <p class="mt-2 text-sm font-bold text-repae-gray-900 dark:text-white hover:text-repae-blue-500 cursor-pointer">
                  {{ article.author.name }}
                </p>
              </article>
            </div>
          </div>
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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
