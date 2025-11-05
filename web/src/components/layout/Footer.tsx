'use client';

import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Warranty", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row">
        <div className="md:w-1/3">
          <p className="mb-3 text-lg font-semibold text-orange-500">NeoCart</p>
          <p className="text-sm text-gray-500">
            Shop the latest trends, premium electronics, lifestyle essentials,
            and everything in between. Fast delivery, trusted sellers, and
            world-class support.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold text-gray-700">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition hover:text-orange-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-black/5 bg-orange-50 py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-gray-500">
          © {new Date().getFullYear()} NeoCart Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
