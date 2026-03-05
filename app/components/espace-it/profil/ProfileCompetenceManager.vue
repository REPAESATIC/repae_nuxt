<script setup lang="ts">
import type { Competence } from '@/data/espace-it/competences'
import { niveauConfig } from '@/data/espace-it/competences'
import type { SkillCatalogItem } from '@/composables/useIdentityApi'

const props = defineProps<{
  competences: Competence[]
  alumniId: string
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()

const { fetchSkillsCatalog, addAlumniSkill, updateAlumniSkill, deleteAlumniSkill } = useIdentityApi()
const { niveauFrToApi, levelMap } = useProfileAdapter()
const toast = useToast()

const searchQuery = ref('')
const skillsCatalog = ref<SkillCatalogItem[]>([])
const isLoadingCatalog = ref(false)
const isSaving = ref(false)
const deletingId = ref<string | null>(null)
const updatingId = ref<string | null>(null)
const showSearch = ref(false)
const selectedSkill = ref<SkillCatalogItem | null>(null)
const selectedLevel = ref<string>('INTERMEDIATE')

const levelOptions = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'INTERMEDIATE', label: 'Intermédiaire' },
  { value: 'ADVANCED', label: 'Avancé' },
  { value: 'EXPERT', label: 'Expert' },
]

// Charger le catalogue au montage
onMounted(async () => {
  isLoadingCatalog.value = true
  try {
    skillsCatalog.value = await fetchSkillsCatalog()
  } catch {
    toast.error('Impossible de charger le catalogue de compétences')
  } finally {
    isLoadingCatalog.value = false
  }
})

// Suggestions filtrees
const suggestions = computed(() => {
  if (searchQuery.value.length < 2) return []
  const query = searchQuery.value.toLowerCase()
  return skillsCatalog.value
    .filter(s =>
      s.name.toLowerCase().includes(query) &&
      !props.competences.some(c => c.nom === s.name)
    )
    .slice(0, 8)
})

const selectSkill = (skill: SkillCatalogItem) => {
  selectedSkill.value = skill
  searchQuery.value = skill.name
}

const cancelSelection = () => {
  selectedSkill.value = null
  searchQuery.value = ''
  selectedLevel.value = 'INTERMEDIATE'
  showSearch.value = false
}

const handleAdd = async () => {
  if (!selectedSkill.value) return
  isSaving.value = true

  try {
    await addAlumniSkill(props.alumniId, selectedSkill.value.id, selectedLevel.value)
    toast.success('Compétence ajoutée')
    cancelSelection()
    emit('saved')
  } catch (e: any) {
    toast.error(e?.data?.message || 'Erreur lors de l\'ajout')
  } finally {
    isSaving.value = false
  }
}

const handleUpdateLevel = async (competence: Competence, newNiveauFr: string) => {
  updatingId.value = competence.id

  try {
    const apiLevel = niveauFrToApi[newNiveauFr]
    if (!apiLevel) return
    await updateAlumniSkill(props.alumniId, competence.id, apiLevel)
    toast.success('Niveau mis à jour')
    emit('saved')
  } catch {
    toast.error('Erreur lors de la mise à jour')
  } finally {
    updatingId.value = null
  }
}

