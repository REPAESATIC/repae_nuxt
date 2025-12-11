<script setup>
import { statistiques } from '@/data/association'

useHead({
  title: 'Présentation - L\'Association REPAE',
  meta: [
    { name: 'description', content: 'Découvrez l\'histoire, les objectifs et les valeurs du Réseau Professionnel des Alumni de l\'ESATIC (REPAE).' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <AssociationHero
      titre="Présentation du REPAE"
      sous-titre="Découvrez notre histoire, nos objectifs et nos valeurs"
    />

    <!-- Secondary Navigation -->
    <AssociationNavbar />

    <!-- History Section -->
    <AssociationHistory />

    <!-- Mission/Objectives Section -->
    <AssociationMission />

    <!-- Values Section -->
    <AssociationValues />

    <!-- Stats Section -->
    <section class="py-16 bg-white dark:bg-repae-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UiSectionTitle
          titre="Le REPAE en chiffres"
          description="Quelques statistiques clés sur notre réseau"
        />

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in statistiques"
            :key="index"
            class="text-center p-6 bg-gray-50 dark:bg-repae-gray-700 rounded-xl"
          >
            <div class="text-3xl md:text-4xl font-bold text-repae-blue-500 dark:text-repae-blue-400 font-brand mb-2">
              {{ stat.valeur }}
            </div>
            <div class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
              {{ stat.label }}
            </div>
            <div class="text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400">
              {{ stat.description }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
