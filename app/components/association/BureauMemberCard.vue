<script setup>
const props = defineProps({
  membre: {
    type: Object,
    required: true
  }
})

const avatarColors = [
  'bg-repae-blue-500',
  'bg-repae-blue-600',
  'bg-repae-blue-700',
  'bg-repae-gray-600',
  'bg-repae-gray-700'
]

const initiales = computed(() => {
  const p = props.membre.prenom?.charAt(0) || ''
  const n = props.membre.nom?.charAt(0) || ''
  return (p + n).toUpperCase()
})

const avatarColor = computed(() => {
  const index = parseInt(props.membre.id, 10) || 0
  return avatarColors[index % avatarColors.length]
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-repae-gray-700 group p-6 text-center">
    <!-- Avatar initiales -->
    <div class="flex justify-center mb-4">
      <div
        :class="[avatarColor]"
        class="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold font-brand shadow-lg"
      >
        {{ initiales }}
      </div>
    </div>

    <!-- Nom -->
    <h3 class="text-lg font-bold font-brand text-repae-gray-900 dark:text-white mb-1">
      {{ membre.prenom }} {{ membre.nom }}
    </h3>

    <!-- Poste -->
    <span class="inline-block px-3 py-1 bg-repae-blue-50 dark:bg-repae-blue-500/20 text-repae-blue-600 dark:text-repae-blue-400 text-xs font-brand font-semibold rounded-full mb-3">
      {{ membre.poste }}
    </span>

    <!-- Poste actuel -->
    <div v-if="membre.poste_actuel" class="flex items-center justify-center gap-2 text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-2">
      <font-awesome-icon icon="fa-solid fa-briefcase" class="text-repae-blue-500 text-xs" />
      <span>{{ membre.poste_actuel }}</span>
    </div>

    <!-- Entreprise -->
    <div v-if="membre.entreprise" class="flex items-center justify-center gap-2 text-sm font-brand text-repae-gray-500 dark:text-repae-gray-400 mb-3">
      <font-awesome-icon icon="fa-solid fa-building" class="text-repae-blue-500 text-xs" />
      <span>{{ membre.entreprise }}</span>
    </div>

    <!-- Responsabilités -->
    <p v-if="membre.responsabilites" class="text-sm font-brand text-repae-gray-600 dark:text-repae-gray-300 mb-4 line-clamp-2">
      {{ membre.responsabilites }}
    </p>

    <!-- LinkedIn -->
    <a
      v-if="membre.linkedin_url"
      :href="membre.linkedin_url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 text-sm font-brand font-medium text-repae-blue-500 hover:text-repae-blue-600 dark:text-repae-blue-400 dark:hover:text-repae-blue-300 transition-colors cursor-pointer"
    >
      <font-awesome-icon icon="fa-brands fa-linkedin" />
      <span>Voir le profil</span>
    </a>
  </div>
</template>
