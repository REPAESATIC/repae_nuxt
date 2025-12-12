<script setup lang="ts">
import { promotions, pays } from '@/data/espace-it/alumni-list'

interface Filters {
  search: string
  promotion: number | null
  pays: string | null
  disponibilite: string | null
}

const props = defineProps<{
  filters: Filters
  totalResults: number
}>()

const emit = defineEmits<{
  'update:filters': [filters: Filters]
  reset: []
}>()

const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
  emit('update:filters', { ...props.filters, [key]: value })
}

const hasActiveFilters = computed(() => {
  return props.filters.search ||
    props.filters.promotion ||
    props.filters.pays ||
    props.filters.disponibilite
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-repae-gray-700">
    <div class="flex flex-col lg:flex-row lg:items-center gap-4">
      <!-- Recherche -->
      <div class="flex-1">
        <div class="relative">
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400"
          />
          <input
            :value="filters.search"
            type="text"
            placeholder="Rechercher par nom, poste, entreprise..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors"
            @input="updateFilter('search', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <!-- Filtres -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Promotion -->
        <select
          :value="filters.promotion ?? ''"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          @change="updateFilter('promotion', ($event.target as HTMLSelectElement).value ? Number(($event.target as HTMLSelectElement).value) : null)"
        >
          <option value="">Toutes promotions</option>
          <option v-for="promo in promotions" :key="promo" :value="promo">
            Promotion {{ promo }}
          </option>
        </select>

        <!-- Pays -->
        <select
          :value="filters.pays ?? ''"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          @change="updateFilter('pays', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">Tous les pays</option>
          <option v-for="p in pays" :key="p" :value="p">
            {{ p }}
          </option>
        </select>

        <!-- Disponibilite -->
        <select
          :value="filters.disponibilite ?? ''"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          @change="updateFilter('disponibilite', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">Toutes disponibilites</option>
          <option value="disponible">Disponible</option>
          <option value="ouvert_opportunites">Ouvert aux opportunites</option>
          <option value="en_poste">En poste</option>
        </select>

        <!-- Reset button -->
        <button
          v-if="hasActiveFilters"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer flex items-center gap-2"
          @click="emit('reset')"
        >
          <font-awesome-icon icon="fa-solid fa-times" />
          Reinitialiser
        </button>
      </div>
    </div>

    <!-- Resultats count -->
    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-repae-gray-700 flex items-center justify-between">
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
        <span class="font-semibold text-repae-gray-900 dark:text-white">{{ totalResults }}</span>
        alumni{{ totalResults > 1 ? 's' : '' }} trouve{{ totalResults > 1 ? 's' : '' }}
      </p>

      <!-- Active filters tags -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
        <span
          v-if="filters.search"
          class="inline-flex items-center gap-1 px-2 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-xs rounded-lg"
        >
          "{{ filters.search }}"
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="updateFilter('search', '')"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
          </button>
        </span>
        <span
          v-if="filters.promotion"
          class="inline-flex items-center gap-1 px-2 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-xs rounded-lg"
        >
          Promo {{ filters.promotion }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="updateFilter('promotion', null)"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
          </button>
        </span>
        <span
          v-if="filters.pays"
          class="inline-flex items-center gap-1 px-2 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-xs rounded-lg"
        >
          {{ filters.pays }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="updateFilter('pays', null)"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
