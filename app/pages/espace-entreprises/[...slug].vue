<script setup lang="ts">
definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Page non trouvee - Espace Entreprises | REPAE'
})

const route = useRoute()

// Suggestions based on common pages
const suggestions = [
  { label: 'Dashboard', to: '/espace-entreprises/dashboard', icon: 'fa-solid fa-gauge-high' },
  { label: 'Offres d\'emploi', to: '/espace-entreprises/offres', icon: 'fa-solid fa-briefcase' },
  { label: 'Stages', to: '/espace-entreprises/stages', icon: 'fa-solid fa-graduation-cap' },
  { label: 'Talents IT', to: '/espace-entreprises/consulter-it', icon: 'fa-solid fa-users' },
  { label: 'Programme fidelite', to: '/espace-entreprises/fidelite', icon: 'fa-solid fa-star' }
]
</script>

<template>
  <div class="max-w-2xl mx-auto text-center py-12">
    <!-- Illustration -->
    <div class="relative inline-block mb-8">
      <div class="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-full flex items-center justify-center">
        <font-awesome-icon
          icon="fa-solid fa-map-marker-alt"
          class="text-5xl text-emerald-500 dark:text-emerald-400"
        />
      </div>
      <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
        <font-awesome-icon
          icon="fa-solid fa-times"
          class="text-xl text-red-500"
        />
      </div>
    </div>

    <!-- Content -->
    <h1 class="text-3xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
      Page non trouvee
    </h1>
    <p class="text-lg text-repae-gray-500 dark:text-repae-gray-400 mb-2">
      Erreur 404
    </p>
    <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-8">
      La page <code class="px-2 py-1 bg-gray-100 dark:bg-repae-gray-800 rounded text-sm">{{ route.path }}</code> n'existe pas ou a ete deplacee.
    </p>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
      <NuxtLink
        to="/espace-entreprises/dashboard"
        class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
      >
        <font-awesome-icon icon="fa-solid fa-home" />
        Retour au dashboard
      </NuxtLink>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 hover:bg-gray-200 dark:hover:bg-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 font-medium rounded-xl transition-colors cursor-pointer"
        @click="$router.back()"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Page precedente
      </button>
    </div>

    <!-- Suggestions -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
        Pages suggeres
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NuxtLink
          v-for="suggestion in suggestions"
          :key="suggestion.to"
          :to="suggestion.to"
          class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-repae-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all group"
        >
          <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/30 transition-colors">
            <font-awesome-icon
              :icon="suggestion.icon"
              class="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <span class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {{ suggestion.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
