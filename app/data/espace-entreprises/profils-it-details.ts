// Donnees detaillees des profils IT pour la vue CV

export type NiveauCompetence = 'debutant' | 'intermediaire' | 'avance' | 'expert'

export interface Experience {
  id: string
  poste: string
  entreprise: string
  ville: string
  pays: string
  date_debut: string
  date_fin?: string // undefined = poste actuel
  description: string
  realisations: string[]
}

export interface Formation {
  id: string
  diplome: string
  etablissement: string
  ville: string
  pays: string
  annee_obtention: number
  mention?: string
}

export interface Certification {
  id: string
  nom: string
  organisme: string
  date_obtention: string
  date_expiration?: string
  url_verification?: string
}

export interface Projet {
  id: string
  nom: string
  description: string
  technologies: string[]
  url?: string
  image_url?: string
}

export interface CompetenceDetaille {
  nom: string
  niveau: NiveauCompetence
  annees_experience: number
}

export interface ProfilITDetail {
  profil_id: string
  email?: string
  telephone?: string
  experiences: Experience[]
  formations: Formation[]
  certifications: Certification[]
  projets: Projet[]
  competences_detaillees: CompetenceDetaille[]
  langues: { langue: string; niveau: string }[]
}

// Configuration des niveaux de competence
export const niveauCompetenceConfig: Record<NiveauCompetence, { label: string; percentage: number; color: string }> = {
  debutant: { label: 'Debutant', percentage: 25, color: 'bg-gray-400' },
  intermediaire: { label: 'Intermediaire', percentage: 50, color: 'bg-blue-500' },
  avance: { label: 'Avance', percentage: 75, color: 'bg-emerald-500' },
  expert: { label: 'Expert', percentage: 100, color: 'bg-purple-500' }
}

