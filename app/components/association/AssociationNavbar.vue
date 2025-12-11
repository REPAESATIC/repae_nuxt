<script setup>
import { associationNavItems } from '@/data/association'

const route = useRoute()

// Check if current route matches the nav item
const isActive = (href) => {
  return route.path === href
}
</script>

<template>
  <nav class="bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 sticky top-18 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center justify-center gap-2 py-3">
        <NuxtLink
          v-for="item in associationNavItems"
          :key="item.id"
          :to="item.href"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-lg font-brand text-sm font-medium transition-all duration-200',
            isActive(item.href)
              ? 'bg-repae-blue-500 text-white'
              : 'text-repae-gray-600 dark:text-repae-gray-300 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-700 hover:text-repae-blue-500'
          ]"
        >
          <font-awesome-icon :icon="item.icon" class="text-sm" />
          {{ item.label }}
        </NuxtLink>
      </div>

      <!-- Mobile Navigation (scrollable) -->
      <div class="md:hidden overflow-x-auto py-3 -mx-4 px-4">
        <div class="flex items-center gap-2 min-w-max">
          <NuxtLink
            v-for="item in associationNavItems"
            :key="item.id"
            :to="item.href"
            :class="[
              'flex items-center gap-2 px-3 py-2 rounded-lg font-brand text-xs font-medium whitespace-nowrap transition-all duration-200',
              isActive(item.href)
                ? 'bg-repae-blue-500 text-white'
                : 'text-repae-gray-600 dark:text-repae-gray-300 bg-gray-100 dark:bg-repae-gray-700 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-600'
            ]"
          >
            <font-awesome-icon :icon="item.icon" class="text-xs" />
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.top-18 {
  top: 4.5rem;
}
</style>
