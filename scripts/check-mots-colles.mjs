#!/usr/bin/env node
/**
 * Garde-fou de build : mots collés dans le HTML généré
 * (F-SITE-JSX-ENTITE-ESPACE, 25/10/2026).
 *
 * Dans un texte JSX qui contient une entité (&apos;…), l'espace qui suit une
 * balise ou une expression {…} disparaît à la compilation :
 * « financée</strong>— Aucun », « 7<!-- -->formations ». Le source paraît
 * correct ; seul le HTML généré le montre. Correctif : {" "} explicite.
 *
 * Tourne après `next build`, sur .next/server/app (ou le dossier passé en
 * argument). Contournement d'urgence : CADP_SKIP_GARDE_FOUS=1.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIR = process.argv[2] ?? ".next/server/app";

/** Texte collé juste après une balise de mise en forme qui contient du texte. */
const APRES_BALISE =
  /([\p{L}\p{N}.,;:!?»%€)])(<\/(?:strong|em|b|i|a|span|code|mark|small)>)([\p{L}\p{N}«(—–])/gu;
/** Deux morceaux de texte React (séparés par <!-- -->) collés l'un à l'autre. */
const APRES_EXPRESSION = /([\p{L}\p{N}])<!-- -->(\p{L}+)/gu;
/** Suffixes qui suivent légitimement un nombre sans espace : 3e, 1er, 14h… */
const SUFFIXES = /^(?:e|er|re|ère|ème|es|h|x)$/i;

function pages(dir) {
  return readdirSync(dir).flatMap((nom) => {
    const chemin = join(dir, nom);
    if (statSync(chemin).isDirectory()) return pages(chemin);
    return nom.endsWith(".html") ? [chemin] : [];
  });
}

const INLINE = /^<\/?(?:strong|em|b|i|a|span|code|mark|small|!-- --)\b/;

/** Texte visible d'un morceau de HTML : balises de mise en forme retirées, blocs séparés. */
function texte(html) {
  return html
    .replace(/<!-- -->/g, "")
    .replace(/<[^>]*>/g, (balise) => (INLINE.test(balise) ? "" : " "))
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

/** Extrait du rapport : ~40 caractères avant la jonction ⟂, ~30 après. */
function contexte(html, jonction) {
  const avant = texte(html.slice(Math.max(0, jonction - 300), jonction)).slice(-40);
  const apres = texte(html.slice(jonction, jonction + 200)).slice(0, 30);
  return `${avant}⟂${apres}`;
}

if (!existsSync(DIR)) {
  console.error(`Garde-fou mots collés : ${DIR} introuvable (lancer après next build).`);
  process.exit(1);
}

const trouves = new Map();
for (const page of pages(DIR)) {
  const html = readFileSync(page, "utf8").replace(/<(script|style)\b[\s\S]*?<\/\1>/g, "");
  for (const m of html.matchAll(APRES_BALISE)) {
    const cle = contexte(html, m.index + m[1].length + m[2].length);
    if (!trouves.has(cle)) trouves.set(cle, relative(DIR, page));
  }
  for (const m of html.matchAll(APRES_EXPRESSION)) {
    if (SUFFIXES.test(m[2])) continue;
    const cle = contexte(html, m.index + m[1].length + "<!-- -->".length);
    if (!trouves.has(cle)) trouves.set(cle, relative(DIR, page));
  }
}

console.log(`Garde-fou mots collés : ${pages(DIR).length} page(s) contrôlée(s), ${trouves.size} jonction(s) suspecte(s).`);
for (const [cle, page] of trouves) console.error(`  ERREUR · ${page} : …${cle}…`);

if (trouves.size > 0) {
  if (process.env.CADP_SKIP_GARDE_FOUS === "1") {
    console.warn(`  ${trouves.size} erreur(s) ignorée(s) : CADP_SKIP_GARDE_FOUS=1.`);
  } else {
    console.error('Garde-fou mots collés : ajouter {" "} après la balise ou l\'expression concernée. Build arrêté.');
    process.exit(1);
  }
}
