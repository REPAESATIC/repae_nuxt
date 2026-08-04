/**
 * Règles de publication — dérivées du domaine du backend
 * (content-services/src/domain/value-objects/news/news-content.vo.ts).
 *
 * Un brouillon accepte un contenu vide, mais `validateForPublication()` exige
 * au moins 10 caractères pour passer en PUBLISHED. Sans contrôle côté client,
 * choisir « Publier » avec un contenu trop court échoue en 400 alors que le
 * même contenu s'enregistre sans problème en brouillon.
 *
 * Le serveur compte les caractères du HTML, balises comprises : `<p>Ok</p>` ne
 * fait que 9 caractères pour 2 caractères visibles. Impossible à expliquer dans
 * une interface, et impossible à compter pour celui qui rédige. On applique
 * donc le seuil au **texte visible**, ce qui reste toujours plus strict que le
 * serveur — 10 caractères de texte pèsent au minimum 17 caractères une fois
 * enrobés dans un `<p>`, la validation distante est donc toujours satisfaite.
 */
export const MIN_PUBLISHABLE_CONTENT_LENGTH = 10

/** Nombre de caractères réellement lisibles dans le HTML de l'éditeur. */
export const contentTextLength = (content: string): number =>
  content
    .replace(/<[^>]*>/g, ' ') // les balises séparent les mots, elles ne les collent pas
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim().length

export const isPublishableContent = (content: string): boolean =>
  contentTextLength(content) >= MIN_PUBLISHABLE_CONTENT_LENGTH
