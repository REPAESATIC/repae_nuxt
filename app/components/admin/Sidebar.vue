<script setup lang="ts">
import { adminMainNav, adminNavGroups } from '@/data/admin/navigation'

const props = defineProps<{
  isCollapsed: boolean
  isMobileOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'closeMobile'): void
}>()

const route = useRoute()

// Track open state for each nav group
const openGroups = ref<Record<string, boolean>>({
  contenu: true,
  utilisateurs: true,
  referentiel: true,
})

const toggleGroup = (groupId: string) => {
  if (!props.isCollapsed || props.isMobileOpen) {
    openGroups.value[groupId] = !openGroups.value[groupId]
  }
}

const isActiveRoute = (href: string) => {
  if (href === '/admin') {
    return route.path === '/admin'
  }

  const allItems = adminNavGroups.flatMap(g => g.items)
  const hasMoreSpecificMatch = allItems.some(item => {
    return item.href !== href &&
           item.href.startsWith(href) &&
           route.path.startsWith(item.href)
  })

  if (hasMoreSpecificMatch) {
    return false
  }

  return route.path.startsWith(href)
}

const isGroupActive = (groupId: string) => {
  const group = adminNavGroups.find(g => g.id === groupId)
  return group?.items.some(item => isActiveRoute(item.href)) ?? false
}

const showLabel = computed(() => !props.isCollapsed || props.isMobileOpen)
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
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      @click="emit('closeMobile')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-screen bg-slate-950 border-r border-slate-800/80 transition-all duration-300 flex flex-col',
      isCollapsed ? 'lg:w-20' : 'lg:w-72',
      isMobileOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Logo Section -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
      <NuxtLink
        to="/admin"
        class="flex items-center gap-3"
        @click="emit('closeMobile')"
      >
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
          <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-white text-lg" />
        </div>
        <div v-if="showLabel" class="flex flex-col">
          <span class="text-sm font-bold font-brand text-white tracking-wide">
            REPAE
          </span>
          <span class="text-[10px] font-medium text-violet-400 tracking-widest uppercase">
            Administration
          </span>
        </div>
      </NuxtLink>

      <!-- Toggle button (desktop) -->
      <button
        class="hidden lg:flex p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        @click="emit('toggle')"
      >
        <font-awesome-icon
          :icon="isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"
          class="text-slate-500 text-sm"
        />
      </button>

      <!-- Close button (mobile) -->
      <button
        class="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        @click="emit('closeMobile')"
      >
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          class="text-slate-400"
        />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <!-- Main navigation -->
      <ul class="space-y-1">
        <li v-for="item in adminMainNav" :key="item.id">
          <NuxtLink
            :to="item.href"
            :class="[
              'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
              isActiveRoute(item.href)
                ? 'bg-violet-500/15 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            ]"
            @click="emit('closeMobile')"
          >
            <!-- Active indicator -->
            <div
              v-if="isActiveRoute(item.href)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-violet-500 rounded-r-full"
            />
            <div
              :class="[
                'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                isActiveRoute(item.href)
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-slate-800/80 text-slate-400 group-hover:bg-slate-800 group-hover:text-violet-400'
              ]"
            >
              <font-awesome-icon :icon="item.icon" class="text-sm" />
            </div>
            <span
              v-if="showLabel"
              class="font-medium font-brand text-sm"
            >
              {{ item.label }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Section divider -->
      <div class="my-4 mx-3">
        <div class="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      <!-- Nav groups -->
      <div v-for="group in adminNavGroups" :key="group.id" class="mb-2">
        <!-- Group header -->
        <button
          :class="[
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer',
            isGroupActive(group.id) ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'
          ]"
          @click="toggleGroup(group.id)"
        >
          <font-awesome-icon
            :icon="group.icon"
            :class="[
              'text-xs flex-shrink-0 w-4',
              isCollapsed && !isMobileOpen ? 'mx-auto' : ''
            ]"
          />
          <span
            v-if="showLabel"
            class="text-[11px] font-semibold font-brand uppercase tracking-wider flex-1 text-left"
          >
            {{ group.label }}
          </span>
          <font-awesome-icon
            v-if="showLabel"
            icon="fa-solid fa-chevron-down"
            :class="[
              'text-[10px] transition-transform duration-200',
              openGroups[group.id] ? 'rotate-180' : ''
            ]"
          />
        </button>

        <!-- Group items -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-40"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 max-h-40"
          leave-to-class="opacity-0 max-h-0"
        >
          <ul
            v-if="openGroups[group.id] || (isCollapsed && !isMobileOpen)"
            class="mt-1 space-y-0.5 overflow-hidden"
          >
            <li v-for="item in group.items" :key="item.id">
              <NuxtLink
                :to="item.href"
                :class="[
                  'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                  isActiveRoute(item.href)
                    ? 'bg-violet-500/15 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                ]"
                @click="emit('closeMobile')"
              >
                <!-- Active indicator -->
                <div
                  v-if="isActiveRoute(item.href)"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-violet-500 rounded-r-full"
                />
                <div
                  :class="[
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                    isActiveRoute(item.href)
                      ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-slate-800/80 text-slate-400 group-hover:bg-slate-800 group-hover:text-violet-400'
                  ]"
                >
                  <font-awesome-icon :icon="item.icon" class="text-sm" />
                </div>
                <div
                  v-if="showLabel"
                  class="flex items-center gap-2 flex-1 min-w-0"
                >
                  <span class="font-medium font-brand text-sm">
                    {{ item.label }}
                  </span>
                  <span
                    v-if="item.badge"
                    class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/20 whitespace-nowrap"
                  >
                    {{ item.badge }}
                  </span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </Transition>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-3 border-t border-slate-800/80">
      <!-- Admin info -->
      <div
        v-if="showLabel"
        class="mb-3 px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800/50"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <font-awesome-icon icon="fa-solid fa-user-cog" class="text-white text-xs" />
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-semibold font-brand text-slate-300 truncate">
              Administrateur
            </span>
            <span class="text-[10px] text-slate-500">
              Super Admin
            </span>
          </div>
        </div>
      </div>

      <!-- Back to site -->
      <NuxtLink
        to="/"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-all duration-200',
          isCollapsed && !isMobileOpen ? 'justify-center' : ''
        ]"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-sm" />
        <span v-if="showLabel" class="font-brand text-sm">
          Retour au site
        </span>
      </NuxtLink>
    </div>
  </aside>
</template>
