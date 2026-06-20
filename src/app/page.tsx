import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { CategoryCard } from "@/components/CategoryCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CTABanner } from "@/components/CTABanner";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { AnimatedCategoryCard } from "@/components/AnimatedCategoryCard";
import {
  productCategories,
  features,
  processSteps,
  references,
  certifications,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-beige-100 overflow-hidden py-10">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl relative z-20">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading text-neutral-900 font-bold leading-[1.08] tracking-tight">
                <span className="text-brand-700">Quality Products.</span>
                <br />
                <span className="text-neutral-900">Delivered Globally.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-neutral-700 leading-relaxed max-w-xl">
                CoAdvert AB Sweden and MH Tex Pakistan — a family legacy of 47
                years in cotton and textile manufacturing, delivering to customers
                across the world.
              </p>
              <span className="text-brand-800 text-xs md:text-sm font-semibold uppercase tracking-widest mb-6 block font-body bg-brand-100/80 backdrop-blur-sm px-4 py-2 rounded-full w-fit border border-brand-200 my-2">
                CoAdvert AB Sweden • MH Tex Pakistan
              </span>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink
                  href="/products"
                  size="lg"
                  className="!text-neutral-white"
                >
                  Explore Catalog
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="!text-neutral-900 border-neutral-300 hover:bg-neutral-100"
                >
                  Inquire Now
                </ButtonLink>
              </div>
            </div>

            {/* Right Content - Visuals */}
            <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end">
              {/* Decorative Background Blob or Shape (Optional) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/50 rounded-full blur-3xl" />
              
              {/* Main Subject Image */}
              <div className="relative z-10 w-full h-full max-w-[500px] right-0 md:right-10 mix-blend-multiply rounded-3xl overflow-hidden border border-neutral-200">
                <Image
                  src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781903116/Gemini_Generated_Image_42xo0k42xo0k42xo_qgpnnb.png"
                  alt="CoAdvert Model"
                  fill
                  className="object-cover object-top"
                  priority
                  unoptimized
                />
              </div>

              {/* Floating Bag Cards */}
              <div className="absolute top-10 right-[10%] lg:right-[70%] z-20 w-40 md:w-48 aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-white/50 bg-white p-2">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781812310/18_rpungm.jpg"
                    alt="Cotton Bag"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-16 right-[55%] lg:right-[65%] z-30 w-44 md:w-52 aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/50 bg-white p-2">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905036/45993898_189564455283064_1450101913998589952_n_q1krvn.jpg"
                    alt="Customized Cap"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute top-1/3 -right-4 lg:-right-8 z-10 w-32 md:w-40 aspect-square rounded-xl overflow-hidden shadow-xl border border-white/50 bg-white p-2 hidden md:block">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-100">
                  <Image
                    src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781905109/JackAndCoke_logo_tshirt-skiss_dga62d.png"
                    alt="Customized T-Shirt"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY / LEGACY ===== */}
      <SectionWrapper background="beige-100" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden shadow-xl border-white hover:scale-105 transition-all duration-500 cursor-pointer">
            <PlaceholderImage
              src="https://res.cloudinary.com/dqgen2gxh/image/upload/v1781813293/P%C3%A5sar0005_i4ukgn.jpg"
              alt="CoAdvert handwoven cotton bags displayed in store"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              label="CoAdvert Products"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-neutral-30/95 backdrop-blur-md border border-neutral-800 p-6 rounded-lg">
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-1">
                A Family Legacy
              </p>
              <p className="text-sm text-neutral-100 leading-relaxed">
                A humble grey cloth trading shop that evolved into a global
                manufacturer and exporter of cotton products over 47 years.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
              The CoAdverts Legacy
            </p>
            <h2 className="text-balance leading-tight">
              CoAdvert AB Sweden &amp; MH Tex Pakistan
            </h2>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              CoAdvert AB Sweden and MH Tex, Pakistan is the legacy of a family
              associated with cotton and cotton products for the last 47 years.
              A humble grey cloth trading shop later evolved to be a
              manufacturer and exporter of cotton products around the world.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Till today, the organisation remains a family-owned business
              committed to providing services in the field of cotton products.
              We cherish a large customer base with a focus on bringing social
              change in the lives of our workers and community through ethical
              business practices.
            </p>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-neutral-200 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl md:text-4xl font-heading font-bold text-brand-700">
                  47+
                </p>
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mt-1">
                  Years Heritage
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-heading font-bold text-brand-700">
                  40+
                </p>
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mt-1">
                  Countries Served
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-heading font-bold text-brand-700">
                  100%
                </p>
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mt-1">
                  Ethical Audited
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ===== CATALOG (Animated Stack Layout) ===== */}
      <SectionWrapper background="white" padding="lg">
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
            Product Catalog
          </p>
          <h2 className="text-balance text-3xl md:text-5xl font-heading font-bold text-neutral-900 mb-4 uppercase">
            Our Specialized Product Families
          </h2>
          <p className="mt-3 text-neutral-600 text-lg">
            We manufacture a broad scope of textile and retail packaging
            products. Explore our core B2B families, each featuring full
            customization options.
          </p>
        </div>

        <div className="container-wide">
          <div className="flex flex-col border-y border-neutral-200 divide-y divide-neutral-200">
            {productCategories.map((category, index) => (
              <AnimatedCategoryCard 
                key={category.id} 
                category={category} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ===== WHY CHOOSE US ===== */}
      <SectionWrapper background="white" padding="lg">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
            Why Partner With Us
          </p>
          <h2 className="text-balance">Designed for Safety and Compliance</h2>
          <p className="mt-3 text-neutral-600">
            We align with international corporate social responsibility (CSR)
            goals, protecting worker safety and environmental resources.
          </p>
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

      {/* ===== CERTIFICATES MARQUEE ===== */}
      <section className="bg-surface-100 border-y border-surface-300 py-10">
        <div className="container-wide mb-7 text-center">
          <p className="text-brand-700 text-xs font-semibold uppercase tracking-widest font-body">
            Internationally Certified &amp; Audited
          </p>
        </div>

        {/* group wrapper — hover pauses the animation via CSS */}
        <div className="marquee-wrapper group">
          <div className="marquee-track">
            {[
              ...certifications,
              ...certifications,
              ...certifications,
              ...certifications,
            ].map((cert, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-12 shrink-0"
              >
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={100}
                  height={56}
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS OVERVIEW ===== */}
      <SectionWrapper background="beige-100" padding="lg">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-brand-700 text-sm font-semibold uppercase tracking-widest mb-3 font-body">
            B2B Workflow
          </p>
          <h2 className="text-balance">From Tech-Pack to Warehouse</h2>
          <p className="mt-3 text-neutral-600">
            A structured workflow coordination overseen by our Swedish and
            Pakistani branches to ensure timely delivery and perfect
            specifications.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ProcessTimeline steps={processSteps} />
        </div>
      </SectionWrapper>

      {/* ===== TESTIMONIALS / REFERENCES ===== */}
      <SectionWrapper background="white" padding="lg">
        <TestimonialSlider references={references} />
      </SectionWrapper>

      {/* ===== CTA BANNER ===== */}
      <CTABanner
        heading="Ready to Request a B2B Quote?"
        subtext="Specify your required quantities, materials, custom printing, and timeline. Our Stockholm office will coordinate and return a quote."
        buttonText="Get a Custom Quote"
        buttonHref="/contact"
      />
    </>
  );
}
