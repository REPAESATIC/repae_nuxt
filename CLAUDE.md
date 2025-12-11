# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site for deployment
- `pnpm preview` - Preview production build

### Firebase Deployment
- `firebase deploy` - Deploy to Firebase Hosting (requires `pnpm generate` first)

## Architecture Overview

This is a Nuxt 4 application with the following stack:

### Core Technologies
- **Nuxt 4** with Vue 3 Composition API
- **Vue Router** (auto-configured by Nuxt)
- **Pinia** for state management (`@pinia/nuxt`)
- **Tailwind CSS v4** with dark mode support (`@tailwindcss/vite`)
- **Font Awesome** for icons (`@vesp/nuxt-fontawesome`)
- **Animate.css** for CSS animations (`animate.css`)
- **Nuxt Content** for content management

### Project Structure (Nuxt 4 with app/ directory)
- `app/app.vue` - Root application component
- `app/pages/` - File-based routing (auto-generated routes)
- `app/layouts/` - Layout components
- `app/components/` - Auto-imported Vue components
- `app/composables/` - Auto-imported Vue composables
- `app/assets/css/tailwind.css` - Tailwind CSS with REPAE custom colors
- `nuxt.config.ts` - Nuxt configuration
- `tailwind.config.js` - Tailwind configuration
- `firebase.json` - Firebase Hosting configuration

### Key Features
- **Dark Mode**: Implemented via `useDarkMode()` composable (auto-imported)
- **Theme Persistence**: Dark mode preference saved to localStorage with key `theme`
- **System Theme Detection**: Falls back to system preference when no saved preference exists
- **Auto-imports**: Components, composables, and utilities are auto-imported by Nuxt
- **File-based Routing**: Pages in `app/pages/` automatically become routes

### Configuration Files
- `nuxt.config.ts` - Nuxt configuration with modules
- `tailwind.config.js` - Tailwind configuration with REPAE brand extensions
- `firebase.json` - Firebase Hosting configuration (uses `.output/public`)

## REPAE Brand Identity & Tailwind Configuration

**IMPORTANT**: This project uses a custom brand identity based on the REPAE brand guidelines.

### Brand Colors
- **Primary Blue**: `#1488bb` - Order, respect, uprightness
- **Secondary Gray**: `#717173` - Calm, tranquility, composed spirit

### Typography
- **Primary Font**: **Montserrat** - Use `font-montserrat` or `font-brand` classes

### CRITICAL - Tailwind v4 Dark Mode Configuration

Tailwind CSS v4 requires explicit dark mode configuration in CSS file:

```css
@import "tailwindcss";

/* Enable class-based dark mode in Tailwind v4 */
@variant dark (&:where(.dark, .dark *));
```

This `@variant` declaration in `app/assets/css/tailwind.css` is **MANDATORY**. Without it, dark mode classes (e.g., `dark:bg-gray-900`) will NOT work, even if the `.dark` class is present on the HTML element.

### Tailwind v4 Breaking Changes

1. **Opacity Syntax** - Old utilities no longer supported:
   - ❌ Old (v3): `bg-green-500 bg-opacity-50`, `text-blue-600 text-opacity-75`
   - ✅ New (v4): `bg-green-500/50`, `text-blue-600/75`
   - Use `/opacity` directly after color utility

2. **Cursor Pointer** - No longer default on buttons:
   - Must explicitly add `cursor-pointer` class to all interactive elements

### Custom Colors Configuration (Tailwind v4)

Custom colors are configured using the `@theme` directive in `/app/assets/css/tailwind.css`:

#### Available Color Classes
```css
/* Brand colors with full shade variations */
bg-repae-blue-{50-900}, text-repae-blue-{50-900}, border-repae-blue-{50-900}
bg-repae-gray-{50-900}, text-repae-gray-{50-900}, border-repae-gray-{50-900}

/* Brand aliases */
bg-repae-primary, text-repae-primary, border-repae-primary
bg-repae-secondary, text-repae-secondary, border-repae-secondary
bg-brand-blue, text-brand-blue, border-brand-blue
bg-brand-gray, text-brand-gray, border-brand-gray
```

### Best Practices for REPAE Colors

**ALWAYS use specific color variations (50-900) instead of base names:**
```css
/* Correct */
bg-repae-blue-500 hover:bg-repae-blue-600
text-repae-gray-900 dark:text-white

/* Incorrect */
bg-repae-blue hover:bg-repae-blue-600
```

