// Donnees mock des entreprises creees par les alumni (Cote d'Ivoire - ESATIC)

export type SecteurActivite =
  | 'fintech'
  | 'edtech'
  | 'agritech'
  | 'healthtech'
  | 'services_it'
  | 'e_commerce'
  | 'logistique'
  | 'autre'

export interface Entreprise {
  id: string
  nom: string
  logo_url: string
  description: string
  description_longue: string
  secteur: SecteurActivite
  date_creation: string
  site_web?: string
  linkedin_url?: string
  email_contact: string
  telephone?: string
  adresse: string
  ville: string
  pays: string
  nombre_employes: string
  chiffre_affaires?: string
  services: string[]
  technologies: string[]
  // Fondateur (alumni)
  fondateur: {
    id: string
    prenom: string
    nom: string
    photo_url: string
    promotion: number
    poste: string
  }
  // Co-fondateurs eventuels
  cofondateurs?: {
    prenom: string
    nom: string
    photo_url: string
    poste: string
  }[]
  // Realisations / clients
  clients_notables?: string[]
  recompenses?: string[]
}

export const entreprisesList: Entreprise[] = [
  {
    id: '1',
    nom: 'AfriPay Solutions',
    logo_url: 'https://picsum.photos/200/200?random=100',
    description: 'Solutions de paiement mobile innovantes pour l\'Afrique de l\'Ouest',
    description_longue: `AfriPay Solutions est une fintech ivoirienne specialisee dans le developpement de solutions de paiement mobile adaptees aux realites africaines. Notre mission est de democratiser l'acces aux services financiers pour les populations non bancarisees.

Nous proposons une plateforme complete permettant aux commercants d'accepter les paiements via tous les operateurs de mobile money, ainsi qu'une API robuste pour l'integration dans les applications tierces.

Depuis notre creation en 2020, nous avons traite plus de 5 millions de transactions et accompagnons plus de 2000 commercants dans leur transformation digitale.`,
    secteur: 'fintech',
    date_creation: '2020-03',
    site_web: 'https://afripay.ci',
    linkedin_url: 'https://linkedin.com/company/afripay-solutions',
    email_contact: 'contact@afripay.ci',
    telephone: '+225 27 22 00 00 01',
    adresse: 'Plateau, Immeuble CCIA, 5eme etage',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '15-25',
    chiffre_affaires: '500M - 1Md FCFA',
    services: ['Paiement mobile', 'API d\'integration', 'Plateforme marchands', 'Solutions B2B'],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'AWS', 'Mobile Money API'],
    fondateur: {
      id: '5',
      prenom: 'Jean-Baptiste',
      nom: 'Koffi',
      photo_url: 'https://i.pravatar.cc/150?u=jbkoffi',
      promotion: 2015,
      poste: 'CEO & Fondateur'
    },
    cofondateurs: [
      {
        prenom: 'Aminata',
        nom: 'Coulibaly',
        photo_url: 'https://i.pravatar.cc/150?u=aminatac',
        poste: 'CTO'
      }
    ],
    clients_notables: ['SODECI', 'CIE', 'Carrefour CI', 'Jumia'],
    recompenses: ['Prix Innovation CGECI 2022', 'Top 50 Startups Africaines 2023']
  },
  {
    id: '2',
    nom: 'EduTech Afrique',
    logo_url: 'https://picsum.photos/200/200?random=101',
    description: 'Plateforme e-learning adaptee au contexte africain',
    description_longue: `EduTech Afrique developpe des solutions d'apprentissage en ligne concues pour repondre aux defis specifiques du continent : acces limite a Internet, appareils a faibles specifications, et contenus adaptes aux programmes locaux.

Notre plateforme permet aux etudiants d'acceder a des cours video optimises, des exercices interactifs et des certifications reconnues, meme avec une connexion Internet instable.

Nous collaborons avec plusieurs universites et ecoles professionnelles pour digitaliser leurs formations et toucher un public plus large.`,
    secteur: 'edtech',
    date_creation: '2019-09',
    site_web: 'https://edutech-afrique.com',
    linkedin_url: 'https://linkedin.com/company/edutech-afrique',
    email_contact: 'info@edutech-afrique.com',
    telephone: '+225 27 22 00 00 02',
    adresse: 'Cocody, Rue des Jardins',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '10-15',
    services: ['E-learning', 'LMS personnalise', 'Production de contenus', 'Certifications'],
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Video streaming', 'PWA'],
    fondateur: {
      id: '10',
      prenom: 'Marie-Claire',
      nom: 'N\'Guessan',
      photo_url: 'https://i.pravatar.cc/150?u=marieclaire',
      promotion: 2016,
      poste: 'CEO & Fondatrice'
    },
    clients_notables: ['ESATIC', 'INP-HB', 'Universite FHB'],
    recompenses: ['Laureat Orange Fab 2021']
  },
  {
    id: '3',
    nom: 'AgriConnect CI',
    logo_url: 'https://picsum.photos/200/200?random=102',
    description: 'Solutions digitales pour la chaine de valeur agricole',
    description_longue: `AgriConnect CI met la technologie au service de l'agriculture ivoirienne. Notre plateforme connecte directement les agriculteurs aux acheteurs, elimine les intermediaires et garantit des prix justes pour les producteurs.

Nous proposons egalement des outils de gestion agricole : suivi des parcelles, previsions meteo localisees, conseils agronomiques personnalises et acces au financement via nos partenaires.

Notre solution a deja beneficie a plus de 5000 agriculteurs dans les regions du centre et du nord de la Cote d'Ivoire.`,
    secteur: 'agritech',
    date_creation: '2021-01',
    site_web: 'https://agriconnect.ci',
    email_contact: 'contact@agriconnect.ci',
    telephone: '+225 27 22 00 00 03',
    adresse: 'Marcory, Zone 4',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '5-10',
    services: ['Marketplace agricole', 'Gestion de parcelles', 'Financement agricole', 'Formation'],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API', 'SMS API'],
    fondateur: {
      id: '3',
      prenom: 'Seydou',
      nom: 'Traore',
      photo_url: 'https://i.pravatar.cc/150?u=seydou',
      promotion: 2017,
      poste: 'CEO & Fondateur'
    },
    clients_notables: ['Cooperative CAPA', 'ANADER', 'FIRCA']
  },
  {
    id: '4',
    nom: 'SantePlus Digital',
    logo_url: 'https://picsum.photos/200/200?random=103',
    description: 'Teleconsultation et gestion medicale numerique',
    description_longue: `SantePlus Digital revolutionne l'acces aux soins en Cote d'Ivoire grace a la teleconsultation. Notre application permet aux patients de consulter des medecins certifies depuis leur smartphone, d'obtenir des ordonnances electroniques et de gerer leur dossier medical.

Pour les structures de sante, nous proposons un logiciel complet de gestion : dossiers patients, facturation, stocks de medicaments et statistiques.

Notre objectif est de reduire les deserts medicaux et d'ameliorer la qualite des soins dans les zones rurales.`,
    secteur: 'healthtech',
    date_creation: '2020-06',
    site_web: 'https://santeplus.ci',
    linkedin_url: 'https://linkedin.com/company/santeplus-digital',
    email_contact: 'support@santeplus.ci',
    telephone: '+225 27 22 00 00 04',
    adresse: 'Cocody Angre',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '10-15',
    services: ['Teleconsultation', 'Gestion clinique', 'Ordonnances electroniques', 'Dossier medical'],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'WebRTC', 'PostgreSQL'],
    fondateur: {
      id: '8',
      prenom: 'Christelle',
      nom: 'Aka',
      photo_url: 'https://i.pravatar.cc/150?u=christelle',
      promotion: 2019,
      poste: 'CEO & Fondatrice'
    },
    cofondateurs: [
      {
        prenom: 'Dr. Kouadio',
        nom: 'Assouan',
        photo_url: 'https://i.pravatar.cc/150?u=drkouadio',
        poste: 'Directeur Medical'
      }
    ],
    clients_notables: ['CHU Cocody', 'Clinique Procrea', 'Pharmacies Pharma+'],
    recompenses: ['Prix Sante Digitale MUGEFCI 2022']
  },
  {
    id: '5',
    nom: 'DevHub Africa',
    logo_url: 'https://picsum.photos/200/200?random=104',
    description: 'Services de developpement logiciel et conseil IT',
    description_longue: `DevHub Africa est une entreprise de services numeriques fondee par des alumni de l'ESATIC. Nous accompagnons les entreprises ivoiriennes et internationales dans leur transformation digitale.

Notre equipe de developpeurs seniors maitrise les technologies modernes et suit les meilleures pratiques de l'industrie. Nous intervenons sur des projets web, mobile, cloud et data.

Notre force : une connaissance approfondie du contexte africain combinee a une expertise technique de niveau international.`,
    secteur: 'services_it',
    date_creation: '2018-05',
    site_web: 'https://devhub-africa.com',
    linkedin_url: 'https://linkedin.com/company/devhub-africa',
    email_contact: 'hello@devhub-africa.com',
    telephone: '+225 27 22 00 00 05',
    adresse: 'Plateau, Avenue Noguès',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '25-50',
    chiffre_affaires: '1Md - 2Md FCFA',
    services: ['Developpement web', 'Applications mobiles', 'Cloud & DevOps', 'Conseil IT'],
    technologies: ['Vue.js', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    fondateur: {
      id: '1',
      prenom: 'Kouame',
      nom: 'Yao',
      photo_url: 'https://i.pravatar.cc/300?u=kouame',
      promotion: 2018,
      poste: 'CEO & Co-fondateur'
    },
    cofondateurs: [
      {
        prenom: 'Aya',
        nom: 'Kouassi',
        photo_url: 'https://i.pravatar.cc/150?u=aya',
        poste: 'CTO & Co-fondatrice'
      }
    ],
    clients_notables: ['MTN CI', 'Orange CI', 'Societe Generale', 'Total Energies'],
    recompenses: ['Certification ISO 27001', 'Partenaire AWS']
  },
  {
    id: '6',
    nom: 'LogiTrack West',
    logo_url: 'https://picsum.photos/200/200?random=105',
    description: 'Solutions de tracking et gestion logistique',
    description_longue: `LogiTrack West propose des solutions de geolocalisation et de gestion de flottes adaptees aux entreprises de transport et de logistique en Afrique de l'Ouest.

Notre plateforme permet le suivi en temps reel des vehicules, l'optimisation des itineraires, la gestion des chauffeurs et l'analyse des donnees de transport. Compatible avec tous types de boitiers GPS.

Nous aidons nos clients a reduire leurs couts de carburant de 15 a 25% en moyenne grace a l'optimisation des trajets et au suivi du comportement de conduite.`,
    secteur: 'logistique',
    date_creation: '2019-11',
    site_web: 'https://logitrack-west.com',
    email_contact: 'commercial@logitrack-west.com',
    telephone: '+225 27 22 00 00 06',
    adresse: 'Yopougon, Zone Industrielle',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '10-15',
    services: ['Tracking GPS', 'Gestion de flottes', 'Optimisation trajets', 'Rapports analytiques'],
    technologies: ['Angular', 'Java Spring', 'PostgreSQL', 'Google Maps', 'IoT'],
    fondateur: {
      id: '9',
      prenom: 'Ibrahim',
      nom: 'Sangare',
      photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
      promotion: 2018,
      poste: 'CEO & Fondateur'
    },
    clients_notables: ['Bolore Transport', 'DHL CI', 'Ivoire Cargo']
  },
  {
    id: '7',
    nom: 'CyberShield CI',
    logo_url: 'https://picsum.photos/200/200?random=106',
    description: 'Cabinet de conseil en cybersecurite',
    description_longue: `CyberShield CI est un cabinet specialise dans la securite informatique. Nous accompagnons les entreprises et administrations ivoiriennes dans la protection de leurs systemes d'information.

Nos services couvrent l'audit de securite, les tests d'intrusion, la mise en conformite (ISO 27001, PCI-DSS) et la formation des equipes. Nous intervenons egalement en reponse aux incidents de securite.

Notre equipe est composee d'experts certifies (CISSP, CEH, OSCP) avec une experience internationale.`,
    secteur: 'services_it',
    date_creation: '2020-09',
    site_web: 'https://cybershield.ci',
    linkedin_url: 'https://linkedin.com/company/cybershield-ci',
    email_contact: 'security@cybershield.ci',
    telephone: '+225 27 22 00 00 07',
    adresse: 'Cocody II Plateaux',
    ville: 'Abidjan',
    pays: 'Cote d\'Ivoire',
    nombre_employes: '5-10',
    services: ['Audit securite', 'Tests d\'intrusion', 'Conformite ISO 27001', 'Formation securite'],
    technologies: ['Kali Linux', 'Nessus', 'Burp Suite', 'Splunk', 'SIEM'],
    fondateur: {
      id: '7',
      prenom: 'Moussa',
      nom: 'Coulibaly',
      photo_url: 'https://i.pravatar.cc/150?u=moussa',
      promotion: 2017,
      poste: 'CEO & Fondateur'
    },
    clients_notables: ['BCEAO', 'Ministere de l\'Economie', 'Bank of Africa'],
    recompenses: ['Agrément ARTCI 2022']
  }
]

