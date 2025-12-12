<script setup lang="ts">
import { forumQuestions, categorieConfig, type CategorieQuestion } from '~/data/espace-it/forum'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Forum d\'entraide | Espace IT REPAE'
})

// Filters
const searchQuery = ref('')
const selectedCategorie = ref<CategorieQuestion | 'all'>('all')

// Categories list
const categories = computed(() => [
  { value: 'all', label: 'Toutes les categories' },
  ...Object.entries(categorieConfig).map(([value, config]) => ({
    value,
    label: config.label
  }))
])

// Filtered questions
const filteredQuestions = computed(() => {
  return forumQuestions.filter(q => {
    const matchesSearch = searchQuery.value === '' ||
      q.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesCategorie = selectedCategorie.value === 'all' ||
      q.categorie === selectedCategorie.value

    return matchesSearch && matchesCategorie
  })
})

// Format date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink
        to="/espace-it"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">Forum d'entraide</span>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
          <font-awesome-icon icon="fa-solid fa-comments" class="text-repae-blue-500" />
          Forum d'entraide professionnelle
        </h1>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
          Posez vos questions techniques ou de carriere et obtenez l'aide de la communaute IT
        </p>
      </div>
      <button
        class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-lg transition-colors cursor-pointer flex items-center gap-2"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvelle question
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher une question ou un tag..."
            class="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-repae-gray-700 rounded-lg bg-white dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500"
          />
        </div>

        <!-- Category filter -->
        <select
          v-model="selectedCategorie"
          class="px-4 py-2 border border-gray-200 dark:border-repae-gray-700 rounded-lg bg-white dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 cursor-pointer"
        >
          <option
            v-for="cat in categories"
            :key="cat.value"
            :value="cat.value"
          >
            {{ cat.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Questions List -->
    <div class="space-y-4">
      <NuxtLink
        v-for="question in filteredQuestions"
        :key="question.id"
        :to="`/espace-it/forum/${question.id}`"
        class="block bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50 transition-colors cursor-pointer group"
      >
        <div class="flex items-start gap-4">
          <!-- Author avatar -->
          <img
            :src="question.auteur.photo_url"
            :alt="`${question.auteur.prenom} ${question.auteur.nom}`"
            class="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <!-- Title + Resolved badge -->
            <div class="flex items-start justify-between gap-3 mb-2">
              <h2 class="text-base font-semibold text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors">
                {{ question.titre }}
              </h2>
              <span
                v-if="question.resolu"
                class="flex-shrink-0 px-2.5 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1"
              >
                <font-awesome-icon icon="fa-solid fa-check" class="text-[10px]" />
                Resolu
              </span>
            </div>

            <!-- Preview -->
            <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 line-clamp-2 mb-3">
              {{ question.contenu }}
            </p>

            <!-- Meta -->
            <div class="flex flex-wrap items-center gap-3 text-xs">
              <!-- Author -->
              <span class="font-medium text-repae-gray-700 dark:text-repae-gray-300">
                {{ question.auteur.prenom }} {{ question.auteur.nom }}
              </span>

              <span class="text-repae-gray-400">·</span>

              <!-- Category -->
              <span
                :class="[categorieConfig[question.categorie].color, 'px-2 py-0.5 rounded-md flex items-center gap-1']"
              >
                <font-awesome-icon :icon="categorieConfig[question.categorie].icon" class="text-[10px]" />
                {{ categorieConfig[question.categorie].label }}
              </span>

              <span class="text-repae-gray-400">·</span>

              <!-- Date -->
              <span class="text-repae-gray-500 dark:text-repae-gray-400">
                {{ formatDate(question.date_creation) }}
              </span>

              <span class="text-repae-gray-400">·</span>

              <!-- Stats -->
              <span class="flex items-center gap-1 text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-reply" />
                {{ question.nombre_reponses }}
              </span>
              <span class="flex items-center gap-1 text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-eye" />
                {{ question.nombre_vues }}
              </span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="tag in question.tags"
                :key="tag"
                class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 text-xs rounded-md"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div
      v-if="filteredQuestions.length === 0"
      class="text-center py-12 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700"
    >
      <font-awesome-icon icon="fa-solid fa-comments" class="text-4xl text-repae-gray-300 dark:text-repae-gray-600 mb-3" />
      <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand mb-4">
        Aucune question ne correspond a votre recherche
      </p>
      <button
        class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Poser la premiere question
      </button>
    </div>
  </div>
</template>
