<script setup lang="ts">
import type { Badge, BadgeNiveau } from '~/data/espace-entreprises/fidelite'
import { badgesConfig } from '~/data/espace-entreprises/fidelite'

const props = defineProps<{
  badge: BadgeNiveau
  points: number
  entrepriseNom: string
}>()

const currentBadge = computed(() => badgesConfig[props.badge])

// Badge icon colors for visual effect
const badgeIconStyle = computed(() => {
  switch (props.badge) {
    case 'bronze':
      return 'text-amber-600'
    case 'silver':
      return 'text-gray-400'
    case 'gold':
      return 'text-yellow-500'
    case 'platinum':
      return 'text-purple-500'
    default:
      return 'text-amber-600'
  }
})
</script>

<template>
  <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white">
    <div class="flex flex-col md:flex-row items-center gap-6">
      <!-- Badge visual -->
      <div class="relative">
        <div
          :class="[
            'w-28 h-28 rounded-full flex items-center justify-center',
            'bg-white/20 backdrop-blur-sm border-4 border-white/30'
          ]"
        >
          <font-awesome-icon
            :icon="currentBadge.icon"
            :class="['text-5xl', badgeIconStyle]"
          />
        </div>
        <!-- Badge level indicator -->
        <div
          :class="[
            'absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase',
            'bg-white shadow-lg',
            currentBadge.textColor
          ]"
        >
          {{ currentBadge.nom }}
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1 text-center md:text-left">
        <p class="text-white/80 text-sm mb-1">Programme Fidelite Recruteur</p>
        <h1 class="text-2xl md:text-3xl font-bold font-brand mb-2">
          {{ entrepriseNom }}
        </h1>
        <p class="text-white/90 text-lg">
          Membre <span class="font-semibold">{{ currentBadge.nom }}</span>
        </p>

        <!-- Points display -->
        <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
          <font-awesome-icon icon="fa-solid fa-coins" class="text-yellow-300" />
          <span class="text-2xl font-bold">{{ points.toLocaleString() }}</span>
          <span class="text-white/80">points</span>
        </div>
      </div>

      <!-- Current badge advantages -->
      <div class="hidden lg:block w-64">
        <p class="text-sm text-white/80 mb-3">Vos avantages actuels :</p>
        <ul class="space-y-2">
          <li
            v-for="(avantage, index) in currentBadge.avantages.slice(0, 3)"
            :key="index"
            class="flex items-start gap-2 text-sm text-white/90"
          >
            <font-awesome-icon icon="fa-solid fa-check" class="text-emerald-300 mt-0.5 text-xs" />
            {{ avantage }}
          </li>
          <li
            v-if="currentBadge.avantages.length > 3"
            class="text-sm text-white/70 pl-5"
          >
            +{{ currentBadge.avantages.length - 3 }} autres avantages
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
