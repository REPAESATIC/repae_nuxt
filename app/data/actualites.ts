// Types pour les actualités
export interface Article {
  id: number
  title: string
  excerpt: string
  content?: string
  category: string
  image: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readTime?: number
  featured?: boolean
}

export interface ChangelogItem {
  id: number
  title: string
  date: string
}

// Catégories d'actualités
export const categories = [
  { id: 'formation', label: 'Formation', color: 'text-repae-blue-500' },
  { id: 'carriere', label: 'Carrière', color: 'text-green-500' },
  { id: 'evenement', label: 'Événement', color: 'text-purple-500' },
  { id: 'partenariat', label: 'Partenariat', color: 'text-orange-500' },
  { id: 'association', label: 'Association', color: 'text-pink-500' },
  { id: 'technologie', label: 'Technologie', color: 'text-cyan-500' },
]

// Article à la une
export const featuredArticle: Article = {
  id: 1,
  title: 'REPAE lance son nouveau programme de mentorat pour les jeunes diplômés',
  excerpt: 'Le Réseau des Professionnels et Anciens Élèves annonce un programme innovant de mentorat qui permettra aux nouveaux diplômés de bénéficier de l\'accompagnement personnalisé de professionnels expérimentés dans leur domaine.',
  category: 'Association',
  image: 'https://picsum.photos/seed/repae1/800/500',
  author: {
    name: 'Marie Koné',
    avatar: 'https://i.pravatar.cc/150?u=marie',
  },
  publishedAt: '2025-01-15',
  readTime: 5,
  featured: true,
}

// Articles secondaires (colonne droite)
export const secondaryArticles: Article[] = [
  {
    id: 2,
    title: 'Formation continue : Les nouvelles certifications disponibles pour 2025',
    excerpt: 'Découvrez les nouvelles certifications professionnelles proposées par nos partenaires pour renforcer vos compétences.',
    category: 'Formation',
    image: 'https://picsum.photos/seed/formation1/400/300',
    author: {
      name: 'Amadou Diallo',
      avatar: 'https://i.pravatar.cc/150?u=amadou',
    },
    publishedAt: '2025-01-14',
    readTime: 4,
  },
  {
    id: 3,
    title: 'Retour sur la Journée Portes Ouvertes 2024 : Un succès remarquable',
    excerpt: 'Plus de 500 participants ont assisté à notre dernière journée portes ouvertes, témoignant de l\'attractivité croissante de notre réseau.',
    category: 'Événement',
    image: 'https://picsum.photos/seed/event1/400/300',
    author: {
      name: 'Fatou Sow',
      avatar: 'https://i.pravatar.cc/150?u=fatou',
    },
    publishedAt: '2025-01-13',
    readTime: 3,
  },
  {
    id: 4,
    title: 'Partenariat stratégique avec Orange Digital Center',
    excerpt: 'REPAE signe un accord majeur avec Orange Digital Center pour accompagner les alumni dans leur transition numérique.',
    category: 'Partenariat',
    image: 'https://picsum.photos/seed/partner1/400/300',
    author: {
      name: 'Ibrahim Touré',
      avatar: 'https://i.pravatar.cc/150?u=ibrahim',
    },
    publishedAt: '2025-01-12',
    readTime: 4,
  },
]

// Articles en double colonne
export const twoColumnArticles: Article[] = [
  {
    id: 5,
    title: 'Bilan 2024 : Une année de croissance exceptionnelle',
    excerpt: 'Nous présentons notre rapport annuel détaillant les accomplissements majeurs de l\'association : 200 nouveaux membres, 50 offres d\'emploi pourvues et 15 événements organisés.',
    category: 'Association',
    image: 'https://picsum.photos/seed/bilan1/600/400',
    author: {
      name: 'Oumar Sanogo',
      avatar: 'https://i.pravatar.cc/150?u=oumar',
    },
    publishedAt: '2025-01-10',
    readTime: 6,
  },
  {
    id: 6,
    title: 'Interview exclusive : Le parcours inspirant de Mariama Ba',
    excerpt: 'De stagiaire à directrice technique chez Microsoft, Mariama Ba partage son parcours et ses conseils pour réussir dans la tech.',
    category: 'Carrière',
    image: 'https://picsum.photos/seed/interview1/600/400',
    author: {
      name: 'Jean-Pierre Kouassi',
      avatar: 'https://i.pravatar.cc/150?u=jeanpierre',
    },
    publishedAt: '2025-01-09',
    readTime: 8,
  },
]

