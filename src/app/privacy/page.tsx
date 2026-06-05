import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CoAdverts Bag Manufacturing",
  description:
    "Privacy Policy for CoAdverts wholesale bag manufacturing. Learn how we protect and manage your business data, order specifications, and communications.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: June 6, 2026. This policy explains how we collect, use, and protect your company information when you request quotes or order custom bags."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <SectionWrapper background="white" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Quick Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-surface-100 rounded-2xl p-8 sticky top-24 border border-surface-200 shadow-soft">
              <h3 className="text-xl font-semibold mb-4 text-brand-700">Quick Summary</h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                We value your trust and the confidentiality of your custom designs and business data. Here are the key points:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span className="text-neutral-700"><strong>No resale:</strong> We never sell your business or design data to third parties.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span className="text-neutral-700"><strong>Design safety:</strong> Your custom specifications and print plates are kept strictly secure.</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="text-brand-600 font-bold">✓</span>
                  <span className="text-neutral-700"><strong>Global compliance:</strong> We adhere to standard privacy laws for global B2B clients.</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-surface-300 text-center">
                <p className="text-xs text-neutral-500 mb-5">Have a privacy concern?</p>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center px-4 py-2 bg-brand-700 hover:bg-brand-600 text-white text-xs font-semibold rounded-md transition-base !text-neutral-white mt-2"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">1. Information We Collect</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                As a commercial wholesale manufacturer, CoAdverts collects information primarily necessary to process requests for quotes, design samples, and high-volume orders. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li><strong>Company Details:</strong> Company name, registration, business address, and shipping destinations.</li>
                <li><strong>Contact Details:</strong> Full name, corporate email address, billing telephone, and direct contact details.</li>
                <li><strong>Product Specifications:</strong> Custom bag dimensions, logo files (vector/graphic artwork), fabric choices, and ordering volumes.</li>
                <li><strong>Payment Info:</strong> Bank accounts or wire information to process custom shipping invoices (we do not store retail credit cards).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">2. How We Use Your Information</h2>
              <p className="text-neutral-600 mb-4 leading-relaxed">
                We do not send unsolicited advertising or trade contact directories. All gathered information is put to work strictly to service our direct business partnership:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li>Providing customized quotes, price sheets, and mockups for custom bags.</li>
                <li>Setting up production molds, proof prints, and digital proofs.</li>
                <li>Arranging international shipping, export clearances, and customs documentation.</li>
                <li>Responding to questions regarding order status, tracking, or support queries.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">3. Security of Custom Designs and Molds</h2>
              <p className="text-neutral-600 leading-relaxed">
                We understand that your custom artwork and bag shapes represent valuable intellectual property and branding assets. CoAdverts stores all graphic files and print plates in secure environments, ensuring your proprietary patterns are protected from reproduction by external parties or other clients.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">4. Sharing Information with Third Parties</h2>
              <p className="text-neutral-600 leading-relaxed">
                We limit sharing to only those partners required to execute and deliver your manufactured cargo:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                <li><strong>Logistics Partners:</strong> Freight forwarding, customs brokers, and cargo carriers.</li>
                <li><strong>Manufacturing Partners:</strong> Affiliated specialists if specific component accessories (e.g., special alloy clasps) require custom sourcing.</li>
                <li><strong>Legal Compliance:</strong> When required under standard export control regulations or tax compliance laws.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">5. Cookies and Web Analytics</h2>
              <p className="text-neutral-600 leading-relaxed">
                Our web server uses basic administrative cookies and web stats to monitor traffic flow, site response speeds, and to optimize page performance. No personal identification data is recorded through these automatic tools.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-black mb-4">6. Your Rights</h2>
              <p className="text-neutral-600 leading-relaxed">
                Under relevant global jurisdictions, you have the right to inspect, update, or request the deletion of your personal data stored with us. To update company profiles or remove retired design catalogs from our archives, please send your request directly to <a href="mailto:privacy@coadverts.com" className="text-brand-700 font-semibold hover:underline">privacy@coadverts.com</a>.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
