// Donnees mock du programme de fidelite entreprises

export type BadgeNiveau = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface Badge {
  niveau: BadgeNiveau
  nom: string
  pointsMin: number
  pointsMax: number
  couleur: string
  bgColor: string
  textColor: string
  icon: string
  avantages: string[]
}

export interface PointsTransaction {
  id: string
  date: string
  type: 'gain' | 'depense'
  points: number
  description: string
  categorie: string
}

export interface EntrepriseFidelite {
  entreprise_id: string
  points_actuels: number
  badge_actuel: BadgeNiveau
  total_points_gagnes: number
  total_points_depenses: number
  historique: PointsTransaction[]
}

// Configuration des badges
export const badgesConfig: Record<BadgeNiveau, Badge> = {
  bronze: {
    niveau: 'bronze',
    nom: 'Bronze',
    pointsMin: 0,
    pointsMax: 99,
    couleur: '#CD7F32',
    bgColor: 'bg-amber-100 dark:bg-amber-500/20',
    textColor: 'text-amber-700 dark:text-amber-400',
    icon: 'fa-solid fa-medal',
    avantages: [
      'Acces a la plateforme de recrutement',
      'Publication d\'offres d\'emploi et stages',
      'Consultation des profils IT'
    ]
  },
  silver: {
    niveau: 'silver',
    nom: 'Silver',
    pointsMin: 100,
    pointsMax: 249,
    couleur: '#C0C0C0',
    bgColor: 'bg-gray-200 dark:bg-gray-500/20',
    textColor: 'text-gray-700 dark:text-gray-300',
    icon: 'fa-solid fa-medal',
    avantages: [
      'Tous les avantages Bronze',
      'Mise en avant des offres dans les resultats',
      'Badge "Recruteur Silver" sur le profil',
      'Support prioritaire'
    ]
  },
  gold: {
    niveau: 'gold',
    nom: 'Gold',
    pointsMin: 250,
    pointsMax: 499,
    couleur: '#FFD700',
    bgColor: 'bg-yellow-100 dark:bg-yellow-500/20',
    textColor: 'text-yellow-700 dark:text-yellow-400',
    icon: 'fa-solid fa-crown',
    avantages: [
      'Tous les avantages Silver',
      'Acces prioritaire aux CV des talents',
      'Statistiques avancees sur les candidatures',
      'Invitation aux evenements networking',
      'Newsletter exclusive recruteurs'
    ]
  },
  platinum: {
    niveau: 'platinum',
    nom: 'Platinum',
    pointsMin: 500,
    pointsMax: Infinity,
    couleur: '#E5E4E2',
    bgColor: 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-500/20 dark:to-blue-500/20',
    textColor: 'text-purple-700 dark:text-purple-400',
    icon: 'fa-solid fa-gem',
    avantages: [
      'Tous les avantages Gold',
      'Evenements dedies exclusifs',
      'Accompagnement personnalise RH',
      'Visibilite maximale entreprise',
      'Acces aux talents avant publication',
      'Partenariat strategique REPAE'
    ]
  }
}

// Configuration des gains de points
export const pointsGainsConfig = [
  { action: 'Publication d\'une offre d\'emploi', points: 10, icon: 'fa-solid fa-briefcase' },
  { action: 'Publication d\'un stage', points: 10, icon: 'fa-solid fa-graduation-cap' },
  { action: 'Recrutement confirme', points: 50, icon: 'fa-solid fa-user-check' },
  { action: 'Profil IT consulte', points: 1, icon: 'fa-solid fa-eye' },
  { action: 'Reponse a une candidature', points: 5, icon: 'fa-solid fa-reply' },
  { action: 'Participation a un evenement', points: 20, icon: 'fa-solid fa-calendar-check' }
]

