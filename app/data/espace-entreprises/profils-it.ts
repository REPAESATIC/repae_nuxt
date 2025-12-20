// Donnees mock des profils IT pour l'Espace Entreprises

export type Disponibilite = 'disponible' | 'en_poste' | 'en_recherche'
export type NiveauExperience = 'junior' | 'confirme' | 'senior' | 'expert'

export interface ProfilIT {
  id: string
  prenom: string
  nom: string
  photo_url: string
  titre: string
  resume: string
  ville: string
  pays: string
  disponibilite: Disponibilite
  promotion: number
  experience_annees: number
  niveau_experience: NiveauExperience
  competences: string[]
  secteur_activite: string
  entreprise_actuelle?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  site_web?: string
  email_visible: boolean
  telephone_visible: boolean
  derniere_mise_a_jour: string
  nombre_vues: number
}

// Configuration des disponibilites
export const disponibiliteConfig: Record<Disponibilite, { label: string; color: string; icon: string }> = {
  disponible: {
    label: 'Disponible',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    icon: 'fa-solid fa-check-circle'
  },
  en_poste: {
    label: 'En poste',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    icon: 'fa-solid fa-briefcase'
  },
  en_recherche: {
    label: 'En recherche',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-search'
  }
}

// Configuration des niveaux d'experience
export const niveauExperienceConfig: Record<NiveauExperience, { label: string; min: number; max: number }> = {
  junior: { label: 'Junior (0-2 ans)', min: 0, max: 2 },
  confirme: { label: 'Confirme (3-5 ans)', min: 3, max: 5 },
  senior: { label: 'Senior (6-10 ans)', min: 6, max: 10 },
  expert: { label: 'Expert (10+ ans)', min: 10, max: 99 }
}

// Liste des competences disponibles (pour les filtres)
export const competencesDisponibles = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP', 'Go', 'Rust',
  'React', 'Vue.js', 'Angular', 'Node.js', 'Django', 'Spring Boot', 'Laravel',
  'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch',
  'DevOps', 'CI/CD', 'Git', 'Agile', 'Scrum',
  'UI/UX', 'Figma', 'Adobe XD'
]

// Liste des villes
export const villesDisponibles = ['Abidjan', 'Dakar', 'Douala', 'Lome', 'Cotonou', 'Ouagadougou', 'Bamako', 'Conakry']

