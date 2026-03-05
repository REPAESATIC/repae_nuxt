<script setup lang="ts">
import type { ProjetPortfolio } from '@/data/espace-it/portfolio'
import type { CreateProjectPayload } from '@/composables/useIdentityApi'

const props = defineProps<{
  projets: ProjetPortfolio[]
  alumniId: string
}>()

const emit = defineEmits<{
  (e: 'saved'): void
}>()

const { createProject, updateProject, deleteProject } = useIdentityApi()
const { monthToIsoDate } = useProfileAdapter()
const toast = useToast()

const showForm = ref(false)
const editingId = ref<string | null>(null)
const isSaving = ref(false)
const deletingId = ref<string | null>(null)

const form = reactive({
  titre: '',
  description: '',
  client: '',
  date_realisation: '',
  url_demo: '',
  imageFile: null as File | null,
})

const resetForm = () => {
  form.titre = ''
  form.description = ''
  form.client = ''
  form.date_realisation = ''
  form.url_demo = ''
  form.imageFile = null
  editingId.value = null
  showForm.value = false
}

const openAdd = () => {
  resetForm()
  showForm.value = true
}

const openEdit = (projet: ProjetPortfolio) => {
  form.titre = projet.titre
  form.description = projet.description
  form.client = projet.client || ''
  form.date_realisation = projet.date_realisation
  form.url_demo = projet.url_demo || ''
  form.imageFile = null
  editingId.value = projet.id
  showForm.value = true
}

const isFormValid = computed(() => {
  return form.titre.trim() && form.description.trim()
})

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    form.imageFile = input.files[0]
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) return
  isSaving.value = true

  try {
    const hasFile = form.imageFile !== null

    if (hasFile) {
      // FormData pour l'upload d'image
      const formData = new FormData()
      if (!editingId.value) {
        formData.append('alumniId', props.alumniId)
      }
      formData.append('title', form.titre.trim())
      formData.append('description', form.description.trim())
      if (form.client.trim()) formData.append('client', form.client.trim())
      if (form.date_realisation) formData.append('endDate', monthToIsoDate(form.date_realisation))
      if (form.url_demo.trim()) formData.append('projectUrl', form.url_demo.trim())
      formData.append('file', form.imageFile!)

      if (editingId.value) {
        await updateProject(editingId.value, formData)
        toast.success('Projet mis à jour')
      } else {
        await createProject(formData)
        toast.success('Projet ajouté')
      }
    } else {
      // JSON sans fichier
      const payload = {
        title: form.titre.trim(),
        description: form.description.trim(),
        client: form.client.trim() || undefined,
        endDate: form.date_realisation ? monthToIsoDate(form.date_realisation) : undefined,
        projectUrl: form.url_demo.trim() || undefined,
      }

      if (editingId.value) {
        await updateProject(editingId.value, payload)
        toast.success('Projet mis à jour')
      } else {
        await createProject({ alumniId: props.alumniId, ...payload } as CreateProjectPayload)
        toast.success('Projet ajouté')
      }
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
  if (!confirm('Supprimer ce projet ?')) return
  deletingId.value = id

  try {
    await deleteProject(id)
    toast.success('Projet supprimé')
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
    <!-- Liste des projets existants -->
    <div
      v-for="projet in projets"
      :key="projet.id"
      class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-repae-gray-700/50 rounded-xl"
    >
      <!-- Image miniature -->
      <div class="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-repae-gray-600">
        <img
          v-if="projet.image_url"
          :src="projet.image_url"
          :alt="projet.titre"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-layer-group" class="text-repae-gray-400" />
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold font-brand text-repae-gray-900 dark:text-white text-sm line-clamp-1">
          {{ projet.titre }}
        </h4>
        <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400 line-clamp-1">
          {{ projet.description }}
        </p>
        <p v-if="projet.client" class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ projet.client }}
        </p>
      </div>
      <div class="flex items-center gap-1 flex-shrink-0">
        <button
          class="p-2 text-repae-gray-400 hover:text-repae-blue-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Modifier"
          @click="openEdit(projet)"
        >
          <font-awesome-icon icon="fa-solid fa-pencil-alt" class="text-sm" />
        </button>
        <button
          class="p-2 text-repae-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-lg hover:bg-white dark:hover:bg-repae-gray-700"
          title="Supprimer"
          :disabled="deletingId === projet.id"
          @click="handleDelete(projet.id)"
        >
          <font-awesome-icon
            :icon="deletingId === projet.id ? 'fa-solid fa-spinner' : 'fa-solid fa-trash'"
            :class="{ 'animate-spin': deletingId === projet.id }"
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
      <span class="font-brand text-sm font-medium">Ajouter un projet</span>
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
          {{ editingId ? 'Modifier le projet' : 'Nouveau projet' }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Titre -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Titre *
            </label>
            <input
              v-model="form.titre"
              type="text"
              placeholder="Ex: Application de gestion"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Description -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Description *
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Décrivez le projet..."
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <!-- Client -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Client
            </label>
            <input
              v-model="form.client"
              type="text"
              placeholder="Ex: Banque Populaire"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Date de réalisation
            </label>
            <input
              v-model="form.date_realisation"
              type="month"
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- URL demo -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              URL du projet
            </label>
            <input
              v-model="form.url_demo"
              type="url"
              placeholder="https://..."
              class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Image -->
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1">
              Image du projet
            </label>
            <input
              type="file"
              accept="image/*"
              class="w-full text-sm text-repae-gray-600 dark:text-repae-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-repae-blue-100 file:text-repae-blue-700 dark:file:bg-repae-blue-500/20 dark:file:text-repae-blue-400 hover:file:bg-repae-blue-200 file:cursor-pointer"
              @change="handleFileChange"
            />
            <p v-if="form.imageFile" class="text-xs text-repae-gray-500 mt-1">
              {{ form.imageFile.name }}
            </p>
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
