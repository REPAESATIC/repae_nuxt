<script setup lang="ts">
import type { Avantage } from '~/data/espace-entreprises/avantages-fidelite'
import type { BadgeNiveau } from '~/data/espace-entreprises/fidelite'
import { categoriesConfig, canRedeemAvantage } from '~/data/espace-entreprises/avantages-fidelite'
import { badgesConfig } from '~/data/espace-entreprises/fidelite'

const props = defineProps<{
  avantage: Avantage
  badgeActuel: BadgeNiveau
  pointsActuels: number
}>()

const emit = defineEmits<{
  (e: 'redeem', avantage: Avantage): void
}>()

const redeemStatus = computed(() =>
  canRedeemAvantage(props.avantage, props.badgeActuel, props.pointsActuels)
)

const categorieConfig = computed(() => categoriesConfig[props.avantage.categorie])
const badgeConfig = computed(() => badgesConfig[props.avantage.badge_minimum])
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-repae-gray-800 rounded-xl border p-5 transition-all',
      redeemStatus.canRedeem
        ? 'border-gray-200 dark:border-repae-gray-700 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:shadow-lg'
        : 'border-gray-200 dark:border-repae-gray-700 opacity-60'
    ]"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 mb-4">
      <div
        :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          categorieConfig.bgColor
        ]"
      >
        <font-awesome-icon :icon="avantage.icone" :class="['text-lg', categorieConfig.color]" />
      </div>

      <!-- Badge minimum -->
      <div
        :class="[
          'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
          badgeConfig.bgColor, badgeConfig.textColor
        ]"
      >
        <font-awesome-icon :icon="badgeConfig.icon" class="text-xs" />
        {{ badgeConfig.nom }}+
      </div>
    </div>

    <!-- Content -->
    <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-1">
      {{ avantage.titre }}
    </h3>
    <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
      {{ avantage.description }}
    </p>

    <!-- Meta info -->
    <div class="flex items-center gap-3 mb-4 text-xs text-repae-gray-400">
      <span v-if="avantage.duree" class="flex items-center gap-1">
        <font-awesome-icon icon="fa-solid fa-clock" />
        {{ avantage.duree }}
      </span>
      <span v-if="avantage.stock !== undefined" class="flex items-center gap-1">
        <font-awesome-icon icon="fa-solid fa-layer-group" />
        {{ avantage.stock }} restant{{ avantage.stock > 1 ? 's' : '' }}
      </span>
      <span
        :class="[
          'px-2 py-0.5 rounded-full',
          categorieConfig.bgColor, categorieConfig.color
        ]"
      >
        {{ categorieConfig.label }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-repae-gray-700">
      <!-- Cost -->
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-coins" class="text-yellow-500" />
        <span class="font-bold text-lg text-repae-gray-900 dark:text-white">
          {{ avantage.cout_points }}
        </span>
        <span class="text-sm text-repae-gray-400">points</span>
      </div>

      <!-- Action button -->
      <button
        v-if="redeemStatus.canRedeem"
        type="button"
        class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer flex items-center gap-2"
        @click="emit('redeem', avantage)"
      >
        <font-awesome-icon icon="fa-solid fa-gift" />
        Utiliser
      </button>
      <div
        v-else
        class="flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-repae-gray-700 rounded-lg text-xs text-repae-gray-500 dark:text-repae-gray-400"
      >
        <font-awesome-icon icon="fa-solid fa-lock" />
        {{ redeemStatus.reason }}
      </div>
    </div>
  </div>
</template>
