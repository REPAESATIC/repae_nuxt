<script setup lang="ts">
import type { AlumniItem } from '~/composables/useIdentityApi'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const { fetchAlumni, verifyAlumni } = useIdentityApi()
const toast = useToast()

const alumniId = route.params.id as string

// State
const loading = ref(true)
const alumni = ref<AlumniItem | null>(null)
const verifying = ref(false)

// Load data
onMounted(async () => {
  try {
    alumni.value = await fetchAlumni(alumniId)
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de charger le profil alumni.')
    router.push('/admin/alumni')
  } finally {
    loading.value = false
  }
})

// Actions
const handleVerify = async () => {
  if (!alumni.value) return
  verifying.value = true
  try {
    alumni.value = await verifyAlumni(alumniId)
    toast.success('Alumni verifie', `${alumni.value.firstName} ${alumni.value.lastName} est maintenant verifie.`)
  } catch (e: any) {
    toast.error('Erreur', e?.data?.message || 'Impossible de verifier cet alumni.')
  } finally {
    verifying.value = false
  }
}

// Helpers
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const skillLevelConfig: Record<string, { label: string; class: string }> = {
  BEGINNER: { label: 'Debutant', class: 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400' },
  INTERMEDIATE: { label: 'Intermediaire', class: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  ADVANCED: { label: 'Avance', class: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  EXPERT: { label: 'Expert', class: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
}
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <font-awesome-icon icon="fa-solid fa-spinner" class="text-violet-500 text-2xl animate-spin" />
    </div>

    <template v-else-if="alumni">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/admin/alumni"
            class="w-10 h-10 rounded-xl bg-white dark:bg-repae-gray-800 border border-gray-200 dark:border-repae-gray-700 flex items-center justify-center text-repae-gray-500 hover:text-repae-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-repae-gray-700 transition-colors cursor-pointer"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="text-sm" />
          </NuxtLink>
          <div>
            <h2 class="text-xl font-bold font-brand text-repae-gray-900 dark:text-white">
              {{ alumni.firstName }} {{ alumni.lastName }}
            </h2>
            <div class="flex items-center gap-2 mt-1">
              <span
                :class="[
                  'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
                  alumni.isVerified
                    ? 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400'
                ]"
              >
                <font-awesome-icon :icon="alumni.isVerified ? 'fa-solid fa-circle-check' : 'fa-solid fa-clock'" class="text-[10px]" />
                {{ alumni.isVerified ? 'Verifie' : 'Non verifie' }}
              </span>
              <span v-if="alumni.isOpenToMentoring" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-repae-blue-100 text-repae-blue-700 dark:bg-repae-blue-500/15 dark:text-repae-blue-400">
                <font-awesome-icon icon="fa-solid fa-handshake" class="text-[10px]" />
                Mentor
              </span>
            </div>
          </div>
        </div>
        <button
          v-if="!alumni.isVerified"
          :disabled="verifying"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold font-brand text-sm transition-colors cursor-pointer"
          @click="handleVerify"
        >
          <font-awesome-icon
            :icon="verifying ? 'fa-solid fa-spinner' : 'fa-solid fa-user-check'"
            :class="{ 'animate-spin': verifying }"
          />
          {{ verifying ? 'Verification...' : 'Verifier ce profil' }}
        </button>
      </div>

      <!-- Content -->
      <div class="max-w-4xl space-y-6">
        <!-- Profile card -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 overflow-hidden">
          <!-- Cover -->
          <div
            class="h-32 sm:h-40 bg-gradient-to-r from-violet-500 to-indigo-600"
            :style="alumni.coverPicUrl ? { backgroundImage: `url(${alumni.coverPicUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
          />

          <!-- Avatar + name -->
          <div class="px-6 pb-6">
            <div class="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
              <div
                v-if="alumni.photoUrl"
                class="w-20 h-20 rounded-2xl bg-cover bg-center border-4 border-white dark:border-repae-gray-800 shrink-0"
                :style="{ backgroundImage: `url(${alumni.photoUrl})` }"
              />
              <div
                v-else
                class="w-20 h-20 rounded-2xl bg-violet-100 dark:bg-violet-500/15 border-4 border-white dark:border-repae-gray-800 flex items-center justify-center shrink-0"
              >
                <font-awesome-icon icon="fa-solid fa-user-graduate" class="text-violet-500 text-2xl" />
              </div>
              <div class="min-w-0 pb-1">
                <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white">
                  {{ alumni.firstName }} {{ alumni.lastName }}
                </h3>
                <p v-if="alumni.email" class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
                  {{ alumni.email }}
                </p>
                <p v-if="alumni.degree" class="text-sm text-repae-gray-600 dark:text-repae-gray-300 mt-0.5">
                  {{ alumni.degree }}
                </p>
              </div>
            </div>

            <!-- Social links -->
            <div v-if="alumni.linkedinUrl || alumni.githubUrl || alumni.portfolioUrl || alumni.xUrl" class="flex items-center gap-3 mt-4">
              <a
                v-if="alumni.linkedinUrl"
                :href="alumni.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center text-repae-gray-500 hover:text-repae-blue-500 hover:bg-repae-blue-50 dark:hover:bg-repae-blue-500/10 transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-brands fa-linkedin" />
              </a>
              <a
                v-if="alumni.githubUrl"
                :href="alumni.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center text-repae-gray-500 hover:text-repae-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-repae-gray-600 transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-brands fa-github" />
              </a>
              <a
                v-if="alumni.portfolioUrl"
                :href="alumni.portfolioUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center text-repae-gray-500 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-solid fa-globe" />
              </a>
              <a
                v-if="alumni.xUrl"
                :href="alumni.xUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-repae-gray-700 flex items-center justify-center text-repae-gray-500 hover:text-repae-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-repae-gray-600 transition-colors cursor-pointer"
              >
                <font-awesome-icon icon="fa-brands fa-twitter" />
              </a>
            </div>
          </div>
        </div>

        <!-- Info grid -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h4 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Informations
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-if="alumni.email" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                <font-awesome-icon icon="fa-solid fa-envelope" class="text-violet-500 text-xs" />
              </div>
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Email</p>
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ alumni.email }}</p>
              </div>
            </div>
            <div v-if="alumni.phoneNumber" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                <font-awesome-icon icon="fa-solid fa-phone" class="text-violet-500 text-xs" />
              </div>
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Telephone</p>
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ alumni.phoneNumber }}</p>
              </div>
            </div>
            <div v-if="alumni.city || alumni.country" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-violet-500 text-xs" />
              </div>
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Localisation</p>
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white">
                  {{ [alumni.city, alumni.country].filter(Boolean).join(', ') }}
                </p>
              </div>
            </div>
            <div v-if="alumni.address" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="text-violet-500 text-xs" />
              </div>
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Adresse</p>
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ alumni.address }}</p>
              </div>
            </div>
            <div v-if="alumni.promotion" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-violet-500 text-xs" />
              </div>
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Promotion</p>
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ alumni.promotion }}</p>
              </div>
            </div>
            <div v-if="alumni.department" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0">
                <font-awesome-icon icon="fa-solid fa-briefcase" class="text-violet-500 text-xs" />
              </div>
              <div>
                <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Departement</p>
                <p class="text-sm font-medium text-repae-gray-900 dark:text-white">{{ alumni.department }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div v-if="alumni.bio" class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h4 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-3">
            Biographie
          </h4>
          <p class="text-sm text-repae-gray-600 dark:text-repae-gray-300 leading-relaxed whitespace-pre-line">
            {{ alumni.bio }}
          </p>
        </div>

        <!-- Skills -->
        <div v-if="alumni.skills && alumni.skills.length > 0" class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h4 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Competences
          </h4>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="skill in alumni.skills"
              :key="skill.id"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-repae-gray-900 border border-gray-200 dark:border-repae-gray-700"
            >
              <span class="text-sm font-medium text-repae-gray-900 dark:text-white">
                {{ skill.name }}
              </span>
              <span
                :class="[
                  'px-1.5 py-0.5 rounded text-[10px] font-semibold',
                  skillLevelConfig[skill.level]?.class || ''
                ]"
              >
                {{ skillLevelConfig[skill.level]?.label || skill.level }}
              </span>
            </div>
          </div>
        </div>

        <!-- Meta -->
        <div class="bg-white dark:bg-repae-gray-800 rounded-2xl border border-gray-200 dark:border-repae-gray-700 p-6">
          <h4 class="text-sm font-semibold font-brand text-repae-gray-900 dark:text-white mb-4">
            Informations systeme
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">ID utilisateur</p>
              <p class="font-medium text-repae-gray-900 dark:text-white font-mono text-xs mt-0.5">{{ alumni.userId }}</p>
            </div>
            <div>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">Cree le</p>
              <p class="font-medium text-repae-gray-900 dark:text-white mt-0.5">{{ formatDate(alumni.createdAt) }}</p>
            </div>
            <div>
              <p class="text-repae-gray-500 dark:text-repae-gray-400">Modifie le</p>
              <p class="font-medium text-repae-gray-900 dark:text-white mt-0.5">{{ formatDate(alumni.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
