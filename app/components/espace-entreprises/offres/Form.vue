<script setup lang="ts">
import type { TypeContrat, NiveauExperience, ModeRemote } from '~/data/espace-it/offres'
import { contratConfig, experienceConfig, remoteConfig } from '~/data/espace-it/offres'

const emit = defineEmits<{
  (e: 'submit', data: OffreFormData): void
  (e: 'preview', data: OffreFormData): void
}>()

// Form data interface
export interface OffreFormData {
  // Section 1 - Poste
  titre: string
  type_contrat: TypeContrat | null
  description: string
  profil_recherche: string

  // Section 2 - Conditions
  ville: string
  pays: string
  mode_remote: ModeRemote | null
  salaire_min: number | null
  salaire_max: number | null
  devise: string
  date_expiration: string

  // Section 3 - Competences
  competences_requises: string[]
  niveau_experience: NiveauExperience | null
  niveau_etudes: string
}

// Form state
const currentStep = ref(1)
const totalSteps = 3
const isSubmitting = ref(false)

const form = reactive<OffreFormData>({
  // Section 1
  titre: '',
  type_contrat: null,
  description: '',
  profil_recherche: '',

  // Section 2
  ville: '',
  pays: 'Cote d\'Ivoire',
  mode_remote: null,
  salaire_min: null,
  salaire_max: null,
  devise: 'FCFA',
  date_expiration: '',

  // Section 3
  competences_requises: [''],
  niveau_experience: null,
  niveau_etudes: ''
})

// Validation errors
const errors = reactive<Record<string, string>>({})

// Options
const typesContrat = Object.entries(contratConfig)
  .filter(([key]) => key !== 'stage') // Stages are handled separately
  .map(([value, config]) => ({
    value: value as TypeContrat,
    label: config.label
  }))

const niveauxExperience = Object.entries(experienceConfig).map(([value, config]) => ({
  value: value as NiveauExperience,
  label: `${config.label} (${config.annees})`
}))

const modesRemote = Object.entries(remoteConfig).map(([value, config]) => ({
  value: value as ModeRemote,
  label: config.label
}))

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

const niveauxEtudes = [
  'Bac',
  'Bac+2 / BTS / DUT',
  'Bac+3 / Licence',
  'Bac+4 / Master 1',
  'Bac+5 / Master 2 / Ingenieur',
  'Doctorat',
  'Sans diplome requis'
]

