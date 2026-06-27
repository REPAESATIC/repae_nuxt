<script setup lang="ts">
import type { CategoryItem } from '~/composables/useNewsApi'
import type { ImageVariants } from '~/types/image'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const { createNews, fetchCategories } = useNewsApi()
const { handleAuthError } = useAdminAuth()
const toast = useToast()

// State
const loading = ref(false)
const categories = ref<CategoryItem[]>([])

const form = reactive({
  title: '',
  content: '',
  summary: '',
  slug: '',
  categoryId: '',
  authorId: 'admin-001',
  authorFullName: 'Administrateur REPAE',
  status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
})

const statusOptions = [
  { value: 'DRAFT', label: 'Brouillon', icon: 'fa-solid fa-file-pen', class: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
  { value: 'PUBLISHED', label: 'Publier', icon: 'fa-solid fa-globe', class: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
] as const

// Slug auto-generation
const slugManuallyEdited = ref(false)

const toSlug = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

watch(() => form.title, (title) => {
  if (!slugManuallyEdited.value) {
    form.slug = toSlug(title)
  }
})

const onSlugInput = () => {
  slugManuallyEdited.value = form.slug.length > 0
}

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
    toast.error('Erreur', 'Impossible de charger les catégories.')
  }
})

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
  // Use the high quality variant as cover image
  const ext = 'jpg'
  const file = new File([variants.high], `cover-high.${ext}`, { type: variants.high.type })
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
  if (!form.content.trim()) {
    toast.warning('Champ requis', 'Le contenu est obligatoire.')
    return
  }
  if (!form.categoryId) {
    toast.warning('Champ requis', 'Veuillez sélectionner une catégorie.')
    return
  }

  loading.value = true
  try {
    await createNews({
      title: form.title,
      content: form.content,
      summary: form.summary || undefined,
      slug: form.slug || undefined,
      categoryId: form.categoryId,
      authorId: form.authorId,
      authorFullName: form.authorFullName,
      status: form.status,
      coverImage: coverImageFile.value,
    })
    toast.success('Actualité créée', 'L\'actualité a été créée avec succès.')
    router.push('/admin/actualites')
  } catch (e: any) {
    if (handleAuthError(e)) return
    toast.error('Erreur', e?.data?.message || 'Impossible de créer l\'actualité.')
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
        to="/admin/actualites"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Nouvelle actualité
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Rédigez et publiez une nouvelle actualité
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
          placeholder="Titre de l'actualité"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
        />
      </div>

      <!-- Slug + Category row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Slug
          </label>
          <input
            v-model="form.slug"
            type="text"
            placeholder="Généré automatiquement depuis le titre"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
            @input="onSlugInput"
          />
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Catégorie *
          </label>
          <select
            v-model="form.categoryId"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 cursor-pointer transition-all"
          >
            <option value="" disabled>Sélectionner une catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
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
              class="p-2 rounded-lg bg-repae-blue-500 hover:bg-repae-blue-600 text-white transition-colors cursor-pointer"
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
          class="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-repae-gray-600 hover:border-repae-blue-400 dark:hover:border-repae-blue-500 transition-colors cursor-pointer"
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

      <!-- Summary -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Résumé
        </label>
        <textarea
          v-model="form.summary"
          rows="3"
          placeholder="Court résumé de l'actualité (max 500 caractères)"
          maxlength="500"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 resize-none transition-all"
        />
        <p class="text-xs text-repae-gray-400 mt-1 text-right">
          {{ form.summary.length }}/500
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Contenu *
        </label>
        <UiToastEditor
          v-model="form.content"
          label="Contenu de l'actualité"
          placeholder="Rédigez le contenu de l'actualité..."
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
            to="/admin/actualites"
            class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          >
            Annuler
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-repae-blue-500 hover:bg-repae-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
              :class="{ 'animate-spin': loading }"
            />
            {{ loading ? 'Création...' : 'Créer l\'actualité' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
