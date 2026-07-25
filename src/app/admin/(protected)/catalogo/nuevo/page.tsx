import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/products";

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Agregar equipo</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
