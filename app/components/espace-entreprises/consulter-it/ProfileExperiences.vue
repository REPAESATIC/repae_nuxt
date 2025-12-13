<script setup lang="ts">
import type { Experience } from '~/data/espace-entreprises/profils-it-details'

const props = defineProps<{
  experiences: Experience[]
}>()

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-')
  const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(month) - 1]} ${year}`
}

const calculateDuration = (dateDebut: string, dateFin?: string) => {
  const start = new Date(dateDebut)
  const end = dateFin ? new Date(dateFin) : new Date()
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) return `${remainingMonths} mois`
  if (remainingMonths === 0) return `${years} an${years > 1 ? 's' : ''}`
  return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-briefcase" class="text-emerald-500" />
      Experiences professionnelles
    </h2>

    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-repae-gray-700" />

      <!-- Experiences -->
      <div class="space-y-8">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="relative pl-10"
        >
          <!-- Timeline dot -->
          <div
            :class="[
              'absolute left-2 w-5 h-5 rounded-full border-2 border-white dark:border-repae-gray-800 shadow',
              index === 0 ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-repae-gray-600'
            ]"
          />

          <!-- Content -->
          <div class="bg-gray-50 dark:bg-repae-gray-900 rounded-xl p-5">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ exp.poste }}
                </h3>
                <p class="text-emerald-600 dark:text-emerald-400 font-medium">
                  {{ exp.entreprise }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ formatDate(exp.date_debut) }} - {{ exp.date_fin ? formatDate(exp.date_fin) : 'Present' }}
                </p>
                <p class="text-xs text-repae-gray-400">
                  {{ calculateDuration(exp.date_debut, exp.date_fin) }}
                </p>
              </div>
            </div>

            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-2">
              <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-1" />
              {{ exp.ville }}, {{ exp.pays }}
            </p>

            <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300 mb-4">
              {{ exp.description }}
            </p>

            <!-- Realisations -->
            <div v-if="exp.realisations.length > 0">
              <p class="text-xs font-medium text-repae-gray-500 dark:text-repae-gray-400 mb-2">
                Realisations cles :
              </p>
              <ul class="space-y-1.5">
                <li
                  v-for="(realisation, i) in exp.realisations"
                  :key="i"
                  class="flex items-start gap-2 text-sm text-repae-gray-600 dark:text-repae-gray-300"
                >
                  <font-awesome-icon icon="fa-solid fa-check" class="text-emerald-500 mt-1 text-xs" />
                  {{ realisation }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
