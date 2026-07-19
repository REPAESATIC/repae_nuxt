// Données d'adhésion au REPAE

export const cotisation = {
  montant: 5000,
  devise: 'FCFA',
  periode: 'unique',
  frequence: 'Adhésion unique, valable à vie',
  description: "L'adhésion est unique, valable à vie, et vous ouvre les portes d'un réseau professionnel dynamique, solidaire et en pleine expansion.",
  // Lien de paiement en ligne sécurisé (Djamo, Orange Money, MTN, Moov, Wave)
  lienPaiement: 'https://pay.djamo.com/b2qgr',
  // Coordonnées pour les transferts effectués exclusivement via Wave (Sendwave, Wave, etc.)
  transfertWave: {
    numero: '+225 05 75 28 16 69',
    titulaire: 'ILBOUDO Archel',
    fonction: 'Trésorier'
  }
}

export const avantages = [
  {
    id: 1,
    titre: 'Accès au réseau professionnel',
    description: "Connectez-vous avec plus de 500 alumni de l'ESATIC à travers le monde.",
    icon: 'fa-solid fa-users'
  },
  {
    id: 2,
    titre: 'Offres d\'emploi exclusives',
    description: 'Accès privilégié aux offres d\'emploi partagées par les entreprises partenaires.',
    icon: 'fa-solid fa-briefcase'
  },
  {
    id: 3,
    titre: 'Programme de mentorat',
    description: 'Bénéficiez de l\'accompagnement de professionnels expérimentés.',
    icon: 'fa-solid fa-graduation-cap'
  },
  {
    id: 4,
    titre: 'Événements networking',
    description: 'Participez aux conférences, afterworks et événements du réseau.',
    icon: 'fa-solid fa-calendar-alt'
  },
  {
    id: 5,
    titre: 'Formations continues',
    description: 'Accès à des formations et webinaires organisés par le réseau.',
    icon: 'fa-solid fa-chart-line'
  },
  {
    id: 6,
    titre: 'Visibilité professionnelle',
    description: 'Profil visible dans l\'annuaire des experts IT du REPAE.',
    icon: 'fa-solid fa-user-tie'
  }
]

export const etapesAdhesion = [
  {
    numero: 1,
    titre: 'Vérifier votre éligibilité',
    description: 'Être ancien étudiant de l\'ESATIC (diplômé ou ayant complété au moins une année).',
    icon: 'fa-solid fa-check'
  },
  {
    numero: 2,
    titre: 'Remplir le formulaire',
    description: 'Complétez le formulaire d\'adhésion avec vos informations personnelles et professionnelles.',
    icon: 'fa-solid fa-envelope'
  },
  {
    numero: 3,
    titre: 'Validation du bureau',
    description: 'Votre demande sera examinée et validée par le bureau du REPAE.',
    icon: 'fa-solid fa-user-tie'
  },
  {
    numero: 4,
    titre: 'Paiement de l\'adhésion',
    description: 'Réglez votre adhésion unique (5 000 FCFA, à vie) via les moyens de paiement disponibles.',
    icon: 'fa-solid fa-handshake'
  },
  {
    numero: 5,
    titre: 'Bienvenue au REPAE !',
    description: 'Vous recevez vos identifiants et accès à l\'espace membre.',
    icon: 'fa-solid fa-star'
  }
]

export const conditionsEligibilite = [
  'Être diplômé de l\'ESATIC (Licence, Master, Ingénieur)',
  'Ou avoir complété au moins une année d\'études à l\'ESATIC',
  'Adhérer aux statuts et règlement intérieur du REPAE',
  'S\'engager à participer activement à la vie du réseau'
]

export const moyensPaiement = [
  {
    id: 1,
    nom: 'Paiement en ligne sécurisé',
    description: 'Djamo, Orange Money, MTN Mobile Money, Moov Money, Wave',
    icon: 'fa-solid fa-lock'
  },
  {
    id: 2,
    nom: 'Paiement via transfert Wave',
    description: 'Pour les transferts effectués exclusivement via Wave (Sendwave, Wave, etc.)',
    icon: 'fa-solid fa-mobile-screen-button'
  }
]
