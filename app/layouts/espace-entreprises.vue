<script setup lang="ts">
// Layout protege pour l'Espace Entreprises

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
  const saved = localStorage.getItem('sidebar-entreprises-collapsed')
  if (saved !== null) {
    isSidebarCollapsed.value = saved === 'true'
  }
})

watch(isSidebarCollapsed, (value) => {
  localStorage.setItem('sidebar-entreprises-collapsed', String(value))
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-950">
    <!-- Notifications -->
    <EspaceEntreprisesNotificationToast />

    <!-- Sidebar -->
    <EspaceEntreprisesSidebar
      :is-collapsed="isSidebarCollapsed"
      :is-mobile-open="isMobileSidebarOpen"
      @toggle="toggleSidebar"
      @close-mobile="closeMobileSidebar"
    />

    <!-- Header -->
    <EspaceEntreprisesHeader
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
        <!-- Breadcrumb -->
        <EspaceEntreprisesBreadcrumb />

        <!-- Page content with transition -->
        <Transition
          name="page"
          mode="out-in"
        >
          <div :key="route.path">
            <slot />
          </div>
        </Transition>
      </div>
    </main>

    <!-- Scroll to top button -->
    <EspaceEntreprisesScrollToTop />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
