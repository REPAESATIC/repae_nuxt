<script setup lang="ts">
import type { ProjetPortfolio } from '@/data/espace-it/portfolio'
import { typeProjetConfig, formatProjectDate } from '@/data/espace-it/portfolio'

defineProps<{
  projets: ProjetPortfolio[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-layer-group" class="text-repae-blue-500" />
        Portfolio
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
      >
        Modifier
      </button>
    </div>

    <!-- Grille de projets -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="projet in projets"
        :key="projet.id"
        class="group relative bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl overflow-hidden border border-gray-200 dark:border-repae-gray-600 hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50 transition-all duration-300"
      >
        <!-- Image -->
        <div class="relative aspect-video overflow-hidden">
          <img
            :src="projet.image_url"
            :alt="projet.titre"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <!-- Overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div class="flex gap-3">
              <a
                v-if="projet.url_demo"
                :href="projet.url_demo"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-repae-gray-900 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-solid fa-external-link-alt" />
                Demo
              </a>
              <a
                v-if="projet.url_github"
                :href="projet.url_github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 px-3 py-1.5 bg-repae-gray-900/90 hover:bg-repae-gray-900 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-brands fa-github" />
                Code
              </a>
            </div>
          </div>
          <!-- Type badge -->
          <div
            class="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-md"
            :class="typeProjetConfig[projet.type].color"
          >
            <font-awesome-icon :icon="typeProjetConfig[projet.type].icon" class="mr-1" />
            {{ typeProjetConfig[projet.type].label }}
          </div>
        </div>

        <!-- Contenu -->
        <div class="p-4">
          <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-1 line-clamp-1">
            {{ projet.titre }}
          </h3>
          <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mb-3 line-clamp-2">
            {{ projet.description }}
          </p>

          <!-- Meta -->
          <div class="flex flex-wrap items-center gap-2 text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-3">
            <span v-if="projet.client" class="flex items-center gap-1">
              <font-awesome-icon icon="fa-solid fa-building" />
              {{ projet.client }}
            </span>
            <span class="flex items-center gap-1">
              <font-awesome-icon icon="fa-solid fa-calendar-alt" />
              {{ formatProjectDate(projet.date_realisation) }}
            </span>
          </div>

          <!-- Technologies -->
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in projet.technologies.slice(0, 4)"
              :key="tech"
              class="px-2 py-0.5 bg-gray-200 dark:bg-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 text-xs rounded"
            >
              {{ tech }}
            </span>
            <span
              v-if="projet.technologies.length > 4"
              class="px-2 py-0.5 bg-gray-200 dark:bg-repae-gray-600 text-repae-gray-500 dark:text-repae-gray-400 text-xs rounded"
            >
              +{{ projet.technologies.length - 4 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="projets.length === 0"
      class="text-center py-12"
    >
      <font-awesome-icon icon="fa-solid fa-layer-group" class="text-4xl text-gray-300 dark:text-repae-gray-600 mb-3" />
      <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        Aucun projet dans le portfolio
      </p>
    </div>
  </div>
</template>
