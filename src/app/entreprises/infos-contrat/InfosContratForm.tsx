"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import {
  PHONE_FR_REGEX,
  SIRET_REGEX,
} from "@/app/entreprises/alternance-dating/schema";
import { lookupSiret, submitInfosContrat } from "./actions";
import { FORMATIONS_CONTRAT, NIVEAUX_DIPLOME, OPCO_LIST } from "./schema";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDCC_REGEX = /^\d{1,4}$/;

const RGPD_NOTICE =
  "Les informations recueillies via ce formulaire sont transmises par e-mail au Campus Alternance Drôme Provence (CADP) et à son CFA partenaire IFIR, aux seules fins d'établissement et de gestion du contrat d'apprentissage de l'alternant(e) concerné(e) (article 6.1.b du RGPD — mesures précontractuelles et exécution du contrat). Elles ne sont pas conservées sur ce site. Elles sont conservées par le CADP et le CFA IFIR pendant la durée du contrat et les durées légales applicables. Vous disposez de droits d'accès, de rectification, d'effacement et de limitation, à exercer auprès de dpo@cadp.pro.";

type FormValues = {
  apprenti_prenom: string;
  apprenti_nom: string;
  formation: string;
  date_debut: string;
  date_fin: string;
  siret: string;
  raison_sociale: string;
  adresse_etablissement: string;
  idcc_inconnu: boolean;
  idcc: string;
  opco: string;
  interlocuteur_nom: string;
  interlocuteur_prenom: string;
  interlocuteur_email: string;
  interlocuteur_tel: string;
  ma_est_interlocuteur: boolean;
  ma_nom: string;
  ma_prenom: string;
  ma_email: string;
  ma_tel: string;
  ma_date_naissance: string;
  ma_poste: string;
  ma_diplome_niveau: string;
  ma_diplome_intitule: string;
  commentaire: string;
};

const initialValues: FormValues = {
  apprenti_prenom: "",
  apprenti_nom: "",
  formation: "",
  date_debut: "",
  date_fin: "",
  siret: "",
  raison_sociale: "",
  adresse_etablissement: "",
  idcc_inconnu: false,
  idcc: "",
  opco: "",
  interlocuteur_nom: "",
  interlocuteur_prenom: "",
  interlocuteur_email: "",
  interlocuteur_tel: "",
  ma_est_interlocuteur: false,
  ma_nom: "",
  ma_prenom: "",
  ma_email: "",
  ma_tel: "",
  ma_date_naissance: "",
  ma_poste: "",
  ma_diplome_niveau: "",
  ma_diplome_intitule: "",
  commentaire: "",
};

// Recopie LIVE interlocuteur -> MA quand la case "même personne" est cochée
const INTERLOCUTEUR_TO_MA: Partial<Record<keyof FormValues, keyof FormValues>> =
  {
    interlocuteur_nom: "ma_nom",
    interlocuteur_prenom: "ma_prenom",
    interlocuteur_email: "ma_email",
    interlocuteur_tel: "ma_tel",
  };

