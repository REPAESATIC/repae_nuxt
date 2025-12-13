<script setup lang="ts">
import type { OffreFormData } from '~/components/espace-entreprises/offres/Form.vue'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Publier une offre - Espace Entreprises | REPAE'
})

const router = useRouter()
const isSuccess = ref(false)
const showPreview = ref(false)
const previewData = ref<OffreFormData | null>(null)

const handleSubmit = (data: OffreFormData) => {
  console.log('Offre publiee:', data)
  isSuccess.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handlePreview = (data: OffreFormData) => {
  previewData.value = data
  showPreview.value = true
}

const closePreview = () => {
  showPreview.value = false
  previewData.value = null
}

const goToDashboard = () => {
  router.push('/espace-entreprises/dashboard')
}

const publishNewOffer = () => {
  isSuccess.value = false
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        to="/espace-entreprises/dashboard"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors mb-4"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour au tableau de bord
      </NuxtLink>
      <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
        Publier une offre d'emploi
      </h1>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mt-2">
        Trouvez les meilleurs talents IT pour votre entreprise
      </p>
    </div>

    <!-- Success State -->
    <div v-if="isSuccess" class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-8 text-center">
      <div class="w-20 h-20 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-check" class="text-4xl text-emerald-500" />
      </div>
      <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Offre publiee avec succes !
      </h2>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-8 max-w-md mx-auto">
        Votre offre d'emploi est maintenant visible par les professionnels IT de notre reseau. Vous recevrez une notification pour chaque nouvelle candidature.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          class="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
          @click="goToDashboard"
        >
          <font-awesome-icon icon="fa-solid fa-home" />
          Retour au tableau de bord
        </button>
        <button
          type="button"
          class="w-full sm:w-auto px-6 py-3 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
          @click="publishNewOffer"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Publier une autre offre
        </button>
      </div>
    </div>

    <!-- Form -->
    <EspaceEntreprisesOffresForm
      v-else
      @submit="handleSubmit"
      @preview="handlePreview"
    />

    <!-- Preview Modal -->
    <Teleport to="body">
      <div
        v-if="showPreview && previewData"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closePreview"
        />

        <!-- Modal content -->
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal header -->
          <div class="sticky top-0 bg-white dark:bg-repae-gray-800 border-b border-gray-200 dark:border-repae-gray-700 p-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
              Apercu de l'offre
            </h3>
            <button
              type="button"
              class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 transition-colors cursor-pointer"
              @click="closePreview"
            >
              <font-awesome-icon icon="fa-solid fa-times" class="text-xl" />
            </button>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <!-- Titre et type -->
            <div>
              <h4 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
                {{ previewData.titre || 'Titre du poste' }}
              </h4>
              <div class="flex flex-wrap items-center gap-2">
                <span
                  v-if="previewData.type_contrat"
                  class="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium"
                >
                  {{ previewData.type_contrat.toUpperCase() }}
                </span>
                <span
                  v-if="previewData.mode_remote"
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium"
                >
                  {{ previewData.mode_remote === 'full_remote' ? 'Full Remote' : previewData.mode_remote === 'hybride' ? 'Hybride' : 'Presentiel' }}
                </span>
                <span
                  v-if="previewData.niveau_experience"
                  class="px-3 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium"
                >
                  {{ previewData.niveau_experience }}
                </span>
              </div>
            </div>

            <!-- Localisation -->
            <div v-if="previewData.ville" class="flex items-center gap-2 text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-map-marker-alt" />
              <span>{{ previewData.ville }}, {{ previewData.pays }}</span>
            </div>

            <!-- Salaire -->
            <div v-if="previewData.salaire_min || previewData.salaire_max" class="flex items-center gap-2 text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
              <span>
                <template v-if="previewData.salaire_min && previewData.salaire_max">
                  {{ previewData.salaire_min.toLocaleString() }} - {{ previewData.salaire_max.toLocaleString() }} {{ previewData.devise }}
                </template>
                <template v-else-if="previewData.salaire_min">
                  A partir de {{ previewData.salaire_min.toLocaleString() }} {{ previewData.devise }}
                </template>
                <template v-else>
                  Jusqu'a {{ previewData.salaire_max?.toLocaleString() }} {{ previewData.devise }}
                </template>
              </span>
            </div>

            <!-- Description -->
            <div v-if="previewData.description">
              <h5 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                Description du poste
              </h5>
              <p class="text-repae-gray-600 dark:text-repae-gray-400 whitespace-pre-line">
                {{ previewData.description }}
              </p>
            </div>

            <!-- Profil recherche -->
            <div v-if="previewData.profil_recherche">
              <h5 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                Profil recherche
              </h5>
              <p class="text-repae-gray-600 dark:text-repae-gray-400 whitespace-pre-line">
                {{ previewData.profil_recherche }}
              </p>
            </div>

            <!-- Competences -->
            <div v-if="previewData.competences_requises.length > 0 && previewData.competences_requises[0]">
              <h5 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                Competences requises
              </h5>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="comp in previewData.competences_requises.filter(c => c)"
                  :key="comp"
                  class="px-3 py-1 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-700 dark:text-repae-gray-300 rounded-full text-sm"
                >
                  {{ comp }}
                </span>
              </div>
            </div>

            <!-- Niveau d'etudes -->
            <div v-if="previewData.niveau_etudes">
              <h5 class="font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
                Niveau d'etudes requis
              </h5>
              <p class="text-repae-gray-600 dark:text-repae-gray-400">
                {{ previewData.niveau_etudes }}
              </p>
            </div>

            <!-- Date limite -->
            <div v-if="previewData.date_expiration" class="flex items-center gap-2 text-repae-gray-500 dark:text-repae-gray-400">
              <font-awesome-icon icon="fa-solid fa-calendar" />
              <span>Date limite : {{ new Date(previewData.date_expiration).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="sticky bottom-0 bg-white dark:bg-repae-gray-800 border-t border-gray-200 dark:border-repae-gray-700 p-4">
            <button
              type="button"
              class="w-full px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer"
              @click="closePreview"
            >
              Fermer l'apercu
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
