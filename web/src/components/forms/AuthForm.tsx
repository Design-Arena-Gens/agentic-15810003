'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authFailure, authSuccess, startAuth } from "@/store/authSlice";
import { signIn, signUp } from "@/utils/auth";

interface AuthValues {
  name?: string;
  email: string;
  password: string;
}

export default function AuthForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthValues>({
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (values: AuthValues) => {
    dispatch(startAuth());
    try {
      const user = isSignup
        ? await signUp({
            name: values.name ?? "",
            email: values.email,
            password: values.password,
          })
        : await signIn({
            email: values.email,
            password: values.password,
          });
      dispatch(authSuccess(user));
      if (typeof window !== "undefined") {
        window.localStorage.setItem("neocart_session", JSON.stringify(user));
      }
      reset();
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to authenticate.";
      dispatch(authFailure(message));
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-900">
        {isSignup ? "Create your account" : "Welcome back"}
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        {isSignup
          ? "Join NeoCart to manage orders, track deliveries, and explore curated picks."
          : "Sign in to continue shopping and access your personalized dashboard."}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {isSignup && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">
              Full name
            </label>
            <input
              {...register("name", { required: true })}
              className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
              placeholder="Jane Doe"
            />
            {errors.name && (
              <p className="text-xs text-red-500">Name is required.</p>
            )}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500">Email is required.</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
            placeholder="••••••••"
          />
          {errors.password?.type === "required" && (
            <p className="text-xs text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-xs text-red-500">
              Password must be at least 6 characters.
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-75"
        >
          {status === "loading"
            ? "Processing..."
            : isSignup
              ? "Create account"
              : "Sign in"}
        </button>
      </form>
      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      <p className="mt-6 text-center text-xs text-gray-500">
        {isSignup ? "Already have an account?" : "New to NeoCart?"}{" "}
        <button
          type="button"
          onClick={() => setIsSignup((prev) => !prev)}
          className="font-semibold text-orange-500"
        >
          {isSignup ? "Sign in" : "Create account"}
        </button>
      </p>
    </div>
  );
}
