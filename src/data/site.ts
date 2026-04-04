export const SITE = {
  name: "Campus Alternance Drôme Provence",
  shortName: "CADP",
  url: "https://cadp.pro",
  description:
    "Centre de formation en alternance à Pierrelatte. BTS MCO, NDRC, GPME, CG, MOS et TP ADVF en promos de 10-12 étudiants. Accompagnement individualisé et Alternance Dating.",
  address: {
    street: "2 Boulevard Frédéric Mistral",
    postalCode: "26700",
    city: "Pierrelatte",
    region: "Drôme",
    country: "FR",
  },
  phone: "04 75 00 34 56",
  phoneHref: "tel:+33475003456",
  email: "contact@cadp.pro",
  cfa: "CFA IFIR",
  qualiopi: true,
  founded: 2024,
  social: {
    instagram: "https://www.instagram.com/cadp_pierrelatte/",
    linkedin: "https://fr.linkedin.com/company/campus-dr%C3%B4me-provence",
    facebook: "https://www.facebook.com/p/Campus-Dr%C3%B4me-Provence-61565073280869/",
  },
  stats: [
    { value: 6, label: "formations", prefix: "", suffix: "" },
    { value: 50, label: "entreprises partenaires", prefix: "", suffix: "+" },
    { value: 12, label: "étudiants max par promo", prefix: "10-", suffix: "" },
    { value: 4, label: "départements couverts", prefix: "", suffix: "" },
  ],
  hours: "Du lundi au vendredi, 8h30 - 17h00",
  areaServed: ["Drôme", "Ardèche", "Vaucluse", "Gard"],
} as const;
