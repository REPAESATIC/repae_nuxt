<script setup lang="ts">
import { espaceItNavItems } from '@/data/espace-it/current-user'

const props = defineProps<{
  isCollapsed: boolean
  isMobileOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'closeMobile'): void
}>()

const route = useRoute()

const isActiveRoute = (href: string) => {
  // Dashboard: correspondance exacte uniquement
  if (href === '/espace-it') {
    return route.path === '/espace-it'
  }

  // Verifier si une autre route de navigation est plus specifique
  const hasMoreSpecificMatch = espaceItNavItems.some(item => {
    return item.href !== href &&
           item.href.startsWith(href) &&
           route.path.startsWith(item.href)
  })

  // Si une route plus specifique correspond, ne pas marquer celle-ci comme active
  if (hasMoreSpecificMatch) {
    return false
  }

  return route.path.startsWith(href)
}
</script>

<template>
  <!-- Overlay mobile -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobileOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="emit('closeMobile')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-repae-gray-900 border-r border-gray-200 dark:border-repae-gray-700 transition-all duration-300 flex flex-col',
      // Desktop
      isCollapsed ? 'lg:w-20' : 'lg:w-64',
      // Mobile
      isMobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Logo Section -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-repae-gray-700">
      <NuxtLink
        to="/espace-it"
        class="flex items-center gap-3"
        @click="emit('closeMobile')"
      >
        <img
          src="/image/logos_REAPE/ICONE/ICONE_REPAE_BGR1.png"
          alt="REPAE"
          class="h-10 w-10 dark:hidden"
        />
        <img
          src="/image/logos_REAPE/ICONE/ICONE_REPAE_GRB1.png"
          alt="REPAE"
          class="h-10 w-10 hidden dark:block"
        />
        <span
          v-if="!isCollapsed || isMobileOpen"
          class="text-lg font-bold font-brand text-repae-blue-500"
        >
          Espace IT
        </span>
      </NuxtLink>

      <!-- Toggle button (desktop only) -->
      <button
        class="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
        @click="emit('toggle')"
      >
        <font-awesome-icon
          :icon="isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"
          class="text-repae-gray-500 dark:text-repae-gray-400"
        />
      </button>

      <!-- Close button (mobile only) -->
      <button
        class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
        @click="emit('closeMobile')"
      >
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          class="text-repae-gray-500 dark:text-repae-gray-400"
        />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <ul class="space-y-1">
        <li v-for="item in espaceItNavItems" :key="item.id">
          <NuxtLink
            :to="item.href"
            :class="[
              'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group',
              isActiveRoute(item.href)
                ? 'bg-repae-blue-50 dark:bg-repae-blue-500/10 text-repae-blue-600 dark:text-repae-blue-400'
                : 'text-repae-gray-600 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-800 hover:text-repae-gray-900 dark:hover:text-white'
            ]"
            @click="emit('closeMobile')"
          >
            <div
              :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                isActiveRoute(item.href)
                  ? 'bg-repae-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-repae-gray-800 text-repae-gray-500 dark:text-repae-gray-400 group-hover:bg-repae-blue-100 dark:group-hover:bg-repae-blue-500/20 group-hover:text-repae-blue-500'
              ]"
            >
              <font-awesome-icon :icon="item.icon" class="text-lg" />
            </div>
            <div
              v-if="!isCollapsed || isMobileOpen"
              class="flex flex-col"
            >
              <span class="font-medium font-brand text-sm">{{ item.label }}</span>
              <span
                v-if="item.description"
                class="text-xs text-repae-gray-400 dark:text-repae-gray-500"
              >
                {{ item.description }}
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200 dark:border-repae-gray-700">
      <NuxtLink
        to="/"
        :class="[
          'flex items-center gap-3 px-3 py-2 rounded-xl text-repae-gray-500 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-800 hover:text-repae-gray-700 dark:hover:text-repae-gray-300 transition-colors',
          isCollapsed && !isMobileOpen ? 'justify-center' : ''
        ]"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        <span v-if="!isCollapsed || isMobileOpen" class="font-brand text-sm">
          Retour au site
        </span>
      </NuxtLink>
    </div>
  </aside>
</template>
