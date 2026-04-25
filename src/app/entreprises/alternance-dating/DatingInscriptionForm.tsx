"use client";

import { useActionState, useId } from "react";
import Button from "@/components/ui/Button";
import {
  submitDatingInscription,
  type DatingActionState,
} from "./actions";

const FORMATIONS = [
  { value: "BTS MCO", label: "BTS MCO — Management Commercial Opérationnel" },
  { value: "BTS NDRC", label: "BTS NDRC — Négociation & Digitalisation" },
  { value: "BTS GPME", label: "BTS GPME — Gestion de la PME" },
  { value: "BTS CG", label: "BTS CG — Comptabilité et Gestion" },
  { value: "BTS MOS", label: "BTS MOS — Management Opérationnel de la Sécurité" },
  { value: "TP ADVF", label: "TP ADVF — Assistant De Vie aux Familles" },
];

const ZONES = ["Drôme", "Ardèche", "Vaucluse", "Gard", "Autre"] as const;
const POSTES = ["1", "2-3", "4-5", "6+"] as const;

const initialState: DatingActionState = { ok: false };

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
    hasError ? "border-error" : "border-gray-200"
  }`;

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  if (!errors || errors.length === 0) return null;
  return (
    <p id={id} className="text-error text-xs mt-1" role="alert">
      {errors[0]}
    </p>
  );
}

export default function DatingInscriptionForm() {
  const [state, formAction, pending] = useActionState(
    submitDatingInscription,
    initialState,
  );
  const honeypotId = useId();

  const err = state.errors ?? {};
  const values = state.fieldValues ?? {};

  function defaultStr(
    key: keyof typeof values,
    fallback: string = "",
  ): string {
    const v = values[key];
    if (typeof v === "string") return v;
    return fallback;
  }

  function isFormationChecked(value: string): boolean {
    const arr = values.formations;
    if (Array.isArray(arr)) return arr.includes(value);
    return false;
  }

  if (state.ok) {
    return (
      <div className="bg-[#E8F5E9] border border-[#2E7D4F]/20 rounded-xl p-8 text-center">
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
        <h3 className="font-serif text-xl text-navy-deep mb-2">
          Inscription enregistrée
        </h3>
        <p className="text-[#2E7D4F] font-medium mb-1">
          Un accusé de réception vient d&apos;être envoyé sur votre email.
        </p>
        <p className="text-gray-mid text-sm">
          Nous vous recontactons sous 48h pour qualifier vos besoins.
        </p>
        <p className="text-gray-mid text-xs mt-4">
          CADP Pierrelatte — 04 75 00 34 56
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {/* Honeypot — accessible to screen readers label-only, positioned off-screen */}
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
          id={honeypotId}
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* GROUP — Coordonnées */}
      <fieldset className="space-y-5">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Vos coordonnées
        </legend>

        <div>
          <label
            htmlFor="civilite"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Civilité <span className="text-gold">*</span>
          </label>
          <select
            id="civilite"
            name="civilite"
            defaultValue={defaultStr("civilite")}
            aria-required="true"
            aria-invalid={!!err.civilite}
            aria-describedby={err.civilite ? "err-civilite" : undefined}
            className={inputClass(!!err.civilite)}
          >
            <option value="">— Sélectionnez —</option>
            <option value="M.">M.</option>
            <option value="Mme">Mme</option>
          </select>
          <FieldError id="err-civilite" errors={err.civilite} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="prenom"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Prénom <span className="text-gold">*</span>
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              defaultValue={defaultStr("prenom")}
              aria-required="true"
              aria-invalid={!!err.prenom}
              aria-describedby={err.prenom ? "err-prenom" : undefined}
              className={inputClass(!!err.prenom)}
              placeholder="Prénom"
            />
            <FieldError id="err-prenom" errors={err.prenom} />
          </div>
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Nom <span className="text-gold">*</span>
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              defaultValue={defaultStr("nom")}
              aria-required="true"
              aria-invalid={!!err.nom}
              aria-describedby={err.nom ? "err-nom" : undefined}
              className={inputClass(!!err.nom)}
              placeholder="Nom"
            />
            <FieldError id="err-nom" errors={err.nom} />
          </div>
        </div>

        <div>
          <label
            htmlFor="fonction"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Fonction <span className="text-gold">*</span>
          </label>
          <input
            id="fonction"
            name="fonction"
            type="text"
            defaultValue={defaultStr("fonction")}
            aria-required="true"
            aria-invalid={!!err.fonction}
            aria-describedby={err.fonction ? "err-fonction" : undefined}
            className={inputClass(!!err.fonction)}
            placeholder="Ex : Dirigeant(e), DRH, Responsable recrutement…"
          />
          <FieldError id="err-fonction" errors={err.fonction} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Email <span className="text-gold">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={defaultStr("email")}
              aria-required="true"
              aria-invalid={!!err.email}
              aria-describedby={err.email ? "err-email" : undefined}
              className={inputClass(!!err.email)}
              placeholder="prenom.nom@entreprise.fr"
            />
            <FieldError id="err-email" errors={err.email} />
          </div>
          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Téléphone <span className="text-gold">*</span>
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              defaultValue={defaultStr("telephone")}
              aria-required="true"
              aria-invalid={!!err.telephone}
              aria-describedby={err.telephone ? "err-telephone" : undefined}
              className={inputClass(!!err.telephone)}
              placeholder="04 75 00 34 56"
            />
            <FieldError id="err-telephone" errors={err.telephone} />
          </div>
        </div>
      </fieldset>

      {/* GROUP — Entreprise */}
      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Votre entreprise
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="entreprise"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              Nom de l&apos;entreprise <span className="text-gold">*</span>
            </label>
            <input
              id="entreprise"
              name="entreprise"
              type="text"
              defaultValue={defaultStr("entreprise")}
              aria-required="true"
              aria-invalid={!!err.entreprise}
              aria-describedby={err.entreprise ? "err-entreprise" : undefined}
              className={inputClass(!!err.entreprise)}
              placeholder="Raison sociale"
            />
            <FieldError id="err-entreprise" errors={err.entreprise} />
          </div>
          <div>
            <label
              htmlFor="siret"
              className="block text-sm font-medium text-gray-dark mb-1.5"
            >
              SIRET <span className="text-gray-mid text-xs">(optionnel)</span>
            </label>
            <input
              id="siret"
              name="siret"
              type="text"
              inputMode="numeric"
              defaultValue={defaultStr("siret")}
              aria-invalid={!!err.siret}
              aria-describedby={err.siret ? "err-siret" : undefined}
              className={inputClass(!!err.siret)}
              placeholder="14 chiffres"
            />
            <FieldError id="err-siret" errors={err.siret} />
          </div>
        </div>

        <div>
          <label
            htmlFor="secteurActivite"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Secteur d&apos;activité <span className="text-gold">*</span>
          </label>
          <input
            id="secteurActivite"
            name="secteurActivite"
            type="text"
            defaultValue={defaultStr("secteurActivite")}
            aria-required="true"
            aria-invalid={!!err.secteurActivite}
            aria-describedby={
              err.secteurActivite ? "err-secteur" : undefined
            }
            className={inputClass(!!err.secteurActivite)}
            placeholder="Ex : distribution, services, BTP, santé…"
          />
          <FieldError id="err-secteur" errors={err.secteurActivite} />
        </div>

        <div>
          <label
            htmlFor="zoneGeo"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Zone géographique <span className="text-gold">*</span>
          </label>
          <select
            id="zoneGeo"
            name="zoneGeo"
            defaultValue={defaultStr("zoneGeo")}
            aria-required="true"
            aria-invalid={!!err.zoneGeo}
            aria-describedby={err.zoneGeo ? "err-zone" : undefined}
            className={inputClass(!!err.zoneGeo)}
          >
            <option value="">— Sélectionnez —</option>
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
          <FieldError id="err-zone" errors={err.zoneGeo} />
        </div>
      </fieldset>

      {/* GROUP — Besoin */}
      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">
          Votre besoin
        </legend>

        <div>
          <p className="block text-sm font-medium text-gray-dark mb-2">
            Formations qui vous intéressent{" "}
            <span className="text-gold">*</span>
            <span className="ml-2 text-xs text-gray-mid font-normal">
              (plusieurs choix possibles)
            </span>
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            role="group"
            aria-invalid={!!err.formations}
            aria-describedby={err.formations ? "err-formations" : undefined}
          >
            {FORMATIONS.map((f) => (
              <label
                key={f.value}
                className="flex items-start gap-2 p-3 rounded-lg border-2 border-gray-200 hover:border-gold-pale cursor-pointer transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold/5"
              >
                <input
                  type="checkbox"
                  name="formations"
                  value={f.value}
                  defaultChecked={isFormationChecked(f.value)}
                  className="mt-0.5 accent-gold"
                />
                <span className="text-sm text-gray-dark">{f.label}</span>
              </label>
            ))}
          </div>
          <FieldError id="err-formations" errors={err.formations} />
        </div>

        <div>
          <label
            htmlFor="nbPostes"
            className="block text-sm font-medium text-gray-dark mb-1.5"
          >
            Nombre de postes envisagés{" "}
            <span className="text-gold">*</span>
          </label>
          <select
            id="nbPostes"
            name="nbPostes"
            defaultValue={defaultStr("nbPostes")}
            aria-required="true"
            aria-invalid={!!err.nbPostes}
            aria-describedby={err.nbPostes ? "err-nbPostes" : undefined}
            className={inputClass(!!err.nbPostes)}
          >
            <option value="">— Sélectionnez —</option>
            {POSTES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <FieldError id="err-nbPostes" errors={err.nbPostes} />
        </div>

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
            name="commentaire"
            rows={4}
            defaultValue={defaultStr("commentaire")}
            maxLength={2000}
            aria-invalid={!!err.commentaire}
            aria-describedby={err.commentaire ? "err-commentaire" : undefined}
            className={`${inputClass(!!err.commentaire)} resize-none`}
            placeholder="Précisions sur vos besoins, missions envisagées, contraintes particulières…"
          />
          <FieldError id="err-commentaire" errors={err.commentaire} />
        </div>
      </fieldset>

      {/* GROUP — Consentement */}
      <fieldset className="pt-6 border-t border-gray-100">
        <legend className="sr-only">Consentement</legend>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consentementRGPD"
            defaultChecked={values.consentementRGPD === "on"}
            aria-required="true"
            aria-invalid={!!err.consentementRGPD}
            aria-describedby={
              err.consentementRGPD ? "err-rgpd" : undefined
            }
            className="mt-1 accent-gold size-4"
          />
          <span className="text-sm text-gray-dark leading-relaxed">
            J&apos;accepte que le CADP utilise les informations transmises pour
            me recontacter dans le cadre de l&apos;Alternance Dating du 27 mai
            2026 et de l&apos;organisation des rencontres avec les candidats.
            Conformément à la{" "}
            <a
              href="/politique-de-confidentialite"
              target="_blank"
              className="text-gold font-semibold hover:text-gold-light"
            >
              politique de confidentialité
            </a>
            . <span className="text-gold">*</span>
          </span>
        </label>
        <FieldError id="err-rgpd" errors={err.consentementRGPD} />
      </fieldset>

      {/* Global error message */}
      {!state.ok && state.message && (
        <div
          className="bg-[#8B2500]/10 border border-[#8B2500]/20 rounded-lg p-4 text-[#8B2500] text-sm"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="gold"
          disabled={pending}
          className="w-full py-3.5 text-base"
        >
          {pending ? "Envoi en cours…" : "Valider mon inscription"}
        </Button>
        <p className="text-center text-xs text-gray-mid mt-3">
          Une question ? Appelez Laurent au{" "}
          <a
            href="tel:+33475003456"
            className="text-gold font-semibold hover:text-gold-light"
          >
            04 75 00 34 56
          </a>
        </p>
      </div>
    </form>
  );
}