// Array field management
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
    newErrors.titre = 'Le titre du poste est requis'
  } else if (form.titre.length < 5) {
    newErrors.titre = 'Le titre doit contenir au moins 5 caracteres'
  }

  if (!form.type_contrat) {
    newErrors.type_contrat = 'Le type de contrat est requis'
  }

  if (!form.description.trim()) {
    newErrors.description = 'La description du poste est requise'
  } else if (form.description.length < 100) {
    newErrors.description = 'La description doit contenir au moins 100 caracteres'
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

  if (!form.ville.trim()) {
    newErrors.ville = 'La ville est requise'
  }

  if (!form.pays) {
    newErrors.pays = 'Le pays est requis'
  }

  if (!form.mode_remote) {
    newErrors.mode_remote = 'Le mode de travail est requis'
  }

  if (!form.date_expiration) {
    newErrors.date_expiration = 'La date limite est requise'
  } else {
    const expDate = new Date(form.date_expiration)
    const today = new Date()
    if (expDate <= today) {
      newErrors.date_expiration = 'La date limite doit etre dans le futur'
    }
  }

  if (form.salaire_min && form.salaire_max && form.salaire_min > form.salaire_max) {
    newErrors.salaire_max = 'Le salaire maximum doit etre superieur au minimum'
  }

  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const validateStep3 = () => {
  const newErrors: Record<string, string> = {}

  const cleanedCompetences = cleanArray(form.competences_requises)
  if (cleanedCompetences.length < 2) {
    newErrors.competences_requises = 'Ajoutez au moins 2 competences requises'
  }

  if (!form.niveau_experience) {
    newErrors.niveau_experience = 'Le niveau d\'experience est requis'
  }

  if (!form.niveau_etudes) {
    newErrors.niveau_etudes = 'Le niveau d\'etudes est requis'
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

const goToStep = (step: number) => {
  if (step < currentStep.value) {
    currentStep.value = step
    Object.keys(errors).forEach(key => delete errors[key])
  }
}

// Get cleaned form data
const getCleanedFormData = (): OffreFormData => {
  return {
    ...form,
    competences_requises: cleanArray(form.competences_requises)
  }
}

// Submit
const handleSubmit = async () => {
  if (!validateStep3()) {
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  emit('submit', getCleanedFormData())
}

// Preview
const handlePreview = () => {
  emit('preview', getCleanedFormData())
}

// Min date for expiration (tomorrow)
const minExpirationDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})
</script>

<template>
  <div class="w-full">
    <!-- Steps indicator -->
    <EspaceEntreprisesOffresFormSteps
      :current-step="currentStep"
      :total-steps="totalSteps"
      class="mb-8"
    />

    <!-- Form -->
    <form @submit.prevent="currentStep === totalSteps ? handleSubmit() : nextStep()">
      <!-- Section 1: Poste -->
      <div v-show="currentStep === 1" class="space-y-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-briefcase" class="text-emerald-500" />
            Informations du poste
          </h2>

          <div class="space-y-6">
            <!-- Titre -->
            <div>
              <label for="titre" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Titre du poste <span class="text-red-500">*</span>
              </label>
              <input
                id="titre"
                v-model="form.titre"
                type="text"
                placeholder="Ex: Developpeur Full Stack Senior"
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                  errors.titre
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                ]"
              />
              <p v-if="errors.titre" class="mt-1 text-sm text-red-500">{{ errors.titre }}</p>
            </div>

            <!-- Type de contrat -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Type de contrat <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label
                  v-for="type in typesContrat"
                  :key="type.value"
                  :class="[
                    'flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all text-center',
                    form.type_contrat === type.value
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-gray-200 dark:border-repae-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 text-repae-gray-700 dark:text-repae-gray-300'
                  ]"
                >
                  <input
                    v-model="form.type_contrat"
                    type="radio"
                    :value="type.value"
                    class="sr-only"
                  />
                  <span class="font-medium font-brand text-sm">{{ type.label }}</span>
                </label>
              </div>
              <p v-if="errors.type_contrat" class="mt-1 text-sm text-red-500">{{ errors.type_contrat }}</p>
            </div>

            <!-- Description du poste -->
            <div>
              <label for="description" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Description du poste <span class="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="6"
                placeholder="Decrivez les missions principales du poste, le contexte de travail, les objectifs..."
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors resize-none focus:outline-none focus:ring-2',
                  errors.description
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                ]"
              />
              <div class="flex justify-between mt-1">
                <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
                <p class="text-xs text-repae-gray-400 ml-auto">{{ form.description.length }} / 100 min</p>
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
                placeholder="Decrivez le profil ideal du candidat : qualites, soft skills, type de personnalite..."
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors resize-none focus:outline-none focus:ring-2',
                  errors.profil_recherche
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
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
            <font-awesome-icon icon="fa-solid fa-sliders-h" class="text-emerald-500" />
            Conditions de travail
          </h2>

          <div class="space-y-6">
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
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
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
                  :class="[
                    'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                    errors.pays
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                  ]"
                >
                  <option v-for="p in paysOptions" :key="p" :value="p">{{ p }}</option>
                </select>
                <p v-if="errors.pays" class="mt-1 text-sm text-red-500">{{ errors.pays }}</p>
              </div>
            </div>

            <!-- Mode de travail -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Teletravail <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label
                  v-for="mode in modesRemote"
                  :key="mode.value"
                  :class="[
                    'flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    form.mode_remote === mode.value
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-gray-200 dark:border-repae-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 text-repae-gray-700 dark:text-repae-gray-300'
                  ]"
                >
                  <input
                    v-model="form.mode_remote"
                    type="radio"
                    :value="mode.value"
                    class="sr-only"
                  />
                  <span class="font-medium font-brand text-sm">{{ mode.label }}</span>
                </label>
              </div>
              <p v-if="errors.mode_remote" class="mt-1 text-sm text-red-500">{{ errors.mode_remote }}</p>
            </div>

            <!-- Salaire -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Fourchette salariale <span class="text-repae-gray-400">(optionnel)</span>
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    v-model.number="form.salaire_min"
                    type="number"
                    min="0"
                    placeholder="Minimum"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <input
                    v-model.number="form.salaire_max"
                    type="number"
                    min="0"
                    placeholder="Maximum"
                    :class="[
                      'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2',
                      errors.salaire_max
                        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                    ]"
                  />
                  <p v-if="errors.salaire_max" class="mt-1 text-sm text-red-500">{{ errors.salaire_max }}</p>
                </div>
                <div>
                  <select
                    v-model="form.devise"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  >
                    <option value="FCFA">FCFA / mois</option>
                    <option value="EUR">EUR / mois</option>
                    <option value="USD">USD / mois</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Date limite -->
            <div>
              <label for="date_expiration" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Date limite de candidature <span class="text-red-500">*</span>
              </label>
              <input
                id="date_expiration"
                v-model="form.date_expiration"
                type="date"
                :min="minExpirationDate"
                :class="[
                  'w-full md:w-auto px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                  errors.date_expiration
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                ]"
              />
              <p v-if="errors.date_expiration" class="mt-1 text-sm text-red-500">{{ errors.date_expiration }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 3: Competences -->
      <div v-show="currentStep === 3" class="space-y-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-code" class="text-emerald-500" />
            Competences et qualifications
          </h2>

          <div class="space-y-6">
            <!-- Competences requises -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Competences requises <span class="text-red-500">*</span>
              </label>
              <div class="space-y-3">
                <div
                  v-for="(comp, index) in form.competences_requises"
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <input
                    :value="comp"
                    type="text"
                    placeholder="Ex: Vue.js, Python, SQL..."
                    class="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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
                  class="flex items-center gap-2 px-4 py-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
                  @click="addCompetence"
                >
                  <font-awesome-icon icon="fa-solid fa-plus" />
                  Ajouter une competence
                </button>
                <p v-if="errors.competences_requises" class="text-sm text-red-500">{{ errors.competences_requises }}</p>
              </div>
            </div>

            <!-- Niveau d'experience -->
            <div>
              <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Experience minimale <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label
                  v-for="niveau in niveauxExperience"
                  :key="niveau.value"
                  :class="[
                    'flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all text-center',
                    form.niveau_experience === niveau.value
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-gray-200 dark:border-repae-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 text-repae-gray-700 dark:text-repae-gray-300'
                  ]"
                >
                  <input
                    v-model="form.niveau_experience"
                    type="radio"
                    :value="niveau.value"
                    class="sr-only"
                  />
                  <span class="font-medium font-brand text-sm">{{ niveau.label }}</span>
                </label>
              </div>
              <p v-if="errors.niveau_experience" class="mt-1 text-sm text-red-500">{{ errors.niveau_experience }}</p>
            </div>

            <!-- Niveau d'etudes -->
            <div>
              <label for="niveau_etudes" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                Niveau d'etudes requis <span class="text-red-500">*</span>
              </label>
              <select
                id="niveau_etudes"
                v-model="form.niveau_etudes"
                :class="[
                  'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2',
                  errors.niveau_etudes
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                    : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500'
                ]"
              >
                <option value="">Selectionnez un niveau</option>
                <option v-for="niveau in niveauxEtudes" :key="niveau" :value="niveau">
                  {{ niveau }}
                </option>
              </select>
              <p v-if="errors.niveau_etudes" class="mt-1 text-sm text-red-500">{{ errors.niveau_etudes }}</p>
            </div>
          </div>
        </div>

        <!-- Actions finales -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Pret a publier ?
          </h2>
          <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
            Verifiez les informations de votre offre avant de la publier. Vous pourrez la modifier a tout moment depuis votre espace.
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
          class="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white rounded-xl font-medium font-brand transition-colors cursor-pointer disabled:cursor-not-allowed"
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
            Publier l'offre
          </template>
        </button>
      </div>
    </form>
  </div>
</template>
