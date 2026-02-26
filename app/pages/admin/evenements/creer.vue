<script setup lang="ts">
import type { CategoryItem } from '~/composables/useNewsApi'
import type { ImageVariants } from '~/types/image'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const { createEvent } = useEventsApi()
const { fetchCategories } = useNewsApi()
const toast = useToast()

// State
const loading = ref(false)
const categories = ref<CategoryItem[]>([])

const form = reactive({
  title: '',
  description: '',
  eventDate: '',
  categoryId: '',
  locationType: 'PHYSICAL' as 'PHYSICAL' | 'ONLINE',
  locationName: '',
  accessUrl: '',
  status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
})

const statusOptions = [
  { value: 'DRAFT', label: 'Brouillon', icon: 'fa-solid fa-file-pen', class: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
  { value: 'PUBLISHED', label: 'Publier', icon: 'fa-solid fa-globe', class: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
] as const

// Image state
const rawImageFile = ref<File | null>(null)
const showEditor = ref(false)
const coverImageFile = ref<File | null>(null)
const coverImagePreview = ref<string | null>(null)

// Load categories
onMounted(async () => {
  try {
    const result = await fetchCategories()
    categories.value = result.data
  } catch {
    toast.error('Erreur', 'Impossible de charger les categories.')
  }
})

// Dynamic labels based on location type
const locationNameLabel = computed(() =>
  form.locationType === 'ONLINE' ? 'Plateforme' : 'Lieu',
)

const locationNamePlaceholder = computed(() =>
  form.locationType === 'ONLINE' ? 'Ex: Zoom, Google Meet, Teams...' : 'Ex: ESATIC Campus — Abidjan',
)

const accessUrlPlaceholder = computed(() =>
  form.locationType === 'ONLINE' ? 'https://zoom.us/j/...' : 'https://maps.google.com/...',
)

const accessUrlLabel = computed(() =>
  form.locationType === 'ONLINE' ? 'Lien de la reunion' : 'Lien Google Maps',
)

// Image handling
const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    rawImageFile.value = file
    showEditor.value = true
  }
  target.value = ''
}

const onEditorSave = (variants: ImageVariants) => {
  const ext = 'jpg'
  const file = new File([variants.high], `event-cover.${ext}`, { type: variants.high.type })
  coverImageFile.value = file

  if (coverImagePreview.value) URL.revokeObjectURL(coverImagePreview.value)
  coverImagePreview.value = URL.createObjectURL(variants.high)

  showEditor.value = false
  rawImageFile.value = null
}

const onEditorCancel = () => {
  showEditor.value = false
  rawImageFile.value = null
}

const removeImage = () => {
  coverImageFile.value = null
  if (coverImagePreview.value) {
    URL.revokeObjectURL(coverImagePreview.value)
    coverImagePreview.value = null
  }
}

// Submit
const submit = async () => {
  if (!form.title.trim()) {
    toast.warning('Champ requis', 'Le titre est obligatoire.')
    return
  }
  if (!form.description.trim()) {
    toast.warning('Champ requis', 'La description est obligatoire.')
    return
  }
  if (!form.eventDate) {
    toast.warning('Champ requis', 'La date de l\'evenement est obligatoire.')
    return
  }
  if (!form.categoryId) {
    toast.warning('Champ requis', 'Veuillez selectionner une categorie.')
    return
  }
  if (form.locationType === 'PHYSICAL' && !form.locationName.trim()) {
    toast.warning('Champ requis', 'Le lieu est obligatoire pour un evenement en presentiel.')
    return
  }
  if (form.locationType === 'ONLINE' && !form.accessUrl.trim()) {
    toast.warning('Champ requis', 'Le lien de la reunion est obligatoire pour un evenement en ligne.')
    return
  }

  loading.value = true
  try {
    await createEvent({
      title: form.title,
      description: form.description,
      eventDate: new Date(form.eventDate).toISOString(),
      categoryId: form.categoryId,
      locationType: form.locationType,
      locationName: form.locationName || undefined,
      accessUrl: form.accessUrl || undefined,
      status: form.status,
      image: coverImageFile.value,
    })
    toast.success('Evenement cree', 'L\'evenement a ete cree avec succes.')
    router.push('/admin/evenements')
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de creer l\'evenement.')
  } finally {
    loading.value = false
  }
}

