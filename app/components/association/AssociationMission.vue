<script setup>
import { objectifs } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Nos Objectifs"
        description="Les missions qui guident nos actions au quotidien"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="objectif in objectifs"
          :key="objectif.id"
          class="bg-white dark:bg-repae-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-500 dark:hover:border-repae-blue-400 group"
        >
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center group-hover:bg-repae-blue-500 transition-colors duration-300">
              <font-awesome-icon
                :icon="objectif.icon"
                class="text-xl text-repae-blue-500 group-hover:text-white transition-colors duration-300"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                {{ objectif.titre }}
              </h3>
              <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                {{ objectif.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
