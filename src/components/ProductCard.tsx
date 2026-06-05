import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ButtonLink } from "@/components/ui/Button";

interface ProductCardProps {
  name: string;
  description: string;
  features: string[];
  image: string;
  id: string;
}

export function ProductCard({
  name,
  description,
  features,
  image,
  id,
}: ProductCardProps) {
  return (
    <article
      id={`product-${id}`}
      className="group bg-neutral-white border border-neutral-200 rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-base"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <PlaceholderImage
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          label={name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/10 to-transparent pointer-events-none" />
      </div>
      <div className="p-6">
        <h4 className="font-heading text-lg font-semibold text-neutral-black mb-2">
          {name}
        </h4>
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          {description}
        </p>
        <ul className="space-y-1.5 mb-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-neutral-700"
            >
              <svg
                className="w-4 h-4 text-brand-600 mt-0.5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <ButtonLink href="/contact" variant="primary" size="sm" fullWidth>
          Inquire Now
        </ButtonLink>
      </div>
    </article>
  );
}
