<script setup lang="ts">
import type { Disponibilite, NiveauExperience } from '~/data/espace-entreprises/profils-it'
import {
  disponibiliteConfig,
  niveauExperienceConfig,
  competencesDisponibles,
  villesDisponibles,
  promotionsDisponibles
} from '~/data/espace-entreprises/profils-it'

const props = defineProps<{
  selectedDisponibilite: Disponibilite | 'all'
  selectedNiveauExperience: NiveauExperience | 'all'
  selectedCompetences: string[]
  selectedVille: string | 'all'
  selectedPromotion: number | 'all'
}>()

const emit = defineEmits<{
  (e: 'update:selectedDisponibilite', value: Disponibilite | 'all'): void
  (e: 'update:selectedNiveauExperience', value: NiveauExperience | 'all'): void
  (e: 'update:selectedCompetences', value: string[]): void
  (e: 'update:selectedVille', value: string | 'all'): void
  (e: 'update:selectedPromotion', value: number | 'all'): void
  (e: 'reset'): void
}>()

const showCompetencesDropdown = ref(false)
const competenceSearch = ref('')

const filteredCompetences = computed(() => {
  if (!competenceSearch.value) return competencesDisponibles.slice(0, 15)
  return competencesDisponibles.filter(c =>
    c.toLowerCase().includes(competenceSearch.value.toLowerCase())
  )
})

const toggleCompetence = (competence: string) => {
  const newCompetences = props.selectedCompetences.includes(competence)
    ? props.selectedCompetences.filter(c => c !== competence)
    : [...props.selectedCompetences, competence]
  emit('update:selectedCompetences', newCompetences)
}

const removeCompetence = (competence: string) => {
  emit('update:selectedCompetences', props.selectedCompetences.filter(c => c !== competence))
}

const hasActiveFilters = computed(() => {
  return props.selectedDisponibilite !== 'all' ||
    props.selectedNiveauExperience !== 'all' ||
    props.selectedCompetences.length > 0 ||
    props.selectedVille !== 'all' ||
    props.selectedPromotion !== 'all'
})

// Close dropdown when clicking outside
const dropdownRef = ref<HTMLElement | null>(null)
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
      showCompetencesDropdown.value = false
    }
  })
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-filter" class="text-emerald-500" />
        Filtres
      </h3>
      <button
        v-if="hasActiveFilters"
        type="button"
        class="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium cursor-pointer"
        @click="emit('reset')"
      >
        Reinitialiser
      </button>
    </div>

    <div class="space-y-5">
      <!-- Disponibilite -->
      <div>
        <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Disponibilite
        </label>
        <select
          :value="selectedDisponibilite"
          class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          @change="emit('update:selectedDisponibilite', ($event.target as HTMLSelectElement).value as Disponibilite | 'all')"
        >
          <option value="all">Toutes</option>
          <option v-for="(config, key) in disponibiliteConfig" :key="key" :value="key">
            {{ config.label }}
          </option>
        </select>
      </div>

      <!-- Niveau d'experience -->
      <div>
        <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Niveau d'experience
        </label>
        <select
          :value="selectedNiveauExperience"
          class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          @change="emit('update:selectedNiveauExperience', ($event.target as HTMLSelectElement).value as NiveauExperience | 'all')"
        >
          <option value="all">Tous niveaux</option>
          <option v-for="(config, key) in niveauExperienceConfig" :key="key" :value="key">
            {{ config.label }}
          </option>
        </select>
      </div>

      <!-- Competences -->
      <div ref="dropdownRef">
        <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Competences
        </label>

        <!-- Selected competences -->
        <div v-if="selectedCompetences.length > 0" class="flex flex-wrap gap-1.5 mb-2">
          <span
            v-for="comp in selectedCompetences"
            :key="comp"
            class="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs"
          >
            {{ comp }}
            <button
              type="button"
              class="hover:text-emerald-900 dark:hover:text-emerald-200 cursor-pointer"
              @click="removeCompetence(comp)"
            >
              <font-awesome-icon icon="fa-solid fa-times" class="text-[10px]" />
            </button>
          </span>
        </div>

        <!-- Dropdown trigger -->
        <div class="relative">
          <button
            type="button"
            class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-left text-repae-gray-500 dark:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer flex items-center justify-between"
            @click="showCompetencesDropdown = !showCompetencesDropdown"
          >
            <span>{{ selectedCompetences.length > 0 ? 'Ajouter plus...' : 'Selectionner...' }}</span>
            <font-awesome-icon
              icon="fa-solid fa-chevron-down"
              :class="['transition-transform', showCompetencesDropdown ? 'rotate-180' : '']"
            />
          </button>

          <!-- Dropdown -->
          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div
              v-if="showCompetencesDropdown"
              class="absolute z-10 mt-1 w-full bg-white dark:bg-repae-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-repae-gray-700 p-2"
            >
              <input
                v-model="competenceSearch"
                type="text"
                placeholder="Rechercher..."
                class="w-full px-3 py-2 mb-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none"
              />
              <div class="max-h-48 overflow-y-auto space-y-1">
                <button
                  v-for="comp in filteredCompetences"
                  :key="comp"
                  type="button"
                  :class="[
                    'w-full px-3 py-2 text-left text-sm rounded-lg cursor-pointer flex items-center justify-between',
                    selectedCompetences.includes(comp)
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                      : 'text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700'
                  ]"
                  @click="toggleCompetence(comp)"
                >
                  {{ comp }}
                  <font-awesome-icon
                    v-if="selectedCompetences.includes(comp)"
                    icon="fa-solid fa-check"
                    class="text-xs"
                  />
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Ville -->
      <div>
        <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Ville
        </label>
        <select
          :value="selectedVille"
          class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          @change="emit('update:selectedVille', ($event.target as HTMLSelectElement).value)"
        >
          <option value="all">Toutes les villes</option>
          <option v-for="ville in villesDisponibles" :key="ville" :value="ville">
            {{ ville }}
          </option>
        </select>
      </div>

      <!-- Promotion -->
      <div>
        <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Promotion
        </label>
        <select
          :value="selectedPromotion"
          class="w-full px-3 py-2 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-lg text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          @change="emit('update:selectedPromotion', ($event.target as HTMLSelectElement).value === 'all' ? 'all' : Number(($event.target as HTMLSelectElement).value))"
        >
          <option value="all">Toutes les promotions</option>
          <option v-for="promo in promotionsDisponibles" :key="promo" :value="promo">
            Promotion {{ promo }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
