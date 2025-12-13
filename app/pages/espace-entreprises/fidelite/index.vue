<script setup lang="ts">
import { entrepriseFideliteMock, badgesConfig } from '~/data/espace-entreprises/fidelite'

definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

useHead({
  title: 'Programme Fidelite - Espace Entreprises | REPAE'
})

// Mock data - in real app, this would come from API
const entrepriseNom = 'TechCorp Afrique'
const fideliteData = entrepriseFideliteMock
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <EspaceEntreprisesFideliteFideliteHeader
      :badge="fideliteData.badge_actuel"
      :points="fideliteData.points_actuels"
      :entreprise-nom="entrepriseNom"
    />

    <!-- Main content -->
    <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column - Main content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Points Balance -->
        <EspaceEntreprisesFidelitePointsBalance
          :points-actuels="fideliteData.points_actuels"
          :total-gagnes="fideliteData.total_points_gagnes"
          :total-depenses="fideliteData.total_points_depenses"
        />

        <!-- Points History -->
        <EspaceEntreprisesFidelitePointsHistory
          :historique="fideliteData.historique"
        />
      </div>

      <!-- Right column - Sidebar -->
      <div class="space-y-6">
        <!-- Badge Progress -->
        <EspaceEntreprisesFideliteBadgeProgress
          :current-badge="fideliteData.badge_actuel"
          :points="fideliteData.points_actuels"
        />

        <!-- Quick actions -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <font-awesome-icon icon="fa-solid fa-bolt" class="text-amber-500" />
            Actions rapides
          </h2>

          <div class="space-y-3">
            <NuxtLink
              to="/espace-entreprises/offres/publier"
              class="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors group"
            >
              <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-plus" class="text-emerald-500" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-repae-gray-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  Publier une offre
                </p>
                <p class="text-xs text-emerald-600 dark:text-emerald-400">+10 points</p>
              </div>
              <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-repae-gray-400 group-hover:text-emerald-500" />
            </NuxtLink>

            <NuxtLink
              to="/espace-entreprises/consulter-it"
              class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors group"
            >
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-users" class="text-blue-500" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-repae-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Consulter les profils IT
                </p>
                <p class="text-xs text-blue-600 dark:text-blue-400">+1 point/profil</p>
              </div>
              <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-repae-gray-400 group-hover:text-blue-500" />
            </NuxtLink>

            <NuxtLink
              to="/espace-entreprises/fidelite/avantages"
              class="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors group"
            >
              <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-gift" class="text-purple-500" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-repae-gray-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Utiliser mes points
                </p>
                <p class="text-xs text-purple-600 dark:text-purple-400">Voir les avantages</p>
              </div>
              <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-repae-gray-400 group-hover:text-purple-500" />
            </NuxtLink>
          </div>
        </div>

        <!-- Info card -->
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/30 p-6">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <font-awesome-icon icon="fa-solid fa-info-circle" class="text-emerald-500" />
            </div>
            <div>
              <h3 class="font-semibold text-repae-gray-900 dark:text-white text-sm mb-2">
                Comment fonctionne le programme ?
              </h3>
              <p class="text-xs text-repae-gray-600 dark:text-repae-gray-400 leading-relaxed">
                Gagnez des points en utilisant la plateforme REPAE : publication d'offres, consultation de profils, participation aux evenements. Atteignez des niveaux superieurs pour debloquer des avantages exclusifs !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
