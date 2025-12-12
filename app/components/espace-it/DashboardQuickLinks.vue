<script setup lang="ts">
import type { NavItem } from '@/data/espace-it/current-user'

defineProps<{
  links: NavItem[]
  title?: string
}>()
</script>

<template>
  <div>
    <h2
      v-if="title"
      class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4"
    >
      {{ title }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="link in links"
        :key="link.id"
        :to="link.href"
        class="group flex items-center gap-4 p-4 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-300 dark:hover:border-repae-blue-500/50 hover:shadow-lg hover:shadow-repae-blue-500/10 transition-all duration-200"
      >
        <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center group-hover:bg-repae-blue-100 dark:group-hover:bg-repae-blue-500/20 transition-colors">
          <font-awesome-icon
            :icon="link.icon"
            class="text-lg text-repae-gray-500 dark:text-repae-gray-400 group-hover:text-repae-blue-500 transition-colors"
          />
        </div>
        <div class="flex-1">
          <h3 class="font-medium font-brand text-repae-gray-900 dark:text-white group-hover:text-repae-blue-500 dark:group-hover:text-repae-blue-400 transition-colors">
            {{ link.label }}
          </h3>
          <p
            v-if="link.description"
            class="text-sm text-repae-gray-500 dark:text-repae-gray-400"
          >
            {{ link.description }}
          </p>
        </div>
        <font-awesome-icon
          icon="fa-solid fa-chevron-right"
          class="text-repae-gray-400 dark:text-repae-gray-500 group-hover:text-repae-blue-500 group-hover:translate-x-1 transition-all"
        />
      </NuxtLink>
    </div>
  </div>
</template>
