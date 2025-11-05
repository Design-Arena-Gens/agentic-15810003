'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    id: "slide-1",
    title: "Mega Electronics Festival",
    description: "Save up to 40% on flagship gadgets, smart TVs & gaming rigs.",
    cta: "Shop Electronics",
    href: "/#electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "slide-2",
    title: "Style That Moves",
    description: "Discover premium fashion with exclusive summer collections.",
    cta: "Explore Fashion",
    href: "/#fashion",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1500&q=80",
  },
  {
    id: "slide-3",
    title: "Home Essentials Upgrade",
    description:
      "Transform every corner with curated furniture, decor, and kitchenware.",
    cta: "Upgrade Home",
    href: "/#home",
    image:
      "https://images.unsplash.com/photo-1505692794403-34d4982c0be0?auto=format&fit=crop&w=1500&q=80",
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl">
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)`, display: "flex" }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-full min-h-[340px] w-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(120deg, rgba(17,17,17,0.75), rgba(17,17,17,0.45)), url(${slide.image})` }}
          >
            <div className="flex h-full w-full flex-col justify-center gap-4 p-10 md:p-16">
              <span className="w-max rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-200">
                Trending now
              </span>
              <h2 className="max-w-xl text-3xl font-bold md:text-5xl">
                {slide.title}
              </h2>
              <p className="max-w-lg text-sm text-gray-200 md:text-base">
                {slide.description}
              </p>
              <Link
                href={slide.href}
                className="w-max rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-orange-200"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all ${
              active === index ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
