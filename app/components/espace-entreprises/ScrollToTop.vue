<script setup lang="ts">
const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-75"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-75"
  >
    <button
      v-if="isVisible"
      type="button"
      class="fixed bottom-6 right-6 z-40 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center group"
      title="Retour en haut"
      @click="scrollToTop"
    >
      <font-awesome-icon
        icon="fa-solid fa-chevron-up"
        class="text-lg group-hover:-translate-y-0.5 transition-transform"
      />
    </button>
  </Transition>
</template>
