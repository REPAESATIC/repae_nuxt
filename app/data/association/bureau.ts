// Donnees des membres du bureau REPAE

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
    prenom: 'Kouame',
    nom: 'ASSI',
    photo_url: 'https://i.pravatar.cc/300?img=11',
    poste: 'President',
    poste_actuel: 'Directeur des Systemes d\'Information',
    entreprise: 'Orange Cote d\'Ivoire',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Direction generale du reseau, representation officielle, presidence des assemblees.',
    ordre_affichage: 1,
    actif: true
  },
  {
    id: '2',
    prenom: 'Aminata',
    nom: 'COULIBALY',
    photo_url: 'https://i.pravatar.cc/300?img=5',
    poste: 'Vice-Presidente',
    poste_actuel: 'Chef de Projet IT',
    entreprise: 'MTN Cote d\'Ivoire',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Suppleance du president, coordination des commissions.',
    ordre_affichage: 2,
    actif: true
  },
  {
    id: '3',
    prenom: 'Jean-Marc',
    nom: 'TOURE',
    photo_url: 'https://i.pravatar.cc/300?img=12',
    poste: 'Secretaire General',
    poste_actuel: 'Architecte Cloud',
    entreprise: 'Societe Generale',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Gestion administrative, redaction des proces-verbaux, coordination des reunions.',
    ordre_affichage: 3,
    actif: true
  },
  {
    id: '4',
    prenom: 'Fatou',
    nom: 'DIALLO',
    photo_url: 'https://i.pravatar.cc/300?img=9',
    poste: 'Tresoriere',
    poste_actuel: 'Consultante FinTech',
    entreprise: 'Deloitte',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Gestion financiere, comptabilite, rapport financier annuel.',
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
    responsabilites: 'Strategie de communication, gestion des reseaux sociaux, relations presse.',
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
    responsabilites: 'Developpement des partenariats, relations entreprises, sponsoring.',
    ordre_affichage: 6,
    actif: true
  },
  {
    id: '7',
    prenom: 'Yao',
    nom: 'GNAMBA',
    photo_url: 'https://i.pravatar.cc/300?img=14',
    poste: 'Responsable Evenements',
    poste_actuel: 'Lead Developer',
    entreprise: 'Ecobank',
    linkedin_url: 'https://linkedin.com/in/',
    responsabilites: 'Organisation des evenements, coordination logistique, networking.',
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
    responsabilites: 'Programme de mentorat, accompagnement des jeunes diplomes, formations.',
    ordre_affichage: 8,
    actif: true
  }
]

// Membres du bureau actifs tries par ordre d'affichage
export const membresBureauActifs = membresBureau
  .filter(membre => membre.actif)
  .sort((a, b) => a.ordre_affichage - b.ordre_affichage)
