<script setup lang="ts">
import type { StatutOffre } from '~/data/espace-entreprises/offres-emploi'
import { statutConfig } from '~/data/espace-entreprises/offres-emploi'

const props = defineProps<{
  statut: StatutOffre
  showIcon?: boolean
}>()

const config = computed(() => statutConfig[props.statut])
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-brand',
      config.color
    ]"
  >
    <font-awesome-icon
      v-if="showIcon"
      :icon="config.icon"
      class="text-[10px]"
    />
    {{ config.label }}
  </span>
</template>
