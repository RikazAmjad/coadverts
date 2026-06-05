import Link from "next/link";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: never };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-neutral-white hover:bg-brand-600 active:bg-brand-700 border border-brand-700 hover:border-brand-600",
  secondary:
    "bg-surface-200 text-neutral-900 hover:bg-surface-300 active:bg-surface-200 border border-surface-300",
  outline:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 border border-neutral-300 hover:border-neutral-400",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
};

function getButtonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth: boolean = false,
  loading: boolean = false,
  className: string = ""
) {
  return [
    "inline-flex items-center justify-center font-medium rounded-md transition-base cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    loading ? "opacity-70 pointer-events-none" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

const Button = forwardRef<HTMLButtonElement, ButtonAsButton>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={getButtonClasses(
          variant,
          size,
          fullWidth,
          loading,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  href,
  children,
  ...props
}: ButtonAsLink) {
  return (
    <Link
      href={href}
      className={getButtonClasses(variant, size, fullWidth, loading, className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export { Button, ButtonLink };
export type { ButtonProps, ButtonVariant, ButtonSize };
