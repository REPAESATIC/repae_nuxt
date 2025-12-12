// Donnees mock pour le Forum d'entraide professionnelle

export type CategorieQuestion = 'technique' | 'carriere' | 'freelance' | 'formation' | 'autre'

export interface ForumQuestion {
  id: string
  titre: string
  contenu: string
  categorie: CategorieQuestion
  auteur: {
    id: string
    nom: string
    prenom: string
    photo_url: string
    poste: string
  }
  date_creation: string
  nombre_reponses: number
  nombre_vues: number
  resolu: boolean
  tags: string[]
}

// Configuration des categories
export const categorieConfig: Record<CategorieQuestion, { label: string; color: string; icon: string }> = {
  technique: {
    label: 'Technique',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    icon: 'fa-solid fa-code'
  },
  carriere: {
    label: 'Carriere',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    icon: 'fa-solid fa-briefcase'
  },
  freelance: {
    label: 'Freelance',
    color: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    icon: 'fa-solid fa-user-tie'
  },
  formation: {
    label: 'Formation',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    icon: 'fa-solid fa-graduation-cap'
  },
  autre: {
    label: 'Autre',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    icon: 'fa-solid fa-circle-question'
  }
}

// Questions mock
export const forumQuestions: ForumQuestion[] = [
  {
    id: '1',
    titre: 'Comment migrer une application Laravel vers NestJS ?',
    contenu: 'Je travaille sur un projet de migration d\'une API Laravel vers NestJS. Quels sont les points de vigilance et les bonnes pratiques a suivre ?',
    categorie: 'technique',
    auteur: {
      id: '2',
      nom: 'Kouassi',
      prenom: 'Aya',
      photo_url: 'https://i.pravatar.cc/150?u=aya',
      poste: 'Backend Developer'
    },
    date_creation: '2024-12-11T14:30:00',
    nombre_reponses: 8,
    nombre_vues: 124,
    resolu: false,
    tags: ['Laravel', 'NestJS', 'Migration', 'API']
  },
  {
    id: '2',
    titre: 'Negociation salariale : vos conseils ?',
    contenu: 'J\'ai une offre interessante mais le salaire propose est en dessous de mes attentes. Comment bien negocier sans risquer de perdre l\'opportunite ?',
    categorie: 'carriere',
    auteur: {
      id: '3',
      nom: 'Diallo',
      prenom: 'Moussa',
      photo_url: 'https://i.pravatar.cc/150?u=moussa',
      poste: 'DevOps Engineer'
    },
    date_creation: '2024-12-10T09:15:00',
    nombre_reponses: 15,
    nombre_vues: 256,
    resolu: true,
    tags: ['Negociation', 'Salaire', 'Entretien']
  },
  {
    id: '3',
    titre: 'Demarrer en freelance depuis Abidjan : retours d\'experience',
    contenu: 'Je souhaite me lancer en freelance tout en restant a Abidjan. Quelles plateformes utilisez-vous ? Comment gerez-vous les paiements internationaux ?',
    categorie: 'freelance',
    auteur: {
      id: '4',
      nom: 'Kone',
      prenom: 'Fatou',
      photo_url: 'https://i.pravatar.cc/150?u=fatou',
      poste: 'UI/UX Designer'
    },
    date_creation: '2024-12-09T16:45:00',
    nombre_reponses: 22,
    nombre_vues: 389,
    resolu: false,
    tags: ['Freelance', 'Remote', 'Paiement', 'Abidjan']
  },
  {
    id: '4',
    titre: 'Certification AWS : laquelle choisir pour debuter ?',
    contenu: 'Je veux me certifier AWS mais je suis perdu entre les differentes certifications. Par laquelle commencer quand on a 2 ans d\'experience ?',
    categorie: 'formation',
    auteur: {
      id: '5',
      nom: 'Toure',
      prenom: 'Ibrahim',
      photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
      poste: 'Full Stack Developer'
    },
    date_creation: '2024-12-08T11:20:00',
    nombre_reponses: 12,
    nombre_vues: 178,
    resolu: true,
    tags: ['AWS', 'Certification', 'Cloud']
  },
  {
    id: '5',
    titre: 'Probleme de performance avec React Query et grandes listes',
    contenu: 'J\'ai une application React avec des listes de +1000 elements. Meme avec React Query et la virtualisation, j\'ai des lags. Des suggestions ?',
    categorie: 'technique',
    auteur: {
      id: '6',
      nom: 'Bamba',
      prenom: 'Sekou',
      photo_url: 'https://i.pravatar.cc/150?u=sekou',
      poste: 'Frontend Developer'
    },
    date_creation: '2024-12-07T08:00:00',
    nombre_reponses: 6,
    nombre_vues: 95,
    resolu: false,
    tags: ['React', 'Performance', 'React Query', 'Virtualisation']
  },
  {
    id: '6',
    titre: 'Reconversion vers la data science : par ou commencer ?',
    contenu: 'Apres 5 ans en developpement web, je souhaite me reconvertir vers la data science. Quelles competences prioriser ? Quelles formations recommandez-vous ?',
    categorie: 'carriere',
    auteur: {
      id: '7',
      nom: 'Ouattara',
      prenom: 'Marie',
      photo_url: 'https://i.pravatar.cc/150?u=marie',
      poste: 'Web Developer'
    },
    date_creation: '2024-12-06T14:10:00',
    nombre_reponses: 18,
    nombre_vues: 312,
    resolu: false,
    tags: ['Data Science', 'Reconversion', 'Python', 'Machine Learning']
  }
]

