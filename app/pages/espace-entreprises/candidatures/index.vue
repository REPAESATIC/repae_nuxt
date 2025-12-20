<script setup lang="ts">
import type { Candidature, StatutCandidature, TypeOffre } from '~/data/espace-entreprises/candidatures'
import { candidaturesList, statutCandidatureConfig, candidaturesGlobalStats } from '~/data/espace-entreprises/candidatures'
import { getOffreById } from '~/data/espace-entreprises/offres-emploi'
import { getStageById } from '~/data/espace-entreprises/offres-stages'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Toutes les candidatures | REPAE'
})

// Filters
const searchQuery = ref('')
const selectedStatut = ref<StatutCandidature | 'all'>('all')
const selectedType = ref<TypeOffre | 'all'>('all')
const sortBy = ref<'date' | 'statut'>('date')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Get offre/stage title
const getOffreTitle = (candidature: Candidature): string => {
  if (candidature.type_offre === 'emploi') {
    const offre = getOffreById(candidature.offre_id)
    return offre?.titre || 'Offre inconnue'
  } else {
    const stage = getStageById(candidature.offre_id)
    return stage?.titre || 'Stage inconnu'
  }
}

// Filtered and sorted candidatures
const filteredCandidatures = computed(() => {
  let result = [...candidaturesList]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.alumni.prenom.toLowerCase().includes(query) ||
      c.alumni.nom.toLowerCase().includes(query) ||
      c.alumni.competences.some(comp => comp.toLowerCase().includes(query)) ||
      getOffreTitle(c).toLowerCase().includes(query)
    )
  }

  // Statut filter
  if (selectedStatut.value !== 'all') {
    result = result.filter(c => c.statut === selectedStatut.value)
  }

  // Type filter
  if (selectedType.value !== 'all') {
    result = result.filter(c => c.type_offre === selectedType.value)
  }

  // Sort
  result.sort((a, b) => {
    let comparison = 0
    if (sortBy.value === 'date') {
      comparison = new Date(a.date_candidature).getTime() - new Date(b.date_candidature).getTime()
    } else {
      const statutOrder: StatutCandidature[] = ['nouvelle', 'vue', 'en_cours', 'acceptee', 'refusee']
      comparison = statutOrder.indexOf(a.statut) - statutOrder.indexOf(b.statut)
    }
    return sortOrder.value === 'asc' ? comparison : -comparison
  })

  return result
})

