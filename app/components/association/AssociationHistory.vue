<script setup>
import { histoire } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Notre Histoire"
        description="De la creation a aujourd'hui, decouvrez le parcours du REPAE"
      />

      <!-- Introduction -->
      <div class="max-w-3xl mx-auto text-center mb-12">
        <p class="text-lg font-brand text-repae-gray-600 dark:text-repae-gray-300">
          {{ histoire.description }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="max-w-3xl mx-auto">
        <div class="relative pl-8 md:pl-0">
          <!-- Vertical line -->
          <div class="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-repae-blue-200 dark:bg-repae-gray-600 md:-translate-x-1/2"></div>

          <div class="space-y-12">
            <div
              v-for="(event, index) in histoire.timeline"
              :key="index"
              class="relative"
            >
              <!-- Timeline point -->
              <div
                class="absolute left-3 md:left-1/2 w-6 h-6 -translate-x-1/2 rounded-full bg-repae-blue-500 border-4 border-white dark:border-repae-gray-800 shadow-md z-10"
              ></div>

              <!-- Content -->
              <div
                :class="[
                  'md:w-[calc(50%-2rem)]',
                  index % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'
                ]"
              >
                <div class="bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-5 shadow-md ml-6 md:ml-0">
                  <span class="inline-block px-3 py-1 bg-repae-blue-100 dark:bg-repae-blue-900/30 text-repae-blue-600 dark:text-repae-blue-400 text-sm font-brand font-medium rounded-full mb-3">
                    {{ event.mois }} {{ event.annee }}
                  </span>
                  <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                    {{ event.titre }}
                  </h3>
                  <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                    {{ event.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
