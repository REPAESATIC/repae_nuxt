// Export centralise des donnees de l'association

export * from './presentation'
export * from './bureau'
export * from './adhesion'
export * from './documents'

// Navigation de la section Association
export const associationNavItems = [
  {
    id: 'presentation',
    label: 'Presentation',
    href: '/association/presentation',
    icon: 'fa-solid fa-users',
    description: 'Decouvrez l\'histoire et les objectifs du REPAE'
  },
  {
    id: 'bureau',
    label: 'Le Bureau',
    href: '/association/bureau',
    icon: 'fa-solid fa-user-tie',
    description: 'Rencontrez les membres du bureau executif'
  },
  {
    id: 'adhesion',
    label: 'Adhesion',
    href: '/association/adhesion',
    icon: 'fa-solid fa-handshake',
    description: 'Rejoignez le reseau des alumni'
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
    label: 'Reglement',
    href: '/association/reglement',
    icon: 'fa-solid fa-gavel',
    description: 'Consultez le reglement interieur'
  }
]
