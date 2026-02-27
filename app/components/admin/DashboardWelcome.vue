<script setup lang="ts">
defineProps<{
  pendingVerifications: number
}>()

const today = new Date()
const formattedDate = today.toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <div class="bg-linear-to-r from-violet-500 to-indigo-600 rounded-2xl p-6 text-white animate__animated animate__fadeIn">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-white text-2xl" />
      </div>
      <div class="flex-1">
        <h1 class="text-2xl font-bold font-brand">
          Bienvenue, Administrateur
        </h1>
        <p class="text-white/80 font-brand mt-1 capitalize">
          {{ formattedDate }}
        </p>
        <div v-if="pendingVerifications > 0" class="mt-2">
          <span class="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-medium font-brand">
            {{ pendingVerifications }} alumni en attente de verification
          </span>
        </div>
      </div>
      <NuxtLink
        to="/admin/parametres"
        class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-medium font-brand text-sm transition-colors cursor-pointer"
      >
        <font-awesome-icon icon="fa-solid fa-cog" class="mr-2" />
        Parametres
      </NuxtLink>
    </div>
  </div>
</template>
