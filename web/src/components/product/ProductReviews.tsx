'use client';

import type { Product } from "@/types";
import RatingStars from "@/components/shared/RatingStars";

export default function ProductReviews({ product }: { product: Product }) {
  return (
    <div className="space-y-5 rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Reviews
        </h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {product.rating.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500">
            Based on {product.reviews.length} reviews
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {product.reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{review.user}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <RatingStars rating={review.rating} />
            </div>
            <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
        {product.reviews.length === 0 && (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
            Be the first to review this product.
          </p>
        )}
      </div>
    </div>
  );
}
