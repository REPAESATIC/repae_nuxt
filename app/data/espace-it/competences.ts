// Donnees mock des competences de l'utilisateur (Cote d'Ivoire - ESATIC)

export type NiveauCompetence = 'debutant' | 'intermediaire' | 'avance' | 'expert'

export type CategorieCompetence = 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'soft_skills' | 'autre'

export interface Competence {
  id: string
  nom: string
  categorie: CategorieCompetence
  niveau: NiveauCompetence
  annees_experience?: number
  certifie?: boolean
}

export const competences: Competence[] = [
  // Frontend
  {
    id: '1',
    nom: 'Vue.js',
    categorie: 'frontend',
    niveau: 'expert',
    annees_experience: 5,
    certifie: false
  },
  {
    id: '2',
    nom: 'React',
    categorie: 'frontend',
    niveau: 'avance',
    annees_experience: 3
  },
  {
    id: '3',
    nom: 'TypeScript',
    categorie: 'frontend',
    niveau: 'avance',
    annees_experience: 4
  },
  {
    id: '4',
    nom: 'Tailwind CSS',
    categorie: 'frontend',
    niveau: 'expert',
    annees_experience: 3
  },
  // Backend
  {
    id: '5',
    nom: 'Node.js',
    categorie: 'backend',
    niveau: 'expert',
    annees_experience: 5
  },
  {
    id: '6',
    nom: 'Python',
    categorie: 'backend',
    niveau: 'intermediaire',
    annees_experience: 2
  },
  {
    id: '7',
    nom: 'Laravel',
    categorie: 'backend',
    niveau: 'avance',
    annees_experience: 3
  },
  // Database
  {
    id: '8',
    nom: 'PostgreSQL',
    categorie: 'database',
    niveau: 'avance',
    annees_experience: 4
  },
  {
    id: '9',
    nom: 'MongoDB',
    categorie: 'database',
    niveau: 'avance',
    annees_experience: 3
  },
  // DevOps
  {
    id: '10',
    nom: 'Docker',
    categorie: 'devops',
    niveau: 'avance',
    annees_experience: 3
  },
  {
    id: '11',
    nom: 'AWS',
    categorie: 'devops',
    niveau: 'avance',
    annees_experience: 2,
    certifie: true
  },
  {
    id: '12',
    nom: 'CI/CD',
    categorie: 'devops',
    niveau: 'intermediaire',
    annees_experience: 2
  },
  // Mobile
  {
    id: '13',
    nom: 'React Native',
    categorie: 'mobile',
    niveau: 'intermediaire',
    annees_experience: 2
  },
  // Soft Skills
  {
    id: '14',
    nom: 'Gestion de projet',
    categorie: 'soft_skills',
    niveau: 'avance',
    annees_experience: 3
  },
  {
    id: '15',
    nom: 'Leadership',
    categorie: 'soft_skills',
    niveau: 'intermediaire',
    annees_experience: 2
  }
]

// Configuration des niveaux
export const niveauConfig: Record<NiveauCompetence, { label: string; color: string; percent: number }> = {
  debutant: {
    label: 'Debutant',
    color: 'bg-gray-400 dark:bg-gray-500',
    percent: 25
  },
  intermediaire: {
    label: 'Intermediaire',
    color: 'bg-blue-500 dark:bg-blue-400',
    percent: 50
  },
  avance: {
    label: 'Avance',
    color: 'bg-green-500 dark:bg-green-400',
    percent: 75
  },
  expert: {
    label: 'Expert',
    color: 'bg-repae-blue-500 dark:bg-repae-blue-400',
    percent: 100
  }
}

// Configuration des categories
export const categorieConfig: Record<CategorieCompetence, { label: string; icon: string }> = {
  frontend: { label: 'Frontend', icon: 'fa-solid fa-palette' },
  backend: { label: 'Backend', icon: 'fa-solid fa-server' },
  database: { label: 'Base de donnees', icon: 'fa-solid fa-database' },
  devops: { label: 'DevOps', icon: 'fa-solid fa-cloud' },
  mobile: { label: 'Mobile', icon: 'fa-solid fa-mobile-screen-button' },
  soft_skills: { label: 'Soft Skills', icon: 'fa-solid fa-users' },
  autre: { label: 'Autre', icon: 'fa-solid fa-ellipsis' }
}

// Helper pour grouper les competences par categorie
export const getCompetencesByCategorie = (competences: Competence[]): Record<CategorieCompetence, Competence[]> => {
  return competences.reduce((acc, comp) => {
    if (!acc[comp.categorie]) {
      acc[comp.categorie] = []
    }
    acc[comp.categorie].push(comp)
    return acc
  }, {} as Record<CategorieCompetence, Competence[]>)
}
