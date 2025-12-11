<script setup>
import { etapesAdhesion } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Comment adhérer ?"
        description="Les étapes pour rejoindre le réseau"
      />

      <div class="max-w-4xl mx-auto">
        <div class="relative">
          <!-- Vertical line -->
          <div class="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-repae-blue-200 dark:bg-repae-gray-600"></div>

          <div class="space-y-8">
            <div
              v-for="etape in etapesAdhesion"
              :key="etape.numero"
              class="relative flex items-start gap-6"
            >
              <!-- Step Number -->
              <div class="flex-shrink-0 w-16 h-16 rounded-full bg-repae-blue-500 flex items-center justify-center shadow-lg z-10">
                <span class="text-xl font-bold text-white font-brand">{{ etape.numero }}</span>
              </div>

              <!-- Content -->
              <div class="flex-1 bg-white dark:bg-repae-gray-800 rounded-xl p-6 shadow-md">
                <div class="flex items-center gap-3 mb-2">
                  <font-awesome-icon
                    :icon="etape.icon"
                    class="text-repae-blue-500"
                  />
                  <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white">
                    {{ etape.titre }}
                  </h3>
                </div>
                <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                  {{ etape.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
