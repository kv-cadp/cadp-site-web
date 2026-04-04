"use client";

import { useState, type FormEvent } from "react";

// TODO: Remplacer par la vraie clé Web3Forms
// 1. Va sur https://web3forms.com
// 2. Entre l'email qui doit recevoir les messages (ex: contact@cadp.pro)
// 3. Copie la clé d'accès (access_key) reçue par email
// 4. Colle-la ci-dessous à la place de "YOUR_ACCESS_KEY_HERE"
const WEB3FORMS_KEY = "71bda4ba-4321-4e90-bc67-28642b72f8a3";

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  objet: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
    hasError ? "border-error" : "border-gray-200"
  }`;

export default function ContactForm() {
  const [data, setData] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    objet: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.prenom.trim()) e.prenom = "Le prénom est requis";
    if (!data.nom.trim()) e.nom = "Le nom est requis";
    if (!data.email.trim()) {
      e.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = "L'email n'est pas valide";
    }
    if (!data.telephone.trim()) e.telephone = "Le téléphone est requis";
    if (!data.message.trim()) e.message = "Le message est requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[CADP Contact] ${data.objet || "Nouveau message"} — ${data.prenom} ${data.nom}`,
          from_name: `${data.prenom} ${data.nom}`,
          email: data.email,
          telephone: data.telephone,
          objet: data.objet,
          message: data.message,
          // Honeypot anti-spam (Web3Forms le gère nativement)
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setData({ prenom: "", nom: "", email: "", telephone: "", objet: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setData({ ...data, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  }

  // --- SUCCESS STATE ---
  if (status === "success") {
    return (
      <div className="bg-[#E8F5E9] border border-[#2E7D4F]/20 rounded-xl p-8 text-center">
        <div className="size-14 rounded-full bg-[#2E7D4F]/10 inline-flex items-center justify-center mb-4">
          <svg className="size-7 text-[#2E7D4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-navy-deep mb-2">Message envoy&eacute; !</h3>
        <p className="text-[#2E7D4F] font-medium mb-1">
          On te recontacte sous 48h.
        </p>
        <p className="text-gray-mid text-sm">
          Campus Alternance Dr&ocirc;me Provence &mdash; 04 75 00 34 56
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-gold font-semibold text-sm hover:text-gold-light transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  // --- FORM ---
  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — champ invisible anti-bot */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Nom + Prénom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-dark mb-1.5">
            Pr&eacute;nom <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={data.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
            className={inputClass(!!errors.prenom)}
            placeholder="Ton prénom"
          />
          {errors.prenom && <p className="text-error text-xs mt-1">{errors.prenom}</p>}
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-dark mb-1.5">
            Nom <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={data.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
            className={inputClass(!!errors.nom)}
            placeholder="Ton nom"
          />
          {errors.nom && <p className="text-error text-xs mt-1">{errors.nom}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-1.5">
          Email <span className="text-gold">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClass(!!errors.email)}
          placeholder="ton.email@example.com"
        />
        {errors.email && <p className="text-error text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-gray-dark mb-1.5">
          T&eacute;l&eacute;phone <span className="text-gold">*</span>
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={data.telephone}
          onChange={(e) => handleChange("telephone", e.target.value)}
          className={inputClass(!!errors.telephone)}
          placeholder="06 XX XX XX XX"
        />
        {errors.telephone && <p className="text-error text-xs mt-1">{errors.telephone}</p>}
      </div>

      {/* Objet */}
      <div>
        <label htmlFor="objet" className="block text-sm font-medium text-gray-dark mb-1.5">
          Objet
        </label>
        <select
          id="objet"
          name="objet"
          value={data.objet}
          onChange={(e) => handleChange("objet", e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
        >
          <option value="">— S&eacute;lectionne un objet —</option>
          <option value="Je cherche une formation">Je cherche une formation</option>
          <option value="Je suis une entreprise">Je suis une entreprise</option>
          <option value="Demande d'information générale">Demande d&apos;information g&eacute;n&eacute;rale</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-dark mb-1.5">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={data.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputClass(!!errors.message)} resize-none`}
          placeholder="Dis-nous en quoi on peut t'aider..."
        />
        {errors.message && <p className="text-error text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Erreur */}
      {status === "error" && (
        <div className="bg-[#8B2500]/10 border border-[#8B2500]/20 rounded-lg p-4 text-[#8B2500] text-sm">
          Une erreur est survenue. Appelle-nous directement au{" "}
          <a href="tel:+33475003456" className="font-semibold underline">
            04 75 00 34 56
          </a>.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full px-6 py-3.5 bg-gold text-navy-deep rounded-lg font-semibold text-base hover:bg-gold-light transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Envoi en cours..." : "Envoyer mon message"}
      </button>
    </form>
  );
}
