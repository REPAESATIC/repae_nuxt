// Données des documents officiels du REPAE

export interface DocumentOfficiel {
  id: string
  titre: string
  type: 'statut' | 'reglement' | 'proces_verbal' | 'autre'
  description: string
  fichier_url: string
  version: string
  date_publication: string
  public: boolean
}

export interface ArticleDocument {
  numero: string
  titre: string
  contenu: string
}

export interface SectionDocument {
  titre: string
  articles: ArticleDocument[]
}

export interface ContenuDocument {
  preambule: string
  sections: SectionDocument[]
}

export const documentsOfficiels: DocumentOfficiel[] = [
  {
    id: 'statuts-v1',
    titre: 'Statuts du REPAE',
    type: 'statut',
    description: 'Les statuts définissent les règles fondamentales de fonctionnement de l\'association, ses objectifs, son organisation et les droits et devoirs de ses membres.',
    fichier_url: '/documents/Statuts_Reglement_Interieur_REPAE.pdf',
    version: '1.0',
    date_publication: '2022-03-15',
    public: true
  },
  {
    id: 'reglement-v1',
    titre: 'Règlement Intérieur',
    type: 'reglement',
    description: 'Le règlement intérieur précise les modalités pratiques d\'application des statuts et les règles de vie au sein du réseau.',
    fichier_url: '/documents/Statuts_Reglement_Interieur_REPAE.pdf',
    version: '1.0',
    date_publication: '2022-03-15',
    public: true
  }
]

export const statuts = documentsOfficiels.find(doc => doc.type === 'statut')
export const reglement = documentsOfficiels.find(doc => doc.type === 'reglement')

