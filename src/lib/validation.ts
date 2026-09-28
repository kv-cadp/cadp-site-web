/**
 * Motifs de validation partagés par les formulaires du site.
 * (Déplacés depuis l'ancien formulaire dating, 28/09/2026.)
 */

/** Téléphone français : 0X XX XX XX XX ou +33 X XX XX XX XX, séparateurs libres. */
export const PHONE_FR_REGEX = /^(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/;

/** SIRET : 14 chiffres, espaces retirés au préalable. */
export const SIRET_REGEX = /^\d{14}$/;

/**
 * Forme canonique d'un téléphone français, pour comparer deux saisies.
 * Ex : "+33 6 12 34 56 78", "0033 6 12 34 56 78" ou "+33 (0)6 12 34 56 78"
 * → "0612345678".
 */
export function normalizePhoneFr(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00330") && digits.length === 14) return `0${digits.slice(5)}`;
  if (digits.startsWith("0033") && digits.length === 13) return `0${digits.slice(4)}`;
  if (digits.startsWith("330") && digits.length === 12) return `0${digits.slice(3)}`;
  if (digits.startsWith("33") && digits.length === 11) return `0${digits.slice(2)}`;
  return digits;
}

/**
 * Téléphone français saisi librement (espaces, points, tirets, +33 ou
 * 0033 avec ou sans espace) : valide s'il donne 10 chiffres commençant
 * par 0 puis 1 à 9.
 */
export function isPhoneFr(phone: string): boolean {
  const cleaned = phone.replace(/[\s.\-()]/g, "");
  if (!/^(?:\+33|0033|0)\d+$/.test(cleaned)) return false;
  return /^0[1-9]\d{8}$/.test(normalizePhoneFr(cleaned));
}

/** Affichage lisible d'un téléphone français valide. Ex : "06 12 34 56 78". */
export function formatPhoneFr(phone: string): string {
  return normalizePhoneFr(phone).replace(/(\d{2})(?=\d)/g, "$1 ");
}
