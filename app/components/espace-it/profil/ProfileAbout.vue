<script setup lang="ts">
defineProps<{
  biographie: string
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500" />
        A propos
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
      >
        Modifier
      </button>
    </div>

    <div class="prose prose-sm dark:prose-invert max-w-none">
      <p
        v-for="(paragraph, index) in biographie.split('\n\n')"
        :key="index"
        class="text-repae-gray-600 dark:text-repae-gray-300 font-brand leading-relaxed whitespace-pre-line"
        :class="{ 'mt-4': index > 0 }"
      >
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>
