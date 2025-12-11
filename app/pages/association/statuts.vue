<script setup>
import { statuts, statutsContenu } from '@/data/association'

useHead({
  title: 'Statuts - L\'Association REPAE',
  meta: [
    { name: 'description', content: 'Consultez les statuts officiels du Reseau Professionnel des Alumni de l\'ESATIC (REPAE).' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <AssociationHero
      titre="Statuts du REPAE"
      sous-titre="Les regles fondamentales qui regissent notre association"
    />

    <!-- Secondary Navigation -->
    <AssociationNavbar />

    <!-- Document Viewer -->
    <DocumentViewer
      v-if="statuts"
      :document="statuts"
      :contenu="statutsContenu"
    />

    <!-- Related Documents -->
    <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6 text-center">
          Documents associes
        </h3>
        <div class="flex justify-center">
          <NuxtLink
            to="/association/reglement"
            class="flex items-center gap-3 p-4 bg-white dark:bg-repae-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-500 dark:hover:border-repae-blue-400"
          >
            <div class="w-12 h-12 rounded-lg bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-gavel" class="text-xl text-repae-blue-500" />
            </div>
            <div>
              <span class="block font-bold font-brand text-repae-gray-900 dark:text-white">Reglement Interieur</span>
              <span class="text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400">Voir le document</span>
            </div>
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="text-repae-blue-500 ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
