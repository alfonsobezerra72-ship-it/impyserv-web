import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/actions/products";
import { getProductByIdAdmin } from "@/lib/data/products";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductoPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);

  if (!product) notFound();

  const action = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Editar equipo</h1>
      <div className="mt-6">
        <ProductForm action={action} product={product} />
      </div>
    </div>
  );
}
