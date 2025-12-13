<script setup lang="ts">
import type { Candidature, StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { getCandidaturesByOffre, getCandidaturesStats } from '~/data/espace-entreprises/candidatures'
import { getStageById, niveauEtudesConfig } from '~/data/espace-entreprises/offres-stages'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

const route = useRoute()
const router = useRouter()
const stageId = route.params.id as string

// Get stage data
const stage = computed(() => getStageById(stageId))

// Redirect if stage not found
if (!stage.value) {
  router.push('/espace-entreprises/stages')
}

useHead({
  title: computed(() => stage.value ? `Candidatures - ${stage.value.titre} | REPAE` : 'Candidatures | REPAE')
})

// Get candidatures for this stage
const candidatures = ref<Candidature[]>(getCandidaturesByOffre(stageId, 'stage'))
const stats = computed(() => getCandidaturesStats(stageId, 'stage'))

// Modal for candidature detail
const showDetail = ref(false)
const selectedCandidature = ref<Candidature | null>(null)

const handleView = (candidature: Candidature) => {
  selectedCandidature.value = candidature
  showDetail.value = true

  // Simulate marking as viewed
  if (candidature.statut === 'nouvelle') {
    handleUpdateStatus(candidature.id, 'vue')
  }
}

const handleUpdateStatus = (id: string, status: StatutCandidature) => {
  const index = candidatures.value.findIndex(c => c.id === id)
  if (index !== -1) {
    candidatures.value[index] = {
      ...candidatures.value[index],
      statut: status,
      date_derniere_action: new Date().toISOString().split('T')[0]
    }
  }
}

const closeDetail = () => {
  showDetail.value = false
  selectedCandidature.value = null
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatGratification = (amount: number, devise: string) => {
  return `${amount.toLocaleString()} ${devise}/mois`
}
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        to="/espace-entreprises/stages"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors mb-4"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour aux stages
      </NuxtLink>

      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
            Candidatures
          </h1>
          <p v-if="stage" class="text-repae-gray-500 dark:text-repae-gray-400 mt-1">
            {{ stage.titre }}
          </p>
        </div>

        <!-- Quick stats -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
            <font-awesome-icon icon="fa-solid fa-envelope" class="text-blue-500" />
            <span class="text-sm font-medium text-blue-700 dark:text-blue-400">
              {{ stats.nouvelles }} nouvelle{{ stats.nouvelles > 1 ? 's' : '' }}
            </span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
            <font-awesome-icon icon="fa-solid fa-clock" class="text-orange-500" />
            <span class="text-sm font-medium text-orange-700 dark:text-orange-400">
              {{ stats.en_cours }} en cours
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stage summary card -->
    <div
      v-if="stage"
      class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4 mb-6"
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500 text-xl" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-clock" class="mr-1" />
              {{ stage.duree_mois }} mois
            </span>
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-graduation-cap" class="mr-1" />
              {{ niveauEtudesConfig[stage.niveau_etudes].shortLabel }}
            </span>
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-1" />
              {{ stage.ville }}
            </span>
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="mr-1" />
              {{ formatGratification(stage.gratification, stage.devise) }}
            </span>
            <span
              v-if="stage.embauche_possible"
              class="px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium"
            >
              Embauche possible
            </span>
          </div>
        </div>
        <NuxtLink
          :to="`/espace-entreprises/stages`"
          class="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors"
        >
          Voir le stage
        </NuxtLink>
      </div>
    </div>

    <!-- Candidatures list -->
    <EspaceEntreprisesCandidaturesList
      :candidatures="candidatures"
      :stats="stats"
      @view="handleView"
      @update-status="handleUpdateStatus"
    />

    <!-- Candidature Detail Modal -->
    <Teleport to="body">
      <div
        v-if="showDetail && selectedCandidature"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeDetail"
        />

        <!-- Modal content -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 p-6 flex items-center justify-between">
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
              Detail candidature
            </h2>
            <button
              type="button"
              class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 rounded-lg transition-colors cursor-pointer"
              @click="closeDetail"
            >
              <font-awesome-icon icon="fa-solid fa-times" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Candidate info -->
            <div class="flex items-start gap-4">
              <img
                :src="selectedCandidature.alumni.photo_url"
                :alt="`${selectedCandidature.alumni.prenom} ${selectedCandidature.alumni.nom}`"
                class="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-repae-gray-700"
              />
              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-xl font-semibold font-brand text-repae-gray-900 dark:text-white">
                      {{ selectedCandidature.alumni.prenom }} {{ selectedCandidature.alumni.nom }}
                    </h3>
                    <p class="text-repae-gray-500 dark:text-repae-gray-400">
                      {{ selectedCandidature.alumni.poste_actuel }}
                    </p>
                  </div>
                  <EspaceEntreprisesCandidaturesStatusBadge :statut="selectedCandidature.statut" />
                </div>
                <div class="flex items-center gap-4 mt-2 text-sm text-repae-gray-400">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-graduation-cap" class="mr-1" />
                    Promo {{ selectedCandidature.alumni.promotion }}
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-1" />
                    {{ selectedCandidature.alumni.ville }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Competences -->
            <div>
              <h4 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-2">
                Competences
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="comp in selectedCandidature.alumni.competences"
                  :key="comp"
                  class="px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-sm"
                >
                  {{ comp }}
                </span>
              </div>
            </div>

            <!-- Lettre de motivation -->
            <div>
              <h4 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-2">
                Lettre de motivation
              </h4>
              <div class="p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
                <p class="text-sm text-repae-gray-700 dark:text-repae-gray-300 leading-relaxed">
                  {{ selectedCandidature.lettre_motivation }}
                </p>
              </div>
            </div>

            <!-- Note recruteur -->
            <div v-if="selectedCandidature.note_recruteur">
              <h4 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-2">
                Note recruteur
              </h4>
              <div class="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-200 dark:border-amber-500/20">
                <p class="text-sm text-amber-800 dark:text-amber-300">
                  {{ selectedCandidature.note_recruteur }}
                </p>
              </div>
            </div>

            <!-- Date info -->
            <div class="text-sm text-repae-gray-400">
              Candidature recue le {{ formatDate(selectedCandidature.date_candidature) }}
              <span v-if="selectedCandidature.date_derniere_action">
                - Derniere action le {{ formatDate(selectedCandidature.date_derniere_action) }}
              </span>
            </div>
          </div>

          <!-- Footer actions -->
          <div class="sticky bottom-0 bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700 p-6 flex flex-wrap gap-3">
            <a
              :href="selectedCandidature.cv_url"
              target="_blank"
              class="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 rounded-xl font-medium font-brand text-sm transition-colors flex items-center justify-center gap-2"
            >
              <font-awesome-icon icon="fa-solid fa-file-pdf" class="text-red-500" />
              Telecharger CV
            </a>
            <button
              v-if="selectedCandidature.statut !== 'en_cours' && selectedCandidature.statut !== 'acceptee' && selectedCandidature.statut !== 'refusee'"
              type="button"
              class="flex-1 px-4 py-2.5 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/30 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              @click="handleUpdateStatus(selectedCandidature.id, 'en_cours'); closeDetail()"
            >
              <font-awesome-icon icon="fa-solid fa-clock" />
              En cours
            </button>
            <button
              v-if="selectedCandidature.statut !== 'acceptee'"
              type="button"
              class="flex-1 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              @click="handleUpdateStatus(selectedCandidature.id, 'acceptee'); closeDetail()"
            >
              <font-awesome-icon icon="fa-solid fa-check" />
              Accepter
            </button>
            <button
              v-if="selectedCandidature.statut !== 'refusee'"
              type="button"
              class="px-4 py-2.5 border border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              @click="handleUpdateStatus(selectedCandidature.id, 'refusee'); closeDetail()"
            >
              <font-awesome-icon icon="fa-solid fa-times" />
              Refuser
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
