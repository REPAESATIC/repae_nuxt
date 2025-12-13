<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
  icon?: string
}

const props = defineProps<{
  items?: BreadcrumbItem[]
}>()

const route = useRoute()

// Auto-generate breadcrumbs from route if not provided
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (props.items && props.items.length > 0) {
    return props.items
  }

  // Generate from route path
  const pathParts = route.path.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = []

  // Home
  items.push({
    label: 'Espace Entreprises',
    to: '/espace-entreprises/dashboard',
    icon: 'fa-solid fa-house'
  })

  let currentPath = ''
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`

    // Skip 'espace-entreprises' as it's already the home
    if (part === 'espace-entreprises') return

    // Map path parts to readable labels
    const labelMap: Record<string, string> = {
      dashboard: 'Dashboard',
      offres: 'Offres d\'emploi',
      stages: 'Stages',
      'consulter-it': 'Talents IT',
      fidelite: 'Programme fidelite',
      avantages: 'Avantages',
      publier: 'Publier',
      candidatures: 'Candidatures',
      inscription: 'Inscription'
    }

    // Handle dynamic routes (IDs)
    if (/^\d+$/.test(part) || /^[a-z0-9-]+$/i.test(part) && !labelMap[part]) {
      items.push({
        label: `#${part.slice(0, 8)}`,
        to: index === pathParts.length - 1 ? undefined : currentPath
      })
    } else {
      items.push({
        label: labelMap[part] || part.charAt(0).toUpperCase() + part.slice(1),
        to: index === pathParts.length - 1 ? undefined : currentPath
      })
    }
  })

  return items
})
</script>

<template>
  <nav aria-label="Fil d'Ariane" class="mb-6">
    <ol class="flex items-center gap-2 text-sm flex-wrap">
      <li
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        class="flex items-center gap-2"
      >
        <!-- Separator -->
        <font-awesome-icon
          v-if="index > 0"
          icon="fa-solid fa-chevron-right"
          class="text-xs text-repae-gray-300 dark:text-repae-gray-600"
        />

        <!-- Link or current page -->
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="flex items-center gap-1.5 text-repae-gray-500 dark:text-repae-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            class="text-xs"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>
        <span
          v-else
          class="flex items-center gap-1.5 text-repae-gray-900 dark:text-white font-medium"
        >
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            class="text-xs"
          />
          <span>{{ item.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>
