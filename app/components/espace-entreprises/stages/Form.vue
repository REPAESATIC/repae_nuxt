<script setup lang="ts">
import type { NiveauEtudes, ModeRemote } from '~/data/espace-entreprises/offres-stages'
import { niveauEtudesConfig, remoteConfig, dureesOptions } from '~/data/espace-entreprises/offres-stages'

const emit = defineEmits<{
  (e: 'submit', data: StageFormData): void
  (e: 'preview', data: StageFormData): void
  (e: 'saveDraft', data: StageFormData): void
}>()

// Form data interface
export interface StageFormData {
  // Section 1 - Stage
  titre: string
  description: string
  missions: string[]
  profil_recherche: string

  // Section 2 - Conditions
  duree_mois: number | null
  niveau_etudes: NiveauEtudes | null
  mode_remote: ModeRemote | null
  ville: string
  pays: string
  gratification: number | null
  devise: string
  date_debut: string
  date_fin_candidature: string

  // Section 3 - Competences & Tuteur
  competences_requises: string[]
  tuteur_nom: string
  tuteur_poste: string
  embauche_possible: boolean
}

// Form state
const currentStep = ref(1)
const totalSteps = 3
const isSubmitting = ref(false)

const form = reactive<StageFormData>({
  // Section 1
  titre: '',
  description: '',
  missions: [''],
  profil_recherche: '',

  // Section 2
  duree_mois: null,
  niveau_etudes: null,
  mode_remote: null,
  ville: '',
  pays: 'Cote d\'Ivoire',
  gratification: null,
  devise: 'FCFA',
  date_debut: '',
  date_fin_candidature: '',

  // Section 3
  competences_requises: [''],
  tuteur_nom: '',
  tuteur_poste: '',
  embauche_possible: false
})

// Validation errors
const errors = reactive<Record<string, string>>({})

// Options
const paysOptions = [
  'Cote d\'Ivoire',
  'Senegal',
  'Cameroun',
  'Burkina Faso',
  'Mali',
  'Benin',
  'Togo',
  'Niger',
  'Guinee',
  'Gabon',
  'France',
  'Canada',
  'Autre'
]

// Array field management
const addMission = () => {
  form.missions.push('')
}

const removeMission = (index: number) => {
  if (form.missions.length > 1) {
    form.missions.splice(index, 1)
  }
}

const updateMission = (index: number, value: string) => {
  form.missions[index] = value
}

const addCompetence = () => {
  form.competences_requises.push('')
}

const removeCompetence = (index: number) => {
  if (form.competences_requises.length > 1) {
    form.competences_requises.splice(index, 1)
  }
}

const updateCompetence = (index: number, value: string) => {
  form.competences_requises[index] = value
}

// Clean array (remove empty items)
const cleanArray = (arr: string[]): string[] => {
  return arr.filter(item => item.trim() !== '')
}

