<script setup lang="ts">
import type { Avantage } from '~/data/espace-entreprises/avantages-fidelite'
import { categoriesConfig } from '~/data/espace-entreprises/avantages-fidelite'

const props = defineProps<{
  avantage: Avantage | null
  pointsActuels: number
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', avantage: Avantage): void
}>()

const isProcessing = ref(false)

const categorieConfig = computed(() =>
  props.avantage ? categoriesConfig[props.avantage.categorie] : null
)

const pointsRestants = computed(() =>
  props.avantage ? props.pointsActuels - props.avantage.cout_points : props.pointsActuels
)

const handleConfirm = async () => {
  if (!props.avantage) return

  isProcessing.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  isProcessing.value = false
  emit('confirm', props.avantage)
}

// Close on escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && avantage"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50"
          @click="emit('close')"
        />

        <!-- Modal -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate__animated animate__fadeInUp animate__faster">
          <!-- Header -->
          <div class="p-6 pb-0">
            <div class="flex items-start justify-between">
              <div
                :class="[
                  'w-14 h-14 rounded-xl flex items-center justify-center',
                  categorieConfig?.bgColor
                ]"
              >
                <font-awesome-icon :icon="avantage.icone" :class="['text-2xl', categorieConfig?.color]" />
              </div>
              <button
                type="button"
                class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
                @click="emit('close')"
              >
                <font-awesome-icon icon="fa-solid fa-times" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              {{ avantage.titre }}
            </h3>
            <p class="text-repae-gray-600 dark:text-repae-gray-400 mb-6">
              {{ avantage.description_longue }}
            </p>

            <!-- Points summary -->
            <div class="bg-gray-50 dark:bg-repae-gray-900 rounded-xl p-4 mb-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  Votre solde actuel
                </span>
                <span class="font-semibold text-repae-gray-900 dark:text-white">
                  {{ pointsActuels }} pts
                </span>
              </div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  Cout de l'avantage
                </span>
                <span class="font-semibold text-red-500">
                  -{{ avantage.cout_points }} pts
                </span>
              </div>
              <div class="border-t border-gray-200 dark:border-repae-gray-700 pt-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300">
                    Solde apres utilisation
                  </span>
                  <span class="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    {{ pointsRestants }} pts
                  </span>
                </div>
              </div>
            </div>

            <!-- Duration info -->
            <div v-if="avantage.duree" class="flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
              <font-awesome-icon icon="fa-solid fa-clock" />
              Valable pendant {{ avantage.duree }}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 p-6 pt-0">
            <button
              type="button"
              class="flex-1 px-4 py-3 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 rounded-xl font-medium transition-colors cursor-pointer"
              :disabled="isProcessing"
              @click="emit('close')"
            >
              Annuler
            </button>
            <button
              type="button"
              class="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              :disabled="isProcessing"
              @click="handleConfirm"
            >
              <font-awesome-icon
                v-if="isProcessing"
                icon="fa-solid fa-spinner"
                class="animate-spin"
              />
              <font-awesome-icon
                v-else
                icon="fa-solid fa-check"
              />
              {{ isProcessing ? 'Traitement...' : 'Confirmer' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
