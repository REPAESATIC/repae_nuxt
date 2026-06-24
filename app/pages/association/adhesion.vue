<script setup lang="ts">
import { cotisation, moyensPaiement } from '@/data/association'

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
  paymentProofFile,
  paymentProofError,
  paymentMethods,
  handleProofChange,
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

    <!-- Contact Form Section -->
    <section id="contact-form" class="py-16 bg-white dark:bg-repae-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Colonne gauche : Formulaire -->
          <div>
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
              Diplôme obtenu *
            </label>
            <input
              v-model="form.degree"
              type="text"
              required
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

          <!-- Choix de l'adhésion (cotisation) -->
          <div class="pt-2 border-t border-gray-200 dark:border-repae-gray-600">
            <label
              class="flex items-start gap-3 mt-4 p-4 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 cursor-pointer hover:border-repae-blue-500 transition-colors"
            >
              <input
                v-model="form.wantsMembership"
                type="checkbox"
                class="mt-1 w-4 h-4 rounded border-gray-300 dark:border-repae-gray-600 text-repae-blue-500 focus:ring-repae-blue-500 cursor-pointer"
              />
              <span>
                <span class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  Je souhaite devenir membre adhérent (cotisation)
                </span>
                <span class="block text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
                  Optionnel. Sans adhésion, votre profil reste un compte alumni simple ; vous pourrez adhérer plus tard.
                  Cochez cette case pour renseigner le paiement de votre cotisation.
                </span>
              </span>
            </label>
          </div>

          <!-- Informations de paiement de la cotisation (uniquement si adhésion) -->
          <div v-if="form.wantsMembership" class="pt-2">
            <h3 class="text-base font-bold font-brand text-repae-gray-900 dark:text-white mt-2 mb-1">
              Paiement de la cotisation
            </h3>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-4">
              Renseignez le paiement de votre cotisation et joignez-en la preuve pour finaliser votre adhésion.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Moyen de paiement *
                </label>
                <select
                  v-model="form.paymentMethod"
                  :required="form.wantsMembership"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors cursor-pointer"
                >
                  <option value="">Sélectionnez un moyen de paiement</option>
                  <option v-for="method in paymentMethods" :key="method" :value="method">
                    {{ method }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Référence du paiement *
                </label>
                <input
                  v-model="form.paymentReference"
                  type="text"
                  :required="form.wantsMembership"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500 focus:border-repae-blue-500 transition-colors"
                  placeholder="N° de transaction (ex: TXN-123456789)"
                />
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Preuve de paiement *
              </label>
              <input
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                :required="form.wantsMembership"
                @change="handleProofChange"
                class="block w-full text-sm text-repae-gray-600 dark:text-repae-gray-300 font-brand file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-repae-blue-500 file:text-white hover:file:bg-repae-blue-600 file:cursor-pointer cursor-pointer rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 p-2"
              />
              <p v-if="paymentProofError" class="text-xs text-red-500 mt-1">
                {{ paymentProofError }}
              </p>
              <p v-else-if="paymentProofFile" class="text-xs text-green-600 dark:text-green-400 mt-1">
                <font-awesome-icon icon="fa-solid fa-check-circle" class="mr-1" />
                {{ paymentProofFile.name }}
              </p>
              <p v-else class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
                Formats acceptés : PDF, JPG ou PNG — 5 Mo maximum.
              </p>
            </div>
          </div>

          <!-- Engagements obligatoires -->
          <div class="space-y-3 pt-2 border-t border-gray-200 dark:border-repae-gray-600">
            <div class="flex items-start gap-3 pt-2">
              <input
                v-model="form.certifyAccuracy"
                type="checkbox"
                required
                class="mt-1 w-4 h-4 rounded border-gray-300 dark:border-repae-gray-600 text-repae-blue-500 focus:ring-repae-blue-500 cursor-pointer"
              />
              <label class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                Je certifie que les informations fournies sont exactes. *
              </label>
            </div>

            <div class="flex items-start gap-3">
              <input
                v-model="form.acceptDataUsage"
                type="checkbox"
                required
                class="mt-1 w-4 h-4 rounded border-gray-300 dark:border-repae-gray-600 text-repae-blue-500 focus:ring-repae-blue-500 cursor-pointer"
              />
              <label class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                J'accepte que mes informations soient utilisées dans le cadre des activités du REPAE
                et de la plateforme Alumni ESATIC. *
              </label>
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

          <!-- Colonne droite : informations d'adhésion (panneau bleu) -->
          <aside class="lg:sticky lg:top-24">
            <div class="bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
              <!-- Intro -->
              <div>
                <h2 class="text-2xl font-bold font-brand mb-3">
                  Rejoignez dès aujourd'hui le Réseau Professionnel des Alumni de l'ESATIC
                </h2>
                <p class="font-brand text-white/90">
                  {{ cotisation.description }}
                </p>
              </div>

              <!-- Carte montant + paiement -->
              <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 shadow-lg">
                <!-- Montant -->
                <div class="text-center">
                  <span class="inline-block px-4 py-1 bg-repae-blue-100 dark:bg-repae-blue-900 text-repae-blue-600 dark:text-repae-blue-300 font-brand text-sm font-medium rounded-full mb-3">
                    {{ cotisation.frequence }}
                  </span>
                  <div class="flex items-baseline justify-center gap-2">
                    <span class="text-4xl font-bold text-repae-gray-900 dark:text-white font-brand">
                      {{ cotisation.montant.toLocaleString('fr-FR') }}
                    </span>
                    <span class="text-lg text-repae-gray-500 dark:text-repae-gray-400 font-brand">
                      {{ cotisation.devise }}
                    </span>
                  </div>
                  <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand mt-1">
                    Montant de l'adhésion
                  </p>
                </div>

                <!-- Modes de paiement -->
                <div class="border-t border-gray-200 dark:border-repae-gray-700 mt-6 pt-6">
                  <h3 class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white mb-4 text-center">
                    Modes de paiement disponibles
                  </h3>
                  <div class="space-y-3">
                    <div
                      v-for="moyen in moyensPaiement"
                      :key="moyen.id"
                      class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-700 rounded-lg"
                    >
                      <font-awesome-icon :icon="moyen.icon" class="text-repae-blue-500" />
                      <div>
                        <span class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white">
                          {{ moyen.nom }}
                        </span>
                        <span class="block text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand">
                          {{ moyen.description }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Logos des moyens de paiement disponibles via le bouton -->
                  <img
                    src="/image/logo_mobile_monney.png"
                    alt="Moyens de paiement disponibles : Djamo, Moov, Orange Money, MTN, Wave"
                    class="mt-5 mx-auto h-5 sm:h-6 w-auto opacity-90"
                  />

                  <!-- Lien de paiement en ligne -->
                  <a
                    :href="cotisation.lienPaiement"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-solid fa-lock" />
                    Effectuer le paiement
                    <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-xs" />
                  </a>

                  <!-- Coordonnées transfert Wave -->
                  <div class="mt-4 p-4 rounded-xl bg-repae-blue-50 dark:bg-repae-gray-700 border border-repae-blue-100 dark:border-repae-gray-600">
                    <p class="text-xs font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                      <font-awesome-icon icon="fa-solid fa-mobile-screen-button" class="text-repae-blue-500 mr-1" />
                      Transfert via Wave uniquement
                    </p>
                    <p class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">
                      Numéro : <span class="font-bold text-repae-gray-900 dark:text-white select-all">{{ cotisation.transfertWave.numero }}</span>
                    </p>
                    <p class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">
                      Titulaire : {{ cotisation.transfertWave.titulaire }} ({{ cotisation.transfertWave.fonction }})
                    </p>
                  </div>
                </div>
              </div>

              <!-- Rappel preuve de paiement -->
              <div class="flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/20">
                <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-amber-300 mt-0.5" />
                <p class="text-sm font-brand text-white/90">
                  Après le paiement, joignez votre <span class="font-bold">preuve de paiement</span> dans le
                  formulaire afin de faciliter la validation de votre statut.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
