// Donnees mock des experiences professionnelles de l'utilisateur (Cote d'Ivoire)

export interface Experience {
  id: string
  poste: string
  entreprise: string
  logo_url?: string
  lieu: string
  type_contrat: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Alternance'
  date_debut: string
  date_fin?: string
  en_cours?: boolean
  description: string
  competences?: string[]
}

export const experiences: Experience[] = [
  {
    id: '1',
    poste: 'Developpeur Full Stack Senior',
    entreprise: 'MTN Cote d\'Ivoire',
    logo_url: 'https://picsum.photos/100/100?random=10',
    lieu: 'Abidjan, Cote d\'Ivoire',
    type_contrat: 'CDI',
    date_debut: '2021-03',
    en_cours: true,
    description: 'Responsable du developpement et de la maintenance des applications web et mobile money de l\'entreprise. Lead technique d\'une equipe de 5 developpeurs. Mise en place de l\'architecture microservices et CI/CD.',
    competences: ['Vue.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: '2',
    poste: 'Developpeur Full Stack',
    entreprise: 'Orange Cote d\'Ivoire',
    logo_url: 'https://picsum.photos/100/100?random=11',
    lieu: 'Abidjan, Cote d\'Ivoire',
    type_contrat: 'CDI',
    date_debut: '2019-01',
    date_fin: '2021-02',
    description: 'Developpement d\'applications web et mobiles pour Orange Money et les services digitaux. Participation a la conception et a l\'implementation de solutions fintech pour l\'Afrique de l\'Ouest.',
    competences: ['React', 'React Native', 'Node.js', 'MongoDB']
  },
  {
    id: '3',
    poste: 'Developpeur Web Junior',
    entreprise: 'Sifca Group',
    logo_url: 'https://picsum.photos/100/100?random=12',
    lieu: 'Abidjan, Cote d\'Ivoire',
    type_contrat: 'CDD',
    date_debut: '2018-08',
    date_fin: '2018-12',
    description: 'Premier emploi apres l\'obtention du diplome a l\'ESATIC. Developpement d\'outils internes de gestion pour le groupe agro-industriel.',
    competences: ['PHP', 'Laravel', 'MySQL', 'JavaScript']
  },
  {
    id: '4',
    poste: 'Stagiaire Developpeur',
    entreprise: 'ARTCI',
    logo_url: 'https://picsum.photos/100/100?random=13',
    lieu: 'Abidjan, Cote d\'Ivoire',
    type_contrat: 'Stage',
    date_debut: '2017-06',
    date_fin: '2017-09',
    description: 'Stage de fin d\'etudes a l\'Autorite de Regulation des Telecommunications. Participation au developpement d\'un portail de gestion des plaintes consommateurs.',
    competences: ['Java', 'Spring Boot', 'Oracle']
  }
]

// Helper pour formater les dates
export const formatExperienceDates = (debut: string, fin?: string, enCours?: boolean): string => {
  const formatDate = (date: string) => {
    const [year, month] = date.split('-')
    const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[parseInt(month) - 1]} ${year}`
  }

  const debutFormatted = formatDate(debut)

  if (enCours) {
    return `${debutFormatted} - Present`
  }

  if (fin) {
    return `${debutFormatted} - ${formatDate(fin)}`
  }

  return debutFormatted
}

// Helper pour calculer la duree
export const calculateDuration = (debut: string, fin?: string, enCours?: boolean): string => {
  const startDate = new Date(debut + '-01')
  const endDate = enCours ? new Date() : (fin ? new Date(fin + '-01') : new Date())

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years > 0 && remainingMonths > 0) {
    return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`
  } else if (years > 0) {
    return `${years} an${years > 1 ? 's' : ''}`
  } else {
    return `${remainingMonths} mois`
  }
}

// Config pour les types de contrat
export const contratConfig: Record<string, { label: string; color: string }> = {
  CDI: { label: 'CDI', color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' },
  CDD: { label: 'CDD', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' },
  Stage: { label: 'Stage', color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' },
  Freelance: { label: 'Freelance', color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' },
  Alternance: { label: 'Alternance', color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' }
}
