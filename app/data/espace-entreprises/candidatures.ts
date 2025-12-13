// Donnees mock des candidatures pour l'Espace Entreprises

export type StatutCandidature = 'nouvelle' | 'vue' | 'en_cours' | 'acceptee' | 'refusee'
export type TypeOffre = 'emploi' | 'stage'
export type Disponibilite = 'disponible' | 'en_poste' | 'en_recherche'

export interface AlumniCandidature {
  id: string
  prenom: string
  nom: string
  photo_url: string
  poste_actuel: string
  promotion: number
  disponibilite: Disponibilite
  ville: string
  competences: string[]
}

export interface Candidature {
  id: string
  offre_id: string
  type_offre: TypeOffre
  alumni: AlumniCandidature
  date_candidature: string
  statut: StatutCandidature
  cv_url: string
  lettre_motivation: string
  note_recruteur?: string
  date_derniere_action?: string
}

// Configuration des statuts
export const statutCandidatureConfig: Record<StatutCandidature, { label: string; color: string; icon: string }> = {
  nouvelle: {
    label: 'Nouvelle',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-envelope'
  },
  vue: {
    label: 'Vue',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    icon: 'fa-solid fa-eye'
  },
  en_cours: {
    label: 'En cours',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    icon: 'fa-solid fa-clock'
  },
  acceptee: {
    label: 'Acceptee',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    icon: 'fa-solid fa-check-circle'
  },
  refusee: {
    label: 'Refusee',
    color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    icon: 'fa-solid fa-times-circle'
  }
}

// Configuration des disponibilites
export const disponibiliteConfig: Record<Disponibilite, { label: string; color: string }> = {
  disponible: {
    label: 'Disponible',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
  },
  en_poste: {
    label: 'En poste',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
  },
  en_recherche: {
    label: 'En recherche',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
  }
}

