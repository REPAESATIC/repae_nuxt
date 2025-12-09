<script setup>
// Animation states for hero content
const heroContentVisible = ref(false)

onMounted(() => {
  // Trigger hero content animations immediately
  setTimeout(() => {
    heroContentVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="relative min-h-[600px] pb-32 bg-gradient-to-br from-repae-gray-800 to-repae-gray-900 dark:from-repae-gray-900 dark:to-black overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center hero-background"
      :style="{ backgroundImage: 'url(/image/background/background-image-hero-section.jpg)' }"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="w-full md:w-6/12 md:ml-auto text-center md:text-left">
        <h1
          :class="[
            'text-4xl text-shadow-lg text-shadow-repae-blue-500 md:text-5xl lg:text-6xl font-bold text-white font-brand mb-6 transition-all duration-1000 transform',
            heroContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
        >
          Nous sommes l'empreinte de l'excellence
        </h1>
        <p
          :class="[
            'text-xl md:text-2xl text-gray-200 font-brand mb-8 max-w-3xl m-x-auto md:mx-0 transition-all duration-1000 transform',
            heroContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{ transitionDelay: '300ms' }"
        >
          Rejoignez le réseau professionnel des alumni de l'ESATIC et transformez votre carrière
        </p>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Background zoom animation */
@keyframes zoomInOut {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.hero-background {
  animation: zoomInOut 20s ease-in-out infinite;
  transform-origin: center;
  will-change: transform;
}

/* Parallax effect on scroll */
.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%);
  z-index: 1;
}
</style>
