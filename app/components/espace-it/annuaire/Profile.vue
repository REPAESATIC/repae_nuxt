<script setup lang="ts">
import type { UserProfile } from '~/data/espace-it/user-profile'
import type { Experience } from '~/data/espace-it/experiences'
import type { Formation } from '~/data/espace-it/formations'
import type { Competence } from '~/data/espace-it/competences'
import type { ProjetPortfolio } from '~/data/espace-it/portfolio'

const props = defineProps<{
  profile: UserProfile
  experiences: Experience[]
  formations: Formation[]
  competences: Competence[]
  portfolio: ProjetPortfolio[]
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Profile Header -->
    <EspaceItProfilProfileHeader :profile="profile" />

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- À propos -->
        <EspaceItProfilProfileAbout
          v-if="profile.biographie"
          :biographie="profile.biographie"
        />

        <!-- Formations -->
        <EspaceItProfilProfileFormation
          v-if="formations.length > 0"
          :formations="formations"
        />

        <!-- Expériences professionnelles -->
        <EspaceItProfilProfileExperience
          v-if="experiences.length > 0"
          :experiences="experiences"
        />

        <!-- Portfolio -->
        <EspaceItProfilProfilePortfolio
          v-if="portfolio.length > 0"
          :projets="portfolio"
        />

        <!-- Message si aucun contenu détaillé -->
        <div
          v-if="!profile.biographie && formations.length === 0 && experiences.length === 0 && portfolio.length === 0"
          class="bg-white dark:bg-repae-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-repae-gray-700 text-center"
        >
          <font-awesome-icon icon="fa-solid fa-info-circle" class="text-2xl text-repae-gray-300 dark:text-repae-gray-600 mb-3" />
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
            Cet alumni n'a pas encore complété son profil détaillé.
          </p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Contact Info -->
        <EspaceItProfilProfileContact :profile="profile" />

        <!-- Compétences -->
        <EspaceItProfilProfileCompetences
          v-if="competences.length > 0"
          :competences="competences"
        />
      </div>
    </div>
  </div>
</template>
