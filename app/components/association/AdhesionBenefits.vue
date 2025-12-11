<script setup>
import { avantages } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Pourquoi adherer ?"
        description="Les avantages exclusifs reserves aux membres du REPAE"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="avantage in avantages"
          :key="avantage.id"
          class="flex items-start gap-4 p-6 bg-gray-50 dark:bg-repae-gray-700 rounded-xl hover:shadow-md transition-shadow"
        >
          <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center">
            <font-awesome-icon
              :icon="avantage.icon"
              class="text-xl text-repae-blue-500"
            />
          </div>
          <div>
            <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              {{ avantage.titre }}
            </h3>
            <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
              {{ avantage.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
