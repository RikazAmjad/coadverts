"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/products",
    label: "Products",
    subLinks: [
      { href: "/products/bags", label: "Bags" },
      { href: "/products/gloves", label: "Safety Gloves" },
      { href: "/products/towels-bathrobes", label: "Towels" },
      { href: "/products/tshirts-beanies", label: "T-Shirts" },
      { href: "/products/bandanas", label: "Bandanas" },
      { href: "/products/caps", label: "Caps & Headwear" },
      { href: "/products/bedsheet-linen", label: "Bedsheets" },
      { href: "/products/rugs-carpets", label: "Rugs & Carpets" },
    ],
  },
  { href: "/services", label: "Services" },
  { href: "/certifications", label: "Certifications" },
  { href: "/references", label: "References" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-neutral-white/95 backdrop-blur-md shadow-soft border-b border-neutral-200"
          : "bg-neutral-white border-b border-transparent"
      }`}
    >
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-18 gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 gap-2"
            aria-label="CoAdvert — Home"
          >
            <Image
              src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781990237/Logo_CoAdvert_New_bxed4p.png"
              alt="CoAdvert logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                const isActive =
                  pathname === link.href ||
                  (hasSubLinks && link.subLinks.some((sub) => pathname === sub.href));

                if (hasSubLinks) {
                  return (
                    <li key={link.href} className="relative group">
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-base ${
                          isActive
                            ? "text-brand-700 bg-brand-50"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                        }`}
                      >
                        {link.label}
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="rounded-lg bg-neutral-white border border-neutral-200 shadow-elevated p-1.5">
                          <ul className="flex flex-col gap-0.5">
                            {link.subLinks.map((sub) => {
                              const isSubActive = pathname === sub.href;
                              return (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    className={`block px-3.5 py-2 text-xs font-medium rounded-md transition-base ${
                                      isSubActive
                                        ? "text-brand-700 bg-brand-50"
                                        : "text-neutral-600 hover:text-brand-700 hover:bg-neutral-50"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-base ${
                        pathname === link.href
                          ? "text-brand-700 bg-brand-50"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* <ButtonLink href="/contact" size="sm" className="!text-neutral-white">
              Get a Quote
            </ButtonLink> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-neutral-700 hover:text-neutral-900 transition-base"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-neutral-200 py-4 pb-6"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                const isActive =
                  pathname === link.href ||
                  (hasSubLinks && link.subLinks.some((sub) => pathname === sub.href));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-base ${
                        isActive
                          ? "text-brand-700 bg-brand-50"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {hasSubLinks && (
                      <ul className="pl-6 pr-4 py-1 flex flex-col gap-1 border-l-2 border-brand-100 ml-6 mt-1 mb-2">
                        {link.subLinks.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className={`block px-3 py-1.5 text-xs font-medium rounded-md transition-base ${
                                  isSubActive
                                    ? "text-brand-700 bg-brand-50"
                                    : "text-neutral-600 hover:text-brand-700 hover:bg-neutral-50"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* <div className="mt-4 px-4">
              <ButtonLink href="/contact" size="md" fullWidth>
                Get a Quote
              </ButtonLink>
            </div> */}
          </div>
        )}
      </nav>
    </header>
  );
}
