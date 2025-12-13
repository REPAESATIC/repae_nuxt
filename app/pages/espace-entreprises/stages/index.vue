<script setup lang="ts">
import type { OffreStage, StatutStage, NiveauEtudes } from '~/data/espace-entreprises/offres-stages'
import { offresStagesList, stagesStats, niveauEtudesConfig, remoteConfig } from '~/data/espace-entreprises/offres-stages'
import { currentEntreprise } from '~/data/espace-entreprises/current-entreprise'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Mes offres de stages - Espace Entreprises | REPAE'
})

const router = useRouter()

// Filters
const selectedStatut = ref<StatutStage | 'all'>('all')
const selectedDuree = ref<number | 'all'>('all')
const selectedNiveau = ref<NiveauEtudes | 'all'>('all')
const searchQuery = ref('')

// Reset filters
const resetFilters = () => {
  selectedDuree.value = 'all'
  selectedNiveau.value = 'all'
  searchQuery.value = ''
}

// Filtered stages
const filteredStages = computed(() => {
  let result = [...offresStagesList]

  // Filter by status
  if (selectedStatut.value !== 'all') {
    result = result.filter(stage => stage.statut === selectedStatut.value)
  }

  // Filter by duree
  if (selectedDuree.value !== 'all') {
    result = result.filter(stage => stage.duree_mois === selectedDuree.value)
  }

  // Filter by niveau
  if (selectedNiveau.value !== 'all') {
    result = result.filter(stage => stage.niveau_etudes === selectedNiveau.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(stage =>
      stage.titre.toLowerCase().includes(query) ||
      stage.ville.toLowerCase().includes(query) ||
      stage.competences_requises.some(c => c.toLowerCase().includes(query))
    )
  }

  // Sort by date (newest first)
  result.sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime())

  return result
})

// Preview modal
const showPreviewModal = ref(false)
const selectedStage = ref<OffreStage | null>(null)

const openPreview = (stage: OffreStage) => {
  selectedStage.value = stage
  showPreviewModal.value = true
}

const closePreview = () => {
  showPreviewModal.value = false
  selectedStage.value = null
}

// Actions
const handleEdit = (id: string) => {
  router.push(`/espace-entreprises/stages/${id}/modifier`)
}

const handleDuplicate = (id: string) => {
  console.log('Duplicate stage:', id)
}

