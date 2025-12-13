<script setup lang="ts">
// Redirection vers le dashboard
definePageMeta({
  layout: 'espace-entreprises',
  middleware: ['auth-entreprise']
})

// Rediriger automatiquement vers le dashboard
navigateTo('/espace-entreprises/dashboard')
</script>

<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <div class="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
      <p class="text-repae-gray-500 dark:text-repae-gray-400 font-brand">
        Redirection vers le tableau de bord...
      </p>
    </div>
  </div>
</template>
