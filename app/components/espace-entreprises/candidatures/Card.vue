<script setup lang="ts">
import type { Candidature, StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { disponibiliteConfig } from '~/data/espace-entreprises/candidatures'

const props = defineProps<{
  candidature: Candidature
}>()

const emit = defineEmits<{
  (e: 'view', candidature: Candidature): void
  (e: 'update-status', id: string, status: StatutCandidature): void
}>()

const showActions = ref(false)

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const daysSinceApplication = computed(() => {
  const appDate = new Date(props.candidature.date_candidature)
  const today = new Date()
  const diffTime = today.getTime() - appDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Aujourd\'hui'
  if (diffDays === 1) return 'Hier'
  return `Il y a ${diffDays} jours`
})

const statusActions = [
  { status: 'vue' as StatutCandidature, label: 'Marquer comme vue', icon: 'fa-solid fa-eye' },
  { status: 'en_cours' as StatutCandidature, label: 'Mettre en cours', icon: 'fa-solid fa-clock' },
  { status: 'acceptee' as StatutCandidature, label: 'Accepter', icon: 'fa-solid fa-check' },
  { status: 'refusee' as StatutCandidature, label: 'Refuser', icon: 'fa-solid fa-times' }
]

const availableActions = computed(() => {
  return statusActions.filter(a => a.status !== props.candidature.statut)
})
</script>

<template>
  <div
    class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:shadow-md transition-shadow"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
  >
    <!-- Header with candidate info -->
    <div class="flex items-start gap-4">
      <!-- Photo -->
      <img
        :src="candidature.alumni.photo_url"
        :alt="`${candidature.alumni.prenom} ${candidature.alumni.nom}`"
        class="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-repae-gray-700"
      />

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
              {{ candidature.alumni.prenom }} {{ candidature.alumni.nom }}
            </h3>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              {{ candidature.alumni.poste_actuel }}
            </p>
          </div>

          <!-- Status badge -->
          <EspaceEntreprisesCandidaturesStatusBadge :statut="candidature.statut" />
        </div>

        <!-- Meta info -->
        <div class="flex items-center gap-3 mt-2 text-xs text-repae-gray-400 flex-wrap">
          <span class="flex items-center gap-1">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" />
            Promo {{ candidature.alumni.promotion }}
          </span>
          <span class="flex items-center gap-1">
            <font-awesome-icon icon="fa-solid fa-map-marker-alt" />
            {{ candidature.alumni.ville }}
          </span>
          <span
            :class="[
              'px-2 py-0.5 rounded-full',
              disponibiliteConfig[candidature.alumni.disponibilite].color
            ]"
          >
            {{ disponibiliteConfig[candidature.alumni.disponibilite].label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Competences -->
    <div class="mt-4 flex flex-wrap gap-1.5">
      <span
        v-for="competence in candidature.alumni.competences.slice(0, 4)"
        :key="competence"
        class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 rounded text-xs"
      >
        {{ competence }}
      </span>
      <span
        v-if="candidature.alumni.competences.length > 4"
        class="px-2 py-0.5 text-repae-gray-400 text-xs"
      >
        +{{ candidature.alumni.competences.length - 4 }}
      </span>
    </div>

    <!-- Note recruteur si presente -->
    <div
      v-if="candidature.note_recruteur"
      class="mt-4 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-200 dark:border-amber-500/20"
    >
      <div class="flex items-start gap-2">
        <font-awesome-icon icon="fa-solid fa-sticky-note" class="text-amber-500 text-sm mt-0.5" />
        <p class="text-sm text-amber-800 dark:text-amber-300">
          {{ candidature.note_recruteur }}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-repae-gray-700 flex items-center justify-between">
      <div class="text-xs text-repae-gray-400">
        <span>Candidature du {{ formatDate(candidature.date_candidature) }}</span>
        <span class="mx-2">-</span>
        <span>{{ daysSinceApplication }}</span>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <NuxtLink
          :to="`/espace-entreprises/candidatures/${candidature.id}`"
          class="px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <font-awesome-icon icon="fa-solid fa-eye" />
          Voir le detail
        </NuxtLink>

        <!-- Dropdown actions -->
        <div class="relative">
          <button
            type="button"
            class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 rounded-lg transition-colors cursor-pointer"
            @click.stop="showActions = !showActions"
          >
            <font-awesome-icon icon="fa-solid fa-ellipsis-v" />
          </button>

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
                v-for="action in availableActions"
                :key="action.status"
                type="button"
                :class="[
                  'w-full px-4 py-2 text-left text-sm flex items-center gap-2 cursor-pointer',
                  action.status === 'acceptee'
                    ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                    : action.status === 'refusee'
                      ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10'
                      : 'text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700'
                ]"
                @click="emit('update-status', candidature.id, action.status)"
              >
                <font-awesome-icon :icon="action.icon" class="w-4" />
                {{ action.label }}
              </button>
              <hr class="my-1 border-gray-200 dark:border-repae-gray-700" />
              <a
                :href="candidature.cv_url"
                target="_blank"
                class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2"
              >
                <font-awesome-icon icon="fa-solid fa-file-pdf" class="w-4 text-red-500" />
                Telecharger CV
              </a>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