// Stats
const stats = computed(() => ({
  total: candidaturesList.length,
  nouvelles: candidaturesList.filter(c => c.statut === 'nouvelle').length,
  enCours: candidaturesList.filter(c => c.statut === 'en_cours').length,
  acceptees: candidaturesList.filter(c => c.statut === 'acceptee').length,
  refusees: candidaturesList.filter(c => c.statut === 'refusee').length
}))

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Toutes les candidatures
      </h1>
      <p class="text-repae-gray-500 dark:text-repae-gray-400">
        Gerez l'ensemble des candidatures recues pour vos offres d'emploi et de stage
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-100 dark:bg-repae-gray-700 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-inbox" class="text-repae-gray-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-repae-gray-900 dark:text-white">{{ stats.total }}</p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Total</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-envelope" class="text-blue-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-repae-gray-900 dark:text-white">{{ stats.nouvelles }}</p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Nouvelles</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-clock" class="text-orange-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-repae-gray-900 dark:text-white">{{ stats.enCours }}</p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">En cours</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="text-emerald-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-repae-gray-900 dark:text-white">{{ stats.acceptees }}</p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Acceptees</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-times-circle" class="text-red-500" />
          </div>
          <div>
            <p class="text-2xl font-bold text-repae-gray-900 dark:text-white">{{ stats.refusees }}</p>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Refusees</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom, competence ou offre..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors"
          />
        </div>

        <!-- Statut Filter -->
        <select
          v-model="selectedStatut"
          class="px-4 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-repae-gray-900 dark:text-white cursor-pointer"
        >
          <option value="all">Tous les statuts</option>
          <option value="nouvelle">Nouvelles</option>
          <option value="vue">Vues</option>
          <option value="en_cours">En cours</option>
          <option value="acceptee">Acceptees</option>
          <option value="refusee">Refusees</option>
        </select>

        <!-- Type Filter -->
        <select
          v-model="selectedType"
          class="px-4 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-repae-gray-900 dark:text-white cursor-pointer"
        >
          <option value="all">Tous les types</option>
          <option value="emploi">Offres d'emploi</option>
          <option value="stage">Stages</option>
        </select>

        <!-- Sort -->
        <div class="flex gap-2">
          <select
            v-model="sortBy"
            class="px-4 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-repae-gray-900 dark:text-white cursor-pointer"
          >
            <option value="date">Par date</option>
            <option value="statut">Par statut</option>
          </select>
          <button
            type="button"
            class="px-3 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
            @click="toggleSortOrder"
          >
            <font-awesome-icon
              :icon="sortOrder === 'desc' ? 'fa-solid fa-sort-amount-down' : 'fa-solid fa-sort-amount-up'"
              class="text-repae-gray-500"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
      {{ filteredCandidatures.length }} candidature{{ filteredCandidatures.length > 1 ? 's' : '' }} trouvee{{ filteredCandidatures.length > 1 ? 's' : '' }}
    </p>

    <!-- Candidatures List -->
    <div v-if="filteredCandidatures.length > 0" class="space-y-4">
      <NuxtLink
        v-for="candidature in filteredCandidatures"
        :key="candidature.id"
        :to="`/espace-entreprises/candidatures/${candidature.id}`"
        class="block bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-lg transition-all group"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <!-- Avatar & Info -->
          <div class="flex items-center gap-4 flex-1">
            <img
              :src="candidature.alumni.photo_url"
              :alt="`${candidature.alumni.prenom} ${candidature.alumni.nom}`"
              class="w-14 h-14 rounded-xl object-cover"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-semibold text-repae-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {{ candidature.alumni.prenom }} {{ candidature.alumni.nom }}
                </h3>
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    statutCandidatureConfig[candidature.statut].color
                  ]"
                >
                  {{ statutCandidatureConfig[candidature.statut].label }}
                </span>
              </div>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 truncate">
                {{ candidature.alumni.poste_actuel }} - Promo {{ candidature.alumni.promotion }}
              </p>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span
                  v-for="comp in candidature.alumni.competences.slice(0, 3)"
                  :key="comp"
                  class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 rounded text-xs"
                >
                  {{ comp }}
                </span>
                <span
                  v-if="candidature.alumni.competences.length > 3"
                  class="px-2 py-0.5 text-repae-gray-400 text-xs"
                >
                  +{{ candidature.alumni.competences.length - 3 }}
                </span>
              </div>
            </div>
          </div>

          <!-- Offre Info -->
          <div class="flex items-center gap-4 md:text-right">
            <div class="flex-1">
              <div class="flex items-center gap-2 md:justify-end mb-1">
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    candidature.type_offre === 'emploi'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                      : 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400'
                  ]"
                >
                  {{ candidature.type_offre === 'emploi' ? 'Emploi' : 'Stage' }}
                </span>
              </div>
              <p class="text-sm font-medium text-repae-gray-900 dark:text-white truncate max-w-[200px]">
                {{ getOffreTitle(candidature) }}
              </p>
              <p class="text-xs text-repae-gray-400 mt-1">
                {{ new Date(candidature.date_candidature).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }}
              </p>
            </div>
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              class="text-repae-gray-300 dark:text-repae-gray-600 group-hover:text-emerald-500 transition-colors"
            />
          </div>
        </div>

        <!-- Note recruteur -->
        <div
          v-if="candidature.note_recruteur"
          class="mt-3 pt-3 border-t border-gray-100 dark:border-repae-gray-700"
        >
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-sticky-note" class="text-yellow-500" />
            {{ candidature.note_recruteur }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-12 text-center">
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-inbox" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune candidature trouvee
      </h3>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        {{ searchQuery || selectedStatut !== 'all' || selectedType !== 'all'
          ? 'Aucune candidature ne correspond a vos criteres de recherche.'
          : 'Vous n\'avez pas encore recu de candidatures.' }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          v-if="searchQuery || selectedStatut !== 'all' || selectedType !== 'all'"
          type="button"
          class="px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 hover:bg-gray-200 dark:hover:bg-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 rounded-xl font-medium transition-colors cursor-pointer"
          @click="searchQuery = ''; selectedStatut = 'all'; selectedType = 'all'"
        >
          Reinitialiser les filtres
        </button>
        <NuxtLink
          to="/espace-entreprises/offres/publier"
          class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
        >
          Publier une offre
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
