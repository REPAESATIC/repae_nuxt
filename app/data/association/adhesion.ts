// Donnees d'adhesion au REPAE

export const cotisation = {
  montant: 10000,
  devise: 'FCFA',
  periode: 'annuelle',
  description: 'La cotisation annuelle permet de financer les activites du reseau et de beneficier de tous les avantages membres.'
}

export const avantages = [
  {
    id: 1,
    titre: 'Acces au reseau professionnel',
    description: "Connectez-vous avec plus de 500 alumni de l'ESATIC a travers le monde.",
    icon: 'fa-solid fa-users'
  },
  {
    id: 2,
    titre: 'Offres d\'emploi exclusives',
    description: 'Acces privilegie aux offres d\'emploi partagees par les entreprises partenaires.',
    icon: 'fa-solid fa-briefcase'
  },
  {
    id: 3,
    titre: 'Programme de mentorat',
    description: 'Beneficiez de l\'accompagnement de professionnels experimentes.',
    icon: 'fa-solid fa-graduation-cap'
  },
  {
    id: 4,
    titre: 'Evenements networking',
    description: 'Participez aux conferences, afterworks et evenements du reseau.',
    icon: 'fa-solid fa-calendar-alt'
  },
  {
    id: 5,
    titre: 'Formations continues',
    description: 'Acces a des formations et webinaires organises par le reseau.',
    icon: 'fa-solid fa-chart-line'
  },
  {
    id: 6,
    titre: 'Visibilite professionnelle',
    description: 'Profil visible dans l\'annuaire des experts IT du REPAE.',
    icon: 'fa-solid fa-user-tie'
  }
]

export const etapesAdhesion = [
  {
    numero: 1,
    titre: 'Verifier votre eligibilite',
    description: 'Etre ancien etudiant de l\'ESATIC (diplome ou ayant complete au moins une annee).',
    icon: 'fa-solid fa-check'
  },
  {
    numero: 2,
    titre: 'Remplir le formulaire',
    description: 'Completez le formulaire d\'adhesion avec vos informations personnelles et professionnelles.',
    icon: 'fa-solid fa-envelope'
  },
  {
    numero: 3,
    titre: 'Validation du bureau',
    description: 'Votre demande sera examinee et validee par le bureau du REPAE.',
    icon: 'fa-solid fa-user-tie'
  },
  {
    numero: 4,
    titre: 'Paiement de la cotisation',
    description: 'Reglez votre cotisation annuelle via les moyens de paiement disponibles.',
    icon: 'fa-solid fa-handshake'
  },
  {
    numero: 5,
    titre: 'Bienvenue au REPAE !',
    description: 'Vous recevez vos identifiants et acces a l\'espace membre.',
    icon: 'fa-solid fa-star'
  }
]

export const conditionsEligibilite = [
  'Etre diplome de l\'ESATIC (Licence, Master, Ingenieur)',
  'Ou avoir complete au moins une annee d\'etudes a l\'ESATIC',
  'Adherer aux statuts et reglement interieur du REPAE',
  'S\'engager a participer activement a la vie du reseau'
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
    nom: 'Especes',
    description: 'Lors des evenements du reseau',
    icon: 'fa-solid fa-handshake'
  }
]