// Donnees detaillees mock pour quelques profils
export const profilsITDetails: Record<string, ProfilITDetail> = {
  '1': {
    profil_id: '1',
    email: 'marie.kone@email.com',
    telephone: '+225 07 12 34 56 78',
    experiences: [
      {
        id: 'exp1',
        poste: 'Data Scientist Senior',
        entreprise: 'DataTech CI',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2022-03',
        description: 'Lead de l\'equipe Data Science, responsable des projets de Machine Learning pour les clients du secteur financier.',
        realisations: [
          'Developpement d\'un modele de scoring credit avec 92% de precision',
          'Mise en place d\'un pipeline MLOps pour le deploiement automatise',
          'Formation de 5 data analysts aux techniques de ML',
          'Reduction de 30% du temps de traitement des donnees'
        ]
      },
      {
        id: 'exp2',
        poste: 'Data Scientist',
        entreprise: 'FinanceAfrica',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2020-01',
        date_fin: '2022-02',
        description: 'Analyse de donnees et developpement de modeles predictifs pour la detection de fraude.',
        realisations: [
          'Creation d\'un systeme de detection de fraude en temps reel',
          'Analyse de plus de 10 millions de transactions',
          'Collaboration avec les equipes compliance'
        ]
      },
      {
        id: 'exp3',
        poste: 'Data Analyst',
        entreprise: 'ConsultData',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2019-06',
        date_fin: '2019-12',
        description: 'Stage de fin d\'etudes en analyse de donnees et reporting.',
        realisations: [
          'Creation de dashboards Power BI',
          'Automatisation de rapports mensuels'
        ]
      }
    ],
    formations: [
      {
        id: 'form1',
        diplome: 'Master 2 Data Science & Intelligence Artificielle',
        etablissement: 'Universite Felix Houphouet-Boigny',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        annee_obtention: 2019,
        mention: 'Tres Bien'
      },
      {
        id: 'form2',
        diplome: 'Licence Mathematiques Appliquees',
        etablissement: 'Universite Felix Houphouet-Boigny',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        annee_obtention: 2017
      }
    ],
    certifications: [
      {
        id: 'cert1',
        nom: 'AWS Certified Machine Learning - Specialty',
        organisme: 'Amazon Web Services',
        date_obtention: '2023-06',
        date_expiration: '2026-06'
      },
      {
        id: 'cert2',
        nom: 'TensorFlow Developer Certificate',
        organisme: 'Google',
        date_obtention: '2022-09'
      }
    ],
    projets: [
      {
        id: 'proj1',
        nom: 'PredictLoan',
        description: 'Application de prediction d\'approbation de prets basee sur le ML',
        technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
        url: 'https://github.com/mariekone/predictloan'
      }
    ],
    competences_detaillees: [
      { nom: 'Python', niveau: 'expert', annees_experience: 5 },
      { nom: 'Machine Learning', niveau: 'expert', annees_experience: 4 },
      { nom: 'TensorFlow', niveau: 'avance', annees_experience: 3 },
      { nom: 'SQL', niveau: 'avance', annees_experience: 5 },
      { nom: 'AWS', niveau: 'intermediaire', annees_experience: 2 }
    ],
    langues: [
      { langue: 'Francais', niveau: 'Natif' },
      { langue: 'Anglais', niveau: 'Professionnel' }
    ]
  },
  '2': {
    profil_id: '2',
    email: 'jean.kouassi@email.com',
    telephone: '+225 05 98 76 54 32',
    experiences: [
      {
        id: 'exp1',
        poste: 'Developpeur Full Stack Senior',
        entreprise: 'TechStartup CI',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2022-01',
        description: 'Developpement d\'applications web avec Vue.js et Node.js pour une plateforme SaaS B2B.',
        realisations: [
          'Architecture et developpement d\'un dashboard analytique',
          'Migration de l\'application de Vue 2 vers Vue 3',
          'Implementation d\'un systeme de paiement integre',
          'Amelioration des performances de 40%'
        ]
      },
      {
        id: 'exp2',
        poste: 'Developpeur Frontend',
        entreprise: 'WebAgency',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2020-06',
        date_fin: '2021-12',
        description: 'Creation d\'interfaces utilisateur modernes pour divers clients.',
        realisations: [
          'Developpement de 15+ sites web responsives',
          'Implementation de composants Vue.js reutilisables'
        ]
      }
    ],
    formations: [
      {
        id: 'form1',
        diplome: 'Master 2 Genie Logiciel',
        etablissement: 'ESATIC',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        annee_obtention: 2020,
        mention: 'Bien'
      }
    ],
    certifications: [
      {
        id: 'cert1',
        nom: 'Vue.js Certified Developer',
        organisme: 'Vue School',
        date_obtention: '2023-03'
      }
    ],
    projets: [
      {
        id: 'proj1',
        nom: 'TaskManager Pro',
        description: 'Application de gestion de taches collaborative avec Vue.js',
        technologies: ['Vue.js', 'Pinia', 'Tailwind CSS', 'Supabase'],
        url: 'https://taskmanager-pro.app'
      },
      {
        id: 'proj2',
        nom: 'E-commerce Template',
        description: 'Template e-commerce open source avec Nuxt 3',
        technologies: ['Nuxt 3', 'TypeScript', 'Stripe'],
        url: 'https://github.com/jeankouassi/ecommerce-nuxt'
      }
    ],
    competences_detaillees: [
      { nom: 'Vue.js', niveau: 'expert', annees_experience: 4 },
      { nom: 'TypeScript', niveau: 'avance', annees_experience: 3 },
      { nom: 'Node.js', niveau: 'avance', annees_experience: 3 },
      { nom: 'PostgreSQL', niveau: 'intermediaire', annees_experience: 2 },
      { nom: 'Docker', niveau: 'intermediaire', annees_experience: 2 }
    ],
    langues: [
      { langue: 'Francais', niveau: 'Natif' },
      { langue: 'Anglais', niveau: 'Courant' }
    ]
  },
  '4': {
    profil_id: '4',
    email: 'paul.mensah@email.com',
    telephone: '+225 07 11 22 33 44',
    experiences: [
      {
        id: 'exp1',
        poste: 'Lead Developer React',
        entreprise: 'ShopTech',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2021-06',
        description: 'Direction technique de l\'equipe frontend (8 developpeurs) pour une plateforme e-commerce majeure.',
        realisations: [
          'Refonte complete de la plateforme avec React et Next.js',
          'Mise en place de GraphQL pour l\'API',
          'Implementation du design system',
          'Augmentation de la productivite de l\'equipe de 50%'
        ]
      },
      {
        id: 'exp2',
        poste: 'Senior React Developer',
        entreprise: 'DigitalAgency',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2018-09',
        date_fin: '2021-05',
        description: 'Developpement d\'applications React pour des clients varies.',
        realisations: [
          'Developpement de 10+ applications React en production',
          'Mentorat de developpeurs juniors',
          'Creation de composants accessibles (WCAG 2.1)'
        ]
      },
      {
        id: 'exp3',
        poste: 'Frontend Developer',
        entreprise: 'WebCorp',
        ville: 'Abidjan',
        pays: 'Cote d\'Ivoire',
        date_debut: '2017-01',
        date_fin: '2018-08',
        description: 'Developpement frontend avec React et Angular.',
        realisations: [
          'Migration d\'applications legacy vers React',
          'Optimisation des performances web'
        ]
      }
    ],
    formations: [
      {
        id: 'form1',
        diplome: 'Ingenieur Informatique',
        etablissement: 'INP-HB',
        ville: 'Yamoussoukro',
        pays: 'Cote d\'Ivoire',
        annee_obtention: 2017,
        mention: 'Tres Bien'
      }
    ],
    certifications: [
      {
        id: 'cert1',
        nom: 'Meta Front-End Developer Professional Certificate',
        organisme: 'Meta',
        date_obtention: '2022-11'
      },
      {
        id: 'cert2',
        nom: 'AWS Certified Developer - Associate',
        organisme: 'Amazon Web Services',
        date_obtention: '2023-02',
        date_expiration: '2026-02'
      }
    ],
    projets: [
      {
        id: 'proj1',
        nom: 'React Component Library',
        description: 'Bibliotheque de composants React accessible et personnalisable',
        technologies: ['React', 'TypeScript', 'Storybook', 'Testing Library'],
        url: 'https://github.com/paulmensah/react-ui-lib'
      }
    ],
    competences_detaillees: [
      { nom: 'React', niveau: 'expert', annees_experience: 7 },
      { nom: 'TypeScript', niveau: 'expert', annees_experience: 5 },
      { nom: 'Node.js', niveau: 'avance', annees_experience: 4 },
      { nom: 'GraphQL', niveau: 'avance', annees_experience: 3 },
      { nom: 'Next.js', niveau: 'avance', annees_experience: 3 }
    ],
    langues: [
      { langue: 'Francais', niveau: 'Natif' },
      { langue: 'Anglais', niveau: 'Bilingue' }
    ]
  }
}

