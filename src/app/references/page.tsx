import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/CTABanner";
import { ProductService } from "@/core/services/ProductService";
import { AnimatedFadeIn } from "@/components/ui/AnimatedFadeIn";

export const metadata: Metadata = {
  title: "B2B Client References",
  description:
    "Discover how CoAdverts delivers high-volume custom manufacturing for leading retail, safety, hospitality, and clothing clients globally.",
};

const regions = ["Nordic", "Europe", "Global"] as const;

export default async function ReferencesPage() {
  const referencesList = await ProductService.getAllReferences();
  return (
    <>
      <PageHeader
        title="Client References"
        subtitle="We support supermarkets, safety distributors, hotel chains, and promotional houses. Explore our partnerships across regions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "References" }]}
      />

      <SectionWrapper background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3">
            Social Proof & Trust
          </p>
          <h2>Who We Manufacture For</h2>
          <p className="mt-4 text-neutral-600">
            CoAdverts handles bulk contract orders for clients who demand reliability, low MOQ constraints, fast lead times, and continuous ethical auditing.
          </p>
        </div>

        {regions.map((region) => {
          const regionRefs = referencesList.filter((ref) => ref.region === region);
          if (regionRefs.length === 0) return null;

          return (
            <div key={region} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-black">
                  {region} Region Partnerships
                </h3>
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-3 py-1 rounded-full uppercase tracking-wider">
                  {regionRefs.length} {regionRefs.length === 1 ? "Partner" : "Partners"}
                </span>
              </div>

              <div
                className={`grid gap-6 ${
                  region === "Nordic"
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {regionRefs.map((ref, index) => (
                  <AnimatedFadeIn key={ref.id} delay={index * 100} className="h-full">
                    <div
                      className="h-full bg-surface-50 border border-neutral-200 rounded-xl p-6 lg:p-7 hover:shadow-card hover:border-brand-400 transition-base flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-neutral-black">
                              {ref.clientName}
                            </h4>
                            <span className="text-xs font-medium text-neutral-500">
                              {ref.industry}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-600 bg-neutral-200 px-2.5 py-1 rounded-md">
                            {ref.region}
                          </span>
                        </div>
                        {ref.note && (
                          <p className="text-sm text-neutral-600 leading-relaxed italic border-l-2 border-brand-500 pl-4 py-1 mb-6">
                            &quot;{ref.note}&quot;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-200/50">
                        {ref.logo ? (
                          <div
                            className={`w-10 h-10 rounded-lg p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-xs border ${
                              ref.id === "kpmg" || ref.logo.toLowerCase().includes("white")
                                ? "bg-neutral-900 border-neutral-800"
                                : "bg-white border-neutral-200"
                            }`}
                          >
                            <Image
                              src={ref.logo}
                              alt={`${ref.clientName} logo`}
                              width={40}
                              height={40}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white font-semibold text-sm"
                            style={{
                              backgroundColor: `hsl(${ref.clientName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360}, 55%, 45%)`,
                            }}
                          >
                            {ref.clientName
                              .split(/[\s\-\/]+/)
                              .filter(Boolean)
                              .slice(0, 2)
                              .map((w) => w[0].toUpperCase())
                              .join('')}
                          </div>
                        )}
                        <span className="text-xs text-neutral-500 font-semibold tracking-wider uppercase">
                          Verified Production Run
                        </span>
                      </div>
                    </div>
                  </AnimatedFadeIn>
                ))}
              </div>
            </div>
          );
        })}
      </SectionWrapper>

      <CTABanner
        heading="Become Our Next Success Story"
        subtext="Discuss your regional shipping requirements, private-label packaging models, or annual volume contracts with our sales representatives."
        buttonText="Get in Touch"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
