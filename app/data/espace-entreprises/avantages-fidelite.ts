// Donnees mock des avantages du programme de fidelite

import type { BadgeNiveau } from './fidelite'

export type CategorieAvantage = 'visibilite' | 'recrutement' | 'evenement' | 'support' | 'exclusif'

export interface Avantage {
  id: string
  titre: string
  description: string
  description_longue: string
  cout_points: number
  badge_minimum: BadgeNiveau
  categorie: CategorieAvantage
  icone: string
  disponible: boolean
  stock?: number // undefined = illimite
  duree?: string // ex: "7 jours", "1 mois"
}

export interface AvantageUtilise {
  id: string
  avantage_id: string
  date_utilisation: string
  date_expiration?: string
  statut: 'actif' | 'expire' | 'utilise'
}

// Configuration des categories
export const categoriesConfig: Record<CategorieAvantage, { label: string; color: string; bgColor: string }> = {
  visibilite: {
    label: 'Visibilite',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-500/20'
  },
  recrutement: {
    label: 'Recrutement',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-500/20'
  },
  evenement: {
    label: 'Evenements',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-500/20'
  },
  support: {
    label: 'Support',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-500/20'
  },
  exclusif: {
    label: 'Exclusif',
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-500/20'
  }
}

// Liste des avantages disponibles
export const avantagesList: Avantage[] = [
  // Visibilite
  {
    id: '1',
    titre: 'Mise en avant offre',
    description: 'Votre offre apparait en tete de liste',
    description_longue: 'Boostez la visibilite de votre offre d\'emploi ou de stage en la placant en tete des resultats de recherche pendant 7 jours. Les candidats verront votre offre en premier.',
    cout_points: 50,
    badge_minimum: 'bronze',
    categorie: 'visibilite',
    icone: 'fa-solid fa-star',
    disponible: true,
    duree: '7 jours'
  },
  {
    id: '2',
    titre: 'Badge entreprise premium',
    description: 'Badge distinctif sur votre profil',
    description_longue: 'Affichez un badge "Entreprise Premium" sur toutes vos offres et votre profil entreprise pour inspirer confiance aux candidats.',
    cout_points: 100,
    badge_minimum: 'silver',
    categorie: 'visibilite',
    icone: 'fa-solid fa-crown',
    disponible: true,
    duree: '1 mois'
  },
  {
    id: '3',
    titre: 'Banniere personnalisee',
    description: 'Banniere sur la page d\'accueil',
    description_longue: 'Affichez une banniere publicitaire de votre entreprise sur la page d\'accueil du site REPAE pendant une semaine.',
    cout_points: 300,
    badge_minimum: 'gold',
    categorie: 'visibilite',
    icone: 'fa-solid fa-image',
    disponible: true,
    stock: 2,
    duree: '7 jours'
  },

  // Recrutement
  {
    id: '4',
    titre: 'Acces CV complet',
    description: 'Telechargez le CV PDF d\'un candidat',
    description_longue: 'Accedez au CV complet d\'un candidat au format PDF, incluant toutes ses experiences, formations et coordonnees de contact.',
    cout_points: 20,
    badge_minimum: 'bronze',
    categorie: 'recrutement',
    icone: 'fa-solid fa-file-pdf',
    disponible: true
  },
  {
    id: '5',
    titre: 'Pack 10 CV',
    description: 'Telechargez 10 CV au format PDF',
    description_longue: 'Economisez avec ce pack de 10 telechargements de CV. Ideal pour les campagnes de recrutement intensives.',
    cout_points: 150,
    badge_minimum: 'silver',
    categorie: 'recrutement',
    icone: 'fa-solid fa-layer-group',
    disponible: true
  },
  {
    id: '6',
    titre: 'Alerte talents',
    description: 'Notification pour nouveaux profils',
    description_longue: 'Recevez une alerte email des que de nouveaux profils correspondant a vos criteres de recherche s\'inscrivent sur la plateforme.',
    cout_points: 75,
    badge_minimum: 'silver',
    categorie: 'recrutement',
    icone: 'fa-solid fa-bell',
    disponible: true,
    duree: '1 mois'
  },
  {
    id: '7',
    titre: 'Acces anticipé talents',
    description: 'Voyez les profils avant les autres',
    description_longue: 'Beneficiez d\'un acces exclusif aux nouveaux profils IT 48h avant leur publication generale sur la plateforme.',
    cout_points: 200,
    badge_minimum: 'gold',
    categorie: 'recrutement',
    icone: 'fa-solid fa-rocket',
    disponible: true,
    duree: '1 mois'
  },

  // Evenements
  {
    id: '8',
    titre: 'Place evenement REPAE',
    description: 'Inscription gratuite a un evenement',
    description_longue: 'Obtenez une place gratuite pour participer au prochain evenement networking organise par REPAE.',
    cout_points: 30,
    badge_minimum: 'bronze',
    categorie: 'evenement',
    icone: 'fa-solid fa-calendar-check',
    disponible: true,
    stock: 5
  },
  {
    id: '9',
    titre: 'Stand salon emploi',
    description: 'Stand au prochain salon emploi REPAE',
    description_longue: 'Reservez un stand lors du prochain salon de l\'emploi IT organise par REPAE. Rencontrez directement les talents.',
    cout_points: 500,
    badge_minimum: 'gold',
    categorie: 'evenement',
    icone: 'fa-solid fa-store',
    disponible: true,
    stock: 3
  },
  {
    id: '10',
    titre: 'Evenement recrutement dedie',
    description: 'Organisez votre propre evenement',
    description_longue: 'REPAE organise pour vous un evenement de recrutement dedie avec une selection de candidats correspondant a vos besoins.',
    cout_points: 1000,
    badge_minimum: 'platinum',
    categorie: 'evenement',
    icone: 'fa-solid fa-users',
    disponible: true,
    stock: 1
  },

  // Support
  {
    id: '11',
    titre: 'Conseil RH 30min',
    description: 'Session conseil avec expert RH',
    description_longue: 'Beneficiez de 30 minutes de conseil personnalise avec un expert RH partenaire de REPAE pour optimiser votre strategie de recrutement.',
    cout_points: 100,
    badge_minimum: 'silver',
    categorie: 'support',
    icone: 'fa-solid fa-headset',
    disponible: true
  },
  {
    id: '12',
    titre: 'Redaction offre pro',
    description: 'Redaction professionnelle de votre offre',
    description_longue: 'Notre equipe redige votre offre d\'emploi de maniere professionnelle pour maximiser son attractivite aupres des candidats.',
    cout_points: 80,
    badge_minimum: 'silver',
    categorie: 'support',
    icone: 'fa-solid fa-pen',
    disponible: true
  },

  // Exclusif
  {
    id: '13',
    titre: 'Partenariat annuel',
    description: 'Devenez partenaire officiel REPAE',
    description_longue: 'Statut de partenaire officiel REPAE pendant 1 an avec logo sur le site, mentions dans les communications et acces a tous les evenements.',
    cout_points: 2000,
    badge_minimum: 'platinum',
    categorie: 'exclusif',
    icone: 'fa-solid fa-handshake',
    disponible: true,
    stock: 2,
    duree: '1 an'
  },
  {
    id: '14',
    titre: 'Formation recrutement IT',
    description: 'Formation exclusive recrutement tech',
    description_longue: 'Participez a une formation exclusive sur les bonnes pratiques de recrutement dans le secteur IT, animee par des experts.',
    cout_points: 300,
    badge_minimum: 'gold',
    categorie: 'exclusif',
    icone: 'fa-solid fa-graduation-cap',
    disponible: true,
    stock: 10
  }
]

