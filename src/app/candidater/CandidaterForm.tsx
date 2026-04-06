"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Intention = "candidater" | "info" | "orientation" | null;
type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_KEY = "71bda4ba-4321-4e90-bc67-28642b72f8a3";

const formationsList = [
  { code: "mco", label: "BTS MCO — Management Commercial Opérationnel" },
  { code: "ndrc", label: "BTS NDRC — Négociation et Digitalisation de la Relation Client" },
  { code: "gpme", label: "BTS GPME — Gestion de la PME" },
  { code: "cg", label: "BTS CG — Comptabilité et Gestion" },
  { code: "mos", label: "BTS MOS — Management Opérationnel de la Sécurité" },
  { code: "advf", label: "TP ADVF — Assistant De Vie aux Familles" },
  { code: "gtla", label: "BTS GTLA — Transport et Logistique (rentrée 2027)" },
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent";

export default function CandidaterForm() {
  const [intention, setIntention] = useState<Intention>(null);
  const [step, setStep] = useState(1);
  const [selectedFormations, setSelectedFormations] = useState<Set<string>>(new Set());
  const [question, setQuestion] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [situation, setSituation] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function chooseIntention(i: Intention) {
    if (i === "orientation") {
      window.location.href = "/orientation";
      return;
    }
    setIntention(i);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFormation(code: string) {
    const next = new Set(selectedFormations);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setSelectedFormations(next);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!prenom.trim()) e.prenom = "Le prénom est requis";
    if (!nom.trim()) e.nom = "Le nom est requis";
    if (!email.trim()) e.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "L'email n'est pas valide";
    if (!telephone.trim()) e.telephone = "Le téléphone est requis";
    if (intention === "candidater" && selectedFormations.size === 0) e.formations = "Sélectionne au moins une formation";
    if (intention === "info" && !question.trim()) e.question = "Dis-nous ce que tu veux savoir";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const formationsText = Array.from(selectedFormations)
      .map((c) => formationsList.find((f) => f.code === c)?.label || c)
      .join(", ");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[CADP ${intention === "candidater" ? "Candidature" : "Demande d'info"}] ${prenom} ${nom}`,
          from_name: `${prenom} ${nom}`,
          email,
          telephone,
          situation,
          intention: intention === "candidater" ? "Candidature" : "Demande d'information",
          formations: formationsText || "Non précisé",
          question: question || "-",
          botcheck: "",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // Build inscription URL with params
  function buildInscriptionUrl(): string {
    const params = new URLSearchParams();
    params.set("source", "site_candidater");
    if (prenom) params.set("prenom", prenom);
    if (nom) params.set("nom", nom);
    if (email) params.set("email", email);
    if (telephone) params.set("telephone", telephone);
    const firstFormation = Array.from(selectedFormations)[0];
    if (firstFormation) params.set("formation", firstFormation);
    return `https://app.cadp.pro/inscription?${params.toString()}`;
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* HERO */}
      <section className="bg-navy-deep py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Parlons de ton projet
          </h1>
          <p className="text-cream/70 max-w-lg mx-auto">
            Que tu saches exactement ce que tu veux ou que tu hésites encore, on est là pour t&apos;aider.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* ==================== SUCCESS ==================== */}
          {status === "success" && (
            <div className="bg-[#E8F5E9] border border-[#2E7D4F]/20 rounded-xl p-8 text-center animate-fade-in">
              <div className="size-14 rounded-full bg-[#2E7D4F]/10 inline-flex items-center justify-center mb-4">
                <svg className="size-7 text-[#2E7D4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-serif text-xl text-navy-deep mb-2">C&apos;est envoyé !</h2>
              <p className="text-[#2E7D4F] font-medium mb-1">
                On te recontacte sous 48h.
              </p>
              <p className="text-gray-mid text-sm mb-6">
                En attendant, tu peux créer ton espace candidat pour avancer sur ton dossier.
              </p>
              <a
                href={buildInscriptionUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                Créer mon espace candidat →
              </a>
            </div>
          )}

          {/* ==================== STEP 1 — INTENTION ==================== */}
          {status !== "success" && step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-2xl text-navy-deep mb-2 text-center">
                Par où veux-tu commencer ?
              </h2>
              <div className="w-16 h-1 mx-auto bg-gold rounded-full mb-10" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Candidater */}
                <button
                  type="button"
                  onClick={() => chooseIntention("candidater")}
                  className="bg-navy-medium rounded-2xl p-6 text-left hover:bg-navy-light transition-colors group"
                >
                  <div className="size-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <svg className="size-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg text-gold mb-2">Je veux candidater</h3>
                  <p className="text-cream/60 text-sm">
                    J&apos;ai choisi ma ou mes formations et je veux démarrer mon inscription.
                  </p>
                </button>

                {/* Info */}
                <button
                  type="button"
                  onClick={() => chooseIntention("info")}
                  className="bg-navy-medium rounded-2xl p-6 text-left hover:bg-navy-light transition-colors group"
                >
                  <div className="size-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <svg className="size-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg text-gold mb-2">Je veux des informations</h3>
                  <p className="text-cream/60 text-sm">
                    Je m&apos;intéresse au CADP mais j&apos;ai encore des questions avant de me décider.
                  </p>
                </button>

                {/* Orientation */}
                <button
                  type="button"
                  onClick={() => chooseIntention("orientation")}
                  className="bg-navy-medium rounded-2xl p-6 text-left hover:bg-navy-light transition-colors group"
                >
                  <div className="size-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <svg className="size-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg text-gold mb-2">Je ne sais pas encore</h3>
                  <p className="text-cream/60 text-sm">
                    Je ne sais pas quelle formation me correspond.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 2 — FORMULAIRE ==================== */}
          {status !== "success" && step === 2 && intention && (
            <div className="animate-fade-in">
              {/* Retour */}
              <button
                type="button"
                onClick={() => { setStep(1); setIntention(null); }}
                className="text-gray-mid hover:text-navy-deep text-sm font-medium transition-colors flex items-center gap-1 mb-8"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Retour
              </button>

              <h2 className="font-serif text-2xl text-navy-deep mb-2">
                {intention === "candidater" ? "Ta candidature" : "Ta question"}
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full mb-8" />

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                {/* Formations */}
                <div>
                  <p className="text-sm font-medium text-gray-dark mb-1">
                    {intention === "candidater"
                      ? "Formation(s) souhaitée(s) *"
                      : "Formation(s) qui t'intéresse(nt)"}
                  </p>
                  {intention === "candidater" && (
                    <p className="text-xs text-gray-mid mb-3">Tu peux en sélectionner plusieurs si tu hésites entre deux formations.</p>
                  )}
                  <div className="space-y-2">
                    {formationsList.map((f) => (
                      <button
                        key={f.code}
                        type="button"
                        onClick={() => toggleFormation(f.code)}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all flex items-center gap-3 ${
                          selectedFormations.has(f.code)
                            ? "border-gold bg-gold/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`size-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                            selectedFormations.has(f.code) ? "bg-gold border-gold" : "border-gray-300"
                          }`}
                        >
                          {selectedFormations.has(f.code) && (
                            <svg className="size-3 text-navy-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-dark font-medium">{f.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.formations && <p className="text-error text-xs mt-1">{errors.formations}</p>}
                </div>

                {/* Question (info only) */}
                {intention === "info" && (
                  <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-dark mb-1.5">
                      Ta question <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="question"
                      rows={4}
                      value={question}
                      onChange={(e) => { setQuestion(e.target.value); if (errors.question) setErrors({ ...errors, question: "" }); }}
                      className={`${inputClass} resize-none ${errors.question ? "border-error" : ""}`}
                      placeholder="Dis-nous ce que tu veux savoir..."
                    />
                    {errors.question && <p className="text-error text-xs mt-1">{errors.question}</p>}
                  </div>
                )}

                {/* Coordonnées */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-dark mb-1.5">
                      Prénom <span className="text-gold">*</span>
                    </label>
                    <input type="text" id="prenom" value={prenom}
                      onChange={(e) => { setPrenom(e.target.value); if (errors.prenom) setErrors({ ...errors, prenom: "" }); }}
                      className={`${inputClass} ${errors.prenom ? "border-error" : ""}`}
                      placeholder="Ton prénom" />
                    {errors.prenom && <p className="text-error text-xs mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-dark mb-1.5">
                      Nom <span className="text-gold">*</span>
                    </label>
                    <input type="text" id="nom" value={nom}
                      onChange={(e) => { setNom(e.target.value); if (errors.nom) setErrors({ ...errors, nom: "" }); }}
                      className={`${inputClass} ${errors.nom ? "border-error" : ""}`}
                      placeholder="Ton nom" />
                    {errors.nom && <p className="text-error text-xs mt-1">{errors.nom}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-1.5">
                    Email <span className="text-gold">*</span>
                  </label>
                  <input type="email" id="email" value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                    className={`${inputClass} ${errors.email ? "border-error" : ""}`}
                    placeholder="ton.email@example.com" />
                  {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-dark mb-1.5">
                    Téléphone <span className="text-gold">*</span>
                  </label>
                  <input type="tel" id="telephone" value={telephone}
                    onChange={(e) => { setTelephone(e.target.value); if (errors.telephone) setErrors({ ...errors, telephone: "" }); }}
                    className={`${inputClass} ${errors.telephone ? "border-error" : ""}`}
                    placeholder="06 XX XX XX XX" />
                  {errors.telephone && <p className="text-error text-xs mt-1">{errors.telephone}</p>}
                </div>

                <div>
                  <label htmlFor="situation" className="block text-sm font-medium text-gray-dark mb-1.5">
                    Situation actuelle
                  </label>
                  <select id="situation" value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className={`${inputClass} bg-white`}>
                    <option value="">— Sélectionne —</option>
                    <option value="Lycéen(ne)">Lycéen(ne)</option>
                    <option value="Étudiant(e)">Étudiant(e)</option>
                    <option value="Salarié(e)">Salarié(e)</option>
                    <option value="Demandeur d'emploi">Demandeur d&apos;emploi</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Error */}
                {status === "error" && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-4 text-error text-sm">
                    Une erreur est survenue. Appelle-nous directement au{" "}
                    <a href="tel:+33475003456" className="font-semibold underline">04 75 00 34 56</a>.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full px-6 py-3.5 bg-gold text-navy-deep rounded-lg font-semibold text-base hover:bg-gold-light transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Envoi en cours..." : "Envoyer"}
                </button>
              </form>
            </div>
          )}

          {/* Lien orientation en bas */}
          {status !== "success" && step === 2 && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <Link
                href="/orientation"
                className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:text-gold-light transition-colors"
              >
                Pas encore sûr de ta formation ? Fais le test d&apos;orientation
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
