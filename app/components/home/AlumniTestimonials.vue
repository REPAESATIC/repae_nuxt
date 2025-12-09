<script setup>
// Stats data
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

// Format displayed value with prefix and suffix
const formatValue = (stat) => {
  return `${stat.prefix}${stat.displayValue}${stat.suffix}`
}

// Intersection Observer for stats
let statsObserver = null

// Témoignages - rangée 1
const testimonialsRow1 = ref([
  {
    id: 1,
    name: 'Jean DUPONT',
    role: 'Directeur Technique',
    company: 'Tech Solutions',
    image: 'https://i.pravatar.cc/150?img=1',
    content: 'REPAE m\'a permis de développer mon réseau professionnel et d\'accéder à des opportunités exceptionnelles.',
  },
  {
    id: 2,
    name: 'Marie MARTIN',
    role: 'Chef de Projet',
    company: 'Innovation Corp',
    image: 'https://i.pravatar.cc/150?img=2',
    content: 'Grâce à REPAE, j\'ai pu rencontrer des mentors qui ont guidé ma carrière. C\'est une famille professionnelle.',
  },
  {
    id: 3,
    name: 'Pierre BERNARD',
    role: 'Data Scientist',
    company: 'DataTech Industries',
    image: 'https://i.pravatar.cc/150?img=3',
    content: 'Le réseau REPAE m\'a ouvert des portes que je n\'aurais jamais imaginées. Le soutien est incomparable.',
  },
  {
    id: 4,
    name: 'Sophie LEROY',
    role: 'Responsable Dev Durable',
    company: 'Green Energy',
    image: 'https://i.pravatar.cc/150?img=4',
    content: 'J\'ai réussi ma transition vers les technologies durables grâce à l\'accompagnement du réseau.',
  },
])

// Témoignages - rangée 2
const testimonialsRow2 = ref([
  {
    id: 5,
    name: 'Thomas PETIT',
    role: 'Architecte Systèmes',
    company: 'Aerospace Dynamics',
    image: 'https://i.pravatar.cc/150?img=5',
    content: 'Faire partie de REPAE, c\'est appartenir à une communauté d\'élite avec des opportunités extraordinaires.',
  },
  {
    id: 6,
    name: 'Camille ROBERT',
    role: 'Directrice Innovation',
    company: 'Smart Systems SA',
    image: 'https://i.pravatar.cc/150?img=6',
    content: 'Le programme de mentorat REPAE a transformé ma trajectoire. Le partage de connaissances est inestimable.',
  },
  {
    id: 7,
    name: 'Nicolas RICHARD',
    role: 'Responsable R&D',
    company: 'Robotics Lab',
    image: 'https://i.pravatar.cc/150?img=7',
    content: 'Le réseau REPAE est mon plus grand atout. Une communauté qui incarne l\'excellence et la solidarité.',
  },
  {
    id: 8,
    name: 'Emma DUBOIS',
    role: 'Lead Developer',
    company: 'FinTech Pro',
    image: 'https://i.pravatar.cc/150?img=8',
    content: 'Les événements networking de REPAE m\'ont permis de décrocher mon poste actuel. Merci au réseau !',
  },
])

// Pause on hover
const isPaused = ref(false)

const handleMouseEnter = () => {
  isPaused.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
}

onMounted(() => {
  // Observer pour les stats
  statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsVisible.value) {
          statsVisible.value = true
          displayedStats.value.forEach((stat, index) => {
            setTimeout(() => {
              animateCounter(index, stat.numericValue, 2000)
            }, index * 200)
          })
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsContainer.value) {
    statsObserver.observe(statsContainer.value)
  }
})

onUnmounted(() => {
  if (statsObserver) {
    statsObserver.disconnect()
  }
})
</script>

