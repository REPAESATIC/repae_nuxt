<script setup lang="ts">
import type { StatutCandidature } from '~/data/espace-it/candidatures'
import {
  candidaturesList,
  statutConfig,
  filterCandidatures,
  getCandidatureStats
} from '~/data/espace-it/candidatures'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: 'Mes candidatures | Espace IT REPAE'
})

// Reactive candidatures list (for withdrawal simulation)
const candidatures = ref([...candidaturesList])

// Filters
const filters = reactive({
  statut: null as StatutCandidature | null,
  search: ''
})

// Filtered candidatures
const filteredCandidatures = computed(() => {
  return filterCandidatures(candidatures.value, filters)
})

// Stats
const stats = computed(() => getCandidatureStats(candidatures.value))

// Statuts for filter tabs
const statutTabs = [
  { value: null, label: 'Toutes' },
  { value: 'en_attente', label: 'En attente' },
  { value: 'vue', label: 'Vues' },
  { value: 'entretien', label: 'Entretiens' },
  { value: 'acceptee', label: 'Acceptees' },
  { value: 'refusee', label: 'Refusees' }
] as const

// Handle withdrawal
const showWithdrawModal = ref(false)
const candidatureToWithdraw = ref<string | null>(null)

const openWithdrawModal = (id: string) => {
  candidatureToWithdraw.value = id
  showWithdrawModal.value = true
}

const confirmWithdraw = () => {
  if (candidatureToWithdraw.value) {
    const index = candidatures.value.findIndex(c => c.id === candidatureToWithdraw.value)
    if (index !== -1) {
      candidatures.value[index] = {
        ...candidatures.value[index],
        statut: 'retiree',
        date_mise_a_jour: new Date().toISOString().split('T')[0]
      }
    }
  }
  showWithdrawModal.value = false
  candidatureToWithdraw.value = null
}

const cancelWithdraw = () => {
  showWithdrawModal.value = false
  candidatureToWithdraw.value = null
}

// Reset filters
const resetFilters = () => {
  filters.statut = null
  filters.search = ''
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
      <span class="text-repae-gray-900 dark:text-white">Mes candidatures</span>
    </nav>

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-3">
          <font-awesome-icon icon="fa-solid fa-paper-plane" class="text-repae-blue-500" />
          Mes candidatures
        </h1>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-1">
          Suivez l'evolution de vos candidatures
        </p>
      </div>

      <NuxtLink
        to="/espace-it/offres"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-search" />
        Voir les offres
      </NuxtLink>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 text-center">
        <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ stats.total }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">Total</p>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 text-center">
        <p class="text-2xl font-bold font-brand text-yellow-600 dark:text-yellow-400">
          {{ stats.en_attente }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">En attente</p>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 text-center">
        <p class="text-2xl font-bold font-brand text-blue-600 dark:text-blue-400">
          {{ stats.vue }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">Vues</p>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 text-center">
        <p class="text-2xl font-bold font-brand text-purple-600 dark:text-purple-400">
          {{ stats.entretien }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">Entretiens</p>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 text-center">
        <p class="text-2xl font-bold font-brand text-green-600 dark:text-green-400">
          {{ stats.acceptee }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">Acceptees</p>
      </div>
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 text-center">
        <p class="text-2xl font-bold font-brand text-red-600 dark:text-red-400">
          {{ stats.refusee }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">Refusees</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-5">
      <div class="flex flex-col lg:flex-row lg:items-center gap-4">
        <!-- Statut tabs -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in statutTabs"
            :key="tab.value ?? 'all'"
            :class="[
              'px-4 py-2 text-sm font-medium font-brand rounded-lg transition-colors cursor-pointer',
              filters.statut === tab.value
                ? 'bg-repae-blue-500 text-white'
                : 'bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-200 dark:hover:bg-repae-gray-600'
            ]"
            @click="filters.statut = tab.value"
          >
            {{ tab.label }}
            <span
              v-if="tab.value === null"
              class="ml-1.5 px-1.5 py-0.5 text-xs rounded-md"
              :class="filters.statut === tab.value ? 'bg-white/20' : 'bg-repae-gray-200 dark:bg-repae-gray-600'"
            >
              {{ stats.total }}
            </span>
          </button>
        </div>

        <!-- Search -->
        <div class="lg:ml-auto">
          <div class="relative">
            <font-awesome-icon
              icon="fa-solid fa-search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
            />
            <input
              v-model="filters.search"
              type="text"
              placeholder="Rechercher..."
              class="w-full lg:w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Candidatures List -->
    <div
      v-if="filteredCandidatures.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      <EspaceItCandidaturesCard
        v-for="candidature in filteredCandidatures"
        :key="candidature.id"
        :candidature="candidature"
        @retirer="openWithdrawModal"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-paper-plane" class="text-2xl text-repae-gray-400" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        {{ filters.statut || filters.search ? 'Aucun resultat' : 'Aucune candidature' }}
      </h3>
      <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-4">
        {{ filters.statut || filters.search
          ? 'Aucune candidature ne correspond a vos criteres.'
          : 'Vous n\'avez pas encore postule a une offre.'
        }}
      </p>
      <button
        v-if="filters.statut || filters.search"
        class="px-4 py-2 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer mr-2"
        @click="resetFilters"
      >
        Reinitialiser les filtres
      </button>
      <NuxtLink
        to="/espace-it/offres"
        class="inline-flex items-center gap-2 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-search" />
        Decouvrir les offres
      </NuxtLink>
    </div>

    <!-- Withdraw Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showWithdrawModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/50"
            @click="cancelWithdraw"
          />

          <!-- Modal -->
          <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-2xl text-red-500" />
              </div>
              <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                Retirer la candidature ?
              </h2>
              <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
                Etes-vous sur de vouloir retirer votre candidature ? Cette action est irreversible.
              </p>
              <div class="flex gap-3">
                <button
                  class="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer"
                  @click="cancelWithdraw"
                >
                  Annuler
                </button>
                <button
                  class="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer"
                  @click="confirmWithdraw"
                >
                  Retirer
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