const handleDelete = async (competence: Competence) => {
  if (!confirm(`Supprimer la compétence "${competence.nom}" ?`)) return
  deletingId.value = competence.id

  try {
    await deleteAlumniSkill(props.alumniId, competence.id)
    toast.success('Compétence supprimée')
    emit('saved')
  } catch {
    toast.error('Erreur lors de la suppression')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Liste des competences existantes -->
    <div v-if="competences.length > 0" class="space-y-2">
      <div
        v-for="comp in competences"
        :key="comp.id"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl"
      >
        <div class="flex-1 min-w-0">
          <span class="font-medium font-brand text-sm text-repae-gray-900 dark:text-white">
            {{ comp.nom }}
          </span>
        </div>

        <!-- Select niveau inline -->
        <select
          :value="comp.niveau"
          :disabled="updatingId === comp.id"
          class="px-2 py-1 text-xs rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-700 dark:text-repae-gray-300 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none cursor-pointer"
          @change="handleUpdateLevel(comp, ($event.target as HTMLSelectElement).value)"
        >
          <option value="debutant">Débutant</option>
          <option value="intermediaire">Intermédiaire</option>
          <option value="avance">Avancé</option>
          <option value="expert">Expert</option>
        </select>

        <!-- Supprimer -->
        <button
          class="p-1.5 text-repae-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Supprimer"
          :disabled="deletingId === comp.id"
          @click="handleDelete(comp)"
        >
          <font-awesome-icon
            :icon="deletingId === comp.id ? 'fa-solid fa-spinner' : 'fa-solid fa-trash'"
            :class="{ 'animate-spin': deletingId === comp.id }"
            class="text-sm"
          />
        </button>
      </div>
    </div>

    <div v-else class="text-center py-4">
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        Aucune compétence ajoutée
      </p>
    </div>

    <!-- Bouton Ajouter -->
    <button
      v-if="!showSearch"
      class="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-repae-gray-600 rounded-xl text-repae-gray-500 dark:text-repae-gray-400 hover:border-repae-blue-400 hover:text-repae-blue-500 transition-colors cursor-pointer"
      @click="showSearch = true"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
      <span class="font-brand text-sm font-medium">Ajouter une compétence</span>
    </button>

    <!-- Zone de recherche -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showSearch"
        class="bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl p-5 space-y-4 border border-gray-200 dark:border-repae-gray-600"
      >
        <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm">
          Ajouter une compétence
        </h4>

        <!-- Chargement du catalogue -->
        <div v-if="isLoadingCatalog" class="flex items-center gap-2 text-sm text-repae-gray-500">
          <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin" />
          Chargement du catalogue...
        </div>

        <template v-else>
          <!-- Input de recherche -->
          <div v-if="!selectedSkill" class="relative">
            <div class="relative">
              <font-awesome-icon
                icon="fa-solid fa-magnifying-glass"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-repae-gray-400 text-sm"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une compétence..."
                class="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Suggestions -->
            <div
              v-if="suggestions.length > 0"
              class="mt-2 bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-600 rounded-lg overflow-hidden"
            >
              <button
                v-for="skill in suggestions"
                :key="skill.id"
                class="w-full text-left px-3 py-2 text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 hover:text-repae-blue-600 dark:hover:text-repae-blue-400 transition-colors cursor-pointer border-b border-gray-100 dark:border-repae-gray-700 last:border-b-0"
                @click="selectSkill(skill)"
              >
                {{ skill.name }}
              </button>
            </div>

            <p
              v-else-if="searchQuery.length >= 2"
              class="mt-2 text-xs text-repae-gray-500 dark:text-repae-gray-400"
            >
              Aucune compétence trouvée pour "{{ searchQuery }}"
            </p>
          </div>

          <!-- Skill selectionnee - choisir le niveau -->
          <div v-else class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-repae-blue-100 dark:bg-repae-blue-500/20 text-repae-blue-700 dark:text-repae-blue-300 rounded-lg text-sm font-medium">
                {{ selectedSkill.name }}
              </span>
              <button
                class="text-repae-gray-400 hover:text-repae-gray-600 cursor-pointer"
                @click="selectedSkill = null; searchQuery = ''"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
                Niveau
              </label>
              <select
                v-model="selectedLevel"
                class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none cursor-pointer"
              >
                <option
                  v-for="opt in levelOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>
        </template>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button
            class="px-4 py-2 text-sm font-medium text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-800 dark:hover:text-repae-gray-200 transition-colors cursor-pointer"
            @click="cancelSelection"
          >
            Annuler
          </button>
          <button
            v-if="selectedSkill"
            class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="isSaving"
            @click="handleAdd"
          >
            <font-awesome-icon
              :icon="isSaving ? 'fa-solid fa-spinner' : 'fa-solid fa-check'"
              :class="{ 'animate-spin': isSaving }"
            />
            Ajouter
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
