<script setup lang="ts">
import type { CompetenceDetaille } from '~/data/espace-entreprises/profils-it-details'
import { niveauCompetenceConfig } from '~/data/espace-entreprises/profils-it-details'

const props = defineProps<{
  competences: CompetenceDetaille[]
}>()

// Group competences by level for better visualization
const competencesByLevel = computed(() => {
  const groups: Record<string, CompetenceDetaille[]> = {
    expert: [],
    avance: [],
    intermediaire: [],
    debutant: []
  }

  props.competences.forEach(comp => {
    groups[comp.niveau].push(comp)
  })

  return groups
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-code" class="text-emerald-500" />
      Competences techniques
    </h2>

    <!-- Competences list with progress bars -->
    <div class="space-y-4">
      <div
        v-for="competence in competences"
        :key="competence.nom"
        class="group"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span class="font-medium text-repae-gray-900 dark:text-white text-sm">
            {{ competence.nom }}
          </span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
              {{ competence.annees_experience }} an{{ competence.annees_experience > 1 ? 's' : '' }}
            </span>
            <span
              :class="[
                'px-2 py-0.5 rounded text-xs font-medium',
                niveauCompetenceConfig[competence.niveau].color,
                'text-white'
              ]"
            >
              {{ niveauCompetenceConfig[competence.niveau].label }}
            </span>
          </div>
        </div>
        <!-- Progress bar -->
        <div class="h-2 bg-gray-200 dark:bg-repae-gray-700 rounded-full overflow-hidden">
          <div
            :class="[
              'h-full rounded-full transition-all duration-500',
              niveauCompetenceConfig[competence.niveau].color
            ]"
            :style="{ width: `${niveauCompetenceConfig[competence.niveau].percentage}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-repae-gray-700">
      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-2">Legende des niveaux :</p>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(config, niveau) in niveauCompetenceConfig"
          :key="niveau"
          class="flex items-center gap-1.5"
        >
          <div :class="['w-3 h-3 rounded', config.color]" />
          <span class="text-xs text-repae-gray-600 dark:text-repae-gray-400">
            {{ config.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