// Fonction pour obtenir les questions recentes
export const getRecentQuestions = (limit: number = 5): ForumQuestion[] => {
  return forumQuestions
    .slice()
    .sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime())
    .slice(0, limit)
}

// Fonction pour obtenir les questions populaires (par nombre de reponses)
export const getPopularQuestions = (limit: number = 5): ForumQuestion[] => {
  return forumQuestions
    .slice()
    .sort((a, b) => b.nombre_reponses - a.nombre_reponses)
    .slice(0, limit)
}

// Statistiques du forum
export const getForumStats = () => {
  return {
    total_questions: forumQuestions.length,
    questions_resolues: forumQuestions.filter(q => q.resolu).length,
    total_reponses: forumQuestions.reduce((sum, q) => sum + q.nombre_reponses, 0),
    total_vues: forumQuestions.reduce((sum, q) => sum + q.nombre_vues, 0)
  }
}

// Interface pour les reponses
export interface ForumReponse {
  id: string
  question_id: string
  parent_id?: string // ID de la reponse parente (pour les reponses imbriquees)
  contenu: string
  auteur: {
    id: string
    nom: string
    prenom: string
    photo_url: string
    poste: string
  }
  date_creation: string
  likes: number
  is_solution: boolean
}

// Reponses mock
export const forumReponses: ForumReponse[] = [
  // Reponses pour la question 1 (Laravel vers NestJS)
  {
    id: '1',
    question_id: '1',
    contenu: 'Salut ! J\'ai fait cette migration l\'annee derniere. Voici mes conseils :\n\n1. **Commence par les modeles** : NestJS utilise TypeORM ou Prisma, donc adapte tes modeles Eloquent\n2. **Les middlewares** deviennent des Guards et Interceptors dans NestJS\n3. **Attention aux validations** : passe de Laravel Validation a class-validator\n\nLe plus dur c\'est de changer de mentalite entre les deux frameworks.',
    auteur: {
      id: '8',
      nom: 'Camara',
      prenom: 'Adama',
      photo_url: 'https://i.pravatar.cc/150?u=adama',
      poste: 'Senior Backend Developer'
    },
    date_creation: '2024-12-11T15:45:00',
    likes: 12,
    is_solution: false
  },
  {
    id: '2',
    question_id: '1',
    contenu: 'Je te conseille aussi de regarder du cote de NestJS-Query si tu as beaucoup de CRUD. Ca simplifie enormement la migration des Controllers Laravel.',
    auteur: {
      id: '9',
      nom: 'Sangare',
      prenom: 'Aminata',
      photo_url: 'https://i.pravatar.cc/150?u=aminata',
      poste: 'Tech Lead'
    },
    date_creation: '2024-12-11T16:30:00',
    likes: 5,
    is_solution: false
  },
  {
    id: '3',
    question_id: '1',
    contenu: 'N\'oublie pas les tests ! PHPUnit vs Jest c\'est un autre monde. Prevois du temps pour re-ecrire ta suite de tests.',
    auteur: {
      id: '10',
      nom: 'Traore',
      prenom: 'Bakary',
      photo_url: 'https://i.pravatar.cc/150?u=bakary',
      poste: 'QA Engineer'
    },
    date_creation: '2024-12-11T17:00:00',
    likes: 8,
    is_solution: false
  },

  // Reponses pour la question 2 (Negociation salariale)
  {
    id: '4',
    question_id: '2',
    contenu: 'Le secret c\'est de toujours donner une fourchette et non un chiffre fixe. Par exemple : "Je recherche entre X et Y selon les avantages proposes".\n\nAussi, renseigne-toi sur les salaires du marche avant (Glassdoor, discussions avec des collegues).',
    auteur: {
      id: '11',
      nom: 'Coulibaly',
      prenom: 'Fatoumata',
      photo_url: 'https://i.pravatar.cc/150?u=fatoumata',
      poste: 'HR Manager'
    },
    date_creation: '2024-12-10T10:00:00',
    likes: 25,
    is_solution: true
  },
  {
    id: '5',
    question_id: '2',
    contenu: 'Important : ne jamais donner ton salaire actuel en premier ! Laisse-les faire la premiere offre. Et n\'hesite pas a negocier les avantages si le salaire est bloque (teletravail, formation, conges...).',
    auteur: {
      id: '12',
      nom: 'Diabate',
      prenom: 'Mamadou',
      photo_url: 'https://i.pravatar.cc/150?u=mamadou',
      poste: 'Engineering Manager'
    },
    date_creation: '2024-12-10T11:30:00',
    likes: 18,
    is_solution: false
  },

  // Reponses pour la question 3 (Freelance Abidjan)
  {
    id: '6',
    question_id: '3',
    contenu: 'Pour les plateformes, je recommande :\n- **Malt** : tres bien pour la France/Europe\n- **Upwork** : international mais competitif\n- **Toptal** : si tu passes leur test, les projets sont top\n\nPour les paiements, Wise (ex-TransferWise) est incontournable depuis Abidjan !',
    auteur: {
      id: '13',
      nom: 'Yao',
      prenom: 'Christelle',
      photo_url: 'https://i.pravatar.cc/150?u=christelle',
      poste: 'Freelance Developer'
    },
    date_creation: '2024-12-09T18:00:00',
    likes: 32,
    is_solution: false
  },
  {
    id: '7',
    question_id: '3',
    contenu: 'Pense aussi a te creer une presence LinkedIn forte. Beaucoup de mes clients viennent de la. Et n\'oublie pas de te declarer legalement (statut auto-entrepreneur ou equivalent en CI).',
    auteur: {
      id: '14',
      nom: 'Konan',
      prenom: 'Jean-Baptiste',
      photo_url: 'https://i.pravatar.cc/150?u=jeanbaptiste',
      poste: 'Independent Consultant'
    },
    date_creation: '2024-12-09T19:30:00',
    likes: 15,
    is_solution: false
  },

  // Reponses pour la question 4 (Certification AWS)
  {
    id: '8',
    question_id: '4',
    contenu: 'Avec 2 ans d\'experience, je te conseille de commencer par **AWS Cloud Practitioner** pour avoir les bases, puis enchainer avec **AWS Solutions Architect Associate**.\n\nLes ressources : les cours gratuits d\'AWS Skill Builder + les labs pratiques sont excellents.',
    auteur: {
      id: '15',
      nom: 'Ake',
      prenom: 'Didier',
      photo_url: 'https://i.pravatar.cc/150?u=didier',
      poste: 'Cloud Architect'
    },
    date_creation: '2024-12-08T12:00:00',
    likes: 20,
    is_solution: true
  },
  {
    id: '9',
    question_id: '4',
    contenu: 'Le Solutions Architect Associate est vraiment THE certification a avoir. Elle ouvre beaucoup de portes. Compte environ 2-3 mois de preparation si tu bosses deja.',
    auteur: {
      id: '16',
      nom: 'N\'Guessan',
      prenom: 'Olivier',
      photo_url: 'https://i.pravatar.cc/150?u=olivier',
      poste: 'DevOps Engineer'
    },
    date_creation: '2024-12-08T14:00:00',
    likes: 10,
    is_solution: false
  },

  // ========================================
  // REPONSES IMBRIQUEES (replies to replies)
  // ========================================

  // Reponse a la reponse 1 (sur Laravel vers NestJS)
  {
    id: '10',
    question_id: '1',
    parent_id: '1', // Reponse a Adama Camara
    contenu: 'Merci Adama ! Pour TypeORM vs Prisma, tu recommandes lequel pour quelqu\'un qui vient de Laravel ?',
    auteur: {
      id: '1',
      nom: 'Kouassi',
      prenom: 'Aya',
      photo_url: 'https://i.pravatar.cc/150?u=aya',
      poste: 'Full Stack Developer'
    },
    date_creation: '2024-12-11T18:00:00',
    likes: 3,
    is_solution: false
  },
  {
    id: '11',
    question_id: '1',
    parent_id: '10', // Reponse a Aya (nested level 2)
    contenu: 'Prisma sans hesiter ! La syntaxe est plus intuitive et le schema.prisma ressemble beaucoup aux migrations Laravel. En plus, le typage TypeScript est automatique.',
    auteur: {
      id: '8',
      nom: 'Camara',
      prenom: 'Adama',
      photo_url: 'https://i.pravatar.cc/150?u=adama',
      poste: 'Senior Backend Developer'
    },
    date_creation: '2024-12-11T18:30:00',
    likes: 7,
    is_solution: false
  },
  {
    id: '12',
    question_id: '1',
    parent_id: '11', // Reponse a Adama (nested level 3)
    contenu: 'Je confirme, Prisma c\'est top ! J\'ai fait le switch et je regrette pas.',
    auteur: {
      id: '9',
      nom: 'Sangare',
      prenom: 'Aminata',
      photo_url: 'https://i.pravatar.cc/150?u=aminata',
      poste: 'Tech Lead'
    },
    date_creation: '2024-12-11T19:00:00',
    likes: 2,
    is_solution: false
  },

  // Autre branche de reponse a la reponse 1
  {
    id: '13',
    question_id: '1',
    parent_id: '1',
    contenu: 'Pour les Guards NestJS, tu as des ressources a recommander ? J\'ai du mal avec le concept.',
    auteur: {
      id: '17',
      nom: 'Bamba',
      prenom: 'Sekou',
      photo_url: 'https://i.pravatar.cc/150?u=sekou',
      poste: 'Junior Developer'
    },
    date_creation: '2024-12-11T20:00:00',
    likes: 1,
    is_solution: false
  },
  {
    id: '14',
    question_id: '1',
    parent_id: '13',
    contenu: 'La doc officielle NestJS est excellente pour les Guards : https://docs.nestjs.com/guards\nEt regarde aussi les videos de Fireship sur YouTube !',
    auteur: {
      id: '8',
      nom: 'Camara',
      prenom: 'Adama',
      photo_url: 'https://i.pravatar.cc/150?u=adama',
      poste: 'Senior Backend Developer'
    },
    date_creation: '2024-12-11T20:30:00',
    likes: 4,
    is_solution: false
  },

  // Reponse a la reponse 4 (sur negociation salariale - meilleure reponse)
  {
    id: '15',
    question_id: '2',
    parent_id: '4',
    contenu: 'Tres bon conseil ! Et pour la recherche des salaires du marche, vous conseillez quoi comme source fiable en Cote d\'Ivoire ?',
    auteur: {
      id: '18',
      nom: 'Toure',
      prenom: 'Ibrahim',
      photo_url: 'https://i.pravatar.cc/150?u=ibrahim',
      poste: 'Software Engineer'
    },
    date_creation: '2024-12-10T12:00:00',
    likes: 5,
    is_solution: false
  },
  {
    id: '16',
    question_id: '2',
    parent_id: '15',
    contenu: 'Pour la CI, je recommande de rejoindre les groupes LinkedIn et Telegram des devs ivoiriens. Les discussions y sont franches sur les salaires. Sinon, les cabinets comme Afrique RH publient parfois des etudes.',
    auteur: {
      id: '11',
      nom: 'Coulibaly',
      prenom: 'Fatoumata',
      photo_url: 'https://i.pravatar.cc/150?u=fatoumata',
      poste: 'HR Manager'
    },
    date_creation: '2024-12-10T13:00:00',
    likes: 12,
    is_solution: false
  },

  // Reponse a la reponse 6 (sur Freelance)
  {
    id: '17',
    question_id: '3',
    parent_id: '6',
    contenu: 'Wise fonctionne bien depuis Abidjan ? J\'ai entendu dire qu\'il y avait des problemes de verification.',
    auteur: {
      id: '19',
      nom: 'Kone',
      prenom: 'Mariam',
      photo_url: 'https://i.pravatar.cc/150?u=mariam',
      poste: 'Frontend Developer'
    },
    date_creation: '2024-12-09T20:00:00',
    likes: 3,
    is_solution: false
  },
  {
    id: '18',
    question_id: '3',
    parent_id: '17',
    contenu: 'Oui ca marche ! La verification peut prendre 2-3 jours mais apres c\'est fluide. J\'utilise la carte virtuelle pour mes achats en ligne aussi.',
    auteur: {
      id: '13',
      nom: 'Yao',
      prenom: 'Christelle',
      photo_url: 'https://i.pravatar.cc/150?u=christelle',
      poste: 'Freelance Developer'
    },
    date_creation: '2024-12-09T21:00:00',
    likes: 6,
    is_solution: false
  },
  {
    id: '19',
    question_id: '3',
    parent_id: '18',
    contenu: 'Super, merci pour le retour ! Je vais me lancer alors.',
    auteur: {
      id: '19',
      nom: 'Kone',
      prenom: 'Mariam',
      photo_url: 'https://i.pravatar.cc/150?u=mariam',
      poste: 'Frontend Developer'
    },
    date_creation: '2024-12-09T22:00:00',
    likes: 1,
    is_solution: false
  }
]

