/**
 * Règles de publication — alignées sur le domaine du backend
 * (content-services/src/domain/value-objects/news/news-content.vo.ts).
 *
 * Un brouillon accepte un contenu vide, mais `validateForPublication()` exige
 * au moins 10 caractères pour passer en PUBLISHED. Sans ce contrôle côté
 * client, choisir « Publier » avec un contenu trop court échoue en 400 alors
 * que le même contenu s'enregistre sans problème en brouillon — le formulaire
 * semble alors refuser la publication sans raison visible.
 *
 * Le seuil porte sur le HTML produit par l'éditeur (balises comprises), comme
 * côté serveur où la mesure est faite après sanitisation.
 */
export const MIN_PUBLISHABLE_CONTENT_LENGTH = 10

export const isPublishableContent = (content: string): boolean =>
  content.trim().length >= MIN_PUBLISHABLE_CONTENT_LENGTH
