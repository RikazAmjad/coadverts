import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/CTABanner";
import { ProductService } from "@/core/services/ProductService";
import { AnimatedFadeIn } from "@/components/ui/AnimatedFadeIn";

export const metadata: Metadata = {
  title: "Manufacturing & Supply Chain Services",
  description:
    "Explore CoAdverts' professional services: raw material sourcing, price negotiation, design support, ethical compliance, AQL inspection, and DDP shipping logistics.",
};

// Icons map for services
const iconMap: Record<string, React.ReactNode> = {
  network: (
    <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94-3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
  negotiation: (
    <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  design: (
    <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.01-1.259 1.04-1.04a2.25 2.25 0 1 1 3.182 3.182l-1.04 1.04m-3.182-3.182a1.5 1.5 0 0 0-2.122 0l-1.24 1.24a3.75 3.75 0 0 0 5.304 5.304l1.24-1.24a1.5 1.5 0 0 0 0-2.122Zm8-2.909a1.5 1.5 0 1 1-2.122-2.122l8-8a1.5 1.5 0 1 1 2.122 2.122l-8 8Z" />
    </svg>
  ),
  compliance: (
    <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  ),
  inspection: (
    <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h3.75a.75.75 0 0 1 .75.75v1.125c0 .414.336.75.75.75h4.5a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-15a.75.75 0 0 1 .75-.75h4.5c.414 0 .75-.336.75-.75V3a.75.75 0 0 1 .75-.75Zm1.5 5.25h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5Zm-1.5 4.5h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5Zm0 4.5h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5Z" />
    </svg>
  ),
  shipping: (
    <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM19.5 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM2.25 5.25h1.382a1.5 1.5 0 0 1 1.44 1.087l2.858 9.992m3.193-1.077h7.382a1.5 1.5 0 0 0 1.442-1.087l1.72-6.02A1.5 1.5 0 0 0 18.232 5.25H6.012M9 12.75v-4.5m0 0L7.5 9.75M9 8.25l1.5 1.5" />
    </svg>
  ),
};

export default async function ServicesPage() {
  const servicesList = await ProductService.getAllServices();
  return (
    <>
      <PageHeader
        title="Manufacturing & Supply Chain Services"
        subtitle="We go beyond standard production. CoAdverts handles the complex, multi-tiered process of wholesale manufacturing, compliance audits, quality assurance, and global shipping logistics."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <SectionWrapper background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2>End-to-End Production Coordination</h2>
          <p className="mt-4 text-neutral-600">
            For B2B buyers and retail brands, managing manufacturing across continents can be risky and time-consuming. CoAdverts acts as your on-the-ground operating partner, ensuring quality consistency, ethical standards, and seamless logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {servicesList.map((service, index) => (
            <AnimatedFadeIn key={service.id} delay={index * 100} className="h-full">
            <div
              className="h-full bg-surface-50 border border-neutral-200 rounded-xl p-8 hover:shadow-card hover:border-brand-400 transition-base flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                {iconMap[service.icon] || (
                  <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </div>
              <div>
                <span className="text-xs text-brand-600 font-semibold tracking-wider uppercase block mb-1">
                  Service 0{index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-black mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <h4 className="text-xs font-semibold text-neutral-800 uppercase tracking-widest mb-2.5">
                  Scope of Service
                </h4>
                <ul className="space-y-2">
                  {service.details.map((detail, dIndex) => (
                    <li key={dIndex} className="flex items-start gap-2.5 text-xs text-neutral-700">
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
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </AnimatedFadeIn>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        heading="Partner with CoAdverts"
        subtext="Let our team coordinate your next production run. Get raw material validation, design support, and custom quotes within 24 hours."
        buttonText="Request Consultation"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
