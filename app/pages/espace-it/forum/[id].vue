<script setup lang="ts">
import { getQuestionById, getNestedReplies, categorieConfig, forumReponses } from '~/data/espace-it/forum'
import { currentUser } from '~/data/espace-it/current-user'

definePageMeta({
  layout: 'espace-it'
})

const route = useRoute()
const { success } = useToast()

// Get question by ID
const questionId = computed(() => route.params.id as string)
const question = computed(() => getQuestionById(questionId.value))
const nestedReponses = computed(() => getNestedReplies(questionId.value))

// Count total responses (including nested)
const totalReponses = computed(() => {
  return forumReponses.filter(r => r.question_id === questionId.value).length
})

// SEO
useSeoMeta({
  title: () => question.value ? `${question.value.titre} | Forum REPAE` : 'Question non trouvee'
})

// New response form
const newReponse = ref('')
const isSubmitting = ref(false)
const replyingTo = ref<{ id: string; name: string } | null>(null)

// Handle reply to specific response
const handleReplyTo = (parentId: string, authorName: string) => {
  replyingTo.value = { id: parentId, name: authorName }
  // Scroll to form
  nextTick(() => {
    const form = document.getElementById('reply-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

const cancelReply = () => {
  replyingTo.value = null
}

const submitReponse = async () => {
  if (!newReponse.value.trim()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const message = replyingTo.value
    ? `Reponse a ${replyingTo.value.name} envoyee`
    : 'Reponse envoyee'
  success(message, 'Votre reponse a ete publiee avec succes')
  newReponse.value = ''
  replyingTo.value = null
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
</script>

<template>
  <div class="space-y-6">
    <!-- Sticky Header -->
    <div
      v-if="question"
      class="sticky top-0 z-40 -mx-6 px-6 py-3 bg-white/95 dark:bg-repae-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-repae-gray-700 shadow-sm"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <NuxtLink
            to="/espace-it/forum"
            class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-repae-gray-800 flex items-center justify-center text-repae-gray-500 hover:text-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 transition-colors"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-sm" />
          </NuxtLink>
          <div class="min-w-0">
            <h1 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate">
              {{ question.titre }}
            </h1>
            <div class="flex items-center gap-2 text-xs text-repae-gray-500 dark:text-repae-gray-400">
              <span>{{ question.auteur.prenom }} {{ question.auteur.nom }}</span>
              <span>·</span>
              <span>{{ totalReponses }} reponse(s)</span>
            </div>
          </div>
        </div>
        <span
          v-if="question.resolu"
          class="flex-shrink-0 px-2.5 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1"
        >
          <font-awesome-icon icon="fa-solid fa-check" class="text-[10px]" />
          Resolu
        </span>
      </div>
    </div>

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
              {{ totalReponses }} reponses
            </span>
          </div>
        </div>
      </div>

      <!-- Responses Section -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-comments" class="text-repae-blue-500" />
          {{ totalReponses }} Reponse{{ totalReponses > 1 ? 's' : '' }}
        </h2>

        <!-- Threaded Response Cards -->
        <div class="space-y-4">
          <EspaceItForumReplyThread
            v-for="reponse in nestedReponses"
            :key="reponse.id"
            :reply="reponse"
            :depth="0"
            @reply="handleReplyTo"
          />
        </div>

        <!-- Empty Responses -->
        <div
          v-if="nestedReponses.length === 0"
          class="text-center py-12 bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700"
        >
          <font-awesome-icon icon="fa-solid fa-comments" class="text-4xl text-repae-gray-300 dark:text-repae-gray-600 mb-3" />
          <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
            Aucune reponse pour le moment. Soyez le premier a repondre !
          </p>
        </div>
      </div>

      <!-- Add Response Form -->
      <div
        id="reply-form"
        class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6"
      >
        <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <font-awesome-icon icon="fa-solid fa-pen" class="text-repae-blue-500" />
          {{ replyingTo ? 'Repondre a ' + replyingTo.name : 'Votre reponse' }}
        </h3>

        <!-- Reply indicator -->
        <div
          v-if="replyingTo"
          class="mb-4 p-3 bg-repae-blue-50 dark:bg-repae-blue-500/10 border border-repae-blue-200 dark:border-repae-blue-500/30 rounded-lg flex items-center justify-between"
        >
          <div class="flex items-center gap-2 text-sm text-repae-blue-700 dark:text-repae-blue-400">
            <font-awesome-icon icon="fa-solid fa-reply" />
            <span>En reponse a <strong>{{ replyingTo.name }}</strong></span>
          </div>
          <button
            class="text-repae-blue-500 hover:text-repae-blue-700 dark:hover:text-repae-blue-300 cursor-pointer"
            @click="cancelReply"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>

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
              :placeholder="replyingTo ? `Repondre a ${replyingTo.name}...` : 'Partagez votre experience ou vos conseils...'"
              class="w-full px-4 py-3 border border-gray-200 dark:border-repae-gray-700 rounded-xl bg-white dark:bg-repae-gray-900 text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-repae-blue-500/20 focus:border-repae-blue-500 resize-none"
            />
            <div class="flex items-center justify-between mt-3">
              <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">
                Utilisez **texte** pour mettre en gras
              </p>
              <div class="flex items-center gap-2">
                <button
                  v-if="replyingTo"
                  class="px-4 py-2 text-sm font-medium font-brand text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  @click="cancelReply"
                >
                  Annuler
                </button>
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
      </div>
    </template>
  </div>
</template>
