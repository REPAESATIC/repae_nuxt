<script setup lang="ts">
import type { PromotionItem, DepartmentItem, CountryItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'espace-it',
})

useSeoMeta({
  title: 'Compléter mon profil | Espace IT REPAE',
})

const { createAlumni, fetchPromotions, fetchDepartments, fetchCountries } = useIdentityApi()
const toast = useToast()

// Données de référence
const promotions = ref<PromotionItem[]>([])
const departments = ref<DepartmentItem[]>([])
const countries = ref<CountryItem[]>([])
const loadingRef = ref(true)

// Formulaire
const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  promotionId: '',
  departmentId: '',
  countryId: '',
  city: '',
  degree: '',
  bio: '',
  linkedinUrl: '',
  githubUrl: '',
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

// Charger les données de référence
const loadReferenceData = async () => {
  loadingRef.value = true
  try {
    const [promoResult, deptResult, countryResult] = await Promise.all([
      fetchPromotions({ limit: 100 }),
      fetchDepartments({ limit: 100 }),
      fetchCountries({ limit: 200 }),
    ])
    promotions.value = promoResult.data
    departments.value = deptResult.data
    countries.value = countryResult.data
  } catch {
    toast.error('Erreur', 'Impossible de charger les données de référence.')
  } finally {
    loadingRef.value = false
  }
}

onMounted(loadReferenceData)

// Formatage téléphone E.164
function formatPhoneE164(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-\.()]/g, '')

  if (/^\+[1-9]\d{7,14}$/.test(cleaned)) {
    return cleaned
  }

  if (/^0[1-9]\d{8}$/.test(cleaned)) {
    return '+225' + cleaned.slice(1)
  }

  if (/^[1-9]\d{8,9}$/.test(cleaned)) {
    return '+225' + cleaned
  }

  return null
}

// Validation
const validateForm = (): boolean => {
  let isValid = true
  // Reset errors
  Object.keys(errors).forEach(k => errors[k] = '')

  if (!form.firstName.trim()) {
    errors.firstName = 'Le prénom est requis'
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Le nom est requis'
    isValid = false
  }

  if (!form.promotionId) {
    errors.promotionId = 'La promotion est requise'
    isValid = false
  }

  if (form.phoneNumber.trim()) {
    const phone = formatPhoneE164(form.phoneNumber)
    if (!phone) {
      errors.phoneNumber = 'Numéro invalide (ex: +225 07 00 00 00 00)'
      isValid = false
    }
  }

  if (form.linkedinUrl && !/^https?:\/\/.+/.test(form.linkedinUrl)) {
    errors.linkedinUrl = 'URL invalide (doit commencer par http:// ou https://)'
    isValid = false
  }

  if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) {
    errors.githubUrl = 'URL invalide (doit commencer par http:// ou https://)'
    isValid = false
  }

  return isValid
}

