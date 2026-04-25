import "server-only";

export interface DatingInscriptionData {
  civilite: "M." | "Mme";
  prenom: string;
  nom: string;
  fonction: string;
  entreprise: string;
  siret?: string;
  email: string;
  telephone: string;
  secteurActivite: string;
  zoneGeo: "Drôme" | "Ardèche" | "Vaucluse" | "Gard" | "Autre";
  formations: string[];
  nbPostes: "1" | "2-3" | "4-5" | "6+";
  commentaire?: string;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EVENT_DATE = "mercredi 27 mai 2026";
const EVENT_TIME = "14h – 16h";
const EVENT_VENUE = "CADP Pierrelatte — 2 Boulevard Frédéric Mistral, 26700 Pierrelatte";

export function buildAdminEmail(data: DatingInscriptionData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `[Dating 27/05] Nouvelle inscription — ${data.entreprise}`;

  const rows: Array<[string, string]> = [
    ["Civilité", data.civilite],
    ["Prénom", data.prenom],
    ["Nom", data.nom],
    ["Fonction", data.fonction],
    ["Entreprise", data.entreprise],
    ["SIRET", data.siret || "—"],
    ["Email", data.email],
    ["Téléphone", data.telephone],
    ["Secteur d'activité", data.secteurActivite],
    ["Zone géographique", data.zoneGeo],
    ["Formations ciblées", data.formations.join(", ")],
    ["Nombre de postes", data.nbPostes],
    ["Commentaire", data.commentaire?.trim() || "—"],
  ];

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-weight:600;vertical-align:top;width:40%">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#2C2C2C;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#F5F0E6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#2C2C2C">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
    <div style="background:#0B1929;padding:24px 28px">
      <p style="margin:0;color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">Alternance Dating — 27 mai 2026</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:600">Nouvelle inscription entreprise</h1>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 16px;color:#666;font-size:14px">Une entreprise vient de s'inscrire via le formulaire public.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${htmlRows}</table>
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eee;color:#666;font-size:12px">CADP — notification automatique.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `Nouvelle inscription — Alternance Dating 27 mai 2026`,
    `--------------------------------------------------`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  return { subject, html, text };
}

export function buildAccuseEmail(data: DatingInscriptionData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Inscription Alternance Dating 27 mai 2026 — confirmation`;

  const greeting = data.civilite === "M." ? "Monsieur" : "Madame";

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#F5F0E6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#2C2C2C">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
    <div style="background:#0B1929;padding:28px">
      <p style="margin:0;color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">Confirmation d'inscription</p>
      <h1 style="margin:10px 0 0;color:#fff;font-size:24px;font-weight:600">Alternance Dating — 27 mai 2026</h1>
    </div>
    <div style="padding:28px;font-size:15px;line-height:1.6">
      <p style="margin:0 0 16px">${greeting} ${escapeHtml(data.nom)},</p>
      <p style="margin:0 0 16px">Nous avons bien reçu l'inscription de <strong>${escapeHtml(data.entreprise)}</strong> à l'Alternance Dating du 27 mai 2026. Merci de votre intérêt.</p>
      <div style="background:#F5F0E6;border-left:3px solid #C9A84C;padding:16px 20px;border-radius:6px;margin:20px 0">
        <p style="margin:0 0 4px;font-weight:600;color:#0B1929">📅 ${EVENT_DATE}</p>
        <p style="margin:0 0 4px;color:#2C2C2C">🕑 ${EVENT_TIME}</p>
        <p style="margin:0;color:#2C2C2C">📍 ${EVENT_VENUE}</p>
      </div>
      <p style="margin:0 0 16px"><strong>Nous reprendrons contact avec vous sous 48h</strong> pour qualifier vos besoins et pré-sélectionner les profils à vous présenter le jour J. L'objectif : que vous ne rencontriez que des candidats pertinents pour vos postes.</p>
      <p style="margin:0 0 16px">En attendant, si vous avez une question urgente, n'hésitez pas à nous appeler au <a href="tel:+33475003456" style="color:#C9A84C;font-weight:600;text-decoration:none">04 75 00 34 56</a>.</p>
      <p style="margin:24px 0 4px">Bien cordialement,</p>
      <p style="margin:0;font-weight:600;color:#0B1929">Kévin Vidard</p>
      <p style="margin:0;color:#666;font-size:13px">Directeur — CADP Pierrelatte</p>
    </div>
    <div style="padding:18px 28px;background:#F5F0E6;border-top:1px solid #e5e5e5;color:#666;font-size:12px;text-align:center">
      Campus Alternance Drôme Provence — <a href="https://cadp.pro" style="color:#C9A84C;text-decoration:none">cadp.pro</a> — 04 75 00 34 56
    </div>
  </div>
</body></html>`;

  const text = [
    `${greeting} ${data.nom},`,
    ``,
    `Nous avons bien reçu l'inscription de ${data.entreprise} à l'Alternance Dating du 27 mai 2026. Merci de votre intérêt.`,
    ``,
    `📅 ${EVENT_DATE}`,
    `🕑 ${EVENT_TIME}`,
    `📍 ${EVENT_VENUE}`,
    ``,
    `Nous reprendrons contact avec vous sous 48h pour qualifier vos besoins et pré-sélectionner les profils à vous présenter le jour J. L'objectif : que vous ne rencontriez que des candidats pertinents pour vos postes.`,
    ``,
    `En attendant, si vous avez une question urgente, n'hésitez pas à nous appeler au 04 75 00 34 56.`,
    ``,
    `Bien cordialement,`,
    `Kévin Vidard`,
    `Directeur — CADP Pierrelatte`,
    ``,
    `—`,
    `Campus Alternance Drôme Provence — cadp.pro — 04 75 00 34 56`,
  ].join("\n");

  return { subject, html, text };
}
