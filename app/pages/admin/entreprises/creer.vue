<script setup lang="ts">
import type { ImageVariants } from '~/types/image'
import { secteursActivite, entreprisesMock } from '~/data/admin/entreprises'

definePageMeta({
  layout: 'admin',
})

const router = useRouter()
const toast = useToast()

// State
const loading = ref(false)

const form = reactive({
  nom: '',
  description: '',
  secteur_activite: '',
  taille: '' as '' | 'startup' | 'pme' | 'grande_entreprise',
  email_contact: '',
  telephone: '',
  site_web: '',
  adresse: '',
  ville: '',
  pays: 'Cote d\'Ivoire',
  verifie: false,
})

const verificationOptions = [
  { value: false, label: 'Non verifiee', icon: 'fa-solid fa-clock', class: 'border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' },
  { value: true, label: 'Verifiee', icon: 'fa-solid fa-check-circle', class: 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' },
] as const

// Image state
const rawImageFile = ref<File | null>(null)
const showEditor = ref(false)
const logoFile = ref<File | null>(null)
const logoPreview = ref<string | null>(null)

// Image handling
const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    rawImageFile.value = file
    showEditor.value = true
  }
  target.value = ''
}

const onEditorSave = (variants: ImageVariants) => {
  const file = new File([variants.high], 'logo-high.jpg', { type: variants.high.type })
  logoFile.value = file

  if (logoPreview.value) URL.revokeObjectURL(logoPreview.value)
  logoPreview.value = URL.createObjectURL(variants.high)

  showEditor.value = false
  rawImageFile.value = null
}

const onEditorCancel = () => {
  showEditor.value = false
  rawImageFile.value = null
}

const removeImage = () => {
  logoFile.value = null
  if (logoPreview.value) {
    URL.revokeObjectURL(logoPreview.value)
    logoPreview.value = null
  }
}

// Submit
const submit = async () => {
  if (!form.nom.trim()) {
    toast.warning('Champ requis', 'Le nom de l\'entreprise est obligatoire.')
    return
  }
  if (!form.secteur_activite) {
    toast.warning('Champ requis', 'Le secteur d\'activite est obligatoire.')
    return
  }
  if (!form.taille) {
    toast.warning('Champ requis', 'La taille de l\'entreprise est obligatoire.')
    return
  }
  if (!form.email_contact.trim()) {
    toast.warning('Champ requis', 'L\'email de contact est obligatoire.')
    return
  }

  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    entreprisesMock.push({
      id: `ent-${Date.now()}`,
      nom: form.nom,
      logo_url: logoPreview.value || '',
      secteur_activite: form.secteur_activite,
      taille: form.taille as 'startup' | 'pme' | 'grande_entreprise',
      description: form.description,
      site_web: form.site_web,
      telephone: form.telephone,
      email_contact: form.email_contact,
      adresse: form.adresse,
      ville: form.ville,
      pays: form.pays,
      verifie: form.verifie,
      points_fidelite: 0,
      badge_recruteur: 'bronze',
      date_creation: new Date().toISOString().split('T')[0],
    })
    toast.success('Entreprise creee', 'L\'entreprise a ete creee avec succes.')
    router.push('/admin/entreprises')
  } catch {
    toast.error('Erreur', 'Impossible de creer l\'entreprise.')
  } finally {
    loading.value = false
  }
}

// Cleanup
onUnmounted(() => {
  if (logoPreview.value) URL.revokeObjectURL(logoPreview.value)
})
</script>

