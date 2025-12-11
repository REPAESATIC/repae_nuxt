// Données des membres du bureau REPAE

export interface MembreBureau {
  id: string
  prenom: string
  nom: string
  photo_url: string
  poste: string
  poste_actuel: string
  entreprise: string
  linkedin_url?: string
  responsabilites: string
  ordre_affichage: number
  actif: boolean
}

export const membresBureau: MembreBureau[] = [
  {
    id: '1',
    prenom: 'Kouamé',
    nom: 'ASSI',
    photo_url: 'https://i.pravatar.cc/300?img=11',
    poste: 'Président',
    poste_actuel: 'Directeur des Systèmes d\'Information',
    entreprise: 'Orange Côte d\'Ivoire',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Direction générale du réseau, représentation officielle, présidence des assemblées.',
    ordre_affichage: 1,
    actif: true
  },
  {
    id: '2',
    prenom: 'Aminata',
    nom: 'COULIBALY',
    photo_url: 'https://i.pravatar.cc/300?img=5',
    poste: 'Vice-Présidente',
    poste_actuel: 'Chef de Projet IT',
    entreprise: 'MTN Côte d\'Ivoire',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Suppléance du président, coordination des commissions.',
    ordre_affichage: 2,
    actif: true
  },
  {
    id: '3',
    prenom: 'Jean-Marc',
    nom: 'TOURÉ',
    photo_url: 'https://i.pravatar.cc/300?img=12',
    poste: 'Secrétaire Général',
    poste_actuel: 'Architecte Cloud',
    entreprise: 'Société Générale',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Gestion administrative, rédaction des procès-verbaux, coordination des réunions.',
    ordre_affichage: 3,
    actif: true
  },
  {
    id: '4',
    prenom: 'Fatou',
    nom: 'DIALLO',
    photo_url: 'https://i.pravatar.cc/300?img=9',
    poste: 'Trésorière',
    poste_actuel: 'Consultante FinTech',
    entreprise: 'Deloitte',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Gestion financière, comptabilité, rapport financier annuel.',
    ordre_affichage: 4,
    actif: true
  },
  {
    id: '5',
    prenom: 'Serge',
    nom: 'KOFFI',
    photo_url: 'https://i.pravatar.cc/300?img=13',
    poste: 'Responsable Communication',
    poste_actuel: 'Digital Marketing Manager',
    entreprise: 'Jumia',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Stratégie de communication, gestion des réseaux sociaux, relations presse.',
    ordre_affichage: 5,
    actif: true
  },
  {
    id: '6',
    prenom: 'Marie',
    nom: 'BAMBA',
    photo_url: 'https://i.pravatar.cc/300?img=10',
    poste: 'Responsable Partenariats',
    poste_actuel: 'Business Developer',
    entreprise: 'Microsoft Afrique',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Développement des partenariats, relations entreprises, sponsoring.',
    ordre_affichage: 6,
    actif: true
  },
  {
    id: '7',
    prenom: 'Yao',
    nom: 'GNAMBA',
    photo_url: 'https://i.pravatar.cc/300?img=14',
    poste: 'Responsable Événements',
    poste_actuel: 'Lead Developer',
    entreprise: 'Ecobank',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Organisation des événements, coordination logistique, networking.',
    ordre_affichage: 7,
    actif: true
  },
  {
    id: '8',
    prenom: 'Awa',
    nom: 'SYLLA',
    photo_url: 'https://i.pravatar.cc/300?img=16',
    poste: 'Responsable Mentorat',
    poste_actuel: 'Data Scientist',
    entreprise: 'Google',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Programme de mentorat, accompagnement des jeunes diplômés, formations.',
    ordre_affichage: 8,
    actif: true
  }
]

// Membres du bureau actifs triés par ordre d'affichage
export const membresBureauActifs = membresBureau
  .filter(membre => membre.actif)
  .sort((a, b) => a.ordre_affichage - b.ordre_affichage)
