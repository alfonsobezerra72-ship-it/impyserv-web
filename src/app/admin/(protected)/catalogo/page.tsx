import Link from "next/link";
import { getAllProductsAdmin } from "@/lib/data/products";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/Button";

export default async function AdminCatalogoPage() {
  const products = await getAllProductsAdmin();

  if (products === null) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-lg font-bold text-primary">Supabase no está configurado</h1>
        <p className="mt-2 text-muted">
          Completa las variables <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> y <code>SUPABASE_SERVICE_ROLE_KEY</code> en{" "}
          <code>.env.local</code> (ver BLUEPRINT.md, Sección 10) para activar el panel de
          administración del catálogo.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Catálogo de equipos</h1>
        <Link href="/admin/catalogo/nuevo">
          <Button variant="dark">Agregar equipo</Button>
        </Link>
      </div>
      <div className="mt-6">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
