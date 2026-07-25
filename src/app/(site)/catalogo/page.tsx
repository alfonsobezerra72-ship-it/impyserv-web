import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { getActiveProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Catálogo de equipos",
  description:
    "Equipos de aire acondicionado split, central y VRF en distintas capacidades (9000 a 60000 BTU) y marcas, con precio y garantía de 2 años.",
};

export default async function CatalogoPage() {
  const products = await getActiveProducts();

  return (
    <>
      <PageHero
        title="Catálogo de equipos"
        subtitle="Split, sistemas centrales y VRF en distintas capacidades, con precio y garantía de 2 años."
      />
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <CatalogClient products={products} />
      </section>
    </>
  );
}
