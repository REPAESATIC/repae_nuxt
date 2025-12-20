<script setup>
import { socialLinks } from '@/data/footer'

useHead({
  title: 'Contact - REPAE',
  meta: [
    { name: 'description', content: 'Contactez le Réseau Professionnel des Alumni de l\'ESATIC. Nous sommes à votre écoute pour toute question ou demande de partenariat.' }
  ]
})

// Données du formulaire
const form = reactive({
  nom: '',
  email: '',
  sujet: '',
  message: ''
})

const sujets = [
  { value: 'information', label: 'Demande d\'information' },
  { value: 'adhesion', label: 'Adhésion au réseau' },
  { value: 'partenariat', label: 'Proposition de partenariat' },
  { value: 'emploi', label: 'Offre d\'emploi / Stage' },
  { value: 'probleme', label: 'Signaler un problème' },
  { value: 'autre', label: 'Autre' }
]

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulation d'envoi
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  isSubmitted.value = true
  // Reset form
  form.nom = ''
  form.email = ''
  form.sujet = ''
  form.message = ''
}

// Informations de contact
const contactInfos = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: 'contact@repae.org',
    href: 'mailto:contact@repae.org'
  },
  {
    icon: 'fa-solid fa-phone',
    label: 'Téléphone',
    value: '+225 05-45-29-28-02',
    href: 'tel:+2250545292802'
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Adresse',
    value: '01 Bp V 03 Abidjan 01, Côte d\'Ivoire',
    href: null
  }
]

// FAQ
const faqs = [
  {
    question: 'Comment devenir membre du REPAE ?',
    answer: 'Pour rejoindre le REPAE, vous devez être un ancien étudiant de l\'ESATIC. Rendez-vous sur notre page d\'adhésion pour soumettre votre demande.'
  },
  {
    question: 'Le REPAE est-il ouvert aux entreprises ?',
    answer: 'Oui ! Les entreprises peuvent créer un compte sur notre espace dédié pour publier des offres d\'emploi et consulter les profils de nos alumni.'
  },
  {
    question: 'Comment proposer un partenariat ?',
    answer: 'Utilisez le formulaire de contact ci-dessus en sélectionnant "Proposition de partenariat" comme sujet. Notre équipe vous répondra dans les plus brefs délais.'
  }
]

const openFaqIndex = ref(null)
const isJoinModalOpen = ref(false)

