/* ==========================================================================
   DONNÉES DU PORTFOLIO
   C'est le SEUL fichier à modifier pour mettre à jour le site.
   - PROFIL : tes coordonnées et liens (remplace les valeurs « À COMPLÉTER »)
   - COMPETENCES : tes compétences (ajuste-les au programme réel du CNAM)
   - PARCOURS : les étapes de la frise
   - PROJETS : un objet par projet (voir le modèle tout en bas)
   ========================================================================== */

const PROFIL = {
  prenom: "Fatima",
  nomComplet: "Fatima-Zohra Tahiri",
  titre: "Technicienne informatique en formation au CNAM",
  accroche:
    "Après un Mastère en communication, je me réoriente vers l’informatique. Je cherche un stage pour mettre les mains dans le support, les systèmes et le développement web.",
  stage: "Disponible pour un stage", // ex. « Stage de 8 semaines à partir d’avril 2027 »
  email: "",        // À COMPLÉTER, ex. "fatima.tahiri@email.fr"
  linkedin: "",     // À COMPLÉTER, ex. "https://www.linkedin.com/in/..."
  github: "",       // À COMPLÉTER, ex. "https://github.com/..."
  cv: "",           // À COMPLÉTER, ex. "assets/cv-fatima-tahiri.pdf" (dépose le PDF dans assets/)
};

const COMPETENCES = {
  informatique: {
    titre: "Ce que j’apprends au CNAM",
    note: "En cours d’acquisition",
    items: [
      // À AJUSTER selon les UE que tu suis réellement
      "Support utilisateurs et diagnostic de pannes",
      "Installation et configuration de postes",
      "Systèmes Windows et Linux",
      "Bases des réseaux (TCP/IP, adressage)",
      "HTML, CSS et JavaScript",
      "Git et GitHub",
    ],
  },
  transferables: {
    titre: "Ce que j’apporte de la communication",
    note: "Acquis en Mastère et en mission",
    items: [
      "Création et mise en ligne d’un site WordPress",
      "Emailing avec Brevo et suivi des statistiques",
      "Design graphique et respect d’une charte",
      "Vidéo, montage et live sur Twitch",
      "Accessibilité des contenus",
      "Gestion de projet et travail en équipe",
    ],
  },
};

const PARCOURS = [
  // Du plus ancien au plus récent. branche : "com" ou "info"
  { branche: "com",  titre: "Mastère en communication", detail: "Agence fictive Stepside, vidéos, émission Twitch, plusieurs prix aux PPA Awards." },
  { branche: "com",  titre: "Missions pour la filière cuir", detail: "Site WordPress, newsletters, infographies et Salon Made in France pour des fédérations." },
  { branche: "com",  titre: "Mémoire de fin d’études", detail: "Le métavers comme espace virtuel immersif : intentions des concepteurs et usages réels." },
  { branche: "info", titre: "Réorientation au CNAM", detail: "Formation de technicienne informatique.", depart: true },
  { branche: "info", titre: "Premiers projets web", detail: "Ce portfolio, codé à la main et déployé en ligne." },
  { branche: "info", titre: "Stage en entreprise", detail: "En recherche : c’est peut-être chez vous.", courant: true },
];

/* --------------------------------------------------------------------------
   CATÉGORIES de projets (onglets de filtre).
   La clé sert dans chaque projet (champ « categorie »).
   -------------------------------------------------------------------------- */
const CATEGORIES = {
  dev:    "Développement web",
  web:    "Web et emailing",
  design: "Design graphique",
  video:  "Vidéo et live",
  projet: "Projets et recherche",
};

