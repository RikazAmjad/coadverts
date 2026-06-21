import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "./ContactForm";
import { corporateInfo } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Request a B2B Quote",
  description:
    "Get in touch with our Sweden and Pakistan sales and logistics offices. Request a manufacturing quote or ask about our capabilities.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Request a B2B Quote"
        subtitle="Specify your product parameters and custom branding needs. Our Stockholm office will coordinate design and logistics, while Faisalabad coordinates production."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      <section className="bg-neutral-white py-section-lg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column — Dual Company Identity */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-neutral-black mb-3">
                  Our Sales & Production Offices
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  We handle the entire production coordination out of Sweden, giving you a local European point of contact, while our Pakistan branch supervises manufacturing, quality compliance, and packaging loading.
                </p>
              </div>

              {/* Sweden Office Card */}
              <div className="bg-surface-50 border border-neutral-200 rounded-xl p-6 hover:shadow-soft transition-base">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-brand-50 text-2xl flex items-center justify-center select-none border border-neutral-200 shadow-sm leading-none pb-0.5">
                    <Image
                      src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1782037782/sweden_lsjp9r.png"
                      alt="Sweden"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-neutral-black">
                      Sweden Headquarters
                    </h4>
                    <p className="text-xs text-brand-700 font-medium">
                      Logistics, Billing & Design Liaison
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs text-neutral-600">
                  <p>
                    <strong className="text-neutral-800">Company:</strong> {corporateInfo.sweden.companyName}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Reg. No (VAT):</strong> SE{corporateInfo.sweden.regNumber.replace("-", "")}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Billing Address:</strong> {corporateInfo.sweden.address}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Office Address:</strong> {corporateInfo.sweden.visitAddress}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Email:</strong>{" "}
                    <a href={`mailto:${corporateInfo.sweden.email}`} className="text-brand-700 hover:underline">
                      {corporateInfo.sweden.email}
                    </a>
                  </p>
                  <p>
                    <strong className="text-neutral-800">Phone:</strong> {corporateInfo.sweden.phone}
                  </p>
                </div>
              </div>

              {/* Pakistan Factory Card */}
              <div className="bg-surface-50 border border-neutral-200 rounded-xl p-6 hover:shadow-soft transition-base">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-brand-50 text-2xl flex items-center justify-center select-none border border-neutral-200 shadow-sm leading-none pb-0.5">
                    <Image
                      src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1782037781/pak_ghsli4.png"
                      alt="Pakistan"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-neutral-black">
                      Pakistan Factory & Loom
                    </h4>
                    <p className="text-xs text-brand-700 font-medium">
                      Manufacturing & Quality Inspection Hub
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-600">
                  <p>
                    <strong className="text-neutral-800">Company:</strong> {corporateInfo.pakistan.companyName}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Reg. No:</strong> {corporateInfo.pakistan.regNumber}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Factory Address:</strong> {corporateInfo.pakistan.address}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Email:</strong>{" "}
                    <a href={`mailto:${corporateInfo.pakistan.email}`} className="text-brand-700 hover:underline">
                      {corporateInfo.pakistan.email}
                    </a>
                  </p>
                  <p>
                    <strong className="text-neutral-800">Phone:</strong> {corporateInfo.pakistan.phone}
                  </p>
                </div>
              </div>

              {/* General Inquiries */}
              <div className="pt-4 border-t border-neutral-200">
                <p className="text-xs text-neutral-500">
                  <strong>Business Hours:</strong> Monday – Friday, 9:00 AM – 5:00 PM CET (Sweden Office). Support for existing production runs is available 24/7.
                </p>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="lg:col-span-7">
              <div className="bg-surface-100 rounded-xl p-6 md:p-8 border border-surface-300">
                <h3 className="text-xl font-heading font-semibold text-neutral-black mb-1">
                  Fill Out the B2B Inquiry Form
                </h3>
                <p className="text-sm text-neutral-600 my-6">
                  Provide detailed specifications to receive a binding manufacturing quote.
                </p>
                
                <Suspense fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-10 bg-neutral-200 rounded-md w-full" />
                    <div className="h-10 bg-neutral-200 rounded-md w-full" />
                    <div className="h-32 bg-neutral-200 rounded-md w-full" />
                  </div>
                }>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
