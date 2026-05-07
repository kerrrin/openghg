import type { Metadata } from "next";
import { Unbounded, Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenGHG",
  description:
    "An open source GHG emissions calculator built on the GHG Protocol. " +
    "All emission factors visible, all methodology documented.",
  keywords: [
    "carbon calculator",
    "GHG Protocol",
    "Scope 3",
    "ISO 14064-1",
    "emissions inventory",
    "open source",
    "free",
    "sustainability",
  ],
  authors: [{ name: "Placeholder" }],
  icons: {
    icon: "/favicon_openghg.svg",
    apple: "/favicon_openghg.svg",
  },
  openGraph: {
    title: "OpenGHG",
    description:
      "Calculate your GHG emissions transparently. All factors visible, all methodology documented.",
    type: "website",
    url: "https://open-ghg.org",
  },
};

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

const fonts = `${unbounded.variable} ${geist.variable} ${geistMono.variable}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fonts} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
