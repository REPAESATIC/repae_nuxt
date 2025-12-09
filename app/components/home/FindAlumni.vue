<script setup>
const formData = ref({
  firstName: '',
  name: '',
  company: '',
  location: '',
  promotion: ''
})

const handleSearch = () => {
  console.log('Search alumni:', formData.value)
}
</script>

<template>
  <section class="py-8 sm:py-12 lg:py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête responsive -->
      <div class="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-repae-blue-500 dark:text-white font-brand mb-3 sm:mb-4">
          Retrouver Nos Alumni
        </h2>
        <p class="text-base sm:text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand max-w-2xl mx-auto">
          Connectez-vous avec nos membres à travers le monde
        </p>
      </div>

      <!-- Grille responsive avec ordre inversé sur mobile -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center">
        <!-- Formulaire - Premier sur mobile, deuxième sur desktop -->
        <div class="order-2 lg:order-2 w-full max-w-lg mx-auto lg:mx-0 lg:justify-self-end">
          <div class="bg-slate-700 dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl relative">
            <!-- Logo responsive -->
            <div class="flex items-center justify-center mb-4 absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
              <img class="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg" src="/image/logos_REAPE/DECLINAISON/logo_BBL.png" alt="Logo REPAE">
            </div>

            <!-- Titre du formulaire responsive -->
            <div class="text-center mb-6 sm:mb-8 mt-6 sm:mt-10">
              <h3 class="text-lg sm:text-xl font-bold text-white font-brand">
                Créer un compte ALUMNI
              </h3>
              <p class="text-xs sm:text-sm text-gray-300 font-brand mt-2">
                Connectez-vous à notre réseau professionnel d'excellence
              </p>
            </div>

            <!-- Formulaire responsive -->
            <form @submit.prevent="handleSearch" class="space-y-3 sm:space-y-4">
              <!-- Champ Prénom -->
              <div class="relative">
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-base sm:text-lg" />
                </div>
                <input
                  v-model="formData.firstName"
                  type="text"
                  class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                  placeholder="Entrez un prénom..."
                >
              </div>

              <!-- Champ Nom -->
              <div class="relative">
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-base sm:text-lg" />
                </div>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                  placeholder="Entrez un nom..."
                >
              </div>


              <!-- Champ Entreprise -->
              <div class="relative">
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <font-awesome-icon icon="fa-solid fa-building" class="text-repae-blue-500 text-base sm:text-lg" />
                </div>
                <input
                  v-model="formData.company"
                  type="text"
                  class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                  placeholder="Entrez une entreprise..."
                >
              </div>

              <!-- Champ Email -->
              <div class="relative">
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <font-awesome-icon icon="fa-solid fa-envelope" class="text-repae-blue-500 text-base sm:text-lg" />
                </div>
                <input
                  v-model="formData.email"
                  type="email"
                  class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                  placeholder="Entrez votre email..."
                >
              </div>

              <!-- Champ Promotion/Formation -->
              <div class="relative">
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500 text-base sm:text-lg" />
                </div>
                <select
                  v-model="formData.promotion"
                  class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand border-0 appearance-none text-sm sm:text-base"
                >
                  <option value="">Sélectionnez une promotion</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>
                <!-- Flèche personnalisée pour le select -->
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <font-awesome-icon icon="fa-solid fa-chevron-down" class="text-repae-gray-400 text-sm" />
                </div>
              </div>

              <!-- Bouton de recherche responsive -->
              <button
                type="submit"
                class="w-full bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold py-2.5 sm:py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg mt-4 sm:mt-6 text-sm sm:text-base"
              >
                <font-awesome-icon icon="fa-solid fa-search" class="mr-2" />
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        <!-- Carte - Deuxième sur mobile, premier sur desktop -->
        <div class="order-1 lg:order-1">
          <div class="relative h-64 sm:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-1.7138671875000002%2C47.11499982620772%2C-1.4556884765625002%2C47.249406957888446&amp;layer=mapnik"
              class="w-full h-full"
              frameborder="0"
              loading="lazy"
              title="Carte des anciens élèves REPAE"
            ></iframe>
            <!-- Overlay d'information responsive -->
            <div class="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white dark:bg-repae-gray-800 rounded-lg p-2 sm:p-4 shadow-lg max-w-[calc(100%-1rem)] sm:max-w-none">
              <p class="text-xs sm:text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                <font-awesome-icon icon="fa-solid fa-users" class="mr-1 sm:mr-2 text-repae-blue-500" />
                150+ alumni dans la région
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
