"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  INITIAL_DATING_FORM_STATE,
  type DatingFormState,
} from "@/lib/dating/options";

type DatingAction = (
  prev: DatingFormState,
  formData: FormData,
) => Promise<DatingFormState>;

const NETWORK_MESSAGE =
  "L'envoi n'a pas pu être confirmé (connexion interrompue). Réessayez dans un instant ; en cas de doute, appelez-nous au 04 75 00 34 56.";

function valuesFrom(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (
      typeof value === "string" &&
      key !== "botcheck" &&
      key !== "eventSlug" &&
      !key.startsWith("$ACTION")
    ) {
      values[key] = value;
    }
  });
  return values;
}

/**
 * Enveloppe une action serveur : un échec réseau (connexion mobile coupée,
 * délai dépassé, déploiement en cours) renvoie un message et la saisie,
 * au lieu de faire tomber la page sur l'écran d'erreur générique.
 */
export function withNetworkFallback(action: DatingAction): DatingAction {
  return async (prev, formData) => {
    try {
      return await action(prev, formData);
    } catch {
      return { ok: false, message: NETWORK_MESSAGE, values: valuesFrom(formData) };
    }
  };
}

/**
 * État du formulaire et gestion du focus après envoi : premier champ en
 * erreur, sinon message global, sinon titre du panneau de succès.
 * `fieldOrder` : noms des champs dans l'ordre d'affichage (constante).
 */
export function useDatingForm(action: DatingAction, fieldOrder: readonly string[]) {
  const [state, formAction, pending] = useActionState(
    action,
    INITIAL_DATING_FORM_STATE,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let target: HTMLElement | null = null;
    if (state.ok) {
      target = successRef.current;
    } else {
      const firstInvalid = fieldOrder.find((name) => state.errors?.[name]?.length);
      if (firstInvalid) {
        target =
          formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`) ??
          null;
      }
      if (!target && state.message) target = alertRef.current;
    }
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state, fieldOrder]);

  return { state, formAction, pending, formRef, alertRef, successRef };
}
