import { type ReactNode } from "react";

type SectionBackground = "white" | "beige-100" | "beige-200" | "dark";

interface SectionWrapperProps {
  children: ReactNode;
  background?: SectionBackground;
  className?: string;
  id?: string;
  padding?: "sm" | "md" | "lg" | "xl";
}

const bgClasses: Record<SectionBackground, string> = {
  white: "bg-white",
  "beige-100": "bg-surface-100",
  "beige-200": "bg-surface-200",
  dark: "bg-neutral-900 text-white",
};

const paddingClasses: Record<string, string> = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
  xl: "py-section-xl",
};

export function SectionWrapper({
  children,
  background = "white",
  className = "",
  id,
  padding = "lg",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`${bgClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className="container-wide">{children}</div>
    </section>
  );
}
