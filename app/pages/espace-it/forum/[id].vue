<script setup lang="ts">
import { getQuestionById, getReponsesByQuestionId, categorieConfig } from '~/data/espace-it/forum'
import { currentUser } from '~/data/espace-it/current-user'

definePageMeta({
  layout: 'espace-it'
})

const route = useRoute()
const { success } = useToast()

// Get question by ID
const questionId = computed(() => route.params.id as string)
const question = computed(() => getQuestionById(questionId.value))
const reponses = computed(() => getReponsesByQuestionId(questionId.value))

// SEO
useSeoMeta({
  title: () => question.value ? `${question.value.titre} | Forum REPAE` : 'Question non trouvee'
})

// New response form
const newReponse = ref('')
const isSubmitting = ref(false)

const submitReponse = async () => {
  if (!newReponse.value.trim()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  success('Reponse envoyee', 'Votre reponse a ete publiee avec succes')
  newReponse.value = ''
  isSubmitting.value = false
}

// Format date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Format relative date
const formatRelativeDate = (dateStr: string): string => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return formatDate(dateStr)
}

// Parse markdown-like content (simple version)
const parseContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm font-brand">
      <NuxtLink
        to="/espace-it"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Tableau de bord
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <NuxtLink
        to="/espace-it/forum"
        class="text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 transition-colors"
      >
        Forum
      </NuxtLink>
      <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs text-repae-gray-400" />
      <span class="text-repae-gray-900 dark:text-white truncate max-w-xs">
        {{ question?.titre || 'Question' }}
      </span>
    </nav>

    <!-- 404 State -->
    <div
      v-if="!question"
      class="text-center py-16 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700"
    >
      <font-awesome-icon icon="fa-solid fa-circle-question" class="text-5xl text-repae-gray-300 dark:text-repae-gray-600 mb-4" />
      <h1 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-2">
        Question non trouvee
      </h1>
      <p class="text-repae-gray-500 dark:text-repae-gray-400 mb-6">
        Cette question n'existe pas ou a ete supprimee.
      </p>
      <NuxtLink
        to="/espace-it/forum"
        class="inline-flex items-center gap-2 px-4 py-2 bg-repae-blue-500 hover:bg-repae-blue-600 text-white font-medium font-brand rounded-lg transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Retour au forum
      </NuxtLink>
    </div>

    <template v-else>
      <!-- Question Card -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
        <!-- Question Header -->
        <div class="p-6 border-b border-gray-200 dark:border-repae-gray-700">
          <div class="flex items-start gap-4">
            <img
              :src="question.auteur.photo_url"
              :alt="`${question.auteur.prenom} ${question.auteur.nom}`"
              class="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold text-repae-gray-900 dark:text-white">
                  {{ question.auteur.prenom }} {{ question.auteur.nom }}
                </span>
                <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                  {{ question.auteur.poste }}
                </span>
              </div>
              <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
                {{ formatDate(question.date_creation) }}
              </span>
            </div>
            <span
              v-if="question.resolu"
              class="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium rounded-full flex items-center gap-1.5"
            >
              <font-awesome-icon icon="fa-solid fa-check-circle" />
              Resolu
            </span>
          </div>
        </div>

        <!-- Question Content -->
        <div class="p-6">
          <h1 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white mb-4">
            {{ question.titre }}
          </h1>

          <p class="text-repae-gray-700 dark:text-repae-gray-300 leading-relaxed mb-6">
            {{ question.contenu }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in question.tags"
              :key="tag"
              class="px-3 py-1 bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-400 text-sm rounded-lg"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Meta -->
          <div class="flex items-center gap-4 text-sm text-repae-gray-500 dark:text-repae-gray-400">
            <span
              :class="[categorieConfig[question.categorie].color, 'px-3 py-1 rounded-lg flex items-center gap-1.5']"
            >
              <font-awesome-icon :icon="categorieConfig[question.categorie].icon" class="text-xs" />
              {{ categorieConfig[question.categorie].label }}
            </span>
            <span class="flex items-center gap-1.5">
              <font-awesome-icon icon="fa-solid fa-eye" />
              {{ question.nombre_vues }} vues
            </span>
            <span class="flex items-center gap-1.5">
              <font-awesome-icon icon="fa-solid fa-reply" />
              {{ question.nombre_reponses }} reponses
            </span>
          </div>
        </div>
      </div>

      <!-- Responses Section -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-comments" class="text-repae-blue-500" />
          {{ reponses.length }} Reponse{{ reponses.length > 1 ? 's' : '' }}
        </h2>

        <!-- Response Cards -->
        <div
          v-for="reponse in reponses"
          :key="reponse.id"
          :class="[
            'bg-white dark:bg-repae-gray-800 rounded-xl border overflow-hidden',
            reponse.is_solution
              ? 'border-green-300 dark:border-green-500/50 ring-1 ring-green-200 dark:ring-green-500/20'
              : 'border-gray-200 dark:border-repae-gray-700'
          ]"
        >
          <!-- Solution Badge -->
          <div
            v-if="reponse.is_solution"
            class="px-4 py-2 bg-green-50 dark:bg-green-500/10 border-b border-green-200 dark:border-green-500/30 flex items-center gap-2 text-green-700 dark:text-green-400"
          >
            <font-awesome-icon icon="fa-solid fa-check-circle" />
            <span class="text-sm font-medium">Meilleure reponse</span>
          </div>

          <div class="p-5">
            <!-- Author -->
            <div class="flex items-start gap-4 mb-4">
              <img
                :src="reponse.auteur.photo_url"
                :alt="`${reponse.auteur.prenom} ${reponse.auteur.nom}`"
                class="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-repae-gray-900 dark:text-white">
                    {{ reponse.auteur.prenom }} {{ reponse.auteur.nom }}
                  </span>
                  <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                    {{ reponse.auteur.poste }}
                  </span>
                </div>
                <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
                  {{ formatRelativeDate(reponse.date_creation) }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div
              class="text-repae-gray-700 dark:text-repae-gray-300 leading-relaxed mb-4 prose-sm"
              v-html="parseContent(reponse.contenu)"
            />

            <!-- Actions -->
            <div class="flex items-center gap-4">
              <button class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors cursor-pointer">
                <font-awesome-icon icon="fa-solid fa-heart" />
                <span>{{ reponse.likes }}</span>
              </button>
              <button class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors cursor-pointer">
                <font-awesome-icon icon="fa-solid fa-reply" />
                <span>Repondre</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty Responses -->
        <div
          v-if="reponses.length === 0"
          class="text-center py-12 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700"
        >
          <font-awesome-icon icon="fa-solid fa-comments" class="text-4xl text-repae-gray-300 dark:text-repae-gray-600 mb-3" />
          <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
            Aucune reponse pour le moment. Soyez le premier a repondre !
          </p>
        </div>
      </div>

      <!-- Add Response Form -->
      <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
        <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-pen" class="text-repae-blue-500" />
          Votre reponse
        </h3>

        <div class="flex items-start gap-4">
          <img
            :src="currentUser.photo_url"
            :alt="`${currentUser.prenom} ${currentUser.nom}`"
            class="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div class="flex-1">
            <textarea
              v-model="newReponse"
              rows="4"
              placeholder="Partagez votre experience ou vos conseils..."
              class="w-full px-4 py-3 border border-gray-200 dark:border-repae-gray-700 rounded-xl bg-white dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 resize-none"
            />
            <div class="flex items-center justify-between mt-3">
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Utilisez **texte** pour mettre en gras
              </p>
              <button
                :disabled="!newReponse.trim() || isSubmitting"
                :class="[
                  'px-5 py-2 font-medium font-brand rounded-lg transition-colors cursor-pointer flex items-center gap-2',
                  newReponse.trim() && !isSubmitting
                    ? 'bg-repae-blue-500 hover:bg-repae-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-repae-gray-700 text-repae-gray-400 cursor-not-allowed'
                ]"
                @click="submitReponse"
              >
                <font-awesome-icon
                  :icon="isSubmitting ? 'fa-solid fa-spinner' : 'fa-solid fa-paper-plane'"
                  :class="{ 'animate-spin': isSubmitting }"
                />
                {{ isSubmitting ? 'Envoi...' : 'Publier' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
