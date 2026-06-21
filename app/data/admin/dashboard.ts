// Types et donnees statiques pour le tableau de bord admin

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AdminDashboardStat {
  id: string
  label: string
  value: string
  icon: string
  color: 'violet' | 'blue' | 'green' | 'orange' | 'amber' | 'red'
  trend?: string
  href: string
}

export interface AdminActivityItem {
  id: string
  type: 'inscription' | 'actualite' | 'evenement' | 'verification' | 'entreprise'
  title: string
  description: string
  date: string
  icon: string
  color: string
  href?: string
}

export interface AdminQuickAction {
  id: string
  label: string
  description: string
  icon: string
  href: string
  color: string
}

// ─── Actions rapides ─────────────────────────────────────────────────────────

export const adminQuickActions: AdminQuickAction[] = [
  {
    id: 'creer-actualite',
    label: 'Créer une actualité',
    description: 'Publier un nouvel article',
    icon: 'fa-solid fa-bullhorn',
    href: '/admin/actualites/creer',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    id: 'creer-evenement',
    label: 'Créer un événement',
    description: 'Planifier un événement',
    icon: 'fa-solid fa-calendar-alt',
    href: '/admin/evenements/creer',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'gerer-alumni',
    label: 'Gérer les alumni',
    description: 'Vérifier et gérer les profils',
    icon: 'fa-solid fa-user-graduate',
    href: '/admin/alumni',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'gerer-comptes',
    label: 'Gérer les comptes',
    description: 'Utilisateurs et rôles',
    icon: 'fa-solid fa-user-cog',
    href: '/admin/comptes',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'creer-entreprise',
    label: 'Ajouter entreprise',
    description: 'Inscrire un partenaire',
    icon: 'fa-solid fa-building',
    href: '/admin/entreprises/creer',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Gérer les alertes',
    icon: 'fa-solid fa-bell',
    href: '/admin/notifications',
    color: 'from-amber-500 to-yellow-500',
  },
]