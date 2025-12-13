<script setup lang="ts">
const emit = defineEmits<{
  (e: 'success'): void
}>()

// Form state
const currentStep = ref(1)
const totalSteps = 3
const isSubmitting = ref(false)

// Form data
const formData = reactive({
  // Etape 1 - Entreprise
  nom: '',
  secteur_activite: '',
  taille: '' as '' | 'startup' | 'pme' | 'grande_entreprise',
  description: '',

  // Etape 2 - Coordonnees
  adresse: '',
  ville: '',
  pays: 'Cote d\'Ivoire',
  telephone: '',
  site_web: '',

  // Etape 3 - Compte
  email: '',
  password: '',
  password_confirm: '',
  accept_cgu: false
})

// Validation errors
const errors = reactive<Record<string, string>>({})

// Options
const secteurs = [
  'Technologies de l\'information',
  'Finance et Banque',
  'Telecommunications',
  'Energie',
  'Sante',
  'Education',
  'Commerce et Distribution',
  'Industrie',
  'Transport et Logistique',
  'Conseil',
  'Autre'
]

const tailles = [
  { value: 'startup', label: 'Startup (1-10 employes)' },
  { value: 'pme', label: 'PME (11-250 employes)' },
  { value: 'grande_entreprise', label: 'Grande entreprise (250+ employes)' }
]

