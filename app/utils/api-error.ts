/**
 * Extraction du message d'erreur renvoyé par les APIs NestJS.
 *
 * Le corps d'erreur porte `message` sous deux formes :
 *  - une chaîne pour les erreurs métier (« Le contenu doit contenir au moins… ») ;
 *  - un tableau de chaînes pour les échecs de `class-validator` (un par champ).
 *
 * Sans ce traitement, `e?.data?.message` affiché tel quel donne une liste
 * séparée par des virgules, voire rien du tout, et l'utilisateur ne sait pas
 * ce que le serveur lui reproche.
 */
export const apiErrorMessage = (error: any, fallback: string): string => {
  const message = error?.data?.message

  if (Array.isArray(message)) {
    const lines = message.filter((line): line is string => typeof line === 'string' && !!line.trim())
    if (lines.length) return lines.join(' · ')
  }

  if (typeof message === 'string' && message.trim()) return message

  return fallback
}
