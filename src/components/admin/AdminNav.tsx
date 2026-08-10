import Link from "next/link";
import { signOut } from "@/lib/actions/auth";
import { BRAND } from "@/lib/constants";

export function AdminNav() {
  return (
    <header className="bg-primary text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin/catalogo" className="font-heading font-bold">
            {BRAND.name} · Admin
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/catalogo" className="text-white/80 hover:text-white">
              Catálogo
            </Link>
            <Link href="/admin/proyectos" className="text-white/80 hover:text-white">
              Proyectos
            </Link>
          </nav>
        </div>
        <form action={signOut}>
          <button type="submit" className="text-sm text-white/80 hover:text-white">
            Cerrar sesión
          </button>
        </form>
      </div>
    </header>
  );
}
