// Types pour les événements
export interface Event {
  id: number
  title: string
  date: string
  image: string
  status: 'completed' | 'ongoing' | 'upcoming'
  description: string
  category: 'conference' | 'formation' | 'networking' | 'sport' | 'webinaire' | 'autre'
  location?: string
  isFeatured?: boolean
}

// Données mock des événements
export const events: Event[] = [
  {
    id: 1,
    title: 'Rentrée Académique du REPAE',
    date: '2024-06-12',
    image: '/image/background/evenement1.jpg',
    status: 'completed',
    description: 'Cérémonie d\'ouverture de l\'année académique avec remise des diplômes et discours des responsables.',
    category: 'conference',
    location: 'ESATIC, Abidjan',
    isFeatured: false
  },
  {
    id: 2,
    title: 'REPAE INTERPROMOS - Tournoi Maracana',
    date: '2025-09-12',
    image: '/image/background/evenement2.jpg',
    status: 'ongoing',
    description: 'Tournoi sportif inter-promotions réunissant les alumni autour du football et de la convivialité.',
    category: 'sport',
    location: 'Complexe Sportif, Abidjan',
    isFeatured: true
  },
  {
    id: 3,
    title: 'Forum Emploi & Stages REPAE',
    date: '2026-03-15',
    image: '/image/background/evenement3.jpg',
    status: 'upcoming',
    description: 'Rencontre entre alumni, recruteurs et étudiants pour des opportunités de carrière et de stages.',
    category: 'networking',
    location: 'ESATIC, Abidjan',
    isFeatured: false
  },
  {
    id: 4,
    title: 'Webinaire - Opportunités Tech 2026',
    date: '2026-04-20',
    image: '/image/background/evenement4.jpg',
    status: 'upcoming',
    description: 'Session en ligne sur les tendances du marché de l\'emploi IT et les opportunités internationales.',
    category: 'webinaire',
    location: 'En ligne',
    isFeatured: false
  },
  {
    id: 5,
    title: 'Conférence Technology & Justice',
    date: '2026-05-10',
    image: '/image/background/evenement1.jpg',
    status: 'upcoming',
    description: 'Conférence sur l\'impact des nouvelles technologies dans le domaine juridique et la cybersécurité.',
    category: 'conference',
    location: 'Palais de la Culture, Abidjan',
    isFeatured: false
  },
  {
    id: 6,
    title: 'Formation Cloud Computing',
    date: '2026-06-05',
    image: '/image/background/evenement2.jpg',
    status: 'upcoming',
    description: 'Formation pratique sur AWS et Azure destinée aux professionnels souhaitant monter en compétences.',
    category: 'formation',
    location: 'ESATIC, Abidjan',
    isFeatured: false
  },
  {
    id: 7,
    title: 'Afterwork Networking REPAE',
    date: '2026-06-20',
    image: '/image/background/evenement3.jpg',
    status: 'upcoming',
    description: 'Soirée conviviale pour renforcer les liens entre alumni et partager autour d\'un verre.',
    category: 'networking',
    location: 'Sofitel Abidjan',
    isFeatured: false
  }
]
