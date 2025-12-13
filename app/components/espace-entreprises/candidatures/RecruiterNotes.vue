<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  lastUpdated?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save'): void
}>()

const isEditing = ref(false)
const localNote = ref(props.modelValue)
const isSaving = ref(false)

watch(() => props.modelValue, (newValue) => {
  if (!isEditing.value) {
    localNote.value = newValue
  }
})

const startEditing = () => {
  isEditing.value = true
  localNote.value = props.modelValue
}

const cancelEditing = () => {
  isEditing.value = false
  localNote.value = props.modelValue
}

const saveNote = async () => {
  isSaving.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  emit('update:modelValue', localNote.value)
  emit('save')
  isEditing.value = false
  isSaving.value = false
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-medium text-repae-gray-500 dark:text-repae-gray-400 flex items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-sticky-note" class="text-amber-500" />
        Notes internes
      </h3>
      <button
        v-if="!isEditing"
        type="button"
        class="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium cursor-pointer flex items-center gap-1"
        @click="startEditing"
      >
        <font-awesome-icon icon="fa-solid fa-pencil-alt" class="text-xs" />
        Modifier
      </button>
    </div>

    <!-- View mode -->
    <div v-if="!isEditing">
      <div
        v-if="modelValue"
        class="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-200 dark:border-amber-500/20"
      >
        <p class="text-sm text-amber-800 dark:text-amber-300 whitespace-pre-wrap">
          {{ modelValue }}
        </p>
      </div>
      <div
        v-else
        class="p-4 bg-gray-50 dark:bg-repae-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-repae-gray-600 text-center"
      >
        <p class="text-sm text-repae-gray-400">
          Aucune note pour cette candidature
        </p>
        <button
          type="button"
          class="mt-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium cursor-pointer"
          @click="startEditing"
        >
          + Ajouter une note
        </button>
      </div>

      <p v-if="lastUpdated" class="text-xs text-repae-gray-400 mt-2">
        Derniere modification : {{ formatDate(lastUpdated) }}
      </p>
    </div>

    <!-- Edit mode -->
    <div v-else class="space-y-4">
      <textarea
        v-model="localNote"
        rows="4"
        placeholder="Ajoutez vos notes sur ce candidat..."
        class="w-full px-4 py-3 bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700 rounded-xl text-sm text-repae-gray-900 dark:text-white placeholder-repae-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
      />

      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 text-sm text-repae-gray-600 dark:text-repae-gray-400 hover:text-repae-gray-800 dark:hover:text-repae-gray-200 font-medium cursor-pointer"
          :disabled="isSaving"
          @click="cancelEditing"
        >
          Annuler
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isSaving"
          @click="saveNote"
        >
          <font-awesome-icon v-if="isSaving" icon="fa-solid fa-spinner" class="animate-spin" />
          <font-awesome-icon v-else icon="fa-solid fa-save" />
          {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder' }}
        </button>
      </div>
    </div>
  </div>
</template>
