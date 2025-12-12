<script setup lang="ts">
import type { Entreprise } from '~/data/espace-it/entreprises-alumni'
import { secteurConfig, formatDateCreation } from '~/data/espace-it/entreprises-alumni'

const props = defineProps<{
  entreprise: Entreprise
}>()

const secteur = computed(() => secteurConfig[props.entreprise.secteur])
</script>

<template>
  <div class="space-y-6">
    <!-- Header Card -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-repae-gray-700">
      <!-- Cover gradient -->
      <div class="h-32 sm:h-40 bg-gradient-to-r from-repae-blue-500 via-repae-blue-600 to-purple-600" />

      <!-- Main info -->
      <div class="relative px-4 sm:px-6 pb-6">
        <!-- Logo -->
        <div class="relative -mt-12 sm:-mt-16 mb-4">
          <img
            :src="entreprise.logo_url"
            :alt="entreprise.nom"
            class="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white dark:border-repae-gray-800 shadow-lg bg-white"
          />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <!-- Nom et secteur -->
            <div class="flex flex-wrap items-center gap-3">
              <h1 class="text-2xl sm:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ entreprise.nom }}
              </h1>
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
                  secteur.color
                ]"
              >
                <font-awesome-icon :icon="secteur.icon" />
                {{ secteur.label }}
              </span>
            </div>

            <!-- Description courte -->
            <p class="text-lg text-repae-gray-600 dark:text-repae-gray-400 font-brand mt-2">
              {{ entreprise.description }}
            </p>

            <!-- Meta info -->
            <div class="flex flex-wrap items-center gap-4 mt-4">
              <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
                <span>{{ entreprise.ville }}, {{ entreprise.pays }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500" />
                <span>Creee en {{ formatDateCreation(entreprise.date_creation) }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-users" class="text-repae-blue-500" />
                <span>{{ entreprise.nombre_employes }} employes</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-2">
            <a
              v-if="entreprise.site_web"
              :href="entreprise.site_web"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand text-sm rounded-xl transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-globe" />
              <span>Visiter le site</span>
            </a>
            <a
              v-if="entreprise.linkedin_url"
              :href="entreprise.linkedin_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium font-brand text-sm rounded-xl transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-brands fa-linkedin" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- A propos -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-building" class="text-repae-blue-500" />
            A propos
          </h2>
          <div class="prose prose-sm dark:prose-invert max-w-none">
            <p
              v-for="(paragraph, index) in entreprise.description_longue.split('\n\n')"
              :key="index"
              class="text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed mb-4 last:mb-0"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Services -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
            Services
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="service in entreprise.services"
              :key="service"
              class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl"
            >
              <div class="w-8 h-8 rounded-lg bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center flex-shrink-0">
                <font-awesome-icon icon="fa-solid fa-check" class="text-repae-blue-500 text-sm" />
              </div>
              <span class="text-sm text-repae-gray-700 dark:text-repae-gray-300">{{ service }}</span>
            </div>
          </div>
        </div>

        <!-- Technologies -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-code" class="text-repae-blue-500" />
            Technologies
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in entreprise.technologies"
              :key="tech"
              class="px-3 py-1.5 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-sm font-medium rounded-lg"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Clients notables -->
        <div
          v-if="entreprise.clients_notables && entreprise.clients_notables.length > 0"
          class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700"
        >
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-handshake" class="text-repae-blue-500" />
            Clients notables
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="client in entreprise.clients_notables"
              :key="client"
              class="px-3 py-1.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 text-sm font-medium rounded-lg"
            >
              {{ client }}
            </span>
          </div>
        </div>

        <!-- Recompenses -->
        <div
          v-if="entreprise.recompenses && entreprise.recompenses.length > 0"
          class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700"
        >
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-trophy" class="text-repae-blue-500" />
            Recompenses & Certifications
          </h2>
          <div class="space-y-3">
            <div
              v-for="recompense in entreprise.recompenses"
              :key="recompense"
              class="flex items-center gap-3"
            >
              <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <font-awesome-icon icon="fa-solid fa-star" class="text-amber-500 text-sm" />
              </div>
              <span class="text-sm text-repae-gray-700 dark:text-repae-gray-300">{{ recompense }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Fondateur -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-user-tie" class="text-repae-blue-500" />
            Fondateur
          </h2>
          <NuxtLink
            :to="`/espace-it/annuaire/${entreprise.fondateur.id}`"
            class="group flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-gray-50 dark:hover:bg-repae-gray-700/50 transition-colors"
          >
            <img
              :src="entreprise.fondateur.photo_url"
              :alt="`${entreprise.fondateur.prenom} ${entreprise.fondateur.nom}`"
              class="w-14 h-14 rounded-xl object-cover border border-gray-200 dark:border-repae-gray-600"
            />
            <div class="flex-1">
              <p class="font-semibold text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 transition-colors">
                {{ entreprise.fondateur.prenom }} {{ entreprise.fondateur.nom }}
              </p>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                {{ entreprise.fondateur.poste }}
              </p>
              <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500 mt-0.5">
                Promotion {{ entreprise.fondateur.promotion }}
              </p>
            </div>
            <font-awesome-icon
              icon="fa-solid fa-chevron-right"
              class="text-repae-gray-400 group-hover:text-repae-blue-500 transition-colors"
            />
          </NuxtLink>

          <!-- Co-fondateurs -->
          <div
            v-if="entreprise.cofondateurs && entreprise.cofondateurs.length > 0"
            class="mt-4 pt-4 border-t border-gray-200 dark:border-repae-gray-700"
          >
            <p class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-3">
              Co-fondateurs
            </p>
            <div class="space-y-3">
              <div
                v-for="cofondateur in entreprise.cofondateurs"
                :key="cofondateur.nom"
                class="flex items-center gap-3"
              >
                <img
                  :src="cofondateur.photo_url"
                  :alt="`${cofondateur.prenom} ${cofondateur.nom}`"
                  class="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-repae-gray-600"
                />
                <div>
                  <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                    {{ cofondateur.prenom }} {{ cofondateur.nom }}
                  </p>
                  <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                    {{ cofondateur.poste }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-address-book" class="text-repae-blue-500" />
            Contact
          </h2>
          <div class="space-y-3">
            <a
              :href="`mailto:${entreprise.email_contact}`"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-envelope" class="text-repae-gray-500" />
              </div>
              <span class="truncate">{{ entreprise.email_contact }}</span>
            </a>

            <a
              v-if="entreprise.telephone"
              :href="`tel:${entreprise.telephone}`"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-phone" class="text-repae-gray-500" />
              </div>
              <span>{{ entreprise.telephone }}</span>
            </a>

            <div class="flex items-start gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400">
              <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center flex-shrink-0">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-gray-500" />
              </div>
              <div>
                <p>{{ entreprise.adresse }}</p>
                <p>{{ entreprise.ville }}, {{ entreprise.pays }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Chiffre d'affaires -->
        <div
          v-if="entreprise.chiffre_affaires"
          class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700"
        >
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-chart-line" class="text-repae-blue-500" />
            Chiffre d'affaires
          </h2>
          <p class="text-2xl font-bold text-repae-blue-500">
            {{ entreprise.chiffre_affaires }}
          </p>
        </div>

        <!-- Actions rapides -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-bolt" class="text-repae-blue-500" />
            Actions rapides
          </h2>
          <div class="space-y-2">
            <a
              :href="`mailto:${entreprise.email_contact}`"
              class="flex items-center gap-2 w-full px-4 py-2.5 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 font-medium text-sm rounded-xl hover:bg-repae-blue-100 dark:hover:bg-repae-blue-500/20 transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" />
              Contacter l'entreprise
            </a>
            <button
              class="flex items-center gap-2 w-full px-4 py-2.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 font-medium text-sm rounded-xl hover:bg-gray-200 dark:hover:bg-repae-gray-600 transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-share" />
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
