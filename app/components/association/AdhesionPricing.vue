<script setup>
import { cotisation, moyensPaiement, conditionsEligibilite } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Intro -->
      <div class="text-center max-w-3xl mx-auto mb-12 text-white">
        <h2 class="text-2xl sm:text-3xl font-bold font-brand mb-4">
          Rejoignez dès aujourd'hui le Réseau Professionnel des Alumni de l'ESATIC
        </h2>
        <p class="font-brand text-white/90">
          {{ cotisation.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Pricing Card -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-8 shadow-2xl">
          <div class="text-center mb-8">
            <span class="inline-block px-4 py-1 bg-repae-blue-100 dark:bg-repae-blue-900 text-repae-blue-600 dark:text-repae-blue-300 font-brand text-sm font-medium rounded-full mb-4">
              {{ cotisation.frequence }}
            </span>
            <div class="flex items-baseline justify-center gap-2">
              <span class="text-5xl font-bold text-repae-gray-900 dark:text-white font-brand">
                {{ cotisation.montant.toLocaleString('fr-FR') }}
              </span>
              <span class="text-xl text-repae-gray-500 dark:text-repae-gray-400 font-brand">
                {{ cotisation.devise }}
              </span>
            </div>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand mt-2">
              Montant de l'adhésion
            </p>
          </div>

          <!-- Payment Methods -->
          <div class="border-t border-gray-200 dark:border-repae-gray-700 pt-6">
            <h4 class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white mb-4 text-center">
              Modes de paiement disponibles
            </h4>
            <div class="space-y-3">
              <div
                v-for="moyen in moyensPaiement"
                :key="moyen.id"
                class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-700 rounded-lg"
              >
                <font-awesome-icon
                  :icon="moyen.icon"
                  class="text-repae-blue-500"
                />
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

            <!-- Lien de paiement en ligne -->
            <a
              :href="cotisation.lienPaiement"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
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

        <!-- Eligibility Conditions -->
        <div class="text-white">
          <h3 class="text-2xl font-bold font-brand mb-6">
            Conditions d'éligibilité
          </h3>
          <ul class="space-y-4">
            <li
              v-for="(condition, index) in conditionsEligibilite"
              :key="index"
              class="flex items-start gap-3"
            >
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                <font-awesome-icon icon="fa-solid fa-check" class="text-xs text-white" />
              </div>
              <span class="font-brand">{{ condition }}</span>
            </li>
          </ul>

          <!-- Rappel preuve de paiement -->
          <div class="mt-8 flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/20">
            <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-amber-300 mt-0.5" />
            <p class="text-sm font-brand text-white/90">
              Après le paiement, joignez votre <span class="font-bold">preuve de paiement</span> dans le
              formulaire de demande d'adhésion ci-dessous afin de faciliter la validation de votre statut.
            </p>
          </div>

          <div class="mt-6">
            <a
              href="#contact-form"
              class="inline-flex items-center gap-2 px-8 py-4 bg-white text-repae-blue-500 font-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-user-plus" />
              Demander mon adhésion
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
