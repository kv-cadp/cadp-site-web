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

const fmt = (n: number) => {
  const rounded = Math.round(n);
  const str = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return str + " EUR";
};

// Descriptions orientées bénéfices employeur
const formationBenefits: Record<string, string> = {
  mco: "Votre alternant sera forme a accueillir, conseiller et fideliser vos clients, developper le chiffre d'affaires de votre point de vente, manager une equipe commerciale et piloter vos indicateurs de performance. Il deviendra rapidement autonome sur la gestion quotidienne de votre unite commerciale.",
  ndrc: "Votre alternant sera forme a prospecter de nouveaux clients, negocier et conclure des ventes, animer votre relation client digitale (reseaux sociaux, e-commerce) et developper des partenariats durables. Un profil commercial complet, operationnel des les premieres semaines.",
  gpme: "Votre alternant sera le bras droit polyvalent de votre direction : gestion administrative, suivi comptable, relation clients et fournisseurs, RH (contrats, paie, planning) et organisation des projets. Il prendra en charge les taches qui vous liberent du temps pour developper votre activite.",
  cg: "Votre alternant sera forme a la saisie comptable, aux declarations fiscales (TVA, IS), a l'etablissement des bulletins de paie, au suivi de tresorerie et a l'analyse financiere. Un profil rigoureux qui fiabilise votre gestion et vous prepare aux echeances comptables en toute serenite.",
  mos: "Votre alternant sera forme a manager vos equipes de securite, organiser les plannings et les rondes, gerer les incidents et assurer la conformite reglementaire. Un futur responsable operationnel capable de piloter la qualite de vos prestations de securite.",
  advf: "Votre collaborateur sera forme a l'accompagnement des personnes fragiles dans les gestes du quotidien : aide a la toilette, preparation des repas, entretien du domicile, garde d'enfants. Un professionnel bienveillant et qualifie pour intervenir a domicile en toute confiance.",
};

