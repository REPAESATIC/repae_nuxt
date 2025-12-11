<script setup>
defineProps({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  centered: {
    type: Boolean,
    default: true
  },
  light: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="['mb-8 md:mb-12', centered ? 'text-center' : '']">
    <h2
      :class="[
        'text-2xl md:text-3xl lg:text-4xl font-bold font-brand mb-4',
        light
          ? 'text-white'
          : 'text-repae-blue-500 dark:text-white'
      ]"
    >
      {{ titre }}
    </h2>
    <p
      v-if="description"
      :class="[
        'text-base md:text-lg font-brand max-w-3xl',
        centered ? 'mx-auto' : '',
        light
          ? 'text-gray-200'
          : 'text-repae-gray-600 dark:text-repae-gray-300'
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
