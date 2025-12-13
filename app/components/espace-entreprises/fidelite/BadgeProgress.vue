<script setup lang="ts">
import type { BadgeNiveau } from '~/data/espace-entreprises/fidelite'
import {
  badgesConfig,
  getNextBadge,
  getProgressToNextBadge,
  getPointsToNextBadge
} from '~/data/espace-entreprises/fidelite'

const props = defineProps<{
  currentBadge: BadgeNiveau
  points: number
}>()

const nextBadge = computed(() => getNextBadge(props.currentBadge))
const progress = computed(() => getProgressToNextBadge(props.points, props.currentBadge))
const pointsNeeded = computed(() => getPointsToNextBadge(props.points, props.currentBadge))
const currentBadgeConfig = computed(() => badgesConfig[props.currentBadge])

const isMaxLevel = computed(() => props.currentBadge === 'platinum')

// Badge order for display
const badgeOrder: BadgeNiveau[] = ['bronze', 'silver', 'gold', 'platinum']
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-chart-line" class="text-emerald-500" />
      Progression
    </h2>

    <!-- Max level message -->
    <div v-if="isMaxLevel" class="text-center py-8">
      <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-gem" class="text-4xl text-purple-500" />
      </div>
      <h3 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Niveau maximum atteint !
      </h3>
      <p class="text-repae-gray-500 dark:text-repae-gray-400">
        Felicitations ! Vous beneficiez de tous les avantages du programme.
      </p>
    </div>

    <!-- Progress to next badge -->
    <div v-else>
      <!-- Current vs Next badge -->
      <div class="flex items-center justify-between mb-6">
        <!-- Current badge -->
        <div class="flex items-center gap-3">
          <div
            :class="[
              'w-14 h-14 rounded-full flex items-center justify-center',
              currentBadgeConfig.bgColor
            ]"
          >
            <font-awesome-icon
              :icon="currentBadgeConfig.icon"
              :class="['text-2xl', currentBadgeConfig.textColor]"
            />
          </div>
          <div>
            <p class="text-xs text-repae-gray-400">Actuel</p>
            <p :class="['font-semibold', currentBadgeConfig.textColor]">
              {{ currentBadgeConfig.nom }}
            </p>
          </div>
        </div>

        <!-- Arrow -->
        <font-awesome-icon
          icon="fa-solid fa-arrow-right"
          class="text-repae-gray-300 dark:text-repae-gray-600 text-xl"
        />

        <!-- Next badge -->
        <div v-if="nextBadge" class="flex items-center gap-3">
          <div>
            <p class="text-xs text-repae-gray-400 text-right">Prochain</p>
            <p :class="['font-semibold', nextBadge.textColor]">
              {{ nextBadge.nom }}
            </p>
          </div>
          <div
            :class="[
              'w-14 h-14 rounded-full flex items-center justify-center',
              nextBadge.bgColor
            ]"
          >
            <font-awesome-icon
              :icon="nextBadge.icon"
              :class="['text-2xl', nextBadge.textColor]"
            />
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="mb-4">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-repae-gray-500 dark:text-repae-gray-400">
            {{ progress }}% complete
          </span>
          <span class="text-emerald-600 dark:text-emerald-400 font-medium">
            {{ pointsNeeded }} points restants
          </span>
        </div>
        <div class="h-4 bg-gray-200 dark:bg-repae-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>

      <!-- Next badge advantages preview -->
      <div v-if="nextBadge" class="p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl">
        <p class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-3">
          Avantages a debloquer avec {{ nextBadge.nom }} :
        </p>
        <ul class="space-y-2">
          <li
            v-for="(avantage, index) in nextBadge.avantages.slice(-2)"
            :key="index"
            class="flex items-start gap-2 text-sm text-repae-gray-600 dark:text-repae-gray-400"
          >
            <font-awesome-icon icon="fa-solid fa-gift" class="text-purple-500 mt-0.5 text-xs" />
            {{ avantage }}
          </li>
        </ul>
      </div>
    </div>

    <!-- All badges overview -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-repae-gray-700">
      <p class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-4">
        Tous les niveaux
      </p>
      <div class="flex items-center justify-between">
        <div
          v-for="(badge, index) in badgeOrder"
          :key="badge"
          class="flex flex-col items-center"
        >
          <div
            :class="[
              'w-12 h-12 rounded-full flex items-center justify-center transition-all',
              badgesConfig[badge].bgColor,
              badge === currentBadge ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-repae-gray-800' : '',
              badgeOrder.indexOf(badge) <= badgeOrder.indexOf(currentBadge) ? 'opacity-100' : 'opacity-40'
            ]"
          >
            <font-awesome-icon
              :icon="badgesConfig[badge].icon"
              :class="['text-lg', badgesConfig[badge].textColor]"
            />
          </div>
          <p
            :class="[
              'text-xs mt-2 font-medium',
              badge === currentBadge
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-repae-gray-400'
            ]"
          >
            {{ badgesConfig[badge].nom }}
          </p>
          <p class="text-xs text-repae-gray-400">
            {{ badgesConfig[badge].pointsMin }}+
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
