// Donnees de presentation de l'association REPAE

export const histoire = {
  dateCreation: '2021-10-09',
  description: "Le Reseau Professionnel des Alumni de l'ESATIC (REPAE) a ete cree le 09 octobre 2021 par des anciens etudiants de l'Ecole Superieure Africaine des Technologies de l'Information et de la Communication (ESATIC).",
  timeline: [
    {
      annee: 2021,
      mois: 'Octobre',
      titre: 'Creation du REPAE',
      description: "Fondation officielle du reseau par les premiers alumni de l'ESATIC."
    },
    {
      annee: 2022,
      mois: 'Mars',
      titre: 'Premiere assemblee generale',
      description: 'Election du premier bureau executif et adoption des statuts.'
    },
    {
      annee: 2022,
      mois: 'Septembre',
      titre: 'Lancement des activites',
      description: 'Premiers evenements de networking et sessions de mentorat.'
    },
    {
      annee: 2023,
      mois: 'Janvier',
      titre: 'Partenariats strategiques',
      description: 'Signature de conventions avec des entreprises du secteur IT.'
    },
    {
      annee: 2024,
      mois: 'Juin',
      titre: 'Expansion du reseau',
      description: 'Le REPAE atteint 500 membres actifs a travers le monde.'
    }
  ]
}

export const objectifs = [
  {
    id: 1,
    titre: 'Maintenir les liens de fraternite',
    description: "Maintenir les liens de fraternite entre anciens etudiants de l'ESATIC et leurs cadets.",
    icon: 'fa-solid fa-handshake'
  },
  {
    id: 2,
    titre: 'Insertion professionnelle',
    description: "Contribuer a l'insertion professionnelle des membres en quete d'emploi et surtout des plus jeunes.",
    icon: 'fa-solid fa-briefcase'
  },
  {
    id: 3,
    titre: 'Cadre de formation',
    description: "Creer un cadre de formation (conferences, echanges avec des professionnels) et d'information a la recherche d'emploi.",
    icon: 'fa-solid fa-graduation-cap'
  },
  {
    id: 4,
    titre: 'Projets nationaux et internationaux',
    description: "Participer a des projets d'ordre national et international.",
    icon: 'fa-solid fa-globe'
  },
  {
    id: 5,
    titre: 'Relations inter-reseaux',
    description: 'Nouer des relations plus etroites avec les autres reseaux professionnels nationaux et internationaux.',
    icon: 'fa-solid fa-users'
  },
  {
    id: 6,
    titre: 'Defense des interets',
    description: 'Defendre les droits de ses membres lorsque sont en jeu leurs interets generaux.',
    icon: 'fa-solid fa-user-tie'
  }
]

export const valeurs = [
  {
    id: 1,
    titre: 'Fraternite',
    description: "Un esprit de famille qui unit tous les alumni de l'ESATIC, peu importe leur promotion ou leur localisation.",
    icon: 'fa-solid fa-heart',
    color: 'text-red-500'
  },
  {
    id: 2,
    titre: 'Excellence',
    description: "La quete permanente de l'excellence dans nos parcours professionnels et nos contributions au reseau.",
    icon: 'fa-solid fa-trophy',
    color: 'text-amber-500'
  },
  {
    id: 3,
    titre: 'Solidarite',
    description: "L'entraide et le soutien mutuel entre membres pour surmonter les defis professionnels.",
    icon: 'fa-solid fa-hands-helping',
    color: 'text-repae-blue-500'
  }
]

export const statistiques = [
  {
    valeur: '~500',
    label: 'Membres actifs',
    description: 'Alumni inscrits au reseau'
  },
  {
    valeur: '13',
    label: 'Promotions',
    description: "Generations d'anciens etudiants"
  },
  {
    valeur: '+50',
    label: 'Entreprises',
    description: 'Partenaires du reseau'
  },
  {
    valeur: '87%',
    label: "Taux d'insertion",
    description: 'Membres en emploi'
  }
]
