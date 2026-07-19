<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

// Sous 640px, la liste complète déborde : on n'affiche plus les pages
// voisines. Reste à false au premier rendu client pour rester identique au
// rendu serveur (pas de décalage d'hydratation), puis s'ajuste au montage.
const isCompact = ref(false)
let mediaQuery: MediaQueryList | null = null
const syncCompact = () => {
  isCompact.value = mediaQuery ? !mediaQuery.matches : false
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 640px)')
  syncCompact()
  mediaQuery.addEventListener('change', syncCompact)
})

onBeforeUnmount(() => mediaQuery?.removeEventListener('change', syncCompact))

// Pages à afficher : la première, la dernière, et celles autour de la page
// courante. Les trous sont comblés par des ellipses.
const items = computed<(number | 'ellipsis')[]>(() => {
  const result: (number | 'ellipsis')[] = []
  const siblings = isCompact.value ? 0 : 1
  let previous = 0

  for (let p = 1; p <= props.totalPages; p++) {
    const isVisible =
      p === 1 ||
      p === props.totalPages ||
      (p >= props.page - siblings && p <= props.page + siblings)

    if (!isVisible) continue

    // Une ellipse qui ne masque qu'une seule page prend autant de place que
    // le numéro lui-même : on affiche le numéro.
    if (previous && p - previous === 2) result.push(previous + 1)
    else if (previous && p - previous > 2) result.push('ellipsis')

    result.push(p)
    previous = p
  }

  return result
})

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.page) return
  emit('update:page', page)
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 dark:border-repae-gray-700"
  >
    <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400 hidden sm:block shrink-0">
      Page {{ page }} sur {{ totalPages }}
    </p>

    <div class="flex items-center gap-2 mx-auto sm:mx-0">
      <button
        :disabled="page <= 1"
        aria-label="Page précédente"
        class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        @click="goToPage(page - 1)"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-xs" />
      </button>

      <template v-for="(item, index) in items" :key="index">
        <span
          v-if="item === 'ellipsis'"
          class="px-1 text-sm text-repae-gray-400 select-none"
        >
          ...
        </span>
        <button
          v-else
          :aria-current="item === page ? 'page' : undefined"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer',
            item === page
              ? 'bg-repae-blue-500 text-white'
              : 'bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600'
          ]"
          @click="goToPage(item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        :disabled="page >= totalPages"
        aria-label="Page suivante"
        class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-repae-gray-700 text-repae-gray-600 dark:text-repae-gray-300 hover:bg-gray-200 dark:hover:bg-repae-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        @click="goToPage(page + 1)"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-xs" />
      </button>
    </div>
  </div>
</template>