// Liste des candidatures mock
export const candidaturesList: Candidature[] = [
  // Candidatures pour offre emploi 1 (Developpeur Full Stack)
  {
    id: '1',
    offre_id: '1',
    type_offre: 'emploi',
    alumni: {
      id: '1',
      prenom: 'Jean',
      nom: 'Kouassi',
      photo_url: 'https://i.pravatar.cc/150?u=jean',
      poste_actuel: 'Developpeur Full Stack',
      promotion: 2019,
      disponibilite: 'en_recherche',
      ville: 'Abidjan',
      competences: ['Vue.js', 'Node.js', 'PostgreSQL', 'Docker']
    },
    date_candidature: '2024-01-15',
    statut: 'nouvelle',
    cv_url: '/mock/cv-jean-kouassi.pdf',
    lettre_motivation: 'Fort de 4 ans d\'experience en developpement web, je souhaite rejoindre votre equipe pour contribuer a vos projets innovants. Ma maitrise de Vue.js et Node.js correspond parfaitement aux technologies que vous utilisez.'
  },
  {
    id: '2',
    offre_id: '1',
    type_offre: 'emploi',
    alumni: {
      id: '2',
      prenom: 'Marie',
      nom: 'Kone',
      photo_url: 'https://i.pravatar.cc/150?u=marie',
      poste_actuel: 'Lead Developer',
      promotion: 2017,
      disponibilite: 'en_poste',
      ville: 'Abidjan',
      competences: ['React', 'TypeScript', 'AWS', 'MongoDB']
    },
    date_candidature: '2024-01-14',
    statut: 'en_cours',
    cv_url: '/mock/cv-marie-kone.pdf',
    lettre_motivation: 'Actuellement Lead Developer chez TechStartup, je recherche un nouveau defi au sein d\'une entreprise a forte croissance. Mon experience en gestion d\'equipe et en architecture logicielle serait un atout pour votre structure.',
    note_recruteur: 'Excellent profil, entretien technique prevu le 25/01',
    date_derniere_action: '2024-01-18'
  },
  {
    id: '3',
    offre_id: '1',
    type_offre: 'emploi',
    alumni: {
      id: '3',
      prenom: 'Paul',
      nom: 'Diallo',
      photo_url: 'https://i.pravatar.cc/150?u=paul',
      poste_actuel: 'Developpeur Backend',
      promotion: 2020,
      disponibilite: 'disponible',
      ville: 'Dakar',
      competences: ['Python', 'Django', 'PostgreSQL', 'Redis']
    },
    date_candidature: '2024-01-12',
    statut: 'vue',
    cv_url: '/mock/cv-paul-diallo.pdf',
    lettre_motivation: 'Passionne par le developpement backend, je suis a la recherche d\'une opportunite qui me permettra de mettre en pratique mes competences en Python et Django dans un environnement stimulant.'
  },
  {
    id: '4',
    offre_id: '1',
    type_offre: 'emploi',
    alumni: {
      id: '4',
      prenom: 'Aminata',
      nom: 'Traore',
      photo_url: 'https://i.pravatar.cc/150?u=aminata',
      poste_actuel: 'Software Engineer',
      promotion: 2018,
      disponibilite: 'en_recherche',
      ville: 'Abidjan',
      competences: ['Java', 'Spring Boot', 'Kubernetes', 'CI/CD']
    },
    date_candidature: '2024-01-10',
    statut: 'refusee',
    cv_url: '/mock/cv-aminata-traore.pdf',
    lettre_motivation: 'Ingenieure logiciel avec 5 ans d\'experience, je souhaite integrer une equipe dynamique pour developper des solutions a fort impact.',
    note_recruteur: 'Profil interessant mais stack technique different de nos besoins actuels',
    date_derniere_action: '2024-01-16'
  },
  // Candidatures pour offre emploi 2 (Data Analyst)
  {
    id: '5',
    offre_id: '2',
    type_offre: 'emploi',
    alumni: {
      id: '5',
      prenom: 'Yao',
      nom: 'Kouame',
      photo_url: 'https://i.pravatar.cc/150?u=yao',
      poste_actuel: 'Data Analyst Junior',
      promotion: 2021,
      disponibilite: 'en_recherche',
      ville: 'Abidjan',
      competences: ['Python', 'SQL', 'Power BI', 'Excel']
    },
    date_candidature: '2024-01-18',
    statut: 'nouvelle',
    cv_url: '/mock/cv-yao-kouame.pdf',
    lettre_motivation: 'Passionne par l\'analyse de donnees, je souhaite mettre mes competences en Python et SQL au service de votre entreprise pour extraire des insights pertinents.'
  },
  {
    id: '6',
    offre_id: '2',
    type_offre: 'emploi',
    alumni: {
      id: '6',
      prenom: 'Fatou',
      nom: 'Sylla',
      photo_url: 'https://i.pravatar.cc/150?u=fatou',
      poste_actuel: 'Business Intelligence Analyst',
      promotion: 2019,
      disponibilite: 'en_poste',
      ville: 'Abidjan',
      competences: ['Tableau', 'SQL', 'Python', 'Looker']
    },
    date_candidature: '2024-01-17',
    statut: 'en_cours',
    cv_url: '/mock/cv-fatou-sylla.pdf',
    lettre_motivation: 'Avec 4 ans d\'experience en BI, je recherche une opportunite me permettant de prendre plus de responsabilites dans la strategie data de l\'entreprise.',
    note_recruteur: 'Profil senior interessant, a rencontrer',
    date_derniere_action: '2024-01-19'
  },
  // Candidatures pour stage 1 (Mobile React Native)
  {
    id: '7',
    offre_id: '1',
    type_offre: 'stage',
    alumni: {
      id: '7',
      prenom: 'Mamadou',
      nom: 'Ba',
      photo_url: 'https://i.pravatar.cc/150?u=mamadou',
      poste_actuel: 'Etudiant M1 Informatique',
      promotion: 2025,
      disponibilite: 'disponible',
      ville: 'Abidjan',
      competences: ['React Native', 'JavaScript', 'Git', 'Firebase']
    },
    date_candidature: '2024-01-16',
    statut: 'nouvelle',
    cv_url: '/mock/cv-mamadou-ba.pdf',
    lettre_motivation: 'Etudiant en Master 1 Informatique, je suis passionne par le developpement mobile. Ce stage serait l\'opportunite ideale pour mettre en pratique mes connaissances en React Native.'
  },
  {
    id: '8',
    offre_id: '1',
    type_offre: 'stage',
    alumni: {
      id: '8',
      prenom: 'Aissatou',
      nom: 'Diop',
      photo_url: 'https://i.pravatar.cc/150?u=aissatou',
      poste_actuel: 'Etudiante M1 Genie Logiciel',
      promotion: 2025,
      disponibilite: 'disponible',
      ville: 'Dakar',
      competences: ['React', 'React Native', 'TypeScript', 'Node.js']
    },
    date_candidature: '2024-01-14',
    statut: 'en_cours',
    cv_url: '/mock/cv-aissatou-diop.pdf',
    lettre_motivation: 'Passionnee par le developpement mobile, j\'ai deja realise plusieurs projets personnels avec React Native. Je serais ravie de rejoindre votre equipe pour un stage de fin d\'etudes.',
    note_recruteur: 'Tres bon profil technique, entretien positif',
    date_derniere_action: '2024-01-18'
  },
  {
    id: '9',
    offre_id: '1',
    type_offre: 'stage',
    alumni: {
      id: '9',
      prenom: 'Ibrahim',
      nom: 'Toure',
      photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
      poste_actuel: 'Etudiant L3 Informatique',
      promotion: 2026,
      disponibilite: 'disponible',
      ville: 'Abidjan',
      competences: ['JavaScript', 'React', 'HTML/CSS', 'Git']
    },
    date_candidature: '2024-01-13',
    statut: 'vue',
    cv_url: '/mock/cv-ibrahim-toure.pdf',
    lettre_motivation: 'En derniere annee de Licence, je recherche un stage me permettant de decouvrir le developpement mobile professionnel.'
  },
  // Candidatures pour stage 2 (Data Science)
  {
    id: '10',
    offre_id: '2',
    type_offre: 'stage',
    alumni: {
      id: '10',
      prenom: 'Salimata',
      nom: 'Coulibaly',
      photo_url: 'https://i.pravatar.cc/150?u=salimata',
      poste_actuel: 'Etudiante M2 Data Science',
      promotion: 2024,
      disponibilite: 'disponible',
      ville: 'Abidjan',
      competences: ['Python', 'TensorFlow', 'Scikit-learn', 'SQL']
    },
    date_candidature: '2024-01-17',
    statut: 'nouvelle',
    cv_url: '/mock/cv-salimata-coulibaly.pdf',
    lettre_motivation: 'Etudiante en Master 2 Data Science, je suis particulierement interessee par l\'application du Machine Learning dans le secteur financier.'
  },
  {
    id: '11',
    offre_id: '2',
    type_offre: 'stage',
    alumni: {
      id: '11',
      prenom: 'Ousmane',
      nom: 'Sow',
      photo_url: 'https://i.pravatar.cc/150?u=ousmane',
      poste_actuel: 'Etudiant M2 Intelligence Artificielle',
      promotion: 2024,
      disponibilite: 'disponible',
      ville: 'Dakar',
      competences: ['Python', 'PyTorch', 'Deep Learning', 'NLP']
    },
    date_candidature: '2024-01-15',
    statut: 'acceptee',
    cv_url: '/mock/cv-ousmane-sow.pdf',
    lettre_motivation: 'Passionne par l\'IA et le Deep Learning, j\'ai realise plusieurs projets de NLP durant mon cursus. Ce stage est une opportunite unique de travailler sur des cas concrets.',
    note_recruteur: 'Candidature retenue, debut stage prevu le 01/03',
    date_derniere_action: '2024-01-20'
  },
  // Candidatures pour stage 3 (Chef de projet)
  {
    id: '12',
    offre_id: '3',
    type_offre: 'stage',
    alumni: {
      id: '12',
      prenom: 'Kadiatou',
      nom: 'Keita',
      photo_url: 'https://i.pravatar.cc/150?u=kadiatou',
      poste_actuel: 'Etudiante L3 Management SI',
      promotion: 2026,
      disponibilite: 'disponible',
      ville: 'Abidjan',
      competences: ['Gestion de projet', 'Excel', 'PowerPoint', 'Communication']
    },
    date_candidature: '2024-01-18',
    statut: 'nouvelle',
    cv_url: '/mock/cv-kadiatou-keita.pdf',
    lettre_motivation: 'Etudiante en Management des Systemes d\'Information, je souhaite decouvrir le metier de chef de projet IT a travers ce stage.'
  }
]

