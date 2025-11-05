'use client';

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import RatingStars from "@/components/shared/RatingStars";
import { calcDiscountedPrice, formatCurrency } from "@/utils/format";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const discountedPrice = calcDiscountedPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <article className="group flex flex-col rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden rounded-3xl">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 90vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-orange-500/90 px-3 py-1 text-xs font-medium text-white shadow">
          -{product.discountPercentage}%
        </span>
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow transition hover:text-orange-500"
        >
          <FiHeart size={18} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {product.brand}
        </p>
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 text-lg font-semibold text-gray-900 transition hover:text-orange-500"
        >
          {product.title}
        </Link>
        <RatingStars rating={product.rating} />
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(discountedPrice)}
            </p>
            <p className="text-xs text-gray-400 line-through">
              {formatCurrency(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(addToCart({ productId: product.id }))}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <FiShoppingBag />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
