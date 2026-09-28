import "server-only";

import { getFormationBySlug } from "@/data/formations";
import type { DatingEvent } from "@/lib/dating/events";
import { getDatingFormationContent } from "@/lib/dating/content";
import {
  PARTICIPANTS_LABELS,
  PERMIS_LABELS,
  POSTES_LABELS,
  VEHICULE_LABELS,
} from "@/lib/dating/options";
import type {
  DatingCandidatInput,
  DatingEmployeurInput,
} from "@/lib/dating/schema";
import {
  buildVenueMapUrl,
  formatEventDateLongWithWeekday,
  formatEventDateNumeric,
  formatEventTimeRange,
  formatVenueAddress,
} from "@/lib/format-event";
import { formatParisDateTime } from "@/lib/paris-time";

/**
 * E-mails des inscriptions aux Alternance Dating : notification à la
 * boîte qui suit les inscriptions et confirmation au déclarant, avec le
 * lieu exact de l'événement (deux lieux distincts en novembre 2026).
 *
 * La confirmation part vers une adresse non vérifiée : elle ne reprend que
 * le prénom et le nom (lettres seules, contrôlées par le schéma), jamais un
 * champ libre (structure, fonction, commentaire).
 */

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
}

const NAVY = "#141E3C";
const GOLD = "#C9A84C";
const IVORY = "#FAF7EE";
const INK = "#2C2C2C";
const MUTED = "#666666";
const PHONE = "04 75 00 34 56";
const PHONE_HREF = "tel:+33475003456";
const SIGNATURE = "L'équipe du Campus Alternance Drôme Provence";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Objet d'e-mail sur une ligne (aucun saut de ligne venu de la saisie). */
function oneLine(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}

