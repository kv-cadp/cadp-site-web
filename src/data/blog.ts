export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "orientation" | "entreprise" | "alternance" | "inscription";
  date: string;
  dateISO: string;
  excerpt: string;
  content: string; // HTML content
  cta: "candidat" | "entreprise" | "orientation";
}

export const categoryLabels: Record<string, { label: string; color: string }> = {
  orientation: { label: "Orientation & formations", color: "bg-gold/10 text-gold" },
  entreprise: { label: "Entreprise & recrutement", color: "bg-navy-deep/10 text-navy-deep" },
  alternance: { label: "Alternance pratique", color: "bg-success/10 text-success" },
  inscription: { label: "Inscription & rentrée", color: "bg-gold/20 text-navy-deep" },
};

export const articles: BlogArticle[] = [
  {
    slug: "inscription-cadp-rentree-2026",
    title: "S'inscrire au CADP pour la rentrée 2026 — Le guide complet",
    metaTitle: "S'inscrire au CADP pour la rentrée 2026 — Alternance à Pierrelatte",
    metaDescription: "Comment s'inscrire au Campus Alternance Drôme Provence pour septembre 2026 ? Étapes, calendrier, formations disponibles et accompagnement. Guide complet.",
    category: "inscription",
    date: "Avril 2026",
    dateISO: "2026-04-06",
    excerpt: "Les inscriptions pour septembre 2026 sont ouvertes. Comment candidater, quel est le calendrier, quelles formations sont disponibles ? Tout ce qu'il faut savoir en un article.",
    cta: "candidat",
    content: `
<p>S'inscrire au Campus Alternance Drôme Provence (CADP) pour la rentrée de septembre 2026, c'est possible dès maintenant. Que tu sois lycéen, étudiant en réorientation ou en reconversion professionnelle, l'inscription se fait en trois étapes simples — et on t'accompagne sur chacune d'entre elles.</p>

<h2>Quelles formations sont ouvertes pour septembre 2026 ?</h2>

<p>Six formations en alternance sont ouvertes pour la rentrée 2026, toutes en promos de 10-12 étudiants maximum :</p>

<ul>
<li><strong><a href="/formations/bts-mco">BTS MCO</a></strong> — Management Commercial Opérationnel — Bac+2, 2 ans</li>
<li><strong><a href="/formations/bts-ndrc">BTS NDRC</a></strong> — Négociation et Digitalisation de la Relation Client — Bac+2, 2 ans</li>
<li><strong><a href="/formations/bts-gpme">BTS GPME</a></strong> — Gestion de la PME — Bac+2, 2 ans</li>
<li><strong><a href="/formations/bts-cg">BTS CG</a></strong> — Comptabilité et Gestion — Bac+2, 2 ans</li>
<li><strong><a href="/formations/bts-mos">BTS MOS</a></strong> — Management Opérationnel de la Sécurité — Bac+2, 2 ans</li>
<li><strong><a href="/formations/tp-advf">TP ADVF</a></strong> — Assistant De Vie aux Familles — Niveau 3 (CAP/BEP), 9 à 12 mois</li>
</ul>

<p>Le <strong><a href="/formations/bts-gtla">BTS GTLA</a></strong> (Gestion des Transports et Logistique Associée) ouvrira à la rentrée 2027 — les pré-inscriptions sont déjà ouvertes.</p>

<p>Toutes les formations sont en alternance, 100% financées par l'OPCO de l'entreprise. Zéro frais pour toi.</p>

<h2>Comment s'inscrire ? Les 3 étapes</h2>

<p><strong>Étape 1 — Tu candidates en ligne.</strong><br/>
Tu remplis le formulaire sur <a href="/candidater">cadp.pro/candidater</a>. Tu choisis ta ou tes formations, tu renseignes tes coordonnées. C'est rapide, gratuit, sans engagement. Si tu ne sais pas quelle formation choisir, le formulaire te propose de faire le <a href="/orientation">test d'orientation RIASEC</a> — il te recommande les formations qui te correspondent en quelques minutes.</p>

<p><strong>Étape 2 — On se rencontre.</strong><br/>
Dans les jours qui suivent ta candidature, on te recontacte pour un entretien de motivation. Ce n'est pas un concours : on veut comprendre ton projet, tes envies, ta situation. On est honnêtes — si ta voie n'est pas chez nous, on te le dit et on t'oriente.</p>

<p><strong>Étape 3 — On t'aide à trouver ton entreprise.</strong><br/>
Une fois accepté, tu n'es pas lâché dans la nature. On transmet ton profil à notre réseau de 50+ entreprises partenaires en Drôme, Ardèche, Vaucluse et Gard. On organise des Alternance Dating (rencontres directes avec des recruteurs), des ateliers CV et du coaching entretien.</p>

<h2>Le calendrier de la rentrée 2026</h2>

<ul>
<li><strong>Maintenant → juillet 2026 :</strong> Dépôt des candidatures (les places se remplissent au fur et à mesure — 12 max par promo)</li>
<li><strong>29 avril 2026 :</strong> Alternance Dating au CADP — viens rencontrer nos entreprises partenaires (14h-16h)</li>
<li><strong>14 mai 2026 :</strong> Atelier CV & Coaching entretien — ouvert à tous les candidats (10h-12h)</li>
<li><strong>Mai-juin 2026 :</strong> Entretiens de motivation et validation des candidatures</li>
<li><strong>Juin-août 2026 :</strong> Signature des contrats d'apprentissage avec les entreprises</li>
<li><strong>Septembre 2026 :</strong> Rentrée au campus — début des cours et de l'alternance</li>
</ul>

<p>Les inscriptions sont ouvertes toute l'année, mais les promotions sont limitées à 12 étudiants. Chaque place pourvue est une place en moins. Notre conseil : ne repousse pas.</p>

<h2>Qui peut s'inscrire au CADP ?</h2>

<p><strong>Pour les 5 BTS (MCO, NDRC, GPME, CG, MOS) :</strong></p>
<ul>
<li>Titulaire d'un baccalauréat (général, technologique STMG, professionnel)</li>
<li>Étudiant en réorientation post-bac</li>
<li>Adulte en reconversion professionnelle</li>
<li>Avoir entre 16 et 29 ans révolus (sauf exceptions : travailleur handicapé, création d'entreprise, sportif de haut niveau)</li>
</ul>

<p><strong>Pour le TP ADVF :</strong></p>
<ul>
<li>Aucun diplôme requis</li>
<li>Accessible dès 16 ans</li>
<li>Ouvert aux personnes en reconversion</li>
</ul>

<p><strong>Pas besoin de passer par Parcoursup.</strong> L'inscription se fait directement avec nous.</p>

<h2>Combien ça coûte ?</h2>

<p>Zéro euro. La formation est financée à 100% par l'OPCO de l'entreprise d'accueil dans le cadre du contrat d'apprentissage. Pas de frais d'inscription, pas de frais de scolarité, pas de frais cachés.</p>

<p>En plus, tu es salarié et tu perçois une rémunération mensuelle : 783,90€ brut/mois pour un 18-20 ans en 1ère année de BTS (43% du SMIC 2026).</p>

<p><a href="/blog/combien-coute-un-alternant-entreprise">Voir le détail du coût pour l'entreprise →</a></p>

<h2>Pourquoi choisir le CADP plutôt qu'un autre centre ?</h2>

<p><strong>Promos de 10-12 étudiants.</strong> Pas de cours magistral devant 40 personnes. Les formateurs connaissent chaque étudiant par son prénom.</p>

<p><strong>Accompagnement emploi intégré.</strong> Alternance Dating, ateliers CV, coaching entretien, transmission directe aux entreprises partenaires. On ne te lâche pas.</p>

<p><strong>Ancrage local.</strong> Campus à Pierrelatte, entreprises partenaires sur 4 départements (Drôme, Ardèche, Vaucluse, Gard). Formé ici, recruté ici.</p>

<p><strong>Adossé au CFA IFIR, certifié Qualiopi.</strong> Diplômes reconnus par l'État, qualité de formation garantie.</p>

<h2>Questions fréquentes sur l'inscription</h2>

<p><strong>Faut-il avoir trouvé une entreprise pour s'inscrire ?</strong><br/>
Non. Tu peux t'inscrire au CADP avant d'avoir signé ton contrat d'alternance. C'est même recommandé : les entreprises préfèrent recruter des candidats déjà acceptés en formation. On t'accompagne dans ta recherche d'entreprise dès que ta candidature est validée.</p>

<p><strong>Peut-on s'inscrire sans passer par Parcoursup ?</strong><br/>
Oui. L'inscription au CADP se fait directement via notre site, sans passer par Parcoursup. Le CADP est une UFA du CFA IFIR — le processus d'admission est indépendant de la plateforme Parcoursup.</p>

<p><strong>Y a-t-il un concours ou un examen d'entrée ?</strong><br/>
Non. L'admission se fait sur entretien de motivation. On évalue ton projet, ta motivation et ta capacité à suivre la formation. Ce n'est pas un concours — c'est une discussion.</p>

<p><strong>J'hésite entre plusieurs formations, comment choisir ?</strong><br/>
Fais le <a href="/orientation">test d'orientation</a> sur cadp.pro/orientation. En quelques minutes, il analyse ton profil et te recommande les formations qui te correspondent. Tu peux aussi candidater à plusieurs formations en même temps — on t'aide à affiner pendant l'entretien.</p>

<p><strong>Est-ce que les inscriptions sont encore ouvertes ?</strong><br/>
Oui, les inscriptions pour la rentrée de septembre 2026 sont ouvertes. Mais les places sont limitées à 12 par promo et par formation — quand c'est complet, c'est complet. Notre conseil : candidate maintenant.</p>

<p><strong>J'ai plus de 29 ans, je peux m'inscrire ?</strong><br/>
Pour les BTS en apprentissage, la limite d'âge est de 29 ans révolus. Cependant, il existe des exceptions (travailleur handicapé, création d'entreprise, etc.). Pour le TP ADVF, des dispositifs spécifiques peuvent être envisagés. Contacte-nous au 04 75 00 34 56 pour qu'on étudie ta situation.</p>
`,
  },
  {
    slug: "bts-mco-ou-bts-ndrc-comment-choisir",
    title: "BTS MCO ou BTS NDRC : comment choisir ?",
    metaTitle: "BTS MCO ou BTS NDRC : comment choisir ? | CADP Pierrelatte",
    metaDescription: "MCO ou NDRC ? Deux BTS commerciaux, deux métiers différents. On t'explique les vraies différences pour faire le bon choix en alternance.",
    category: "orientation",
    date: "Avril 2026",
    dateISO: "2026-04-04",
    excerpt: "C'est la question qu'on nous pose le plus souvent au CADP. Les deux BTS sont dans l'univers du commerce, mais ils ne préparent pas du tout au même quotidien.",
    cta: "candidat",
    content: `
<p>C'est la question qu'on nous pose le plus souvent au CADP. Et c'est normal : les deux BTS sont dans l'univers du commerce, les deux se font en alternance sur 2 ans, les deux mènent à des métiers bien payés. Alors pourquoi deux diplômes différents ? Parce qu'ils ne préparent pas du tout au même quotidien.</p>

<h2>Le MCO gère un lieu. Le NDRC gère une relation.</h2>

<p>La façon la plus simple de comprendre la différence : imagine-toi dans 3 ans.</p>

<p>Avec un <strong>BTS MCO</strong>, tu es responsable d'un magasin, d'un rayon ou d'un espace commercial. Tu gères une équipe, tu organises la mise en rayon, tu analyses les chiffres de vente, tu animes des opérations commerciales. Ton terrain de jeu, c'est un point de vente — physique ou en ligne.</p>

<p>Avec un <strong>BTS NDRC</strong>, tu es dehors. Tu prospectes de nouveaux clients, tu décroches des rendez-vous, tu négocies des contrats, tu développes un portefeuille. Ton terrain de jeu, c'est la relation client — en face-à-face, au téléphone ou sur le digital.</p>

<h2>Le bon test en 3 questions</h2>

<p><strong>1. Tu préfères :</strong><br/>
a) Organiser, planifier, coordonner une équipe → <strong>MCO</strong><br/>
b) Convaincre, argumenter, closer une vente → <strong>NDRC</strong></p>

<p><strong>2. Ton entreprise idéale :</strong><br/>
a) Un magasin, une enseigne, un commerce → <strong>MCO</strong><br/>
b) Une agence, un cabinet, une startup, du B2B → <strong>NDRC</strong></p>

<p><strong>3. Ta journée type idéale :</strong><br/>
a) Gérer les stocks le matin, briefer l'équipe, analyser les ventes le soir → <strong>MCO</strong><br/>
b) Appeler 10 prospects le matin, avoir 2 rendez-vous l'après-midi → <strong>NDRC</strong></p>

<p>Si tu as répondu majoritairement a), le MCO est fait pour toi. Majoritairement b), c'est le NDRC.</p>

<h2>Et en termes de débouchés ?</h2>

<p>Les deux BTS ouvrent des portes. Le MCO mène aux postes de manager de rayon, responsable de magasin, chef de secteur, responsable e-commerce. Le NDRC mène aux postes de commercial terrain, business developer, chargé d'affaires, conseiller commercial.</p>

<p>En termes de salaire, les fourchettes sont comparables en début de carrière (22 000 à 28 000€ brut/an). La différence se joue à moyen terme : les profils NDRC performants accèdent souvent à des rémunérations variables (commissions) qui peuvent significativement augmenter le package.</p>

<h2>Au CADP, qu'est-ce qui change ?</h2>

<p>Chez nous, les deux formations sont en promos de 10-12 étudiants maximum. Le rythme est le même : 2 jours au campus, 3 jours en entreprise (avec un mercredi sur deux en plus au campus pour les matières transversales). La vraie différence, c'est le contenu pédagogique et le type d'entreprise qui t'accueillera en alternance.</p>

<p>Et si tu hésites encore après avoir lu tout ça, fais notre test d'orientation — il te donnera une recommandation personnalisée en quelques minutes.</p>
`,
  },
  {
    slug: "combien-coute-un-alternant-entreprise",
    title: "Combien coûte un alternant à une entreprise en 2026 ?",
    metaTitle: "Combien coûte un alternant à une entreprise en 2026 ? | CADP",
    metaDescription: "Salaire, charges, aides : le vrai coût d'un alternant en BTS pour une PME en 2026. Simulation chiffrée et décryptage du décret de mars 2026.",
    category: "entreprise",
    date: "Avril 2026",
    dateISO: "2026-04-04",
    excerpt: "La réponse surprend presque toujours : un alternant en BTS coûte beaucoup moins cher qu'un recrutement classique, et les aides de l'État réduisent encore la facture.",
    cta: "entreprise",
    content: `
<p>C'est souvent la première question que nous posent les dirigeants de PME quand on les contacte. Et la réponse surprend presque toujours : un alternant en BTS coûte beaucoup moins cher qu'un recrutement classique, et les aides de l'État réduisent encore la facture.</p>

<p>Voici le calcul réel, chiffres 2026, sans arrondir en votre faveur.</p>

<h2>Le salaire de l'alternant</h2>

<p>La rémunération d'un apprenti est fixée en pourcentage du SMIC (1 823,03€ brut mensuel au 1er janvier 2026) et dépend de l'âge et de l'année de contrat :</p>

<ul>
<li><strong>18-20 ans :</strong> 1ère année 43% (783,90€ brut) / 2ème année 51% (929,75€ brut)</li>
<li><strong>21-25 ans :</strong> 1ère année 53% (966,21€ brut) / 2ème année 61% (1 112,05€ brut)</li>
<li><strong>26 ans et + :</strong> 100% du SMIC (1 823,03€ brut)</li>
</ul>

<p>Les charges patronales sur un contrat d'apprentissage sont réduites. Pour un alternant de moins de 26 ans, le coût chargé reste d'environ 110 à 115% du brut.</p>

<h2>Les aides employeur en 2026</h2>

<p>Le décret n°2026-168 du 6 mars 2026 a redéfini les aides pour les contrats d'apprentissage signés à partir du 8 mars 2026 :</p>

<p><strong>Entreprises de moins de 250 salariés :</strong></p>
<ul>
<li>Niveau 3-4 (CAP, Bac) dont TP ADVF : aide unique de <strong>5 000€</strong></li>
<li>Niveau 5 (Bac+2) tous les BTS : aide exceptionnelle de <strong>4 500€</strong></li>
<li>Niveau 6-7 (Bac+3 à Bac+5) : aide exceptionnelle de <strong>2 000€</strong></li>
</ul>

<p>Dans tous les cas, le montant est porté à <strong>6 000€</strong> si l'apprenti est reconnu travailleur handicapé.</p>

<h2>Le coût net : simulation pour une PME</h2>

<p>Prenons le cas le plus fréquent : un alternant de 20 ans en BTS, dans une PME de moins de 50 salariés.</p>

<p><strong>Année 1 :</strong> Salaire brut 9 407€ + charges 1 129€ - aide 4 500€ = <strong>coût net environ 6 036€</strong>, soit 503€ par mois pour un collaborateur présent 3 jours par semaine.</p>

<p><strong>Année 2 :</strong> Salaire brut 11 157€ + charges 1 339€ = <strong>coût net environ 12 496€</strong> (pas d'aide), soit 1 041€ par mois.</p>

<h2>Ce qui est inclus dans le « gratuit »</h2>

<p>La formation elle-même est financée par l'OPCO de l'entreprise, via la taxe d'apprentissage. L'entreprise n'a rien à payer directement au CADP ni au CFA IFIR.</p>

<h2>Le vrai calcul : coût vs valeur</h2>

<p>Un alternant en BTS est présent 3 jours par semaine en entreprise. Sur 2 ans, il acquiert une connaissance fine de votre activité, de vos clients, de vos outils. À l'issue du contrat, vous avez un collaborateur opérationnel, formé à vos méthodes, prêt à être embauché — sans frais de recrutement, sans période d'intégration.</p>

<p>Pour une PME de la Drôme ou de l'Ardèche, c'est souvent le meilleur rapport qualité-prix pour un poste de commercial, d'assistant de gestion ou de comptable junior.</p>
`,
  },
  {
    slug: "trouver-alternance-drome-ardeche-guide",
    title: "Trouver une alternance en Drôme-Ardèche : le guide complet 2026",
    metaTitle: "Trouver une alternance en Drôme-Ardèche : le guide complet 2026 | CADP",
    metaDescription: "Tu cherches une alternance en Drôme ou Ardèche ? Secteurs qui recrutent, conseils CV, erreurs à éviter, calendrier. Le guide pratique du CADP.",
    category: "alternance",
    date: "Mai 2026",
    dateISO: "2026-05-01",
    excerpt: "Tu as choisi ta formation, tu es motivé, mais tu bloques sur la recherche d'entreprise ? Le bassin Drôme-Ardèche recrute des alternants, encore faut-il savoir où chercher.",
    cta: "candidat",
    content: `
<p>Tu as choisi ta formation, tu es motivé, mais tu bloques sur la recherche d'entreprise ? C'est le parcours de 8 candidats sur 10. Bonne nouvelle : le bassin Drôme-Ardèche recrute des alternants, encore faut-il savoir où chercher et comment s'y prendre.</p>

<p>Ce guide est basé sur notre expérience au CADP, avec plus de 50 entreprises partenaires réparties sur quatre départements.</p>

<h2>Les secteurs qui recrutent des alternants chez nous</h2>

<p><strong>Le nucléaire et l'industrie (Tricastin, Pierrelatte, Bollène)</strong><br/>
Les sous-traitants du site de Tricastin recrutent en gestion (GPME), en administration (GPME), en sécurité (MOS) et en commerce B2B (NDRC). C'est un vivier méconnu des candidats, mais les besoins sont constants.</p>

<p><strong>Le commerce et la distribution (Montélimar, Valence, Orange)</strong><br/>
Grandes surfaces, enseignes spécialisées, e-commerce local : les profils MCO et NDRC sont recherchés toute l'année.</p>

<p><strong>Les services aux entreprises (expert-comptable, assurance, banque)</strong><br/>
Les cabinets comptables de la Drôme et de l'Ardèche cherchent des alternants en BTS CG. Les agences d'assurance et les banques recrutent en NDRC et MCO.</p>

<p><strong>L'aide à la personne (Drôme, Ardèche, Vaucluse)</strong><br/>
Les associations d'aide à domicile et les structures médico-sociales ont un besoin permanent de profils ADVF.</p>

<p><strong>La sécurité privée (sites industriels, événementiel)</strong><br/>
Les entreprises de sécurité de la vallée du Rhône recrutent activement en BTS MOS.</p>

<h2>Le calendrier idéal de recherche</h2>

<p><strong>Janvier-mars :</strong> Prépare ton CV, ta lettre de motivation, et identifie les entreprises cibles. C'est aussi le moment de candidater au CADP pour être accompagné.</p>

<p><strong>Avril-mai :</strong> C'est la période la plus active. Les entreprises budgétisent leurs alternants. Nos Alternance Dating te mettent directement en relation avec des recruteurs.</p>

<p><strong>Juin-juillet :</strong> Les dernières places se remplissent. Si tu n'as pas encore signé, intensifie les relances.</p>

<p><strong>Août :</strong> Dernier rush. Certaines entreprises se décident tard. Reste disponible et réactif.</p>

<h2>Les 5 erreurs qui font perdre du temps</h2>

<p><strong>1. Attendre d'avoir trouvé une entreprise pour s'inscrire en formation.</strong><br/>
C'est l'inverse : inscris-toi d'abord, on t'aide à chercher ensuite. Les entreprises veulent des candidats déjà acceptés en formation.</p>

<p><strong>2. Envoyer le même CV à tout le monde.</strong><br/>
Un CV pour une agence immobilière et un CV pour un cabinet comptable, ça ne se ressemble pas.</p>

<p><strong>3. Chercher uniquement sur les sites d'emploi.</strong><br/>
Les meilleures offres en alternance sont souvent invisibles. Démarche directement les entreprises locales.</p>

<p><strong>4. Se limiter à sa ville.</strong><br/>
Le bassin Drôme-Ardèche est accessible : Pierrelatte, Montélimar, Valence, Privas, Orange, Bollène — un rayon de 30 à 50 km ouvre des dizaines d'opportunités.</p>

<p><strong>5. Négliger le suivi.</strong><br/>
Tu as envoyé 20 CV et pas de réponse ? Relance une semaine après. La relance montre ta motivation.</p>

<h2>Ce que le CADP fait pour t'aider</h2>

<p><strong>Alternance Dating</strong> — Des événements où tu rencontres directement nos entreprises partenaires. Tu viens avec ton CV, tu repars avec des propositions concrètes.</p>

<p><strong>Ateliers CV et coaching entretien</strong> — On retravaille ton CV, on simule des entretiens, on te prépare à convaincre.</p>

<p><strong>Transmission directe de ton profil</strong> — On transmet ta candidature à notre réseau de 50+ entreprises partenaires.</p>

<p><strong>Suivi individualisé</strong> — En promo de 10-12, on connaît ta situation et on adapte l'accompagnement.</p>
`,
  },
  {
    slug: "bts-gpme-alternance-guide",
    title: "BTS GPME en alternance : le couteau suisse des PME",
    metaTitle: "BTS GPME en alternance : le couteau suisse des PME | CADP Pierrelatte",
    metaDescription: "Tout savoir sur le BTS GPME en alternance : compétences, débouchés, salaire, pourquoi c'est le BTS idéal pour les PME de Drôme-Ardèche. Guide complet CADP.",
    category: "orientation",
    date: "Avril 2026",
    dateISO: "2026-04-05",
    excerpt: "Tu aimes toucher à tout ? Le BTS Gestion de la PME te forme à la compta, aux RH, à la com' et au commercial. Le profil polyvalent par excellence.",
    cta: "candidat",
    content: `
<p>Tu aimes toucher à tout ? Tu veux comprendre comment fonctionne une entreprise de l'intérieur — la compta, les RH, la com', les fournisseurs, les clients ? Le BTS Gestion de la PME est fait pour toi. Et en alternance, c'est encore mieux : tu apprends le métier en le faisant.</p>

<h2>Ce que fait un titulaire du BTS GPME</h2>

<p>On l'appelle souvent le "bras droit du dirigeant", et ce n'est pas une formule vide. Dans une PME de 10, 20 ou 50 salariés, il n'y a pas un service RH, un service comptable, un service commercial avec chacun son équipe. Il y a une personne — ou deux — qui gère tout ça. C'est le profil GPME.</p>

<p>Concrètement, ton quotidien en entreprise ressemble à ça :</p>

<ul>
<li>Le matin, tu traites le courrier, tu gères les relances fournisseurs, tu prépares un devis pour un client.</li>
<li>En début d'après-midi, tu saisis des écritures comptables, tu prépares les éléments de paie pour le cabinet comptable.</li>
<li>En fin de journée, tu rédiges un post LinkedIn pour l'entreprise ou tu organises la logistique d'un salon professionnel.</li>
</ul>

<p>C'est varié, c'est concret, et c'est indispensable.</p>

<h2>Ce que tu apprends au CADP</h2>

<p>La formation est organisée autour de 4 grands blocs de compétences :</p>

<p><strong>Gérer la relation clients et fournisseurs (GRCF)</strong> — Tu apprends à gérer le cycle commercial complet : devis, commandes, factures, relances, litiges. Tu travailles sur des logiciels professionnels (EBP, Suite Office) et tu apprends à communiquer efficacement à l'oral comme à l'écrit.</p>

<p><strong>Participer à la gestion des risques (GRI)</strong> — Tu identifies les risques de l'entreprise (financiers, juridiques, informatiques) et tu mets en place des procédures pour les réduire. C'est un bloc qui surprend souvent les étudiants par son côté stratégique.</p>

<p><strong>Gérer les ressources humaines (GRH)</strong> — Tu participes au recrutement, tu gères les absences, tu prépares les éléments de paie, tu organises les formations. Dans une PME, les RH ne sont pas un service à part — c'est une compétence que tu maîtrises.</p>

<p><strong>Soutenir le fonctionnement et le projet de développement de la PME (SFPME)</strong> — Tu analyses la situation financière de l'entreprise, tu participes au montage de projets (ouverture d'un nouveau point de vente, lancement d'un produit), tu assistes le dirigeant dans ses décisions.</p>

<h2>Pourquoi le GPME est idéal en alternance</h2>

<p>C'est probablement le BTS qui tire le plus profit de l'alternance. Pourquoi ? Parce que les compétences GPME ne s'apprennent pas dans un manuel — elles se vivent. Gérer un client mécontent, trouver une solution quand un fournisseur livre en retard, préparer un tableau de bord pour le dirigeant : tout ça s'apprend sur le terrain.</p>

<p>Au CADP, le rythme d'alternance te donne 3 jours par semaine en entreprise. En deux ans, tu accumules l'équivalent de plus d'un an d'expérience professionnelle. À la sortie, tu es opérationnel — pas besoin de période d'adaptation.</p>

<h2>Les débouchés dans la Drôme et l'Ardèche</h2>

<p>Le bassin d'emploi autour de Pierrelatte, Montélimar et en Ardèche est composé majoritairement de PME et TPE. C'est exactement le tissu économique qui recrute des profils GPME :</p>

<p><strong>PME industrielles du Tricastin</strong> — Les sous-traitants du nucléaire ont besoin d'assistants de gestion polyvalents pour gérer leur administratif, leur compta et leurs appels d'offres.</p>

<p><strong>Artisans et TPE en croissance</strong> — Un artisan qui passe de 3 à 10 salariés a besoin de structurer sa gestion. Le profil GPME est la première embauche stratégique.</p>

<p><strong>Cabinets d'expertise comptable</strong> — En support aux experts-comptables, pour la saisie, la relation client et la gestion interne du cabinet.</p>

<p><strong>Associations et collectivités</strong> — Les structures associatives et les petites collectivités recrutent des profils polyvalents capables de gérer à la fois l'administratif, la compta et la communication.</p>

<p>En termes de salaire, un assistant de gestion PME débute entre 22 000 et 26 000€ brut annuel. Avec 3-5 ans d'expérience, un office manager ou responsable administratif atteint 28 000 à 35 000€.</p>

<h2>Le BTS GPME au CADP — ce qui fait la différence</h2>

<p><strong>Des promos de 10-12 étudiants.</strong> En GPME, tu as besoin de poser des questions, de comprendre ta situation d'entreprise, de travailler sur tes cas concrets. C'est impossible dans un amphi de 35.</p>

<p><strong>Des formateurs professionnels.</strong> Nos intervenants en GPME ont eux-mêmes géré des PME, travaillé en cabinet comptable, dirigé des équipes. Ils ne récitent pas un cours — ils partagent leur expérience.</p>

<p><strong>Un accompagnement dans la recherche d'entreprise.</strong> On ne te lâche pas avec ton CV à la main. On te met en relation avec notre réseau de PME partenaires sur 4 départements (Drôme, Ardèche, Vaucluse, Gard).</p>

<h2>Et après le BTS GPME ?</h2>

<p>Tu peux entrer directement dans la vie active — c'est le choix de la majorité de nos diplômés, souvent embauchés dans leur entreprise d'alternance.</p>

<p>Tu peux aussi poursuivre en licence professionnelle (gestion des organisations, RH, management) ou en bachelor (école de commerce, IAE). Le BTS GPME ouvre des portes vers des postes d'office manager, de responsable administratif et financier, ou de chargé de projet.</p>
`,
  },
  {
    slug: "bts-cg-alternance-guide",
    title: "BTS Comptabilité et Gestion en alternance : bien plus que des chiffres",
    metaTitle: "BTS CG en alternance : bien plus que des chiffres | CADP Pierrelatte",
    metaDescription: "Tout savoir sur le BTS CG en alternance : comptabilité, fiscalité, paie, débouchés en cabinet et entreprise. Le guide complet du CADP Pierrelatte.",
    category: "orientation",
    date: "Avril 2026",
    dateISO: "2026-04-05",
    excerpt: "La comptabilité a une réputation injuste. La réalité en 2026 : un métier en tension, digitalisé, au cœur de la stratégie des entreprises — et un des meilleurs taux d'insertion.",
    cta: "candidat",
    content: `
<p>La comptabilité a une réputation injuste : ennuyeuse, répétitive, austère. La réalité en 2026, c'est un métier en tension, digitalisé, au cœur de la stratégie des entreprises — et un des BTS avec le meilleur taux d'insertion professionnelle en France.</p>

<h2>Ce que fait un titulaire du BTS CG</h2>

<p>Oublie l'image du comptable seul devant ses classeurs. En entreprise ou en cabinet, un titulaire du BTS CG est un professionnel qui :</p>

<ul>
<li>Tient la comptabilité courante : saisie des écritures, rapprochements bancaires, lettrage des comptes.</li>
<li>Prépare les déclarations fiscales : TVA mensuelle ou trimestrielle, déclarations de résultats, liasse fiscale.</li>
<li>Participe à l'élaboration des bulletins de paie et des déclarations sociales.</li>
<li>Produit des tableaux de bord et des analyses financières pour aider le dirigeant à piloter son activité.</li>
<li>Utilise des logiciels professionnels au quotidien : Sage, Cegid, EBP, Excel avancé.</li>
</ul>

<p>La comptabilité, c'est le langage de l'entreprise. Celui qui le maîtrise comprend tout le reste.</p>

<h2>Pourquoi le BTS CG est un choix stratégique</h2>

<p><strong>Un marché de l'emploi en tension.</strong> Les cabinets d'expertise comptable peinent à recruter. En Drôme-Ardèche, la pénurie est réelle : les cabinets de Montélimar, Valence, Pierrelatte, Privas cherchent des collaborateurs formés. Un alternant en BTS CG qui fait ses preuves pendant 2 ans se voit proposer un CDI dans la grande majorité des cas.</p>

<p><strong>Un diplôme qui ouvre la voie vers l'expertise.</strong> Le BTS CG est la première marche vers le DCG (Diplôme de Comptabilité et de Gestion) puis le DSCG et l'expertise comptable. Pour ceux qui visent loin, c'est un parcours balisé avec des perspectives de carrière et de rémunération excellentes.</p>

<p><strong>Un métier à l'épreuve de l'automatisation.</strong> Oui, les logiciels automatisent la saisie. Mais l'analyse, le conseil, la relation client, la fiscalité complexe — tout ça reste humain. Le BTS CG forme à ces compétences à haute valeur ajoutée, pas juste à la saisie.</p>

<h2>Ce que tu apprends au CADP</h2>

<p>La formation couvre 6 processus complémentaires :</p>

<p><strong>P1 — Contrôle et traitement comptable des opérations commerciales.</strong> Achats, ventes, TVA, suivi des créances et des dettes. C'est le socle du métier.</p>

<p><strong>P2 — Contrôle et production de l'information financière.</strong> Inventaire, écritures de régularisation, élaboration des comptes annuels. Tu apprends à produire un bilan et un compte de résultat.</p>

<p><strong>P3 — Gestion des obligations fiscales.</strong> Déclarations de TVA, d'IS, de CVAE, liasse fiscale. La fiscalité est un domaine où la précision et la rigueur sont essentielles.</p>

<p><strong>P4 — Gestion des relations sociales.</strong> Paie, contrats de travail, déclarations sociales, droit du travail. Un bloc de compétences de plus en plus valorisé par les employeurs.</p>

<p><strong>P5 — Analyse et prévision de l'activité.</strong> Calcul de coûts, budgets, seuils de rentabilité, analyse de la performance. C'est ici que la comptabilité devient un outil de pilotage stratégique.</p>

<p><strong>P6 — Analyse de la situation financière.</strong> Analyse du bilan, tableau de financement, ratios financiers. Tu apprends à lire la santé d'une entreprise comme un médecin lit une radio.</p>

<p>À ça s'ajoutent les mathématiques appliquées (statistiques, probabilités, suites numériques) qui sont un vrai outil de travail en gestion.</p>

<h2>Le BTS CG en alternance — l'avantage concret</h2>

<p>En cabinet comptable, l'alternance est un format naturel : tu travailles sur de vrais dossiers clients, tu vois passer des dizaines de situations comptables différentes, tu touches à la TVA d'un restaurant, à la paie d'un artisan, au bilan d'une PME industrielle. En deux ans, tu acquiers une variété d'expériences qu'un salarié débutant met 3-4 ans à accumuler.</p>

<p>En entreprise, c'est différent mais tout aussi formateur : tu te spécialises sur la comptabilité d'une seule structure, tu la connais dans ses moindres détails, et tu deviens indispensable.</p>

<h2>Les débouchés en Drôme-Ardèche</h2>

<p><strong>Cabinets d'expertise comptable</strong> — C'est le débouché principal. Les cabinets de Montélimar, Valence, Pierrelatte, Aubenas recrutent en permanence. Un alternant formé sur leurs méthodes et leurs outils est un candidat idéal.</p>

<p><strong>PME et ETI industrielles</strong> — Les entreprises du Tricastin, de la vallée du Rhône et de la Drôme provençale ont besoin de comptables juniors pour renforcer leurs services financiers.</p>

<p><strong>Banques et assurances</strong> — Les compétences en analyse financière sont valorisées dans le secteur bancaire pour les postes de chargé de clientèle professionnelle.</p>

<p><strong>Associations et collectivités</strong> — Comptabilité associative, gestion budgétaire publique : des postes stables et accessibles.</p>

<p>En termes de rémunération, un comptable junior débute entre 24 000 et 28 000€ brut annuel. Un collaborateur confirmé en cabinet atteint 32 000 à 40 000€. Un expert-comptable diplômé : 50 000€ et plus.</p>

<h2>Le BTS CG au CADP — ce qui fait la différence</h2>

<p><strong>Des promos de 10-12 étudiants.</strong> La comptabilité demande de la rigueur et de la compréhension — pas du par cœur. En petit groupe, le formateur peut reprendre chaque point de blocage, vérifier que chaque étudiant maîtrise les mécanismes avant de passer au suivant.</p>

<p><strong>Des formateurs issus du terrain.</strong> Nos intervenants en CG ont une expérience réelle en cabinet et en entreprise. Ils enseignent la comptabilité telle qu'elle se pratique, pas telle qu'elle s'écrit dans un manuel.</p>

<p><strong>Un accompagnement concret vers l'emploi.</strong> Notre réseau de cabinets comptables partenaires sur la Drôme et l'Ardèche recrute activement nos alternants. On te met en relation directe.</p>

<h2>Et après le BTS CG ?</h2>

<p><strong>L'insertion professionnelle directe.</strong> Collaborateur comptable en cabinet, comptable en entreprise, assistant contrôleur de gestion. Avec le BTS CG et 2 ans d'alternance, tu es immédiatement opérationnel.</p>

<p><strong>La poursuite d'études.</strong> Le DCG (Diplôme de Comptabilité et de Gestion, Bac+3) est la suite logique et donne accès au DSCG puis au stage d'expertise comptable. C'est un parcours exigeant mais qui mène à l'un des métiers les mieux rémunérés et les plus sécurisés de France.</p>
`,
  },
  {
    slug: "bts-mos-alternance-securite-pierrelatte",
    title: "BTS MOS en alternance à Pierrelatte : la sécurité, un secteur qui ne connaît pas le chômage",
    metaTitle: "BTS MOS en alternance à Pierrelatte : sécurité et Tricastin | CADP",
    metaDescription: "BTS MOS en alternance à Pierrelatte, au cœur du Tricastin. Management de la sécurité, débouchés nucléaire et industrie, salaires. Guide complet CADP.",
    category: "orientation",
    date: "Avril 2026",
    dateISO: "2026-04-05",
    excerpt: "185 000 salariés, une croissance continue, et un manque de cadres qualifiés. Le BTS MOS forme les managers de la sécurité — et à Pierrelatte, les débouchés sont à la porte du campus.",
    cta: "candidat",
    content: `
<p>La sécurité privée en France, c'est 185 000 salariés, un chiffre d'affaires en croissance continue, et un problème récurrent : le manque de cadres qualifiés. Le BTS Management Opérationnel de la Sécurité (MOS) forme ces cadres. Et à Pierrelatte, au cœur du bassin nucléaire du Tricastin, les débouchés sont à la porte du campus.</p>

<h2>Ce que fait un titulaire du BTS MOS</h2>

<p>Le BTS MOS ne forme pas un agent de sécurité. Il forme celui qui manage les agents de sécurité. La différence est fondamentale.</p>

<p>Au quotidien, un titulaire du BTS MOS :</p>

<ul>
<li>Réalise des diagnostics de sécurité et de sûreté pour identifier les risques d'un site.</li>
<li>Organise les moyens humains et techniques : planning des agents, choix des équipements, mise en place des procédures.</li>
<li>Encadre une équipe d'agents de prévention et de sécurité sur le terrain.</li>
<li>Gère les incidents : intervention, rapport, analyse, retour d'expérience.</li>
<li>Assure la conformité réglementaire : CNAPS, code de la sécurité intérieure, normes incendie.</li>
<li>Participe à l'élaboration des appels d'offres et à la relation commerciale avec les clients donneurs d'ordre.</li>
</ul>

<p>C'est un métier à responsabilités, qui demande du sang-froid, du leadership et une bonne compréhension des enjeux juridiques et organisationnels.</p>

<h2>Pourquoi Pierrelatte est l'endroit idéal pour un BTS MOS</h2>

<p>Le site nucléaire du Tricastin est le plus grand site nucléaire d'Europe. Il concentre des dizaines de sous-traitants en sécurité et sûreté qui opèrent 24h/24, 365 jours par an. Les besoins en encadrement sécurité sont permanents et croissants.</p>

<p>Mais ce n'est pas le seul débouché local :</p>

<ul>
<li><strong>Sites industriels SEVESO</strong> de la vallée du Rhône : chimie, logistique, énergie.</li>
<li><strong>Événementiel</strong> : festivals, salons professionnels, événements sportifs.</li>
<li><strong>Grande distribution</strong> : responsables sécurité de centres commerciaux et d'hypermarchés.</li>
<li><strong>Collectivités</strong> : sécurité des bâtiments publics, vidéoprotection urbaine.</li>
<li><strong>Entreprises de sécurité privée</strong> : Securitas, Fiducial, ICTS, Onet Sécurité — toutes présentes sur le bassin.</li>
</ul>

<p>Former un cadre en sécurité à Pierrelatte, c'est le former là où les employeurs se trouvent.</p>

<h2>Ce que tu apprends au CADP</h2>

<p><strong>DA1 — Réalisation d'un diagnostic de sécurité et de sûreté.</strong> Tu apprends à analyser un site, identifier les menaces (intrusion, vol, incendie, actes de malveillance), évaluer les vulnérabilités et proposer des solutions adaptées. C'est la compétence qui différencie un cadre d'un exécutant.</p>

<p><strong>DA3 — Gestion de la relation client.</strong> La sécurité est un service. Tu apprends à répondre à un appel d'offre, à rédiger une proposition commerciale, à gérer la relation avec le donneur d'ordre, à mesurer la satisfaction client.</p>

<p><strong>DA4 — Management et gestion de la sécurité globale.</strong> Tu apprends à planifier les ressources, à encadrer une équipe, à gérer un budget, à mettre en place une démarche qualité. C'est le cœur du management opérationnel.</p>

<p><strong>GRH mutualisée</strong> — Le module de gestion des ressources humaines te donne les bases du droit du travail, du recrutement et de la gestion d'équipe — des compétences indispensables quand tu encadres des agents sur le terrain.</p>

<p>En parallèle, tu passes ta carte professionnelle du CNAPS (obligatoire pour travailler dans la sécurité privée) et tu acquiers des compétences en SST (Sauveteur Secouriste du Travail).</p>

<h2>L'alternance en sécurité : apprendre en conditions réelles</h2>

<p>La sécurité ne s'enseigne pas en salle. Un diagnostic de sûreté, une gestion de crise, un briefing d'équipe — tout ça se vit sur le terrain. L'alternance te met en situation réelle dès le premier jour.</p>

<p>En entreprise, tu es encadré par des professionnels expérimentés. Tu participes aux rondes, aux contrôles d'accès, aux levées de doute — puis progressivement tu prends des responsabilités d'encadrement. Au bout de deux ans, tu as géré de vraies situations, pas des cas d'école.</p>

<p>Au CADP, ton formateur principal en BTS MOS est lui-même issu du terrain : pompier volontaire, auditeur sécurité, formateur SST. Il apporte à ses étudiants ce qu'aucun manuel ne peut enseigner.</p>

<h2>Les débouchés et la rémunération</h2>

<p>Le BTS MOS ouvre des postes d'encadrement intermédiaire dès la sortie :</p>

<ul>
<li>Chef de poste / Chef d'équipe sécurité</li>
<li>Responsable de site</li>
<li>Chargé de sécurité en entreprise</li>
<li>Assistant responsable sûreté</li>
<li>Coordinateur événementiel sécurité</li>
</ul>

<p>En termes de rémunération, un chef de poste débute entre 24 000 et 28 000€ brut annuel. Un responsable de site expérimenté atteint 32 000 à 40 000€. Les postes de responsable sûreté en milieu industriel (nucléaire, SEVESO) peuvent dépasser 45 000€ avec l'expérience.</p>

<p>La particularité du secteur : les perspectives d'évolution sont rapides. Un titulaire du BTS MOS performant peut accéder à un poste de directeur d'agence en 5-7 ans.</p>

<h2>Et après le BTS MOS ?</h2>

<p><strong>L'insertion directe</strong> — C'est le choix majoritaire. Les entreprises de sécurité recrutent activement et les postes d'encadrement sont accessibles dès l'obtention du diplôme.</p>

<p><strong>La poursuite d'études</strong> — Licence professionnelle en sécurité, bachelor management de la sécurité, ou passerelle vers les métiers de la défense et de la protection civile.</p>
`,
  },
  {
    slug: "bts-gtla-transport-logistique-alternance",
    title: "BTS GTLA en alternance : le transport-logistique recrute et ne s'arrête jamais",
    metaTitle: "BTS GTLA en alternance : transport-logistique, un secteur qui recrute | CADP",
    metaDescription: "1,8 million d'emplois, une croissance continue. Le BTS GTLA forme les cadres du transport et de la logistique. Ouverture au CADP Pierrelatte rentrée 2027.",
    category: "orientation",
    date: "Avril 2026",
    dateISO: "2026-04-05",
    excerpt: "1,8 million d'emplois en France, une croissance continue, et pas assez de cadres formés. Le BTS GTLA répond à ce besoin — et au CADP, on prépare son ouverture pour 2027.",
    cta: "candidat",
    content: `
<p>Chaque produit que tu achètes, chaque colis que tu reçois, chaque pièce qui arrive dans une usine — quelqu'un a organisé son transport. Le secteur transport-logistique, c'est 1,8 million d'emplois en France, une croissance continue, et un problème récurrent : pas assez de cadres formés. Le BTS GTLA (Gestion des Transports et Logistique Associée) répond exactement à ce besoin.</p>

<p>Et au CADP, on prépare son ouverture pour la rentrée 2027.</p>

<h2>Un métier que l'IA ne remplacera pas</h2>

<p>Les entrepôts se robotisent, les camions se digitalisent, les flux se complexifient — mais il faut toujours quelqu'un pour piloter tout ça. Le gestionnaire transport-logistique est l'humain au centre du système : il coordonne les transporteurs, gère les imprévus (retard, grève, panne, blocage douanier), optimise les coûts et les délais, et manage les équipes.</p>

<p>C'est un métier où tu ne t'ennuies jamais. Un lundi, tu gères une urgence de livraison pour un client industriel. Un mardi, tu négocies un tarif avec un transporteur. Un mercredi, tu analyses les indicateurs de performance de la semaine. Un jeudi, tu planifies les expéditions du mois suivant.</p>

<h2>Pourquoi la vallée du Rhône est le bon endroit</h2>

<p>Pierrelatte est situé sur l'un des axes logistiques majeurs d'Europe : le corridor rhodanien, qui relie Lyon à Marseille. Dans un rayon de 50 km autour du campus, tu trouves :</p>

<p>Des <strong>plateformes logistiques</strong> de grande envergure à Montélimar, Valence, Orange et Bollène — avec des acteurs comme Amazon, GLS, Chronopost, DB Schenker qui recrutent en permanence.</p>

<p>Des <strong>transporteurs routiers</strong> régionaux qui cherchent des exploitants capables de gérer les plannings, les tournées et la relation client.</p>

<p>Le <strong>site nucléaire du Tricastin</strong> et ses sous-traitants, qui ont des besoins spécifiques en logistique réglementée et transport de matières sensibles.</p>

<p>Le <strong>port de Marseille-Fos</strong> à 2 heures, qui ouvre les perspectives du transport maritime et du transit international.</p>

<p>Des <strong>entreprises agroalimentaires et industrielles</strong> de la Drôme provençale et de l'Ardèche qui expédient partout en France et en Europe.</p>

<h2>Ce que le BTS GTLA t'apporte concrètement</h2>

<p>Au-delà du diplôme (qui est un Bac+2 reconnu par l'État), le BTS GTLA te donne deux atouts rares :</p>

<p><strong>L'attestation de capacité professionnelle de transport de marchandises par route.</strong> C'est le sésame pour créer ou diriger une entreprise de transport. Normalement, il faut passer un examen spécifique pour l'obtenir. Avec le BTS GTLA, tu l'as par équivalence. C'est un des seuls BTS qui ouvre directement la porte à l'entrepreneuriat.</p>

<p><strong>L'attestation de capacité de commissionnaire de transport.</strong> Tu peux devenir organisateur de transport — le métier qui consiste à acheter du transport pour le revendre à des clients qui ont des marchandises à expédier. C'est un métier à forte valeur ajoutée.</p>

<h2>Le profil idéal</h2>

<p>Le BTS GTLA n'est pas réservé aux passionnés de camions. Il est fait pour toi si :</p>

<ul>
<li>Tu aimes organiser, planifier, coordonner.</li>
<li>Tu es à l'aise avec les chiffres (coûts, marges, indicateurs) sans être un matheux.</li>
<li>Tu as un bon niveau d'anglais (le transport international, c'est en anglais).</li>
<li>Tu aimes résoudre des problèmes concrets sous pression.</li>
<li>Tu es curieux du monde et de la géographie économique.</li>
</ul>

<p>Le BTS GTLA est accessible après un bac général, un bac STMG, ou un bac pro transport-logistique. Les profils en reconversion sont aussi les bienvenus.</p>

<h2>Pourquoi au CADP ?</h2>

<p><strong>Des promos de 10-12 étudiants.</strong> Le transport-logistique, ça s'apprend en résolvant des cas concrets. En petit groupe, chaque étudiant bénéficie d'un accompagnement individualisé.</p>

<p><strong>Un réseau d'entreprises locales.</strong> Laurent Aubret, co-directeur du CADP, développe le réseau d'entreprises partenaires sur les 4 départements couverts (Drôme, Ardèche, Vaucluse, Gard). On te met en relation directe avec les transporteurs et plateformes logistiques qui recrutent.</p>

<p><strong>L'alternance dès le premier jour.</strong> 3 jours en entreprise, 2 à 3 jours au campus. Tu apprends en gérant de vrais flux, pas des exercices théoriques.</p>

<h2>Et après ?</h2>

<p><strong>Insertion directe</strong> — Le marché recrute massivement. Exploitant transport, affréteur, gestionnaire de stocks, coordinateur logistique : les postes sont disponibles et les salaires progressent vite (24 000 à 28 000€ en début de carrière, 35 000 à 45 000€ avec expérience).</p>

<p><strong>Poursuite d'études</strong> — Licence pro Logistique et Pilotage des Flux, Bachelor Responsable Transport, école de commerce en admission parallèle.</p>

<p><strong>Création d'entreprise</strong> — Grâce aux attestations de capacité obtenues par équivalence avec le BTS.</p>

<h2>Pré-inscriptions ouvertes</h2>

<p>Le BTS GTLA ouvrira au CADP à la rentrée 2027. Les pré-inscriptions sont déjà ouvertes — et les premières places attribuées seront les mieux accompagnées dans la recherche d'entreprise.</p>
`,
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
