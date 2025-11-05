import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReviews from "@/components/product/ProductReviews";
import { products } from "@/data/products";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <ProductReviews product={product} />
    </div>
  );
}
