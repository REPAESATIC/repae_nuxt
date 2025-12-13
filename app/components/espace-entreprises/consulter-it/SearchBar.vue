<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  resultsCount: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

const handleSubmit = () => {
  emit('search')
}

const clearSearch = () => {
  emit('update:modelValue', '')
  emit('search')
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-4">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Search input -->
        <div class="flex-1 relative">
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400"
          />
          <input
            :value="modelValue"
            type="text"
            placeholder="Rechercher par nom, competence, poste..."
            class="w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          />
          <button
            v-if="modelValue"
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 cursor-pointer"
            @click="clearSearch"
          >
            <font-awesome-icon icon="fa-solid fa-times" />
          </button>
        </div>

        <!-- Search button -->
        <button
          type="submit"
          class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <font-awesome-icon icon="fa-solid fa-search" />
          Rechercher
        </button>
      </div>
    </form>

    <!-- Results count -->
    <div class="mt-3 flex items-center justify-between text-sm">
      <p class="text-repae-gray-500 dark:text-repae-gray-400">
        <span class="font-semibold text-repae-gray-900 dark:text-white">{{ resultsCount }}</span>
        profil{{ resultsCount > 1 ? 's' : '' }} trouve{{ resultsCount > 1 ? 's' : '' }}
      </p>
      <p class="text-repae-gray-400 text-xs">
        Conseil : utilisez des competences specifiques pour affiner vos resultats
      </p>
    </div>
  </div>
</template>
