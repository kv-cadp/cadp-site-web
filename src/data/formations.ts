import type { Formation } from "@/types/formation";

export const formations: Formation[] = [
  // ============================================================
  // BTS MCO — Management Commercial Opérationnel
  // ============================================================
  {
    slug: "bts-mco",
    code: "MCO",
    fullName: "BTS Management Commercial Opérationnel",
    shortName: "BTS MCO",
    heroTitle: "Pilote une unité commerciale. Pour de vrai.",
    heroSubtitle:
      "Le BTS MCO te forme au management d'équipe, à la gestion commerciale et à l'animation de point de vente. En alternance, tu apprends sur le terrain dès le premier jour.",
    shortDescription:
      "Manage une équipe, anime un point de vente, développe ton sens commercial. Le BTS MCO t'ouvre les portes du retail, de l'e-commerce et du management.",
    duration: "2 ans",
    level: "Bac+2 — Niveau 5",
    rncp: "RNCP38362",
    rhythm: {
      schoolDays: 2,
      companyDays: 3,
      weekLong: [0, 1, 2], // lun-mar-mer (semaine A)
      weekShort: [0, 1], // lun-mar (semaine B)
      description:
        "Le rythme alterne entre semaines longues et courtes au campus : une semaine sur deux, tu es au campus le lundi, mardi et mercredi (3 jours) ; l'autre semaine, uniquement le lundi et mardi (2 jours). Le reste du temps, tu es en entreprise.",
    },
    competenceBlocks: [
      {
        title: "Développer la relation client et assurer la vente conseil",
        competences: [
          "Collecter, analyser et exploiter l'information commerciale",
          "Vendre dans un contexte omnicanal",
          "Entretenir la relation client",
          "Fidéliser la clientèle",
        ],
      },
      {
        title: "Animer et dynamiser l'offre commerciale",
        competences: [
          "Élaborer et adapter en continu l'offre de produits et de services",
          "Organiser l'espace commercial",
          "Développer les performances de l'espace commercial",
          "Concevoir et mettre en place la communication commerciale",
        ],
      },
      {
        title: "Assurer la gestion opérationnelle",
        competences: [
          "Gérer les opérations courantes",
          "Prévoir et budgétiser l'activité",
          "Analyser les performances",
        ],
      },
      {
        title: "Manager l'équipe commerciale",
        competences: [
          "Organiser le travail de l'équipe commerciale",
          "Recruter des collaborateurs",
          "Animer l'équipe commerciale",
          "Évaluer les performances de l'équipe",
        ],
      },
    ],
    program: [
      {
        title: "Année 1 — Les fondamentaux",
        modules: [
          { name: "Développement de la relation client et vente conseil" },
          { name: "Animation et dynamisation de l'offre commerciale" },
          { name: "Culture générale et expression" },
          { name: "Langue vivante étrangère (anglais)" },
          { name: "Culture économique, juridique et managériale" },
          { name: "Entrepreneuriat et management de projet" },
        ],
      },
      {
        title: "Année 2 — L'approfondissement",
        modules: [
          { name: "Gestion opérationnelle" },
          { name: "Management de l'équipe commerciale" },
          { name: "Culture économique, juridique et managériale appliquée" },
          { name: "Développement commercial digital" },
          { name: "Préparation à l'examen et dossiers professionnels" },
        ],
      },
    ],
    careers: [
      {
        title: "Responsable de magasin",
        description: "Tu gères un point de vente de A à Z : équipe, stock, chiffre d'affaires, merchandising.",
        salary: "25 000 - 35 000 € brut/an",
      },
      {
        title: "Chef de rayon",
        description: "Tu animes et développes ton rayon en grande distribution ou magasin spécialisé.",
        salary: "23 000 - 30 000 € brut/an",
      },
      {
        title: "Chargé(e) de clientèle",
        description: "Tu accompagnes les clients dans leurs projets et développes un portefeuille fidèle.",
        salary: "22 000 - 28 000 € brut/an",
      },
      {
        title: "Manager e-commerce",
        description: "Tu pilotes la stratégie de vente en ligne : catalogue, promotions, expérience client.",
        salary: "26 000 - 38 000 € brut/an",
      },
      {
        title: "Assistant(e) commercial(e)",
        description: "Tu soutiens l'équipe commerciale dans la gestion des commandes et la relation client.",
        salary: "22 000 - 26 000 € brut/an",
      },
    ],
    furtherStudies: [
      "Licence professionnelle Commerce, Distribution, Management",
      "Bachelor Responsable de développement commercial",
      "Licence professionnelle Management des activités commerciales",
      "École de commerce (admissions parallèles)",
      "Licence 3 Gestion / Management (sous conditions)",
    ],
    prerequisites: [
      "Baccalauréat général (toutes spécialités)",
      "Baccalauréat technologique STMG (spécialité Mercatique recommandée)",
      "Baccalauréat professionnel Commerce / Vente / Accueil",
      "Réorientation post-bac / reconversion professionnelle",
    ],
    faq: [
      {
        question: "Quel est le salaire en alternance en BTS MCO ?",
        answer:
          "La rémunération dépend de ton âge et de l'année de contrat. Un alternant de 18-20 ans perçoit 783,90€ brut par mois en première année (43% du SMIC) et 929,75€ brut en deuxième année (51% du SMIC). Pour les moins de 26 ans rémunérés sous le seuil de 50% du SMIC, le net est très proche du brut grâce à l'exonération de cotisations salariales.",
      },
      {
        question: "Quels métiers après un BTS MCO ?",
        answer:
          "Le BTS MCO ouvre les portes du management commercial : responsable de magasin, chef de rayon, chargé de clientèle, manager e-commerce ou assistant commercial. Avec de l'expérience, tu peux évoluer vers des postes de directeur de point de vente ou responsable régional.",
      },
      {
        question: "Peut-on poursuivre ses études après un BTS MCO ?",
        answer:
          "Oui. Tu peux intégrer une licence professionnelle commerce ou management, un Bachelor en école de commerce, ou préparer un titre professionnel de niveau Bac+3. Certains diplômés choisissent aussi un Master en management ou marketing.",
      },
      {
        question: "Le BTS MCO est-il difficile ?",
        answer:
          "Le BTS MCO demande de la régularité et de l'organisation, surtout en alternance. Au CADP, les promos de 12 étudiants permettent un accompagnement personnalisé. Tu n'es jamais seul face à tes difficultés, et l'alternance rend la formation concrète et motivante.",
      },
      {
        question: "Comment trouver une entreprise pour l'alternance en BTS MCO ?",
        answer:
          "Au CADP, on t'accompagne activement. On organise des Alternance Dating pour te mettre en contact direct avec nos 50+ entreprises partenaires. On t'aide aussi à rédiger ton CV, ta lettre de motivation et à préparer tes entretiens.",
      },
      {
        question: "Quelle est la différence entre le BTS MCO et le BTS NDRC ?",
        answer:
          "Le BTS MCO forme au management d'une unité commerciale (magasin, rayon, e-commerce). Le BTS NDRC est orienté vers la prospection, la négociation et la vente en B2B ou B2C. Si tu veux manager un point de vente, c'est le MCO. Si tu veux prospecter et négocier, c'est le NDRC.",
      },
      {
        question: "Quel est le rythme de l'alternance en BTS MCO au CADP ?",
        answer:
          "Au CADP, le rythme est de 2 jours en formation (lundi-mardi) et 3 jours en entreprise (mercredi à vendredi). Ce format te permet de travailler majoritairement en entreprise tout en suivant un programme structuré au campus.",
      },
      {
        question: "Quelles entreprises recrutent des alternants en BTS MCO ?",
        answer:
          "Les grandes surfaces, enseignes de retail, magasins spécialisés, agences bancaires, concessions automobiles et sites e-commerce recherchent activement des alternants MCO. Au CADP, nos partenaires couvrent la Drôme, l'Ardèche, le Vaucluse et le Gard.",
      },
      {
        question: "Quel est le taux de réussite du BTS MCO au CADP ?",
        answer:
          "Le CADP a été créé en 2024 et les premières promotions passent l'examen à l'été 2026. Les résultats ne sont pas encore disponibles. Cependant, l'accompagnement individualisé en petites promos de 12 étudiants est conçu pour maximiser tes chances de réussite.",
      },
      {
        question: "Comment s'inscrire au BTS MCO au CADP ?",
        answer:
          "L'inscription se fait en plusieurs étapes : tu remplis le formulaire de candidature sur notre site, tu passes un entretien de motivation, puis on t'accompagne dans la recherche d'entreprise. Les inscriptions sont ouvertes toute l'année, mais les places sont limitées à 12 par promo.",
      },
      {
        question: "Le BTS MCO est-il reconnu par l'État ?",
        answer:
          "Oui. Le BTS MCO est un diplôme national de l'Éducation nationale, inscrit au RNCP (niveau 5). Au CADP, tu prépares ce diplôme dans le cadre du CFA IFIR, certifié Qualiopi, ce qui garantit la qualité de ta formation.",
      },
      {
        question: "Quels sont les prérequis pour intégrer le BTS MCO ?",
        answer:
          "Tu peux intégrer le BTS MCO avec un baccalauréat général (toutes spécialités), un bac STMG (spécialité Mercatique recommandée), un bac professionnel Commerce, Vente ou Accueil. Les candidats en réorientation ou reconversion sont aussi les bienvenus.",
      },
    ],
    testimonial: {
      name: "Lucas M.",
      formation: "BTS MCO",
      year: "Promo 2024-2026",
      quote:
        "Ce qui change tout ici, c'est la taille des promos. Les formateurs te connaissent, ils s'adaptent. En entreprise, j'ai pu être autonome très vite grâce à ce qu'on voit en cours.",
    },
    metaTitle: "BTS MCO en alternance à Pierrelatte",
    metaDescription:
      "Prépare ton BTS MCO en alternance au CADP à Pierrelatte. Promos de 12 étudiants, accompagnement individualisé, 50+ entreprises partenaires. Inscris-toi !",
  },

  // ============================================================
  // BTS NDRC — Négociation et Digitalisation de la Relation Client
  // ============================================================
  {
    slug: "bts-ndrc",
    code: "NDRC",
    fullName: "BTS Négociation et Digitalisation de la Relation Client",
    shortName: "BTS NDRC",
    heroTitle: "Négocie, convaincs, signe. C'est ton terrain de jeu.",
    heroSubtitle:
      "Le BTS NDRC te forme à la prospection, la négociation commerciale et la relation client digitale. Tu deviens l'expert qui transforme un contact en client fidèle.",
    shortDescription:
      "Prospecte, négocie, digitalise la relation client. Le BTS NDRC fait de toi un commercial nouvelle génération, aussi à l'aise en face-à-face que derrière un écran.",
    duration: "2 ans",
    level: "Bac+2 — Niveau 5",
    rncp: "RNCP38368",
    rhythm: {
      schoolDays: 2,
      companyDays: 3,
      weekLong: [2, 3, 4], // mer-jeu-ven (semaine A)
      weekShort: [3, 4], // jeu-ven (semaine B)
      description:
        "Le rythme alterne entre semaines longues et courtes au campus : une semaine sur deux, tu es au campus le mercredi, jeudi et vendredi (3 jours) ; l'autre semaine, uniquement le jeudi et vendredi (2 jours). Le reste du temps, tu es en entreprise pour prospecter, négocier et développer ton portefeuille client.",
    },
    competenceBlocks: [
      {
        title: "Relation client et négociation-vente",
        competences: [
          "Cibler et prospecter la clientèle",
          "Négocier et accompagner la relation client",
          "Organiser et animer un événement commercial",
          "Exploiter et mutualiser l'information commerciale",
        ],
      },
      {
        title: "Relation client à distance et digitalisation",
        competences: [
          "Maîtriser la relation client omnicanale",
          "Animer la relation client digitale",
          "Développer la relation client en e-commerce",
        ],
      },
      {
        title: "Relation client et animation de réseaux",
        competences: [
          "Implanter et promouvoir l'offre chez des distributeurs",
          "Développer et animer un réseau de partenaires",
          "Créer et animer un réseau de vente directe",
        ],
      },
    ],
    program: [
      {
        title: "Année 1 — Les fondamentaux",
        modules: [
          { name: "Relation client et négociation-vente" },
          { name: "Relation client à distance et digitalisation" },
          { name: "Culture générale et expression" },
          { name: "Langue vivante étrangère (anglais)" },
          { name: "Culture économique, juridique et managériale" },
          { name: "Atelier de professionnalisation" },
        ],
      },
      {
        title: "Année 2 — L'approfondissement",
        modules: [
          { name: "Relation client et animation de réseaux" },
          { name: "Négociation avancée et closing" },
          { name: "Culture économique, juridique et managériale appliquée" },
          { name: "Marketing digital et social selling" },
          { name: "Préparation à l'examen et dossiers professionnels" },
        ],
      },
    ],
    careers: [
      {
        title: "Business developer",
        description: "Tu prospectes de nouveaux marchés et développes le chiffre d'affaires de l'entreprise.",
        salary: "25 000 - 40 000 € brut/an",
      },
      {
        title: "Commercial(e) terrain",
        description: "Tu vas à la rencontre des clients, présentes les solutions et négocies les contrats.",
        salary: "23 000 - 35 000 € brut/an",
      },
      {
        title: "Chargé(e) d'affaires",
        description: "Tu gères un portefeuille de clients professionnels et construis des relations durables.",
        salary: "26 000 - 38 000 € brut/an",
      },
      {
        title: "Responsable e-commerce",
        description: "Tu pilotes la relation client en ligne, du premier clic à la fidélisation.",
        salary: "26 000 - 36 000 € brut/an",
      },
      {
        title: "Conseiller(ère) commercial(e)",
        description: "Tu accueilles, conseilles et orientes les clients vers les solutions adaptées à leurs besoins.",
        salary: "22 000 - 28 000 € brut/an",
      },
    ],
    furtherStudies: [
      "Licence professionnelle Commerce, Distribution",
      "Licence professionnelle E-commerce et marketing numérique",
      "Bachelor Responsable de développement commercial",
      "École de commerce (admissions parallèles)",
      "Licence 3 en Marketing / Communication commerciale",
    ],
    prerequisites: [
      "Baccalauréat général (toutes spécialités)",
      "Baccalauréat technologique STMG",
      "Baccalauréat professionnel Commerce / Vente / ARCU",
      "Réorientation post-bac / reconversion",
    ],
    faq: [
      {
        question: "Quel est le salaire en alternance en BTS NDRC ?",
        answer:
          "La rémunération dépend de ton âge et de l'année de contrat. Un alternant de 18-20 ans perçoit 783,90€ brut par mois en première année (43% du SMIC) et 929,75€ brut en deuxième année (51% du SMIC). Pour les moins de 26 ans rémunérés sous le seuil de 50% du SMIC, le net est très proche du brut grâce à l'exonération de cotisations salariales. Certains contrats prévoient des commissions sur les ventes, ce qui peut augmenter ta rémunération.",
      },
      {
        question: "Quels métiers après un BTS NDRC ?",
        answer:
          "Le BTS NDRC mène aux métiers de la vente et de la négociation : business developer, commercial terrain, chargé d'affaires, conseiller commercial ou responsable e-commerce. Avec de l'expérience, tu peux évoluer vers des postes de directeur commercial.",
      },
      {
        question: "Quelle est la différence entre BTS NDRC et BTS MCO ?",
        answer:
          "Le BTS NDRC est centré sur la prospection, la négociation et la digitalisation de la relation client. Le BTS MCO forme au management d'un point de vente. Si tu veux convaincre et vendre, c'est le NDRC. Si tu veux manager une équipe commerciale, c'est le MCO.",
      },
      {
        question: "Le BTS NDRC est-il fait pour moi ?",
        answer:
          "Si tu es à l'aise à l'oral, que tu aimes convaincre et que tu n'as pas peur d'aller vers les autres, le BTS NDRC est fait pour toi. La curiosité, le goût du challenge et l'aisance relationnelle sont des atouts majeurs dans cette formation.",
      },
      {
        question: "Comment trouver une entreprise pour l'alternance en BTS NDRC ?",
        answer:
          "Le CADP organise des Alternance Dating pour te connecter avec nos entreprises partenaires. On t'accompagne aussi avec des ateliers CV, du coaching entretien et la transmission directe de ton profil à notre réseau de 50+ entreprises.",
      },
      {
        question: "Quelles entreprises recrutent des alternants en BTS NDRC ?",
        answer:
          "Les agences immobilières, assurances, banques, entreprises de services B2B, startups et cabinets de conseil recherchent des profils NDRC. Au CADP, nos partenaires couvrent la Drôme, l'Ardèche, le Vaucluse et le Gard.",
      },
      {
        question: "Peut-on faire du BTS NDRC en e-commerce ?",
        answer:
          "Oui. Le BTS NDRC inclut un volet important de relation client à distance et de digitalisation. Tu apprends le social selling, le marketing digital et la gestion de la relation client en ligne, des compétences directement applicables en e-commerce.",
      },
      {
        question: "Quel est le rythme de l'alternance au CADP ?",
        answer:
          "Le rythme est de 2 jours au campus (lundi-mardi) et 3 jours en entreprise (mercredi à vendredi). Ce format te permet de négocier et vendre en conditions réelles tout en consolidant tes acquis en formation.",
      },
      {
        question: "Le BTS NDRC est-il reconnu par l'État ?",
        answer:
          "Oui, le BTS NDRC est un diplôme national inscrit au RNCP (niveau 5, Bac+2). Au CADP, tu le prépares via le CFA IFIR, certifié Qualiopi, ce qui atteste de la qualité de la formation.",
      },
      {
        question: "Comment s'inscrire au BTS NDRC au CADP ?",
        answer:
          "Candidature en ligne sur notre site, entretien de motivation, puis accompagnement dans ta recherche d'entreprise. Les inscriptions sont ouvertes toute l'année, mais les places sont limitées à 12 par promo pour garantir un suivi individualisé.",
      },
    ],
    testimonial: {
      name: "Inès R.",
      formation: "BTS NDRC",
      year: "Promo 2024-2026",
      quote:
        "J'avais peur de la prospection au début. Mais avec l'alternance, j'ai pris confiance semaine après semaine. Aujourd'hui je négocie des contrats en autonomie, et j'ai 20 ans.",
    },
    metaTitle: "BTS NDRC en alternance à Pierrelatte",
    metaDescription:
      "Prépare ton BTS NDRC en alternance au CADP à Pierrelatte. Négociation, vente, digital. Promos de 12 étudiants, 50+ entreprises partenaires.",
  },

  // ============================================================
  // BTS GPME — Gestion de la PME
  // ============================================================
  {
    slug: "bts-gpme",
    code: "GPME",
    fullName: "BTS Gestion de la PME",
    shortName: "BTS GPME",
    heroTitle: "Le bras droit dont chaque PME a besoin. C'est toi.",
    heroSubtitle:
      "Le BTS GPME te forme à la gestion administrative, commerciale et RH d'une petite ou moyenne entreprise. Tu deviens le couteau suisse indispensable au dirigeant.",
    shortDescription:
      "Gère, organise, administre. Le BTS GPME te rend indispensable dans une PME : compta, RH, communication, gestion de projet. Le poste polyvalent par excellence.",
    duration: "2 ans",
    level: "Bac+2 — Niveau 5",
    rncp: "RNCP38363",
    rhythm: {
      schoolDays: 2,
      companyDays: 3,
      weekLong: [0, 1, 2], // lun-mar-mer (semaine A)
      weekShort: [0, 1], // lun-mar (semaine B)
      description:
        "Le rythme alterne entre semaines longues et courtes au campus : une semaine sur deux, tu es au campus le lundi, mardi et mercredi (3 jours) ; l'autre semaine, uniquement le lundi et mardi (2 jours). Le reste du temps, tu es en entreprise pour mettre en pratique la gestion, la comptabilité et l'administration au quotidien d'une PME et tu apprends à gérer la diversité des missions.",
    },
    competenceBlocks: [
      {
        title: "Gérer la relation avec les clients et les fournisseurs de la PME",
        competences: [
          "Rechercher des clients par prospection ou suivi de la clientèle",
          "Traiter la demande du client",
          "Informer, conseiller, orienter et traiter les réclamations",
          "Rechercher et sélectionner les fournisseurs",
          "Passer les commandes d'achat et suivre l'exécution",
        ],
      },
      {
        title: "Participer à la gestion des risques de la PME",
        competences: [
          "Conduire une veille",
          "Accompagner la mise en place d'un travail en mode projet",
          "Identifier, évaluer les risques et proposer des actions correctives",
          "Évaluer et suivre les risques financiers",
        ],
      },
      {
        title: "Gérer le personnel et contribuer à la GRH de la PME",
        competences: [
          "Assurer le suivi administratif du personnel",
          "Préparer les éléments de la paie et communiquer sur ces éléments",
          "Organiser les élections des représentants du personnel",
          "Participer à la démarche qualité de vie au travail",
        ],
      },
      {
        title: "Soutenir le fonctionnement et le développement de la PME",
        competences: [
          "Représenter, analyser, améliorer le système d'information de la PME",
          "Améliorer les processus support et organiser et suivre les activités",
          "Participer au développement commercial national ou international",
          "Contribuer à la mise en œuvre de la communication",
        ],
      },
    ],
    program: [
      {
        title: "Année 1 — Les fondamentaux",
        modules: [
          { name: "Gérer la relation avec les clients et les fournisseurs" },
          { name: "Participer à la gestion des risques de la PME" },
          { name: "Culture générale et expression" },
          { name: "Langue vivante étrangère (anglais)" },
          { name: "Culture économique, juridique et managériale" },
          { name: "Outils numériques et gestion de projet" },
        ],
      },
      {
        title: "Année 2 — L'approfondissement",
        modules: [
          { name: "Gérer le personnel et contribuer à la GRH" },
          { name: "Soutenir le fonctionnement et le développement de la PME" },
          { name: "Culture économique, juridique et managériale appliquée" },
          { name: "Communication interne et externe" },
          { name: "Préparation à l'examen et dossiers professionnels" },
        ],
      },
    ],
    careers: [
      {
        title: "Assistant(e) de gestion PME",
        description: "Tu gères l'administratif, le commercial et les RH d'une PME au quotidien.",
        salary: "22 000 - 28 000 € brut/an",
      },
      {
        title: "Assistant(e) RH",
        description: "Tu contribues au recrutement, à la paie, aux congés et au suivi administratif du personnel.",
        salary: "23 000 - 30 000 € brut/an",
      },
      {
        title: "Office manager",
        description: "Tu coordonnes le fonctionnement du bureau : services généraux, accueil, organisation.",
        salary: "25 000 - 32 000 € brut/an",
      },
      {
        title: "Assistant(e) de direction",
        description: "Tu assistes le dirigeant dans l'organisation, la communication et le suivi des projets.",
        salary: "24 000 - 32 000 € brut/an",
      },
      {
        title: "Gestionnaire administratif(ve)",
        description: "Tu traites les dossiers administratifs, la facturation et le suivi comptable de l'entreprise.",
        salary: "22 000 - 27 000 € brut/an",
      },
    ],
    furtherStudies: [
      "Licence professionnelle Métiers de la GRH",
      "Licence professionnelle Management et gestion des organisations",
      "Bachelor Chargé de gestion et management",
      "DCG (Diplôme de Comptabilité et de Gestion) — passerelle",
      "Licence 3 Gestion / AES",
    ],
    prerequisites: [
      "Baccalauréat général (toutes spécialités)",
      "Baccalauréat technologique STMG (toutes spécialités)",
      "Baccalauréat professionnel Gestion-Administration / AGOrA",
      "Réorientation post-bac / reconversion",
    ],
    faq: [
      {
        question: "Quel est le salaire en alternance en BTS GPME ?",
        answer:
          "La rémunération dépend de ton âge et de l'année de contrat. Un alternant de 18-20 ans perçoit 783,90€ brut par mois en première année (43% du SMIC) et 929,75€ brut en deuxième année (51% du SMIC). Pour les moins de 26 ans rémunérés sous le seuil de 50% du SMIC, le net est très proche du brut grâce à l'exonération de cotisations salariales.",
      },
      {
        question: "Quels métiers après un BTS GPME ?",
        answer:
          "Le BTS GPME mène à des postes polyvalents en PME : assistant de gestion, assistant RH, office manager, assistant de direction ou gestionnaire administratif. Tu peux aussi poursuivre vers une licence pro RH, management ou comptabilité.",
      },
      {
        question: "Quelle est la différence entre BTS GPME et BTS CG ?",
        answer:
          "Le BTS GPME est polyvalent : gestion, RH, commercial, communication. Le BTS CG est spécialisé en comptabilité et finance. Si tu veux toucher à tout dans une PME, c'est le GPME. Si tu veux te concentrer sur les chiffres, c'est le CG.",
      },
      {
        question: "Le BTS GPME est-il difficile ?",
        answer:
          "Le BTS GPME est accessible si tu es organisé et polyvalent. Au CADP, les promos de 12 étudiants permettent un suivi personnalisé. Les formateurs s'assurent que chaque apprenant progresse à son rythme, avec un accompagnement concret.",
      },
      {
        question: "Comment trouver une entreprise pour l'alternance en BTS GPME ?",
        answer:
          "Au CADP, on t'accompagne avec des Alternance Dating, des ateliers CV et du coaching. Notre réseau de 50+ entreprises partenaires en Drôme, Ardèche, Vaucluse et Gard est activement sollicité pour placer nos candidats.",
      },
      {
        question: "Quelles entreprises recrutent des alternants en BTS GPME ?",
        answer:
          "Les PME de tous secteurs recherchent des profils GPME : artisanat, services, commerce, industrie, BTP, cabinets comptables, associations. La polyvalence du diplôme ouvre les portes de structures très variées.",
      },
      {
        question: "Le BTS GPME permet-il de travailler en RH ?",
        answer:
          "Oui. Le BTS GPME inclut un volet important de gestion du personnel : recrutement, paie, formation, droit du travail. C'est une excellente porte d'entrée vers les métiers RH, surtout en PME où le poste est souvent polyvalent.",
      },
      {
        question: "Quel est le rythme de l'alternance au CADP en BTS GPME ?",
        answer:
          "Le rythme est de 2 jours au campus (lundi-mardi) et 3 jours en entreprise (mercredi à vendredi). En PME, tu es rapidement impliqué dans toutes les missions de l'entreprise, ce qui accélère ta montée en compétences.",
      },
      {
        question: "Peut-on poursuivre ses études après un BTS GPME ?",
        answer:
          "Oui. Tu peux intégrer une licence professionnelle en management, RH, comptabilité ou administration. Des Bachelors en école de commerce sont aussi accessibles. Le BTS GPME offre une base solide pour un Bac+3.",
      },
      {
        question: "Comment s'inscrire au BTS GPME au CADP ?",
        answer:
          "Remplis le formulaire de candidature sur notre site, passe un entretien de motivation, et on t'accompagne dans la recherche d'entreprise. Places limitées à 12 par promo pour un accompagnement individualisé.",
      },
    ],
    testimonial: {
      name: "Chloé D.",
      formation: "BTS GPME",
      year: "Promo 2024-2026",
      quote:
        "En PME, chaque journée est différente. Un jour je fais de la compta, le lendemain je gère un recrutement. Le GPME m'a donné cette polyvalence, et au CADP on est vraiment accompagné.",
    },
    metaTitle: "BTS GPME en alternance à Pierrelatte",
    metaDescription:
      "Prépare ton BTS GPME en alternance au CADP à Pierrelatte. Gestion, RH, administratif. Promos de 12 étudiants, 50+ entreprises partenaires.",
  },

  // ============================================================
  // BTS CG — Comptabilité et Gestion
  // ============================================================
  {
    slug: "bts-cg",
    code: "CG",
    fullName: "BTS Comptabilité et Gestion",
    shortName: "BTS CG",
    heroTitle: "Les chiffres parlent. Toi, tu les fais parler.",
    heroSubtitle:
      "Le BTS CG te forme à la comptabilité, la fiscalité et la gestion financière. Tu deviens le pilier qui permet à l'entreprise de prendre les bonnes décisions.",
    shortDescription:
      "Comptabilité, fiscalité, paie, gestion financière. Le BTS CG te donne les clés pour maîtriser les chiffres et piloter la performance d'une entreprise.",
    duration: "2 ans",
    level: "Bac+2 — Niveau 5",
    rncp: "RNCP39159",
    rhythm: {
      schoolDays: 2,
      companyDays: 3,
      weekLong: [2, 3, 4], // mer-jeu-ven (semaine A)
      weekShort: [3, 4], // jeu-ven (semaine B)
      description:
        "Le rythme alterne entre semaines longues et courtes au campus : une semaine sur deux, tu es au campus le mercredi, jeudi et vendredi (3 jours) ; l'autre semaine, uniquement le jeudi et vendredi (2 jours). En entreprise, tu pratiques la comptabilité, la paie et la fiscalité directement en cabinet ou en entreprise.",
    },
    competenceBlocks: [
      {
        title: "Traitement et contrôle des opérations comptables, fiscales et sociales",
        competences: [
          "Contrôler les documents commerciaux",
          "Enregistrer et suivre les opérations comptables",
          "Produire l'information fiscale",
          "Gérer les relations sociales (paie, déclarations)",
        ],
      },
      {
        title: "Situations de contrôle de gestion et d'analyse financière",
        competences: [
          "Analyser les résultats et la performance de l'entreprise",
          "Établir et présenter les états financiers",
          "Contribuer au contrôle de gestion",
          "Élaborer des prévisions budgétaires",
        ],
      },
      {
        title: "Parcours de professionnalisation",
        competences: [
          "Analyser les processus de l'organisation",
          "Utiliser le système d'information comptable",
          "Contribuer à la fiabilisation de l'information comptable",
        ],
      },
    ],
    program: [
      {
        title: "Année 1 — Les fondamentaux",
        modules: [
          { name: "Contrôle et traitement comptable des opérations commerciales" },
          { name: "Contrôle et production de l'information financière" },
          { name: "Culture générale et expression" },
          { name: "Langue vivante étrangère (anglais)" },
          { name: "Culture économique, juridique et managériale" },
          { name: "Mathématiques appliquées à la gestion" },
        ],
      },
      {
        title: "Année 2 — L'approfondissement",
        modules: [
          { name: "Gestion des obligations fiscales" },
          { name: "Gestion des relations sociales (paie, déclarations)" },
          { name: "Analyse et prévision de l'activité" },
          { name: "Fiabilisation de l'information comptable et du SI" },
          { name: "Préparation à l'examen et dossiers professionnels" },
        ],
      },
    ],
    careers: [
      {
        title: "Comptable",
        description: "Tu tiens la comptabilité courante, établis les déclarations fiscales et prépares les bilans.",
        salary: "24 000 - 32 000 € brut/an",
      },
      {
        title: "Collaborateur en cabinet comptable",
        description: "Tu gères un portefeuille de clients, de la saisie comptable jusqu'à la révision des comptes.",
        salary: "24 000 - 34 000 € brut/an",
      },
      {
        title: "Gestionnaire de paie",
        description: "Tu établis les bulletins de salaire, gères les déclarations sociales et le suivi des absences.",
        salary: "24 000 - 30 000 € brut/an",
      },
      {
        title: "Assistant(e) de gestion financière",
        description: "Tu participes au suivi budgétaire, à la trésorerie et au reporting financier de l'entreprise.",
        salary: "23 000 - 28 000 € brut/an",
      },
      {
        title: "Contrôleur de gestion junior",
        description: "Tu analyses les coûts, construis les tableaux de bord et aides à la prise de décision.",
        salary: "26 000 - 35 000 € brut/an",
      },
    ],
    furtherStudies: [
      "DCG (Diplôme de Comptabilité et de Gestion) — voie royale, dispenses d'épreuves",
      "Licence professionnelle Métiers de la comptabilité",
      "Licence CCA (Comptabilité, Contrôle, Audit)",
      "Bachelor Comptabilité / Finance",
    ],
    prerequisites: [
      "Baccalauréat général (spécialité Mathématiques recommandée)",
      "Baccalauréat technologique STMG (spécialité Gestion-Finance recommandée)",
      "Baccalauréat professionnel Métiers de la Gestion Administrative",
      "Réorientation post-bac / reconversion",
    ],
    faq: [
      {
        question: "Quel est le salaire en alternance en BTS CG ?",
        answer:
          "La rémunération dépend de ton âge et de l'année de contrat. Un alternant de 18-20 ans perçoit 783,90€ brut par mois en première année (43% du SMIC) et 929,75€ brut en deuxième année (51% du SMIC). Pour les moins de 26 ans rémunérés sous le seuil de 50% du SMIC, le net est très proche du brut grâce à l'exonération de cotisations salariales.",
      },
      {
        question: "Quels métiers après un BTS CG ?",
        answer:
          "Le BTS CG mène aux métiers de la comptabilité et de la gestion : comptable, collaborateur en cabinet, gestionnaire de paie, assistant de gestion financière ou contrôleur de gestion junior. Avec de l'expérience ou une poursuite d'études, tu peux viser des postes de responsable comptable.",
      },
      {
        question: "Peut-on devenir expert-comptable avec un BTS CG ?",
        answer:
          "Le BTS CG est la première marche vers l'expertise comptable. Tu peux poursuivre en DCG (Diplôme de Comptabilité et de Gestion), puis en DSCG et enfin passer le DEC. C'est un parcours long (8 ans après le bac) mais le BTS CG en pose les bases solides.",
      },
      {
        question: "Quelle est la différence entre BTS CG et BTS GPME ?",
        answer:
          "Le BTS CG est spécialisé en comptabilité, fiscalité et gestion financière. Le BTS GPME est polyvalent : gestion, RH, commercial, administratif. Si tu veux te concentrer sur les chiffres et la compta, c'est le CG. Si tu préfères la polyvalence en PME, c'est le GPME.",
      },
      {
        question: "Le BTS CG est-il difficile ?",
        answer:
          "Le BTS CG demande de la rigueur et un goût pour les chiffres. Au CADP, les promos de 12 étudiants permettent un accompagnement personnalisé. Si tu es sérieux et organisé, les formateurs s'adaptent à ton rythme pour t'amener à la réussite.",
      },
      {
        question: "Comment trouver une entreprise pour l'alternance en BTS CG ?",
        answer:
          "Au CADP, on t'accompagne activement : Alternance Dating avec nos entreprises partenaires, ateliers CV, coaching entretien. Les cabinets comptables et les services comptabilité d'entreprise recrutent beaucoup d'alternants CG.",
      },
      {
        question: "Quelles entreprises recrutent des alternants en BTS CG ?",
        answer:
          "Les cabinets d'expertise comptable, les services comptables d'entreprises (PME, ETI, grands groupes), les cabinets d'audit, les associations et les administrations. Le bassin d'emploi couvre la Drôme, l'Ardèche, le Vaucluse et le Gard.",
      },
      {
        question: "Faut-il être bon en maths pour le BTS CG ?",
        answer:
          "Il faut être à l'aise avec les chiffres, mais pas besoin d'être un génie en maths. La comptabilité, c'est surtout de la logique, de la rigueur et de la méthode. Les maths appliquées du BTS CG sont accessibles si tu travailles régulièrement.",
      },
      {
        question: "Quel est le rythme de l'alternance en BTS CG au CADP ?",
        answer:
          "Le rythme est de 2 jours au campus (lundi-mardi) et 3 jours en entreprise ou en cabinet (mercredi à vendredi). Tu vis les échéances comptables en conditions réelles : déclarations de TVA, clôtures, bilans.",
      },
      {
        question: "Comment s'inscrire au BTS CG au CADP ?",
        answer:
          "Candidature en ligne, entretien de motivation, puis accompagnement dans ta recherche d'entreprise. Les inscriptions sont ouvertes toute l'année, places limitées à 12 par promo.",
      },
    ],
    testimonial: {
      name: "Théo B.",
      formation: "BTS CG",
      year: "Promo 2025-2027",
      quote:
        "Je pensais que la compta c'était ennuyeux. En cabinet, je gère un vrai portefeuille clients. Chaque dossier est différent, et au CADP les formateurs nous préparent vraiment aux situations réelles.",
    },
    metaTitle: "BTS CG en alternance à Pierrelatte",
    metaDescription:
      "Prépare ton BTS Comptabilité et Gestion en alternance au CADP à Pierrelatte. Promos de 12 étudiants, 50+ entreprises partenaires. Inscris-toi !",
  },

  // ============================================================
  // BTS MOS — Management Opérationnel de la Sécurité
  // ============================================================
  {
    slug: "bts-mos",
    code: "MOS",
    fullName: "BTS Management Opérationnel de la Sécurité",
    shortName: "BTS MOS",
    heroTitle: "Protéger, organiser, diriger. La sécurité, c'est un métier.",
    heroSubtitle:
      "Le BTS MOS te forme au management des équipes de sécurité, à la gestion des risques et à la réglementation. Tu deviens le responsable qui sécurise les personnes et les biens.",
    shortDescription:
      "Manage des équipes de sécurité, gère les risques, pilote les opérations. Le BTS MOS te prépare à devenir responsable dans un secteur qui recrute massivement.",
    duration: "2 ans",
    level: "Bac+2 — Niveau 5",
    rncp: "RNCP41000",
    rhythm: {
      schoolDays: 2,
      companyDays: 3,
      weekLong: [0, 1, 2], // lun-mar-mer (semaine A)
      weekShort: [0, 1], // lun-mar (semaine B)
      description:
        "Le rythme alterne entre semaines longues et courtes au campus : une semaine sur deux, tu es au campus le lundi, mardi et mercredi (3 jours) ; l'autre semaine, uniquement le lundi et mardi (2 jours). Le reste du temps, tu es sur le terrain en entreprise de sécurité. Tu vis le terrain : rondes, gestion d'équipe, incidents, plannings.",
    },
    competenceBlocks: [
      {
        title: "Préparation et mise en œuvre d'une prestation de sécurité",
        competences: [
          "Préparer la prestation de sécurité",
          "Mettre en œuvre la prestation de sécurité",
          "Contrôler et évaluer la prestation de sécurité",
        ],
      },
      {
        title: "Management des ressources humaines",
        competences: [
          "Gérer les plannings et les ressources humaines",
          "Recruter et intégrer de nouveaux agents",
          "Animer et manager les équipes de sécurité",
          "Former et faire monter en compétences les agents",
        ],
      },
      {
        title: "Gestion de la relation client",
        competences: [
          "Analyser les besoins du client",
          "Proposer des solutions de sécurité adaptées",
          "Assurer le suivi et la satisfaction client",
        ],
      },
      {
        title: "Participation à la gestion des risques",
        competences: [
          "Identifier et évaluer les risques",
          "Mettre en œuvre les mesures de prévention",
          "Gérer les situations de crise et d'urgence",
        ],
      },
    ],
    program: [
      {
        title: "Année 1 — Les fondamentaux",
        modules: [
          { name: "Préparation et mise en œuvre d'une prestation de sécurité" },
          { name: "Management des ressources humaines de sécurité" },
          { name: "Culture générale et expression" },
          { name: "Langue vivante étrangère (anglais)" },
          { name: "Culture économique, juridique et managériale" },
          { name: "Réglementation et cadre juridique de la sécurité" },
        ],
      },
      {
        title: "Année 2 — L'approfondissement",
        modules: [
          { name: "Gestion des risques et des situations de crise" },
          { name: "Gestion de la relation client et développement commercial" },
          { name: "Culture économique, juridique et managériale appliquée" },
          { name: "Pilotage des activités de sécurité" },
          { name: "Préparation à l'examen et dossiers professionnels" },
        ],
      },
    ],
    careers: [
      {
        title: "Responsable sécurité",
        description: "Tu diriges les opérations de sécurité d'un site : équipes, plannings, procédures, incidents.",
        salary: "26 000 - 38 000 € brut/an",
      },
      {
        title: "Chef de poste sécurité",
        description: "Tu coordonnes les agents sur le terrain, gères les rondes et les interventions.",
        salary: "24 000 - 32 000 € brut/an",
      },
      {
        title: "Chargé(e) de prévention des risques",
        description: "Tu identifies les menaces, mets en place les plans de prévention et formes les équipes.",
        salary: "25 000 - 34 000 € brut/an",
      },
      {
        title: "Responsable d'exploitation sécurité",
        description: "Tu pilotes plusieurs sites, gères les contrats clients et assures la qualité des prestations.",
        salary: "28 000 - 42 000 € brut/an",
      },
      {
        title: "Commercial(e) en sécurité privée",
        description: "Tu développes le portefeuille clients et proposes des solutions de sécurité adaptées.",
        salary: "25 000 - 40 000 € brut/an",
      },
    ],
    furtherStudies: [
      "Licence professionnelle Sécurité des biens et des personnes",
      "Licence professionnelle Management et gestion des organisations",
      "Bachelor Responsable sécurité",
      "Titre professionnel Manager en sécurité (niveau 6)",
    ],
    prerequisites: [
      "Baccalauréat général ou technologique",
      "Baccalauréat professionnel Métiers de la Sécurité",
      "CQP Agent de sécurité + expérience",
      "Réorientation / reconversion (carte professionnelle obligatoire)",
    ],
    faq: [
      {
        question: "Quel est le salaire en alternance en BTS MOS ?",
        answer:
          "La rémunération dépend de ton âge et de l'année de contrat. Un alternant de 18-20 ans perçoit 783,90€ brut par mois en première année (43% du SMIC) et 929,75€ brut en deuxième année (51% du SMIC). Pour les moins de 26 ans rémunérés sous le seuil de 50% du SMIC, le net est très proche du brut grâce à l'exonération de cotisations salariales. Certaines entreprises de sécurité ajoutent des primes de nuit ou de week-end.",
      },
      {
        question: "Quels métiers après un BTS MOS ?",
        answer:
          "Le BTS MOS mène aux postes d'encadrement en sécurité privée : responsable sécurité, chef de poste, chargé de prévention des risques, responsable d'exploitation ou commercial en sécurité. C'est un secteur en forte demande de cadres.",
      },
      {
        question: "Le BTS MOS donne-t-il la carte professionnelle de sécurité ?",
        answer:
          "Le BTS MOS te permet d'obtenir la carte professionnelle délivrée par le CNAPS, obligatoire pour exercer dans la sécurité privée. Le diplôme est reconnu comme qualification suffisante pour l'obtention de cette carte.",
      },
      {
        question: "Faut-il avoir un casier judiciaire vierge pour le BTS MOS ?",
        answer:
          "Oui, un casier judiciaire vierge (bulletin n°2) est requis pour obtenir la carte professionnelle du CNAPS. C'est une condition d'accès au secteur de la sécurité privée en France.",
      },
      {
        question: "Le secteur de la sécurité recrute-t-il vraiment ?",
        answer:
          "Oui, massivement. Le secteur de la sécurité privée en France emploie plus de 180 000 agents et manque cruellement de cadres formés. Le BTS MOS forme exactement les profils recherchés : des managers opérationnels capables de gérer des équipes.",
      },
      {
        question: "Comment trouver une entreprise pour l'alternance en BTS MOS ?",
        answer:
          "Au CADP, on t'aide avec les Alternance Dating, les ateliers CV et notre réseau d'entreprises partenaires. Les sociétés de sécurité privée, les sites industriels et les collectivités recherchent activement des alternants MOS.",
      },
      {
        question: "Le BTS MOS est-il reconnu par l'État ?",
        answer:
          "Oui, le BTS MOS est un diplôme national inscrit au RNCP (niveau 5, Bac+2). Au CADP, tu le prépares via le CFA IFIR, certifié Qualiopi. Il est reconnu par le CNAPS pour l'obtention de la carte professionnelle.",
      },
      {
        question: "Peut-on poursuivre ses études après un BTS MOS ?",
        answer:
          "Oui. Tu peux intégrer une licence professionnelle sécurité des biens et des personnes, un Bachelor management de la sécurité, ou passer des certifications spécialisées (SSIAP, SST). Certains poursuivent aussi en management.",
      },
      {
        question: "Quel est le rythme de l'alternance en BTS MOS au CADP ?",
        answer:
          "Le rythme est de 2 jours au campus (lundi-mardi) et 3 jours en entreprise (mercredi à vendredi). Tu vis le quotidien opérationnel : gestion d'équipe, plannings, incidents, relation client.",
      },
      {
        question: "Comment s'inscrire au BTS MOS au CADP ?",
        answer:
          "Candidature en ligne, entretien de motivation, vérification du casier judiciaire, puis accompagnement dans ta recherche d'entreprise. Places limitées à 12 par promo.",
      },
    ],
    testimonial: {
      name: "Ryan K.",
      formation: "BTS MOS",
      year: "Promo 2025-2027",
      quote:
        "La sécurité, c'est pas juste surveiller. C'est manager, anticiper, gérer des crises. Le BTS MOS m'a donné les outils pour diriger une équipe. Et en alternance, j'apprends deux fois plus vite.",
    },
    metaTitle: "BTS MOS en alternance à Pierrelatte",
    metaDescription:
      "Prépare ton BTS Management Opérationnel de la Sécurité en alternance au CADP à Pierrelatte. Promos de 12 étudiants, secteur qui recrute massivement.",
  },

  // ============================================================
  // TP ADVF — Assistant De Vie aux Familles
  // ============================================================
  {
    slug: "tp-advf",
    code: "ADVF",
    fullName: "Titre Professionnel Assistant De Vie aux Familles",
    shortName: "TP ADVF",
    heroTitle: "Prendre soin des autres. Le plus beau des métiers.",
    heroSubtitle:
      "Le TP ADVF te forme à l'accompagnement des personnes âgées, des personnes en situation de handicap et des familles au quotidien. Un métier humain, concret et essentiel.",
    shortDescription:
      "Accompagne les personnes fragiles au quotidien : aide à domicile, garde d'enfants, soutien aux personnes âgées et en situation de handicap. Le TP ADVF te forme à un métier essentiel et porteur.",
    duration: "9 à 12 mois",
    level: "Niveau 3 (CAP/BEP)",
    rncp: "RNCP37715",
    rhythm: {
      schoolDays: 2,
      companyDays: 3,
      weekLong: [2, 3], // mer-jeu (fixe, pas d'alternance)
      weekShort: [2, 3], // mer-jeu (identique)
      description:
        "Tu es au campus le mercredi et le jeudi chaque semaine, et en entreprise le reste de la semaine (lundi, mardi et vendredi). Ce rythme stable te permet d'accompagner les familles et les personnes fragiles avec régularité.",
    },
    competenceBlocks: [
      {
        title: "CCP 1 — Entretenir le logement et le linge d'un particulier",
        competences: [
          "Établir une relation professionnelle dans le cadre d'une prestation d'entretien chez un particulier",
          "Entretenir le logement avec les techniques et les gestes professionnels appropriés",
          "Entretenir le linge avec les techniques et les gestes professionnels appropriés",
        ],
      },
      {
        title: "CCP 2 — Accompagner la personne dans ses activités essentielles du quotidien et dans ses projets",
        competences: [
          "Établir une relation professionnelle avec la personne et son entourage",
          "Prévenir les risques, mettre en place un relais et faire face aux situations d'urgence",
          "Aider la personne dans la réalisation de ses projets et à maintenir un lien social",
          "Aider la personne à faire sa toilette, à s'habiller et à se déplacer",
          "Aider la personne lors des courses, de la préparation et de la prise des repas",
          "Adapter son intervention à la personne en situation de handicap",
        ],
      },
      {
        title: "CCP 3 — Assurer le relai du parent dans la garde de l'enfant à domicile",
        competences: [
          "Définir avec le parent le cadre de l'intervention auprès de l'enfant",
          "Prévenir les risques et assurer la sécurité de l'enfant",
          "Accompagner l'enfant dans ses apprentissages de base, dans sa socialisation et lors de ses activités",
          "Mettre en œuvre les gestes et techniques professionnels lors des levers/couchers, toilette, habillage et repas",
        ],
      },
    ],
    program: [
      {
        title: "CCP 1 — Entretien du logement et du linge",
        modules: [
          { name: "Relation professionnelle dans le cadre de l'entretien chez un particulier" },
          { name: "Techniques et gestes professionnels d'entretien du logement" },
          { name: "Techniques et gestes professionnels d'entretien du linge" },
          { name: "Écogestes et produits d'entretien" },
        ],
      },
      {
        title: "CCP 2 — Accompagnement de la personne",
        modules: [
          { name: "Relation professionnelle avec la personne aidée et son entourage" },
          { name: "Prévention des risques et gestion des situations d'urgence" },
          { name: "Aide à la toilette, à l'habillage et aux déplacements" },
          { name: "Aide aux courses, préparation des repas adaptés" },
          { name: "Accompagnement de la personne en situation de handicap" },
          { name: "Maintien du lien social et de l'autonomie" },
        ],
      },
      {
        title: "CCP 3 — Garde d'enfants à domicile",
        modules: [
          { name: "Cadre de l'intervention auprès de l'enfant" },
          { name: "Sécurité de l'enfant et prévention des risques" },
          { name: "Accompagnement dans les apprentissages et la socialisation" },
          { name: "Gestes de puériculture : levers, couchers, toilette, repas" },
        ],
      },
    ],
    careers: [
      {
        title: "Assistant(e) de vie aux familles",
        description: "Tu accompagnes les personnes fragiles dans les gestes du quotidien : repas, toilette, courses, lien social.",
        salary: "21 000 - 24 000 € brut/an",
      },
      {
        title: "Aide à domicile",
        description: "Tu interviens chez les personnes âgées ou en situation de handicap pour l'entretien du logement et l'accompagnement.",
        salary: "21 000 - 24 000 € brut/an",
      },
      {
        title: "Garde d'enfants à domicile",
        description: "Tu prends en charge les enfants au domicile des parents : repas, devoirs, activités, sécurité.",
        salary: "21 000 - 23 000 € brut/an",
      },
      {
        title: "Auxiliaire de vie sociale",
        description: "Tu accompagnes les personnes dépendantes dans le maintien de leur autonomie et de leur vie sociale.",
        salary: "21 000 - 25 000 € brut/an",
      },
    ],
    furtherStudies: [
      "DEAES (Diplôme d'État d'Accompagnant Éducatif et Social)",
      "DEAS (Diplôme d'État d'Aide-Soignant) — passerelle avec dispenses",
      "Titre professionnel ASMS (Agent de Service Médico-Social)",
      "CAP AEPE (Accompagnant Éducatif Petite Enfance)",
      "Bac pro ASSP (Accompagnement, Soins et Services à la Personne)",
    ],
    prerequisites: [
      "Aucun diplôme requis (niveau 3ème recommandé)",
      "Demandeurs d'emploi",
      "Salariés en reconversion",
      "Jeunes de 16 ans et plus",
    ],
    faq: [
      {
        question: "Quel diplôme obtient-on avec le TP ADVF ?",
        answer:
          "Tu obtiens un Titre Professionnel de niveau 3 (équivalent CAP/BEP) délivré par le Ministère du Travail, inscrit au RNCP. Ce titre est reconnu par les employeurs du secteur de l'aide à domicile et des services à la personne.",
      },
      {
        question: "Quel est le salaire d'un assistant de vie aux familles ?",
        answer:
          "En début de carrière, un ADVF touche environ le SMIC, soit environ 1 400 € net par mois. Avec l'expérience et des certifications complémentaires (comme le DEAES), la rémunération peut évoluer. Le secteur offre aussi la stabilité de l'emploi.",
      },
      {
        question: "Faut-il un diplôme pour entrer en formation TP ADVF ?",
        answer:
          "Non, aucun diplôme n'est requis pour intégrer la formation TP ADVF. Il faut avoir au moins 16 ans, être motivé par l'aide aux personnes et avoir un bon relationnel. Un entretien de motivation est organisé pour valider ton projet.",
      },
      {
        question: "Le secteur de l'aide à domicile recrute-t-il ?",
        answer:
          "Oui, très fortement. Le vieillissement de la population crée une demande massive de professionnels qualifiés. Le secteur de l'aide à domicile fait partie des métiers en tension, avec des milliers de postes non pourvus chaque année en France.",
      },
      {
        question: "Combien de temps dure la formation TP ADVF ?",
        answer:
          "La formation dure entre 9 et 12 mois, incluant les périodes de stage en entreprise. Au CADP, le rythme alterne entre jours au campus et jours en structure d'accueil ou à domicile.",
      },
      {
        question: "Peut-on poursuivre après un TP ADVF ?",
        answer:
          "Oui. Tu peux préparer le DEAES (Diplôme d'État d'Accompagnant Éducatif et Social), passer le concours d'aide-soignant avec des dispenses, préparer un CAP AEPE pour la petite enfance, ou un bac pro ASSP. Le TP ADVF est un vrai tremplin.",
      },
      {
        question: "Le TP ADVF se fait-il en alternance ?",
        answer:
          "Au CADP, la formation inclut des périodes en entreprise (stages ou contrats de professionnalisation selon les cas). Tu alternes entre cours au campus et pratique sur le terrain auprès de familles et de structures d'aide à domicile.",
      },
      {
        question: "Quelles qualités faut-il pour être ADVF ?",
        answer:
          "L'empathie, la patience, le sens de l'écoute et l'autonomie sont essentiels. Il faut aussi être physiquement apte (le métier est physique) et savoir garder son calme dans les situations délicates. La bienveillance est la qualité numéro un.",
      },
      {
        question: "Faut-il un certificat SST pour passer l'examen ADVF ?",
        answer:
          "Oui, c'est obligatoire. Pour se présenter à l'examen du TP ADVF, tu dois détenir un certificat SST (Sauveteur Secouriste du Travail) ou APS-ASD (Acteur Prévention Secours) en cours de validité. La formation SST est intégrée au parcours au CADP.",
      },
      {
        question: "Comment se déroule l'examen du TP ADVF ?",
        answer:
          "L'examen dure 2h20 et comprend une mise en situation professionnelle (1h15) avec un comédien jouant la personne aidée, un entretien technique (50 min) sur le handicap et l'enfant, et un entretien final (15 min) sur ton dossier professionnel.",
      },
      {
        question: "Comment s'inscrire au TP ADVF au CADP ?",
        answer:
          "Candidature en ligne sur notre site, entretien de motivation pour vérifier ton projet professionnel, puis accompagnement dans ta recherche de stage ou d'entreprise. Pas de prérequis de diplôme.",
      },
      {
        question: "Le TP ADVF est-il reconnu par l'État ?",
        answer:
          "Oui. Le TP ADVF est un titre professionnel du Ministère du Travail (code TP-00391), inscrit au RNCP (niveau 3). Au CADP, tu le prépares dans le cadre du CFA IFIR, certifié Qualiopi.",
      },
    ],
    testimonial: {
      name: "Amina S.",
      formation: "TP ADVF",
      year: "Promo 2025-2026",
      quote:
        "Je voulais un métier qui a du sens. Accompagner les personnes âgées, les aider à garder leur autonomie, c'est concret. Au CADP, la formation est humaine, comme le métier qu'on prépare.",
    },
    metaTitle: "TP ADVF en alternance à Pierrelatte",
    metaDescription:
      "Prépare ton Titre Professionnel ADVF au CADP à Pierrelatte. Aide à domicile, accompagnement des personnes fragiles. Formation en 9-12 mois, secteur qui recrute massivement.",
  },
];

export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find((f) => f.slug === slug);
}
