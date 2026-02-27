<script setup lang="ts">
import type { CurrentEntreprise } from '~/data/admin/entreprises'
import type { ImageVariants } from '~/types/image'
import { findEntrepriseById, secteursActivite, entreprisesMock } from '~/data/admin/entreprises'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const entrepriseId = route.params.id as string

// State
const loading = ref(true)
const saving = ref(false)
const original = ref<CurrentEntreprise | null>(null)

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
  pays: '',
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
const existingLogo = ref<string | null>(null)

const currentLogo = computed(() => logoPreview.value || existingLogo.value)

// Verify action
const verifying = ref(false)

// Helpers
const verifiedConfig: Record<string, { label: string; class: string }> = {
  true: { label: 'Verifiee', class: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400' },
  false: { label: 'Non verifiee', class: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' },
}

const tailleConfig: Record<string, { label: string; class: string }> = {
  startup: { label: 'Startup', class: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400' },
  pme: { label: 'PME', class: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' },
  grande_entreprise: { label: 'Grande entreprise', class: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400' },
}

const badgeConfig: Record<string, { label: string; icon: string; class: string }> = {
  bronze: { label: 'Bronze', icon: 'fa-solid fa-medal', class: 'text-amber-600 dark:text-amber-400' },
  silver: { label: 'Silver', icon: 'fa-solid fa-medal', class: 'text-gray-500 dark:text-gray-300' },
  gold: { label: 'Gold', icon: 'fa-solid fa-crown', class: 'text-yellow-500 dark:text-yellow-400' },
  platinum: { label: 'Platinum', icon: 'fa-solid fa-gem', class: 'text-purple-500 dark:text-purple-400' },
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Load data
onMounted(async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    const data = findEntrepriseById(entrepriseId)
    if (!data) {
      toast.error('Erreur', 'Entreprise non trouvee.')
      router.push('/admin/entreprises')
      return
    }

    original.value = { ...data }
    form.nom = data.nom
    form.description = data.description
    form.secteur_activite = data.secteur_activite
    form.taille = data.taille
    form.email_contact = data.email_contact
    form.telephone = data.telephone
    form.site_web = data.site_web
    form.adresse = data.adresse
    form.ville = data.ville
    form.pays = data.pays
    form.verifie = data.verifie

    if (data.logo_url) existingLogo.value = data.logo_url
  } catch {
    toast.error('Erreur', 'Impossible de charger l\'entreprise.')
    router.push('/admin/entreprises')
  } finally {
    loading.value = false
  }
})

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
  existingLogo.value = null
}

// Verify action
const handleVerify = async () => {
  if (!original.value) return
  verifying.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    const found = entreprisesMock.find(e => e.id === entrepriseId)
    if (found) {
      found.verifie = !found.verifie
      original.value = { ...found }
      form.verifie = found.verifie
    }
    toast.success(
      found?.verifie ? 'Entreprise verifiee' : 'Verification retiree',
      `${original.value.nom} a ete ${found?.verifie ? 'verifiee' : 'deverifiee'}.`,
    )
  } catch {
    toast.error('Erreur', 'Impossible de modifier le statut de verification.')
  } finally {
    verifying.value = false
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

  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    const found = entreprisesMock.find(e => e.id === entrepriseId)
    if (found) {
      Object.assign(found, {
        nom: form.nom,
        description: form.description,
        secteur_activite: form.secteur_activite,
        taille: form.taille,
        email_contact: form.email_contact,
        telephone: form.telephone,
        site_web: form.site_web,
        adresse: form.adresse,
        ville: form.ville,
        pays: form.pays,
        verifie: form.verifie,
      })
      if (logoPreview.value) found.logo_url = logoPreview.value
      else if (!existingLogo.value) found.logo_url = ''
    }
    toast.success('Entreprise mise a jour', 'Les modifications ont ete enregistrees.')
    router.push('/admin/entreprises')
  } catch {
    toast.error('Erreur', 'Impossible de mettre a jour l\'entreprise.')
  } finally {
    saving.value = false
  }
}

// Cleanup
onUnmounted(() => {
  if (logoPreview.value) URL.revokeObjectURL(logoPreview.value)
})
</script>

<template>
  <div class="max-w-4xl">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <template v-else-if="original">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/admin/entreprises"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-repae-gray-800 transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-repae-gray-500 dark:text-repae-gray-400" />
          </NuxtLink>
          <div>
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
                {{ original.nom }}
              </h2>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                  verifiedConfig[String(original.verifie)]?.class || ''
                ]"
              >
                {{ verifiedConfig[String(original.verifie)]?.label }}
              </span>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                  tailleConfig[original.taille]?.class || ''
                ]"
              >
                {{ tailleConfig[original.taille]?.label }}
              </span>
            </div>
            <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 mt-0.5">
              Modifier les informations de l'entreprise
            </p>
          </div>
        </div>

        <!-- Verify button -->
        <button
          :disabled="verifying"
          :class="[
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold font-brand text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0',
            original.verifie
              ? 'bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-500/25'
              : 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/25'
          ]"
          @click="handleVerify"
        >
          <font-awesome-icon
            :icon="verifying ? 'fa-solid fa-spinner' : (original.verifie ? 'fa-solid fa-times-circle' : 'fa-solid fa-check-circle')"
            :class="{ 'animate-spin': verifying }"
          />
          {{ original.verifie ? 'Deverifier' : 'Verifier' }}
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="space-y-6">
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

          <!-- Preview (existing or new) -->
          <div v-if="!showEditor && currentLogo" class="relative inline-block">
            <img
              :src="currentLogo"
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
            v-if="!showEditor && !currentLogo"
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

        <!-- Metadata (read-only) -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <label class="block text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Informations
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900">
              <font-awesome-icon icon="fa-solid fa-calendar-alt" class="text-repae-gray-400" />
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Date de creation</p>
                <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ formatDate(original.date_creation) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900">
              <font-awesome-icon icon="fa-solid fa-coins" class="text-yellow-500" />
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Points fidelite</p>
                <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ original.points_fidelite }} pts
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-repae-gray-900">
              <font-awesome-icon
                :icon="badgeConfig[original.badge_recruteur]?.icon || 'fa-solid fa-medal'"
                :class="badgeConfig[original.badge_recruteur]?.class || ''"
              />
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Badge recruteur</p>
                <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white">
                  {{ badgeConfig[original.badge_recruteur]?.label || original.badge_recruteur }}
                </p>
              </div>
            </div>
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
              :disabled="saving"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
            >
              <font-awesome-icon
                :icon="saving ? 'fa-solid fa-spinner' : 'fa-solid fa-save'"
                :class="{ 'animate-spin': saving }"
              />
              {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>
