import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Get in touch with CoAdverts for custom wholesale bag manufacturing. Request a quote, ask about our capabilities, or start your next project today.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Request a Quote"
        subtitle="Tell us about your project and our team will respond with a detailed proposal within 24 business hours."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Request a Quote" },
        ]}
      />

      <section className="bg-neutral-white py-section-lg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column — Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-heading font-semibold text-neutral-black mb-4">
                Get in Touch
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Whether you have a detailed specification or just an initial
                idea, we are here to help. Reach out through the form or contact
                us directly.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Email</p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      info@coadverts.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Phone</p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      +1 (555) 000-0000
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Address
                    </p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      Industrial District
                      <br />
                      City, Country
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Business Hours
                    </p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      Mon – Fri: 9:00 AM – 6:00 PM
                      <br />
                      Sat: 10:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="lg:col-span-3">
              <div className="bg-surface-100 rounded-xl p-6 md:p-8 border border-surface-300">
                <h3 className="text-xl font-heading font-semibold text-neutral-black mb-1">
                  Fill Out the Form
                </h3>
                <p className="text-sm text-neutral-600 mb-6">
                  Fields marked with <span className="text-error">*</span> are
                  required.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
