<script setup lang="ts">
import type { Offre } from '~/data/espace-it/offres'
import {
  contratConfig,
  experienceConfig,
  remoteConfig,
  formatSalaire,
  getTempsDepuisPublication
} from '~/data/espace-it/offres'

const props = defineProps<{
  offre: Offre
}>()

const emit = defineEmits<{
  (e: 'postuler'): void
}>()

const contrat = computed(() => contratConfig[props.offre.type_contrat])
const experience = computed(() => experienceConfig[props.offre.niveau_experience])
const remote = computed(() => remoteConfig[props.offre.mode_remote])
const salaire = computed(() => formatSalaire(props.offre))
const tempsPublication = computed(() => getTempsDepuisPublication(props.offre.date_publication))

// Check if offer is expired
const isExpired = computed(() => {
  const now = new Date()
  const expiration = new Date(props.offre.date_expiration)
  return now > expiration
})

// Format date
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Main Content -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Header Card -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
        <!-- Banner gradient -->
        <div class="h-24 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600" />

        <div class="p-6 -mt-12">
          <div class="flex flex-col sm:flex-row sm:items-end gap-4">
            <!-- Logo entreprise -->
            <div class="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white dark:border-repae-gray-800 shadow-lg bg-white dark:bg-repae-gray-700 flex-shrink-0">
              <img
                :src="offre.entreprise.logo_url"
                :alt="offre.entreprise.nom"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Titre et entreprise -->
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-lg text-xs font-medium font-brand',
                    contrat.color
                  ]"
                >
                  {{ contrat.label }}
                </span>
                <span
                  v-if="isExpired"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium font-brand bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                >
                  Expiree
                </span>
              </div>
              <h1 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ offre.titre }}
              </h1>
              <NuxtLink
                :to="`/espace-it/entreprises/${offre.entreprise.id}`"
                class="text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 dark:hover:text-repae-blue-300 font-medium font-brand transition-colors"
              >
                {{ offre.entreprise.nom }}
              </NuxtLink>
            </div>
          </div>

          <!-- Meta infos -->
          <div class="mt-6 flex flex-wrap gap-4 text-sm text-repae-gray-600 dark:text-repae-gray-400">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-solid fa-location-dot" class="text-repae-gray-400" />
              <span>{{ offre.entreprise.ville }}, {{ offre.entreprise.pays }}</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="fa-solid fa-chart-line" class="text-repae-gray-400" />
              <span>{{ experience.label }} ({{ experience.annees }})</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon :icon="remote.icon" class="text-repae-gray-400" />
              <span>{{ remote.label }}</span>
            </div>
            <div v-if="offre.salaire_min || offre.salaire_max" class="flex items-center gap-2">
              <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-repae-gray-400" />
              <span>{{ salaire }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-file-alt" class="text-repae-blue-500" />
          Description du poste
        </h2>
        <div class="prose prose-sm dark:prose-invert max-w-none">
          <p class="text-repae-gray-600 dark:text-repae-gray-300 whitespace-pre-line">
            {{ offre.description_complete }}
          </p>
        </div>
      </div>

      <!-- Responsabilites -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-list-check" class="text-repae-blue-500" />
          Responsabilites
        </h2>
        <ul class="space-y-3">
          <li
            v-for="(resp, index) in offre.responsabilites"
            :key="index"
            class="flex items-start gap-3 text-repae-gray-600 dark:text-repae-gray-300"
          >
            <font-awesome-icon
              icon="fa-solid fa-check-circle"
              class="text-green-500 mt-0.5 flex-shrink-0"
            />
            <span>{{ resp }}</span>
          </li>
        </ul>
      </div>

      <!-- Competences -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-code" class="text-repae-blue-500" />
          Competences
        </h2>

        <!-- Requises -->
        <div class="mb-6">
          <h3 class="text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
            Requises
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(comp, index) in offre.competences_requises"
              :key="index"
              class="px-3 py-1.5 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 rounded-lg text-sm font-brand"
            >
              {{ comp }}
            </span>
          </div>
        </div>

        <!-- Souhaitees -->
        <div v-if="offre.competences_souhaitees?.length">
          <h3 class="text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
            Souhaitees (bonus)
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(comp, index) in offre.competences_souhaitees"
              :key="index"
              class="px-3 py-1.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 rounded-lg text-sm font-brand"
            >
              {{ comp }}
            </span>
          </div>
        </div>
      </div>

      <!-- Avantages -->
      <div v-if="offre.avantages?.length" class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-gift" class="text-repae-blue-500" />
          Avantages
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="(avantage, index) in offre.avantages"
            :key="index"
            class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-500/10 rounded-xl"
          >
            <font-awesome-icon
              icon="fa-solid fa-star"
              class="text-green-500 flex-shrink-0"
            />
            <span class="text-sm text-repae-gray-700 dark:text-repae-gray-300">
              {{ avantage }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Action Card -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6 sticky top-6">
        <!-- CTA Postuler -->
        <button
          :disabled="isExpired"
          :class="[
            'w-full py-3 px-4 font-medium font-brand rounded-xl transition-colors flex items-center justify-center gap-2',
            isExpired
              ? 'bg-gray-200 dark:bg-repae-gray-700 text-repae-gray-400 cursor-not-allowed'
              : 'bg-repae-blue-500 hover:bg-repae-blue-600 text-white cursor-pointer'
          ]"
          @click="emit('postuler')"
        >
          <font-awesome-icon icon="fa-solid fa-paper-plane" />
          {{ isExpired ? 'Offre expiree' : 'Postuler maintenant' }}
        </button>

        <!-- Stats -->
        <div class="mt-6 space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">Candidatures</span>
            <span class="font-semibold text-repae-gray-900 dark:text-white">
              {{ offre.nombre_candidatures }}
            </span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-repae-gray-700">
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">Publiee</span>
            <span class="font-medium text-repae-gray-700 dark:text-repae-gray-300">
              {{ tempsPublication }}
            </span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">Expire le</span>
            <span class="font-medium text-repae-gray-700 dark:text-repae-gray-300">
              {{ formatDate(offre.date_expiration) }}
            </span>
          </div>
        </div>

        <!-- Actions secondaires -->
        <div class="mt-6 flex gap-2">
          <button class="flex-1 py-2.5 px-4 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2">
            <font-awesome-icon icon="fa-regular fa-heart" />
            Sauvegarder
          </button>
          <button class="py-2.5 px-4 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-share" />
          </button>
        </div>
      </div>

      <!-- Publie par -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h3 class="text-sm font-medium font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-4">
          Publiee par
        </h3>
        <div class="flex items-center gap-4">
          <img
            :src="offre.publie_par.photo_url"
            :alt="`${offre.publie_par.prenom} ${offre.publie_par.nom}`"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <NuxtLink
              :to="`/espace-it/annuaire/${offre.publie_par.id}`"
              class="font-medium font-brand text-repae-gray-900 dark:text-white hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
            >
              {{ offre.publie_par.prenom }} {{ offre.publie_par.nom }}
            </NuxtLink>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              {{ offre.publie_par.poste }}
            </p>
          </div>
        </div>
        <NuxtLink
          :to="`/espace-it/annuaire/${offre.publie_par.id}`"
          class="mt-4 w-full py-2.5 px-4 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <font-awesome-icon icon="fa-solid fa-user" />
          Voir le profil
        </NuxtLink>
      </div>

      <!-- Entreprise -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h3 class="text-sm font-medium font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-4">
          A propos de l'entreprise
        </h3>
        <div class="flex items-center gap-4 mb-4">
          <img
            :src="offre.entreprise.logo_url"
            :alt="offre.entreprise.nom"
            class="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <p class="font-medium font-brand text-repae-gray-900 dark:text-white">
              {{ offre.entreprise.nom }}
            </p>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
              {{ offre.entreprise.ville }}, {{ offre.entreprise.pays }}
            </p>
          </div>
        </div>
        <NuxtLink
          :to="`/espace-it/entreprises/${offre.entreprise.id}`"
          class="w-full py-2.5 px-4 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <font-awesome-icon icon="fa-solid fa-building" />
          Voir l'entreprise
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
