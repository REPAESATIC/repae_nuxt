<script setup lang="ts">
import type { Alumni } from '@/data/espace-it/alumni-list'
import { disponibiliteConfig } from '@/data/espace-it/alumni-list'

const props = defineProps<{
  alumni: Alumni
}>()

const disponibilite = computed(() => disponibiliteConfig[props.alumni.disponibilite])
</script>

<template>
  <NuxtLink
    :to="`/espace-it/annuaire/${alumni.id}`"
    class="group block bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50 hover:shadow-lg transition-all duration-300"
  >
    <!-- Header avec photo -->
    <div class="relative p-4 pb-0">
      <div class="flex items-start gap-4">
        <!-- Avatar -->
        <div class="relative flex-shrink-0">
          <img
            :src="alumni.photo_url"
            :alt="`${alumni.prenom} ${alumni.nom}`"
            class="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 dark:border-repae-gray-700 group-hover:border-repae-blue-300 dark:group-hover:border-repae-blue-500/50 transition-colors"
          />
          <!-- Disponibilite indicator -->
          <div
            :class="[
              'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-repae-gray-800',
              disponibilite.dotColor
            ]"
            :title="disponibilite.label"
          />
        </div>

        <!-- Info principale -->
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors truncate">
            {{ alumni.prenom }} {{ alumni.nom }}
          </h3>
          <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 truncate">
            {{ alumni.poste_actuel }}
          </p>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-500 truncate">
            {{ alumni.entreprise_actuelle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contenu -->
    <div class="p-4 pt-3">
      <!-- Meta info -->
      <div class="flex flex-wrap items-center gap-2 text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-3">
        <span class="inline-flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500/70" />
          {{ alumni.ville }}, {{ alumni.pays }}
        </span>
        <span class="inline-flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500/70" />
          Promo {{ alumni.promotion }}
        </span>
      </div>

      <!-- Badge disponibilite -->
      <div class="flex items-center justify-between">
        <span
          :class="[
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
            disponibilite.color
          ]"
        >
          <span :class="['w-1.5 h-1.5 rounded-full', disponibilite.dotColor]" />
          {{ disponibilite.label }}
        </span>

        <!-- LinkedIn -->
        <a
          v-if="alumni.linkedin_url"
          :href="alumni.linkedin_url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
          title="Voir le profil LinkedIn"
          @click.stop
        >
          <font-awesome-icon icon="fa-brands fa-linkedin" class="text-sm" />
        </a>
      </div>

      <!-- Competences -->
      <div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-repae-gray-700">
        <span
          v-for="competence in alumni.competences.slice(0, 3)"
          :key="competence"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 text-xs rounded"
        >
          {{ competence }}
        </span>
        <span
          v-if="alumni.competences.length > 3"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-500 text-xs rounded"
        >
          +{{ alumni.competences.length - 3 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
