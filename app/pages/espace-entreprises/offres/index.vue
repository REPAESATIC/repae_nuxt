<script setup lang="ts">
import type { OffreEmploi, StatutOffre } from '~/data/espace-entreprises/offres-emploi'
import { offresEmploiList, offresStats, statutConfig } from '~/data/espace-entreprises/offres-emploi'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Mes offres d\'emploi - Espace Entreprises | REPAE'
})

const router = useRouter()

// Filters
const selectedStatut = ref<StatutOffre | 'all'>('all')
const searchQuery = ref('')

// Filtered offers
const filteredOffres = computed(() => {
  let result = [...offresEmploiList]

  // Filter by status
  if (selectedStatut.value !== 'all') {
    result = result.filter(offre => offre.statut === selectedStatut.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(offre =>
      offre.titre.toLowerCase().includes(query) ||
      offre.ville.toLowerCase().includes(query) ||
      offre.competences_requises.some(c => c.toLowerCase().includes(query))
    )
  }

  // Sort by date (newest first)
  result.sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime())

  return result
})

// Status tabs
const statusTabs = computed(() => [
  { value: 'all', label: 'Toutes', count: offresStats.total },
  { value: 'publiee', label: 'Publiees', count: offresStats.publiees },
  { value: 'brouillon', label: 'Brouillons', count: offresStats.brouillons },
  { value: 'expiree', label: 'Expirees', count: offresStats.expirees },
  { value: 'cloturee', label: 'Cloturees', count: offresStats.cloturees }
])

// Preview modal
const showPreviewModal = ref(false)
const selectedOffre = ref<OffreEmploi | null>(null)

const openPreview = (offre: OffreEmploi) => {
  selectedOffre.value = offre
  showPreviewModal.value = true
}

const closePreview = () => {
  showPreviewModal.value = false
  selectedOffre.value = null
}

// Actions
const handleEdit = (id: string) => {
  router.push(`/espace-entreprises/offres/${id}/modifier`)
}

const handleDuplicate = (id: string) => {
  // TODO: Implement duplication
  console.log('Duplicate offer:', id)
}

const handleClose = (id: string) => {
  // TODO: Implement close/archive
  console.log('Close offer:', id)
}

const handlePublish = (id: string) => {
  // TODO: Implement publish
  console.log('Publish offer:', id)
  closePreview()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Mes offres d'emploi
        </h1>
        <p class="text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          Gerez vos offres d'emploi et suivez les candidatures
        </p>
      </div>
      <NuxtLink
        to="/espace-entreprises/offres/publier"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvelle offre
      </NuxtLink>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ offresStats.publiees }}
            </p>
            <p class="text-xs text-repae-gray-400">Offres actives</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-eye" class="text-blue-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ offresStats.totalVues }}
            </p>
            <p class="text-xs text-repae-gray-400">Vues totales</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-users" class="text-purple-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ offresStats.totalCandidatures }}
            </p>
            <p class="text-xs text-repae-gray-400">Candidatures</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-bell" class="text-amber-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-emerald-500">
              {{ offresStats.candidaturesNonLues }}
            </p>
            <p class="text-xs text-repae-gray-400">Non lues</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
      <div class="flex flex-col md:flex-row md:items-center gap-4">
        <!-- Status tabs -->
        <div class="flex-1 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium font-brand whitespace-nowrap transition-colors cursor-pointer',
              selectedStatut === tab.value
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'text-repae-gray-500 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700'
            ]"
            @click="selectedStatut = tab.value as StatutOffre | 'all'"
          >
            {{ tab.label }}
            <span
              :class="[
                'ml-1.5 px-1.5 py-0.5 rounded-full text-xs',
                selectedStatut === tab.value
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400'
              ]"
            >
              {{ tab.count }}
            </span>
          </button>
        </div>

        <!-- Search -->
        <div class="relative md:w-64">
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>

    <!-- Offers list -->
    <div v-if="filteredOffres.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EspaceEntreprisesOffresCard
        v-for="offre in filteredOffres"
        :key="offre.id"
        :offre="offre"
        @preview="openPreview"
        @edit="handleEdit"
        @duplicate="handleDuplicate"
        @close="handleClose"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-12 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        <template v-if="searchQuery || selectedStatut !== 'all'">
          Aucune offre trouvee
        </template>
        <template v-else>
          Aucune offre pour le moment
        </template>
      </h3>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        <template v-if="searchQuery || selectedStatut !== 'all'">
          Essayez de modifier vos criteres de recherche
        </template>
        <template v-else>
          Commencez par publier votre premiere offre d'emploi
        </template>
      </p>
      <NuxtLink
        v-if="!searchQuery && selectedStatut === 'all'"
        to="/espace-entreprises/offres/publier"
        class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Publier une offre
      </NuxtLink>
      <button
        v-else
        type="button"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 rounded-xl font-medium font-brand transition-colors cursor-pointer"
        @click="searchQuery = ''; selectedStatut = 'all'"
      >
        <font-awesome-icon icon="fa-solid fa-times" />
        Reinitialiser les filtres
      </button>
    </div>

    <!-- Preview Modal -->
    <Teleport to="body">
      <div
        v-if="showPreviewModal && selectedOffre"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closePreview"
        />

        <!-- Modal content -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <EspaceEntreprisesOffresPreview
            :offre="selectedOffre"
            is-modal
            @close="closePreview"
            @edit="handleEdit"
            @publish="handlePublish"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
