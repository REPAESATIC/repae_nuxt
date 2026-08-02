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

  const { isTokenExpired, clearSession } = useItAuth()

  const isAuthenticated = localStorage.getItem('it-auth') === 'true'

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion IT si non authentifie.
    // Le `query` doit figurer dans l'objet de destination : passe en second argument
    // (options de navigation), il etait silencieusement ignore et le `redirect` perdu.
    return navigateTo({
      path: '/connexion-it',
      query: { redirect: to.fullPath },
    })
  }

  // Connecte mais token expire -> on nettoie la session et on redirige.
  // `it-auth` persiste indefiniment dans le localStorage alors que le token ne vit qu'une heure :
  // sans ce controle, l'utilisateur restait sur l'interface avec un token mort et chaque appel
  // repondait 401 « Vous devez etre authentifie pour acceder a cette ressource. »
  if (isTokenExpired()) {
    clearSession()
    return navigateTo({
      path: '/connexion-it',
      query: { redirect: to.fullPath, expired: '1' },
    })
  }

  // Bloquer l'acces aux autres pages si le profil Alumni n'est pas complete
  const isProfileIncomplete = localStorage.getItem('it-profile-incomplete') === 'true'

  if (isProfileIncomplete && to.path !== '/espace-it/completer-profil') {
    return navigateTo('/espace-it/completer-profil')
  }
})
