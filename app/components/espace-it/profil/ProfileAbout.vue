<script setup lang="ts">
defineProps<{
  biographie: string
}>()

const emit = defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500" />
        À propos
      </h2>
      <button
        class="text-sm text-repae-blue-500 hover:text-repae-blue-600 font-medium font-brand cursor-pointer"
        @click="emit('edit')"
      >
        Modifier
      </button>
    </div>

    <!-- Aucune biographie : sans cela la carte apparaissait vide, sans indiquer quoi faire -->
    <p
      v-if="!biographie?.trim()"
      class="text-repae-gray-500 dark:text-repae-gray-400 font-brand text-sm italic"
    >
      Vous n'avez pas encore renseigné de biographie. Cliquez sur « Modifier » pour vous présenter.
    </p>

    <div v-else class="prose prose-sm dark:prose-invert max-w-none">
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