// Contenu des statuts du REPAE (extrait du document officiel)
export const statutsContenu: ContenuDocument = {
  preambule: `Il est créé une association à but non lucratif régie par la loi n°60-315 du 21 septembre 1960 relative aux associations et dénommée Réseau Professionnel des Alumni de l'ESATIC (REPAE). Ladite association jouit de la personnalité juridique et de l'autonomie financière.`,
  sections: [
    {
      titre: 'Chapitre I : Formation et objet de l\'association',
      articles: [
        {
          numero: '1',
          titre: 'Dénomination de l\'association',
          contenu: `Il est créé une association à but non lucratif régie par la loi n°60-315 du 21 septembre 1960 relative aux associations et dénommée Réseau Professionnel des Alumni de l'ESATIC (REPAE). Ladite association jouit de la personnalité juridique et de l'autonomie financière.`
        },
        {
          numero: '2',
          titre: 'Siège social',
          contenu: `Le siège social de l'association est fixé à l'ESATIC (École Supérieure Africaine des Technologies de l'Information et de la Communication) Abidjan, Treichville, Km4 Bd de Marseille. Il peut être transféré en cas de besoin en tout autre lieu du territoire national par la décision de l'assemblée générale.`
        },
        {
          numero: '3',
          titre: 'Objet de l\'association',
          contenu: `L'association a pour objet de :\n- Maintenir les liens de fraternité entre les anciens étudiants de l'ESATIC et leurs cadets ;\n- Contribuer à l'insertion professionnelle des membres en quête d'emploi surtout les nouveaux diplômés ;\n- Créer un cadre de formation (organiser des conférences, échanges avec des professionnels) et d'informations à la recherche d'emploi (mieux diffuser les offres d'emplois) ;\n- Participer à des projets d'ordre national et international ;\n- Nouer des relations plus étroites avec les autres réseaux professionnels existants ;\n- Assister ses membres en cas de besoin et dans la limite des capacités du réseau ;\n- Être le référent des anciens auprès de l'administration de l'ESATIC et de toutes autres institutions.`
        },
        {
          numero: '4',
          titre: 'Règlement Intérieur',
          contenu: `Le règlement intérieur adopté par l'assemblée générale sur proposition du bureau exécutif détermine les conditions d'application des présents statuts. Tous les membres sont tenus de s'y conformer au même titre qu'aux statuts. Le bureau exécutif peut faire des propositions de modifications du règlement intérieur. Ces modifications doivent faire objet de validation par l'assemblée générale en session ordinaire ou extraordinaire.`
        },
        {
          numero: '5',
          titre: 'Respect de l\'objet de l\'association',
          contenu: `Le REPAE reste une association apolitique, laïque. Les instances dirigeantes du réseau s'interdisent toute délibération sur des sujets étrangers aux buts du réseau et s'engagent à respecter les principes inscrits dans les statuts.`
        }
      ]
    },
    {
      titre: 'Chapitre II : Notion de membre – Conditions d\'adhésion – Démission – Radiation - Exclusion',
      articles: [
        {
          numero: '6',
          titre: 'Notion de membre',
          contenu: `L'association se compose de diplômés, d'anciens étudiants non diplômés et d'étudiants de l'ESATIC se soumettant aux statuts et règlement intérieur en vigueur et ayant acquis la qualité de membre au titre de l'un des statuts particuliers visés ci-après :\n\nDiplômés : Tout diplômé des formations diplômantes de l'ESATIC aura le droit d'être membre de l'association.\n\nAnciens étudiants non diplômés : Tout ancien étudiant ayant été régulièrement inscrit à l'ESATIC et y ayant effectué au moins une année académique pleine aura le droit d'être membre de l'association.\n\nÉtudiants : Tout étudiant de l'ESATIC inscrit en dernière année de cycle LICENCE ou MASTER aura le droit d'être membre de l'association.`
        },
        {
          numero: '6.1',
          titre: 'Adhésion individuelle',
          contenu: `Deviennent membres de l'association les personnes qui respectent les conditions de l'article 6 et il faut :\n- Signer un bulletin d'adhésion comportant l'acceptation des dispositions des statuts, du règlement intérieur et des droits et obligations définis pour chaque membre ;\n- Payer un droit d'adhésion ;\n- Être agréé par un comité chargé des adhésions mis en place par le bureau.`
        },
        {
          numero: '7',
          titre: 'Notion de membre participant',
          contenu: `Est membre participant du REPAE tout membre qui est à jour de ses cotisations.`
        },
        {
          numero: '8',
          titre: 'Appellation',
          contenu: `Tout membre REPAE portera l'appellation « IT-x ».\n\nLe numéro « x » que porte un IT est calculé suivant sa date de sortie de l'ESATIC et son niveau lors de sa sortie de l'ESATIC pour le premier diplôme de sa promotion.\n\nFormule :\n- Pour un étudiant sorti en licence : x = ((année de sortie de sa promotion) modulo (2015)) + 1\n- Pour un étudiant sorti en master : x = ((année de sortie de sa promotion - 2) modulo (2015)) + 1\n\nNB : 2015 est l'année de sortie de la première promotion de l'ESATIC (Licence 3).`
        },
        {
          numero: '9',
          titre: 'Engagement des membres',
          contenu: `L'association admet des membres lesquels s'engagent à respecter dans toutes leurs dispositions, les statuts, le règlement intérieur, et ses annexes.`
        },
        {
          numero: '10',
          titre: 'Démission – Résiliation',
          contenu: `Le membre peut mettre fin à son adhésion en envoyant une demande selon les moyens qui lui seront communiqués par le bureau, au plus tard 45 jours avant la tenue de la prochaine assemblée générale de l'année en cours. La demande prend effet à la suite d'une discussion préalable sur les motifs de démission entre le bureau et le membre démissionnaire sauf si ce dernier se rétracte. La décision de démission est ensuite présentée à la prochaine assemblée générale.`
        },
        {
          numero: '11',
          titre: 'Exclusion',
          contenu: `Peut être exclu le membre qui aurait causé volontairement un préjudice aux intérêts de l'association. Le membre dont l'exclusion est proposée pour ce motif est convoqué devant le bureau de mandat en cours pour être entendu sur les faits qui lui sont reprochés.\n\nS'il ne se présente pas au jour indiqué, une nouvelle convocation lui est adressée par lettre avec accusé de réception. S'il s'abstient encore d'y déférer, le bureau exécutif peut alors demander l'exclusion du membre à la prochaine assemblée générale. L'exclusion est décidée à la majorité simple à l'assemblée générale.`
        },
        {
          numero: '12',
          titre: 'Conséquences de la démission, de l\'exclusion et de la suspension',
          contenu: `La démission, la radiation, la suspension et l'exclusion ne donnent pas droit au remboursement des cotisations versées. Aucune prestation ne peut être servie après la date d'effet de la démission, ni après la décision d'exclusion ceci concerne également la suspension. Les droits de ce membre sont suspendus pendant la durée de la démission, de l'exclusion ou de la suspension.`
        },
        {
          numero: '13',
          titre: 'Condition de réintégration',
          contenu: `Un membre, qui a démissionné ou qui a fait l'objet d'exclusion peut être réintégré à la suite d'une discussion préalable sur ses motifs de réintégration et sous les conditions suivantes :\n\n13.1 – Cas de démission :\n- Adresser une lettre de demande de réintégration au bureau exécutif 45 jours avant la prochaine assemblée générale.\n- Cette lettre doit être envoyée au moins six mois après la décision du bureau exécutif d'acter ladite démission.\n- Le membre devra s'acquitter d'un droit de réintégration équivalent à la cotisation d'une année.\n\n13.2 – Cas d'exclusion :\n- Adresser une lettre de demande de réintégration au bureau exécutif 45 jours avant la prochaine assemblée générale.\n- Cette lettre doit être envoyée au moins six mois après la décision d'exclusion.\n- Le membre devra s'acquitter d'une amende équivalente à la cotisation de deux années.\n- L'assemblée générale se réserve le droit de valider ou de refuser la demande de réintégration.\n\n13.3 – Cas de suspension :\nLa réintégration n'est soumise à aucune condition sauf celle d'avoir fini son cursus à l'ESATIC.`
        }
      ]
    },
    {
      titre: 'Chapitre III : Assemblée Générale',
      articles: [
        {
          numero: '14',
          titre: 'Composition de l\'assemblée générale',
          contenu: `L'assemblée générale regroupe l'ensemble des membres du réseau régulièrement inscrits au registre des adhésions à la date de la convocation de la réunion. Elle délibère valablement et engage l'ensemble de ses adhérents.\n\nSections de vote : La section de vote régit le fonctionnement des votes lors de l'assemblée générale. Les votes sont définis comme étant la responsabilité des membres. Ils contribuent à valider les prises de décisions ou à élire le ou la président(e) du REPAE en portant les choix des membres.`
        },
        {
          numero: '15',
          titre: 'Assemblée générale',
          contenu: `L'assemblée générale se réunit au moins deux fois par an. L'assemblée générale peut également être convoquée de manière extraordinaire par :\n- La majorité des membres du REPAE.\n- Le président ou la présidente du REPAE.`
        },
        {
          numero: '16',
          titre: 'Modalités de convocation de l\'assemblée générale',
          contenu: `L'assemblée générale doit être convoquée dans les conditions, moyens et délais fixés par les dispositions légales en vigueur. L'assemblée générale doit être convoquée au moins un mois avant la date de sa réunion.\n\nLa convocation doit indiquer la dénomination sociale éventuellement suivie de son sigle, l'adresse du siège social du réseau professionnel, le jour, l'heure et le lieu de l'assemblée générale, son ordre du jour ainsi que les règles de quorum et de majorité applicables aux délibérations correspondantes.`
        },
        {
          numero: '17',
          titre: 'Ordre du jour de l\'assemblée générale',
          contenu: `L'ordre du jour précise chacune des questions soumises à la délibération de l'assemblée générale. L'ordre du jour est arrêté par l'auteur de la convocation. L'assemblée ne délibère que sur des questions inscrites à l'ordre du jour.`
        },
        {
          numero: '18',
          titre: 'Compétences de l\'assemblée générale',
          contenu: `L'assemblée est appelée à statuer sur :\n- Les modifications de ses statuts ;\n- Les actions menées par le réseau professionnel ;\n- Les montants ou les taux de cotisations, les prestations offertes, ainsi que le contenu du règlement intérieur ;\n- L'adhésion à une union ;\n- Le rapport de gestion et les comptes annuels présentés par le bureau exécutif et les documents, états et tableaux qui s'y rattachent ;\n- Toutes questions relevant de sa compétence en application des dispositions réglementaires en vigueur.`
        },
        {
          numero: '19',
          titre: 'Modalités de vote – Quorum et majorité – Vote par procuration',
          contenu: `19.1 – Délibération nécessitant un quorum et une majorité qualifiée :\nLorsqu'elle se prononce sur la modification des statuts, les actions menées, les montants ou taux de cotisations et prestations, la dissolution ou la création d'un organe du réseau, la délégation de pouvoir au bureau exécutif, l'AG ne délibère valablement que si le nombre de ses membres présents est au moins égal à la moitié du nombre total des membres inscrits. À défaut, une seconde AG peut être convoquée et ne délibère valablement que si le nombre de ses membres présents représente au moins le quart du nombre total. Les décisions sont adoptées à la majorité des deux tiers des suffrages exprimés.\n\n19.2 – Délibération nécessitant un quorum et une majorité simple :\nPour les questions autres que celles visées à l'article 19.1, l'assemblée ne délibère valablement que si le nombre de ses membres présents est au moins égal au quart du nombre total des membres inscrits. À défaut, une seconde AG peut être convoquée et délibère valablement quel que soit le nombre de ses membres présents. Les décisions sont adoptées à la majorité simple des suffrages exprimés.\n\n19.3 – Vote par procuration :\nLes membres ne sont pas autorisés à voter par procuration.\n\n19.4 – Délibération de l'AG extraordinaire :\nPour des questions jugées urgentes pour la survie de l'association et discutées en AG extraordinaire, dans le respect des délais et modalités de convocation, l'AG délibère valablement quel que soit le nombre de ses membres présents. Les décisions sont adoptées à la majorité simple des suffrages exprimés.`
        },
        {
          numero: '20',
          titre: 'Délégation de pouvoirs de l\'assemblée générale',
          contenu: `L'assemblée générale peut déléguer tout ou une partie de ses pouvoirs de détermination des montants et des taux de cotisations et/ou des actions à mener au bureau exécutif. Cette délégation n'est valable que pour une année. Les décisions prises au titre de cette délégation doivent être ratifiées par l'assemblée générale la plus proche.`
        },
        {
          numero: '21',
          titre: 'Force exécutoire des décisions de l\'assemblée générale',
          contenu: `Les décisions régulièrement prises par l'assemblée générale s'imposent au réseau et à ses membres sous réserve de leur conformité à l'objet du réseau. Les modifications des montants des cotisations ainsi que des actions à mener, qu'elles soient décidées par l'assemblée générale ou par le bureau exécutif sur délégation, sont applicables de plein droit dès qu'elles ont été adressées aux membres dans les conditions prévues par les présents statuts.`
        }
      ]
    },
    {
      titre: 'Chapitre IV : Président(e) du REPAE – Bureau',
      articles: [
        {
          numero: '22',
          titre: 'Élection et révocation',
          contenu: `Le président ou la présidente du REPAE est élu(e) à bulletin secret à un tour, en qualité de personne physique, par l'assemblée générale, parmi ses membres.\n\nEn cas d'égalité entre deux candidats en tête des suffrages, un second tour est organisé séance tenante pour élire le président ou la présidente.\n\nLe président ou la présidente est élu(e) pour une durée de deux (02) ans. Il ou elle est rééligible ; le nombre de mandats ne peut excéder trois.\n\nLe président ou la présidente ne peut exercer simultanément, en plus de son mandat de président(e), un autre mandat à caractère électif au sein du réseau.`
        },
        {
          numero: '23',
          titre: 'Condition d\'éligibilité du ou de la président(e) du REPAE',
          contenu: `Les conditions d'éligibilité du président(e) du REPAE sont les suivantes :\n1. Le candidat ou la candidate doit être membre du REPAE et être à jour de ses engagements.\n2. Le candidat ou la candidate doit avoir au moins participé à une assemblée générale (sauf pour la première élection).\n3. Le candidat ou la candidate doit avoir participé à au moins 50% des activités des Alumni du précédent mandat (sauf pour la première élection).\n4. Le candidat ou la candidate ne peut pas être membre de la Commission des statuts et des élections.`
        },
        {
          numero: '24',
          titre: 'Vacances',
          contenu: `En cas de décès, de démission et de perte de la qualité de membre du président ou de la présidente du REPAE, il est pourvu à son remplacement par une assemblée générale extraordinaire qui procède à une nouvelle élection. L'assemblée générale sera convoquée dans un délai de 60 jours, par les vice-présidents à compter de la date de vacance du poste. Dans l'intervalle, les fonctions de président(e) seront remplies par les vice-présidents, dans l'ordre hiérarchique de leur nomination.\n\n24.1 – Gestion de la vacance présidentielle en fin de mandat :\nEn cas de fin de mandat du président en exercice, le bureau sortant assure la continuité des activités courantes jusqu'à l'investiture d'un nouveau président.`
        },
        {
          numero: '25',
          titre: 'Les missions du ou de la président(e) du REPAE',
          contenu: `Le président ou la présidente du REPAE organise et dirige les travaux du bureau exécutif du REPAE dont il rend compte à l'assemblée générale. Il veille au bon fonctionnement des organes du réseau et s'assure en particulier que les administrateurs sont à mesure de remplir les attributions qui leur sont confiées.\n\nLe ou la président(e) du REPAE convoque l'assemblée générale et en établit l'ordre du jour à travers son bureau. Il donne avis aux commissaires aux comptes de toutes les conventions autorisées. Il ou elle engage les dépenses.\n\nLe ou la président(e) du REPAE peut représenter le réseau en justice et dans tous les actes de la vie civile. Il ou elle est compétent(e) pour défendre le réseau dans les actions intentées contre elle et introduire toute action en justice dans l'intérêt de celle-ci. Il en informe au préalable l'assemblée générale.`
        },
        {
          numero: '26',
          titre: 'Composition du bureau',
          contenu: `Le bureau est constitué du président(e) du REPAE et des membres suivants :\n- Au plus 3 vice-présidents ;\n- Un secrétaire général ;\n- Un secrétaire général adjoint ;\n- Un trésorier ;\n- Un trésorier adjoint.\n\nLe bureau peut aussi inclure des postes supplémentaires en cas de besoin affirmé.`
        },
        {
          numero: '27',
          titre: 'Nomination',
          contenu: `Les membres du bureau sont nommés pour la durée du mandat du président(e) du REPAE. Les membres du bureau peuvent être révoqués à tout moment par le ou la président(e) du REPAE.\n\nLa nomination d'un membre du bureau est soumise au préalable à un appel à candidature au sein du réseau. Le président sélectionne le membre nommé parmi les candidats en fonction de leurs compétences, motivation et qualités. L'appel à candidature est lancé 15 jours au plus tard après l'élection du président et reste ouvert pour une durée de 15 jours, non renouvelable.`
        },
        {
          numero: '28',
          titre: 'Vacances',
          contenu: `En cas de décès, de démission ou de perte de la qualité de membre d'un des membres du bureau, il pourra être remplacé par une autre personne nommée par le ou la président(e) du REPAE. Le nouveau membre du bureau ainsi nommé achève la mission de son prédécesseur pour le mandat en cours.`
        },
        {
          numero: '29',
          titre: 'Rôle du bureau exécutif du REPAE',
          contenu: `Le bureau exécutif du REPAE a pour mission d'accompagner le ou la président(e) du REPAE dans la mise en œuvre de son programme. Il a une mission permanente de satisfaire les décisions de l'assemblée générale ; à cet effet, il reçoit toutes informations des commissions qu'elles soient statutaires ou non.`
        },
        {
          numero: '30',
          titre: 'Réunion et délibérations du bureau',
          contenu: `Le bureau se réunit sur convocation du président(e) du REPAE, aussi souvent que l'intérêt du réseau l'exige et au moins quatre fois par an. Le ou la président(e) établit l'ordre du jour du bureau et le joint à la convocation qui est adressée aux membres du bureau au moins cinq jours avant la date des réunions, sauf circonstances exceptionnelles ou d'urgence. Le ou la président(e) peut inviter des personnes qualifiées, extérieures au bureau, à assister aux réunions de celui-ci.`
        },
        {
          numero: '31',
          titre: 'Vice-présidents',
          contenu: `Le ou la président(e) du REPAE peut nommer deux vice-présidents en charge des commissions. Les vice-présidents de droit président les commissions telles que prévues statutairement dans l'article 36. Ils organisent et dirigent les travaux de leur commission respective dont ils rendent compte au bureau.\n\nLes vice-présidents secondent le président du réseau et le suppléent dans les conditions définies à l'article 24, en cas d'empêchement avec les mêmes pouvoirs dans toutes les fonctions.\n\nLe président peut choisir de nommer un vice-président chargé de la diaspora en cas de besoin. Celui-ci est chargé de piloter les différentes cellules qui constituent la diaspora.`
        },
        {
          numero: '32',
          titre: 'Secrétaire général',
          contenu: `Le secrétaire général est responsable de la rédaction des procès-verbaux, de la conservation des archives ainsi que de la tenue du fichier des membres du réseau professionnel. Il participe aux travaux de la commission des statuts et élections dont il rend compte au bureau puis à l'ensemble des membres du réseau.`
        },
        {
          numero: '33',
          titre: 'Secrétaire général adjoint',
          contenu: `Le secrétaire général adjoint seconde le secrétaire général qu'il supplée en cas d'empêchement avec les mêmes pouvoirs dans toutes ses fonctions.`
        },
        {
          numero: '34',
          titre: 'Trésorier général',
          contenu: `Le trésorier général effectue les opérations financières du réseau et tient la comptabilité. Il est chargé du paiement des dépenses engagées par le ou la président(e) du réseau et de l'encaissement des sommes dues à l'association. Il ou elle prépare et présente au bureau :\n- Les comptes annuels et les documents, états, tableaux s'y rattachant ;\n- Le rapport annuel ;\n- Le rapport relatif aux transferts financiers ;\n- Un rapport synthétique sur la situation financière du réseau.\n\nIl organise et dirige les travaux de la commission des finances dont il rend compte.`
        },
        {
          numero: '35',
          titre: 'Trésorier général adjoint',
          contenu: `Le trésorier général adjoint seconde le trésorier général qu'il supplée en cas d'empêchement avec les mêmes pouvoirs dans toutes ses fonctions.`
        },
        {
          numero: '36',
          titre: 'Commissions',
          contenu: `Il est institué sept (7) commissions permanentes afin de faciliter les travaux du bureau :\n\n36-1 Commission des statuts et des élections :\nPrésidée par un vice-président nommé par le ou la président(e) du REPAE. Composée du secrétaire général, du secrétaire général adjoint, de 05 membres (hors bureau) nommés par le président de la commission suite à un appel à candidature, et au plus deux autres membres du bureau. Elle est limitée à 10 personnes au maximum. Les membres de la CSE ne peuvent être candidats à aucune élection au sein du réseau.\n\n36-2 Commission du budget, des finances et d'engagements :\nPrésidée par le trésorier général. Composée du trésorier général, du trésorier général adjoint, des trésoriers de la diaspora. En charge des financements conformément à la politique arrêtée par le bureau. Elle participe à l'élaboration du budget, est responsable de son suivi, et propose des corrections si nécessaires.\n\n36-3 Commission communication, organisation et animation du réseau :\nPrésidée par le responsable de communication du bureau. Chargée de proposer chaque année un programme d'animation et le budget correspondant. Doit présenter un rapport annuel de l'ensemble des activités à l'assemblée générale. Associée à l'élaboration des axes de la politique de communication du réseau.\n\n36-4 Commission action sociale :\nPrésidée par le responsable des relations sociales au sein du bureau. Chargée d'accorder aux membres ou à leurs ayants droit les allocations d'action sociale. Composée d'un président et de quatre membres nommés par le bureau.\n\n36-5 Commission affaires extérieures et partenariats :\nPrésidée par un membre du bureau nommé par le président(e). Chargée de la promotion du réseau, du renforcement de sa visibilité et de la fidélisation des partenaires et sponsors. Composée d'un président et de deux (02) autres membres.\n\n36-6 Commission insertion professionnelle :\nPrésidée par un membre du bureau. Chargée de créer un cadre permettant de faciliter l'insertion professionnelle des membres du réseau et de l'élaboration d'une base de données de la situation professionnelle des membres. Composée d'un président et de quatre autres membres.\n\n36-7 Commission expertise et compétences :\nPrésidée par un membre du bureau. Chargée de piloter l'ensemble des activités liées à l'expertise et la montée en compétence des membres du réseau. Également l'organe habilité à répondre aux sollicitations de l'ESATIC sur les questions relatives à la pédagogie. Composée d'un président, de quatre membres du bureau et de cinq autres membres externes.\n\n36-8 Dispositions générales :\nChaque commission peut, si elle l'estime nécessaire, adjoindre des conseillers techniques. Chaque président de commission est chargé de présenter au bureau un rapport circonstancié sur les travaux menés. Un membre du bureau peut faire partie de deux commissions au plus.`
        }
      ]
    },
    {
      titre: 'Chapitre VI : La Diaspora du REPAE',
      articles: [
        {
          numero: '37',
          titre: 'Définition d\'un membre de la diaspora du REPAE',
          contenu: `Est considéré comme membre de la diaspora du REPAE tout membre du REPAE résident hors de la Côte d'Ivoire se soumettant aux statuts et règlement en vigueur.`
        },
        {
          numero: '38',
          titre: 'Organisation',
          contenu: `La diaspora du REPAE s'organise par section. La création d'une section est soumise à la condition suivante :\n- Il faut 5 membres minimum résidents dans le pays concerné.\n\nAu cas où le nombre de membres est inférieur à 5, ces derniers seront rattachés à la section la plus proche géographiquement. Les sections sont sous l'autorité du vice-président chargé de la diaspora.`
        },
        {
          numero: '39',
          titre: 'Nomination d\'un président de la diaspora',
          contenu: `Le vice-président de la diaspora est nommé par le président du REPAE en exercice. Il est sous l'autorité du président exécutif élu par l'assemblée générale. Le vice-président de la diaspora est chargé du pilotage et de la supervision des sections. Il est l'interface entre les sections de la diaspora et le bureau exécutif.`
        },
        {
          numero: '40',
          titre: 'Comité de gestion',
          contenu: `Chaque section est gérée par un comité de gestion. Sous la responsabilité du vice-président chargé de la diaspora, le comité de gestion est l'organe chargé de faire vivre la section.\n\nComposition du comité de gestion :\n- Le/la secrétaire général(e) : référent(e) direct(e) de la section, assure la coordination des activités et des missions du comité de gestion.\n- Le/la secrétaire à l'organisation et aux affaires sociales : assure la planification, l'organisation et la mise en œuvre des activités de la section. Assure l'intégration des nouveaux membres.\n- Le/la trésorier(ère) : s'assure que chaque membre paye ses cotisations, recueille les cotisations. Fait un bilan trimestriel.\n- Les référents de promotions : désignés sur proposition du secrétaire général de section.`
        },
        {
          numero: '41',
          titre: 'Les référents de pays',
          contenu: `Dans les pays avec moins de 5 alumni un référent de pays est désigné par le vice-président de la diaspora. Ce référent est le point de contact officiel du REPAE.`
        },
        {
          numero: '42',
          titre: 'Cotisation de la diaspora',
          contenu: `Les sections cotisent 50% de la somme définie pour les membres résidant sur le territoire national. Ces cotisations sont collectées par les trésoriers locaux qui sont ensuite transférées à la trésorerie générale du REPAE.\n\nLes activités de la diaspora sont financées par les sections elles-mêmes, à l'aide des 50% restants. En cas de besoin elles peuvent lancer des cotisations exceptionnelles pour la réalisation d'activités spécifiques. Elles peuvent éventuellement bénéficier d'un soutien du bureau exécutif.`
        },
        {
          numero: '43',
          titre: 'Responsabilité des sections de la diaspora',
          contenu: `Les membres de la diaspora bénéficient des mêmes droits que les membres résidant sur le territoire national. Le bureau exécutif a le devoir de mettre à disposition des membres de la diaspora des moyens efficaces de participation aux assemblées générales du REPAE.\n\nLa diaspora du REPAE s'aligne sur les objectifs définis à l'article 3 du présent statut. Les membres de la diaspora sont les ambassadeurs du réseau à l'international.`
        }
      ]
    },
    {
      titre: 'Organisation financière',
      articles: [
        {
          numero: '44',
          titre: 'Produits ou recettes',
          contenu: `Les produits du réseau comprennent principalement :\n- Les cotisations des membres ;\n- Les dons et les legs mobiliers et immobiliers ;\n- Les produits résultants de l'activité du réseau ;\n- Et plus généralement, toutes autres recettes conformes aux finalités du réseau et non interdites par la loi, notamment les concours financiers, subventions, prêts.`
        },
        {
          numero: '45',
          titre: 'Charges ou dépenses',
          contenu: `Les charges comprennent notamment :\n- Les diverses prestations de services aux membres ;\n- Les dépenses nécessitées par l'activité du réseau ;\n- Et plus généralement, toutes autres dépenses conformes aux finalités du réseau et non interdites par la loi.`
        },
        {
          numero: '46',
          titre: 'Engagement des dépenses',
          contenu: `Les dépenses du réseau sont engagées par le président du bureau et payées par le trésorier général. Le responsable de la mise en paiement s'assure préalablement de la régularité des opérations et, notamment, de leur conformité avec les décisions des organes délibérants du réseau.`
        },
        {
          numero: '47',
          titre: 'Apports et transferts financiers',
          contenu: `Le réseau peut opérer des apports et des transferts financiers, au besoin, au profit d'un tiers, à condition que ce besoin soit reconnu comme tel par un comité d'expert mandaté à cet effet par le bureau et validé par le commissaire aux comptes.`
        },
        {
          numero: '48',
          titre: 'Commissaire aux comptes',
          contenu: `L'Assemblée Générale élit au moins un commissaire aux comptes titulaire et un commissaire aux comptes suppléant appelé à remplacer le titulaire en cas de refus, d'empêchement, de démission ou de décès. Le commissaire aux comptes est convoqué à toute assemblée générale.\n\nLe commissaire aux comptes :\n- Certifie le rapport établi par le bureau et présenté à l'assemblée générale, détaillant les sommes et avantages de toutes natures versées à chaque membre du bureau ;\n- Certifie les comptes consolidés et combinés établis par le bureau ;\n- Porte à la connaissance du bureau les contrôles et vérifications auxquels il a procédé ;\n- Signale dans son rapport annuel au bureau les irrégularités et inexactitudes éventuelles ;\n- Joint à son rapport annuel une annexe qui récapitule les concours financiers, subventions, prêts et aides de toute nature réalisés au bénéfice d'un tiers.`
        }
      ]
    },
    {
      titre: 'Dispositions diverses',
      articles: [
        {
          numero: '49',
          titre: 'Dissolution volontaire',
          contenu: `Sous réserve des cas de dissolution judiciaire prévus par la loi, la dissolution du réseau ne pourra être prononcée par l'assemblée générale que dans les conditions rendant valable les décisions de l'assemblée générale énoncée dans les statuts.`
        },
        {
          numero: '50',
          titre: 'Interprétation',
          contenu: `Les statuts, le règlement intérieur du réseau et le bulletin d'adhésion sont applicables par ordre de priorité décroissante.`
        },
        {
          numero: '51',
          titre: 'Médiation',
          contenu: `En cas de difficultés liées à l'application ou à l'interprétation des statuts et du règlement intérieur, le membre peut avoir recours au service de médiation. La composition et le fonctionnement du service médiation sont définis par le règlement intérieur.`
        },
        {
          numero: '52',
          titre: 'Contestations',
          contenu: `Les contestations liées à l'application ou l'interprétation des présents statuts et règlements, seront jugées conformément à la loi et soumises à la juridiction compétente.`
        },
        {
          numero: '53',
          titre: 'Gestion de l\'information',
          contenu: `Les informations recueillies par le réseau auprès de ses membres sont exclusivement utilisées dans le cadre de la gestion de l'association conformément à son objet. Les informations dans le cadre de la gestion pour compte sont exclusivement utilisées dans les conditions où elles auraient été si la gestion avait été effectuée directement par le mandant. Aucune information gérée ne peut faire l'objet d'une cession ou d'une mise à disposition de tiers à des fins commerciales.`
        }
      ]
    }
  ]
}

