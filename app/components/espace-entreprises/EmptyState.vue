<script setup lang="ts">
interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  actionIcon?: string
  variant?: 'default' | 'compact'
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  icon: 'fa-solid fa-inbox',
  variant: 'default'
})

const emit = defineEmits<{
  (e: 'action'): void
}>()

const handleAction = () => {
  emit('action')
}
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center text-center',
      variant === 'compact' ? 'py-8' : 'py-16'
    ]"
  >
    <!-- Icon -->
    <div
      :class="[
        'flex items-center justify-center rounded-full bg-gray-100 dark:bg-repae-gray-800 mb-4',
        variant === 'compact' ? 'w-14 h-14' : 'w-20 h-20'
      ]"
    >
      <font-awesome-icon
        :icon="icon"
        :class="[
          'text-repae-gray-400 dark:text-repae-gray-500',
          variant === 'compact' ? 'text-xl' : 'text-3xl'
        ]"
      />
    </div>

    <!-- Title -->
    <h3
      :class="[
        'font-semibold font-brand text-repae-gray-900 dark:text-white mb-2',
        variant === 'compact' ? 'text-base' : 'text-lg'
      ]"
    >
      {{ title }}
    </h3>

    <!-- Description -->
    <p
      v-if="description"
      :class="[
        'text-repae-gray-500 dark:text-repae-gray-400 max-w-md',
        variant === 'compact' ? 'text-sm' : 'text-base'
      ]"
    >
      {{ description }}
    </p>

    <!-- Action -->
    <div v-if="actionLabel" class="mt-6">
      <NuxtLink
        v-if="actionTo"
        :to="actionTo"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
      >
        <font-awesome-icon v-if="actionIcon" :icon="actionIcon" />
        {{ actionLabel }}
      </NuxtLink>
      <button
        v-else
        type="button"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer"
        @click="handleAction"
      >
        <font-awesome-icon v-if="actionIcon" :icon="actionIcon" />
        {{ actionLabel }}
      </button>
    </div>
  </div>
</template>
