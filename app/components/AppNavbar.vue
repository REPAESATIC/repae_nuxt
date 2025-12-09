<script setup>
const { isDark, toggle } = useDarkMode()
const isMobileMenuOpen = ref(false)

// Liens de navigation centralisés
const navLinks = [
  { label: 'Accueil', href: '/', isNuxtLink: true },
  { label: "L'Association", href: '#association', isNuxtLink: false },
  { label: 'Espace IT', href: '#alumni', isNuxtLink: false },
  { label: 'Entreprises', href: '#enterprises', isNuxtLink: false },
  { label: 'Contact', href: '#contact', isNuxtLink: false }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-white dark:bg-repae-gray-800 shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img
              :src="isDark ? '/image/logos_REAPE/ICONE/ICONE_REPAE_GRB1.png' : '/image/logos_REAPE/ICONE/ICONE_REPAE_BGR1.png'"
              alt="REPAE"
              class="h-10 w-10 mr-2"
            />
            <span class="text-2xl font-bold text-repae-blue-500 font-brand">REPAE</span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <template v-for="link in navLinks" :key="link.href">
            <NuxtLink
              v-if="link.isNuxtLink"
              :to="link.href"
              class="text-repae-gray-700 dark:text-repae-gray-300 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 font-brand transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              class="text-repae-gray-700 dark:text-repae-gray-300 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 font-brand transition-colors"
            >
              {{ link.label }}
            </a>
          </template>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <!-- Search Bar -->
          <div class="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              class="w-64 px-4 py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-repae-gray-700 border border-gray-300 dark:border-repae-gray-600 rounded-lg focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent text-repae-gray-900 dark:text-white placeholder-repae-gray-500 dark:placeholder-repae-gray-400 font-brand transition-colors"
            />
            <font-awesome-icon
              icon="fa-solid fa-search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-repae-gray-500 dark:text-repae-gray-400 text-sm"
            />
          </div>
          <button
            @click="toggle"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
            :title="isDark ? 'Mode Clair' : 'Mode Sombre'"
          >
            <font-awesome-icon
              :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
              class="text-repae-gray-700 dark:text-repae-gray-300"
            />
          </button>
        </div>

        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="isMobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'"
              class="text-repae-gray-700 dark:text-repae-gray-300 text-xl"
            />
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700"
    >
      <div class="px-4 pt-2 pb-3 space-y-1">
        <template v-for="link in navLinks" :key="link.href">
          <NuxtLink
            v-if="link.isNuxtLink"
            :to="link.href"
            class="block px-3 py-2 rounded-md text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 font-brand"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="block px-3 py-2 rounded-md text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 font-brand"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </a>
        </template>
        <div class="pt-4 border-t border-gray-200 dark:border-repae-gray-700">
          <!-- Mobile Search Bar -->
          <div class="relative mb-4">
            <input
              type="text"
              placeholder="Rechercher..."
              class="w-full px-4 py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-repae-gray-700 border border-gray-300 dark:border-repae-gray-600 rounded-lg focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent text-repae-gray-900 dark:text-white placeholder-repae-gray-500 dark:placeholder-repae-gray-400 font-brand transition-colors"
            />
            <font-awesome-icon
              icon="fa-solid fa-search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-repae-gray-500 dark:text-repae-gray-400 text-sm"
            />
          </div>
          <div class="flex items-center justify-end mt-4">
            <button
              @click="toggle"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
              :title="isDark ? 'Mode Clair' : 'Mode Sombre'"
            >
              <font-awesome-icon
                :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"
                class="text-repae-gray-700 dark:text-repae-gray-300"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
