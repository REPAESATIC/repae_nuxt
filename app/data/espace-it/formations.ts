// Données mock des formations de l'utilisateur (Côte d'Ivoire - ESATIC)

export interface Formation {
  id: string
  diplome: string
  etablissement: string
  lieu: string
  date_debut: string
  date_fin?: string
  en_cours?: boolean
  description?: string
  mention?: string
}

export const formations: Formation[] = [
  {
    id: '1',
    diplome: 'Diplôme d\'Ingénieur en Informatique',
    etablissement: 'ESATIC - École Supérieure Africaine des TIC',
    lieu: 'Abidjan, Côte d\'Ivoire',
    date_debut: '2013-09',
    date_fin: '2018-07',
    description: 'Spécialisation en Génie Logiciel et Systèmes d\'Information. Projet de fin d\'études sur le développement d\'une plateforme de mobile money pour les zones rurales.',
    mention: 'Bien'
  },
  {
    id: '2',
    diplome: 'Baccalauréat Série C',
    etablissement: 'Lycée Classique d\'Abidjan',
    lieu: 'Abidjan, Côte d\'Ivoire',
    date_debut: '2010-09',
    date_fin: '2013-06',
    mention: 'Assez Bien'
  },
  {
    id: '3',
    diplome: 'Certification AWS Solutions Architect',
    etablissement: 'Amazon Web Services',
    lieu: 'En ligne',
    date_debut: '2022-03',
    date_fin: '2022-05',
    description: 'Certification professionnelle validant les compétences en architecture cloud AWS.'
  },
  {
    id: '4',
    diplome: 'Formation Continue - DevOps & Cloud',
    etablissement: 'ESATIC - Formation Continue',
    lieu: 'Abidjan, Côte d\'Ivoire',
    date_debut: '2021-01',
    date_fin: '2021-06',
    description: 'Programme de perfectionnement en pratiques DevOps, containerisation et déploiement cloud.'
  }
]

// Helper pour formater les dates
export const formatDateRange = (debut: string, fin?: string, enCours?: boolean): string => {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    return `${months[parseInt(month) - 1]} ${year}`
  }

  const debutFormatted = formatDate(debut)

  if (enCours) {
    return `${debutFormatted} - Présent`
  }

  if (fin) {
    return `${debutFormatted} - ${formatDate(fin)}`
  }

  return debutFormatted
}