// Configuration des secteurs
export const secteurConfig: Record<SecteurActivite, { label: string; color: string; icon: string }> = {
  fintech: {
    label: 'Fintech',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    icon: 'fa-solid fa-coins'
  },
  edtech: {
    label: 'EdTech',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-graduation-cap'
  },
  agritech: {
    label: 'AgriTech',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
    icon: 'fa-solid fa-leaf'
  },
  healthtech: {
    label: 'HealthTech',
    color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    icon: 'fa-solid fa-heart-pulse'
  },
  services_it: {
    label: 'Services IT',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    icon: 'fa-solid fa-laptop-code'
  },
  e_commerce: {
    label: 'E-commerce',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    icon: 'fa-solid fa-shopping-cart'
  },
  logistique: {
    label: 'Logistique',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    icon: 'fa-solid fa-truck'
  },
  autre: {
    label: 'Autre',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    icon: 'fa-solid fa-building'
  }
}

// Liste des secteurs disponibles
export const secteurs = Object.keys(secteurConfig) as SecteurActivite[]

// Liste des villes disponibles
export const villesEntreprises = [...new Set(entreprisesList.map(e => e.ville))].sort()

// Fonction de filtrage
export const filterEntreprises = (
  entreprises: Entreprise[],
  filters: {
    search?: string
    secteur?: SecteurActivite | null
    ville?: string | null
  }
): Entreprise[] => {
  return entreprises.filter(e => {
    // Filtre par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchSearch =
        e.nom.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.fondateur.prenom.toLowerCase().includes(searchLower) ||
        e.fondateur.nom.toLowerCase().includes(searchLower)
      if (!matchSearch) return false
    }

    // Filtre par secteur
    if (filters.secteur && e.secteur !== filters.secteur) {
      return false
    }

    // Filtre par ville
    if (filters.ville && e.ville !== filters.ville) {
      return false
    }

    return true
  })
}

// Helper pour formater la date de creation
export const formatDateCreation = (date: string): string => {
  const [year, month] = date.split('-')
  const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
  return `${months[parseInt(month) - 1]} ${year}`
}
