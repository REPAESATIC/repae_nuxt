// Donnees des documents officiels du REPAE

export interface DocumentOfficiel {
  id: string
  titre: string
  type: 'statut' | 'reglement' | 'proces_verbal' | 'autre'
  description: string
  fichier_url: string
  version: string
  date_publication: string
  public: boolean
}

export const documentsOfficiels: DocumentOfficiel[] = [
  {
    id: 'statuts-v1',
    titre: 'Statuts du REPAE',
    type: 'statut',
    description: 'Les statuts definissent les regles fondamentales de fonctionnement de l\'association, ses objectifs, son organisation et les droits et devoirs de ses membres.',
    fichier_url: '/documents/statuts-repae-v1.pdf',
    version: '1.0',
    date_publication: '2022-03-15',
    public: true
  },
  {
    id: 'reglement-v1',
    titre: 'Reglement Interieur',
    type: 'reglement',
    description: 'Le reglement interieur precise les modalites pratiques d\'application des statuts et les regles de vie au sein du reseau.',
    fichier_url: '/documents/reglement-interieur-repae-v1.pdf',
    version: '1.0',
    date_publication: '2022-03-15',
    public: true
  }
]

export const statuts = documentsOfficiels.find(doc => doc.type === 'statut')
export const reglement = documentsOfficiels.find(doc => doc.type === 'reglement')

// Contenu des statuts (pour affichage inline si pas de PDF)
export const statutsContenu = {
  preambule: `Le Reseau Professionnel des Alumni de l'ESATIC (REPAE) est une association a but non lucratif regroupant les anciens etudiants de l'Ecole Superieure Africaine des Technologies de l'Information et de la Communication.`,
  articles: [
    {
      numero: 1,
      titre: 'Denomination',
      contenu: 'Il est fonde entre les adherents aux presents statuts une association regie par la loi, ayant pour denomination : Reseau Professionnel des Alumni de l\'ESATIC, en abrege REPAE.'
    },
    {
      numero: 2,
      titre: 'Objet',
      contenu: 'L\'association a pour objet de rassembler les anciens etudiants de l\'ESATIC afin de maintenir les liens de fraternite, favoriser l\'insertion professionnelle et creer un cadre d\'entraide et de formation continue.'
    },
    {
      numero: 3,
      titre: 'Siege social',
      contenu: 'Le siege social est fixe a Abidjan, Cote d\'Ivoire. Il pourra etre transfere par simple decision du bureau.'
    },
    {
      numero: 4,
      titre: 'Duree',
      contenu: 'La duree de l\'association est illimitee.'
    },
    {
      numero: 5,
      titre: 'Membres',
      contenu: 'Peut devenir membre toute personne ayant ete etudiant a l\'ESATIC et adherant aux presents statuts.'
    }
  ]
}

// Contenu du reglement interieur (pour affichage inline si pas de PDF)
export const reglementContenu = {
  preambule: `Le present reglement interieur complete et precise les statuts du REPAE. Il s'applique a tous les membres de l'association.`,
  articles: [
    {
      numero: 1,
      titre: 'Adhesion',
      contenu: 'Toute demande d\'adhesion doit etre adressee au bureau qui statue sur son acceptation. L\'adhesion est effective apres paiement de la cotisation annuelle.'
    },
    {
      numero: 2,
      titre: 'Cotisation',
      contenu: 'Le montant de la cotisation annuelle est fixe par l\'assemblee generale. Elle est payable au debut de chaque exercice.'
    },
    {
      numero: 3,
      titre: 'Droits des membres',
      contenu: 'Les membres a jour de leur cotisation beneficient de tous les services et avantages offerts par le reseau.'
    },
    {
      numero: 4,
      titre: 'Devoirs des membres',
      contenu: 'Les membres s\'engagent a respecter les statuts et le reglement interieur, a participer aux activites du reseau et a promouvoir ses valeurs.'
    },
    {
      numero: 5,
      titre: 'Sanctions',
      contenu: 'Tout manquement aux obligations peut entrainer des sanctions allant de l\'avertissement a l\'exclusion, prononcees par le bureau.'
    }
  ]
}
