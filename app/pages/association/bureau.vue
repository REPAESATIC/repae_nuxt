<script setup>
import { membresBureauActifs } from '@/data/association'

useHead({
  title: 'Le Bureau - L\'Association REPAE',
  meta: [
    { name: 'description', content: 'Decouvrez les membres du bureau executif du Reseau Professionnel des Alumni de l\'ESATIC (REPAE).' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <AssociationHero
      titre="Le Bureau du REPAE"
      sous-titre="L'equipe qui dirige et anime notre reseau"
    />

    <!-- Secondary Navigation -->
    <AssociationNavbar />

    <!-- Introduction -->
    <section class="py-12 bg-white dark:bg-repae-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-lg font-brand text-repae-gray-600 dark:text-repae-gray-300">
          Le bureau executif du REPAE est compose de {{ membresBureauActifs.length }} membres elus par l'assemblee generale.
          Ils sont responsables de la gestion quotidienne du reseau et de l'organisation des activites.
        </p>
      </div>
    </section>

    <!-- Bureau Grid -->
    <BureauGrid />

    <!-- CTA Section -->
    <section class="py-16 bg-white dark:bg-repae-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-repae-gray-900 dark:text-white font-brand mb-4">
          Vous souhaitez vous impliquer ?
        </h2>
        <p class="text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand mb-8 max-w-2xl mx-auto">
          Le REPAE est toujours a la recherche de membres motives pour participer aux differentes commissions et activites du reseau.
        </p>
        <NuxtLink
          to="/association/adhesion"
          class="inline-flex items-center gap-2 px-8 py-4 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-user-plus" />
          Rejoindre le REPAE
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