// Compétences reformulées en langage entreprise
const formationCompetences: Record<string, string[]> = {
  mco: [
    "Accueillir, conseiller et fideliser vos clients",
    "Animer et dynamiser votre offre commerciale",
    "Gerer les operations courantes (stocks, commandes, CA)",
    "Manager et motiver l'equipe de vente",
  ],
  ndrc: [
    "Prospecter et developper votre portefeuille clients",
    "Negocier et conclure des ventes en face-a-face ou a distance",
    "Animer votre presence digitale et vos reseaux sociaux",
    "Fideliser vos clients et developper des partenariats",
  ],
  gpme: [
    "Gerer la relation avec vos clients et fournisseurs",
    "Assurer le suivi administratif et comptable",
    "Participer a la gestion RH (paie, contrats, planning)",
    "Organiser et coordonner les projets de l'entreprise",
  ],
  cg: [
    "Realiser la saisie comptable et les rapprochements",
    "Preparer les declarations fiscales et sociales",
    "Produire les etats financiers et le suivi de tresorerie",
    "Contribuer au controle de gestion et aux previsions",
  ],
  mos: [
    "Manager les equipes de securite au quotidien",
    "Piloter la conformite et la prevention des risques",
    "Gerer les plannings, les ressources et le materiel",
    "Assurer la relation client et le reporting",
  ],
  advf: [
    "Accompagner les personnes dans les actes du quotidien",
    "Assurer l'entretien du domicile et la preparation des repas",
    "Prendre en charge la garde et l'eveil des enfants",
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
  prospection: "Prospection et developpement",
  negociation: "Negociation commerciale",
  digital: "Communication digitale",
  management: "Management d'equipe",
  accueil: "Accueil et standard",
  secretariat: "Secretariat et gestion documentaire",
  compta: "Comptabilite et facturation",
  rh: "Gestion RH et paie",
  stock: "Gestion des stocks",
  aide_personne: "Accompagnement de personnes",
  banque_conseil: "Conseil bancaire ou assurance",
  qhse: "Qualite, Securite, Environnement",
  rh_dev: "Developpement RH et formation",
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
    doc.text("Votre profil alternant personnalise", 52, 17);

    doc.setFontSize(9);
    doc.setTextColor(...WHITE);
    doc.text(`Resultat de votre diagnostic - ${today}`, 52, 25);

    if (entreprise) {
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(`${entreprise}${nom ? ` - ${prenom} ${nom}` : ""}${fonction ? ` (${fonction})` : ""}`, 52, 32);
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
    doc.text("CADP - Campus Alternance Drome Provence", m, 9);
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
    doc.text("Kevin Vidard - Directeur General | 04 75 00 34 56 | contact@cadp.pro | cadp.pro | 2 Bd Frederic Mistral, 26700 Pierrelatte", pw / 2, fy + 5, { align: "center" });
  }

  // ============================================================
  // PAGE 1
  // ============================================================
  drawHeader();

  // --- Section 1: Récapitulatif du besoin ---
  sectionTitle("Voici ce que vous nous avez decrit");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);

  if (secteur) {
    doc.setFont("helvetica", "bold");
    doc.text("Secteur d'activite : ", m, y);
    const sw = doc.getTextWidth("Secteur d'activité : ");
    doc.setFont("helvetica", "normal");
    doc.text(secteur.charAt(0).toUpperCase() + secteur.slice(1), m + sw, y);
    y += 6;
  }

  const allMissions = [...missionsComm, ...missionsAdmin, ...missionsSpec];
  if (allMissions.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Missions souhaitees :", m, y);
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
    sectionTitle(idx === 0 ? "Notre recommandation principale" : "Recommandation complementaire");

    // Nom formation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text(`${f.name} - ${f.full}`, m, y);
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
      doc.text(`-  ${comp}`, m + 4, y);
      y += 4.5;
    });
    y += 2;

    // Débouchés
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...NAVY);
    doc.text("Debouches metiers : ", m, y);
    const dw = doc.getTextWidth("Debouches metiers : ");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.text((debouches[key] || []).join(", "), m + dw, y);
    y += 8;
  });

  // --- Section 3: Comparatif coût ---
  checkSpace(65);
  sectionTitle("Combien ca coute reellement ?");

  doc.setFontSize(8);
  doc.setTextColor(...GRAY_MID);
  doc.text(`Estimation sur ${sim.duree} mois | Tranche d'age : ${sim.tranche} (${Math.round(sim.taux * 100)}% du SMIC) | SMIC brut mensuel : 1 823 EUR`, m, y);
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
    ["Remuneration brute", fmt(sim.brutApp), fmt(sim.brutCDI)],
    ["Charges employeur", fmt(sim.chargesApp), fmt(sim.chargesCDI)],
    ["Aide a l'embauche", `- ${fmt(sim.aide)}`, "-"],
    ["COUT TOTAL", fmt(sim.coutNet), fmt(sim.coutCDI)],
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
  doc.setFillColor(...NAVY);
  doc.roundedRect(m, y, contentW, 14, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...GOLD);
  doc.text(`Economie : ${fmt(sim.eco)}`, pw / 2, y + 7, { align: "center" });
  doc.setFontSize(9);
  doc.setTextColor(...WHITE);
  doc.text(`soit ${Math.round(sim.ecoPct)}% d'economie sur ${sim.duree} mois`, pw / 2, y + 12, { align: "center" });
  y += 19;

  // Mention
  doc.setFontSize(7);
  doc.setTextColor(...GRAY_MID);
  doc.setFont("helvetica", "italic");
  const mention = "Estimation indicative basee sur le SMIC en vigueur. Un calcul personnalise sera realise apres prise de contact avec le CADP.";
  doc.text(mention, m, y);
  y += 8;

  // --- Section 4: Pourquoi le CADP ---
  checkSpace(50);
  sectionTitle("Pourquoi recruter via le CADP ?");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GRAY);

  const whyCadp = [
    ["Promos de 10-12 etudiants maximum", "Un suivi reel, pas un numero dans une liste."],
    ["Formateurs en activite professionnelle", "Vos alternants apprennent les realites du terrain."],
    ["Accompagnement de A a Z", "Alternance Dating, matching candidat-entreprise, suivi en poste."],
    ["20+ ans d'experience des fondateurs", "Une expertise en formation et en insertion professionnelle."],
    ["CFA IFIR, certifie Qualiopi", "Garantie qualite reconnue par l'Etat."],
  ];

  whyCadp.forEach(([title, desc]) => {
    checkSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(`>  ${title}`, m, y);
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
  doc.text('" On ne vous envoie pas juste un CV. On forme, on suit, on s\'assure que ca fonctionne. "', m, y);
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
