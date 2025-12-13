<script setup lang="ts">
import type { OffreEmploi } from '~/data/espace-entreprises/offres-emploi'
import { contratConfig, remoteConfig } from '~/data/espace-entreprises/offres-emploi'

const props = defineProps<{
  offre: OffreEmploi
}>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'duplicate', id: string): void
  (e: 'close', id: string): void
  (e: 'preview', offre: OffreEmploi): void
}>()

const showActions = ref(false)

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const daysUntilExpiration = computed(() => {
  const expDate = new Date(props.offre.date_expiration)
  const today = new Date()
  const diffTime = expDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

const expirationStatus = computed(() => {
  if (props.offre.statut !== 'publiee') return null
  const days = daysUntilExpiration.value
  if (days < 0) return { text: 'Expiree', color: 'text-red-500' }
  if (days <= 3) return { text: `Expire dans ${days}j`, color: 'text-red-500' }
  if (days <= 7) return { text: `Expire dans ${days}j`, color: 'text-orange-500' }
  return { text: `Expire dans ${days}j`, color: 'text-repae-gray-400' }
})
</script>

<template>
  <div
    class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-5 hover:shadow-md transition-shadow relative"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap mb-2">
          <EspaceEntreprisesOffresStatusBadge :statut="offre.statut" show-icon />
          <span :class="['px-2 py-0.5 rounded text-xs font-medium', contratConfig[offre.type_contrat].color]">
            {{ contratConfig[offre.type_contrat].label }}
          </span>
        </div>
        <h3 class="font-semibold font-brand text-repae-gray-900 dark:text-white truncate">
          {{ offre.titre }}
        </h3>
      </div>

      <!-- Actions menu -->
      <div class="relative">
        <button
          type="button"
          class="p-2 text-repae-gray-400 hover:text-repae-gray-600 dark:hover:text-repae-gray-300 hover:bg-gray-100 dark:hover:bg-repae-gray-700 rounded-lg transition-colors cursor-pointer"
          @click.stop="showActions = !showActions"
        >
          <font-awesome-icon icon="fa-solid fa-ellipsis" />
        </button>

        <!-- Dropdown -->
        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showActions"
            class="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-repae-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-repae-gray-700 py-1 z-10"
          >
            <button
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2 cursor-pointer"
              @click="emit('preview', offre)"
            >
              <font-awesome-icon icon="fa-solid fa-eye" class="w-4 text-repae-gray-400" />
              Voir l'apercu
            </button>
            <button
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2 cursor-pointer"
              @click="emit('edit', offre.id)"
            >
              <font-awesome-icon icon="fa-solid fa-pencil-alt" class="w-4 text-repae-gray-400" />
              Modifier
            </button>
            <button
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-repae-gray-700 dark:text-repae-gray-300 hover:bg-gray-50 dark:hover:bg-repae-gray-700 flex items-center gap-2 cursor-pointer"
              @click="emit('duplicate', offre.id)"
            >
              <font-awesome-icon icon="fa-solid fa-copy" class="w-4 text-repae-gray-400" />
              Dupliquer
            </button>
            <hr class="my-1 border-gray-200 dark:border-repae-gray-700" />
            <button
              v-if="offre.statut === 'publiee'"
              type="button"
              class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
              @click="emit('close', offre.id)"
            >
              <font-awesome-icon icon="fa-solid fa-times-circle" class="w-4" />
              Cloturer l'offre
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Location & Mode -->
    <div class="flex items-center gap-4 text-sm text-repae-gray-500 dark:text-repae-gray-400 mb-4">
      <span class="flex items-center gap-1.5">
        <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-xs" />
        {{ offre.ville }}, {{ offre.pays }}
      </span>
      <span class="flex items-center gap-1.5">
        <font-awesome-icon :icon="remoteConfig[offre.mode_remote].icon" class="text-xs" />
        {{ remoteConfig[offre.mode_remote].label }}
      </span>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100 dark:border-repae-gray-700 mb-4">
      <div class="text-center">
        <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ offre.nombre_vues }}
        </p>
        <p class="text-xs text-repae-gray-400">Vues</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold font-brand text-repae-gray-900 dark:text-white">
          {{ offre.nombre_candidatures }}
        </p>
        <p class="text-xs text-repae-gray-400">Candidatures</p>
      </div>
      <div class="text-center">
        <p
          :class="[
            'text-2xl font-bold font-brand',
            offre.nombre_candidatures_non_lues > 0 ? 'text-emerald-500' : 'text-repae-gray-300 dark:text-repae-gray-600'
          ]"
        >
          {{ offre.nombre_candidatures_non_lues }}
        </p>
        <p class="text-xs text-repae-gray-400">Non lues</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs">
      <div class="text-repae-gray-400">
        <span v-if="offre.date_publication">
          Publiee le {{ formatDate(offre.date_publication) }}
        </span>
        <span v-else>
          Creee le {{ formatDate(offre.date_creation) }}
        </span>
      </div>
      <div v-if="expirationStatus" :class="expirationStatus.color">
        {{ expirationStatus.text }}
      </div>
    </div>

    <!-- View candidatures button for active offers -->
    <div v-if="offre.statut === 'publiee' && offre.nombre_candidatures > 0" class="mt-4">
      <NuxtLink
        :to="`/espace-entreprises/offres/${offre.id}/candidatures`"
        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-xl font-medium font-brand text-sm transition-colors"
      >
        <font-awesome-icon icon="fa-solid fa-users" />
        Voir les candidatures
        <span
          v-if="offre.nombre_candidatures_non_lues > 0"
          class="px-1.5 py-0.5 bg-emerald-500 text-white text-xs rounded-full"
        >
          {{ offre.nombre_candidatures_non_lues }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
