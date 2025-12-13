<script setup lang="ts">
import type { OffreStage } from '~/data/espace-entreprises/offres-stages'
import { statutStageConfig, niveauEtudesConfig, remoteConfig } from '~/data/espace-entreprises/offres-stages'

const props = defineProps<{
  stage: OffreStage
}>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'duplicate', id: string): void
  (e: 'close', id: string): void
  (e: 'preview', stage: OffreStage): void
}>()

const showActions = ref(false)

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatGratification = (amount: number, devise: string) => {
  return `${amount.toLocaleString()} ${devise}/mois`
}

const daysUntilDeadline = computed(() => {
  const deadline = new Date(props.stage.date_fin_candidature)
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

const deadlineStatus = computed(() => {
  if (props.stage.statut !== 'publiee') return null
  const days = daysUntilDeadline.value
  if (days < 0) return { text: 'Delai depasse', color: 'text-red-500' }
  if (days <= 3) return { text: `J-${days}`, color: 'text-red-500' }
  if (days <= 7) return { text: `J-${days}`, color: 'text-orange-500' }
  return { text: `J-${days}`, color: 'text-repae-gray-400' }
})
</script>

<template>
  <div
    class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:shadow-md transition-shadow relative"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap mb-2">
          <!-- Status badge -->
          <span
            :class="[
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-brand',
              statutStageConfig[stage.statut].color
            ]"
          >
            <font-awesome-icon :icon="statutStageConfig[stage.statut].icon" class="text-[10px]" />
            {{ statutStageConfig[stage.statut].label }}
          </span>
          <!-- Embauche possible badge -->
          <span
            v-if="stage.embauche_possible"
            class="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium"
          >
            <font-awesome-icon icon="fa-solid fa-user-plus" class="text-[10px]" />
            Embauche possible
          </span>
        </div>
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white truncate">
          {{ stage.titre }}
        </h3>
      </div>

      <!-- Actions menu -->
      <div class="relative">
        <button
          type="button"
          class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 rounded-lg transition-colors cursor-pointer"
          @click.stop="showActions = !showActions"
        >
          <font-awesome-icon icon="fa-solid fa-ellipsis" />
        </button>

        <!-- Dropdown -->
        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showActions"
            class="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-repae-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-repae-gray-700 py-1 z-10"
          >
            <button
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2 cursor-pointer"
              @click="emit('preview', stage)"
            >
              <font-awesome-icon icon="fa-solid fa-eye" class="w-4 text-repae-gray-400" />
              Voir l'apercu
            </button>
            <button
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2 cursor-pointer"
              @click="emit('edit', stage.id)"
            >
              <font-awesome-icon icon="fa-solid fa-pencil-alt" class="w-4 text-repae-gray-400" />
              Modifier
            </button>
            <button
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2 cursor-pointer"
              @click="emit('duplicate', stage.id)"
            >
              <font-awesome-icon icon="fa-solid fa-copy" class="w-4 text-repae-gray-400" />
              Dupliquer
            </button>
            <hr class="my-1 border-gray-200 dark:border-repae-gray-700" />
            <button
              v-if="stage.statut === 'publiee'"
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
              @click="emit('close', stage.id)"
            >
              <font-awesome-icon icon="fa-solid fa-times-circle" class="w-4" />
              Cloturer
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Key info row -->
    <div class="flex items-center gap-3 text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-3 flex-wrap">
      <span class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-xs" />
        {{ stage.ville }}
      </span>
      <span class="flex items-center gap-1.5">
        <font-awesome-icon :icon="remoteConfig[stage.mode_remote].icon" class="text-xs" />
        {{ remoteConfig[stage.mode_remote].label }}
      </span>
      <span class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-clock" class="text-xs" />
        {{ stage.duree_mois }} mois
      </span>
    </div>

    <!-- Stage specific info -->
    <div class="flex items-center gap-4 py-3 border-t border-b border-gray-100 dark:border-repae-gray-700 mb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500 text-sm" />
        </div>
        <div>
          <p class="text-xs text-repae-gray-400">Niveau</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
            {{ niveauEtudesConfig[stage.niveau_etudes].shortLabel }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-emerald-500 text-sm" />
        </div>
        <div>
          <p class="text-xs text-repae-gray-400">Gratification</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
            {{ formatGratification(stage.gratification, stage.devise) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-3">
      <div class="text-center">
        <p class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ stage.nombre_vues }}
        </p>
        <p class="text-xs text-repae-gray-400">Vues</p>
      </div>
      <div class="text-center">
        <p class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ stage.nombre_candidatures }}
        </p>
        <p class="text-xs text-repae-gray-400">Candidatures</p>
      </div>
      <div class="text-center">
        <p
          :class="[
            'text-xl font-bold font-brand',
            stage.nombre_candidatures_non_lues > 0 ? 'text-emerald-500' : 'text-repae-gray-300 dark:text-repae-gray-600'
          ]"
        >
          {{ stage.nombre_candidatures_non_lues }}
        </p>
        <p class="text-xs text-repae-gray-400">Non lues</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs">
      <div class="text-repae-gray-400">
        Debut : {{ formatDate(stage.date_debut) }}
      </div>
      <div v-if="deadlineStatus" :class="deadlineStatus.color">
        {{ deadlineStatus.text }}
      </div>
    </div>

    <!-- View candidatures button -->
    <div v-if="stage.statut === 'publiee' && stage.nombre_candidatures > 0" class="mt-4">
      <NuxtLink
        :to="`/espace-entreprises/stages/${stage.id}/candidatures`"
        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 rounded-xl font-medium font-brand text-sm transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-users" />
        Voir les candidatures
        <span
          v-if="stage.nombre_candidatures_non_lues > 0"
          class="px-1.5 py-0.5 bg-purple-500 text-white text-xs rounded-full"
        >
          {{ stage.nombre_candidatures_non_lues }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
