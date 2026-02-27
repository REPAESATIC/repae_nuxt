export interface AdminNavItem {
  id: string
  label: string
  href: string
  icon: string
  badge?: string
}

export interface AdminNavGroup {
  id: string
  label: string
  icon: string
  items: AdminNavItem[]
}

export const adminMainNav: AdminNavItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    href: '/admin',
    icon: 'fa-solid fa-gauge-high',
  },
]

export const adminNavGroups: AdminNavGroup[] = [
  {
    id: 'contenu',
    label: 'Contenu',
    icon: 'fa-solid fa-layer-group',
    items: [
      {
        id: 'categories',
        label: 'Categories',
        href: '/admin/categories',
        icon: 'fa-solid fa-tag',
      },
      {
        id: 'actualites',
        label: 'Actualites',
        href: '/admin/actualites',
        icon: 'fa-solid fa-bullhorn',
      },
      {
        id: 'evenements',
        label: 'Evenements',
        href: '/admin/evenements',
        icon: 'fa-solid fa-calendar-alt',
      },
    ],
  },
  {
    id: 'utilisateurs',
    label: 'Utilisateurs',
    icon: 'fa-solid fa-users',
    items: [
      {
        id: 'alumni',
        label: 'Alumni',
        href: '/admin/alumni',
        icon: 'fa-solid fa-user-graduate',
      },
      {
        id: 'entreprises',
        label: 'Entreprises',
        href: '/admin/entreprises',
        icon: 'fa-solid fa-building',
      },
      {
        id: 'comptes',
        label: 'Comptes',
        href: '/admin/comptes',
        icon: 'fa-solid fa-user-cog',
      },
    ],
  },
  {
    id: 'referentiel',
    label: 'Referentiel',
    icon: 'fa-solid fa-database',
    items: [
      {
        id: 'pays',
        label: 'Pays',
        href: '/admin/pays',
        icon: 'fa-solid fa-globe',
      },
      {
        id: 'departements',
        label: 'Departements',
        href: '/admin/departements',
        icon: 'fa-solid fa-graduation-cap',
      },
      {
        id: 'promotions',
        label: 'Promotions',
        href: '/admin/promotions',
        icon: 'fa-solid fa-flag',
      },
    ],
  },
  {
    id: 'systeme',
    label: 'Systeme',
    icon: 'fa-solid fa-cog',
    items: [
      {
        id: 'notifications',
        label: 'Notifications',
        href: '/admin/notifications',
        icon: 'fa-solid fa-bell',
      },
      {
        id: 'parametres',
        label: 'Parametres',
        href: '/admin/parametres',
        icon: 'fa-solid fa-sliders-h',
      },
    ],
  },
]