// Derniers articles (grille 4 colonnes)
export const latestArticles: Article[] = [
  {
    id: 7,
    title: 'Workshop : Introduction à l\'IA générative pour les professionnels',
    excerpt: 'Inscrivez-vous à notre prochain atelier pratique sur les outils d\'IA générative comme ChatGPT et Claude.',
    category: 'Formation',
    author: {
      name: 'Sophie Martin',
      avatar: 'https://i.pravatar.cc/150?u=sophie',
    },
    image: '',
    publishedAt: '2025-01-08',
    readTime: 3,
  },
  {
    id: 8,
    title: 'Recrutement : Total Energies recherche 20 ingénieurs IT',
    excerpt: 'Notre partenaire Total Energies lance une campagne de recrutement massive pour ses projets de transformation digitale.',
    category: 'Carrière',
    author: {
      name: 'Paul Mensah',
      avatar: 'https://i.pravatar.cc/150?u=paul',
    },
    image: '',
    publishedAt: '2025-01-07',
    readTime: 2,
  },
  {
    id: 9,
    title: 'AG 2025 : Élection du nouveau bureau exécutif',
    excerpt: 'L\'Assemblée Générale annuelle se tiendra le 15 février. Découvrez les candidats au nouveau bureau exécutif.',
    category: 'Association',
    author: {
      name: 'Aminata Traoré',
      avatar: 'https://i.pravatar.cc/150?u=aminata',
    },
    image: '',
    publishedAt: '2025-01-06',
    readTime: 4,
  },
  {
    id: 10,
    title: 'Témoignage : Comment j\'ai décroché mon poste grâce au réseau',
    excerpt: 'Un membre partage son expérience et l\'importance du networking dans sa recherche d\'emploi.',
    category: 'Carrière',
    author: {
      name: 'Koffi Asante',
      avatar: 'https://i.pravatar.cc/150?u=koffi',
    },
    image: '',
    publishedAt: '2025-01-05',
    readTime: 5,
  },
]

// Changelog / Annonces récentes
export const changelogItems: ChangelogItem[] = [
  {
    id: 1,
    title: 'Mise à jour de l\'annuaire des alumni : filtres avancés et recherche améliorée',
    date: '2025-01-15',
  },
  {
    id: 2,
    title: 'Nouveau système de candidature en ligne pour les offres d\'emploi',
    date: '2025-01-14',
  },
  {
    id: 3,
    title: 'Lancement du programme de parrainage inter-promotions',
    date: '2025-01-12',
  },
  {
    id: 4,
    title: 'Ajout de la fonctionnalité de chat entre membres',
    date: '2025-01-10',
  },
]

// Articles Formation
export const formationArticles: Article[] = [
  {
    id: 11,
    title: 'Calendrier des formations 2025 : Ce qui vous attend',
    excerpt: 'Notre programme de formation continue s\'enrichit avec de nouvelles thématiques : Cloud Computing, DevOps, Data Science et Cybersécurité.',
    category: 'Formation',
    image: 'https://picsum.photos/seed/formation2/800/500',
    author: {
      name: 'Dr. Moussa Camara',
      avatar: 'https://i.pravatar.cc/150?u=moussa',
    },
    publishedAt: '2025-01-08',
    readTime: 5,
  },
  {
    id: 12,
    title: 'Certification AWS : Retour d\'expérience de nos membres',
    excerpt: 'Trois alumni partagent leurs conseils pour réussir la certification AWS Solutions Architect.',
    category: 'Formation',
    author: {
      name: 'Aïcha Bamba',
      avatar: 'https://i.pravatar.cc/150?u=aicha',
    },
    image: '',
    publishedAt: '2025-01-06',
    readTime: 4,
  },
  {
    id: 13,
    title: 'Bootcamp Développement Web : Les inscriptions sont ouvertes',
    excerpt: 'Un programme intensif de 12 semaines pour maîtriser les technologies web modernes.',
    category: 'Formation',
    author: {
      name: 'Eric Kouadio',
      avatar: 'https://i.pravatar.cc/150?u=eric',
    },
    image: '',
    publishedAt: '2025-01-04',
    readTime: 3,
  },
  {
    id: 14,
    title: 'Webinaire gratuit : Les bases de Python pour débutants',
    excerpt: 'Rejoignez notre session d\'initiation à Python, le langage le plus demandé en 2025.',
    category: 'Formation',
    author: {
      name: 'Nadia Ouedraogo',
      avatar: 'https://i.pravatar.cc/150?u=nadia',
    },
    image: '',
    publishedAt: '2025-01-02',
    readTime: 2,
  },
]

// Articles Carrière
export const careerArticles: Article[] = [
  {
    id: 15,
    title: 'Forum de l\'emploi REPAE 2025 : Plus de 30 entreprises participantes',
    excerpt: 'Le plus grand événement de recrutement de notre réseau se tiendra le 20 mars. Préparez vos CV et vos entretiens !',
    category: 'Carrière',
    image: 'https://picsum.photos/seed/career1/800/500',
    author: {
      name: 'Christelle Aka',
      avatar: 'https://i.pravatar.cc/150?u=christelle',
    },
    publishedAt: '2025-01-12',
    readTime: 4,
  },
  {
    id: 16,
    title: 'Guide : Comment optimiser son profil LinkedIn',
    excerpt: 'Les recruteurs passent en moyenne 7 secondes sur un profil. Voici comment captiver leur attention.',
    category: 'Carrière',
    author: {
      name: 'Mamadou Sy',
      avatar: 'https://i.pravatar.cc/150?u=mamadou',
    },
    image: '',
    publishedAt: '2025-01-10',
    readTime: 6,
  },
  {
    id: 17,
    title: 'Les métiers tech qui recrutent le plus en 2025',
    excerpt: 'Data Engineer, DevOps, Product Manager : découvrez les postes les plus recherchés cette année.',
    category: 'Carrière',
    author: {
      name: 'Yannick Zongo',
      avatar: 'https://i.pravatar.cc/150?u=yannick',
    },
    image: '',
    publishedAt: '2025-01-08',
    readTime: 5,
  },
]

