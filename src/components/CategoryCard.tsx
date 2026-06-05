import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface CategoryCardProps {
  name: string;
  description: string;
  image: string;
  href: string;
}

export function CategoryCard({
  name,
  description,
  image,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block rounded-xl overflow-hidden aspect-[3/4] md:aspect-[4/5]"
    >
      <PlaceholderImage
        src={image}
        alt={name}
        fill
        className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        label={name}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/80 via-neutral-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <span className="text-white text-xs md:text-base leading-relaxed line-clamp-2">
          {description}
        </span>
        <span className="inline-flex items-center gap-1.5 mt-4 text-lg font-medium text-white group-hover:gap-2.5 transition-all duration-300">
          Explore {name}
          <svg
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
