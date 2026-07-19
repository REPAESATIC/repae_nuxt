<script setup lang="ts">
import type { AlumniItem } from '~/composables/useIdentityApi'

const emit = defineEmits<{
  /** Émis après une validation pour que la page recharge la liste complète. */
  validated: []
}>()

const { adhereAlumni } = useIdentityApi()
const { fetchAdhesionRequests, pendingCount } = useAdhesionRequests()
const toast = useToast()

const requests = ref<AlumniItem[]>([])
const loading = ref(true)
const truncated = ref(false)
const validating = ref<string | null>(null)

const load = async () => {
  loading.value = true
  try {
    const result = await fetchAdhesionRequests()
    requests.value = result.requests
    truncated.value = result.truncated
    pendingCount.value = result.requests.length
  } catch (e: any) {
    toast.error('Erreur de chargement', e?.data?.message || 'Impossible de charger les demandes d\'adhésion.')
  } finally {
    loading.value = false
  }
}

onMounted(load)
defineExpose({ load })

const handleValidate = async (item: AlumniItem) => {
  validating.value = item.id
  try {
    await adhereAlumni(item.id)
    toast.success('Adhésion validée', `${item.firstName} ${item.lastName} est maintenant adhérent.`)
    await load()
    emit('validated')
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de valider cette demande.')
  } finally {
    validating.value = null
  }
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

/** Nombre de jours d'attente, pour signaler les demandes qui traînent. */
const daysWaiting = (date: string) =>
  Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000)
</script>

<template>
  <div>
    <!-- Chargement -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-repae-blue-500 text-2xl animate-spin" />
    </div>

    <!-- Aucune demande -->
    <div
      v-else-if="requests.length === 0"
      class="text-center py-20 bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700"
    >
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-inbox" class="text-emerald-500 text-2xl" />
      </div>
      <h3 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-2">
        Aucune demande en attente
      </h3>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        Les demandes soumises via le formulaire d'adhésion apparaîtront ici.
      </p>
    </div>

    <template v-else>
      <!-- Avertissement si toutes les demandes n'ont pas pu être inspectées -->
      <div
        v-if="truncated"
        class="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-3"
      >
        <font-awesome-icon icon="fa-solid fa-exclamation-triangle" class="text-amber-500 mt-0.5" />
        <p class="text-sm text-amber-700 dark:text-amber-400 font-brand">
          Le nombre de non-adhérents dépasse la limite consultée : certaines demandes
          peuvent manquer à cette liste et au compteur.
        </p>
      </div>

      <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-repae-gray-700">
                <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                  Alumni
                </th>
                <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Promotion
                </th>
                <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider">
                  Paiement déclaré
                </th>
                <th class="text-left px-6 py-4 text-xs font-semibold font-brand text-repae-gray-500 dark:text-repae-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Demande
                </th>
                <th class="px-6 py-4" />
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-repae-gray-700/50">
              <tr
                v-for="item in requests"
                :key="item.id"
                class="hover:bg-gray-50 dark:hover:bg-repae-gray-700/30 transition-colors"
              >
                <!-- Alumni -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      v-if="item.photoUrl"
                      class="w-10 h-10 rounded-full bg-cover bg-center shrink-0 hidden sm:block"
                      :style="{ backgroundImage: `url(${item.photoUrl})` }"
                    />
                    <div
                      v-else
                      class="w-10 h-10 rounded-full bg-repae-blue-100 dark:bg-repae-blue-500/15 items-center justify-center shrink-0 hidden sm:flex"
                    >
                      <font-awesome-icon icon="fa-solid fa-user-graduate" class="text-repae-blue-500 text-sm" />
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white truncate max-w-xs">
                        {{ item.firstName }} {{ item.lastName }}
                      </p>
                      <p v-if="item.email" class="text-xs text-repae-gray-500 dark:text-repae-gray-400 truncate max-w-xs mt-0.5">
                        {{ item.email }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Promotion -->
                <td class="px-6 py-4 hidden md:table-cell">
                  <span class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                    {{ item.promotion || '—' }}
                  </span>
                </td>

                <!-- Paiement déclaré : moyen, référence et preuve -->
                <td class="px-6 py-4">
                  <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                    {{ item.paymentMethod || 'Moyen non précisé' }}
                  </p>
                  <p
                    v-if="item.paymentReference"
                    class="text-xs text-repae-gray-500 dark:text-repae-gray-400 mt-0.5 font-mono"
                  >
                    {{ item.paymentReference }}
                  </p>
                  <a
                    v-if="item.paymentProofUrl"
                    :href="item.paymentProofUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 mt-1.5 text-xs font-medium text-repae-blue-500 hover:text-repae-blue-600 transition-colors cursor-pointer"
                  >
                    <font-awesome-icon icon="fa-solid fa-file-invoice" />
                    Voir la preuve
                  </a>
                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 mt-1.5 text-xs text-amber-600 dark:text-amber-400"
                  >
                    <font-awesome-icon icon="fa-solid fa-exclamation-triangle" />
                    Aucune preuve jointe
                  </span>
                </td>

                <!-- Date de la demande -->
                <td class="px-6 py-4 hidden lg:table-cell">
                  <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300">
                    {{ formatDate(item.createdAt) }}
                  </p>
                  <p class="text-xs text-repae-gray-400 dark:text-repae-gray-500 mt-0.5 flex items-center gap-1">
                    <font-awesome-icon icon="fa-solid fa-clock" />
                    {{ daysWaiting(item.createdAt) === 0 ? "aujourd'hui" : `depuis ${daysWaiting(item.createdAt)} j` }}
                  </p>
                </td>

                <!-- Action -->
                <td class="px-6 py-4 text-right">
                  <button
                    :disabled="validating === item.id"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium font-brand transition-colors cursor-pointer"
                    @click="handleValidate(item)"
                  >
                    <font-awesome-icon
                      :icon="validating === item.id ? 'fa-solid fa-spinner' : 'fa-solid fa-medal'"
                      :class="{ 'animate-spin': validating === item.id }"
                    />
                    Valider l'adhésion
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>
