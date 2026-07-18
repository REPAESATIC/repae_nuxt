// Données mock des candidatures pour l'Espace IT

export type StatutCandidature = 'en_attente' | 'vue' | 'entretien' | 'acceptee' | 'refusee' | 'retiree'

export interface Candidature {
  id: string
  offre: {
    id: string
    titre: string
    entreprise: {
      id: string
      nom: string
      logo_url: string
      ville: string
    }
    type_contrat: string
  }
  date_candidature: string
  statut: StatutCandidature
  message: string
  cv_url?: string
  lettre_motivation_url?: string
  date_mise_a_jour: string
  notes_recruteur?: string
  date_entretien?: string
}

// Configuration des statuts
export const statutConfig: Record<StatutCandidature, { label: string; color: string; icon: string; description: string }> = {
  en_attente: {
    label: 'En attente',
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    icon: 'fa-solid fa-clock',
    description: 'Votre candidature est en cours d\'examen'
  },
  vue: {
    label: 'Vue',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-eye',
    description: 'Le recruteur a consulté votre candidature'
  },
  entretien: {
    label: 'Entretien',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    icon: 'fa-solid fa-calendar-check',
    description: 'Un entretien a été planifié'
  },
  acceptee: {
    label: 'Acceptée',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    icon: 'fa-solid fa-check-circle',
    description: 'Félicitations ! Votre candidature a été retenue'
  },
  refusee: {
    label: 'Refusée',
    color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    icon: 'fa-solid fa-times-circle',
    description: 'Votre candidature n\'a pas été retenue'
  },
  retiree: {
    label: 'Retirée',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    icon: 'fa-solid fa-ban',
    description: 'Vous avez retiré votre candidature'
  }
}

// Liste des candidatures mock (pour l'utilisateur courant)
export const candidaturesList: Candidature[] = [
  {
    id: '1',
    offre: {
      id: '1',
      titre: 'Développeur Full Stack Senior',
      entreprise: {
        id: '1',
        nom: 'AfriPay Solutions',
        logo_url: 'https://picsum.photos/seed/afripay/200',
        ville: 'Abidjan'
      },
      type_contrat: 'CDI'
    },
    date_candidature: '2024-12-05',
    statut: 'entretien',
    message: 'Je suis très intéressé par ce poste qui correspond parfaitement à mon profil. Fort de 5 ans d\'expérience en développement Full Stack, j\'ai travaillé sur des projets similaires impliquant des systèmes de paiement et des architectures microservices.',
    cv_url: '/uploads/cv_kouame_yao.pdf',
    lettre_motivation_url: '/uploads/lm_kouame_yao.pdf',
    date_mise_a_jour: '2024-12-10',
    notes_recruteur: 'Profil intéressant, expérience pertinente',
    date_entretien: '2024-12-15T10:00:00'
  },
  {
    id: '2',
    offre: {
      id: '3',
      titre: 'Ingénieur DevOps',
      entreprise: {
        id: '5',
        nom: 'DevHub Africa',
        logo_url: 'https://picsum.photos/seed/devhub/200',
        ville: 'Abidjan'
      },
      type_contrat: 'CDI'
    },
    date_candidature: '2024-12-02',
    statut: 'vue',
    message: 'Passionné par l\'automatisation et l\'infrastructure cloud, je souhaite mettre mes compétences Kubernetes et Terraform au service de votre équipe.',
    cv_url: '/uploads/cv_kouame_yao.pdf',
    date_mise_a_jour: '2024-12-08'
  },
  {
    id: '3',
    offre: {
      id: '8',
      titre: 'Développeur Backend Python',
      entreprise: {
        id: '2',
        nom: 'EduTech Afrique',
        logo_url: 'https://picsum.photos/seed/edutech/200',
        ville: 'Dakar'
      },
      type_contrat: 'CDI'
    },
    date_candidature: '2024-11-28',
    statut: 'refusee',
    message: 'Je suis motivé par la mission éducative de votre entreprise et souhaite contribuer au développement de votre plateforme d\'e-learning.',
    cv_url: '/uploads/cv_kouame_yao.pdf',
    date_mise_a_jour: '2024-12-06',
    notes_recruteur: 'Profil intéressant mais nous recherchons plus d\'expérience en Python/Django'
  },
  {
    id: '4',
    offre: {
      id: '10',
      titre: 'Architecte Cloud Solutions',
      entreprise: {
        id: '5',
        nom: 'DevHub Africa',
        logo_url: 'https://picsum.photos/seed/devhub/200',
        ville: 'Lagos'
      },
      type_contrat: 'CDI'
    },
    date_candidature: '2024-12-08',
    statut: 'en_attente',
    message: 'Avec mon expérience en architecture cloud et mes certifications AWS, je suis convaincu de pouvoir apporter une valeur ajoutée significative à votre équipe.',
    cv_url: '/uploads/cv_kouame_yao.pdf',
    lettre_motivation_url: '/uploads/lm_kouame_yao.pdf',
    date_mise_a_jour: '2024-12-08'
  },
  {
    id: '5',
    offre: {
      id: '4',
      titre: 'Développeur Mobile React Native',
      entreprise: {
        id: '4',
        nom: 'SantePlus Digital',
        logo_url: 'https://picsum.photos/seed/santeplus/200',
        ville: 'Abidjan'
      },
      type_contrat: 'CDD'
    },
    date_candidature: '2024-11-20',
    statut: 'acceptee',
    message: 'Le domaine de la e-santé me passionne et je souhaite contribuer à améliorer l\'accès aux soins grâce à la technologie.',
    cv_url: '/uploads/cv_kouame_yao.pdf',
    date_mise_a_jour: '2024-12-01',
    notes_recruteur: 'Excellent profil, expérience React Native solide. Proposition envoyée.'
  }
]

// Statistiques des candidatures
export const getCandidatureStats = (candidatures: Candidature[]) => {
  const stats = {
    total: candidatures.length,
    en_attente: 0,
    vue: 0,
    entretien: 0,
    acceptee: 0,
    refusee: 0,
    retiree: 0
  }

  candidatures.forEach(c => {
    stats[c.statut]++
  })

  return stats
}

// Filtrage des candidatures
export const filterCandidatures = (
  candidatures: Candidature[],
  filters: {
    statut?: StatutCandidature | null
    search?: string
  }
): Candidature[] => {
  return candidatures.filter(candidature => {
    // Filtre par statut
    if (filters.statut && candidature.statut !== filters.statut) {
      return false
    }

    // Filtre par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchTitre = candidature.offre.titre.toLowerCase().includes(searchLower)
      const matchEntreprise = candidature.offre.entreprise.nom.toLowerCase().includes(searchLower)
      if (!matchTitre && !matchEntreprise) {
        return false
      }
    }

    return true
  })
}

// Formatage de la date
export const formatDateCandidature = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Formatage de la date et heure (pour entretien)
export const formatDateTimeEntretien = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Calcul du temps écoulé
export const getTempsDepuisCandidature = (dateStr: string): string => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Aujourd\'hui'
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`
  return `Il y a ${Math.floor(diffDays / 30)} mois`
}
