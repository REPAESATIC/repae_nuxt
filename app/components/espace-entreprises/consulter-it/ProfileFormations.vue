<script setup lang="ts">
import type { Formation, Certification } from '~/data/espace-entreprises/profils-it-details'

const props = defineProps<{
  formations: Formation[]
  certifications: Certification[]
}>()

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-')
  const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
  return `${months[parseInt(month) - 1]} ${year}`
}
</script>

<template>
  <div class="space-y-6">
    <!-- Formations -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-emerald-500" />
        Formations
      </h2>

      <div class="space-y-4">
        <div
          v-for="formation in formations"
          :key="formation.id"
          class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl"
        >
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-emerald-500" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
              {{ formation.diplome }}
            </h3>
            <p class="text-emerald-600 dark:text-emerald-400">
              {{ formation.etablissement }}
            </p>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-1">
              {{ formation.ville }}, {{ formation.pays }} - {{ formation.annee_obtention }}
            </p>
            <span
              v-if="formation.mention"
              class="inline-flex items-center px-2 py-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 rounded text-xs mt-2"
            >
              Mention {{ formation.mention }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Certifications -->
    <div v-if="certifications.length > 0" class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-certificate" class="text-emerald-500" />
        Certifications
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="cert in certifications"
          :key="cert.id"
          class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl"
        >
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <font-awesome-icon icon="fa-solid fa-award" class="text-blue-500" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-repae-gray-900 dark:text-white text-sm">
              {{ cert.nom }}
            </h3>
            <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
              {{ cert.organisme }}
            </p>
            <p class="text-xs text-repae-gray-400 mt-1">
              Obtenue : {{ formatDate(cert.date_obtention) }}
              <span v-if="cert.date_expiration" class="ml-2">
                (Expire : {{ formatDate(cert.date_expiration) }})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
