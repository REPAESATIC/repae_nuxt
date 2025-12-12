<script setup lang="ts">
import type { TypeContrat, NiveauExperience, ModeRemote } from '~/data/espace-it/offres'
import { contratConfig, experienceConfig, remoteConfig } from '~/data/espace-it/offres'
import { entreprisesList } from '~/data/espace-it/entreprises-alumni'

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'preview', data: FormData): void
}>()

// Form data interface
export interface FormData {
  titre: string
  entreprise_id: string
  type_contrat: TypeContrat | null
  niveau_experience: NiveauExperience | null
  mode_remote: ModeRemote | null
  salaire_min: number | null
  salaire_max: number | null
  devise: string
  description: string
  description_complete: string
  responsabilites: string[]
  competences_requises: string[]
  competences_souhaitees: string[]
  avantages: string[]
  date_expiration: string
}

// Form state
const form = reactive<FormData>({
  titre: '',
  entreprise_id: '',
  type_contrat: null,
  niveau_experience: null,
  mode_remote: null,
  salaire_min: null,
  salaire_max: null,
  devise: 'FCFA',
  description: '',
  description_complete: '',
  responsabilites: [''],
  competences_requises: [''],
  competences_souhaitees: [''],
  avantages: [''],
  date_expiration: ''
})

// Validation errors
const errors = reactive<Record<string, string>>({})

