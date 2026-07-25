import Link from "next/link";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { LinkButton } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <span className="inline-block h-8 w-8 rounded-full bg-secondary" aria-hidden />
          <span>
            {BRAND.name}
            <span className="block text-[10px] font-normal tracking-wide text-secondary">
              {BRAND.tagline.toUpperCase()}
            </span>
          </span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <LinkButton href="/contacto" variant="primary" className="hidden sm:inline-flex px-4 py-2 text-sm">
          Agendar visita
        </LinkButton>
      </div>
    </header>
  );
}
