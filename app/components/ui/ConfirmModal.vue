<script setup lang="ts">
// Modal de confirmation générique, pensé pour les actions destructives de l'admin.
// Usage : <UiConfirmModal :open="..." :loading="..." title="..." @confirm="..." @cancel="..." />

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    // Désactive les boutons et le backdrop pendant l'appel API
    loading?: boolean
    variant?: 'danger' | 'primary'
  }>(),
  {
    message: '',
    confirmLabel: 'Confirmer',
    cancelLabel: 'Annuler',
    loading: false,
    variant: 'danger',
  },
)

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const cancel = () => {
  if (props.loading) return
  emit('cancel')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) cancel()
}

// Fermeture au clavier (Échap)
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) cancel()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const variantConfig = computed(() =>
  props.variant === 'danger'
    ? {
        icon: 'fa-solid fa-exclamation-triangle',
        iconClass: 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400',
        buttonClass: 'bg-red-600 hover:bg-red-700 focus:ring-red-500/30',
      }
    : {
        icon: 'fa-solid fa-circle-info',
        iconClass: 'bg-repae-blue-100 dark:bg-repae-blue-500/15 text-repae-blue-600 dark:text-repae-blue-400',
        buttonClass: 'bg-repae-blue-500 hover:bg-repae-blue-600 focus:ring-repae-blue-500/30',
      },
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <!-- Boîte -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
          appear
        >
          <div
            v-if="open"
            class="relative w-full max-w-md bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 shadow-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <div
                :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                  variantConfig.iconClass,
                ]"
              >
                <font-awesome-icon :icon="variantConfig.icon" class="text-lg" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white">
                  {{ title }}
                </h3>
                <p
                  v-if="message"
                  class="mt-2 text-sm text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed"
                >
                  {{ message }}
                </p>
                <slot />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                :disabled="loading"
                class="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                @click="cancel"
              >
                {{ cancelLabel }}
              </button>
              <button
                type="button"
                :disabled="loading"
                :class="[
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold font-brand focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer',
                  variantConfig.buttonClass,
                ]"
                @click="emit('confirm')"
              >
                <font-awesome-icon
                  v-if="loading"
                  icon="fa-solid fa-spinner"
                  class="animate-spin"
                />
                {{ loading ? 'Veuillez patienter...' : confirmLabel }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
