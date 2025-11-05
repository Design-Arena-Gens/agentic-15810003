'use client';

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ProductCard from "./ProductCard";
import { setCategory, setSearchQuery } from "@/store/productsSlice";
import { categories } from "@/data/products";
import { IoMdSearch } from "react-icons/io";

export default function ProductGrid() {
  const dispatch = useAppDispatch();
  const { items, selectedCategory, searchQuery } = useAppSelector(
    (state) => state.products,
  );
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCategory = selectedCategory
        ? item.category === selectedCategory
        : true;
      const query = searchQuery.toLowerCase();
      const matchQuery = query
        ? item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.brand.toLowerCase().includes(query)
        : true;
      return matchCategory && matchQuery;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section className="mt-8 space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Featured Products
          </h3>
          <p className="text-sm text-gray-500">
            Discover best-selling products and curated collections just for you.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(setSearchQuery(localSearch));
          }}
          className="flex w-full max-w-md items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm md:w-auto"
        >
          <IoMdSearch className="text-gray-400" size={18} />
          <input
            type="search"
            value={localSearch}
            onChange={(event) => {
              setLocalSearch(event.target.value);
              if (!event.target.value) {
                dispatch(setSearchQuery(""));
              }
            }}
            placeholder="Search products"
            className="w-full border-none bg-transparent text-sm text-gray-600 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                dispatch(setSearchQuery(""));
              }}
              className="text-xs font-medium text-orange-500"
            >
              Clear
            </button>
          )}
        </form>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              dispatch(
                setCategory(
                  selectedCategory === category.name
                    ? undefined
                    : category.name,
                ),
              )
            }
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedCategory === category.name
                ? "bg-orange-500 text-white"
                : "bg-orange-50 text-orange-500 hover:bg-orange-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-12 text-center text-sm text-orange-600">
          No products match your filters. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
