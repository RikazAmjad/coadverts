import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/CTABanner";
import { ProductService } from "@/core/services/ProductService";

export const metadata: Metadata = {
  title: "Certifications & Compliance Standards",
  description:
    "We prioritize quality, safety, and social accountability. Learn about our GOTS, OEKO-TEX, Fairtrade, SEDEX, ISO 9001, and CE compliance.",
};

// Helper to render logo — uses real image if path starts with /, otherwise renders text badge
function CertLogo({ logo, name }: { logo: string; name: string }) {
  if (logo.startsWith("/")) {
    return (
      <div className="w-16 h-16 relative flex items-center justify-center">
        <Image
          src={logo}
          alt={name}
          width={64}
          height={64}
          className="object-contain w-full h-full"
        />
      </div>
    );
  }
  const colors: Record<string, string> = {
    iso9001: "bg-slate-800",
    ce: "bg-red-700",
    fda: "bg-sky-900",
  };
  return (
    <div className={`w-16 h-16 rounded-full ${colors[logo] || "bg-brand-700"} text-white flex items-center justify-center font-bold text-center p-2 text-[10px] leading-tight select-none`}>
      {name.toUpperCase()}
    </div>
  );
}

export default async function CertificationsPage() {
  const certificationsList = await ProductService.getAllCertifications();
  return (
    <>
      <PageHeader
        title="Certifications & Compliance"
        subtitle="Global retail brands require flawless compliance. CoAdverts operates fully certified supply chains ensuring ecological sustainability, product safety, and ethical labor standards."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
      />

      <SectionWrapper background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3">
            Trust & Transparency
          </p>
          <h2>Credentials You Can Count On</h2>
          <p className="mt-4 text-neutral-600">
            Exporting to Europe, North America, and Nordic regions requires meeting strict regulatory barriers. We verify every product class to ensure quick customs clearance and complete alignment with your corporate social responsibility (CSR) goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsList.map((cert) => (
            <div
              key={cert.id}
              className="bg-neutral-white border border-neutral-200 rounded-xl p-8 hover:shadow-card hover:border-brand-400 transition-base flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <CertLogo logo={cert.logo} name={cert.shortName} />
                  <span className="text-xs font-bold font-body bg-brand-50 text-brand-700 px-3 py-1 rounded-full uppercase tracking-wider">
                    {cert.shortName}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-neutral-black mb-3">
                  {cert.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-4 mt-auto">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest block mb-1">
                  Scope of validity
                </span>
                <span className="text-xs text-neutral-700 font-medium leading-relaxed block">
                  {cert.validityScope}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        heading="Need Certifications Documents?"
        subtext="We can provide certified copies of our GOTS transaction certificates, BSCI audit reports, or CE declarations of conformity for your audit files."
        buttonText="Request Documents"
        buttonHref="/contact"
        variant="dark"
      />
    </>
  );
}
