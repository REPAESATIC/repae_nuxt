<script setup lang="ts">
import type { Candidature, StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { statutCandidatureConfig } from '~/data/espace-entreprises/candidatures'

const props = defineProps<{
  candidatures: Candidature[]
  stats: {
    total: number
    nouvelles: number
    vues: number
    en_cours: number
    acceptees: number
    refusees: number
  }
}>()

const emit = defineEmits<{
  (e: 'view', candidature: Candidature): void
  (e: 'update-status', id: string, status: StatutCandidature): void
}>()

// Filters
const selectedStatut = ref<StatutCandidature | 'all'>('all')
const sortBy = ref<'date' | 'nom'>('date')
const sortOrder = ref<'asc' | 'desc'>('desc')
const searchQuery = ref('')

// Status tabs
const statusTabs = computed(() => [
  { value: 'all', label: 'Toutes', count: props.stats.total },
  { value: 'nouvelle', label: 'Nouvelles', count: props.stats.nouvelles },
  { value: 'vue', label: 'Vues', count: props.stats.vues },
  { value: 'en_cours', label: 'En cours', count: props.stats.en_cours },
  { value: 'acceptee', label: 'Acceptees', count: props.stats.acceptees },
  { value: 'refusee', label: 'Refusees', count: props.stats.refusees }
])

// Filtered and sorted candidatures
const filteredCandidatures = computed(() => {
  let result = [...props.candidatures]

  // Filter by status
  if (selectedStatut.value !== 'all') {
    result = result.filter(c => c.statut === selectedStatut.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.alumni.prenom.toLowerCase().includes(query) ||
      c.alumni.nom.toLowerCase().includes(query) ||
      c.alumni.poste_actuel.toLowerCase().includes(query) ||
      c.alumni.competences.some(comp => comp.toLowerCase().includes(query))
    )
  }

  // Sort
  result.sort((a, b) => {
    if (sortBy.value === 'date') {
      const dateA = new Date(a.date_candidature).getTime()
      const dateB = new Date(b.date_candidature).getTime()
      return sortOrder.value === 'desc' ? dateB - dateA : dateA - dateB
    } else {
      const nameA = `${a.alumni.nom} ${a.alumni.prenom}`.toLowerCase()
      const nameB = `${b.alumni.nom} ${b.alumni.prenom}`.toLowerCase()
      return sortOrder.value === 'desc'
        ? nameB.localeCompare(nameA)
        : nameA.localeCompare(nameB)
    }
  })

  return result
})

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

const handleView = (candidature: Candidature) => {
  emit('view', candidature)
}

const handleUpdateStatus = (id: string, status: StatutCandidature) => {
  emit('update-status', id, status)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Filters bar -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 space-y-4">
      <!-- Status tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
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
          @click="selectedStatut = tab.value as StatutCandidature | 'all'"
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

      <!-- Search and sort -->
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
            placeholder="Rechercher un candidat..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <!-- Sort -->
        <div class="flex items-center gap-2">
          <select
            v-model="sortBy"
            class="px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="date">Trier par date</option>
            <option value="nom">Trier par nom</option>
          </select>

          <button
            type="button"
            class="p-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-repae-gray-500 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
            :title="sortOrder === 'desc' ? 'Ordre decroissant' : 'Ordre croissant'"
            @click="toggleSortOrder"
          >
            <font-awesome-icon
              :icon="sortOrder === 'desc' ? 'fa-solid fa-sort-amount-down' : 'fa-solid fa-sort-amount-up'"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Results count -->
    <div class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
      {{ filteredCandidatures.length }} candidature{{ filteredCandidatures.length > 1 ? 's' : '' }}
      <span v-if="selectedStatut !== 'all'">
        - Filtre : {{ statutCandidatureConfig[selectedStatut].label }}
      </span>
    </div>

    <!-- Candidatures list -->
    <div v-if="filteredCandidatures.length > 0" class="space-y-4">
      <EspaceEntreprisesCandidaturesCard
        v-for="candidature in filteredCandidatures"
        :key="candidature.id"
        :candidature="candidature"
        @view="handleView"
        @update-status="handleUpdateStatus"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-12 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-inbox" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune candidature
      </h3>
      <p class="text-repae-gray-500 dark:text-repae-gray-400">
        <template v-if="searchQuery">
          Aucun resultat pour "{{ searchQuery }}"
        </template>
        <template v-else-if="selectedStatut !== 'all'">
          Aucune candidature avec le statut "{{ statutCandidatureConfig[selectedStatut].label }}"
        </template>
        <template v-else>
          Cette offre n'a pas encore recu de candidature
        </template>
      </p>
    </div>
  </div>
</template>
