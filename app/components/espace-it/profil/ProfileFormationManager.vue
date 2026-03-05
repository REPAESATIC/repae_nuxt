<script setup lang="ts">
import type { Formation } from '@/data/espace-it/formations'
import type { CreateEducationPayload } from '@/composables/useIdentityApi'

const props = defineProps<{
  formations: Formation[]
  alumniId: string
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()

const { createEducation, updateEducation, deleteEducation } = useIdentityApi()
const { monthToIsoDate } = useProfileAdapter()
const toast = useToast()

const showForm = ref(false)
const editingId = ref<string | null>(null)
const isSaving = ref(false)
const deletingId = ref<string | null>(null)

const form = reactive({
  etablissement: '',
  degree: '',
  fieldOfStudy: '',
  lieu: '',
  date_debut: '',
  date_fin: '',
  en_cours: false,
  mention: '',
  description: '',
})

const resetForm = () => {
  form.etablissement = ''
  form.degree = ''
  form.fieldOfStudy = ''
  form.lieu = ''
  form.date_debut = ''
  form.date_fin = ''
  form.en_cours = false
  form.mention = ''
  form.description = ''
  editingId.value = null
  showForm.value = false
}

const openAdd = () => {
  resetForm()
  showForm.value = true
}

const openEdit = (formation: Formation) => {
  // Recuperer degree et fieldOfStudy depuis le diplome combine
  const parts = formation.diplome.split(' - ')
  form.degree = parts[0] || ''
  form.fieldOfStudy = parts[1] || ''
  form.etablissement = formation.etablissement
  form.lieu = formation.lieu
  form.date_debut = formation.date_debut
  form.date_fin = formation.date_fin || ''
  form.en_cours = formation.en_cours || false
  form.mention = formation.mention || ''
  form.description = formation.description || ''
  editingId.value = formation.id
  showForm.value = true
}

const isFormValid = computed(() => {
  return form.etablissement.trim() && form.degree.trim() && form.date_debut
})

const handleSubmit = async () => {
  if (!isFormValid.value) return
  isSaving.value = true

  try {
    const payload = {
      schoolName: form.etablissement.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim() || form.degree.trim(),
      schoolAddress: form.lieu.trim() || undefined,
      startDate: monthToIsoDate(form.date_debut),
      endDate: form.en_cours ? undefined : (form.date_fin ? monthToIsoDate(form.date_fin) : undefined),
      grade: form.mention.trim() || undefined,
      description: form.description.trim() || undefined,
    }

    if (editingId.value) {
      await updateEducation(editingId.value, payload)
      toast.success('Formation mise à jour')
    } else {
      await createEducation({ alumniId: props.alumniId, ...payload } as CreateEducationPayload)
      toast.success('Formation ajoutée')
    }

    resetForm()
    emit('saved')
  } catch (e: any) {
    toast.error(e?.data?.message || 'Erreur lors de la sauvegarde')
  } finally {
    isSaving.value = false
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('Supprimer cette formation ?')) return
  deletingId.value = id

  try {
    await deleteEducation(id)
    toast.success('Formation supprimée')
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
    <!-- Liste des formations existantes -->
    <div
      v-for="formation in formations"
      :key="formation.id"
      class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl"
    >
      <div class="w-10 h-10 rounded-xl bg-repae-blue-100 dark:bg-repae-blue-500/20 flex items-center justify-center flex-shrink-0">
        <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm">
          {{ formation.diplome }}
        </h4>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
          {{ formation.etablissement }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ formation.date_debut }} — {{ formation.en_cours ? 'En cours' : formation.date_fin }}
        </p>
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <button
          class="p-2 text-repae-gray-400 hover:text-repae-blue-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Modifier"
          @click="openEdit(formation)"
        >
          <font-awesome-icon icon="fa-solid fa-pencil-alt" class="text-sm" />
        </button>
        <button
          class="p-2 text-repae-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Supprimer"
          :disabled="deletingId === formation.id"
          @click="handleDelete(formation.id)"
        >
          <font-awesome-icon
            :icon="deletingId === formation.id ? 'fa-solid fa-spinner' : 'fa-solid fa-trash'"
            :class="{ 'animate-spin': deletingId === formation.id }"
            class="text-sm"
          />
        </button>
      </div>
    </div>

    <!-- Bouton Ajouter -->
    <button
      v-if="!showForm"
      class="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-repae-gray-600 rounded-xl text-repae-gray-500 dark:text-repae-gray-400 hover:border-repae-blue-400 hover:text-repae-blue-500 transition-colors cursor-pointer"
      @click="openAdd"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
      <span class="font-brand text-sm font-medium">Ajouter une formation</span>
    </button>

    <!-- Formulaire -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showForm"
        class="bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl p-5 space-y-4 border border-gray-200 dark:border-repae-gray-600"
      >
        <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm">
          {{ editingId ? 'Modifier la formation' : 'Nouvelle formation' }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Etablissement -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Établissement *
            </label>
            <input
              v-model="form.etablissement"
              type="text"
              placeholder="Ex: ESATIC"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Diplome -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Diplôme *
            </label>
            <input
              v-model="form.degree"
              type="text"
              placeholder="Ex: Master"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Domaine d'etude -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Domaine d'étude
            </label>
            <input
              v-model="form.fieldOfStudy"
              type="text"
              placeholder="Ex: Informatique"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Lieu -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Lieu
            </label>
            <input
              v-model="form.lieu"
              type="text"
              placeholder="Ex: Abidjan, Côte d'Ivoire"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Mention -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Mention
            </label>
            <input
              v-model="form.mention"
              type="text"
              placeholder="Ex: Bien"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Date debut -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Date de début *
            </label>
            <input
              v-model="form.date_debut"
              type="month"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Date fin -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Date de fin
            </label>
            <input
              v-model="form.date_fin"
              type="month"
              :disabled="form.en_cours"
              :class="{ 'opacity-50': form.en_cours }"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- En cours -->
          <div class="sm:col-span-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="form.en_cours"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-repae-blue-500 focus:ring-repae-blue-500"
              />
              <span class="text-sm text-repae-gray-700 dark:text-repae-gray-300">En cours</span>
            </label>
          </div>

          <!-- Description -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Décrivez votre formation..."
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button
            class="px-4 py-2 text-sm font-medium text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-800 dark:hover:text-repae-gray-200 transition-colors cursor-pointer"
            @click="resetForm"
          >
            Annuler
          </button>
          <button
            class="px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            :disabled="!isFormValid || isSaving"
            @click="handleSubmit"
          >
            <font-awesome-icon
              :icon="isSaving ? 'fa-solid fa-spinner' : 'fa-solid fa-check'"
              :class="{ 'animate-spin': isSaving }"
            />
            {{ editingId ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
