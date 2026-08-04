// Lecture des JWT côté client (espaces Admin et IT).
//
// Aucune vérification de signature ici : seul le backend fait autorité. Ces fonctions servent
// uniquement à détecter en amont un token périmé, pour rediriger vers la connexion au lieu de
// laisser l'utilisateur sur une interface qui répondra 401 à chaque appel.

export interface JwtPayload {
  sub?: string
  email?: string
  role?: string
  exp?: number
  iat?: number
}

/** Décode la partie payload d'un JWT (base64url), sans librairie externe. */
export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

/**
 * Vrai si le token est absent, illisible ou expiré (marge de 10 s pour la latence réseau).
 * Un token sans claim `exp` est considéré valide : c'est au backend de trancher.
 */
export function isJwtExpired(token: string | null): boolean {
  if (!token) return true
  const payload = decodeJwtPayload(token)
  if (!payload) return true
  if (!payload.exp) return false
  return payload.exp <= Math.floor(Date.now() / 1000) + 10
}
