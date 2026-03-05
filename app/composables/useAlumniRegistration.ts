import type { PromotionItem, CountryItem } from '~/composables/useIdentityApi'

/**
 * Composable partagé pour la logique d'inscription alumni.
 * Utilisé par la page adhésion et le formulaire de la page d'accueil.
 */
export function useAlumniRegistration() {
  const { registerAlumni, fetchPromotions, fetchCountries } = useIdentityApi()
  const toast = useToast()

  // Promotions & Countries from API
  const promotions = ref<PromotionItem[]>([])
  const loadingPromotions = ref(true)
  const countries = ref<CountryItem[]>([])
  const loadingCountries = ref(true)

  // Form state
  const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    promotionId: '',
    countryId: '',
    degree: '',
    bio: '',
    acceptTerms: false,
  })

  const submitting = ref(false)
  const submitted = ref(false)

  // Charger les données de référence
  const loadReferenceData = async () => {
    const [promosResult, countriesResult] = await Promise.allSettled([
      fetchPromotions(),
      fetchCountries(),
    ])

    if (promosResult.status === 'fulfilled') {
      promotions.value = promosResult.value.data
    }
    if (countriesResult.status === 'fulfilled') {
      countries.value = countriesResult.value.data
    }

    loadingPromotions.value = false
    loadingCountries.value = false
  }

  // Formater un numéro en E.164 (Côte d'Ivoire par défaut : +225)
  const formatPhoneE164 = (raw: string): string | null => {
    const cleaned = raw.replace(/[\s\-\.()]/g, '')

    // Déjà en format international
    if (/^\+[1-9]\d{7,14}$/.test(cleaned)) {
      return cleaned
    }

    // Numéro local ivoirien (07/05/01 + 8 chiffres)
    if (/^0[1-9]\d{8}$/.test(cleaned)) {
      return '+225' + cleaned.slice(1)
    }

    // Numéro sans indicatif (juste les chiffres)
    if (/^[1-9]\d{8,9}$/.test(cleaned)) {
      return '+225' + cleaned
    }

    return null
  }

  // Soumission du formulaire
  const handleSubmit = async () => {
    // Validation frontend basique
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phoneNumber.trim() || !form.promotionId || !form.countryId) {
      toast.error('Champs requis', 'Veuillez remplir tous les champs obligatoires.')
      return
    }

    if (!form.acceptTerms) {
      toast.error('Conditions requises', 'Vous devez accepter les statuts et le règlement intérieur.')
      return
    }

    // Formater le numéro de téléphone en E.164
    const phone = formatPhoneE164(form.phoneNumber)
    if (!phone) {
      toast.error('Numéro invalide', 'Veuillez entrer un numéro de téléphone valide (ex: +225 07 00 00 00 00).')
      return
    }

    submitting.value = true
    try {
      await registerAlumni({
        email: form.email.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phoneNumber: phone,
        promotionId: form.promotionId,
        countryId: form.countryId,
        degree: form.degree || undefined,
      })
      submitted.value = true
      toast.success('Demande envoyée', 'Votre demande d\'adhésion a été soumise avec succès. Consultez votre boîte mail.')
    } catch (e: any) {
      const status = e?.response?.status || e?.statusCode
      if (status === 409) {
        toast.error('Email déjà utilisé', 'Un compte avec cette adresse email existe déjà.')
      } else if (status === 400) {
        const msg = e?.data?.message
        toast.error('Erreur de validation', Array.isArray(msg) ? msg.join(', ') : (msg || 'Veuillez vérifier les informations saisies.'))
      } else {
        toast.error('Erreur', 'Une erreur est survenue. Veuillez réessayer plus tard.')
      }
    } finally {
      submitting.value = false
    }
  }

  return {
    promotions,
    loadingPromotions,
    countries,
    loadingCountries,
    form,
    submitting,
    submitted,
    loadReferenceData,
    handleSubmit,
    formatPhoneE164,
  }
}
