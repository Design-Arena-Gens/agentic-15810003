'use client';

import RatingStars from "@/components/shared/RatingStars";
import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { calcDiscountedPrice, formatCurrency } from "@/utils/format";
import type { Product } from "@/types";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductInfo({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const discountedPrice = calcDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <div className="space-y-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          {product.brand}
        </p>
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <RatingStars rating={product.rating} />
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>
      <div className="rounded-2xl bg-orange-50 p-4">
        <p className="text-sm text-orange-500">Limited time deal</p>
        <div className="mt-3 flex items-baseline gap-3">
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(discountedPrice)}
          </p>
          <p className="text-sm text-gray-400 line-through">
            {formatCurrency(product.price)}
          </p>
          <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            Save {product.discountPercentage}%
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-500">Incl. all taxes</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => dispatch(addToCart({ productId: product.id }))}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 md:flex-none md:px-8"
        >
          <FiShoppingCart />
          Add to cart
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-500 hover:text-orange-500 md:flex-none md:px-8"
        >
          Buy now
        </button>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">Key Features</h3>
        <ul className="mt-3 grid list-inside list-disc gap-2 text-sm text-gray-600 md:grid-cols-2">
          {product.features?.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">Availability</h3>
        <p className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          In stock · {product.stock} units remaining
        </p>
      </div>
    </div>
  );
}
