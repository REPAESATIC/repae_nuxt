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
        badge: 'Bientot',
      },
    ],
  },
]
