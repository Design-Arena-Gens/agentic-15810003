'use client';

import { categories } from "@/data/products";
import { useAppDispatch } from "@/store/hooks";
import { setCategory } from "@/store/productsSlice";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import { MdPhoneIphone, MdWeekend } from "react-icons/md";
import {
  GiClothes,
  GiMirrorMirror,
  GiRunningShoe,
  GiToyMallet,
} from "react-icons/gi";
import { FaCarSide } from "react-icons/fa";
import { BsBookHalf } from "react-icons/bs";

const iconMap: Record<string, IconType> = {
  MdPhoneIphone,
  GiClothes,
  MdWeekend,
  GiMirrorMirror,
  GiRunningShoe,
  GiToyMallet,
  FaCarSide,
  BsBookHalf,
};

export default function CategoryGrid() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
    router.push("/");
  };

  return (
    <section
      id="categories"
      className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Shop by category
        </h3>
        <button
          type="button"
          onClick={() => dispatch(setCategory(undefined))}
          className="text-sm font-medium text-orange-500 underline-offset-4 hover:underline"
        >
          View all
        </button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] ?? MdPhoneIphone;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center gap-3 rounded-2xl border border-transparent bg-orange-50 p-5 text-center text-sm font-medium text-gray-600 transition hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-100 hover:text-orange-600"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-orange-500 shadow">
                <Icon size={24} />
              </span>
              {category.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
