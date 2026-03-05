<script setup lang="ts">
import type { AlumniItem } from '~/composables/useIdentityApi'

const props = defineProps<{
  alumni: AlumniItem
}>()

const skills = computed(() => props.alumni.skills?.map(s => s.name) || [])
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
        <div class="relative shrink-0">
          <img
            v-if="alumni.photoUrl"
            :src="alumni.photoUrl"
            :alt="`${alumni.firstName} ${alumni.lastName}`"
            class="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 dark:border-repae-gray-700 group-hover:border-repae-blue-300 dark:group-hover:border-repae-blue-500/50 transition-colors"
          />
          <div
            v-else
            class="w-16 h-16 rounded-xl bg-repae-blue-500 flex items-center justify-center border-2 border-gray-100 dark:border-repae-gray-700 group-hover:border-repae-blue-300 dark:group-hover:border-repae-blue-500/50 transition-colors"
          >
            <span class="text-white font-bold font-brand text-lg">
              {{ alumni.firstName?.charAt(0) }}{{ alumni.lastName?.charAt(0) }}
            </span>
          </div>
          <!-- Mentorat indicator -->
          <div
            v-if="alumni.isOpenToMentoring"
            class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-repae-gray-800 bg-amber-500"
            title="Ouvert au mentorat"
          />
          <!-- Verified indicator -->
          <div
            v-else-if="alumni.isVerified"
            class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-repae-gray-800 bg-green-500"
            title="Profil vérifié"
          />
        </div>

        <!-- Info principale -->
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors truncate">
            {{ alumni.firstName }} {{ alumni.lastName }}
          </h3>
          <p v-if="alumni.degree" class="text-sm text-repae-gray-600 dark:text-repae-gray-400 truncate">
            {{ alumni.degree }}
          </p>
          <p v-if="alumni.department" class="text-sm text-repae-gray-500 dark:text-repae-gray-500 truncate">
            {{ alumni.department }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contenu -->
    <div class="p-4 pt-3">
      <!-- Meta info -->
      <div class="flex flex-wrap items-center gap-2 text-xs text-repae-gray-500 dark:text-repae-gray-400 mb-3">
        <span v-if="alumni.city || alumni.country" class="inline-flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500/70" />
          {{ [alumni.city, alumni.country].filter(Boolean).join(', ') }}
        </span>
        <span v-if="alumni.promotion" class="inline-flex items-center gap-1">
          <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500/70" />
          Promo {{ alumni.promotion }}
        </span>
      </div>

      <!-- Badges -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span
            v-if="alumni.isOpenToMentoring"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Ouvert au mentorat
          </span>
          <span
            v-if="alumni.isVerified"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
          >
            <font-awesome-icon icon="fa-solid fa-check" class="text-[10px]" />
            Vérifié
          </span>
        </div>

        <!-- LinkedIn -->
        <a
          v-if="alumni.linkedinUrl"
          :href="alumni.linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
          title="Voir le profil LinkedIn"
          @click.stop
        >
          <font-awesome-icon icon="fa-brands fa-linkedin" class="text-sm" />
        </a>
      </div>

      <!-- Compétences -->
      <div v-if="skills.length > 0" class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-repae-gray-700">
        <span
          v-for="competence in skills.slice(0, 3)"
          :key="competence"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 text-xs rounded"
        >
          {{ competence }}
        </span>
        <span
          v-if="skills.length > 3"
          class="px-2 py-0.5 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-500 text-xs rounded"
        >
          +{{ skills.length - 3 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
