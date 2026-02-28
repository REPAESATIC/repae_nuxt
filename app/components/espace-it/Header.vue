<script setup lang="ts">
const props = defineProps<{
  isSidebarCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMobileSidebar'): void
}>()

const { isDark, toggle: toggleDarkMode } = useDarkMode()
const {
  alumni,
  displayName,
  email,
  photoUrl,
  notifications,
  unreadCount,
  ensureLoaded,
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
  logout,
} = useItUser()

const isUserMenuOpen = ref(false)
const isNotificationsOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)
const notifMenuRef = ref<HTMLElement | null>(null)

// Charger le profil et les notifications au montage
onMounted(async () => {
  await ensureLoaded()
  fetchNotifications()
  fetchUnreadCount()
})

// Fermer les menus au clic extérieur
const onClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (userMenuRef.value && !userMenuRef.value.contains(target)) {
    isUserMenuOpen.value = false
  }
  if (notifMenuRef.value && !notifMenuRef.value.contains(target)) {
    isNotificationsOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

// Formatage date relative
const formatRelativeDate = (dateStr: string): string => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return 'À l\'instant'
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

// Actions notifications
const handleNotifClick = async (notif: typeof notifications.value[0]) => {
  if (!notif.isRead) {
    await markAsRead(notif.id)
  }
}

const handleMarkAllRead = async () => {
  await markAllAsRead()
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 right-0 z-30 h-16 bg-white/80 dark:bg-repae-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-repae-gray-700 transition-all duration-300',
      isSidebarCollapsed ? 'lg:left-20' : 'lg:left-64',
      'left-0'
    ]"
  >
    <div class="h-full px-4 lg:px-6 flex items-center justify-between">
      <!-- Left: Mobile menu button + Breadcrumb -->
      <div class="flex items-center gap-4">
        <!-- Mobile menu toggle -->
        <button
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          @click="emit('toggleMobileSidebar')"
        >
          <font-awesome-icon
            icon="fa-solid fa-bars"
            class="text-repae-gray-600 dark:text-repae-gray-400 text-xl"
          />
        </button>

        <!-- Breadcrumb placeholder -->
        <div class="hidden sm:block">
          <h1 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Espace IT
          </h1>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Search (desktop) -->
        <div class="hidden md:block relative">
          <input
            type="text"
            placeholder="Rechercher..."
            class="w-48 lg:w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 font-brand transition-all"
          />
          <font-awesome-icon
            icon="fa-solid fa-search"
            class="absolute left-3.5 top-1/2 -translate-y-1/2 text-repae-gray-400 text-sm"
          />
        </div>

        <!-- Dark mode toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          :title="isDark ? 'Mode clair' : 'Mode sombre'"
        >
          <font-awesome-icon
            :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
            :class="isDark ? 'text-amber-400' : 'text-repae-blue-500'"
          />
        </button>

        <!-- Notifications -->
        <div ref="notifMenuRef" class="relative">
          <button
            @click="isNotificationsOpen = !isNotificationsOpen; isUserMenuOpen = false"
            class="relative p-2 rounded-lg bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          >
            <font-awesome-icon
              icon="fa-solid fa-bell"
              class="text-repae-gray-600 dark:text-repae-gray-400"
            />
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>

          <!-- Notifications dropdown -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isNotificationsOpen"
              class="absolute right-0 mt-2 w-80 bg-white dark:bg-repae-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-repae-gray-700 flex items-center justify-between">
                <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
                  Notifications
                </h3>
                <button
                  v-if="unreadCount > 0"
                  class="text-xs font-medium font-brand text-repae-blue-500 hover:text-repae-blue-600 transition-colors cursor-pointer"
                  @click="handleMarkAllRead"
                >
                  Tout marquer lu
                </button>
              </div>
              <div class="max-h-80 overflow-y-auto">
                <div
                  v-for="notif in notifications"
                  :key="notif.id"
                  :class="[
                    'px-4 py-3 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer border-b border-gray-100 dark:border-repae-gray-700 last:border-b-0',
                    !notif.isRead ? 'bg-repae-blue-50/50 dark:bg-repae-blue-500/5' : ''
                  ]"
                  @click="handleNotifClick(notif)"
                >
                  <div class="flex items-start gap-3">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                        !notif.isRead ? 'bg-repae-blue-500' : 'bg-transparent'
                      ]"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="font-medium font-brand text-sm text-repae-gray-900 dark:text-white">
                        {{ notif.subject }}
                      </p>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5 line-clamp-2">
                        {{ notif.content }}
                      </p>
                      <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500 mt-1">
                        {{ formatRelativeDate(notif.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Empty state -->
                <div
                  v-if="notifications.length === 0"
                  class="py-8 text-center"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-bell-slash"
                    class="text-2xl text-repae-gray-300 dark:text-repae-gray-600 mb-2"
                  />
                  <p class="text-sm text-repae-gray-400 dark:text-repae-gray-500 font-brand">
                    Aucune notification
                  </p>
                </div>
              </div>
              <div
                v-if="notifications.length > 0"
                class="px-4 py-3 border-t border-gray-200 dark:border-repae-gray-700"
              >
                <NuxtLink
                  to="/espace-it/notifications"
                  class="block w-full text-center text-sm font-medium font-brand text-repae-blue-500 hover:text-repae-blue-600 transition-colors"
                  @click="isNotificationsOpen = false"
                >
                  Voir toutes les notifications
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- User Menu -->
        <div ref="userMenuRef" class="relative">
          <button
            @click="isUserMenuOpen = !isUserMenuOpen; isNotificationsOpen = false"
            class="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          >
            <div
              v-if="photoUrl"
              class="w-8 h-8 rounded-lg overflow-hidden shrink-0"
            >
              <img
                :src="photoUrl"
                :alt="displayName"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-8 h-8 rounded-lg bg-repae-blue-500 flex items-center justify-center shrink-0"
            >
              <span class="text-white text-sm font-bold font-brand">
                {{ alumni?.firstName?.charAt(0)?.toUpperCase() ?? '' }}{{ alumni?.lastName?.charAt(0)?.toUpperCase() ?? '' }}
              </span>
            </div>
            <div class="hidden sm:block text-left">
              <p class="text-sm font-medium font-brand text-repae-gray-900 dark:text-white">
                {{ displayName }}
              </p>
            </div>
            <font-awesome-icon
              icon="fa-solid fa-chevron-down"
              :class="[
                'text-xs text-repae-gray-400 transition-transform duration-200',
                isUserMenuOpen ? 'rotate-180' : ''
              ]"
            />
          </button>

          <!-- User dropdown -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-56 bg-white dark:bg-repae-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-repae-gray-700">
                <p class="font-medium font-brand text-repae-gray-900 dark:text-white">
                  {{ displayName }}
                </p>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate">
                  {{ email }}
                </p>
              </div>
              <div class="py-2">
                <NuxtLink
                  to="/espace-it/profil"
                  class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors"
                  @click="isUserMenuOpen = false"
                >
                  <font-awesome-icon icon="fa-solid fa-user" class="text-repae-gray-400 w-4" />
                  <span class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">Mon profil</span>
                </NuxtLink>
                <NuxtLink
                  to="/espace-it/parametres"
                  class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors"
                  @click="isUserMenuOpen = false"
                >
                  <font-awesome-icon icon="fa-solid fa-cog" class="text-repae-gray-400 w-4" />
                  <span class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">Paramètres</span>
                </NuxtLink>
              </div>
              <div class="py-2 border-t border-gray-200 dark:border-repae-gray-700">
                <button
                  class="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                  @click="logout"
                >
                  <font-awesome-icon icon="fa-solid fa-sign-out-alt" class="text-red-500 w-4" />
                  <span class="text-sm font-brand text-red-500">Déconnexion</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>
