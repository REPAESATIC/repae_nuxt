<script setup lang="ts">
import type { PromotionItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const { fetchPromotions, createPromotion, updatePromotion } = useIdentityApi()
const toast = useToast()

// State
const promotions = ref<PromotionItem[]>([])
const loading = ref(true)
const saving = ref(false)

// Modal state
const showModal = ref(false)
const editingPromotion = ref<PromotionItem | null>(null)

const form = reactive({
  year: new Date().getFullYear(),
  nickname: '',
})

// Load
const loadPromotions = async () => {
  loading.value = true
  try {
    const result = await fetchPromotions()
    promotions.value = result.data
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de charger les promotions.')
  } finally {
    loading.value = false
  }
}

onMounted(loadPromotions)

// Modal
const openCreate = () => {
  editingPromotion.value = null
  form.year = new Date().getFullYear()
  form.nickname = ''
  showModal.value = true
}

const openEdit = (promo: PromotionItem) => {
  editingPromotion.value = promo
  form.year = promo.year
  form.nickname = promo.nickname || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingPromotion.value = null
}

// Submit
const submit = async () => {
  if (!form.year || form.year < 1900 || form.year > 2100) {
    toast.warning('Annee invalide', 'L\'annee doit etre entre 1900 et 2100.')
    return
  }

  saving.value = true
  try {
    if (editingPromotion.value) {
      await updatePromotion(editingPromotion.value.id, {
        year: form.year,
        nickname: form.nickname.trim() || null,
      })
      toast.success('Promotion modifiee', `La promotion ${form.year} a ete mise a jour.`)
    } else {
      await createPromotion({
        year: form.year,
        nickname: form.nickname.trim() || undefined,
      })
      toast.success('Promotion creee', `La promotion ${form.year} a ete ajoutee.`)
    }
    closeModal()
    await loadPromotions()
  } catch (e: any) {
    const status = e?.response?.status || e?.statusCode
    if (status === 409) {
      toast.error('Conflit', `Une promotion avec l'annee ${form.year} existe deja.`)
    } else {
      toast.error('Erreur', e?.data?.message || 'Impossible de sauvegarder la promotion.')
    }
  } finally {
    saving.value = false
  }
}

// Helpers
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Promotions
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Gerez les promotions de l'ESATIC (annee, surnom)
        </p>
      </div>
      <button
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
        @click="openCreate"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Nouvelle promotion
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="promotions.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-flag" class="text-violet-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune promotion
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        Creez votre premiere promotion pour les alumni.
      </p>
      <button
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
        @click="openCreate"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        Creer une promotion
      </button>
    </div>

    <!-- Promotions grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="promo in promotions"
        :key="promo.id"
        class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
              <span class="text-sm font-bold font-brand text-violet-600 dark:text-violet-400">
                {{ promo.year }}
              </span>
            </div>
            <div>
              <p class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white">
                Promotion {{ promo.year }}
              </p>
              <p v-if="promo.nickname" class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
                « {{ promo.nickname }} »
              </p>
            </div>
          </div>
          <button
            class="p-2 rounded-lg text-repae-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
            @click="openEdit(promo)"
          >
            <font-awesome-icon icon="fa-solid fa-pen" class="text-sm" />
          </button>
        </div>

        <div class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
          <span class="font-medium text-repae-gray-600 dark:text-repae-gray-300">Creee le :</span>
          {{ formatDate(promo.createdAt) }}
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
          class="fixed inset-0 z-60 flex items-center justify-center p-4"
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
                {{ editingPromotion ? 'Modifier la promotion' : 'Nouvelle promotion' }}
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
              <!-- Year -->
              <div>
                <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Annee *
                </label>
                <input
                  v-model.number="form.year"
                  type="number"
                  min="1900"
                  max="2100"
                  required
                  placeholder="Ex: 2024"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                />
              </div>

              <!-- Nickname -->
              <div>
                <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Surnom
                </label>
                <input
                  v-model="form.nickname"
                  type="text"
                  maxlength="100"
                  placeholder="Ex: Les pionniers"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
                />
                <p class="text-xs text-repae-gray-400 mt-1">
                  Optionnel. Un surnom donne a la promotion (max 100 caracteres).
                </p>
              </div>

              <!-- Preview -->
              <div>
                <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Apercu
                </label>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-500/15">
                  <font-awesome-icon icon="fa-solid fa-flag" class="text-violet-500 text-sm" />
                  <span class="text-sm font-semibold text-violet-600 dark:text-violet-400">
                    Promotion {{ form.year }}{{ form.nickname.trim() ? ` — ${form.nickname.trim()}` : '' }}
                  </span>
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
                  {{ saving ? 'Enregistrement...' : (editingPromotion ? 'Modifier' : 'Creer') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
