// Données de présentation de l'association REPAE

export const histoire = {
  dateCreation: '2021-10-09',
  description: "Le Réseau Professionnel des Alumni de l'ESATIC (REPAE) a été créé le 09 octobre 2021 par des anciens étudiants de l'École Supérieure Africaine des Technologies de l'Information et de la Communication (ESATIC).",
  timeline: [
    {
      annee: 2021,
      mois: 'Octobre',
      titre: 'Création du REPAE',
      description: "Fondation officielle du réseau par les premiers alumni de l'ESATIC."
    },
    {
      annee: 2022,
      mois: 'Mars',
      titre: 'Première assemblée générale',
      description: 'Élection du premier bureau exécutif et adoption des statuts.'
    },
    {
      annee: 2022,
      mois: 'Septembre',
      titre: 'Lancement des activités',
      description: 'Premiers événements de networking et sessions de mentorat.'
    },
    {
      annee: 2023,
      mois: 'Janvier',
      titre: 'Partenariats stratégiques',
      description: 'Signature de conventions avec des entreprises du secteur IT.'
    },
    {
      annee: 2024,
      mois: 'Juin',
      titre: 'Expansion du réseau',
      description: 'Le REPAE atteint 500 membres actifs à travers le monde.'
    }
  ]
}

export const objectifs = [
  {
    id: 1,
    titre: 'Maintenir les liens de fraternité',
    description: "Maintenir les liens de fraternité entre anciens étudiants de l'ESATIC et leurs cadets.",
    icon: 'fa-solid fa-handshake'
  },
  {
    id: 2,
    titre: 'Insertion professionnelle',
    description: "Contribuer à l'insertion professionnelle des membres en quête d'emploi et surtout des plus jeunes.",
    icon: 'fa-solid fa-briefcase'
  },
  {
    id: 3,
    titre: 'Cadre de formation',
    description: "Créer un cadre de formation (conférences, échanges avec des professionnels) et d'information à la recherche d'emploi.",
    icon: 'fa-solid fa-graduation-cap'
  },
  {
    id: 4,
    titre: 'Projets nationaux et internationaux',
    description: "Participer à des projets d'ordre national et international.",
    icon: 'fa-solid fa-globe'
  },
  {
    id: 5,
    titre: 'Relations inter-réseaux',
    description: 'Nouer des relations plus étroites avec les autres réseaux professionnels nationaux et internationaux.',
    icon: 'fa-solid fa-users'
  },
  {
    id: 6,
    titre: 'Défense des intérêts',
    description: 'Défendre les droits de ses membres lorsque sont en jeu leurs intérêts généraux.',
    icon: 'fa-solid fa-user-tie'
  }
]

export const valeurs = [
  {
    id: 1,
    titre: 'Fraternité',
    description: "Un esprit de famille qui unit tous les alumni de l'ESATIC, peu importe leur promotion ou leur localisation.",
    icon: 'fa-solid fa-heart',
    color: 'text-red-500'
  },
  {
    id: 2,
    titre: 'Excellence',
    description: "La quête permanente de l'excellence dans nos parcours professionnels et nos contributions au réseau.",
    icon: 'fa-solid fa-trophy',
    color: 'text-amber-500'
  },
  {
    id: 3,
    titre: 'Solidarité',
    description: "L'entraide et le soutien mutuel entre membres pour surmonter les défis professionnels.",
    icon: 'fa-solid fa-hands-helping',
    color: 'text-repae-blue-500'
  }
]

export const statistiques = [
  {
    valeur: '~500',
    label: 'Membres actifs',
    description: 'Alumni inscrits au réseau'
  },
  {
    valeur: '13',
    label: 'Promotions',
    description: "Générations d'anciens étudiants"
  },
  {
    valeur: '+50',
    label: 'Entreprises',
    description: 'Partenaires du réseau'
  },
  {
    valeur: '87%',
    label: "Taux d'insertion",
    description: 'Membres en emploi'
  }
]
