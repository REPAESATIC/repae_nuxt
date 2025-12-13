<script setup lang="ts">
import type { StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { statutCandidatureConfig } from '~/data/espace-entreprises/candidatures'

const props = defineProps<{
  currentStatus: StatutCandidature
  cvUrl: string
}>()

const emit = defineEmits<{
  (e: 'update-status', status: StatutCandidature): void
}>()

const showConfirmModal = ref(false)
const pendingStatus = ref<StatutCandidature | null>(null)
const isUpdating = ref(false)

const statusActions = computed(() => {
  const actions: Array<{
    status: StatutCandidature
    label: string
    icon: string
    color: string
    bgColor: string
    description: string
  }> = []

  if (props.currentStatus === 'nouvelle') {
    actions.push({
      status: 'vue',
      label: 'Marquer comme vue',
      icon: 'fa-solid fa-eye',
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-500/20 hover:bg-gray-200 dark:hover:bg-gray-500/30',
      description: 'La candidature sera marquee comme consultee'
    })
  }

  if (props.currentStatus !== 'en_cours' && props.currentStatus !== 'acceptee' && props.currentStatus !== 'refusee') {
    actions.push({
      status: 'en_cours',
      label: 'Mettre en cours',
      icon: 'fa-solid fa-clock',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-500/20 hover:bg-orange-200 dark:hover:bg-orange-500/30',
      description: 'Le candidat sera informe que sa candidature est en cours d\'examen'
    })
  }

  if (props.currentStatus !== 'acceptee') {
    actions.push({
      status: 'acceptee',
      label: 'Accepter la candidature',
      icon: 'fa-solid fa-check-circle',
      color: 'text-white',
      bgColor: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Le candidat sera informe de l\'acceptation de sa candidature'
    })
  }

  if (props.currentStatus !== 'refusee') {
    actions.push({
      status: 'refusee',
      label: 'Refuser la candidature',
      icon: 'fa-solid fa-times-circle',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'border border-red-300 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10',
      description: 'Le candidat sera informe du refus de sa candidature'
    })
  }

  return actions
})

const requestStatusChange = (status: StatutCandidature) => {
  // For sensitive actions, show confirmation
  if (status === 'acceptee' || status === 'refusee') {
    pendingStatus.value = status
    showConfirmModal.value = true
  } else {
    performStatusChange(status)
  }
}

const performStatusChange = async (status: StatutCandidature) => {
  isUpdating.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  emit('update-status', status)
  isUpdating.value = false
  showConfirmModal.value = false
  pendingStatus.value = null
}

const confirmStatusChange = () => {
  if (pendingStatus.value) {
    performStatusChange(pendingStatus.value)
  }
}

const cancelStatusChange = () => {
  showConfirmModal.value = false
  pendingStatus.value = null
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h3 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-4">
      Actions
    </h3>

    <!-- Current status -->
    <div class="mb-6 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
      <p class="text-xs text-repae-gray-400 mb-2">Statut actuel</p>
      <EspaceEntreprisesCandidaturesStatusBadge :statut="currentStatus" />
    </div>

    <!-- Action buttons -->
    <div class="space-y-3">
      <button
        v-for="action in statusActions"
        :key="action.status"
        type="button"
        :class="[
          'w-full px-4 py-3 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer flex items-center justify-center gap-2',
          action.bgColor,
          action.color
        ]"
        :disabled="isUpdating"
        @click="requestStatusChange(action.status)"
      >
        <font-awesome-icon :icon="action.icon" />
        {{ action.label }}
      </button>

      <!-- Download CV -->
      <a
        :href="cvUrl"
        target="_blank"
        class="w-full px-4 py-3 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 rounded-xl font-medium font-brand text-sm transition-colors flex items-center justify-center gap-2"
      >
        <font-awesome-icon icon="fa-solid fa-file-pdf" class="text-red-500" />
        Telecharger le CV
      </a>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <Teleport to="body">
    <div
      v-if="showConfirmModal && pendingStatus"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="cancelStatusChange"
      />

      <!-- Modal content -->
      <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
        <div class="text-center mb-6">
          <div
            :class="[
              'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center',
              pendingStatus === 'acceptee' ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-red-100 dark:bg-red-500/20'
            ]"
          >
            <font-awesome-icon
              :icon="pendingStatus === 'acceptee' ? 'fa-solid fa-check-circle' : 'fa-solid fa-times-circle'"
              :class="[
                'text-3xl',
                pendingStatus === 'acceptee' ? 'text-emerald-500' : 'text-red-500'
              ]"
            />
          </div>
          <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
            {{ pendingStatus === 'acceptee' ? 'Accepter cette candidature ?' : 'Refuser cette candidature ?' }}
          </h3>
          <p class="text-repae-gray-500 dark:text-repae-gray-400">
            {{ pendingStatus === 'acceptee'
              ? 'Le candidat sera notifie de l\'acceptation de sa candidature.'
              : 'Le candidat sera notifie du refus de sa candidature. Cette action est irreversible.'
            }}
          </p>
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 px-4 py-2.5 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer"
            :disabled="isUpdating"
            @click="cancelStatusChange"
          >
            Annuler
          </button>
          <button
            type="button"
            :class="[
              'flex-1 px-4 py-2.5 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer flex items-center justify-center gap-2',
              pendingStatus === 'acceptee'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            ]"
            :disabled="isUpdating"
            @click="confirmStatusChange"
          >
            <font-awesome-icon v-if="isUpdating" icon="fa-solid fa-spinner" class="animate-spin" />
            {{ isUpdating ? 'Traitement...' : 'Confirmer' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
