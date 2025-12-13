<script setup lang="ts">
import type { StageFormData } from '~/components/espace-entreprises/stages/Form.vue'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Proposer un stage - Espace Entreprises | REPAE'
})

const router = useRouter()
const isSuccess = ref(false)
const showPreview = ref(false)
const previewData = ref<StageFormData | null>(null)

const handleSubmit = (data: StageFormData) => {
  console.log('Stage publie:', data)
  isSuccess.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handlePreview = (data: StageFormData) => {
  previewData.value = data
  showPreview.value = true
}

const handleSaveDraft = (data: StageFormData) => {
  console.log('Brouillon sauvegarde:', data)
  // TODO: Implement save draft
}

const closePreview = () => {
  showPreview.value = false
}

const publishFromPreview = () => {
  if (previewData.value) {
    handleSubmit(previewData.value)
    closePreview()
  }
}

const goToDashboard = () => {
  router.push('/espace-entreprises/stages')
}

const publishNewStage = () => {
  isSuccess.value = false
  previewData.value = null
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        to="/espace-entreprises/stages"
        class="inline-flex items-center gap-2 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors mb-4"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour aux stages
      </NuxtLink>
      <h1 class="text-2xl md:text-3xl font-bold font-brand text-repae-gray-900 dark:text-white">
        Proposer un stage
      </h1>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mt-2">
        Attirez les meilleurs etudiants IT pour rejoindre votre equipe
      </p>
    </div>

    <!-- Success State -->
    <div v-if="isSuccess" class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-8 text-center">
      <div class="w-20 h-20 mx-auto mb-6 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-check" class="text-4xl text-purple-500" />
      </div>
      <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Stage publie avec succes !
      </h2>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-8 max-w-md mx-auto">
        Votre offre de stage est maintenant visible par les etudiants IT de notre reseau. Vous recevrez une notification pour chaque nouvelle candidature.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          class="w-full sm:w-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
          @click="goToDashboard"
        >
          <font-awesome-icon icon="fa-solid fa-list" />
          Voir mes stages
        </button>
        <button
          type="button"
          class="w-full sm:w-auto px-6 py-3 border-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl font-medium font-brand transition-colors cursor-pointer flex items-center justify-center gap-2"
          @click="publishNewStage"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Proposer un autre stage
        </button>
      </div>
    </div>

    <!-- Form -->
    <EspaceEntreprisesStagesForm
      v-else
      @submit="handleSubmit"
      @preview="handlePreview"
      @save-draft="handleSaveDraft"
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
        <div class="relative bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <EspaceEntreprisesStagesPreview
            :stage="previewData"
            is-modal
            @close="closePreview"
            @publish="publishFromPreview"
            @edit="closePreview"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
