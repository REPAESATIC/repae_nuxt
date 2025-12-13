// Donnees mock des offres d'emploi pour l'Espace Entreprises

export type StatutOffre = 'brouillon' | 'publiee' | 'expiree' | 'cloturee'
export type TypeContrat = 'cdi' | 'cdd' | 'freelance' | 'consultant'
export type ModeRemote = 'presentiel' | 'hybride' | 'full_remote'
export type NiveauExperience = 'junior' | 'intermediaire' | 'senior' | 'expert'

export interface OffreEmploi {
  id: string
  titre: string
  type_contrat: TypeContrat
  niveau_experience: NiveauExperience
  mode_remote: ModeRemote
  ville: string
  pays: string
  salaire_min?: number
  salaire_max?: number
  devise: string
  description: string
  profil_recherche: string
  competences_requises: string[]
  niveau_etudes: string
  statut: StatutOffre
  date_creation: string
  date_publication?: string
  date_expiration: string
  nombre_vues: number
  nombre_candidatures: number
  nombre_candidatures_non_lues: number
}

// Configuration des statuts
export const statutConfig: Record<StatutOffre, { label: string; color: string; icon: string }> = {
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
  }
}

// Configuration des types de contrat
export const contratConfig: Record<TypeContrat, { label: string; color: string }> = {
  cdi: {
    label: 'CDI',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
  },
  cdd: {
    label: 'CDD',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
  },
  freelance: {
    label: 'Freelance',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
  },
  consultant: {
    label: 'Consultant',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400'
  }
}

// Configuration des modes de travail
export const remoteConfig: Record<ModeRemote, { label: string; icon: string }> = {
  presentiel: { label: 'Presentiel', icon: 'fa-solid fa-building' },
  hybride: { label: 'Hybride', icon: 'fa-solid fa-arrows-left-right' },
  full_remote: { label: 'Full Remote', icon: 'fa-solid fa-house-laptop' }
}

