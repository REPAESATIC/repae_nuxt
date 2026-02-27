// Middleware global de protection de l'Espace IT (Alumni)
// Protege automatiquement toutes les routes /espace-it/**
// Verifie l'authentification via JWT stocke dans localStorage

export default defineNuxtRouteMiddleware((to, from) => {
  // Ne s'applique qu'aux routes espace-it
  if (!to.path.startsWith('/espace-it')) {
    return
  }

  // Cote serveur (SSR), pas d'acces a localStorage — skip la verification
  if (!import.meta.client) {
    return
  }

  const isAuthenticated = localStorage.getItem('it-auth') === 'true'

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion IT si non authentifie
    return navigateTo('/connexion-it', {
      query: {
        redirect: to.fullPath
      }
    })
  }
})