// Contenu du règlement intérieur du REPAE (extrait du document officiel)
export const reglementContenu: ContenuDocument = {
  preambule: `Le présent règlement intérieur complète et précise les statuts du REPAE. Il s'applique à tous les membres de l'association et détermine les conditions d'application des statuts adoptés par l'assemblée générale.`,
  sections: [
    {
      titre: 'Titre I : Modalités d\'adhésion – De maintien – De démission',
      articles: [
        {
          numero: '1',
          titre: 'Adhésion (complète les articles 7 à 9 des statuts)',
          contenu: `Les demandes d'adhésion sont transmises par écrit ou par mail au secrétariat de l'association qui examine la demande et vérifie les justificatifs produits par le postulant. Si les conditions statutaires sont remplies, il est délivré au postulant une carte de membre. L'ouverture des droits prend effet immédiatement après la validation de l'adhésion au réseau.`
        },
        {
          numero: '2',
          titre: 'Démission (complète l\'article 10 des statuts)',
          contenu: `La démission formulée en vertu de l'article 10 des statuts doit être expédiée par écrit ou par courrier électronique avec accusé de réception au secrétariat général du réseau.`
        }
      ]
    },
    {
      titre: 'Titre II : Administration du réseau',
      articles: [
        {
          numero: '3',
          titre: 'Tenue de l\'assemblée générale (complète l\'article 15 des statuts)',
          contenu: `3-1. Tenue de l'assemblée générale :\nL'assemblée générale doit se réunir au moins deux fois par an pour statuer sur les comptes de l'exercice qui s'achève à la date de cette assemblée générale. Chacun des points figurant à l'ordre du jour de l'assemblée générale fait l'objet d'une présentation par le bureau exécutif.\n\n3-2. Modalités de communication préalable des documents aux membres :\nLa convocation à l'assemblée générale est adressée par courrier électronique ou au travers de toute autre plateforme digitale aux membres du réseau. Les documents afférents à l'ordre du jour pourront être adressés aux membres par courrier électronique. Pour ce faire, le réseau doit avoir recueilli, au préalable, l'adresse électronique de chaque membre.`
        },
        {
          numero: '4',
          titre: 'Votes (complète l\'article 18 des statuts)',
          contenu: `Les décisions de l'assemblée générale sont votées par tout moyen défini par le bureau exécutif. L'organisation des élections est proposée par la commission en charge des statuts et des élections, au bureau exécutif, qui approuve le protocole électoral à mettre en place pour chacune des élections.`
        },
        {
          numero: '5',
          titre: 'Démission du bureau (complète l\'article 10 des statuts)',
          contenu: `La démission des membres du bureau exécutif se fait par lettre ou courrier électronique adressé au président du bureau exécutif. Elle prend effet à compter de la date de réception de la lettre par le réseau.`
        },
        {
          numero: '6',
          titre: 'Commissions supplémentaires (complète l\'article 36 des statuts)',
          contenu: `Outre les commissions prévues à l'article 36 des statuts, il peut être institué par le bureau exécutif d'autres commissions ou groupes de travail temporaires auxquels le bureau exécutif peut confier des missions spécifiques.`
        },
        {
          numero: '7',
          titre: 'Rapporteurs (complète l\'article 18 des statuts)',
          contenu: `Le bureau désigne les rapporteurs chargés de présenter le rapport sur chaque question figurant à l'ordre du jour et devant être soumise à l'assemblée générale. Aucun rapport ne peut être présenté à l'assemblée générale sans avoir été au préalable soumis au bureau exécutif.`
        },
        {
          numero: '8',
          titre: 'Situation du réseau (complète l\'article 30 des statuts)',
          contenu: `À chaque réunion du bureau, le secrétaire général présente la situation et l'évolution des effectifs du réseau. Le trésorier général présente un compte rendu de la situation financière.`
        },
        {
          numero: '9',
          titre: 'Démission du président (complète les articles 10, 15, et 24 des statuts)',
          contenu: `La démission du président(e) du REPAE se fait par lettre ou par courrier électronique adressé au secrétaire général qui en donne communication au vice-président du réseau. Cette décision prend effet lors de la prochaine assemblée générale du réseau convoquée dans les conditions définies à l'article 15 des statuts, qui prend acte de cette démission. Une nouvelle élection est organisée. Conformément à l'article 24 du présent statut, les fonctions de président sont assumées par les vice-présidents pendant la durée de la transition.`
        }
      ]
    },
    {
      titre: 'Titre III : Contrôle du réseau',
      articles: [
        {
          numero: '10',
          titre: 'Procès-verbaux (complète l\'article 15 des statuts)',
          contenu: `Les procès-verbaux de l'assemblée générale du réseau sont tenus à la disposition des membres du réseau qui peuvent en prendre connaissance et copie auprès du bureau exécutif.`
        },
        {
          numero: '11',
          titre: 'Médiation (complète l\'article 51 des statuts)',
          contenu: `Le bureau exécutif désigne un médiateur et définit les règles de fonctionnement du service « Médiation ». Les demandes de médiation doivent lui être adressées accompagnées des pièces du dossier de service médiation.`
        },
        {
          numero: '12',
          titre: 'Redynamisation du réseau',
          contenu: `En l'absence d'un bureau sur au moins un exercice annuel, un comité de redynamisation du réseau peut se mettre en place par la volonté des membres du réseau. Ce comité devra obligatoirement être composé d'au moins un (1) et au plus deux (2) membres de chaque promotion du réseau.\n\nEn souscrivant à la mission et aux objectifs du comité, ses membres acceptent de mener leurs actions de manière bénévole. Le comité de redynamisation a pour rôle de faire renaître les instances dirigeantes du réseau, de rassembler les membres et d'impulser un nouveau souffle de vie au réseau. Il engage des actions de redynamisation dans le respect des textes du réseau. Il n'engage aucune action décisionnaire mais a le pouvoir de convoquer de manière extraordinaire une AG dans le respect des règlements et statuts du réseau.`
        }
      ]
    },
    {
      titre: 'Titre IV : Frais de déplacement et communication',
      articles: [
        {
          numero: '13',
          titre: 'Remboursements',
          contenu: `Les déplacements effectués par les membres du bureau, dans le cadre de leur mandat, donnent droit à remboursement sur la base des frais réels sur justificatifs et dans la limite des plafonds fixés annuellement par le bureau exécutif.\n\nLe remboursement des frais de déplacements faits à l'aide d'un véhicule motorisé est calculé selon les montants retenus par l'association et sur justificatifs. En cas d'urgence ou en raison de l'importance de la distance, les membres peuvent être autorisés par le président du bureau à emprunter un véhicule express (taxi compteur, …).\n\nPour les frais de séjour (nuit et repas), les membres sont aussi remboursés aux frais réels sur justificatifs et dans la limite des plafonds fixés annuellement par le bureau.`
        },
        {
          numero: '14',
          titre: 'Communication (complète l\'article 45 des statuts)',
          contenu: `Les communications effectuées par les membres du bureau, dans le cadre de leur mandat, donnent droit à remboursement sur la base des frais réels sur justificatifs et dans la limite des plafonds fixés annuellement par le bureau exécutif.\n\nLe remboursement des frais de communications faites à l'aide de crédit téléphonique est calculé selon les montants retenus par l'association et sur justificatifs. En cas d'urgence ou en raison de l'importance de la communication qui doit être faite, les membres peuvent être autorisés par le président du bureau à emprunter des ressources de la caisse.\n\nPour les frais de communication (appels et SMS), les membres sont aussi remboursés aux frais réels sur justificatifs et dans la limite des plafonds fixés annuellement par le bureau si ces communications sont effectuées dans le cadre des activités du réseau.`
        }
      ]
    }
  ]
}
