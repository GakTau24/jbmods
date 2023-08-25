"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import ProgressBar from "react-scroll-progress-bar";
import { SkeletonTheme } from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      setIsDarkMode(storedMode === "true");
    }
  }, []);

  const handleToggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${
          isDarkMode
            ? "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800"
            : "bg-gradient-to-r from-slate-900 to-gray-500 text-slate-300"
        }`}>
        <SessionProvider>
          <SkeletonTheme baseColor="#313131" highlightColor="#525252">
            <section className="flex flex-col min-h-screen">
              <Navbar
                isDarkMode={isDarkMode}
                handleToggleMode={handleToggleMode}
              />
              <main className="flex-grow">
                <ProgressBar />
                {children}
              </main>
              <Footer />
            </section>
          </SkeletonTheme>
        </SessionProvider>
      </body>
    </html>
  );
}
