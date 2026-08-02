// Composable centralisé pour la session de l'Espace IT (token JWT).
//
// Pendant du composable `useAdminAuth` pour l'espace Admin. Il comble un écart de traitement :
// l'espace IT ne vérifiait que le drapeau `it-auth`, qui persiste indéfiniment dans le
// localStorage, alors que le token expire au bout d'une heure. L'utilisateur franchissait donc
// le middleware et se croyait connecté, pendant que chaque appel API répondait
// « Vous devez être authentifié pour accéder à cette ressource. » (401).

export function useItAuth() {
  const getToken = (): string | null => {
    return import.meta.client ? localStorage.getItem('it-token') : null
  }

  /** Vrai si le token est absent ou expiré. */
  const isTokenExpired = (): boolean => isJwtExpired(getToken())

  /** Vrai si une session IT exploitable existe (drapeau posé ET token encore valide). */
  const isAuthenticated = (): boolean => {
    if (!import.meta.client) return false
    return localStorage.getItem('it-auth') === 'true' && !isTokenExpired()
  }

  const getAuthHeaders = (): Record<string, string> => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const clearSession = () => {
    if (!import.meta.client) return
    localStorage.removeItem('it-auth')
    localStorage.removeItem('it-token')
    localStorage.removeItem('it-user')
    localStorage.removeItem('it-profile-incomplete')
  }

  /**
   * Déconnecte et renvoie vers la connexion IT.
   * `redirect` : chemin à rejoindre après reconnexion. `expired` : affiche le message de session expirée.
   */
  const logout = (opts?: { redirect?: string; expired?: boolean }) => {
    clearSession()
    const query: Record<string, string> = {}
    if (opts?.redirect && opts.redirect !== '/connexion-it') query.redirect = opts.redirect
    if (opts?.expired) query.expired = '1'
    return navigateTo({ path: '/connexion-it', query })
  }

  /**
   * À appeler dans un bloc catch. Si l'erreur est un 401/403, déconnecte et redirige vers la
   * connexion, puis retourne true. Sinon retourne false et l'appelant gère l'erreur.
   */
  const handleAuthError = (error: any): boolean => {
    const status = error?.response?.status ?? error?.statusCode ?? error?.status
    if (status === 401 || status === 403) {
      const route = useRoute()
      logout({ redirect: route.fullPath, expired: true })
      return true
    }
    return false
  }

  return { getToken, isTokenExpired, isAuthenticated, getAuthHeaders, clearSession, logout, handleAuthError }
}
