<script setup lang="ts">
// Layout protege pour l'Espace IT

const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}

// Fermer la sidebar mobile lors du changement de route
const route = useRoute()
watch(() => route.path, () => {
  isMobileSidebarOpen.value = false
})

// Sauvegarder l'etat de la sidebar dans localStorage
onMounted(() => {
  const saved = localStorage.getItem('sidebar-collapsed')
  if (saved !== null) {
    isSidebarCollapsed.value = saved === 'true'
  }
})

watch(isSidebarCollapsed, (value) => {
  localStorage.setItem('sidebar-collapsed', String(value))
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-950">
    <!-- Sidebar -->
    <EspaceItSidebar
      :is-collapsed="isSidebarCollapsed"
      :is-mobile-open="isMobileSidebarOpen"
      @toggle="toggleSidebar"
      @close-mobile="closeMobileSidebar"
    />

    <!-- Header -->
    <EspaceItHeader
      :is-sidebar-collapsed="isSidebarCollapsed"
      @toggle-mobile-sidebar="toggleMobileSidebar"
    />

    <!-- Main Content -->
    <main
      :class="[
        'pt-16 min-h-screen transition-all duration-300',
        isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      ]"
    >
      <div class="p-4 lg:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
