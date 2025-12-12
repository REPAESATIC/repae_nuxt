<script setup lang="ts">
import { userProfile } from '@/data/espace-it/user-profile'
import { formations } from '@/data/espace-it/formations'
import { experiences } from '@/data/espace-it/experiences'
import { competences } from '@/data/espace-it/competences'
import { portfolio } from '@/data/espace-it/portfolio'

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

        <!-- Portfolio -->
        <EspaceItProfilProfilePortfolio :projets="portfolio" />
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Contact Info -->
        <EspaceItProfilProfileContact :profile="userProfile" />

        <!-- Competences -->
        <EspaceItProfilProfileCompetences :competences="competences" />
      </div>
    </div>
  </div>
</template>
