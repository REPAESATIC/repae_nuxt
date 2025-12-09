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

const testimonials = ref([
  {
    id: 1,
    name: 'Jean DUPONT',
    role: 'Directeur Technique',
    company: 'Tech Solutions',
    image: 'https://i.pravatar.cc/150?img=1',
    content: 'REPAE m\'a permis de développer mon réseau professionnel et d\'accéder à des opportunités exceptionnelles. La solidarité entre alumni est remarquable.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marie MARTIN',
    role: 'Chef de Projet',
    company: 'Innovation Corp',
    image: 'https://i.pravatar.cc/150?img=2',
    content: 'Grâce à REPAE, j\'ai pu rencontrer des mentors qui ont guidé ma carrière. C\'est bien plus qu\'un réseau, c\'est une famille professionnelle.',
    rating: 5
  },
  {
    id: 3,
    name: 'Pierre BERNARD',
    role: 'Data Scientist',
    company: 'DataTech Industries',
    image: 'https://i.pravatar.cc/150?img=3',
    content: 'Le réseau REPAE m\'a ouvert des portes que je n\'aurais jamais imaginées. La qualité des connexions et le soutien professionnel sont incomparables.',
    rating: 5
  },
  {
    id: 4,
    name: 'Sophie LEROY',
    role: 'Responsable Développement Durable',
    company: 'Green Energy Solutions',
    image: 'https://i.pravatar.cc/150?img=4',
    content: 'Grâce à REPAE, j\'ai réussi ma transition vers les technologies durables. L\'accompagnement et le soutien du réseau ont fait toute la différence.',
    rating: 5
  },
  {
    id: 5,
    name: 'Thomas PETIT',
    role: 'Architecte Systèmes',
    company: 'Aerospace Dynamics',
    image: 'https://i.pravatar.cc/150?img=5',
    content: 'Faire partie de REPAE, c\'est appartenir à une communauté d\'élite. Les opportunités de croissance professionnelle sont extraordinaires.',
    rating: 5
  },
  {
    id: 6,
    name: 'Camille ROBERT',
    role: 'Directrice Innovation',
    company: 'Smart Systems SA',
    image: 'https://i.pravatar.cc/150?img=6',
    content: 'Le programme de mentorat REPAE a transformé ma trajectoire professionnelle. Le partage de connaissances entre alumni est inestimable.',
    rating: 5
  },
  {
    id: 7,
    name: 'Nicolas RICHARD',
    role: 'Responsable R&D',
    company: 'Robotics Lab',
    image: 'https://i.pravatar.cc/150?img=7',
    content: 'Le réseau REPAE est mon plus grand atout professionnel. C\'est une communauté qui incarne véritablement l\'excellence et la solidarité.',
    rating: 5
  },
])

const currentIndex = ref(0)
const isPaused = ref(false)
let autoScrollInterval = null

// Largeur de la fenêtre réactive
const windowWidth = ref(1024)

// Nombre de témoignages par vue (responsive)
const testimonialsPerView = computed(() => {
  if (windowWidth.value >= 1024) return 3 // Desktop: 3 témoignages
  if (windowWidth.value >= 768) return 2   // Tablet: 2 témoignages
  return 1                                  // Mobile: 1 témoignage
})

// Nombre total de "pages" de témoignages
const totalPages = computed(() => {
  return Math.ceil(testimonials.value.length / testimonialsPerView.value)
})

// Fonction pour obtenir les témoignages d'une page spécifique
// Complète avec des témoignages du début si la page est incomplète (pour garder la ligne pleine)
const getTestimonialsForPage = (pageIndex) => {
  const perView = testimonialsPerView.value
  const total = testimonials.value.length
  const start = pageIndex * perView
  const result = []

  for (let i = 0; i < perView; i++) {
    const index = (start + i) % total
    result.push({ ...testimonials.value[index], displayKey: `${pageIndex}-${i}` })
  }

  return result
}

const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    if (!isPaused.value) {
      nextTestimonial()
    }
  }, 5000) // Change testimonials every 5 seconds
}

const stopAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
  }
}

const previousTestimonial = () => {
  currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : totalPages.value - 1
}

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % totalPages.value
}

const goToTestimonial = (index) => {
  currentIndex.value = index
}

const handleMouseEnter = () => {
  isPaused.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  // Réinitialiser l'index si on dépasse le nombre de pages
  if (currentIndex.value >= totalPages.value) {
    currentIndex.value = Math.max(0, totalPages.value - 1)
  }
}

onMounted(() => {
  // Initialiser la largeur de la fenêtre
  windowWidth.value = window.innerWidth
  startAutoScroll()
  window.addEventListener('resize', handleResize)

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
  stopAutoScroll()
  window.removeEventListener('resize', handleResize)
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

    <div class="mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-repae-blue-500 dark:text-white font-brand mb-4">
          Témoignages De Nos Alumni
        </h2>
        <p class="text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand">
          Découvrez les parcours inspirants de nos membres
        </p>
      </div>

      <div class="relative overflow-hidden" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- Slider avec groupes de témoignages -->
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <!-- Chaque "slide" contient un groupe de témoignages -->
          <div
            v-for="pageIndex in totalPages"
            :key="pageIndex"
            class="w-full flex-shrink-0 px-4"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="testimonial in getTestimonialsForPage(pageIndex - 1)"
                :key="testimonial.displayKey"
                class="transform transition-all duration-300 hover:scale-105"
              >
                <div class="bg-white dark:bg-repae-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-l-repae-blue-500 h-full flex flex-col">
                  <div class="flex items-start mb-4">
                    <img
                      :src="testimonial.image"
                      :alt="testimonial.name"
                      class="w-14 h-14 rounded-full mr-4 flex-shrink-0"
                    >
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-repae-gray-900 dark:text-white font-brand text-sm">
                        {{ testimonial.name }}
                      </h3>
                      <p class="text-xs text-repae-gray-600 dark:text-repae-gray-400 font-brand truncate">
                        {{ testimonial.role }}
                      </p>
                      <p class="text-xs text-repae-gray-500 dark:text-repae-gray-500 font-brand truncate">
                        {{ testimonial.company }}
                      </p>
                    </div>
                  </div>

                  <p class="text-repae-gray-600 dark:text-repae-gray-300 font-brand italic text-sm flex-1 mb-4 leading-relaxed">
                    "{{ testimonial.content }}"
                  </p>

                  <button class="text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 dark:hover:text-repae-blue-300 font-brand font-medium text-sm self-start">
                    Lire la suite →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation uniquement si plus d'une page -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-12 space-x-4">
          <button
            @click="previousTestimonial"
            class="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentIndex === 0"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-repae-gray-600 dark:text-repae-gray-400" />
          </button>

          <div class="flex space-x-2">
            <button
              v-for="(_, index) in totalPages"
              :key="index"
              @click="goToTestimonial(index)"
              class="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
              :class="currentIndex === index ? 'bg-repae-blue-500 w-8' : 'bg-gray-300 dark:bg-repae-gray-600 hover:bg-gray-400 dark:hover:bg-repae-gray-500'"
            ></button>
          </div>

          <button
            @click="nextTestimonial"
            class="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="currentIndex === totalPages - 1"
          >
            <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-repae-gray-600 dark:text-repae-gray-400" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>
