import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-surface-100 border-b border-surface-300">
      <div className="container-wide py-section-sm">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-neutral-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-neutral-300">
                      /
                    </span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-brand-700 transition-base"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-neutral-900 font-medium">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-lg text-neutral-600 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
