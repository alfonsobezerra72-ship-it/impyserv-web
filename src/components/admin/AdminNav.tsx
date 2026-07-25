import Link from "next/link";
import { signOut } from "@/lib/actions/auth";
import { BRAND } from "@/lib/constants";

export function AdminNav() {
  return (
    <header className="bg-primary text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/admin/catalogo" className="font-heading font-bold">
          {BRAND.name} · Admin
        </Link>
        <form action={signOut}>
          <button type="submit" className="text-sm text-white/80 hover:text-white">
            Cerrar sesión
          </button>
        </form>
      </div>
    </header>
  );
}
