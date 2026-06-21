import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CoAdverts",
    template: "%s | CoAdverts",
  },
  description:
    "CoAdverts manufactures and supplies custom wholesale bags for businesses, distributors, and retail brands worldwide. Quality craftsmanship, scalable production, global delivery.",
  keywords: [
    "wholesale bags",
    "bag manufacturing",
    "custom bags",
    "bulk bags",
    "tote bags wholesale",
    "promotional bags",
    "B2B bags",
    "bag supplier",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CoAdverts",
    title: "CoAdverts",
    description:
      "Custom wholesale bag manufacturing for businesses worldwide. Shopping bags, industrial packaging, promotional bags — all crafted to your specifications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoAdverts",
    description:
      "Custom wholesale bag manufacturing for businesses worldwide.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
