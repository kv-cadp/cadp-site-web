/**
 * Briques de formulaire des inscriptions dating (sans état, sans hook).
 * Utilisées par les formulaires client candidat et employeur.
 */

export function inputClass(hasError: boolean): string {
  return `w-full px-4 py-3 rounded-lg border-2 bg-white text-base sm:text-sm text-gray-dark transition-all focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
    hasError ? "border-error" : "border-gray-200"
  }`;
}

export function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors || errors.length === 0) return null;
  return (
    <p id={id} className="text-error text-sm mt-1">
      {errors[0]}
    </p>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-dark mb-1.5"
    >
      {children}{" "}
      {optional ? (
        <span className="text-gray-mid text-xs font-normal">(facultatif)</span>
      ) : (
        <span className="text-gold" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/** Champ piège pour les robots, hors écran et hors tabulation. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor={id}>Ne pas remplir</label>
      <input
        id={id}
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

export function FormAlert({
  message,
  ref,
}: {
  message?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  if (!message) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className="bg-error/10 border border-error/20 rounded-lg p-4 text-error text-sm focus:outline-none focus:ring-2 focus:ring-error/40"
      role="alert"
    >
      {message}
    </div>
  );
}

/** Choix exclusif en pastilles (radio), avec légende et erreur. */
export function ChoiceGroup({
  name,
  legend,
  options,
  value,
  errors,
  hint,
}: {
  name: string;
  legend: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value?: string;
  errors?: string[];
  hint?: string;
}) {
  const errorId = `err-${name}`;
  const hintId = `hint-${name}`;
  const describedBy =
    [hint ? hintId : "", errors?.length ? errorId : ""].filter(Boolean).join(" ") ||
    undefined;
  return (
    <fieldset
      role="radiogroup"
      aria-required="true"
      aria-invalid={errors?.length ? true : undefined}
      aria-describedby={describedBy}
    >
      <legend className="block text-sm font-medium text-gray-dark mb-2">
        {legend}{" "}
        <span className="text-gold" aria-hidden="true">
          *
        </span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm text-gray-dark transition-colors has-[:checked]:border-navy-deep has-[:checked]:bg-navy-deep has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
              errors?.length ? "border-error" : "border-gray-200 hover:border-gold-pale"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={value === option.value}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
      {hint && (
        <p id={hintId} className="text-gray-mid text-xs mt-2">
          {hint}
        </p>
      )}
      <FieldError id={errorId} errors={errors} />
    </fieldset>
  );
}

export function SuccessPanel({
  title,
  children,
  titleRef,
}: {
  title: string;
  children: React.ReactNode;
  titleRef?: React.Ref<HTMLHeadingElement>;
}) {
  return (
    <div
      className="bg-success/5 border border-success/25 rounded-xl p-6 sm:p-8"
      role="status"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="size-10 shrink-0 rounded-full bg-success/10 inline-flex items-center justify-center">
          <svg
            className="size-5 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 ref={titleRef} tabIndex={-1} className="font-serif text-xl text-navy-deep focus:outline-none">
          {title}
        </h3>
      </div>
      <div className="space-y-4 text-sm text-gray-dark leading-relaxed">
        {children}
      </div>
    </div>
  );
}
