import "server-only";

import type { InfosContratData } from "@/app/entreprises/infos-contrat/schema";

// dupliqué depuis src/lib/email/templates/dating-inscription.ts (helper non exporté)
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// "AAAA-MM-JJ" -> "JJ/MM/AAAA"
function formatDateFr(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

const NON_RENSEIGNE = "⚠ Non renseigné par l'entreprise";

type Section = { title: string; rows: Array<[string, string]> };

function buildSections(data: InfosContratData): Section[] {
  const idccDisplay = data.idcc_inconnu ? NON_RENSEIGNE : (data.idcc ?? "—");
  const opcoDisplay =
    data.opco === "Je ne sais pas" ? NON_RENSEIGNE : data.opco;

  const entrepriseRows: Array<[string, string]> = [
    ["Raison sociale", data.raison_sociale],
    ["SIRET", data.siret],
  ];
  if (data.adresse_etablissement) {
    entrepriseRows.push([
      "Adresse de l'établissement",
      data.adresse_etablissement,
    ]);
  }
  entrepriseRows.push(["Code IDCC", idccDisplay], ["OPCO", opcoDisplay]);

  const maNomComplet = data.ma_est_interlocuteur
    ? `${data.ma_prenom} ${data.ma_nom}\n(également interlocuteur principal du suivi)`
    : `${data.ma_prenom} ${data.ma_nom}`;

  const sections: Section[] = [
    {
      title: "Alternant(e)",
      rows: [
        ["Prénom", data.apprenti_prenom],
        ["Nom", data.apprenti_nom],
        ["Formation", data.formation],
        ["Début souhaité", formatDateFr(data.date_debut)],
        ["Date de fin souhaitée", formatDateFr(data.date_fin)],
      ],
    },
    {
      title: "Entreprise",
      rows: entrepriseRows,
    },
    {
      title: "Interlocuteur principal",
      rows: [
        ["Prénom", data.interlocuteur_prenom],
        ["Nom", data.interlocuteur_nom],
        ["Email", data.interlocuteur_email],
        ["Téléphone", data.interlocuteur_tel],
      ],
    },
    {
      title: "Maître d'apprentissage",
      rows: [
        ["Nom complet", maNomComplet],
        ["Date de naissance", formatDateFr(data.ma_date_naissance)],
        ["Poste occupé", data.ma_poste],
        ["Niveau de diplôme", data.ma_diplome_niveau],
        ["Intitulé du diplôme", data.ma_diplome_intitule?.trim() || "—"],
        ["Email", data.ma_email],
        ["Téléphone", data.ma_tel],
      ],
    },
  ];

  if (data.commentaire?.trim()) {
    sections.push({
      title: "Divers",
      rows: [["Commentaire", data.commentaire.trim()]],
    });
  }

  return sections;
}

function sectionsToHtml(sections: Section[]): string {
  return sections
    .map((section) => {
      const htmlRows = section.rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-weight:600;vertical-align:top;width:40%">${escapeHtml(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#2C2C2C;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
        )
        .join("");
      return `<h2 style="margin:24px 0 8px;color:#0B1929;font-size:16px;font-weight:600">${escapeHtml(section.title)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">${htmlRows}</table>`;
    })
    .join("\n      ");
}

function sectionsToText(sections: Section[]): string {
  return sections
    .map((section) =>
      [
        section.title,
        "--------------------------------------------------",
        ...section.rows.map(([k, v]) => `${k}: ${v.replace(/\n/g, " ")}`),
      ].join("\n"),
    )
    .join("\n\n");
}