// Articles tendances (section sombre)
export const trendingArticles: Article[] = [
  {
    id: 18,
    title: 'Success Story : 5 startups fondées par des membres REPAE',
    excerpt: 'De l\'idée au financement, découvrez les parcours inspirants de ces entrepreneurs qui ont osé se lancer.',
    category: 'Carrière',
    author: {
      name: 'Thomas Doumbia',
      avatar: 'https://i.pravatar.cc/150?u=thomas',
    },
    image: '',
    publishedAt: '2025-01-11',
    readTime: 7,
  },
  {
    id: 19,
    title: 'L\'importance du réseau professionnel dans votre carrière',
    excerpt: '80% des opportunités d\'emploi ne sont jamais publiées. Le networking reste la clé du succès professionnel.',
    category: 'Carrière',
    author: {
      name: 'Équipe REPAE',
      avatar: 'https://i.pravatar.cc/150?u=repae',
    },
    image: '',
    publishedAt: '2025-01-09',
    readTime: 4,
  },
  {
    id: 20,
    title: 'Intelligence Artificielle : Opportunité ou menace pour nos métiers ?',
    excerpt: 'Une analyse approfondie de l\'impact de l\'IA sur les métiers de l\'IT et comment s\'y préparer.',
    category: 'Technologie',
    author: {
      name: 'Prof. Diaw',
      avatar: 'https://i.pravatar.cc/150?u=diaw',
    },
    image: '',
    publishedAt: '2025-01-07',
    readTime: 8,
  },
  {
    id: 21,
    title: 'Témoignage : Ma première année en tant que consultant',
    excerpt: 'Les défis, les apprentissages et les satisfactions d\'une reconversion vers le consulting IT.',
    category: 'Carrière',
    author: {
      name: 'Amina Diop',
      avatar: 'https://i.pravatar.cc/150?u=amina',
    },
    image: '',
    publishedAt: '2025-01-05',
    readTime: 5,
  },
  {
    id: 22,
    title: 'Comment négocier son salaire : Guide complet',
    excerpt: 'Les techniques et arguments pour obtenir la rémunération que vous méritez.',
    category: 'Carrière',
    author: {
      name: 'Sekou Balde',
      avatar: 'https://i.pravatar.cc/150?u=sekou',
    },
    image: '',
    publishedAt: '2025-01-03',
    readTime: 6,
  },
  {
    id: 23,
    title: 'Les événements networking à ne pas manquer en 2025',
    excerpt: 'Salons, conférences, meetups : votre calendrier des rendez-vous professionnels incontournables.',
    category: 'Événement',
    author: {
      name: 'Bureau REPAE',
      avatar: 'https://i.pravatar.cc/150?u=bureau',
    },
    image: '',
    publishedAt: '2025-01-01',
    readTime: 4,
  },
]

// Articles Événements
export const eventArticles: Article[] = [
  {
    id: 24,
    title: 'Afterwork REPAE : Rencontrez vos pairs autour d\'un verre',
    excerpt: 'Chaque premier jeudi du mois, rejoignez-nous pour un moment de convivialité et d\'échange entre professionnels.',
    category: 'Événement',
    image: 'https://picsum.photos/seed/event2/800/500',
    author: {
      name: 'Comité événements',
      avatar: 'https://i.pravatar.cc/150?u=comite',
    },
    publishedAt: '2025-01-14',
    readTime: 2,
  },
  {
    id: 25,
    title: 'Hackathon REPAE x EPITECH : Relevez le défi !',
    excerpt: '48h pour développer une solution innovante. Prix : 10 000€ et un accompagnement startup.',
    category: 'Événement',
    author: {
      name: 'Partenariats REPAE',
      avatar: 'https://i.pravatar.cc/150?u=partenariats',
    },
    image: '',
    publishedAt: '2025-01-11',
    readTime: 3,
  },
  {
    id: 26,
    title: 'Conférence : L\'avenir du travail à l\'ère du numérique',
    excerpt: 'Des experts RH et tech débattent des nouvelles formes de travail : télétravail, freelance, nomadisme digital.',
    category: 'Événement',
    author: {
      name: 'Communication REPAE',
      avatar: 'https://i.pravatar.cc/150?u=com',
    },
    image: '',
    publishedAt: '2025-01-09',
    readTime: 4,
  },
]

// Fonction utilitaire pour formater les dates
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

// Fonction pour obtenir la couleur de catégorie
export function getCategoryColor(category: string): string {
  const cat = categories.find(c => c.label.toLowerCase() === category.toLowerCase())
  return cat?.color || 'text-repae-blue-500'
}
