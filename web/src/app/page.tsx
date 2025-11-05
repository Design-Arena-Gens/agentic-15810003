import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/product/ProductGrid";

export default function Home() {
  return (
    <div className="space-y-10 pb-20">
      <HeroSlider />
      <CategoryGrid />
      <ProductGrid />
    </div>
  );
}
