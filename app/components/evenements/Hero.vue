<script setup>
const heroVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    heroVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="relative min-h-[350px] md:min-h-[450px] overflow-hidden">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/image/background/evenement1.jpg')"
    ></div>

    <!-- Overlay Gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div class="text-center">
        <!-- Badge -->
        <div
          :class="[
            'inline-flex items-center gap-2 px-4 py-2 bg-repae-blue-500/90 rounded-full mb-6 transition-all duration-1000 transform',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
        >
          <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-white" />
          <span class="text-white font-brand font-semibold text-sm">Agenda REPAE</span>
        </div>

        <!-- Title -->
        <h1
          :class="[
            'text-4xl md:text-5xl lg:text-6xl font-bold text-white font-brand mb-6 transition-all duration-1000 transform',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{ transitionDelay: '100ms' }"
        >
          Événements
        </h1>

        <!-- Subtitle -->
        <p
          :class="[
            'text-lg md:text-xl text-gray-200 font-brand max-w-2xl mx-auto mb-8 transition-all duration-1000 transform',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{ transitionDelay: '200ms' }"
        >
          Conférences, formations et moments de partage qui renforcent les liens entre alumni et favorisent l'excellence professionnelle.
        </p>

        <!-- Stats -->
        <div
          :class="[
            'flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-1000 transform',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{ transitionDelay: '300ms' }"
        >
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white font-brand">7+</div>
            <div class="text-gray-300 font-brand text-sm">Événements à venir</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white font-brand">5</div>
            <div class="text-gray-300 font-brand text-sm">Catégories</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-white font-brand">500+</div>
            <div class="text-gray-300 font-brand text-sm">Participants</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
