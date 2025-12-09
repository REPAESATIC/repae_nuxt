<script setup>
// Données statiques - pas besoin de ref()
const partners = [
  {
    id: 1,
    name: 'Partenaire 1',
    logo: '/image/logos_partenaires/partenaire1.png',
    description: "École d'ingénieurs formant l'élite technologique",
    website: '#'
  },
  {
    id: 2,
    name: 'Partenaire 2',
    logo: '/image/logos_partenaires/partenaire2.png',
    description: 'Leader dans les solutions technologiques innovantes',
    website: '#'
  },
  {
    id: 3,
    name: 'Partenaire 3',
    logo: '/image/logos_partenaires/partenaire3.png',
    description: "Réseau national d'écoles d'ingénieurs",
    website: '#'
  }
]
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
