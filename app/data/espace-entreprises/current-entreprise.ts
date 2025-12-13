// Donnees mock de l'entreprise connectee (Entreprise partenaire authentifiee)
export interface CurrentEntreprise {
  id: string
  nom: string
  logo_url: string
  secteur_activite: string
  taille: 'startup' | 'pme' | 'grande_entreprise'
  description: string
  site_web: string
  telephone: string
  email_contact: string
  adresse: string
  ville: string
  pays: string
  verifie: boolean
  points_fidelite: number
  badge_recruteur: 'bronze' | 'silver' | 'gold' | 'platinum'
  date_creation: string
}

export const currentEntreprise: CurrentEntreprise = {
  id: '1',
  nom: 'TechCorp CI',
  logo_url: 'https://picsum.photos/seed/techcorp/150/150',
  secteur_activite: 'Technologies de l\'information',
  taille: 'pme',
  description: 'TechCorp CI est une entreprise leader dans le developpement de solutions numeriques en Cote d\'Ivoire. Nous accompagnons les entreprises dans leur transformation digitale.',
  site_web: 'https://techcorp.ci',
  telephone: '+225 27 20 00 00 00',
  email_contact: 'contact@techcorp.ci',
  adresse: '123 Boulevard de la Republique',
  ville: 'Abidjan',
  pays: 'Cote d\'Ivoire',
  verifie: true,
  points_fidelite: 275,
  badge_recruteur: 'gold',
  date_creation: '2020-01-15'
}

// Navigation items pour l'Espace Entreprises
export interface NavItem {
  id: string
  label: string
  href: string
  icon: string
  description?: string
}

export const espaceEntreprisesNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    href: '/espace-entreprises/dashboard',
    icon: 'fa-solid fa-gauge-high',
    description: 'Vue d\'ensemble'
  },
  {
    id: 'offres',
    label: 'Mes offres d\'emploi',
    href: '/espace-entreprises/offres',
    icon: 'fa-solid fa-briefcase',
    description: 'Gerer vos offres'
  },
  {
    id: 'publier-offre',
    label: 'Publier une offre',
    href: '/espace-entreprises/offres/publier',
    icon: 'fa-solid fa-plus-circle',
    description: 'Nouvelle offre d\'emploi'
  },
  {
    id: 'stages',
    label: 'Gestion des stages',
    href: '/espace-entreprises/stages',
    icon: 'fa-solid fa-graduation-cap',
    description: 'Offres de stages'
  },
  {
    id: 'consulter-it',
    label: 'Consulter les IT',
    href: '/espace-entreprises/consulter-it',
    icon: 'fa-solid fa-users',
    description: 'Annuaire des experts'
  },
  {
    id: 'fidelite',
    label: 'Programme fidelite',
    href: '/espace-entreprises/fidelite',
    icon: 'fa-solid fa-star',
    description: 'Vos points et avantages'
  }
]

// Statistiques mock pour le dashboard
export interface DashboardStats {
  offresActives: number
  candidaturesRecues: number
  profilsConsultes: number
  tauxReponse: number
}

export const dashboardStats: DashboardStats = {
  offresActives: 5,
  candidaturesRecues: 47,
  profilsConsultes: 128,
  tauxReponse: 85
}
