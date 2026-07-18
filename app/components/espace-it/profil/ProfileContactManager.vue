<script setup lang="ts">
import type { UserProfile } from '@/data/espace-it/user-profile'
import type { CountryItem } from '@/composables/useIdentityApi'

const props = defineProps<{
  profile: UserProfile
}>()

const emit = defineEmits<{
  saved: []
}>()

const { fetchMyAlumni, updateMyAlumni, fetchCountries } = useIdentityApi()
const toast = useToast()

const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

const countriesList = ref<{ id: string; name: string }[]>([])

const form = reactive({
  telephone: '',
  countryId: '',
  ville: '',
  adresse: '',
  site_web: '',
})

// Email en lecture seule : géré par le compte utilisateur, pas par le profil alumni
const email = ref('')

const loadData = async () => {
  isLoading.value = true
  errorMessage.value = null

  try {
    const [alumni, countriesResult] = await Promise.all([
      fetchMyAlumni(),
      fetchCountries({ limit: 200 }).catch(() => ({ data: [] as CountryItem[] })),
    ])

    countriesList.value = countriesResult.data.map((c) => ({ id: c.id, name: c.name }))

    email.value = alumni.email || props.profile.email || ''
    form.telephone = alumni.phoneNumber || ''
    form.ville = alumni.city || ''
    form.adresse = alumni.address || ''
    form.site_web = alumni.portfolioUrl || ''

    if (alumni.country) {
      form.countryId = countriesList.value.find((c) => c.name === alumni.country)?.id || ''
    }
  } catch (e: any) {
    console.error('Erreur chargement des coordonnées:', e)
    errorMessage.value = e?.data?.message || 'Impossible de charger vos coordonnées.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadData)

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = null

  try {
    await updateMyAlumni({
      phoneNumber: form.telephone || undefined,
      city: form.ville || undefined,
      address: form.adresse || undefined,
      portfolioUrl: form.site_web || undefined,
      countryId: form.countryId || undefined,
    })

    toast.success('Coordonnées mises à jour')
    emit('saved')
  } catch (e: any) {
    console.error('Erreur sauvegarde des coordonnées:', e)
    const msg = e?.data?.message
    errorMessage.value = Array.isArray(msg) ? msg[0] : (msg || 'Erreur lors de la sauvegarde.')
    toast.error(errorMessage.value)
  } finally {
    isSubmitting.value = false
  }
}

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-white dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white font-brand text-sm focus:outline-none focus:ring-2 focus:ring-repae-blue-500 focus:border-transparent transition-all'
const labelClass =
  'block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-1.5'
</script>

<template>
  <div>
    <!-- Chargement -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin text-2xl text-repae-blue-500 mb-3" />
      <span class="text-repae-gray-500 dark:text-repae-gray-400 font-brand text-sm">
        Chargement des coordonnées...
      </span>
    </div>

    <form v-else class="space-y-5" @submit.prevent="handleSubmit">
      <!-- Message d'erreur -->
      <div
        v-if="errorMessage"
        class="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 flex items-center gap-3"
      >
        <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-red-500" />
        <p class="text-red-700 dark:text-red-400 font-brand text-sm">{{ errorMessage }}</p>
      </div>

      <!-- Email (lecture seule) -->
      <div>
        <label for="contact-email" :class="labelClass">Adresse email</label>
        <input
          id="contact-email"
          :value="email"
          type="email"
          disabled
          :class="inputClass"
          class="opacity-60 cursor-not-allowed"
        >
        <p class="mt-1 text-xs text-repae-gray-500 dark:text-repae-gray-400 font-brand">
          L'email est lié à votre compte et ne peut pas être modifié ici.
        </p>
      </div>

      <!-- Téléphone -->
      <div>
        <label for="contact-telephone" :class="labelClass">Téléphone</label>
        <input
          id="contact-telephone"
          v-model="form.telephone"
          type="tel"
          placeholder="+225 07 00 00 00 00"
          :class="inputClass"
        >
      </div>

      <!-- Pays / Ville -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="contact-pays" :class="labelClass">Pays</label>
          <select id="contact-pays" v-model="form.countryId" :class="inputClass" class="cursor-pointer">
            <option value="">Sélectionner un pays</option>
            <option v-for="country in countriesList" :key="country.id" :value="country.id">
              {{ country.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="contact-ville" :class="labelClass">Ville</label>
          <input
            id="contact-ville"
            v-model="form.ville"
            type="text"
            placeholder="Abidjan"
            :class="inputClass"
          >
        </div>
      </div>

      <!-- Adresse -->
      <div>
        <label for="contact-adresse" :class="labelClass">Adresse</label>
        <input
          id="contact-adresse"
          v-model="form.adresse"
          type="text"
          placeholder="Cocody, Riviera 3"
          :class="inputClass"
        >
      </div>

      <!-- Site web -->
      <div>
        <label for="contact-site-web" :class="labelClass">Site web / Portfolio</label>
        <input
          id="contact-site-web"
          v-model="form.site_web"
          type="url"
          placeholder="https://mon-portfolio.ci"
          :class="inputClass"
        >
      </div>

      <!-- Actions -->
      <div class="flex justify-end pt-2">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-5 py-2.5 bg-repae-blue-500 hover:bg-repae-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-brand text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
        >
          <font-awesome-icon
            :icon="isSubmitting ? 'fa-solid fa-spinner' : 'fa-solid fa-check'"
            :class="{ 'animate-spin': isSubmitting }"
          />
          {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
      </div>
    </form>
  </div>
</template>
