// ============================================================
// Données du questionnaire entreprise — CADP
// Fidèle à questionnaire_entreprises_source.html
// ============================================================

export interface EntrepriseFormation {
  key: string;
  name: string;
  full: string;
  niveau: string;
  nc: number;
  duree: string;
  dm: number;
  desc: string;
  missions: string[];
}

export const entrepriseFormations: Record<string, EntrepriseFormation> = {
  gpme: {
    key: "gpme", name: "BTS GPME", full: "Gestion de la PME", niveau: "Bac+2", nc: 5,
    duree: "24 mois", dm: 24,
    desc: "Profil polyvalent : bras droit du dirigeant. Administration, gestion, RH, relation clients et fournisseurs.",
    missions: ["Gérer la relation clients et fournisseurs", "Assurer le suivi comptable et financier", "Participer à la gestion RH (contrats, paie, planning)", "Contribuer au développement commercial", "Organiser et planifier les activités de la PME"],
  },
  ndrc: {
    key: "ndrc", name: "BTS NDRC", full: "Négociation et Digitalisation de la Relation Client", niveau: "Bac+2", nc: 5,
    duree: "24 mois", dm: 24,
    desc: "Profil commercial terrain avec forte dimension digitale. Prospection, négociation, fidélisation.",
    missions: ["Prospecter et développer le portefeuille clients", "Négocier et conclure des ventes", "Animer la relation client digitale", "Fidéliser et développer les partenariats", "Analyser les performances commerciales"],
  },
  mco: {
    key: "mco", name: "BTS MCO", full: "Management Commercial Opérationnel", niveau: "Bac+2", nc: 5,
    duree: "24 mois", dm: 24,
    desc: "Profil manager de point de vente. Animation d'équipe, gestion de rayon, pilotage des résultats.",
    missions: ["Accueillir, conseiller et vendre", "Manager et animer l'équipe commerciale", "Gérer et mettre en valeur l'offre produits", "Analyser les indicateurs de performance", "Organiser les opérations commerciales"],
  },
  cg: {
    key: "cg", name: "BTS CG", full: "Comptabilité et Gestion", niveau: "Bac+2", nc: 5,
    duree: "24 mois", dm: 24,
    desc: "Profil comptable et gestionnaire. Saisie, déclarations fiscales, contrôle de gestion.",
    missions: ["Réaliser les opérations comptables courantes", "Établir et contrôler les déclarations fiscales", "Produire les états financiers", "Assurer le suivi de trésorerie", "Participer au contrôle de gestion"],
  },
  mos: {
    key: "mos", name: "BTS MOS", full: "Management Opérationnel de la Sécurité", niveau: "Bac+2", nc: 5,
    duree: "24 mois", dm: 24,
    desc: "Profil responsable sécurité et sûreté. Management d'équipe, gestion des risques, conformité.",
    missions: ["Manager les équipes de sécurité", "Piloter la qualité et la conformité", "Gérer les ressources humaines et le matériel", "Assurer la relation client et les reporting", "Analyser les risques et améliorer les processus"],
  },
  advf: {
    key: "advf", name: "TP ADVF", full: "Assistant(e) De Vie aux Familles", niveau: "Niveau 3 (CAP)", nc: 3,
    duree: "12 mois", dm: 12,
    desc: "Profil aide à domicile. Accompagnement personnes fragiles, garde d'enfants, entretien du cadre de vie.",
    missions: ["Accompagner les personnes dans les actes du quotidien", "Aider au maintien à domicile", "Assurer la garde et l'éveil des enfants", "Entretenir le domicile", "Préparer les repas"],
  },
};

