// Données des documents officiels du REPAE

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
    description: 'Les statuts définissent les règles fondamentales de fonctionnement de l\'association, ses objectifs, son organisation et les droits et devoirs de ses membres.',
    fichier_url: '/documents/statuts-repae-v1.pdf',
    version: '1.0',
    date_publication: '2022-03-15',
    public: true
  },
  {
    id: 'reglement-v1',
    titre: 'Règlement Intérieur',
    type: 'reglement',
    description: 'Le règlement intérieur précise les modalités pratiques d\'application des statuts et les règles de vie au sein du réseau.',
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
  preambule: `Le Réseau Professionnel des Alumni de l'ESATIC (REPAE) est une association à but non lucratif regroupant les anciens étudiants de l'École Supérieure Africaine des Technologies de l'Information et de la Communication.`,
  articles: [
    {
      numero: 1,
      titre: 'Dénomination',
      contenu: 'Il est fondé entre les adhérents aux présents statuts une association régie par la loi, ayant pour dénomination : Réseau Professionnel des Alumni de l\'ESATIC, en abrégé REPAE.'
    },
    {
      numero: 2,
      titre: 'Objet',
      contenu: 'L\'association a pour objet de rassembler les anciens étudiants de l\'ESATIC afin de maintenir les liens de fraternité, favoriser l\'insertion professionnelle et créer un cadre d\'entraide et de formation continue.'
    },
    {
      numero: 3,
      titre: 'Siège social',
      contenu: 'Le siège social est fixé à Abidjan, Côte d\'Ivoire. Il pourra être transféré par simple décision du bureau.'
    },
    {
      numero: 4,
      titre: 'Durée',
      contenu: 'La durée de l\'association est illimitée.'
    },
    {
      numero: 5,
      titre: 'Membres',
      contenu: 'Peut devenir membre toute personne ayant été étudiant à l\'ESATIC et adhérant aux présents statuts.'
    }
  ]
}

// Contenu du règlement intérieur (pour affichage inline si pas de PDF)
export const reglementContenu = {
  preambule: `Le présent règlement intérieur complète et précise les statuts du REPAE. Il s'applique à tous les membres de l'association.`,
  articles: [
    {
      numero: 1,
      titre: 'Adhésion',
      contenu: 'Toute demande d\'adhésion doit être adressée au bureau qui statue sur son acceptation. L\'adhésion est effective après paiement de la cotisation annuelle.'
    },
    {
      numero: 2,
      titre: 'Cotisation',
      contenu: 'Le montant de la cotisation annuelle est fixé par l\'assemblée générale. Elle est payable au début de chaque exercice.'
    },
    {
      numero: 3,
      titre: 'Droits des membres',
      contenu: 'Les membres à jour de leur cotisation bénéficient de tous les services et avantages offerts par le réseau.'
    },
    {
      numero: 4,
      titre: 'Devoirs des membres',
      contenu: 'Les membres s\'engagent à respecter les statuts et le règlement intérieur, à participer aux activités du réseau et à promouvoir ses valeurs.'
    },
    {
      numero: 5,
      titre: 'Sanctions',
      contenu: 'Tout manquement aux obligations peut entraîner des sanctions allant de l\'avertissement à l\'exclusion, prononcées par le bureau.'
    }
  ]
}
