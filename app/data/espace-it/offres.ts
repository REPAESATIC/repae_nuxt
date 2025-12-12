// Donnees mock des offres d'emploi pour l'Espace IT

export type TypeContrat = 'cdi' | 'cdd' | 'stage' | 'freelance' | 'Consultant'
export type NiveauExperience = 'junior' | 'intermediaire' | 'senior' | 'expert'
export type ModeRemote = 'presentiel' | 'hybride' | 'full_remote'
export type StatutOffre = 'active' | 'pourvue' | 'expiree'

export interface Offre {
  id: string
  titre: string
  entreprise: {
    id: string
    nom: string
    logo_url: string
    ville: string
    pays: string
  }
  type_contrat: TypeContrat
  niveau_experience: NiveauExperience
  mode_remote: ModeRemote
  salaire_min?: number
  salaire_max?: number
  devise?: string
  description: string
  description_complete: string
  responsabilites: string[]
  competences_requises: string[]
  competences_souhaitees?: string[]
  avantages?: string[]
  date_publication: string
  date_expiration: string
  statut: StatutOffre
  nombre_candidatures: number
  publie_par: {
    id: string
    prenom: string
    nom: string
    photo_url: string
    poste: string
  }
}

// Configuration des types de contrat
export const contratConfig: Record<TypeContrat, { label: string; color: string; icon: string }> = {
  cdi: {
    label: 'CDI',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    icon: 'fa-solid fa-infinity'
  },
  cdd: {
    label: 'CDD',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-calendar-check'
  },
  stage: {
    label: 'Stage',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    icon: 'fa-solid fa-graduation-cap'
  },
  freelance: {
    label: 'Freelance',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    icon: 'fa-solid fa-laptop-code'
  },
  Consultant: {
    label: 'Consultant',
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400',
    icon: 'fa-solid fa-rotate'
  }
}

// Configuration des niveaux d'experience
export const experienceConfig: Record<NiveauExperience, { label: string; annees: string }> = {
  junior: { label: 'Junior', annees: '0-2 ans' },
  intermediaire: { label: 'Intermediaire', annees: '2-5 ans' },
  senior: { label: 'Senior', annees: '5-8 ans' },
  expert: { label: 'Expert', annees: '8+ ans' }
}

// Configuration des modes de travail
export const remoteConfig: Record<ModeRemote, { label: string; icon: string }> = {
  presentiel: { label: 'Presentiel', icon: 'fa-solid fa-building' },
  hybride: { label: 'Hybride', icon: 'fa-solid fa-arrows-left-right' },
  full_remote: { label: 'Full Remote', icon: 'fa-solid fa-house-laptop' }
}

