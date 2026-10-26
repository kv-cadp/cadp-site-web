/**
 * Lien « Je candidate » des fiches : formulaire /candidater du site, formation
 * présélectionnée. La candidature est enregistrée dans CADP Connect, qui envoie
 * au candidat le lien d'accès à son espace (lib/preinscription/actions.ts).
 *
 * `source` est enregistré par l'appli en `url_source` : il dit quel bouton du
 * site a amené la candidature (ex. "site_fiche" pour l'appel final d'une fiche,
 * "site_fiche_hero", "site_fiche_barre").
 */
export function candidatureUrl(formationCode: string, source: string): string {
  return `/candidater?${new URLSearchParams({
    formation: formationCode,
    source,
  }).toString()}`;
}