export const entrepriseSecteurs = [
  { value: "commerce", label: "Commerce et Distribution", desc: "Magasins, grandes surfaces, boutiques, e-commerce" },
  { value: "medical", label: "Médical et Services à la personne", desc: "Aide à domicile, EHPAD, structures de soins" },
  { value: "banque", label: "Banque et Assurance", desc: "Agences bancaires, courtage, mutuelles" },
  { value: "services", label: "Services aux particuliers", desc: "Aide à domicile, garde d'enfants, ménage" },
  { value: "pme", label: "PME et Gestion", desc: "Administration, comptabilité, polyvalence" },
  { value: "industrie", label: "Industrie et Qualité", desc: "Production, qualité, QHSE, sécurité" },
  { value: "btp", label: "BTP et Construction", desc: "Bâtiment, travaux publics, immobilier" },
  { value: "hotellerie", label: "Hôtellerie et Restauration", desc: "Hôtels, restaurants, tourisme, événementiel" },
  { value: "transport", label: "Transport et Logistique", desc: "Transport routier, logistique, supply chain" },
  { value: "agri", label: "Agriculture et Agroalimentaire", desc: "Exploitations, coopératives, IAA" },
];

export const missionCommerciales = [
  { value: "vente", label: "Vente et conseil client", desc: "Accueil, conseil, conclusion des ventes" },
  { value: "prospection", label: "Prospection et développement", desc: "Trouver nouveaux clients, phoning, terrain" },
  { value: "negociation", label: "Négociation commerciale", desc: "Contrats, tarifs, appels d'offres" },
  { value: "digital", label: "Communication digitale", desc: "Réseaux sociaux, site web, e-commerce" },
  { value: "management", label: "Management d'équipe commerciale", desc: "Animation, encadrement, objectifs" },
];

export const missionAdministratives = [
  { value: "accueil", label: "Accueil et standard", desc: "Accueil physique/téléphonique, orientation" },
  { value: "secretariat", label: "Secrétariat et gestion documentaire", desc: "Rédaction, classement, courriers" },
  { value: "compta", label: "Comptabilité et facturation", desc: "Saisie comptable, factures, trésorerie, déclarations" },
  { value: "rh", label: "Gestion RH et paie", desc: "Contrats, plannings, paie, recrutement" },
  { value: "stock", label: "Gestion des stocks", desc: "Commandes, réception, inventaires, logistique" },
];

export const missionSpecifiques = [
  { value: "aide_personne", label: "Accompagnement de personnes", desc: "Aide quotidienne, maintien à domicile, garde enfants" },
  { value: "banque_conseil", label: "Conseil bancaire ou assurance", desc: "Produits financiers, crédit, patrimoine" },
  { value: "qhse", label: "Qualité, Sécurité, Environnement", desc: "Conformité, prévention, audits, QHSE" },
  { value: "rh_dev", label: "Développement RH et formation", desc: "GPEC, plan de formation, entretiens pro, QVT" },
];

// ============================================================
// Algorithme de scoring — fidèle à l'original
// ============================================================

