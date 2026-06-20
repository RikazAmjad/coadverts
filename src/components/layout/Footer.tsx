import Link from "next/link";
import Image from "next/image";
import { corporateInfo } from "@/lib/data";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/certifications", label: "Certifications" },
  { href: "/references", label: "References" },
  { href: "/contact", label: "Contact Us" },
];

const productLinks = [
  { href: "/products/bags", label: "Bags" },
  { href: "/products/gloves", label: "Safety Gloves" },
  { href: "/products/towels-bathrobes", label: "Towels" },
  { href: "/products/tshirts-beanies", label: "T-Shirts" },
  { href: "/products/bandanas", label: "Bandanas" },
  { href: "/products/caps", label: "Caps & Headwear" },
  { href: "/products/bedsheet-linen", label: "Bedsheets" },
  { href: "/products/rugs-carpets", label: "Rugs & Carpets" },
];

export function Footer() {
  return (
    <footer className="bg-surface-100 border-t border-surface-300">
      <div className="container-wide py-section-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <Image
                src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781990237/Logo_CoAdvert_New_bxed4p.png"
                alt="CoAdvert logo"
                width={110}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-xs mb-4">
              A family legacy of 47 years in cotton and textile manufacturing. Swedish management, Pakistani production excellence.
            </p>
            <div className="flex gap-4 text-xs text-neutral-500">
              <span>Est. 1979</span>
              <span>•</span>
              <span>Sweden / Pakistan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 font-body">
              Navigation
            </h4>
            <ul className="space-y-2.5 mt-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-700 hover:text-brand-700 transition-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 font-body">
              Product Catalog
            </h4>
            <ul className="space-y-2.5 mt-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-700 hover:text-brand-700 transition-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dual Offices */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4 font-body">
              Dual Office Registry
            </h4>
            <div className="space-y-4 mt-2">
              {/* Sweden */}
              <div>
                <p className="font-semibold text-xs text-brand-700 uppercase tracking-wider mb-1">
                  Sweden Head Office
                </p>
                <p className="text-xs text-neutral-800 leading-tight font-medium">
                  {corporateInfo.sweden.companyName}
                </p>
                <p className="text-xs text-neutral-500 leading-tight">
                  Reg: {corporateInfo.sweden.regNumber}
                </p>
                <p className="text-xs text-neutral-500 leading-tight">
                  {corporateInfo.sweden.address}
                </p>
                <p className="text-xs text-neutral-700 mt-1">
                  {corporateInfo.sweden.phone}
                </p>
              </div>

              {/* Pakistan */}
              <div>
                <p className="font-semibold text-xs text-brand-700 uppercase tracking-wider mb-1">
                  Pakistan Factory
                </p>
                <p className="text-xs text-neutral-800 leading-tight font-medium">
                  {corporateInfo.pakistan.companyName}
                </p>
                <p className="text-xs text-neutral-500 leading-tight">
                  Reg: {corporateInfo.pakistan.regNumber}
                </p>
                <p className="text-xs text-neutral-500 leading-tight">
                  {corporateInfo.pakistan.address}
                </p>
                <p className="text-xs text-neutral-700 mt-1">
                  {corporateInfo.pakistan.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} CoAdvert AB. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-neutral-800 transition-base"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-neutral-800 transition-base"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
