<script setup lang="ts">
import type { UserProfile } from '@/data/espace-it/user-profile'
import { disponibiliteConfig } from '@/data/espace-it/user-profile'

const props = defineProps<{
  profile: UserProfile
}>()

const disponibilite = computed(() => disponibiliteConfig[props.profile.disponibilite])
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-repae-gray-700">
    <!-- Cover Image -->
    <div class="relative h-32 sm:h-48 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600">
      <img
        v-if="profile.cover_url"
        :src="profile.cover_url"
        alt="Cover"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>

    <!-- Profile Info -->
    <div class="relative px-4 sm:px-6 pb-6">
      <!-- Avatar -->
      <div class="relative -mt-16 sm:-mt-20 mb-4">
        <div class="relative inline-block">
          <img
            :src="profile.photo_url"
            :alt="`${profile.prenom} ${profile.nom}`"
            class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white dark:border-repae-gray-800 shadow-lg"
          />
          <!-- Disponibilite indicator -->
          <div
            :class="[
              'absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white dark:border-repae-gray-800',
              disponibilite.dotColor
            ]"
            :title="disponibilite.label"
          />
        </div>
      </div>

      <!-- Name and Position -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
            {{ profile.prenom }} {{ profile.nom }}
          </h1>
          <p class="text-lg text-repae-gray-600 dark:text-repae-gray-400 font-brand mt-1">
            {{ profile.poste_actuel }}
          </p>
          <p class="text-repae-gray-500 dark:text-repae-gray-500 font-brand">
            {{ profile.entreprise_actuelle }}
          </p>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 mt-3">
            <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
              <span>{{ profile.ville }}, {{ profile.pays }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500" />
              <span>Promotion {{ profile.promotion }}</span>
            </div>
            <span
              :class="[
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                disponibilite.color
              ]"
            >
              <span :class="['w-2 h-2 rounded-full', disponibilite.dotColor]" />
              {{ disponibilite.label }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            to="/espace-it/profil/edit"
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand text-sm rounded-xl transition-colors"
          >
            <font-awesome-icon icon="fa-solid fa-pencil-alt" />
            <span>Modifier le profil</span>
          </NuxtLink>
          <button
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-repae-gray-700 hover:bg-gray-200 dark:hover:bg-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 font-medium font-brand text-sm rounded-xl transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-share" />
            <span>Partager</span>
          </button>
        </div>
      </div>

      <!-- Social Links -->
      <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-repae-gray-700">
        <a
          v-if="profile.linkedin_url"
          :href="profile.linkedin_url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors"
          title="LinkedIn"
        >
          <font-awesome-icon icon="fa-brands fa-linkedin" class="text-lg" />
        </a>
        <a
          v-if="profile.twitter_url"
          :href="profile.twitter_url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-colors"
          title="Twitter"
        >
          <font-awesome-icon icon="fa-brands fa-twitter" class="text-lg" />
        </a>
        <a
          v-if="profile.github_url"
          :href="profile.github_url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-repae-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-repae-gray-900 transition-colors"
          title="GitHub"
        >
          <font-awesome-icon icon="fa-brands fa-github" class="text-lg" />
        </a>
        <a
          v-if="profile.site_web"
          :href="profile.site_web"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-500 hover:bg-repae-blue-500 hover:text-white transition-colors"
          title="Site web"
        >
          <font-awesome-icon icon="fa-solid fa-globe" class="text-lg" />
        </a>
      </div>
    </div>
  </div>
</template>