// Donnees mock entreprise fidelite
export const entrepriseFideliteMock: EntrepriseFidelite = {
  entreprise_id: '1',
  points_actuels: 285,
  badge_actuel: 'gold',
  total_points_gagnes: 450,
  total_points_depenses: 165,
  historique: [
    {
      id: 'h1',
      date: '2024-01-20',
      type: 'gain',
      points: 50,
      description: 'Recrutement confirme - Jean Kouassi',
      categorie: 'recrutement'
    },
    {
      id: 'h2',
      date: '2024-01-18',
      type: 'gain',
      points: 10,
      description: 'Publication offre - Developpeur Full Stack',
      categorie: 'publication'
    },
    {
      id: 'h3',
      date: '2024-01-15',
      type: 'depense',
      points: 50,
      description: 'Mise en avant offre pendant 7 jours',
      categorie: 'avantage'
    },
    {
      id: 'h4',
      date: '2024-01-12',
      type: 'gain',
      points: 5,
      description: 'Reponse candidature - Marie Kone',
      categorie: 'candidature'
    },
    {
      id: 'h5',
      date: '2024-01-10',
      type: 'gain',
      points: 20,
      description: 'Participation - Forum Emploi IT 2024',
      categorie: 'evenement'
    },
    {
      id: 'h6',
      date: '2024-01-08',
      type: 'gain',
      points: 1,
      description: 'Consultation profil - Aminata Diallo',
      categorie: 'consultation'
    },
    {
      id: 'h7',
      date: '2024-01-08',
      type: 'gain',
      points: 1,
      description: 'Consultation profil - Paul Mensah',
      categorie: 'consultation'
    },
    {
      id: 'h8',
      date: '2024-01-05',
      type: 'depense',
      points: 100,
      description: 'Acces premium CV pendant 1 mois',
      categorie: 'avantage'
    },
    {
      id: 'h9',
      date: '2024-01-03',
      type: 'gain',
      points: 10,
      description: 'Publication stage - Stage Data Science',
      categorie: 'publication'
    },
    {
      id: 'h10',
      date: '2024-01-02',
      type: 'gain',
      points: 5,
      description: 'Reponse candidature - Ibrahim Traore',
      categorie: 'candidature'
    },
    {
      id: 'h11',
      date: '2023-12-28',
      type: 'gain',
      points: 50,
      description: 'Recrutement confirme - Fatou Sylla',
      categorie: 'recrutement'
    },
    {
      id: 'h12',
      date: '2023-12-20',
      type: 'depense',
      points: 15,
      description: 'Badge entreprise premium',
      categorie: 'avantage'
    }
  ]
}

// Fonctions utilitaires
export const getBadgeForPoints = (points: number): Badge => {
  if (points >= badgesConfig.platinum.pointsMin) return badgesConfig.platinum
  if (points >= badgesConfig.gold.pointsMin) return badgesConfig.gold
  if (points >= badgesConfig.silver.pointsMin) return badgesConfig.silver
  return badgesConfig.bronze
}

export const getNextBadge = (currentBadge: BadgeNiveau): Badge | null => {
  const order: BadgeNiveau[] = ['bronze', 'silver', 'gold', 'platinum']
  const currentIndex = order.indexOf(currentBadge)
  if (currentIndex < order.length - 1) {
    return badgesConfig[order[currentIndex + 1]]
  }
  return null
}

export const getProgressToNextBadge = (points: number, currentBadge: BadgeNiveau): number => {
  const nextBadge = getNextBadge(currentBadge)
  if (!nextBadge) return 100 // Already at max

  const currentBadgeConfig = badgesConfig[currentBadge]
  const pointsInCurrentTier = points - currentBadgeConfig.pointsMin
  const pointsNeededForNext = nextBadge.pointsMin - currentBadgeConfig.pointsMin

  return Math.min(100, Math.round((pointsInCurrentTier / pointsNeededForNext) * 100))
}

export const getPointsToNextBadge = (points: number, currentBadge: BadgeNiveau): number => {
  const nextBadge = getNextBadge(currentBadge)
  if (!nextBadge) return 0
  return Math.max(0, nextBadge.pointsMin - points)
}
