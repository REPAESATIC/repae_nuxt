<script setup lang="ts">
import type { EventItem } from '~/composables/useEventsApi'
import type { CategoryItem } from '~/composables/useNewsApi'
import type { ImageVariants } from '~/types/image'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const { fetchEvent, updateEvent } = useEventsApi()
const { fetchCategories } = useNewsApi()
const toast = useToast()

const eventId = route.params.id as string

// State
const loading = ref(true)
const saving = ref(false)
const categories = ref<CategoryItem[]>([])
const original = ref<EventItem | null>(null)

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
  { value: 'PUBLISHED', label: 'Publie', icon: 'fa-solid fa-globe', class: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
  { value: 'ARCHIVED', label: 'Archive', icon: 'fa-solid fa-box-archive', class: 'border-gray-500 bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400' },
] as const

const rawImageFile = ref<File | null>(null)
const showEditor = ref(false)
const coverImageFile = ref<File | null>(null)
const coverImagePreview = ref<string | null>(null)
const existingImage = ref<string | null>(null)

// Load data
onMounted(async () => {
  try {
    const [eventData, categoriesData] = await Promise.all([
      fetchEvent(eventId),
      fetchCategories(),
    ])

    original.value = eventData
    categories.value = categoriesData.data

    form.title = eventData.title
    form.description = eventData.description
    form.categoryId = eventData.categoryId
    form.locationType = eventData.location.type
    form.locationName = eventData.location.locationName || ''
    form.accessUrl = eventData.location.accessUrl || ''
    form.status = eventData.status

    // Convert ISO date to datetime-local format
    if (eventData.eventDate) {
      const d = new Date(eventData.eventDate)
      const pad = (n: number) => String(n).padStart(2, '0')
      form.eventDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    }

    if (eventData.imageUrl) {
      existingImage.value = eventData.imageUrl
    }
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de charger l\'evenement.')
    router.push('/admin/evenements')
  } finally {
    loading.value = false
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
  existingImage.value = null

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
  existingImage.value = null
}

const currentImage = computed(() => coverImagePreview.value || existingImage.value)

// Submit
const submit = async () => {
  if (!form.title.trim()) {
    toast.warning('Champ requis', 'Le titre est obligatoire.')
    return
  }

  saving.value = true
  try {
    await updateEvent(eventId, {
      title: form.title,
      description: form.description,
      eventDate: form.eventDate ? new Date(form.eventDate).toISOString() : undefined,
      categoryId: form.categoryId,
      locationType: form.locationType,
      locationName: form.locationName || undefined,
      accessUrl: form.accessUrl || undefined,
      status: form.status,
      image: coverImageFile.value,
    })
    toast.success('Evenement mis a jour', 'Les modifications ont ete enregistrees.')
    router.push('/admin/evenements')
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de mettre a jour l\'evenement.')
  } finally {
    saving.value = false
  }
}

// Status display
const statusConfig: Record<string, { label: string; class: string }> = {
  DRAFT: { label: 'Brouillon', class: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400' },
  PUBLISHED: { label: 'Publie', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  ARCHIVED: { label: 'Archive', class: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400' },
}

// Cleanup
onUnmounted(() => {
  if (coverImagePreview.value) {
    URL.revokeObjectURL(coverImagePreview.value)
  }
})
</script>

<template>
  <div class="max-w-4xl">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <template v-else-if="original">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div class="flex items-center gap-4 flex-1 min-w-0">
          <NuxtLink
            to="/admin/evenements"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer shrink-0"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
          </NuxtLink>
          <div class="min-w-0">
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white truncate">
              Modifier l'evenement
            </h2>
            <div class="flex items-center gap-2 mt-1">
              <span
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
                  statusConfig[original.status]?.class || ''
                ]"
              >
                {{ statusConfig[original.status]?.label || original.status }}
              </span>
              <span v-if="original.isFeatured" class="text-xs text-amber-500 font-medium">
                <font-awesome-icon icon="fa-solid fa-star" class="mr-0.5" />
                A la une
              </span>
            </div>
          </div>
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

          <!-- Preview of saved/existing image -->
          <div v-else-if="currentImage" class="relative">
            <img
              :src="currentImage"
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

        <!-- Meta info -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h3 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
            Informations
          </h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-repae-gray-500 dark:text-repae-gray-400">Cree le</span>
              <p class="font-medium text-repae-gray-900 dark:text-white mt-0.5">
                {{ new Date(original.createdAt).toLocaleDateString('fr-FR') }}
              </p>
            </div>
            <div>
              <span class="text-repae-gray-500 dark:text-repae-gray-400">Derniere modification</span>
              <p class="font-medium text-repae-gray-900 dark:text-white mt-0.5">
                {{ new Date(original.updatedAt).toLocaleDateString('fr-FR') }}
              </p>
            </div>
          </div>
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
              :disabled="saving"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
            >
              <font-awesome-icon
                :icon="saving ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
                :class="{ 'animate-spin': saving }"
              />
              {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>
