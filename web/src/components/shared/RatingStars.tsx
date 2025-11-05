'use client';

import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { getRatingStars } from "@/utils/format";

export default function RatingStars({ rating }: { rating: number }) {
  const stars = getRatingStars(rating);

  return (
    <div className="flex items-center gap-1 text-orange-400">
      {Array.from({ length: stars.full }).map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}
      {stars.half && <FaStarHalfAlt />}
      {Array.from({ length: stars.empty }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
      <span className="ml-2 text-xs text-gray-500">{rating.toFixed(1)}</span>
    </div>
  );
}
