<script setup>
import { partners } from '@/data/partners'
</script>

<template>
  <section class="py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-repae-blue-500 dark:text-white font-brand mb-4">
          En Collaboration avec
        </h2>
        <p class="text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand">
          Nos partenaires stratégiques
        </p>
      </div>

      <div class="flex justify-center items-center gap-8 flex-wrap">
        <img
          v-for="partner in partners"
          :key="partner.id"
          :src="partner.logo"
          :alt="partner.name"
          class="h-32 w-auto object-contain opacity-70 hover:opacity-100 transition-all dark:brightness-0 dark:invert"
        />
      </div>
    </div>
  </section>
</template>
