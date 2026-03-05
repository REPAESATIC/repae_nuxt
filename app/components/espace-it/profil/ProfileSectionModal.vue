<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  icon: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" />

        <!-- Modal panel -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 dark:border-repae-gray-700 flex items-center justify-between flex-shrink-0">
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
              <font-awesome-icon :icon="icon" class="text-repae-blue-500" />
              {{ title }}
            </h2>
            <button
              class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-700"
              @click="emit('close')"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" class="text-xl" />
            </button>
          </div>

          <!-- Scrollable body -->
          <div class="flex-1 overflow-y-auto p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
