<script setup lang="ts">
import type { Candidature, StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { getCandidatureById, candidaturesList } from '~/data/espace-entreprises/candidatures'
import { getOffreById } from '~/data/espace-entreprises/offres-emploi'
import { getStageById } from '~/data/espace-entreprises/offres-stages'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

const route = useRoute()
const router = useRouter()
const candidatureId = route.params.id as string

// Get candidature data (reactive to allow updates)
const candidature = ref<Candidature | undefined>(getCandidatureById(candidatureId))

// Redirect if not found
if (!candidature.value) {
  router.push('/espace-entreprises/dashboard')
}

// Get related offre/stage
const relatedOffre = computed(() => {
  if (!candidature.value) return null
  if (candidature.value.type_offre === 'emploi') {
    return {
      type: 'emploi',
      data: getOffreById(candidature.value.offre_id),
      backUrl: `/espace-entreprises/offres/${candidature.value.offre_id}/candidatures`,
      backLabel: 'Retour aux candidatures de l\'offre'
    }
  } else {
    return {
      type: 'stage',
      data: getStageById(candidature.value.offre_id),
      backUrl: `/espace-entreprises/stages/${candidature.value.offre_id}/candidatures`,
      backLabel: 'Retour aux candidatures du stage'
    }
  }
})

useHead({
  title: computed(() => candidature.value
    ? `${candidature.value.alumni.prenom} ${candidature.value.alumni.nom} - Candidature | REPAE`
    : 'Candidature | REPAE'
  )
})

const handleStatusUpdate = (status: StatutCandidature) => {
  if (!candidature.value) return

  // Update local state
  candidature.value = {
    ...candidature.value,
    statut: status,
    date_derniere_action: new Date().toISOString().split('T')[0]
  }

  // Update in the mock data list (for persistence during session)
  const index = candidaturesList.findIndex(c => c.id === candidatureId)
  if (index !== -1) {
    candidaturesList[index] = candidature.value
  }
}

const handleNoteUpdate = (note: string) => {
  if (!candidature.value) return

  // Update local state
  candidature.value = {
    ...candidature.value,
    note_recruteur: note,
    date_derniere_action: new Date().toISOString().split('T')[0]
  }

  // Update in the mock data list
  const index = candidaturesList.findIndex(c => c.id === candidatureId)
  if (index !== -1) {
    candidaturesList[index] = candidature.value
  }
}
</script>

<template>
  <div v-if="candidature" class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        v-if="relatedOffre"
        :to="relatedOffre.backUrl"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors mb-4"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        {{ relatedOffre.backLabel }}
      </NuxtLink>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
            Candidature de {{ candidature.alumni.prenom }} {{ candidature.alumni.nom }}
          </h1>
          <p v-if="relatedOffre?.data" class="text-repae-gray-500 dark:text-repae-gray-400 mt-1">
            Pour : {{ relatedOffre.data.titre }}
          </p>
        </div>
      </div>
    </div>

    <!-- Offre/Stage summary banner -->
    <div
      v-if="relatedOffre?.data"
      :class="[
        'rounded-xl border p-4 mb-6 flex items-center gap-4',
        relatedOffre.type === 'emploi'
          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20'
          : 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20'
      ]"
    >
      <div
        :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center',
          relatedOffre.type === 'emploi'
            ? 'bg-emerald-100 dark:bg-emerald-500/20'
            : 'bg-purple-100 dark:bg-purple-500/20'
        ]"
      >
        <font-awesome-icon
          :icon="relatedOffre.type === 'emploi' ? 'fa-solid fa-briefcase' : 'fa-solid fa-graduation-cap'"
          :class="relatedOffre.type === 'emploi' ? 'text-emerald-500' : 'text-purple-500'"
          class="text-xl"
        />
      </div>
      <div class="flex-1">
        <p
          :class="[
            'text-xs font-medium uppercase tracking-wide mb-1',
            relatedOffre.type === 'emploi' ? 'text-emerald-600 dark:text-emerald-400' : 'text-purple-600 dark:text-purple-400'
          ]"
        >
          {{ relatedOffre.type === 'emploi' ? 'Offre d\'emploi' : 'Stage' }}
        </p>
        <p class="font-semibold text-repae-gray-900 dark:text-white">
          {{ relatedOffre.data.titre }}
        </p>
      </div>
      <NuxtLink
        :to="relatedOffre.type === 'emploi' ? '/espace-entreprises/offres' : '/espace-entreprises/stages'"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          relatedOffre.type === 'emploi'
            ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
            : 'text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20'
        ]"
      >
        Voir {{ relatedOffre.type === 'emploi' ? 'l\'offre' : 'le stage' }}
      </NuxtLink>
    </div>

    <!-- Detail component -->
    <EspaceEntreprisesCandidaturesDetail
      :candidature="candidature"
      @update-status="handleStatusUpdate"
      @update-note="handleNoteUpdate"
    />
  </div>

  <!-- Loading/Error state -->
  <div v-else class="max-w-6xl mx-auto text-center py-12">
    <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
      <font-awesome-icon icon="fa-solid fa-inbox" class="text-2xl text-repae-gray-400" />
    </div>
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
      Candidature introuvable
    </h2>
    <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
      Cette candidature n'existe pas ou a ete supprimee.
    </p>
    <NuxtLink
      to="/espace-entreprises/dashboard"
      class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors"
    >
      <font-awesome-icon icon="fa-solid fa-home" />
      Retour au dashboard
    </NuxtLink>
  </div>
</template>
