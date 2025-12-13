<script setup lang="ts">
const props = defineProps<{
  email?: string
  telephone?: string
  linkedin?: string
  github?: string
  portfolio?: string
}>()

const hasContactInfo = computed(() => {
  return props.email || props.telephone || props.linkedin || props.github || props.portfolio
})
</script>

<template>
  <div class="bg-white dark:bg-repae-gray-800 rounded-xl border border-gray-200 dark:border-repae-gray-700 p-6">
    <h2 class="text-lg font-semibold font-brand text-repae-gray-900 dark:text-white mb-6 flex items-center gap-2">
      <font-awesome-icon icon="fa-solid fa-address-book" class="text-emerald-500" />
      Coordonnees
    </h2>

    <div v-if="hasContactInfo" class="space-y-4">
      <!-- Email -->
      <a
        v-if="email"
        :href="`mailto:${email}`"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors group"
      >
        <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-envelope" class="text-emerald-500" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Email</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
            {{ email }}
          </p>
        </div>
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-repae-gray-400 group-hover:text-emerald-500 text-xs" />
      </a>

      <!-- Telephone -->
      <a
        v-if="telephone"
        :href="`tel:${telephone}`"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors group"
      >
        <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-phone" class="text-blue-500" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Telephone</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            {{ telephone }}
          </p>
        </div>
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-repae-gray-400 group-hover:text-emerald-500 text-xs" />
      </a>

      <!-- LinkedIn -->
      <a
        v-if="linkedin"
        :href="linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors group"
      >
        <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-brands fa-linkedin" class="text-blue-600" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">LinkedIn</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-blue-600 truncate">
            Voir le profil
          </p>
        </div>
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-repae-gray-400 group-hover:text-blue-500 text-xs" />
      </a>

      <!-- GitHub -->
      <a
        v-if="github"
        :href="github"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-repae-gray-700 transition-colors group"
      >
        <div class="w-10 h-10 bg-gray-200 dark:bg-repae-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-brands fa-github" class="text-repae-gray-900 dark:text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">GitHub</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-repae-gray-700 dark:group-hover:text-repae-gray-300 truncate">
            Voir le profil
          </p>
        </div>
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-repae-gray-400 group-hover:text-repae-gray-600 text-xs" />
      </a>

      <!-- Portfolio -->
      <a
        v-if="portfolio"
        :href="portfolio"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-repae-gray-900 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors group"
      >
        <div class="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <font-awesome-icon icon="fa-solid fa-globe" class="text-purple-500" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs text-repae-gray-500 dark:text-repae-gray-400">Portfolio</p>
          <p class="text-sm font-medium text-repae-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">
            Voir le site
          </p>
        </div>
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-repae-gray-400 group-hover:text-purple-500 text-xs" />
      </a>
    </div>

    <!-- No contact info -->
    <div v-else class="text-center py-6">
      <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-repae-gray-700 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-lock" class="text-repae-gray-400" />
      </div>
      <p class="text-sm text-repae-gray-500 dark:text-repae-gray-400">
        Coordonnees non visibles
      </p>
      <p class="text-xs text-repae-gray-400 mt-1">
        Ce profil a choisi de ne pas partager ses coordonnees
      </p>
    </div>
  </div>
</template>
