<script setup>
import { valeurs } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Nos Valeurs"
        description="Les principes fondamentaux qui nous unissent"
        :light="true"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="valeur in valeurs"
          :key="valeur.id"
          class="text-center group"
        >
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
            <font-awesome-icon
              :icon="valeur.icon"
              class="text-3xl text-white"
            />
          </div>
          <h3 class="text-xl font-bold font-brand text-white mb-3">
            {{ valeur.titre }}
          </h3>
          <p class="text-blue-100 font-brand text-sm">
            {{ valeur.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
