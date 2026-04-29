/**
 * @file layout.tsx
 * @description Root layout for OpenGHG.
 */

import type { Metadata } from "next";
import "./globals.css";
import { Unbounded, Geist, Geist_Mono } from "next/font/google";

// ─────────────────────────────────────────────
// Page metadata
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "OpenGHG — Free, open source carbon calculator",
  description:
    "A free, open source GHG emissions calculator built on the GHG Protocol. " +
    "All emission factors visible, all methodology documented.",
  keywords: [
    "carbon calculator",
    "GHG Protocol",
    "Scope 3",
    "emissions inventory",
    "open source",
    "sustainability",
  ],
  authors: [{ name: "OpenGHG" }],
  icons: {
    icon: "/favicon_openghg.svg",
    apple: "/favicon_openghg.svg",
  },
  openGraph: {
    title: "OpenGHG — Open Source Carbon Calculator",
    description:
      "Calculate your GHG emissions transparently. All factors visible, all methodology documented.",
    type: "website",
    url: "https://open-ghg.org",
  },
};

// ─────────────────────────────────────────────
// Font configuration
// ─────────────────────────────────────────────

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

// ─────────────────────────────────────────────
// Root layout
// ─────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}