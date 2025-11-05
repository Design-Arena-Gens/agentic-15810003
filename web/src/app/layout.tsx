import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthHydrator from "@/components/layout/AuthHydrator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoCart · Next-gen marketplace",
  description:
    "NeoCart is a modern e-commerce experience with curated products, seamless checkout, and trend-driven design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#fef8f4] antialiased`}
      >
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <AuthHydrator />
            <Navbar />
            <main className="flex-1 bg-gradient-to-b from-white via-[#fff7ef] to-white pb-16">
              <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:pt-12">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
