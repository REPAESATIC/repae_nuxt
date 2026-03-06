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

const formatContenu = (text) => {
  return text.replace(/\n/g, '<br>')
}

// Gestion des sections ouvertes/fermées
const openSections = ref(new Set())

const toggleSection = (index) => {
  if (openSections.value.has(index)) {
    openSections.value.delete(index)
  } else {
    openSections.value.add(index)
  }
}

const isSectionOpen = (index) => {
  return openSections.value.has(index)
}

const expandAll = () => {
  const sections = Array.from({ length: 20 }, (_, i) => i)
  openSections.value = new Set(sections)
}

const collapseAll = () => {
  openSections.value = new Set()
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
                Publié le {{ formatDate(document.date_publication) }}
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
            <font-awesome-icon icon="fa-solid fa-download" />
            Télécharger le PDF
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
      <div v-if="contenu" class="space-y-6">
        <!-- Préambule -->
        <div v-if="contenu.preambule" class="bg-repae-blue-50 dark:bg-repae-blue-900/20 rounded-xl p-6 border-l-4 border-repae-blue-500">
          <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
            Préambule
          </h3>
          <p class="font-brand text-repae-gray-600 dark:text-repae-gray-300 italic leading-relaxed">
            {{ contenu.preambule }}
          </p>
        </div>

        <!-- Boutons Tout déplier / Tout replier -->
        <div v-if="contenu.sections" class="flex items-center justify-end gap-3">
          <button
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-brand font-medium text-repae-blue-600 dark:text-repae-blue-400 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-900/20 rounded-lg transition-colors cursor-pointer"
            @click="expandAll"
          >
            <font-awesome-icon icon="fa-solid fa-angles-down" />
            Tout déplier
          </button>
          <button
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-brand font-medium text-repae-gray-500 dark:text-repae-gray-400 hover:bg-gray-100 dark:hover:bg-repae-gray-700 rounded-lg transition-colors cursor-pointer"
            @click="collapseAll"
          >
            <font-awesome-icon icon="fa-solid fa-angles-up" />
            Tout replier
          </button>
        </div>

        <!-- Sections avec articles (accordion) -->
        <template v-if="contenu.sections">
          <div
            v-for="(section, sIndex) in contenu.sections"
            :key="sIndex"
            class="rounded-xl border border-gray-200 dark:border-repae-gray-600 overflow-hidden"
          >
            <!-- Section Header (clickable) -->
            <button
              class="w-full flex items-center justify-between gap-4 px-6 py-4 bg-gray-50 dark:bg-repae-gray-700 hover:bg-gray-100 dark:hover:bg-repae-gray-650 transition-colors cursor-pointer"
              @click="toggleSection(sIndex)"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-repae-blue-500 flex items-center justify-center shrink-0">
                  <span class="text-xs font-bold text-white font-brand">{{ sIndex + 1 }}</span>
                </div>
                <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white text-left">
                  {{ section.titre }}
                </h3>
              </div>
              <div class="flex items-center gap-3 shrink-0">
                <span class="text-xs font-brand font-medium text-repae-gray-400 dark:text-repae-gray-500">
                  {{ section.articles.length }} article{{ section.articles.length > 1 ? 's' : '' }}
                </span>
                <font-awesome-icon
                  icon="fa-solid fa-chevron-down"
                  class="text-repae-gray-400 transition-transform duration-300"
                  :class="{ 'rotate-180': isSectionOpen(sIndex) }"
                />
              </div>
            </button>

            <!-- Section Content (collapsible) -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[5000px] opacity-100"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="max-h-[5000px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-show="isSectionOpen(sIndex)" class="overflow-hidden">
                <div class="p-4 space-y-4 bg-white dark:bg-repae-gray-800">
                  <div
                    v-for="article in section.articles"
                    :key="`${sIndex}-${article.numero}`"
                    class="bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-5"
                  >
                    <div class="flex items-start gap-4">
                      <div class="shrink-0 min-w-10 h-10 px-3 rounded-full bg-repae-blue-500 flex items-center justify-center">
                        <span class="text-sm font-bold text-white font-brand">{{ article.numero }}</span>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-3">
                          Article {{ article.numero }} – {{ article.titre }}
                        </h4>
                        <div
                          class="font-brand text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed"
                          v-html="formatContenu(article.contenu)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </template>

        <!-- Articles plats (ancienne structure rétrocompatible) -->
        <div v-else-if="contenu.articles" class="space-y-6">
          <div
            v-for="article in contenu.articles"
            :key="article.numero"
            class="bg-gray-50 dark:bg-repae-gray-700 rounded-xl p-6"
          >
            <div class="flex items-start gap-4">
              <div class="shrink-0 w-10 h-10 rounded-full bg-repae-blue-500 flex items-center justify-center">
                <span class="text-sm font-bold text-white font-brand">{{ article.numero }}</span>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                  Article {{ article.numero }} – {{ article.titre }}
                </h4>
                <p class="font-brand text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed">
                  {{ article.contenu }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Note -->
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-l-4 border-amber-500">
          <div class="flex items-start gap-3">
            <font-awesome-icon icon="fa-solid fa-circle-info" class="text-amber-500 mt-1" />
            <div>
              <h4 class="text-sm font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
                Note importante
              </h4>
              <p class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300">
                Ce document est un extrait. Pour consulter la version complète et officielle,
                veuillez télécharger le document PDF ci-dessus.
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
          <font-awesome-icon icon="fa-solid fa-download" />
          Télécharger le document
        </a>
      </div>
    </div>
  </section>
</template>
