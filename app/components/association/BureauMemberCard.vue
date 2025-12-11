<script setup>
defineProps({
  membre: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-repae-gray-700 group">
    <!-- Photo -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="membre.photo_url"
        :alt="`${membre.prenom} ${membre.nom}`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-4">
        <span class="inline-block px-3 py-1 bg-repae-blue-500 text-white text-xs font-brand font-medium rounded-full">
          {{ membre.poste }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
        {{ membre.prenom }} {{ membre.nom }}
      </h3>

      <div class="flex items-center gap-2 text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-3">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
        <span>{{ membre.poste_actuel }}</span>
      </div>

      <div class="flex items-center gap-2 text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-4">
        <font-awesome-icon icon="fa-solid fa-building" class="text-repae-blue-500" />
        <span>{{ membre.entreprise }}</span>
      </div>

      <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300 mb-4 line-clamp-2">
        {{ membre.responsabilites }}
      </p>

      <!-- LinkedIn Link -->
      <a
        v-if="membre.linkedin_url"
        :href="membre.linkedin_url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm font-brand font-medium text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 dark:hover:text-repae-blue-300 transition-colors"
      >
        <font-awesome-icon icon="fa-brands fa-linkedin" />
        <span>Voir le profil</span>
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-xs" />
      </a>
    </div>
  </div>
</template>
