'use client';

import CheckoutForm from "@/components/forms/CheckoutForm";
import CartSummary from "@/components/cart/CartSummary";
import { useAppSelector } from "@/store/hooks";

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.products.items);
  const enriched = items
    .map((item) => {
      const product = products.find((product) => product.id === item.productId);
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="space-y-8 pb-12">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Secure checkout
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-gray-900">
          Complete your order
        </h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <CheckoutForm />
        <CartSummary items={enriched} />
      </div>
    </div>
  );
}
