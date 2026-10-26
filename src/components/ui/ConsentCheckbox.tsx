interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

/**
 * Accord de présentation du profil aux entreprises, demandé pour une candidature
 * seulement (registre RGPD, T06 et T07) ; CADP Connect le conserve en
 * consentement_rgpd. Une question ou le test d'orientation n'en demandent pas.
 * À garder cohérent avec FormPrivacyNotice et la politique de confidentialité.
 */
export default function ConsentCheckbox({ id, checked, onChange, error }: ConsentCheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          required
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 rounded border-2 border-gray-300 accent-navy-deep"
        />
        <label htmlFor={id} className="text-sm text-gray-dark">
          J&apos;accepte que le CADP enregistre ma candidature dans CADP Connect, son outil de
          recrutement, et présente mon profil aux entreprises qui recrutent des alternants.{" "}<span className="text-navy-deep" aria-hidden="true">*</span>
        </label>
      </div>
      {error && <p id={`${id}-error`} className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
}
