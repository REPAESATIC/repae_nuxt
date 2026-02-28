<script setup lang="ts">
const { alumni, firstName, photoUrl, ensureLoaded } = useItUser()
const { fetchWorkExperiences } = useIdentityApi()

// Expérience professionnelle actuelle (la plus récente sans date de fin)
const currentPosition = ref<{ position: string; companyName: string } | null>(null)

onMounted(async () => {
  await ensureLoaded()
  if (alumni.value) {
    try {
      const experiences = await fetchWorkExperiences(alumni.value.id)
      // Trouver l'expérience actuelle (pas de endDate) ou la plus récente
      const current = experiences.find(e => !e.endDate)
        ?? experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0]
      if (current) {
        currentPosition.value = { position: current.position, companyName: current.companyName }
      }
    } catch {
      // Pas de work experiences
    }
  }
})
</script>

<template>
  <div class="bg-gradient-to-r from-repae-blue-500 to-repae-blue-600 rounded-2xl p-6 text-white animate__animated animate__fadeIn">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div
        v-if="photoUrl"
        class="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 shrink-0"
      >
        <img
          :src="photoUrl"
          :alt="firstName"
          class="w-full h-full object-cover"
        />
      </div>
      <div
        v-else
        class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center border-2 border-white/30 shrink-0"
      >
        <span class="text-2xl font-bold font-brand">
          {{ alumni?.firstName?.charAt(0)?.toUpperCase() ?? '' }}{{ alumni?.lastName?.charAt(0)?.toUpperCase() ?? '' }}
        </span>
      </div>
      <div class="flex-1">
        <h1 class="text-2xl font-bold font-brand">
          Bienvenue, {{ firstName || '...' }} !
        </h1>
        <p v-if="currentPosition" class="text-white/80 font-brand mt-1">
          {{ currentPosition.position }} chez {{ currentPosition.companyName }}
        </p>
        <p v-else-if="alumni?.degree" class="text-white/80 font-brand mt-1">
          {{ alumni.degree }}
        </p>
        <div v-if="alumni" class="mt-2 flex flex-wrap items-center gap-2">
          <span v-if="alumni.promotion" class="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-medium font-brand">
            Promotion {{ alumni.promotion }}
          </span>
          <span
            v-if="alumni.isVerified"
            class="px-2.5 py-1 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 rounded-lg text-xs font-medium font-brand"
          >
            Profil vérifié
          </span>
          <span
            v-if="alumni.isOpenToMentoring"
            class="px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-lg text-xs font-medium font-brand"
          >
            Ouvert au mentorat
          </span>
        </div>
      </div>
      <NuxtLink
        to="/espace-it/profil"
        class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer"
      >
        Voir mon profil
      </NuxtLink>
    </div>
  </div>
</template>
