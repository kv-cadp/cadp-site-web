import { jsPDF } from "jspdf";
import { LOGO_BASE64 } from "@/data/logo-base64";

// Couleurs CADP
const NAVY = [11, 25, 41] as const;
const GOLD = [201, 168, 76] as const;
const GRAY = [44, 44, 44] as const;
const GRAY_MID = [102, 102, 102] as const;
const CREAM = [245, 240, 230] as const;
const GREEN = [46, 125, 79] as const;
const WHITE = [255, 255, 255] as const;

interface PDFParams {
  entreprise: string;
  nom: string;
  prenom: string;
  fonction: string;
  secteur: string;
  missionsComm: string[];
  missionsAdmin: string[];
  missionsSpec: string[];
  results: { key: string; formation: { key: string; name: string; full: string; niveau: string; duree: string; dm: number; nc: number; desc: string; missions: string[] }; points: number }[];
  sim: {
    tranche: string;
    taux: number;
    brutMens: number;
    aide: number;
    hEnt: number;
    duree: number;
    coutCDI: number;
    coutNet: number;
    eco: number;
    ecoPct: number;
    brutApp: number;
    chargesApp: number;
    brutCDI: number;
    chargesCDI: number;
  };
  effectif: string;
}

const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR") + " €";

// Descriptions orientées bénéfices employeur
const formationBenefits: Record<string, string> = {
  mco: "Votre alternant sera formé à accueillir, conseiller et fidéliser vos clients, développer le chiffre d'affaires de votre point de vente, manager une équipe commerciale et piloter vos indicateurs de performance. Il deviendra rapidement autonome sur la gestion quotidienne de votre unité commerciale.",
  ndrc: "Votre alternant sera formé à prospecter de nouveaux clients, négocier et conclure des ventes, animer votre relation client digitale (réseaux sociaux, e-commerce) et développer des partenariats durables. Un profil commercial complet, opérationnel dès les premières semaines.",
  gpme: "Votre alternant sera le bras droit polyvalent de votre direction : gestion administrative, suivi comptable, relation clients et fournisseurs, RH (contrats, paie, planning) et organisation des projets. Il prendra en charge les tâches qui vous libèrent du temps pour développer votre activité.",
  cg: "Votre alternant sera formé à la saisie comptable, aux déclarations fiscales (TVA, IS), à l'établissement des bulletins de paie, au suivi de trésorerie et à l'analyse financière. Un profil rigoureux qui fiabilise votre gestion et vous prépare aux échéances comptables en toute sérénité.",
  mos: "Votre alternant sera formé à manager vos équipes de sécurité, organiser les plannings et les rondes, gérer les incidents et assurer la conformité réglementaire. Un futur responsable opérationnel capable de piloter la qualité de vos prestations de sécurité.",
  advf: "Votre collaborateur sera formé à l'accompagnement des personnes fragiles dans les gestes du quotidien : aide à la toilette, préparation des repas, entretien du domicile, garde d'enfants. Un professionnel bienveillant et qualifié pour intervenir à domicile en toute confiance.",
};

// Compétences reformulées en langage entreprise
const formationCompetences: Record<string, string[]> = {
  mco: [
    "Accueillir, conseiller et fidéliser vos clients",
    "Animer et dynamiser votre offre commerciale",
    "Gérer les opérations courantes (stocks, commandes, CA)",
    "Manager et motiver l'équipe de vente",
  ],
  ndrc: [
    "Prospecter et développer votre portefeuille clients",
    "Négocier et conclure des ventes en face-à-face ou à distance",
    "Animer votre présence digitale et vos réseaux sociaux",
    "Fidéliser vos clients et développer des partenariats",
  ],
  gpme: [
    "Gérer la relation avec vos clients et fournisseurs",
    "Assurer le suivi administratif et comptable",
    "Participer à la gestion RH (paie, contrats, planning)",
    "Organiser et coordonner les projets de l'entreprise",
  ],
  cg: [
    "Réaliser la saisie comptable et les rapprochements",
    "Préparer les déclarations fiscales et sociales",
    "Produire les états financiers et le suivi de trésorerie",
    "Contribuer au contrôle de gestion et aux prévisions",
  ],
  mos: [
    "Manager les équipes de sécurité au quotidien",
    "Piloter la conformité et la prévention des risques",
    "Gérer les plannings, les ressources et le matériel",
    "Assurer la relation client et le reporting",
  ],
  advf: [
    "Accompagner les personnes dans les actes du quotidien",
    "Assurer l'entretien du domicile et la préparation des repas",
    "Prendre en charge la garde et l'éveil des enfants",
    "Maintenir le lien social et l'autonomie des personnes",
  ],
};

