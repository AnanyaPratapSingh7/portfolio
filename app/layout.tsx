"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [direction, setDirection] = useState<"in" | "out" | null>(null);

  useEffect(() => {
    if (
      (prevPath.current === "/" && pathname === "/portfolio") ||
      (prevPath.current === "/portfolio" && pathname === "/")
    ) {
      setDirection(pathname === "/portfolio" ? "in" : "out");
    } else {
      setDirection(null);
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen w-full`}
      >
        <div className="absolute inset-0 bg-[url('../public/explorer_green_day.jpg')] bg-cover bg-center filter blur-sm z-0" />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={
              direction === "in"
                ? { scale: 0.8, opacity: 0 }
                : direction === "out"
                ? { scale: 1.2, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            animate={{ scale: 1, opacity: 1 }}
            exit={
              direction === "in"
                ? { scale: 1.2, opacity: 0 }
                : direction === "out"
                ? { scale: 0.8, opacity: 0 }
                : { scale: 1, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative z-10 h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
