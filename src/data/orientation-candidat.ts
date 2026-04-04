// ============================================================
// Données du questionnaire candidat RIASEC — CADP
// Fidèle à questionnaire_candidats_source.html
// ============================================================

export interface RiasecQ {
  dim: "R" | "I" | "A" | "S" | "E" | "C";
  text: string;
}

export const riasecQs: RiasecQ[] = [
  { dim: "R", text: "J'aime réparer des choses, bricoler, travailler avec mes mains" },
  { dim: "R", text: "Je préfère les activités physiques et concrètes plutôt que la théorie" },
  { dim: "I", text: "J'aime comprendre comment les choses fonctionnent, analyser des problèmes" },
  { dim: "I", text: "Je suis curieux(se), j'aime apprendre et faire des recherches" },
  { dim: "A", text: "J'aime créer, imaginer, innover et m'exprimer" },
  { dim: "A", text: "Je suis sensible à l'esthétique, au design, à la communication visuelle" },
  { dim: "S", text: "J'aime aider les autres, écouter, accompagner les personnes" },
  { dim: "S", text: "Je me sens à l'aise pour travailler en équipe et collaborer" },
  { dim: "E", text: "J'aime convaincre, négocier, prendre des initiatives" },
  { dim: "E", text: "Je me vois bien diriger un projet ou manager une équipe" },
  { dim: "C", text: "J'aime classer, organiser, suivre des procédures précises" },
  { dim: "C", text: "Je suis rigoureux(se) et j'apprécie le travail bien structuré" },
];

export const riasecDesc: Record<string, string> = {
  R: "Réaliste — Vous aimez les activités concrètes, manuelles et techniques.",
  I: "Investigateur — Vous aimez analyser, comprendre et résoudre des problèmes.",
  A: "Artistique — Vous aimez créer, innover et vous exprimer.",
  S: "Social — Vous aimez aider, accompagner et travailler avec les autres.",
  E: "Entreprenant — Vous aimez convaincre, diriger et prendre des initiatives.",
  C: "Conventionnel — Vous aimez organiser, structurer et suivre des méthodes.",
};

export const riasecColors: Record<string, string> = {
  R: "#E53935",
  I: "#1E88E5",
  A: "#8E24AA",
  S: "#43A047",
  E: "#FB8C00",
  C: "#5D4037",
};

export const riasecLabels: Record<string, string> = {
  R: "Réaliste",
  I: "Investigateur",
  A: "Artistique",
  S: "Social",
  E: "Entreprenant",
  C: "Conventionnel",
};

// ============================================================
// Formations — CADP + non-CADP
// ============================================================

export interface CandidatFormation {
  key: string;
  name: string;
  full: string;
  niv: string;
  duree: string;
  rythme: string;
  desc: string;
  debouches: string[];
  tags: string[];
  prereq: string[];
  riasec: Partial<Record<string, number>>;
  isCadp: boolean;
  slug?: string; // lien vers fiche formation CADP
}

