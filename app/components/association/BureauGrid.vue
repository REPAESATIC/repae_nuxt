<script setup>
import { membresBureauActifs } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UiSectionTitle
        titre="Les membres du bureau"
        description="L'equipe qui dirige et anime le reseau"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <BureauMemberCard
          v-for="membre in membresBureauActifs"
          :key="membre.id"
          :membre="membre"
        />
      </div>
    </div>
  </section>
</template>
