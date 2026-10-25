/**
 * Lien vers le formulaire d'inscription candidat de CADP Connect.
 *
 * `source` est enregistré par l'appli en `url_source` : il dit quel bouton du
 * site a amené la candidature (ex. "site_fiche" pour l'appel final d'une fiche,
 * "site_fiche_hero", "site_fiche_barre").
 */
export function inscriptionUrl(formationCode: string, source: string): string {
  return `https://app.cadp.pro/inscription?${new URLSearchParams({
    formation: formationCode,
    source,
  }).toString()}`;
}
