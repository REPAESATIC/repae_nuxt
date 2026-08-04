<script setup lang="ts">
// Édition de la biographie ("À propos") depuis la page profil.
// Même structure que les autres gestionnaires de section (contact, formations, expériences…) :
// le composant recharge la donnée à l'ouverture, l'enregistre, puis émet `saved`.

const emit = defineEmits<{
  saved: []
}>()

const { fetchMyAlumni, updateMyAlumni } = useIdentityApi()
const { handleAuthError } = useItAuth()
const toast = useToast()

// Aligné sur la contrainte `@MaxLength(500)` du backend (UpdateAlumniDto) :
// dépasser cette limite fait échouer l'enregistrement côté API.
const MAX_LENGTH = 500

const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)
const biographie = ref('')

const remaining = computed(() => MAX_LENGTH - biographie.value.length)

const loadData = async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const alumni = await fetchMyAlumni()
    biographie.value = alumni.bio || ''
  } catch (e: any) {
    console.error('Erreur chargement de la biographie:', e)
    if (handleAuthError(e)) return
    errorMessage.value = e?.data?.message || 'Impossible de charger votre biographie.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadData)

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = null

  try {
    // Chaîne vide -> `undefined` : on n'envoie pas un champ vide que l'API rejetterait
    await updateMyAlumni({ bio: biographie.value.trim() || undefined })

    toast.success('Biographie mise à jour')
    emit('saved')
  } catch (e: any) {
    console.error('Erreur sauvegarde de la biographie:', e)
    if (handleAuthError(e)) return
    const msg = e?.data?.message
    errorMessage.value = Array.isArray(msg) ? msg[0] : (msg || 'Erreur lors de la sauvegarde.')
    toast.error(errorMessage.value)
  } finally {
    isSubmitting.value = false
  }
}

const labelClass =
  'block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-1.5'
</script>

<template>
  <div>
    <!-- Chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-2xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand text-sm">
        Chargement de votre biographie...
      </span>
    </div>

    <form v-else class="space-y-5" @submit.prevent="handleSubmit">
      <!-- Message d'erreur -->
      <div
        v-if="errorMessage"
        class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 flex items-center gap-3"
      >
        <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-red-500" />
        <p class="text-red-700 dark:text-red-400 font-brand text-sm">{{ errorMessage }}</p>
      </div>

      <div>
        <label for="about-biographie" :class="labelClass">Biographie</label>
        <textarea
          id="about-biographie"
          v-model="biographie"
          rows="8"
          :maxlength="MAX_LENGTH"
          placeholder="Présentez votre parcours, vos domaines d'expertise et ce qui vous motive."
          class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-gray-400 font-brand text-sm focus:outline-none focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-all resize-none"
        />
        <div class="mt-1 flex items-center justify-between">
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand">
            Laissez une ligne vide pour séparer deux paragraphes.
          </p>
          <p
            class="text-xs font-brand"
            :class="remaining <= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-repae-gray-500 dark:text-repae-gray-400'"
          >
            {{ biographie.length }} / {{ MAX_LENGTH }} caractères
          </p>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-repae-blue-500 hover:bg-repae-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
        >
          <font-awesome-icon
            :icon="isSubmitting ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
            :class="{ 'animate-spin': isSubmitting }"
          />
          {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
      </div>
    </form>
  </div>
</template>
