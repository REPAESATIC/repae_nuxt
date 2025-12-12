// Donnees mock de la liste des alumni (Cote d'Ivoire - ESATIC)

export interface Alumni {
  id: string
  prenom: string
  nom: string
  email: string
  photo_url: string
  poste_actuel: string
  entreprise_actuelle: string
  promotion: number
  pays: string
  ville: string
  disponibilite: 'disponible' | 'en_poste' | 'ouvert_opportunites'
  linkedin_url?: string
  competences: string[]
  // Champs etendus (optionnels) pour le profil detaille
  telephone?: string
  biographie?: string
  site_web?: string
  twitter_url?: string
  github_url?: string
}

export const alumniList: Alumni[] = [
  {
    id: '1',
    prenom: 'Kouame',
    nom: 'Yao',
    email: 'Angenor99@gmail.com',
    photo_url: 'https://i.pravatar.cc/300?u=kouame',
    poste_actuel: 'Developpeur Full Stack Senior',
    entreprise_actuelle: 'MTN Cote d\'Ivoire',
    promotion: 2018,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'ouvert_opportunites',
    linkedin_url: 'https://linkedin.com/in/kouameyao',
    competences: ['Vue.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Nuxt', 'Mobile Money'],
    // Donnees etendues (meme que le profil utilisateur)
    telephone: '+225 05 45 29 28 02',
    biographie: `Passionne par le developpement web et mobile depuis plus de 6 ans, je me specialise dans la creation d'applications performantes et innovantes pour le secteur des telecommunications et de la fintech.

Diplome de l'ESATIC promotion 2018, j'ai eu l'opportunite de travailler sur des projets majeurs chez Orange CI et MTN CI, notamment sur les plateformes de mobile money qui touchent des millions d'utilisateurs en Afrique de l'Ouest.

Je suis convaincu que la technologie peut transformer positivement notre societe africaine, et je m'engage a contribuer a cet elan a travers mes projets et mon mentorat aupres des jeunes developpeurs ivoiriens.`,
    site_web: 'https://kouameyao.dev',
    twitter_url: 'https://twitter.com/kouameyao',
    github_url: 'https://github.com/kouameyao'
  },
  {
    id: '2',
    prenom: 'Aya',
    nom: 'Kouassi',
    email: 'aya.kouassi@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=aya',
    poste_actuel: 'Data Scientist',
    entreprise_actuelle: 'Orange Cote d\'Ivoire',
    promotion: 2019,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/ayakouassi',
    competences: ['Python', 'TensorFlow', 'SQL']
  },
  {
    id: '3',
    prenom: 'Seydou',
    nom: 'Traore',
    email: 'seydou.traore@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=seydou',
    poste_actuel: 'DevOps Engineer',
    entreprise_actuelle: 'Societe Generale CI',
    promotion: 2017,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/seydoutraore',
    competences: ['Docker', 'Kubernetes', 'AWS']
  },
  {
    id: '4',
    prenom: 'Aminata',
    nom: 'Diallo',
    email: 'aminata.diallo@email.sn',
    photo_url: 'https://i.pravatar.cc/150?u=aminata',
    poste_actuel: 'Chef de Projet IT',
    entreprise_actuelle: 'Sonatel',
    promotion: 2016,
    pays: 'Senegal',
    ville: 'Dakar',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/aminatadiallo',
    competences: ['Gestion de projet', 'Agile', 'ITIL']
  },
  {
    id: '5',
    prenom: 'Jean-Baptiste',
    nom: 'Koffi',
    email: 'jb.koffi@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=jbkoffi',
    poste_actuel: 'Architecte Solutions',
    entreprise_actuelle: 'Ecobank CI',
    promotion: 2015,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'ouvert_opportunites',
    linkedin_url: 'https://linkedin.com/in/jbkoffi',
    competences: ['Architecture', 'Microservices', 'Java']
  },
  {
    id: '6',
    prenom: 'Fatoumata',
    nom: 'Bamba',
    email: 'fatoumata.bamba@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=fatoumata',
    poste_actuel: 'UX/UI Designer',
    entreprise_actuelle: 'Wave Mobile Money',
    promotion: 2020,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/fatoumatabamba',
    competences: ['Figma', 'Adobe XD', 'Design System']
  },
  {
    id: '7',
    prenom: 'Moussa',
    nom: 'Coulibaly',
    email: 'moussa.coulibaly@email.ml',
    photo_url: 'https://i.pravatar.cc/150?u=moussa',
    poste_actuel: 'Consultant Cybersecurite',
    entreprise_actuelle: 'Deloitte Afrique',
    promotion: 2017,
    pays: 'Mali',
    ville: 'Bamako',
    disponibilite: 'disponible',
    linkedin_url: 'https://linkedin.com/in/moussacoulibaly',
    competences: ['Securite', 'Pentesting', 'ISO 27001']
  },
  {
    id: '8',
    prenom: 'Christelle',
    nom: 'Aka',
    email: 'christelle.aka@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=christelle',
    poste_actuel: 'Developpeuse Mobile',
    entreprise_actuelle: 'CIE (Compagnie Ivoirienne d\'Electricite)',
    promotion: 2019,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/christelleaka',
    competences: ['Flutter', 'React Native', 'Firebase']
  },
  {
    id: '9',
    prenom: 'Ibrahim',
    nom: 'Sangare',
    email: 'ibrahim.sangare@email.bf',
    photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
    poste_actuel: 'Ingenieur Big Data',
    entreprise_actuelle: 'Orange Burkina',
    promotion: 2018,
    pays: 'Burkina Faso',
    ville: 'Ouagadougou',
    disponibilite: 'ouvert_opportunites',
    linkedin_url: 'https://linkedin.com/in/ibrahimsangare',
    competences: ['Spark', 'Hadoop', 'Python']
  },
  {
    id: '10',
    prenom: 'Marie-Claire',
    nom: 'N\'Guessan',
    email: 'mc.nguessan@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=marieclaire',
    poste_actuel: 'Product Manager',
    entreprise_actuelle: 'Jumia CI',
    promotion: 2016,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/mcnguessan',
    competences: ['Product Management', 'Agile', 'Analytics']
  },
  {
    id: '11',
    prenom: 'Oumar',
    nom: 'Sow',
    email: 'oumar.sow@email.sn',
    photo_url: 'https://i.pravatar.cc/150?u=oumar',
    poste_actuel: 'Backend Developer',
    entreprise_actuelle: 'Atos Senegal',
    promotion: 2020,
    pays: 'Senegal',
    ville: 'Dakar',
    disponibilite: 'disponible',
    linkedin_url: 'https://linkedin.com/in/oumarsow',
    competences: ['Java', 'Spring Boot', 'MongoDB']
  },
  {
    id: '12',
    prenom: 'Aissatou',
    nom: 'Toure',
    email: 'aissatou.toure@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=aissatou',
    poste_actuel: 'Analyste Business Intelligence',
    entreprise_actuelle: 'BCEAO',
    promotion: 2017,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/aissatoutoure',
    competences: ['Power BI', 'SQL', 'Data Analysis']
  },
  {
    id: '13',
    prenom: 'Patrick',
    nom: 'Eboue',
    email: 'patrick.eboue@email.fr',
    photo_url: 'https://i.pravatar.cc/150?u=patrick',
    poste_actuel: 'Lead Developer',
    entreprise_actuelle: 'Capgemini France',
    promotion: 2015,
    pays: 'France',
    ville: 'Paris',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/patrickeboue',
    competences: ['Angular', 'TypeScript', '.NET']
  },
  {
    id: '14',
    prenom: 'Salimata',
    nom: 'Kone',
    email: 'salimata.kone@email.ci',
    photo_url: 'https://i.pravatar.cc/150?u=salimata',
    poste_actuel: 'QA Engineer',
    entreprise_actuelle: 'Moov Africa CI',
    promotion: 2021,
    pays: 'Cote d\'Ivoire',
    ville: 'Abidjan',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/salimatakone',
    competences: ['Selenium', 'Cypress', 'Jest']
  },
  {
    id: '15',
    prenom: 'Yves',
    nom: 'Assi',
    email: 'yves.assi@email.ca',
    photo_url: 'https://i.pravatar.cc/150?u=yves',
    poste_actuel: 'Cloud Architect',
    entreprise_actuelle: 'AWS Canada',
    promotion: 2014,
    pays: 'Canada',
    ville: 'Montreal',
    disponibilite: 'en_poste',
    linkedin_url: 'https://linkedin.com/in/yvesassi',
    competences: ['AWS', 'Terraform', 'CloudFormation']
  }
]

