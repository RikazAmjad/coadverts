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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coadverts.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CoAdverts | Custom Wholesale Bags & Sustainable Textile Manufacturer",
    template: "%s | CoAdverts",
  },
  description:
    "CoAdverts manufactures and supplies custom wholesale bags and sustainable textiles for businesses, distributors, and retail brands worldwide. 47-year family legacy.",
  keywords: [
    "wholesale bags",
    "cotton bag manufacturer",
    "custom bags Sweden",
    "bulk tote bags",
    "sustainable bags wholesale",
    "promotional bags B2B",
    "textile manufacturing",
    "GOTS certified cotton bags",
    "fairtrade bags supplier",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CoAdverts",
    title: "CoAdverts | Custom Wholesale Bags & Sustainable Textile Manufacturer",
    description:
      "Custom wholesale bag and textile manufacturing for businesses worldwide. Quality craftsmanship, ethical production, global delivery.",
    images: [
      {
        url: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1795027861/lady_pub17e.jpg",
        width: 1200,
        height: 630,
        alt: "CoAdverts Wholesale Cotton Bags & Textiles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoAdverts | Custom Wholesale Bags & Sustainable Textile Manufacturer",
    description:
      "Custom wholesale bag and textile manufacturing for businesses worldwide. Quality craftsmanship, ethical production, global delivery.",
    images: ["https://res.cloudinary.com/dqgen2gxh/image/upload/v1795027861/lady_pub17e.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "CoAdvert AB",
      alternateName: "CoAdverts",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dqgen2gxh/image/upload/v1781990237/Logo_CoAdvert_New_bxed4p.png",
      },
      email: "customerservice@coadvert.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kivra: 556892-9052",
        postalCode: "106 31",
        addressLocality: "Stockholm",
        addressCountry: "SE",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CoAdverts",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
