import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ProductCard } from "@/components/ProductCard";
import { CTABanner } from "@/components/CTABanner";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { productCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Explore CoAdverts' complete range of wholesale bags — shopping & retail, packaging & industrial, and promotional & custom bags. Quality manufacturing for every industry.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Our Products"
        subtitle="From everyday retail bags to heavy-duty industrial packaging, we manufacture a comprehensive range of custom bags tailored to your business needs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      {productCategories.map((category, categoryIndex) => (
        <SectionWrapper
          key={category.id}
          id={category.id}
          background={categoryIndex % 2 === 0 ? "white" : "beige-100"}
          padding="lg"
        >
          {/* Category Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div className={categoryIndex % 2 !== 0 ? "lg:order-2" : ""}>
              <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
                Category {String(categoryIndex + 1).padStart(2, "0")}
              </p>
              <h2 className="text-balance">{category.name}</h2>
              <p className="mt-3 text-neutral-600 leading-relaxed">
                {category.description}
              </p>
            </div>
            <div
              className={`relative aspect-[16/10] rounded-xl overflow-hidden ${
                categoryIndex % 2 !== 0 ? "lg:order-1" : ""
              }`}
            >
              <PlaceholderImage
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                label={category.name}
              />
            </div>
          </div>

          {/* Subcategory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((sub) => (
              <ProductCard
                key={sub.id}
                id={sub.id}
                name={sub.name}
                description={sub.description}
                features={sub.features}
                image={sub.image}
              />
            ))}
          </div>
        </SectionWrapper>
      ))}

      <CTABanner
        heading="Can't Find What You Need?"
        subtext="We manufacture custom bags to any specification. Tell us your requirements and we'll make it happen."
        buttonText="Contact Us"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
