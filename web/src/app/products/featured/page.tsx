import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProductsPage() {
  const featured = products
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Curated selection
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-gray-900">
          Featured products
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Handpicked bestsellers with top ratings and limited-time offers. These
          products are trending across the NeoCart community this week.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
