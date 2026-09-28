/**
 * Valeurs des champs à choix des formulaires d'Alternance Dating.
 * Sans dépendance : importable par les composants client.
 */

export const PERMIS_VALUES = ["oui", "en-cours", "non"] as const;
export type PermisValue = (typeof PERMIS_VALUES)[number];
export const PERMIS_LABELS: Record<PermisValue, string> = {
  oui: "Oui",
  "en-cours": "En cours",
  non: "Non",
};

export const VEHICULE_VALUES = ["oui", "non"] as const;
export type VehiculeValue = (typeof VEHICULE_VALUES)[number];
export const VEHICULE_LABELS: Record<VehiculeValue, string> = {
  oui: "Oui",
  non: "Non",
};

export const POSTES_VALUES = ["1", "2-3", "4-5", "6+"] as const;
export type PostesValue = (typeof POSTES_VALUES)[number];
export const POSTES_LABELS: Record<PostesValue, string> = {
  "1": "1",
  "2-3": "2 à 3",
  "4-5": "4 à 5",
  "6+": "6 ou plus",
};

export const PARTICIPANTS_VALUES = ["1", "2", "3+"] as const;
export type ParticipantsValue = (typeof PARTICIPANTS_VALUES)[number];
export const PARTICIPANTS_LABELS: Record<ParticipantsValue, string> = {
  "1": "1",
  "2": "2",
  "3+": "3 ou plus",
};

/** État renvoyé par les actions d'inscription au formulaire. */
export type DatingFormState = {
  ok: boolean;
  /** Erreurs par champ (premier message affiché). */
  errors?: Record<string, string[]>;
  /** Message global (erreur d'envoi, inscriptions closes, limiteur). */
  message?: string;
  /** Saisie renvoyée pour réafficher le formulaire après une erreur. */
  values?: Record<string, string>;
  /** Vrai si un e-mail de confirmation a été envoyé au déclarant. */
  confirmationSent?: boolean;
};

export const INITIAL_DATING_FORM_STATE: DatingFormState = { ok: false };