// Interface pour les reponses avec leurs sous-reponses
export interface ForumReponseWithReplies extends ForumReponse {
  replies: ForumReponseWithReplies[]
}

// Fonction pour construire l'arbre des reponses
export const getNestedReplies = (questionId: string): ForumReponseWithReplies[] => {
  const allReplies = forumReponses.filter(r => r.question_id === questionId)

  // Map pour acceder rapidement aux reponses par ID
  const replyMap = new Map<string, ForumReponseWithReplies>()
  allReplies.forEach(r => {
    replyMap.set(r.id, { ...r, replies: [] })
  })

  // Construire l'arbre
  const rootReplies: ForumReponseWithReplies[] = []

  allReplies.forEach(r => {
    const replyWithReplies = replyMap.get(r.id)!
    if (r.parent_id) {
      // C'est une sous-reponse
      const parent = replyMap.get(r.parent_id)
      if (parent) {
        parent.replies.push(replyWithReplies)
      }
    } else {
      // C'est une reponse de premier niveau
      rootReplies.push(replyWithReplies)
    }
  })

  // Trier: solution en premier, puis par likes
  const sortReplies = (replies: ForumReponseWithReplies[]): ForumReponseWithReplies[] => {
    return replies
      .sort((a, b) => {
        if (a.is_solution && !b.is_solution) return -1
        if (!a.is_solution && b.is_solution) return 1
        return b.likes - a.likes
      })
      .map(r => ({
        ...r,
        replies: sortReplies(r.replies)
      }))
  }

  return sortReplies(rootReplies)
}

// Fonction pour obtenir les reponses d'une question (version plate, pour compatibilite)
export const getReponsesByQuestionId = (questionId: string): ForumReponse[] => {
  return forumReponses
    .filter(r => r.question_id === questionId && !r.parent_id) // Seulement les reponses de premier niveau
    .sort((a, b) => {
      // Solution en premier, puis par likes
      if (a.is_solution && !b.is_solution) return -1
      if (!a.is_solution && b.is_solution) return 1
      return b.likes - a.likes
    })
}

// Fonction pour obtenir une question par son ID
export const getQuestionById = (id: string): ForumQuestion | undefined => {
  return forumQuestions.find(q => q.id === id)
}
