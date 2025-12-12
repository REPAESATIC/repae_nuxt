<script setup lang="ts">
import { currentUser } from '@/data/espace-it/current-user'

// Disponibilite labels
const disponibiliteLabels: Record<string, string> = {
  disponible: 'Disponible',
  en_poste: 'En poste',
  ouvert_opportunites: 'Ouvert aux opportunites'
}

const disponibiliteColors: Record<string, string> = {
  disponible: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  en_poste: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
  ouvert_opportunites: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
}
</script>

<template>
  <div class="bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 rounded-2xl p-6 text-white animate__animated animate__fadeIn">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <img
        :src="currentUser.photo_url"
        :alt="`${currentUser.prenom} ${currentUser.nom}`"
        class="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
      />
      <div class="flex-1">
        <h1 class="text-2xl font-bold font-brand">
          Bienvenue, {{ currentUser.prenom }} !
        </h1>
        <p class="text-white/80 font-brand mt-1">
          {{ currentUser.poste_actuel }} chez {{ currentUser.entreprise_actuelle }}
        </p>
        <div class="mt-2 flex flex-wrap items-center gap-2">
          <span class="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-medium font-brand">
            Promotion {{ currentUser.promotion }}
          </span>
          <span
            :class="[
              'px-2.5 py-1 rounded-lg text-xs font-medium font-brand',
              disponibiliteColors[currentUser.disponibilite]
            ]"
          >
            {{ disponibiliteLabels[currentUser.disponibilite] }}
          </span>
        </div>
      </div>
      <NuxtLink
        to="/espace-it/profil"
        class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium font-brand text-sm transition-colors"
      >
        Voir mon profil
      </NuxtLink>
    </div>
  </div>
</template>
