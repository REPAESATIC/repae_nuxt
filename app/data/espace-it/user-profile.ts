// Donnees mock du profil complet de l'utilisateur connecte (Cote d'Ivoire - ESATIC)

export interface UserProfile {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string
  photo_url: string
  cover_url?: string
  poste_actuel: string
  entreprise_actuelle: string
  promotion: number
  pays: string
  ville: string
  adresse?: string
  disponibilite: 'disponible' | 'en_poste' | 'ouvert_opportunites'
  biographie: string
  site_web?: string
  linkedin_url?: string
  twitter_url?: string
  github_url?: string
  date_inscription: string
  derniere_connexion: string
}

export const userProfile: UserProfile = {
  id: '1',
  prenom: 'Kouame',
  nom: 'Yao',
  email: 'kouame.yao@email.ci',
  telephone: '+225 07 89 12 34 56',
  photo_url: 'https://i.pravatar.cc/300?u=kouame',
  cover_url: 'https://picsum.photos/1200/400?random=1',
  poste_actuel: 'Developpeur Full Stack Senior',
  entreprise_actuelle: 'MTN Cote d\'Ivoire',
  promotion: 2018,
  pays: 'Cote d\'Ivoire',
  ville: 'Abidjan',
  adresse: 'Cocody Riviera 3, Rue des Jardins',
  disponibilite: 'ouvert_opportunites',
  biographie: `Passionné par le développement web et mobile depuis plus de 6 ans, je me spécialise dans la création d'applications performantes et innovantes pour le secteur des télécommunications et de la fintech.

Diplômé de l'ESATIC promotion 2018, j'ai eu l'opportunité de travailler sur des projets majeurs chez Orange CI et MTN CI, notamment sur les plateformes de mobile money qui touchent des millions d'utilisateurs en Afrique de l'Ouest.

Je suis convaincu que la technologie peut transformer positivement notre société africaine, et je m'engage à contribuer à cet élan à travers mes projets et mon mentorat auprès des jeunes développeurs ivoiriens.`,
  site_web: 'https://kouameyao.dev',
  linkedin_url: 'https://linkedin.com/in/kouameyao',
  twitter_url: 'https://twitter.com/kouameyao',
  github_url: 'https://github.com/kouameyao',
  date_inscription: '2020-03-15',
  derniere_connexion: '2025-01-10'
}

// Labels pour la disponibilite
export const disponibiliteConfig = {
  disponible: {
    label: 'Disponible immediatement',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    dotColor: 'bg-green-500'
  },
  en_poste: {
    label: 'En poste',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    dotColor: 'bg-gray-500'
  },
  ouvert_opportunites: {
    label: 'Ouvert aux opportunites',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    dotColor: 'bg-amber-500'
  }
}
