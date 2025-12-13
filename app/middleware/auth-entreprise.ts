// Middleware de protection de l'Espace Entreprises
// Simule l'authentification pour le developpement (sera remplace par une vraie auth)

export default defineNuxtRouteMiddleware((to, from) => {
  // Exclure la page d'inscription qui est publique
  if (to.path === '/espace-entreprises/inscription') {
    return
  }

  // Simulation : l'entreprise est toujours authentifiee en mode developpement
  // TODO: Remplacer par une vraie verification d'authentification
  const isAuthenticated = true // Mock: toujours authentifie

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion si non authentifie
    return navigateTo('/connexion-entreprise', {
      query: {
        redirect: to.fullPath
      }
    })
  }

  // Entreprise authentifiee, autoriser l'acces
})
