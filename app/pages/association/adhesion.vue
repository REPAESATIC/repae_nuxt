<script setup lang="ts">
useHead({
  title: 'Adhésion - L\'Association REPAE',
  meta: [
    { name: 'description', content: 'Rejoignez le Réseau Professionnel des Alumni de l\'ESATIC (REPAE). Découvrez les avantages, les étapes et la cotisation.' }
  ]
})

const {
  promotions,
  loadingPromotions,
  countries,
  loadingCountries,
  form,
  submitting,
  submitted,
  loadReferenceData,
  handleSubmit,
} = useAlumniRegistration()

onMounted(() => {
  loadReferenceData()
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

        <!-- Success state -->
        <div
          v-if="submitted"
          class="text-center py-16 bg-gray-50 dark:bg-repae-gray-700 rounded-xl"
        >
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-check-circle" class="text-green-500 text-4xl" />
          </div>
          <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
            Demande envoyée avec succès !
          </h3>
          <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300 max-w-md mx-auto mb-6">
            Votre demande d'adhésion a été soumise. Un email de confirmation vous a été envoyé.
            Vous serez contacté par l'équipe REPAE pour finaliser votre inscription.
          </p>
          <NuxtLink
            to="/association/presentation"
            class="inline-flex items-center gap-2 px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            Retour à l'association
          </NuxtLink>
        </div>

        <!-- Form -->
        <form
          v-else
          class="space-y-6 bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-8"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Prénom *
              </label>
              <input
                v-model="form.firstName"
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
                v-model="form.lastName"
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
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              placeholder="votre.email@exemple.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Téléphone *
            </label>
            <input
              v-model="form.phoneNumber"
              type="tel"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              placeholder="+225 07 00 00 00 00"
            />
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
              Format international ou local ivoirien (ex: +225 07 08 09 10 11)
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Promotion ESATIC *
              </label>
              <select
                v-model="form.promotionId"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors cursor-pointer"
              >
                <option value="">
                  {{ loadingPromotions ? 'Chargement...' : 'Sélectionnez votre promotion' }}
                </option>
                <option v-for="promo in promotions" :key="promo.id" :value="promo.id">
                  Promotion {{ promo.year }}{{ promo.nickname ? ` — ${promo.nickname}` : '' }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Pays de résidence *
              </label>
              <select
                v-model="form.countryId"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors cursor-pointer"
              >
                <option value="">
                  {{ loadingCountries ? 'Chargement...' : 'Sélectionnez votre pays' }}
                </option>
                <option v-for="country in countries" :key="country.id" :value="country.id">
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Diplôme obtenu
            </label>
            <input
              v-model="form.degree"
              type="text"
              maxlength="100"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
              placeholder="Ex: Licence, Master, Ingénieur..."
            />
          </div>

          <div>
            <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Biographie (optionnelle)
            </label>
            <textarea
              v-model="form.bio"
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors resize-none"
              placeholder="Présentez-vous en quelques lignes (parcours, compétences, centres d'intérêt...)"
            ></textarea>
          </div>

          <div class="flex items-start gap-3">
            <input
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="mt-1 w-4 h-4 rounded border-gray-300 dark:border-repae-gray-600 text-repae-blue-500 focus:ring-repae-blue-500 cursor-pointer"
            />
            <label class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
              J'accepte les <NuxtLink to="/association/statuts" class="text-repae-blue-500 hover:underline">statuts</NuxtLink>
              et le <NuxtLink to="/association/reglement" class="text-repae-blue-500 hover:underline">règlement intérieur</NuxtLink> du REPAE. *
            </label>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full px-8 py-4 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <font-awesome-icon
              :icon="submitting ? 'fa-solid fa-spinner' : 'fa-solid fa-user-plus'"
              :class="{ 'animate-spin': submitting }"
              class="mr-2"
            />
            {{ submitting ? 'Envoi en cours...' : 'Soumettre ma demande' }}
          </button>
        </form>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
