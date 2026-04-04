import type { RiasecQuestion, RiasecProfile } from "@/types/riasec";

export const riasecQuestions: RiasecQuestion[] = [
  {
    id: 1,
    optionA: { text: "Réparer un appareil en panne", dimension: "R" },
    optionB: { text: "Analyser des données chiffrées", dimension: "I" },
  },
  {
    id: 2,
    optionA: { text: "Créer un visuel pour les réseaux sociaux", dimension: "A" },
    optionB: { text: "Aider un camarade à réviser", dimension: "S" },
  },
  {
    id: 3,
    optionA: { text: "Convaincre un client d'acheter un produit", dimension: "E" },
    optionB: { text: "Classer et organiser des dossiers", dimension: "C" },
  },
  {
    id: 4,
    optionA: { text: "Installer un stand pour un salon professionnel", dimension: "R" },
    optionB: { text: "Imaginer une nouvelle campagne publicitaire", dimension: "A" },
  },
  {
    id: 5,
    optionA: { text: "Encadrer une équipe de vente", dimension: "E" },
    optionB: { text: "Accueillir et conseiller des visiteurs", dimension: "S" },
  },
  {
    id: 6,
    optionA: { text: "Créer un tableau de bord de suivi", dimension: "I" },
    optionB: { text: "Ranger et archiver des documents", dimension: "C" },
  },
  {
    id: 7,
    optionA: { text: "Gérer un stock de marchandises", dimension: "R" },
    optionB: { text: "Négocier un partenariat", dimension: "E" },
  },
  {
    id: 8,
    optionA: { text: "Rédiger un rapport détaillé", dimension: "I" },
    optionB: { text: "Animer un atelier de groupe", dimension: "S" },
  },
  {
    id: 9,
    optionA: { text: "Concevoir la vitrine d'un magasin", dimension: "A" },
    optionB: { text: "Vérifier des factures et devis", dimension: "C" },
  },
  {
    id: 10,
    optionA: { text: "Organiser un événement promotionnel", dimension: "E" },
    optionB: { text: "Résoudre un problème technique", dimension: "R" },
  },
  {
    id: 11,
    optionA: { text: "Écouter et rassurer un client mécontent", dimension: "S" },
    optionB: { text: "Élaborer un planning précis", dimension: "C" },
  },
  {
    id: 12,
    optionA: { text: "Proposer des idées innovantes", dimension: "A" },
    optionB: { text: "Étudier les tendances du marché", dimension: "I" },
  },
];

export const riasecProfiles: Record<string, RiasecProfile> = {
  R: {
    dimension: "R",
    name: "Réaliste",
    emoji: "🔧",
    description:
      "Tu es concret et pragmatique. Tu aimes les résultats visibles, le terrain et l'action. Organiser les opérations, encadrer des équipes sur le terrain, gérer des situations concrètes : c'est ton élément.",
    traits: ["Concret", "Pragmatique", "Organisé", "Efficace"],
    recommendedFormation: "bts-mos",
    formationName: "BTS MOS",
  },
  I: {
    dimension: "I",
    name: "Investigateur",
    emoji: "🔍",
    description:
      "Tu aimes comprendre, analyser et résoudre des problèmes. Les chiffres, les données et les tableaux de bord n'ont pas de secret pour toi. La comptabilité et la gestion financière sont ton terrain de jeu.",
    traits: ["Analytique", "Méthodique", "Curieux", "Rigoureux"],
    recommendedFormation: "bts-cg",
    formationName: "BTS CG",
  },
  A: {
    dimension: "A",
    name: "Artiste",
    emoji: "🎨",
    description:
      "Tu es créatif et tu sors des sentiers battus. Tu sais capter l'attention et raconter une histoire. Le marketing digital, la communication et la relation client créative te correspondent.",
    traits: ["Créatif", "Expressif", "Original", "Intuitif"],
    recommendedFormation: "bts-ndrc",
    formationName: "BTS NDRC",
  },
  S: {
    dimension: "S",
    name: "Social",
    emoji: "🤝",
    description:
      "Tu es à l'écoute des autres et tu aimes aider. La relation humaine est ton moteur. Accompagner les personnes, prendre soin d'elles, créer du lien : c'est naturel chez toi.",
    traits: ["Empathique", "Communicant", "Bienveillant", "Patient"],
    recommendedFormation: "tp-advf",
    formationName: "TP ADVF",
  },
  E: {
    dimension: "E",
    name: "Entreprenant",
    emoji: "🚀",
    description:
      "Tu es un leader né. Tu aimes convaincre, diriger et relever des défis. Manager une équipe, piloter un point de vente, développer le chiffre d'affaires : c'est fait pour toi.",
    traits: ["Ambitieux", "Persuasif", "Dynamique", "Déterminé"],
    recommendedFormation: "bts-mco",
    formationName: "BTS MCO",
  },
  C: {
    dimension: "C",
    name: "Conventionnel",
    emoji: "📋",
    description:
      "Tu es organisé et méthodique. Tu aimes que les choses soient bien faites, rangées et structurées. La gestion administrative, les RH et la coordination sont tes forces.",
    traits: ["Organisé", "Fiable", "Précis", "Structuré"],
    recommendedFormation: "bts-gpme",
    formationName: "BTS GPME",
  },
};
