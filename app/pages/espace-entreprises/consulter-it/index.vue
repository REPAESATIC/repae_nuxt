<script setup lang="ts">
import type { Disponibilite, NiveauExperience, ProfilIT } from '~/data/espace-entreprises/profils-it'
import { filterProfils, profilsITList, profilsStats } from '~/data/espace-entreprises/profils-it'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Consulter les IT - Espace Entreprises | REPAE'
})

// View mode
const viewMode = ref<'grid' | 'list'>('grid')

// Search and filters
const searchQuery = ref('')
const selectedDisponibilite = ref<Disponibilite | 'all'>('all')
const selectedNiveauExperience = ref<NiveauExperience | 'all'>('all')
const selectedCompetences = ref<string[]>([])
const selectedVille = ref<string | 'all'>('all')
const selectedPromotion = ref<number | 'all'>('all')

// Sorting
const sortBy = ref<'pertinence' | 'date' | 'promotion' | 'experience'>('pertinence')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12

// Filtered and sorted results
const filteredProfils = computed(() => {
  let results = filterProfils({
    search: searchQuery.value,
    competences: selectedCompetences.value,
    disponibilite: selectedDisponibilite.value,
    niveauExperience: selectedNiveauExperience.value,
    ville: selectedVille.value,
    promotionMin: selectedPromotion.value !== 'all' ? selectedPromotion.value : undefined,
    promotionMax: selectedPromotion.value !== 'all' ? selectedPromotion.value : undefined
  })

  // Sort
  switch (sortBy.value) {
    case 'date':
      results.sort((a, b) => new Date(b.derniere_mise_a_jour).getTime() - new Date(a.derniere_mise_a_jour).getTime())
      break
    case 'promotion':
      results.sort((a, b) => b.promotion - a.promotion)
      break
    case 'experience':
      results.sort((a, b) => b.experience_annees - a.experience_annees)
      break
    default:
      // Pertinence: prioritize disponible et en_recherche
      results.sort((a, b) => {
        const priorityOrder = { disponible: 0, en_recherche: 1, en_poste: 2 }
        return priorityOrder[a.disponibilite] - priorityOrder[b.disponibilite]
      })
  }

  return results
})

// Paginated results
const paginatedProfils = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProfils.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredProfils.value.length / itemsPerPage))

// Reset filters
const resetFilters = () => {
  selectedDisponibilite.value = 'all'
  selectedNiveauExperience.value = 'all'
  selectedCompetences.value = []
  selectedVille.value = 'all'
  selectedPromotion.value = 'all'
  currentPage.value = 1
}

// Handle search
const handleSearch = () => {
  currentPage.value = 1
}

// Watch for filter changes to reset pagination
watch([selectedDisponibilite, selectedNiveauExperience, selectedCompetences, selectedVille, selectedPromotion], () => {
  currentPage.value = 1
})

// Show/hide filters on mobile
const showFilters = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
        Consulter les IT
      </h1>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mt-2">
        Explorez les profils de nos {{ profilsStats.total }} talents IT du reseau REPAE
      </p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-users" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">{{ profilsStats.total }}</p>
            <p class="text-xs text-repae-gray-400">Total</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-emerald-500">{{ profilsStats.disponibles }}</p>
            <p class="text-xs text-repae-gray-400">Disponibles</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-search" class="text-blue-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-blue-500">{{ profilsStats.enRecherche }}</p>
            <p class="text-xs text-repae-gray-400">En recherche</p>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-100 dark:bg-gray-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-gray-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-500">{{ profilsStats.enPoste }}</p>
            <p class="text-xs text-repae-gray-400">En poste</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search bar -->
    <EspaceEntreprisesConsulterItSearchBar
      v-model="searchQuery"
      :results-count="filteredProfils.length"
      @search="handleSearch"
    />

    <div class="mt-6 flex flex-col lg:flex-row gap-6">
      <!-- Mobile filter toggle -->
      <button
        type="button"
        class="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-repae-gray-700 dark:text-repae-gray-300 font-medium cursor-pointer"
        @click="showFilters = !showFilters"
      >
        <font-awesome-icon icon="fa-solid fa-filter" />
        {{ showFilters ? 'Masquer les filtres' : 'Afficher les filtres' }}
      </button>

      <!-- Filters sidebar -->
      <aside :class="['lg:w-72 flex-shrink-0', showFilters ? 'block' : 'hidden lg:block']">
        <EspaceEntreprisesConsulterItFilters
          v-model:selected-disponibilite="selectedDisponibilite"
          v-model:selected-niveau-experience="selectedNiveauExperience"
          v-model:selected-competences="selectedCompetences"
          v-model:selected-ville="selectedVille"
          v-model:selected-promotion="selectedPromotion"
          @reset="resetFilters"
        />
      </aside>

      <!-- Results -->
      <div class="flex-1">
        <!-- Toolbar -->
        <div class="flex items-center justify-between mb-4">
          <!-- Sort -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">Trier par :</span>
            <select
              v-model="sortBy"
              class="px-3 py-1.5 bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="pertinence">Pertinence</option>
              <option value="date">Mise a jour</option>
              <option value="promotion">Promotion</option>
              <option value="experience">Experience</option>
            </select>
          </div>

          <!-- View mode toggle -->
          <div class="flex items-center gap-1 bg-gray-100 dark:bg-repae-gray-700 rounded-lg p-1">
            <button
              type="button"
              :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
                viewMode === 'grid'
                  ? 'bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white shadow-sm'
                  : 'text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700 dark:hover:text-repae-gray-300'
              ]"
              @click="viewMode = 'grid'"
            >
              <font-awesome-icon icon="fa-solid fa-th-large" />
            </button>
            <button
              type="button"
              :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
                viewMode === 'list'
                  ? 'bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white shadow-sm'
                  : 'text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-gray-700 dark:hover:text-repae-gray-300'
              ]"
              @click="viewMode = 'list'"
            >
              <font-awesome-icon icon="fa-solid fa-list" />
            </button>
          </div>
        </div>

        <!-- Results grid -->
        <div v-if="paginatedProfils.length > 0">
          <!-- Grid view -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            <EspaceEntreprisesConsulterItCard
              v-for="profil in paginatedProfils"
              :key="profil.id"
              :profil="profil"
            />
          </div>

          <!-- List view -->
          <div v-else class="space-y-3">
            <EspaceEntreprisesConsulterItCardCompact
              v-for="profil in paginatedProfils"
              :key="profil.id"
              :profil="profil"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              @click="currentPage--"
            >
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>

            <div class="flex items-center gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                type="button"
                :class="[
                  'w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                  currentPage === page
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700'
                ]"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>

            <button
              type="button"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              @click="currentPage++"
            >
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-12 text-center"
        >
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-search" class="text-2xl text-repae-gray-400" />
          </div>
          <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Aucun profil trouve
          </h3>
          <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
            Essayez de modifier vos criteres de recherche ou de reinitialiser les filtres.
          </p>
          <button
            type="button"
            class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer"
            @click="resetFilters(); searchQuery = ''"
          >
            Reinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
