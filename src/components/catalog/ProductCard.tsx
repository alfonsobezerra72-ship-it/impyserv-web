import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ProductImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { LinkButton } from "@/components/ui/Button";
import { formatPriceBs } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex h-full flex-col">
      {product.imageUrl ? (
        <div className="relative h-40 w-full">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
        </div>
      ) : (
        <ProductImagePlaceholder className="h-40 w-full" />
      )}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {product.brand}
        </span>
        <h3 className="mt-1 font-semibold text-primary">{product.name}</h3>
        <p className="mt-1 text-sm text-muted">{product.capacityBtu.toLocaleString("es-BO")} BTU</p>
        <p className="mt-3 text-lg font-bold text-primary-accent">{formatPriceBs(product.price)}</p>
        <LinkButton
          href={`/contacto?producto=${product.id}`}
          variant="dark"
          className="mt-4 w-full text-sm"
        >
          Cotizar este equipo
        </LinkButton>
      </div>
    </Card>
  );
}
