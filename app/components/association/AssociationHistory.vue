<script setup>
import { histoire } from '@/data/association'

const getEventIcon = (index) => {
  const icons = [
    'fa-solid fa-flag',
    'fa-solid fa-users',
    'fa-solid fa-rocket',
    'fa-solid fa-handshake',
    'fa-solid fa-chart-line'
  ]
  return icons[index] || 'fa-solid fa-star'
}
</script>

<template>
  <section class="py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Notre Histoire"
        description="De la création à aujourd'hui, découvrez le parcours du REPAE"
      />

      <!-- Introduction -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <p class="text-lg font-brand text-repae-gray-600 dark:text-repae-gray-300">
          {{ histoire.description }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="max-w-4xl mx-auto">
        <div class="relative pl-8 md:pl-0">
          <!-- Vertical line with gradient -->
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-repae-blue-400 via-repae-blue-500 to-repae-blue-600 md:-translate-x-1/2 rounded-full"></div>

          <div class="space-y-16">
            <div
              v-for="(event, index) in histoire.timeline"
              :key="index"
              class="relative group"
            >
              <!-- Timeline point -->
              <div
                class="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full bg-linear-to-br from-repae-blue-400 to-repae-blue-600 border-4 border-white dark:border-repae-gray-800 shadow-lg z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              >
                <font-awesome-icon :icon="getEventIcon(index)" class="text-white text-sm" />
              </div>

              <!-- Content -->
              <div
                :class="[
                  'md:w-[calc(50%-3rem)]',
                  index % 2 === 0 ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
                ]"
              >
                <div
                  :class="[
                    'relative bg-linear-to-br from-white to-gray-50 dark:from-repae-gray-700 dark:to-repae-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ml-10 md:ml-0 border border-gray-100 dark:border-repae-gray-600 group-hover:-translate-y-1',
                    index % 2 === 0 ? 'md:text-right' : ''
                  ]"
                >
                  <!-- Connector line to point -->
                  <div
                    :class="[
                      'hidden md:block absolute top-1/2 w-8 h-0.5 bg-repae-blue-300 dark:bg-repae-blue-500',
                      index % 2 === 0 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
                    ]"
                  ></div>

                  <!-- Year badge -->
                  <div :class="['mb-4', index % 2 === 0 ? 'md:flex md:justify-end' : '']">
                    <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-linear-to-r from-repae-blue-500 to-repae-blue-600 text-white text-sm font-brand font-semibold rounded-full shadow-md">
                      <font-awesome-icon icon="fa-solid fa-calendar" class="text-xs" />
                      {{ event.mois }} {{ event.annee }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
                    {{ event.titre }}
                  </h3>

                  <!-- Description -->
                  <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed">
                    {{ event.description }}
                  </p>

                  <!-- Decorative corner -->
                  <div
                    :class="[
                      'absolute w-16 h-16 opacity-5',
                      index % 2 === 0 ? 'bottom-0 left-0' : 'bottom-0 right-0'
                    ]"
                  >
                    <font-awesome-icon :icon="getEventIcon(index)" class="w-full h-full text-repae-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- End point -->
          <div class="absolute left-4 md:left-1/2 -bottom-4 w-6 h-6 -translate-x-1/2 rounded-full bg-repae-blue-600 border-4 border-white dark:border-repae-gray-800 shadow-lg z-10"></div>
        </div>
      </div>
    </div>
  </section>
</template>
