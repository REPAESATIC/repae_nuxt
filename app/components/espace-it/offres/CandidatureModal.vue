<script setup lang="ts">
import type { Offre } from '~/data/espace-it/offres'
import { currentUser } from '~/data/espace-it/current-user'

const props = defineProps<{
  show: boolean
  offre: Offre
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Form state
const form = reactive({
  message: '',
  cv: null as File | null,
  lettre_motivation: null as File | null,
  accepte_conditions: false
})

// Form validation
const errors = reactive({
  message: '',
  cv: '',
  accepte_conditions: ''
})

// Submission state
const isSubmitting = ref(false)
const isSubmitted = ref(false)

// File input refs
const cvInput = ref<HTMLInputElement>()
const lettreInput = ref<HTMLInputElement>()

// Handle file selection
const handleCvSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.cv = target.files[0]
    errors.cv = ''
  }
}

const handleLettreSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.lettre_motivation = target.files[0]
  }
}

// Remove file
const removeCv = () => {
  form.cv = null
  if (cvInput.value) cvInput.value.value = ''
}

const removeLettre = () => {
  form.lettre_motivation = null
  if (lettreInput.value) lettreInput.value.value = ''
}

// Validate form
const validateForm = (): boolean => {
  let isValid = true

  // Reset errors
  errors.message = ''
  errors.cv = ''
  errors.accepte_conditions = ''

  if (!form.message.trim()) {
    errors.message = 'Veuillez saisir un message de motivation'
    isValid = false
  } else if (form.message.trim().length < 50) {
    errors.message = 'Le message doit contenir au moins 50 caracteres'
    isValid = false
  }

  if (!form.cv) {
    errors.cv = 'Veuillez joindre votre CV'
    isValid = false
  }

  if (!form.accepte_conditions) {
    errors.accepte_conditions = 'Vous devez accepter les conditions'
    isValid = false
  }

  return isValid
}

// Submit form
const submitCandidature = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true
}

