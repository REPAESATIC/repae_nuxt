/**
 * Font Awesome Plugin
 * Manually registers Font Awesome icons and component
 */
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Prevent Font Awesome from adding its CSS since we did it manually
config.autoAddCss = false

// Import solid icons
import {
  faBars,
  faTimes,
  faXmark,
  faSearch,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faArrowRight,
  faArrowLeft,
  faExternalLinkAlt,
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faSun,
  faMoon,
  faUser,
  faUsers,
  faUserTie,
  faBriefcase,
  faBuilding,
  faHandshake,
  faGraduationCap,
  faTrophy,
  faEnvelope,
  faPhone,
  faGlobe,
  faChartLine,
  faMapMarkerAlt,
  faCalendar,
  faCalendarAlt,
  faClock,
  faHeart,
  faStar,
  faHome,
  faQuoteLeft,
  faQuoteRight,
  // Additional icons
  faCheck,
  faSpinner,
  faCircle,
  faHandPointer,
  faHandPointDown,
  faUserPlus,
  // Association icons
  faFileAlt,
  faGavel,
  faTag,
  faHandsHelping,
  faFlag,
  faRocket,
  // Espace IT icons
  faUserCircle,
  faAddressBook,
  faPencilAlt,
  faFilter,
  faBell,
  faSignOutAlt,
  faPlus,
  faEye,
  faPaperPlane,
  faSave,
  faCertificate,
  faCheckCircle,
  faIndustry,
  faLayerGroup,
  faThLarge,
  faList,
  faTimesCircle,
  faHourglassHalf,
  // Sprint 1 Espace IT - additional icons
  faGaugeHigh,
  faPlusCircle,
  faCog,
  faUserCheck,
  // Sprint 3 Profil icons
  faShare,
  // Sprint 5 Competences & Portfolio icons
  faPalette,
  faServer,
  faDatabase,
  faCloud,
  faMobileScreenButton,
  faEllipsis,
  faCube,
  faCode,
  faDesktop,
  // Sprint 6 Profile Edit icons
  faImage,
} from '@fortawesome/free-solid-svg-icons'

// Import regular icons
import {
  faThumbsUp as farThumbsUp,
  faHeart as farHeart,
  faCalendar as farCalendar,
  faClock as farClock,
  faEnvelope as farEnvelope,
} from '@fortawesome/free-regular-svg-icons'

// Import brand icons
import {
  faVuejs,
  faGithub,
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

// Add solid icons to library
library.add(
  faBars,
  faTimes,
  faXmark,
  faSearch,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faArrowRight,
  faArrowLeft,
  faExternalLinkAlt,
  faPlay,
  faPause,
  faExpand,
  faCompress,
  faSun,
  faMoon,
  faUser,
  faUsers,
  faUserTie,
  faBriefcase,
  faBuilding,
  faHandshake,
  faGraduationCap,
  faTrophy,
  faEnvelope,
  faPhone,
  faGlobe,
  faChartLine,
  faMapMarkerAlt,
  faCalendar,
  faCalendarAlt,
  faClock,
  faHeart,
  faStar,
  faHome,
  faQuoteLeft,
  faQuoteRight,
  // Additional icons
  faCheck,
  faSpinner,
  faCircle,
  faHandPointer,
  faHandPointDown,
  faUserPlus,
  // Association icons
  faFileAlt,
  faGavel,
  faTag,
  faHandsHelping,
  faFlag,
  faRocket,
  // Espace IT icons
  faUserCircle,
  faAddressBook,
  faPencilAlt,
  faFilter,
  faBell,
  faSignOutAlt,
  faPlus,
  faEye,
  faPaperPlane,
  faSave,
  faCertificate,
  faCheckCircle,
  faIndustry,
  faLayerGroup,
  faThLarge,
  faList,
  faTimesCircle,
  faHourglassHalf,
  // Sprint 1 Espace IT - additional icons
  faGaugeHigh,
  faPlusCircle,
  faCog,
  faUserCheck,
  // Sprint 3 Profil icons
  faShare,
  // Sprint 5 Competences & Portfolio icons
  faPalette,
  faServer,
  faDatabase,
  faCloud,
  faMobileScreenButton,
  faEllipsis,
  faCube,
  faCode,
  faDesktop,
  // Sprint 6 Profile Edit icons
  faImage,
)

// Add regular icons to library
library.add(
  farThumbsUp,
  farHeart,
  farCalendar,
  farClock,
  farEnvelope,
)

// Add brand icons to library
library.add(
  faVuejs,
  faGithub,
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
