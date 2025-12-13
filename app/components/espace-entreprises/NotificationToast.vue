<script setup lang="ts">
const { notifications, remove } = useNotifications()

const typeConfig = {
  success: {
    icon: 'fa-solid fa-check-circle',
    bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    borderColor: 'border-emerald-200 dark:border-emerald-500/30',
    iconColor: 'text-emerald-500',
    titleColor: 'text-emerald-800 dark:text-emerald-300'
  },
  error: {
    icon: 'fa-solid fa-times-circle',
    bgColor: 'bg-red-50 dark:bg-red-500/10',
    borderColor: 'border-red-200 dark:border-red-500/30',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800 dark:text-red-300'
  },
  warning: {
    icon: 'fa-solid fa-exclamation-triangle',
    bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    borderColor: 'border-amber-200 dark:border-amber-500/30',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-800 dark:text-amber-300'
  },
  info: {
    icon: 'fa-solid fa-info-circle',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    borderColor: 'border-blue-200 dark:border-blue-500/30',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800 dark:text-blue-300'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-8"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'pointer-events-auto rounded-xl border shadow-lg p-4 backdrop-blur-sm',
            typeConfig[notification.type].bgColor,
            typeConfig[notification.type].borderColor
          ]"
        >
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <font-awesome-icon
              :icon="typeConfig[notification.type].icon"
              :class="['text-xl flex-shrink-0 mt-0.5', typeConfig[notification.type].iconColor]"
            />

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p
                :class="['font-semibold text-sm', typeConfig[notification.type].titleColor]"
              >
                {{ notification.title }}
              </p>
              <p
                v-if="notification.message"
                class="text-sm text-repae-gray-600 dark:text-repae-gray-400 mt-0.5"
              >
                {{ notification.message }}
              </p>
            </div>

            <!-- Close button -->
            <button
              v-if="notification.dismissible"
              type="button"
              class="flex-shrink-0 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
              @click="remove(notification.id)"
            >
              <font-awesome-icon icon="fa-solid fa-times" class="text-sm" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