<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink
        to="/admin/entreprises"
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
      </NuxtLink>
      <div>
        <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
          Nouvelle entreprise
        </h2>
        <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
          Ajoutez une nouvelle entreprise partenaire
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submit" class="space-y-6">
      <!-- Nom -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Nom de l'entreprise *
        </label>
        <input
          v-model="form.nom"
          type="text"
          placeholder="Nom de l'entreprise"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Secteur + Taille -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Secteur d'activite *
          </label>
          <select
            v-model="form.secteur_activite"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer transition-all"
          >
            <option value="" disabled>Selectionner un secteur</option>
            <option v-for="secteur in secteursActivite" :key="secteur" :value="secteur">
              {{ secteur }}
            </option>
          </select>
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Taille *
          </label>
          <select
            v-model="form.taille"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 cursor-pointer transition-all"
          >
            <option value="" disabled>Selectionner la taille</option>
            <option value="startup">Startup</option>
            <option value="pme">PME</option>
            <option value="grande_entreprise">Grande entreprise</option>
          </select>
        </div>
      </div>

      <!-- Logo -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Logo
        </label>

        <!-- Image Editor -->
        <ClientOnly>
          <ImageEditor
            v-if="showEditor && rawImageFile"
            :image-file="rawImageFile"
            :aspect-ratio="1 / 1"
            @save="onEditorSave"
            @cancel="onEditorCancel"
          />
        </ClientOnly>

        <!-- Preview -->
        <div v-if="!showEditor && logoPreview" class="relative inline-block">
          <img
            :src="logoPreview"
            alt="Logo"
            class="w-32 h-32 object-cover rounded-2xl"
          />
          <div class="absolute top-2 right-2 flex gap-2">
            <label
              class="p-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white transition-colors cursor-pointer"
            >
              <font-awesome-icon icon="fa-solid fa-pen" class="text-sm" />
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onFileSelect"
              />
            </label>
            <button
              type="button"
              class="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
              @click="removeImage"
            >
              <font-awesome-icon icon="fa-solid fa-trash" class="text-sm" />
            </button>
          </div>
        </div>

        <!-- Upload zone -->
        <label
          v-if="!showEditor && !logoPreview"
          class="flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 dark:border-repae-gray-600 hover:border-violet-400 dark:hover:border-violet-500 transition-colors cursor-pointer"
        >
          <font-awesome-icon icon="fa-solid fa-cloud-upload-alt" class="text-2xl text-repae-gray-400 mb-2" />
          <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400 text-center px-2">
            Ajouter un logo
          </span>
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileSelect"
          />
        </label>
      </div>

      <!-- Description -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Description
        </label>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Description de l'entreprise"
          maxlength="1000"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 resize-none transition-all"
        />
        <p class="text-xs text-repae-gray-400 mt-1 text-right">
          {{ form.description.length }}/1000
        </p>
      </div>

      <!-- Contact: Email + Telephone -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Email de contact *
          </label>
          <input
            v-model="form.email_contact"
            type="email"
            placeholder="contact@entreprise.ci"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Telephone
          </label>
          <input
            v-model="form.telephone"
            type="tel"
            placeholder="+225 XX XX XX XX XX"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      <!-- Site web -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
          Site web
        </label>
        <input
          v-model="form.site_web"
          type="url"
          placeholder="https://entreprise.ci"
          class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
        />
      </div>

      <!-- Localisation: Adresse + Ville + Pays -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Adresse
          </label>
          <input
            v-model="form.adresse"
            type="text"
            placeholder="Adresse de l'entreprise"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Ville
          </label>
          <input
            v-model="form.ville"
            type="text"
            placeholder="Ville"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>

        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
            Pays
          </label>
          <input
            v-model="form.pays"
            type="text"
            placeholder="Pays"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 text-repae-gray-900 dark:text-white placeholder:text-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      <!-- Statut + Actions -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
          Statut de verification
        </label>
        <div class="flex gap-3 mb-6">
          <button
            v-for="opt in verificationOptions"
            :key="String(opt.value)"
            type="button"
            :class="[
              'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold font-brand text-sm transition-all cursor-pointer',
              form.verifie === opt.value
                ? opt.class
                : 'border-gray-200 dark:border-repae-gray-700 text-repae-gray-500 dark:text-repae-gray-400 hover:border-gray-300 dark:hover:border-repae-gray-600'
            ]"
            @click="form.verifie = opt.value"
          >
            <font-awesome-icon :icon="opt.icon" />
            {{ opt.label }}
          </button>
        </div>

        <div class="flex items-center justify-end gap-3">
          <NuxtLink
            to="/admin/entreprises"
            class="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-700 text-sm font-semibold font-brand text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          >
            Annuler
          </NuxtLink>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
          >
            <font-awesome-icon
              :icon="loading ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
              :class="{ 'animate-spin': loading }"
            />
            {{ loading ? 'Creation...' : 'Creer l\'entreprise' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
