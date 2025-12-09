<script setup>
const jobOffers = ref([
  {
    id: 1,
    title: 'Ingénieur DevOps',
    company: 'Tech Logic',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'CDI',
    level: 'Junior',
    logo: 'https://via.placeholder.com/100',
    postedDate: '2024-01-15',
    description: 'Mission passionnante dans une équipe dynamique'
  },
  {
    id: 2,
    title: 'Ingénieur DevOps Senior',
    company: 'Tech Logic',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'CDI',
    level: 'Senior',
    logo: 'https://via.placeholder.com/100',
    postedDate: '2024-01-14',
    description: 'Poste stratégique avec responsabilités importantes'
  },
  {
    id: 3,
    title: 'Ingénieur DevOps Junior',
    company: 'Tech Logic',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'Alternance',
    level: 'Junior',
    logo: 'https://via.placeholder.com/100',
    postedDate: '2024-01-13',
    description: 'Excellente opportunité pour débuter votre carrière'
  },
  {
    id: 4,
    title: 'Ingénieur DevOps',
    company: 'Tech Logic',
    location: 'Abidjan, Côte d\'Ivoire',
    type: 'CDI',
    level: 'Junior',
    logo: 'https://via.placeholder.com/100',
    postedDate: '2024-01-15',
    description: 'Mission passionnante dans une équipe dynamique'
  },
])
</script>

<template>
  <section class="py-16 bg-gradient-to-t from-repae-blue-800 to-repae-blue-500 dark:from-repae-blue-900 dark:to-repae-blue-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white font-brand mb-4">
          Nos Offres d'emploi
        </h2>
        <p class="text-lg text-blue-100 font-brand">
          Opportunités exclusives pour les membres REPAE
        </p>
      </div>

      <div class="grid md:grid-cols-4 gap-1 mb-8">
        <div
          v-for="job in jobOffers"
            :key="job.id"
            class="mt-10 bg-repae-blue border-2 border-white dark:border-gray-500 dark:bg-repae-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 max-w-[18rem]"
          >
          <div class="p-6 text-white relative">
            <div class=" rounded-md overflow-hidden bg-amber-700 flex items-start justify-center mb-4 absolute -top-12 left-1/2 transform -translate-x-1/2">
              <img class="maxh-32 object-cover" src="/image/exemples/tech-logo.jpg" alt="">
            </div>

            <h3 class="text-xl font-bold dark:text-white font-brand mb-2 mt-12">
              {{ job.title }}
            </h3>

            <div class="space-y-2 mb-4">
              <p class="text-sm dark:text-repae-gray-300 font-brand flex items-center">
                <font-awesome-icon icon="fa-solid fa-building" class="mr-2" />
                {{ job.company }}
              </p>
              <p class="text-sm dark:text-repae-gray-300 font-brand flex items-center">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-2" />
                {{ job.location }}
              </p>
              <p class="text-sm dark:text-repae-gray-300 font-brand flex items-center">
                <font-awesome-icon icon="fa-solid fa-briefcase" class="mr-2" />
                {{ job.type }} - {{ job.level }}
              </p>
            </div>

            <p class="text-sm dark:text-repae-gray-400 font-brand mb-4">
              {{ job.description }}
            </p>

            <button class="w-full cursor-pointer bg-repae-blue-500 hover:bg-repae-blue-600 dark:bg-repae-blue-400 dark:hover:bg-repae-blue-300 text-white font-brand font-medium py-2 rounded-lg transition-colors">
              Voir l'offre
            </button>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button class="bg-white cursor-pointer hover:bg-gray-100 text-repae-blue-500 font-brand font-bold px-8 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105">
          Voir toutes les offres
        </button>
      </div>
    </div>
  </section>
</template>
