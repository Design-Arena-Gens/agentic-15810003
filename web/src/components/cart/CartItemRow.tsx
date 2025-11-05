'use client';

import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { calcDiscountedPrice, formatCurrency } from "@/utils/format";
import type { Product } from "@/types";

interface CartItemRowProps {
  product: Product;
  quantity: number;
}

export default function CartItemRow({ product, quantity }: CartItemRowProps) {
  const dispatch = useAppDispatch();
  const discountedPrice = calcDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:flex-row md:items-center md:gap-8">
      <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-orange-100">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
          {product.category}
        </p>
        <h3 className="text-lg font-semibold text-gray-900">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(discountedPrice * quantity)}
          </p>
          <p className="text-xs text-gray-400 line-through">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
          <button
            type="button"
            onClick={() =>
              dispatch(
                updateQuantity({ productId: product.id, quantity: quantity - 1 }),
              )
            }
            className="text-gray-500 transition hover:text-orange-500"
            aria-label="Decrease quantity"
          >
            <FiMinus />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-gray-700">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              dispatch(
                updateQuantity({ productId: product.id, quantity: quantity + 1 }),
              )
            }
            className="text-gray-500 transition hover:text-orange-500"
            aria-label="Increase quantity"
          >
            <FiPlus />
          </button>
        </div>
        <button
          type="button"
          onClick={() => dispatch(removeFromCart(product.id))}
          className="flex items-center gap-2 text-sm font-medium text-red-500 transition hover:underline"
        >
          <FiTrash2 />
          Remove
        </button>
      </div>
    </div>
  );
}
