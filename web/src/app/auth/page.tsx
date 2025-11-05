'use client';

import AuthForm from "@/components/forms/AuthForm";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function AuthPage() {
  const user = useAppSelector((state) => state.auth.user);

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-sm text-orange-500">You&apos;re already signed in</p>
        <h1 className="text-3xl font-semibold text-gray-900">
          Hey {user.name.split(" ")[0]} 👋
        </h1>
        <p className="max-w-md text-sm text-gray-500">
          Explore personalized recommendations, track your orders, and manage
          your saved favourites from the dashboard.
        </p>
        <Link
          href="/"
          className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 pb-24">
      <AuthForm />
      <p className="text-xs text-gray-400">
        Authentication is simulated locally using secure JWT-style tokens for
        demo purposes.
      </p>
    </div>
  );
}
