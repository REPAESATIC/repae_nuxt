<script setup lang="ts">
import type { Experience } from '@/data/espace-it/experiences'
import { formatExperienceDates, calculateDuration, contratConfig } from '@/data/espace-it/experiences'

defineProps<{
  experiences: Experience[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
        Experiences professionnelles
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
      >
        Modifier
      </button>
    </div>

    <div class="space-y-6">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="relative pl-6 pb-6 last:pb-0 border-l-2 border-gray-200 dark:border-repae-gray-700 last:border-l-transparent"
      >
        <!-- Timeline dot with status indicator -->
        <div
          :class="[
            'absolute -left-2 top-0 w-4 h-4 rounded-full border-2 border-white dark:border-repae-gray-800',
            experience.en_cours ? 'bg-green-500' : 'bg-repae-blue-500'
          ]"
        />

        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Company logo -->
          <div class="flex-shrink-0">
            <img
              v-if="experience.logo_url"
              :src="experience.logo_url"
              :alt="experience.entreprise"
              class="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-repae-gray-700"
            />
            <div
              v-else
              class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center"
            >
              <font-awesome-icon icon="fa-solid fa-building" class="text-repae-gray-400 text-lg" />
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 class="text-base font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ experience.poste }}
                </h3>
                <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 font-brand">
                  {{ experience.entreprise }}
                </p>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="experience.en_cours"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  En cours
                </span>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    contratConfig[experience.type_contrat]?.color || 'bg-gray-100 text-gray-700'
                  ]"
                >
                  {{ contratConfig[experience.type_contrat]?.label || experience.type_contrat }}
                </span>
              </div>
            </div>

            <!-- Meta info -->
            <div class="flex flex-wrap items-center gap-3 mt-2 text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <div class="flex items-center gap-1.5">
                <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500/70" />
                <span>{{ formatExperienceDates(experience.date_debut, experience.date_fin, experience.en_cours) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-repae-blue-500/70" />
                <span>{{ calculateDuration(experience.date_debut, experience.date_fin, experience.en_cours) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500/70" />
                <span>{{ experience.lieu }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="mt-3 text-sm text-repae-gray-600 dark:text-repae-gray-300 font-brand leading-relaxed">
              {{ experience.description }}
            </p>

            <!-- Competences -->
            <div
              v-if="experience.competences && experience.competences.length > 0"
              class="flex flex-wrap gap-2 mt-3"
            >
              <span
                v-for="competence in experience.competences"
                :key="competence"
                class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300"
              >
                {{ competence }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="experiences.length === 0"
      class="text-center py-8"
    >
      <font-awesome-icon icon="fa-solid fa-briefcase" class="text-4xl text-gray-300 dark:text-repae-gray-600 mb-3" />
      <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        Aucune experience renseignee
      </p>
    </div>
  </div>
</template>
