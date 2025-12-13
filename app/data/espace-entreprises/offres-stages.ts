// Donnees mock des offres de stages pour l'Espace Entreprises

export type StatutStage = 'brouillon' | 'publiee' | 'expiree' | 'cloturee' | 'pourvue'
export type ModeRemote = 'presentiel' | 'hybride' | 'full_remote'
export type NiveauEtudes = 'bac' | 'bac2' | 'licence' | 'master1' | 'master2' | 'doctorat'

export interface OffreStage {
  id: string
  titre: string
  description: string
  missions: string[]
  competences_requises: string[]
  duree_mois: number
  niveau_etudes: NiveauEtudes
  mode_remote: ModeRemote
  ville: string
  pays: string
  gratification: number
  devise: string
  embauche_possible: boolean
  statut: StatutStage
  date_creation: string
  date_publication?: string
  date_debut: string
  date_fin_candidature: string
  nombre_vues: number
  nombre_candidatures: number
  nombre_candidatures_non_lues: number
}

// Configuration des statuts
export const statutStageConfig: Record<StatutStage, { label: string; color: string; icon: string }> = {
  brouillon: {
    label: 'Brouillon',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    icon: 'fa-solid fa-file-alt'
  },
  publiee: {
    label: 'Publiee',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    icon: 'fa-solid fa-check-circle'
  },
  expiree: {
    label: 'Expiree',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    icon: 'fa-solid fa-clock'
  },
  cloturee: {
    label: 'Cloturee',
    color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    icon: 'fa-solid fa-times-circle'
  },
  pourvue: {
    label: 'Pourvue',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-user-check'
  }
}

// Configuration des niveaux d'etudes
export const niveauEtudesConfig: Record<NiveauEtudes, { label: string; shortLabel: string }> = {
  bac: { label: 'Baccalaureat', shortLabel: 'Bac' },
  bac2: { label: 'Bac+2 (BTS/DUT)', shortLabel: 'Bac+2' },
  licence: { label: 'Licence (Bac+3)', shortLabel: 'Licence' },
  master1: { label: 'Master 1 (Bac+4)', shortLabel: 'M1' },
  master2: { label: 'Master 2 / Ingenieur (Bac+5)', shortLabel: 'M2' },
  doctorat: { label: 'Doctorat (Bac+8)', shortLabel: 'Doctorat' }
}

// Configuration des modes de travail
export const remoteConfig: Record<ModeRemote, { label: string; icon: string }> = {
  presentiel: { label: 'Presentiel', icon: 'fa-solid fa-building' },
  hybride: { label: 'Hybride', icon: 'fa-solid fa-arrows-left-right' },
  full_remote: { label: 'Full Remote', icon: 'fa-solid fa-house-laptop' }
}

// Configuration des durees
export const dureesOptions = [
  { value: 2, label: '2 mois' },
  { value: 3, label: '3 mois' },
  { value: 4, label: '4 mois' },
  { value: 6, label: '6 mois' },
  { value: 12, label: '12 mois' }
]