// Liste des offres d'emploi mock
export const offresEmploiList: OffreEmploi[] = [
  {
    id: '1',
    titre: 'Developpeur Full Stack Senior',
    type_contrat: 'cdi',
    niveau_experience: 'senior',
    mode_remote: 'hybride',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    salaire_min: 800000,
    salaire_max: 1200000,
    devise: 'FCFA',
    description: 'Nous recherchons un developpeur Full Stack Senior pour rejoindre notre equipe technique. Vous serez responsable du developpement de nouvelles fonctionnalites et de l\'amelioration continue de notre plateforme.',
    profil_recherche: 'Passione par le developpement web, vous avez une forte capacite d\'adaptation et aimez travailler en equipe. Vous etes rigoureux et avez le souci du detail.',
    competences_requises: ['Vue.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker'],
    niveau_etudes: 'Bac+5 / Master 2 / Ingenieur',
    statut: 'publiee',
    date_creation: '2024-01-05',
    date_publication: '2024-01-10',
    date_expiration: '2024-02-10',
    nombre_vues: 156,
    nombre_candidatures: 12,
    nombre_candidatures_non_lues: 3
  },
  {
    id: '2',
    titre: 'Chef de Projet IT',
    type_contrat: 'cdi',
    niveau_experience: 'senior',
    mode_remote: 'presentiel',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    salaire_min: 1000000,
    salaire_max: 1500000,
    devise: 'FCFA',
    description: 'Nous cherchons un Chef de Projet IT experimente pour piloter nos projets de transformation digitale. Vous serez le garant de la qualite et du respect des delais.',
    profil_recherche: 'Leader naturel avec d\'excellentes capacites de communication, vous savez federer les equipes et gerer les priorites. Une certification PMP ou Scrum Master est un plus.',
    competences_requises: ['Gestion de projet', 'Agile/Scrum', 'JIRA', 'Communication', 'Leadership'],
    niveau_etudes: 'Bac+5 / Master 2 / Ingenieur',
    statut: 'publiee',
    date_creation: '2024-01-08',
    date_publication: '2024-01-12',
    date_expiration: '2024-02-15',
    nombre_vues: 89,
    nombre_candidatures: 7,
    nombre_candidatures_non_lues: 2
  },
  {
    id: '3',
    titre: 'Data Analyst Junior',
    type_contrat: 'cdd',
    niveau_experience: 'junior',
    mode_remote: 'hybride',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    salaire_min: 400000,
    salaire_max: 600000,
    devise: 'FCFA',
    description: 'Rejoignez notre equipe Data en tant que Data Analyst Junior. Vous participerez a l\'analyse des donnees commerciales et a la creation de tableaux de bord.',
    profil_recherche: 'Curieux et rigoureux, vous aimez manipuler les donnees et en extraire des insights pertinents. Vous avez un bon sens de la visualisation.',
    competences_requises: ['Python', 'SQL', 'Excel', 'Power BI', 'Statistiques'],
    niveau_etudes: 'Bac+3 / Licence',
    statut: 'publiee',
    date_creation: '2024-01-15',
    date_publication: '2024-01-16',
    date_expiration: '2024-02-20',
    nombre_vues: 234,
    nombre_candidatures: 28,
    nombre_candidatures_non_lues: 8
  },
  {
    id: '4',
    titre: 'DevOps Engineer',
    type_contrat: 'freelance',
    niveau_experience: 'intermediaire',
    mode_remote: 'full_remote',
    ville: 'Remote',
    pays: 'International',
    salaire_min: 150,
    salaire_max: 250,
    devise: 'EUR',
    description: 'Mission freelance de 6 mois pour un DevOps Engineer. Vous mettrez en place notre infrastructure cloud et automatiserez nos processus de deploiement.',
    profil_recherche: 'Expert en infrastructure cloud, vous maitrisez les outils d\'automatisation et avez une bonne comprehension des enjeux de securite.',
    competences_requises: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    niveau_etudes: 'Bac+5 / Master 2 / Ingenieur',
    statut: 'brouillon',
    date_creation: '2024-01-18',
    date_expiration: '2024-03-01',
    nombre_vues: 0,
    nombre_candidatures: 0,
    nombre_candidatures_non_lues: 0
  },
  {
    id: '5',
    titre: 'Consultant SAP',
    type_contrat: 'consultant',
    niveau_experience: 'expert',
    mode_remote: 'presentiel',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    salaire_min: 1500000,
    salaire_max: 2500000,
    devise: 'FCFA',
    description: 'Nous recherchons un Consultant SAP experimente pour accompagner notre migration vers SAP S/4HANA. Mission de 12 mois avec possibilite de prolongation.',
    profil_recherche: 'Expert SAP avec une forte experience en migration S/4HANA, vous avez d\'excellentes capacites d\'analyse et de conseil.',
    competences_requises: ['SAP S/4HANA', 'SAP FI/CO', 'ABAP', 'Analyse fonctionnelle', 'Conduite du changement'],
    niveau_etudes: 'Bac+5 / Master 2 / Ingenieur',
    statut: 'expiree',
    date_creation: '2023-11-01',
    date_publication: '2023-11-05',
    date_expiration: '2023-12-31',
    nombre_vues: 312,
    nombre_candidatures: 15,
    nombre_candidatures_non_lues: 0
  },
  {
    id: '6',
    titre: 'UX/UI Designer',
    type_contrat: 'cdi',
    niveau_experience: 'intermediaire',
    mode_remote: 'hybride',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    salaire_min: 600000,
    salaire_max: 900000,
    devise: 'FCFA',
    description: 'Nous cherchons un UX/UI Designer creatif pour concevoir des interfaces utilisateur innovantes et intuitives pour nos applications mobiles et web.',
    profil_recherche: 'Creatif et centre utilisateur, vous avez un oeil affute pour le design et une bonne comprehension des principes UX.',
    competences_requises: ['Figma', 'Adobe XD', 'Design System', 'Prototypage', 'User Research'],
    niveau_etudes: 'Bac+3 / Licence',
    statut: 'cloturee',
    date_creation: '2023-10-15',
    date_publication: '2023-10-20',
    date_expiration: '2023-11-30',
    nombre_vues: 445,
    nombre_candidatures: 32,
    nombre_candidatures_non_lues: 0
  }
]

// Fonction pour obtenir une offre par ID
export const getOffreById = (id: string): OffreEmploi | undefined => {
  return offresEmploiList.find(offre => offre.id === id)
}

// Fonction pour filtrer les offres par statut
export const getOffresByStatut = (statut: StatutOffre): OffreEmploi[] => {
  return offresEmploiList.filter(offre => offre.statut === statut)
}

// Statistiques des offres
export const offresStats = {
  total: offresEmploiList.length,
  publiees: offresEmploiList.filter(o => o.statut === 'publiee').length,
  brouillons: offresEmploiList.filter(o => o.statut === 'brouillon').length,
  expirees: offresEmploiList.filter(o => o.statut === 'expiree').length,
  cloturees: offresEmploiList.filter(o => o.statut === 'cloturee').length,
  totalVues: offresEmploiList.reduce((acc, o) => acc + o.nombre_vues, 0),
  totalCandidatures: offresEmploiList.reduce((acc, o) => acc + o.nombre_candidatures, 0),
  candidaturesNonLues: offresEmploiList.reduce((acc, o) => acc + o.nombre_candidatures_non_lues, 0)
}