// Liste des offres d'emploi mock
export const offresList: Offre[] = [
  {
    id: '1',
    titre: 'Developpeur Full Stack Senior',
    entreprise: {
      id: '1',
      nom: 'AfriPay Solutions',
      logo_url: 'https://picsum.photos/seed/afripay/200',
      ville: 'Abidjan',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'cdi',
    niveau_experience: 'senior',
    mode_remote: 'hybride',
    salaire_min: 1500000,
    salaire_max: 2500000,
    devise: 'FCFA',
    description: 'Rejoignez notre equipe technique pour developper des solutions de paiement innovantes pour l\'Afrique de l\'Ouest.',
    description_complete: `AfriPay Solutions recherche un Developpeur Full Stack Senior pour rejoindre notre equipe technique en pleine croissance.

Vous travaillerez sur notre plateforme de paiement mobile utilisee par plus de 500 000 utilisateurs dans 5 pays d'Afrique de l'Ouest. Vous participerez a la conception et au developpement de nouvelles fonctionnalites, tout en assurant la maintenance et l'amelioration continue de nos systemes existants.

Notre stack technique inclut Vue.js/Nuxt pour le frontend, Node.js et Python pour le backend, avec PostgreSQL et Redis pour la persistance des donnees. Nous utilisons Kubernetes pour l'orchestration de nos microservices.`,
    responsabilites: [
      'Concevoir et developper de nouvelles fonctionnalites pour notre plateforme de paiement',
      'Participer aux revues de code et maintenir des standards de qualite eleves',
      'Collaborer avec les equipes produit et design pour definir les specifications techniques',
      'Optimiser les performances et la scalabilite de nos systemes',
      'Mentorer les developpeurs juniors de l\'equipe'
    ],
    competences_requises: [
      'Vue.js / Nuxt.js',
      'Node.js',
      'PostgreSQL',
      'API REST',
      'Git',
      'Docker'
    ],
    competences_souhaitees: [
      'Python',
      'Kubernetes',
      'Redis',
      'CI/CD',
      'Tests automatises'
    ],
    avantages: [
      'Teletravail 2 jours par semaine',
      'Assurance sante complete',
      'Budget formation annuel',
      'Ordinateur portable fourni',
      'Tickets restaurant'
    ],
    date_publication: '2024-12-01',
    date_expiration: '2025-01-15',
    statut: 'active',
    nombre_candidatures: 23,
    publie_par: {
      id: '1',
      prenom: 'Kouame',
      nom: 'Yao',
      photo_url: 'https://i.pravatar.cc/150?u=kouame',
      poste: 'CTO'
    }
  },
  {
    id: '2',
    titre: 'Designer UX/UI',
    entreprise: {
      id: '2',
      nom: 'EduTech Afrique',
      logo_url: 'https://picsum.photos/seed/edutech/200',
      ville: 'Dakar',
      pays: 'Senegal'
    },
    type_contrat: 'cdi',
    niveau_experience: 'intermediaire',
    mode_remote: 'full_remote',
    salaire_min: 800000,
    salaire_max: 1200000,
    devise: 'FCFA',
    description: 'Nous recherchons un designer talentueux pour creer des experiences d\'apprentissage engageantes sur notre plateforme educative.',
    description_complete: `EduTech Afrique est une startup EdTech en pleine croissance qui revolutionne l'acces a l'education en Afrique francophone.

Nous recherchons un Designer UX/UI passionne pour rejoindre notre equipe produit. Vous serez responsable de la conception de nos interfaces utilisateur, en veillant a ce qu'elles soient intuitives, accessibles et adaptees aux realites africaines (connexions intermittentes, diversite des appareils).

Vous travaillerez en etroite collaboration avec les equipes de developpement et de contenu pour creer des experiences d'apprentissage engageantes pour nos 100 000+ utilisateurs.`,
    responsabilites: [
      'Concevoir des interfaces utilisateur pour notre plateforme web et mobile',
      'Mener des recherches utilisateurs et des tests d\'utilisabilite',
      'Creer des wireframes, maquettes et prototypes interactifs',
      'Developper et maintenir notre design system',
      'Collaborer avec les developpeurs pour assurer une implementation fidele'
    ],
    competences_requises: [
      'Figma',
      'Design System',
      'Prototypage',
      'Recherche utilisateur',
      'Design responsive'
    ],
    competences_souhaitees: [
      'Animation/Motion design',
      'Accessibilite (WCAG)',
      'HTML/CSS basique',
      'Illustration'
    ],
    avantages: [
      'Full remote',
      'Horaires flexibles',
      'Budget equipement',
      'Conges payes genereux',
      'Mission sociale impactante'
    ],
    date_publication: '2024-12-05',
    date_expiration: '2025-01-20',
    statut: 'active',
    nombre_candidatures: 18,
    publie_par: {
      id: '4',
      prenom: 'Fatou',
      nom: 'Diallo',
      photo_url: 'https://i.pravatar.cc/150?u=fatou',
      poste: 'Head of Product'
    }
  },
  {
    id: '3',
    titre: 'Ingenieur DevOps',
    entreprise: {
      id: '5',
      nom: 'DevHub Africa',
      logo_url: 'https://picsum.photos/seed/devhub/200',
      ville: 'Abidjan',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'cdi',
    niveau_experience: 'senior',
    mode_remote: 'hybride',
    salaire_min: 1800000,
    salaire_max: 2800000,
    devise: 'FCFA',
    description: 'Rejoignez notre equipe infrastructure pour automatiser et optimiser nos deploiements cloud.',
    description_complete: `DevHub Africa recherche un Ingenieur DevOps experimente pour renforcer notre equipe infrastructure.

Vous serez responsable de la mise en place et de la maintenance de notre infrastructure cloud, de l'automatisation des deploiements et de la surveillance de nos systemes de production.

Nous gerons une infrastructure complexe avec plus de 50 microservices deployes sur AWS et GCP, servant des clients dans 8 pays africains.`,
    responsabilites: [
      'Concevoir et maintenir l\'infrastructure cloud (AWS/GCP)',
      'Automatiser les pipelines CI/CD',
      'Implementer les bonnes pratiques de securite',
      'Surveiller et optimiser les performances des systemes',
      'Gerer les incidents et assurer la haute disponibilite'
    ],
    competences_requises: [
      'Kubernetes',
      'Docker',
      'Terraform',
      'AWS ou GCP',
      'CI/CD (GitLab CI, Jenkins)',
      'Linux'
    ],
    competences_souhaitees: [
      'Prometheus/Grafana',
      'Ansible',
      'Python/Bash scripting',
      'Securite cloud'
    ],
    avantages: [
      'Salaire competitif',
      'Teletravail partiel',
      'Certifications cloud financees',
      'Environnement technique stimulant',
      'Equipe internationale'
    ],
    date_publication: '2024-11-28',
    date_expiration: '2025-01-10',
    statut: 'active',
    nombre_candidatures: 12,
    publie_par: {
      id: '7',
      prenom: 'Sekou',
      nom: 'Toure',
      photo_url: 'https://i.pravatar.cc/150?u=sekou',
      poste: 'VP Engineering'
    }
  },
  {
    id: '4',
    titre: 'Developpeur Mobile React Native',
    entreprise: {
      id: '4',
      nom: 'SantePlus Digital',
      logo_url: 'https://picsum.photos/seed/santeplus/200',
      ville: 'Abidjan',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'cdd',
    niveau_experience: 'intermediaire',
    mode_remote: 'presentiel',
    salaire_min: 900000,
    salaire_max: 1400000,
    devise: 'FCFA',
    description: 'Developpez notre application mobile de telesante pour connecter patients et professionnels de sante.',
    description_complete: `SantePlus Digital recherche un Developpeur Mobile pour un CDD de 12 mois avec possibilite de CDI.

Vous rejoindrez notre equipe technique pour developper notre application mobile de telemedicine. L'application permet aux patients de consulter des medecins a distance, de gerer leurs rendez-vous et d'acceder a leur dossier medical.

C'est une opportunite unique de contribuer a l'amelioration de l'acces aux soins de sante en Afrique de l'Ouest.`,
    responsabilites: [
      'Developper de nouvelles fonctionnalites sur notre app React Native',
      'Optimiser les performances de l\'application',
      'Integrer les APIs backend',
      'Participer aux tests et au debugging',
      'Contribuer aux revues de code'
    ],
    competences_requises: [
      'React Native',
      'JavaScript/TypeScript',
      'Redux ou Context API',
      'API REST',
      'Git'
    ],
    competences_souhaitees: [
      'iOS/Android natif',
      'Tests unitaires (Jest)',
      'Firebase',
      'WebRTC'
    ],
    avantages: [
      'Projet a fort impact social',
      'Equipe dynamique',
      'Formation continue',
      'Possibilite de CDI'
    ],
    date_publication: '2024-12-03',
    date_expiration: '2025-01-25',
    statut: 'active',
    nombre_candidatures: 31,
    publie_par: {
      id: '6',
      prenom: 'Aminata',
      nom: 'Kone',
      photo_url: 'https://i.pravatar.cc/150?u=aminata',
      poste: 'Tech Lead Mobile'
    }
  },
  {
    id: '5',
    titre: 'Stagiaire Data Analyst',
    entreprise: {
      id: '3',
      nom: 'AgriConnect CI',
      logo_url: 'https://picsum.photos/seed/agriconnect/200',
      ville: 'Yamoussoukro',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'stage',
    niveau_experience: 'junior',
    mode_remote: 'presentiel',
    description: 'Stage de 6 mois pour analyser les donnees agricoles et aider nos agriculteurs partenaires.',
    description_complete: `AgriConnect CI offre un stage de 6 mois au sein de notre equipe Data.

Vous travaillerez sur l'analyse des donnees collectees aupres de nos 2000+ agriculteurs partenaires. Vos analyses aideront a optimiser les chaines d'approvisionnement et a fournir des recommandations personnalisees aux agriculteurs.

C'est une excellente opportunite pour un etudiant ou jeune diplome souhaitant acquerir une experience concrete en data analysis dans un contexte AgriTech.`,
    responsabilites: [
      'Collecter et nettoyer les donnees agricoles',
      'Creer des dashboards et rapports',
      'Analyser les tendances et patterns',
      'Presenter les insights aux equipes metier',
      'Documenter les processus d\'analyse'
    ],
    competences_requises: [
      'Python (Pandas, NumPy)',
      'SQL',
      'Excel avance',
      'Statistiques de base'
    ],
    competences_souhaitees: [
      'Power BI ou Tableau',
      'Machine Learning basique',
      'Connaissance du secteur agricole'
    ],
    avantages: [
      'Indemnite de stage competitive',
      'Mentorat par des seniors',
      'Possibilite d\'embauche',
      'Transport pris en charge'
    ],
    date_publication: '2024-12-08',
    date_expiration: '2025-02-01',
    statut: 'active',
    nombre_candidatures: 45,
    publie_par: {
      id: '5',
      prenom: 'Ibrahim',
      nom: 'Traore',
      photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
      poste: 'Data Lead'
    }
  },
  {
    id: '6',
    titre: 'Chef de Projet IT',
    entreprise: {
      id: '6',
      nom: 'LogiTrack West',
      logo_url: 'https://picsum.photos/seed/logitrack/200',
      ville: 'Abidjan',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'cdi',
    niveau_experience: 'senior',
    mode_remote: 'presentiel',
    salaire_min: 1600000,
    salaire_max: 2200000,
    devise: 'FCFA',
    description: 'Pilotez nos projets de transformation digitale dans le secteur de la logistique.',
    description_complete: `LogiTrack West recherche un Chef de Projet IT experimente pour piloter nos initiatives de transformation digitale.

Vous serez responsable de la gestion de projets strategiques, de la coordination des equipes et de la relation avec nos clients grands comptes dans le secteur de la logistique et du transport.

Notre plateforme de tracking GPS et de gestion de flotte est utilisee par plus de 200 entreprises en Afrique de l'Ouest.`,
    responsabilites: [
      'Piloter les projets IT de bout en bout',
      'Coordonner les equipes techniques et metier',
      'Gerer le budget et les plannings',
      'Assurer la relation client',
      'Mettre en place les methodologies Agile/Scrum'
    ],
    competences_requises: [
      'Gestion de projet IT',
      'Methodologies Agile/Scrum',
      'Communication client',
      'Budget et planning',
      'Leadership d\'equipe'
    ],
    competences_souhaitees: [
      'PMP ou certification equivalente',
      'Connaissance du secteur logistique',
      'Outils (Jira, Confluence)',
      'Notions techniques (dev, infra)'
    ],
    avantages: [
      'Poste strategique',
      'Vehicule de fonction',
      'Bonus annuel',
      'Formation management',
      'Assurance famille'
    ],
    date_publication: '2024-11-25',
    date_expiration: '2025-01-05',
    statut: 'active',
    nombre_candidatures: 15,
    publie_par: {
      id: '8',
      prenom: 'Mamadou',
      nom: 'Coulibaly',
      photo_url: 'https://i.pravatar.cc/150?u=mamadou',
      poste: 'Directeur des Operations'
    }
  },
  {
    id: '7',
    titre: 'Consultant Cybersecurite',
    entreprise: {
      id: '7',
      nom: 'CyberShield CI',
      logo_url: 'https://picsum.photos/seed/cybershield/200',
      ville: 'Abidjan',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'freelance',
    niveau_experience: 'expert',
    mode_remote: 'hybride',
    salaire_min: 500000,
    salaire_max: 800000,
    devise: 'FCFA/mission',
    description: 'Missions de conseil en securite informatique pour nos clients grands comptes.',
    description_complete: `CyberShield CI recherche des consultants cybersecurite pour des missions ponctuelles aupres de nos clients.

En tant que consultant freelance, vous interviendrez sur des missions variees : audits de securite, tests d'intrusion, mise en conformite RGPD, sensibilisation des equipes.

Nous collaborons avec des banques, des operateurs telecom et des institutions gouvernementales en Afrique de l'Ouest.`,
    responsabilites: [
      'Realiser des audits de securite',
      'Conduire des tests d\'intrusion',
      'Rediger des rapports et recommandations',
      'Former les equipes clients',
      'Assurer une veille sur les menaces'
    ],
    competences_requises: [
      'Pentest (Kali, Metasploit)',
      'Securite reseau',
      'Normes ISO 27001',
      'Redaction de rapports',
      'Communication client'
    ],
    competences_souhaitees: [
      'Certifications (OSCP, CEH, CISSP)',
      'Securite cloud',
      'Forensics',
      'Reponse aux incidents'
    ],
    avantages: [
      'Missions variees',
      'Tarif journalier attractif',
      'Flexibilite',
      'Clients prestigieux',
      'Developpement d\'expertise'
    ],
    date_publication: '2024-12-06',
    date_expiration: '2025-02-28',
    statut: 'active',
    nombre_candidatures: 8,
    publie_par: {
      id: '9',
      prenom: 'Awa',
      nom: 'Diop',
      photo_url: 'https://i.pravatar.cc/150?u=awa',
      poste: 'CEO'
    }
  },
  {
    id: '8',
    titre: 'Developpeur Backend Python',
    entreprise: {
      id: '2',
      nom: 'EduTech Afrique',
      logo_url: 'https://picsum.photos/seed/edutech/200',
      ville: 'Dakar',
      pays: 'Senegal'
    },
    type_contrat: 'cdi',
    niveau_experience: 'intermediaire',
    mode_remote: 'full_remote',
    salaire_min: 1000000,
    salaire_max: 1600000,
    devise: 'FCFA',
    description: 'Developpez les APIs et services backend de notre plateforme d\'e-learning.',
    description_complete: `EduTech Afrique recherche un Developpeur Backend Python pour renforcer notre equipe technique.

Vous travaillerez sur le developpement de nos APIs REST, l'optimisation de nos bases de donnees et l'implementation de nouvelles fonctionnalites pour notre plateforme d'apprentissage en ligne.

Notre stack backend est basee sur Django/Django REST Framework avec PostgreSQL et Redis.`,
    responsabilites: [
      'Developper et maintenir les APIs REST',
      'Optimiser les requetes et performances',
      'Implementer les tests unitaires et d\'integration',
      'Participer aux code reviews',
      'Documenter les APIs'
    ],
    competences_requises: [
      'Python',
      'Django/Django REST Framework',
      'PostgreSQL',
      'API REST',
      'Git'
    ],
    competences_souhaitees: [
      'Redis',
      'Celery',
      'Docker',
      'Tests (pytest)',
      'CI/CD'
    ],
    avantages: [
      'Full remote',
      'Horaires flexibles',
      'Stack moderne',
      'Impact social',
      'Equipe bienveillante'
    ],
    date_publication: '2024-12-04',
    date_expiration: '2025-01-18',
    statut: 'active',
    nombre_candidatures: 27,
    publie_par: {
      id: '4',
      prenom: 'Fatou',
      nom: 'Diallo',
      photo_url: 'https://i.pravatar.cc/150?u=fatou',
      poste: 'Head of Product'
    }
  },
  {
    id: '9',
    titre: 'Alternant Developpeur Web',
    entreprise: {
      id: '1',
      nom: 'AfriPay Solutions',
      logo_url: 'https://picsum.photos/seed/afripay/200',
      ville: 'Abidjan',
      pays: 'Cote d\'Ivoire'
    },
    type_contrat: 'Consultant',
    niveau_experience: 'junior',
    mode_remote: 'presentiel',
    description: 'Consultant de 12-24 mois pour apprendre le developpement web dans une FinTech en croissance.',
    description_complete: `AfriPay Solutions propose un contrat d'Consultant pour un etudiant en informatique.

Vous serez integre a notre equipe de developpement et participerez a des projets concrets tout en poursuivant vos etudes. Vous serez encadre par des developpeurs seniors qui vous accompagneront dans votre montee en competences.

C'est une opportunite ideale pour acquerir une experience professionnelle solide dans le secteur FinTech.`,
    responsabilites: [
      'Participer au developpement de fonctionnalites',
      'Corriger des bugs sous supervision',
      'Ecrire des tests unitaires',
      'Participer aux ceremonies Agile',
      'Apprendre les bonnes pratiques de developpement'
    ],
    competences_requises: [
      'HTML/CSS/JavaScript',
      'Notions de Vue.js ou React',
      'Git basique',
      'Motivation et curiosite'
    ],
    competences_souhaitees: [
      'TypeScript',
      'Node.js',
      'SQL',
      'Linux'
    ],
    avantages: [
      'Mentorat personnalise',
      'Projets concrets',
      'Remuneration attractive',
      'Possibilite d\'embauche en CDI',
      'Tickets restaurant'
    ],
    date_publication: '2024-12-07',
    date_expiration: '2025-02-15',
    statut: 'active',
    nombre_candidatures: 52,
    publie_par: {
      id: '1',
      prenom: 'Kouame',
      nom: 'Yao',
      photo_url: 'https://i.pravatar.cc/150?u=kouame',
      poste: 'CTO'
    }
  },
  {
    id: '10',
    titre: 'Architecte Cloud Solutions',
    entreprise: {
      id: '5',
      nom: 'DevHub Africa',
      logo_url: 'https://picsum.photos/seed/devhub/200',
      ville: 'Lagos',
      pays: 'Nigeria'
    },
    type_contrat: 'cdi',
    niveau_experience: 'expert',
    mode_remote: 'full_remote',
    salaire_min: 3000000,
    salaire_max: 4500000,
    devise: 'FCFA',
    description: 'Concevez et pilotez l\'architecture cloud de nos solutions multi-cloud a l\'echelle africaine.',
    description_complete: `DevHub Africa recherche un Architecte Cloud Solutions pour definir et implementer notre strategie cloud.

En tant qu'architecte, vous serez responsable de la conception de solutions cloud scalables, securisees et optimisees en termes de couts. Vous travaillerez avec nos equipes d'ingenieurs pour implementer les meilleures pratiques et accompagner nos clients dans leur transformation cloud.

Nous operons sur AWS, GCP et Azure, servant des clients dans 15 pays africains.`,
    responsabilites: [
      'Definir l\'architecture cloud des projets',
      'Evaluer et recommander des solutions techniques',
      'Accompagner les equipes dans l\'implementation',
      'Optimiser les couts cloud',
      'Assurer la veille technologique'
    ],
    competences_requises: [
      'AWS (certifie Solutions Architect)',
      'Architecture microservices',
      'Infrastructure as Code (Terraform)',
      'Securite cloud',
      'Leadership technique'
    ],
    competences_souhaitees: [
      'GCP et/ou Azure',
      'Kubernetes',
      'FinOps',
      'Certifications multi-cloud'
    ],
    avantages: [
      'Full remote',
      'Salaire competitif international',
      'Budget certifications illimite',
      'Conferences internationales',
      'Stock options'
    ],
    date_publication: '2024-12-02',
    date_expiration: '2025-01-30',
    statut: 'active',
    nombre_candidatures: 6,
    publie_par: {
      id: '7',
      prenom: 'Sekou',
      nom: 'Toure',
      photo_url: 'https://i.pravatar.cc/150?u=sekou',
      poste: 'VP Engineering'
    }
  }
]

// Extraction des villes uniques pour les filtres
export const getVillesUniques = (offres: Offre[]): string[] => {
  const villes = [...new Set(offres.map(o => o.entreprise.ville))]
  return villes.sort()
}

// Fonction de filtrage des offres
export const filterOffres = (
  offres: Offre[],
  filters: {
    search?: string
    type_contrat?: TypeContrat | null
    niveau_experience?: NiveauExperience | null
    mode_remote?: ModeRemote | null
    ville?: string | null
  }
): Offre[] => {
  return offres.filter(offre => {
    // Filtre par recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchTitre = offre.titre.toLowerCase().includes(searchLower)
      const matchEntreprise = offre.entreprise.nom.toLowerCase().includes(searchLower)
      const matchCompetences = offre.competences_requises.some(c =>
        c.toLowerCase().includes(searchLower)
      )
      if (!matchTitre && !matchEntreprise && !matchCompetences) {
        return false
      }
    }

    // Filtre par type de contrat
    if (filters.type_contrat && offre.type_contrat !== filters.type_contrat) {
      return false
    }

    // Filtre par niveau d'experience
    if (filters.niveau_experience && offre.niveau_experience !== filters.niveau_experience) {
      return false
    }

    // Filtre par mode remote
    if (filters.mode_remote && offre.mode_remote !== filters.mode_remote) {
      return false
    }

    // Filtre par ville
    if (filters.ville && offre.entreprise.ville !== filters.ville) {
      return false
    }

    return true
  })
}

// Formatage du salaire
export const formatSalaire = (offre: Offre): string => {
  if (!offre.salaire_min && !offre.salaire_max) {
    return 'Non communique'
  }

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('fr-FR').format(n)

  if (offre.salaire_min && offre.salaire_max) {
    return `${formatNumber(offre.salaire_min)} - ${formatNumber(offre.salaire_max)} ${offre.devise || 'FCFA'}`
  }

  if (offre.salaire_min) {
    return `A partir de ${formatNumber(offre.salaire_min)} ${offre.devise || 'FCFA'}`
  }

  return `Jusqu'a ${formatNumber(offre.salaire_max!)} ${offre.devise || 'FCFA'}`
}

// Calcul du temps ecoule depuis la publication
export const getTempsDepuisPublication = (datePublication: string): string => {
  const now = new Date()
  const published = new Date(datePublication)
  const diffMs = now.getTime() - published.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Aujourd\'hui'
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine(s)`
  return `Il y a ${Math.floor(diffDays / 30)} mois`
}
