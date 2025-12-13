// Donnees mock des dernieres candidatures
export interface RecentCandidature {
  id: string
  offre: {
    id: string
    titre: string
    type: 'emploi' | 'stage'
  }
  candidat: {
    id: string
    prenom: string
    nom: string
    photo_url: string
    poste_actuel: string
    promotion: number
  }
  date_candidature: string
  statut: 'nouvelle' | 'vue' | 'en_cours' | 'acceptee' | 'refusee'
}

export const recentCandidatures: RecentCandidature[] = [
  {
    id: '1',
    offre: {
      id: '1',
      titre: 'Developpeur Full Stack Senior',
      type: 'emploi'
    },
    candidat: {
      id: '1',
      prenom: 'Kouame',
      nom: 'Yao',
      photo_url: 'https://i.pravatar.cc/150?u=kouame',
      poste_actuel: 'Developpeur Full Stack',
      promotion: 2019
    },
    date_candidature: '2024-01-15T10:30:00',
    statut: 'nouvelle'
  },
  {
    id: '2',
    offre: {
      id: '2',
      titre: 'Data Analyst',
      type: 'emploi'
    },
    candidat: {
      id: '2',
      prenom: 'Aminata',
      nom: 'Diallo',
      photo_url: 'https://i.pravatar.cc/150?u=aminata',
      poste_actuel: 'Analyste Donnees Junior',
      promotion: 2021
    },
    date_candidature: '2024-01-14T16:45:00',
    statut: 'vue'
  },
  {
    id: '3',
    offre: {
      id: '3',
      titre: 'Stage DevOps',
      type: 'stage'
    },
    candidat: {
      id: '3',
      prenom: 'Ibrahim',
      nom: 'Konate',
      photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
      poste_actuel: 'Etudiant Master 2',
      promotion: 2024
    },
    date_candidature: '2024-01-14T09:15:00',
    statut: 'en_cours'
  },
  {
    id: '4',
    offre: {
      id: '1',
      titre: 'Developpeur Full Stack Senior',
      type: 'emploi'
    },
    candidat: {
      id: '4',
      prenom: 'Fatou',
      nom: 'Sow',
      photo_url: 'https://i.pravatar.cc/150?u=fatou',
      poste_actuel: 'Lead Developer',
      promotion: 2017
    },
    date_candidature: '2024-01-13T14:20:00',
    statut: 'acceptee'
  },
  {
    id: '5',
    offre: {
      id: '2',
      titre: 'Data Analyst',
      type: 'emploi'
    },
    candidat: {
      id: '5',
      prenom: 'Jean',
      nom: 'Kouassi',
      photo_url: 'https://i.pravatar.cc/150?u=jean',
      poste_actuel: 'Business Analyst',
      promotion: 2020
    },
    date_candidature: '2024-01-12T11:00:00',
    statut: 'refusee'
  }
]

// Offres actives mock
export interface ActiveOffer {
  id: string
  titre: string
  type: 'emploi' | 'stage'
  type_contrat?: 'cdi' | 'cdd' | 'freelance'
  duree_mois?: number
  lieu: string
  date_publication: string
  date_expiration: string
  nombre_candidatures: number
  nombre_vues: number
  statut: 'publiee' | 'en_pause'
}

export const activeOffers: ActiveOffer[] = [
  {
    id: '1',
    titre: 'Developpeur Full Stack Senior',
    type: 'emploi',
    type_contrat: 'cdi',
    lieu: 'Abidjan',
    date_publication: '2024-01-05',
    date_expiration: '2024-02-05',
    nombre_candidatures: 12,
    nombre_vues: 156,
    statut: 'publiee'
  },
  {
    id: '2',
    titre: 'Data Analyst',
    type: 'emploi',
    type_contrat: 'cdd',
    lieu: 'Abidjan',
    date_publication: '2024-01-08',
    date_expiration: '2024-02-08',
    nombre_candidatures: 8,
    nombre_vues: 98,
    statut: 'publiee'
  },
  {
    id: '3',
    titre: 'Stage DevOps',
    type: 'stage',
    duree_mois: 6,
    lieu: 'Abidjan',
    date_publication: '2024-01-10',
    date_expiration: '2024-03-10',
    nombre_candidatures: 15,
    nombre_vues: 203,
    statut: 'publiee'
  },
  {
    id: '4',
    titre: 'Chef de Projet IT',
    type: 'emploi',
    type_contrat: 'cdi',
    lieu: 'Abidjan / Remote',
    date_publication: '2024-01-12',
    date_expiration: '2024-02-12',
    nombre_candidatures: 5,
    nombre_vues: 67,
    statut: 'publiee'
  },
  {
    id: '5',
    titre: 'Stage UX Designer',
    type: 'stage',
    duree_mois: 4,
    lieu: 'Abidjan',
    date_publication: '2024-01-03',
    date_expiration: '2024-01-20',
    nombre_candidatures: 7,
    nombre_vues: 89,
    statut: 'en_pause'
  }
]

// Statistiques mensuelles pour le graphique
export interface MonthlyStats {
  mois: string
  candidatures: number
  offres_publiees: number
  profils_consultes: number
}

export const monthlyStats: MonthlyStats[] = [
  { mois: 'Aout', candidatures: 23, offres_publiees: 2, profils_consultes: 45 },
  { mois: 'Sept', candidatures: 31, offres_publiees: 3, profils_consultes: 67 },
  { mois: 'Oct', candidatures: 28, offres_publiees: 2, profils_consultes: 52 },
  { mois: 'Nov', candidatures: 42, offres_publiees: 4, profils_consultes: 89 },
  { mois: 'Dec', candidatures: 35, offres_publiees: 3, profils_consultes: 78 },
  { mois: 'Jan', candidatures: 47, offres_publiees: 5, profils_consultes: 128 }
]
