// Types et donnees mock pour le tableau de bord admin

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

// ─── Activite recente (mock) ─────────────────────────────────────────────────

export const adminRecentActivity: AdminActivityItem[] = [
  {
    id: '1',
    type: 'inscription',
    title: 'Nouvelle inscription',
    description: 'Aminata Coulibaly a cree un compte alumni',
    date: '2026-02-27T10:30:00',
    icon: 'fa-solid fa-user-plus',
    color: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
  },
  {
    id: '2',
    type: 'actualite',
    title: 'Actualite publiee',
    description: 'Forum Emploi & Stages REPAE 2026',
    date: '2026-02-27T09:15:00',
    icon: 'fa-solid fa-bullhorn',
    color: 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400',
  },
  {
    id: '3',
    type: 'evenement',
    title: 'Evenement cree',
    description: 'Webinaire - Opportunites Tech 2026',
    date: '2026-02-26T16:45:00',
    icon: 'fa-solid fa-calendar-alt',
    color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
  },
  {
    id: '4',
    type: 'verification',
    title: 'Alumni verifie',
    description: 'Kouame Yao - Promotion 2018',
    date: '2026-02-26T14:20:00',
    icon: 'fa-solid fa-check-circle',
    color: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
  },
  {
    id: '5',
    type: 'inscription',
    title: 'Nouvelle inscription',
    description: 'Jean-Baptiste Koffi a cree un compte alumni',
    date: '2026-02-26T11:00:00',
    icon: 'fa-solid fa-user-plus',
    color: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400',
  },
  {
    id: '6',
    type: 'entreprise',
    title: 'Entreprise inscrite',
    description: 'TechCorp CI a rejoint la plateforme',
    date: '2026-02-25T17:30:00',
    icon: 'fa-solid fa-building',
    color: 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400',
  },
]
