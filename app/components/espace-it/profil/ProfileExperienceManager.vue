<script setup lang="ts">
import type { Experience } from '@/data/espace-it/experiences'
import type { CreateWorkExperiencePayload } from '@/composables/useIdentityApi'

const props = defineProps<{
  experiences: Experience[]
  alumniId: string
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()

const { createWorkExperience, updateWorkExperience, deleteWorkExperience } = useIdentityApi()
const { contratFrToApi, monthToIsoDate } = useProfileAdapter()
const toast = useToast()

const showForm = ref(false)
const editingId = ref<string | null>(null)
const isSaving = ref(false)
const deletingId = ref<string | null>(null)

const contratOptions = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'Stage', label: 'Stage' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Consultant', label: 'Consultant' },
]

const form = reactive({
  poste: '',
  entreprise: '',
  lieu: '',
  type_contrat: 'CDI',
  date_debut: '',
  date_fin: '',
  en_cours: false,
  description: '',
})

const resetForm = () => {
  form.poste = ''
  form.entreprise = ''
  form.lieu = ''
  form.type_contrat = 'CDI'
  form.date_debut = ''
  form.date_fin = ''
  form.en_cours = false
  form.description = ''
  editingId.value = null
  showForm.value = false
}

const openAdd = () => {
  resetForm()
  showForm.value = true
}

const openEdit = (exp: Experience) => {
  form.poste = exp.poste
  form.entreprise = exp.entreprise
  form.lieu = exp.lieu
  form.type_contrat = exp.type_contrat
  form.date_debut = exp.date_debut
  form.date_fin = exp.date_fin || ''
  form.en_cours = exp.en_cours || false
  form.description = exp.description
  editingId.value = exp.id
  showForm.value = true
}

const isFormValid = computed(() => {
  return form.poste.trim() && form.entreprise.trim() && form.date_debut
})

const handleSubmit = async () => {
  if (!isFormValid.value) return
  isSaving.value = true

  try {
    const payload = {
      companyName: form.entreprise.trim(),
      position: form.poste.trim(),
      location: form.lieu.trim() || undefined,
      contractType: contratFrToApi[form.type_contrat] || 'CDI',
      startDate: monthToIsoDate(form.date_debut),
      endDate: form.en_cours ? undefined : (form.date_fin ? monthToIsoDate(form.date_fin) : undefined),
      description: form.description.trim() || undefined,
    }

    if (editingId.value) {
      await updateWorkExperience(editingId.value, payload)
      toast.success('Expérience mise à jour')
    } else {
      await createWorkExperience({ alumniId: props.alumniId, ...payload } as CreateWorkExperiencePayload)
      toast.success('Expérience ajoutée')
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
  if (!confirm('Supprimer cette expérience ?')) return
  deletingId.value = id

  try {
    await deleteWorkExperience(id)
    toast.success('Expérience supprimée')
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
    <!-- Liste des experiences existantes -->
    <div
      v-for="exp in experiences"
      :key="exp.id"
      class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl"
    >
      <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-green-600 dark:text-green-400" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm">
            {{ exp.poste }}
          </h4>
          <span
            v-if="exp.en_cours"
            class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
          >
            <span class="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            En cours
          </span>
        </div>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
          {{ exp.entreprise }} · {{ exp.type_contrat }}
        </p>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ exp.date_debut }} — {{ exp.en_cours ? 'Présent' : exp.date_fin }}
        </p>
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <button
          class="p-2 text-repae-gray-400 hover:text-repae-blue-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Modifier"
          @click="openEdit(exp)"
        >
          <font-awesome-icon icon="fa-solid fa-pencil-alt" class="text-sm" />
        </button>
        <button
          class="p-2 text-repae-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Supprimer"
          :disabled="deletingId === exp.id"
          @click="handleDelete(exp.id)"
        >
          <font-awesome-icon
            :icon="deletingId === exp.id ? 'fa-solid fa-spinner' : 'fa-solid fa-trash'"
            :class="{ 'animate-spin': deletingId === exp.id }"
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
      <span class="font-brand text-sm font-medium">Ajouter une expérience</span>
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
          {{ editingId ? 'Modifier l\'expérience' : 'Nouvelle expérience' }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Poste -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Poste *
            </label>
            <input
              v-model="form.poste"
              type="text"
              placeholder="Ex: Développeur Full Stack"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Entreprise -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Entreprise *
            </label>
            <input
              v-model="form.entreprise"
              type="text"
              placeholder="Ex: Orange CI"
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

          <!-- Type contrat -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Type de contrat
            </label>
            <select
              v-model="form.type_contrat"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none cursor-pointer"
            >
              <option
                v-for="opt in contratOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
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
              <span class="text-sm text-repae-gray-700 dark:text-repae-gray-300">Poste actuel</span>
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
              placeholder="Décrivez vos missions..."
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
