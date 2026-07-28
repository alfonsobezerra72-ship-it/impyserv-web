import Link from "next/link";
import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types";

export function FeaturedCatalog({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
        Equipos disponibles
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-muted">
        Split, sistemas centrales y VRF en distintas capacidades, con garantía de 2 años.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/catalogo" className="text-sm font-semibold text-primary-accent hover:underline">
          Ver catálogo completo →
        </Link>
      </div>
    </section>
  );
}