// Close and reset
const closeModal = () => {
  if (!isSubmitting.value) {
    form.message = ''
    form.cv = null
    form.lettre_motivation = null
    form.accepte_conditions = false
    errors.message = ''
    errors.cv = ''
    errors.accepte_conditions = ''
    isSubmitted.value = false
    emit('close')
  }
}

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50"
          @click="closeModal"
        />

        <!-- Modal -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <!-- Success State -->
          <div v-if="isSubmitted" class="p-8 text-center">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <font-awesome-icon icon="fa-solid fa-check" class="text-4xl text-green-500" />
            </div>
            <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              Candidature envoyee !
            </h2>
            <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
              Votre candidature pour le poste de <strong>{{ offre.titre }}</strong> chez <strong>{{ offre.entreprise.nom }}</strong> a bien ete envoyee.
            </p>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-500 mb-8">
              Vous recevrez une confirmation par email a <strong>{{ currentUser.email }}</strong>
            </p>
            <button
              class="px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer"
              @click="closeModal"
            >
              Fermer
            </button>
          </div>

          <!-- Form State -->
          <template v-else>
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-repae-gray-700 flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
                  Postuler a cette offre
                </h2>
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ offre.titre }} - {{ offre.entreprise.nom }}
                </p>
              </div>
              <button
                class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                @click="closeModal"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" class="text-xl" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <!-- Profil recap -->
              <div class="mb-6 p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
                <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-2">
                  Vous postulez en tant que :
                </p>
                <div class="flex items-center gap-3">
                  <img
                    :src="currentUser.photo_url"
                    :alt="`${currentUser.prenom} ${currentUser.nom}`"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-medium font-brand text-repae-gray-900 dark:text-white">
                      {{ currentUser.prenom }} {{ currentUser.nom }}
                    </p>
                    <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                      {{ currentUser.poste_actuel }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div class="mb-6">
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Message de motivation <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="Expliquez pourquoi vous etes interesse par ce poste et ce que vous pouvez apporter a l'entreprise..."
                  :class="[
                    'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors resize-none',
                    errors.message ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
                  ]"
                />
                <p v-if="errors.message" class="mt-1 text-sm text-red-500">
                  {{ errors.message }}
                </p>
                <p class="mt-1 text-xs text-repae-gray-400">
                  {{ form.message.length }} caractere(s) - minimum 50
                </p>
              </div>

              <!-- CV Upload -->
              <div class="mb-6">
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  CV <span class="text-red-500">*</span>
                </label>

                <!-- File selected -->
                <div
                  v-if="form.cv"
                  class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <font-awesome-icon icon="fa-solid fa-file-alt" class="text-green-500" />
                    <div>
                      <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                        {{ form.cv.name }}
                      </p>
                      <p class="text-xs text-repae-gray-500">
                        {{ formatFileSize(form.cv.size) }}
                      </p>
                    </div>
                  </div>
                  <button
                    class="p-1 text-red-500 hover:text-red-600 cursor-pointer"
                    @click="removeCv"
                  >
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                  </button>
                </div>

                <!-- Upload button -->
                <div
                  v-else
                  :class="[
                    'border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer hover:border-repae-blue-400 hover:bg-repae-blue-50/50 dark:hover:bg-repae-blue-500/5',
                    errors.cv ? 'border-red-500' : 'border-gray-300 dark:border-repae-gray-600'
                  ]"
                  @click="cvInput?.click()"
                >
                  <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="text-3xl text-repae-gray-400 mb-2" />
                  <p class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                    Cliquez pour telecharger votre CV
                  </p>
                  <p class="text-xs text-repae-gray-400 mt-1">
                    PDF, DOC, DOCX (max 5 MB)
                  </p>
                </div>
                <input
                  ref="cvInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                  @change="handleCvSelect"
                />
                <p v-if="errors.cv" class="mt-1 text-sm text-red-500">
                  {{ errors.cv }}
                </p>
              </div>

              <!-- Lettre de motivation (optionnel) -->
              <div class="mb-6">
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Lettre de motivation <span class="text-repae-gray-400">(optionnel)</span>
                </label>

                <!-- File selected -->
                <div
                  v-if="form.lettre_motivation"
                  class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <font-awesome-icon icon="fa-solid fa-file-alt" class="text-green-500" />
                    <div>
                      <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                        {{ form.lettre_motivation.name }}
                      </p>
                      <p class="text-xs text-repae-gray-500">
                        {{ formatFileSize(form.lettre_motivation.size) }}
                      </p>
                    </div>
                  </div>
                  <button
                    class="p-1 text-red-500 hover:text-red-600 cursor-pointer"
                    @click="removeLettre"
                  >
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                  </button>
                </div>

                <!-- Upload button -->
                <div
                  v-else
                  class="border-2 border-dashed border-gray-300 dark:border-repae-gray-600 rounded-xl p-4 text-center transition-colors cursor-pointer hover:border-repae-blue-400 hover:bg-repae-blue-50/50 dark:hover:bg-repae-blue-500/5"
                  @click="lettreInput?.click()"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" class="text-repae-gray-400 mr-2" />
                  <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                    Ajouter une lettre de motivation
                  </span>
                </div>
                <input
                  ref="lettreInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                  @change="handleLettreSelect"
                />
              </div>

              <!-- Conditions -->
              <div class="mb-6">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input
                    v-model="form.accepte_conditions"
                    type="checkbox"
                    class="mt-0.5 w-4 h-4 rounded border-gray-300 text-repae-blue-500 focus:ring-repae-blue-500 cursor-pointer"
                  />
                  <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
                    J'accepte que mes informations soient transmises a <strong>{{ offre.entreprise.nom }}</strong> dans le cadre de cette candidature. <span class="text-red-500">*</span>
                  </span>
                </label>
                <p v-if="errors.accepte_conditions" class="mt-1 text-sm text-red-500 ml-7">
                  {{ errors.accepte_conditions }}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-200 dark:border-repae-gray-700 flex items-center justify-end gap-3">
              <button
                :disabled="isSubmitting"
                class="px-4 py-2.5 text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-800 dark:hover:text-repae-gray-200 font-medium font-brand rounded-xl transition-colors cursor-pointer"
                @click="closeModal"
              >
                Annuler
              </button>
              <button
                :disabled="isSubmitting"
                :class="[
                  'px-6 py-2.5 font-medium font-brand rounded-xl transition-colors flex items-center gap-2',
                  isSubmitting
                    ? 'bg-repae-blue-400 text-white cursor-wait'
                    : 'bg-repae-blue-500 hover:bg-repae-blue-600 text-white cursor-pointer'
                ]"
                @click="submitCandidature"
              >
                <font-awesome-icon
                  v-if="isSubmitting"
                  icon="fa-solid fa-spinner"
                  class="animate-spin"
                />
                <font-awesome-icon
                  v-else
                  icon="fa-solid fa-paper-plane"
                />
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature' }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
