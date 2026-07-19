// Composable centralise pour la session administrateur (token JWT)
// Responsabilites :
//  - Lecture du token et construction des en-tetes Authorization
//  - Verification de l'expiration du JWT (claim `exp`)
//  - Deconnexion + redirection vers la page de connexion
//  - Gestion automatique des reponses 401/403 (session expiree / invalide)

interface JwtPayload {
  sub?: string
  email?: string
  role?: string
  exp?: number
  iat?: number
}

export function useAdminAuth() {
  const getToken = (): string | null => {
    return import.meta.client ? localStorage.getItem('admin-token') : null
  }

  // Decode la partie payload d'un JWT (base64url) sans librairie externe
  const decodeToken = (token: string): JwtPayload | null => {
    try {
      const payload = token.split('.')[1]
      if (!payload) return null
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(json) as JwtPayload
    } catch {
      return null
    }
  }

  // true si le token est absent ou expire (marge de 10s pour la latence reseau).
  // Si le token n'expose pas de claim `exp`, on laisse le backend trancher (=> false).
  const isTokenExpired = (): boolean => {
    const token = getToken()
    if (!token) return true
    const payload = decodeToken(token)
    if (!payload?.exp) return false
    const nowSec = Math.floor(Date.now() / 1000)
    return payload.exp <= nowSec + 10
  }

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
