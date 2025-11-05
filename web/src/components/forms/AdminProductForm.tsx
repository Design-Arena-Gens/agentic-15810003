'use client';

import { useForm, useFieldArray } from "react-hook-form";
import { useAppDispatch } from "@/store/hooks";
import { addProduct } from "@/store/productsSlice";
import { categories } from "@/data/products";
import type { Category } from "@/types";

interface AdminProductFormValues {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  images: { url: string }[];
  category: Category;
  brand: string;
  stock: number;
  features: { value: string }[];
  tags: string;
}

export default function AdminProductForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discountPercentage: 10,
      images: [{ url: "" }],
      category: "Electronics",
      brand: "",
      stock: 10,
      features: [{ value: "" }],
      tags: "",
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "features" });

  const onSubmit = (values: AdminProductFormValues) => {
    dispatch(
      addProduct({
        title: values.title,
        description: values.description,
        price: Number(values.price),
        discountPercentage: Number(values.discountPercentage),
        stock: Number(values.stock),
        images: values.images.map((image) => image.url).filter(Boolean),
        category: values.category,
        brand: values.brand,
        tags: values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        features: values.features
          .map((feature) => feature.value)
          .filter(Boolean),
      }),
    );
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-900">Add new product</h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">
            Product title
          </label>
          <input
            {...register("title", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="Product name"
          />
          {errors.title && (
            <p className="text-xs text-red-500">Title is required.</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Brand</label>
          <input
            {...register("brand", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="Brand"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">
            Price (USD)
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">
            Discount %
          </label>
          <input
            type="number"
            {...register("discountPercentage", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Stock</label>
          <input
            type="number"
            {...register("stock", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          className="min-h-[120px] w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">
            Image URLs
          </label>
          <button
            type="button"
            onClick={() => appendImage({ url: "" })}
            className="text-xs font-semibold text-orange-500"
          >
            Add image
          </button>
        </div>
        <div className="space-y-2">
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`images.${index}.url`, { required: true })}
                className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
                placeholder="https://..."
              />
              {imageFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-2xl border border-gray-200 px-3 text-xs text-gray-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-600">
            Key features
          </label>
          <button
            type="button"
            onClick={() => appendFeature({ value: "" })}
            className="text-xs font-semibold text-orange-500"
          >
            Add feature
          </button>
        </div>
        <div className="space-y-2">
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`features.${index}.value`, { required: true })}
                className="flex-1 rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
                placeholder="Feature"
              />
              {featureFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="rounded-2xl border border-gray-200 px-3 text-xs text-gray-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Tags</label>
        <input
          {...register("tags")}
          className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          placeholder="Comma separated tags"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Save product
      </button>
    </form>
  );
}
