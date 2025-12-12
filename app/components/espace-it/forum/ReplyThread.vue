<script setup lang="ts">
import type { ForumReponseWithReplies } from '~/data/espace-it/forum'

const props = defineProps<{
  reply: ForumReponseWithReplies
  depth?: number
}>()

const emit = defineEmits<{
  reply: [parentId: string, authorName: string]
}>()

const depth = computed(() => props.depth ?? 0)
const maxDepth = 4 // Limite de profondeur pour l'affichage

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
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

// Parse markdown-like content
const parseContent = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

const handleReply = () => {
  emit('reply', props.reply.id, `${props.reply.auteur.prenom} ${props.reply.auteur.nom}`)
}
</script>

<template>
  <div class="reply-thread">
    <!-- Main reply card -->
    <div
      :class="[
        'relative',
        depth > 0 ? 'ml-6 sm:ml-10' : ''
      ]"
    >
      <!-- Thread line connector -->
      <div
        v-if="depth > 0"
        class="absolute -left-6 sm:-left-10 top-0 bottom-0 w-px bg-gray-200 dark:bg-repae-gray-700"
      />
      <div
        v-if="depth > 0"
        class="absolute -left-6 sm:-left-10 top-5 w-4 sm:w-8 h-px bg-gray-200 dark:bg-repae-gray-700"
      />

      <!-- Reply card -->
      <div
        :class="[
          'rounded-xl border overflow-hidden',
          reply.is_solution
            ? 'bg-green-50 dark:bg-green-500/5 border-green-300 dark:border-green-500/50'
            : 'bg-white dark:bg-repae-gray-800 border-gray-200 dark:border-repae-gray-700'
        ]"
      >
        <!-- Solution Badge -->
        <div
          v-if="reply.is_solution"
          class="px-4 py-2 bg-green-100 dark:bg-green-500/10 border-b border-green-200 dark:border-green-500/30 flex items-center gap-2 text-green-700 dark:text-green-400"
        >
          <font-awesome-icon icon="fa-solid fa-check-circle" />
          <span class="text-sm font-medium">Meilleure reponse</span>
        </div>

        <div :class="depth > 0 ? 'p-4' : 'p-5'">
          <!-- Author -->
          <div class="flex items-start gap-3 mb-3">
            <img
              :src="reply.auteur.photo_url"
              :alt="`${reply.auteur.prenom} ${reply.auteur.nom}`"
              :class="[
                'rounded-full object-cover flex-shrink-0',
                depth > 0 ? 'w-8 h-8' : 'w-10 h-10'
              ]"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span :class="['font-medium text-repae-gray-900 dark:text-white', depth > 0 ? 'text-sm' : '']">
                  {{ reply.auteur.prenom }} {{ reply.auteur.nom }}
                </span>
                <span class="text-xs text-repae-gray-500 dark:text-repae-gray-400 hidden sm:inline">
                  {{ reply.auteur.poste }}
                </span>
              </div>
              <span class="text-xs text-repae-gray-400 dark:text-repae-gray-500">
                {{ formatRelativeDate(reply.date_creation) }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div
            :class="[
              'text-repae-gray-700 dark:text-repae-gray-300 leading-relaxed mb-3',
              depth > 0 ? 'text-sm' : ''
            ]"
            v-html="parseContent(reply.contenu)"
          />

          <!-- Actions -->
          <div class="flex items-center gap-4">
            <button class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer">
              <font-awesome-icon icon="fa-solid fa-heart" />
              <span>{{ reply.likes }}</span>
            </button>
            <button
              v-if="depth < maxDepth"
              class="flex items-center gap-1.5 text-sm text-repae-gray-500 dark:text-repae-gray-400 hover:text-repae-blue-500 dark:hover:text-repae-blue-400 transition-colors cursor-pointer"
              @click="handleReply"
            >
              <font-awesome-icon icon="fa-solid fa-reply" />
              <span>Repondre</span>
            </button>
            <span
              v-if="reply.replies.length > 0"
              class="text-xs text-repae-gray-400 dark:text-repae-gray-500 ml-auto"
            >
              {{ reply.replies.length }} reponse(s)
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested replies -->
    <div
      v-if="reply.replies.length > 0"
      class="mt-3 space-y-3"
    >
      <EspaceItForumReplyThread
        v-for="nestedReply in reply.replies"
        :key="nestedReply.id"
        :reply="nestedReply"
        :depth="depth + 1"
        @reply="(parentId, authorName) => emit('reply', parentId, authorName)"
      />
    </div>
  </div>
</template>
