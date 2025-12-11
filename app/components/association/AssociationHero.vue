<script setup>
defineProps({
  titre: {
    type: String,
    required: true
  },
  sousTitre: {
    type: String,
    default: ''
  },
  backgroundImage: {
    type: String,
    default: '/image/background/background-image-hero-section.jpg'
  }
})

// Animation state
const heroVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    heroVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="relative min-h-[300px] md:min-h-[400px] bg-gradient-to-br from-repae-gray-800 to-repae-gray-900 dark:from-repae-gray-900 dark:to-black overflow-hidden">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center hero-background"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="text-center">
        <h1
          :class="[
            'text-3xl md:text-4xl lg:text-5xl font-bold text-white font-brand mb-4 transition-all duration-1000 transform',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
        >
          {{ titre }}
        </h1>
        <p
          v-if="sousTitre"
          :class="[
            'text-lg md:text-xl text-gray-200 font-brand max-w-2xl mx-auto transition-all duration-1000 transform',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{ transitionDelay: '200ms' }"
        >
          {{ sousTitre }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-background {
  transform-origin: center;
}

.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.5) 100%);
  z-index: 1;
}
</style>