// Validation functions
const validateStep1 = () => {
  const newErrors: Record<string, string> = {}

  if (!form.titre.trim()) {
    newErrors.titre = 'Le titre du stage est requis'
  } else if (form.titre.length < 5) {
    newErrors.titre = 'Le titre doit contenir au moins 5 caracteres'
  }

  if (!form.description.trim()) {
    newErrors.description = 'La description est requise'
  } else if (form.description.length < 100) {
    newErrors.description = 'La description doit contenir au moins 100 caracteres'
  }

  const cleanedMissions = cleanArray(form.missions)
  if (cleanedMissions.length < 2) {
    newErrors.missions = 'Ajoutez au moins 2 missions'
  }

  if (!form.profil_recherche.trim()) {
    newErrors.profil_recherche = 'Le profil recherche est requis'
  } else if (form.profil_recherche.length < 50) {
    newErrors.profil_recherche = 'Le profil recherche doit contenir au moins 50 caracteres'
  }

  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const validateStep2 = () => {
  const newErrors: Record<string, string> = {}

  if (!form.duree_mois) {
    newErrors.duree_mois = 'La duree du stage est requise'
  }

  if (!form.niveau_etudes) {
    newErrors.niveau_etudes = 'Le niveau d\'etudes est requis'
  }

  if (!form.mode_remote) {
    newErrors.mode_remote = 'Le mode de travail est requis'
  }

  if (!form.ville.trim()) {
    newErrors.ville = 'La ville est requise'
  }

  if (!form.gratification || form.gratification <= 0) {
    newErrors.gratification = 'La gratification est requise'
  }

  if (!form.date_debut) {
    newErrors.date_debut = 'La date de debut est requise'
  } else {
    const startDate = new Date(form.date_debut)
    const today = new Date()
    if (startDate <= today) {
      newErrors.date_debut = 'La date de debut doit etre dans le futur'
    }
  }

  if (!form.date_fin_candidature) {
    newErrors.date_fin_candidature = 'La date limite de candidature est requise'
  } else {
    const deadlineDate = new Date(form.date_fin_candidature)
    const startDate = new Date(form.date_debut)
    if (form.date_debut && deadlineDate >= startDate) {
      newErrors.date_fin_candidature = 'La date limite doit etre avant la date de debut'
    }
  }

  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const validateStep3 = () => {
  const newErrors: Record<string, string> = {}

  const cleanedCompetences = cleanArray(form.competences_requises)
  if (cleanedCompetences.length < 2) {
    newErrors.competences_requises = 'Ajoutez au moins 2 competences'
  }

  if (!form.tuteur_nom.trim()) {
    newErrors.tuteur_nom = 'Le nom du tuteur est requis'
  }

  if (!form.tuteur_poste.trim()) {
    newErrors.tuteur_poste = 'Le poste du tuteur est requis'
  }

  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

// Navigation
const nextStep = () => {
  let isValid = false

  if (currentStep.value === 1) {
    isValid = validateStep1()
  } else if (currentStep.value === 2) {
    isValid = validateStep2()
  }

  if (isValid && currentStep.value < totalSteps) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  Object.keys(errors).forEach(key => delete errors[key])
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Get cleaned form data
const getCleanedFormData = (): StageFormData => {
  return {
    ...form,
    missions: cleanArray(form.missions),
    competences_requises: cleanArray(form.competences_requises)
  }
}

// Submit
const handleSubmit = async () => {
  if (!validateStep3()) {
    return
  }

  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  emit('submit', getCleanedFormData())
}

// Preview
const handlePreview = () => {
  emit('preview', getCleanedFormData())
}

// Save draft
const handleSaveDraft = () => {
  emit('saveDraft', getCleanedFormData())
}

// Min dates
const minStartDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const minDeadlineDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})
</script>

<template>
  <div class="w-full">
    <!-- Steps indicator -->
    <div class="mb-8">
      <!-- Mobile: Simple progress -->
      <div class="sm:hidden mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300">
            Etape {{ currentStep }} sur {{ totalSteps }}
          </span>
        </div>
        <div class="h-2 bg-gray-200 dark:bg-repae-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-purple-500 rounded-full transition-all duration-500"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          />
        </div>
      </div>

      <!-- Desktop: Full stepper -->
      <div class="hidden sm:block">
        <div class="flex items-start justify-center">
          <template v-for="(step, index) in [
            { id: 1, label: 'Stage', icon: 'fa-solid fa-graduation-cap' },
            { id: 2, label: 'Conditions', icon: 'fa-solid fa-sliders-h' },
            { id: 3, label: 'Tuteur', icon: 'fa-solid fa-user-tie' }
          ]" :key="step.id">
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10',
                  currentStep > step.id
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : currentStep === step.id
                      ? 'bg-white dark:bg-repae-gray-800 border-purple-500 text-purple-500'
                      : 'bg-white dark:bg-repae-gray-800 border-gray-300 dark:border-repae-gray-600 text-repae-gray-400'
                ]"
              >
                <font-awesome-icon
                  v-if="currentStep > step.id"
                  icon="fa-solid fa-check"
                  class="text-lg"
                />
                <font-awesome-icon
                  v-else
                  :icon="step.icon"
                  class="text-lg"
                />
              </div>
              <span
                :class="[
                  'mt-3 text-sm font-medium font-brand transition-colors text-center',
                  currentStep >= step.id
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-repae-gray-500 dark:text-repae-gray-400'
                ]"
              >
                {{ step.label }}
              </span>
            </div>
            <div
              v-if="index < 2"
              class="flex-1 flex items-center px-2 mt-6"
            >
              <div
                :class="[
                  'h-1 w-full rounded-full transition-all duration-500',
                  currentStep > step.id
                    ? 'bg-purple-500'
                    : 'bg-gray-200 dark:bg-repae-gray-700'
                ]"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="currentStep === totalSteps ? handleSubmit() : nextStep()">
      <!-- Section 1: Stage -->
      <div v-show="currentStep === 1" class="space-y-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-purple-500" />
            Informations du stage
          </h2>

          <div class="space-y-6">
            <!-- Titre -->
            <div>
              <label for="titre" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Titre du stage <span class="text-red-500">*</span>
              </label>
              <input
                id="titre"
                v-model="form.titre"
                type="text"
                placeholder="Ex: Stage Developpeur Mobile React Native"
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                  errors.titre
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                ]"
              />
              <p v-if="errors.titre" class="mt-1 text-sm text-red-500">{{ errors.titre }}</p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Description du stage <span class="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="5"
                placeholder="Decrivez le contexte du stage, l'equipe d'accueil, les objectifs pedagogiques..."
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors resize-none focus:outline-none focus:ring-2',
                  errors.description
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                ]"
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
                <p class="text-xs text-repae-gray-400 ml-auto">{{ form.description.length }} / 100 min</p>
              </div>
            </div>

            <!-- Missions -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Missions du stagiaire <span class="text-red-500">*</span>
              </label>
              <div class="space-y-3">
                <div
                  v-for="(mission, index) in form.missions"
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <input
                    :value="mission"
                    type="text"
                    placeholder="Ex: Developper des fonctionnalites mobiles"
                    class="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    @input="updateMission(index, ($event.target as HTMLInputElement).value)"
                  />
                  <button
                    v-if="form.missions.length > 1"
                    type="button"
                    class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    @click="removeMission(index)"
                  >
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </button>
                </div>
                <button
                  type="button"
                  class="flex items-center gap-2 px-4 py-2 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
                  @click="addMission"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" />
                  Ajouter une mission
                </button>
                <p v-if="errors.missions" class="text-sm text-red-500">{{ errors.missions }}</p>
              </div>
            </div>

            <!-- Profil recherche -->
            <div>
              <label for="profil" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Profil recherche <span class="text-red-500">*</span>
              </label>
              <textarea
                id="profil"
                v-model="form.profil_recherche"
                rows="4"
                placeholder="Decrivez le profil ideal du stagiaire : qualites, motivation, interets..."
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors resize-none focus:outline-none focus:ring-2',
                  errors.profil_recherche
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                ]"
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.profil_recherche" class="text-sm text-red-500">{{ errors.profil_recherche }}</p>
                <p class="text-xs text-repae-gray-400 ml-auto">{{ form.profil_recherche.length }} / 50 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Conditions -->
      <div v-show="currentStep === 2" class="space-y-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-sliders-h" class="text-purple-500" />
            Conditions du stage
          </h2>

          <div class="space-y-6">
            <!-- Duree et Niveau -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Duree du stage <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.duree_mois"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                    errors.duree_mois
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                  ]"
                >
                  <option :value="null">Selectionnez une duree</option>
                  <option v-for="duree in dureesOptions" :key="duree.value" :value="duree.value">
                    {{ duree.label }}
                  </option>
                </select>
                <p v-if="errors.duree_mois" class="mt-1 text-sm text-red-500">{{ errors.duree_mois }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Niveau d'etudes cible <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.niveau_etudes"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                    errors.niveau_etudes
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                  ]"
                >
                  <option :value="null">Selectionnez un niveau</option>
                  <option v-for="(config, key) in niveauEtudesConfig" :key="key" :value="key">
                    {{ config.label }}
                  </option>
                </select>
                <p v-if="errors.niveau_etudes" class="mt-1 text-sm text-red-500">{{ errors.niveau_etudes }}</p>
              </div>
            </div>

            <!-- Lieu de travail -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="ville" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Ville <span class="text-red-500">*</span>
                </label>
                <input
                  id="ville"
                  v-model="form.ville"
                  type="text"
                  placeholder="Ex: Abidjan"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                    errors.ville
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                  ]"
                />
                <p v-if="errors.ville" class="mt-1 text-sm text-red-500">{{ errors.ville }}</p>
              </div>

              <div>
                <label for="pays" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Pays <span class="text-red-500">*</span>
                </label>
                <select
                  id="pays"
                  v-model="form.pays"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  <option v-for="p in paysOptions" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
            </div>

            <!-- Mode de travail -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Mode de travail <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label
                  v-for="(config, key) in remoteConfig"
                  :key="key"
                  :class="[
                    'flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    form.mode_remote === key
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      : 'border-gray-200 dark:border-repae-gray-700 hover:border-purple-300 dark:hover:border-purple-700 text-repae-gray-700 dark:text-repae-gray-300'
                  ]"
                >
                  <input
                    v-model="form.mode_remote"
                    type="radio"
                    :value="key"
                    class="sr-only"
                  />
                  <font-awesome-icon :icon="config.icon" />
                  <span class="font-medium font-brand text-sm">{{ config.label }}</span>
                </label>
              </div>
              <p v-if="errors.mode_remote" class="mt-1 text-sm text-red-500">{{ errors.mode_remote }}</p>
            </div>

            <!-- Gratification -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Gratification mensuelle <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    v-model.number="form.gratification"
                    type="number"
                    min="0"
                    placeholder="Ex: 150000"
                    :class="[
                      'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                      errors.gratification
                        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                    ]"
                  />
                  <p v-if="errors.gratification" class="mt-1 text-sm text-red-500">{{ errors.gratification }}</p>
                </div>
                <div>
                  <select
                    v-model="form.devise"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="FCFA">FCFA / mois</option>
                    <option value="EUR">EUR / mois</option>
                    <option value="USD">USD / mois</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="date_debut" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Date de debut du stage <span class="text-red-500">*</span>
                </label>
                <input
                  id="date_debut"
                  v-model="form.date_debut"
                  type="date"
                  :min="minStartDate"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                    errors.date_debut
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                  ]"
                />
                <p v-if="errors.date_debut" class="mt-1 text-sm text-red-500">{{ errors.date_debut }}</p>
              </div>

              <div>
                <label for="date_fin_candidature" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Date limite de candidature <span class="text-red-500">*</span>
                </label>
                <input
                  id="date_fin_candidature"
                  v-model="form.date_fin_candidature"
                  type="date"
                  :min="minDeadlineDate"
                  :class="[
                    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                    errors.date_fin_candidature
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                  ]"
                />
                <p v-if="errors.date_fin_candidature" class="mt-1 text-sm text-red-500">{{ errors.date_fin_candidature }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Competences & Tuteur -->
      <div v-show="currentStep === 3" class="space-y-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-code" class="text-purple-500" />
            Competences a developper
          </h2>

          <div class="space-y-3">
            <div
              v-for="(comp, index) in form.competences_requises"
              :key="index"
              class="flex items-center gap-3"
            >
              <input
                :value="comp"
                type="text"
                placeholder="Ex: React Native, Git, API REST..."
                class="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                @input="updateCompetence(index, ($event.target as HTMLInputElement).value)"
              />
              <button
                v-if="form.competences_requises.length > 1"
                type="button"
                class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                @click="removeCompetence(index)"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
            <button
              type="button"
              class="flex items-center gap-2 px-4 py-2 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
              @click="addCompetence"
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
              Ajouter une competence
            </button>
            <p v-if="errors.competences_requises" class="text-sm text-red-500">{{ errors.competences_requises }}</p>
          </div>
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-user-tie" class="text-purple-500" />
            Tuteur de stage
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="tuteur_nom" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Nom du tuteur <span class="text-red-500">*</span>
              </label>
              <input
                id="tuteur_nom"
                v-model="form.tuteur_nom"
                type="text"
                placeholder="Ex: Jean Dupont"
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                  errors.tuteur_nom
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                ]"
              />
              <p v-if="errors.tuteur_nom" class="mt-1 text-sm text-red-500">{{ errors.tuteur_nom }}</p>
            </div>

            <div>
              <label for="tuteur_poste" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Poste du tuteur <span class="text-red-500">*</span>
              </label>
              <input
                id="tuteur_poste"
                v-model="form.tuteur_poste"
                type="text"
                placeholder="Ex: Lead Developer Mobile"
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                  errors.tuteur_poste
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-purple-500/20 focus:border-purple-500'
                ]"
              />
              <p v-if="errors.tuteur_poste" class="mt-1 text-sm text-red-500">{{ errors.tuteur_poste }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Embauche possible a l'issue du stage ?
          </h2>
          <label
            :class="[
              'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
              form.embauche_possible
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10'
                : 'border-gray-200 dark:border-repae-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
            ]"
          >
            <input
              v-model="form.embauche_possible"
              type="checkbox"
              class="sr-only"
            />
            <div
              :class="[
                'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors',
                form.embauche_possible
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-gray-300 dark:border-repae-gray-600'
              ]"
            >
              <font-awesome-icon
                v-if="form.embauche_possible"
                icon="fa-solid fa-check"
                class="text-white text-sm"
              />
            </div>
            <div>
              <p class="font-medium font-brand text-repae-gray-900 dark:text-white">
                Oui, une embauche est envisageable
              </p>
              <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                Un badge "Embauche possible" sera affiche sur l'offre
              </p>
            </div>
          </label>
        </div>

        <!-- Actions finales -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Pret a publier ?
          </h2>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
            Verifiez les informations de votre offre de stage avant de la publier.
          </p>
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              class="w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              @click="handlePreview"
            >
              <font-awesome-icon icon="fa-solid fa-eye" />
              Apercu
            </button>
            <button
              type="button"
              class="w-full sm:w-auto px-6 py-3 border border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              @click="handleSaveDraft"
            >
              <font-awesome-icon icon="fa-solid fa-save" />
              Sauvegarder brouillon
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-repae-gray-700">
        <button
          v-if="currentStep > 1"
          type="button"
          class="flex items-center gap-2 px-6 py-3 text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-900 dark:hover:text-white font-medium font-brand transition-colors cursor-pointer"
          @click="prevStep"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
          Precedent
        </button>
        <div v-else />

        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex items-center gap-2 px-8 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <template v-if="isSubmitting">
            <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin" />
            Publication en cours...
          </template>
          <template v-else-if="currentStep < totalSteps">
            Suivant
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </template>
          <template v-else>
            <font-awesome-icon icon="fa-solid fa-paper-plane" />
            Publier le stage
          </template>
        </button>
      </div>
    </form>
  </div>
</template>
