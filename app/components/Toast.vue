<script setup lang="ts">
import type { ToastType } from '~/composables/useToast'

const { toasts, remove } = useToast()

const toastConfig: Record<ToastType, { icon: string; bgColor: string; iconBg: string }> = {
  success: {
    icon: 'fa-solid fa-check',
    bgColor: 'bg-white dark:bg-repae-gray-800 border-green-200 dark:border-green-500/30',
    iconBg: 'bg-green-100 dark:bg-green-500/20 text-green-500'
  },
  error: {
    icon: 'fa-solid fa-xmark',
    bgColor: 'bg-white dark:bg-repae-gray-800 border-red-200 dark:border-red-500/30',
    iconBg: 'bg-red-100 dark:bg-red-500/20 text-red-500'
  },
  warning: {
    icon: 'fa-solid fa-exclamation',
    bgColor: 'bg-white dark:bg-repae-gray-800 border-yellow-200 dark:border-yellow-500/30',
    iconBg: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500'
  },
  info: {
    icon: 'fa-solid fa-info',
    bgColor: 'bg-white dark:bg-repae-gray-800 border-blue-200 dark:border-blue-500/30',
    iconBg: 'bg-blue-100 dark:bg-blue-500/20 text-blue-500'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] space-y-3 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-8"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm pointer-events-auto',
            toastConfig[toast.type].bgColor
          ]"
        >
          <!-- Icon -->
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              toastConfig[toast.type].iconBg
            ]"
          >
            <font-awesome-icon :icon="toastConfig[toast.type].icon" class="text-sm" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
              {{ toast.title }}
            </p>
            <p
              v-if="toast.message"
              class="text-xs text-repae-gray-600 dark:text-repae-gray-400 mt-0.5"
            >
              {{ toast.message }}
            </p>
          </div>

          <!-- Close button -->
          <button
            class="p-1 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer shrink-0"
            @click="remove(toast.id)"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" class="text-sm" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
