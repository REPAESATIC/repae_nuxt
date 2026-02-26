<script setup lang="ts">
import type { CategoryItem } from '~/composables/useNewsApi'
import type { ImageVariants } from '~/types/image'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const { createNews, fetchCategories } = useNewsApi()
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
})

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
    toast.error('Erreur', 'Impossible de charger les categories.')
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
    toast.warning('Champ requis', 'Veuillez selectionner une categorie.')
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
      coverImage: coverImageFile.value,
    })
    toast.success('Actualite creee', 'L\'actualite a ete creee avec succes.')
    router.push('/admin/actualites')
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de creer l\'actualite.')
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
          Nouvelle actualite
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Redigez et publiez une nouvelle actualite
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
          placeholder="Titre de l'actualite"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
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
            placeholder="Genere automatiquement depuis le titre"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
            @input="onSlugInput"
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

      <!-- Summary -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Resume
        </label>
        <textarea
          v-model="form.summary"
          rows="3"
          placeholder="Court resume de l'actualite (max 500 caracteres)"
          maxlength="500"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 resize-none transition-all"
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
          label="Contenu de l'actualite"
          placeholder="Redigez le contenu de l'actualite..."
        />
      </div>

      <!-- Actions -->
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
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
        >
          <font-awesome-icon
            :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
            :class="{ 'animate-spin': loading }"
          />
          {{ loading ? 'Creation...' : 'Creer l\'actualite' }}
        </button>
      </div>
    </form>
  </div>
</template>