// Liste des promotions disponibles
export const promotions = [...new Set(alumniList.map(a => a.promotion))].sort((a, b) => b - a)

// Liste des pays disponibles
export const pays = [...new Set(alumniList.map(a => a.pays))].sort()

// Liste des villes disponibles
export const villes = [...new Set(alumniList.map(a => a.ville))].sort()

// Configuration de la disponibilite
export const disponibiliteConfig = {
  disponible: {
    label: 'Disponible',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    dotColor: 'bg-green-500'
  },
  en_poste: {
    label: 'En poste',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    dotColor: 'bg-gray-500'
  },
  ouvert_opportunites: {
    label: 'Ouvert',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    dotColor: 'bg-amber-500'
  }
}

// Fonction de recherche et filtrage
export const filterAlumni = (
  alumni: Alumni[],
  filters: {
    search?: string
    promotion?: number | null
    pays?: string | null
    disponibilite?: string | null
  }
): Alumni[] => {
  return alumni.filter(a => {
    // Filtre par recherche (nom, prenom, poste, entreprise)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchSearch =
        a.prenom.toLowerCase().includes(searchLower) ||
        a.nom.toLowerCase().includes(searchLower) ||
        a.poste_actuel.toLowerCase().includes(searchLower) ||
        a.entreprise_actuelle.toLowerCase().includes(searchLower)
      if (!matchSearch) return false
    }

    // Filtre par promotion
    if (filters.promotion && a.promotion !== filters.promotion) {
      return false
    }

    // Filtre par pays
    if (filters.pays && a.pays !== filters.pays) {
      return false
    }

    // Filtre par disponibilite
    if (filters.disponibilite && a.disponibilite !== filters.disponibilite) {
      return false
    }

    return true
  })
}
