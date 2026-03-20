import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const syne = Syne({
  variable: "--font-disp",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "VOID.DEV — Lakshay Narang",
  description:
    "Frontend developer and React enthusiast. Building interfaces people actually feel. B.Tech student at IIITDM Jabalpur.",
  keywords: [
    "Frontend Developer",
    "React",
    "Tailwind CSS",
    "Next.js",
    "IIITDM Jabalpur",
    "Lakshay Narang",
  ],
  authors: [{ name: "Lakshay Narang" }],
  robots: { index: true, follow: true },
};

import { Scanlines, ScrollProgress } from "@/components/VisualEffects";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} ${syne.variable}`}>
        <Scanlines />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
