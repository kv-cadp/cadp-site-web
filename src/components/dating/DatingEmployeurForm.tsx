"use client";

import { useId } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { submitDatingEmployeur } from "@/lib/dating/actions";
import {
  PARTICIPANTS_LABELS,
  PARTICIPANTS_VALUES,
  POSTES_LABELS,
  POSTES_VALUES,
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

const POSTES_OPTIONS = POSTES_VALUES.map((value) => ({
  value,
  label: POSTES_LABELS[value],
}));
const PARTICIPANTS_OPTIONS = PARTICIPANTS_VALUES.map((value) => ({
  value,
  label: PARTICIPANTS_LABELS[value],
}));

const FIELD_ORDER = [
  "entreprise",
  "siret",
  "prenom",
  "nom",
  "fonction",
  "email",
  "telephone",
  "nbPostes",
  "nbParticipants",
  "commentaire",
  "consentement",
] as const;

const submit = withNetworkFallback(submitDatingEmployeur);

interface DatingEmployeurFormProps {
  eventSlug: string;
  /** Ex : "jeudi 12 novembre 2026" */
  eventDateLabel: string;
  /** Rappel date, lieu et itinéraire, affiché après la confirmation. */
  recap: React.ReactNode;
}

export default function DatingEmployeurForm({
  eventSlug,
  eventDateLabel,
  recap,
}: DatingEmployeurFormProps) {
  const { state, formAction, pending, formRef, alertRef, successRef } =
    useDatingForm(submit, FIELD_ORDER);
  const honeypotId = useId();

  const err = state.errors ?? {};
  const values = state.values ?? {};
  const v = (key: string) => values[key] ?? "";
  const describe = (key: string) => (err[key] ? `err-${key}` : undefined);

  if (state.ok) {
    return (
      <SuccessPanel title="Venue confirmée" titleRef={successRef}>
        <p>
          {state.confirmationSent
            ? "Merci. Un e-mail de confirmation vient de vous être envoyé. Nous vous attendons :"
            : "Merci. Nous vous attendons :"}
        </p>
        <div className="bg-white rounded-lg p-4">{recap}</div>
        <p className="text-gray-mid">
          Une question d&apos;ici là : <a href="tel:+33475003456" className="font-semibold text-navy-deep whitespace-nowrap">04 75 00 34 56</a>.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <div>
      <form ref={formRef} action={formAction} className="space-y-8" noValidate>
        <Honeypot id={honeypotId} />
        <input type="hidden" name="eventSlug" value={eventSlug} />

        <FormAlert message={state.message} ref={alertRef} />

        <fieldset className="space-y-5">
          <legend className="font-serif text-lg text-navy-deep mb-4">Votre structure</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="entreprise">Nom de la structure</FieldLabel>
              <input id="entreprise" name="entreprise" type="text" autoComplete="organization" defaultValue={v("entreprise")} aria-required="true" aria-invalid={!!err.entreprise} aria-describedby={describe("entreprise")} className={inputClass(!!err.entreprise)} />
              <FieldError id="err-entreprise" errors={err.entreprise} />
            </div>
            <div>
              <FieldLabel htmlFor="siret" optional>SIRET</FieldLabel>
              <input id="siret" name="siret" type="text" inputMode="numeric" defaultValue={v("siret")} aria-invalid={!!err.siret} aria-describedby={describe("siret")} className={inputClass(!!err.siret)} placeholder="14 chiffres" />
              <FieldError id="err-siret" errors={err.siret} />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 pt-6 border-t border-gray-100">
          <legend className="font-serif text-lg text-navy-deep mb-4">Vos coordonnées</legend>
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
          <div>
            <FieldLabel htmlFor="fonction">Fonction</FieldLabel>
            <input id="fonction" name="fonction" type="text" autoComplete="organization-title" defaultValue={v("fonction")} aria-required="true" aria-invalid={!!err.fonction} aria-describedby={describe("fonction")} className={inputClass(!!err.fonction)} placeholder="Ex. : direction, responsable de secteur, RH" />
            <FieldError id="err-fonction" errors={err.fonction} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <input id="email" name="email" type="email" autoComplete="email" defaultValue={v("email")} aria-required="true" aria-invalid={!!err.email} aria-describedby={describe("email")} className={inputClass(!!err.email)} />
              <FieldError id="err-email" errors={err.email} />
            </div>
            <div>
              <FieldLabel htmlFor="telephone">Téléphone</FieldLabel>
              <input id="telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v("telephone")} aria-required="true" aria-invalid={!!err.telephone} aria-describedby={describe("telephone")} className={inputClass(!!err.telephone)} />
              <FieldError id="err-telephone" errors={err.telephone} />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 pt-6 border-t border-gray-100">
          <legend className="font-serif text-lg text-navy-deep mb-4">Votre venue</legend>
          {/* Pastilles radio plutôt que listes déroulantes : après une erreur,
              React remet le formulaire à zéro et une liste déroulante ne
              reprend pas la valeur saisie (defaultValue lu au montage). */}
          <ChoiceGroup name="nbPostes" legend="Postes à pourvoir" options={POSTES_OPTIONS} value={v("nbPostes")} errors={err.nbPostes} />
          <ChoiceGroup name="nbParticipants" legend="Personnes présentes le jour J" options={PARTICIPANTS_OPTIONS} value={v("nbParticipants")} errors={err.nbParticipants} />
          <div>
            <FieldLabel htmlFor="commentaire" optional>Commentaire</FieldLabel>
            <textarea id="commentaire" name="commentaire" rows={3} maxLength={2000} defaultValue={v("commentaire")} aria-invalid={!!err.commentaire} aria-describedby={describe("commentaire")} className={`${inputClass(!!err.commentaire)} resize-y`} placeholder="Horaires d'arrivée, profils recherchés, contraintes particulières" />
            <FieldError id="err-commentaire" errors={err.commentaire} />
          </div>
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
              informations pour organiser ma venue à l&apos;Alternance Dating du{" "}
              {eventDateLabel} et me recontacter à ce sujet. Voir la{" "}
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
            {pending ? "Envoi en cours…" : "Je confirme ma venue"}
          </Button>
          <p className="text-center text-xs text-gray-mid mt-3">
            Une question : <a href="tel:+33475003456" className="font-semibold text-navy-deep whitespace-nowrap">04 75 00 34 56</a> · <a href="mailto:contact@cadp.pro" className="font-semibold text-navy-deep">contact@cadp.pro</a>
          </p>
        </div>
      </form>
    </div>
  );
}
