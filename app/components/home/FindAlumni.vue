<script setup>
import World from '@svg-maps/world'

const formData = ref({
  firstName: '',
  name: '',
  company: '',
  email: '',
  promotion: ''
})

const handleSearch = () => {
  console.log('Search alumni:', formData.value)
}

// World map data
const map = World

// Hovered country state
const hovered = ref(null)

// Selected country state
const selectedCountry = ref(null)

// Click origin for animation
const clickOrigin = ref({ x: 0, y: 0 })
const cardWrapperRef = ref(null)
const mapContainerRef = ref(null)

// Mouse position for tooltip
const mousePosition = ref({ x: 0, y: 0 })

// Handle mouse move on map
const handleMouseMove = (event) => {
  const container = event.currentTarget
  const rect = container.getBoundingClientRect()
  mousePosition.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

// Pays principal (siège)
const mainCountry = 'ci'

// Mock alumni data by country
const alumniData = ref({
  ci: {
    id: 'ci',
    country: 'Côte d\'Ivoire',
    city: 'Abidjan',
    alumniCount: 120,
    topCompanies: ['Orange CI', 'BICICI', 'CIE', 'SODECI', 'Bolloré'],
    sectors: ['Télécoms', 'Banque', 'Énergie', 'Logistique'],
    image: 'https://picsum.photos/400/200?random=1',
    isMain: true
  },
  ma: {
    id: 'ma',
    country: 'Maroc',
    city: 'Casablanca',
    alumniCount: 35,
    topCompanies: ['OCP Group', 'Attijariwafa Bank', 'Maroc Telecom'],
    sectors: ['Industrie', 'Banque', 'Télécoms'],
    image: 'https://picsum.photos/400/200?random=2'
  },
  tn: {
    id: 'tn',
    country: 'Tunisie',
    city: 'Tunis',
    alumniCount: 28,
    topCompanies: ['Tunisie Telecom', 'BIAT', 'Groupe Poulina'],
    sectors: ['Télécoms', 'Banque', 'Industrie'],
    image: 'https://picsum.photos/400/200?random=3'
  },
  fr: {
    id: 'fr',
    country: 'France',
    city: 'Paris',
    alumniCount: 22,
    topCompanies: ['Orange', 'TotalEnergies', 'BNP Paribas'],
    sectors: ['Finance', 'Énergie', 'Télécoms'],
    image: 'https://picsum.photos/400/200?random=4'
  },
  sn: {
    id: 'sn',
    country: 'Sénégal',
    city: 'Dakar',
    alumniCount: 18,
    topCompanies: ['Sonatel', 'BCEAO', 'Port de Dakar'],
    sectors: ['Télécoms', 'Banque', 'Logistique'],
    image: 'https://picsum.photos/400/200?random=5'
  },
  be: {
    id: 'be',
    country: 'Belgique',
    city: 'Bruxelles',
    alumniCount: 12,
    topCompanies: ['Commission Européenne', 'BNP Paribas Fortis'],
    sectors: ['Institutions', 'Banque'],
    image: 'https://picsum.photos/400/200?random=6'
  },
  ca: {
    id: 'ca',
    country: 'Canada',
    city: 'Montréal',
    alumniCount: 8,
    topCompanies: ['Desjardins', 'Hydro-Québec', 'CGI'],
    sectors: ['Banque', 'Énergie', 'Technologies'],
    image: 'https://picsum.photos/400/200?random=7'
  },
  cm: {
    id: 'cm',
    country: 'Cameroun',
    city: 'Douala',
    alumniCount: 6,
    topCompanies: ['MTN Cameroon', 'Afriland First Bank'],
    sectors: ['Télécoms', 'Banque'],
    image: 'https://picsum.photos/400/200?random=8'
  },
  ch: {
    id: 'ch',
    country: 'Suisse',
    city: 'Genève',
    alumniCount: 5,
    topCompanies: ['ONU', 'Nestlé', 'UBS'],
    sectors: ['Institutions', 'Industrie', 'Finance'],
    image: 'https://picsum.photos/400/200?random=9'
  },
  us: {
    id: 'us',
    country: 'États-Unis',
    city: 'New York',
    alumniCount: 4,
    topCompanies: ['World Bank', 'Goldman Sachs'],
    sectors: ['Institutions', 'Finance'],
    image: 'https://picsum.photos/400/200?random=10'
  }
})

// Countries with alumni (colored)
const countriesWithAlumni = computed(() => Object.keys(alumniData.value))

// Default color for non-highlighted countries
const defaultColor = '#e5e7eb'

// Main country color (gold/orange)
const mainCountryColor = '#f59e0b'

// Selected color (green)
const selectedColor = '#22c55e'

// Get min/max alumni count for scaling (excluding main country)
const alumniCountsWithoutMain = computed(() => {
  return Object.entries(alumniData.value)
    .filter(([id]) => id !== mainCountry)
    .map(([, c]) => c.alumniCount)
})

const maxAlumniCount = computed(() => {
  return Math.max(...alumniCountsWithoutMain.value)
})

const minAlumniCount = computed(() => {
  return Math.min(...alumniCountsWithoutMain.value)
})

// Get color based on alumni count (blue scale)
const getAlumniColor = (count) => {
  // Normalize between min and max for better color distribution
  const range = maxAlumniCount.value - minAlumniCount.value
  const ratio = range > 0 ? (count - minAlumniCount.value) / range : 0.5

  // Scale from very light blue to dark blue
  // Light: hsl(210, 100%, 85%) -> Dark: hsl(220, 80%, 35%)
  const hue = 210 + (ratio * 10) // 210 to 220
  const saturation = 100 - (ratio * 20) // 100% to 80%
  const lightness = 85 - (ratio * 50) // 85% to 35%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// Get color for a country
const getColor = (id) => {
  const isHovered = hovered.value?.id === id
  const isSelected = selectedCountry.value?.id === id
  const hasAlumni = countriesWithAlumni.value.includes(id)
  const isMainCountry = id === mainCountry

  if (hasAlumni) {
    const countryData = alumniData.value[id]

    // Selected country
    if (isSelected) {
      return isHovered ? adjustBrightness(selectedColor, -15) : selectedColor
    }

    // Main country (Côte d'Ivoire) - special gold color
    if (isMainCountry) {
      return isHovered ? adjustBrightness(mainCountryColor, -15) : mainCountryColor
    }

    // Other countries - color based on alumni count
    const baseColor = getAlumniColor(countryData.alumniCount)
    if (isHovered) {
      // Darken on hover
      return adjustBrightness(baseColor, -15)
    }
    return baseColor
  }

  if (isHovered) {
    return '#bdbdbd'
  }

  return defaultColor
}

// Adjust brightness for hover effect (supports hex and hsl)
const adjustBrightness = (color, percent) => {
  // Handle HSL colors
  if (color.startsWith('hsl')) {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/)
    if (match) {
      const h = parseInt(match[1])
      const s = parseInt(match[2])
      const l = Math.max(0, Math.min(100, parseInt(match[3]) + percent))
      return `hsl(${h}, ${s}%, ${l}%)`
    }
    return color
  }

  // Handle hex colors
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1)}`
}

// Get alumni data for a country
const getAlumniForCountry = (countryId) => {
  return alumniData.value[countryId]
}

// Handle country click
const handleCountryClick = (location, event) => {
  const alumni = getAlumniForCountry(location.id)
  if (alumni) {
    // Calculate click position relative to card wrapper
    if (cardWrapperRef.value && mapContainerRef.value) {
      const cardRect = cardWrapperRef.value.getBoundingClientRect()
      const clickX = event.clientX - cardRect.left
      const clickY = event.clientY - cardRect.top
      clickOrigin.value = { x: clickX, y: clickY }

      // Set CSS custom properties for animation
      cardWrapperRef.value.style.setProperty('--origin-x', `${clickX}px`)
      cardWrapperRef.value.style.setProperty('--origin-y', `${clickY}px`)
    }
    selectedCountry.value = alumni
  }
}

// Handle tooltip click
const handleTooltipClick = () => {
  if (hovered.value) {
    const alumni = getAlumniForCountry(hovered.value.id)
    if (alumni) {
      selectedCountry.value = alumni
    }
  }
}

// Close country card
const closeCountryCard = () => {
  selectedCountry.value = null
}

// Handle country selection from list (bottom buttons)
const selectCountryFromList = (data) => {
  // Set default animation origin (center-left for list clicks)
  if (cardWrapperRef.value) {
    cardWrapperRef.value.style.setProperty('--origin-x', '-100px')
    cardWrapperRef.value.style.setProperty('--origin-y', '200px')
  }
  selectedCountry.value = data
}

// Total alumni count
const totalAlumni = computed(() => {
  return Object.values(alumniData.value).reduce((sum, country) => sum + country.alumniCount, 0)
})
</script>

<template>
  <section class="py-8 sm:py-12 lg:py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête responsive -->
      <div class="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-repae-blue-500 dark:text-white font-brand mb-3 sm:mb-4">
          Retrouver Nos Alumni
        </h2>
        <p class="text-base sm:text-lg text-repae-gray-600 dark:text-repae-gray-300 font-brand max-w-2xl mx-auto">
          Connectez-vous avec nos membres à travers le monde
        </p>
      </div>

      <!-- Légende -->
      <div class="flex flex-wrap justify-center gap-4 lg:gap-6 mb-6">
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-amber-500"></span>
          <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">Siège (Côte d'Ivoire)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-0.5">
            <span class="w-3 h-3 rounded-full" style="background: hsl(210, 100%, 85%)"></span>
            <span class="w-3 h-3 rounded-full" style="background: hsl(215, 90%, 60%)"></span>
            <span class="w-3 h-3 rounded-full" style="background: hsl(220, 80%, 35%)"></span>
          </div>
          <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">Moins → Plus d'alumni</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4 rounded-full bg-green-500"></span>
          <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">Sélectionné</span>
        </div>
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-users" class="text-repae-blue-500" />
          <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">{{ totalAlumni }}+ alumni dans {{ countriesWithAlumni.length }} pays</span>
        </div>
      </div>

      <!-- Map and Card Container -->
      <div class="relative flex flex-col lg:flex-row gap-6 lg:gap-0">
        <!-- Map Container -->
        <div ref="mapContainerRef" class="relative flex-1 bg-linear-to-br from-gray-50 to-gray-100 dark:from-repae-gray-700 dark:to-repae-gray-900 rounded-3xl p-4 lg:p-8 border border-gray-200/50 dark:border-repae-gray-600/50 shadow-xl lg:-mr-20 z-10">
          <!-- Map -->
          <div class="map-container relative" @mousemove="handleMouseMove">
            <svg
              :viewBox="map.viewBox"
              class="world-map w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-for="location in map.locations"
                :key="location.id"
                :d="location.path"
                :fill="getColor(location.id)"
                stroke="#fff"
                stroke-width="0.5"
                class="map-path"
                :class="{ 'cursor-pointer': countriesWithAlumni.includes(location.id) }"
                @mouseenter="hovered = location"
                @mouseleave="hovered = null"
                @click="handleCountryClick(location, $event)"
              />
            </svg>

            <!-- Tooltip -->
            <Transition name="fade">
              <div
                v-if="hovered"
                class="tooltip"
                :class="{ 'tooltip-clickable': getAlumniForCountry(hovered.id) }"
                :style="{
                  left: mousePosition.x + 15 + 'px',
                  top: mousePosition.y - 10 + 'px'
                }"
                @click.stop="handleTooltipClick"
              >
                <template v-if="getAlumniForCountry(hovered.id)">
                  <span class="tooltip-country-name">{{ getAlumniForCountry(hovered.id).country }}</span>
                  <span class="tooltip-alumni-count">{{ getAlumniForCountry(hovered.id).alumniCount }} alumni</span>
                  <span class="tooltip-hint">Cliquer pour voir</span>
                </template>
                <template v-else>
                  {{ hovered.name }}
                </template>
              </div>
            </Transition>
          </div>

          <!-- Instruction -->
          <p class="text-center text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-4">
            <font-awesome-icon icon="fa-solid fa-hand-pointer" class="mr-1" />
            Cliquez sur un pays coloré pour voir les alumni
          </p>
        </div>

        <!-- Card Container (Formulaire ou Notebook) -->
        <div ref="cardWrapperRef" class="card-wrapper lg:w-[380px] lg:flex-shrink-0 z-20 lg:mt-12 relative" style="perspective: 1200px;">
          <Transition
            enter-active-class="card-zoom-enter"
            leave-active-class="card-zoom-leave"
          >
            <!-- Formulaire d'inscription -->
            <div v-if="!selectedCountry" key="form" class="bg-slate-700 dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl relative mt-16 lg:mt-0">
              <!-- Logo responsive -->
              <div class="flex items-center justify-center mb-4 absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
                <img class="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg" src="/image/logos_REAPE/DECLINAISON/logo_BBL.png" alt="Logo REPAE">
              </div>

              <!-- Titre du formulaire responsive -->
              <div class="text-center mb-6 sm:mb-8 mt-6 sm:mt-10">
                <h3 class="text-lg sm:text-xl font-bold text-white font-brand">
                  Créer un compte ALUMNI
                </h3>
                <p class="text-xs sm:text-sm text-gray-300 font-brand mt-2">
                  Connectez-vous à notre réseau professionnel d'excellence
                </p>
              </div>

              <!-- Formulaire responsive -->
              <form @submit.prevent="handleSearch" class="space-y-3 sm:space-y-4">
                <!-- Champ Prénom -->
                <div class="relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-base sm:text-lg" />
                  </div>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                    placeholder="Entrez un prénom..."
                  >
                </div>

                <!-- Champ Nom -->
                <div class="relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500 text-base sm:text-lg" />
                  </div>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                    placeholder="Entrez un nom..."
                  >
                </div>

                <!-- Champ Entreprise -->
                <div class="relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-building" class="text-repae-blue-500 text-base sm:text-lg" />
                  </div>
                  <input
                    v-model="formData.company"
                    type="text"
                    class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                    placeholder="Entrez une entreprise..."
                  >
                </div>

                <!-- Champ Email -->
                <div class="relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-envelope" class="text-repae-blue-500 text-base sm:text-lg" />
                  </div>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand placeholder-repae-gray-400 border-0 text-sm sm:text-base"
                    placeholder="Entrez votre email..."
                  >
                </div>

                <!-- Champ Promotion/Formation -->
                <div class="relative">
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-repae-blue-500 text-base sm:text-lg" />
                  </div>
                  <select
                    v-model="formData.promotion"
                    class="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg bg-white text-repae-gray-900 font-brand border-0 appearance-none text-sm sm:text-base"
                  >
                    <option value="">Sélectionnez une promotion</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </select>
                  <!-- Flèche personnalisée pour le select -->
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <font-awesome-icon icon="fa-solid fa-chevron-down" class="text-repae-gray-400 text-sm" />
                  </div>
                </div>

                <!-- Bouton de recherche responsive -->
                <button
                  type="submit"
                  class="w-full bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-bold py-2.5 sm:py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg mt-4 sm:mt-6 text-sm sm:text-base cursor-pointer"
                >
                  <font-awesome-icon icon="fa-solid fa-user-plus" class="mr-2" />
                  S'inscrire
                </button>
              </form>
            </div>

            <!-- Card du pays sélectionné - Style Notebook -->
            <div v-else :key="'country-' + selectedCountry.id" class="notebook-card-wrapper">
              <div class="notebook-card">
                <!-- Image du pays avec effet scotch -->
                <div class="notebook-card-image">
                  <img
                    :src="selectedCountry.image"
                    :alt="selectedCountry.country"
                  >
                  <!-- Bouton fermer -->
                  <button
                    @click="closeCountryCard"
                    class="absolute top-2 right-2 w-7 h-7 bg-white/80 dark:bg-repae-gray-800/80 rounded-full flex items-center justify-center text-repae-gray-600 dark:text-repae-gray-300 hover:bg-white dark:hover:bg-repae-gray-700 transition-colors cursor-pointer z-10"
                  >
                    <font-awesome-icon icon="fa-solid fa-times" class="text-sm" />
                  </button>
                </div>

                <!-- Contenu -->
                <div class="notebook-card-content">
                  <!-- Titre du pays -->
                  <h3 class="notebook-card-title">
                    {{ selectedCountry.country }}
                  </h3>
                  <p class="notebook-card-location">
                    <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
                    {{ selectedCountry.city }}
                  </p>

                  <!-- Stats -->
                  <div class="notebook-card-stats">
                    <font-awesome-icon icon="fa-solid fa-users" class="text-repae-blue-500" />
                    <span class="notebook-card-stats-value">{{ selectedCountry.alumniCount }}</span>
                    <span class="notebook-card-stats-label">Alumni actifs</span>
                  </div>

                  <!-- Top entreprises -->
                  <p class="notebook-card-section-title">
                    <font-awesome-icon icon="fa-solid fa-building" class="text-repae-blue-500" />
                    Top Entreprises
                  </p>
                  <div class="notebook-card-tags">
                    <span
                      v-for="company in selectedCountry.topCompanies"
                      :key="company"
                      class="notebook-card-tag"
                    >
                      {{ company }}
                    </span>
                  </div>

                  <!-- Secteurs -->
                  <p class="notebook-card-section-title">
                    <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
                    Secteurs d'activité
                  </p>
                  <div class="notebook-card-tags">
                    <span
                      v-for="sector in selectedCountry.sectors"
                      :key="sector"
                      class="notebook-card-tag notebook-card-tag--blue"
                    >
                      {{ sector }}
                    </span>
                  </div>

                  <!-- Bouton voir les alumni -->
                  <button class="notebook-card-cta">
                    <font-awesome-icon icon="fa-solid fa-search" />
                    Voir les alumni
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Liste des pays avec alumni - Style Post-it -->
      <div class="mt-12">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="(data, countryId) in alumniData"
            :key="countryId"
            class="country-name-card"
            :class="{
              'country-name-card--active': selectedCountry?.id === countryId,
              'country-name-card--main': countryId === mainCountry
            }"
            @click="selectCountryFromList(data)"
          >
            <font-awesome-icon v-if="countryId === mainCountry" icon="fa-solid fa-star" class="text-xs mr-1" />
            {{ data.country }}
            <span class="country-name-card-count">{{ data.alumniCount }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Map Container */
.map-container {
  position: relative;
  width: 100%;
}

.world-map {
  width: 100%;
  height: auto;
}

/* Map Path Styles */
.map-path {
  transition: fill 0.2s ease, opacity 0.2s ease;
}

.map-path:hover {
  opacity: 0.85;
}

/* Tooltip */
.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  z-index: 50;
  white-space: nowrap;
  transform: translateY(-50%);
}

.tooltip-clickable {
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  transition: all 0.2s ease;
}

.tooltip-clickable:hover {
  background: rgba(20, 136, 187, 0.95);
  transform: translateY(-50%) scale(1.05);
}

.tooltip-country-name {
  font-weight: 600;
  font-size: 14px;
}

.tooltip-alumni-count {
  font-size: 12px;
  color: #93c5fd;
}

.tooltip-hint {
  font-size: 11px;
  opacity: 0.7;
  font-weight: 400;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Notebook Card Styles */
.notebook-card-wrapper {
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.25));
}

.notebook-card {
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 30px;
  background:
    repeating-linear-gradient(#0000 0 calc(1.2rem - 1px), #66afe1 0 1.2rem) right bottom / 100% 100%,
    linear-gradient(#1488bb 0 0) 30px 0 / 2px 100% #fff;
  background-repeat: no-repeat;
  line-height: 1.2rem;
  -webkit-mask: radial-gradient(circle 0.8rem at 2px 50%, #0000 98%, #000) 0 0 / 100% 2.4rem;
  mask: radial-gradient(circle 0.8rem at 2px 50%, #0000 98%, #000) 0 0 / 100% 2.4rem;
}

:root.dark .notebook-card {
  background:
    repeating-linear-gradient(#0000 0 calc(1.2rem - 1px), #374151 0 1.2rem) right bottom / 100% 100%,
    linear-gradient(#1488bb 0 0) 30px 0 / 2px 100% #1f2937;
  background-repeat: no-repeat;
}

.notebook-card-image {
  height: calc(10 * 1.2rem);
  padding: 1.2rem 1.2rem 0;
  position: relative;
}

.notebook-card-image::before,
.notebook-card-image::after {
  content: "";
  position: absolute;
  width: 20px;
  left: 60%;
  top: 0;
  height: 45px;
  background: rgba(230, 230, 230, 0.72);
  transform: rotate(45deg);
  z-index: 5;
}

.notebook-card-image::after {
  transform: rotate(-45deg);
  top: auto;
  bottom: -22px;
  left: 40%;
}

:root.dark .notebook-card-image::before,
:root.dark .notebook-card-image::after {
  background: rgba(55, 65, 81, 0.72);
}

.notebook-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
}

.notebook-card-content {
  padding: 1.2rem;
}

.notebook-card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 1.2rem 0;
  line-height: 1.2rem;
  font-family: 'Montserrat', sans-serif;
}

:root.dark .notebook-card-title {
  color: #f9fafb;
}

.notebook-card-location {
  font-size: 0.875rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.2rem 0;
  line-height: 1.2rem;
}

:root.dark .notebook-card-location {
  color: #9ca3af;
}

.notebook-card-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.2rem 0;
  padding: 0.6rem;
  background: #eff6ff;
  border-radius: 0.5rem;
  line-height: 1.2rem;
}

:root.dark .notebook-card-stats {
  background: rgba(20, 136, 187, 0.15);
}

.notebook-card-stats-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1488bb;
}

:root.dark .notebook-card-stats-value {
  color: #5cb8d6;
}

.notebook-card-stats-label {
  font-size: 0.75rem;
  color: #6b7280;
}

:root.dark .notebook-card-stats-label {
  color: #9ca3af;
}

.notebook-card-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.2rem 0 0.6rem;
  line-height: 1.2rem;
}

:root.dark .notebook-card-section-title {
  color: #d1d5db;
}

.notebook-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.2rem;
  line-height: 1.2rem;
}

.notebook-card-tag {
  padding: 0.2rem 0.6rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 500;
}

:root.dark .notebook-card-tag {
  background: #374151;
  color: #e5e7eb;
}

.notebook-card-tag--blue {
  background: #dbeafe;
  color: #1e40af;
}

:root.dark .notebook-card-tag--blue {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.notebook-card-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 1rem;
  margin: 1.2rem 0;
  background: #fffef0;
  color: #1488bb;
  font-weight: 600;
  font-family: 'Caveat', 'Comic Sans MS', cursive;
  font-size: 1.1rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 20px rgba(255, 251, 235, 0.5);
  transition: all 0.2s ease;
  transform: rotate(-1deg);
  line-height: 1.2rem;
}

.notebook-card-cta::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 10px;
  background: linear-gradient(
    to bottom,
    rgba(20, 136, 187, 0.6) 0%,
    rgba(20, 136, 187, 0.4) 100%
  );
  border-radius: 2px;
}

.notebook-card-cta:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow:
    4px 4px 0 rgba(0, 0, 0, 0.15),
    inset 0 0 20px rgba(255, 251, 235, 0.5);
}

:root.dark .notebook-card-cta {
  background: #fefce8;
  color: #1488bb;
}

/* Country Name Cards - Post-it Style */
.country-name-card {
  padding: 0.5rem 1rem;
  background: #fffef0;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  transform: rotate(var(--rotation, 0deg));
}

.country-name-card:nth-child(odd) {
  --rotation: -1deg;
}

.country-name-card:nth-child(even) {
  --rotation: 1deg;
}

.country-name-card:nth-child(3n) {
  --rotation: -0.5deg;
}

.country-name-card::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 8px;
  background: rgba(156, 163, 175, 0.5);
  border-radius: 1px;
}

.country-name-card:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.12);
  background: #fefce8;
}

.country-name-card--active {
  background: #dbeafe;
  color: #1e40af;
  font-weight: 600;
}

.country-name-card--active::before {
  background: rgba(59, 130, 246, 0.6);
}

.country-name-card--main {
  background: #fef3c7;
  color: #92400e;
}

.country-name-card--main::before {
  background: rgba(245, 158, 11, 0.6);
}

.country-name-card--main.country-name-card--active {
  background: #fde68a;
}

:root.dark .country-name-card {
  background: #374151;
  color: #e5e7eb;
}

:root.dark .country-name-card:hover {
  background: #4b5563;
}

:root.dark .country-name-card--active {
  background: #1e40af;
  color: #fff;
}

:root.dark .country-name-card--main {
  background: #78350f;
  color: #fef3c7;
}

:root.dark .country-name-card--main.country-name-card--active {
  background: #b45309;
}

.country-name-card-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(20, 136, 187, 0.2);
  color: #1488bb;
  border-radius: 9999px;
}

:root.dark .country-name-card-count {
  background: rgba(20, 136, 187, 0.3);
  color: #5cb8d6;
}

.country-name-card--main .country-name-card-count {
  background: rgba(146, 64, 14, 0.2);
  color: #92400e;
}

:root.dark .country-name-card--main .country-name-card-count {
  background: rgba(254, 243, 199, 0.2);
  color: #fef3c7;
}

.country-name-card--active .country-name-card-count {
  background: rgba(255, 255, 255, 0.3);
  color: inherit;
}

/* Card transition - zoom from click origin */
@keyframes zoomFromOrigin {
  0% {
    transform: translate(var(--origin-x, -200px), var(--origin-y, 100px)) scale(0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
}

@keyframes zoomToOrigin {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--origin-x, -200px), var(--origin-y, 100px)) scale(0.1);
    opacity: 0;
  }
}

.card-zoom-enter {
  animation: zoomFromOrigin 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  position: relative;
  z-index: 10;
}

.card-zoom-leave {
  animation: zoomToOrigin 0.4s cubic-bezier(0.55, 0, 1, 0.45) forwards;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
