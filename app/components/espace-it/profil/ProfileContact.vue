<script setup lang="ts">
import type { UserProfile } from '@/data/espace-it/user-profile'

defineProps<{
  profile: UserProfile
}>()

interface ContactItem {
  icon: string
  label: string
  value: string
  href?: string
  isExternal?: boolean
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-address-book" class="text-repae-blue-500" />
        Coordonnees
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
      >
        Modifier
      </button>
    </div>

    <div class="space-y-4">
      <!-- Email -->
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-envelope" class="text-repae-blue-500" />
        </div>
        <div>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand uppercase tracking-wide">
            Email
          </p>
          <a
            :href="`mailto:${profile.email}`"
            class="text-repae-gray-900 dark:text-white font-brand hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
          >
            {{ profile.email }}
          </a>
        </div>
      </div>

      <!-- Phone -->
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-phone" class="text-green-500" />
        </div>
        <div>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand uppercase tracking-wide">
            Telephone
          </p>
          <a
            :href="`tel:${profile.telephone}`"
            class="text-repae-gray-900 dark:text-white font-brand hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors"
          >
            {{ profile.telephone }}
          </a>
        </div>
      </div>

      <!-- Location -->
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-purple-500" />
        </div>
        <div>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand uppercase tracking-wide">
            Localisation
          </p>
          <p class="text-repae-gray-900 dark:text-white font-brand">
            {{ profile.ville }}, {{ profile.pays }}
          </p>
          <p
            v-if="profile.adresse"
            class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand"
          >
            {{ profile.adresse }}
          </p>
        </div>
      </div>

      <!-- Website -->
      <div v-if="profile.site_web" class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-globe" class="text-orange-500" />
        </div>
        <div>
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand uppercase tracking-wide">
            Site web
          </p>
          <a
            :href="profile.site_web"
            target="_blank"
            rel="noopener noreferrer"
            class="text-repae-blue-500 hover:text-repae-blue-600 font-brand transition-colors"
          >
            {{ profile.site_web.replace('https://', '') }}
          </a>
        </div>
      </div>
    </div>

    <!-- Member since -->
    <div class="mt-6 pt-4 border-t border-gray-100 dark:border-repae-gray-700">
      <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500 font-brand text-center">
        Membre depuis {{ new Date(profile.date_inscription).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}
      </p>
    </div>
  </div>
</template>
