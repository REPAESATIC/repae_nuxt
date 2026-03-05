<script setup lang="ts">
import type { PromotionItem, CountryItem } from '~/composables/useIdentityApi'

interface Filters {
  search: string
  promotionId: string | null
  countryId: string | null
  isOpenToMentoring: boolean | null
}

const props = defineProps<{
  filters: Filters
  totalResults: number
  promotions: PromotionItem[]
  countries: CountryItem[]
  loading?: boolean
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
    props.filters.promotionId ||
    props.filters.countryId ||
    props.filters.isOpenToMentoring !== null
})

// Trouver le nom de la promotion sélectionnée
const selectedPromoLabel = computed(() => {
  if (!props.filters.promotionId) return null
  const p = props.promotions.find(p => p.id === props.filters.promotionId)
  return p ? `Promo ${p.year}` : null
})

// Trouver le nom du pays sélectionné
const selectedCountryLabel = computed(() => {
  if (!props.filters.countryId) return null
  const c = props.countries.find(c => c.id === props.filters.countryId)
  return c?.name ?? null
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
            placeholder="Rechercher par nom, prénom..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors"
            @input="updateFilter('search', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <!-- Filtres -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Promotion -->
        <select
          :value="filters.promotionId ?? ''"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          @change="updateFilter('promotionId', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">Toutes promotions</option>
          <option v-for="promo in promotions" :key="promo.id" :value="promo.id">
            Promotion {{ promo.year }}{{ promo.nickname ? ` — ${promo.nickname}` : '' }}
          </option>
        </select>

        <!-- Pays -->
        <select
          :value="filters.countryId ?? ''"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          @change="updateFilter('countryId', ($event.target as HTMLSelectElement).value || null)"
        >
          <option value="">Tous les pays</option>
          <option v-for="country in countries" :key="country.id" :value="country.id">
            {{ country.name }}
          </option>
        </select>

        <!-- Mentorat -->
        <select
          :value="filters.isOpenToMentoring === null ? '' : String(filters.isOpenToMentoring)"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          @change="updateFilter('isOpenToMentoring', ($event.target as HTMLSelectElement).value === '' ? null : ($event.target as HTMLSelectElement).value === 'true')"
        >
          <option value="">Tous les profils</option>
          <option value="true">Ouvert au mentorat</option>
          <option value="false">Non disponible</option>
        </select>

        <!-- Reset button -->
        <button
          v-if="hasActiveFilters"
          class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer flex items-center gap-2"
          @click="emit('reset')"
        >
          <font-awesome-icon icon="fa-solid fa-times" />
          Réinitialiser
        </button>
      </div>
    </div>

    <!-- Résultats count -->
    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-repae-gray-700 flex items-center justify-between">
      <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
        <template v-if="loading">
          <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin mr-1" />
          Chargement...
        </template>
        <template v-else>
          <span class="font-semibold text-repae-gray-900 dark:text-white">{{ totalResults }}</span>
          alumni{{ totalResults > 1 ? 's' : '' }} trouvé{{ totalResults > 1 ? 's' : '' }}
        </template>
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
          v-if="selectedPromoLabel"
          class="inline-flex items-center gap-1 px-2 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-xs rounded-lg"
        >
          {{ selectedPromoLabel }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="updateFilter('promotionId', null)"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
          </button>
        </span>
        <span
          v-if="selectedCountryLabel"
          class="inline-flex items-center gap-1 px-2 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-xs rounded-lg"
        >
          {{ selectedCountryLabel }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="updateFilter('countryId', null)"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
          </button>
        </span>
        <span
          v-if="filters.isOpenToMentoring !== null"
          class="inline-flex items-center gap-1 px-2 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 text-xs rounded-lg"
        >
          {{ filters.isOpenToMentoring ? 'Ouvert au mentorat' : 'Non disponible' }}
          <button
            class="hover:text-repae-blue-900 dark:hover:text-white cursor-pointer"
            @click="updateFilter('isOpenToMentoring', null)"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
