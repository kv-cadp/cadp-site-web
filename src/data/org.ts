/**
 * Constantes organisationnelles partagées (CADP).
 *
 * Centralise les informations institutionnelles utilisées dans plusieurs
 * canaux (emails, mentions légales, JSON-LD Organization, footer, etc.).
 * Source unique de vérité pour éviter la dérive entre composants.
 */
export const CADP_ORG_NAME = "Campus Alternance Drôme Provence";
export const CADP_ORG_SHORT = "CADP";
export const CADP_CITY = "Pierrelatte";
export const CADP_POSTAL_CODE = "26700";
export const CADP_STREET = "2 Boulevard Frédéric Mistral";
export const CADP_REGION = "Drôme";

/**
 * Ligne d'adresse complète pour affichage inline (emails, signatures, etc.).
 * Format : "2 Boulevard Frédéric Mistral, 26700 Pierrelatte"
 */
export const CADP_ADDRESS_LINE = `${CADP_STREET}, ${CADP_POSTAL_CODE} ${CADP_CITY}`;

/**
 * Adresse complète avec entité organisationnelle pour usages emails/PDF.
 * Format : "CADP Pierrelatte — 2 Boulevard Frédéric Mistral, 26700 Pierrelatte"
 */
export const CADP_VENUE_LINE = `${CADP_ORG_SHORT} ${CADP_CITY} — ${CADP_ADDRESS_LINE}`;