// Liste des profils IT mock
export const profilsITList: ProfilIT[] = [
  {
    id: '1',
    prenom: 'Marie',
    nom: 'Kone',
    photo_url: 'https://i.pravatar.cc/150?u=marie.kone',
    titre: 'Data Scientist Senior',
    resume: 'Data Scientist passionnee avec 5 ans d\'experience en Machine Learning et analyse de donnees. Specialisee dans les modeles predictifs pour le secteur financier.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'en_recherche',
    promotion: 2019,
    experience_annees: 5,
    niveau_experience: 'senior',
    competences: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'AWS'],
    secteur_activite: 'Finance',
    entreprise_actuelle: 'DataTech CI',
    linkedin_url: 'https://linkedin.com/in/marie-kone',
    github_url: 'https://github.com/mariekone',
    site_web: 'https://mariekone.dev',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-15',
    nombre_vues: 127
  },
  {
    id: '2',
    prenom: 'Jean',
    nom: 'Kouassi',
    photo_url: 'https://i.pravatar.cc/150?u=jean.kouassi',
    titre: 'Developpeur Full Stack',
    resume: 'Developpeur Full Stack specialise en Vue.js et Node.js. Experience en developpement d\'applications web performantes et scalables.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'disponible',
    promotion: 2020,
    experience_annees: 4,
    niveau_experience: 'confirme',
    competences: ['Vue.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    secteur_activite: 'Tech',
    linkedin_url: 'https://linkedin.com/in/jean-kouassi',
    github_url: 'https://github.com/jeankouassi',
    site_web: 'https://jeankouassi.dev',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-18',
    nombre_vues: 89
  },
  {
    id: '3',
    prenom: 'Aminata',
    nom: 'Diallo',
    photo_url: 'https://i.pravatar.cc/150?u=aminata.diallo',
    titre: 'DevOps Engineer',
    resume: 'Ingenieure DevOps certifiee AWS avec expertise en infrastructure cloud et automatisation. Passionnee par les pratiques CI/CD et la conteneurisation.',
    ville: 'Dakar',
    pays: 'Senegal',
    disponibilite: 'en_poste',
    promotion: 2018,
    experience_annees: 6,
    niveau_experience: 'senior',
    competences: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Python', 'Terraform'],
    secteur_activite: 'Cloud Services',
    entreprise_actuelle: 'CloudAfrica',
    linkedin_url: 'https://linkedin.com/in/aminata-diallo',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-10',
    nombre_vues: 156
  },
  {
    id: '4',
    prenom: 'Paul',
    nom: 'Mensah',
    photo_url: 'https://i.pravatar.cc/150?u=paul.mensah',
    titre: 'Lead Developer React',
    resume: 'Lead Developer avec 7 ans d\'experience en developpement front-end. Expert React et TypeScript, j\'accompagne les equipes vers l\'excellence technique.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'en_recherche',
    promotion: 2017,
    experience_annees: 7,
    niveau_experience: 'senior',
    competences: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Agile'],
    secteur_activite: 'E-commerce',
    entreprise_actuelle: 'ShopTech',
    linkedin_url: 'https://linkedin.com/in/paul-mensah',
    github_url: 'https://github.com/paulmensah',
    twitter_url: 'https://twitter.com/paulmensah_dev',
    site_web: 'https://paulmensah.io',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-12',
    nombre_vues: 203
  },
  {
    id: '5',
    prenom: 'Fatou',
    nom: 'Sylla',
    photo_url: 'https://i.pravatar.cc/150?u=fatou.sylla',
    titre: 'UX/UI Designer',
    resume: 'Designer UX/UI creative avec une approche centree utilisateur. Experience en design d\'applications mobiles et web pour des startups tech africaines.',
    ville: 'Dakar',
    pays: 'Senegal',
    disponibilite: 'disponible',
    promotion: 2021,
    experience_annees: 3,
    niveau_experience: 'confirme',
    competences: ['Figma', 'UI/UX', 'Adobe XD', 'Prototyping', 'User Research'],
    secteur_activite: 'Design',
    linkedin_url: 'https://linkedin.com/in/fatou-sylla',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-20',
    nombre_vues: 78
  },
  {
    id: '6',
    prenom: 'Yao',
    nom: 'Kouame',
    photo_url: 'https://i.pravatar.cc/150?u=yao.kouame',
    titre: 'Backend Developer Java',
    resume: 'Developpeur Backend specialise en Java et Spring Boot. Expertise en architectures microservices et systemes distribues.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'en_poste',
    promotion: 2019,
    experience_annees: 5,
    niveau_experience: 'senior',
    competences: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Docker'],
    secteur_activite: 'Banque',
    entreprise_actuelle: 'AfriBank Tech',
    linkedin_url: 'https://linkedin.com/in/yao-kouame',
    email_visible: false,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-08',
    nombre_vues: 112
  },
  {
    id: '7',
    prenom: 'Aissatou',
    nom: 'Ba',
    photo_url: 'https://i.pravatar.cc/150?u=aissatou.ba',
    titre: 'Mobile Developer',
    resume: 'Developpeuse mobile passionnee, specialisee en React Native et Flutter. Creation d\'applications performantes pour iOS et Android.',
    ville: 'Douala',
    pays: 'Cameroun',
    disponibilite: 'en_recherche',
    promotion: 2020,
    experience_annees: 4,
    niveau_experience: 'confirme',
    competences: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Git'],
    secteur_activite: 'Mobile',
    linkedin_url: 'https://linkedin.com/in/aissatou-ba',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-16',
    nombre_vues: 95
  },
  {
    id: '8',
    prenom: 'Ibrahim',
    nom: 'Traore',
    photo_url: 'https://i.pravatar.cc/150?u=ibrahim.traore',
    titre: 'Security Engineer',
    resume: 'Ingenieur en cybersecurite avec certification CISSP. Expertise en audit de securite, tests d\'intrusion et conformite.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'en_poste',
    promotion: 2016,
    experience_annees: 8,
    niveau_experience: 'senior',
    competences: ['Cybersecurity', 'Pentesting', 'AWS', 'Python', 'SIEM'],
    secteur_activite: 'Securite',
    entreprise_actuelle: 'SecureIT Africa',
    linkedin_url: 'https://linkedin.com/in/ibrahim-traore',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-05',
    nombre_vues: 167
  },
  {
    id: '9',
    prenom: 'Salimata',
    nom: 'Coulibaly',
    photo_url: 'https://i.pravatar.cc/150?u=salimata.coulibaly',
    titre: 'Product Manager',
    resume: 'Product Manager avec background technique. Experience en lancement de produits B2B SaaS et methodologies agiles.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'disponible',
    promotion: 2018,
    experience_annees: 6,
    niveau_experience: 'senior',
    competences: ['Product Management', 'Agile', 'Scrum', 'User Research', 'SQL'],
    secteur_activite: 'SaaS',
    linkedin_url: 'https://linkedin.com/in/salimata-coulibaly',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-19',
    nombre_vues: 134
  },
  {
    id: '10',
    prenom: 'Ousmane',
    nom: 'Sow',
    photo_url: 'https://i.pravatar.cc/150?u=ousmane.sow',
    titre: 'Machine Learning Engineer',
    resume: 'ML Engineer specialise en NLP et computer vision. Experience en deploiement de modeles en production a grande echelle.',
    ville: 'Dakar',
    pays: 'Senegal',
    disponibilite: 'en_recherche',
    promotion: 2019,
    experience_annees: 5,
    niveau_experience: 'senior',
    competences: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'AWS'],
    secteur_activite: 'IA',
    entreprise_actuelle: 'AI Labs Africa',
    linkedin_url: 'https://linkedin.com/in/ousmane-sow',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-14',
    nombre_vues: 189
  },
  {
    id: '11',
    prenom: 'Kadiatou',
    nom: 'Keita',
    photo_url: 'https://i.pravatar.cc/150?u=kadiatou.keita',
    titre: 'QA Engineer',
    resume: 'Ingenieure QA avec expertise en automatisation des tests. Maitrise de Selenium, Cypress et tests de performance.',
    ville: 'Lome',
    pays: 'Togo',
    disponibilite: 'disponible',
    promotion: 2021,
    experience_annees: 3,
    niveau_experience: 'confirme',
    competences: ['Selenium', 'Cypress', 'JavaScript', 'CI/CD', 'Agile'],
    secteur_activite: 'QA',
    linkedin_url: 'https://linkedin.com/in/kadiatou-keita',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-17',
    nombre_vues: 62
  },
  {
    id: '12',
    prenom: 'Mamadou',
    nom: 'Diop',
    photo_url: 'https://i.pravatar.cc/150?u=mamadou.diop',
    titre: 'Cloud Architect',
    resume: 'Architecte Cloud certifie multi-cloud (AWS, Azure, GCP). Design de solutions cloud-native pour entreprises en croissance.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'en_poste',
    promotion: 2015,
    experience_annees: 9,
    niveau_experience: 'expert',
    competences: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Architecture'],
    secteur_activite: 'Cloud',
    entreprise_actuelle: 'MultiCloud Solutions',
    linkedin_url: 'https://linkedin.com/in/mamadou-diop',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-11',
    nombre_vues: 245
  },
  {
    id: '13',
    prenom: 'Adama',
    nom: 'Toure',
    photo_url: 'https://i.pravatar.cc/150?u=adama.toure',
    titre: 'Frontend Developer',
    resume: 'Developpeur Frontend passione par les interfaces utilisateur modernes. Expertise Vue.js et animations CSS.',
    ville: 'Ouagadougou',
    pays: 'Burkina Faso',
    disponibilite: 'en_recherche',
    promotion: 2022,
    experience_annees: 2,
    niveau_experience: 'junior',
    competences: ['Vue.js', 'JavaScript', 'CSS', 'Tailwind', 'Git'],
    secteur_activite: 'Web',
    linkedin_url: 'https://linkedin.com/in/adama-toure',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-21',
    nombre_vues: 45
  },
  {
    id: '14',
    prenom: 'Nadia',
    nom: 'Ouedraogo',
    photo_url: 'https://i.pravatar.cc/150?u=nadia.ouedraogo',
    titre: 'Data Engineer',
    resume: 'Data Engineer specialisee en pipelines de donnees et ETL. Experience avec Spark, Airflow et architectures data lake.',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    disponibilite: 'en_poste',
    promotion: 2018,
    experience_annees: 6,
    niveau_experience: 'senior',
    competences: ['Python', 'Spark', 'Airflow', 'SQL', 'AWS', 'Kafka'],
    secteur_activite: 'Data',
    entreprise_actuelle: 'DataFlow CI',
    linkedin_url: 'https://linkedin.com/in/nadia-ouedraogo',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-09',
    nombre_vues: 98
  },
  {
    id: '15',
    prenom: 'Sekou',
    nom: 'Camara',
    photo_url: 'https://i.pravatar.cc/150?u=sekou.camara',
    titre: 'PHP Developer',
    resume: 'Developpeur PHP/Laravel avec experience en e-commerce. Creation de solutions web robustes et performantes.',
    ville: 'Conakry',
    pays: 'Guinee',
    disponibilite: 'disponible',
    promotion: 2020,
    experience_annees: 4,
    niveau_experience: 'confirme',
    competences: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Docker'],
    secteur_activite: 'E-commerce',
    linkedin_url: 'https://linkedin.com/in/sekou-camara',
    email_visible: true,
    telephone_visible: true,
    derniere_mise_a_jour: '2024-01-13',
    nombre_vues: 56
  },
  {
    id: '16',
    prenom: 'Mariam',
    nom: 'Sangare',
    photo_url: 'https://i.pravatar.cc/150?u=mariam.sangare',
    titre: 'Scrum Master',
    resume: 'Scrum Master certifiee avec experience en transformation agile. Accompagnement d\'equipes vers l\'excellence operationnelle.',
    ville: 'Bamako',
    pays: 'Mali',
    disponibilite: 'en_recherche',
    promotion: 2017,
    experience_annees: 7,
    niveau_experience: 'senior',
    competences: ['Scrum', 'Agile', 'Jira', 'Confluence', 'Coaching'],
    secteur_activite: 'Management',
    linkedin_url: 'https://linkedin.com/in/mariam-sangare',
    email_visible: true,
    telephone_visible: false,
    derniere_mise_a_jour: '2024-01-06',
    nombre_vues: 87
  }
]

