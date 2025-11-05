'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/productsSlice";
import { signOut } from "@/store/authSlice";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products/featured", label: "Featured" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const [search, setSearch] = useState(searchQuery);
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchQuery(search));
    router.push("/");
  };

  const handleSignOut = () => {
    dispatch(signOut());
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("neocart_session");
    }
    router.push("/");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
          <span className="rounded-md bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-white shadow">
            NeoCart
          </span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="relative hidden w-full max-w-xl items-center md:flex"
        >
          <input
            type="text"
            placeholder="Search for products, brands, and more"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-full border border-gray-300 bg-white px-5 py-2.5 pr-12 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white transition hover:bg-orange-600"
          >
            <IoMdSearch size={18} />
          </button>
        </form>
        <nav className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-500 hover:text-orange-500"
          >
            <FiShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right text-sm md:block">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-orange-500 hover:text-orange-500"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-2 rounded-full border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white"
            >
              <FiUser />
              Sign In
            </Link>
          )}
        </nav>
      </div>
      <div className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3 py-1 transition ${
                pathname === link.href
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