**Common REPAE Color Patterns:**
```css
/* Headers and titles */
text-repae-gray-900 dark:text-white

/* Body text */
text-repae-gray-600 dark:text-repae-gray-300

/* Card backgrounds */
bg-white dark:bg-repae-gray-800

/* Page backgrounds */
bg-gray-50 dark:bg-repae-gray-900

/* Primary buttons */
bg-repae-blue-500 hover:bg-repae-blue-600 dark:bg-repae-blue-400 dark:hover:bg-repae-blue-300

/* Borders */
border-gray-200 dark:border-repae-gray-600
```

## Icon Usage Guidelines

Font Awesome is configured via a custom plugin at `app/plugins/fontawesome.ts`.

**IMPORTANT**: Icons must be explicitly imported and added to the library in the plugin file. Using an icon that hasn't been added will result in console errors like:
```
ERROR Could not find one or more icon(s) { prefix: 'fas', iconName: 'example' }
```

### Icon Usage Examples
```vue
<template>
  <!-- Solid icons -->
  <font-awesome-icon icon="fa-solid fa-heart" class="text-red-500" />

  <!-- Regular icons -->
  <font-awesome-icon icon="fa-regular fa-thumbs-up" class="text-blue-500" />

  <!-- Brand icons -->
  <font-awesome-icon icon="fa-brands fa-vuejs" class="text-green-500" />
</template>
```

### Adding New Icons (2 steps required)

To add a new icon, edit `app/plugins/fontawesome.ts`:

**Step 1**: Import the icon from the appropriate package:
```ts
// For solid icons (fa-solid)
import {
  faExistingIcon,
  faNewIcon,  // Add your new icon here
} from '@fortawesome/free-solid-svg-icons'

// For regular icons (fa-regular) - use alias to avoid conflicts
import {
  faNewIcon as farNewIcon,
} from '@fortawesome/free-regular-svg-icons'

// For brand icons (fa-brands)
import {
  faNewBrand,
} from '@fortawesome/free-brands-svg-icons'
```

**Step 2**: Add the icon to `library.add()`:
```ts
library.add(
  faExistingIcon,
  faNewIcon,  // Add your new icon here
)
```

### Icon Name Conversion

| Template Usage | Import Name |
|----------------|-------------|
| `fa-solid fa-user` | `faUser` |
| `fa-solid fa-chart-line` | `faChartLine` |
| `fa-solid fa-map-marker-alt` | `faMapMarkerAlt` |
| `fa-regular fa-heart` | `faHeart` (aliased as `farHeart`) |
| `fa-brands fa-github` | `faGithub` |

**Rule**: Convert kebab-case to camelCase and prefix with `fa`

### Currently Registered Icons

**Solid (fa-solid)**: faBars, faTimes, faXmark, faSearch, faChevronDown, faChevronLeft, faChevronRight, faArrowRight, faExternalLinkAlt, faPlay, faPause, faExpand, faCompress, faSun, faMoon, faUser, faUsers, faUserTie, faBriefcase, faBuilding, faHandshake, faGraduationCap, faTrophy, faEnvelope, faPhone, faGlobe, faChartLine, faMapMarkerAlt, faCalendar, faCalendarAlt, faClock, faHeart, faStar, faHome, faQuoteLeft, faQuoteRight, faCheck, faSpinner, faCircle

**Regular (fa-regular)**: faThumbsUp, faHeart, faCalendar, faClock, faEnvelope

**Brands (fa-brands)**: faVuejs, faGithub, faLinkedin, faTwitter, faFacebook, faInstagram, faYoutube

### Available Icon Packages
- `@fortawesome/free-solid-svg-icons` - Solid icons (fa-solid)
- `@fortawesome/free-regular-svg-icons` - Regular icons (fa-regular)
- `@fortawesome/free-brands-svg-icons` - Brand icons (fa-brands)

## Animate.css Animations

Animate.css is globally imported and ready to use. Add CSS animation classes directly to elements.

### Basic Usage

Always combine `animate__animated` with an animation class:

```vue
<template>
  <h1 class="animate__animated animate__fadeIn">Bienvenue</h1>
  <div class="animate__animated animate__bounceIn">Contenu animé</div>
</template>
```

### Popular Animations

| Category | Classes |
|----------|---------|
| **Fade** | `animate__fadeIn`, `animate__fadeInUp`, `animate__fadeInDown`, `animate__fadeInLeft`, `animate__fadeInRight` |
| **Bounce** | `animate__bounce`, `animate__bounceIn`, `animate__bounceOut`, `animate__bounceInUp` |
| **Slide** | `animate__slideInLeft`, `animate__slideInRight`, `animate__slideInUp`, `animate__slideInDown` |
| **Zoom** | `animate__zoomIn`, `animate__zoomOut`, `animate__zoomInUp`, `animate__zoomInDown` |
| **Attention** | `animate__pulse`, `animate__shake`, `animate__swing`, `animate__tada`, `animate__heartBeat` |

