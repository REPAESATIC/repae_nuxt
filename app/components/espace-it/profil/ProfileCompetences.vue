<script setup lang="ts">
import type { Competence, CategorieCompetence } from '@/data/espace-it/competences'
import { niveauConfig, categorieConfig, getCompetencesByCategorie } from '@/data/espace-it/competences'

const props = defineProps<{
  competences: Competence[]
}>()

const competencesByCategorie = computed(() => getCompetencesByCategorie(props.competences))

const activeCategories = computed(() => {
  return Object.keys(competencesByCategorie.value) as CategorieCompetence[]
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-star" class="text-repae-blue-500" />
        Competences
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
      >
        Modifier
      </button>
    </div>

    <!-- Competences par categorie -->
    <div class="space-y-5">
      <div
        v-for="categorie in activeCategories"
        :key="categorie"
        class="space-y-3"
      >
        <!-- Categorie header -->
        <div class="flex items-center gap-2 text-sm font-medium text-repae-gray-600 dark:text-repae-gray-400">
          <font-awesome-icon :icon="categorieConfig[categorie].icon" class="text-repae-blue-500/70" />
          <span>{{ categorieConfig[categorie].label }}</span>
        </div>

        <!-- Competences badges -->
        <div class="flex flex-wrap gap-2">
          <div
            v-for="comp in competencesByCategorie[categorie]"
            :key="comp.id"
            class="group relative"
          >
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-default"
              :class="[
                comp.niveau === 'expert'
                  ? 'bg-repae-blue-100 text-repae-blue-700 dark:bg-repae-blue-500/20 dark:text-repae-blue-300'
                  : comp.niveau === 'avance'
                    ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                    : comp.niveau === 'intermediaire'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
              ]"
            >
              <span>{{ comp.nom }}</span>
              <span
                v-if="comp.certifie"
                class="text-xs"
                title="Certifie"
              >
                <font-awesome-icon icon="fa-solid fa-certificate" />
              </span>
            </div>

            <!-- Tooltip on hover -->
            <div
              class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-repae-gray-900 dark:bg-repae-gray-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10"
            >
              <div class="font-semibold">{{ comp.nom }}</div>
              <div class="text-gray-300">{{ niveauConfig[comp.niveau].label }}</div>
              <div v-if="comp.annees_experience" class="text-gray-400">
                {{ comp.annees_experience }} an{{ comp.annees_experience > 1 ? 's' : '' }} d'experience
              </div>
              <!-- Arrow -->
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-repae-gray-900 dark:border-t-repae-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legende -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-repae-gray-700">
      <div class="flex flex-wrap items-center gap-4 text-xs text-repae-gray-500 dark:text-repae-gray-400">
        <span class="font-medium">Niveaux :</span>
        <div
          v-for="(config, niveau) in niveauConfig"
          :key="niveau"
          class="flex items-center gap-1.5"
        >
          <span
            class="w-2.5 h-2.5 rounded-full"
            :class="config.color"
          />
          <span>{{ config.label }}</span>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="competences.length === 0"
      class="text-center py-8"
    >
      <font-awesome-icon icon="fa-solid fa-star" class="text-4xl text-gray-300 dark:text-repae-gray-600 mb-3" />
      <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        Aucune competence renseignee
      </p>
    </div>
  </div>
</template>
