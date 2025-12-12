<script setup lang="ts">
import type { Formation } from '@/data/espace-it/formations'
import { formatDateRange } from '@/data/espace-it/formations'

defineProps<{
  formations: Formation[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500" />
        Formations
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
      >
        Modifier
      </button>
    </div>

    <div class="relative">
      <!-- Timeline line continue -->
      <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-repae-gray-700" />

      <div
        v-for="formation in formations"
        :key="formation.id"
        class="relative pl-8 pb-6 last:pb-0"
      >
        <!-- Timeline dot -->
        <div class="absolute left-0 top-0 w-4 h-4 rounded-full bg-repae-blue-500 border-2 border-white dark:border-repae-gray-800 z-10" />

        <div class="flex flex-col sm:flex-row sm:items-start gap-4">
          <!-- Icon container -->
          <div class="hidden sm:flex w-12 h-12 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/20 items-center justify-center flex-shrink-0">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500 text-lg" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 class="text-base font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ formation.diplome }}
                </h3>
                <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 font-brand">
                  {{ formation.etablissement }}
                </p>
              </div>
              <span
                v-if="formation.mention"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
              >
                {{ formation.mention }}
              </span>
            </div>

            <!-- Meta info -->
            <div class="flex flex-wrap items-center gap-3 mt-2 text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <div class="flex items-center gap-1.5">
                <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500/70" />
                <span>{{ formatDateRange(formation.date_debut, formation.date_fin, formation.en_cours) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500/70" />
                <span>{{ formation.lieu }}</span>
              </div>
            </div>

            <!-- Description -->
            <p
              v-if="formation.description"
              class="mt-3 text-sm text-repae-gray-600 dark:text-repae-gray-300 font-brand leading-relaxed"
            >
              {{ formation.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="formations.length === 0"
      class="text-center py-8"
    >
      <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-4xl text-gray-300 dark:text-repae-gray-600 mb-3" />
      <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        Aucune formation renseignee
      </p>
    </div>
  </div>
</template>