const handleClose = (id: string) => {
  console.log('Close stage:', id)
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Mes offres de stages
        </h1>
        <p class="text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          Proposez des stages aux etudiants et jeunes diplomes IT
        </p>
      </div>
      <NuxtLink
        to="/espace-entreprises/stages/publier"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium font-brand transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouveau stage
      </NuxtLink>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ stagesStats.publiees }}
            </p>
            <p class="text-xs text-repae-gray-400">Stages actifs</p>
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
              {{ stagesStats.totalVues }}
            </p>
            <p class="text-xs text-repae-gray-400">Vues totales</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-users" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ stagesStats.totalCandidatures }}
            </p>
            <p class="text-xs text-repae-gray-400">Candidatures</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-user-check" class="text-amber-500" />
          </div>
          <div>
            <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ stagesStats.pourvues }}
            </p>
            <p class="text-xs text-repae-gray-400">Stages pourvus</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <EspaceEntreprisesStagesFilters
      v-model:selected-statut="selectedStatut"
      v-model:selected-duree="selectedDuree"
      v-model:selected-niveau="selectedNiveau"
      v-model:search-query="searchQuery"
      @reset="resetFilters"
    />

    <!-- Stages list -->
    <div v-if="filteredStages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EspaceEntreprisesStagesCard
        v-for="stage in filteredStages"
        :key="stage.id"
        :stage="stage"
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
      <div class="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-2xl text-purple-500" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        <template v-if="searchQuery || selectedDuree !== 'all' || selectedNiveau !== 'all' || selectedStatut !== 'all'">
          Aucun stage trouve
        </template>
        <template v-else>
          Aucune offre de stage
        </template>
      </h3>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        <template v-if="searchQuery || selectedDuree !== 'all' || selectedNiveau !== 'all' || selectedStatut !== 'all'">
          Essayez de modifier vos criteres de recherche
        </template>
        <template v-else>
          Proposez des stages pour attirer les jeunes talents IT
        </template>
      </p>
      <NuxtLink
        v-if="!searchQuery && selectedDuree === 'all' && selectedNiveau === 'all' && selectedStatut === 'all'"
        to="/espace-entreprises/stages/publier"
        class="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium font-brand transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Proposer un stage
      </NuxtLink>
      <button
        v-else
        type="button"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 rounded-xl font-medium font-brand transition-colors cursor-pointer"
        @click="resetFilters(); selectedStatut = 'all'"
      >
        <font-awesome-icon icon="fa-solid fa-times" />
        Reinitialiser les filtres
      </button>
    </div>

    <!-- Preview Modal -->
    <Teleport to="body">
      <div
        v-if="showPreviewModal && selectedStage"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closePreview"
        />

        <!-- Modal content -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal header -->
          <div class="sticky top-0 bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 p-4 flex items-center justify-between z-10">
            <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
              Apercu du stage
            </h3>
            <button
              type="button"
              class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
              @click="closePreview"
            >
              <font-awesome-icon icon="fa-solid fa-times" class="text-xl" />
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <!-- Enterprise info -->
            <div class="flex items-center gap-4 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
              <img
                :src="currentEntreprise.logo_url"
                :alt="currentEntreprise.nom"
                class="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ currentEntreprise.nom }}
                </h4>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ currentEntreprise.secteur_activite }}
                </p>
              </div>
            </div>

            <!-- Stage header -->
            <div>
              <div class="flex items-center gap-2 flex-wrap mb-3">
                <span
                  v-if="selectedStage.embauche_possible"
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium"
                >
                  <font-awesome-icon icon="fa-solid fa-user-plus" />
                  Embauche possible
                </span>
                <span class="px-2.5 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                  {{ selectedStage.duree_mois }} mois
                </span>
              </div>
              <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ selectedStage.titre }}
              </h2>
            </div>

            <!-- Key info grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
                <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-emerald-500" />
                </div>
                <div>
                  <p class="text-xs text-repae-gray-400">Lieu</p>
                  <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ selectedStage.ville }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon :icon="remoteConfig[selectedStage.mode_remote].icon" class="text-blue-500" />
                </div>
                <div>
                  <p class="text-xs text-repae-gray-400">Mode</p>
                  <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ remoteConfig[selectedStage.mode_remote].label }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
                <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500" />
                </div>
                <div>
                  <p class="text-xs text-repae-gray-400">Niveau</p>
                  <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ niveauEtudesConfig[selectedStage.niveau_etudes].label }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
                <div class="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-amber-500" />
                </div>
                <div>
                  <p class="text-xs text-repae-gray-400">Gratification</p>
                  <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ selectedStage.gratification.toLocaleString() }} {{ selectedStage.devise }}/mois</p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p class="text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
                {{ selectedStage.description }}
              </p>
            </div>

            <!-- Missions -->
            <div>
              <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
                Missions
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="(mission, index) in selectedStage.missions"
                  :key="index"
                  class="flex items-start gap-2 text-repae-gray-600 dark:text-repae-gray-400"
                >
                  <font-awesome-icon icon="fa-solid fa-check" class="text-emerald-500 mt-1 text-sm" />
                  {{ mission }}
                </li>
              </ul>
            </div>

            <!-- Competences -->
            <div>
              <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
                Competences recherchees
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="comp in selectedStage.competences_requises"
                  :key="comp"
                  class="px-3 py-1.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 rounded-lg text-sm font-medium"
                >
                  {{ comp }}
                </span>
              </div>
            </div>

            <!-- Dates -->
            <div class="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <span class="flex items-center gap-2">
                <font-awesome-icon icon="fa-solid fa-calendar" />
                Debut : {{ formatDate(selectedStage.date_debut) }}
              </span>
              <span class="flex items-center gap-2">
                <font-awesome-icon icon="fa-solid fa-clock" />
                Candidater avant le {{ formatDate(selectedStage.date_fin_candidature) }}
              </span>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="sticky bottom-0 bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700 p-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              class="w-full sm:w-auto px-6 py-2.5 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
              @click="handleEdit(selectedStage.id)"
            >
              <font-awesome-icon icon="fa-solid fa-pencil-alt" />
              Modifier
            </button>
            <button
              type="button"
              class="w-full sm:w-auto px-6 py-2.5 text-repae-gray-500 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 font-medium font-brand transition-colors cursor-pointer"
              @click="closePreview"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
