<script setup>
// Animation states for hero content
const heroContentVisible = ref(false)

const stats = ref([
  { value: '+150', label: 'Membres actifs', numericValue: 150, prefix: '+', suffix: '', key: 'members' },
  { value: '87%', label: "Taux d'insertion", numericValue: 87, prefix: '', suffix: '%', key: 'insertionRate' },
  { value: '13', label: 'Promotions', numericValue: 13, prefix: '', suffix: '', key: 'promotions' },
  { value: '+5', label: 'Partenariats', numericValue: 5, prefix: '+', suffix: '', key: 'partnerships' }
])

const displayedStats = ref(stats.value.map(stat => ({ ...stat, displayValue: 0 })))
const statsVisible = ref(false)
const statsContainer = ref(null)

// Counter animation function
const animateCounter = (index, targetValue, duration = 2000) => {
  const startTime = performance.now()
  const startValue = displayedStats.value[index].displayValue

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)

    const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart)
    displayedStats.value[index].displayValue = currentValue

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  requestAnimationFrame(updateCounter)
}

// Intersection Observer for triggering animations
let observer = null

onMounted(() => {
  // Trigger hero content animations immediately
  setTimeout(() => {
    heroContentVisible.value = true
  }, 100)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsVisible.value) {
          statsVisible.value = true
          // Trigger counter animations with staggered delays
          displayedStats.value.forEach((stat, index) => {
            setTimeout(() => {
              animateCounter(index, stat.numericValue, 2000)
            }, index * 200) // Staggered animation
          })
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsContainer.value) {
    observer.observe(statsContainer.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Format displayed value with prefix and suffix
const formatValue = (stat) => {
  return `${stat.prefix}${stat.displayValue}${stat.suffix}`
}
</script>

<template>
  <section class="relative min-h-[600px] bg-gradient-to-br from-repae-gray-800 to-repae-gray-900 dark:from-repae-gray-900 dark:to-black">
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
      <div
        ref="statsContainer"
        class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-white dark:bg-repae-gray-800 p-5 rounded-xl shadow-2xl relative -bottom-42"
      >
        <div
          v-for="(stat, index) in displayedStats"
          :key="stat.key"
          :class="[
            'stat-card rounded-lg p-6 transform transition-all duration-500 cursor-pointer relative overflow-hidden',
            stat.key === 'insertionRate'
              ? 'bg-gradient-to-br from-repae-gray-500 to-repae-gray-600 dark:from-repae-gray-600 dark:to-repae-gray-700 hover:from-repae-gray-600 hover:to-repae-gray-700'
              : 'bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 dark:from-repae-blue-600 dark:to-repae-blue-700 hover:from-repae-blue-600 hover:to-repae-blue-700',
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
          :style="{
            transitionDelay: `${index * 100}ms`,
            animationDelay: `${index * 200}ms`
          }"
        >
          <!-- Animated background effect -->
          <div class="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>

          <!-- Floating animation for icon -->
          <div class="stat-icon absolute -top-2 -right-2 text-white/20 text-6xl animate-pulse">
            <font-awesome-icon
              :icon="stat.key === 'members' ? 'fa-solid fa-users' :
                     stat.key === 'insertionRate' ? 'fa-solid fa-chart-line' :
                     stat.key === 'promotions' ? 'fa-solid fa-trophy' :
                     'fa-solid fa-handshake'"
            />
          </div>

          <div class="relative z-10">
            <div class="text-3xl md:text-4xl font-bold text-white font-brand mb-2 stat-number">
              {{ formatValue(stat) }}
            </div>
            <div :class="[
              'text-sm font-brand transition-colors duration-300',
              stat.key === 'insertionRate'
                ? 'text-gray-200'
                : 'text-blue-100'
            ]">
              {{ stat.label }}
            </div>
          </div>
        </div>
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(20, 136, 187, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(20, 136, 187, 0.5);
  }
}

.stat-card {
  animation: fadeInUp 0.8s ease-out forwards;
  position: relative;
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-icon {
  animation: float 3s ease-in-out infinite;
}

.stat-card:hover .stat-icon {
  animation-duration: 1.5s;
}

.stat-number {
  position: relative;
  display: inline-block;
}

.stat-number::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.stat-card:hover .stat-number::after {
  width: 100%;
}

/* Shimmer effect on hover */
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.stat-card:hover .stat-number {
  background: linear-gradient(90deg,
    currentColor 25%,
    rgba(255, 255, 255, 0.3) 50%,
    currentColor 75%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shimmer 2s linear infinite;
}
</style>
