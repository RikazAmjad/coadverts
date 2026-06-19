import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ButtonLink } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CTABanner } from "@/components/CTABanner";
import { ProductService } from "@/core/services/ProductService";

export const metadata: Metadata = {
  title: "B2B Product Families & Catalog",
  description:
    "Explore our 5 major product families: Bags, Safety Gloves, Towels & Bathrobes, T-Shirts & Beanies, and Bandanas. Fully customized manufacturing.",
};

export default async function ProductsPage() {
  const categories = await ProductService.getAllCategories();
  return (
    <>
      <PageHeader
        title="Product Catalog"
        subtitle="We manufacture wholesale textiles and safety products across 5 major product families, built to exact specifications for global distributors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <SectionWrapper background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3">
            B2B Product Lines
          </p>
          <h2>Five Core Product Families</h2>
          <p className="mt-4 text-neutral-600">
            CoAdverts provides end-to-end manufacturing flexibility. Select a product family below to browse specifications, check chemical certifications, and request a detailed production quote.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="bg-surface-50 border border-neutral-200 rounded-xl overflow-hidden shadow-soft p-6 md:p-8 hover:shadow-card hover:border-brand-400 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start border-b border-neutral-200 pb-6 mb-6">
                <div className="max-w-3xl">
                  <span className="text-[11px] font-semibold text-brand-700 uppercase tracking-widest block mb-2">
                    Family 0{index + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-neutral-black mb-3">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
                  <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                    Certifications
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {category.certifications?.map((c) => (
                      <span key={c} className="text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {c.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subcategories Grid */}
              <div>
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-6">
                {category.name} Range
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {category.subcategories.map((sub) => (
                    <div 
                      key={sub.id} 
                      className="bg-neutral-white border border-neutral-200/60 rounded-xl p-5 flex flex-col justify-between shadow-soft hover:shadow-md hover:border-brand-300 transition-all duration-300"
                    >
                      <div>
                        {/* Subcategory Image */}
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-100 mb-4">
                          <PlaceholderImage
                            src={sub.image}
                            alt={sub.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                            label={sub.name}
                          />
                        </div>
                        
                        <h5 className="text-sm font-bold text-neutral-black mb-1.5 font-heading">
                          {sub.name}
                        </h5>
                        <p className="text-[11px] text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                          {sub.description}
                        </p>

                        {/* Subcategory preview image */}
                        {/* <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 border border-neutral-100 mb-4">
                          <PlaceholderImage
                            src={sub.image}
                            alt={sub.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                            label={sub.name}
                          />
                        </div> */}
                      </div>

                      <div className="flex items-center border-t border-neutral-100 pt-3 mt-3">
                        <a href={`/products/${category.id}#${sub.id}`} className="text-[11px] font-semibold text-brand-700 hover:text-brand-800 transition-colors">Specs &amp; Quote ?</a>





                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Category Footer Actions */}
              <div className="flex flex-wrap gap-4 items-center border-t border-neutral-200 pt-6 mt-8">
                <ButtonLink href={`/products/${category.id}`} size="md" className="!text-neutral-white">
                  Explore Full {category.name} Range
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        heading="Can't Find a Specific Specification?"
        subtext="Our R&D team in Stockholm and Pakistan can source specialized fabric blends, custom coatings, and non-standard sizing. Reach out with your parameters."
        buttonText="Contact Sales Office"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