export function calculateEntrepriseScores(
  secteur: string,
  missionsComm: string[],
  missionsAdmin: string[],
  missionsSpec: string[],
  niveaux: string[],
  samedi: string
): { key: string; formation: EntrepriseFormation; points: number }[] {
  const points: Record<string, number> = {};
  Object.keys(entrepriseFormations).forEach((k) => { points[k] = 0; });

  // 1. Secteur
  if (secteur === "commerce") { points.mco += 40; points.ndrc += 25; }
  else if (secteur === "medical") { points.advf += 50; }
  else if (secteur === "banque") { points.ndrc += 10; }
  else if (secteur === "services") { points.advf += 50; points.mos += 15; }
  else if (secteur === "pme") { points.gpme += 45; points.cg += 25; }
  else if (secteur === "industrie") { points.mos += 30; points.gpme += 15; }
  else if (secteur === "btp") { points.gpme += 30; points.mos += 20; }
  else if (secteur === "hotellerie") { points.mco += 40; points.ndrc += 20; }
  else if (secteur === "transport") { points.gpme += 25; points.mos += 25; }
  else if (secteur === "agri") { points.gpme += 35; points.cg += 20; }

  // 2. Missions commerciales
  missionsComm.forEach((v) => {
    if (v === "vente") { points.mco += 30; points.ndrc += 20; }
    else if (v === "prospection") { points.ndrc += 40; }
    else if (v === "negociation") { points.ndrc += 35; }
    else if (v === "digital") { points.ndrc += 30; points.mco += 10; }
    else if (v === "management") { points.mco += 35; points.mos += 30; }
  });

  // 3. Missions administratives
  missionsAdmin.forEach((v) => {
    if (v === "accueil") { points.gpme += 25; }
    else if (v === "secretariat") { points.gpme += 30; }
    else if (v === "compta") { points.cg += 50; points.gpme += 15; }
    else if (v === "rh") { points.gpme += 25; }
    else if (v === "stock") { points.mco += 20; }
  });

  // 4. Missions spécifiques
  missionsSpec.forEach((v) => {
    if (v === "aide_personne") points.advf += 55;
    else if (v === "qhse") { points.mos += 10; }
    else if (v === "rh_dev") { points.gpme += 5; }
  });

  // 5. Niveaux
  niveaux.forEach((v) => {
    if (v === "tp") { points.advf += 20; }
    else if (v === "bts") {
      Object.keys(entrepriseFormations).forEach((k) => {
        if (entrepriseFormations[k].nc === 5) points[k] += 12;
      });
    }
    else if (v === "indifferent") {
      Object.keys(entrepriseFormations).forEach((k) => { points[k] += 5; });
    }
  });

  // 6. Samedi
  if (samedi === "oui") { points.mco += 10; }

  return Object.entries(points)
    .map(([k, p]) => ({ key: k, formation: entrepriseFormations[k], points: p }))
    .filter((r) => r.points > 0)
    .sort((a, b) => b.points - a.points);
}

// Aide employeur
export function getAide(nc: number, effectif: string, rqth: boolean): number {
  if (rqth) return 6000;
  const grand = effectif === "250+";
  if (!grand) {
    if (nc <= 4) return 6000;
    if (nc === 5) return 4500;
    return 2000;
  } else {
    if (nc <= 4) return 2000;
    if (nc === 5) return 1500;
    return 750;
  }
}

// Simulateur de coût
export function simulateCost(age: number, formationType: string, effectif: string, rqth: boolean) {
  const SMIC_M = 1823.03;
  const H_AN = 1820;

  let taux: number, tranche: string;
  if (age < 18) { taux = 0.27; tranche = "16-17 ans"; }
  else if (age < 21) { taux = 0.43; tranche = "18-20 ans"; }
  else if (age < 26) { taux = 0.53; tranche = "21-25 ans"; }
  else { taux = 1.00; tranche = "26 ans et +"; }

  const [type, dureeStr] = formationType.split("-");
  const duree = parseInt(dureeStr);
  let nc: number;
  if (type === "tp") nc = 4;
  else if (type === "bts") nc = 5;
  else nc = 6;

  const aide = getAide(nc, effectif, rqth);
  const chTaux = (effectif === "250+" || effectif === "50-249") ? 0.077 : 0.016;
  const hFormAn = type === "bts" ? 675 : type === "bachelor" ? 600 : 450;
  const hEnt = (H_AN - hFormAn) * (duree / 12);

  const brutCDI = 12.02 * hEnt;
  const chargesCDI = brutCDI * 0.25;
  const coutCDI = brutCDI + chargesCDI;

  const brutMens = SMIC_M * taux;
  const brutApp = brutMens * duree;
  const chargesApp = brutApp * chTaux;
  const coutBrut = brutApp + chargesApp;
  const coutNet = coutBrut - aide;

  const eco = coutCDI - coutNet;
  const ecoPct = coutCDI > 0 ? (eco / coutCDI * 100) : 0;

  return {
    tranche, taux, brutMens, aide, hEnt, hFormAn, duree,
    brutCDI, chargesCDI, coutCDI,
    brutApp, chargesApp, coutBrut, coutNet,
    eco, ecoPct,
  };
}
