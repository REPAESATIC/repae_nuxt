import type { CurrentEntreprise } from '~/data/espace-entreprises/current-entreprise'

export type { CurrentEntreprise }

// Secteurs d'activite disponibles
export const secteursActivite: string[] = [
  'Technologies de l\'information',
  'Telecommunications',
  'Finance & Banque',
  'Energie',
  'Commerce & Distribution',
  'Conseil & Audit',
  'Sante',
  'Education',
]

export const entreprisesMock: CurrentEntreprise[] = []

export const findEntrepriseById = (id: string): CurrentEntreprise | undefined => {
  return entreprisesMock.find(e => e.id === id)
}

export const getEntreprisesPaginated = (params: {
  search?: string
  verifie?: boolean | undefined
  taille?: string
  secteur?: string
  page: number
  limit: number
}): { data: CurrentEntreprise[]; total: number; page: number; limit: number } => {
  let filtered = [...entreprisesMock]

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(e =>
      e.nom.toLowerCase().includes(q)
      || e.email_contact.toLowerCase().includes(q)
      || e.secteur_activite.toLowerCase().includes(q),
    )
  }
  if (params.verifie !== undefined) {
    filtered = filtered.filter(e => e.verifie === params.verifie)
  }
  if (params.taille) {
    filtered = filtered.filter(e => e.taille === params.taille)
  }
  if (params.secteur) {
    filtered = filtered.filter(e => e.secteur_activite === params.secteur)
  }

  const total = filtered.length
  const start = (params.page - 1) * params.limit
  const data = filtered.slice(start, start + params.limit)

  return { data, total, page: params.page, limit: params.limit }
}
