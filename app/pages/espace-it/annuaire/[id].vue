<script setup lang="ts">
import { alumniList } from '@/data/espace-it/alumni-list'

definePageMeta({
  layout: 'espace-it'
})

const route = useRoute()
const alumniId = computed(() => route.params.id as string)

// Find alumni by ID
const alumni = computed(() => {
  return alumniList.find(a => a.id === alumniId.value)
})

// Set page title
useSeoMeta({
  title: computed(() =>
    alumni.value
      ? `${alumni.value.prenom} ${alumni.value.nom} | Annuaire IT REPAE`
      : 'Alumni non trouve | Annuaire IT REPAE'
  )
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
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink
        to="/espace-it/annuaire"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Annuaire des IT
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white">
        {{ alumni ? `${alumni.prenom} ${alumni.nom}` : 'Profil' }}
      </span>
    </nav>

    <!-- Back Button -->
    <div>
      <NuxtLink
        to="/espace-it/annuaire"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour a l'annuaire
      </NuxtLink>
    </div>

    <!-- Alumni Profile -->
    <EspaceItAnnuaireProfile
      v-if="alumni"
      :alumni="alumni"
    />

    <!-- Not Found -->
    <div
      v-else
      class="bg-white dark:bg-repae-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-repae-gray-700 text-center"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-user" class="text-2xl text-repae-gray-400" />
      </div>
      <h2 class="text-xl font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Alumni non trouve
      </h2>
      <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
        Le profil que vous recherchez n'existe pas ou a ete supprime.
      </p>
      <NuxtLink
        to="/espace-it/annuaire"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour a l'annuaire
      </NuxtLink>
    </div>
  </div>
</template>