// Cleanup
onUnmounted(() => {
  if (coverImagePreview.value) URL.revokeObjectURL(coverImagePreview.value)
})
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink
        to="/admin/evenements"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Nouvel evenement
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Creez et planifiez un nouvel evenement
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submit" class="space-y-6">
      <!-- Title -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Titre *
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Titre de l'evenement"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Date + Category row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Date de l'evenement *
          </label>
          <input
            v-model="form.eventDate"
            type="datetime-local"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer transition-all"
          />
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Categorie *
          </label>
          <select
            v-model="form.categoryId"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer transition-all"
          >
            <option value="" disabled>Selectionner une categorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Location section -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6 space-y-4">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
          Localisation *
        </label>

        <!-- Location type -->
        <div class="flex gap-3">
          <button
            type="button"
            :class="[
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold font-brand text-sm transition-all cursor-pointer',
              form.locationType === 'PHYSICAL'
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
                : 'border-gray-200 dark:border-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 hover:border-gray-300 dark:hover:border-repae-gray-600'
            ]"
            @click="form.locationType = 'PHYSICAL'"
          >
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            Presentiel
          </button>
          <button
            type="button"
            :class="[
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold font-brand text-sm transition-all cursor-pointer',
              form.locationType === 'ONLINE'
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
                : 'border-gray-200 dark:border-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 hover:border-gray-300 dark:hover:border-repae-gray-600'
            ]"
            @click="form.locationType = 'ONLINE'"
          >
            <font-awesome-icon icon="fa-solid fa-globe" />
            En ligne
          </button>
        </div>

        <!-- Location name -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
            {{ locationNameLabel }} *
          </label>
          <input
            v-model="form.locationName"
            type="text"
            :placeholder="locationNamePlaceholder"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>

        <!-- Access URL -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
            {{ accessUrlLabel }}
          </label>
          <input
            v-model="form.accessUrl"
            type="url"
            :placeholder="accessUrlPlaceholder"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      <!-- Cover Image -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Image de couverture
        </label>

        <!-- Image Editor -->
        <ImageEditor
          v-if="showEditor && rawImageFile"
          :image-file="rawImageFile"
          :aspect-ratio="16 / 9"
          @save="onEditorSave"
          @cancel="onEditorCancel"
        />

        <!-- Preview of saved image -->
        <div v-else-if="coverImagePreview" class="relative">
          <img
            :src="coverImagePreview"
            alt="Couverture"
            class="w-full h-48 object-cover rounded-xl"
          />
          <div class="absolute top-2 right-2 flex gap-2">
            <label
              class="p-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-pen" class="text-sm" />
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onFileSelect"
              />
            </label>
            <button
              type="button"
              class="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
              @click="removeImage"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="text-sm" />
            </button>
          </div>
        </div>

        <!-- Upload zone -->
        <label
          v-else
          class="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-repae-gray-600 hover:border-violet-400 dark:hover:border-violet-500 transition-colors cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="text-2xl text-repae-gray-400 mb-2" />
          <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
            Cliquez pour ajouter une image
          </span>
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileSelect"
          />
        </label>
      </div>

      <!-- Description (TOAST UI Editor) -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Description *
        </label>
        <UiToastEditor
          v-model="form.description"
          label="Description de l'evenement"
          placeholder="Decrivez l'evenement en detail..."
        />
      </div>

      <!-- Status + Actions -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
          Statut de publication
        </label>
        <div class="flex gap-3 mb-6">
          <button
            v-for="opt in statusOptions"
            :key="opt.value"
            type="button"
            :class="[
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold font-brand text-sm transition-all cursor-pointer',
              form.status === opt.value
                ? opt.class
                : 'border-gray-200 dark:border-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 hover:border-gray-300 dark:hover:border-repae-gray-600'
            ]"
            @click="form.status = opt.value"
          >
            <font-awesome-icon :icon="opt.icon" />
            {{ opt.label }}
          </button>
        </div>

        <div class="flex items-center justify-end gap-3">
          <NuxtLink
            to="/admin/evenements"
            class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          >
            Annuler
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
              :class="{ 'animate-spin': loading }"
            />
            {{ loading ? 'Creation...' : 'Creer l\'evenement' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
