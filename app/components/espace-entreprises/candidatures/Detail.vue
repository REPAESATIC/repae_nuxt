<script setup lang="ts">
import type { Candidature, StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { statutCandidatureConfig } from '~/data/espace-entreprises/candidatures'

const props = defineProps<{
  candidature: Candidature
}>()

const emit = defineEmits<{
  (e: 'update-status', status: StatutCandidature): void
  (e: 'update-note', note: string): void
}>()

// Local state for note
const noteContent = ref(props.candidature.note_recruteur || '')
const noteLastUpdated = ref(props.candidature.date_derniere_action)

// Status history (mock)
const statusHistory = computed(() => {
  const history = [
    {
      status: 'nouvelle' as StatutCandidature,
      date: props.candidature.date_candidature,
      label: 'Candidature recue'
    }
  ]

  if (props.candidature.statut !== 'nouvelle') {
    history.push({
      status: props.candidature.statut,
      date: props.candidature.date_derniere_action || props.candidature.date_candidature,
      label: `Statut change en "${statutCandidatureConfig[props.candidature.statut].label}"`
    })
  }

  return history.reverse()
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const handleStatusUpdate = (status: StatutCandidature) => {
  emit('update-status', status)
}

const handleNoteSave = () => {
  emit('update-note', noteContent.value)
  noteLastUpdated.value = new Date().toISOString()
}

watch(() => props.candidature.note_recruteur, (newNote) => {
  noteContent.value = newNote || ''
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main content -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Header info card -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center gap-4">
            <img
              :src="candidature.alumni.photo_url"
              :alt="`${candidature.alumni.prenom} ${candidature.alumni.nom}`"
              class="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-repae-gray-700"
            />
            <div>
              <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ candidature.alumni.prenom }} {{ candidature.alumni.nom }}
              </h2>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">
                {{ candidature.alumni.poste_actuel }}
              </p>
            </div>
          </div>
          <EspaceEntreprisesCandidaturesStatusBadge :statut="candidature.statut" />
        </div>

        <div class="flex items-center gap-6 text-sm text-repae-gray-500 dark:text-repae-gray-400">
          <span class="flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-calendar-alt" />
            Candidature du {{ formatDate(candidature.date_candidature) }}
          </span>
          <span class="flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" />
            Promo {{ candidature.alumni.promotion }}
          </span>
          <span class="flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-map-marker-alt" />
            {{ candidature.alumni.ville }}
          </span>
        </div>
      </div>

      <!-- Lettre de motivation -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h3 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-envelope" class="text-emerald-500" />
          Lettre de motivation
        </h3>
        <div class="p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <p class="text-sm text-repae-gray-700 dark:text-repae-gray-300 leading-relaxed whitespace-pre-wrap">
            {{ candidature.lettre_motivation }}
          </p>
        </div>
      </div>

      <!-- CV Section -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h3 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-file-pdf" class="text-red-500" />
          Curriculum Vitae
        </h3>
        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-file-pdf" class="text-red-500 text-xl" />
            </div>
            <div>
              <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                CV_{{ candidature.alumni.prenom }}_{{ candidature.alumni.nom }}.pdf
              </p>
              <p class="text-xs text-repae-gray-400">
                Document PDF
              </p>
            </div>
          </div>
          <a
            :href="candidature.cv_url"
            target="_blank"
            class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="rotate-180" />
            Telecharger
          </a>
        </div>
      </div>

      <!-- Notes recruteur -->
      <EspaceEntreprisesCandidaturesRecruiterNotes
        v-model="noteContent"
        :last-updated="noteLastUpdated"
        @save="handleNoteSave"
      />

      <!-- Historique -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h3 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-clock" class="text-blue-500" />
          Historique
        </h3>
        <div class="space-y-4">
          <div
            v-for="(event, index) in statusHistory"
            :key="index"
            class="flex items-start gap-3"
          >
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                statutCandidatureConfig[event.status].color.replace('text-', 'bg-').split(' ')[0]
              ]"
            >
              <font-awesome-icon
                :icon="statutCandidatureConfig[event.status].icon"
                class="text-xs"
                :class="statutCandidatureConfig[event.status].color.split(' ').find(c => c.startsWith('text-'))"
              />
            </div>
            <div>
              <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                {{ event.label }}
              </p>
              <p class="text-xs text-repae-gray-400">
                {{ formatDate(event.date) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Mini profile -->
      <EspaceEntreprisesCandidaturesCandidatMiniProfile :alumni="candidature.alumni" />

      <!-- Actions -->
      <EspaceEntreprisesCandidaturesActions
        :current-status="candidature.statut"
        :cv-url="candidature.cv_url"
        @update-status="handleStatusUpdate"
      />
    </div>
  </div>
</template>
