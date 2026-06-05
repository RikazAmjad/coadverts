import { ButtonLink } from "@/components/ui/Button";

interface CTABannerProps {
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
  variant?: "default" | "dark";
}

export function CTABanner({
  heading,
  subtext,
  buttonText,
  buttonHref,
  variant = "default",
}: CTABannerProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`${isDark ? "bg-neutral-900" : "bg-brand-700"}`}
    >
      <div className="container-wide py-section-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2
              className={`text-2xl md:text-3xl font-heading font-semibold ${
                isDark ? "text-white" : "text-white"
              }`}
            >
              {heading}
            </h2>
            <p
              className={`mt-2 text-base ${
                isDark ? "text-neutral-400" : "text-white/80"
              } max-w-xl`}
            >
              {subtext}
            </p>
          </div>
          <ButtonLink
            href={buttonHref}
            variant={isDark ? "primary" : "secondary"}
            size="lg"
            className="shrink-0"
          >
            {buttonText}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
