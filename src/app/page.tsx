import { ButtonLink } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CategoryCard } from "@/components/CategoryCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";
import { productCategories, features, processSteps } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-neutral-700 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <PlaceholderImage
            src="/images/banner.png"
            alt="Manufacturing floor with premium wholesale bags"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
            label="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-black/80 via-neutral-black/50 to-transparent" />
        </div>

        <div className="container-wide relative z-10">
          <div className="py-28 md:py-36 lg:py-44 max-w-2xl">
            <span className="text-brand-100 text-sm font-semibold uppercase tracking-widest mb-4 font-body">
              Wholesale Bag Manufacturing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white font-bold leading-[1.1] tracking-tight">
              <span className="text-brand-100">Crafted for Scale.</span>
              <br />
              <span className="text-brand-100">Designed for Impact.</span>
            </h1>
            <span className="mt-6 text-lg text-brand-100 leading-relaxed max-w-lg">
              Premium custom bags manufactured to your exact specifications.
              From concept to container — trusted by brands across 40+ countries.
            </span>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/products" size="lg" className="!text-neutral-white">
                Explore Products
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="outline"
                size="lg"
                className="!text-white !border-white/30 hover:bg-white/10 hover:!border-white/50"
              >
                Request a Quote
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MANUFACTURING INTRO ===== */}
      <SectionWrapper background="white" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            <PlaceholderImage
              src="/images/manufacturing-intro.png"
              alt="Inside CoAdverts manufacturing facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              label="Manufacturing Facility"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
              About CoAdverts
            </p>
            <h2 className="text-balance">
              Manufacturing Excellence,
              <br />
              Delivered Globally
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              With over a decade of manufacturing expertise, CoAdverts has grown
              from a regional bag producer to a trusted global supplier. Our
              state-of-the-art facilities combine precision machinery with
              skilled craftsmanship to deliver bags that meet the highest
              standards of quality and consistency.
            </p>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              We partner with businesses of every scale — from boutique retailers
              launching their first branded packaging to multinational
              distributors requiring container-load shipments.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-neutral-black">
                  10+
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  Years in Business
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-neutral-black">
                  40+
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  Countries Served
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-neutral-black">
                  5M+
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  Bags Per Year
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== FEATURED CATEGORIES ===== */}
      <SectionWrapper background="beige-100" padding="lg">
        <div className="text-center mb-12">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
            Our Products
          </p>
          <h2 className="text-balance">Bags for Every Industry</h2>
          <p className="mt-3 text-neutral-600 mt-2 mx-auto">
            From retail storefronts to industrial warehouses, we manufacture the
            right bag for every application. Explore our core categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productCategories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              image={category.image}
              href={`/products#${category.id}`}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ===== WHY CHOOSE US ===== */}
      <SectionWrapper background="white" padding="lg">
        <div className="text-center mb-12">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
            Why CoAdverts
          </p>
          <h2 className="text-balance">Built on Trust, Driven by Quality</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ===== PROCESS OVERVIEW ===== */}
      <SectionWrapper background="beige-100" padding="lg">
        <div className="text-center mb-12">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
            How We Work
          </p>
          <h2 className="text-balance">From Inquiry to Delivery</h2>
          <p className="mt-3 text-neutral-600 max-w-2xl mx-auto">
            A streamlined process designed around your timeline. Four clear
            stages, one dedicated team, zero surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line (desktop only, not on last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-0 h-px bg-neutral-300" />
              )}

              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-12 h-12 rounded-full bg-brand-700 text-white flex items-center justify-center text-lg font-semibold font-body relative z-10">
                  {step.step}
                </div>
                <h4 className="mt-4 text-lg font-semibold font-heading text-neutral-black">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===== CTA BANNER ===== */}
      <CTABanner
        heading="Ready to Start Your Next Order?"
        subtext="Tell us about your project. Our team will get back to you with a custom quote within 24 hours."
        buttonText="Request a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