### Duration & Delay Modifiers

```vue
<!-- Speed modifiers -->
<div class="animate__animated animate__fadeIn animate__faster">0.5s</div>
<div class="animate__animated animate__fadeIn animate__fast">0.8s</div>
<div class="animate__animated animate__fadeIn animate__slow">2s</div>
<div class="animate__animated animate__fadeIn animate__slower">3s</div>

<!-- Delay modifiers -->
<div class="animate__animated animate__fadeIn animate__delay-1s">1s delay</div>
<div class="animate__animated animate__fadeIn animate__delay-2s">2s delay</div>
<div class="animate__animated animate__fadeIn animate__delay-3s">3s delay</div>
```

### Vue Integration Example

```vue
<script setup>
const isVisible = ref(false)
</script>

<template>
  <div
    v-if="isVisible"
    class="animate__animated animate__fadeInUp"
  >
    Contenu avec animation d'entrée
  </div>
</template>
```

### Documentation
Full animation list: https://animate.style/

## Dark Mode Implementation

**Architecture:**
- **Inline Head Script** (nuxt.config.ts): Runs immediately before page render to prevent flash
- **Plugin**: `app/plugins/darkMode.client.ts` - Client-side initialization
- **Composable**: `app/composables/useDarkMode.ts` - State management, persistence, system detection
- **Component**: `ThemeToggle.vue` - Toggle button with sun/moon icons
- **Initialization**: Called in `app/app.vue` at app level

**Features:**
- Persistence: localStorage with key `theme`
- Auto-detection: Detects system preference on first visit
- System listener: Reacts to OS theme changes (when no saved preference)
- No flash: Theme applied before first paint via inline script
- All components support dark mode with `dark:` prefix classes

**CRITICAL - CSS Configuration Required:**

Tailwind CSS v4 requires this in `app/assets/css/tailwind.css`:

```css
@import "tailwindcss";

/* Enable class-based dark mode in Tailwind v4 - MANDATORY */
@variant dark (&:where(.dark, .dark *));
```

Without this `@variant` declaration, `dark:` classes will NOT work!

### Usage Example

Use the `useDarkMode()` composable (auto-imported):

```vue
<script setup>
const { isDark, toggle } = useDarkMode()
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800">
    <button @click="toggle" class="cursor-pointer">
      <font-awesome-icon :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" />
    </button>
  </div>
</template>
```

## Placeholder Images & Avatars

For development and mockups, use these placeholder services:

### Random Images (Picsum Photos)
```
https://picsum.photos/{width}/{height}
```
**Examples:**
- `https://picsum.photos/400/300` - 400x300 image
- `https://picsum.photos/800/600` - 800x600 image
- `https://picsum.photos/1920/1080` - Full HD image

### Random Avatars (Pravatar)
```
https://i.pravatar.cc/{size}
```
**Examples:**
- `https://i.pravatar.cc/150` - 150x150 avatar
- `https://i.pravatar.cc/64` - 64x64 avatar (small)
- `https://i.pravatar.cc/300` - 300x300 avatar (large)

## Quick Reference

### Essential Commands
```bash
pnpm dev        # Start development server (port 3000)
pnpm generate   # Generate static site
pnpm preview    # Preview production build
```

### File Locations
- **Custom colors**: `/app/assets/css/tailwind.css`
- **Dark mode composable**: `/app/composables/useDarkMode.ts` (auto-imported)
- **Components**: `/app/components/` (auto-imported)
- **Pages**: `/app/pages/` (auto-routed)
- **Layouts**: `/app/layouts/`
- **Mock data**: `/app/data/` (testimonials, alumni, jobs, events, partners, footer)

## Project Specifications & Documentation

The following specification documents are available in the `banck/` directory:

### Database Model
- **MCD (Modèle Conceptuel de Données)**: `banck/bd/mdc.md` - Complete entity definitions with attributes
- **Relations MCD**: `banck/bd/relation_mcd.md` - Entity relationships, cardinalities, and access matrix

### Functional Specifications
- **Site Arborescence**: `banck/cahier_des_charges/arborescence.md` - Site structure and navigation hierarchy
- **Cahier des charges**: `banck/cahier_des_charges/Simplifie_Cahier_des_charges_REPAE.md` - Project requirements, objectives, and technical specifications
