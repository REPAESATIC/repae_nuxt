// Export centralisé des données de l'association

export * from './presentation'
export * from './bureau'
export * from './adhesion'
export * from './documents'

// Navigation de la section Association
export const associationNavItems = [
  {
    id: 'presentation',
    label: 'Présentation',
    href: '/association/presentation',
    icon: 'fa-solid fa-users',
    description: 'Découvrez l\'histoire et les objectifs du REPAE'
  },
  {
    id: 'bureau',
    label: 'Le Bureau',
    href: '/association/bureau',
    icon: 'fa-solid fa-user-tie',
    description: 'Rencontrez les membres du bureau exécutif'
  },
  {
    id: 'adhesion',
    label: 'Adhésion',
    href: '/association/adhesion',
    icon: 'fa-solid fa-handshake',
    description: 'Rejoignez le réseau des alumni'
  },
  {
    id: 'statuts',
    label: 'Statuts',
    href: '/association/statuts',
    icon: 'fa-solid fa-file-alt',
    description: 'Consultez les statuts officiels'
  },
  {
    id: 'reglement',
    label: 'Règlement',
    href: '/association/reglement',
    icon: 'fa-solid fa-gavel',
    description: 'Consultez le règlement intérieur'
  }
]
