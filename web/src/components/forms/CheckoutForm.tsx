'use client';

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAddress,
  setOrderNote,
  setPaymentMethod,
  resetCheckout,
} from "@/store/checkoutSlice";
import type { ShippingAddress } from "@/types";
import { clearCart } from "@/store/cartSlice";
import { useState } from "react";

interface CheckoutFormValues extends ShippingAddress {
  paymentMethod: "card" | "cod" | "paypal";
  note?: string;
}

export default function CheckoutForm() {
  const dispatch = useAppDispatch();
  const checkout = useAppSelector((state) => state.checkout);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [orderComplete, setOrderComplete] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: checkout.address
      ? {
          ...checkout.address,
          paymentMethod: checkout.paymentMethod ?? "card",
          note: checkout.note,
        }
      : {
          fullName: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          addressLine: "",
          postalCode: "",
          paymentMethod: "card",
        },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    dispatch(
      setAddress({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        country: values.country,
        city: values.city,
        addressLine: values.addressLine,
        postalCode: values.postalCode,
      }),
    );
    dispatch(setPaymentMethod(values.paymentMethod));
    dispatch(setOrderNote(values.note));
    dispatch(clearCart());
    reset();
    setOrderComplete(true);
    setTimeout(() => {
      dispatch(resetCheckout());
      setOrderComplete(false);
    }, 4000);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-8 text-center text-sm text-orange-600">
        Your cart is empty. Add items to proceed with checkout.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-900">
        Delivery Information
      </h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-gray-600">Full Name</label>
          <input
            {...register("fullName", { required: true })}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="Jane Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">Name is required.</p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">Email is required.</p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Phone</label>
          <input
            {...register("phone", { required: true })}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Country</label>
          <input
            {...register("country", { required: true })}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="United States"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">City</label>
          <input
            {...register("city", { required: true })}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="San Francisco"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">
            Postal Code
          </label>
          <input
            {...register("postalCode", { required: true })}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="94105"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600">
          Address Line
        </label>
        <input
          {...register("addressLine", { required: true })}
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          placeholder="123 Market Street"
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-800">Payment Method</h4>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            { value: "card", label: "Credit / Debit Card" },
            { value: "paypal", label: "PayPal" },
            { value: "cod", label: "Cash on Delivery" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-600 transition hover:border-orange-500"
            >
              <input
                type="radio"
                value={option.value}
                {...register("paymentMethod", { required: true })}
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600">
          Order Notes (optional)
        </label>
        <textarea
          {...register("note")}
          className="mt-2 min-h-[90px] w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          placeholder="Add delivery instructions or preferences"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Confirm &amp; place order
      </button>
      {orderComplete && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          Order placed successfully! A confirmation email has been sent.
        </p>
      )}
    </form>
  );
}
