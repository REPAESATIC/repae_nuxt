<script setup lang="ts">
import { disponibiliteConfig } from '@/data/espace-it/user-profile'
import type { ImageVariants } from '~/types/image'

interface ProfileFormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  photo_url: string
  cover_url: string
  poste_actuel: string
  entreprise_actuelle: string
  countryId: string
  ville: string
  adresse: string
  disponibilite: 'disponible' | 'en_poste' | 'ouvert_opportunites'
  biographie: string
  diplome: string
  site_web: string
  linkedin_url: string
  twitter_url: string
  github_url: string
}

const props = defineProps<{
  formData: ProfileFormData
  isSubmitting: boolean
  countries?: { id: string; name: string }[]
}>()

const emit = defineEmits<{
  submit: []
  cancel: []
  'update:photoFile': [file: File | null]
  'update:coverFile': [file: File | null]
}>()

// ─── Image Upload State ────────────────────────────────────────────────────────

// Photo de profil
const rawPhotoFile = ref<File | null>(null)
const showPhotoEditor = ref(false)
const photoFile = ref<File | null>(null)
const photoPreview = ref<string | null>(null)

// Photo de couverture
const rawCoverFile = ref<File | null>(null)
const showCoverEditor = ref(false)
const coverFile = ref<File | null>(null)
const coverPreview = ref<string | null>(null)

// ─── Photo handlers ────────────────────────────────────────────────────────────

const onPhotoSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    rawPhotoFile.value = file
    showPhotoEditor.value = true
  }
  target.value = ''
}

const onPhotoEditorSave = (variants: ImageVariants) => {
  const file = new File([variants.high], 'photo-profile.jpg', { type: variants.high.type })
  photoFile.value = file
  emit('update:photoFile', file)

  if (photoPreview.value) URL.revokeObjectURL(photoPreview.value)
  photoPreview.value = URL.createObjectURL(variants.high)

  showPhotoEditor.value = false
  rawPhotoFile.value = null
}

const onPhotoEditorCancel = () => {
  showPhotoEditor.value = false
  rawPhotoFile.value = null
}

const removePhoto = () => {
  photoFile.value = null
  emit('update:photoFile', null)
  if (photoPreview.value) {
    URL.revokeObjectURL(photoPreview.value)
    photoPreview.value = null
  }
  props.formData.photo_url = ''
}

// ─── Cover handlers ────────────────────────────────────────────────────────────

const onCoverSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    rawCoverFile.value = file
    showCoverEditor.value = true
  }
  target.value = ''
}

const onCoverEditorSave = (variants: ImageVariants) => {
  const file = new File([variants.high], 'cover-photo.jpg', { type: variants.high.type })
  coverFile.value = file
  emit('update:coverFile', file)

  if (coverPreview.value) URL.revokeObjectURL(coverPreview.value)
  coverPreview.value = URL.createObjectURL(variants.high)

  showCoverEditor.value = false
  rawCoverFile.value = null
}

const onCoverEditorCancel = () => {
  showCoverEditor.value = false
  rawCoverFile.value = null
}

const removeCover = () => {
  coverFile.value = null
  emit('update:coverFile', null)
  if (coverPreview.value) {
    URL.revokeObjectURL(coverPreview.value)
    coverPreview.value = null
  }
  props.formData.cover_url = ''
}

// Computed : image source effective (preview locale > URL existante)
const effectivePhotoSrc = computed(() => photoPreview.value || props.formData.photo_url || '')
const effectiveCoverSrc = computed(() => coverPreview.value || props.formData.cover_url || '')

// Cleanup
onUnmounted(() => {
  if (photoPreview.value) URL.revokeObjectURL(photoPreview.value)
  if (coverPreview.value) URL.revokeObjectURL(coverPreview.value)
})

// ─── Validation ────────────────────────────────────────────────────────────────

const errors = reactive<Partial<Record<keyof ProfileFormData, string>>>({})

