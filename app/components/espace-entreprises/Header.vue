<script setup lang="ts">
import { currentEntreprise } from '@/data/espace-entreprises/current-entreprise'

const props = defineProps<{
  isSidebarCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMobileSidebar'): void
}>()

const { isDark, toggle: toggleDarkMode } = useDarkMode()
const isUserMenuOpen = ref(false)
const isNotificationsOpen = ref(false)

// Mock notifications pour entreprise
const notifications = ref([
  { id: 1, title: 'Nouvelle candidature', message: 'Jean Kouassi a postule a votre offre Developpeur Full Stack', time: 'Il y a 30min', unread: true },
  { id: 2, title: 'Offre expiree', message: 'Votre offre "Stage Data Analyst" expire dans 3 jours', time: 'Il y a 2h', unread: true },
  { id: 3, title: 'Badge debloque', message: 'Felicitations ! Vous avez atteint le badge Gold', time: 'Il y a 1j', unread: false }
])

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

// Badge label
const badgeLabel = computed(() => {
  const badges: Record<string, string> = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum'
  }
  return badges[currentEntreprise.badge_recruteur] || 'Bronze'
})

const badgeColor = computed(() => {
  const colors: Record<string, string> = {
    bronze: 'text-orange-600 bg-orange-100 dark:bg-orange-500/20 dark:text-orange-400',
    silver: 'text-gray-600 bg-gray-200 dark:bg-gray-500/20 dark:text-gray-300',
    gold: 'text-amber-600 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400',
    platinum: 'text-purple-600 bg-purple-100 dark:bg-purple-500/20 dark:text-purple-400'
  }
  return colors[currentEntreprise.badge_recruteur] || colors.bronze
})
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
      <!-- Left: Mobile menu button + Title -->
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

        <!-- Title -->
        <div class="hidden sm:block">
          <h1 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            Espace Entreprises
          </h1>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Points fidelite (desktop) -->
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
          <font-awesome-icon icon="fa-solid fa-star" class="text-emerald-500" />
          <span class="text-sm font-semibold font-brand text-emerald-600 dark:text-emerald-400">
            {{ currentEntreprise.points_fidelite }} pts
          </span>
        </div>

        <!-- Dark mode toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          :title="isDark ? 'Mode clair' : 'Mode sombre'"
        >
          <font-awesome-icon
            :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
            :class="isDark ? 'text-amber-400' : 'text-emerald-500'"
          />
        </button>

        <!-- Notifications -->
        <div class="relative">
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
              {{ unreadCount }}
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
              <div class="px-4 py-3 border-b border-gray-200 dark:border-repae-gray-700">
                <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white">
                  Notifications
                </h3>
              </div>
              <div class="max-h-80 overflow-y-auto">
                <div
                  v-for="notif in notifications"
                  :key="notif.id"
                  :class="[
                    'px-4 py-3 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer border-b border-gray-100 dark:border-repae-gray-700 last:border-b-0',
                    notif.unread ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : ''
                  ]"
                >
                  <div class="flex items-start gap-3">
                    <div
                      :class="[
                        'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                        notif.unread ? 'bg-emerald-500' : 'bg-transparent'
                      ]"
                    />
                    <div class="flex-1 min-w-0">
                      <p class="font-medium font-brand text-sm text-repae-gray-900 dark:text-white">
                        {{ notif.title }}
                      </p>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5 line-clamp-2">
                        {{ notif.message }}
                      </p>
                      <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500 mt-1">
                        {{ notif.time }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 border-t border-gray-200 dark:border-repae-gray-700">
                <button class="w-full text-center text-sm font-medium font-brand text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer">
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Entreprise Menu -->
        <div class="relative">
          <button
            @click="isUserMenuOpen = !isUserMenuOpen; isNotificationsOpen = false"
            class="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-gray-100 dark:bg-repae-gray-800 hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          >
            <img
              :src="currentEntreprise.logo_url"
              :alt="currentEntreprise.nom"
              class="w-8 h-8 rounded-lg object-cover"
            />
            <div class="hidden sm:block text-left">
              <p class="text-sm font-medium font-brand text-repae-gray-900 dark:text-white">
                {{ currentEntreprise.nom }}
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

          <!-- Entreprise dropdown -->
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
              class="absolute right-0 mt-2 w-64 bg-white dark:bg-repae-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-repae-gray-700">
                <div class="flex items-center gap-3">
                  <img
                    :src="currentEntreprise.logo_url"
                    :alt="currentEntreprise.nom"
                    class="w-10 h-10 rounded-lg object-cover"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-medium font-brand text-repae-gray-900 dark:text-white truncate">
                      {{ currentEntreprise.nom }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full', badgeColor]">
                        {{ badgeLabel }}
                      </span>
                      <span
                        v-if="currentEntreprise.verifie"
                        class="text-xs text-emerald-500 flex items-center gap-1"
                      >
                        <font-awesome-icon icon="fa-solid fa-check-circle" />
                        Verifie
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Points (mobile) -->
              <div class="md:hidden px-4 py-3 border-b border-gray-200 dark:border-repae-gray-700">
                <div class="flex items-center gap-2">
                  <font-awesome-icon icon="fa-solid fa-star" class="text-emerald-500" />
                  <span class="text-sm font-semibold font-brand text-emerald-600 dark:text-emerald-400">
                    {{ currentEntreprise.points_fidelite }} points fidelite
                  </span>
                </div>
              </div>

              <div class="py-2">
                <NuxtLink
                  to="/espace-entreprises/profil"
                  class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors"
                  @click="isUserMenuOpen = false"
                >
                  <font-awesome-icon icon="fa-solid fa-building" class="text-repae-gray-400 w-4" />
                  <span class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">Profil entreprise</span>
                </NuxtLink>
                <NuxtLink
                  to="/espace-entreprises/fidelite"
                  class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors"
                  @click="isUserMenuOpen = false"
                >
                  <font-awesome-icon icon="fa-solid fa-star" class="text-repae-gray-400 w-4" />
                  <span class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">Programme fidelite</span>
                </NuxtLink>
                <NuxtLink
                  to="/espace-entreprises/parametres"
                  class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors"
                  @click="isUserMenuOpen = false"
                >
                  <font-awesome-icon icon="fa-solid fa-cog" class="text-repae-gray-400 w-4" />
                  <span class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">Parametres</span>
                </NuxtLink>
              </div>
              <div class="py-2 border-t border-gray-200 dark:border-repae-gray-700">
                <button
                  class="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <font-awesome-icon icon="fa-solid fa-sign-out-alt" class="text-red-500 w-4" />
                  <span class="text-sm font-brand text-red-500">Deconnexion</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>