function capitalize(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function eventFacts(event: DatingEvent) {
  const formation = event.formationSlug
    ? getFormationBySlug(event.formationSlug)
    : undefined;
  return {
    dateLong: capitalize(formatEventDateLongWithWeekday(event.date)),
    dateLongLower: formatEventDateLongWithWeekday(event.date),
    dateNumeric: formatEventDateNumeric(event.date),
    timeRange: formatEventTimeRange(event.startTime, event.endTime),
    address: formatVenueAddress(event.venue),
    mapUrl: buildVenueMapUrl(event.venue),
    tag: formation
      ? `Dating ${formation.code} ${formatEventDateNumeric(event.date)} · ${event.venue.city}`
      : `Dating ${formatEventDateNumeric(event.date)} · ${event.venue.city}`,
  };
}

function layout(eyebrow: string, title: string, bodyHtml: string, footerNote: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:24px;background:${IVORY};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${INK}">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
    <div style="background:${NAVY};padding:24px 28px">
      <p style="margin:0;color:${GOLD};font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">${escapeHtml(eyebrow)}</p>
      <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:600">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:24px 28px;font-size:15px;line-height:1.6">
${bodyHtml}
    </div>
    <div style="padding:16px 28px;background:${IVORY};border-top:1px solid #e5e5e5;color:${MUTED};font-size:12px;text-align:center">
      ${footerNote}
    </div>
  </div>
</body></html>`;
}

/** Encadré date, horaires, lieu, adresse et itinéraire. */
function venueBoxHtml(event: DatingEvent): string {
  const f = eventFacts(event);
  const hostNote = event.hostNote
    ? `<p style="margin:8px 0 0;color:${MUTED};font-size:13px">${escapeHtml(event.hostNote)}</p>`
    : "";
  return `      <div style="background:${IVORY};border-left:3px solid ${GOLD};padding:16px 20px;border-radius:6px;margin:20px 0">
        <p style="margin:0 0 4px;font-weight:600;color:${NAVY}">${escapeHtml(f.dateLong)}, de ${escapeHtml(f.timeRange)}</p>
        <p style="margin:0;color:${INK}">${escapeHtml(event.venue.name)}</p>
        <p style="margin:0;color:${INK}">${escapeHtml(f.address)}</p>
        <p style="margin:8px 0 0"><a href="${escapeHtml(f.mapUrl)}" style="color:${NAVY};font-weight:600">Voir l'itinéraire</a></p>
${hostNote}
      </div>`;
}

function venueBoxText(event: DatingEvent): string[] {
  const f = eventFacts(event);
  return [
    `${f.dateLong}, de ${f.timeRange}`,
    event.venue.name,
    f.address,
    `Itinéraire : ${f.mapUrl}`,
    ...(event.hostNote ? [event.hostNote] : []),
  ];
}

function rowsHtml(rows: Array<[string, string]>): string {
  return rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:${MUTED};font-weight:600;vertical-align:top;width:38%">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:${INK};white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
}

function adminEmail(
  event: DatingEvent,
  kind: "Candidat" | "Employeur",
  who: string,
  rows: Array<[string, string]>,
  receivedAt: Date,
): BuiltEmail {
  const f = eventFacts(event);
  const subject = oneLine(`[${f.tag}] ${kind} · ${who}`);
  const allRows: Array<[string, string]> = [
    ...rows,
    ["Événement", `${event.title} · ${f.dateLong}, ${f.timeRange}`],
    ["Lieu", `${event.venue.name}, ${f.address}`],
    ["Reçue le", formatParisDateTime(receivedAt)],
  ];
  const title =
    kind === "Candidat" ? "Nouvelle inscription candidat" : "Nouvelle venue employeur";
  const html = layout(
    `${event.title} · ${f.dateNumeric} · ${event.venue.city}`,
    title,
    `      <p style="margin:0 0 16px;color:${MUTED};font-size:14px">Inscription reçue par le formulaire du site cadp.pro.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${rowsHtml(allRows)}</table>`,
    "Notification automatique · cadp.pro",
  );
  const text = [
    `${title} · ${event.title} · ${f.dateLong} · ${event.venue.city}`,
    "",
    ...allRows.map(([k, v]) => `${k} : ${v}`),
  ].join("\n");
  return { subject, html, text };
}

export function buildCandidatAdminEmail(
  data: DatingCandidatInput,
  event: DatingEvent,
  receivedAt: Date = new Date(),
): BuiltEmail {
  return adminEmail(
    event,
    "Candidat",
    `${data.prenom} ${data.nom.toUpperCase()}`,
    [
      ["Prénom", data.prenom],
      ["Nom", data.nom],
      ["Téléphone", data.telephone],
      ["E-mail", data.email ?? "non renseigné"],
      ["Commune", data.commune],
      ["Permis B", PERMIS_LABELS[data.permis]],
      ["Véhicule", VEHICULE_LABELS[data.vehicule]],
    ],
    receivedAt,
  );
}

export function buildEmployeurAdminEmail(
  data: DatingEmployeurInput,
  event: DatingEvent,
  receivedAt: Date = new Date(),
): BuiltEmail {
  return adminEmail(
    event,
    "Employeur",
    data.entreprise,
    [
      ["Structure", data.entreprise],
      ["SIRET", data.siret ?? "non renseigné"],
      ["Prénom", data.prenom],
      ["Nom", data.nom],
      ["Fonction", data.fonction],
      ["E-mail", data.email],
      ["Téléphone", data.telephone],
      ["Postes à pourvoir", POSTES_LABELS[data.nbPostes]],
      ["Personnes présentes", PARTICIPANTS_LABELS[data.nbParticipants]],
      ["Commentaire", data.commentaire ?? "aucun"],
    ],
    receivedAt,
  );
}

const FOOTER_HTML = `Campus Alternance Drôme Provence · <a href="https://cadp.pro" style="color:${NAVY};text-decoration:none">cadp.pro</a> · ${PHONE}`;
const FOOTER_TEXT = `Campus Alternance Drôme Provence · cadp.pro · ${PHONE}`;

export function buildCandidatConfirmationEmail(
  data: DatingCandidatInput,
  event: DatingEvent,
): BuiltEmail {
  const f = eventFacts(event);
  const closing =
    getDatingFormationContent(event.formationSlug)?.candidateClosing ??
    "Venez avec un CV si vous en avez un.";
  const subject = oneLine(
    `${event.title} du ${f.dateLongLower} à ${event.venue.city} : inscription enregistrée`,
  );
  const html = layout(
    "Inscription enregistrée",
    `${event.title} · ${event.venue.city}`,
    `      <p style="margin:0 0 16px">Bonjour ${escapeHtml(data.prenom)},</p>
      <p style="margin:0 0 16px">Votre inscription à l'${escapeHtml(event.title)} est enregistrée. Nous vous attendons :</p>
${venueBoxHtml(event)}
      <p style="margin:0 0 16px">${escapeHtml(closing)}</p>
      <p style="margin:0 0 16px">Un empêchement ou une question ? Appelez-nous au <a href="${PHONE_HREF}" style="color:${NAVY};font-weight:600;text-decoration:none">${PHONE}</a> ou répondez à ce message.</p>
      <p style="margin:24px 0 0">À bientôt,</p>
      <p style="margin:0;font-weight:600;color:${NAVY}">${escapeHtml(SIGNATURE)}</p>`,
    FOOTER_HTML,
  );
  const text = [
    `Bonjour ${data.prenom},`,
    "",
    `Votre inscription à l'${event.title} est enregistrée. Nous vous attendons :`,
    "",
    ...venueBoxText(event),
    "",
    closing,
    "",
    `Un empêchement ou une question ? Appelez-nous au ${PHONE} ou répondez à ce message.`,
    "",
    "À bientôt,",
    SIGNATURE,
    "",
    FOOTER_TEXT,
  ].join("\n");
  return { subject, html, text };
}

