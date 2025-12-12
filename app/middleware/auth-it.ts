// Middleware de protection de l'Espace IT
// Simule l'authentification pour le developpement (sera remplace par une vraie auth)

export default defineNuxtRouteMiddleware((to, from) => {
  // Simulation : l'utilisateur est toujours authentifie en mode developpement
  // TODO: Remplacer par une vraie verification d'authentification
  const isAuthenticated = true // Mock: toujours authentifie

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion si non authentifie
    return navigateTo('/connexion', {
      query: {
        redirect: to.fullPath
      }
    })
  }

  // Utilisateur authentifie, autoriser l'acces
})