const validateField = (field: keyof ProfileFormData): boolean => {
  errors[field] = ''

  switch (field) {
    case 'prenom':
    case 'nom':
      if (!props.formData[field].trim()) {
        errors[field] = 'Ce champ est requis'
        return false
      }
      break
    case 'telephone':
      if (!props.formData.telephone.trim()) {
        errors.telephone = 'Le téléphone est requis'
        return false
      }
      break
    case 'linkedin_url':
    case 'twitter_url':
    case 'github_url':
    case 'site_web':
      if (props.formData[field] && !/^https?:\/\/.+/.test(props.formData[field])) {
        errors[field] = 'URL invalide (doit commencer par http:// ou https://)'
        return false
      }
      break
  }
  return true
}

const validateForm = (): boolean => {
  let isValid = true
  const fields: (keyof ProfileFormData)[] = ['prenom', 'nom', 'telephone', 'linkedin_url', 'twitter_url', 'github_url', 'site_web']

  for (const field of fields) {
    if (!validateField(field)) {
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Photo & Cover Section -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <font-awesome-icon icon="fa-solid fa-image" class="text-repae-blue-500" />
        Photos
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Photo de profil -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Photo de profil
          </label>

          <!-- ImageEditor pour photo -->
          <ImageEditor
            v-if="showPhotoEditor && rawPhotoFile"
            :image-file="rawPhotoFile"
            :aspect-ratio="1"
            :low-width="150"
            :medium-width="300"
            @save="onPhotoEditorSave"
            @cancel="onPhotoEditorCancel"
          />

          <!-- Aperçu photo existante ou nouvelle -->
          <div v-else-if="effectivePhotoSrc" class="flex items-center gap-4">
            <img
              :src="effectivePhotoSrc"
              alt="Photo de profil"
              class="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-repae-gray-600"
            />
            <div class="flex gap-2">
              <label
                class="px-3 py-2 rounded-lg bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-brand transition-colors cursor-pointer flex items-center gap-2"
              >
                <font-awesome-icon icon="fa-solid fa-pen" class="text-xs" />
                Modifier
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onPhotoSelect"
                />
              </label>
              <button
                type="button"
                class="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-brand transition-colors cursor-pointer flex items-center gap-2"
                @click="removePhoto"
              >
                <font-awesome-icon icon="fa-solid fa-trash" class="text-xs" />
                Supprimer
              </button>
            </div>
          </div>

          <!-- Zone d'upload (pas de photo) -->
          <label
            v-else
            class="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed border-gray-300 dark:border-repae-gray-600 hover:border-repae-blue-400 dark:hover:border-repae-blue-500 transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="text-2xl text-repae-gray-400 mb-2" />
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
              Ajouter une photo de profil
            </span>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="onPhotoSelect"
            />
          </label>
        </div>

        <!-- Photo de couverture -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Photo de couverture
          </label>

          <!-- ImageEditor pour couverture -->
          <ImageEditor
            v-if="showCoverEditor && rawCoverFile"
            :image-file="rawCoverFile"
            @save="onCoverEditorSave"
            @cancel="onCoverEditorCancel"
          />

          <!-- Aperçu couverture existante ou nouvelle -->
          <div v-else-if="effectiveCoverSrc" class="relative">
            <div
              class="h-28 rounded-xl bg-cover bg-center border border-gray-200 dark:border-repae-gray-600"
              :style="{ backgroundImage: `url(${effectiveCoverSrc})` }"
            />
            <div class="absolute top-2 right-2 flex gap-2">
              <label
                class="p-2 rounded-lg bg-repae-blue-500 hover:bg-repae-blue-600 text-white transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-solid fa-pen" class="text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onCoverSelect"
                />
              </label>
              <button
                type="button"
                class="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                @click="removeCover"
              >
                <font-awesome-icon icon="fa-solid fa-trash" class="text-sm" />
              </button>
            </div>
          </div>

          <!-- Zone d'upload (pas de couverture) -->
          <label
            v-else
            class="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed border-gray-300 dark:border-repae-gray-600 hover:border-repae-blue-400 dark:hover:border-repae-blue-500 transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="text-2xl text-repae-gray-400 mb-2" />
            <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400 font-brand">
              Ajouter une photo de couverture
            </span>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="onCoverSelect"
            />
          </label>
        </div>
      </div>
    </div>

    <!-- Informations personnelles -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <font-awesome-icon icon="fa-solid fa-user" class="text-repae-blue-500" />
        Informations personnelles
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Prenom -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Prénom <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.prenom"
            type="text"
            required
            @blur="validateField('prenom')"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.prenom ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.prenom" class="text-red-500 text-xs mt-1">{{ errors.prenom }}</p>
        </div>

        <!-- Nom -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Nom <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.nom"
            type="text"
            required
            @blur="validateField('nom')"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.nom ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.nom" class="text-red-500 text-xs mt-1">{{ errors.nom }}</p>
        </div>

        <!-- Email (lecture seule — géré via le compte utilisateur) -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Email
          </label>
          <input
            :value="formData.email"
            type="email"
            disabled
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-gray-100 dark:bg-repae-gray-600 text-repae-gray-500 dark:text-repae-gray-400 cursor-not-allowed"
          />
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
            L'email est lié à votre compte et ne peut pas être modifié ici
          </p>
        </div>

        <!-- Telephone -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Téléphone <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.telephone"
            type="tel"
            required
            @blur="validateField('telephone')"
            placeholder="+225 XX XX XX XX XX"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.telephone ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.telephone" class="text-red-500 text-xs mt-1">{{ errors.telephone }}</p>
        </div>
      </div>
    </div>

    <!-- Informations professionnelles -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500" />
        Informations professionnelles
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Diplome -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Diplôme
          </label>
          <input
            v-model="formData.diplome"
            type="text"
            placeholder="Ex: Ingénieur en Informatique"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <!-- Poste actuel (lecture seule — dérivé des expériences) -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Poste actuel
          </label>
          <input
            :value="formData.poste_actuel"
            type="text"
            disabled
            placeholder="Aucun poste actuel"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-gray-100 dark:bg-repae-gray-600 text-repae-gray-500 dark:text-repae-gray-400 cursor-not-allowed"
          />
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
            Géré via vos expériences professionnelles
          </p>
        </div>

        <!-- Entreprise actuelle (lecture seule — dérivé des expériences) -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Entreprise actuelle
          </label>
          <input
            :value="formData.entreprise_actuelle"
            type="text"
            disabled
            placeholder="Aucune entreprise"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-gray-100 dark:bg-repae-gray-600 text-repae-gray-500 dark:text-repae-gray-400 cursor-not-allowed"
          />
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
            Géré via vos expériences professionnelles
          </p>
        </div>

        <!-- Disponibilite -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Disponibilité
          </label>
          <div class="flex flex-wrap gap-3">
            <label
              v-for="(config, key) in disponibiliteConfig"
              :key="key"
              class="relative cursor-pointer"
            >
              <input
                v-model="formData.disponibilite"
                type="radio"
                :value="key"
                class="peer sr-only"
              />
              <div
                class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all peer-checked:border-repae-blue-500 peer-checked:bg-repae-blue-50 dark:peer-checked:bg-repae-blue-500/10"
                :class="formData.disponibilite === key ? 'border-repae-blue-500' : 'border-gray-200 dark:border-repae-gray-600'"
              >
                <span class="w-2.5 h-2.5 rounded-full" :class="config.dotColor" />
                <span class="text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300">
                  {{ config.label }}
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Localisation -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-repae-blue-500" />
        Localisation
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Pays -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Pays
          </label>
          <select
            v-model="formData.countryId"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors cursor-pointer"
          >
            <option value="">-- Sélectionner un pays --</option>
            <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
        </div>

        <!-- Ville -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Ville
          </label>
          <input
            v-model="formData.ville"
            type="text"
            placeholder="Ex: Abidjan"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <!-- Adresse -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            Adresse
          </label>
          <input
            v-model="formData.adresse"
            type="text"
            placeholder="Ex: Cocody Riviera 3"
            class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>

    <!-- Biographie -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <font-awesome-icon icon="fa-solid fa-file-alt" class="text-repae-blue-500" />
        À propos de moi
      </h2>

      <div>
        <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
          Biographie
        </label>
        <textarea
          v-model="formData.biographie"
          rows="5"
          placeholder="Décrivez votre parcours, vos compétences et vos objectifs..."
          class="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors resize-none"
        />
        <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-1">
          {{ formData.biographie.length }} / 1000 caractères
        </p>
      </div>
    </div>

    <!-- Liens sociaux -->
    <div class="bg-white dark:bg-repae-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-repae-gray-700">
      <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2 mb-6">
        <font-awesome-icon icon="fa-solid fa-globe" class="text-repae-blue-500" />
        Liens & réseaux sociaux
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Site web -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            <font-awesome-icon icon="fa-solid fa-globe" class="mr-2 text-repae-gray-400" />
            Site web / portfolio
          </label>
          <input
            v-model="formData.site_web"
            type="url"
            placeholder="https://monsite.com"
            @blur="validateField('site_web')"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.site_web ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.site_web" class="text-red-500 text-xs mt-1">{{ errors.site_web }}</p>
        </div>

        <!-- LinkedIn -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            <font-awesome-icon icon="fa-brands fa-linkedin" class="mr-2 text-[#0A66C2]" />
            LinkedIn
          </label>
          <input
            v-model="formData.linkedin_url"
            type="url"
            placeholder="https://linkedin.com/in/votrenom"
            @blur="validateField('linkedin_url')"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.linkedin_url ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.linkedin_url" class="text-red-500 text-xs mt-1">{{ errors.linkedin_url }}</p>
        </div>

        <!-- GitHub -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            <font-awesome-icon icon="fa-brands fa-github" class="mr-2 text-repae-gray-700 dark:text-white" />
            GitHub
          </label>
          <input
            v-model="formData.github_url"
            type="url"
            placeholder="https://github.com/votrenom"
            @blur="validateField('github_url')"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.github_url ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.github_url" class="text-red-500 text-xs mt-1">{{ errors.github_url }}</p>
        </div>

        <!-- Twitter -->
        <div>
          <label class="block text-sm font-medium text-repae-gray-700 dark:text-repae-gray-300 mb-2">
            <font-awesome-icon icon="fa-brands fa-twitter" class="mr-2 text-[#1DA1F2]" />
            Twitter / X
          </label>
          <input
            v-model="formData.twitter_url"
            type="url"
            placeholder="https://twitter.com/votrenom"
            @blur="validateField('twitter_url')"
            :class="[
              'w-full px-4 py-2 rounded-lg border bg-white dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-colors',
              errors.twitter_url ? 'border-red-500' : 'border-gray-200 dark:border-repae-gray-600'
            ]"
          />
          <p v-if="errors.twitter_url" class="text-red-500 text-xs mt-1">{{ errors.twitter_url }}</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-end sticky bottom-0 bg-gray-50 dark:bg-repae-gray-900 py-4 -mx-6 px-6 border-t border-gray-200 dark:border-repae-gray-700">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-repae-gray-600 text-repae-gray-700 dark:text-repae-gray-300 font-medium font-brand hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-times" class="mr-2" />
        Annuler
      </button>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="px-6 py-2.5 rounded-lg bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        <font-awesome-icon
          :icon="isSubmitting ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
          :class="{ 'animate-spin': isSubmitting }"
        />
        {{ isSubmitting ? 'Enregistrement...' : 'Sauvegarder' }}
      </button>
    </div>
  </form>
</template>
