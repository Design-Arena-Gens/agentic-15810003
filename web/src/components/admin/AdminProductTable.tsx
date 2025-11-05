'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteProduct } from "@/store/productsSlice";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

export default function AdminProductTable() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);

  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-orange-50 text-left text-xs font-semibold uppercase tracking-wider text-orange-600">
          <tr>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-orange-50/40">
              <td className="px-6 py-4">
                <p className="font-semibold text-gray-800">{product.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description}
                </p>
              </td>
              <td className="px-6 py-4 text-gray-600">{product.category}</td>
              <td className="px-6 py-4 font-semibold text-gray-900">
                {formatCurrency(
                  product.price * (1 - product.discountPercentage / 100),
                )}
              </td>
              <td className="px-6 py-4 text-gray-600">{product.stock}</td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition hover:border-orange-500 hover:text-orange-500"
                  >
                    <FiExternalLink />
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteProduct(product.id))}
                    className="flex items-center gap-2 rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <p className="p-8 text-center text-sm text-gray-500">
          No products yet. Add one using the form above.
        </p>
      )}
    </div>
  );
}
