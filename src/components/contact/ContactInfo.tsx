import { SITE } from "@/data/site";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* 3 moyens de contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href={SITE.phoneHref}
          className="flex flex-col items-center gap-2 p-5 rounded-xl bg-cream hover:bg-gold-pale transition-colors text-center group"
        >
          <div className="size-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <svg className="size-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-navy-deep">T&eacute;l&eacute;phone</span>
          <span className="text-gold font-bold text-sm">{SITE.phone}</span>
        </a>

        <a
          href={`mailto:${SITE.email}`}
          className="flex flex-col items-center gap-2 p-5 rounded-xl bg-cream hover:bg-gold-pale transition-colors text-center group"
        >
          <div className="size-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <svg className="size-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-navy-deep">Email</span>
          <span className="text-gold font-bold text-sm">{SITE.email}</span>
        </a>

        <div className="flex flex-col items-center gap-2 p-5 rounded-xl bg-cream text-center">
          <div className="size-12 rounded-full bg-gold/10 flex items-center justify-center">
            <svg className="size-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-navy-deep">Adresse</span>
          <span className="text-gray-mid text-sm">{SITE.address.street}<br />{SITE.address.postalCode} {SITE.address.city}</span>
        </div>
      </div>

      {/* Horaires */}
      <div className="flex items-center gap-3 px-4 py-3 bg-cream rounded-lg">
        <svg className="size-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm text-gray-dark">
          <strong>Horaires :</strong> {SITE.hours}
        </span>
      </div>

      {/* Google Maps */}
      <div className="rounded-xl overflow-hidden shadow-sm">
        <iframe
          title="CADP Pierrelatte — 2 Boulevard Frédéric Mistral"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.0!2d4.688!3d44.356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b58d3b2f4c1a1b%3A0x0!2s2%20Boulevard%20Fr%C3%A9d%C3%A9ric%20Mistral%2C%2026700%20Pierrelatte!5e0!3m2!1sfr!2sfr!4v1"
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
