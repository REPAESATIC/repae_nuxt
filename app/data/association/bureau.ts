// Données des membres du bureau REPAE

export interface MembreBureau {
  id: string
  prenom: string
  nom: string
  poste: string
  poste_actuel?: string
  entreprise?: string
  linkedin_url?: string
  responsabilites?: string
  ordre_affichage: number
  actif: boolean
}

export const membresBureau: MembreBureau[] = [
  {
    id: '1',
    prenom: 'Zéla',
    nom: 'TRAORÉ',
    poste: 'Présidente',
    ordre_affichage: 1,
    actif: true
  },
  {
    id: '2',
    prenom: 'Kouassi Thierry',
    nom: 'KOUAMÉ',
    poste: 'Vice-Président',
    ordre_affichage: 2,
    actif: true
  },
  {
    id: '3',
    prenom: 'Léon',
    nom: 'DOTANA SILUÉ',
    poste: 'Responsable Diaspora',
    ordre_affichage: 3,
    actif: true
  },
  {
    id: '4',
    prenom: 'Dominique',
    nom: 'ADJÉ',
    poste: 'Commission Diaspora',
    ordre_affichage: 4,
    actif: true
  },
  {
    id: '5',
    prenom: 'Sévan',
    nom: 'AKOUMIA',
    poste: 'Secrétaire Général',
    ordre_affichage: 5,
    actif: true
  },
  {
    id: '6',
    prenom: 'Koffi Judicaël',
    nom: 'AMANI',
    poste: 'Secrétaire Général Adjoint',
    ordre_affichage: 6,
    actif: true
  },
  {
    id: '7',
    prenom: 'Archel Olivier',
    nom: 'ILBOUDO',
    poste: 'Trésorier',
    ordre_affichage: 7,
    actif: true
  },
  {
    id: '8',
    prenom: 'Junior',
    nom: 'DIOMANDÉ',
    poste: 'Trésorier Adjoint',
    ordre_affichage: 8,
    actif: true
  },
  {
    id: '9',
    prenom: 'Oï',
    nom: 'KAMBEL',
    poste: 'Responsable Organisation',
    ordre_affichage: 9,
    actif: true
  },
  {
    id: '10',
    prenom: 'Kader',
    nom: 'SANOGO',
    poste: 'Responsable Commission Expertise & Compétences',
    ordre_affichage: 10,
    actif: true
  },
  {
    id: '11',
    prenom: 'Cédric',
    nom: 'MANOUAN',
    poste: 'Responsable Commission Affaires Extérieures & Partenariats',
    ordre_affichage: 11,
    actif: true
  },
  {
    id: '12',
    prenom: 'Linda',
    nom: 'BABRI',
    poste: 'Commission Affaires Extérieures & Partenariats',
    ordre_affichage: 12,
    actif: true
  },
  {
    id: '13',
    prenom: 'Serge',
    nom: 'N\'DRAMAN',
    poste: 'Responsable Commission Insertion Professionnelle',
    ordre_affichage: 13,
    actif: true
  },
  {
    id: '14',
    prenom: 'Aboubacar',
    nom: 'CHÉRIF',
    poste: 'Commission Insertion Professionnelle',
    ordre_affichage: 14,
    actif: true
  },
  {
    id: '15',
    prenom: 'Okou',
    nom: 'BISSO',
    poste: 'Commission Consultative',
    ordre_affichage: 15,
    actif: true
  },
  {
    id: '16',
    prenom: 'Ben',
    nom: 'NAMOGO',
    poste: 'Commission Consultative',
    ordre_affichage: 16,
    actif: true
  },
  {
    id: '17',
    prenom: 'Diby',
    nom: 'KOUADIO',
    poste: 'Commission Consultative',
    ordre_affichage: 17,
    actif: true
  }
]

// Membres du bureau actifs triés par ordre d'affichage
export const membresBureauActifs = membresBureau
  .filter(membre => membre.actif)
  .sort((a, b) => a.ordre_affichage - b.ordre_affichage)