export function buildCfaEmail(data: InfosContratData): {
  subject: string;
  html: string;
  text: string;
} {
  const dateDebutFr = formatDateFr(data.date_debut);
  const subject = `[Contrat alternance] ${data.apprenti_prenom} ${data.apprenti_nom} — ${data.raison_sociale} — informations Cerfa`;

  const intro = `Veuillez trouver ci-dessous les informations transmises par l'entreprise ${data.raison_sociale} en vue de l'établissement du contrat d'apprentissage de ${data.apprenti_prenom} ${data.apprenti_nom} (${data.formation}, début souhaité le ${dateDebutFr}).`;

  const sections = buildSections(data);

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#F5F0E6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#2C2C2C">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
    <div style="background:#0B1929;padding:24px 28px">
      <p style="margin:0;color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">Informations contrat d'alternance</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:600">${escapeHtml(data.apprenti_prenom)} ${escapeHtml(data.apprenti_nom)} — ${escapeHtml(data.raison_sociale)}</h1>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 16px;color:#2C2C2C;font-size:14px;line-height:1.6">Bonjour,<br/>${escapeHtml(intro)}</p>
      ${sectionsToHtml(sections)}
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eee;color:#666;font-size:12px">Email généré automatiquement par le formulaire cadp.pro. Pour répondre à l'entreprise, utilisez simplement Répondre (Reply-To configuré).</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `Bonjour,`,
    ``,
    intro,
    ``,
    sectionsToText(sections),
    ``,
    `—`,
    `Email généré automatiquement par le formulaire cadp.pro. Pour répondre à l'entreprise, utilisez simplement Répondre (Reply-To configuré).`,
  ].join("\n");

  return { subject, html, text };
}

export function buildAccuseEmail(data: InfosContratData): {
  subject: string;
  html: string;
  text: string;
} {
  const dateDebutFr = formatDateFr(data.date_debut);
  const subject = `Votre demande a bien été transmise — contrat d'alternance de ${data.apprenti_prenom} ${data.apprenti_nom}`;

  const confirmation = `Nous avons bien reçu les informations transmises pour l'établissement du contrat d'apprentissage de ${data.apprenti_prenom} ${data.apprenti_nom} (${data.formation}, début souhaité le ${dateDebutFr}). Elles ont été transmises à notre CFA.`;
  const recapIntro = `Récapitulatif de votre saisie :`;
  const suite = `Notre CFA établit le contrat et revient vers vous si besoin. Prochaine étape : la fiche mission, que nous vous transmettrons séparément.`;
  const contact = `Une question ? Contactez-nous : contact@cadp.pro — 04 75 00 34 56.`;

  const sections = buildSections(data);

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#F5F0E6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#2C2C2C">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
    <div style="background:#0B1929;padding:28px">
      <p style="margin:0;color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600">Confirmation de transmission</p>
      <h1 style="margin:10px 0 0;color:#fff;font-size:22px;font-weight:600">Contrat d'alternance de ${escapeHtml(data.apprenti_prenom)} ${escapeHtml(data.apprenti_nom)}</h1>
    </div>
    <div style="padding:24px 28px;font-size:14px;line-height:1.6">
      <p style="margin:0 0 16px">Bonjour,</p>
      <p style="margin:0 0 16px">${escapeHtml(confirmation)}</p>
      <p style="margin:0 0 8px;font-weight:600;color:#0B1929">${escapeHtml(recapIntro)}</p>
      ${sectionsToHtml(sections)}
      <p style="margin:24px 0 16px"><strong>${escapeHtml(suite)}</strong></p>
      <p style="margin:0 0 16px">Une question ? Contactez-nous : <a href="mailto:contact@cadp.pro" style="color:#C9A84C;font-weight:600;text-decoration:none">contact@cadp.pro</a> — <a href="tel:+33475003456" style="color:#C9A84C;font-weight:600;text-decoration:none">04 75 00 34 56</a>.</p>
    </div>
    <div style="padding:18px 28px;background:#F5F0E6;border-top:1px solid #e5e5e5;color:#666;font-size:12px;text-align:center">
      Campus Alternance Drôme Provence — <a href="https://cadp.pro" style="color:#C9A84C;text-decoration:none">cadp.pro</a> — 04 75 00 34 56
    </div>
  </div>
</body></html>`;

  const text = [
    `Bonjour,`,
    ``,
    confirmation,
    ``,
    recapIntro,
    ``,
    sectionsToText(sections),
    ``,
    suite,
    ``,
    contact,
    ``,
    `—`,
    `Campus Alternance Drôme Provence — cadp.pro — 04 75 00 34 56`,
  ].join("\n");

  return { subject, html, text };
}