export function buildEmployeurConfirmationEmail(
  data: DatingEmployeurInput,
  event: DatingEvent,
): BuiltEmail {
  const f = eventFacts(event);
  const subject = oneLine(
    `${event.title} du ${f.dateLongLower} à ${event.venue.city} : votre venue est confirmée`,
  );
  const deroule =
    "Déroulé : accueil et présentation du parcours en dix minutes, puis entretiens de quinze minutes avec les candidats que vous choisissez. Nous montons ensuite le dossier de contrat avec vous.";
  const html = layout(
    "Venue confirmée",
    `${event.title} · ${event.venue.city}`,
    `      <p style="margin:0 0 16px">Bonjour ${escapeHtml(data.prenom)} ${escapeHtml(data.nom)},</p>
      <p style="margin:0 0 16px">Merci d'avoir confirmé votre venue à l'${escapeHtml(event.title)}. Nous vous attendons :</p>
${venueBoxHtml(event)}
      <p style="margin:0 0 16px">${escapeHtml(deroule)}</p>
      <p style="margin:0 0 16px">Une question d'ici là ? Appelez-nous au <a href="${PHONE_HREF}" style="color:${NAVY};font-weight:600;text-decoration:none">${PHONE}</a> ou répondez à ce message.</p>
      <p style="margin:24px 0 0">Bien cordialement,</p>
      <p style="margin:0;font-weight:600;color:${NAVY}">${escapeHtml(SIGNATURE)}</p>`,
    FOOTER_HTML,
  );
  const text = [
    `Bonjour ${data.prenom} ${data.nom},`,
    "",
    `Merci d'avoir confirmé votre venue à l'${event.title}. Nous vous attendons :`,
    "",
    ...venueBoxText(event),
    "",
    deroule,
    "",
    `Une question d'ici là ? Appelez-nous au ${PHONE} ou répondez à ce message.`,
    "",
    "Bien cordialement,",
    SIGNATURE,
    "",
    FOOTER_TEXT,
  ].join("\n");
  return { subject, html, text };
}
