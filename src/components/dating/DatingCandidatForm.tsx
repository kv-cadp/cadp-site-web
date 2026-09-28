"use client";

import { useId, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { submitDatingCandidat } from "@/lib/dating/actions";
import {
  PERMIS_LABELS,
  PERMIS_VALUES,
  VEHICULE_LABELS,
  VEHICULE_VALUES,
} from "@/lib/dating/options";
import {
  ChoiceGroup,
  FieldError,
  FieldLabel,
  FormAlert,
  Honeypot,
  SuccessPanel,
  inputClass,
} from "./form-ui";
import { useDatingForm, withNetworkFallback } from "./use-dating-form";

const PERMIS_OPTIONS = PERMIS_VALUES.map((value) => ({
  value,
  label: PERMIS_LABELS[value],
}));
const VEHICULE_OPTIONS = VEHICULE_VALUES.map((value) => ({
  value,
  label: VEHICULE_LABELS[value],
}));

const FIELD_ORDER = [
  "prenom",
  "nom",
  "telephone",
  "email",
  "commune",
  "permis",
  "vehicule",
  "consentement",
] as const;

const submit = withNetworkFallback(submitDatingCandidat);

interface DatingCandidatFormProps {
  eventSlug: string;
  /** Ex : "jeudi 12 novembre 2026" */
  eventDateLabel: string;
  /** Rappel date, lieu et itinéraire, affiché après l'inscription. */
  recap: React.ReactNode;
  /** Phrase de clôture. Ex : "Venez avec un CV si vous en avez un." */
  closing: string;
}

/**
 * Formulaire d'inscription candidat. Après un succès, « Inscrire une autre
 * personne » remonte un formulaire vierge (tablette d'accueil le jour J).
 */
export default function DatingCandidatForm(props: DatingCandidatFormProps) {
  const [round, setRound] = useState(0);
  return (
    <CandidatForm key={round} {...props} onNext={() => setRound((n) => n + 1)} />
  );
}

function CandidatForm({
  eventSlug,
  eventDateLabel,
  recap,
  closing,
  onNext,
}: DatingCandidatFormProps & { onNext: () => void }) {
  const { state, formAction, pending, formRef, alertRef, successRef } =
    useDatingForm(submit, FIELD_ORDER);
  const honeypotId = useId();

  const err = state.errors ?? {};
  const values = state.values ?? {};
  const v = (key: string) => values[key] ?? "";
  const describe = (key: string) => (err[key] ? `err-${key}` : undefined);

  if (state.ok) {
    return (
      <SuccessPanel title="Inscription enregistrée" titleRef={successRef}>
        <p>
          {state.confirmationSent
            ? "Un e-mail de confirmation vient de vous être envoyé. Notez le rendez-vous :"
            : "Notez le rendez-vous :"}
        </p>
        <div className="bg-white rounded-lg p-4">{recap}</div>
        <p className="font-medium">{closing}</p>
        <p className="text-gray-mid">
          Un empêchement ou une question : <a href="tel:+33475003456" className="font-semibold text-navy-deep whitespace-nowrap">04 75 00 34 56</a>.
        </p>
        <div className="pt-2">
          <Button type="button" variant="navy" onClick={onNext} className="w-full sm:w-auto">
            Inscrire une autre personne
          </Button>
        </div>
      </SuccessPanel>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-8" noValidate>
      <Honeypot id={honeypotId} />
      <input type="hidden" name="eventSlug" value={eventSlug} />

      <FormAlert message={state.message} ref={alertRef} />

      <fieldset className="space-y-5">
        <legend className="font-serif text-lg text-navy-deep mb-4">Vous</legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="prenom">Prénom</FieldLabel>
            <input id="prenom" name="prenom" type="text" autoComplete="given-name" defaultValue={v("prenom")} aria-required="true" aria-invalid={!!err.prenom} aria-describedby={describe("prenom")} className={inputClass(!!err.prenom)} />
            <FieldError id="err-prenom" errors={err.prenom} />
          </div>
          <div>
            <FieldLabel htmlFor="nom">Nom</FieldLabel>
            <input id="nom" name="nom" type="text" autoComplete="family-name" defaultValue={v("nom")} aria-required="true" aria-invalid={!!err.nom} aria-describedby={describe("nom")} className={inputClass(!!err.nom)} />
            <FieldError id="err-nom" errors={err.nom} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="telephone">Téléphone</FieldLabel>
            <input id="telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v("telephone")} aria-required="true" aria-invalid={!!err.telephone} aria-describedby={describe("telephone")} className={inputClass(!!err.telephone)} />
            <FieldError id="err-telephone" errors={err.telephone} />
          </div>
          <div>
            <FieldLabel htmlFor="email" optional>E-mail</FieldLabel>
            <input id="email" name="email" type="email" autoComplete="email" defaultValue={v("email")} aria-invalid={!!err.email} aria-describedby={err.email ? "err-email" : "hint-email"} className={inputClass(!!err.email)} />
            <p id="hint-email" className="text-gray-mid text-xs mt-1">
              Pour recevoir la confirmation avec l&apos;adresse du lieu.
            </p>
            <FieldError id="err-email" errors={err.email} />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="commune">Commune où vous habitez</FieldLabel>
          <input id="commune" name="commune" type="text" autoComplete="address-level2" defaultValue={v("commune")} aria-required="true" aria-invalid={!!err.commune} aria-describedby={describe("commune")} className={inputClass(!!err.commune)} />
          <FieldError id="err-commune" errors={err.commune} />
        </div>
      </fieldset>

      <fieldset className="space-y-5 pt-6 border-t border-gray-100">
        <legend className="font-serif text-lg text-navy-deep mb-4">Mobilité</legend>
        <ChoiceGroup name="permis" legend="Permis B" options={PERMIS_OPTIONS} value={v("permis")} errors={err.permis} />
        <ChoiceGroup
          name="vehicule"
          legend="Véhicule personnel"
          options={VEHICULE_OPTIONS}
          value={v("vehicule")}
          errors={err.vehicule}
          hint="Les employeurs du secteur demandent le permis B et un véhicule : les interventions se font au domicile des personnes."
        />
      </fieldset>

      <div className="pt-6 border-t border-gray-100">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consentement"
            defaultChecked={v("consentement") === "on"}
            aria-required="true"
            aria-invalid={!!err.consentement}
            aria-describedby={describe("consentement")}
            className="mt-1 accent-navy-deep size-4 shrink-0"
          />
          <span className="text-sm text-gray-dark leading-relaxed">
            J&apos;accepte que le Campus Alternance Drôme Provence utilise ces
            informations pour préparer l&apos;Alternance Dating du {eventDateLabel} et
            présenter ma candidature aux employeurs présents. Voir la{" "}
            <Link href="/politique-de-confidentialite" target="_blank" className="font-semibold text-navy-deep underline decoration-gold underline-offset-2">
              politique de confidentialité
            </Link>
            . <span className="text-gold" aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError id="err-consentement" errors={err.consentement} />
      </div>

      <div>
        <Button type="submit" variant="gold" disabled={pending} className="w-full py-3.5 text-base">
          {pending ? "Envoi en cours…" : "Je m'inscris"}
        </Button>
        <p className="text-center text-xs text-gray-mid mt-3">
          Entrée libre · inscription conseillée · une question : <a href="tel:+33475003456" className="font-semibold text-navy-deep whitespace-nowrap">04 75 00 34 56</a>
        </p>
      </div>
    </form>
  );
}