<template>
  <section class="pb-16 pt-8 bg-gray-50 dark:bg-repae-gray-900">
    <!-- Stats Bar - déborde sur HeroSection -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 mb-16 relative z-10">
      <div
        ref="statsContainer"
        class="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-repae-gray-800 p-5 rounded-xl shadow-2xl"
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

    <!-- Titre de la section -->
    <div class="text-center mb-12 px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-repae-blue-500 dark:text-white font-brand mb-4">
        Témoignages De Nos Alumni
      </h2>
      <p class="text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand">
        Découvrez les parcours inspirants de nos membres
      </p>
    </div>

    <!-- Marquee Container -->
    <div
      class="relative overflow-hidden"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Gradient overlays pour effet de fondu -->
      <div class="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-gray-50 dark:from-repae-gray-900 to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-gray-50 dark:from-repae-gray-900 to-transparent z-10 pointer-events-none"></div>

      <!-- Rangée 1 - Défilement vers la gauche -->
      <div class="mb-6">
        <div
          class="marquee-row flex gap-6"
          :class="{ 'paused': isPaused }"
        >
          <!-- Double les témoignages pour un défilement infini fluide -->
          <div
            v-for="(testimonial, index) in [...testimonialsRow1, ...testimonialsRow1]"
            :key="`row1-${index}`"
            class="testimonial-card shrink-0 w-80 md:w-96"
          >
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-repae-gray-700 h-full">
              <!-- Quote icon -->
              <div class="text-repae-blue-500/20 dark:text-repae-blue-400/20 mb-4">
                <font-awesome-icon icon="fa-solid fa-quote-left" class="text-3xl" />
              </div>

              <!-- Contenu du témoignage -->
              <p class="text-repae-gray-600 dark:text-repae-gray-300 font-brand text-sm leading-relaxed mb-6">
                "{{ testimonial.content }}"
              </p>

              <!-- Auteur -->
              <div class="flex items-center mt-auto">
                <img
                  :src="testimonial.image"
                  :alt="testimonial.name"
                  class="w-12 h-12 rounded-full ring-2 ring-repae-blue-500/20 mr-4"
                >
                <div>
                  <h4 class="font-bold text-repae-gray-900 dark:text-white font-brand text-sm">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-xs text-repae-blue-500 dark:text-repae-blue-400 font-brand">
                    {{ testimonial.role }}
                  </p>
                  <p class="text-xs text-repae-gray-500 dark:text-repae-gray-500 font-brand">
                    {{ testimonial.company }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rangée 2 - Défilement vers la droite -->
      <div>
        <div
          class="marquee-row marquee-reverse flex gap-6"
          :class="{ 'paused': isPaused }"
        >
          <!-- Double les témoignages pour un défilement infini fluide -->
          <div
            v-for="(testimonial, index) in [...testimonialsRow2, ...testimonialsRow2]"
            :key="`row2-${index}`"
            class="testimonial-card shrink-0 w-80 md:w-96"
          >
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-repae-gray-700 h-full">
              <!-- Quote icon -->
              <div class="text-repae-blue-500/20 dark:text-repae-blue-400/20 mb-4">
                <font-awesome-icon icon="fa-solid fa-quote-left" class="text-3xl" />
              </div>

              <!-- Contenu du témoignage -->
              <p class="text-repae-gray-600 dark:text-repae-gray-300 font-brand text-sm leading-relaxed mb-6">
                "{{ testimonial.content }}"
              </p>

              <!-- Auteur -->
              <div class="flex items-center mt-auto">
                <img
                  :src="testimonial.image"
                  :alt="testimonial.name"
                  class="w-12 h-12 rounded-full ring-2 ring-repae-blue-500/20 mr-4"
                >
                <div>
                  <h4 class="font-bold text-repae-gray-900 dark:text-white font-brand text-sm">
                    {{ testimonial.name }}
                  </h4>
                  <p class="text-xs text-repae-blue-500 dark:text-repae-blue-400 font-brand">
                    {{ testimonial.role }}
                  </p>
                  <p class="text-xs text-repae-gray-500 dark:text-repae-gray-500 font-brand">
                    {{ testimonial.company }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Stats animations */
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

/* Marquee animations */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.marquee-row {
  animation: marquee 30s linear infinite;
  width: max-content;
}

.marquee-row.marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

.marquee-row.paused {
  animation-play-state: paused;
}

/* Hover effect on cards */
.testimonial-card:hover {
  transform: scale(1.02);
}
</style>
