<script setup lang="ts">
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'

interface Props {
  modelValue?: string
  initialEditType?: 'markdown' | 'wysiwyg'
  previewStyle?: 'vertical' | 'tab'
  placeholder?: string
  imageUploadUrl?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  initialEditType: 'wysiwyg',
  previewStyle: 'vertical',
  placeholder: 'Redigez votre contenu ici...',
  imageUploadUrl: '',
  label: 'Contenu',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement>()
let editorInstance: Editor | null = null
const { isDark } = useDarkMode()

const isOpen = ref(false)
let draftContent = ''

function open() {
  draftContent = props.modelValue
  isOpen.value = true
  nextTick(() => {
    if (!editorRef.value) return
    editorInstance = new Editor({
      el: editorRef.value,
      height: '100%',
      initialEditType: props.initialEditType,
      previewStyle: props.previewStyle,
      initialValue: draftContent,
      placeholder: props.placeholder,
      theme: isDark.value ? 'dark' : '',
      usageStatistics: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync'],
      ],
      hooks: {
        addImageBlobHook: handleImageUpload,
      },
    })
  })
}

function save() {
  if (editorInstance) {
    emit('update:modelValue', editorInstance.getHTML())
  }
  close()
}

function close() {
  editorInstance?.destroy()
  editorInstance = null
  isOpen.value = false
}

watch(isDark, (dark) => {
  if (!editorRef.value) return
  const el = editorRef.value.closest('.toastui-editor-defaultUI')
  if (el) {
    el.classList.toggle('toastui-editor-dark', dark)
  }
})

async function handleImageUpload(
  blob: Blob | File,
  callback: (url: string, altText?: string) => void,
) {
  if (!props.imageUploadUrl) {
    const reader = new FileReader()
    reader.onload = () => {
      callback(reader.result as string, (blob as File).name || 'image')
    }
    reader.readAsDataURL(blob)
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', blob)
    const url = await $fetch<string>(props.imageUploadUrl, {
      method: 'POST',
      body: formData,
    })
    callback(url, (blob as File).name || 'image')
  } catch {
    const reader = new FileReader()
    reader.onload = () => {
      callback(reader.result as string, (blob as File).name || 'image')
    }
    reader.readAsDataURL(blob)
  }
}

const hasContent = computed(() => {
  if (!props.modelValue) return false
  const stripped = props.modelValue.replace(/<[^>]*>/g, '').trim()
  return stripped.length > 0
})

defineExpose({
  open,
  getHTML: () => editorInstance?.getHTML() ?? props.modelValue,
  getMarkdown: () => editorInstance?.getMarkdown() ?? '',
})

onBeforeUnmount(() => {
  editorInstance?.destroy()
  editorInstance = null
})
</script>

<template>
  <!-- Trigger zone -->
  <div
    class="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-repae-gray-600 hover:border-repae-blue-400 dark:hover:border-repae-blue-500 transition-colors cursor-pointer"
    @click="open"
  >
    <!-- Preview when content exists -->
    <div v-if="hasContent" class="p-4">
      <div
        class="prose prose-sm dark:prose-invert max-h-32 overflow-hidden relative text-repae-gray-600 dark:text-repae-gray-300"
        v-html="modelValue"
      />
      <div class="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-white dark:from-repae-gray-800 pointer-events-none" />
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-8">
      <font-awesome-icon icon="fa-solid fa-expand" class="text-2xl text-repae-gray-400 mb-2" />
      <span class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        Cliquez pour ouvrir l'editeur de contenu
      </span>
    </div>

    <!-- Edit hint -->
    <div v-if="hasContent" class="flex items-center justify-center gap-2 py-2 border-t border-dashed border-gray-200 dark:border-repae-gray-700 text-repae-blue-500 text-xs font-medium">
      <font-awesome-icon icon="fa-solid fa-expand" class="text-xs" />
      Cliquer pour modifier
    </div>
  </div>

  <!-- Fullscreen modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-9999 flex flex-col bg-white dark:bg-repae-gray-900"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-repae-gray-700 bg-gray-50 dark:bg-repae-gray-800">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white">
            {{ label }}
          </h2>
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="px-4 py-2 rounded-xl border border-gray-200 dark:border-repae-gray-600 text-sm font-semibold text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
              @click="close"
            >
              Annuler
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-xl bg-repae-blue-500 hover:bg-repae-blue-600 text-white text-sm font-semibold transition-colors cursor-pointer"
              @click="save"
            >
              <font-awesome-icon icon="fa-solid fa-check" class="mr-1" />
              Valider
            </button>
          </div>
        </div>

        <!-- Editor area -->
        <div class="flex-1 overflow-hidden">
          <div ref="editorRef" class="h-full" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.toastui-editor-defaultUI {
  border-radius: 0;
  border: none;
  height: 100% !important;
}

.toastui-editor-defaultUI .toastui-editor-main {
  height: calc(100% - 40px) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
