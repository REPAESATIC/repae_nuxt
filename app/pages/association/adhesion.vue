<script setup>
useHead({
  title: 'Adhésion - L\'Association REPAE',
  meta: [
    { name: 'description', content: 'Rejoignez le Réseau Professionnel des Alumni de l\'ESATIC (REPAE). Découvrez les avantages, les étapes et la cotisation.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <AssociationHero
      titre="Rejoignez le REPAE"
      sous-titre="Devenez membre du réseau et bénéficiez de tous les avantages"
    />

    <!-- Secondary Navigation -->
    <AssociationNavbar />

    <!-- Benefits Section -->
    <AdhesionBenefits />

    <!-- Steps Section -->
    <AdhesionSteps />

    <!-- Pricing Section -->
    <AdhesionPricing />

    <!-- Contact Form Section -->
    <section id="contact-form" class="py-16 bg-white dark:bg-repae-gray-800">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <UiSectionTitle
          titre="Demande d'adhésion"
          description="Remplissez le formulaire ci-dessous pour soumettre votre demande"
        />

        <form class="space-y-6 bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Nom *
              </label>
              <input
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              placeholder="votre.email@exemple.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              placeholder="+225 XX XX XX XX XX"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Promotion ESATIC *
              </label>
              <select
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              >
                <option value="">Sélectionnez votre promotion</option>
                <option v-for="year in 13" :key="year" :value="2012 + year">
                  Promotion {{ 2012 + year }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Diplôme obtenu *
              </label>
              <select
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              >
                <option value="">Sélectionnez votre diplôme</option>
                <option value="licence">Licence</option>
                <option value="master">Master</option>
                <option value="ingenieur">Ingénieur</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Message (optionnel)
            </label>
            <textarea
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors resize-none"
              placeholder="Partagez vos motivations ou toute information supplémentaire..."
            ></textarea>
          </div>

          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              required
              class="mt-1 w-4 h-4 rounded border-gray-300 dark:border-repae-gray-600 text-repae-blue-500 focus:ring-repae-blue-500"
            />
            <label class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
              J'accepte les <NuxtLink to="/association/statuts" class="text-repae-blue-500 hover:underline">statuts</NuxtLink>
              et le <NuxtLink to="/association/reglement" class="text-repae-blue-500 hover:underline">règlement intérieur</NuxtLink> du REPAE. *
            </label>
          </div>

          <button
            type="submit"
            class="w-full px-8 py-4 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-user-plus" class="mr-2" />
            Soumettre ma demande
          </button>
        </form>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
