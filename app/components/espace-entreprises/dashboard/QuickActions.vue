<script setup lang="ts">
const quickActions = [
  {
    id: 'publier',
    label: 'Publier une offre',
    description: 'Creer une nouvelle offre d\'emploi',
    icon: 'fa-solid fa-plus-circle',
    href: '/espace-entreprises/offres/publier',
    color: 'emerald'
  },
  {
    id: 'stage',
    label: 'Proposer un stage',
    description: 'Publier une offre de stage',
    icon: 'fa-solid fa-graduation-cap',
    href: '/espace-entreprises/stages/publier',
    color: 'blue'
  },
  {
    id: 'rechercher',
    label: 'Rechercher un IT',
    description: 'Consulter l\'annuaire des experts',
    icon: 'fa-solid fa-search',
    href: '/espace-entreprises/consulter-it',
    color: 'purple'
  },
  {
    id: 'candidatures',
    label: 'Voir candidatures',
    description: 'Gerer les candidatures recues',
    icon: 'fa-solid fa-users',
    href: '/espace-entreprises/candidatures',
    color: 'amber'
  }
]

const getColorClasses = (color: string) => {
  const classes: Record<string, { border: string; bg: string; iconBg: string; iconColor: string }> = {
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600',
      bg: 'hover:bg-emerald-50 dark:hover:bg-emerald-500/10',
      iconBg: 'bg-emerald-100 dark:bg-emerald-500/20 group-hover:bg-emerald-500',
      iconColor: 'text-emerald-500 group-hover:text-white'
    },
    blue: {
      border: 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      bg: 'hover:bg-blue-50 dark:hover:bg-blue-500/10',
      iconBg: 'bg-blue-100 dark:bg-blue-500/20 group-hover:bg-blue-500',
      iconColor: 'text-blue-500 group-hover:text-white'
    },
    purple: {
      border: 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      bg: 'hover:bg-purple-50 dark:hover:bg-purple-500/10',
      iconBg: 'bg-purple-100 dark:bg-purple-500/20 group-hover:bg-purple-500',
      iconColor: 'text-purple-500 group-hover:text-white'
    },
    amber: {
      border: 'border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
      bg: 'hover:bg-amber-50 dark:hover:bg-amber-500/10',
      iconBg: 'bg-amber-100 dark:bg-amber-500/20 group-hover:bg-amber-500',
      iconColor: 'text-amber-500 group-hover:text-white'
    }
  }
  return classes[color] || classes.emerald
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
      Actions rapides
    </h3>

    <div class="grid grid-cols-2 gap-3">
      <NuxtLink
        v-for="action in quickActions"
        :key="action.id"
        :to="action.href"
        :class="[
          'p-4 rounded-xl border-2 border-dashed transition-all duration-200 hover:border-solid group',
          getColorClasses(action.color).border,
          getColorClasses(action.color).bg
        ]"
      >
        <div
          :class="[
            'w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors',
            getColorClasses(action.color).iconBg
          ]"
        >
          <font-awesome-icon
            :icon="action.icon"
            :class="['transition-colors', getColorClasses(action.color).iconColor]"
          />
        </div>
        <h4 class="font-semibold font-brand text-sm text-repae-gray-900 dark:text-white">
          {{ action.label }}
        </h4>
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ action.description }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
