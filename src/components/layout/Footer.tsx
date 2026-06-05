import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Request a Quote" },
];

const productLinks = [
  { href: "/products#shopping-retail", label: "Shopping & Retail Bags" },
  { href: "/products#packaging-industrial", label: "Packaging & Industrial" },
  { href: "/products#promotional-custom", label: "Promotional & Custom" },
];

export function Footer() {
  return (
    <footer className="bg-surface-100 text-white">
      <div className="container-wide py-section-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  CA
                </span>
              </div>
              <h4 className="text-sm font-semibold tracking-wider mb-4 font-body">
                CoAdverts
              </h4>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Premium wholesale bag manufacturing for businesses worldwide.
              Quality craftsmanship, scalable production, global delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-body">
              Quick Links
            </h4>
            <ul className="space-y-2.5 mt-2">
              {quickLinks.map((link) => (
                <li key={link.href} className="text-neutral-900">
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-900 hover:text-white transition-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-body">
              Products
            </h4>
            <ul className="space-y-2.5 mt-2">
              {productLinks.map((link) => (
                <li key={link.href} className="text-neutral-900">
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-900 hover:text-white transition-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-body">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400 mt-2">
              <li className="flex items-start gap-2 text-neutral-900">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-900" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                +1 (555) 000-0000
              </li>
              <li className="flex items-start gap-2 text-neutral-900">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-900" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
                info@coadverts.com
              </li>
              <li className="flex items-start gap-2 text-neutral-900">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-neutral-900" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                Industrial District, City, Country
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} CoAdverts. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-neutral-300 transition-base"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-neutral-300 transition-base"
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
