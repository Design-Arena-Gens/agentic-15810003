import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
        404
      </span>
      <h1 className="mt-4 text-3xl font-semibold text-gray-900">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        The page you&apos;re looking for might have moved or been removed. Explore
        trending collections and find something you love.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Back to home
      </Link>
    </div>
  );
}
