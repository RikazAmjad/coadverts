import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ButtonLink } from "@/components/ui/Button";
import { CTABanner } from "@/components/CTABanner";
import { ProductService } from "@/core/services/ProductService";

interface PageProps {
  params: Promise<{ family: string }>;
}

export async function generateStaticParams() {
  const categories = await ProductService.getAllCategories();
  return categories.map((category) => ({
    family: category.id,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { family } = await params;
  const category = await ProductService.getCategoryById(family);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} B2B Wholesale Manufacturing`,
    description: category.description,
  };
}

export default async function ProductFamilyPage({ params }: PageProps) {
  const { family } = await params;
  const category = await ProductService.getCategoryById(family);
  if (!category) notFound();

  const allCerts = await ProductService.getAllCertifications();
  const categoryCerts = allCerts.filter((cert) =>
    category.certifications?.includes(cert.id)
  );

  return (
    <>
      <PageHeader
        title={`${category.name} Range`}
        subtitle={category.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category.name },
        ]}
      />

      {/* ===== INTRO SECTION ===== */}
      <SectionWrapper background="white" padding="md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-semibold text-brand-700 uppercase tracking-widest block mb-2">
              Production Capabilities
            </span>
            <h2 className="text-3xl font-bold font-heading text-neutral-black leading-tight mb-4">
              Premium Wholesale {category.name} Sourced &amp; Stitched
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              {category.longDescription}
            </p>
            {categoryCerts.length > 0 && (
              <div className="bg-surface-50 border border-neutral-200 p-6 rounded-xl">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-3">
                  Quality Certifications Active
                </h4>
                <div className="flex flex-wrap gap-3">
                  {categoryCerts.map((cert) => (
                    <div
                      key={cert.id}
                      title={cert.name}
                      className="relative w-12 h-12 bg-white rounded-md border border-neutral-200 p-1 flex items-center justify-center shadow-sm"
                    >
                      <Image
                        src={cert.logo}
                        alt={cert.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-soft">
            <PlaceholderImage
              src={category.heroImage || category.image}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              label={category.name}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* ===== SUBCATEGORY SECTIONS WITH INLINE GALLERIES ===== */}
      {category.subcategories.map((sub, index) => {
        const images = sub.gallery || [];
        return (
          <SectionWrapper
            key={sub.id}
            id={sub.id}
            background={index % 2 === 0 ? "beige-100" : "white"}
            padding="lg"
          >
            {/* Subcategory Header */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between mb-8 pb-6 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-semibold text-brand-700 uppercase tracking-widest block mb-1">
                  Type {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-neutral-black mb-2">
                  {sub.name}
                </h3>
                <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
                  {sub.description}
                </p>
              </div>
              {sub.certificationNote && (
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full shrink-0 self-start md:self-auto">
                  ✓ {sub.certificationNote}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Specs Column */}
              <div className={`lg:col-span-4 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                {sub.detailedCopy && (
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {sub.detailedCopy}
                  </p>
                )}
                <div className="bg-neutral-white border border-neutral-200 rounded-xl p-6 mb-6">
                  <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">
                    Technical Specifications
                  </h4>
                  <ul className="space-y-2.5">
                    {sub.features.map((spec, specIdx) => (
                      <li key={specIdx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                        <svg
                          className="w-4 h-4 text-brand-600 mt-0.5 shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <ButtonLink
                  href={`/contact?category=${category.id}&type=${sub.id}`}
                  variant="primary"
                  size="md"
                >
                  Inquire About {sub.name}
                </ButtonLink>
              </div>

              {/* Gallery Column — ALL images inline */}
              <div className={`lg:col-span-8 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                {images.length === 0 ? (
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <PlaceholderImage
                      src={sub.image}
                      alt={sub.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      label={sub.name}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className="group relative aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 hover:border-brand-400 hover:shadow-md transition-all duration-200 cursor-zoom-in"
                        >
                          <Image
                            src={img}
                            alt={`${sub.name} design ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                            <span className="text-[9px] text-white font-semibold">
                              Design {i + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      {/* ===== CERTIFICATION DETAILS ===== */}
      {categoryCerts.length > 0 && (
        <SectionWrapper background="white" padding="md">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-brand-700 text-xs font-semibold uppercase tracking-widest mb-2">
              Compliance Details
            </p>
            <h3 className="text-2xl font-bold font-heading text-neutral-black">
              Active Certifications for {category.name}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categoryCerts.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative w-20 h-20 shrink-0 bg-neutral-50 rounded-lg border border-neutral-100 p-2 flex items-center justify-center">
                  <Image 
                    src={cert.logo} 
                    alt={cert.name} 
                    fill 
                    className="object-contain p-1" 
                    sizes="80px" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-neutral-black mb-1.5">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      <CTABanner
        heading={`Get a Quote for Custom ${category.name}`}
        subtext="Our sales team in Sweden will coordinate your tech-packs and send a detailed manufacturing proposal."
        buttonText="Contact Sales"
        buttonHref={`/contact?category=${category.id}`}
        variant="dark"
      />
    </>
  );
}
