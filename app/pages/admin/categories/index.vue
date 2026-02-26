<script setup lang="ts">
import type { CategoryItem } from '~/composables/useNewsApi'

definePageMeta({
  layout: 'admin',
})

const { fetchCategories, createCategory, updateCategory } = useNewsApi()
const toast = useToast()

// State
const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const saving = ref(false)

// Modal state
const showModal = ref(false)
const editingCategory = ref<CategoryItem | null>(null)

const form = reactive({
  name: '',
  slug: '',
  hexColor: '#000000',
  bgHexColor: '#FFFFFF',
})

// Load
const loadCategories = async () => {
  loading.value = true
  try {
    const result = await fetchCategories()
    categories.value = result.data
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de charger les categories.')
  } finally {
    loading.value = false
  }
}

onMounted(loadCategories)

// Modal
const openCreate = () => {
  editingCategory.value = null
  form.name = ''
  form.slug = ''
  form.hexColor = '#000000'
  form.bgHexColor = '#FFFFFF'
  showModal.value = true
}

const openEdit = (cat: CategoryItem) => {
  editingCategory.value = cat
  form.name = cat.name
  form.slug = cat.slug
  form.hexColor = cat.hexColor
  form.bgHexColor = cat.bgHexColor
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCategory.value = null
}

// Submit
const submit = async () => {
  if (!form.name.trim()) {
    toast.warning('Champ requis', 'Le nom est obligatoire.')
    return
  }

  saving.value = true
  try {
    if (editingCategory.value) {
      await updateCategory(editingCategory.value.id, {
        name: form.name,
        slug: form.slug || undefined,
        hexColor: form.hexColor,
        bgHexColor: form.bgHexColor,
      })
      toast.success('Categorie modifiee', `"${form.name}" a ete mise a jour.`)
    } else {
      await createCategory({
        name: form.name,
        slug: form.slug || undefined,
        hexColor: form.hexColor,
        bgHexColor: form.bgHexColor,
      })
      toast.success('Categorie creee', `"${form.name}" a ete ajoutee.`)
    }
    closeModal()
    await loadCategories()
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de sauvegarder la categorie.')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Categories
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Gerez les categories du contenu (actualites, evenements)
        </p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
        @click="openCreate"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvelle categorie
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="categories.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-tag" class="text-violet-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune categorie
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        Creez votre premiere categorie pour organiser votre contenu.
      </p>
      <button
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
        @click="openCreate"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Creer une categorie
      </button>
    </div>

    <!-- Categories grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <!-- Color preview -->
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold"
            :style="{ backgroundColor: cat.bgHexColor, color: cat.hexColor }"
          >
            {{ cat.name }}
          </div>
          <button
            class="p-2 rounded-lg text-repae-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
            @click="openEdit(cat)"
          >
            <font-awesome-icon icon="fa-solid fa-pen" class="text-sm" />
          </button>
        </div>

        <div class="space-y-1.5 text-xs text-repae-gray-500 dark:text-repae-gray-400">
          <p>
            <span class="font-medium text-repae-gray-600 dark:text-repae-gray-300">Slug :</span>
            {{ cat.slug }}
          </p>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5">
              <span
                class="inline-block w-4 h-4 rounded border border-gray-200 dark:border-repae-gray-600"
                :style="{ backgroundColor: cat.hexColor }"
              />
              <span>{{ cat.hexColor }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span
                class="inline-block w-4 h-4 rounded border border-gray-200 dark:border-repae-gray-600"
                :style="{ backgroundColor: cat.bgHexColor }"
              />
              <span>{{ cat.bgHexColor }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="closeModal"
          />

          <!-- Modal content -->
          <div class="relative w-full max-w-lg bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-repae-gray-700">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-repae-gray-700">
              <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ editingCategory ? 'Modifier la categorie' : 'Nouvelle categorie' }}
              </h3>
              <button
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
                @click="closeModal"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" class="text-repae-gray-400" />
              </button>
            </div>

            <!-- Body -->
            <form @submit.prevent="submit" class="p-6 space-y-5">
              <!-- Name -->
              <div>
                <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Nom *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ex: Technologie"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                />
              </div>

              <!-- Slug -->
              <div>
                <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Slug
                </label>
                <input
                  v-model="form.slug"
                  type="text"
                  placeholder="Genere automatiquement si vide"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                />
              </div>

              <!-- Colors -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                    Couleur texte
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="form.hexColor"
                      type="color"
                      class="w-10 h-10 rounded-lg border border-gray-200 dark:border-repae-gray-700 cursor-pointer"
                    />
                    <input
                      v-model="form.hexColor"
                      type="text"
                      maxlength="7"
                      class="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                    Couleur fond
                  </label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="form.bgHexColor"
                      type="color"
                      class="w-10 h-10 rounded-lg border border-gray-200 dark:border-repae-gray-700 cursor-pointer"
                    />
                    <input
                      v-model="form.bgHexColor"
                      type="text"
                      maxlength="7"
                      class="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Preview -->
              <div>
                <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Apercu
                </label>
                <div
                  class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold"
                  :style="{ backgroundColor: form.bgHexColor, color: form.hexColor }"
                >
                  {{ form.name || 'Categorie' }}
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  class="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
                  @click="closeModal"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="saving"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
                >
                  <font-awesome-icon
                    :icon="saving ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
                    :class="{ 'animate-spin': saving }"
                  />
                  {{ saving ? 'Enregistrement...' : (editingCategory ? 'Modifier' : 'Creer') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