// Fonction pour obtenir les details d'un profil
export const getProfilDetails = (profilId: string): ProfilITDetail | undefined => {
  return profilsITDetails[profilId]
}

// Fonction pour generer des details par defaut si non disponibles
export const getOrGenerateProfilDetails = (profilId: string, profil: any): ProfilITDetail => {
  const existing = profilsITDetails[profilId]
  if (existing) return existing

  // Generer des details par defaut bases sur le profil
  return {
    profil_id: profilId,
    email: profil.email_visible ? `${profil.prenom.toLowerCase()}.${profil.nom.toLowerCase()}@email.com` : undefined,
    telephone: profil.telephone_visible ? '+225 XX XX XX XX XX' : undefined,
    experiences: [
      {
        id: 'exp1',
        poste: profil.titre,
        entreprise: profil.entreprise_actuelle || 'Entreprise',
        ville: profil.ville,
        pays: profil.pays,
        date_debut: `${2024 - profil.experience_annees}-01`,
        description: profil.resume,
        realisations: ['Contribution aux projets de l\'equipe', 'Developpement de fonctionnalites']
      }
    ],
    formations: [
      {
        id: 'form1',
        diplome: 'Master en Informatique',
        etablissement: 'Universite',
        ville: profil.ville,
        pays: profil.pays,
        annee_obtention: profil.promotion
      }
    ],
    certifications: [],
    projets: [],
    competences_detaillees: profil.competences.map((c: string, i: number) => ({
      nom: c,
      niveau: i < 2 ? 'expert' : i < 4 ? 'avance' : 'intermediaire',
      annees_experience: Math.max(1, profil.experience_annees - i)
    })),
    langues: [
      { langue: 'Francais', niveau: 'Natif' }
    ]
  }
}
