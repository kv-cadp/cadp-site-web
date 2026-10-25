#!/usr/bin/env node
/**
 * Garde-fou de build : contenu périmé (F-SITE-SAISON-PERIMEE, 25/10/2026).
 *
 * Le site a vendu la rentrée de septembre 2026 deux mois après son passage
 * sans que personne ne le voie. Ce contrôle tourne avant `next build`.
 *
 * Erreur (build en échec) :
 * - la rentrée annoncée dans src/data/rentree.ts est passée (après le 30/09) ;
 * - un texte du site annonce une rentrée, une ouverture ou des pré-inscriptions
 *   pour une année dont la rentrée est passée. Le blog est exclu (articles datés).
 * Avertissement :
 * - la rentrée annoncée est en cours (septembre) : préparer la suivante ;
 * - aucun événement daté à venir dans la section « Prochains événements ».
 *
 * Date du jour : heure de Paris, ou CADP_TODAY=AAAA-MM-JJ pour tester.
 * Contournement d'urgence : CADP_SKIP_GARDE_FOUS=1.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
/** Articles datés : ils peuvent parler d'une rentrée passée. */
const EXCLUS = new Set(["src/data/blog.ts"]);

const today =
  process.env.CADP_TODAY ??
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());

/** Une saison est passée dès le 1er octobre de son année. */
const saisonPassee = (annee) => today > `${annee}-09-30`;

/** Formulations qui vendent une saison (pas « a ouvert », « promotion 2024-2026 »…). */
const ANNONCES = [
  /\brentr[ée]e\s+(?:de\s+)?(?:septembre\s+)?(20\d\d)\b/gi,
  /\b(?:ouvre|ouvrira|ouverture(?:\s+prévue)?)\b[^.\n<]{0,40}?\b(20\d\d)\b/gi,
  /\bpré-?inscriptions?\b[^.\n<]{0,60}?\b(20\d\d)\b/gi,
];

const erreurs = [];
const avertissements = [];

/** Contenu d'un fichier de src/, ou "" s'il n'existe pas (signalé en erreur). */
function lireSrc(rel) {
  const chemin = join(SRC, rel);
  if (existsSync(chemin)) return readFileSync(chemin, "utf8");
  erreurs.push(`src/${rel} : fichier introuvable.`);
  return "";
}

function fichiers(dir) {
  return readdirSync(dir).flatMap((nom) => {
    const chemin = join(dir, nom);
    if (statSync(chemin).isDirectory()) return fichiers(chemin);
    return /\.(ts|tsx)$/.test(nom) ? [chemin] : [];
  });
}

// 1. Saison annoncée (src/data/rentree.ts)
const rentreeSrc = lireSrc("data/rentree.ts");
const annee = Number(rentreeSrc.match(/\bannee:\s*(\d{4})/)?.[1]);
if (!rentreeSrc) {
  // déjà signalé par lireSrc
} else if (!annee) {
  erreurs.push("src/data/rentree.ts : année de rentrée introuvable (champ `annee`).");
} else if (saisonPassee(annee)) {
  erreurs.push(
    `src/data/rentree.ts : la rentrée annoncée (septembre ${annee}) est passée. ` +
      `Passer à ${annee + 1} (annee, formations).`,
  );
} else if (today >= `${annee}-09-01`) {
  avertissements.push(
    `src/data/rentree.ts : rentrée ${annee} en cours. Préparer le passage à ${annee + 1} avant le 30/09.`,
  );
}

// 2. Textes qui vendent une saison passée
for (const chemin of fichiers(SRC)) {
  const rel = relative(ROOT, chemin);
  if (EXCLUS.has(rel)) continue;
  readFileSync(chemin, "utf8")
    .split("\n")
    .forEach((ligne, i) => {
      const t = ligne.trim();
      if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("import ")) return;
      // Une seule erreur par ligne, même si plusieurs formulations s'y trouvent.
      const m = ANNONCES.flatMap((motif) => [...ligne.matchAll(motif)]).find((r) => saisonPassee(Number(r[1])));
      if (m) erreurs.push(`${rel}:${i + 1} : « ${m[0].trim()} » annonce une saison passée.`);
    });
}

// 3. Prochains événements de l'accueil (src/data/events.ts)
const eventsSrc = lireSrc("data/events.ts");
const aVenir = eventsSrc
  .split(/\bslug:/)
  .slice(1)
  .filter((bloc) => /publishedOnHome:\s*true/.test(bloc))
  .map((bloc) => bloc.match(/\bdate:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1])
  .filter((date) => date && date >= today);
if (aVenir.length === 0) {
  avertissements.push(
    "src/data/events.ts : aucun événement daté à venir ; l'accueil n'affiche que les événements permanents.",
  );
}

// Rapport
console.log(`Garde-fou fraîcheur (${today}) : rentrée annoncée ${annee || "?"}, ${aVenir.length} événement(s) daté(s) à venir.`);
for (const a of avertissements) console.warn(`  avertissement · ${a}`);
for (const e of erreurs) console.error(`  ERREUR · ${e}`);

if (erreurs.length > 0) {
  if (process.env.CADP_SKIP_GARDE_FOUS === "1") {
    console.warn(`  ${erreurs.length} erreur(s) ignorée(s) : CADP_SKIP_GARDE_FOUS=1.`);
  } else {
    console.error(`Garde-fou fraîcheur : ${erreurs.length} erreur(s), build arrêté.`);
    process.exit(1);
  }
}
