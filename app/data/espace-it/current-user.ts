// Donnees mock de l'utilisateur connecte (IT authentifie - Cote d'Ivoire - ESATIC)
export interface CurrentUser {
  id: string
  prenom: string
  nom: string
  email: string
  photo_url: string
  poste_actuel: string
  entreprise_actuelle: string
  promotion: number
  pays: string
  ville: string
  disponibilite: 'disponible' | 'en_poste' | 'ouvert_opportunites'
  linkedin_url?: string
}

export const currentUser: CurrentUser = {
  id: '1',
  prenom: 'Kouame',
  nom: 'Yao',
  email: 'kouame.yao@email.ci',
  photo_url: 'https://i.pravatar.cc/150?u=kouame',
  poste_actuel: 'Developpeur Full Stack Senior',
  entreprise_actuelle: 'MTN Cote d\'Ivoire',
  promotion: 2018,
  pays: 'Cote d\'Ivoire',
  ville: 'Abidjan',
  disponibilite: 'ouvert_opportunites',
  linkedin_url: 'https://linkedin.com/in/kouameyao'
}

// Navigation items pour l'Espace IT
export interface NavItem {
  id: string
  label: string
  href: string
  icon: string
  description?: string
}

export const espaceItNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    href: '/espace-it',
    icon: 'fa-solid fa-gauge-high',
    description: 'Vue d\'ensemble'
  },
  {
    id: 'profil',
    label: 'Mon profil',
    href: '/espace-it/profil',
    icon: 'fa-solid fa-user',
    description: 'Gerer votre profil'
  },
  {
    id: 'annuaire',
    label: 'Annuaire des IT',
    href: '/espace-it/annuaire',
    icon: 'fa-solid fa-users',
    description: 'Trouver des alumni'
  },
  {
    id: 'entreprises',
    label: 'Entreprises des IT',
    href: '/espace-it/entreprises',
    icon: 'fa-solid fa-building',
    description: 'Entreprises creees par les alumni'
  },
  {
    id: 'offres',
    label: 'Offres d\'emploi',
    href: '/espace-it/offres',
    icon: 'fa-solid fa-briefcase',
    description: 'Consulter les offres'
  },
  {
    id: 'publier',
    label: 'Publier une offre',
    href: '/espace-it/offres/publier',
    icon: 'fa-solid fa-plus-circle',
    description: 'Proposer un emploi'
  },
  {
    id: 'candidatures',
    label: 'Mes candidatures',
    href: '/espace-it/mes-candidatures',
    icon: 'fa-solid fa-paper-plane',
    description: 'Suivre mes candidatures'
  },
  {
    id: 'forum',
    label: 'Forum d\'entraide',
    href: '/espace-it/forum',
    icon: 'fa-solid fa-comments',
    description: 'Poser vos questions'
  },
  {
    id: 'parametres',
    label: 'Parametres',
    href: '/espace-it/parametres',
    icon: 'fa-solid fa-cog',
    description: 'Gerer vos preferences'
  }
]
