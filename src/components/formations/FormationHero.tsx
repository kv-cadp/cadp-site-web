import Badge from "@/components/ui/Badge";
import { parisTodayIso } from "@/lib/paris-time";
import type { Formation } from "@/types/formation";

interface FormationHeroProps {
  formation: Formation;
}

export default function FormationHero({ formation }: FormationHeroProps) {
  const sites = formation.rhythm.sites ?? [];
  // Annonce retirée d'elle-même à la date prévue (pages régénérées toutes les heures).
  const intake =
    formation.nextIntake && parisTodayIso() < formation.nextIntake.until
      ? formation.nextIntake
      : undefined;

  return (
    <section className="bg-navy-deep py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="gold" className="mb-6 text-sm">
          {formation.code}
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
          {formation.heroTitle}
        </h1>
        <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          {formation.heroSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
            {formation.level}
          </span>
          <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
            {formation.duration} en alternance
          </span>
          <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
            {formation.rncp}
          </span>
          {sites.length > 0 && (
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
              {sites.map((site) => site.city).join(" · ")}
            </span>
          )}
          {intake && (
            <span className="px-4 py-2 bg-navy-light rounded-lg text-cream text-sm font-medium">
              Entrée en formation : {intake.label}
            </span>
          )}
        </div>

        {/* Définition AEO — paragraphe structuré pour les moteurs de recherche et IA */}
        <p className="text-cream/60 text-sm max-w-3xl mx-auto leading-relaxed">
          {formation.definition ?? (
            <>
              Le {formation.fullName} en alternance au Campus Alternance Drôme Provence (CADP) à Pierrelatte (Drôme) est une formation {formation.level.toLowerCase()} sur {formation.duration}, en promos de 12 étudiants maximum, avec accompagnement individualisé (Alternance Dating, ateliers CV, coaching). Le CADP est adossé au CFA IFIR, certifié Qualiopi.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
