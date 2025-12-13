<script setup lang="ts">
import type { ProfilIT } from '~/data/espace-entreprises/profils-it'
import { disponibiliteConfig, niveauExperienceConfig } from '~/data/espace-entreprises/profils-it'

const props = defineProps<{
  profil: ProfilIT
}>()

const emit = defineEmits<{
  (e: 'contact'): void
  (e: 'download-cv'): void
}>()
</script>

<template>
  <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <!-- Photo -->
      <img
        :src="profil.photo_url"
        :alt="`${profil.prenom} ${profil.nom}`"
        class="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
      />

      <!-- Main info -->
      <div class="flex-1 text-center md:text-left">
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
          <h1 class="text-2xl md:text-3xl font-bold font-brand">
            {{ profil.prenom }} {{ profil.nom }}
          </h1>
          <span
            :class="[
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
              'bg-white/20 text-white'
            ]"
          >
            <font-awesome-icon :icon="disponibiliteConfig[profil.disponibilite].icon" class="text-xs" />
            {{ disponibiliteConfig[profil.disponibilite].label }}
          </span>
        </div>

        <p class="text-xl text-white/90 mb-4">
          {{ profil.titre }}
        </p>

        <!-- Meta info -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/80">
          <span class="flex items-center gap-1.5">
            <font-awesome-icon icon="fa-solid fa-map-marker-alt" />
            {{ profil.ville }}, {{ profil.pays }}
          </span>
          <span class="flex items-center gap-1.5">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" />
            Promotion {{ profil.promotion }}
          </span>
          <span class="flex items-center gap-1.5">
            <font-awesome-icon icon="fa-solid fa-briefcase" />
            {{ profil.experience_annees }} ans d'experience
          </span>
          <span class="flex items-center gap-1.5">
            <font-awesome-icon icon="fa-solid fa-layer-group" />
            {{ niveauExperienceConfig[profil.niveau_experience].label.split(' ')[0] }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col gap-3 w-full md:w-auto">
        <button
          type="button"
          class="px-6 py-3 bg-white text-emerald-600 hover:bg-white/90 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
          @click="emit('contact')"
        >
          <font-awesome-icon icon="fa-solid fa-envelope" />
          Contacter
        </button>
        <button
          type="button"
          class="px-6 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
          @click="emit('download-cv')"
        >
          <font-awesome-icon icon="fa-solid fa-file-pdf" />
          Telecharger CV
        </button>
        <a
          v-if="profil.linkedin_url"
          :href="profil.linkedin_url"
          target="_blank"
          class="px-6 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-medium font-brand transition-colors flex items-center justify-center gap-2"
        >
          <font-awesome-icon icon="fa-brands fa-linkedin" />
          LinkedIn
        </a>
      </div>
    </div>
  </div>
</template>
