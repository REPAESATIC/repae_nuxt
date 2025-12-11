// Données d'adhésion au REPAE

export const cotisation = {
  montant: 10000,
  devise: 'FCFA',
  periode: 'annuelle',
  description: 'La cotisation annuelle permet de financer les activités du réseau et de bénéficier de tous les avantages membres.'
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
    titre: 'Paiement de la cotisation',
    description: 'Réglez votre cotisation annuelle via les moyens de paiement disponibles.',
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
    nom: 'Mobile Money',
    description: 'Orange Money, MTN Money, Moov Money',
    icon: 'fa-solid fa-phone'
  },
  {
    id: 2,
    nom: 'Virement bancaire',
    description: 'Transfert vers le compte du REPAE',
    icon: 'fa-solid fa-building'
  },
  {
    id: 3,
    nom: 'Espèces',
    description: 'Lors des événements du réseau',
    icon: 'fa-solid fa-handshake'
  }
]
