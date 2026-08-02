// Composable centralise pour la session administrateur (token JWT)
// Responsabilites :
//  - Lecture du token et construction des en-tetes Authorization
//  - Verification de l'expiration du JWT (claim `exp`)
//  - Deconnexion + redirection vers la page de connexion
//  - Gestion automatique des reponses 401/403 (session expiree / invalide)

export function useAdminAuth() {
  const getToken = (): string | null => {
    return import.meta.client ? localStorage.getItem('admin-token') : null
  }

  // Décodage et contrôle d'expiration partagés avec l'espace IT (`app/utils/jwt.ts`)
  const decodeToken = (token: string): JwtPayload | null => decodeJwtPayload(token)

  const isTokenExpired = (): boolean => isJwtExpired(getToken())

  // Construit l'en-tete Authorization pour les routes protegees
  const getAuthHeaders = (): Record<string, string> => {
    const token = getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Efface la session admin du localStorage
  const clearSession = () => {
    if (!import.meta.client) return
    localStorage.removeItem('admin-auth')
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-user')
  }

  // Deconnecte et redirige vers la page de connexion admin.
  // `redirect` : chemin a rejoindre apres reconnexion. `expired` : affiche le message de session expiree.
  const logout = (opts?: { redirect?: string; expired?: boolean }) => {
    clearSession()
    const query: Record<string, string> = {}
    if (opts?.redirect && opts.redirect !== '/connexion-admin') query.redirect = opts.redirect
    if (opts?.expired) query.expired = '1'
    return navigateTo({ path: '/connexion-admin', query })
  }

  // A appeler dans un bloc catch. Si l'erreur est une 401/403, deconnecte +
  // redirige vers la connexion (session expiree) et retourne true. Sinon false.
  const handleAuthError = (error: any): boolean => {
    const status = error?.response?.status ?? error?.statusCode ?? error?.status
    if (status === 401 || status === 403) {
      const route = useRoute()
      logout({ redirect: route.fullPath, expired: true })
      return true
    }
    return false
  }

  return {
    getToken,
    decodeToken,
    isTokenExpired,
    getAuthHeaders,
    clearSession,
    logout,
    handleAuthError,
  }
}
