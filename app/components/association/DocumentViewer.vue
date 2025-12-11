<script setup>
defineProps({
  document: {
    type: Object,
    required: true
  },
  contenu: {
    type: Object,
    default: null
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <section class="py-16 bg-white dark:bg-repae-gray-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Document Header -->
      <div class="bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
              {{ document.titre }}
            </h2>
            <div class="flex flex-wrap items-center gap-4 text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400">
              <span class="flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-calendar" />
                Publie le {{ formatDate(document.date_publication) }}
              </span>
              <span class="flex items-center gap-1">
                <font-awesome-icon icon="fa-solid fa-tag" />
                Version {{ document.version }}
              </span>
            </div>
          </div>
          <a
            :href="document.fichier_url"
            target="_blank"
            class="inline-flex items-center gap-2 px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-medium rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
            Telecharger le PDF
          </a>
        </div>
      </div>

      <!-- Document Description -->
      <div class="mb-8">
        <p class="text-lg font-brand text-repae-gray-600 dark:text-repae-gray-300">
          {{ document.description }}
        </p>
      </div>

      <!-- Document Content (if available) -->
      <div v-if="contenu" class="space-y-8">
        <!-- Preambule -->
        <div v-if="contenu.preambule" class="bg-repae-blue-50 dark:bg-repae-blue-900/20 rounded-xl p-6 border-l-4 border-repae-blue-500">
          <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
            Preambule
          </h3>
          <p class="font-brand text-repae-gray-600 dark:text-repae-gray-300 italic">
            {{ contenu.preambule }}
          </p>
        </div>

        <!-- Articles -->
        <div v-if="contenu.articles" class="space-y-6">
          <div
            v-for="article in contenu.articles"
            :key="article.numero"
            class="bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-6"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-repae-blue-500 flex items-center justify-center">
                <span class="text-sm font-bold text-white font-brand">{{ article.numero }}</span>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Article {{ article.numero }} - {{ article.titre }}
                </h4>
                <p class="font-brand text-repae-gray-600 dark:text-repae-gray-300">
                  {{ article.contenu }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-l-4 border-amber-500">
          <div class="flex items-start gap-3">
            <font-awesome-icon icon="fa-solid fa-circle" class="text-amber-500 mt-1" />
            <div>
              <h4 class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
                Note importante
              </h4>
              <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                Ce document est un extrait. Pour consulter la version complete et officielle,
                veuillez telecharger le document PDF ci-dessus.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- No inline content -->
      <div v-else class="text-center py-12 bg-gray-50 dark:bg-repae-gray-700 rounded-xl">
        <font-awesome-icon icon="fa-solid fa-file-alt" class="text-4xl text-repae-gray-400 mb-4" />
        <p class="font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-4">
          Le contenu de ce document n'est pas disponible en ligne.
        </p>
        <a
          :href="document.fichier_url"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-brand font-medium rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-right" />
          Telecharger le document
        </a>
      </div>
    </div>
  </section>
</template>
