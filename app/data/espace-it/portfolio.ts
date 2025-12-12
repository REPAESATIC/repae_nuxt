// Donnees mock du portfolio de l'utilisateur (Cote d'Ivoire - ESATIC)

export type TypeProjet = 'web' | 'mobile' | 'api' | 'desktop' | 'autre'

export interface ProjetPortfolio {
  id: string
  titre: string
  description: string
  image_url: string
  type: TypeProjet
  technologies: string[]
  url_demo?: string
  url_github?: string
  date_realisation: string
  client?: string
  en_vedette?: boolean
}

export const portfolio: ProjetPortfolio[] = [
  {
    id: '1',
    titre: 'MoMo Pay - Application Mobile Money',
    description: 'Application mobile de paiement et transfert d\'argent pour MTN Cote d\'Ivoire. Gestion des transactions, historique, et integration avec les partenaires marchands.',
    image_url: 'https://picsum.photos/600/400?random=20',
    type: 'mobile',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Redis'],
    date_realisation: '2023-06',
    client: 'MTN Cote d\'Ivoire',
    en_vedette: true
  },
  {
    id: '2',
    titre: 'Portail RH Orange CI',
    description: 'Plateforme de gestion des ressources humaines incluant la gestion des conges, des formations et des evaluations pour les employes d\'Orange Cote d\'Ivoire.',
    image_url: 'https://picsum.photos/600/400?random=21',
    type: 'web',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
    url_demo: 'https://rh.orange.ci',
    date_realisation: '2020-11',
    client: 'Orange Cote d\'Ivoire',
    en_vedette: true
  },
  {
    id: '3',
    titre: 'API Paiement Marchand',
    description: 'API RESTful pour l\'integration des paiements mobile money dans les applications tierces. Documentation Swagger, SDK JavaScript et Python.',
    image_url: 'https://picsum.photos/600/400?random=22',
    type: 'api',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Swagger'],
    url_github: 'https://github.com/kouameyao/momo-merchant-api',
    date_realisation: '2022-03',
    en_vedette: false
  },
  {
    id: '4',
    titre: 'Dashboard Analytics ESATIC',
    description: 'Tableau de bord de visualisation des donnees pour le suivi des indicateurs de performance de l\'ESATIC. Graphiques interactifs et rapports exportables.',
    image_url: 'https://picsum.photos/600/400?random=23',
    type: 'web',
    technologies: ['Vue.js', 'Chart.js', 'Python', 'FastAPI'],
    date_realisation: '2021-09',
    client: 'ESATIC',
    en_vedette: true
  },
  {
    id: '5',
    titre: 'App Gestion Stock Sifca',
    description: 'Application de gestion des stocks et de la logistique pour les entrepots du groupe Sifca. Suivi en temps reel, alertes et rapports automatises.',
    image_url: 'https://picsum.photos/600/400?random=24',
    type: 'web',
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'WebSocket'],
    date_realisation: '2018-11',
    client: 'Sifca Group',
    en_vedette: false
  },
  {
    id: '6',
    titre: 'Chatbot Service Client',
    description: 'Bot conversationnel pour le support client integre a WhatsApp et Telegram. Traitement automatique des requetes courantes et escalade vers agents.',
    image_url: 'https://picsum.photos/600/400?random=25',
    type: 'autre',
    technologies: ['Node.js', 'Dialogflow', 'MongoDB', 'WhatsApp API'],
    date_realisation: '2023-01',
    client: 'MTN Cote d\'Ivoire',
    en_vedette: false
  }
]

// Configuration des types de projet
export const typeProjetConfig: Record<TypeProjet, { label: string; icon: string; color: string }> = {
  web: {
    label: 'Application Web',
    icon: 'fa-solid fa-globe',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
  },
  mobile: {
    label: 'Application Mobile',
    icon: 'fa-solid fa-mobile-screen',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
  },
  api: {
    label: 'API / Backend',
    icon: 'fa-solid fa-code',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400'
  },
  desktop: {
    label: 'Application Desktop',
    icon: 'fa-solid fa-desktop',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
  },
  autre: {
    label: 'Autre',
    icon: 'fa-solid fa-cube',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
  }
}

// Helper pour obtenir les projets en vedette
export const getFeaturedProjects = (projects: ProjetPortfolio[]): ProjetPortfolio[] => {
  return projects.filter(p => p.en_vedette)
}

// Helper pour formater la date
export const formatProjectDate = (date: string): string => {
  const [year, month] = date.split('-')
  const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
  return `${months[parseInt(month) - 1]} ${year}`
}
