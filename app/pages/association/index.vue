<script setup>
import { associationNavItems } from '@/data/association'

useHead({
  title: 'L\'Association - REPAE',
  meta: [
    { name: 'description', content: 'Decouvrez le Reseau Professionnel des Alumni de l\'ESATIC (REPAE), son histoire, ses objectifs et ses membres.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <AssociationHero
      titre="L'Association REPAE"
      sous-titre="Decouvrez le Reseau Professionnel des Alumni de l'ESATIC"
    />

    <!-- Navigation Cards -->
    <section class="py-16 bg-white dark:bg-repae-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UiSectionTitle
          titre="Explorez notre association"
          description="Selectionnez une section pour en savoir plus sur le REPAE"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="item in associationNavItems"
            :key="item.id"
            :to="item.href"
            class="group bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-repae-gray-600 hover:border-repae-blue-500 dark:hover:border-repae-blue-400"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center group-hover:bg-repae-blue-500 transition-colors duration-300">
                <font-awesome-icon
                  :icon="item.icon"
                  class="text-xl text-repae-blue-500 group-hover:text-white transition-colors duration-300"
                />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-2 group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors">
                  {{ item.label }}
                </h3>
                <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <div class="mt-4 flex items-center text-repae-blue-500 dark:text-repae-blue-400 font-brand text-sm font-medium">
              <span>En savoir plus</span>
              <font-awesome-icon icon="fa-solid fa-arrow-right" class="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Quick Stats Section -->
    <section class="py-16 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-white font-brand mb-4">
            Le REPAE en chiffres
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white font-brand mb-2">~500</div>
            <div class="text-blue-100 font-brand">Membres actifs</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white font-brand mb-2">13</div>
            <div class="text-blue-100 font-brand">Promotions</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white font-brand mb-2">+50</div>
            <div class="text-blue-100 font-brand">Entreprises partenaires</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white font-brand mb-2">87%</div>
            <div class="text-blue-100 font-brand">Taux d'insertion</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-50 dark:bg-repae-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-repae-gray-900 dark:text-white font-brand mb-4">
          Rejoignez le reseau
        </h2>
        <p class="text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand mb-8 max-w-2xl mx-auto">
          Vous etes ancien etudiant de l'ESATIC ? Rejoignez la communaute et beneficiez de tous les avantages du reseau.
        </p>
        <NuxtLink
          to="/association/adhesion"
          class="inline-flex items-center gap-2 px-8 py-4 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-user-plus" />
          Devenir membre
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
