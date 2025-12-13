<script setup lang="ts">
import type { StatutCandidature } from '~/data/espace-entreprises/candidatures'
import { statutCandidatureConfig } from '~/data/espace-entreprises/candidatures'

const props = defineProps<{
  statut: StatutCandidature
  size?: 'sm' | 'md'
}>()

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2.5 py-1 text-xs'
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-medium font-brand',
      statutCandidatureConfig[statut].color,
      sizeClasses
    ]"
  >
    <font-awesome-icon :icon="statutCandidatureConfig[statut].icon" class="text-[10px]" />
    {{ statutCandidatureConfig[statut].label }}
  </span>
</template>
