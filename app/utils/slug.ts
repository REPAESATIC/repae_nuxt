/**
 * Utilitaires de slug — alignés sur le value object `Slug` du backend
 * (content-services/src/domain/value-objects/shared/slug.vo.ts).
 *
 * Le backend refuse tout slug ne respectant pas /^[a-z0-9]+(?:-[a-z0-9]+)*$/
 * (majuscules, accents, espaces, tirets en début/fin ou consécutifs).
 * Ces helpers garantissent qu'on ne lui envoie jamais une valeur invalide.
 */

/** Slug final, strictement conforme à la règle backend. */
export const toSlug = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // caractères non autorisés
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Normalisation « douce » à appliquer pendant la saisie : met en minuscules et
 * retire les caractères interdits, mais conserve le tiret en cours de frappe
 * (« ma- » reste « ma- ») pour ne pas bloquer l'utilisateur.
 * Le nettoyage complet se fait ensuite via `toSlug` (au blur et à l'envoi).
 */
export const sanitizeSlugInput = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