// Historique des avantages utilises (mock)
export const avantagesUtilisesMock: AvantageUtilise[] = [
  {
    id: 'u1',
    avantage_id: '1',
    date_utilisation: '2024-01-15',
    date_expiration: '2024-01-22',
    statut: 'expire'
  },
  {
    id: 'u2',
    avantage_id: '4',
    date_utilisation: '2024-01-18',
    statut: 'utilise'
  },
  {
    id: 'u3',
    avantage_id: '2',
    date_utilisation: '2024-01-10',
    date_expiration: '2024-02-10',
    statut: 'actif'
  }
]

// Fonctions utilitaires
export const getAvantageById = (id: string): Avantage | undefined => {
  return avantagesList.find(a => a.id === id)
}

export const getAvantagesByCategorie = (categorie: CategorieAvantage): Avantage[] => {
  return avantagesList.filter(a => a.categorie === categorie)
}

export const getAvantagesDisponibles = (badgeActuel: BadgeNiveau, pointsActuels: number): Avantage[] => {
  const badgeOrder: BadgeNiveau[] = ['bronze', 'silver', 'gold', 'platinum']
  const currentBadgeIndex = badgeOrder.indexOf(badgeActuel)

  return avantagesList.filter(a => {
    const requiredBadgeIndex = badgeOrder.indexOf(a.badge_minimum)
    return requiredBadgeIndex <= currentBadgeIndex && a.disponible
  })
}

export const canRedeemAvantage = (
  avantage: Avantage,
  badgeActuel: BadgeNiveau,
  pointsActuels: number
): { canRedeem: boolean; reason?: string } => {
  const badgeOrder: BadgeNiveau[] = ['bronze', 'silver', 'gold', 'platinum']
  const currentBadgeIndex = badgeOrder.indexOf(badgeActuel)
  const requiredBadgeIndex = badgeOrder.indexOf(avantage.badge_minimum)

  if (requiredBadgeIndex > currentBadgeIndex) {
    return {
      canRedeem: false,
      reason: `Necessite le badge ${avantage.badge_minimum}`
    }
  }

  if (pointsActuels < avantage.cout_points) {
    return {
      canRedeem: false,
      reason: `Il vous manque ${avantage.cout_points - pointsActuels} points`
    }
  }

  if (avantage.stock !== undefined && avantage.stock <= 0) {
    return {
      canRedeem: false,
      reason: 'Stock epuise'
    }
  }

  if (!avantage.disponible) {
    return {
      canRedeem: false,
      reason: 'Non disponible actuellement'
    }
  }

  return { canRedeem: true }
}
