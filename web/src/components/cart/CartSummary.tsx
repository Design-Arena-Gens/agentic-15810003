'use client';

import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import type { Product } from "@/types";

interface CartSummaryProps {
  items: Array<{ product: Product; quantity: number }>;
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (sum, { product, quantity }) =>
      sum +
      product.price * (1 - product.discountPercentage / 100) * quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 0 ? Math.max(9.99 - subtotal * 0.01, 0) : 0;
  const grandTotal = subtotal + shipping;

  return (
    <aside className="space-y-4 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Items ({totalItems})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-500">Free</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>
        <div className="flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="block rounded-full bg-orange-500 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Proceed to checkout
      </Link>
    </aside>
  );
}
