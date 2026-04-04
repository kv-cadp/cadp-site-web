import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-32 bg-white text-center">
      <div className="mx-auto max-w-lg px-4">
        <div className="font-serif text-8xl text-gold mb-6">404</div>
        <h1 className="font-serif text-2xl text-navy-deep mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-mid mb-8">
          La page que tu cherches n&apos;existe pas ou a été déplacée.
          Pas de panique, on te ramène à bon port.
        </p>
        <Button href="/" variant="gold">
          Retour à l&apos;accueil
        </Button>
      </div>
    </section>
  );
}