const pays = [
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

// Validation functions
const validateStep1 = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.nom.trim()) {
    newErrors.nom = 'Le nom de l\'entreprise est requis'
  } else if (formData.nom.length < 2) {
    newErrors.nom = 'Le nom doit contenir au moins 2 caracteres'
  }

  if (!formData.secteur_activite) {
    newErrors.secteur_activite = 'Veuillez selectionner un secteur d\'activite'
  }

  if (!formData.taille) {
    newErrors.taille = 'Veuillez selectionner la taille de l\'entreprise'
  }

  if (!formData.description.trim()) {
    newErrors.description = 'Une description est requise'
  } else if (formData.description.length < 50) {
    newErrors.description = 'La description doit contenir au moins 50 caracteres'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const validateStep2 = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.adresse.trim()) {
    newErrors.adresse = 'L\'adresse est requise'
  }

  if (!formData.ville.trim()) {
    newErrors.ville = 'La ville est requise'
  }

  if (!formData.pays) {
    newErrors.pays = 'Veuillez selectionner un pays'
  }

  if (!formData.telephone.trim()) {
    newErrors.telephone = 'Le numero de telephone est requis'
  } else if (!/^[\d\s+()-]{8,20}$/.test(formData.telephone)) {
    newErrors.telephone = 'Numero de telephone invalide'
  }

  if (formData.site_web && !/^https?:\/\/.+\..+/.test(formData.site_web)) {
    newErrors.site_web = 'URL invalide (ex: https://example.com)'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const validateStep3 = () => {
  const newErrors: Record<string, string> = {}

  if (!formData.email.trim()) {
    newErrors.email = 'L\'email est requis'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Email invalide'
  }

  if (!formData.password) {
    newErrors.password = 'Le mot de passe est requis'
  } else if (formData.password.length < 8) {
    newErrors.password = 'Le mot de passe doit contenir au moins 8 caracteres'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    newErrors.password = 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre'
  }

  if (!formData.password_confirm) {
    newErrors.password_confirm = 'Veuillez confirmer le mot de passe'
  } else if (formData.password !== formData.password_confirm) {
    newErrors.password_confirm = 'Les mots de passe ne correspondent pas'
  }

  if (!formData.accept_cgu) {
    newErrors.accept_cgu = 'Vous devez accepter les conditions d\'utilisation'
  }

  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const clearErrors = () => {
  Object.keys(errors).forEach(key => delete errors[key])
}

// Navigation
const nextStep = () => {
  clearErrors()

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
  clearErrors()
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Submit
const submit = async () => {
  clearErrors()

  if (!validateStep3()) {
    return
  }

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  isSubmitting.value = false
  emit('success')
}
</script>

<template>
  <div class="w-full">
    <!-- Steps indicator -->
    <EspaceEntreprisesInscriptionSteps
      :current-step="currentStep"
      :total-steps="totalSteps"
      class="mb-8"
    />

    <!-- Form -->
    <form @submit.prevent="currentStep === totalSteps ? submit() : nextStep()">
      <!-- Etape 1: Informations entreprise -->
      <div v-show="currentStep === 1" class="space-y-6">
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6">
          Informations de l'entreprise
        </h2>

        <!-- Nom -->
        <div>
          <label for="nom" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Nom de l'entreprise <span class="text-red-500">*</span>
          </label>
          <input
            id="nom"
            v-model="formData.nom"
            type="text"
            placeholder="Ex: TechCorp CI"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.nom
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.nom" class="mt-1 text-sm text-red-500">{{ errors.nom }}</p>
        </div>

        <!-- Secteur d'activite -->
        <div>
          <label for="secteur" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Secteur d'activite <span class="text-red-500">*</span>
          </label>
          <select
            id="secteur"
            v-model="formData.secteur_activite"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white transition-colors cursor-pointer',
              errors.secteur_activite
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          >
            <option value="">Selectionnez un secteur</option>
            <option v-for="secteur in secteurs" :key="secteur" :value="secteur">
              {{ secteur }}
            </option>
          </select>
          <p v-if="errors.secteur_activite" class="mt-1 text-sm text-red-500">{{ errors.secteur_activite }}</p>
        </div>

        <!-- Taille -->
        <div>
          <label class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Taille de l'entreprise <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              v-for="taille in tailles"
              :key="taille.value"
              :class="[
                'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                formData.taille === taille.value
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                  : 'border-gray-200 dark:border-repae-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
              ]"
            >
              <input
                v-model="formData.taille"
                type="radio"
                :value="taille.value"
                class="sr-only"
              />
              <div
                :class="[
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  formData.taille === taille.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-gray-300 dark:border-repae-gray-600'
                ]"
              >
                <div v-if="formData.taille === taille.value" class="w-2 h-2 rounded-full bg-white" />
              </div>
              <span class="text-sm font-brand text-repae-gray-700 dark:text-repae-gray-300">
                {{ taille.label }}
              </span>
            </label>
          </div>
          <p v-if="errors.taille" class="mt-1 text-sm text-red-500">{{ errors.taille }}</p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Description de l'entreprise <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            placeholder="Decrivez votre entreprise, ses activites et sa mission..."
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors resize-none',
              errors.description
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <div class="flex justify-between mt-1">
            <p v-if="errors.description" class="text-sm text-red-500">{{ errors.description }}</p>
            <p class="text-xs text-repae-gray-400 ml-auto">{{ formData.description.length }}/50 min</p>
          </div>
        </div>
      </div>

      <!-- Etape 2: Coordonnees -->
      <div v-show="currentStep === 2" class="space-y-6">
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6">
          Coordonnees
        </h2>

        <!-- Adresse -->
        <div>
          <label for="adresse" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Adresse <span class="text-red-500">*</span>
          </label>
          <input
            id="adresse"
            v-model="formData.adresse"
            type="text"
            placeholder="Ex: 123 Boulevard de la Republique"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.adresse
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.adresse" class="mt-1 text-sm text-red-500">{{ errors.adresse }}</p>
        </div>

        <!-- Ville et Pays -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="ville" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
              Ville <span class="text-red-500">*</span>
            </label>
            <input
              id="ville"
              v-model="formData.ville"
              type="text"
              placeholder="Ex: Abidjan"
              :class="[
                'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
                errors.ville
                  ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
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
              v-model="formData.pays"
              :class="[
                'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white transition-colors cursor-pointer',
                errors.pays
                  ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
              ]"
            >
              <option v-for="p in pays" :key="p" :value="p">{{ p }}</option>
            </select>
            <p v-if="errors.pays" class="mt-1 text-sm text-red-500">{{ errors.pays }}</p>
          </div>
        </div>

        <!-- Telephone -->
        <div>
          <label for="telephone" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Telephone <span class="text-red-500">*</span>
          </label>
          <input
            id="telephone"
            v-model="formData.telephone"
            type="tel"
            placeholder="Ex: +225 27 20 00 00 00"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.telephone
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.telephone" class="mt-1 text-sm text-red-500">{{ errors.telephone }}</p>
        </div>

        <!-- Site web -->
        <div>
          <label for="site_web" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Site web <span class="text-repae-gray-400">(optionnel)</span>
          </label>
          <input
            id="site_web"
            v-model="formData.site_web"
            type="url"
            placeholder="Ex: https://www.votreentreprise.com"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.site_web
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.site_web" class="mt-1 text-sm text-red-500">{{ errors.site_web }}</p>
        </div>
      </div>

      <!-- Etape 3: Compte utilisateur -->
      <div v-show="currentStep === 3" class="space-y-6">
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6">
          Creer votre compte
        </h2>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Email de connexion <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Ex: contact@votreentreprise.com"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.email
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Mot de passe <span class="text-red-500">*</span>
          </label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="Minimum 8 caracteres"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.password
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          <p v-else class="mt-1 text-xs text-repae-gray-400">
            Doit contenir au moins 8 caracteres, une majuscule, une minuscule et un chiffre
          </p>
        </div>

        <!-- Password confirm -->
        <div>
          <label for="password_confirm" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Confirmer le mot de passe <span class="text-red-500">*</span>
          </label>
          <input
            id="password_confirm"
            v-model="formData.password_confirm"
            type="password"
            placeholder="Retapez votre mot de passe"
            :class="[
              'w-full px-4 py-3 rounded-xl border bg-white dark:bg-repae-gray-800 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 transition-colors',
              errors.password_confirm
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-gray-200 dark:border-repae-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500'
            ]"
          />
          <p v-if="errors.password_confirm" class="mt-1 text-sm text-red-500">{{ errors.password_confirm }}</p>
        </div>

        <!-- CGU -->
        <div>
          <label
            :class="[
              'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
              formData.accept_cgu
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
                : errors.accept_cgu
                  ? 'border-red-500'
                  : 'border-gray-200 dark:border-repae-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
            ]"
          >
            <input
              v-model="formData.accept_cgu"
              type="checkbox"
              class="sr-only"
            />
            <div
              :class="[
                'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors',
                formData.accept_cgu
                  ? 'border-emerald-500 bg-emerald-500'
                  : 'border-gray-300 dark:border-repae-gray-600'
              ]"
            >
              <font-awesome-icon
                v-if="formData.accept_cgu"
                icon="fa-solid fa-check"
                class="text-white text-xs"
              />
            </div>
            <span class="text-sm text-repae-gray-600 dark:text-repae-gray-400">
              J'accepte les
              <NuxtLink to="/cgu" class="text-emerald-500 hover:text-emerald-600 underline">
                conditions generales d'utilisation
              </NuxtLink>
              et la
              <NuxtLink to="/confidentialite" class="text-emerald-500 hover:text-emerald-600 underline">
                politique de confidentialite
              </NuxtLink>
              du REPAE. <span class="text-red-500">*</span>
            </span>
          </label>
          <p v-if="errors.accept_cgu" class="mt-1 text-sm text-red-500">{{ errors.accept_cgu }}</p>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-repae-gray-700">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="prevStep"
          class="flex items-center gap-2 px-6 py-3 text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-900 dark:hover:text-white font-medium font-brand transition-colors cursor-pointer"
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
            Inscription en cours...
          </template>
          <template v-else-if="currentStep < totalSteps">
            Suivant
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
          </template>
          <template v-else>
            <font-awesome-icon icon="fa-solid fa-check" />
            Creer mon compte
          </template>
        </button>
      </div>
    </form>
  </div>
</template>
