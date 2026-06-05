import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | CoAdverts Bag Manufacturing",
  description:
    "Terms of Service for CoAdverts wholesale bag manufacturing. Read about order approvals, MOQ, shipping, and payment terms for bulk custom bag orders.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subtitle="Last updated: June 6, 2026. Please read these Terms of Service carefully before placing custom wholesale bag orders with CoAdverts."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
      />

      <SectionWrapper background="white" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Quick Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface-100 rounded-2xl p-8 sticky top-24 border border-surface-200 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-brand-700">Order Agreement</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                By requesting a quote or submitting purchase orders, you agree to these commercial wholesale terms. Key clauses:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span className="text-neutral-700"><strong>MOQ Requirement:</strong> Custom bag orders are subject to minimum run volumes specified in quotes.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span className="text-neutral-700"><strong>Deposit Policy:</strong> Production begins only after deposit clearing and artwork approval.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span className="text-neutral-700"><strong>Artwork Ownership:</strong> Clients assume all intellectual property liabilities for submitted logos.</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-surface-300 text-center">
                <p className="text-xs text-neutral-500 mb-3">Have questions about our terms?</p>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center px-4 py-2 bg-brand-700 hover:bg-brand-600 text-white text-xs font-semibold rounded-md transition-base !text-neutral-white mt-2"
                >
                  Contact Account Manager
                </Link>
              </div>
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">1. Scope of Agreement</h2>
              <p className="text-neutral-600 leading-relaxed">
                These terms govern all commercial transactions between CoAdverts (Manufacturer) and the purchasing entity (Client) for wholesale custom and catalog bags. Any modifications to these terms must be agreed upon in writing by an authorized representative of CoAdverts.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">2. Quotes and Minimum Order Quantities (MOQ)</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                All prices quoted are valid for 30 days unless stated otherwise. Because wholesale bag manufacturing involves custom machinery set-ups and plate charges:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Orders must meet the specified Minimum Order Quantity (MOQ) detailed in your custom quotation sheet.</li>
                <li>Prices are tiered based on quantity; subsequent reductions in order volume may result in price recalculations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">3. Artwork Approval and Print Tolerances</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                Before full production begins, CoAdverts will submit a digital proof (and/or physical pre-production sample if requested and invoiced) for Client approval:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Production will not commence until CoAdverts receives a signed or electronically approved artwork proof.</li>
                <li><strong>Industry Tolerances:</strong> Due to variations in raw materials, dyes, and automated high-speed screen/rotogravure printing, a variance of ±5% in final dimensions, thickness, and color matching (Pantone matching system) is considered acceptable under industry standards.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">4. Client Intellectual Property Representations</h2>
              <p className="text-neutral-600 leading-relaxed">
                The Client represents and warrants that they own or hold proper licensing rights to all logos, trademarks, artwork, and branding assets submitted to CoAdverts for printing. CoAdverts reserves the right to refuse printing any materials that infringe on third-party trademarks or copyright. The Client agrees to indemnify CoAdverts against any legal actions arising from trademark infringement regarding printed artwork.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">5. Payment and Financing Terms</h2>
              <p className="text-neutral-600 leading-relaxed">
                Standard payment terms for wholesale orders are a <strong>30% deposit upon order confirmation</strong> and artwork approval, with the remaining <strong>70% balance payable prior to cargo dispatch</strong> from our manufacturing plant. Custom shipping or customs clearance fees are billed separately according to chosen transport agreements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">6. Shipping, Incoterms, and Risk of Loss</h2>
              <p className="text-neutral-600 leading-relaxed">
                Unless otherwise specified in writing, all international shipments are conducted under <strong>FOB (Free On Board)</strong> or <strong>EXW (Ex Works)</strong> Incoterms. Risk of loss and title transfer to the Client upon delivery of the cargo to the designated port carrier or forwarder. CoAdverts is not responsible for transit delays, import customs hold-ups, or demurrage fees at target destination ports.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">7. Returns and Defect Claims</h2>
              <p className="text-neutral-600 leading-relaxed">
                Because all bags are manufactured to custom client specifications, we cannot accept returns or provide refunds for non-defective goods. In the event of manufacturing defects, damaged shipments, or shortfalls exceeding the ±5% industry tolerance, the Client must notify CoAdverts in writing with photo evidence within 14 business days of receiving the shipment to arrange for partial credit, replacement, or refund.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
