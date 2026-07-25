import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">{BRAND.name}</p>
          <p className="mt-1 text-sm text-secondary">{BRAND.tagline}</p>
          <p className="mt-4 text-sm text-white/70">{BRAND.city}</p>
          <p className="text-sm text-white/70">{BRAND.coverage}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-secondary">Navegación</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-secondary">Contacto</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>WhatsApp / Tel: {BRAND.phoneDisplay}</li>
            <li>{BRAND.email}</li>
            <li>{BRAND.hours}</li>
            <li className="font-semibold text-secondary">{BRAND.emergency}</li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm text-white/80">
            <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Facebook
            </a>
            <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={BRAND.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
