'use client';

import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function CartPage() {
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
            Shopping cart
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-gray-900">
            Review your picks
          </h1>
        </div>
        <Link
          href="/"
          className="hidden rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-orange-500 hover:text-orange-500 md:inline-flex"
        >
          Continue shopping
        </Link>
      </div>
      {enriched.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-12 text-center text-sm text-orange-600">
          Your cart is empty. Browse the latest arrivals and add favourites to
          your cart.
          <div className="mt-5">
            <Link
              href="/"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Discover products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {enriched.map(({ product, quantity }) => (
              <CartItemRow
                key={product.id}
                product={product}
                quantity={quantity}
              />
            ))}
          </div>
          <CartSummary items={enriched} />
        </div>
      )}
    </div>
  );
}
