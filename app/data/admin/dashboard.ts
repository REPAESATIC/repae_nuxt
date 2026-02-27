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
    label: 'Creer une actualite',
    description: 'Publier un nouvel article',
    icon: 'fa-solid fa-bullhorn',
    href: '/admin/actualites/creer',
    color: 'from-violet-500 to-indigo-600',
  },
  {
    id: 'creer-evenement',
    label: 'Creer un evenement',
    description: 'Planifier un evenement',
    icon: 'fa-solid fa-calendar-alt',
    href: '/admin/evenements/creer',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'gerer-alumni',
    label: 'Gerer les alumni',
    description: 'Verifier et gerer les profils',
    icon: 'fa-solid fa-user-graduate',
    href: '/admin/alumni',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'gerer-comptes',
    label: 'Gerer les comptes',
    description: 'Utilisateurs et roles',
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
    description: 'Gerer les alertes',
    icon: 'fa-solid fa-bell',
    href: '/admin/notifications',
    color: 'from-amber-500 to-yellow-500',
  },
]