// Liste des offres de stages mock
export const offresStagesList: OffreStage[] = [
  {
    id: '1',
    titre: 'Stage Developpeur Mobile React Native',
    description: 'Rejoignez notre equipe mobile pour participer au developpement de notre application phare. Vous serez integre(e) a une equipe agile et participerez a toutes les phases du developpement.',
    missions: [
      'Developper des fonctionnalites mobiles avec React Native',
      'Participer aux revues de code et aux ceremonies agile',
      'Rediger la documentation technique',
      'Effectuer des tests unitaires et d\'integration'
    ],
    competences_requises: ['React Native', 'JavaScript', 'Git', 'REST API'],
    duree_mois: 6,
    niveau_etudes: 'master1',
    mode_remote: 'hybride',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    gratification: 150000,
    devise: 'FCFA',
    embauche_possible: true,
    statut: 'publiee',
    date_creation: '2024-01-03',
    date_publication: '2024-01-05',
    date_debut: '2024-03-01',
    date_fin_candidature: '2024-02-15',
    nombre_vues: 234,
    nombre_candidatures: 18,
    nombre_candidatures_non_lues: 5
  },
  {
    id: '2',
    titre: 'Stage Data Science & Machine Learning',
    description: 'Stage au sein de notre equipe Data pour travailler sur des projets de Machine Learning appliques a la finance. Vous serez encadre(e) par un Data Scientist senior.',
    missions: [
      'Analyser et preparer les donnees pour les modeles ML',
      'Developper et entrainer des modeles predictifs',
      'Creer des visualisations et des rapports',
      'Participer a la mise en production des modeles'
    ],
    competences_requises: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Statistiques'],
    duree_mois: 6,
    niveau_etudes: 'master2',
    mode_remote: 'presentiel',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    gratification: 200000,
    devise: 'FCFA',
    embauche_possible: true,
    statut: 'publiee',
    date_creation: '2024-01-08',
    date_publication: '2024-01-10',
    date_debut: '2024-04-01',
    date_fin_candidature: '2024-03-01',
    nombre_vues: 312,
    nombre_candidatures: 24,
    nombre_candidatures_non_lues: 8
  },
  {
    id: '3',
    titre: 'Stage Assistant Chef de Projet IT',
    description: 'Accompagnez notre equipe projet dans la gestion de projets de transformation digitale. Une excellente opportunite pour decouvrir le metier de chef de projet.',
    missions: [
      'Assister le chef de projet dans la planification',
      'Suivre l\'avancement des taches et les livrables',
      'Participer aux reunions avec les parties prenantes',
      'Rediger des comptes-rendus et de la documentation'
    ],
    competences_requises: ['Organisation', 'Communication', 'Excel', 'PowerPoint'],
    duree_mois: 4,
    niveau_etudes: 'licence',
    mode_remote: 'presentiel',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    gratification: 100000,
    devise: 'FCFA',
    embauche_possible: false,
    statut: 'publiee',
    date_creation: '2024-01-12',
    date_publication: '2024-01-14',
    date_debut: '2024-02-15',
    date_fin_candidature: '2024-02-01',
    nombre_vues: 156,
    nombre_candidatures: 12,
    nombre_candidatures_non_lues: 3
  },
  {
    id: '4',
    titre: 'Stage DevOps / Cloud',
    description: 'Integrez notre equipe Infrastructure pour apprendre les pratiques DevOps et la gestion d\'environnements cloud. Formation complete assuree.',
    missions: [
      'Administrer des environnements cloud AWS',
      'Mettre en place des pipelines CI/CD',
      'Automatiser des taches avec des scripts',
      'Monitorer les applications et l\'infrastructure'
    ],
    competences_requises: ['Linux', 'Git', 'Docker', 'Scripting (Bash/Python)'],
    duree_mois: 6,
    niveau_etudes: 'master1',
    mode_remote: 'hybride',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    gratification: 175000,
    devise: 'FCFA',
    embauche_possible: true,
    statut: 'brouillon',
    date_creation: '2024-01-18',
    date_debut: '2024-04-01',
    date_fin_candidature: '2024-03-15',
    nombre_vues: 0,
    nombre_candidatures: 0,
    nombre_candidatures_non_lues: 0
  },
  {
    id: '5',
    titre: 'Stage UX Research',
    description: 'Stage dedie a la recherche utilisateur pour ameliorer l\'experience de nos produits digitaux. Vous menerez des etudes qualitatives et quantitatives.',
    missions: [
      'Conduire des interviews utilisateurs',
      'Creer et analyser des questionnaires',
      'Realiser des tests d\'utilisabilite',
      'Synthetiser les insights et formuler des recommandations'
    ],
    competences_requises: ['Recherche utilisateur', 'Analyse qualitative', 'Figma', 'Communication'],
    duree_mois: 3,
    niveau_etudes: 'master1',
    mode_remote: 'presentiel',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    gratification: 120000,
    devise: 'FCFA',
    embauche_possible: false,
    statut: 'pourvue',
    date_creation: '2023-10-01',
    date_publication: '2023-10-05',
    date_debut: '2023-11-15',
    date_fin_candidature: '2023-11-01',
    nombre_vues: 445,
    nombre_candidatures: 28,
    nombre_candidatures_non_lues: 0
  },
  {
    id: '6',
    titre: 'Stage Developpeur Backend Node.js',
    description: 'Participez au developpement de nos APIs et microservices. Vous travaillerez sur des projets concrets avec des technologies modernes.',
    missions: [
      'Developper des APIs RESTful avec Node.js',
      'Implementer des fonctionnalites backend',
      'Ecrire des tests automatises',
      'Documenter les APIs'
    ],
    competences_requises: ['Node.js', 'TypeScript', 'PostgreSQL', 'REST API'],
    duree_mois: 6,
    niveau_etudes: 'licence',
    mode_remote: 'hybride',
    ville: 'Dakar',
    pays: 'Senegal',
    gratification: 130000,
    devise: 'FCFA',
    embauche_possible: true,
    statut: 'expiree',
    date_creation: '2023-09-01',
    date_publication: '2023-09-05',
    date_debut: '2023-10-15',
    date_fin_candidature: '2023-10-01',
    nombre_vues: 289,
    nombre_candidatures: 15,
    nombre_candidatures_non_lues: 0
  }
]

// Fonction pour obtenir un stage par ID
export const getStageById = (id: string): OffreStage | undefined => {
  return offresStagesList.find(stage => stage.id === id)
}

// Fonction pour filtrer les stages par statut
export const getStagesByStatut = (statut: StatutStage): OffreStage[] => {
  return offresStagesList.filter(stage => stage.statut === statut)
}

// Statistiques des stages
export const stagesStats = {
  total: offresStagesList.length,
  publiees: offresStagesList.filter(s => s.statut === 'publiee').length,
  brouillons: offresStagesList.filter(s => s.statut === 'brouillon').length,
  pourvues: offresStagesList.filter(s => s.statut === 'pourvue').length,
  expirees: offresStagesList.filter(s => s.statut === 'expiree').length,
  totalVues: offresStagesList.reduce((acc, s) => acc + s.nombre_vues, 0),
  totalCandidatures: offresStagesList.reduce((acc, s) => acc + s.nombre_candidatures, 0),
  candidaturesNonLues: offresStagesList.reduce((acc, s) => acc + s.nombre_candidatures_non_lues, 0)
}
