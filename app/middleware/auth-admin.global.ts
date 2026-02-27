// Middleware global de protection de l'Administration
// Protege automatiquement toutes les routes /admin/**
// Simule l'authentification pour le developpement (sera remplace par une vraie auth)

export default defineNuxtRouteMiddleware((to, from) => {
  // Ne s'applique qu'aux routes admin
  if (!to.path.startsWith('/admin')) {
    return
  }

  // Cote serveur (SSR), pas d'acces a localStorage — skip la verification
  if (!import.meta.client) {
    return
  }

  // TODO: Remplacer par une vraie verification d'authentification (JWT + role ADMIN)
  const isAuthenticated = localStorage.getItem('admin-auth') === 'true'

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion admin si non authentifie
    return navigateTo('/connexion-admin', {
      query: {
        redirect: to.fullPath
      }
    })
  }

  // Admin authentifie, autoriser l'acces
})