// Fonction pour obtenir un profil par ID
export const getProfilById = (id: string): ProfilIT | undefined => {
  return profilsITList.find(profil => profil.id === id)
}

// Fonction pour filtrer les profils
export interface ProfilFilters {
  search?: string
  competences?: string[]
  disponibilite?: Disponibilite | 'all'
  niveauExperience?: NiveauExperience | 'all'
  promotionMin?: number
  promotionMax?: number
  ville?: string | 'all'
}

export const filterProfils = (filters: ProfilFilters): ProfilIT[] => {
  let result = [...profilsITList]

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(p =>
      p.prenom.toLowerCase().includes(searchLower) ||
      p.nom.toLowerCase().includes(searchLower) ||
      p.titre.toLowerCase().includes(searchLower) ||
      p.competences.some(c => c.toLowerCase().includes(searchLower))
    )
  }

  // Competences filter
  if (filters.competences && filters.competences.length > 0) {
    result = result.filter(p =>
      filters.competences!.some(c => p.competences.includes(c))
    )
  }

  // Disponibilite filter
  if (filters.disponibilite && filters.disponibilite !== 'all') {
    result = result.filter(p => p.disponibilite === filters.disponibilite)
  }

  // Niveau experience filter
  if (filters.niveauExperience && filters.niveauExperience !== 'all') {
    result = result.filter(p => p.niveau_experience === filters.niveauExperience)
  }

  // Promotion filter
  if (filters.promotionMin) {
    result = result.filter(p => p.promotion >= filters.promotionMin!)
  }
  if (filters.promotionMax) {
    result = result.filter(p => p.promotion <= filters.promotionMax!)
  }

  // Ville filter
  if (filters.ville && filters.ville !== 'all') {
    result = result.filter(p => p.ville === filters.ville)
  }

  return result
}

// Statistiques globales
export const profilsStats = {
  total: profilsITList.length,
  disponibles: profilsITList.filter(p => p.disponibilite === 'disponible').length,
  enRecherche: profilsITList.filter(p => p.disponibilite === 'en_recherche').length,
  enPoste: profilsITList.filter(p => p.disponibilite === 'en_poste').length
}

// Liste des promotions uniques
export const promotionsDisponibles = [...new Set(profilsITList.map(p => p.promotion))].sort((a, b) => b - a)