const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-repae-gray-900">
    <AppNavbar />

    <!-- Hero Section -->
    <section class="relative pt-24 pb-16 bg-gradient-to-br from-repae-blue-600 via-repae-blue-500 to-repae-blue-700 overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-repae-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-brand mb-4">
          Nous contacter
        </h1>
        <p class="text-lg md:text-xl text-white/90 font-brand max-w-2xl mx-auto">
          Une question, une suggestion ou une proposition de partenariat ?
          Notre équipe est à votre écoute.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <!-- Contact Form -->
          <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl p-8">
            <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6">
              Envoyez-nous un message
            </h2>

            <!-- Success Message -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isSubmitted"
                class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                    <font-awesome-icon icon="fa-solid fa-check" class="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p class="font-semibold font-brand text-green-800 dark:text-green-300">
                      Message envoyé avec succès !
                    </p>
                    <p class="text-sm font-brand text-green-600 dark:text-green-400">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              </div>
            </Transition>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Nom -->
              <div>
                <label for="nom" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Nom complet <span class="text-red-500">*</span>
                </label>
                <input
                  id="nom"
                  v-model="form.nom"
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 font-brand focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 transition-all"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Adresse email <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="jean.dupont@email.com"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 font-brand focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 transition-all"
                />
              </div>

              <!-- Sujet -->
              <div>
                <label for="sujet" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Sujet <span class="text-red-500">*</span>
                </label>
                <select
                  id="sujet"
                  v-model="form.sujet"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white font-brand focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 transition-all cursor-pointer"
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option v-for="sujet in sujets" :key="sujet.value" :value="sujet.value">
                    {{ sujet.label }}
                  </option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium font-brand text-repae-gray-700 dark:text-repae-gray-300 mb-2">
                  Message <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Décrivez votre demande..."
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-repae-gray-600 bg-gray-50 dark:bg-repae-gray-700 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 font-brand focus:ring-2 focus:ring-repae-blue-500/50 focus:border-repae-blue-500 transition-all resize-none"
                />
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-6 py-4 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 hover:from-repae-blue-600 hover:to-repae-blue-700 text-white font-semibold font-brand rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-repae-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                <font-awesome-icon
                  v-if="isSubmitting"
                  icon="fa-solid fa-spinner"
                  class="animate-spin"
                />
                <font-awesome-icon
                  v-else
                  icon="fa-solid fa-paper-plane"
                />
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <!-- Contact Cards -->
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl p-8">
              <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6">
                Nos coordonnées
              </h2>

              <div class="space-y-6">
                <a
                  v-for="info in contactInfos"
                  :key="info.label"
                  :href="info.href"
                  :class="[
                    'flex items-start gap-4 p-4 rounded-xl transition-all duration-300',
                    info.href
                      ? 'hover:bg-repae-blue-50 dark:hover:bg-repae-gray-700 cursor-pointer'
                      : 'cursor-default'
                  ]"
                >
                  <div class="w-12 h-12 rounded-xl bg-repae-blue-500/10 dark:bg-repae-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <font-awesome-icon :icon="info.icon" class="text-xl text-repae-blue-500" />
                  </div>
                  <div>
                    <p class="text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400">
                      {{ info.label }}
                    </p>
                    <p class="font-semibold font-brand text-repae-gray-900 dark:text-white">
                      {{ info.value }}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="bg-white dark:bg-repae-gray-800 rounded-2xl shadow-xl p-8">
              <h2 class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white mb-6">
                Suivez-nous
              </h2>
              <p class="text-repae-gray-600 dark:text-repae-gray-300 font-brand mb-6">
                Restez connecté avec le REPAE sur nos réseaux sociaux pour ne rien manquer de nos actualités.
              </p>
              <div class="flex gap-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.label"
                  :href="social.url"
                  :title="social.label"
                  class="w-12 h-12 rounded-xl bg-repae-blue-500/10 dark:bg-repae-blue-500/20 hover:bg-repae-blue-500 flex items-center justify-center transition-all duration-300 group"
                >
                  <font-awesome-icon
                    :icon="social.icon"
                    class="text-xl text-repae-blue-500 group-hover:text-white transition-colors"
                  />
                </a>
              </div>
            </div>

            <!-- Horaires -->
            <div class="bg-gradient-to-br from-repae-blue-500 to-repae-blue-600 rounded-2xl shadow-xl p-8 text-white">
              <div class="flex items-center gap-3 mb-4">
                <font-awesome-icon icon="fa-solid fa-clock" class="text-2xl" />
                <h2 class="text-2xl font-bold font-brand">
                  Horaires de réponse
                </h2>
              </div>
              <p class="font-brand mb-4 text-white/90">
                Notre équipe s'efforce de répondre à toutes les demandes dans un délai de 48 heures ouvrées.
              </p>
              <div class="flex items-center gap-2 text-sm font-brand">
                <font-awesome-icon icon="fa-solid fa-info-circle" />
                <span>Lundi - Vendredi : 9h00 - 18h00 (GMT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white dark:bg-repae-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <UiSectionTitle
          titre="Questions fréquentes"
          description="Retrouvez les réponses aux questions les plus courantes"
        />

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-gray-50 dark:bg-repae-gray-700 rounded-xl overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-repae-gray-600 transition-colors"
            >
              <span class="font-semibold font-brand text-repae-gray-900 dark:text-white">
                {{ faq.question }}
              </span>
              <font-awesome-icon
                icon="fa-solid fa-chevron-down"
                :class="[
                  'text-repae-blue-500 transition-transform duration-300',
                  openFaqIndex === index ? 'rotate-180' : ''
                ]"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaqIndex === index" class="overflow-hidden">
                <p class="px-6 pb-4 text-repae-gray-600 dark:text-repae-gray-300 font-brand">
                  {{ faq.answer }}
                </p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- CTA Adhesion -->
        <div class="mt-12 text-center">
          <p class="text-repae-gray-600 dark:text-repae-gray-300 font-brand mb-4">
            Vous souhaitez rejoindre notre réseau ?
          </p>
          <button
            @click="isJoinModalOpen = true"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 hover:from-repae-blue-600 hover:to-repae-blue-700 text-white font-semibold font-brand rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-repae-blue-500/25 cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-user-plus" />
            Rejoindre le REPAE
          </button>
        </div>
      </div>
    </section>

    <AppFooter />

    <!-- Join Modal -->
    <UiJoinModal
      :is-open="isJoinModalOpen"
      @close="isJoinModalOpen = false"
    />
  </div>
</template>