const PROJETS = [
  /* ====================== DÉVELOPPEMENT WEB ====================== */
  {
    id: "portfolio",
    titre: "Ce portfolio",
    categorie: "dev",
    annee: "2026",
    contexte: "Projet personnel",
    resume: "Mon site portfolio, écrit en HTML, CSS et JavaScript sans framework, versionné sur GitHub et déployé sur Netlify.",
    description:
      "J’ai transformé mon book de communication en site web. Les projets sont décrits dans un seul fichier de données : le site génère les cartes, les filtres et les fiches détaillées à partir de ce fichier. Il s’adapte aux mobiles, gère le mode sombre et reste navigable au clavier.",
    apprentissages:
      "Structurer une page en HTML sémantique, organiser du CSS avec des variables, manipuler le DOM en JavaScript, utiliser Git et publier un site statique.",
    tags: ["HTML", "CSS", "JavaScript", "Git", "Netlify"],
    image: "", // ajoute une capture d’écran, ex. "assets/img/projets/portfolio.jpg"
    galerie: [],
    liens: [
      // { label: "Code sur GitHub", url: "https://github.com/..." },
      // { label: "Voir le site", url: "https://....netlify.app" },
    ],
  },

  /* ====================== WEB ET EMAILING ====================== */
  {
    id: "site-wordpress",
    titre: "Site internet et espace adhérent",
    categorie: "web",
    contexte: "Fédérations de la filière cuir",
    resume: "Création d’un site WordPress, de la structuration des contenus à la mise en ligne.",
    description:
      "Création d’un site web sous WordPress, de l’arborescence à la mise en ligne, avec un soin particulier porté à l’identité visuelle et à l’accessibilité. J’ai aussi créé un espace adhérent qui met à disposition des contenus exclusifs.",
    apprentissages: "Arborescence d’un site, gestion de contenus dans un CMS, espace à accès restreint, accessibilité.",
    tags: ["WordPress", "Accessibilité", "Espace membre"],
    image: "assets/img/projets/page-06.jpg",
    galerie: [],
  },
  {
    id: "newsletter",
    titre: "Newsletters avec Brevo",
    categorie: "web",
    contexte: "FEC et FCJT",
    resume: "Conception, rédaction et envoi de newsletters, avec suivi des statistiques.",
    description:
      "Conception, rédaction et envoi de newsletters pour la FEC et la FCJT via Brevo, avec une mise en page dynamique et des contenus adaptés aux adhérents. Les campagnes ont obtenu de très bons taux d’ouverture et d’engagement.",
    apprentissages: "Outil d’emailing, segmentation, lecture des indicateurs (ouverture, clics) pour améliorer les envois suivants.",
    tags: ["Brevo", "Emailing", "Statistiques"],
    image: "assets/img/projets/page-09.jpg",
    galerie: [],
  },

  /* ====================== DESIGN GRAPHIQUE ====================== */
  {
    id: "refashion",
    titre: "Campagne CNC × Refashion",
    categorie: "design",
    contexte: "Campagne réseaux sociaux",
    resume: "Une campagne qui personnifie les vêtements pour encourager le don.",
    description:
      "La campagne jouait avec les codes de la mode pour montrer que chaque vêtement a une histoire. En les personnifiant, elle rappelle qu’en les donnant, on prolonge leur histoire au lieu d’y mettre fin. Déclinaisons LinkedIn, Instagram et story.",
    tags: ["Direction artistique", "Réseaux sociaux", "Déclinaisons"],
    image: "assets/img/projets/page-05.jpg",
    galerie: [],
  },
  {
    id: "infographie",
    titre: "Infographies",
    categorie: "design",
    contexte: "Fédérations de la filière cuir",
    resume: "Mettre en valeur les chiffres clés des fédérations de façon claire et accessible.",
    description:
      "Conception d’infographies pour rendre lisibles les chiffres des fédérations (exportations, nombre d’entreprises…), avec une attention particulière portée à la cohérence visuelle et à l’accessibilité.",
    apprentissages: "Visualisation de données : choisir la bonne forme pour chaque chiffre et hiérarchiser l’information.",
    tags: ["Data visualisation", "Accessibilité"],
    image: "assets/img/projets/page-07.jpg",
    galerie: [],
  },
  {
    id: "supports",
    titre: "Refonte des supports de communication",
    categorie: "design",
    contexte: "Fédérations de la filière cuir",
    resume: "Modernisation et harmonisation des supports print et digitaux.",
    description:
      "Refonte visuelle de supports print et digitaux pour leur donner une esthétique plus moderne, cohérente et impactante : travail sur la hiérarchie visuelle, alignement avec la charte graphique et harmonisation des gabarits.",
    tags: ["Charte graphique", "Gabarits", "Print"],
    image: "assets/img/projets/page-08.jpg",
    galerie: [],
  },

  /* ====================== VIDÉO ET LIVE ====================== */
  {
    id: "twitch",
    titre: "Émission en direct sur Twitch",
    categorie: "video",
    contexte: "Mastère, émission K-talk",
    resume: "Préparer et animer une émission en direct, de A à Z.",
    description:
      "Choix des sujets, conducteur, gestion du direct, animation à plusieurs, lecture et interaction avec le tchat, et stratégies pour attirer et fidéliser les viewers.",
    apprentissages: "Gérer un flux en direct et ses imprévus techniques, interagir en temps réel avec une audience.",
    tags: ["Twitch", "Live", "Streaming"],
    image: "assets/img/projets/page-16.jpg",
    galerie: [],
  },
  {
    id: "reel",
    titre: "Format reel / short",
    categorie: "video",
    contexte: "Mastère, prix de la meilleure vidéo",
    resume: "Une vidéo courte sur le gaspillage alimentaire, primée.",
    description:
      "Vidéo courte évaluée sur l’accroche de la première phrase, la pertinence des plans, le montage et le plan final. Elle a remporté la 1re place du classement de la meilleure vidéo.",
    apprentissages: "Construire un storytelling visuel clair, travailler le rythme et adapter le ton au format.",
    tags: ["Montage", "Storytelling", "Format vertical"],
    image: "assets/img/projets/page-13.jpg",
    galerie: [],
  },
  {
    id: "chronique",
    titre: "Chronique vidéo",
    categorie: "video",
    contexte: "Mastère",
    resume: "Une chronique filmée en pleine rue, inspirée des journaux télévisés.",
    description: "Une chronique sur la politique zéro covid en Chine, tournée dans la rue au format JT.",
    apprentissages: "Expression orale, mémorisation de texte, aisance face à la caméra et dans l’espace public.",
    tags: ["Tournage", "Prise de parole"],
    image: "assets/img/projets/page-14.jpg",
    galerie: [],
  },
  {
    id: "parodie",
    titre: "Parodie musicale",
    categorie: "video",
    contexte: "Mastère, prix de la meilleure parodie",
    resume: "Un clip détourné pour dénoncer les phrases misogynes avec humour.",
    description:
      "Détournement d’un clip de rap pour retourner, avec humour et ironie, des phrases misogynes contre ceux qui les prononcent. 1re place du classement de la meilleure parodie, avec les félicitations du jury.",
    apprentissages: "Utiliser l’humour comme outil de dénonciation et écrire un message engagé qui reste accessible.",
    tags: ["Clip", "Écriture", "Mise en scène"],
    image: "assets/img/projets/page-15.jpg",
    galerie: [],
  },

  /* ====================== PROJETS ET RECHERCHE ====================== */
  {
    id: "salon-made-in-france",
    titre: "Salon Made in France",
    categorie: "projet",
    contexte: "Filière cuir, salon de 4 jours",
    resume: "Visuels, kit de communication, ateliers sur le stand et vidéo en stop motion.",
    description:
      "Réalisation des visuels du salon (posts et stories Instagram, kit de communication), organisation d’un jeu concours, ateliers de démonstration de professionnels, atelier sensoriel autour des peausseries, et vidéo en stop motion pour illustrer l’atelier de création de porte-clés en cuir.",
    tags: ["Événementiel", "Stop motion", "Réseaux sociaux"],
    image: "assets/img/projets/page-02.jpg",
    galerie: ["assets/img/projets/page-02.jpg", "assets/img/projets/page-03.jpg", "assets/img/projets/page-04.jpg"],
  },
  {
    id: "stepside",
    titre: "Agence Stepside",
    categorie: "projet",
    contexte: "4e année de Mastère, directrice artistique",
    resume: "Créer et piloter une agence de communication fictive dédiée au sport et à l’esport.",
    description:
      "Agence 360° accompagnant marques, clubs, fédérations et organisateurs d’événements sportifs et esport. J’en étais la directrice artistique : identité visuelle, site, plaquette commerciale, publicité avec storyboard et journée bien-être organisée avec des prestataires.",
    apprentissages: "Piloter un projet en équipe de bout en bout. Prix : 3e meilleure identité visuelle, 1re place de la meilleure publicité avec félicitations du jury.",
    tags: ["Direction artistique", "Identité visuelle", "Gestion de projet"],
    image: "assets/img/projets/page-10.jpg",
    galerie: ["assets/img/projets/page-10.jpg", "assets/img/projets/page-11.jpg", "assets/img/projets/page-12.jpg"],
  },
  {
    id: "metavers",
    titre: "Mémoire : le métavers",
    categorie: "projet",
    contexte: "Mémoire de fin d’études",
    resume: "Le métavers propose-t-il une solution alternative à la réalité ou un refuge ?",
    description:
      "Le mémoire étudie le métavers comme espace virtuel immersif, à partir de deux hypothèses : les concepteurs imaginent une expérience alternative à la réalité, tandis que certains utilisateurs la vivent comme un palliatif à leur quotidien. Entretiens avec des spécialistes, dont un développeur et une joueuse de VRChat.",
    apprentissages: "Mieux comprendre le numérique et ses usages, et développer mon esprit critique : c’est ce sujet qui m’a menée vers l’informatique.",
    tags: ["Recherche", "Réalité virtuelle", "Entretiens"],
    image: "assets/img/projets/page-18.jpg",
    galerie: [],
  },
  {
    id: "ambassadrice",
    titre: "Ambassadrice française Miraculous",
    categorie: "projet",
    contexte: "Mission bénévole",
    resume: "Représenter une licence auprès du public français et créer des contenus pour la communauté.",
    description:
      "Création visuelle, invitations à des avant-premières et partenariat presse avec Japan Expo, au service de la communauté française.",
    apprentissages: "Communication digitale, gestion d’image et animation de communauté.",
    tags: ["Communauté", "Réseaux sociaux"],
    image: "assets/img/projets/page-19.jpg",
    galerie: [],
  },
  {
    id: "mauresque",
    titre: "Paris c’est mauresque !",
    categorie: "design",
    contexte: "Concours photo, 3e place",
    resume: "Un travail photographique autour de la Grande Mosquée de Paris.",
    description: "Exploration du lien entre architecture et culture autour de la Mosquée de Paris. Le jury m’a attribué la 3e place du concours.",
    tags: ["Photographie", "Concours"],
    image: "assets/img/projets/page-17.jpg",
    galerie: [],
  },

  /* ==========================================================================
     MODÈLE POUR AJOUTER UN PROJET
     Copie ce bloc au-dessus de « DÉVELOPPEMENT WEB », retire les « // » et remplis.
     Les champs facultatifs peuvent rester vides.
     --------------------------------------------------------------------------
  {
    id: "nom-court-sans-espace",
    titre: "Nom du projet",
    categorie: "dev",              // dev, web, design, video ou projet
    annee: "2026",
    contexte: "Projet CNAM / perso / stage",
    resume: "Une phrase qui donne envie de cliquer.",
    description: "Ce que fait le projet et comment tu l’as construit.",
    apprentissages: "Ce que tu as appris ou résolu.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "assets/img/projets/mon-projet.jpg",
    galerie: [],
    liens: [
      { label: "Code sur GitHub", url: "https://github.com/..." },
      { label: "Voir le site", url: "https://..." },
    ],
  },
  ========================================================================== */
];
