<script setup lang="ts">
import type { Avantage } from '~/data/espace-entreprises/avantages-fidelite'
import { avantagesUtilisesMock, getAvantageById } from '~/data/espace-entreprises/avantages-fidelite'
import { entrepriseFideliteMock, badgesConfig } from '~/data/espace-entreprises/fidelite'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Avantages Fidelite - Espace Entreprises | REPAE'
})

// Mock data
const fideliteData = ref({ ...entrepriseFideliteMock })
const avantagesUtilises = ref([...avantagesUtilisesMock])

// Modal state
const isModalOpen = ref(false)
const selectedAvantage = ref<Avantage | null>(null)
const showSuccessMessage = ref(false)

const handleRedeem = (avantage: Avantage) => {
  selectedAvantage.value = avantage
  isModalOpen.value = true
}

const handleConfirmRedeem = (avantage: Avantage) => {
  // Deduct points
  fideliteData.value.points_actuels -= avantage.cout_points
  fideliteData.value.total_points_depenses += avantage.cout_points

  // Add to history
  avantagesUtilises.value.unshift({
    id: `u${Date.now()}`,
    avantage_id: avantage.id,
    date_utilisation: new Date().toISOString().split('T')[0],
    date_expiration: avantage.duree
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : undefined,
    statut: 'actif'
  })

  // Close modal and show success
  isModalOpen.value = false
  showSuccessMessage.value = true

  setTimeout(() => {
    showSuccessMessage.value = false
  }, 5000)
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getStatutConfig = (statut: string) => {
  switch (statut) {
    case 'actif':
      return { label: 'Actif', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' }
    case 'expire':
      return { label: 'Expire', color: 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400' }
    case 'utilise':
      return { label: 'Utilise', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' }
    default:
      return { label: statut, color: 'bg-gray-100 text-gray-600' }
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Success message -->
    <Transition name="slide-down">
      <div
        v-if="showSuccessMessage"
        class="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate__animated animate__fadeInDown"
      >
        <font-awesome-icon icon="fa-solid fa-check-circle" class="text-xl" />
        <span class="font-medium">Avantage active avec succes !</span>
      </div>
    </Transition>

    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        to="/espace-entreprises/fidelite"
        class="inline-flex items-center gap-2 text-repae-gray-500 dark:text-repae-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour au programme fidelite
      </NuxtLink>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
            Catalogue des avantages
          </h1>
          <p class="text-repae-gray-500 dark:text-repae-gray-400 mt-2">
            Utilisez vos points pour debloquer des avantages exclusifs
          </p>
        </div>

        <!-- Points balance card -->
        <div class="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-coins" class="text-xl text-yellow-300" />
          </div>
          <div>
            <p class="text-sm text-white/80">Vos points</p>
            <p class="text-2xl font-bold">{{ fideliteData.points_actuels.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Catalogue - Left column -->
      <div class="lg:col-span-2">
        <EspaceEntreprisesFideliteAvantagesCatalogue
          :badge-actuel="fideliteData.badge_actuel"
          :points-actuels="fideliteData.points_actuels"
          @redeem="handleRedeem"
        />
      </div>

      <!-- Sidebar - Right column -->
      <div class="space-y-6">
        <!-- My active advantages -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-gift" class="text-emerald-500" />
            Mes avantages actifs
          </h2>

          <div v-if="avantagesUtilises.filter(a => a.statut === 'actif').length > 0" class="space-y-3">
            <div
              v-for="utilisation in avantagesUtilises.filter(a => a.statut === 'actif')"
              :key="utilisation.id"
              class="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-500/30"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <p class="font-medium text-repae-gray-900 dark:text-white text-sm">
                    {{ getAvantageById(utilisation.avantage_id)?.titre }}
                  </p>
                  <p v-if="utilisation.date_expiration" class="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Expire le {{ formatDate(utilisation.date_expiration) }}
                  </p>
                </div>
                <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded text-xs font-medium">
                  Actif
                </span>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-6">
            <font-awesome-icon icon="fa-solid fa-gift" class="text-3xl text-repae-gray-300 dark:text-repae-gray-600 mb-2" />
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              Aucun avantage actif
            </p>
          </div>
        </div>

        <!-- Recent history -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-clock" class="text-emerald-500" />
            Historique recent
          </h2>

          <div v-if="avantagesUtilises.length > 0" class="space-y-3">
            <div
              v-for="utilisation in avantagesUtilises.slice(0, 5)"
              :key="utilisation.id"
              class="flex items-center justify-between gap-2 py-2 border-b border-gray-100 dark:border-repae-gray-700 last:border-0"
            >
              <div class="min-w-0">
                <p class="font-medium text-repae-gray-900 dark:text-white text-sm truncate">
                  {{ getAvantageById(utilisation.avantage_id)?.titre }}
                </p>
                <p class="text-xs text-repae-gray-400">
                  {{ formatDate(utilisation.date_utilisation) }}
                </p>
              </div>
              <span
                :class="[
                  'px-2 py-0.5 rounded text-xs font-medium flex-shrink-0',
                  getStatutConfig(utilisation.statut).color
                ]"
              >
                {{ getStatutConfig(utilisation.statut).label }}
              </span>
            </div>
          </div>

          <div v-else class="text-center py-6">
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              Aucun historique
            </p>
          </div>
        </div>

        <!-- Badge info -->
        <div class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-500/10 dark:to-blue-500/10 rounded-xl border border-purple-200 dark:border-purple-500/30 p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center',
                badgesConfig[fideliteData.badge_actuel].bgColor
              ]"
            >
              <font-awesome-icon
                :icon="badgesConfig[fideliteData.badge_actuel].icon"
                :class="['text-xl', badgesConfig[fideliteData.badge_actuel].textColor]"
              />
            </div>
            <div>
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Votre badge</p>
              <p class="font-semibold text-repae-gray-900 dark:text-white">
                {{ badgesConfig[fideliteData.badge_actuel].nom }}
              </p>
            </div>
          </div>
          <p class="text-xs text-repae-gray-600 dark:text-repae-gray-400">
            Certains avantages necessitent un badge superieur pour etre debloques. Gagnez des points pour progresser !
          </p>
        </div>
      </div>
    </div>

    <!-- Redeem Modal -->
    <EspaceEntreprisesFideliteRedeemModal
      :avantage="selectedAvantage"
      :points-actuels="fideliteData.points_actuels"
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @confirm="handleConfirmRedeem"
    />
  </div>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
