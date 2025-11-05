'use client';

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types";

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-black/5 bg-white">
        <Image
          src={product.images[active]}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
          className="object-cover transition duration-500"
        />
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {product.images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border ${
              active === index
                ? "border-orange-500 ring-4 ring-orange-200"
                : "border-black/5"
            }`}
          >
            <Image
              src={image}
              alt={`${product.title} thumbnail ${index + 1}`}
              fill
              sizes="100px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