// Options for selects
const typesContrat = Object.entries(contratConfig).map(([value, config]) => ({
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

// Array field management
const addArrayItem = (field: 'responsabilites' | 'competences_requises' | 'competences_souhaitees' | 'avantages') => {
  form[field].push('')
}

const removeArrayItem = (field: 'responsabilites' | 'competences_requises' | 'competences_souhaitees' | 'avantages', index: number) => {
  if (form[field].length > 1) {
    form[field].splice(index, 1)
  }
}

const updateArrayItem = (field: 'responsabilites' | 'competences_requises' | 'competences_souhaitees' | 'avantages', index: number, value: string) => {
  form[field][index] = value
}

// Clean array (remove empty items)
const cleanArray = (arr: string[]): string[] => {
  return arr.filter(item => item.trim() !== '')
}

// Validate form
const validateForm = (): boolean => {
  // Reset errors
  Object.keys(errors).forEach(key => delete errors[key])

  let isValid = true

  if (!form.titre.trim()) {
    errors.titre = 'Le titre est requis'
    isValid = false
  }

  if (!form.entreprise_id) {
    errors.entreprise_id = 'Veuillez selectionner une entreprise'
    isValid = false
  }

  if (!form.type_contrat) {
    errors.type_contrat = 'Le type de contrat est requis'
    isValid = false
  }

  if (!form.niveau_experience) {
    errors.niveau_experience = 'Le niveau d\'experience est requis'
    isValid = false
  }

  if (!form.mode_remote) {
    errors.mode_remote = 'Le mode de travail est requis'
    isValid = false
  }

  if (!form.description.trim()) {
    errors.description = 'La description courte est requise'
    isValid = false
  } else if (form.description.trim().length < 50) {
    errors.description = 'La description doit contenir au moins 50 caracteres'
    isValid = false
  }

  if (!form.description_complete.trim()) {
    errors.description_complete = 'La description complete est requise'
    isValid = false
  } else if (form.description_complete.trim().length < 100) {
    errors.description_complete = 'La description complete doit contenir au moins 100 caracteres'
    isValid = false
  }

  const cleanedResponsabilites = cleanArray(form.responsabilites)
  if (cleanedResponsabilites.length < 2) {
    errors.responsabilites = 'Ajoutez au moins 2 responsabilites'
    isValid = false
  }

  const cleanedCompetences = cleanArray(form.competences_requises)
  if (cleanedCompetences.length < 2) {
    errors.competences_requises = 'Ajoutez au moins 2 competences requises'
    isValid = false
  }

  if (!form.date_expiration) {
    errors.date_expiration = 'La date d\'expiration est requise'
    isValid = false
  } else {
    const expDate = new Date(form.date_expiration)
    const today = new Date()
    if (expDate <= today) {
      errors.date_expiration = 'La date d\'expiration doit etre dans le futur'
      isValid = false
    }
  }

  return isValid
}

// Get cleaned form data
const getCleanedFormData = (): FormData => {
  return {
    ...form,
    responsabilites: cleanArray(form.responsabilites),
    competences_requises: cleanArray(form.competences_requises),
    competences_souhaitees: cleanArray(form.competences_souhaitees),
    avantages: cleanArray(form.avantages)
  }
}

// Submit form
const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', getCleanedFormData())
  }
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
  <form class="space-y-8" @submit.prevent="handleSubmit">
    <!-- Section 1: Informations de base -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-info-circle" class="text-repae-blue-500" />
        Informations de base
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Titre -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Titre du poste <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.titre"
            type="text"
            placeholder="ex: Developpeur Full Stack Senior"
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors',
              errors.titre ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          />
          <p v-if="errors.titre" class="mt-1 text-sm text-red-500">{{ errors.titre }}</p>
        </div>

        <!-- Entreprise -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Entreprise <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.entreprise_id"
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none',
              errors.entreprise_id ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          >
            <option value="">Selectionnez une entreprise</option>
            <option v-for="entreprise in entreprisesList" :key="entreprise.id" :value="entreprise.id">
              {{ entreprise.nom }}
            </option>
          </select>
          <p v-if="errors.entreprise_id" class="mt-1 text-sm text-red-500">{{ errors.entreprise_id }}</p>
        </div>

        <!-- Type de contrat -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Type de contrat <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.type_contrat"
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none',
              errors.type_contrat ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          >
            <option :value="null">Selectionnez un type</option>
            <option v-for="type in typesContrat" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
          <p v-if="errors.type_contrat" class="mt-1 text-sm text-red-500">{{ errors.type_contrat }}</p>
        </div>

        <!-- Niveau d'experience -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Niveau d'experience <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.niveau_experience"
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none',
              errors.niveau_experience ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          >
            <option :value="null">Selectionnez un niveau</option>
            <option v-for="niveau in niveauxExperience" :key="niveau.value" :value="niveau.value">
              {{ niveau.label }}
            </option>
          </select>
          <p v-if="errors.niveau_experience" class="mt-1 text-sm text-red-500">{{ errors.niveau_experience }}</p>
        </div>

        <!-- Mode de travail -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Mode de travail <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.mode_remote"
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none',
              errors.mode_remote ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          >
            <option :value="null">Selectionnez un mode</option>
            <option v-for="mode in modesRemote" :key="mode.value" :value="mode.value">
              {{ mode.label }}
            </option>
          </select>
          <p v-if="errors.mode_remote" class="mt-1 text-sm text-red-500">{{ errors.mode_remote }}</p>
        </div>
      </div>
    </div>

    <!-- Section 2: Remuneration -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-money-bill-wave" class="text-repae-blue-500" />
        Remuneration <span class="text-sm font-normal text-repae-gray-400">(optionnel)</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Salaire min -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Salaire minimum
          </label>
          <input
            v-model.number="form.salaire_min"
            type="number"
            min="0"
            placeholder="ex: 800000"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
          />
        </div>

        <!-- Salaire max -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Salaire maximum
          </label>
          <input
            v-model.number="form.salaire_max"
            type="number"
            min="0"
            placeholder="ex: 1500000"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
          />
        </div>

        <!-- Devise -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Devise
          </label>
          <select
            v-model="form.devise"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer appearance-none"
          >
            <option value="FCFA">FCFA</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Section 3: Description -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-file-alt" class="text-repae-blue-500" />
        Description
      </h2>

      <div class="space-y-6">
        <!-- Description courte -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Description courte <span class="text-red-500">*</span>
            <span class="text-repae-gray-400 font-normal">(affichee dans la liste)</span>
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Resume attractif du poste en quelques lignes..."
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors resize-none',
              errors.description ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          />
          <div class="flex justify-between mt-1">
            <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
            <p class="text-xs text-repae-gray-400 ml-auto">{{ form.description.length }} / 50 min</p>
          </div>
        </div>

        <!-- Description complete -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Description complete <span class="text-red-500">*</span>
            <span class="text-repae-gray-400 font-normal">(affichee dans le detail)</span>
          </label>
          <textarea
            v-model="form.description_complete"
            rows="8"
            placeholder="Description detaillee du poste, de l'entreprise, du contexte..."
            :class="[
              'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors resize-none',
              errors.description_complete ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
            ]"
          />
          <div class="flex justify-between mt-1">
            <p v-if="errors.description_complete" class="text-sm text-red-500">{{ errors.description_complete }}</p>
            <p class="text-xs text-repae-gray-400 ml-auto">{{ form.description_complete.length }} / 100 min</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 4: Responsabilites -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-list-check" class="text-repae-blue-500" />
        Responsabilites <span class="text-red-500">*</span>
      </h2>

      <div class="space-y-3">
        <div
          v-for="(item, index) in form.responsabilites"
          :key="index"
          class="flex items-center gap-3"
        >
          <input
            :value="item"
            type="text"
            placeholder="ex: Developper de nouvelles fonctionnalites"
            class="flex-1 px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
            @input="updateArrayItem('responsabilites', index, ($event.target as HTMLInputElement).value)"
          />
          <button
            v-if="form.responsabilites.length > 1"
            type="button"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            @click="removeArrayItem('responsabilites', index)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 text-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
          @click="addArrayItem('responsabilites')"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Ajouter une responsabilite
        </button>
        <p v-if="errors.responsabilites" class="text-sm text-red-500">{{ errors.responsabilites }}</p>
      </div>
    </div>

    <!-- Section 5: Competences -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-code" class="text-repae-blue-500" />
        Competences
      </h2>

      <!-- Competences requises -->
      <div class="mb-8">
        <h3 class="text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
          Competences requises <span class="text-red-500">*</span>
        </h3>
        <div class="space-y-3">
          <div
            v-for="(item, index) in form.competences_requises"
            :key="index"
            class="flex items-center gap-3"
          >
            <input
              :value="item"
              type="text"
              placeholder="ex: Vue.js"
              class="flex-1 px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
              @input="updateArrayItem('competences_requises', index, ($event.target as HTMLInputElement).value)"
            />
            <button
              v-if="form.competences_requises.length > 1"
              type="button"
              class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              @click="removeArrayItem('competences_requises', index)"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
          <button
            type="button"
            class="flex items-center gap-2 px-4 py-2 text-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
            @click="addArrayItem('competences_requises')"
          >
            <font-awesome-icon icon="fa-solid fa-plus" />
            Ajouter une competence
          </button>
          <p v-if="errors.competences_requises" class="text-sm text-red-500">{{ errors.competences_requises }}</p>
        </div>
      </div>

      <!-- Competences souhaitees -->
      <div>
        <h3 class="text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-3">
          Competences souhaitees <span class="text-repae-gray-400">(bonus)</span>
        </h3>
        <div class="space-y-3">
          <div
            v-for="(item, index) in form.competences_souhaitees"
            :key="index"
            class="flex items-center gap-3"
          >
            <input
              :value="item"
              type="text"
              placeholder="ex: Docker"
              class="flex-1 px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
              @input="updateArrayItem('competences_souhaitees', index, ($event.target as HTMLInputElement).value)"
            />
            <button
              v-if="form.competences_souhaitees.length > 1"
              type="button"
              class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              @click="removeArrayItem('competences_souhaitees', index)"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
          <button
            type="button"
            class="flex items-center gap-2 px-4 py-2 text-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
            @click="addArrayItem('competences_souhaitees')"
          >
            <font-awesome-icon icon="fa-solid fa-plus" />
            Ajouter une competence
          </button>
        </div>
      </div>
    </div>

    <!-- Section 6: Avantages -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-gift" class="text-repae-blue-500" />
        Avantages <span class="text-sm font-normal text-repae-gray-400">(optionnel)</span>
      </h2>

      <div class="space-y-3">
        <div
          v-for="(item, index) in form.avantages"
          :key="index"
          class="flex items-center gap-3"
        >
          <input
            :value="item"
            type="text"
            placeholder="ex: Teletravail 2 jours par semaine"
            class="flex-1 px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors"
            @input="updateArrayItem('avantages', index, ($event.target as HTMLInputElement).value)"
          />
          <button
            v-if="form.avantages.length > 1"
            type="button"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            @click="removeArrayItem('avantages', index)"
          >
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
        <button
          type="button"
          class="flex items-center gap-2 px-4 py-2 text-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 rounded-xl transition-colors cursor-pointer text-sm font-medium font-brand"
          @click="addArrayItem('avantages')"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
          Ajouter un avantage
        </button>
      </div>
    </div>

    <!-- Section 7: Date d'expiration -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-blue-500" />
        Date d'expiration
      </h2>

      <div class="max-w-xs">
        <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Date limite de candidature <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.date_expiration"
          type="date"
          :min="minExpirationDate"
          :class="[
            'w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border rounded-xl text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 transition-colors cursor-pointer',
            errors.date_expiration ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-700'
          ]"
        />
        <p v-if="errors.date_expiration" class="mt-1 text-sm text-red-500">{{ errors.date_expiration }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row items-center justify-end gap-4">
      <button
        type="button"
        class="w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
        @click="handlePreview"
      >
        <font-awesome-icon icon="fa-solid fa-eye" />
        Previsualiser
      </button>
      <button
        type="submit"
        class="w-full sm:w-auto px-6 py-3 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <font-awesome-icon icon="fa-solid fa-paper-plane" />
        Publier l'offre
      </button>
    </div>
  </form>
</template>
