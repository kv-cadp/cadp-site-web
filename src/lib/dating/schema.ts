import { z } from "zod";
import { SIRET_REGEX, formatPhoneFr, isPhoneFr } from "@/lib/validation";
import {
  PARTICIPANTS_VALUES,
  PERMIS_VALUES,
  POSTES_VALUES,
  VEHICULE_VALUES,
} from "./options";

/** Chaîne vide ou absente → undefined, pour les champs facultatifs. */
function emptyToUndefined(value: unknown): unknown {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

function requiredText(message: string, max: number) {
  return z
    .string()
    .trim()
    .min(1, message)
    .max(max, `${max} caractères maximum`);
}

const eventSlug = z.string().trim().min(1).max(120);

/**
 * Prénom et nom : lettres (alphabet latin, accents compris), espaces,
 * tirets et apostrophes. Ces champs sont repris dans l'e-mail de
 * confirmation envoyé à l'adresse saisie : aucun lien ni texte libre ne
 * doit pouvoir y passer.
 */
const NAME_CHARS = "A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u024F\\u1E00-\\u1EFF";
const NAME_REGEX = new RegExp(`^[${NAME_CHARS}][${NAME_CHARS}\\s'’-]*$`);

function personName(message: string) {
  return requiredText(message, 60).regex(
    NAME_REGEX,
    "Lettres, espaces, tirets et apostrophes uniquement",
  );
}

const telephone = z
  .string()
  .trim()
  .min(1, "Indiquez votre numéro de téléphone")
  .refine(
    isPhoneFr,
    "Numéro de téléphone invalide : 10 chiffres, par exemple 06 12 34 56 78",
  )
  .transform(formatPhoneFr);

const emailFormat = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Adresse e-mail trop longue")
  .pipe(z.email("Adresse e-mail invalide"));

const consentement = z.literal(true, {
  error: "Cochez cette case pour valider l'envoi",
});

export const DatingCandidatSchema = z.object({
  eventSlug,
  prenom: personName("Indiquez votre prénom"),
  nom: personName("Indiquez votre nom"),
  telephone,
  email: z.preprocess(emptyToUndefined, emailFormat.optional()),
  commune: requiredText("Indiquez votre commune", 80),
  permis: z.enum(PERMIS_VALUES, { error: "Indiquez si vous avez le permis B" }),
  vehicule: z.enum(VEHICULE_VALUES, {
    error: "Indiquez si vous avez un véhicule",
  }),
  consentement,
});

export type DatingCandidatInput = z.output<typeof DatingCandidatSchema>;

export const DatingEmployeurSchema = z.object({
  eventSlug,
  entreprise: requiredText("Indiquez le nom de votre structure", 120),
  prenom: personName("Indiquez votre prénom"),
  nom: personName("Indiquez votre nom"),
  fonction: requiredText("Indiquez votre fonction", 80),
  email: z.string().trim().min(1, "Indiquez votre adresse e-mail").pipe(emailFormat),
  telephone,
  nbPostes: z.enum(POSTES_VALUES, { error: "Indiquez le nombre de postes" }),
  nbParticipants: z.enum(PARTICIPANTS_VALUES, {
    error: "Indiquez le nombre de personnes présentes",
  }),
  siret: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .transform((v) => v.replace(/\s/g, ""))
      .refine((v) => SIRET_REGEX.test(v), "Le SIRET compte 14 chiffres")
      .optional(),
  ),
  // Sauts de ligne CRLF ramenés à LF : le navigateur compte 1 caractère
  // par saut de ligne (maxLength), l'envoi en transmet 2.
  commentaire: z.preprocess(
    (value) =>
      typeof value === "string"
        ? emptyToUndefined(value.replace(/\r\n?/g, "\n"))
        : value,
    z.string().trim().max(2000, "2000 caractères maximum").optional(),
  ),
  consentement,
});

export type DatingEmployeurInput = z.output<typeof DatingEmployeurSchema>;
