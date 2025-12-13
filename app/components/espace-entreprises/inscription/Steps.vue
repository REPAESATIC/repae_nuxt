<script setup lang="ts">
const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const steps = [
  { id: 1, label: 'Entreprise', icon: 'fa-solid fa-building' },
  { id: 2, label: 'Coordonnees', icon: 'fa-solid fa-map-marker-alt' },
  { id: 3, label: 'Compte', icon: 'fa-solid fa-user' }
]
</script>

<template>
  <div class="w-full">
    <!-- Mobile: Simple progress -->
    <div class="sm:hidden mb-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300">
          Etape {{ currentStep }} sur {{ totalSteps }}
        </span>
        <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
          {{ steps[currentStep - 1]?.label }}
        </span>
      </div>
      <div class="h-2 bg-gray-200 dark:bg-repae-gray-700 rounded-full overflow-hidden">
        <div
          class="h-full bg-emerald-500 rounded-full transition-all duration-500"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        />
      </div>
    </div>

    <!-- Desktop: Full stepper -->
    <div class="hidden sm:block">
      <div class="flex items-start justify-center">
        <template v-for="(step, index) in steps" :key="step.id">
          <!-- Step item -->
          <div class="flex flex-col items-center">
            <!-- Circle -->
            <div
              :class="[
                'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10',
                currentStep > step.id
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : currentStep === step.id
                    ? 'bg-white dark:bg-repae-gray-800 border-emerald-500 text-emerald-500'
                    : 'bg-white dark:bg-repae-gray-800 border-gray-300 dark:border-repae-gray-600 text-repae-gray-400'
              ]"
            >
              <font-awesome-icon
                v-if="currentStep > step.id"
                icon="fa-solid fa-check"
                class="text-lg"
              />
              <font-awesome-icon
                v-else
                :icon="step.icon"
                class="text-lg"
              />
            </div>

            <!-- Label -->
            <span
              :class="[
                'mt-3 text-sm font-medium font-brand transition-colors text-center',
                currentStep >= step.id
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-repae-gray-500 dark:text-repae-gray-400'
              ]"
            >
              {{ step.label }}
            </span>
          </div>

          <!-- Connector line (between steps) -->
          <div
            v-if="index < steps.length - 1"
            class="flex-1 flex items-center px-2 mt-6"
          >
            <div
              :class="[
                'h-1 w-full rounded-full transition-all duration-500',
                currentStep > step.id
                  ? 'bg-emerald-500'
                  : 'bg-gray-200 dark:bg-repae-gray-700'
              ]"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
