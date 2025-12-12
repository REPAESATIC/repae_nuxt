<script setup lang="ts">
import type { Alumni } from '~/data/espace-it/alumni-list'
import { disponibiliteConfig } from '~/data/espace-it/alumni-list'
// Donnees detaillees pour l'utilisateur courant (id: '1')
import { experiences } from '~/data/espace-it/experiences'
import { formations } from '~/data/espace-it/formations'
import { competences } from '~/data/espace-it/competences'
import { portfolio } from '~/data/espace-it/portfolio'

const props = defineProps<{
  alumni: Alumni
}>()

const disponibilite = computed(() => disponibiliteConfig[props.alumni.disponibilite])

// Verifier si c'est l'utilisateur courant (profil complet)
const isCurrentUser = computed(() => props.alumni.id === '1')
</script>

<template>
  <div class="space-y-6">
    <!-- Header Card -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-repae-gray-700">
      <!-- Cover -->
      <div class="h-32 sm:h-40 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600" />

      <!-- Profile Info -->
      <div class="relative px-4 sm:px-6 pb-6">
        <!-- Avatar -->
        <div class="relative -mt-16 sm:-mt-20 mb-4">
          <div class="relative inline-block">
            <img
              :src="alumni.photo_url"
              :alt="`${alumni.prenom} ${alumni.nom}`"
              class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white dark:border-repae-gray-800 shadow-lg"
            />
            <!-- Disponibilite indicator -->
            <div
              :class="[
                'absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white dark:border-repae-gray-800',
                disponibilite.dotColor
              ]"
              :title="disponibilite.label"
            />
          </div>
        </div>

        <!-- Name and Position -->
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ alumni.prenom }} {{ alumni.nom }}
            </h1>
            <p class="text-lg text-repae-gray-600 dark:text-repae-gray-400 font-brand mt-1">
              {{ alumni.poste_actuel }}
            </p>
            <p class="text-repae-gray-500 dark:text-repae-gray-500 font-brand">
              {{ alumni.entreprise_actuelle }}
            </p>

            <!-- Meta Info -->
            <div class="flex flex-wrap items-center gap-4 mt-3">
              <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
                <span>{{ alumni.ville }}, {{ alumni.pays }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
                <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500" />
                <span>Promotion {{ alumni.promotion }}</span>
              </div>
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                  disponibilite.color
                ]"
              >
                <span :class="['w-2 h-2 rounded-full', disponibilite.dotColor]" />
                {{ disponibilite.label }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-2">
            <a
              v-if="alumni.linkedin_url"
              :href="alumni.linkedin_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium font-brand text-sm rounded-xl transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-brands fa-linkedin" />
              <span>Voir sur LinkedIn</span>
            </a>
            <a
              :href="`mailto:${alumni.email}`"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand text-sm rounded-xl transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" />
              <span>Contacter</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- A propos (si disponible) -->
        <EspaceItProfilProfileAbout
          v-if="alumni.biographie"
          :biographie="alumni.biographie"
        />

        <!-- Contenu detaille pour l'utilisateur courant -->
        <template v-if="isCurrentUser">
          <!-- Formations -->
          <EspaceItProfilProfileFormation :formations="formations" />

          <!-- Experiences professionnelles -->
          <EspaceItProfilProfileExperience :experiences="experiences" />

          <!-- Portfolio -->
          <EspaceItProfilProfilePortfolio :projets="portfolio" />
        </template>

        <!-- Contenu basique pour les autres alumni -->
        <template v-else>
          <!-- Experience placeholder -->
          <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
            <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
              Experience professionnelle
            </h2>
            <div class="space-y-4">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center flex-shrink-0">
                  <font-awesome-icon icon="fa-solid fa-building" class="text-repae-gray-400" />
                </div>
                <div>
                  <h3 class="font-semibold text-repae-gray-900 dark:text-white">{{ alumni.poste_actuel }}</h3>
                  <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">{{ alumni.entreprise_actuelle }}</p>
                  <p class="text-xs text-repae-gray-500 dark:text-repae-gray-500 mt-1">
                    <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-1" />
                    {{ alumni.ville }}, {{ alumni.pays }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Formation placeholder -->
          <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
            <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500" />
              Formation
            </h2>
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center flex-shrink-0">
                <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500" />
              </div>
              <div>
                <h3 class="font-semibold text-repae-gray-900 dark:text-white">Diplome d'Ingenieur</h3>
                <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">ESATIC - Ecole Superieure Africaine des TIC</p>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-500 mt-1">
                  <font-awesome-icon icon="fa-solid fa-calendar-alt" class="mr-1" />
                  Promotion {{ alumni.promotion }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Competences detaillees pour l'utilisateur courant -->
        <EspaceItProfilProfileCompetences
          v-if="isCurrentUser"
          :competences="competences"
        />

        <!-- Competences basiques pour les autres alumni -->
        <div
          v-else
          class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700"
        >
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-star" class="text-repae-blue-500" />
            Competences
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="competence in alumni.competences"
              :key="competence"
              class="px-3 py-1.5 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-sm font-medium rounded-lg"
            >
              {{ competence }}
            </span>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-address-book" class="text-repae-blue-500" />
            Contact
          </h2>
          <div class="space-y-3">
            <a
              :href="`mailto:${alumni.email}`"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-envelope" class="text-repae-gray-500" />
              </div>
              <span class="truncate">{{ alumni.email }}</span>
            </a>

            <!-- Telephone (si disponible) -->
            <a
              v-if="alumni.telephone"
              :href="`tel:${alumni.telephone}`"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-phone" class="text-repae-gray-500" />
              </div>
              <span>{{ alumni.telephone }}</span>
            </a>

            <!-- LinkedIn -->
            <a
              v-if="alumni.linkedin_url"
              :href="alumni.linkedin_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-[#0A66C2] transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center">
                <font-awesome-icon icon="fa-brands fa-linkedin" class="text-[#0A66C2]" />
              </div>
              <span>LinkedIn</span>
            </a>

            <!-- GitHub (si disponible) -->
            <a
              v-if="alumni.github_url"
              :href="alumni.github_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-900 dark:hover:text-white transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
                <font-awesome-icon icon="fa-brands fa-github" class="text-repae-gray-700 dark:text-repae-gray-300" />
              </div>
              <span>GitHub</span>
            </a>

            <!-- Twitter (si disponible) -->
            <a
              v-if="alumni.twitter_url"
              :href="alumni.twitter_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-[#1DA1F2] transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
                <font-awesome-icon icon="fa-brands fa-twitter" class="text-[#1DA1F2]" />
              </div>
              <span>Twitter</span>
            </a>

            <!-- Site web (si disponible) -->
            <a
              v-if="alumni.site_web"
              :href="alumni.site_web"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
            >
              <div class="w-8 h-8 rounded-lg bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-globe" class="text-repae-blue-500" />
              </div>
              <span>Portfolio</span>
            </a>
          </div>
        </div>

        <!-- Localisation -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
            Localisation
          </h2>
          <div class="space-y-2 text-sm">
            <p class="text-repae-gray-900 dark:text-white font-medium">{{ alumni.ville }}</p>
            <p class="text-repae-gray-600 dark:text-repae-gray-400">{{ alumni.pays }}</p>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-bolt" class="text-repae-blue-500" />
            Actions rapides
          </h2>
          <div class="space-y-2">
            <a
              :href="`mailto:${alumni.email}`"
              class="flex items-center gap-2 w-full px-4 py-2.5 bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400 font-medium text-sm rounded-xl hover:bg-repae-blue-100 dark:hover:bg-repae-blue-500/20 transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" />
              Envoyer un email
            </a>
            <a
              v-if="alumni.telephone"
              :href="`tel:${alumni.telephone}`"
              class="flex items-center gap-2 w-full px-4 py-2.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-medium text-sm rounded-xl hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-phone" />
              Appeler
            </a>
            <button
              class="flex items-center gap-2 w-full px-4 py-2.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 font-medium text-sm rounded-xl hover:bg-gray-200 dark:hover:bg-repae-gray-600 transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-share" />
              Partager le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
