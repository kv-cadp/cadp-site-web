"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  entrepriseSecteurs,
  missionCommerciales,
  missionAdministratives,
  missionSpecifiques,
  calculateEntrepriseScores,
  simulateCost,
  getAide,
  entrepriseFormations,
} from "@/data/orientation-entreprise";

type Phase = "quiz" | "results";

const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR") + " €";

export default function EntrepriseQuiz() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1
  const [secteur, setSecteur] = useState("");
  const [effectif, setEffectif] = useState("11-49");
  const [dejaAlternant, setDejaAlternant] = useState("non");

  // Step 2
  const [missionsComm, setMissionsComm] = useState<Set<string>>(new Set());
  const [missionsAdmin, setMissionsAdmin] = useState<Set<string>>(new Set());
  const [missionsSpec, setMissionsSpec] = useState<Set<string>>(new Set());

  // Step 3
  const [niveaux, setNiveaux] = useState<Set<string>>(new Set());
  const [quand, setQuand] = useState("");
  const [rythme, setRythme] = useState("");
  const [permisReq, setPermisReq] = useState("");
  const [samedi, setSamedi] = useState("");

  // Results
  const [results, setResults] = useState<{ key: string; formation: typeof entrepriseFormations[string]; points: number }[]>([]);

  // Simulator
  const [simAge, setSimAge] = useState(20);
  const [simFormation, setSimFormation] = useState("bts-24");
  const [simHandicap, setSimHandicap] = useState("non");

  // Contact
  const [showContact, setShowContact] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    entreprise: "", nom: "", prenom: "", email: "", telephone: "", fonction: "", commentaire: "",
  });

  const progress = phase === "results" ? 100 : (step / totalSteps) * 100;
  const next = () => { if (step < totalSteps) { setStep(step + 1); window.scrollTo(0, 0); } };
  const prev = () => { if (step > 1) { setStep(step - 1); window.scrollTo(0, 0); } };

  const toggle = (set: Set<string>, val: string, setter: (s: Set<string>) => void) => {
    const n = new Set(set);
    if (n.has(val)) n.delete(val); else n.add(val);
    setter(n);
  };

  const calculate = useCallback(() => {
    const res = calculateEntrepriseScores(
      secteur,
      Array.from(missionsComm),
      Array.from(missionsAdmin),
      Array.from(missionsSpec),
      Array.from(niveaux),
      samedi
    );
    setResults(res);

    // Auto-select simulator formation
    if (res.length > 0) {
      const top = res[0].formation;
      if (top.nc <= 4) setSimFormation("tp-12");
      else if (top.nc === 5) setSimFormation("bts-24");
      else setSimFormation("bachelor-12");
    }

    setPhase("results");
    window.scrollTo(0, 0);
  }, [secteur, missionsComm, missionsAdmin, missionsSpec, niveaux, samedi]);

  const sim = useMemo(
    () => simulateCost(simAge, simFormation, effectif, simHandicap === "oui"),
    [simAge, simFormation, effectif, simHandicap]
  );

  const restart = () => {
    setPhase("quiz"); setStep(1); setSecteur(""); setEffectif("11-49");
    setMissionsComm(new Set()); setMissionsAdmin(new Set()); setMissionsSpec(new Set());
    setNiveaux(new Set()); setQuand(""); setRythme(""); setPermisReq(""); setSamedi("");
    setResults([]); setShowContact(false); setContactSent(false);
    setContactForm({ entreprise: "", nom: "", prenom: "", email: "", telephone: "", fonction: "", commentaire: "" });
    window.scrollTo(0, 0);
  };

  const submitContact = () => {
    if (!contactForm.entreprise || !contactForm.nom || !contactForm.email || !contactForm.telephone) {
      alert("Merci de remplir au minimum : entreprise, nom, email et téléphone.");
      return;
    }
    const top3 = results.slice(0, 3).map((r, i) => `${i + 1}. ${r.formation.name} — ${r.formation.full}`).join("\n");
    const subject = `Demande alternance — ${contactForm.entreprise}`;
    const body = `ENTREPRISE : ${contactForm.entreprise}\nCONTACT : ${contactForm.prenom} ${contactForm.nom}\nFONCTION : ${contactForm.fonction || "-"}\nEMAIL : ${contactForm.email}\nTEL : ${contactForm.telephone}\n\nFORMATIONS RECOMMANDÉES :\n${top3}\n\nÉconomie estimée : ${fmt(sim.eco)}\n\n${contactForm.commentaire || ""}`;
    window.location.href = `mailto:contact@cadp.pro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setContactSent(true);
  };

  const exportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    const pw = doc.internal.pageSize.width;
    const m = 20;

    doc.setFontSize(14); doc.setTextColor(20, 30, 60); doc.setFont("helvetica", "bold");
    doc.text("CADP — Recommandation de formation en alternance", pw / 2, y, { align: "center" });
    y += 12;

    if (contactForm.entreprise) {
      doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(50, 50, 50);
      doc.text(`Entreprise : ${contactForm.entreprise}`, m, y); y += 5;
      if (contactForm.nom) doc.text(`Contact : ${contactForm.prenom} ${contactForm.nom}${contactForm.fonction ? " — " + contactForm.fonction : ""}`, m, y); y += 5;
      if (contactForm.email) doc.text(`Email : ${contactForm.email} | Tel : ${contactForm.telephone || "-"}`, m, y); y += 10;
    }

    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(20, 30, 60);
    doc.text("Formations recommandees", m, y); y += 8;

    doc.setFontSize(9);
    results.slice(0, 3).forEach((r, i) => {
      const d = r.formation;
      const aide = getAide(d.nc, effectif, false);
      doc.setFont("helvetica", "bold");
      if (i === 0) doc.setTextColor(27, 107, 58); else doc.setTextColor(100, 100, 100);
      doc.text(`${i + 1}. ${d.name} — ${d.full}`, m, y); y += 5;
      doc.setFont("helvetica", "normal"); doc.setTextColor(100, 100, 100);
      doc.text(`   ${d.niveau} | ${d.duree} | Aide : ${aide.toLocaleString("fr-FR")} EUR`, m, y); y += 7;
    });

    y += 3;
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(20, 30, 60);
    doc.text("Simulation de cout", m, y); y += 7;
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.text(`Cout CDI equivalent : ${fmt(sim.coutCDI)}`, m, y); y += 5;
    doc.text(`Cout alternant (aide deduite) : ${fmt(sim.coutNet)}`, m, y); y += 5;
    doc.setFont("helvetica", "bold"); doc.setTextColor(27, 107, 58);
    doc.text(`Economie : ${fmt(sim.eco)} (soit ${Math.round(sim.ecoPct)}%)`, m, y);

    doc.setFontSize(7); doc.setTextColor(150, 150, 150);
    doc.text("CADP — Campus Alternance Drome Provence — 2 bd Frederic Mistral, 26700 Pierrelatte", pw / 2, doc.internal.pageSize.height - 10, { align: "center" });

    doc.save(contactForm.entreprise ? `Recommandation_${contactForm.entreprise}.pdf` : "Recommandation_CADP.pdf");
  };

  const stepLabels = ["Activité", "·", "Missions", "·", "Critères"];

  return (
    <div className="min-h-screen bg-navy-deep/95 py-5 px-4">
      <div className="max-w-[880px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-navy-deep to-navy-light text-white px-6 py-7 text-center">
          <h1 className="font-serif text-xl md:text-2xl text-gold mb-1">Quel alternant pour votre entreprise ?</h1>
          <p className="text-sm text-cream/70">
            Décrivez vos besoins en quelques clics. On vous recommande le profil et la formation adaptés, avec simulation du coût.
          </p>
          {phase === "quiz" && (
            <>
              <div className="flex justify-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-wider">
                {stepLabels.map((label, i) => (
                  <span key={i} className={i === (step - 1) * 2 ? "text-gold" : "text-white/30"}>{label}</span>
                ))}
              </div>
              <div className="w-full h-1 bg-white/15 rounded mt-2.5 overflow-hidden">
                <div className="h-full bg-gold rounded transition-all duration-400" style={{ width: `${progress}%` }} />
              </div>
            </>
          )}
        </div>

        <div className="p-6 md:p-9">
          {/* ==================== STEP 1 — ACTIVITÉ ==================== */}
          {phase === "quiz" && step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Votre activité</h2>
              <p className="text-gray-mid text-sm mb-6">Dans quel secteur exerce votre entreprise ?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {entrepriseSecteurs.map((s) => (
                  <button key={s.value} type="button" onClick={() => setSecteur(s.value)}
                    className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${secteur === s.value ? "border-gold bg-gold/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <span className="text-sm font-semibold text-gray-dark block">{s.label}</span>
                    <span className="text-xs text-gray-mid">{s.desc}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-mid mb-1">Effectif de l&apos;entreprise</label>
                  <select value={effectif} onChange={(e) => setEffectif(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-navy-deep">
                    <option value="1-10">1 à 10 salariés</option>
                    <option value="11-49">11 à 49 salariés</option>
                    <option value="50-249">50 à 249 salariés</option>
                    <option value="250+">250 salariés et plus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-mid mb-1">Déjà eu un alternant ?</label>
                  <select value={dejaAlternant} onChange={(e) => setDejaAlternant(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-navy-deep">
                    <option value="oui-cadp">Oui, via le CADP</option>
                    <option value="oui-autre">Oui, via un autre CFA</option>
                    <option value="non">Non</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
                <button onClick={next} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">
                  Suivant →
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 2 — MISSIONS ==================== */}
          {phase === "quiz" && step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Les missions du poste</h2>
              <p className="text-gray-mid text-sm mb-6">Cochez toutes les missions que vous souhaitez confier à l&apos;alternant.</p>

              {[
                { title: "Missions commerciales", items: missionCommerciales, set: missionsComm, setter: setMissionsComm },
                { title: "Missions administratives et gestion", items: missionAdministratives, set: missionsAdmin, setter: setMissionsAdmin },
                { title: "Missions spécifiques", items: missionSpecifiques, set: missionsSpec, setter: setMissionsSpec },
              ].map((section) => (
                <div key={section.title} className="mb-6">
                  <p className="text-sm font-semibold text-gray-dark mb-3">{section.title}</p>
                  <div className="flex flex-col gap-2">
                    {section.items.map((m) => (
                      <button key={m.value} type="button" onClick={() => toggle(section.set, m.value, section.setter)}
                        className={`text-left px-4 py-3 rounded-lg border-2 transition-all flex items-start gap-3 ${section.set.has(m.value) ? "border-gold bg-gold/5" : "border-gray-200 hover:border-gray-300"}`}>
                        <div className={`size-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${section.set.has(m.value) ? "bg-gold border-gold" : "border-gray-300"}`}>
                          {section.set.has(m.value) && (
                            <svg className="size-3 text-navy-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-dark block">{m.label}</span>
                          <span className="text-xs text-gray-mid">{m.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button onClick={prev} className="px-6 py-3 bg-gray-200 text-gray-dark rounded-lg font-semibold text-sm hover:bg-gray-300 transition-all">← Précédent</button>
                <button onClick={next} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">Suivant →</button>
              </div>
            </div>
          )}

          {/* ==================== STEP 3 — CRITÈRES ==================== */}
          {phase === "quiz" && step === 3 && (
            <div className="animate-fade-in">
              <h2 className="font-serif text-xl text-navy-deep mb-1">Vos critères</h2>
              <p className="text-gray-mid text-sm mb-6">Quelques précisions pour affiner la recommandation.</p>

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-dark mb-2.5">Niveau de formation recherché (plusieurs choix possibles)</p>
                <div className="flex flex-col gap-2">
                  {[
                    { v: "tp", l: "Niveau CAP / Bac (Titre professionnel)", d: "12 mois, missions d'exécution/assistance" },
                    { v: "bts", l: "Niveau Bac+2 (BTS)", d: "24 mois, technicien supérieur polyvalent" },
                    { v: "indifferent", l: "Indifférent — conseillez-moi", d: "Le profil compte plus que le diplôme" },
                  ].map((opt) => (
                    <button key={opt.v} type="button" onClick={() => toggle(niveaux, opt.v, setNiveaux)}
                      className={`text-left px-4 py-3 rounded-lg border-2 transition-all flex items-start gap-3 ${niveaux.has(opt.v) ? "border-gold bg-gold/5" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className={`size-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${niveaux.has(opt.v) ? "bg-gold border-gold" : "border-gray-300"}`}>
                        {niveaux.has(opt.v) && <svg className="size-3 text-navy-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-dark block">{opt.l}</span>
                        <span className="text-xs text-gray-mid">{opt.d}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-dark mb-2">Travail le samedi ?</p>
                  <div className="flex gap-2">
                    {[{ v: "oui", l: "Oui" }, { v: "non", l: "Non" }].map((o) => (
                      <button key={o.v} type="button" onClick={() => setSamedi(o.v)}
                        className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${samedi === o.v ? "border-gold bg-gold/5" : "border-gray-200 hover:border-gray-300"}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-dark mb-2">Permis requis ?</p>
                  <div className="flex gap-2">
                    {[{ v: "oui", l: "Oui" }, { v: "non", l: "Non" }].map((o) => (
                      <button key={o.v} type="button" onClick={() => setPermisReq(o.v)}
                        className={`flex-1 px-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${permisReq === o.v ? "border-gold bg-gold/5" : "border-gray-200 hover:border-gray-300"}`}>
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <button onClick={prev} className="px-6 py-3 bg-gray-200 text-gray-dark rounded-lg font-semibold text-sm hover:bg-gray-300 transition-all">← Précédent</button>
                <button onClick={calculate} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">Voir les recommandations →</button>
              </div>
            </div>
          )}

          {/* ==================== RESULTS ==================== */}
          {phase === "results" && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl text-navy-deep mb-1">Nos recommandations</h2>
                <p className="text-gray-mid text-sm">Voici les profils d&apos;alternants adaptés à vos besoins.</p>
              </div>

              {/* Top 3 */}
              <div className="space-y-3 mb-8">
                {results.slice(0, 3).map((r, i) => {
                  const f = r.formation;
                  const maxPts = results[0]?.points || 1;
                  const pct = Math.round((r.points / maxPts) * 100);
                  const aide = getAide(f.nc, effectif, false);
                  const rankLabel = i === 0 ? "Meilleure correspondance" : i === 1 ? "Très adapté" : "Adapté";

                  return (
                    <div key={f.key} className={`p-5 rounded-lg border-l-4 ${i === 0 ? "border-l-success bg-success/5" : i === 1 ? "border-l-gold bg-gold/5" : "border-l-gray-300 bg-gray-50"}`}>
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-2 text-white ${i === 0 ? "bg-success" : i === 1 ? "bg-gold text-navy-deep" : "bg-gray-mid"}`}>
                        {rankLabel} ({pct}%)
                      </span>
                      <h3 className="font-serif text-lg text-navy-deep">{f.name}</h3>
                      <p className="text-xs text-gray-mid mb-2">{f.full} — {f.niveau} — {f.duree} — Aide employeur : {aide.toLocaleString("fr-FR")} €</p>
                      <p className="text-gray-mid text-sm mb-3">{f.desc}</p>
                      <div className="bg-white p-3 rounded-lg text-xs text-gray-mid">
                        <strong className="text-gray-dark block mb-1">Missions confiables à ce profil :</strong>
                        <ul className="list-disc list-inside space-y-0.5">
                          {f.missions.map((m) => <li key={m}>{m}</li>)}
                        </ul>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link href={`/formations/bts-${f.key === "advf" ? "" : ""}${f.key === "advf" ? "tp-advf" : f.key}`}
                          className="px-4 py-2 bg-gold text-navy-deep rounded-lg font-semibold text-xs hover:bg-gold-light transition-colors">
                          Voir la fiche formation
                        </Link>
                        <Link href="/contact" className="px-4 py-2 border border-gold text-gold rounded-lg font-semibold text-xs hover:bg-gold hover:text-navy-deep transition-colors">
                          Nous contacter
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estimation de coût */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="font-serif text-navy-deep text-lg mb-1">
                  Estimation du coût sur {sim.duree === 12 ? "1 an" : `${sim.duree / 12} ans`}
                </h3>
                <p className="text-xs text-gray-mid mb-5">
                  Montants calculés sur la durée totale du contrat ({sim.duree} mois), à temps de présence en entreprise identique ({Math.round(sim.hEnt)}h).
                  Base de calcul : SMIC brut mensuel en vigueur = 1 823,03 €.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-mid mb-1">Âge de l&apos;alternant</label>
                    <select value={simAge} onChange={(e) => setSimAge(Number(e.target.value))}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-navy-deep">
                      <option value={17}>16-17 ans</option>
                      <option value={20}>18-20 ans</option>
                      <option value={23}>21-25 ans</option>
                      <option value={28}>26 ans et +</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-mid mb-1">Type de formation</label>
                    <select value={simFormation} onChange={(e) => setSimFormation(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-navy-deep">
                      <option value="tp-12">Titre pro (12 mois)</option>
                      <option value="bts-24">BTS (24 mois)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-mid mb-1">RQTH</label>
                    <select value={simHandicap} onChange={(e) => setSimHandicap(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-navy-deep">
                      <option value="non">Non</option>
                      <option value="oui">Oui</option>
                    </select>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-mid mb-4">
                  {sim.tranche} : {Math.round(sim.taux * 100)}% du SMIC ({Math.round(sim.brutMens)} € brut/mois)
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-mid mb-1">Coût CDI équivalent</p>
                    <p className="text-lg font-bold text-gray-dark">{fmt(sim.coutCDI)}</p>
                    <p className="text-[10px] text-gray-mid">sur {sim.duree} mois — {Math.round(sim.hEnt)}h en entreprise</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-mid mb-1">Coût alternant</p>
                    <p className="text-lg font-bold text-gold">{fmt(sim.coutNet)}</p>
                    <p className="text-[10px] text-gray-mid">sur {sim.duree} mois — aide de {fmt(sim.aide)} déduite</p>
                  </div>
                  <div className="bg-success/5 rounded-xl p-4">
                    <p className="text-xs text-gray-mid mb-1">Économie estimée</p>
                    <p className="text-lg font-bold text-success">{fmt(sim.eco)}</p>
                    <p className="text-[10px] text-success">soit {Math.round(sim.ecoPct)}% sur {sim.duree} mois</p>
                  </div>
                </div>

                {/* Encadré avertissement */}
                <div className="bg-cream border-l-4 border-gold rounded-lg p-4 mb-5">
                  <p className="text-gray-dark text-sm italic leading-relaxed">
                    Cette estimation est fournie à titre indicatif. Le coût réel dépend de la convention collective applicable, de l&apos;âge de l&apos;alternant et de sa situation. Pour un calcul précis et personnalisé, contactez le CADP.
                  </p>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a
                    href="tel:+33475003456"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Obtenir un calcul précis
                  </a>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-navy-deep to-navy-light rounded-2xl p-7 text-center text-white mb-8">
                <h3 className="font-serif text-gold text-lg mb-2">Prêt à recruter votre alternant ?</h3>
                <p className="text-sm text-white/70 mb-4">Un conseiller CADP vous accompagne dans le recrutement et les démarches administratives.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={() => setShowContact(true)} className="px-6 py-3 bg-gold text-navy-deep rounded-lg font-semibold text-sm hover:bg-gold-light transition-all">
                    Être recontacté(e)
                  </button>
                  <button onClick={exportPDF} className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-semibold text-sm hover:bg-white/20 transition-all">
                    Télécharger le PDF
                  </button>
                  <button onClick={restart} className="px-6 py-3 bg-gray-200/20 text-white/70 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all">
                    Recommencer
                  </button>
                </div>
              </div>

              {/* Contact */}
              {showContact && !contactSent && (
                <div className="border-t-2 border-gold pt-6 animate-fade-in">
                  <h3 className="font-serif text-lg text-navy-deep mb-4">Vos coordonnées</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {[
                      { id: "entreprise", label: "Entreprise", required: true },
                      { id: "nom", label: "Nom", required: true },
                      { id: "prenom", label: "Prénom" },
                      { id: "fonction", label: "Fonction" },
                      { id: "email", label: "Email", required: true, type: "email" },
                      { id: "telephone", label: "Téléphone", required: true, type: "tel" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-semibold text-gray-mid mb-1">
                          {field.label} {field.required && <span className="text-gold">*</span>}
                        </label>
                        <input type={field.type || "text"}
                          value={contactForm[field.id as keyof typeof contactForm]}
                          onChange={(e) => setContactForm({ ...contactForm, [field.id]: e.target.value })}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-deep" />
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-mid mb-1">Commentaire</label>
                    <textarea rows={3} value={contactForm.commentaire}
                      onChange={(e) => setContactForm({ ...contactForm, commentaire: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-deep resize-none" />
                  </div>
                  <button onClick={submitContact} className="px-6 py-3 bg-success text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all">
                    Envoyer ma demande
                  </button>
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
                  <p className="text-gray-mid text-sm">Un conseiller CADP vous recontactera rapidement.</p>
                  <p className="text-xs text-gray-mid mt-2">04 75 00 34 56 — contact@cadp.pro</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-mid py-4 px-6 border-t border-gray-200">
          CADP — Campus Alternance Drôme Provence — Données confidentielles
        </div>
      </div>
    </div>
  );
}