const rythmes: Record<string, string> = {
  mco: "Lundi-Mardi au campus / Mercredi à Vendredi en entreprise",
  ndrc: "Jeudi-Vendredi au campus / Lundi à Mercredi en entreprise",
  gpme: "Lundi-Mardi au campus / Mercredi à Vendredi en entreprise",
  cg: "Jeudi-Vendredi au campus / Lundi à Mercredi en entreprise",
  mos: "Lundi-Mardi au campus / Mercredi à Vendredi en entreprise",
  advf: "Mercredi-Jeudi au campus / Lundi-Mardi et Vendredi en structure",
};

const debouches: Record<string, string[]> = {
  mco: ["Responsable de magasin", "Chef de rayon", "Manager e-commerce", "Chargé de clientèle"],
  ndrc: ["Business developer", "Commercial terrain", "Chargé d'affaires", "Responsable e-commerce"],
  gpme: ["Assistant de gestion", "Office manager", "Assistant RH", "Assistant de direction"],
  cg: ["Comptable", "Collaborateur en cabinet", "Gestionnaire de paie", "Contrôleur de gestion"],
  mos: ["Responsable sécurité", "Chef de poste", "Chargé de prévention", "Responsable d'exploitation"],
  advf: ["Auxiliaire de vie", "Aide à domicile", "Garde d'enfants", "Agent en EHPAD"],
};

const missionLabels: Record<string, string> = {
  vente: "Vente et conseil client",
  prospection: "Prospection et développement",
  negociation: "Négociation commerciale",
  digital: "Communication digitale",
  management: "Management d'équipe",
  accueil: "Accueil et standard",
  secretariat: "Secrétariat et gestion documentaire",
  compta: "Comptabilité et facturation",
  rh: "Gestion RH et paie",
  stock: "Gestion des stocks",
  aide_personne: "Accompagnement de personnes",
  banque_conseil: "Conseil bancaire ou assurance",
  qhse: "Qualité, Sécurité, Environnement",
  rh_dev: "Développement RH et formation",
};

