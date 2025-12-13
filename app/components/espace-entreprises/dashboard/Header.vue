<script setup lang="ts">
import { currentEntreprise } from '@/data/espace-entreprises/current-entreprise'
</script>

<template>
  <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p class="text-emerald-100 text-sm font-brand mb-1">
          Tableau de bord recruteur
        </p>
        <h1 class="text-2xl md:text-3xl font-bold font-brand">
          Bienvenue, {{ currentEntreprise.nom }}
        </h1>
        <p class="text-emerald-100 mt-2">
          Gerez vos offres d'emploi et trouvez les meilleurs talents IT
        </p>
      </div>
      <div class="flex items-center gap-4">
        <img
          :src="currentEntreprise.logo_url"
          :alt="currentEntreprise.nom"
          class="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/20 object-cover shadow-lg"
        />
        <div class="flex flex-col gap-2">
          <div
            v-if="currentEntreprise.verifie"
            class="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm"
          >
            <font-awesome-icon icon="fa-solid fa-check-circle" />
            <span>Entreprise verifiee</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm">
            <font-awesome-icon icon="fa-solid fa-star" />
            <span>{{ currentEntreprise.points_fidelite }} points</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