const FIELD_ORDER = [
  "apprenti_prenom",
  "apprenti_nom",
  "formation",
  "date_debut",
  "date_fin",
  "siret",
  "raison_sociale",
  "adresse_etablissement",
  "idcc",
  "opco",
  "interlocuteur_nom",
  "interlocuteur_prenom",
  "interlocuteur_email",
  "interlocuteur_tel",
  "ma_nom",
  "ma_prenom",
  "ma_email",
  "ma_tel",
  "ma_date_naissance",
  "ma_poste",
  "ma_diplome_niveau",
  "ma_diplome_intitule",
  "commentaire",
] as const;

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
    hasError ? "border-error" : "border-gray-200"
  }`;

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return (
    <p id={id} className="text-error text-xs mt-1" role="alert">
      {errors[0]}
    </p>
  );
}

function HelpText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-xs text-gray-mid mt-1.5">
      {children}
    </p>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-[#B45309] mt-1">{children}</p>;
}

// Clé de Luhn sur les 14 chiffres du SIRET — purement indicatif (non bloquant)
function luhnValid(digits: string): boolean {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

function isMobileFr(tel: string): boolean {
  const t = tel.replace(/[\s.-]/g, "");
  return /^(?:06|07|\+336|\+337)/.test(t);
}

function ageFromIsoDate(iso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const birth = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

type SiretLookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; raisonSociale: string; adresse: string | null }
  | { status: "error" };

export default function InfosContratForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    prenom: string;
    nom: string;
    email: string;
  } | null>(null);
  const [siretLookup, setSiretLookup] = useState<SiretLookupState>({
    status: "idle",
  });
  const [pending, startTransition] = useTransition();
  const honeypotId = useId();
  const botcheckRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (success) {
      // La confirmation doit être visible sans scroller
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [success]);

  // Retire l'erreur d'un champ dès que l'utilisateur le modifie,
  // sans toucher aux erreurs des autres champs.
  function clearError(key: string) {
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function setField(key: keyof FormValues, value: string) {
    clearError(key);
    setValues((v) => {
      const next = { ...v, [key]: value };
      const maKey = INTERLOCUTEUR_TO_MA[key];
      if (v.ma_est_interlocuteur && maKey) {
        return { ...next, [maKey]: value };
      }
      return next;
    });
  }

  function handleMaToggle(checked: boolean) {
    clearError("ma_nom");
    clearError("ma_prenom");
    clearError("ma_email");
    clearError("ma_tel");
    setValues((v) =>
      checked
        ? {
            ...v,
            ma_est_interlocuteur: true,
            ma_nom: v.interlocuteur_nom,
            ma_prenom: v.interlocuteur_prenom,
            ma_email: v.interlocuteur_email,
            ma_tel: v.interlocuteur_tel,
          }
        : { ...v, ma_est_interlocuteur: false },
    );
  }

  function handleIdccInconnuToggle(checked: boolean) {
    clearError("idcc");
    setValues((v) => ({
      ...v,
      idcc_inconnu: checked,
      idcc: checked ? "" : v.idcc,
    }));
  }

  function handleDiplomeNiveauChange(niveau: string) {
    clearError("ma_diplome_niveau");
    if (niveau === "Aucun diplôme") {
      clearError("ma_diplome_intitule");
    }
    setValues((v) => ({
      ...v,
      ma_diplome_niveau: niveau,
      ma_diplome_intitule:
        niveau === "Aucun diplôme" ? "" : v.ma_diplome_intitule,
    }));
  }

  const siretDigits = values.siret.replace(/\s/g, "");
  const siretIsComplete = SIRET_REGEX.test(siretDigits);

  async function handleVerifySiret() {
    setSiretLookup({ status: "loading" });
    const result = await lookupSiret(values.siret);
    if (result.ok) {
      setSiretLookup({
        status: "ok",
        raisonSociale: result.raisonSociale,
        adresse: result.adresse,
      });
      setValues((v) => ({
        ...v,
        raison_sociale: result.raisonSociale,
        adresse_etablissement: result.adresse ?? v.adresse_etablissement,
      }));
    } else {
      setSiretLookup({ status: "error" });
    }
  }

  function validate(): Record<string, string[]> {
    const errs: Record<string, string[]> = {};
    const add = (key: string, message: string) => {
      errs[key] = [message];
    };

    if (!values.apprenti_prenom.trim())
      add("apprenti_prenom", "Le prénom de l'alternant(e) est requis");
    if (!values.apprenti_nom.trim())
      add("apprenti_nom", "Le nom de l'alternant(e) est requis");
    if (!values.formation) add("formation", "Sélectionnez une formation");
    if (!values.date_debut)
      add("date_debut", "La date de début souhaitée est requise");
    if (!values.date_fin)
      add("date_fin", "La date de fin souhaitée est requise");
    // Chaînes ISO AAAA-MM-JJ : la comparaison lexicographique suit l'ordre
    // chronologique.
    if (
      values.date_debut &&
      values.date_fin &&
      values.date_fin <= values.date_debut
    )
      add(
        "date_fin",
        "La date de fin doit être postérieure à la date de début",
      );

    if (!siretIsComplete)
      add("siret", "Le SIRET doit contenir 14 chiffres");
    if (!values.raison_sociale.trim())
      add("raison_sociale", "La raison sociale est requise");
    if (!values.idcc_inconnu && !IDCC_REGEX.test(values.idcc.trim()))
      add(
        "idcc",
        "Le code IDCC doit contenir 1 à 4 chiffres (ou cochez « Je ne connais pas mon code IDCC »)",
      );
    if (!values.opco) add("opco", "Sélectionnez un OPCO");

    if (!values.interlocuteur_nom.trim())
      add("interlocuteur_nom", "Le nom de l'interlocuteur est requis");
    if (!values.interlocuteur_prenom.trim())
      add("interlocuteur_prenom", "Le prénom de l'interlocuteur est requis");
    if (!EMAIL_REGEX.test(values.interlocuteur_email.trim()))
      add("interlocuteur_email", "Email invalide");
    if (!PHONE_FR_REGEX.test(values.interlocuteur_tel.trim()))
      add("interlocuteur_tel", "Numéro de téléphone français invalide");

    // Si MA = interlocuteur, les 4 champs MA reçoivent les valeurs de
    // l'interlocuteur déjà validées ci-dessus.
    if (!values.ma_est_interlocuteur) {
      if (!values.ma_nom.trim())
        add("ma_nom", "Le nom du maître d'apprentissage est requis");
      if (!values.ma_prenom.trim())
        add("ma_prenom", "Le prénom du maître d'apprentissage est requis");
      if (!EMAIL_REGEX.test(values.ma_email.trim()))
        add("ma_email", "Email invalide");
      if (!PHONE_FR_REGEX.test(values.ma_tel.trim()))
        add("ma_tel", "Numéro de téléphone français invalide");
    }
    if (!values.ma_date_naissance)
      add("ma_date_naissance", "La date de naissance est requise");
    if (!values.ma_poste.trim()) add("ma_poste", "Le poste occupé est requis");
    if (!values.ma_diplome_niveau)
      add("ma_diplome_niveau", "Sélectionnez un niveau de diplôme");
    if (
      values.ma_diplome_niveau &&
      values.ma_diplome_niveau !== "Aucun diplôme" &&
      !values.ma_diplome_intitule.trim()
    )
      add("ma_diplome_intitule", "L'intitulé du diplôme est requis");

    return errs;
  }

  function focusFirstError(errs: Record<string, string[]>) {
    const firstKey = FIELD_ORDER.find((key) => errs[key]);
    if (!firstKey) return;
    const el = document.getElementById(firstKey);
    el?.focus();
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function buildPayload() {
    const maEst = values.ma_est_interlocuteur;
    return {
      apprenti_prenom: values.apprenti_prenom,
      apprenti_nom: values.apprenti_nom,
      formation: values.formation,
      date_debut: values.date_debut,
      date_fin: values.date_fin,
      siret: values.siret,
      raison_sociale: values.raison_sociale,
      adresse_etablissement: values.adresse_etablissement,
      idcc_inconnu: values.idcc_inconnu,
      ...(values.idcc_inconnu ? {} : { idcc: values.idcc.trim() }),
      opco: values.opco,
      interlocuteur_nom: values.interlocuteur_nom,
      interlocuteur_prenom: values.interlocuteur_prenom,
      interlocuteur_email: values.interlocuteur_email,
      interlocuteur_tel: values.interlocuteur_tel,
      ma_est_interlocuteur: maEst,
      ma_nom: maEst ? values.interlocuteur_nom : values.ma_nom,
      ma_prenom: maEst ? values.interlocuteur_prenom : values.ma_prenom,
      ma_email: maEst ? values.interlocuteur_email : values.ma_email,
      ma_tel: maEst ? values.interlocuteur_tel : values.ma_tel,
      ma_date_naissance: values.ma_date_naissance,
      ma_poste: values.ma_poste,
      ma_diplome_niveau: values.ma_diplome_niveau,
      ma_diplome_intitule: values.ma_diplome_intitule,
      commentaire: values.commentaire,
      botcheck: botcheckRef.current?.value ?? "",
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setErrors({});
    const payload = buildPayload();
    startTransition(async () => {
      const result = await submitInfosContrat(payload);
      if (result.ok) {
        setSuccess({
          prenom: values.apprenti_prenom,
          nom: values.apprenti_nom,
          email: values.interlocuteur_email,
        });
      } else {
        setServerError(result.error);
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
          focusFirstError(result.fieldErrors);
        }
      }
    });
  }

  const err = errors;
  const describedBy = (key: string, helpId?: string) => {
    const ids = [helpId, err[key] ? `err-${key}` : undefined].filter(Boolean);
    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  // Avertissements non bloquants
  const siretWarning = siretIsComplete && !luhnValid(siretDigits);
  const interlocuteurTelWarning =
    PHONE_FR_REGEX.test(values.interlocuteur_tel.trim()) &&
    !isMobileFr(values.interlocuteur_tel.trim());
  const maTelWarning =
    !values.ma_est_interlocuteur &&
    PHONE_FR_REGEX.test(values.ma_tel.trim()) &&
    !isMobileFr(values.ma_tel.trim());
  const maAge = ageFromIsoDate(values.ma_date_naissance);
  const maAgeWarning = maAge !== null && (maAge < 18 || maAge > 70);

  const intituleDisabled = values.ma_diplome_niveau === "Aucun diplôme";

  if (success) {
    return (
      <div
        ref={successRef}
        className="bg-[#E8F5E9] border border-[#2E7D4F]/20 rounded-xl p-8 text-center scroll-mt-24"
      >
        <div className="size-14 rounded-full bg-[#2E7D4F]/10 inline-flex items-center justify-center mb-4">
          <svg
            className="size-7 text-[#2E7D4F]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-navy-deep mb-3">
          C&apos;est transmis !
        </h3>
        <p className="text-[#2E7D4F] font-medium mb-2">
          {`Les informations ont été envoyées à notre CFA pour l'établissement du contrat de ${success.prenom} ${success.nom}.`}
        </p>
        <p className="text-gray-mid text-sm mb-1">
          {`Vous allez recevoir un email récapitulatif à ${success.email}.`}
        </p>
        <p className="text-gray-mid text-sm">
          Nous reviendrons vers vous pour la suite (fiche mission).
        </p>
        <p className="text-gray-mid text-xs mt-4">
          Une question ?{" "}
          <a
            href="mailto:contact@cadp.pro"
            className="text-gold font-semibold hover:text-gold-light"
          >
            contact@cadp.pro
          </a>{" "}
          —{" "}
          <a
            href="tel:+33475003456"
            className="text-gold font-semibold hover:text-gold-light"
          >
            04 75 00 34 56
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot — hors viewport, ignoré des lecteurs d'écran */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor={honeypotId}>Ne pas remplir</label>
        <input
          ref={botcheckRef}
          id={honeypotId}
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* GROUP — Alternant(e) */}
      <fieldset className="space-y-5">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Alternant(e) concerné(e)
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="apprenti_prenom"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Prénom <span className="text-gold">*</span>
            </label>
            <input
              id="apprenti_prenom"
              type="text"
              value={values.apprenti_prenom}
              onChange={(e) => setField("apprenti_prenom", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.apprenti_prenom}
              aria-describedby={describedBy("apprenti_prenom")}
              className={inputClass(!!err.apprenti_prenom)}
              placeholder="Prénom"
            />
            <FieldError id="err-apprenti_prenom" errors={err.apprenti_prenom} />
          </div>
          <div>
            <label
              htmlFor="apprenti_nom"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Nom <span className="text-gold">*</span>
            </label>
            <input
              id="apprenti_nom"
              type="text"
              value={values.apprenti_nom}
              onChange={(e) => setField("apprenti_nom", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.apprenti_nom}
              aria-describedby={describedBy("apprenti_nom")}
              className={inputClass(!!err.apprenti_nom)}
              placeholder="Nom"
            />
            <FieldError id="err-apprenti_nom" errors={err.apprenti_nom} />
          </div>
        </div>

        <div>
          <label
            htmlFor="formation"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Formation <span className="text-gold">*</span>
          </label>
          <select
            id="formation"
            value={values.formation}
            onChange={(e) => setField("formation", e.target.value)}
            aria-required="true"
            aria-invalid={!!err.formation}
            aria-describedby={describedBy("formation")}
            className={inputClass(!!err.formation)}
          >
            <option value="">— Sélectionnez —</option>
            {FORMATIONS_CONTRAT.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <FieldError id="err-formation" errors={err.formation} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="date_debut"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Date de début souhaitée <span className="text-gold">*</span>
            </label>
            <input
              id="date_debut"
              type="date"
              value={values.date_debut}
              onChange={(e) => setField("date_debut", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.date_debut}
              aria-describedby={describedBy("date_debut", "help-date_debut")}
              className={inputClass(!!err.date_debut)}
            />
            <HelpText id="help-date_debut">
              Au plus tôt 3 mois avant l&apos;entrée en formation.
            </HelpText>
            <FieldError id="err-date_debut" errors={err.date_debut} />
          </div>
          <div>
            <label
              htmlFor="date_fin"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Date de fin souhaitée <span className="text-gold">*</span>
            </label>
            <input
              id="date_fin"
              type="date"
              value={values.date_fin}
              onChange={(e) => setField("date_fin", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.date_fin}
              aria-describedby={describedBy("date_fin", "help-date_fin")}
              className={inputClass(!!err.date_fin)}
            />
            <HelpText id="help-date_fin">
              Au plus tard 2 mois après la fin des épreuves. En cas de doute,
              indiquez la fin de la formation : notre CFA ajustera avec vous.
            </HelpText>
            <FieldError id="err-date_fin" errors={err.date_fin} />
          </div>
        </div>
      </fieldset>

      {/* GROUP — Entreprise */}
      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Entreprise
        </legend>

        <div>
          <label
            htmlFor="siret"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            SIRET de l&apos;établissement d&apos;accueil{" "}
            <span className="text-gold">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="siret"
              type="text"
              inputMode="numeric"
              value={values.siret}
              onChange={(e) => setField("siret", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.siret}
              aria-describedby={describedBy("siret", "help-siret")}
              className={inputClass(!!err.siret)}
              placeholder="14 chiffres"
            />
            <Button
              type="button"
              variant="navy"
              disabled={!siretIsComplete || siretLookup.status === "loading"}
              onClick={handleVerifySiret}
              className="shrink-0 px-4 py-3 text-sm whitespace-nowrap"
            >
              {siretLookup.status === "loading"
                ? "Vérification..."
                : "Vérifier mon SIRET"}
            </Button>
          </div>
          <HelpText id="help-siret">
            14 chiffres — établissement où l&apos;alternant(e) travaillera, qui
            peut différer du siège.
          </HelpText>
          {siretWarning && (
            <Warning>Vérifiez votre SIRET, il semble invalide.</Warning>
          )}
          {siretLookup.status === "ok" && (
            <p className="text-xs text-[#2E7D4F] font-medium mt-1">
              ✓ {siretLookup.raisonSociale}
              {siretLookup.adresse ? ` — ${siretLookup.adresse}` : ""}
            </p>
          )}
          {siretLookup.status === "error" && (
            <p className="text-xs text-gray-mid mt-1">
              Vérification indisponible pour le moment — vous pouvez saisir les
              informations manuellement.
            </p>
          )}
          <FieldError id="err-siret" errors={err.siret} />
        </div>

        <div>
          <label
            htmlFor="raison_sociale"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Raison sociale <span className="text-gold">*</span>
          </label>
          <input
            id="raison_sociale"
            type="text"
            value={values.raison_sociale}
            onChange={(e) => setField("raison_sociale", e.target.value)}
            aria-required="true"
            aria-invalid={!!err.raison_sociale}
            aria-describedby={describedBy("raison_sociale")}
            className={inputClass(!!err.raison_sociale)}
            placeholder="Raison sociale"
          />
          <FieldError id="err-raison_sociale" errors={err.raison_sociale} />
        </div>

        <div>
          <label
            htmlFor="adresse_etablissement"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Adresse de l&apos;établissement{" "}
            <span className="text-gray-mid text-xs">(optionnel)</span>
          </label>
          <input
            id="adresse_etablissement"
            type="text"
            value={values.adresse_etablissement}
            onChange={(e) => setField("adresse_etablissement", e.target.value)}
            aria-invalid={!!err.adresse_etablissement}
            aria-describedby={describedBy("adresse_etablissement")}
            className={inputClass(!!err.adresse_etablissement)}
            placeholder="Adresse complète"
          />
          <FieldError
            id="err-adresse_etablissement"
            errors={err.adresse_etablissement}
          />
        </div>

        <div>
          <label
            htmlFor="idcc"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Code IDCC
          </label>
          <input
            id="idcc"
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={values.idcc}
            onChange={(e) => setField("idcc", e.target.value)}
            disabled={values.idcc_inconnu}
            aria-invalid={!!err.idcc}
            aria-describedby={describedBy("idcc", "help-idcc")}
            className={`${inputClass(!!err.idcc)} disabled:bg-gray-50 disabled:text-gray-mid`}
            placeholder="Ex : 1486"
          />
          <label className="flex items-start gap-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.idcc_inconnu}
              onChange={(e) => handleIdccInconnuToggle(e.target.checked)}
              className="mt-0.5 accent-gold size-4"
            />
            <span className="text-sm text-gray-dark">
              Je ne connais pas mon code IDCC
            </span>
          </label>
          <HelpText id="help-idcc">
            Le code IDCC figure sur les bulletins de paie de vos salariés.{" "}
            <a
              href="https://code.travail.gouv.fr/outils/convention-collective"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold hover:text-gold-light"
            >
              Retrouver ma convention collective
            </a>
          </HelpText>
          <FieldError id="err-idcc" errors={err.idcc} />
        </div>

        <div>
          <label
            htmlFor="opco"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            OPCO <span className="text-gold">*</span>
          </label>
          <select
            id="opco"
            value={values.opco}
            onChange={(e) => setField("opco", e.target.value)}
            aria-required="true"
            aria-invalid={!!err.opco}
            aria-describedby={describedBy("opco", "help-opco")}
            className={inputClass(!!err.opco)}
          >
            <option value="">— Sélectionnez —</option>
            {OPCO_LIST.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <HelpText id="help-opco">
            <a
              href="https://www.cfadock.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold hover:text-gold-light"
            >
              Trouver mon OPCO avec mon SIRET
            </a>
          </HelpText>
          <FieldError id="err-opco" errors={err.opco} />
        </div>
      </fieldset>

      {/* GROUP — Interlocuteur principal */}
      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Interlocuteur principal du suivi du contrat
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="interlocuteur_nom"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Nom <span className="text-gold">*</span>
            </label>
            <input
              id="interlocuteur_nom"
              type="text"
              value={values.interlocuteur_nom}
              onChange={(e) => setField("interlocuteur_nom", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.interlocuteur_nom}
              aria-describedby={describedBy("interlocuteur_nom")}
              className={inputClass(!!err.interlocuteur_nom)}
              placeholder="Nom"
            />
            <FieldError
              id="err-interlocuteur_nom"
              errors={err.interlocuteur_nom}
            />
          </div>
          <div>
            <label
              htmlFor="interlocuteur_prenom"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Prénom <span className="text-gold">*</span>
            </label>
            <input
              id="interlocuteur_prenom"
              type="text"
              value={values.interlocuteur_prenom}
              onChange={(e) => setField("interlocuteur_prenom", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.interlocuteur_prenom}
              aria-describedby={describedBy("interlocuteur_prenom")}
              className={inputClass(!!err.interlocuteur_prenom)}
              placeholder="Prénom"
            />
            <FieldError
              id="err-interlocuteur_prenom"
              errors={err.interlocuteur_prenom}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="interlocuteur_email"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Email <span className="text-gold">*</span>
            </label>
            <input
              id="interlocuteur_email"
              type="email"
              value={values.interlocuteur_email}
              onChange={(e) => setField("interlocuteur_email", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.interlocuteur_email}
              aria-describedby={describedBy("interlocuteur_email")}
              className={inputClass(!!err.interlocuteur_email)}
              placeholder="prenom.nom@entreprise.fr"
            />
            <FieldError
              id="err-interlocuteur_email"
              errors={err.interlocuteur_email}
            />
          </div>
          <div>
            <label
              htmlFor="interlocuteur_tel"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Téléphone portable <span className="text-gold">*</span>
            </label>
            <input
              id="interlocuteur_tel"
              type="tel"
              value={values.interlocuteur_tel}
              onChange={(e) => setField("interlocuteur_tel", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.interlocuteur_tel}
              aria-describedby={describedBy("interlocuteur_tel")}
              className={inputClass(!!err.interlocuteur_tel)}
              placeholder="06 12 34 56 78"
            />
            {interlocuteurTelWarning && (
              <Warning>Un numéro portable facilite le suivi.</Warning>
            )}
            <FieldError
              id="err-interlocuteur_tel"
              errors={err.interlocuteur_tel}
            />
          </div>
        </div>
      </fieldset>

      {/* GROUP — Maître d'apprentissage */}
      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Maître d&apos;apprentissage
        </legend>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.ma_est_interlocuteur}
            onChange={(e) => handleMaToggle(e.target.checked)}
            className="mt-0.5 accent-gold size-4"
          />
          <span className="text-sm text-gray-dark">
            Le maître d&apos;apprentissage est la même personne que
            l&apos;interlocuteur principal
          </span>
        </label>

        {!values.ma_est_interlocuteur && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="ma_nom"
                  className="block text-sm font-medium text-gray-dark mb-1.5"
                >
                  Nom <span className="text-gold">*</span>
                </label>
                <input
                  id="ma_nom"
                  type="text"
                  value={values.ma_nom}
                  onChange={(e) => setField("ma_nom", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!err.ma_nom}
                  aria-describedby={describedBy("ma_nom")}
                  className={inputClass(!!err.ma_nom)}
                  placeholder="Nom"
                />
                <FieldError id="err-ma_nom" errors={err.ma_nom} />
              </div>
              <div>
                <label
                  htmlFor="ma_prenom"
                  className="block text-sm font-medium text-gray-dark mb-1.5"
                >
                  Prénom <span className="text-gold">*</span>
                </label>
                <input
                  id="ma_prenom"
                  type="text"
                  value={values.ma_prenom}
                  onChange={(e) => setField("ma_prenom", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!err.ma_prenom}
                  aria-describedby={describedBy("ma_prenom")}
                  className={inputClass(!!err.ma_prenom)}
                  placeholder="Prénom"
                />
                <FieldError id="err-ma_prenom" errors={err.ma_prenom} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="ma_email"
                  className="block text-sm font-medium text-gray-dark mb-1.5"
                >
                  Email <span className="text-gold">*</span>
                </label>
                <input
                  id="ma_email"
                  type="email"
                  value={values.ma_email}
                  onChange={(e) => setField("ma_email", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!err.ma_email}
                  aria-describedby={describedBy("ma_email")}
                  className={inputClass(!!err.ma_email)}
                  placeholder="prenom.nom@entreprise.fr"
                />
                <FieldError id="err-ma_email" errors={err.ma_email} />
              </div>
              <div>
                <label
                  htmlFor="ma_tel"
                  className="block text-sm font-medium text-gray-dark mb-1.5"
                >
                  Téléphone portable <span className="text-gold">*</span>
                </label>
                <input
                  id="ma_tel"
                  type="tel"
                  value={values.ma_tel}
                  onChange={(e) => setField("ma_tel", e.target.value)}
                  aria-required="true"
                  aria-invalid={!!err.ma_tel}
                  aria-describedby={describedBy("ma_tel")}
                  className={inputClass(!!err.ma_tel)}
                  placeholder="06 12 34 56 78"
                />
                {maTelWarning && (
                  <Warning>Un numéro portable facilite le suivi.</Warning>
                )}
                <FieldError id="err-ma_tel" errors={err.ma_tel} />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="ma_date_naissance"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Date de naissance <span className="text-gold">*</span>
            </label>
            <input
              id="ma_date_naissance"
              type="date"
              value={values.ma_date_naissance}
              onChange={(e) => setField("ma_date_naissance", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.ma_date_naissance}
              aria-describedby={describedBy(
                "ma_date_naissance",
                "help-ma_date_naissance",
              )}
              className={inputClass(!!err.ma_date_naissance)}
            />
            <HelpText id="help-ma_date_naissance">
              Requise pour le Cerfa.
            </HelpText>
            {maAgeWarning && <Warning>Vérifiez la date de naissance.</Warning>}
            <FieldError
              id="err-ma_date_naissance"
              errors={err.ma_date_naissance}
            />
          </div>
          <div>
            <label
              htmlFor="ma_poste"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Poste occupé <span className="text-gold">*</span>
            </label>
            <input
              id="ma_poste"
              type="text"
              value={values.ma_poste}
              onChange={(e) => setField("ma_poste", e.target.value)}
              aria-required="true"
              aria-invalid={!!err.ma_poste}
              aria-describedby={describedBy("ma_poste")}
              className={inputClass(!!err.ma_poste)}
              placeholder="Ex : Responsable de magasin"
            />
            <FieldError id="err-ma_poste" errors={err.ma_poste} />
          </div>
        </div>

        <div>
          <label
            htmlFor="ma_diplome_niveau"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Diplôme le plus élevé obtenu <span className="text-gold">*</span>
          </label>
          <select
            id="ma_diplome_niveau"
            value={values.ma_diplome_niveau}
            onChange={(e) => handleDiplomeNiveauChange(e.target.value)}
            aria-required="true"
            aria-invalid={!!err.ma_diplome_niveau}
            aria-describedby={describedBy("ma_diplome_niveau")}
            className={inputClass(!!err.ma_diplome_niveau)}
          >
            <option value="">— Sélectionnez —</option>
            {NIVEAUX_DIPLOME.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <FieldError
            id="err-ma_diplome_niveau"
            errors={err.ma_diplome_niveau}
          />
        </div>

        <div>
          <label
            htmlFor="ma_diplome_intitule"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Intitulé du diplôme{" "}
            {!intituleDisabled && <span className="text-gold">*</span>}
          </label>
          <input
            id="ma_diplome_intitule"
            type="text"
            value={values.ma_diplome_intitule}
            onChange={(e) => setField("ma_diplome_intitule", e.target.value)}
            disabled={intituleDisabled}
            aria-required={!intituleDisabled}
            aria-invalid={!!err.ma_diplome_intitule}
            aria-describedby={describedBy("ma_diplome_intitule")}
            className={`${inputClass(!!err.ma_diplome_intitule)} disabled:bg-gray-50 disabled:text-gray-mid`}
            placeholder="Ex : BTS MCO"
          />
          <FieldError
            id="err-ma_diplome_intitule"
            errors={err.ma_diplome_intitule}
          />
        </div>
      </fieldset>

      {/* GROUP — Informations complémentaires */}
      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Informations complémentaires
        </legend>

        <div>
          <label
            htmlFor="commentaire"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Commentaire{" "}
            <span className="text-gray-mid text-xs">(optionnel)</span>
          </label>
          <textarea
            id="commentaire"
            rows={4}
            value={values.commentaire}
            onChange={(e) => setField("commentaire", e.target.value)}
            maxLength={2000}
            aria-invalid={!!err.commentaire}
            aria-describedby={describedBy("commentaire", "help-commentaire")}
            className={`${inputClass(!!err.commentaire)} resize-none`}
            placeholder="Précisions utiles pour le contrat"
          />
          <HelpText id="help-commentaire">
            Temps partiel, multi-sites, situation particulière... tout ce qui
            peut aider notre CFA.
          </HelpText>
          <FieldError id="err-commentaire" errors={err.commentaire} />
        </div>
      </fieldset>

      {/* Global error message */}
      {serverError && (
        <div
          className="bg-[#8B2500]/10 border border-[#8B2500]/20 rounded-lg p-4 text-[#8B2500] text-sm"
          role="alert"
          aria-live="polite"
        >
          {serverError}
        </div>
      )}

      {/* RGPD + Submit */}
      <div className="pt-2">
        <p className="text-xs text-gray-mid leading-relaxed mb-4">
          {RGPD_NOTICE}
        </p>
        <Button
          type="submit"
          variant="gold"
          disabled={pending}
          className="w-full py-3.5 text-base"
        >
          {pending ? "Envoi en cours..." : "Transmettre au CFA"}
        </Button>
      </div>
    </form>
  );
}
