interface StatNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

/**
 * Chiffre clé (accueil, résultats). Affiché directement à sa valeur finale :
 * l'ancien compteur animé partait de 0 et faisait lire « 1 % » ou
 * « 0 département » pendant une seconde et demie (B5, 25/10/2026).
 */
export default function StatNumber({ value, prefix = "", suffix = "", label }: StatNumberProps) {
  return (
    <div className="text-center">
      <div className="font-serif text-4xl md:text-5xl text-navy-deep">
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="w-7 h-[3px] mx-auto mt-2 mb-2 bg-gold rounded-full" aria-hidden="true" />
      <div className="text-gray-mid text-sm uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  );
}
