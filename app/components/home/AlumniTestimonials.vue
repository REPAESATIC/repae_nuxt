<script setup>
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

// Nombre de témoignages par vue (responsive)
const testimonialsPerView = computed(() => {
  if (typeof window === 'undefined') return 3
  const width = window.innerWidth
  if (width >= 1024) return 3 // Desktop: 3 témoignages
  if (width >= 768) return 2   // Tablet: 2 témoignages
  return 1                     // Mobile: 1 témoignage
})

// Nombre total de "pages" de témoignages
const totalPages = computed(() => {
  return Math.ceil(testimonials.value.length / testimonialsPerView.value)
})

// Fonction pour obtenir les témoignages d'une page spécifique
const getTestimonialsForPage = (pageIndex) => {
  const start = pageIndex * testimonialsPerView.value
  return testimonials.value.slice(start, start + testimonialsPerView.value)
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
  currentIndex.value = 0
}

onMounted(() => {
  startAutoScroll()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAutoScroll()
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section class="pb-16 pt-32 bg-gray-50 dark:bg-repae-gray-900">
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
                :key="testimonial.id"
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
