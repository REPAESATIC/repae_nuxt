// Middleware global de protection de l'Administration
// Protege automatiquement toutes les routes /admin/**
// Verifie la presence ET la validite (expiration) du token JWT admin.

export default defineNuxtRouteMiddleware((to, from) => {
  // Ne s'applique qu'aux routes admin
  if (!to.path.startsWith('/admin')) {
    return
  }

  // Cote serveur (SSR), pas d'acces a localStorage — skip la verification
  if (!import.meta.client) {
    return
  }

  const { isTokenExpired, clearSession } = useAdminAuth()

  const isAuthenticated = localStorage.getItem('admin-auth') === 'true'

  // Non connecte -> page de connexion
  if (!isAuthenticated) {
    return navigateTo('/connexion-admin', {
      query: { redirect: to.fullPath },
    })
  }

  // Connecte mais token expire -> on nettoie la session et on redirige
  // (evite de laisser l'admin sur l'interface avec un token mort = erreurs "unauthorised")
  if (isTokenExpired()) {
    clearSession()
    return navigateTo('/connexion-admin', {
      query: { redirect: to.fullPath, expired: '1' },
    })
  }

  // Admin authentifie avec token valide, autoriser l'acces
})