export const candidatFormations: Record<string, CandidatFormation> = {
  // --- CADP ---
  gpme: {
    key: "gpme",
    name: "BTS GPME",
    full: "Gestion de la PME",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "2j campus / 3j entreprise",
    desc: "Formation polyvalente : bras droit du dirigeant. Gestion, administration, RH, commercial.",
    debouches: ["Assistant(e) de gestion", "Office manager", "Collaborateur de dirigeant", "Assistant(e) RH"],
    tags: ["Polyvalent", "PME", "Administratif"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { C: 5, E: 2, S: 2 },
    isCadp: true,
    slug: "bts-gpme",
  },
  ndrc: {
    key: "ndrc",
    name: "BTS NDRC",
    full: "Négociation et Digitalisation de la Relation Client",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "2j campus / 3j entreprise",
    desc: "Formation commerciale complète : prospection, négociation, relation client, digital.",
    debouches: ["Commercial(e) terrain", "Chargé(e) de clientèle", "Technico-commercial", "Responsable secteur"],
    tags: ["Commercial", "Négociation", "Digital"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { E: 5, S: 3, C: 2 },
    isCadp: true,
    slug: "bts-ndrc",
  },
  mco: {
    key: "mco",
    name: "BTS MCO",
    full: "Management Commercial Opérationnel",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "2j campus / 3j entreprise",
    desc: "Formation au management de point de vente : équipe, animation commerciale, résultats.",
    debouches: ["Manager de rayon", "Responsable adjoint", "Chef de secteur", "Directeur de magasin"],
    tags: ["Management", "Commerce", "Équipe"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { E: 4, S: 4, C: 2 },
    isCadp: true,
    slug: "bts-mco",
  },
  cg: {
    key: "cg",
    name: "BTS CG",
    full: "Comptabilité et Gestion",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "2j campus / 3j entreprise",
    desc: "Formation comptable : saisie, déclarations fiscales, contrôle de gestion, outils numériques.",
    debouches: ["Comptable", "Collaborateur d'expert-comptable", "Gestionnaire de paie", "Contrôleur de gestion junior"],
    tags: ["Comptabilité", "Chiffres", "Rigueur"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { C: 5, I: 3, R: 1 },
    isCadp: true,
    slug: "bts-cg",
  },
  mos: {
    key: "mos",
    name: "BTS MOS",
    full: "Management Opérationnel de la Sécurité",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "2j campus / 3j entreprise",
    desc: "Formation management sécurité et sûreté : équipes, risques, conformité réglementaire.",
    debouches: ["Chef de site sécurité", "Responsable sûreté", "Manager opérationnel", "Adjoint de direction sécurité"],
    tags: ["Sécurité", "Management", "Prévention"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { E: 3, C: 3, S: 3 },
    isCadp: true,
    slug: "bts-mos",
  },
  advf: {
    key: "advf",
    name: "TP ADVF",
    full: "Assistant(e) De Vie aux Familles",
    niv: "Niveau 3 (CAP)",
    duree: "12 mois",
    rythme: "Variable",
    desc: "Formation aide à domicile : accompagnement personnes fragiles, garde d'enfants, entretien.",
    debouches: ["Auxiliaire de vie", "Aide à domicile", "Garde d'enfants", "Agent en EHPAD"],
    tags: ["Social", "Aide", "Domicile"],
    prereq: ["aucun", "cap", "bac", "bac2", "bac3plus"],
    riasec: { S: 5, R: 2, C: 1 },
    isCadp: true,
    slug: "tp-advf",
  },

  // --- NON-CADP ---
  sio: {
    key: "sio",
    name: "BTS SIO",
    full: "Services Informatiques aux Organisations",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "Variable",
    desc: "Développement, cybersécurité, administration réseau. Pour les passionnés d'informatique.",
    debouches: ["Développeur", "Administrateur réseau", "Technicien support", "Analyste cybersécurité"],
    tags: ["Informatique", "Développement", "Réseau"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { I: 5, C: 3 },
    isCadp: false,
  },
  tourisme: {
    key: "tourisme",
    name: "BTS Tourisme",
    full: "Tourisme",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "Variable",
    desc: "Conception de voyages, accueil, promotion touristique. Pour les passionnés de découverte.",
    debouches: ["Agent de voyage", "Conseiller tourisme", "Chargé de promotion", "Réceptionniste"],
    tags: ["Tourisme", "Voyage", "Accueil"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { S: 4, E: 3 },
    isCadp: false,
  },
  communication: {
    key: "communication",
    name: "BTS Communication",
    full: "Communication",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "Variable",
    desc: "Stratégie de communication, événementiel, relations publiques. Pour les créatifs communicants.",
    debouches: ["Chargé de communication", "Community manager", "Attaché de presse", "Chef de projet événementiel"],
    tags: ["Communication", "Événementiel", "Créativité"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { A: 4, S: 3 },
    isCadp: false,
  },
  banque: {
    key: "banque",
    name: "BTS Banque",
    full: "Banque — Conseiller de clientèle",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "Variable",
    desc: "Conseil bancaire, gestion de portefeuille client. Pour les profils rigoureux et commerciaux.",
    debouches: ["Conseiller bancaire", "Chargé de clientèle", "Gestionnaire de patrimoine junior"],
    tags: ["Banque", "Finance", "Conseil"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { C: 4, E: 3 },
    isCadp: false,
  },
  aepe: {
    key: "aepe",
    name: "CAP AEPE",
    full: "Accompagnant Éducatif Petite Enfance",
    niv: "Niveau 3 (CAP)",
    duree: "12 mois",
    rythme: "Variable",
    desc: "Garde d'enfants, animation, éveil. Passerelle possible vers le TP ADVF proposé au CADP.",
    debouches: ["Agent de crèche", "Assistante maternelle", "ATSEM", "Garde d'enfants"],
    tags: ["Petite enfance", "Éveil", "Animation"],
    prereq: ["aucun", "cap", "bac", "bac2", "bac3plus"],
    riasec: { S: 5, A: 2 },
    isCadp: false,
  },
  gea: {
    key: "gea",
    name: "BUT GEA",
    full: "Gestion des Entreprises et des Administrations",
    niv: "Bac+3",
    duree: "36 mois",
    rythme: "Variable",
    desc: "Gestion, comptabilité, management, en 3 ans (Bac+3). Formation universitaire.",
    debouches: ["Contrôleur de gestion", "Gestionnaire comptable", "Assistant manager", "Responsable administratif"],
    tags: ["Gestion", "Université", "Bac+3"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { C: 4, I: 3 },
    isCadp: false,
  },
  esf: {
    key: "esf",
    name: "BTS ESF",
    full: "Économie Sociale et Familiale",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "Variable",
    desc: "Accompagnement social, budget, logement, insertion. Pour les profils sociaux et organisés.",
    debouches: ["Conseiller en économie sociale", "Animateur socio-éducatif", "Médiateur social"],
    tags: ["Social", "Insertion", "Accompagnement"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { S: 4, C: 3 },
    isCadp: false,
  },
  sp3s: {
    key: "sp3s",
    name: "BTS SP3S",
    full: "Services et Prestations des Secteurs Sanitaire et Social",
    niv: "Bac+2",
    duree: "24 mois",
    rythme: "Variable",
    desc: "Gestion administrative du secteur médico-social. Pour les profils sociaux et administratifs.",
    debouches: ["Gestionnaire en structure médicale", "Assistant de direction en EHPAD", "Coordonnateur de services"],
    tags: ["Médico-social", "Administration", "Santé"],
    prereq: ["bac", "bac2", "bac3plus"],
    riasec: { S: 3, C: 4 },
    isCadp: false,
  },
};

// Secteurs d'activité avec mapping formations
export const secteurs = [
  { value: "commerce", label: "Commerce et vente", desc: "Magasins, grandes surfaces, e-commerce" },
  { value: "banque", label: "Banque et assurance", desc: "Agences, courtage, conseil financier" },
  { value: "pme", label: "PME et gestion d'entreprise", desc: "Administration, comptabilité, polyvalence" },
  { value: "securite", label: "Sécurité et prévention", desc: "Sûreté, protection, gestion des risques" },
  { value: "rh", label: "Ressources humaines", desc: "Recrutement, formation, accompagnement" },
  { value: "aide", label: "Aide à la personne", desc: "Domicile, enfants, personnes âgées" },
  { value: "industrie", label: "Industrie et qualité", desc: "Production, qualité, QHSE" },
  { value: "btp", label: "BTP et Construction", desc: "Bâtiment, travaux publics, immobilier" },
  { value: "hotellerie", label: "Hôtellerie et Restauration", desc: "Hôtels, restaurants, tourisme" },
  { value: "transport", label: "Transport et Logistique", desc: "Transport routier, logistique, supply chain" },
];

export const sectMap: Record<string, string[]> = {
  commerce: ["mco", "ndrc"],
  banque: ["ndrc", "banque"],
  pme: ["gpme", "cg"],
  securite: ["mos"],
  rh: ["gpme"],
  aide: ["advf", "aepe", "esf", "sp3s"],
  industrie: ["mos"],
  btp: ["gpme", "mos"],
  hotellerie: ["mco", "ndrc"],
  transport: ["gpme", "mos"],
};

// ============================================================
// Algorithme de scoring — fidèle à l'original
// ============================================================

export interface ScoreResult {
  formation: CandidatFormation;
  points: number;
}

export function calculateScores(
  riasecScores: Record<string, number>,
  niveau: string,
  selectedSecteurs: string[],
  compOral: number,
  compChiffres: number,
  compOrga: number,
  compEcoute: number,
  duree: string,
  priorite: string
): ScoreResult[] {
  // Reset points
  const points: Record<string, number> = {};
  Object.keys(candidatFormations).forEach((k) => {
    points[k] = 0;
  });

  // 1. Niveau eligibility
  Object.keys(candidatFormations).forEach((k) => {
    const f = candidatFormations[k];
    if (f.prereq && !f.prereq.includes(niveau)) {
      points[k] -= 100;
    }
  });

  // 2. RIASEC matching (main scoring)
  Object.keys(candidatFormations).forEach((k) => {
    const f = candidatFormations[k];
    if (f.riasec) {
      Object.entries(f.riasec).forEach(([dim, weight]) => {
        points[k] += (riasecScores[dim] || 0) * (weight || 0);
      });
    }
  });

  // 3. Sector bonus (+20 per match)
  selectedSecteurs.forEach((s) => {
    if (sectMap[s]) {
      sectMap[s].forEach((fKey) => {
        if (points[fKey] !== undefined) {
          points[fKey] += 20;
        }
      });
    }
  });

  // 4. Competency bonuses
  if (compOral >= 4) {
    points.ndrc = (points.ndrc || 0) + 15;
    points.mco = (points.mco || 0) + 10;
    points.banque = (points.banque || 0) + 10;
  }
  if (compChiffres >= 4) {
    points.cg = (points.cg || 0) + 20;
    points.gpme = (points.gpme || 0) + 10;
  }
  if (compOrga >= 4) {
    points.gpme = (points.gpme || 0) + 15;
    points.cg = (points.cg || 0) + 10;
    points.mos = (points.mos || 0) + 10;
  }
  if (compEcoute >= 4) {
    points.advf = (points.advf || 0) + 20;
    points.mco = (points.mco || 0) + 5;
    points.aepe = (points.aepe || 0) + 15;
    points.esf = (points.esf || 0) + 10;
    points.sp3s = (points.sp3s || 0) + 10;
  }

  // 5. Duration bonus
  if (duree === "12") {
    Object.keys(candidatFormations).forEach((k) => {
      if (candidatFormations[k].duree === "12 mois") points[k] += 10;
    });
  } else if (duree === "24") {
    Object.keys(candidatFormations).forEach((k) => {
      if (candidatFormations[k].duree === "24 mois") points[k] += 10;
    });
  }

  // 6. Priority bonus
  if (priorite === "emploi") {
    points.ndrc = (points.ndrc || 0) + 8;
    points.advf = (points.advf || 0) + 8;
    points.mos = (points.mos || 0) + 8;
  } else if (priorite === "salaire") {
    points.ndrc = (points.ndrc || 0) + 8;
    points.cg = (points.cg || 0) + 5;
    points.banque = (points.banque || 0) + 10;
  } else if (priorite === "polyvalence") {
    points.gpme = (points.gpme || 0) + 12;
    points.mco = (points.mco || 0) + 8;
  }

  // Build sorted results, CADP first at equal score
  return Object.entries(points)
    .map(([k, p]) => ({ formation: candidatFormations[k], points: p }))
    .filter((r) => r.points > 0)
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (a.formation.isCadp !== b.formation.isCadp) return a.formation.isCadp ? -1 : 1;
      return 0;
    });
}