export function generateEntreprisePDF(params: PDFParams) {
  const { entreprise, nom, prenom, fonction, secteur, missionsComm, missionsAdmin, missionsSpec, results, sim, effectif } = params;
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.width;
  const ph = doc.internal.pageSize.height;
  const m = 18;
  const contentW = pw - 2 * m;
  let y = 0;

  const today = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  // ============================================================
  // Helper functions
  // ============================================================
  function drawHeader() {
    // Bande navy en haut
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pw, 38, "F");

    // Logo
    try {
      doc.addImage(LOGO_BASE64, "JPEG", m, 5, 28, 28);
    } catch {
      // fallback sans logo
    }

    // Titre
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...GOLD);
    doc.text("Votre profil alternant personnalisé", 52, 17);

    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(`Résultat de votre diagnostic — ${today}`, 52, 25);

    if (entreprise) {
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(`${entreprise}${nom ? ` — ${prenom} ${nom}` : ""}${fonction ? ` (${fonction})` : ""}`, 52, 32);
    }

    y = 46;
  }

  function sectionTitle(title: string) {
    if (y > ph - 40) { doc.addPage(); drawPageHeader(); }
    doc.setFillColor(...NAVY);
    doc.rect(m, y, contentW, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...GOLD);
    doc.text(title, m + 4, y + 6.5);
    y += 14;
  }

  function drawPageHeader() {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pw, 14, "F");
    doc.setFontSize(7);
    doc.setTextColor(...GOLD);
    doc.setFont("helvetica", "bold");
    doc.text("CADP — Campus Alternance Drôme Provence", m, 9);
    doc.setTextColor(...WHITE);
    doc.text("cadp.pro", pw - m, 9, { align: "right" });
    y = 22;
  }

  function checkSpace(needed: number) {
    if (y + needed > ph - 20) { doc.addPage(); drawPageHeader(); }
  }

  function drawFooter() {
    const fy = ph - 14;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(m, fy, pw - m, fy);
    doc.setFontSize(7);
    doc.setTextColor(...GRAY_MID);
    doc.setFont("helvetica", "normal");
    doc.text("Kévin Vidard — Directeur Général | 04 75 00 34 56 | contact@cadp.pro | cadp.pro | 2 Bd Frédéric Mistral, 26700 Pierrelatte", pw / 2, fy + 5, { align: "center" });
  }

  // ============================================================
  // PAGE 1
  // ============================================================
  drawHeader();

  // --- Section 1: Récapitulatif du besoin ---
  sectionTitle("Voici ce que vous nous avez décrit");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);

  if (secteur) {
    doc.setFont("helvetica", "bold");
    doc.text("Secteur d'activité : ", m, y);
    const sw = doc.getTextWidth("Secteur d'activité : ");
    doc.setFont("helvetica", "normal");
    doc.text(secteur.charAt(0).toUpperCase() + secteur.slice(1), m + sw, y);
    y += 6;
  }

  const allMissions = [...missionsComm, ...missionsAdmin, ...missionsSpec];
  if (allMissions.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Missions souhaitées :", m, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    allMissions.forEach((mKey) => {
      const label = missionLabels[mKey] || mKey;
      doc.text(`•  ${label}`, m + 4, y);
      y += 4.5;
    });
  }
  y += 4;

  // --- Section 2: Formations recommandées ---
  const top = results.slice(0, 2);
  top.forEach((r, idx) => {
    const f = r.formation;
    const key = f.key || r.key;

    checkSpace(55);
    sectionTitle(idx === 0 ? "Notre recommandation principale" : "Recommandation complémentaire");

    // Nom formation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text(`${f.name} — ${f.full}`, m, y);
    y += 5;

    // Niveau + durée
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text(`${f.niveau} | ${f.duree} en alternance | Rythme : ${rythmes[key] || "2j campus / 3j entreprise"}`, m, y);
    y += 7;

    // Description bénéfices
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    const benefitText = formationBenefits[key] || f.desc;
    const benefitLines = doc.splitTextToSize(benefitText, contentW);
    doc.text(benefitLines, m, y);
    y += benefitLines.length * 4.5 + 3;

    // Compétences clés
    checkSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...NAVY);
    doc.text("Ce que votre alternant saura faire :", m, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    (formationCompetences[key] || f.missions).forEach((comp) => {
      doc.text(`✓  ${comp}`, m + 4, y);
      y += 4.5;
    });
    y += 2;

    // Débouchés
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...NAVY);
    doc.text("Débouchés métiers : ", m, y);
    const dw = doc.getTextWidth("Débouchés métiers : ");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.text((debouches[key] || []).join(", "), m + dw, y);
    y += 8;
  });

  // --- Section 3: Comparatif coût ---
  checkSpace(65);
  sectionTitle("Combien ça coûte réellement ?");

  doc.setFontSize(8);
  doc.setTextColor(...GRAY_MID);
  doc.text(`Estimation sur ${sim.duree} mois | Tranche d'âge : ${sim.tranche} (${Math.round(sim.taux * 100)}% du SMIC) | SMIC brut mensuel : 1 823 €`, m, y);
  y += 7;

  // Tableau comparatif
  const colW = contentW / 3;
  const tableX = m;

  // En-tête tableau
  doc.setFillColor(...NAVY);
  doc.rect(tableX, y, contentW, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text("", tableX + 4, y + 5.5);
  doc.text("Alternant CADP", tableX + colW + 4, y + 5.5);
  doc.text("Salarié au SMIC", tableX + colW * 2 + 4, y + 5.5);
  y += 8;

  // Lignes du tableau
  const rows = [
    ["Rémunération brute", fmt(sim.brutApp), fmt(sim.brutCDI)],
    ["Charges employeur", fmt(sim.chargesApp), fmt(sim.chargesCDI)],
    ["Aide à l'embauche", `- ${fmt(sim.aide)}`, "—"],
    ["COÛT TOTAL", fmt(sim.coutNet), fmt(sim.coutCDI)],
  ];

  rows.forEach((row, i) => {
    const isLast = i === rows.length - 1;
    if (isLast) doc.setFillColor(...CREAM);
    else if (i % 2 === 0) doc.setFillColor(...WHITE);
    else doc.setFillColor(250, 248, 245);
    doc.rect(tableX, y, contentW, 7, "F");

    doc.setFont("helvetica", isLast ? "bold" : "normal");
    doc.setFontSize(isLast ? 9 : 8);
    if (isLast) doc.setTextColor(...NAVY); else doc.setTextColor(...GRAY);
    doc.text(row[0], tableX + 4, y + 5);
    doc.text(row[1], tableX + colW + 4, y + 5);
    doc.text(row[2], tableX + colW * 2 + 4, y + 5);
    y += 7;
  });

  // Économie mise en avant
  y += 3;
  doc.setFillColor(...GREEN);
  doc.roundedRect(m, y, contentW, 14, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...WHITE);
  doc.text(`Économie : ${fmt(sim.eco)}`, pw / 2, y + 7, { align: "center" });
  doc.setFontSize(9);
  doc.text(`soit ${Math.round(sim.ecoPct)}% d'économie sur ${sim.duree} mois`, pw / 2, y + 12, { align: "center" });
  y += 19;

  // Mention
  doc.setFontSize(7);
  doc.setTextColor(...GRAY_MID);
  doc.setFont("helvetica", "italic");
  const mention = "Estimation indicative basée sur le SMIC en vigueur. Un calcul personnalisé sera réalisé après prise de contact avec le CADP.";
  doc.text(mention, m, y);
  y += 8;

  // --- Section 4: Pourquoi le CADP ---
  checkSpace(50);
  sectionTitle("Pourquoi recruter via le CADP ?");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GRAY);

  const whyCadp = [
    ["Promos de 10-12 étudiants maximum", "Un suivi réel, pas un numéro dans une liste."],
    ["Formateurs en activité professionnelle", "Vos alternants apprennent les réalités du terrain."],
    ["Accompagnement de A à Z", "Alternance Dating, matching candidat-entreprise, suivi en poste."],
    ["20+ ans d'expérience des fondateurs", "Une expertise en formation et en insertion professionnelle."],
    ["CFA IFIR, certifié Qualiopi", "Garantie qualité reconnue par l'État."],
  ];

  whyCadp.forEach(([title, desc]) => {
    checkSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(`▸  ${title}`, m, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY_MID);
    doc.text(`    ${desc}`, m, y);
    y += 6;
  });

  y += 2;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("« On ne vous envoie pas juste un CV. On forme, on suit, on s'assure que ça fonctionne. »", m, y);
  y += 10;

  // --- Section 5: Prochaines étapes ---
  checkSpace(40);
  sectionTitle("Et maintenant ?");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);

  const steps = [
    ["1", "On vous recontacte sous 48h pour affiner votre besoin"],
    ["2", "On vous présente des profils de candidats compatibles"],
    ["3", "Rencontre lors d'un Alternance Dating ou en entretien individuel"],
    ["4", "Signature du contrat et démarrage de la formation"],
  ];

  steps.forEach(([num, text]) => {
    checkSpace(10);
    // Cercle numéroté
    doc.setFillColor(...GOLD);
    doc.circle(m + 4, y - 1, 3.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text(num, m + 2.8, y + 0.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.text(text, m + 12, y);
    y += 8;
  });

  // Footer sur toutes les pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter();
  }

  // Sauvegarde
  const filename = entreprise
    ? `CADP_Recommandation_${entreprise.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`
    : "CADP_Recommandation.pdf";
  doc.save(filename);
}
