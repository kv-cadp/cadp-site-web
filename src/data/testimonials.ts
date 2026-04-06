export interface Testimonial {
  name: string;
  initials: string;
  formation: string;
  year: string;
  quote: string;
  photo?: string; // chemin vers /images/temoignages/xxx.jpg — si absent, initiales affichées
}

export const homeTestimonials: Testimonial[] = [
  {
    name: "Ambre V.",
    initials: "AV",
    formation: "BTS GPME",
    year: "Promo 2024-2026",
    quote:
      "J'ai choisi ce campus pour son ambiance conviviale et ses formations de qualité. Grâce à des intervenants passionnés et engagés, j'ai rapidement gagné en compétences et en confiance pour mon avenir professionnel.",
  },
  {
    name: "Léo B.",
    initials: "LB",
    formation: "BTS NDRC",
    year: "Promo 2024-2026",
    quote:
      "Je recommande fortement le campus. La vie y est parfaite, les cours sont intéressants et diversifiés, et les intervenants sont à l'écoute et nous aident énormément.",
  },
  {
    name: "Dyane R.",
    initials: "DR",
    formation: "BTS GPME",
    year: "Promo 2024-2026",
    quote:
      "Campus à taille humaine, familial et plein d'entrain !",
  },
  {
    name: "Lucas L.",
    initials: "LL",
    formation: "BTS MOS",
    year: "Promo 2024-2026",
    quote:
      "Campus agréable et convivial, tout en restant professionnel, avec des intervenants de qualité. Je recommande.",
  },
];