// Fonction pour obtenir les candidatures par offre
export const getCandidaturesByOffre = (offreId: string, typeOffre: TypeOffre): Candidature[] => {
  return candidaturesList.filter(c => c.offre_id === offreId && c.type_offre === typeOffre)
}

// Fonction pour obtenir une candidature par ID
export const getCandidatureById = (id: string): Candidature | undefined => {
  return candidaturesList.find(c => c.id === id)
}

// Fonction pour obtenir les statistiques des candidatures
export const getCandidaturesStats = (offreId: string, typeOffre: TypeOffre) => {
  const candidatures = getCandidaturesByOffre(offreId, typeOffre)
  return {
    total: candidatures.length,
    nouvelles: candidatures.filter(c => c.statut === 'nouvelle').length,
    vues: candidatures.filter(c => c.statut === 'vue').length,
    en_cours: candidatures.filter(c => c.statut === 'en_cours').length,
    acceptees: candidatures.filter(c => c.statut === 'acceptee').length,
    refusees: candidatures.filter(c => c.statut === 'refusee').length
  }
}

// Statistiques globales
export const candidaturesGlobalStats = {
  total: candidaturesList.length,
  nouvelles: candidaturesList.filter(c => c.statut === 'nouvelle').length,
  en_cours: candidaturesList.filter(c => c.statut === 'en_cours').length,
  acceptees: candidaturesList.filter(c => c.statut === 'acceptee').length
}
