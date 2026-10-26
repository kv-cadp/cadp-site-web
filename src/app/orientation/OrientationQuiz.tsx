"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import {
  riasecQs,
  riasecDesc,
  riasecColors,
  riasecLabels,
  secteurs,
  calculateScores,
  type ScoreResult,
} from "@/data/orientation-candidat";
import NewTabHint from "@/components/ui/NewTabHint";
import FormPrivacyNotice from "@/components/ui/FormPrivacyNotice";
import { candidatureUrl } from "@/lib/inscription";
import { transmettreDemande } from "@/lib/preinscription/actions";
import { envoyerParEmail } from "@/lib/preinscription/secours-email";

type Phase = "quiz" | "results";

export default function OrientationQuiz() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1 — Profil
  const [niveau, setNiveau] = useState("");
  const [situation, setSituation] = useState("");
  const [autreSituation, setAutreSituation] = useState("");

  // Step 2 — RIASEC
  const [riasecAnswers, setRiasecAnswers] = useState<Record<number, number>>({});

  // Step 3 — Préférences
  const [selectedSecteurs, setSelectedSecteurs] = useState<Set<string>>(new Set());
  const [compOral, setCompOral] = useState(3);
  const [compChiffres, setCompChiffres] = useState(3);
  const [compOrga, setCompOrga] = useState(3);
  const [compEcoute, setCompEcoute] = useState(3);

  // Step 4 — Projet
  const [duree, setDuree] = useState("");
  const [priorite, setPriorite] = useState("");
  const [permis, setPermis] = useState("");

  // Results
  const [results, setResults] = useState<ScoreResult[]>([]);
  const [riasecScores, setRiasecScores] = useState<Record<string, number>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Contact form
  const [showContact, setShowContact] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactEnvoi, setContactEnvoi] = useState<"idle" | "submitting" | "error">("idle");
  /** true : enregistrée dans CADP Connect (accusé de réception envoyé) ; false : envoi de secours par e-mail */
  const [contactConnect, setContactConnect] = useState(false);
  const [contactForm, setContactForm] = useState({
    prenom: "", nom: "", email: "", telephone: "", ville: "", commentaire: "",
  });

  // Navigation
  const next = () => { if (step < totalSteps) { setStep(step + 1); window.scrollTo(0, 0); } };
  const prev = () => { if (step > 1) { setStep(step - 1); window.scrollTo(0, 0); } };
  const progress = phase === "results" ? 100 : (step / totalSteps) * 100;

  // RIASEC answer handler
  const setRiasecScore = (qIndex: number, score: number) => {
    setRiasecAnswers({ ...riasecAnswers, [qIndex]: score });
  };

  // Sector toggle
  const toggleSecteur = (val: string) => {
    const next = new Set(selectedSecteurs);
    if (next.has(val)) next.delete(val); else next.add(val);
    setSelectedSecteurs(next);
  };

  // Calculate & show results
  const calculate = useCallback(() => {
    // Sum RIASEC scores per dimension
    const scores: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    riasecQs.forEach((q, i) => {
      scores[q.dim] += riasecAnswers[i] || 0;
    });
    setRiasecScores(scores);

    const res = calculateScores(
      scores,
      niveau || "bac",
      Array.from(selectedSecteurs),
      compOral, compChiffres, compOrga, compEcoute,
      duree, priorite
    );
    setResults(res);
    setPhase("results");
    window.scrollTo(0, 0);
  }, [riasecAnswers, niveau, selectedSecteurs, compOral, compChiffres, compOrga, compEcoute, duree, priorite]);

  // Draw radar chart
  useEffect(() => {
    if (phase !== "results" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, R = 110;
    ctx.clearRect(0, 0, W, H);

    const dims = ["R", "I", "A", "S", "E", "C"];
    const labels = Object.values(riasecLabels);
    const maxVal = 10;
    const angles = dims.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / 6);

    // Grid
    [0.2, 0.4, 0.6, 0.8, 1.0].forEach((pct) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const x = cx + Math.cos(angles[i]) * R * pct;
        const y = cy + Math.sin(angles[i]) * R * pct;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "#E8E6E3";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Axes
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angles[i]) * R, cy + Math.sin(angles[i]) * R);
      ctx.strokeStyle = "#D4D1CC";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const val = (riasecScores[dims[i]] || 0) / maxVal;
      const x = cx + Math.cos(angles[i]) * R * val;
      const y = cy + Math.sin(angles[i]) * R * val;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = "rgba(201,168,76,0.2)";
    ctx.fill();
    ctx.strokeStyle = "#C9A84C";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dots + labels
    for (let i = 0; i < 6; i++) {
      const val = (riasecScores[dims[i]] || 0) / maxVal;
      const x = cx + Math.cos(angles[i]) * R * val;
      const y = cy + Math.sin(angles[i]) * R * val;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = riasecColors[dims[i]];
      ctx.fill();

      const lx = cx + Math.cos(angles[i]) * (R + 24);
      const ly = cy + Math.sin(angles[i]) * (R + 24);
      ctx.font = "bold 10px DM Sans, sans-serif";
      ctx.fillStyle = riasecColors[dims[i]];
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[i], lx, ly);
    }
  }, [phase, riasecScores]);

  // Contact submit : CADP Connect, ou e-mail à l'équipe en secours
  const submitContact = async () => {
    if (!contactForm.prenom || !contactForm.nom || !contactForm.email || !contactForm.telephone) {
      alert("Merci de remplir au minimum : prénom, nom, email et téléphone.");
      return;
    }
    setContactEnvoi("submitting");
    const sorted = Object.entries(riasecScores).sort((a, b) => b[1] - a[1]);
    const profilCode = sorted[0][0] + sorted[1][0];
    const top3 = results.slice(0, 3).map((r) => r.formation);
    const recommandations = top3.map((f) => `${f.name} — ${f.full}`);
    const situationTexte = situation === "autre" ? autreSituation.trim() || "autre" : situation;

    try {
      const r = await transmettreDemande({
        intention: "orientation",
        prenom: contactForm.prenom,
        nom: contactForm.nom,
        email: contactForm.email,
        telephone: contactForm.telephone,
        formations: top3.filter((f) => f.isCadp).map((f) => f.key),
        profil: profilCode,
        recommandations,
        situation: situationTexte || undefined,
        ville: contactForm.ville.trim() || undefined,
        message: contactForm.commentaire.trim() || undefined,
        source: "site_riasec",
        url_source: "site_orientation",
      });
      if (r.ok) {
        setContactConnect(true);
        setContactSent(true);
        setContactEnvoi("idle");
        return;
      }
    } catch {
      // Action serveur injoignable : envoi de secours ci-dessous
    }

    const envoye = await envoyerParEmail({
      subject: `Candidature orientation — ${contactForm.prenom} ${contactForm.nom}`,
      from_name: `${contactForm.prenom} ${contactForm.nom}`,
      email: contactForm.email,
      telephone: contactForm.telephone,
      ville: contactForm.ville || "-",
      situation: situationTexte || "-",
      profil: profilCode,
      formations: recommandations.map((f, i) => `${i + 1}. ${f}`).join("\n"),
      commentaire: contactForm.commentaire || "-",
      source: "site_orientation",
    });
    if (envoye) {
      setContactConnect(false);
      setContactSent(true);
      setContactEnvoi("idle");
    } else {
      setContactEnvoi("error");
    }
  };

  // Restart
  const restart = () => {
    setPhase("quiz");
    setStep(1);
    setNiveau("");
    setSituation("");
    setRiasecAnswers({});
    setSelectedSecteurs(new Set());
    setCompOral(3); setCompChiffres(3); setCompOrga(3); setCompEcoute(3);
    setDuree(""); setPriorite(""); setPermis("");
    setResults([]); setRiasecScores({});
    setShowContact(false); setContactSent(false); setContactEnvoi("idle"); setContactConnect(false);
    setContactForm({ prenom: "", nom: "", email: "", telephone: "", ville: "", commentaire: "" });
    window.scrollTo(0, 0);
  };

  // PDF export
  const exportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    const pw = doc.internal.pageSize.width;
    const m = 20;

    doc.setFontSize(14);
    doc.setTextColor(20, 30, 60);
    doc.setFont("helvetica", "bold");
    doc.text("CADP — Bilan d'orientation", pw / 2, y, { align: "center" });
    y += 12;

    if (contactForm.prenom) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      doc.text(`Candidat : ${contactForm.prenom} ${contactForm.nom}`, m, y);
      y += 5;
      if (contactForm.email) doc.text(`Email : ${contactForm.email} | Tel : ${contactForm.telephone || "-"}`, m, y);
      y += 10;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 30, 60);
    doc.text("Profil RIASEC", m, y);
    y += 7;

    const sorted = Object.entries(riasecScores).sort((a, b) => b[1] - a[1]);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    sorted.forEach(([dim, score]) => {
      doc.text(`${dim} (${riasecLabels[dim]}) : ${score}/10`, m, y);
      y += 5;
    });
    y += 5;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Formations recommandees", m, y);
    y += 8;

    doc.setFontSize(9);
    results.slice(0, 5).forEach((r, i) => {
      doc.setFont("helvetica", "bold");
      if (i === 0) doc.setTextColor(27, 107, 58); else doc.setTextColor(100, 100, 100);
      doc.text(`${i + 1}. ${r.formation.name} — ${r.formation.full}${r.formation.isCadp ? " (CADP)" : ""}`, m, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`   ${r.formation.niv} | ${r.formation.duree} | ${r.formation.rythme}`, m, y);
      y += 4;
      const lines = doc.splitTextToSize(`   ${r.formation.desc}`, pw - 2 * m);
      doc.text(lines, m, y);
      y += lines.length * 4 + 6;
    });

    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text("CADP — Campus Alternance Drome Provence — 2 bd Frederic Mistral, 26700 Pierrelatte", pw / 2, doc.internal.pageSize.height - 10, { align: "center" });

    const filename = contactForm.prenom ? `Bilan_${contactForm.prenom}_${contactForm.nom}.pdf` : "Bilan_orientation_CADP.pdf";
    doc.save(filename);
  };

  // ============================================================
  // RENDER
  // ============================================================

  const stepLabels = ["Profil", "·", "Intérêts", "·", "Préférences", "·", "Projet"];

  return (
    <div className="min-h-screen bg-navy-deep/95 py-5 px-4">
      <div className="max-w-[880px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-navy-deep to-navy-light text-white px-6 py-7 text-center">
          <h1 className="font-serif text-xl md:text-2xl text-gold mb-1">
            Trouve ta formation en quelques minutes
          </h1>
          <p className="text-sm text-cream/70">
            Ce test analyse ton profil et te recommande les formations qui te correspondent vraiment.
            On est honnêtes : si ta voie n&apos;est pas chez nous, on te le dit quand même.
          </p>

          {/* Step indicator */}
          {phase === "quiz" && (
            <>
              <div className="flex justify-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-wider">
                {stepLabels.map((label, i) => (
                  <span
                    key={i}
                    aria-hidden={label === "·" || undefined}
                    aria-current={i === (step - 1) * 2 ? "step" : undefined}
                    className={
                      i === (step - 1) * 2
                        ? "text-gold"
                        : "text-white/60"
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div
                role="progressbar"
                aria-label="Progression du test"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                className="w-full h-1 bg-white/15 rounded mt-2.5 overflow-hidden"
              >
                <div
                  className="h-full bg-gold rounded transition-all duration-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-9">
          {/* ==================== STEP 1 ==================== */}
          {phase === "quiz" && step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Ton profil</h2>
              <p className="text-gray-mid text-sm mb-6">Avant toute chose, apprenons à te connaître.</p>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-dark mb-2.5">Quel est ton dernier diplôme obtenu (ou en cours) ?</p>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "aucun", l: "Aucun diplôme / Brevet" },
                    { v: "cap", l: "CAP / BEP" },
                    { v: "bac", l: "Baccalauréat (général, techno ou pro)" },
                    { v: "bac2", l: "Bac+2 (BTS, DUT, L2...)" },
                    { v: "bac3plus", l: "Bac+3 ou plus" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setNiveau(opt.v)} aria-pressed={niveau === opt.v}
                      className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                        niveau === opt.v
                          ? "border-gold bg-gold/5 font-semibold"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-dark mb-2.5">Quelle est ta situation actuelle ?</p>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "lyceen", l: "Lycéen(ne) / Étudiant(e)" },
                    { v: "demandeur", l: "Demandeur(se) d'emploi" },
                    { v: "salarie", l: "Salarié(e) en reconversion" },
                    { v: "autre", l: "Autre situation" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setSituation(opt.v)} aria-pressed={situation === opt.v}
                      className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${
                        situation === opt.v
                          ? "border-gold bg-gold/5 font-semibold"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {opt.l}
                    </button>
                  ))}
                  {situation === "autre" && (
                    <input
                      type="text"
                      placeholder="Précise ta situation"
                      value={autreSituation}
                      onChange={(e) => setAutreSituation(e.target.value)}
                      className="mt-2 w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-deep"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
                <button onClick={next} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">
                  Suivant →
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 2 — RIASEC ==================== */}
          {phase === "quiz" && step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Tes centres d&apos;intérêt</h2>
              <p className="text-gray-mid text-sm mb-6">
                Pour chaque affirmation, indique dans quelle mesure elle te correspond. Réponds spontanément, il n&apos;y a pas de bonne ou mauvaise réponse.
              </p>

              <div className="space-y-3">
                {riasecQs.map((q, idx) => (
                  <div key={idx} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-dark mb-3">{q.text}</p>
                    <div role="group" aria-label={q.text} className="flex items-center justify-between gap-1">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setRiasecScore(idx, score)}
                          aria-pressed={riasecAnswers[idx] === score}
                          className={`flex-1 py-2 px-1 rounded-md text-xs text-center transition-all ${
                            riasecAnswers[idx] === score
                              ? "bg-gold/15 text-navy-deep font-bold border-2 border-gold"
                              : "text-gray-mid hover:bg-gray-100"
                          }`}
                        >
                          {score === 1 ? "Pas du tout" : score === 2 ? "Peu" : score === 3 ? "Moyen" : score === 4 ? "Assez" : "Tout à fait"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button onClick={prev} className="px-6 py-3 bg-gray-200 text-gray-dark rounded-lg font-semibold text-sm hover:bg-gray-300 transition-all">
                  ← Précédent
                </button>
                <button onClick={next} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">
                  Suivant →
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 3 — PRÉFÉRENCES ==================== */}
          {phase === "quiz" && step === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Tes préférences</h2>
              <p className="text-gray-mid text-sm mb-6">Dans quel univers aimerais-tu travailler ?</p>

              <p className="text-sm font-semibold text-gray-dark mb-3">Secteurs d&apos;activité qui t&apos;attirent (plusieurs choix possibles)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {secteurs.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => toggleSecteur(s.value)}
                    aria-pressed={selectedSecteurs.has(s.value)}
                    className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedSecteurs.has(s.value)
                        ? "border-gold bg-gold/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-dark block">{s.label}</span>
                    <span className="text-xs text-gray-mid">{s.desc}</span>
                  </button>
                ))}
              </div>

              <p className="text-sm font-semibold text-gray-dark mb-3">Auto-évaluation de tes compétences</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Aisance à l'oral", value: compOral, set: setCompOral, opts: ["Plutôt timide", "Correct", "À l'aise", "Très à l'aise"] },
                  { label: "Aisance avec les chiffres", value: compChiffres, set: setCompChiffres, opts: ["Plutôt difficile", "Correct", "À l'aise", "Très à l'aise"] },
                  { label: "Sens de l'organisation", value: compOrga, set: setCompOrga, opts: ["À améliorer", "Correct", "Bien organisé(e)", "Très méthodique"] },
                  { label: "Écoute et empathie", value: compEcoute, set: setCompEcoute, opts: ["Plutôt réservé(e)", "Correct", "Attentif(ve)", "Très à l'écoute"] },
                ].map((comp) => (
                  <div key={comp.label}>
                    <label className="block text-xs font-semibold text-gray-mid mb-1">{comp.label}</label>
                    <select
                      value={comp.value}
                      onChange={(e) => comp.set(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-navy-deep"
                    >
                      {comp.opts.map((opt, i) => (
                        <option key={i} value={i + 2}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button onClick={prev} className="px-6 py-3 bg-gray-200 text-gray-dark rounded-lg font-semibold text-sm hover:bg-gray-300 transition-all">
                  ← Précédent
                </button>
                <button onClick={next} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">
                  Suivant →
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 4 — PROJET ==================== */}
          {phase === "quiz" && step === 4 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Ton projet</h2>
              <p className="text-gray-mid text-sm mb-6">Dernière étape avant tes résultats personnalisés.</p>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-dark mb-2.5">Durée de formation souhaitée</p>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "12", l: "12 mois (Titre pro ou Bachelor)" },
                    { v: "24", l: "24 mois (BTS)" },
                    { v: "indiff", l: "Peu importe" },
                  ].map((opt) => (
                    <button key={opt.v} type="button" onClick={() => setDuree(opt.v)} aria-pressed={duree === opt.v}
                      className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${duree === opt.v ? "border-gold bg-gold/5 font-semibold" : "border-gray-200 hover:border-gray-300"}`}
                    >{opt.l}</button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-dark mb-2.5">Ta priorité</p>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "emploi", l: "Trouver un emploi rapidement" },
                    { v: "passion", l: "Exercer un métier qui me plaît" },
                    { v: "salaire", l: "Avoir un bon salaire" },
                    { v: "polyvalence", l: "Être polyvalent(e)" },
                  ].map((opt) => (
                    <button key={opt.v} type="button" onClick={() => setPriorite(opt.v)} aria-pressed={priorite === opt.v}
                      className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${priorite === opt.v ? "border-gold bg-gold/5 font-semibold" : "border-gray-200 hover:border-gray-300"}`}
                    >{opt.l}</button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-dark mb-2.5">Permis et véhicule</p>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "permis_vehicule", l: "Oui, permis et véhicule" },
                    { v: "permis_seul", l: "Permis, mais pas de véhicule" },
                    { v: "encours", l: "Permis en cours" },
                    { v: "non", l: "Non" },
                  ].map((opt) => (
                    <button key={opt.v} type="button" onClick={() => setPermis(opt.v)} aria-pressed={permis === opt.v}
                      className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${permis === opt.v ? "border-gold bg-gold/5 font-semibold" : "border-gray-200 hover:border-gray-300"}`}
                    >{opt.l}</button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button onClick={prev} className="px-6 py-3 bg-gray-200 text-gray-dark rounded-lg font-semibold text-sm hover:bg-gray-300 transition-all">
                  ← Précédent
                </button>
                <button onClick={calculate} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">
                  Voir mes résultats →
                </button>
              </div>
            </div>
          )}

          {/* ==================== RESULTS ==================== */}
          {phase === "results" && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl text-navy-deep mb-1">Tes résultats personnalisés</h2>
                <p className="text-gray-mid text-sm">Voici les formations qui correspondent le mieux à ton profil.</p>
              </div>

              {/* Radar */}
              <div className="text-center mb-7 p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-serif text-navy-deep text-lg mb-4">Ton profil RIASEC</h3>
                <canvas ref={canvasRef} width={300} height={300} className="mx-auto" />
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {Object.entries(riasecScores)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([dim, score]) => (
                      <span
                        key={dim}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: riasecColors[dim] + "20",
                          color: riasecColors[dim],
                        }}
                      >
                        {dim} : {score}/10
                      </span>
                    ))}
                </div>
                <div className="bg-gold/10 rounded-lg p-4 mt-4 text-left text-sm text-navy-deep">
                  {(() => {
                    const sorted = Object.entries(riasecScores).sort((a, b) => b[1] - a[1]);
                    const top = sorted[0][0];
                    const sec = sorted[1][0];
                    return (
                      <>
                        <strong>Ton profil dominant : {top}{sec}</strong>
                        <br />{riasecDesc[top]}
                        <br />{riasecDesc[sec]}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Formation results */}
              <div className="space-y-3 mb-8">
                {results.slice(0, 5).map((r, i) => {
                  const f = r.formation;
                  const rankLabel = i === 0 ? "Meilleure correspondance" : i === 1 ? "Très adapté" : "Adapté";
                  const isCadp = f.isCadp;

                  return (
                    <div
                      key={f.key}
                      className={`p-5 rounded-lg border-l-4 ${
                        isCadp
                          ? i === 0
                            ? "border-l-success bg-success/5"
                            : i === 1
                              ? "border-l-gold bg-gold/5"
                              : "border-l-gray-300 bg-gray-50"
                          : "border-l-gray-300 bg-gray-50"
                      }`}
                    >
                      {/* Rank badge */}
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2 text-white ${
                          isCadp
                            ? i === 0
                              ? "bg-success"
                              : i === 1
                                ? "bg-gold text-navy-deep"
                                : "bg-gray-mid"
                            : "bg-gray-mid"
                        }`}
                      >
                        {rankLabel}
                      </span>

                      {/* CADP / Non-CADP badge */}
                      {isCadp ? (
                        <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-success/10 text-success">
                          Proposée au CADP
                        </span>
                      ) : (
                        <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-gray-200 text-gray-mid">
                          Non disponible au CADP
                        </span>
                      )}

                      <h3 className="font-serif text-lg text-navy-deep mt-2">{f.name}</h3>
                      <p className="text-xs text-gray-mid mb-2">{f.full} — {f.niv} — {f.duree} — {f.rythme}</p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {f.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-mid text-sm mb-3">{f.desc}</p>

                      <div className="bg-white p-3 rounded-lg text-xs text-gray-mid">
                        <strong className="text-gray-dark block mb-1 text-xs">Débouchés :</strong>
                        {f.debouches.join(" — ")}
                      </div>

                      {/* CTA */}
                      {isCadp ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {/* Nouvel onglet : les résultats du test restent ouverts */}
                          <a
                            href={candidatureUrl(f.key, "site_riasec")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gold text-navy-deep rounded-lg font-semibold text-xs hover:bg-gold-light transition-colors"
                          >
                            Candidater à cette formation
                            <NewTabHint />
                          </a>
                          <Link
                            href={`/formations/${f.slug}`}
                            className="px-4 py-2 border border-gray-300 text-gray-mid rounded-lg font-semibold text-xs hover:border-gold hover:text-navy-deep transition-colors"
                          >
                            Voir la fiche
                          </Link>
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-gray-mid italic">
                          Cette formation correspond à ton profil mais n&apos;est pas proposée au Campus Alternance Drôme Provence.
                          Renseigne-toi sur{" "}
                          <a href="https://www.parcoursup.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-navy-deep font-semibold underline decoration-gold decoration-2 underline-offset-4">
                            Parcoursup
                            <NewTabHint />
                          </a>{" "}
                          ou auprès des CFA de ta région.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-navy-deep to-navy-light rounded-2xl p-7 text-center text-white mb-8">
                <h3 className="font-serif text-gold text-lg mb-2">Envie d&apos;en savoir plus ?</h3>
                <p className="text-sm text-white/70 mb-4">
                  Un conseiller CADP peut t&apos;accompagner dans ton orientation et ta recherche d&apos;entreprise.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => setShowContact(true)}
                    className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all"
                  >
                    Être recontacté(e)
                  </button>
                  <button
                    onClick={exportPDF}
                    className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold text-sm hover:bg-white/20 transition-all"
                  >
                    Télécharger le PDF
                  </button>
                  <button
                    onClick={restart}
                    className="px-6 py-3 bg-gray-200/20 text-white/70 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    Recommencer
                  </button>
                </div>
              </div>

              {/* Contact section */}
              {showContact && !contactSent && (
                <div className="border-t-2 border-gold pt-6 animate-fade-in">
                  <h3 className="font-serif text-lg text-navy-deep mb-4">Tes coordonnées</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { id: "prenom", label: "Prénom", required: true },
                      { id: "nom", label: "Nom", required: true },
                      { id: "email", label: "Email", required: true, type: "email" },
                      { id: "telephone", label: "Téléphone", required: true, type: "tel" },
                      { id: "ville", label: "Ville", required: false },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-semibold text-gray-mid mb-1">
                          {field.label} {field.required && <span className="text-navy-deep">*</span>}
                        </label>
                        <input
                          type={field.type || "text"}
                          value={contactForm[field.id as keyof typeof contactForm]}
                          onChange={(e) => setContactForm({ ...contactForm, [field.id]: e.target.value })}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-deep"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-mid mb-1">Commentaire</label>
                    <textarea
                      rows={3}
                      value={contactForm.commentaire}
                      onChange={(e) => setContactForm({ ...contactForm, commentaire: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-deep resize-none"
                    />
                  </div>
                  {contactEnvoi === "error" && (
                    <div role="alert" className="bg-error/10 border border-error/20 rounded-lg p-4 text-error text-sm mb-4">
                      Une erreur est survenue. Appelle-nous directement au{" "}
                      <a href="tel:+33475003456" className="font-semibold underline">04 75 00 34 56</a>.
                    </div>
                  )}
                  <button
                    onClick={submitContact}
                    disabled={contactEnvoi === "submitting"}
                    className="px-6 py-3 bg-success text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactEnvoi === "submitting" ? "Envoi en cours..." : "Envoyer ma demande"}
                  </button>
                  <div className="mt-4">
                    <FormPrivacyNotice />
                  </div>
                </div>
              )}

              {contactSent && (
                <div className="text-center py-10 animate-fade-in">
                  <div className="size-14 rounded-full bg-success/10 inline-flex items-center justify-center mb-4">
                    <svg className="size-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-navy-deep text-lg mb-2">Demande bien reçue !</h3>
                  <p className="text-gray-mid text-sm">
                    Merci <strong>{contactForm.prenom}</strong>, un conseiller CADP te recontactera pour discuter de ton orientation.
                  </p>
                  {contactConnect && (
                    <p className="text-gray-mid text-sm mt-2">
                      Tu vas recevoir un e-mail de confirmation qui rappelle les formations recommandées.
                      Pense à regarder dans tes courriers indésirables.
                    </p>
                  )}
                  <p className="text-xs text-gray-mid mt-2">
                    Campus Alternance Drôme Provence — 04 75 00 34 56 — contact@cadp.pro
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer legal */}
        <div className="text-center text-xs text-gray-mid py-4 px-6 border-t border-gray-200">
          CADP — Campus Alternance Drôme Provence — Données confidentielles, usage exclusif orientation
        </div>
      </div>
    </div>
  );
}
