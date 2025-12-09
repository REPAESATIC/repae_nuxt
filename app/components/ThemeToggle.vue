<script setup lang="ts">
const { isDark, toggle } = useDarkMode()
</script>

<template>
  <button
    @click="toggle"
    class="p-2 rounded-lg bg-repae-gray-100 dark:bg-repae-gray-700 hover:bg-repae-gray-200 dark:hover:bg-repae-gray-600 transition-colors cursor-pointer"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <font-awesome-icon
      :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
      class="w-5 h-5 text-repae-gray-600 dark:text-repae-gray-300"
    />
  </button>
</template>
