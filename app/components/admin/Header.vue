<script setup lang="ts">
const props = defineProps<{
  isSidebarCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMobileSidebar'): void
}>()

const { isDark, toggle: toggleDarkMode } = useDarkMode()

const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/admin') return 'Tableau de bord'
  if (path.startsWith('/admin/categories')) return 'Categories'
  if (path.startsWith('/admin/evenements')) return 'Evenements'
  if (path.startsWith('/admin/actualites')) return 'Actualites'
  if (path.startsWith('/admin/alumni')) return 'Alumni'
  if (path.startsWith('/admin/entreprises')) return 'Entreprises'
  if (path.startsWith('/admin/comptes')) return 'Comptes'
  if (path.startsWith('/admin/competences')) return 'Competences'
  if (path.startsWith('/admin/groupes-competences')) return 'Groupes de competences'
  if (path.startsWith('/admin/pays')) return 'Pays'
  if (path.startsWith('/admin/departements')) return 'Departements'
  if (path.startsWith('/admin/promotions')) return 'Promotions'
  if (path.startsWith('/admin/notifications')) return 'Notifications'
  if (path.startsWith('/admin/parametres')) return 'Parametres'
  return 'Administration'
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 right-0 z-30 h-16 bg-white/80 dark:bg-repae-gray-900/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-repae-gray-700/80 transition-all duration-300',
      isSidebarCollapsed ? 'lg:left-20' : 'lg:left-72',
      'left-0'
    ]"
  >
    <div class="h-full px-4 lg:px-6 flex items-center justify-between">
      <!-- Left: Mobile menu + Page title -->
      <div class="flex items-center gap-4">
        <button
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          @click="emit('toggleMobileSidebar')"
        >
          <font-awesome-icon
            icon="fa-solid fa-bars"
            class="text-repae-gray-600 dark:text-repae-gray-400 text-xl"
          />
        </button>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex items-center gap-2">
            <span class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
              Admin
            </span>
            <span class="text-slate-300 dark:text-slate-600">/</span>
          </div>
          <h1 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            {{ pageTitle }}
          </h1>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Dark mode toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2.5 rounded-xl bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-all duration-200 cursor-pointer"
          :title="isDark ? 'Mode clair' : 'Mode sombre'"
        >
          <font-awesome-icon
            :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
            :class="isDark ? 'text-amber-400' : 'text-violet-500'"
          />
        </button>

        <!-- Notifications -->
        <button
          class="relative p-2.5 rounded-xl bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-all duration-200 cursor-pointer"
        >
          <font-awesome-icon
            icon="fa-solid fa-bell"
            class="text-repae-gray-500 dark:text-repae-gray-400"
          />
        </button>

        <!-- Admin avatar -->
        <div class="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-gray-100 dark:bg-repae-gray-800">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <font-awesome-icon icon="fa-solid fa-user-cog" class="text-white text-xs" />
          </div>
          <span class="hidden sm:block text-sm font-medium font-brand text-repae-gray-900 dark:text-white">
            Admin
          </span>
        </div>
      </div>
    </div>
  </header>
</template>
