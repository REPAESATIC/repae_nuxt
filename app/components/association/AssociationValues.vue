<script setup>
import { valeurs } from '@/data/association'
</script>

<template>
  <section class="py-16 relative overflow-hidden">
    <div class="values-bg absolute inset-0 dark:grayscale dark:brightness-[0.15]"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <UiSectionTitle
        titre="Nos Valeurs"
        description="Les principes fondamentaux qui nous unissent"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="valeur in valeurs"
          :key="valeur.id"
          class="text-center group"
        >
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-repae-blue-500 dark:bg-repae-blue-600 flex items-center justify-center group-hover:bg-repae-blue-600 dark:group-hover:bg-repae-blue-500 transition-colors duration-300 shadow-lg">
            <font-awesome-icon
              :icon="valeur.icon"
              class="text-3xl text-white"
            />
          </div>
          <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
            {{ valeur.titre }}
          </h3>
          <p class="text-repae-gray-600 dark:text-repae-gray-300 font-brand text-sm">
            {{ valeur.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.values-bg {
  background-image: url('/image/background/people-bg/people-bg-2.jpg');
  background-repeat: repeat;
  background-size: 400px;
  background-attachment: fixed;
}
</style>
