import { z } from "zod";
import {
  PHONE_FR_REGEX,
  SIRET_REGEX,
} from "@/app/entreprises/alternance-dating/schema";

// Ajouter "BTS GTLA" pour la rentrée 2027
export const FORMATIONS_CONTRAT = [
  "BTS MCO",
  "BTS NDRC",
  "BTS GPME",
  "BTS CG",
  "BTS MOS",
  "TP ADVF",
  "Autre",
] as const;

export const OPCO_LIST = [
  "AFDAS",
  "AKTO",
  "ATLAS",
  "Constructys",
  "OCAPIAT",
  "OPCO 2i",
  "OPCO EP",
  "L'Opcommerce",
  "OPCO Mobilités",
  "OPCO Santé",
  "Uniformation",
  "Je ne sais pas",
] as const;

export const NIVEAUX_DIPLOME = [
  "Aucun diplôme",
  "Niveau 3 (CAP/BEP)",
  "Niveau 4 (Bac)",
  "Niveau 5 (Bac+2)",
  "Niveau 6 (Bac+3/4)",
  "Niveau 7 (Bac+5)",
  "Niveau 8 (Doctorat)",
] as const;

const DATE_ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const IDCC_REGEX = /^\d{1,4}$/;

export const infosContratSchema = z
  .object({
    apprenti_prenom: z
      .string()
      .trim()
      .min(1, "Le prénom de l'alternant(e) est requis")
      .max(100, "Prénom trop long (100 caractères max.)"),
    apprenti_nom: z
      .string()
      .trim()
      .min(1, "Le nom de l'alternant(e) est requis")
      .max(100, "Nom trop long (100 caractères max.)"),
    formation: z.enum(FORMATIONS_CONTRAT, { message: "Formation invalide" }),
    date_debut: z
      .string()
      .regex(DATE_ISO_REGEX, "Date de début invalide (format AAAA-MM-JJ)"),
    siret: z
      .string()
      .trim()
      .transform((v) => v.replace(/\s/g, ""))
      .refine(
        (v) => SIRET_REGEX.test(v),
        "Le SIRET doit contenir 14 chiffres",
      ),
    raison_sociale: z
      .string()
      .trim()
      .min(1, "La raison sociale est requise")
      .max(200, "Raison sociale trop longue (200 caractères max.)"),
    adresse_etablissement: z
      .string()
      .trim()
      .max(300, "Adresse trop longue (300 caractères max.)")
      .optional(),
    idcc_inconnu: z.boolean().default(false),
    idcc: z
      .string()
      .trim()
      .regex(IDCC_REGEX, "Le code IDCC doit contenir 1 à 4 chiffres")
      .optional(),
    opco: z.enum(OPCO_LIST, { message: "OPCO invalide" }),
    interlocuteur_nom: z
      .string()
      .trim()
      .min(1, "Le nom de l'interlocuteur est requis")
      .max(100, "Nom trop long (100 caractères max.)"),
    interlocuteur_prenom: z
      .string()
      .trim()
      .min(1, "Le prénom de l'interlocuteur est requis")
      .max(100, "Prénom trop long (100 caractères max.)"),
    interlocuteur_email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Email invalide"),
    interlocuteur_tel: z
      .string()
      .trim()
      .refine(
        (v) => PHONE_FR_REGEX.test(v),
        "Numéro de téléphone français invalide",
      ),
    ma_est_interlocuteur: z.boolean().default(false),
    // Champs MA toujours requis : le client recopie les valeurs de
    // l'interlocuteur si la case "le MA est l'interlocuteur" est cochée.
    ma_nom: z
      .string()
      .trim()
      .min(1, "Le nom du maître d'apprentissage est requis")
      .max(100, "Nom trop long (100 caractères max.)"),
    ma_prenom: z
      .string()
      .trim()
      .min(1, "Le prénom du maître d'apprentissage est requis")
      .max(100, "Prénom trop long (100 caractères max.)"),
    ma_email: z.string().trim().toLowerCase().email("Email invalide"),
    ma_tel: z
      .string()
      .trim()
      .refine(
        (v) => PHONE_FR_REGEX.test(v),
        "Numéro de téléphone français invalide",
      ),
    ma_date_naissance: z
      .string()
      .regex(DATE_ISO_REGEX, "Date de naissance invalide (format AAAA-MM-JJ)"),
    ma_poste: z
      .string()
      .trim()
      .min(1, "Le poste occupé est requis")
      .max(150, "Poste trop long (150 caractères max.)"),
    ma_diplome_niveau: z.enum(NIVEAUX_DIPLOME, {
      message: "Niveau de diplôme invalide",
    }),
    ma_diplome_intitule: z
      .string()
      .trim()
      .max(200, "Intitulé trop long (200 caractères max.)")
      .optional(),
    commentaire: z
      .string()
      .trim()
      .max(2000, "Commentaire trop long (2000 caractères max.)")
      .optional(),
    // Honeypot — aucune contrainte ici, traité dans l'action (B2)
    botcheck: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.idcc_inconnu && !data.idcc) {
      ctx.addIssue({
        code: "custom",
        path: ["idcc"],
        message:
          "Le code IDCC est requis (ou cochez « Je ne connais pas l'IDCC »)",
      });
    }
    if (
      data.ma_diplome_niveau !== "Aucun diplôme" &&
      (!data.ma_diplome_intitule || data.ma_diplome_intitule.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["ma_diplome_intitule"],
        message: "L'intitulé du diplôme du maître d'apprentissage est requis",
      });
    }
  });

export type InfosContratData = z.infer<typeof infosContratSchema>;