// Soumission
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    // Récupérer le userId depuis le localStorage
    const userRaw = localStorage.getItem('it-user')
    if (!userRaw) {
      toast.error('Erreur', 'Session expirée. Veuillez vous reconnecter.')
      localStorage.removeItem('it-auth')
      localStorage.removeItem('it-token')
      localStorage.removeItem('it-user')
      localStorage.removeItem('it-profile-incomplete')
      await navigateTo('/connexion-it')
      return
    }

    const user = JSON.parse(userRaw)

    const phone = form.phoneNumber.trim() ? formatPhoneE164(form.phoneNumber) : undefined

    await createAlumni({
      userId: user.userId,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      promotionId: form.promotionId,
      countryId: form.countryId || undefined,
      departmentId: form.departmentId || undefined,
      phoneNumber: phone || undefined,
      city: form.city.trim() || undefined,
      degree: form.degree.trim() || undefined,
      bio: form.bio.trim() || undefined,
      linkedinUrl: form.linkedinUrl.trim() || undefined,
      githubUrl: form.githubUrl.trim() || undefined,
    })

    // Succès — nettoyer le flag et rediriger
    localStorage.removeItem('it-profile-incomplete')
    toast.success('Profil créé', 'Votre profil a été créé avec succès. Bienvenue dans l\'Espace IT !')
    await navigateTo('/espace-it/profil')
  } catch (e: any) {
    const msg = e?.data?.message || 'Impossible de créer le profil. Veuillez réessayer.'
    toast.error('Erreur', Array.isArray(msg) ? msg.join(', ') : msg)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- En-tête d'accueil -->
    <div class="bg-gradient-to-r from-repae-blue-500 to-repae-blue-700 rounded-2xl p-8 text-white">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
          <font-awesome-icon icon="fa-solid fa-user-plus" class="text-2xl" />
        </div>
        <div>
          <h1 class="text-2xl font-bold font-brand">
            Bienvenue dans l'Espace IT !
          </h1>
          <p class="text-repae-blue-100 mt-1">
            Complétez votre profil pour accéder à toutes les fonctionnalités.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3 text-sm text-repae-blue-100">
        <font-awesome-icon icon="fa-solid fa-info-circle" />
        <span>Les champs marqués d'un <strong class="text-white">*</strong> sont obligatoires.</span>
      </div>
    </div>

    <!-- Chargement -->
    <div v-if="loadingRef" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-2xl animate-spin" />
    </div>

    <!-- Formulaire -->
    <form v-else class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Section : Informations personnelles -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
          Informations personnelles
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
          Ces informations seront visibles sur votre profil alumni.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Prénom -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Prénom <span class="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="Votre prénom"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
              :class="errors.firstName ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-repae-gray-700'"
            />
            <p v-if="errors.firstName" class="mt-1 text-xs text-red-500">{{ errors.firstName }}</p>
          </div>

          <!-- Nom -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Nom <span class="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Votre nom de famille"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
              :class="errors.lastName ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-repae-gray-700'"
            />
            <p v-if="errors.lastName" class="mt-1 text-xs text-red-500">{{ errors.lastName }}</p>
          </div>

          <!-- Téléphone -->
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Téléphone
            </label>
            <input
              id="phoneNumber"
              v-model="form.phoneNumber"
              type="tel"
              placeholder="+225 07 00 00 00 00"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
              :class="errors.phoneNumber ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-repae-gray-700'"
            />
            <p v-if="errors.phoneNumber" class="mt-1 text-xs text-red-500">{{ errors.phoneNumber }}</p>
          </div>

          <!-- Ville -->
          <div>
            <label for="city" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Ville
            </label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              placeholder="Votre ville de résidence"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Section : Parcours académique -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
          Parcours académique
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
          Informations liées à votre formation à l'ESATIC.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Promotion -->
          <div>
            <label for="promotionId" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Promotion <span class="text-red-500">*</span>
            </label>
            <select
              id="promotionId"
              v-model="form.promotionId"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 cursor-pointer transition-all"
              :class="errors.promotionId ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-repae-gray-700'"
            >
              <option value="" disabled>Sélectionnez votre promotion</option>
              <option v-for="promo in promotions" :key="promo.id" :value="promo.id">
                {{ promo.year }}{{ promo.nickname ? ` — ${promo.nickname}` : '' }}
              </option>
            </select>
            <p v-if="errors.promotionId" class="mt-1 text-xs text-red-500">{{ errors.promotionId }}</p>
          </div>

          <!-- Département -->
          <div>
            <label for="departmentId" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Département
            </label>
            <select
              id="departmentId"
              v-model="form.departmentId"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 cursor-pointer transition-all"
            >
              <option value="">Aucun</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}{{ dept.acronym ? ` (${dept.acronym})` : '' }}
              </option>
            </select>
          </div>

          <!-- Diplôme -->
          <div>
            <label for="degree" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Diplôme obtenu
            </label>
            <input
              id="degree"
              v-model="form.degree"
              type="text"
              placeholder="Ex: Ingénieur en Informatique"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
            />
          </div>

          <!-- Pays -->
          <div>
            <label for="countryId" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Pays de résidence
            </label>
            <select
              id="countryId"
              v-model="form.countryId"
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 cursor-pointer transition-all"
            >
              <option value="">Sélectionnez un pays</option>
              <option v-for="country in countries" :key="country.id" :value="country.id">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Section : À propos (optionnel) -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h2 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
          À propos de vous
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-6">
          Ces informations sont optionnelles mais aident les autres alumni à vous connaître.
        </p>

        <!-- Biographie -->
        <div class="mb-5">
          <label for="bio" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
            Biographie
          </label>
          <textarea
            id="bio"
            v-model="form.bio"
            rows="4"
            maxlength="500"
            placeholder="Présentez-vous en quelques mots..."
            class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all resize-none"
          />
          <p class="mt-1 text-xs text-repae-gray-400 text-right">{{ form.bio.length }} / 500</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- LinkedIn -->
          <div>
            <label for="linkedinUrl" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Profil LinkedIn
            </label>
            <input
              id="linkedinUrl"
              v-model="form.linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/..."
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
              :class="errors.linkedinUrl ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-repae-gray-700'"
            />
            <p v-if="errors.linkedinUrl" class="mt-1 text-xs text-red-500">{{ errors.linkedinUrl }}</p>
          </div>

          <!-- GitHub -->
          <div>
            <label for="githubUrl" class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-1.5">
              Profil GitHub
            </label>
            <input
              id="githubUrl"
              v-model="form.githubUrl"
              type="url"
              placeholder="https://github.com/..."
              class="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border text-sm text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/30 focus:border-repae-blue-500 transition-all"
              :class="errors.githubUrl ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-repae-gray-700'"
            />
            <p v-if="errors.githubUrl" class="mt-1 text-xs text-red-500">{{ errors.githubUrl }}</p>
          </div>
        </div>
      </div>

      <!-- Bouton de soumission -->
      <div class="flex items-center justify-end gap-3">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-repae-blue-500 hover:bg-repae-blue-600 disabled:bg-repae-blue-300 text-white font-semibold font-brand text-sm shadow-lg shadow-repae-blue-500/25 hover:shadow-repae-blue-500/40 transition-all cursor-pointer"
        >
          <font-awesome-icon
            :icon="isSubmitting ? 'fa-solid fa-spinner' : 'fa-solid fa-check'"
            :class="{ 'animate-spin': isSubmitting }"
          />
          {{ isSubmitting ? 'Création en cours...' : 'Créer mon profil' }}
        </button>
      </div>
    </form>
  </div>
</template>
