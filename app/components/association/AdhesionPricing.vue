<script setup>
import { cotisation, moyensPaiement, conditionsEligibilite } from '@/data/association'
</script>

<template>
  <section class="py-16 bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Pricing Card -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-8 shadow-2xl">
          <div class="text-center mb-8">
            <span class="inline-block px-4 py-1 bg-repae-blue-100 dark:bg-repae-blue-900 text-repae-blue-600 dark:text-repae-blue-300 font-brand text-sm font-medium rounded-full mb-4">
              Cotisation {{ cotisation.periode }}
            </span>
            <div class="flex items-baseline justify-center gap-2">
              <span class="text-5xl font-bold text-repae-gray-900 dark:text-white font-brand">
                {{ cotisation.montant.toLocaleString() }}
              </span>
              <span class="text-xl text-repae-gray-500 dark:text-repae-gray-400 font-brand">
                {{ cotisation.devise }}
              </span>
            </div>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand mt-2">
              {{ cotisation.description }}
            </p>
          </div>

          <!-- Payment Methods -->
          <div class="border-t border-gray-200 dark:border-repae-gray-700 pt-6">
            <h4 class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white mb-4 text-center">
              Moyens de paiement acceptes
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
                  <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand ml-2">
                    {{ moyen.description }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Eligibility Conditions -->
        <div class="text-white">
          <h3 class="text-2xl font-bold font-brand mb-6">
            Conditions d'eligibilite
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

          <div class="mt-8">
            <a
              href="#contact-form"
              class="inline-flex items-center gap-2 px-8 py-4 bg-white text-repae-blue-500 font-brand font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-user-plus" />
              Demander mon adhesion
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
