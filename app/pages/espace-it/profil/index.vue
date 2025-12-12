<script setup lang="ts">
import { userProfile } from '@/data/espace-it/user-profile'
import { formations } from '@/data/espace-it/formations'
import { experiences } from '@/data/espace-it/experiences'

definePageMeta({
  layout: 'espace-it'
})

useSeoMeta({
  title: `${userProfile.prenom} ${userProfile.nom} - Mon Profil | Espace IT REPAE`
})
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink
        to="/espace-it"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        class="text-xs text-repae-gray-400"
      />
      <span class="text-repae-gray-900 dark:text-white">Mon profil</span>
    </nav>

    <!-- Profile Header -->
    <EspaceItProfilProfileHeader :profile="userProfile" />

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- About -->
        <EspaceItProfilProfileAbout :biographie="userProfile.biographie" />

        <!-- Formations -->
        <EspaceItProfilProfileFormation :formations="formations" />

        <!-- Experiences professionnelles -->
        <EspaceItProfilProfileExperience :experiences="experiences" />
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Contact Info -->
        <EspaceItProfilProfileContact :profile="userProfile" />

        <!-- Placeholder: Competences (Sprint 5) -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-star" class="text-repae-blue-500" />
            Competences
          </h2>
          <div class="text-center py-6">
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
              Sprint 5
            </p>
          </div>
        </div>

        <!-- Placeholder: Portfolio (Sprint 5) -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <font-awesome-icon icon="fa-solid fa-layer-group" class="text-repae-blue-500" />
            Portfolio
          </h2>
          <div class="text-center py-6">
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
              Sprint 5
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
