'use client';

import AdminProductForm from "@/components/forms/AdminProductForm";
import AdminProductTable from "@/components/admin/AdminProductTable";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function AdminPage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Restricted area
        </p>
        <h1 className="text-3xl font-semibold text-gray-900">
          Admin access required
        </h1>
        <p className="max-w-md text-sm text-gray-500">
          Sign in with your administrator account to manage products and
          inventory. Use <code>admin@neocart.com</code> with password
          <code>admin123</code> to explore the dashboard.
        </p>
        <Link
          href="/auth"
          className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
          Admin dashboard
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-gray-900">
          Manage catalog &amp; promotions
        </h1>
      </div>
      <AdminProductForm />
      <AdminProductTable />
    </div>
  );
}
