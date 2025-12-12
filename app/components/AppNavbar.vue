<script setup>
import { associationNavItems } from '@/data/association'

const { isDark, toggle } = useDarkMode()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const isAssociationDropdownOpen = ref(false)
const isMobileAssociationOpen = ref(false)

// Liens de navigation centralises
const navLinks = [
  { label: 'Accueil', href: '/', isNuxtLink: true },
  { label: "L'Association", href: '/association', isNuxtLink: true, hasDropdown: true },
  { label: 'Espace IT', href: '/espace-it', isNuxtLink: true },
  { label: 'Entreprises', href: '#enterprises', isNuxtLink: false },
  { label: 'Contact', href: '#contact', isNuxtLink: false }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    isMobileAssociationOpen.value = false
  }
}

const toggleMobileAssociation = () => {
  isMobileAssociationOpen.value = !isMobileAssociationOpen.value
}

// Detection du scroll pour effet de fond
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/80 dark:bg-repae-gray-900/80 backdrop-blur-lg shadow-lg shadow-black/5 dark:shadow-black/20'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-18">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="group flex items-center gap-3">
            <div class="relative">
              <img
                :src="isDark ? '/image/logos_REAPE/ICONE/ICONE_REPAE_GRB1.png' : '/image/logos_REAPE/ICONE/ICONE_REPAE_BGR1.png'"
                alt="REPAE"
                class="h-11 w-11 transition-transform duration-300 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-repae-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-repae-blue-500 to-repae-blue-400 bg-clip-text text-transparent font-brand">
              REPAE
            </span>
          </NuxtLink>
        </div>

        <!-- Navigation Desktop -->
        <div class="hidden lg:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.href">
            <!-- Regular Link -->
            <template v-if="!link.hasDropdown">
              <NuxtLink
                v-if="link.isNuxtLink"
                :to="link.href"
                class="nav-link"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="nav-link"
              >
                {{ link.label }}
              </a>
            </template>

            <!-- Dropdown Link (L'Association) -->
            <div
              v-else
              class="relative"
              @mouseenter="isAssociationDropdownOpen = true"
              @mouseleave="isAssociationDropdownOpen = false"
            >
              <NuxtLink
                :to="link.href"
                class="nav-link flex items-center gap-1"
              >
                {{ link.label }}
                <font-awesome-icon
                  icon="fa-solid fa-chevron-down"
                  :class="[
                    'text-xs transition-transform duration-200',
                    isAssociationDropdownOpen ? 'rotate-180' : ''
                  ]"
                />
              </NuxtLink>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div
                  v-if="isAssociationDropdownOpen"
                  class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-repae-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden"
                >
                  <div class="py-2">
                    <NuxtLink
                      v-for="item in associationNavItems"
                      :key="item.id"
                      :to="item.href"
                      class="flex items-center gap-3 px-4 py-3 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-700 transition-colors"
                    >
                      <div class="w-8 h-8 rounded-lg bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center">
                        <font-awesome-icon
                          :icon="item.icon"
                          class="text-sm text-repae-blue-500"
                        />
                      </div>
                      <div>
                        <span class="block text-sm font-medium font-brand text-repae-gray-900 dark:text-white">
                          {{ item.label }}
                        </span>
                        <span class="block text-xs font-brand text-repae-gray-500 dark:text-repae-gray-400">
                          {{ item.description }}
                        </span>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </Transition>
            </div>
          </template>
        </div>

        <!-- Actions Desktop -->
        <div class="hidden lg:flex items-center gap-3">
          <!-- Search Bar -->
          <div class="relative group">
            <input
              type="text"
              placeholder="Rechercher..."
              class="w-48 focus:w-64 px-4 py-2.5 pl-10 text-sm bg-gray-100/80 dark:bg-repae-gray-800/80 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 font-brand transition-all duration-300"
            />
            <font-awesome-icon
              icon="fa-solid fa-search"
              class="absolute left-3.5 top-1/2 -translate-y-1/2 text-repae-gray-400 text-sm transition-colors group-focus-within:text-repae-blue-500"
            />
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggle"
            class="relative p-2.5 rounded-xl bg-gray-100/80 dark:bg-repae-gray-800/80 border border-gray-200 dark:border-repae-gray-700 hover:border-repae-blue-500/50 transition-all duration-300 cursor-pointer group"
            :title="isDark ? 'Mode Clair' : 'Mode Sombre'"
          >
            <font-awesome-icon
              :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
              :class="[
                'text-lg transition-all duration-300',
                isDark ? 'text-amber-400 rotate-0' : 'text-repae-blue-500 rotate-0',
                'group-hover:rotate-12'
              ]"
            />
          </button>

          <!-- CTA Button -->
          <NuxtLink
            to="/association/adhesion"
            class="relative px-5 py-2.5 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 text-white font-semibold font-brand rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-repae-blue-500/25 hover:-translate-y-0.5"
          >
            <span class="relative z-10">Nous rejoindre</span>
            <div class="absolute inset-0 bg-gradient-to-r from-repae-blue-600 to-repae-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden flex items-center gap-2">
          <button
            @click="toggle"
            class="p-2.5 rounded-xl bg-gray-100/80 dark:bg-repae-gray-800/80 transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
              :class="isDark ? 'text-amber-400' : 'text-repae-blue-500'"
            />
          </button>
          <button
            @click="toggleMobileMenu"
            class="p-2.5 rounded-xl bg-gray-100/80 dark:bg-repae-gray-800/80 transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
              class="text-repae-gray-700 dark:text-repae-gray-300 text-xl w-5"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-repae-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-repae-gray-700/50 shadow-xl"
      >
        <div class="px-4 py-4 space-y-1">
          <template v-for="(link, index) in navLinks" :key="link.href">
            <!-- Regular mobile link -->
            <template v-if="!link.hasDropdown">
              <NuxtLink
                v-if="link.isNuxtLink"
                :to="link.href"
                class="block px-4 py-3 rounded-xl text-repae-gray-700 dark:text-repae-gray-300 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-800 hover:text-repae-blue-500 font-brand font-medium transition-all duration-200"
                :style="{ animationDelay: `${index * 50}ms` }"
                @click="isMobileMenuOpen = false"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="block px-4 py-3 rounded-xl text-repae-gray-700 dark:text-repae-gray-300 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-800 hover:text-repae-blue-500 font-brand font-medium transition-all duration-200"
                :style="{ animationDelay: `${index * 50}ms` }"
                @click="isMobileMenuOpen = false"
              >
                {{ link.label }}
              </a>
            </template>

            <!-- Mobile dropdown (L'Association) -->
            <div v-else>
              <button
                @click="toggleMobileAssociation"
                class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-repae-gray-700 dark:text-repae-gray-300 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-800 hover:text-repae-blue-500 font-brand font-medium transition-all duration-200 cursor-pointer"
              >
                <span>{{ link.label }}</span>
                <font-awesome-icon
                  icon="fa-solid fa-chevron-down"
                  :class="[
                    'text-xs transition-transform duration-200',
                    isMobileAssociationOpen ? 'rotate-180' : ''
                  ]"
                />
              </button>

              <!-- Mobile submenu -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="isMobileAssociationOpen" class="overflow-hidden">
                  <div class="pl-4 py-2 space-y-1">
                    <NuxtLink
                      v-for="item in associationNavItems"
                      :key="item.id"
                      :to="item.href"
                      class="flex items-center gap-3 px-4 py-2 rounded-lg text-repae-gray-600 dark:text-repae-gray-400 hover:bg-repae-blue-50 dark:hover:bg-repae-gray-800 hover:text-repae-blue-500 font-brand text-sm transition-colors"
                      @click="isMobileMenuOpen = false"
                    >
                      <font-awesome-icon :icon="item.icon" class="text-repae-blue-500 w-4" />
                      {{ item.label }}
                    </NuxtLink>
                  </div>
                </div>
              </Transition>
            </div>
          </template>

          <div class="pt-4 mt-4 border-t border-gray-200 dark:border-repae-gray-700">
            <!-- Mobile Search -->
            <div class="relative mb-4">
              <input
                type="text"
                placeholder="Rechercher..."
                class="w-full px-4 py-3 pl-11 text-sm bg-gray-100 dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 rounded-xl focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 font-brand transition-all"
              />
              <font-awesome-icon
                icon="fa-solid fa-search"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-repae-gray-400"
              />
            </div>

            <!-- Mobile CTA -->
            <NuxtLink
              to="/association/adhesion"
              class="block w-full px-4 py-3 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 text-white text-center font-semibold font-brand rounded-xl hover:shadow-lg transition-all"
              @click="isMobileMenuOpen = false"
            >
              Nous rejoindre
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>

  <!-- Spacer pour compenser la navbar fixed -->
  <div class="h-18" />
</template>

<style scoped>
@reference "@/assets/css/tailwind.css";

.nav-link {
  @apply relative px-4 py-2 text-repae-gray-600 dark:text-repae-gray-300 font-brand font-medium rounded-lg transition-all duration-200 hover:text-repae-blue-500 dark:hover:text-repae-blue-400;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-repae-blue-500 to-repae-blue-400 rounded-full transition-all duration-300 -translate-x-1/2;
}

.nav-link:hover::after {
  @apply w-1/2;
}

.h-18 {
  height: 4.5rem;
}
</style>
