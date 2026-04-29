/**
 * @file layout.tsx
 * @description Root layout for OpenGHG.
 */

import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

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
    url: "https://openghg.org",
  },
};

// ─────────────────────────────────────────────
// Font configuration
// ─────────────────────────────────────────────

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
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
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}